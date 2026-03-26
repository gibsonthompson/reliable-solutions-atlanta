'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAdminAuth } from './layout'

const STATUS_LABELS = { new: 'New', contacted: 'Contacted', estimate_sent: 'Estimate Sent', booked: 'Booked', done: 'Done', lost: 'Lost' }
const STATUS_COLORS = { new: 'bg-blue-100 text-blue-700', contacted: 'bg-yellow-100 text-yellow-700', estimate_sent: 'bg-indigo-100 text-indigo-700', booked: 'bg-emerald-100 text-emerald-700', done: 'bg-green-100 text-green-700', lost: 'bg-red-100 text-red-700' }

export default function AdminDashboard() {
  const { user, hasPermission } = useAdminAuth()
  const isAdmin = user?.role === 'admin'
  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { if (user) fetchData() }, [user])

  const fetchData = async () => {
    try {
      const params = user.role === 'member' ? `?user_id=${user.id}&user_role=member` : ''
      const r = await fetch('/api/contact' + params); const res = await r.json()
      if (res.data) setSubmissions(res.data)
    } catch (e) { console.error('Failed to fetch:', e) }
    finally { setLoading(false) }
  }

  const todayStr = new Date().toISOString().split('T')[0]
  const now = new Date()
  const weekAgo = new Date(now.getTime() - 7 * 864e5)
  const todayEvents = submissions.filter(s => s.scheduled_date === todayStr)
  const newLeads = submissions.filter(s => s.status === 'new')
  const activeJobs = submissions.filter(s => s.status === 'booked')
  const doneThisWeek = submissions.filter(s => s.status === 'done' && new Date(s.updated_at) >= weekAgo)
  const newThisWeek = submissions.filter(s => new Date(s.created_at) >= weekAgo)

  // Needs attention: overdue follow-ups, stale new leads, old estimates
  const needsAttention = submissions.filter(s => {
    if (['done', 'lost'].includes(s.status)) return false
    // Overdue follow-up
    if (s.next_follow_up) { const f = new Date(s.next_follow_up); f.setHours(0,0,0,0); const t = new Date(); t.setHours(0,0,0,0); if (f <= t) return true }
    // New lead older than 1 hour
    if (s.status === 'new' && (Date.now() - new Date(s.created_at)) / 36e5 > 1) return true
    // Estimate sent 3+ days ago, no response
    if (s.status === 'estimate_sent' && (Date.now() - new Date(s.updated_at)) / 864e5 > 3) return true
    return false
  }).sort((a, b) => {
    // Sort by urgency: new leads first, then overdue follow-ups, then stale estimates
    const aScore = a.status === 'new' ? 0 : a.next_follow_up ? 1 : 2
    const bScore = b.status === 'new' ? 0 : b.next_follow_up ? 1 : 2
    return aScore - bScore
  })

  // Next lead to call (highest priority new lead)
  const nextLead = newLeads.sort((a, b) => new Date(a.created_at) - new Date(b.created_at))[0]

  const formatPhone = (phone) => { if (!phone) return ''; const c = phone.replace(/\D/g, ''); if (c.length === 10) return '(' + c.slice(0,3) + ') ' + c.slice(3,6) + '-' + c.slice(6); if (c.length === 11 && c[0] === '1') return '(' + c.slice(1,4) + ') ' + c.slice(4,7) + '-' + c.slice(7); return phone }
  const formatDateShort = (d) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  const timeAgo = (d) => { const s = Math.floor((Date.now() - new Date(d)) / 1000); if (s < 3600) return Math.floor(s/60) + 'm ago'; if (s < 86400) return Math.floor(s/3600) + 'h ago'; return Math.floor(s/86400) + 'd ago' }
  const getAttentionReason = (s) => {
    if (s.status === 'new') { const h = Math.floor((Date.now() - new Date(s.created_at)) / 36e5); return { text: 'New lead — ' + h + 'h old, needs a call', color: h > 24 ? 'text-red-600' : 'text-amber-600' } }
    if (s.next_follow_up) return { text: 'Follow-up overdue since ' + formatDateShort(s.next_follow_up), color: 'text-amber-600' }
    if (s.status === 'estimate_sent') { const d = Math.floor((Date.now() - new Date(s.updated_at)) / 864e5); return { text: 'Estimate sent ' + d + 'd ago — no response', color: 'text-indigo-600' } }
    return { text: '', color: '' }
  }

  if (loading) return <div className="flex items-center justify-center min-h-[50vh]"><div className="w-10 h-10 border-4 border-[#115997] border-t-transparent rounded-full animate-spin" /></div>

  return (
    <div className="px-4 py-4 sm:py-8">
      {/* Welcome */}
      <div className="mb-6">
        <h2 className="text-lg sm:text-2xl font-bold text-[#273373]">Welcome back, {user?.name?.split(' ')[0]}</h2>
        <p className="text-gray-500 text-xs sm:text-sm">{now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {hasPermission('calendar') && (
          <Link href="/admin/calendar" className="bg-white rounded-xl p-4 shadow-sm flex flex-col items-center gap-2 active:bg-gray-50 transition-colors">
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            </div>
            <span className="text-xs font-medium text-gray-700 text-center">Calendar</span>
          </Link>
        )}
        {nextLead ? (
          <button onClick={() => window.location.href = 'tel:' + nextLead.phone} className="bg-white rounded-xl p-4 shadow-sm flex flex-col items-center gap-2 active:bg-gray-50 transition-colors">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center relative">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center"><span className="text-white text-[8px] font-bold">{newLeads.length}</span></div>
            </div>
            <span className="text-xs font-medium text-gray-700 text-center">Call Lead</span>
          </button>
        ) : (
          <div className="bg-white rounded-xl p-4 shadow-sm flex flex-col items-center gap-2 opacity-50">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            </div>
            <span className="text-xs font-medium text-gray-700 text-center">All called</span>
          </div>
        )}
        {hasPermission('pipeline') ? (
          <Link href="/admin/pipeline" className="bg-white rounded-xl p-4 shadow-sm flex flex-col items-center gap-2 active:bg-gray-50 transition-colors">
            <div className="w-10 h-10 rounded-full bg-[#115997]/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-[#115997]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7" /></svg>
            </div>
            <span className="text-xs font-medium text-gray-700 text-center">Pipeline</span>
          </Link>
        ) : (
          <Link href="/admin/contacts" className="bg-white rounded-xl p-4 shadow-sm flex flex-col items-center gap-2 active:bg-gray-50 transition-colors">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>
            </div>
            <span className="text-xs font-medium text-gray-700 text-center">Requests</span>
          </Link>
        )}
      </div>

      {/* Weekly Stats */}
      <div className="grid grid-cols-4 gap-2 mb-6">
        <div className="bg-white rounded-xl p-3 shadow-sm text-center"><p className="text-lg sm:text-xl font-bold text-blue-600">{newThisWeek.length}</p><p className="text-[10px] text-gray-500">New This Week</p></div>
        <div className="bg-white rounded-xl p-3 shadow-sm text-center"><p className="text-lg sm:text-xl font-bold text-emerald-600">{activeJobs.length}</p><p className="text-[10px] text-gray-500">Active Jobs</p></div>
        <div className="bg-white rounded-xl p-3 shadow-sm text-center"><p className="text-lg sm:text-xl font-bold text-green-600">{doneThisWeek.length}</p><p className="text-[10px] text-gray-500">Done This Week</p></div>
        <div className="bg-white rounded-xl p-3 shadow-sm text-center"><p className="text-lg sm:text-xl font-bold text-amber-600">{needsAttention.length}</p><p className="text-[10px] text-gray-500">Need Attention</p></div>
      </div>

      {/* Today's Jobs */}
      {todayEvents.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm mb-6 overflow-hidden">
          <div className="px-4 sm:px-6 py-3 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2"><svg className="w-4 h-4 text-[#115997]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg><h3 className="text-sm sm:text-base font-semibold text-gray-800">Today's Jobs</h3><span className="text-gray-400 text-sm">({todayEvents.length})</span></div>
            <Link href="/admin/calendar" className="text-xs text-[#115997] font-medium">Full calendar</Link>
          </div>
          <div className="divide-y divide-gray-100">
            {todayEvents.map((item) => (
              <Link key={item.id} href={'/admin/contacts/' + item.id} className="flex items-center justify-between p-4 sm:px-6 hover:bg-gray-50 active:bg-gray-50">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-0.5"><p className="font-semibold text-gray-900 text-sm truncate">{item.name}</p><span className={'inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium ' + (STATUS_COLORS[item.status] || 'bg-gray-100 text-gray-700')}>{STATUS_LABELS[item.status] || item.status}</span></div>
                  <p className="text-xs text-gray-500">{item.scheduled_time && item.scheduled_time + ' · '}{item.service_type}</p>
                  {item.address && <p className="text-xs text-gray-400 mt-0.5">{item.address}</p>}
                </div>
                <svg className="w-4 h-4 text-gray-400 ml-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Needs Attention */}
      {needsAttention.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm mb-6 overflow-hidden">
          <div className="px-4 sm:px-6 py-3 border-b border-gray-100 flex items-center gap-2"><div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" /><h3 className="text-sm sm:text-base font-semibold text-gray-800">Needs Attention</h3><span className="text-gray-400 text-sm">({needsAttention.length})</span></div>
          <div className="divide-y divide-gray-100">
            {needsAttention.slice(0, 8).map((item) => { const reason = getAttentionReason(item); return (
              <Link key={item.id} href={'/admin/contacts/' + item.id} className="flex items-center justify-between p-4 sm:px-6 hover:bg-gray-50 active:bg-gray-50">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-0.5"><p className="font-semibold text-gray-900 text-sm truncate">{item.name}</p><span className={'inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium ' + (STATUS_COLORS[item.status] || 'bg-gray-100 text-gray-700')}>{STATUS_LABELS[item.status]}</span></div>
                  <p className={'text-xs ' + reason.color}>{reason.text}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{item.service_type} · {formatPhone(item.phone)}</p>
                </div>
                <svg className="w-4 h-4 text-gray-400 ml-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
            ) })}
          </div>
          {needsAttention.length > 8 && <Link href="/admin/contacts" className="block text-center text-xs text-[#115997] font-medium py-3 border-t border-gray-100 hover:bg-gray-50">View all {needsAttention.length}</Link>}
        </div>
      )}

      {/* Empty state */}
      {todayEvents.length === 0 && needsAttention.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm p-8 sm:p-12 text-center mb-6">
          <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          </div>
          <p className="font-semibold text-gray-800 mb-1">All clear</p>
          <p className="text-sm text-gray-500">No events today and nothing needs attention. Nice work.</p>
        </div>
      )}
    </div>
  )
}