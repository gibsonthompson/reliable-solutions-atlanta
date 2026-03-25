'use client'

import { useState, useEffect } from 'react'

export default function TemplatesPage() {
  const [templates, setTemplates] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)
  const [saving, setSaving] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')

  const [formData, setFormData] = useState({ name: '', subject: '', body: '', category: 'follow_up', is_default: false, type: 'email' })

  const categories = [
    { value: 'follow_up', label: 'Follow-up' },
    { value: 'realtor', label: 'Realtor' },
    { value: 'lead', label: 'Lead' },
    { value: 'scheduling', label: 'Scheduling' },
    { value: 'post_service', label: 'Post-Service' },
    { value: 'general', label: 'General' },
  ]

  useEffect(() => { fetchTemplates() }, [])

  const fetchTemplates = async () => {
    try { const r = await fetch('/api/admin/templates'); const d = await r.json(); if (d.templates) setTemplates(d.templates) }
    catch (e) { console.error('Failed to fetch templates:', e) }
    finally { setLoading(false) }
  }

  const handleEdit = (template) => { setEditing(template.id); setFormData({ name: template.name, subject: template.subject || '', body: template.body, category: template.category || 'general', is_default: template.is_default || false, type: template.type || 'email' }) }
  const handleNew = () => { setEditing('new'); setFormData({ name: '', subject: '', body: '', category: 'follow_up', is_default: false, type: 'email' }) }
  const handleCancel = () => { setEditing(null) }

  const handleSave = async () => {
    if (!formData.name.trim() || !formData.body.trim()) return
    if (formData.type === 'email' && !formData.subject.trim()) return
    setSaving(true)
    try {
      const method = editing === 'new' ? 'POST' : 'PUT'
      const payload = editing === 'new' ? formData : { ...formData, id: editing }
      const r = await fetch('/api/admin/templates', { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      if (r.ok) { setSuccessMsg(editing === 'new' ? 'Template created' : 'Template updated'); setEditing(null); fetchTemplates(); setTimeout(() => setSuccessMsg(''), 3000) }
    } catch (e) { console.error('Failed to save:', e) }
    finally { setSaving(false) }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this template?')) return
    try { await fetch('/api/admin/templates', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) }); fetchTemplates() }
    catch (e) { console.error('Failed to delete:', e) }
  }

  const getCategoryBadge = (category) => {
    const styles = { follow_up: 'bg-blue-100 text-blue-700', realtor: 'bg-amber-100 text-amber-700', lead: 'bg-cyan-100 text-cyan-700', scheduling: 'bg-indigo-100 text-indigo-700', post_service: 'bg-green-100 text-green-700', general: 'bg-gray-100 text-gray-700' }
    return styles[category] || styles.general
  }

  const filtered = typeFilter === 'all' ? templates : templates.filter(t => (t.type || 'email') === typeFilter)

  if (loading) return <div className="flex items-center justify-center min-h-[50vh]"><div className="w-10 h-10 border-4 border-[#115997] border-t-transparent rounded-full animate-spin" /></div>

  return (
    <div className="px-4 py-4 sm:py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg sm:text-2xl font-bold text-[#273373]">Templates</h2>
          <p className="text-gray-500 text-xs sm:text-sm">{templates.length} templates</p>
        </div>
        {!editing && (
          <button onClick={handleNew} className="flex items-center gap-2 px-4 py-2.5 bg-[#115997] text-white text-sm font-medium rounded-xl hover:bg-[#273373] transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            New Template
          </button>
        )}
      </div>

      {successMsg && <div className="mb-4 rounded-xl p-3 text-sm bg-green-50 border border-green-200 text-green-700 flex items-center gap-2"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>{successMsg}</div>}

      {/* Type filter */}
      {!editing && (
        <div className="flex gap-2 mb-4">
          {[{ v: 'all', l: 'All' }, { v: 'email', l: 'Email' }, { v: 'sms', l: 'SMS' }].map(f => (
            <button key={f.v} onClick={() => setTypeFilter(f.v)}
              className={'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ' + (typeFilter === f.v ? 'bg-[#115997] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200')}>
              {f.l}
              <span className={'ml-1.5 ' + (typeFilter === f.v ? 'text-white/70' : 'text-gray-400')}>
                {f.v === 'all' ? templates.length : templates.filter(t => (t.type || 'email') === f.v).length}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Editor */}
      {editing && (
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-6 border-2 border-[#115997]/20">
          <h3 className="font-semibold text-[#273373] mb-4">{editing === 'new' ? 'Create Template' : 'Edit Template'}</h3>
          <div className="space-y-4">
            {/* Type toggle */}
            <div>
              <label className="block text-xs text-gray-500 mb-1.5">Type</label>
              <div className="flex bg-gray-100 rounded-lg p-0.5 w-fit">
                <button onClick={() => setFormData(p => ({ ...p, type: 'email' }))} className={'px-4 py-2 text-sm font-medium rounded-md transition-colors ' + (formData.type === 'email' ? 'bg-white text-[#115997] shadow-sm' : 'text-gray-500')}>Email</button>
                <button onClick={() => setFormData(p => ({ ...p, type: 'sms' }))} className={'px-4 py-2 text-sm font-medium rounded-md transition-colors ' + (formData.type === 'sms' ? 'bg-white text-[#115997] shadow-sm' : 'text-gray-500')}>SMS</button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><label className="block text-xs text-gray-500 mb-1.5">Name *</label><input type="text" value={formData.name} onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))} placeholder={formData.type === 'sms' ? 'e.g., On My Way' : 'e.g., Realtor Cold Outreach'} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#115997] focus:border-transparent outline-none" /></div>
              <div><label className="block text-xs text-gray-500 mb-1.5">Category</label><select value={formData.category} onChange={(e) => setFormData(p => ({ ...p, category: e.target.value }))} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#115997] focus:border-transparent outline-none">{categories.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}</select></div>
            </div>

            {formData.type === 'email' && (
              <div><label className="block text-xs text-gray-500 mb-1.5">Subject *</label><input type="text" value={formData.subject} onChange={(e) => setFormData(p => ({ ...p, subject: e.target.value }))} placeholder="Use {name}, {service_type} for personalization" className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm font-mono focus:ring-2 focus:ring-[#115997] focus:border-transparent outline-none" /></div>
            )}

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs text-gray-500">{formData.type === 'sms' ? 'Message *' : 'Body *'}</label>
                <span className="text-[10px] text-gray-400">Variables: {'{name}'} {'{first_name}'} {'{service_type}'}</span>
              </div>
              <textarea value={formData.body} onChange={(e) => setFormData(p => ({ ...p, body: e.target.value }))} placeholder={formData.type === 'sms' ? 'Keep under 160 characters...' : 'Write your email template...'} rows={formData.type === 'sms' ? 4 : 12} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#115997] focus:border-transparent outline-none resize-none" style={{ lineHeight: '1.7' }} />
              {formData.type === 'sms' && <p className="text-xs text-gray-400 mt-1">{formData.body.length}/160 characters</p>}
            </div>

            <div className="flex items-center gap-2"><input type="checkbox" id="is_default" checked={formData.is_default} onChange={(e) => setFormData(p => ({ ...p, is_default: e.target.checked }))} className="rounded border-gray-300" /><label htmlFor="is_default" className="text-sm text-gray-600">Set as default template</label></div>

            <div className="flex items-center gap-2 pt-2">
              <button onClick={handleCancel} className="flex-1 sm:flex-none px-4 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200">Cancel</button>
              <button onClick={handleSave} disabled={saving || !formData.name.trim() || !formData.body.trim() || (formData.type === 'email' && !formData.subject?.trim())} className="flex-1 sm:flex-none px-4 py-2.5 text-sm font-medium text-white bg-[#115997] rounded-lg hover:bg-[#273373] disabled:opacity-50">{saving ? 'Saving...' : 'Save Template'}</button>
            </div>
          </div>
        </div>
      )}

      {/* List */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-8 sm:p-12 text-center">
            <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            <p className="text-gray-500">No templates yet</p>
            <button onClick={handleNew} className="mt-3 text-sm text-[#115997] font-medium hover:underline">Create your first template</button>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filtered.map((template) => (
              <div key={template.id} className="p-4 sm:px-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <p className="font-semibold text-gray-900 text-sm">{template.name}</p>
                      <span className={'inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium ' + ((template.type || 'email') === 'sms' ? 'bg-green-100 text-green-700' : 'bg-purple-100 text-purple-700')}>{(template.type || 'email').toUpperCase()}</span>
                      <span className={'inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium ' + getCategoryBadge(template.category)}>{template.category?.replace('_', ' ')}</span>
                      {template.is_default && <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium bg-amber-100 text-amber-700">Default</span>}
                    </div>
                    {template.subject && <p className="text-xs text-gray-500 truncate">{template.subject}</p>}
                    <p className="text-xs text-gray-400 mt-1 line-clamp-1">{template.body?.substring(0, 100)}...</p>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button onClick={() => handleEdit(template)} className="p-2 text-gray-400 hover:text-[#115997] rounded-lg hover:bg-gray-100"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg></button>
                    <button onClick={() => handleDelete(template.id)} className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}