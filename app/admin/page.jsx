'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAdminAuth } from './layout'

export default function DashboardPage() {
  const { user } = useAdminAuth()
  const [loading, setLoading] = useState(true)
  const [activeCrew, setActiveCrew] = useState([])
  const [todayJobs, setTodayJobs] = useState([])
  const [recentRequests, setRecentRequests] = useState([])
  const [upcomingCalendar, setUpcomingCalendar] = useState([])
  const [stats, setStats] = useState({ totalCrew: 0, clockedIn: 0, jobsActive: 0, requestsNew: 0, requestsTotal: 0, revenue: 0, profit: 0 })

  useEffect(() => { if (user) fetchDashboard() }, [user])

  const fetchDashboard = async () => {
    try {
      const today = new Date().toISOString().split('T')[0]

      // Fetch everything in parallel
      const fetches = await Promise.all([
        fetch('/api/admin/users').then(r => r.json()).catch(() => ({ users: [] })),
        fetch('/api/admin/jobs').then(r => r.json()).catch(() => ({ jobs: [] })),
        fetch('/api/admin/job-crew/bulk').then(r => r.json()).catch(() => ({ by_job: {}, by_user: {} })),
        fetch(`/api/admin/timesheets?start=${today}T00:00:00.000Z&end=${today}T23:59:59.999Z`).then(r => r.json()).catch(() => ({ entries: [], users: [] })),
        fetch('/api/contact').then(r => r.json()).catch(() => ({ data: [] })),
      ])

      const [usersData, jobsData, crewData, timesheetsData, contactsData] = fetches
      const activeUsers = (usersData.users || []).filter(u => u.is_active)
      const allJobs = jobsData.jobs || []
      const todayEntries = timesheetsData.entries || []
      const contacts = contactsData.data || []

      // ---- ACTIVE CREW (who's clocked in now) ----
      const clockedInUserIds = new Set(todayEntries.filter(e => !e.clock_out).map(e => e.user_id))
      const active = activeUsers
        .filter(u => clockedInUserIds.has(u.id))
        .map(u => {
          const entry = todayEntries.find(e => e.user_id === u.id && !e.clock_out)
          return { ...u, entry }
        })
      setActiveCrew(active)

      // ---- TODAY'S JOBS (from schedule) ----
      const jobMap = {}
      allJobs.forEach(j => { jobMap[j.id] = j })
      const todayScheduled = []
      const seenJobIds = new Set()
      const byUser = crewData.by_user || {}
      Object.entries(byUser).forEach(([userId, assignments]) => {
        assignments.forEach(a => {
          if (seenJobIds.has(a.job_id)) return
          const job = jobMap[a.job_id]
          if (!job || !job.date_start) return
          const end = job.date_end || job.date_start
          if (today >= job.date_start && today <= end && job.status !== 'completed' && job.status !== 'cancelled') {
            seenJobIds.add(a.job_id)
            todayScheduled.push({ ...job, crew: (crewData.by_job || {})[a.job_id] || [] })
          }
        })
      })
      setTodayJobs(todayScheduled)

      // ---- RECENT REQUESTS (last 10, any status) ----
      const recent = contacts.slice(0, 10)
      setRecentRequests(recent)

      // ---- UPCOMING CALENDAR (next 7 days with scheduled dates) ----
      const weekEnd = new Date()
      weekEnd.setDate(weekEnd.getDate() + 7)
      const weekEndStr = weekEnd.toISOString().split('T')[0]
      const upcoming = contacts
        .filter(c => c.scheduled_date && c.scheduled_date >= today && c.scheduled_date <= weekEndStr)
        .sort((a, b) => a.scheduled_date.localeCompare(b.scheduled_date))
        .slice(0, 8)
      setUpcomingCalendar(upcoming)

      // ---- STATS ----
      const n = (v) => parseFloat(v) || 0
      const totalRevenue = allJobs.reduce((s, j) => s + n(j.revenue), 0)
      const totalExpense = allJobs.reduce((s, j) => s + n(j.labor) + n(j.material) + n(j.gas) + n(j.misc), 0)

      setStats({
        totalCrew: activeUsers.filter(u => u.role === 'member').length,
        clockedIn: active.length,
        jobsActive: allJobs.filter(j => j.status === 'active' || !j.status).length,
        requestsNew: contacts.filter(c => c.status === 'new').length,
        requestsTotal: contacts.length,
        revenue: totalRevenue,
        profit: totalRevenue - totalExpense,
      })
    } catch (e) { console.error('Dashboard error:', e) }
    finally { setLoading(false) }
  }

  const formatTime = (ts) => ts ? new Date(ts).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }) : ''
  const formatPhone = (p) => { if (!p || p === '0000000000') return ''; const c = p.replace(/\D/g, ''); if (c.length === 10) return '(' + c.slice(0,3) + ') ' + c.slice(3,6) + '-' + c.slice(6); return p }
  const timeAgo = (d) => { const s = Math.floor((Date.now() - new Date(d)) / 1000); if (s < 60) return 'just now'; if (s < 3600) return Math.floor(s/60) + 'm ago'; if (s < 86400) return Math.floor(s/3600) + 'h ago'; return Math.floor(s/86400) + 'd ago' }
  const elapsed = (clockIn) => { const s = Math.floor((Date.now() - new Date(clockIn)) / 1000); const h = Math.floor(s/3600); const m = Math.floor((s%3600)/60); return h > 0 ? `${h}h ${m}m` : `${m}m` }
  const fmtMoney = (v) => '$' + Math.abs(v).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })

  const statusBadge = (status) => {
    const map = { new: 'bg-blue-100 text-blue-700', contacted: 'bg-yellow-100 text-yellow-700', estimate_sent: 'bg-indigo-100 text-indigo-700', booked: 'bg-emerald-100 text-emerald-700', done: 'bg-green-100 text-green-700', lost: 'bg-red-100 text-red-700' }
    return map[status] || 'bg-gray-100 text-gray-600'
  }
  const statusLabel = (status) => {
    const map = { new: 'New', contacted: 'Contacted', estimate_sent: 'Estimate', booked: 'Booked', done: 'Done', lost: 'Lost' }
    return map[status] || status
  }

  if (loading) return <div className="flex items-center justify-center min-h-[50vh]"><div className="w-10 h-10 border-4 border-[#115997] border-t-transparent rounded-full animate-spin" /></div>

  return (
    <div className="px-4 py-4 sm:py-8">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-lg sm:text-2xl font-bold text-[#273373]">
          Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 17 ? 'afternoon' : 'evening'}, {user?.name?.split(' ')[0]}
        </h2>
        <p className="text-gray-500 text-xs sm:text-sm">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <Link href="/admin/timesheets" className="bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow">
          <p className="text-[10px] text-gray-500 uppercase tracking-wide">Crew Active</p>
          <p className="text-2xl font-bold text-emerald-600">{stats.clockedIn}<span className="text-sm text-gray-400 font-normal">/{stats.totalCrew}</span></p>
        </Link>
        <Link href="/admin/jobs" className="bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow">
          <p className="text-[10px] text-gray-500 uppercase tracking-wide">Active Jobs</p>
          <p className="text-2xl font-bold text-[#115997]">{stats.jobsActive}</p>
        </Link>
        <Link href="/admin/contacts" className="bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow">
          <p className="text-[10px] text-gray-500 uppercase tracking-wide">Requests</p>
          <p className="text-2xl font-bold text-amber-600">{stats.requestsNew} <span className="text-sm text-gray-400 font-normal">new</span></p>
        </Link>
        <Link href="/admin/jobs" className="bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow">
          <p className="text-[10px] text-gray-500 uppercase tracking-wide">Revenue / Profit</p>
          <p className="text-lg font-bold text-green-600">{fmtMoney(stats.revenue)}</p>
          <p className={'text-xs font-semibold ' + (stats.profit >= 0 ? 'text-emerald-500' : 'text-red-500')}>{fmtMoney(stats.profit)} profit</p>
        </Link>
      </div>

      <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">

        {/* Active Crew */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <h3 className="font-semibold text-gray-900 text-sm">Active Crew</h3>
            </div>
            <Link href="/admin/timesheets" className="text-xs text-[#115997] font-medium">Timesheets</Link>
          </div>
          {activeCrew.length === 0 ? (
            <div className="p-6 text-center">
              <p className="text-sm text-gray-400">Nobody clocked in right now</p>
              <p className="text-xs text-gray-300 mt-1">{stats.totalCrew} crew members total</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {activeCrew.map(u => (
                <div key={u.id} className="px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ backgroundColor: u.color || '#115997' }}>
                        <span className="text-white font-bold text-sm">{u.name?.charAt(0)}</span>
                      </div>
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 border-white rounded-full" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{u.name}</p>
                      <p className="text-xs text-gray-500">
                        {u.entry?.entry_type === 'job' && u.entry?.job_address ? u.entry.job_address : 'General'}
                        {' · since '}{formatTime(u.entry?.clock_in)}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-emerald-600 tabular-nums">{elapsed(u.entry?.clock_in)}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Today's Jobs */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-semibold text-gray-900 text-sm">Today&apos;s Jobs</h3>
            <Link href="/admin/schedule" className="text-xs text-[#115997] font-medium">Schedule</Link>
          </div>
          {todayJobs.length === 0 ? (
            <div className="p-6 text-center">
              <p className="text-sm text-gray-400">No jobs scheduled today</p>
              <Link href="/admin/schedule" className="text-xs text-[#115997] font-medium mt-2 inline-block">Open schedule</Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {todayJobs.map(j => (
                <div key={j.id} className="px-4 py-3">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className="text-sm font-medium text-gray-900 truncate">{j.address}</p>
                    {j.client && <span className="text-xs text-gray-400 flex-shrink-0">{j.client}</span>}
                  </div>
                  {j.crew && j.crew.length > 0 && (
                    <div className="flex items-center gap-1 flex-wrap">
                      {j.crew.map(c => (
                        <div key={c.id} className="flex items-center gap-1 bg-gray-50 rounded-full pl-0.5 pr-2 py-0.5">
                          <div className="w-4 h-4 rounded-full flex items-center justify-center" style={{ backgroundColor: c.user_color || '#115997' }}>
                            <span className="text-white text-[7px] font-bold">{c.user_name?.charAt(0)}</span>
                          </div>
                          <span className="text-[10px] text-gray-600">{c.user_name?.split(' ')[0]}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {(!j.crew || j.crew.length === 0) && (
                    <p className="text-[11px] text-amber-500">No crew assigned</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Requests */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-semibold text-gray-900 text-sm">Recent Requests</h3>
            <Link href="/admin/contacts" className="text-xs text-[#115997] font-medium">View all ({stats.requestsTotal})</Link>
          </div>
          {recentRequests.length === 0 ? (
            <div className="p-6 text-center"><p className="text-sm text-gray-400">No requests yet</p></div>
          ) : (
            <div className="divide-y divide-gray-50">
              {recentRequests.map(req => (
                <Link key={req.id} href={'/admin/contacts/' + req.id} className="px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-gray-900 truncate">{req.name}</p>
                      <span className={`text-[9px] font-medium px-1.5 py-0.5 rounded-full ${statusBadge(req.status)}`}>{statusLabel(req.status)}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{req.service_type}{formatPhone(req.phone) ? ' · ' + formatPhone(req.phone) : ''}</p>
                  </div>
                  <span className="text-[10px] text-gray-400 flex-shrink-0 ml-2">{timeAgo(req.created_at)}</span>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Upcoming Estimates & Jobs */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-semibold text-gray-900 text-sm">Upcoming This Week</h3>
            <Link href="/admin/calendar" className="text-xs text-[#115997] font-medium">Calendar</Link>
          </div>
          {upcomingCalendar.length === 0 ? (
            <div className="p-6 text-center">
              <p className="text-sm text-gray-400">Nothing scheduled this week</p>
              <Link href="/admin/calendar" className="text-xs text-[#115997] font-medium mt-2 inline-block">Open calendar</Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {upcomingCalendar.map(est => {
                const schedDate = new Date(est.scheduled_date + 'T00:00:00')
                const isToday = est.scheduled_date === new Date().toISOString().split('T')[0]
                const isTomorrow = (() => { const t = new Date(); t.setDate(t.getDate() + 1); return est.scheduled_date === t.toISOString().split('T')[0] })()
                return (
                  <Link key={est.id} href={'/admin/contacts/' + est.id} className="px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900 truncate">{est.name}</p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {est.service_type}
                        {est.scheduled_time ? ` · ${est.scheduled_time}` : ''}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0 ml-2">
                      <p className={`text-xs font-semibold ${isToday ? 'text-emerald-600' : isTomorrow ? 'text-[#115997]' : 'text-gray-700'}`}>
                        {isToday ? 'Today' : isTomorrow ? 'Tomorrow' : schedDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                      </p>
                      <span className={`text-[9px] font-medium px-1.5 py-0.5 rounded-full ${statusBadge(est.status)}`}>{statusLabel(est.status)}</span>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Quick Links */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Link href="/admin/schedule" className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow text-center">
          <svg className="w-6 h-6 text-[#115997] mx-auto mb-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
          <p className="text-xs font-medium text-gray-700">Schedule</p>
        </Link>
        <Link href="/admin/jobs" className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow text-center">
          <svg className="w-6 h-6 text-[#115997] mx-auto mb-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
          <p className="text-xs font-medium text-gray-700">Jobs</p>
        </Link>
        <Link href="/admin/expenses" className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow text-center">
          <svg className="w-6 h-6 text-[#115997] mx-auto mb-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
          <p className="text-xs font-medium text-gray-700">Expenses</p>
        </Link>
        <Link href="/admin/users" className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow text-center">
          <svg className="w-6 h-6 text-[#115997] mx-auto mb-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
          <p className="text-xs font-medium text-gray-700">Users</p>
        </Link>
      </div>
    </div>
  )
}