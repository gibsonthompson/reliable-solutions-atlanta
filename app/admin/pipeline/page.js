'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

const COLUMNS = [
  { key: 'new', label: 'New', color: 'border-blue-400', bg: 'bg-blue-50', badge: 'bg-blue-100 text-blue-700' },
  { key: 'contacted', label: 'Contacted', color: 'border-yellow-400', bg: 'bg-yellow-50', badge: 'bg-yellow-100 text-yellow-700' },
  { key: 'estimate_scheduled', label: 'Est. Scheduled', color: 'border-indigo-400', bg: 'bg-indigo-50', badge: 'bg-indigo-100 text-indigo-700' },
  { key: 'estimate_completed', label: 'Est. Completed', color: 'border-purple-400', bg: 'bg-purple-50', badge: 'bg-purple-100 text-purple-700' },
  { key: 'job_booked', label: 'Job Booked', color: 'border-emerald-400', bg: 'bg-emerald-50', badge: 'bg-emerald-100 text-emerald-700' },
  { key: 'in_progress', label: 'In Progress', color: 'border-orange-400', bg: 'bg-orange-50', badge: 'bg-orange-100 text-orange-700' },
  { key: 'completed', label: 'Completed', color: 'border-green-400', bg: 'bg-green-50', badge: 'bg-green-100 text-green-700' },
  { key: 'closed_lost', label: 'Closed/Lost', color: 'border-red-400', bg: 'bg-red-50', badge: 'bg-red-100 text-red-700' },
]

export default function PipelinePage() {
  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(true)
  const [draggingId, setDraggingId] = useState(null)
  const [dragOverCol, setDragOverCol] = useState(null)
  const [moveModal, setMoveModal] = useState(null) // for mobile tap-to-move
  const [successMsg, setSuccessMsg] = useState('')
  const scrollRef = useRef(null)

  useEffect(() => {
    fetchSubmissions()
  }, [])

  const fetchSubmissions = async () => {
    try {
      const response = await fetch('/api/contact')
      const result = await response.json()
      if (result.data) setSubmissions(result.data)
    } catch (error) {
      console.error('Failed to fetch:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (contactId, newStatus, oldStatus) => {
    // Optimistic update
    setSubmissions(prev => prev.map(s => s.id === contactId ? { ...s, status: newStatus } : s))

    try {
      await fetch('/api/contact', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: contactId, status: newStatus }),
      })

      await fetch('/api/admin/activity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contact_id: contactId,
          action: 'status_change',
          old_value: oldStatus,
          new_value: newStatus,
        }),
      })

      setSuccessMsg('Moved to ' + COLUMNS.find(c => c.key === newStatus)?.label)
      setTimeout(() => setSuccessMsg(''), 2000)
    } catch (err) {
      // Revert on error
      setSubmissions(prev => prev.map(s => s.id === contactId ? { ...s, status: oldStatus } : s))
      console.error('Failed to update:', err)
    }
  }

  // Drag handlers
  const handleDragStart = (e, id) => {
    setDraggingId(id)
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', id)
  }

  const handleDragOver = (e, colKey) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    setDragOverCol(colKey)
  }

  const handleDragLeave = () => {
    setDragOverCol(null)
  }

  const handleDrop = (e, colKey) => {
    e.preventDefault()
    setDragOverCol(null)
    const id = e.dataTransfer.getData('text/plain')
    const contact = submissions.find(s => s.id === id)
    if (contact && contact.status !== colKey) {
      updateStatus(id, colKey, contact.status)
    }
    setDraggingId(null)
  }

  const handleDragEnd = () => {
    setDraggingId(null)
    setDragOverCol(null)
  }

  // Mobile tap-to-move
  const handleCardTap = (contact) => {
    setMoveModal(contact)
  }

  const handleMobileMove = (newStatus) => {
    if (moveModal && moveModal.status !== newStatus) {
      updateStatus(moveModal.id, newStatus, moveModal.status)
    }
    setMoveModal(null)
  }

  const formatPhone = (phone) => {
    if (!phone) return ''
    const cleaned = phone.replace(/\D/g, '')
    if (cleaned.length === 10) return '(' + cleaned.slice(0, 3) + ') ' + cleaned.slice(3, 6) + '-' + cleaned.slice(6)
    if (cleaned.length === 11 && cleaned[0] === '1') return '(' + cleaned.slice(1, 4) + ') ' + cleaned.slice(4, 7) + '-' + cleaned.slice(7)
    return phone
  }

  const timeAgo = (dateString) => {
    const seconds = Math.floor((Date.now() - new Date(dateString)) / 1000)
    if (seconds < 3600) return Math.floor(seconds / 60) + 'm'
    if (seconds < 86400) return Math.floor(seconds / 3600) + 'h'
    return Math.floor(seconds / 86400) + 'd'
  }

  const getUrgencyDot = (contact) => {
    if (!['new', 'contacted'].includes(contact.status)) return null
    const hours = (Date.now() - new Date(contact.created_at)) / (1000 * 60 * 60)
    if (hours > 24) return 'bg-red-500'
    if (hours > 1) return 'bg-yellow-500'
    return 'bg-green-500'
  }

  // Pipeline value
  const pipelineValue = submissions
    .filter(s => ['job_booked', 'in_progress'].includes(s.status) && s.quoted_amount)
    .reduce((sum, s) => sum + Number(s.quoted_amount), 0)

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-10 h-10 border-4 border-[#115997] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="py-4 sm:py-8">
      {/* Header */}
      <div className="px-4 flex items-center justify-between mb-4 sm:mb-6">
        <div>
          <h2 className="text-lg sm:text-2xl font-bold text-[#273373]">Pipeline Board</h2>
          <p className="text-gray-500 text-xs sm:text-sm">
            {submissions.length} leads · {pipelineValue > 0 ? '$' + pipelineValue.toLocaleString() + ' pipeline' : 'Drag cards to update status'}
          </p>
        </div>
        <Link
          href="/admin/contacts"
          className="px-3 py-1.5 text-xs font-medium text-[#115997] bg-[#115997]/10 rounded-lg hover:bg-[#115997]/20 transition-colors"
        >
          List View
        </Link>
      </div>

      {/* Success message */}
      {successMsg && (
        <div className="px-4 mb-4">
          <div className="rounded-xl p-3 text-sm bg-green-50 border border-green-200 text-green-700 flex items-center gap-2">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {successMsg}
          </div>
        </div>
      )}

      {/* Kanban Board */}
      <div
        ref={scrollRef}
        className="overflow-x-auto px-4 pb-4 scrollbar-hide"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        <div className="flex gap-3 min-w-max">
          {COLUMNS.map((col) => {
            const cards = submissions.filter(s => s.status === col.key)
            const colValue = cards.filter(c => c.quoted_amount).reduce((sum, c) => sum + Number(c.quoted_amount), 0)

            return (
              <div
                key={col.key}
                className={'flex flex-col w-[260px] sm:w-[280px] rounded-xl transition-colors ' +
                  (dragOverCol === col.key ? 'bg-[#115997]/5 ring-2 ring-[#115997]/20' : 'bg-gray-100/80')}
                onDragOver={(e) => handleDragOver(e, col.key)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, col.key)}
              >
                {/* Column header */}
                <div className={'px-3 py-2.5 border-t-2 rounded-t-xl ' + col.color}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold text-gray-800">{col.label}</h3>
                      <span className={'text-[10px] font-bold px-1.5 py-0.5 rounded-full ' + col.badge}>
                        {cards.length}
                      </span>
                    </div>
                    {colValue > 0 && (
                      <span className="text-[10px] font-medium text-gray-500">${colValue.toLocaleString()}</span>
                    )}
                  </div>
                </div>

                {/* Cards */}
                <div className="flex-1 p-2 space-y-2 min-h-[100px] max-h-[calc(100vh-220px)] overflow-y-auto scrollbar-hide">
                  {cards.length === 0 && (
                    <div className="flex items-center justify-center h-20 text-gray-300 text-xs">
                      No leads
                    </div>
                  )}

                  {cards
                    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                    .map((contact) => {
                      const urgencyDot = getUrgencyDot(contact)

                      return (
                        <div
                          key={contact.id}
                          draggable
                          onDragStart={(e) => handleDragStart(e, contact.id)}
                          onDragEnd={handleDragEnd}
                          className={'bg-white rounded-lg p-3 shadow-sm border border-gray-100 cursor-grab active:cursor-grabbing transition-all hover:shadow-md ' +
                            (draggingId === contact.id ? 'opacity-40 scale-95' : 'opacity-100')}
                        >
                          {/* Mobile: tap to move */}
                          <div className="sm:hidden absolute inset-0" onClick={() => handleCardTap(contact)} />

                          <div className="flex items-start justify-between mb-1.5">
                            <div className="flex items-center gap-1.5 min-w-0">
                              {urgencyDot && <div className={'w-1.5 h-1.5 rounded-full flex-shrink-0 ' + urgencyDot} />}
                              <Link
                                href={'/admin/contacts/' + contact.id}
                                className="font-semibold text-sm text-gray-900 truncate hover:text-[#115997]"
                                onClick={(e) => e.stopPropagation()}
                              >
                                {contact.name}
                              </Link>
                            </div>
                            <span className="text-[10px] text-gray-400 flex-shrink-0 ml-2">{timeAgo(contact.created_at)}</span>
                          </div>

                          <p className="text-xs text-gray-500 mb-1.5 truncate">{contact.service_type}</p>

                          <div className="flex items-center justify-between">
                            <a
                              href={'tel:' + contact.phone}
                              className="text-[11px] text-[#115997] font-medium hover:underline"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {formatPhone(contact.phone)}
                            </a>
                            {contact.quoted_amount && (
                              <span className="text-[11px] font-semibold text-gray-700">
                                ${Number(contact.quoted_amount).toLocaleString()}
                              </span>
                            )}
                          </div>

                          {contact.scheduled_date && (
                            <div className="mt-1.5 flex items-center gap-1 text-[10px] text-gray-400">
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              {new Date(contact.scheduled_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                              {contact.scheduled_time && ' · ' + contact.scheduled_time}
                            </div>
                          )}
                        </div>
                      )
                    })}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Mobile Move Modal */}
      {moveModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center sm:hidden" onClick={() => setMoveModal(null)}>
          <div className="bg-white rounded-t-2xl w-full max-h-[70vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-4 border-b border-gray-100">
              <div className="w-8 h-1 bg-gray-300 rounded-full mx-auto mb-3" />
              <p className="font-semibold text-gray-900">{moveModal.name}</p>
              <p className="text-xs text-gray-500">{moveModal.service_type}</p>
            </div>
            <div className="p-2">
              {COLUMNS.map((col) => (
                <button
                  key={col.key}
                  onClick={() => handleMobileMove(col.key)}
                  className={'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ' +
                    (moveModal.status === col.key ? col.bg + ' ring-1 ring-inset ring-gray-200' : 'hover:bg-gray-50 active:bg-gray-100')}
                >
                  <div className={'w-2.5 h-2.5 rounded-full border-2 ' + col.color.replace('border-', 'border-')} />
                  <span className={'text-sm font-medium ' + (moveModal.status === col.key ? 'text-gray-900' : 'text-gray-600')}>
                    {col.label}
                  </span>
                  {moveModal.status === col.key && (
                    <svg className="w-4 h-4 text-[#115997] ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
            <div className="p-4 border-t border-gray-100">
              <Link
                href={'/admin/contacts/' + moveModal.id}
                className="block w-full text-center py-2.5 text-sm font-medium text-[#115997] bg-[#115997]/10 rounded-lg"
                onClick={() => setMoveModal(null)}
              >
                Open Lead Details →
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}