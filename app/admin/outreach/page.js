'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function OutreachPage() {
  const [templates, setTemplates] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('all')
  const [copied, setCopied] = useState(null)
  const [toast, setToast] = useState(null)

  // Preview personalization
  const [previewName, setPreviewName] = useState('')
  const [showSettings, setShowSettings] = useState(false)

  useEffect(() => {
    Promise.all([fetchTemplates(), fetchCategories()])
      .finally(() => setLoading(false))
  }, [])

  const fetchTemplates = async () => {
    try {
      const r = await fetch('/api/admin/templates')
      const d = await r.json()
      if (r.ok && d.templates) {
        // DMs only
        setTemplates(d.templates.filter(t => (t.type || 'email') === 'sms'))
      }
    } catch (e) {}
  }

  const fetchCategories = async () => {
    try {
      const r = await fetch('/api/admin/templates/categories')
      const d = await r.json()
      if (r.ok && d.categories) setCategories(d.categories)
    } catch (e) {}
  }

  const personalize = (text) => {
    if (!previewName) return text
    const first = previewName.split(' ')[0]
    return text
      .replace(/\{name\}/g, previewName)
      .replace(/\{first_name\}/g, first)
  }

  const handleCopy = async (template) => {
    const text = personalize(template.body)
    try {
      await navigator.clipboard.writeText(text)
      setCopied(template.id)
      setToast(`Copied "${template.name}"`)
      setTimeout(() => { setCopied(null); setToast(null) }, 2000)
    } catch (e) {
      // Fallback
      const ta = document.createElement('textarea')
      ta.value = text
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
      setCopied(template.id)
      setToast(`Copied "${template.name}"`)
      setTimeout(() => { setCopied(null); setToast(null) }, 2000)
    }
  }

  // Group by category
  const grouped = categories
    .map(cat => ({
      ...cat,
      items: templates.filter(t => (t.category || 'general') === cat.key)
    }))
    .filter(g => g.items.length > 0)
    .filter(g => activeCategory === 'all' || g.key === activeCategory)

  // Ungrouped (templates with categories not in the list)
  const knownKeys = new Set(categories.map(c => c.key))
  const ungrouped = templates.filter(t => !knownKeys.has(t.category || 'general'))
  if (ungrouped.length > 0 && (activeCategory === 'all' || activeCategory === '_other')) {
    grouped.push({ key: '_other', label: 'Other', desc: '', items: ungrouped })
  }

  if (loading) return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="w-10 h-10 border-4 border-[#115997] border-t-transparent rounded-full animate-spin" />
    </div>
  )

  return (
    <div className="px-4 py-4 sm:py-6 max-w-[1200px] mx-auto">
      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 px-4 py-3 rounded-xl shadow-lg text-sm font-medium bg-green-600 text-white flex items-center gap-2 animate-[slideIn_0.2s_ease-out]">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          {toast}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-[#273373]">Outreach</h2>
          <p className="text-gray-400 text-xs">{templates.length} DM templates · Tap to copy</p>
        </div>
        <div className="flex items-center gap-1.5">
          <button onClick={() => setShowSettings(!showSettings)}
            className={`p-2 rounded-lg transition-colors ${showSettings ? 'bg-[#115997]/10 text-[#115997]' : 'text-gray-400 hover:text-[#273373] hover:bg-gray-100'}`}
            title="Personalize">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
          </button>
          <Link href="/admin/templates"
            className="p-2 text-gray-400 hover:text-[#273373] hover:bg-gray-100 rounded-lg transition-colors" title="All Templates">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          </Link>
        </div>
      </div>

      {/* Personalization bar */}
      {showSettings && (
        <div className="bg-white rounded-lg border border-gray-100 p-3 mb-3 flex items-center gap-3">
          <label className="text-[10px] uppercase tracking-wider text-gray-400 flex-shrink-0">Preview as</label>
          <input type="text" value={previewName} onChange={(e) => setPreviewName(e.target.value)}
            placeholder="Enter a name to preview personalization"
            style={{ fontSize: '16px' }}
            className="flex-1 px-3 py-1.5 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#115997]/30 focus:border-[#115997]" />
          {previewName && (
            <button onClick={() => setPreviewName('')} className="text-gray-300 hover:text-gray-500 text-xs">Clear</button>
          )}
        </div>
      )}

      {/* Category tabs */}
      <div className="flex gap-1 overflow-x-auto pb-0.5 scrollbar-hide mb-4 -mx-4 px-4">
        <button onClick={() => setActiveCategory('all')}
          className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
            activeCategory === 'all' ? 'bg-[#273373] text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
          }`}>
          All
          <span className={`ml-1 ${activeCategory === 'all' ? 'text-white/50' : 'text-gray-400'}`}>{templates.length}</span>
        </button>
        {categories.map(c => {
          const count = templates.filter(t => (t.category || 'general') === c.key).length
          if (count === 0) return null
          return (
            <button key={c.key} onClick={() => setActiveCategory(c.key)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${
                activeCategory === c.key ? 'bg-[#273373] text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}>
              {c.label}
              <span className={`ml-1 ${activeCategory === c.key ? 'text-white/50' : 'text-gray-400'}`}>{count}</span>
            </button>
          )
        })}
      </div>

      {/* Templates */}
      {grouped.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <svg className="w-12 h-12 text-gray-200 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
          <p className="text-gray-400 text-sm">No DM templates yet</p>
          <Link href="/admin/templates" className="mt-2 inline-block text-xs text-[#115997] font-medium hover:underline">
            Create templates →
          </Link>
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
                  const body = personalize(t.body)
                  const stage = t.pipeline_stage
                  return (
                    <button key={t.id}
                      onClick={() => handleCopy(t)}
                      className={`text-left bg-white rounded-lg border p-3 transition-all w-full group ${
                        isCopied
                          ? 'border-green-300 bg-green-50 shadow-sm'
                          : 'border-gray-100 hover:border-[#115997]/20 hover:shadow-sm active:scale-[0.98]'
                      }`}>
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <p className="font-semibold text-gray-800 text-xs truncate">{t.name}</p>
                          {stage && (
                            <span className="inline-flex px-1.5 py-0.5 rounded text-[9px] font-medium bg-blue-50 text-blue-500 flex-shrink-0">{
                              stage.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
                            }</span>
                          )}
                        </div>
                        <div className="flex-shrink-0">
                          {isCopied ? (
                            <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                          ) : (
                            <svg className="w-4 h-4 text-gray-300 group-hover:text-[#115997] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
                          )}
                        </div>
                      </div>
                      <p className={`text-xs leading-relaxed ${isCopied ? 'text-green-700' : 'text-gray-500'}`}>
                        {body}
                      </p>
                      <p className={`text-[10px] mt-1.5 ${isCopied ? 'text-green-500' : 'text-gray-300'}`}>
                        {isCopied ? 'Copied!' : `${t.body.length} chars · Tap to copy`}
                      </p>
                    </button>
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