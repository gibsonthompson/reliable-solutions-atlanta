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
  const [actionItems, setActionItems] = useState([])
  const [stats, setStats] = useState({ totalCrew: 0, clockedIn: 0, jobsActive: 0, requestsNew: 0, requestsTotal: 0, revenue: 0, profit: 0, estimatesPending: 0, jobsMissingCrew: 0, timesheetsPending: 0 })

  useEffect(() => {
    // Load DM Sans
    if (!document.querySelector('link[href*="DM+Sans"]')) {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = 'https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800&display=swap'
      document.head.appendChild(link)
    }
  }, [])

  useEffect(() => { if (user) fetchDashboard() }, [user])

  const fetchDashboard = async () => {
    try {
      const today = new Date().toISOString().split('T')[0]
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

      // Active Crew
      const clockedInUserIds = new Set(todayEntries.filter(e => !e.clock_out).map(e => e.user_id))
      const active = activeUsers.filter(u => clockedInUserIds.has(u.id)).map(u => {
        const entry = todayEntries.find(e => e.user_id === u.id && !e.clock_out)
        return { ...u, entry }
      })
      setActiveCrew(active)

      // Today's Jobs
      const jobMap = {}; allJobs.forEach(j => { jobMap[j.id] = j })
      const todayScheduled = []; const seenJobIds = new Set()
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

      // Recent requests
      setRecentRequests(contacts.slice(0, 8))

      // Upcoming
      const weekEnd = new Date(); weekEnd.setDate(weekEnd.getDate() + 7)
      const weekEndStr = weekEnd.toISOString().split('T')[0]
      setUpcomingCalendar(contacts.filter(c => c.scheduled_date && c.scheduled_date >= today && c.scheduled_date <= weekEndStr).sort((a, b) => a.scheduled_date.localeCompare(b.scheduled_date)).slice(0, 6))

      // Action Items (Jobber-style workflow)
      const items = []
      const newRequests = contacts.filter(c => c.status === 'new')
      const urgentLeads = newRequests.filter(c => (Date.now() - new Date(c.created_at)) / 36e5 > 2)
      if (urgentLeads.length > 0) items.push({ type: 'urgent', icon: '🔥', label: `${urgentLeads.length} lead${urgentLeads.length > 1 ? 's' : ''} waiting over 2 hours`, href: '/admin/contacts', color: 'from-red-500 to-orange-500', count: urgentLeads.length })
      else if (newRequests.length > 0) items.push({ type: 'new', icon: '📥', label: `${newRequests.length} new request${newRequests.length > 1 ? 's' : ''} to review`, href: '/admin/contacts', color: 'from-blue-500 to-cyan-500', count: newRequests.length })

      const estimatePending = contacts.filter(c => c.status === 'estimate_sent')
      if (estimatePending.length > 0) items.push({ type: 'estimate', icon: '📋', label: `${estimatePending.length} estimate${estimatePending.length > 1 ? 's' : ''} awaiting response`, href: '/admin/pipeline', color: 'from-indigo-500 to-purple-500', count: estimatePending.length })

      const jobsMissingCrew = allJobs.filter(j => (j.status === 'active' || !j.status) && j.date_start && j.date_start >= today && !(crewData.by_job || {})[j.id]?.length)
      if (jobsMissingCrew.length > 0) items.push({ type: 'crew', icon: '👷', label: `${jobsMissingCrew.length} job${jobsMissingCrew.length > 1 ? 's' : ''} need crew assigned`, href: '/admin/schedule', color: 'from-amber-500 to-yellow-500', count: jobsMissingCrew.length })

      const pendingTimesheets = todayEntries.filter(e => e.status === 'pending' && e.clock_out)
      if (pendingTimesheets.length > 0) items.push({ type: 'timesheets', icon: '⏱', label: `${pendingTimesheets.length} timesheet${pendingTimesheets.length > 1 ? 's' : ''} to approve`, href: '/admin/timesheets', color: 'from-emerald-500 to-teal-500', count: pendingTimesheets.length })

      const followUps = contacts.filter(c => c.next_follow_up && c.next_follow_up <= today)
      if (followUps.length > 0) items.push({ type: 'followup', icon: '📞', label: `${followUps.length} follow-up${followUps.length > 1 ? 's' : ''} due today`, href: '/admin/contacts', color: 'from-violet-500 to-fuchsia-500', count: followUps.length })

      setActionItems(items)

      // Stats
      const n = (v) => parseFloat(v) || 0
      const totalRevenue = allJobs.reduce((s, j) => s + n(j.revenue), 0)
      const totalExpense = allJobs.reduce((s, j) => s + n(j.labor) + n(j.material) + n(j.gas) + n(j.misc), 0)
      setStats({
        totalCrew: activeUsers.filter(u => u.role === 'member').length,
        clockedIn: active.length,
        jobsActive: allJobs.filter(j => j.status === 'active' || !j.status).length,
        requestsNew: newRequests.length,
        requestsTotal: contacts.length,
        revenue: totalRevenue,
        profit: totalRevenue - totalExpense,
        estimatesPending: estimatePending.length,
        jobsMissingCrew: jobsMissingCrew.length,
        timesheetsPending: pendingTimesheets.length,
      })
    } catch (e) { console.error('Dashboard error:', e) }
    finally { setLoading(false) }
  }

  const formatTime = (ts) => ts ? new Date(ts).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }) : ''
  const formatPhone = (p) => { if (!p || p === '0000000000') return ''; const c = p.replace(/\D/g, ''); if (c.length === 10) return '(' + c.slice(0,3) + ') ' + c.slice(3,6) + '-' + c.slice(6); return p }
  const timeAgo = (d) => { const s = Math.floor((Date.now() - new Date(d)) / 1000); if (s < 60) return 'just now'; if (s < 3600) return Math.floor(s/60) + 'm'; if (s < 86400) return Math.floor(s/3600) + 'h'; return Math.floor(s/86400) + 'd' }
  const elapsed = (clockIn) => { const s = Math.floor((Date.now() - new Date(clockIn)) / 1000); const h = Math.floor(s/3600); const m = Math.floor((s%3600)/60); return h > 0 ? `${h}h ${m}m` : `${m}m` }
  const fmtMoney = (v) => '$' + Math.abs(v).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })

  const statusBadge = (status) => {
    const map = { new: 'bg-blue-100 text-blue-700', contacted: 'bg-blue-100 text-blue-700', estimate_sent: 'bg-indigo-100 text-indigo-700', in_progress: 'bg-emerald-100 text-emerald-700', booked: 'bg-emerald-100 text-emerald-700', done: 'bg-green-100 text-green-700', lost: 'bg-red-100 text-red-700' }
    return map[status] || 'bg-gray-100 text-gray-600'
  }
  const statusLabel = (status) => {
    const map = { new: 'New', contacted: 'New', estimate_sent: 'Estimate', in_progress: 'In Progress', booked: 'In Progress', done: 'Done', lost: 'Lost' }
    return map[status] || status
  }

  if (loading) return (
    <div className="flex items-center justify-center min-h-[50vh]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-[#115997] border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-gray-400 animate-pulse">Loading dashboard...</p>
      </div>
    </div>
  )

  return (
    <div className="px-4 py-5 sm:py-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* Header */}
      <div className="mb-6 animate-[fadeUp_0.3s_ease-out]">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
          Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 17 ? 'afternoon' : 'evening'}, {user?.name?.split(' ')[0]}
        </h2>
        <p className="text-gray-400 text-sm mt-0.5">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {/* Action Items — Jobber-style workflow */}
      {actionItems.length > 0 && (
        <div className="mb-6 space-y-2 animate-[fadeUp_0.35s_ease-out]">
          {actionItems.map((item, i) => (
            <Link key={item.type} href={item.href}
              className="group flex items-center gap-3 bg-white rounded-xl px-4 py-3 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 hover:border-gray-200 active:scale-[0.995]"
              style={{ animationDelay: `${i * 60}ms` }}>
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0 shadow-sm`}>
                <span className="text-lg">{item.icon}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 group-hover:text-gray-900">{item.label}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className={`text-lg font-bold bg-gradient-to-br ${item.color} bg-clip-text text-transparent`}>{item.count}</span>
                <svg className="w-4 h-4 text-gray-300 group-hover:text-gray-500 group-hover:translate-x-0.5 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </div>
            </Link>
          ))}
        </div>
      )}

      <div className="grid gap-4 sm:gap-5 lg:grid-cols-2">

        {/* Active Crew */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 animate-[fadeUp_0.45s_ease-out]">
          <div className="px-4 py-3.5 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse" />
              <h3 className="font-bold text-gray-900 text-sm tracking-tight">Active Crew</h3>
            </div>
            <Link href="/admin/timesheets" className="text-xs text-gray-400 hover:text-[#115997] font-medium transition-colors">View all →</Link>
          </div>
          {activeCrew.length === 0 ? (
            <div className="p-8 text-center">
              <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              <p className="text-sm text-gray-400 font-medium">Nobody clocked in</p>
              <p className="text-xs text-gray-300 mt-1">{stats.totalCrew} crew member{stats.totalCrew !== 1 ? 's' : ''} total</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {activeCrew.map(u => (
                <div key={u.id} className="px-4 py-3 flex items-center justify-between hover:bg-gray-50/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm" style={{ backgroundColor: u.color || '#115997' }}>
                        <span className="text-white font-bold text-sm">{u.name?.charAt(0)}</span>
                      </div>
                      <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-400 border-2 border-white rounded-full" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{u.name}</p>
                      <p className="text-xs text-gray-400">
                        {u.entry?.entry_type === 'job' && u.entry?.job_address ? u.entry.job_address : 'General'} · {formatTime(u.entry?.clock_in)}
                      </p>
                    </div>
                  </div>
                  <div className="bg-emerald-50 px-2.5 py-1 rounded-lg">
                    <span className="text-sm font-bold text-emerald-600 tabular-nums">{elapsed(u.entry?.clock_in)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Today's Jobs */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 animate-[fadeUp_0.5s_ease-out]">
          <div className="px-4 py-3.5 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-2.5 h-2.5 bg-[#115997] rounded-full" />
              <h3 className="font-bold text-gray-900 text-sm tracking-tight">Today&apos;s Jobs</h3>
              {todayJobs.length > 0 && <span className="text-[10px] font-bold bg-[#115997]/10 text-[#115997] px-1.5 py-0.5 rounded-md">{todayJobs.length}</span>}
            </div>
            <Link href="/admin/schedule" className="text-xs text-gray-400 hover:text-[#115997] font-medium transition-colors">Schedule →</Link>
          </div>
          {todayJobs.length === 0 ? (
            <div className="p-8 text-center">
              <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
              </div>
              <p className="text-sm text-gray-400 font-medium">No jobs scheduled today</p>
              <Link href="/admin/schedule" className="text-xs text-[#115997] font-semibold mt-2 inline-block hover:underline">Open schedule →</Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {todayJobs.map(j => (
                <div key={j.id} className="px-4 py-3 hover:bg-gray-50/50 transition-colors">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">{j.address}</p>
                      {j.client && <p className="text-xs text-gray-400 mt-0.5">{j.client}</p>}
                    </div>
                    <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${j.status === 'on_hold' ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'}`}>{(j.status || 'active').replace('_', ' ')}</span>
                  </div>
                  {j.crew && j.crew.length > 0 ? (
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {j.crew.map(c => (
                        <div key={c.id} className="flex items-center gap-1 bg-gray-50 rounded-full pl-0.5 pr-2 py-0.5">
                          <div className="w-5 h-5 rounded-full flex items-center justify-center shadow-sm" style={{ backgroundColor: c.user_color || '#115997' }}>
                            <span className="text-white text-[7px] font-bold">{c.user_name?.charAt(0)}</span>
                          </div>
                          <span className="text-[10px] text-gray-600 font-medium">{c.user_name?.split(' ')[0]}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
                      <p className="text-[11px] text-amber-600 font-medium">No crew assigned</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Requests */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 animate-[fadeUp_0.55s_ease-out]">
          <div className="px-4 py-3.5 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-2.5 h-2.5 bg-amber-400 rounded-full" />
              <h3 className="font-bold text-gray-900 text-sm tracking-tight">Recent Requests</h3>
            </div>
            <Link href="/admin/contacts" className="text-xs text-gray-400 hover:text-[#115997] font-medium transition-colors">{stats.requestsTotal} total →</Link>
          </div>
          {recentRequests.length === 0 ? (
            <div className="p-8 text-center"><p className="text-sm text-gray-400">No requests yet</p></div>
          ) : (
            <div className="divide-y divide-gray-50">
              {recentRequests.map(req => (
                <Link key={req.id} href={'/admin/contacts/' + req.id} className="px-4 py-3 flex items-center justify-between hover:bg-gray-50/50 transition-colors group">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-gray-900 truncate group-hover:text-[#115997] transition-colors">{req.name}</p>
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md ${statusBadge(req.status)}`}>{statusLabel(req.status)}</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5 truncate">{req.service_type}{formatPhone(req.phone) ? ' · ' + formatPhone(req.phone) : ''}</p>
                  </div>
                  <span className="text-[10px] text-gray-300 flex-shrink-0 ml-3 tabular-nums">{timeAgo(req.created_at)}</span>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Upcoming This Week */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 animate-[fadeUp_0.6s_ease-out]">
          <div className="px-4 py-3.5 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-2.5 h-2.5 bg-violet-400 rounded-full" />
              <h3 className="font-bold text-gray-900 text-sm tracking-tight">Upcoming This Week</h3>
            </div>
            <Link href="/admin/calendar" className="text-xs text-gray-400 hover:text-[#115997] font-medium transition-colors">Calendar →</Link>
          </div>
          {upcomingCalendar.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-sm text-gray-400 font-medium">Nothing scheduled</p>
              <Link href="/admin/calendar" className="text-xs text-[#115997] font-semibold mt-2 inline-block hover:underline">Open calendar →</Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {upcomingCalendar.map(est => {
                const schedDate = new Date(est.scheduled_date + 'T00:00:00')
                const isToday = est.scheduled_date === new Date().toISOString().split('T')[0]
                const isTomorrow = (() => { const t = new Date(); t.setDate(t.getDate() + 1); return est.scheduled_date === t.toISOString().split('T')[0] })()
                return (
                  <Link key={est.id} href={'/admin/contacts/' + est.id} className="px-4 py-3 flex items-center justify-between hover:bg-gray-50/50 transition-colors group">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className={`w-10 h-10 rounded-xl flex flex-col items-center justify-center flex-shrink-0 ${isToday ? 'bg-emerald-50 text-emerald-700' : isTomorrow ? 'bg-blue-50 text-[#115997]' : 'bg-gray-50 text-gray-600'}`}>
                        <span className="text-[9px] font-bold uppercase leading-none">{schedDate.toLocaleDateString('en-US', { weekday: 'short' })}</span>
                        <span className="text-base font-extrabold leading-none">{schedDate.getDate()}</span>
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate group-hover:text-[#115997] transition-colors">{est.name}</p>
                        <p className="text-xs text-gray-400 truncate">{est.service_type}{est.scheduled_time ? ` · ${est.scheduled_time}` : ''}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end flex-shrink-0 ml-2">
                      {isToday && <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md">TODAY</span>}
                      {isTomorrow && <span className="text-[9px] font-bold text-[#115997] bg-blue-50 px-1.5 py-0.5 rounded-md">TOMORROW</span>}
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md mt-0.5 ${statusBadge(est.status)}`}>{statusLabel(est.status)}</span>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Quick Nav */}
      <div className="mt-6 grid grid-cols-4 sm:grid-cols-6 gap-2 animate-[fadeUp_0.65s_ease-out]">
        {[
          { href: '/admin/schedule', label: 'Schedule', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg> },
          { href: '/admin/pipeline', label: 'Pipeline', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7" /></svg> },
          { href: '/admin/jobs', label: 'Jobs', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg> },
          { href: '/admin/expenses', label: 'Expenses', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg> },
          { href: '/admin/photos', label: 'Photos', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg> },
          { href: '/admin/users', label: 'Users', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg> },
        ].map(nav => (
          <Link key={nav.href} href={nav.href}
            className="bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition-all duration-200 text-center group border border-gray-100 hover:border-[#115997]/20">
            <div className="text-gray-400 group-hover:text-[#115997] transition-colors mx-auto w-fit">{nav.icon}</div>
            <p className="text-[10px] font-semibold text-gray-500 group-hover:text-[#115997] mt-1.5 transition-colors">{nav.label}</p>
          </Link>
        ))}
      </div>

      <style jsx global>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}