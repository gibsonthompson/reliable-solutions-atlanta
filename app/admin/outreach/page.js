'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

export default function OutreachPage() {
  const [allTemplates, setAllTemplates] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('all')
  const [copied, setCopied] = useState(null)
  const [toast, setToast] = useState(null)
  const [previewName, setPreviewName] = useState('')
  const [showPersonalize, setShowPersonalize] = useState(false)
  const [showAddCat, setShowAddCat] = useState(false)
  const [newCatName, setNewCatName] = useState('')
  const catInputRef = useRef(null)
  const [showNewDM, setShowNewDM] = useState(false)
  const [newDM, setNewDM] = useState({ name: '', body: '', category: '' })
  const [saving, setSaving] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [editData, setEditData] = useState({ name: '', body: '', category: '' })

  const showToast = (type, msg) => { setToast({ type, msg }); setTimeout(() => setToast(null), 3000) }

  useEffect(() => { Promise.all([fetchTemplates(), fetchCategories()]).finally(() => setLoading(false)) }, [])
  useEffect(() => { if (showAddCat) setTimeout(() => catInputRef.current?.focus(), 100) }, [showAddCat])

  const fetchTemplates = async () => { try { const r = await fetch('/api/admin/templates'); const d = await r.json(); if (r.ok && d.templates) setAllTemplates(d.templates) } catch (e) {} }
  const fetchCategories = async () => { try { const r = await fetch('/api/admin/templates/categories'); const d = await r.json(); if (r.ok && d.categories) setCategories(d.categories) } catch (e) {} }

  const templates = allTemplates.filter(t => { if ((t.type || 'email') !== 'sms') return false; if (t.pipeline_stage === 'initial_outreach') return true; if (t.pipeline_stage && t.pipeline_stage !== 'initial_outreach') return false; return true })

  const personalize = (text) => { if (!previewName) return text; const first = previewName.split(' ')[0]; return text.replace(/\{name\}/g, previewName).replace(/\{first_name\}/g, first) }

  const handleCopy = async (template) => {
    const text = personalize(template.body)
    try { await navigator.clipboard.writeText(text) } catch (e) { const ta = document.createElement('textarea'); ta.value = text; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta) }
    setCopied(template.id); showToast('success', `Copied "${template.name}"`); setTimeout(() => setCopied(null), 2000)
  }

  const handleAddCategory = async () => {
    if (!newCatName.trim()) return; const label = newCatName.trim(); const key = label.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '')
    if (categories.some(c => c.key === key)) { showToast('error', 'Already exists'); return }
    try { const r = await fetch('/api/admin/templates/categories', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ key, label, desc: `Outreach to ${label}` }) }); const d = await r.json(); if (!r.ok) { showToast('error', d.error || 'Failed'); return }; await fetchCategories(); setNewCatName(''); setShowAddCat(false); showToast('success', `"${label}" added`) } catch (e) { showToast('error', e.message) }
  }

  const handleDeleteCategory = async (key) => {
    const cat = categories.find(c => c.key === key); if (cat?.is_default) { showToast('error', 'Cannot delete default categories'); return }
    const count = templates.filter(t => (t.category || 'general') === key).length; if (count > 0 && !confirm(`${count} template(s) will move to General. Continue?`)) return
    try { const r = await fetch('/api/admin/templates/categories', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ key }) }); if (!r.ok) { const d = await r.json(); showToast('error', d.error || 'Failed'); return }; await fetchCategories(); await fetchTemplates(); if (activeCategory === key) setActiveCategory('all'); showToast('success', 'Category removed') } catch (e) { showToast('error', e.message) }
  }

  const handleCreateDM = async () => {
    if (!newDM.name.trim() || !newDM.body.trim() || !newDM.category) return; setSaving(true)
    try { const r = await fetch('/api/admin/templates', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: newDM.name, body: newDM.body, category: newDM.category, pipeline_stage: 'initial_outreach', type: 'sms' }) }); const d = await r.json(); if (!r.ok) { showToast('error', d.error || 'Failed'); return }; await fetchTemplates(); setShowNewDM(false); setNewDM({ name: '', body: '', category: '' }); showToast('success', 'DM created') } catch (e) { showToast('error', e.message) } finally { setSaving(false) }
  }

  const handleStartEdit = (t, e) => { e.stopPropagation(); setEditingId(t.id); setEditData({ name: t.name, body: t.body, category: t.category || 'general' }) }
  const handleSaveEdit = async () => { if (!editData.name.trim() || !editData.body.trim()) return; setSaving(true); try { const r = await fetch('/api/admin/templates', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: editingId, ...editData }) }); if (!r.ok) { const d = await r.json(); showToast('error', d.error || 'Failed'); return }; await fetchTemplates(); setEditingId(null); showToast('success', 'Updated') } catch (e) { showToast('error', e.message) } finally { setSaving(false) } }
  const handleDelete = async (id, e) => { e.stopPropagation(); if (!confirm('Delete this template?')) return; try { const r = await fetch('/api/admin/templates', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) }); if (!r.ok) { const d = await r.json(); showToast('error', d.error || 'Failed'); return }; await fetchTemplates(); showToast('success', 'Deleted') } catch (e) { showToast('error', e.message) } }

  const grouped = categories.map(cat => ({ ...cat, items: templates.filter(t => (t.category || 'general') === cat.key) })).filter(g => g.items.length > 0).filter(g => activeCategory === 'all' || g.key === activeCategory)

  if (loading) return <div className="flex items-center justify-center min-h-[50vh]"><div className="flex flex-col items-center gap-3"><div className="w-10 h-10 border-4 border-[#115997] border-t-transparent rounded-full animate-spin" /><p className="text-sm text-gray-400 animate-pulse">Loading outreach...</p></div></div>

  return (
    <div className="px-4 py-5 sm:py-6 max-w-[1200px] mx-auto">
      {toast && <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-xl shadow-lg text-sm font-semibold flex items-center gap-2 animate-[fadeUp_0.2s_ease-out] ${toast.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">{toast.type === 'success' ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />}</svg>{toast.msg}</div>}

      <div className="flex items-center justify-between mb-4 animate-[fadeUp_0.3s_ease-out]">
        <div><h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">Outreach</h2><p className="text-gray-400 text-xs mt-0.5">{templates.length} DM{templates.length !== 1 ? 's' : ''} · Tap to copy</p></div>
        <div className="flex items-center gap-1.5">
          <button onClick={() => setShowPersonalize(!showPersonalize)} className={`p-2 rounded-lg transition-all ${showPersonalize ? 'bg-[#115997]/[0.06] text-[#115997]' : 'text-gray-400 hover:text-gray-600 hover:bg-white'}`} title="Preview with name"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg></button>
          <button onClick={() => { setShowNewDM(true); setNewDM({ name: '', body: '', category: categories[0]?.key || 'general' }) }} className="flex items-center gap-1.5 px-3 py-2 bg-[#115997] text-white text-sm font-semibold rounded-lg hover:bg-[#0d4a7a] shadow-sm shadow-[#115997]/20 transition-all"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>New DM</button>
        </div>
      </div>

      {showPersonalize && <div className="bg-white rounded-xl border border-gray-100 p-3 mb-3 flex items-center gap-3 animate-[fadeUp_0.2s_ease-out]"><label className="text-[9px] uppercase tracking-widest text-gray-400 font-bold flex-shrink-0">Name</label><input type="text" value={previewName} onChange={(e) => setPreviewName(e.target.value)} placeholder="Type a name to preview" style={{ fontSize: '16px' }} className="flex-1 px-3 py-1.5 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#115997]/20 focus:border-[#115997] transition-all" />{previewName && <button onClick={() => setPreviewName('')} className="text-gray-300 hover:text-gray-500 text-xs">Clear</button>}</div>}

      {showNewDM && (
        <div className="bg-white rounded-xl border border-[#115997]/20 p-4 mb-4 animate-[fadeUp_0.2s_ease-out]">
          <div className="flex items-center justify-between mb-3"><h3 className="text-sm font-bold text-gray-900">New Outreach DM</h3><button onClick={() => setShowNewDM(false)} className="text-gray-400 hover:text-gray-600"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button></div>
          <div className="flex gap-3 mb-3">
            <div className="flex-1"><label className="block text-[9px] uppercase tracking-widest text-gray-400 font-bold mb-1">Name *</label><input type="text" value={newDM.name} onChange={(e) => setNewDM(p => ({ ...p, name: e.target.value }))} placeholder="e.g. Realtor Intro" style={{ fontSize: '16px' }} className="w-full px-3 py-1.5 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#115997]/20 focus:border-[#115997] transition-all" /></div>
            <div className="w-40 sm:w-48"><label className="block text-[9px] uppercase tracking-widest text-gray-400 font-bold mb-1">Audience *</label><select value={newDM.category} onChange={(e) => setNewDM(p => ({ ...p, category: e.target.value }))} className="w-full px-3 py-1.5 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#115997]/20 transition-all">{categories.map(c => <option key={c.key} value={c.key}>{c.label}</option>)}</select></div>
          </div>
          <div className="mb-3"><div className="flex items-center justify-between mb-1"><label className="text-[9px] uppercase tracking-widest text-gray-400 font-bold">Message *</label><span className="text-[10px] text-gray-300">{'{name}'} {'{first_name}'} · {newDM.body.length}/160</span></div><textarea value={newDM.body} onChange={(e) => setNewDM(p => ({ ...p, body: e.target.value }))} placeholder="Write your outreach message..." rows={3} style={{ fontSize: '16px' }} className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#115997]/20 resize-none transition-all" /></div>
          <div className="flex justify-end gap-2"><button onClick={() => setShowNewDM(false)} className="px-4 py-2 text-xs font-semibold text-gray-500 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">Cancel</button><button onClick={handleCreateDM} disabled={saving || !newDM.name.trim() || !newDM.body.trim() || !newDM.category} className="px-5 py-2 text-xs font-semibold text-white bg-[#115997] rounded-xl hover:bg-[#0d4a7a] disabled:opacity-40 shadow-sm shadow-[#115997]/20 transition-all">{saving ? 'Saving...' : 'Create'}</button></div>
        </div>
      )}

      {/* Category tabs */}
      <div className="flex items-center gap-1 overflow-x-auto pb-0.5 scrollbar-hide mb-4 -mx-4 px-4 animate-[fadeUp_0.35s_ease-out]">
        <button onClick={() => setActiveCategory('all')} className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${activeCategory === 'all' ? 'bg-gray-900 text-white' : 'bg-white text-gray-400 hover:bg-gray-50 border border-gray-200'}`}>All <span className={activeCategory === 'all' ? 'text-white/50' : 'text-gray-300'}>{templates.length}</span></button>
        {categories.map(c => { const count = templates.filter(t => (t.category || 'general') === c.key).length; if (count === 0 && c.is_default) return null; return (
          <div key={c.key} className="flex-shrink-0 relative group">
            <button onClick={() => setActiveCategory(c.key)} className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${activeCategory === c.key ? 'bg-gray-900 text-white' : 'bg-white text-gray-400 hover:bg-gray-50 border border-gray-200'}`}>{c.label}{count > 0 && <span className={`ml-1 ${activeCategory === c.key ? 'text-white/50' : 'text-gray-300'}`}>{count}</span>}</button>
            {!c.is_default && <button onClick={() => handleDeleteCategory(c.key)} className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full text-[8px] font-bold opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center leading-none hover:bg-red-600" title="Remove">×</button>}
          </div>
        ) })}
        {showAddCat ? (
          <div className="flex items-center gap-1 flex-shrink-0">
            <input ref={catInputRef} type="text" value={newCatName} onChange={(e) => setNewCatName(e.target.value)} placeholder="e.g. Plumber" style={{ fontSize: '16px' }} className="w-28 px-2 py-1 border border-gray-200 rounded-full text-xs outline-none focus:border-[#115997]" onKeyDown={(e) => { if (e.key === 'Enter') handleAddCategory(); if (e.key === 'Escape') { setShowAddCat(false); setNewCatName('') } }} />
            <button onClick={handleAddCategory} disabled={!newCatName.trim()} className="w-6 h-6 bg-[#115997] text-white rounded-full text-xs flex items-center justify-center disabled:opacity-40">✓</button>
            <button onClick={() => { setShowAddCat(false); setNewCatName('') }} className="w-6 h-6 bg-gray-200 text-gray-500 rounded-full text-xs flex items-center justify-center">×</button>
          </div>
        ) : (
          <button onClick={() => setShowAddCat(true)} className="flex-shrink-0 w-7 h-7 bg-white hover:bg-gray-50 text-gray-300 hover:text-gray-500 rounded-full flex items-center justify-center transition-all border border-gray-200" title="Add category"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg></button>
        )}
      </div>

      {/* Templates */}
      {grouped.length === 0 && !showNewDM ? (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center border border-gray-100"><p className="text-gray-400 text-sm mb-2">No outreach DMs yet</p><button onClick={() => { setShowNewDM(true); setNewDM({ name: '', body: '', category: categories[0]?.key || 'general' }) }} className="text-xs text-[#115997] font-semibold hover:underline">Create your first DM →</button></div>
      ) : (
        <div className="space-y-5 animate-[fadeUp_0.4s_ease-out]">
          {grouped.map((group) => (
            <div key={group.key}>
              <div className="flex items-baseline gap-2 mb-2"><h3 className="text-[9px] font-bold text-gray-900 uppercase tracking-widest">{group.label}</h3><span className="text-[10px] text-gray-300">{group.items.length}</span></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {group.items.map((t) => {
                  const isCopied = copied === t.id; const isEditing = editingId === t.id
                  if (isEditing) return (
                    <div key={t.id} className="bg-white rounded-xl border border-[#115997]/20 p-3">
                      <input type="text" value={editData.name} onChange={(e) => setEditData(p => ({ ...p, name: e.target.value }))} style={{ fontSize: '16px' }} className="w-full px-2 py-1 border border-gray-200 rounded-xl text-xs font-bold mb-2 outline-none focus:border-[#115997]" />
                      <select value={editData.category} onChange={(e) => setEditData(p => ({ ...p, category: e.target.value }))} className="w-full px-2 py-1 border border-gray-200 rounded-xl text-xs mb-2 outline-none focus:border-[#115997]">{categories.map(c => <option key={c.key} value={c.key}>{c.label}</option>)}</select>
                      <textarea value={editData.body} onChange={(e) => setEditData(p => ({ ...p, body: e.target.value }))} rows={4} style={{ fontSize: '16px' }} className="w-full px-2 py-1 border border-gray-200 rounded-xl text-xs mb-2 outline-none focus:border-[#115997] resize-none" />
                      <div className="flex justify-end gap-1.5"><button onClick={() => setEditingId(null)} className="px-3 py-1 text-[10px] font-semibold text-gray-500 bg-gray-100 rounded-lg hover:bg-gray-200">Cancel</button><button onClick={handleSaveEdit} disabled={saving} className="px-3 py-1 text-[10px] font-semibold text-white bg-[#115997] rounded-lg hover:bg-[#0d4a7a] disabled:opacity-40">{saving ? '...' : 'Save'}</button></div>
                    </div>
                  )
                  return (
                    <div key={t.id} onClick={() => handleCopy(t)} className={`bg-white rounded-xl border p-3 transition-all cursor-pointer group hover:-translate-y-0.5 ${isCopied ? 'border-green-300 bg-green-50/50' : 'border-gray-100 hover:border-gray-200 hover:shadow-md active:scale-[0.98]'}`}>
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <p className="font-bold text-gray-800 text-xs">{t.name}</p>
                        <div className="flex items-center gap-0.5 flex-shrink-0">
                          <button onClick={(e) => handleStartEdit(t, e)} className="p-1 text-gray-200 hover:text-[#115997] rounded opacity-0 group-hover:opacity-100 transition-opacity"><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg></button>
                          <button onClick={(e) => handleDelete(t.id, e)} className="p-1 text-gray-200 hover:text-red-500 rounded opacity-0 group-hover:opacity-100 transition-opacity"><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                          {isCopied ? <svg className="w-4 h-4 text-green-500 ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> : <svg className="w-4 h-4 text-gray-200 group-hover:text-[#115997] transition-colors ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>}
                        </div>
                      </div>
                      <p className={`text-xs leading-relaxed ${isCopied ? 'text-green-700' : 'text-gray-400'}`}>{personalize(t.body)}</p>
                      <p className={`text-[10px] mt-1.5 ${isCopied ? 'text-green-500 font-semibold' : 'text-gray-300'}`}>{isCopied ? 'Copied!' : `${t.body.length} chars`}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      <style jsx global>{`
        @keyframes slideIn { from { transform: translateY(-10px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  )
}