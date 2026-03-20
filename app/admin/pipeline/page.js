'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const COLUMNS = [
  { key: 'new', label: 'New', color: 'border-blue-400', bg: 'bg-blue-50', badge: 'bg-blue-100 text-blue-700' },
  { key: 'contacted', label: 'Contacted', color: 'border-yellow-400', bg: 'bg-yellow-50', badge: 'bg-yellow-100 text-yellow-700' },
  { key: 'estimate_scheduled', label: 'Est. Sched.', color: 'border-indigo-400', bg: 'bg-indigo-50', badge: 'bg-indigo-100 text-indigo-700' },
  { key: 'estimate_completed', label: 'Est. Done', color: 'border-purple-400', bg: 'bg-purple-50', badge: 'bg-purple-100 text-purple-700' },
  { key: 'job_booked', label: 'Booked', color: 'border-emerald-400', bg: 'bg-emerald-50', badge: 'bg-emerald-100 text-emerald-700' },
  { key: 'in_progress', label: 'In Progress', color: 'border-orange-400', bg: 'bg-orange-50', badge: 'bg-orange-100 text-orange-700' },
  { key: 'completed', label: 'Done', color: 'border-green-400', bg: 'bg-green-50', badge: 'bg-green-100 text-green-700' },
  { key: 'closed_lost', label: 'Lost', color: 'border-red-400', bg: 'bg-red-50', badge: 'bg-red-100 text-red-700' },
]

export default function PipelinePage() {
  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(true)
  const [draggingId, setDraggingId] = useState(null)
  const [dragOverCol, setDragOverCol] = useState(null)
  const [moveModal, setMoveModal] = useState(null)
  const [successMsg, setSuccessMsg] = useState('')

  useEffect(() => { fetchSubmissions() }, [])

  const fetchSubmissions = async () => {
    try {
      const response = await fetch('/api/contact')
      const result = await response.json()
      if (result.data) setSubmissions(result.data)
    } catch (error) { console.error('Failed to fetch:', error) }
    finally { setLoading(false) }
  }

  const updateStatus = async (contactId, newStatus, oldStatus) => {
    setSubmissions(prev => prev.map(s => s.id === contactId ? { ...s, status: newStatus } : s))
    try {
      await fetch('/api/contact', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: contactId, status: newStatus }) })
      await fetch('/api/admin/activity', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ contact_id: contactId, action: 'status_change', old_value: oldStatus, new_value: newStatus }) })
      setSuccessMsg('Moved to ' + COLUMNS.find(c => c.key === newStatus)?.label)
      setTimeout(() => setSuccessMsg(''), 2000)
    } catch (err) { setSubmissions(prev => prev.map(s => s.id === contactId ? { ...s, status: oldStatus } : s)) }
  }

  const handleDragStart = (e, id) => { setDraggingId(id); e.dataTransfer.effectAllowed = 'move'; e.dataTransfer.setData('text/plain', id) }
  const handleDragOver = (e, colKey) => { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; setDragOverCol(colKey) }
  const handleDragLeave = () => setDragOverCol(null)
  const handleDrop = (e, colKey) => { e.preventDefault(); setDragOverCol(null); const id = e.dataTransfer.getData('text/plain'); const c = submissions.find(s => s.id === id); if (c && c.status !== colKey) updateStatus(id, colKey, c.status); setDraggingId(null) }
  const handleDragEnd = () => { setDraggingId(null); setDragOverCol(null) }
  const handleMobileMove = (newStatus) => { if (moveModal && moveModal.status !== newStatus) updateStatus(moveModal.id, newStatus, moveModal.status); setMoveModal(null) }

  const formatPhone = (phone) => { if (!phone) return ''; const c = phone.replace(/\D/g, ''); if (c.length === 10) return '(' + c.slice(0,3) + ') ' + c.slice(3,6) + '-' + c.slice(6); if (c.length === 11 && c[0] === '1') return '(' + c.slice(1,4) + ') ' + c.slice(4,7) + '-' + c.slice(7); return phone }
  const timeAgo = (d) => { const s = Math.floor((Date.now() - new Date(d)) / 1000); if (s < 3600) return Math.floor(s/60) + 'm'; if (s < 86400) return Math.floor(s/3600) + 'h'; return Math.floor(s/86400) + 'd' }
  const getUrgencyDot = (c) => { if (!['new','contacted'].includes(c.status)) return null; const h = (Date.now() - new Date(c.created_at)) / 36e5; if (h > 24) return 'bg-red-500'; if (h > 1) return 'bg-yellow-500'; return 'bg-green-500' }

  if (loading) return <div className="flex items-center justify-center min-h-[50vh]"><div className="w-10 h-10 border-4 border-[#115997] border-t-transparent rounded-full animate-spin" /></div>

  return (
    <div className="px-4 py-4 sm:py-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg sm:text-2xl font-bold text-[#273373]">Pipeline Board</h2>
          <p className="text-gray-500 text-xs sm:text-sm">{submissions.length} leads · Drag cards to update status</p>
        </div>
        <Link href="/admin/contacts" className="px-3 py-1.5 text-xs font-medium text-[#115997] bg-[#115997]/10 rounded-lg hover:bg-[#115997]/20 transition-colors">List View</Link>
      </div>

      {successMsg && (
        <div className="mb-4 rounded-xl p-3 text-sm bg-green-50 border border-green-200 text-green-700 flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          {successMsg}
        </div>
      )}

      {/* Single row — 8 equal columns on desktop */}
      <div className="hidden sm:grid grid-cols-8 gap-2">
        {COLUMNS.map((col) => {
          const cards = submissions.filter(s => s.status === col.key)
          return (
            <div key={col.key} className={'flex flex-col rounded-xl transition-colors min-w-0 ' + (dragOverCol === col.key ? 'bg-[#115997]/5 ring-2 ring-[#115997]/20' : 'bg-gray-100/80')}
              onDragOver={(e) => handleDragOver(e, col.key)} onDragLeave={handleDragLeave} onDrop={(e) => handleDrop(e, col.key)}>
              <div className={'px-2 py-2 border-t-2 rounded-t-xl flex items-center gap-1 ' + col.color}>
                <h3 className="text-[11px] font-semibold text-gray-800 truncate">{col.label}</h3>
                <span className={'text-[9px] font-bold px-1 py-0.5 rounded-full flex-shrink-0 ' + col.badge}>{cards.length}</span>
              </div>
              <div className="p-1.5 space-y-1.5 min-h-[80px] max-h-[calc(100vh-200px)] overflow-y-auto scrollbar-hide">
                {cards.length === 0 && <div className="flex items-center justify-center h-16 text-gray-300 text-[10px]">Empty</div>}
                {cards.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).map((contact) => {
                  const dot = getUrgencyDot(contact)
                  return (
                    <div key={contact.id} draggable onDragStart={(e) => handleDragStart(e, contact.id)} onDragEnd={handleDragEnd}
                      className={'bg-white rounded-lg p-2 shadow-sm border border-gray-100 cursor-grab active:cursor-grabbing transition-all hover:shadow-md ' + (draggingId === contact.id ? 'opacity-40 scale-95' : '')}>
                      <div className="flex items-center justify-between mb-0.5">
                        <div className="flex items-center gap-1 min-w-0">
                          {dot && <div className={'w-1.5 h-1.5 rounded-full flex-shrink-0 ' + dot} />}
                          <Link href={'/admin/contacts/' + contact.id} className="font-semibold text-[11px] text-gray-900 truncate hover:text-[#115997]" onClick={(e) => e.stopPropagation()}>{contact.name}</Link>
                        </div>
                        <span className="text-[8px] text-gray-400 flex-shrink-0 ml-1">{timeAgo(contact.created_at)}</span>
                      </div>
                      <p className="text-[10px] text-gray-500 truncate">{contact.service_type}</p>
                      <a href={'tel:' + contact.phone} className="text-[9px] text-[#115997] font-medium hover:underline" onClick={(e) => e.stopPropagation()}>{formatPhone(contact.phone)}</a>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      {/* Mobile: stacked columns */}
      <div className="sm:hidden space-y-3">
        {COLUMNS.map((col) => {
          const cards = submissions.filter(s => s.status === col.key)
          if (cards.length === 0) return null
          return (
            <div key={col.key} className="bg-gray-100/80 rounded-xl">
              <div className={'px-3 py-2 border-t-2 rounded-t-xl flex items-center gap-2 ' + col.color}>
                <h3 className="text-xs font-semibold text-gray-800">{col.label}</h3>
                <span className={'text-[10px] font-bold px-1.5 py-0.5 rounded-full ' + col.badge}>{cards.length}</span>
              </div>
              <div className="p-2 space-y-2">
                {cards.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).map((contact) => {
                  const dot = getUrgencyDot(contact)
                  return (
                    <div key={contact.id} onClick={() => setMoveModal(contact)} className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 active:bg-gray-50">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-1.5 min-w-0">
                          {dot && <div className={'w-1.5 h-1.5 rounded-full flex-shrink-0 ' + dot} />}
                          <span className="font-semibold text-sm text-gray-900 truncate">{contact.name}</span>
                        </div>
                        <span className="text-[10px] text-gray-400 flex-shrink-0 ml-1">{timeAgo(contact.created_at)}</span>
                      </div>
                      <p className="text-xs text-gray-500">{contact.service_type}</p>
                      <a href={'tel:' + contact.phone} className="text-xs text-[#115997] font-medium" onClick={(e) => e.stopPropagation()}>{formatPhone(contact.phone)}</a>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      {/* Mobile Move Modal */}
      {moveModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center" onClick={() => setMoveModal(null)}>
          <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-sm max-h-[70vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-4 border-b border-gray-100">
              <div className="w-8 h-1 bg-gray-300 rounded-full mx-auto mb-3 sm:hidden" />
              <p className="font-semibold text-gray-900">{moveModal.name}</p>
              <p className="text-xs text-gray-500">{moveModal.service_type}</p>
            </div>
            <div className="p-2">
              {COLUMNS.map((col) => (
                <button key={col.key} onClick={() => handleMobileMove(col.key)}
                  className={'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ' + (moveModal.status === col.key ? col.bg + ' ring-1 ring-inset ring-gray-200' : 'hover:bg-gray-50 active:bg-gray-100')}>
                  <div className={'w-2.5 h-2.5 rounded-full border-2 ' + col.color} />
                  <span className={'text-sm font-medium ' + (moveModal.status === col.key ? 'text-gray-900' : 'text-gray-600')}>{col.label}</span>
                  {moveModal.status === col.key && <svg className="w-4 h-4 text-[#115997] ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>}
                </button>
              ))}
            </div>
            <div className="p-4 border-t border-gray-100">
              <Link href={'/admin/contacts/' + moveModal.id} className="block w-full text-center py-2.5 text-sm font-medium text-[#115997] bg-[#115997]/10 rounded-lg" onClick={() => setMoveModal(null)}>Open Lead Details →</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}