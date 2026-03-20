'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const STATUS_LABELS = {
  new: 'New', contacted: 'Contacted', estimate_scheduled: 'Est. Scheduled', estimate_completed: 'Est. Completed',
  job_booked: 'Job Booked', in_progress: 'In Progress', completed: 'Completed', closed_lost: 'Closed/Lost',
}
const STATUS_COLORS = {
  new: 'bg-blue-100 text-blue-700', contacted: 'bg-yellow-100 text-yellow-700', estimate_scheduled: 'bg-indigo-100 text-indigo-700',
  estimate_completed: 'bg-purple-100 text-purple-700', job_booked: 'bg-emerald-100 text-emerald-700', in_progress: 'bg-orange-100 text-orange-700',
  completed: 'bg-green-100 text-green-700', closed_lost: 'bg-red-100 text-red-700',
}
const PIPELINE_BARS = [
  { key: 'new', label: 'New', color: 'bg-blue-500' },
  { key: 'contacted', label: 'Contacted', color: 'bg-yellow-500' },
  { key: 'estimate_scheduled', label: 'Est. Scheduled', color: 'bg-indigo-500' },
  { key: 'estimate_completed', label: 'Est. Completed', color: 'bg-purple-500' },
  { key: 'job_booked', label: 'Job Booked', color: 'bg-emerald-500' },
  { key: 'in_progress', label: 'In Progress', color: 'bg-orange-500' },
  { key: 'completed', label: 'Completed', color: 'bg-green-500' },
]

export default function AdminDashboard() {
  const [submissions, setSubmissions] = useState([])
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [followUps, setFollowUps] = useState([])

  useEffect(() => { fetchData() }, [])

  const fetchData = async () => {
    try {
      const response = await fetch('/api/contact')
      const result = await response.json()
      if (result.data) {
        const all = result.data
        setSubmissions(all)
        const now = new Date()
        const counts = {}
        for (const key of Object.keys(STATUS_LABELS)) counts[key] = all.filter(s => s.status === key).length

        setStats({
          total: all.length, ...counts,
          thisWeek: all.filter(s => new Date(s.created_at) >= new Date(now.getTime() - 7 * 864e5)).length,
        })

        // Only show follow-ups for leads that have a next_follow_up date set and it's due
        setFollowUps(all.filter(s => {
          if (['closed_lost', 'completed'].includes(s.status)) return false
          if (s.next_follow_up) {
            const f = new Date(s.next_follow_up)
            f.setHours(0, 0, 0, 0)
            const t = new Date()
            t.setHours(0, 0, 0, 0)
            if (f <= t) return true
          }
          return false
        }).sort((a, b) => new Date(a.next_follow_up) - new Date(b.next_follow_up)))
      }
    } catch (error) { console.error('Failed to fetch:', error) }
    finally { setLoading(false) }
  }

  const formatDateShort = (d) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  const formatPhone = (phone) => { if (!phone) return ''; const c = phone.replace(/\D/g, ''); if (c.length === 10) return '(' + c.slice(0,3) + ') ' + c.slice(3,6) + '-' + c.slice(6); if (c.length === 11 && c[0] === '1') return '(' + c.slice(1,4) + ') ' + c.slice(4,7) + '-' + c.slice(7); return phone }

  if (loading) return <div className="flex items-center justify-center min-h-[50vh]"><div className="w-10 h-10 border-4 border-[#115997] border-t-transparent rounded-full animate-spin" /></div>

  return (
    <div className="px-4 py-4 sm:py-8">
      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="bg-white rounded-xl p-4 sm:p-5 shadow-sm">
            <p className="text-gray-500 text-xs sm:text-sm">Total Leads</p>
            <p className="text-2xl sm:text-3xl font-bold text-[#273373] mt-1">{stats.total}</p>
          </div>
          <div className="bg-white rounded-xl p-4 sm:p-5 shadow-sm">
            <p className="text-gray-500 text-xs sm:text-sm">New Leads</p>
            <p className="text-2xl sm:text-3xl font-bold text-blue-600 mt-1">{stats.new}</p>
          </div>
          <div className="bg-white rounded-xl p-4 sm:p-5 shadow-sm">
            <p className="text-gray-500 text-xs sm:text-sm">This Week</p>
            <p className="text-2xl sm:text-3xl font-bold text-[#115997] mt-1">{stats.thisWeek}</p>
          </div>
          <div className="bg-white rounded-xl p-4 sm:p-5 shadow-sm">
            <p className="text-gray-500 text-xs sm:text-sm">Follow-ups Due</p>
            <p className="text-2xl sm:text-3xl font-bold text-amber-600 mt-1">{followUps.length}</p>
          </div>
        </div>
      )}

      {/* Today's Schedule */}
      {(() => {
        const todayStr = new Date().toISOString().split('T')[0]
        const todayEvents = submissions.filter(s => s.scheduled_date === todayStr)
        if (todayEvents.length === 0) return null
        return (
          <div className="bg-white rounded-xl shadow-sm mb-6 sm:mb-8 overflow-hidden">
            <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#115997]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                <h2 className="text-base sm:text-lg font-semibold text-gray-800">Today&apos;s Schedule</h2>
                <span className="text-gray-400 text-sm">({todayEvents.length})</span>
              </div>
              <Link href="/admin/calendar" className="text-sm text-[#115997] font-medium hover:underline">Full calendar →</Link>
            </div>
            <div className="divide-y divide-gray-100">
              {todayEvents.map((item) => (
                <Link key={item.id} href={'/admin/contacts/' + item.id} className="flex items-center justify-between p-4 sm:px-6 hover:bg-gray-50 transition-colors">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="font-semibold text-gray-900 text-sm truncate">{item.name}</p>
                      <span className={'inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium ' + (STATUS_COLORS[item.status] || 'bg-gray-100 text-gray-700')}>{STATUS_LABELS[item.status] || item.status}</span>
                    </div>
                    <p className="text-xs text-gray-500">{item.scheduled_time && item.scheduled_time + ' · '}{item.service_type} · {formatPhone(item.phone)}</p>
                  </div>
                  <svg className="w-4 h-4 text-gray-400 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </Link>
              ))}
            </div>
          </div>
        )
      })()}

      {/* Recent Submissions — FIRST */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6 sm:mb-8">
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-semibold text-gray-800">Recent Submissions</h2>
          <Link href="/admin/contacts" className="text-sm text-[#115997] font-medium hover:underline">View all →</Link>
        </div>
        {submissions.length === 0 ? (
          <div className="p-8 text-center"><p className="text-gray-500">No submissions yet</p></div>
        ) : (
          <div className="divide-y divide-gray-100">
            {submissions.slice(0, 10).map((s) => (
              <Link key={s.id} href={'/admin/contacts/' + s.id} className="flex items-center justify-between p-4 sm:px-6 hover:bg-gray-50 transition-colors">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-gray-900 text-sm truncate">{s.name}</p>
                    <span className={'inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium ' + (STATUS_COLORS[s.status] || 'bg-gray-100 text-gray-700')}>{STATUS_LABELS[s.status] || s.status}</span>
                  </div>
                  <p className="text-xs text-gray-500">{s.service_type} · {formatDateShort(s.created_at)}</p>
                </div>
                <svg className="w-4 h-4 text-gray-400 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Needs Attention — AFTER recent submissions, only shows if follow-ups are due */}
      {followUps.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm mb-6 sm:mb-8 overflow-hidden">
          <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-100 flex items-center gap-2">
            <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
            <h2 className="text-base sm:text-lg font-semibold text-gray-800">Follow-ups Due</h2>
            <span className="text-gray-400 text-sm">({followUps.length})</span>
          </div>
          <div className="divide-y divide-gray-100">
            {followUps.slice(0, 5).map((item) => (
              <Link key={item.id} href={'/admin/contacts/' + item.id} className="flex items-center justify-between p-4 sm:px-6 hover:bg-gray-50 transition-colors">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-gray-900 text-sm truncate">{item.name}</p>
                    <span className={'inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium ' + (STATUS_COLORS[item.status] || 'bg-gray-100 text-gray-700')}>{STATUS_LABELS[item.status] || item.status}</span>
                  </div>
                  <p className="text-xs text-amber-600">Follow-up scheduled for {new Date(item.next_follow_up).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{item.service_type} · {formatPhone(item.phone)}</p>
                </div>
                <svg className="w-4 h-4 text-gray-400 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
            ))}
          </div>
          {followUps.length > 5 && <Link href="/admin/contacts" className="block text-center text-sm text-[#115997] font-medium py-3 border-t border-gray-100 hover:bg-gray-50">View all {followUps.length} →</Link>}
        </div>
      )}

      {/* Pipeline Overview */}
      {stats && stats.total > 0 && (
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
          <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">Pipeline</h2>
          <div className="space-y-3">
            {PIPELINE_BARS.map((stage) => (
              <div key={stage.key} className="flex items-center gap-3">
                <p className="text-sm text-gray-600 w-28 flex-shrink-0">{stage.label}</p>
                <div className="flex-1 bg-gray-100 rounded-full h-3 overflow-hidden">
                  <div className={stage.color + ' h-full rounded-full transition-all duration-500'} style={{ width: stats.total > 0 ? Math.max(((stats[stage.key] || 0) / stats.total) * 100, stats[stage.key] > 0 ? 4 : 0) + '%' : '0%' }} />
                </div>
                <p className="text-sm font-semibold text-gray-800 w-8 text-right">{stats[stage.key] || 0}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}