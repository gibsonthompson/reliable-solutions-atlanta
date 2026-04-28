'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAdminAuth } from '../layout'

const COLUMNS = [
  { key: 'new', label: 'New', gradient: 'from-blue-500 to-blue-600', bg: 'bg-blue-50', badge: 'bg-blue-100 text-blue-700', dot: 'bg-blue-500', help: 'New leads from the website. They got an auto-confirmation text. Call them ASAP.' },
  { key: 'estimate_sent', label: 'Estimate Sent', gradient: 'from-indigo-500 to-indigo-600', bg: 'bg-indigo-50', badge: 'bg-indigo-100 text-indigo-700', dot: 'bg-indigo-500', help: 'You visited and sent the estimate. Follow up if no response in 3 days.' },
  { key: 'in_progress', label: 'In Progress', gradient: 'from-emerald-500 to-emerald-600', bg: 'bg-emerald-50', badge: 'bg-emerald-100 text-emerald-700', dot: 'bg-emerald-500', help: 'They said yes. Job is scheduled or underway.' },
  { key: 'done', label: 'Done', gradient: 'from-green-500 to-green-600', bg: 'bg-green-50', badge: 'bg-green-100 text-green-700', dot: 'bg-green-500', help: 'Job complete. Send review request.' },
  { key: 'lost', label: 'Lost', gradient: 'from-red-400 to-red-500', bg: 'bg-red-50', badge: 'bg-red-100 text-red-700', dot: 'bg-red-400', help: 'They decided not to move forward.' },
]

export default function PipelinePage() {
  const { user } = useAdminAuth()
  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(true)
  const [draggingId, setDraggingId] = useState(null)
  const [dragOverCol, setDragOverCol] = useState(null)
  const [moveModal, setMoveModal] = useState(null)
  const [successMsg, setSuccessMsg] = useState('')
  const [showHelp, setShowHelp] = useState(false)
  const [showCloseModal, setShowCloseModal] = useState(null)
  const [closeReason, setCloseReason] = useState('')
  const CLOSE_REASONS = ['Too expensive', 'Went with competitor', 'No response', 'Not ready yet', 'DIY', 'Other']

  useEffect(() => { if (user) fetchSubmissions() }, [user])

  const fetchSubmissions = async () => {
    try {
      const params = user.role === 'member' ? `?user_id=${user.id}&user_role=member` : ''
      const r = await fetch('/api/contact' + params); const res = await r.json(); if (res.data) setSubmissions(res.data)
    } catch (e) {} finally { setLoading(false) }
  }

  const updateStatus = async (contactId, newStatus, oldStatus) => {
    if (newStatus === 'lost') { setShowCloseModal({ id: contactId, oldStatus }); setCloseReason(''); return }
    setSubmissions(prev => prev.map(s => s.id === contactId ? { ...s, status: newStatus } : s))
    try {
      await fetch('/api/contact', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: contactId, status: newStatus }) })
      await fetch('/api/admin/activity', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ contact_id: contactId, action: 'status_change', old_value: oldStatus, new_value: newStatus, user_id: user?.id }) })
      setSuccessMsg('Moved to ' + (COLUMNS.find(c => c.key === newStatus)?.label || newStatus))
      setTimeout(() => setSuccessMsg(''), 3000)
    } catch (err) { setSubmissions(prev => prev.map(s => s.id === contactId ? { ...s, status: oldStatus } : s)) }
  }

  const handleCloseLost = async () => {
    if (!showCloseModal || !closeReason) return
    const { id, oldStatus } = showCloseModal
    setSubmissions(prev => prev.map(s => s.id === id ? { ...s, status: 'lost' } : s))
    setShowCloseModal(null)
    try {
      await fetch('/api/contact', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, status: 'lost', close_reason: closeReason }) })
      await fetch('/api/admin/activity', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ contact_id: id, action: 'status_change', old_value: oldStatus, new_value: 'lost', note: 'Reason: ' + closeReason, user_id: user?.id }) })
      setSuccessMsg('Marked as lost'); setTimeout(() => setSuccessMsg(''), 2000)
    } catch (err) { setSubmissions(prev => prev.map(s => s.id === id ? { ...s, status: oldStatus } : s)) }
  }

  const handleDragStart = (e, id) => { setDraggingId(id); e.dataTransfer.effectAllowed = 'move'; e.dataTransfer.setData('text/plain', id) }
  const handleDragOver = (e, colKey) => { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; setDragOverCol(colKey) }
  const handleDragLeave = () => setDragOverCol(null)
  const handleDrop = (e, colKey) => { e.preventDefault(); setDragOverCol(null); const id = e.dataTransfer.getData('text/plain'); const c = submissions.find(s => s.id === id); if (c && c.status !== colKey) updateStatus(id, colKey, c.status); setDraggingId(null) }
  const handleDragEnd = () => { setDraggingId(null); setDragOverCol(null) }
  const handleMobileMove = (newStatus) => { if (moveModal && moveModal.status !== newStatus) updateStatus(moveModal.id, newStatus, moveModal.status); setMoveModal(null) }

  const formatPhone = (phone) => { if (!phone) return ''; const c = phone.replace(/\D/g, ''); if (c.length === 10) return '(' + c.slice(0,3) + ') ' + c.slice(3,6) + '-' + c.slice(6); if (c.length === 11 && c[0] === '1') return '(' + c.slice(1,4) + ') ' + c.slice(4,7) + '-' + c.slice(7); return phone }
  const timeAgo = (d) => { const s = Math.floor((Date.now() - new Date(d)) / 1000); if (s < 3600) return Math.floor(s/60) + 'm'; if (s < 86400) return Math.floor(s/3600) + 'h'; return Math.floor(s/86400) + 'd' }
  const getUrgencyDot = (c) => { if (c.status !== 'new') return null; const h = (Date.now() - new Date(c.created_at)) / 36e5; if (h > 24) return 'bg-red-500'; if (h > 1) return 'bg-yellow-500'; return 'bg-green-500' }
  const getDisplayStatus = (status) => { if (status === 'contacted') return 'new'; if (status === 'booked') return 'in_progress'; return status }
  const getCardsForColumn = (colKey) => submissions.filter(s => getDisplayStatus(s.status) === colKey)

  if (loading) return <div className="flex items-center justify-center min-h-[50vh]"><div className="flex flex-col items-center gap-3"><div className="w-10 h-10 border-4 border-[#115997] border-t-transparent rounded-full animate-spin" /><p className="text-sm text-gray-400 animate-pulse">Loading pipeline...</p></div></div>

  return (
    <div className="px-4 py-5 sm:py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-5 animate-[fadeUp_0.3s_ease-out]">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">{user?.role === 'member' ? 'My Pipeline' : 'Pipeline'}</h2>
          <p className="text-gray-400 text-sm mt-0.5">{submissions.length} total</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setShowHelp(true)} className="px-3 py-2 text-xs font-medium text-gray-400 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:text-gray-600 transition-all flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.065 2.05-1.37 2.772-1.153.508.153.942.535 1.025 1.059.108.685-.378 1.232-.816 1.627-.39.354-.816.659-.816 1.267V13m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>Help</button>
          <Link href="/admin/contacts" className="px-3 py-2 text-xs font-semibold text-[#115997] bg-[#115997]/[0.06] rounded-lg hover:bg-[#115997]/[0.1] transition-all">List View</Link>
        </div>
      </div>

      {successMsg && <div className="mb-4 rounded-xl p-3 text-sm bg-green-50 border border-green-200 text-green-700 flex items-center gap-2 animate-[fadeUp_0.2s_ease-out]"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>{successMsg}</div>}

      {/* Desktop Columns */}
      <div className="hidden sm:grid grid-cols-5 gap-3 animate-[fadeUp_0.35s_ease-out]">
        {COLUMNS.map((col) => {
          const cards = getCardsForColumn(col.key)
          return (
            <div key={col.key}
              className={'flex flex-col rounded-xl transition-all duration-200 min-w-0 ' + (dragOverCol === col.key ? 'ring-2 ring-[#115997]/30 bg-[#115997]/[0.03] scale-[1.01]' : 'bg-white/60')}
              onDragOver={(e) => handleDragOver(e, col.key)} onDragLeave={handleDragLeave} onDrop={(e) => handleDrop(e, col.key)}>
              {/* Column Header */}
              <div className={`px-3 py-2.5 rounded-t-xl bg-gradient-to-r ${col.gradient} flex items-center justify-between`}>
                <h3 className="text-[11px] font-bold text-white uppercase tracking-wider truncate">{col.label}</h3>
                <span className="text-[10px] font-bold text-white/70 bg-white/20 px-1.5 py-0.5 rounded-md min-w-[20px] text-center">{cards.length}</span>
              </div>
              {/* Cards */}
              <div className="p-1.5 space-y-1.5 min-h-[80px] max-h-[calc(100vh-200px)] overflow-y-auto scrollbar-hide">
                {cards.length === 0 && (
                  <div className="flex items-center justify-center h-20">
                    <p className="text-[10px] text-gray-300">No leads</p>
                  </div>
                )}
                {cards.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).map((contact) => {
                  const dot = getUrgencyDot(contact)
                  return (
                    <div key={contact.id} draggable onDragStart={(e) => handleDragStart(e, contact.id)} onDragEnd={handleDragEnd}
                      className={'bg-white rounded-lg p-2.5 shadow-sm border border-gray-100 cursor-grab active:cursor-grabbing transition-all duration-150 hover:shadow-md hover:-translate-y-0.5 group ' + (draggingId === contact.id ? 'opacity-30 scale-95 rotate-1' : '')}>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-1.5 min-w-0">
                          {dot && <div className={'w-2 h-2 rounded-full flex-shrink-0 ' + dot + (dot === 'bg-red-500' ? ' animate-pulse' : '')} />}
                          <Link href={'/admin/contacts/' + contact.id} className="font-semibold text-[11px] text-gray-900 truncate hover:text-[#115997] transition-colors" onClick={(e) => e.stopPropagation()}>{contact.name}</Link>
                        </div>
                        <span className="text-[8px] text-gray-300 flex-shrink-0 ml-1 tabular-nums">{timeAgo(contact.created_at)}</span>
                      </div>
                      <p className="text-[10px] text-gray-400 truncate">{contact.service_type}</p>
                      <div className="flex items-center justify-between mt-1.5">
                        <a href={'tel:' + contact.phone} className="text-[9px] text-[#115997] font-medium hover:underline" onClick={(e) => e.stopPropagation()}>{formatPhone(contact.phone)}</a>
                        <a href={'tel:' + contact.phone} onClick={(e) => e.stopPropagation()} className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-green-50 rounded">
                          <svg className="w-3 h-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                        </a>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      {/* Mobile Stacked */}
      <div className="sm:hidden space-y-3 animate-[fadeUp_0.35s_ease-out]">
        {COLUMNS.map((col) => {
          const cards = getCardsForColumn(col.key)
          return (
            <div key={col.key} className="rounded-xl overflow-hidden bg-white/60">
              <div className={`px-4 py-2.5 bg-gradient-to-r ${col.gradient} flex items-center justify-between`}>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">{col.label}</h3>
                <span className="text-[10px] font-bold text-white/70 bg-white/20 px-2 py-0.5 rounded-md">{cards.length}</span>
              </div>
              {cards.length > 0 && (
                <div className="p-2 space-y-2">
                  {cards.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).map((contact) => {
                    const dot = getUrgencyDot(contact)
                    return (
                      <div key={contact.id} onClick={() => setMoveModal(contact)} className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 active:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-1.5 min-w-0">
                            {dot && <div className={'w-2 h-2 rounded-full flex-shrink-0 ' + dot} />}
                            <span className="font-semibold text-sm text-gray-900 truncate">{contact.name}</span>
                          </div>
                          <span className="text-[10px] text-gray-300 flex-shrink-0 ml-1">{timeAgo(contact.created_at)}</span>
                        </div>
                        <p className="text-xs text-gray-400">{contact.service_type}</p>
                        <a href={'tel:' + contact.phone} className="text-xs text-[#115997] font-medium mt-1 inline-block" onClick={(e) => e.stopPropagation()}>{formatPhone(contact.phone)}</a>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Mobile Move Modal */}
      {moveModal && <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center" onClick={() => setMoveModal(null)}><div className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-sm max-h-[70vh] overflow-y-auto animate-[slideUp_0.2s_ease-out]" onClick={(e) => e.stopPropagation()}><div className="p-4 border-b border-gray-100"><div className="w-8 h-1 bg-gray-300 rounded-full mx-auto mb-3 sm:hidden" /><p className="font-bold text-gray-900">{moveModal.name}</p><p className="text-xs text-gray-400">{moveModal.service_type}</p></div><div className="p-2">{COLUMNS.map((col) => <button key={col.key} onClick={() => handleMobileMove(col.key)} className={'w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all ' + (getDisplayStatus(moveModal.status) === col.key ? col.bg + ' ring-1 ring-inset ring-gray-200' : 'hover:bg-gray-50 active:bg-gray-100')}><div className={'w-3 h-3 rounded-full ' + col.dot} /><span className={'text-sm font-semibold ' + (getDisplayStatus(moveModal.status) === col.key ? 'text-gray-900' : 'text-gray-500')}>{col.label}</span>{getDisplayStatus(moveModal.status) === col.key && <svg className="w-4 h-4 text-[#115997] ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>}</button>)}</div><div className="p-4 border-t border-gray-100"><Link href={'/admin/contacts/' + moveModal.id} className="block w-full text-center py-2.5 text-sm font-semibold text-[#115997] bg-[#115997]/[0.06] rounded-xl" onClick={() => setMoveModal(null)}>Open Details</Link></div></div></div>}

      {/* Close/Lost Modal */}
      {showCloseModal && <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowCloseModal(null)}><div className="bg-white rounded-2xl p-6 max-w-sm w-full animate-[fadeUp_0.2s_ease-out]" onClick={(e) => e.stopPropagation()}><h3 className="text-lg font-bold text-gray-900 mb-4">Why was this lead lost?</h3><div className="space-y-2 mb-6">{CLOSE_REASONS.map((r) => <button key={r} onClick={() => setCloseReason(r)} className={'w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all ' + (closeReason === r ? 'border-red-300 bg-red-50 text-red-700' : 'border-gray-200 text-gray-600 hover:bg-gray-50')}>{r}</button>)}</div><div className="flex gap-3"><button onClick={() => setShowCloseModal(null)} className="flex-1 px-4 py-2.5 text-sm font-semibold text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200">Cancel</button><button onClick={handleCloseLost} disabled={!closeReason} className="flex-1 px-4 py-2.5 text-sm font-semibold text-white bg-red-500 rounded-xl disabled:opacity-40 hover:bg-red-600">Mark Lost</button></div></div></div>}

      {/* Help Modal */}
      {showHelp && <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4" onClick={() => setShowHelp(false)}><div className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-lg max-h-[85vh] overflow-y-auto animate-[slideUp_0.2s_ease-out]" onClick={(e) => e.stopPropagation()}><div className="p-5 border-b border-gray-100"><div className="w-8 h-1 bg-gray-300 rounded-full mx-auto mb-3 sm:hidden" /><div className="flex items-center justify-between"><h3 className="text-lg font-bold text-gray-900">How the Pipeline Works</h3><button onClick={() => setShowHelp(false)} className="text-gray-400 hover:text-gray-600"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button></div></div><div className="p-5 space-y-5"><div><h4 className="text-sm font-bold text-gray-800 mb-1">The basics</h4><p className="text-sm text-gray-500 leading-relaxed">Every lead moves left to right through 4 stages. New leads appear automatically when someone fills out the form.</p></div><div><h4 className="text-sm font-bold text-gray-800 mb-1">How to move a lead</h4><p className="text-sm text-gray-500 leading-relaxed">On desktop, drag and drop. On mobile, tap the card and pick the new stage.</p></div><div><h4 className="text-sm font-bold text-gray-800 mb-2">Stages</h4><div className="space-y-3">{COLUMNS.map((col) => <div key={col.key} className="flex gap-3 items-start"><div className={'w-2.5 h-2.5 rounded-full flex-shrink-0 mt-1 ' + col.dot} /><div><p className="text-sm font-semibold text-gray-800">{col.label}</p><p className="text-xs text-gray-400">{col.help}</p></div></div>)}</div></div></div><div className="p-5 border-t border-gray-100"><button onClick={() => setShowHelp(false)} className="w-full py-3 bg-[#115997] text-white rounded-xl font-semibold hover:bg-[#0d4a7a] transition-colors">Got it</button></div></div></div>}

      <style jsx>{`
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  )
}