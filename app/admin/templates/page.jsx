'use client'

import { useState, useEffect, useRef } from 'react'

const PIPELINE_STAGES = [{ key: 'initial_outreach', label: 'Initial Outreach' }, { key: 'follow_up', label: 'Follow-up' }, { key: 'estimate', label: 'Estimate' }, { key: 'booked', label: 'Booked' }, { key: 'post_job', label: 'Post-Job' }, { key: 'win_back', label: 'Win Back' }]
const FALLBACK_CATEGORIES = [{ key: 'homeowner', label: 'Homeowner', desc: 'Direct outreach to homeowners', is_default: true }, { key: 'realtor', label: 'Realtor', desc: 'Real estate agent outreach', is_default: true }, { key: 'plumber', label: 'Plumber', desc: 'Plumber referral partner outreach', is_default: true }, { key: 'contractor', label: 'Contractor', desc: 'General contractor partner outreach', is_default: true }, { key: 'insurance', label: 'Insurance', desc: 'Insurance adjuster/agent outreach', is_default: true }, { key: 'government', label: 'Government Agency', desc: 'Government and municipal outreach', is_default: true }, { key: 'property_mgr', label: 'Property Manager', desc: 'Property management company outreach', is_default: true }, { key: 'general', label: 'General', desc: 'Templates that work for any audience', is_default: true }]

export default function TemplatesPage() {
  const [templates, setTemplates] = useState([]); const [categories, setCategories] = useState(FALLBACK_CATEGORIES); const [loading, setLoading] = useState(true); const [editing, setEditing] = useState(null); const [saving, setSaving] = useState(false); const [toast, setToast] = useState(null); const [typeFilter, setTypeFilter] = useState('all'); const [categoryFilter, setCategoryFilter] = useState('all'); const [showCategoryMgr, setShowCategoryMgr] = useState(false); const [newCatName, setNewCatName] = useState(''); const [newCatDesc, setNewCatDesc] = useState(''); const [expandedCard, setExpandedCard] = useState(null); const [copied, setCopied] = useState(null)
  const [formData, setFormData] = useState({ name: '', subject: '', body: '', category: 'homeowner', pipeline_stage: '', is_default: false, type: 'sms' })
  const editRef = useRef(null)
  const showToast = (type, msg) => { setToast({ type, msg }); setTimeout(() => setToast(null), 4000) }

  useEffect(() => { fetchTemplates(); fetchCategories() }, [])
  const fetchTemplates = async () => { try { const r = await fetch('/api/admin/templates'); const d = await r.json(); if (!r.ok) { showToast('error', d.error || `Failed: ${r.status}`); return }; if (d.templates) setTemplates(d.templates) } catch (e) { showToast('error', `Error: ${e.message}`) } finally { setLoading(false) } }
  const fetchCategories = async () => { try { const r = await fetch('/api/admin/templates/categories'); const d = await r.json(); if (!r.ok) return; if (d.categories?.length) setCategories(d.categories.map(c => ({ key: c.key, label: c.label, desc: c.desc, is_default: c.is_default }))) } catch (e) {} }

  const handleCopy = async (template, e) => { e.stopPropagation(); try { await navigator.clipboard.writeText(template.body) } catch (err) { const ta = document.createElement('textarea'); ta.value = template.body; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta) }; setCopied(template.id); showToast('success', `Copied "${template.name}"`); setTimeout(() => setCopied(null), 2000) }
  const handleEdit = (template) => { setEditing(template.id); setFormData({ name: template.name, subject: template.subject || '', body: template.body, category: template.category || 'general', pipeline_stage: template.pipeline_stage || '', is_default: template.is_default || false, type: template.type || 'email' }); setTimeout(() => editRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100) }
  const handleNew = () => { setEditing('new'); setFormData({ name: '', subject: '', body: '', category: 'homeowner', pipeline_stage: 'initial_outreach', is_default: false, type: 'sms' }); setTimeout(() => editRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100) }
  const handleCancel = () => setEditing(null)

  const handleSave = async () => { if (!formData.name.trim() || !formData.body.trim()) return; if (formData.type === 'email' && !formData.subject.trim()) return; setSaving(true); try { const method = editing === 'new' ? 'POST' : 'PUT'; const payload = editing === 'new' ? formData : { ...formData, id: editing }; const r = await fetch('/api/admin/templates', { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }); const d = await r.json(); if (!r.ok) { showToast('error', d.error || 'Failed'); return }; showToast('success', editing === 'new' ? 'Created' : 'Updated'); setEditing(null); fetchTemplates() } catch (e) { showToast('error', `Error: ${e.message}`) } finally { setSaving(false) } }
  const handleDelete = async (id) => { if (!confirm('Delete?')) return; try { const r = await fetch('/api/admin/templates', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) }); if (!r.ok) { const d = await r.json(); showToast('error', d.error || 'Failed'); return }; showToast('success', 'Deleted'); fetchTemplates() } catch (e) { showToast('error', e.message) } }

  const handleAddCategory = async () => { if (!newCatName.trim()) return; const key = newCatName.trim().toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, ''); if (categories.some(c => c.key === key)) { showToast('error', 'Exists'); return }; const label = newCatName.trim(); const desc = newCatDesc.trim() || `Templates for ${label}`; try { const r = await fetch('/api/admin/templates/categories', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ key, label, desc }) }); if (!r.ok) { const d = await r.json(); showToast('error', d.error || 'Failed'); return }; setCategories(prev => [...prev, { key, label, desc, is_default: false }]); setNewCatName(''); setNewCatDesc(''); showToast('success', `"${label}" added`) } catch (e) { showToast('error', e.message) } }
  const handleDeleteCategory = async (key) => { const cat = categories.find(c => c.key === key); if (cat?.is_default) { showToast('error', 'Cannot delete defaults'); return }; const usedCount = templates.filter(t => t.category === key).length; if (usedCount > 0 && !confirm(`${usedCount} template(s) will move to General.`)) return; try { const r = await fetch('/api/admin/templates/categories', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ key }) }); if (!r.ok) { const d = await r.json(); showToast('error', d.error || 'Failed'); return } } catch (e) { showToast('error', e.message); return }; setCategories(prev => prev.filter(c => c.key !== key)); if (categoryFilter === key) setCategoryFilter('all'); showToast('success', 'Removed'); fetchTemplates() }

  const filtered = typeFilter === 'all' ? templates : templates.filter(t => (t.type || 'email') === typeFilter)
  const grouped = categories.map(cat => ({ ...cat, items: filtered.filter(t => (t.category || 'general') === cat.key).sort((a, b) => { const aS = PIPELINE_STAGES.findIndex(s => s.key === a.pipeline_stage); const bS = PIPELINE_STAGES.findIndex(s => s.key === b.pipeline_stage); if (aS !== bS) return (aS === -1 ? 99 : aS) - (bS === -1 ? 99 : bS); const aT = a.type || 'email', bT = b.type || 'email'; if (aT === 'sms' && bT !== 'sms') return -1; if (aT !== 'sms' && bT === 'sms') return 1; return a.name.localeCompare(b.name) }) })).filter(g => g.items.length > 0).filter(g => categoryFilter === 'all' || g.key === categoryFilter)
  const stageLabel = (key) => PIPELINE_STAGES.find(s => s.key === key)?.label || null

  if (loading) return <div className="flex items-center justify-center min-h-[50vh]"><div className="flex flex-col items-center gap-3"><div className="w-10 h-10 border-4 border-[#115997] border-t-transparent rounded-full animate-spin" /><p className="text-sm text-gray-400 animate-pulse">Loading templates...</p></div></div>

  return (
    <div className="px-4 py-5 sm:py-6 max-w-[1400px] mx-auto">
      {toast && <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-xl shadow-lg text-sm font-semibold flex items-center gap-2 animate-[fadeUp_0.2s_ease-out] ${toast.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">{toast.type === 'success' ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />}</svg>{toast.msg}<button onClick={() => setToast(null)} className="ml-2 opacity-70 hover:opacity-100">✕</button></div>}

      <div className="flex items-center justify-between mb-4 animate-[fadeUp_0.3s_ease-out]">
        <div><h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">Templates</h2><p className="text-gray-400 text-xs mt-0.5">{templates.length} total · {templates.filter(t => (t.type || 'email') === 'sms').length} DM · {templates.filter(t => (t.type || 'email') === 'email').length} Email</p></div>
        <div className="flex items-center gap-1.5">
          <button onClick={() => setShowCategoryMgr(true)} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-white rounded-lg transition-all" title="Categories"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg></button>
          {!editing && <button onClick={handleNew} className="flex items-center gap-1.5 px-3 py-2 bg-[#115997] text-white text-sm font-semibold rounded-lg hover:bg-[#0d4a7a] shadow-sm shadow-[#115997]/20 transition-all"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>New</button>}
        </div>
      </div>

      {!editing && (
        <div className="flex items-center gap-2 mb-3 flex-wrap animate-[fadeUp_0.35s_ease-out]">
          <div className="flex bg-white rounded-xl p-0.5 border border-gray-200">{[{ v: 'all', l: 'All' }, { v: 'sms', l: 'DM' }, { v: 'email', l: 'Email' }].map(f => <button key={f.v} onClick={() => setTypeFilter(f.v)} className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${typeFilter === f.v ? 'bg-[#115997] text-white shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}>{f.l}</button>)}</div>
          <div className="w-px h-5 bg-gray-200" />
          <div className="flex gap-1 overflow-x-auto pb-0.5 scrollbar-hide">
            <button onClick={() => setCategoryFilter('all')} className={`flex-shrink-0 px-2.5 py-1 rounded-full text-xs font-semibold transition-all ${categoryFilter === 'all' ? 'bg-gray-900 text-white' : 'bg-white text-gray-400 border border-gray-200 hover:bg-gray-50'}`}>All</button>
            {categories.map(c => { const count = filtered.filter(t => (t.category || 'general') === c.key).length; if (count === 0) return null; return <button key={c.key} onClick={() => setCategoryFilter(c.key)} className={`flex-shrink-0 px-2.5 py-1 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${categoryFilter === c.key ? 'bg-gray-900 text-white' : 'bg-white text-gray-400 border border-gray-200 hover:bg-gray-50'}`}>{c.label}<span className={`ml-1 ${categoryFilter === c.key ? 'text-white/50' : 'text-gray-300'}`}>{count}</span></button> })}
          </div>
        </div>
      )}

      {editing && (
        <div ref={editRef} className="bg-white rounded-xl shadow-sm p-4 sm:p-5 mb-5 border border-[#115997]/20 animate-[fadeUp_0.2s_ease-out]">
          <div className="flex items-center justify-between mb-3"><h3 className="font-bold text-gray-900 text-sm">{editing === 'new' ? 'New Template' : 'Edit Template'}</h3><button onClick={handleCancel} className="text-gray-400 hover:text-gray-600"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button></div>
          <div className="flex items-end gap-3 mb-3">
            <div><label className="block text-[9px] uppercase tracking-widest text-gray-400 font-bold mb-1">Type</label><div className="flex bg-white rounded-xl p-0.5 border border-gray-200"><button onClick={() => setFormData(p => ({ ...p, type: 'sms' }))} className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${formData.type === 'sms' ? 'bg-[#115997] text-white shadow-sm' : 'text-gray-400'}`}>DM</button><button onClick={() => setFormData(p => ({ ...p, type: 'email' }))} className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${formData.type === 'email' ? 'bg-[#115997] text-white shadow-sm' : 'text-gray-400'}`}>Email</button></div></div>
            <div className="flex-1"><label className="block text-[9px] uppercase tracking-widest text-gray-400 font-bold mb-1">Name *</label><input type="text" value={formData.name} onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))} placeholder="Template name" style={{ fontSize: '16px' }} className="w-full px-3 py-1.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#115997]/20 focus:border-[#115997] outline-none transition-all" /></div>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div><label className="block text-[9px] uppercase tracking-widest text-gray-400 font-bold mb-1">Audience *</label><select value={formData.category} onChange={(e) => setFormData(p => ({ ...p, category: e.target.value }))} className="w-full px-3 py-1.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#115997]/20 outline-none transition-all">{categories.map(c => <option key={c.key} value={c.key}>{c.label}</option>)}</select></div>
            <div><label className="block text-[9px] uppercase tracking-widest text-gray-400 font-bold mb-1">Stage</label><select value={formData.pipeline_stage} onChange={(e) => setFormData(p => ({ ...p, pipeline_stage: e.target.value }))} className="w-full px-3 py-1.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#115997]/20 outline-none transition-all"><option value="">No stage</option>{PIPELINE_STAGES.map(s => <option key={s.key} value={s.key}>{s.label}</option>)}</select></div>
          </div>
          {formData.type === 'email' && <div className="mb-3"><label className="block text-[9px] uppercase tracking-widest text-gray-400 font-bold mb-1">Subject *</label><input type="text" value={formData.subject} onChange={(e) => setFormData(p => ({ ...p, subject: e.target.value }))} placeholder="Use {name}, {service_type}" style={{ fontSize: '16px' }} className="w-full px-3 py-1.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#115997]/20 outline-none transition-all" /></div>}
          <div className="mb-3"><div className="flex items-center justify-between mb-1"><label className="text-[9px] uppercase tracking-widest text-gray-400 font-bold">{formData.type === 'sms' ? 'Message *' : 'Body *'}</label><span className="text-[10px] text-gray-300">{'{name}'} {'{first_name}'} {'{service_type}'}{formData.type === 'sms' && ` · ${formData.body.length}/160`}</span></div><textarea value={formData.body} onChange={(e) => setFormData(p => ({ ...p, body: e.target.value }))} placeholder={formData.type === 'sms' ? 'Keep under 160 chars...' : 'Write template...'} rows={formData.type === 'sms' ? 3 : 8} style={{ fontSize: '16px' }} className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#115997]/20 outline-none resize-none transition-all" /></div>
          <div className="flex items-center justify-end gap-2"><button onClick={handleCancel} className="px-4 py-2 text-xs font-semibold text-gray-500 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">Cancel</button><button onClick={handleSave} disabled={saving || !formData.name.trim() || !formData.body.trim() || (formData.type === 'email' && !formData.subject?.trim())} className="px-5 py-2 text-xs font-semibold text-white bg-[#115997] rounded-xl hover:bg-[#0d4a7a] disabled:opacity-40 shadow-sm shadow-[#115997]/20 transition-all">{saving ? 'Saving...' : 'Save'}</button></div>
        </div>
      )}

      {grouped.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center border border-gray-100"><p className="text-gray-400 text-sm">No templates found</p><button onClick={handleNew} className="mt-2 text-xs text-[#115997] font-semibold hover:underline">Create your first →</button></div>
      ) : (
        <div className="space-y-5 animate-[fadeUp_0.4s_ease-out]">
          {grouped.map((group) => (
            <div key={group.key}>
              <div className="flex items-baseline gap-2 mb-2"><h3 className="text-[9px] font-bold text-gray-900 uppercase tracking-widest">{group.label}</h3><span className="text-[10px] text-gray-300">{group.items.length}</span>{group.desc && <span className="text-[10px] text-gray-300 hidden sm:inline">· {group.desc}</span>}</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                {group.items.map((t) => {
                  const isExpanded = expandedCard === t.id; const stage = stageLabel(t.pipeline_stage)
                  return (
                    <div key={t.id} className={`bg-white rounded-xl border transition-all cursor-pointer group hover:-translate-y-0.5 ${isExpanded ? 'border-[#115997]/20 shadow-md col-span-1 sm:col-span-2' : 'border-gray-100 hover:border-gray-200 hover:shadow-md'}`} onClick={() => setExpandedCard(isExpanded ? null : t.id)}>
                      <div className="p-3">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <div className="flex items-center gap-1.5 min-w-0 flex-wrap">
                            <span className={`inline-flex px-1.5 py-0.5 rounded-md text-[9px] font-bold tracking-wider ${(t.type || 'email') === 'sms' ? 'bg-green-50 text-green-600' : 'bg-purple-50 text-purple-600'}`}>{(t.type || 'email') === 'sms' ? 'DM' : 'EMAIL'}</span>
                            {stage && <span className="inline-flex px-1.5 py-0.5 rounded-md text-[9px] font-bold bg-blue-50 text-blue-500">{stage}</span>}
                            <p className="font-bold text-gray-800 text-xs truncate">{t.name}</p>
                          </div>
                          <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                            <button onClick={(e) => handleCopy(t, e)} className={`p-1 rounded-lg ${copied === t.id ? 'text-green-500' : 'text-gray-200 hover:text-green-600'}`}>{copied === t.id ? <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> : <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>}</button>
                            <button onClick={() => handleEdit(t)} className="p-1 text-gray-200 hover:text-[#115997] rounded-lg"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg></button>
                            <button onClick={() => handleDelete(t.id)} className="p-1 text-gray-200 hover:text-red-500 rounded-lg"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                          </div>
                        </div>
                        {t.subject && (t.type || 'email') === 'email' && <p className="text-[10px] text-gray-300 truncate mb-0.5">{t.subject}</p>}
                        {isExpanded ? <p className="text-xs text-gray-500 leading-relaxed mt-2 whitespace-pre-wrap">{t.body}</p> : <p className="text-[11px] text-gray-400 line-clamp-2 leading-relaxed">{t.body}</p>}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {showCategoryMgr && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4" onClick={() => setShowCategoryMgr(false)}>
          <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-md max-h-[85vh] overflow-y-auto animate-[fadeUp_0.2s_ease-out]" onClick={(e) => e.stopPropagation()}>
            <div className="p-4 border-b border-gray-100"><div className="w-8 h-1 bg-gray-300 rounded-full mx-auto mb-3 sm:hidden" /><div className="flex items-center justify-between"><div><h3 className="text-sm font-bold text-gray-900">Audience Categories</h3><p className="text-[10px] text-gray-400">Who are you reaching out to?</p></div><button onClick={() => setShowCategoryMgr(false)} className="text-gray-400 hover:text-gray-600"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button></div></div>
            <div className="p-4 border-b border-gray-100 bg-[#F5F6F8]">
              <div className="flex gap-2"><input type="text" value={newCatName} onChange={(e) => setNewCatName(e.target.value)} placeholder="e.g. Inspector, HOA" style={{ fontSize: '16px' }} className="flex-1 px-3 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#115997]/20 focus:border-[#115997] transition-all" onKeyDown={(e) => e.key === 'Enter' && handleAddCategory()} /><button onClick={handleAddCategory} disabled={!newCatName.trim()} className="px-3 py-2 bg-[#115997] text-white text-xs font-semibold rounded-xl hover:bg-[#0d4a7a] disabled:opacity-40 shadow-sm shadow-[#115997]/20 transition-all">Add</button></div>
              <input type="text" value={newCatDesc} onChange={(e) => setNewCatDesc(e.target.value)} placeholder="Description (optional)" style={{ fontSize: '16px' }} className="w-full mt-2 px-3 py-1.5 border border-gray-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-[#115997]/20 transition-all" />
            </div>
            <div className="divide-y divide-gray-50">{categories.map((c) => { const count = templates.filter(t => (t.category || 'general') === c.key).length; return (<div key={c.key} className="px-4 py-3 flex items-center justify-between"><div><p className="text-sm font-semibold text-gray-800">{c.label}</p><p className="text-[10px] text-gray-400">{count} template{count !== 1 ? 's' : ''}</p></div>{!c.is_default ? <button onClick={() => handleDeleteCategory(c.key)} className="p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button> : <span className="text-[9px] text-gray-300 uppercase tracking-widest font-bold">Default</span>}</div>) })}</div>
            <div className="p-4 border-t border-gray-100"><button onClick={() => setShowCategoryMgr(false)} className="w-full py-2.5 bg-[#115997] text-white rounded-xl text-sm font-semibold hover:bg-[#0d4a7a] transition-all">Done</button></div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  )
}