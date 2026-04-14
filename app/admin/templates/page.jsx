'use client'

import { useState, useEffect, useRef } from 'react'

const DEFAULT_CATEGORIES = [
  { key: 'new_lead', label: 'New Lead', desc: 'First contact with a new lead', is_default: true },
  { key: 'contacted', label: 'Contacted', desc: 'After speaking with the lead', is_default: true },
  { key: 'estimate_sent', label: 'Estimate Sent', desc: 'Inspection done, estimate delivered', is_default: true },
  { key: 'booked', label: 'Booked', desc: 'Job is scheduled and confirmed', is_default: true },
  { key: 'done', label: 'Done', desc: 'Job complete, follow-up and reviews', is_default: true },
  { key: 'lost', label: 'Lost', desc: 'Lead didn\'t move forward', is_default: true },
  { key: 'partner', label: 'Partner Outreach', desc: 'Outreach to partners and referral sources', is_default: true },
  { key: 'general', label: 'General', desc: 'Other templates', is_default: true },
]

export default function TemplatesPage() {
  const [templates, setTemplates] = useState([])
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null) // null | 'new' | template id
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState(null) // { type: 'success' | 'error', msg: string }
  const [typeFilter, setTypeFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [showHelp, setShowHelp] = useState(false)
  const [showCategoryMgr, setShowCategoryMgr] = useState(false)
  const [newCatName, setNewCatName] = useState('')
  const [newCatDesc, setNewCatDesc] = useState('')
  const [expandedCard, setExpandedCard] = useState(null)
  const [formData, setFormData] = useState({ name: '', subject: '', body: '', category: 'new_lead', is_default: false, type: 'sms' })
  const editRef = useRef(null)

  const showToast = (type, msg) => { setToast({ type, msg }); setTimeout(() => setToast(null), 4000) }

  useEffect(() => { fetchTemplates(); fetchCategories() }, [])

  const fetchTemplates = async () => {
    try {
      const r = await fetch('/api/admin/templates')
      const d = await r.json()
      if (!r.ok) { showToast('error', d.error || `Fetch failed: ${r.status}`); return }
      if (d.templates) setTemplates(d.templates)
    } catch (e) { showToast('error', `Network error: ${e.message}`) }
    finally { setLoading(false) }
  }

  const fetchCategories = async () => {
    try {
      const r = await fetch('/api/admin/templates/categories')
      if (r.ok) {
        const d = await r.json()
        if (d.categories?.length) {
          // Merge DB categories with defaults, DB takes precedence
          const dbKeys = new Set(d.categories.map(c => c.key))
          const merged = [
            ...d.categories.map(c => ({ ...c })),
            ...DEFAULT_CATEGORIES.filter(c => !dbKeys.has(c.key))
          ]
          setCategories(merged)
        }
      }
    } catch (e) { /* categories endpoint may not exist yet, use defaults */ }
  }

  const handleEdit = (template) => {
    setEditing(template.id)
    setFormData({
      name: template.name,
      subject: template.subject || '',
      body: template.body,
      category: template.category || 'general',
      is_default: template.is_default || false,
      type: template.type || 'email'
    })
    setTimeout(() => editRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
  }

  const handleNew = () => {
    setEditing('new')
    setFormData({ name: '', subject: '', body: '', category: 'new_lead', is_default: false, type: 'sms' })
    setTimeout(() => editRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
  }

  const handleCancel = () => setEditing(null)

  const handleSave = async () => {
    if (!formData.name.trim() || !formData.body.trim()) return
    if (formData.type === 'email' && !formData.subject.trim()) return
    setSaving(true)
    try {
      const method = editing === 'new' ? 'POST' : 'PUT'
      const payload = editing === 'new' ? formData : { ...formData, id: editing }
      const r = await fetch('/api/admin/templates', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      const d = await r.json()
      if (!r.ok) {
        showToast('error', d.error || `Save failed: ${r.status}`)
        return
      }
      showToast('success', editing === 'new' ? 'Template created' : 'Template updated')
      setEditing(null)
      fetchTemplates()
    } catch (e) {
      showToast('error', `Save error: ${e.message}`)
    } finally { setSaving(false) }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this template?')) return
    try {
      const r = await fetch('/api/admin/templates', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      })
      if (!r.ok) {
        const d = await r.json()
        showToast('error', d.error || 'Delete failed')
        return
      }
      showToast('success', 'Template deleted')
      fetchTemplates()
    } catch (e) { showToast('error', `Delete error: ${e.message}`) }
  }

  const handleAddCategory = async () => {
    if (!newCatName.trim()) return
    const key = newCatName.trim().toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '')
    if (categories.some(c => c.key === key)) { showToast('error', 'Category already exists'); return }

    try {
      const r = await fetch('/api/admin/templates/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, label: newCatName.trim(), desc: newCatDesc.trim() || `Templates for ${newCatName.trim()}` })
      })
      if (r.ok) {
        setCategories(prev => [...prev, { key, label: newCatName.trim(), desc: newCatDesc.trim() || `Templates for ${newCatName.trim()}`, is_default: false }])
        setNewCatName('')
        setNewCatDesc('')
        showToast('success', 'Category added')
      } else {
        const d = await r.json()
        showToast('error', d.error || 'Failed to add category')
      }
    } catch (e) {
      // If endpoint doesn't exist yet, just add locally
      setCategories(prev => [...prev, { key, label: newCatName.trim(), desc: newCatDesc.trim() || `Templates for ${newCatName.trim()}`, is_default: false }])
      setNewCatName('')
      setNewCatDesc('')
      showToast('success', 'Category added locally')
    }
  }

  const handleDeleteCategory = async (key) => {
    const cat = categories.find(c => c.key === key)
    if (cat?.is_default) { showToast('error', 'Cannot delete default categories'); return }
    const usedCount = templates.filter(t => t.category === key).length
    if (usedCount > 0 && !confirm(`${usedCount} template(s) use this category. They'll move to "General". Continue?`)) return

    try {
      await fetch('/api/admin/templates/categories', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key })
      })
    } catch (e) { /* proceed locally */ }

    setCategories(prev => prev.filter(c => c.key !== key))
    if (categoryFilter === key) setCategoryFilter('all')
    // Move orphaned templates to general
    if (usedCount > 0) {
      templates.filter(t => t.category === key).forEach(t => {
        fetch('/api/admin/templates', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: t.id, category: 'general' })
        })
      })
      fetchTemplates()
    }
    showToast('success', 'Category removed')
  }

  // Filter + group
  const filtered = typeFilter === 'all' ? templates : templates.filter(t => (t.type || 'email') === typeFilter)
  const grouped = categories.map(cat => {
    const items = filtered
      .filter(t => (t.category || 'general') === cat.key)
      .sort((a, b) => {
        const aT = a.type || 'email', bT = b.type || 'email'
        if (aT === 'sms' && bT !== 'sms') return -1
        if (aT !== 'sms' && bT === 'sms') return 1
        return a.name.localeCompare(b.name)
      })
    return { ...cat, items }
  }).filter(g => g.items.length > 0).filter(g => categoryFilter === 'all' || g.key === categoryFilter)

  if (loading) return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="w-10 h-10 border-4 border-[#115997] border-t-transparent rounded-full animate-spin" />
    </div>
  )

  return (
    <div className="px-4 py-4 sm:py-6 max-w-[1400px] mx-auto">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-xl shadow-lg text-sm font-medium flex items-center gap-2 animate-[slideIn_0.2s_ease-out] ${
          toast.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
        }`}>
          {toast.type === 'success' ? (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          )}
          {toast.msg}
          <button onClick={() => setToast(null)} className="ml-2 opacity-70 hover:opacity-100">✕</button>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-[#273373]">Templates</h2>
          <p className="text-gray-400 text-xs">{templates.length} total · {templates.filter(t => (t.type || 'email') === 'sms').length} DM · {templates.filter(t => (t.type || 'email') === 'email').length} Email</p>
        </div>
        <div className="flex items-center gap-1.5">
          <button onClick={() => setShowCategoryMgr(true)} className="p-2 text-gray-400 hover:text-[#273373] hover:bg-gray-100 rounded-lg transition-colors" title="Manage categories">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>
          </button>
          <button onClick={() => setShowHelp(true)} className="p-2 text-gray-400 hover:text-[#273373] hover:bg-gray-100 rounded-lg transition-colors" title="Help">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.065 2.05-1.37 2.772-1.153.508.153.942.535 1.025 1.059.108.685-.378 1.232-.816 1.627-.39.354-.816.659-.816 1.267V13m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </button>
          {!editing && (
            <button onClick={handleNew} className="flex items-center gap-1.5 px-3 py-2 bg-[#115997] text-white text-sm font-medium rounded-lg hover:bg-[#273373] transition-colors">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              New
            </button>
          )}
        </div>
      </div>

      {/* Filters row */}
      {!editing && (
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          {/* Type pills */}
          <div className="flex bg-gray-100 rounded-lg p-0.5">
            {[{ v: 'all', l: 'All' }, { v: 'sms', l: 'DM' }, { v: 'email', l: 'Email' }].map(f => (
              <button key={f.v} onClick={() => setTypeFilter(f.v)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                  typeFilter === f.v ? 'bg-white text-[#115997] shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}>
                {f.l}
              </button>
            ))}
          </div>
          <div className="w-px h-5 bg-gray-200" />
          {/* Category pills */}
          <div className="flex gap-1 overflow-x-auto pb-0.5 scrollbar-hide">
            <button onClick={() => setCategoryFilter('all')}
              className={`flex-shrink-0 px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                categoryFilter === 'all' ? 'bg-[#273373] text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}>All</button>
            {categories.filter(c => templates.some(t => (t.category || 'general') === c.key)).map(c => (
              <button key={c.key} onClick={() => setCategoryFilter(c.key)}
                className={`flex-shrink-0 px-2.5 py-1 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${
                  categoryFilter === c.key ? 'bg-[#273373] text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}>
                {c.label}
                <span className={`ml-1 ${categoryFilter === c.key ? 'text-white/50' : 'text-gray-400'}`}>
                  {filtered.filter(t => (t.category || 'general') === c.key).length}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Edit / New form */}
      {editing && (
        <div ref={editRef} className="bg-white rounded-xl shadow-sm p-4 sm:p-5 mb-5 border border-[#115997]/20">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-[#273373] text-sm">{editing === 'new' ? 'New Template' : 'Edit Template'}</h3>
            <button onClick={handleCancel} className="text-gray-400 hover:text-gray-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          {/* Type toggle + Category in one row */}
          <div className="flex items-end gap-3 mb-3">
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-gray-400 mb-1">Type</label>
              <div className="flex bg-gray-100 rounded-lg p-0.5">
                <button onClick={() => setFormData(p => ({ ...p, type: 'sms' }))}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${formData.type === 'sms' ? 'bg-white text-[#115997] shadow-sm' : 'text-gray-500'}`}>DM</button>
                <button onClick={() => setFormData(p => ({ ...p, type: 'email' }))}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${formData.type === 'email' ? 'bg-white text-[#115997] shadow-sm' : 'text-gray-500'}`}>Email</button>
              </div>
            </div>
            <div className="flex-1">
              <label className="block text-[10px] uppercase tracking-wider text-gray-400 mb-1">Name *</label>
              <input type="text" value={formData.name} onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))}
                placeholder="Template name" style={{ fontSize: '16px' }}
                className="w-full px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#115997]/30 focus:border-[#115997] outline-none" />
            </div>
            <div className="w-40">
              <label className="block text-[10px] uppercase tracking-wider text-gray-400 mb-1">Stage</label>
              <select value={formData.category} onChange={(e) => setFormData(p => ({ ...p, category: e.target.value }))}
                className="w-full px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#115997]/30 focus:border-[#115997] outline-none">
                {categories.map(c => <option key={c.key} value={c.key}>{c.label}</option>)}
              </select>
            </div>
          </div>

          {formData.type === 'email' && (
            <div className="mb-3">
              <label className="block text-[10px] uppercase tracking-wider text-gray-400 mb-1">Subject *</label>
              <input type="text" value={formData.subject} onChange={(e) => setFormData(p => ({ ...p, subject: e.target.value }))}
                placeholder="Use {name}, {service_type} for personalization" style={{ fontSize: '16px' }}
                className="w-full px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#115997]/30 focus:border-[#115997] outline-none" />
            </div>
          )}

          <div className="mb-3">
            <div className="flex items-center justify-between mb-1">
              <label className="text-[10px] uppercase tracking-wider text-gray-400">
                {formData.type === 'sms' ? 'Message *' : 'Body *'}
              </label>
              <span className="text-[10px] text-gray-300">
                {'{name}'} {'{first_name}'} {'{service_type}'}
                {formData.type === 'sms' && ` · ${formData.body.length}/160`}
              </span>
            </div>
            <textarea value={formData.body} onChange={(e) => setFormData(p => ({ ...p, body: e.target.value }))}
              placeholder={formData.type === 'sms' ? 'Keep under 160 characters...' : 'Write your email template...'}
              rows={formData.type === 'sms' ? 3 : 8} style={{ fontSize: '16px' }}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#115997]/30 focus:border-[#115997] outline-none resize-none" />
          </div>

          <div className="flex items-center justify-end gap-2">
            <button onClick={handleCancel} className="px-4 py-2 text-xs font-medium text-gray-500 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">Cancel</button>
            <button onClick={handleSave}
              disabled={saving || !formData.name.trim() || !formData.body.trim() || (formData.type === 'email' && !formData.subject?.trim())}
              className="px-5 py-2 text-xs font-medium text-white bg-[#115997] rounded-lg hover:bg-[#273373] disabled:opacity-40 transition-colors">
              {saving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      )}

      {/* Grid of templates */}
      {grouped.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <p className="text-gray-400 text-sm">No templates found</p>
          <button onClick={handleNew} className="mt-2 text-xs text-[#115997] font-medium hover:underline">Create your first template</button>
        </div>
      ) : (
        <div className="space-y-5">
          {grouped.map((group) => (
            <div key={group.key}>
              <div className="flex items-baseline gap-2 mb-2">
                <h3 className="text-xs font-bold text-[#273373] uppercase tracking-wider">{group.label}</h3>
                <span className="text-[10px] text-gray-300">{group.items.length}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                {group.items.map((t) => {
                  const isExpanded = expandedCard === t.id
                  return (
                    <div key={t.id}
                      className={`bg-white rounded-lg border transition-all cursor-pointer group ${
                        isExpanded ? 'border-[#115997]/30 shadow-md col-span-1 sm:col-span-2' : 'border-gray-100 hover:border-gray-200 hover:shadow-sm'
                      }`}
                      onClick={() => setExpandedCard(isExpanded ? null : t.id)}>
                      <div className="p-3">
                        {/* Card header */}
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <div className="flex items-center gap-1.5 min-w-0">
                            <span className={`inline-flex px-1.5 py-0.5 rounded text-[9px] font-semibold tracking-wider ${
                              (t.type || 'email') === 'sms' ? 'bg-green-50 text-green-600' : 'bg-purple-50 text-purple-600'
                            }`}>{(t.type || 'email') === 'sms' ? 'DM' : 'EMAIL'}</span>
                            <p className="font-semibold text-gray-800 text-xs truncate">{t.name}</p>
                          </div>
                          <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                            onClick={(e) => e.stopPropagation()}>
                            <button onClick={() => handleEdit(t)} className="p-1 text-gray-300 hover:text-[#115997] rounded" title="Edit">
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                            </button>
                            <button onClick={() => handleDelete(t.id)} className="p-1 text-gray-300 hover:text-red-500 rounded" title="Delete">
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                            </button>
                          </div>
                        </div>
                        {/* Subject line for email */}
                        {t.subject && (t.type || 'email') === 'email' && <p className="text-[10px] text-gray-400 truncate mb-0.5">{t.subject}</p>}
                        {/* Body preview */}
                        {isExpanded ? (
                          <p className="text-xs text-gray-500 leading-relaxed mt-2 whitespace-pre-wrap">{t.body}</p>
                        ) : (
                          <p className="text-[11px] text-gray-400 line-clamp-2 leading-relaxed">{t.body}</p>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Category Manager Modal */}
      {showCategoryMgr && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4" onClick={() => setShowCategoryMgr(false)}>
          <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-md max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-4 border-b border-gray-100">
              <div className="w-8 h-1 bg-gray-300 rounded-full mx-auto mb-3 sm:hidden" />
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-[#273373]">Manage Categories</h3>
                <button onClick={() => setShowCategoryMgr(false)} className="text-gray-400 hover:text-gray-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
            </div>

            {/* Add new */}
            <div className="p-4 border-b border-gray-100 bg-gray-50/50">
              <div className="flex gap-2">
                <input type="text" value={newCatName} onChange={(e) => setNewCatName(e.target.value)}
                  placeholder="Category name (e.g. Plumber)" style={{ fontSize: '16px' }}
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#115997]/30 focus:border-[#115997]"
                  onKeyDown={(e) => e.key === 'Enter' && handleAddCategory()} />
                <button onClick={handleAddCategory} disabled={!newCatName.trim()}
                  className="px-3 py-2 bg-[#115997] text-white text-xs font-medium rounded-lg hover:bg-[#273373] disabled:opacity-40 transition-colors">Add</button>
              </div>
              <input type="text" value={newCatDesc} onChange={(e) => setNewCatDesc(e.target.value)}
                placeholder="Description (optional)" style={{ fontSize: '16px' }}
                className="w-full mt-2 px-3 py-1.5 border border-gray-200 rounded-lg text-xs outline-none focus:ring-2 focus:ring-[#115997]/30 focus:border-[#115997]" />
            </div>

            {/* Category list */}
            <div className="divide-y divide-gray-100">
              {categories.map((c) => {
                const count = templates.filter(t => (t.category || 'general') === c.key).length
                return (
                  <div key={c.key} className="px-4 py-3 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-800">{c.label}</p>
                      <p className="text-[10px] text-gray-400">{c.desc} · {count} template{count !== 1 ? 's' : ''}</p>
                    </div>
                    {!c.is_default && (
                      <button onClick={() => handleDeleteCategory(c.key)}
                        className="p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    )}
                  </div>
                )
              })}
            </div>

            <div className="p-4 border-t border-gray-100">
              <button onClick={() => setShowCategoryMgr(false)} className="w-full py-2.5 bg-[#115997] text-white rounded-xl text-sm font-semibold hover:bg-[#273373] transition-colors">Done</button>
            </div>
          </div>
        </div>
      )}

      {/* Help Modal */}
      {showHelp && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4" onClick={() => setShowHelp(false)}>
          <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-lg max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-5 border-b border-gray-100">
              <div className="w-8 h-1 bg-gray-300 rounded-full mx-auto mb-3 sm:hidden" />
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-[#273373]">Templates Help</h3>
                <button onClick={() => setShowHelp(false)} className="text-gray-400 hover:text-gray-600"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
              </div>
            </div>
            <div className="p-5 space-y-4">
              <div><h4 className="text-sm font-semibold text-gray-800 mb-1">What are templates?</h4><p className="text-xs text-gray-600 leading-relaxed">Pre-written messages you can quickly send to leads. Pick a template, it fills in the customer{"'"}s name and service type, and you send.</p></div>
              <div><h4 className="text-sm font-semibold text-gray-800 mb-1">DM vs Email</h4><p className="text-xs text-gray-600 leading-relaxed">DM = short direct messages. Email = subject line + longer body. Filter at the top.</p></div>
              <div><h4 className="text-sm font-semibold text-gray-800 mb-1">Categories</h4><p className="text-xs text-gray-600 leading-relaxed">Organized by pipeline stage. Tap the tag icon to add custom categories (Realtor, Plumber, etc). Custom categories can be deleted; defaults can{"'"}t.</p></div>
              <div><h4 className="text-sm font-semibold text-gray-800 mb-1">Variables</h4><p className="text-xs text-gray-600 leading-relaxed">Use {"{"}<span>first_name</span>{"}"}, {"{"}<span>name</span>{"}"}, or {"{"}<span>service_type</span>{"}"} — they auto-fill when sending.</p></div>
              <div><h4 className="text-sm font-semibold text-gray-800 mb-1">Sending</h4><p className="text-xs text-gray-600 leading-relaxed">Go to any contact, tap DM or Email, pick a template. Message gets pre-filled and copied to clipboard.</p></div>
            </div>
            <div className="p-5 border-t border-gray-100">
              <button onClick={() => setShowHelp(false)} className="w-full py-3 bg-[#115997] text-white rounded-xl font-semibold hover:bg-[#273373] transition-colors">Got it</button>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes slideIn {
          from { transform: translateY(-10px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  )
}