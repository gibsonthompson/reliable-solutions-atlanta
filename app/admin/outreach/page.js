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

  // Personalization
  const [previewName, setPreviewName] = useState('')
  const [showPersonalize, setShowPersonalize] = useState(false)

  // Add category inline
  const [showAddCat, setShowAddCat] = useState(false)
  const [newCatName, setNewCatName] = useState('')
  const catInputRef = useRef(null)

  // New DM form
  const [showNewDM, setShowNewDM] = useState(false)
  const [newDM, setNewDM] = useState({ name: '', body: '', category: '' })
  const [saving, setSaving] = useState(false)

  // Edit
  const [editingId, setEditingId] = useState(null)
  const [editData, setEditData] = useState({ name: '', body: '', category: '' })

  const showToast = (type, msg) => { setToast({ type, msg }); setTimeout(() => setToast(null), 3000) }

  useEffect(() => {
    Promise.all([fetchTemplates(), fetchCategories()]).finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (showAddCat) setTimeout(() => catInputRef.current?.focus(), 100)
  }, [showAddCat])

  const fetchTemplates = async () => {
    try {
      const r = await fetch('/api/admin/templates')
      const d = await r.json()
      if (r.ok && d.templates) setAllTemplates(d.templates)
    } catch (e) {}
  }

  const fetchCategories = async () => {
    try {
      const r = await fetch('/api/admin/templates/categories')
      const d = await r.json()
      if (r.ok && d.categories) setCategories(d.categories)
    } catch (e) {}
  }

  // Only DMs that are initial outreach or have no pipeline stage
  const templates = allTemplates.filter(t => {
    if ((t.type || 'email') !== 'sms') return false
    if (t.pipeline_stage === 'initial_outreach') return true
    if (t.pipeline_stage && t.pipeline_stage !== 'initial_outreach') return false
    return true
  })

  const personalize = (text) => {
    if (!previewName) return text
    const first = previewName.split(' ')[0]
    return text.replace(/\{name\}/g, previewName).replace(/\{first_name\}/g, first)
  }

  const handleCopy = async (template) => {
    const text = personalize(template.body)
    try {
      await navigator.clipboard.writeText(text)
    } catch (e) {
      const ta = document.createElement('textarea')
      ta.value = text; document.body.appendChild(ta); ta.select()
      document.execCommand('copy'); document.body.removeChild(ta)
    }
    setCopied(template.id)
    showToast('success', `Copied "${template.name}"`)
    setTimeout(() => setCopied(null), 2000)
  }

  const handleAddCategory = async () => {
    if (!newCatName.trim()) return
    const label = newCatName.trim()
    const key = label.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '')
    if (categories.some(c => c.key === key)) { showToast('error', 'Already exists'); return }

    try {
      const r = await fetch('/api/admin/templates/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, label, desc: `Outreach to ${label}` })
      })
      const d = await r.json()
      if (!r.ok) { showToast('error', d.error || 'Failed'); return }
      await fetchCategories()
      setNewCatName('')
      setShowAddCat(false)
      showToast('success', `"${label}" added`)
    } catch (e) { showToast('error', e.message) }
  }

  const handleDeleteCategory = async (key) => {
    const cat = categories.find(c => c.key === key)
    if (cat?.is_default) { showToast('error', 'Cannot delete default categories'); return }
    const count = templates.filter(t => (t.category || 'general') === key).length
    if (count > 0 && !confirm(`${count} template(s) in this category will move to General. Continue?`)) return

    try {
      const r = await fetch('/api/admin/templates/categories', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key })
      })
      if (!r.ok) { const d = await r.json(); showToast('error', d.error || 'Failed'); return }
      await fetchCategories()
      await fetchTemplates()
      if (activeCategory === key) setActiveCategory('all')
      showToast('success', 'Category removed')
    } catch (e) { showToast('error', e.message) }
  }

  const handleCreateDM = async () => {
    if (!newDM.name.trim() || !newDM.body.trim() || !newDM.category) return
    setSaving(true)
    try {
      const r = await fetch('/api/admin/templates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newDM.name,
          body: newDM.body,
          category: newDM.category,
          pipeline_stage: 'initial_outreach',
          type: 'sms'
        })
      })
      const d = await r.json()
      if (!r.ok) { showToast('error', d.error || 'Failed'); return }
      await fetchTemplates()
      setShowNewDM(false)
      setNewDM({ name: '', body: '', category: '' })
      showToast('success', 'DM created')
    } catch (e) { showToast('error', e.message) }
    finally { setSaving(false) }
  }

  const handleStartEdit = (t, e) => {
    e.stopPropagation()
    setEditingId(t.id)
    setEditData({ name: t.name, body: t.body, category: t.category || 'general' })
  }

  const handleSaveEdit = async () => {
    if (!editData.name.trim() || !editData.body.trim()) return
    setSaving(true)
    try {
      const r = await fetch('/api/admin/templates', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editingId, ...editData })
      })
      const d = await r.json()
      if (!r.ok) { showToast('error', d.error || 'Failed'); return }
      await fetchTemplates()
      setEditingId(null)
      showToast('success', 'Updated')
    } catch (e) { showToast('error', e.message) }
    finally { setSaving(false) }
  }

  const handleDelete = async (id, e) => {
    e.stopPropagation()
    if (!confirm('Delete this template?')) return
    try {
      const r = await fetch('/api/admin/templates', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      })
      if (!r.ok) { const d = await r.json(); showToast('error', d.error || 'Failed'); return }
      await fetchTemplates()
      showToast('success', 'Deleted')
    } catch (e) { showToast('error', e.message) }
  }

  // Group by category
  const grouped = categories
    .map(cat => ({
      ...cat,
      items: templates.filter(t => (t.category || 'general') === cat.key)
    }))
    .filter(g => g.items.length > 0)
    .filter(g => activeCategory === 'all' || g.key === activeCategory)

  if (loading) return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="w-10 h-10 border-4 border-[#115997] border-t-transparent rounded-full animate-spin" />
    </div>
  )

  return (
    <div className="px-4 py-4 sm:py-6 max-w-[1200px] mx-auto">
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
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-[#273373]">Outreach</h2>
          <p className="text-gray-400 text-xs">{templates.length} DM{templates.length !== 1 ? 's' : ''} · Tap to copy</p>
        </div>
        <div className="flex items-center gap-1.5">
          <button onClick={() => setShowPersonalize(!showPersonalize)}
            className={`p-2 rounded-lg transition-colors ${showPersonalize ? 'bg-[#115997]/10 text-[#115997]' : 'text-gray-400 hover:text-[#273373] hover:bg-gray-100'}`}
            title="Preview with name">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
          </button>
          <button onClick={() => { setShowNewDM(true); setNewDM({ name: '', body: '', category: categories[0]?.key || 'general' }) }}
            className="flex items-center gap-1.5 px-3 py-2 bg-[#115997] text-white text-sm font-medium rounded-lg hover:bg-[#273373] transition-colors">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            New DM
          </button>
        </div>
      </div>

      {/* Personalize bar */}
      {showPersonalize && (
        <div className="bg-white rounded-lg border border-gray-100 p-3 mb-3 flex items-center gap-3">
          <label className="text-[10px] uppercase tracking-wider text-gray-400 flex-shrink-0">Name</label>
          <input type="text" value={previewName} onChange={(e) => setPreviewName(e.target.value)}
            placeholder="Type a name to preview" style={{ fontSize: '16px' }}
            className="flex-1 px-3 py-1.5 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#115997]/30 focus:border-[#115997]" />
          {previewName && <button onClick={() => setPreviewName('')} className="text-gray-300 hover:text-gray-500 text-xs">Clear</button>}
        </div>
      )}

      {/* New DM form */}
      {showNewDM && (
        <div className="bg-white rounded-xl border border-[#115997]/20 p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-[#273373]">New Outreach DM</h3>
            <button onClick={() => setShowNewDM(false)} className="text-gray-400 hover:text-gray-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          <div className="flex gap-3 mb-3">
            <div className="flex-1">
              <label className="block text-[10px] uppercase tracking-wider text-gray-400 mb-1">Name *</label>
              <input type="text" value={newDM.name} onChange={(e) => setNewDM(p => ({ ...p, name: e.target.value }))}
                placeholder="e.g. Realtor Intro" style={{ fontSize: '16px' }}
                className="w-full px-3 py-1.5 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#115997]/30 focus:border-[#115997]" />
            </div>
            <div className="w-40 sm:w-48">
              <label className="block text-[10px] uppercase tracking-wider text-gray-400 mb-1">Audience *</label>
              <select value={newDM.category} onChange={(e) => setNewDM(p => ({ ...p, category: e.target.value }))}
                className="w-full px-3 py-1.5 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#115997]/30 focus:border-[#115997]">
                {categories.map(c => <option key={c.key} value={c.key}>{c.label}</option>)}
              </select>
            </div>
          </div>
          <div className="mb-3">
            <div className="flex items-center justify-between mb-1">
              <label className="text-[10px] uppercase tracking-wider text-gray-400">Message *</label>
              <span className="text-[10px] text-gray-300">{'{name}'} {'{first_name}'} {'{service_type}'} · {newDM.body.length}/160</span>
            </div>
            <textarea value={newDM.body} onChange={(e) => setNewDM(p => ({ ...p, body: e.target.value }))}
              placeholder="Write your outreach message..." rows={3} style={{ fontSize: '16px' }}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#115997]/30 focus:border-[#115997] resize-none" />
          </div>
          <div className="flex justify-end gap-2">
            <button onClick={() => setShowNewDM(false)} className="px-4 py-2 text-xs font-medium text-gray-500 bg-gray-100 rounded-lg hover:bg-gray-200">Cancel</button>
            <button onClick={handleCreateDM} disabled={saving || !newDM.name.trim() || !newDM.body.trim() || !newDM.category}
              className="px-5 py-2 text-xs font-medium text-white bg-[#115997] rounded-lg hover:bg-[#273373] disabled:opacity-40">
              {saving ? 'Saving...' : 'Create'}
            </button>
          </div>
        </div>
      )}

      {/* Category tabs + add */}
      <div className="flex items-center gap-1 overflow-x-auto pb-0.5 scrollbar-hide mb-4 -mx-4 px-4">
        <button onClick={() => setActiveCategory('all')}
          className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
            activeCategory === 'all' ? 'bg-[#273373] text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
          }`}>
          All <span className={activeCategory === 'all' ? 'text-white/50' : 'text-gray-400'}>{templates.length}</span>
        </button>
        {categories.map(c => {
          const count = templates.filter(t => (t.category || 'general') === c.key).length
          if (count === 0 && c.is_default) return null
          return (
            <div key={c.key} className="flex-shrink-0 relative group">
              <button onClick={() => setActiveCategory(c.key)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${
                  activeCategory === c.key ? 'bg-[#273373] text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}>
                {c.label}
                {count > 0 && <span className={`ml-1 ${activeCategory === c.key ? 'text-white/50' : 'text-gray-400'}`}>{count}</span>}
              </button>
              {!c.is_default && (
                <button onClick={() => handleDeleteCategory(c.key)}
                  className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full text-[8px] font-bold opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center leading-none hover:bg-red-600"
                  title="Remove category">×</button>
              )}
            </div>
          )
        })}

        {/* Add category inline */}
        {showAddCat ? (
          <div className="flex items-center gap-1 flex-shrink-0">
            <input ref={catInputRef} type="text" value={newCatName} onChange={(e) => setNewCatName(e.target.value)}
              placeholder="e.g. Plumber" style={{ fontSize: '16px' }}
              className="w-28 px-2 py-1 border border-gray-200 rounded-full text-xs outline-none focus:border-[#115997]"
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleAddCategory()
                if (e.key === 'Escape') { setShowAddCat(false); setNewCatName('') }
              }} />
            <button onClick={handleAddCategory} disabled={!newCatName.trim()}
              className="w-6 h-6 bg-[#115997] text-white rounded-full text-xs flex items-center justify-center disabled:opacity-40 hover:bg-[#273373]">✓</button>
            <button onClick={() => { setShowAddCat(false); setNewCatName('') }}
              className="w-6 h-6 bg-gray-200 text-gray-500 rounded-full text-xs flex items-center justify-center hover:bg-gray-300">×</button>
          </div>
        ) : (
          <button onClick={() => setShowAddCat(true)}
            className="flex-shrink-0 w-7 h-7 bg-gray-100 hover:bg-gray-200 text-gray-400 hover:text-[#273373] rounded-full flex items-center justify-center transition-colors"
            title="Add category">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          </button>
        )}
      </div>

      {/* Templates grid */}
      {grouped.length === 0 && !showNewDM ? (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <svg className="w-12 h-12 text-gray-200 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
          <p className="text-gray-400 text-sm mb-2">No outreach DMs yet</p>
          <p className="text-gray-300 text-xs mb-3">Add a category above, then create your first outreach message.</p>
          <button onClick={() => { setShowNewDM(true); setNewDM({ name: '', body: '', category: categories[0]?.key || 'general' }) }}
            className="text-xs text-[#115997] font-medium hover:underline">Create your first DM →</button>
        </div>
      ) : (
        <div className="space-y-5">
          {grouped.map((group) => (
            <div key={group.key}>
              <div className="flex items-baseline gap-2 mb-2">
                <h3 className="text-xs font-bold text-[#273373] uppercase tracking-wider">{group.label}</h3>
                <span className="text-[10px] text-gray-300">{group.items.length}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {group.items.map((t) => {
                  const isCopied = copied === t.id
                  const isEditing = editingId === t.id

                  if (isEditing) {
                    return (
                      <div key={t.id} className="bg-white rounded-lg border border-[#115997]/20 p-3">
                        <input type="text" value={editData.name} onChange={(e) => setEditData(p => ({ ...p, name: e.target.value }))}
                          style={{ fontSize: '16px' }}
                          className="w-full px-2 py-1 border border-gray-200 rounded text-xs font-semibold mb-2 outline-none focus:border-[#115997]" />
                        <select value={editData.category} onChange={(e) => setEditData(p => ({ ...p, category: e.target.value }))}
                          className="w-full px-2 py-1 border border-gray-200 rounded text-xs mb-2 outline-none focus:border-[#115997]">
                          {categories.map(c => <option key={c.key} value={c.key}>{c.label}</option>)}
                        </select>
                        <textarea value={editData.body} onChange={(e) => setEditData(p => ({ ...p, body: e.target.value }))}
                          rows={4} style={{ fontSize: '16px' }}
                          className="w-full px-2 py-1 border border-gray-200 rounded text-xs mb-2 outline-none focus:border-[#115997] resize-none" />
                        <div className="flex justify-end gap-1.5">
                          <button onClick={() => setEditingId(null)} className="px-3 py-1 text-[10px] font-medium text-gray-500 bg-gray-100 rounded hover:bg-gray-200">Cancel</button>
                          <button onClick={handleSaveEdit} disabled={saving}
                            className="px-3 py-1 text-[10px] font-medium text-white bg-[#115997] rounded hover:bg-[#273373] disabled:opacity-40">
                            {saving ? '...' : 'Save'}
                          </button>
                        </div>
                      </div>
                    )
                  }

                  return (
                    <div key={t.id}
                      onClick={() => handleCopy(t)}
                      className={`bg-white rounded-lg border p-3 transition-all cursor-pointer group ${
                        isCopied
                          ? 'border-green-300 bg-green-50/50'
                          : 'border-gray-100 hover:border-[#115997]/20 hover:shadow-sm active:scale-[0.98]'
                      }`}>
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <p className="font-semibold text-gray-800 text-xs">{t.name}</p>
                        <div className="flex items-center gap-0.5 flex-shrink-0">
                          <button onClick={(e) => handleStartEdit(t, e)}
                            className="p-1 text-gray-200 hover:text-[#115997] rounded opacity-0 group-hover:opacity-100 transition-opacity"
                            title="Edit">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                          </button>
                          <button onClick={(e) => handleDelete(t.id, e)}
                            className="p-1 text-gray-200 hover:text-red-500 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                            title="Delete">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                          </button>
                          {isCopied ? (
                            <svg className="w-4 h-4 text-green-500 ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                          ) : (
                            <svg className="w-4 h-4 text-gray-200 group-hover:text-[#115997] transition-colors ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
                          )}
                        </div>
                      </div>
                      <p className={`text-xs leading-relaxed ${isCopied ? 'text-green-700' : 'text-gray-500'}`}>
                        {personalize(t.body)}
                      </p>
                      <p className={`text-[10px] mt-1.5 ${isCopied ? 'text-green-500' : 'text-gray-300'}`}>
                        {isCopied ? 'Copied!' : `${t.body.length} chars`}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
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