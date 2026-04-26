'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAdminAuth } from './layout'

export default function DashboardPage() {
  const { user } = useAdminAuth()
  const isAdmin = user?.role === 'admin'
  const [loading, setLoading] = useState(true)
  const [activeCrew, setActiveCrew] = useState([])
  const [todayJobs, setTodayJobs] = useState([])
  const [newLeads, setNewLeads] = useState([])
  const [upcomingEstimates, setUpcomingEstimates] = useState([])
  const [stats, setStats] = useState({ totalCrew: 0, clockedIn: 0, jobsThisWeek: 0, pendingTimesheets: 0 })

  useEffect(() => { if (user) fetchDashboard() }, [user])

  const fetchDashboard = async () => {
    try {
      const today = new Date().toISOString().split('T')[0]
      const weekEnd = new Date()
      weekEnd.setDate(weekEnd.getDate() + 7)
      const weekEndStr = weekEnd.toISOString().split('T')[0]

      // Fetch all data in parallel
      const [usersRes, jobsRes, crewRes, contactsRes, timesheetsRes] = await Promise.all([
        fetch('/api/admin/users'),
        fetch('/api/admin/jobs'),
        fetch('/api/admin/job-crew/bulk'),
        fetch(user.role === 'member' ? `/api/contact?user_id=${user.id}&user_role=member` : '/api/contact'),
        fetch(`/api/admin/timesheets?start=${today}T00:00:00.000Z&end=${today}T23:59:59.999Z`),
      ])

      const usersData = await usersRes.json()
      const jobsData = await jobsRes.json()
      const crewData = await crewRes.json()
      const contactsData = await contactsRes.json()
      const timesheetsData = await timesheetsRes.json()

      const activeUsers = (usersData.users || []).filter(u => u.is_active)
      const allJobs = jobsData.jobs || []
      const contacts = contactsData.data || []
      const todayEntries = timesheetsData.entries || []

      // Active crew (who has an open time entry right now)
      const clockedInUserIds = new Set(todayEntries.filter(e => !e.clock_out).map(e => e.user_id))
      const active = activeUsers
        .filter(u => clockedInUserIds.has(u.id))
        .map(u => {
          const entry = todayEntries.find(e => e.user_id === u.id && !e.clock_out)
          return { ...u, entry }
        })
      setActiveCrew(active)

      // Today's jobs from schedule
      const jobMap = {}
      allJobs.forEach(j => { jobMap[j.id] = j })
      const byUser = crewData.by_user || {}
      const todayScheduled = []
      const seenJobIds = new Set()
      Object.entries(byUser).forEach(([userId, assignments]) => {
        assignments.forEach(a => {
          if (seenJobIds.has(a.job_id)) return
          const job = jobMap[a.job_id]
          if (!job || !job.date_start) return
          const end = job.date_end || job.date_start
          if (today >= job.date_start && today <= end) {
            seenJobIds.add(a.job_id)
            const jobCrew = (crewData.by_job || {})[a.job_id] || []
            todayScheduled.push({ ...job, crew: jobCrew })
          }
        })
      })
      setTodayJobs(todayScheduled)

      // New leads (status 'new', last 7 days)
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)
      const fresh = contacts
        .filter(c => c.status === 'new' && new Date(c.created_at) > weekAgo)
        .slice(0, 8)
      setNewLeads(fresh)

      // Upcoming estimates (scheduled in next 7 days)
      const upcoming = contacts
        .filter(c => c.scheduled_date && c.scheduled_date >= today && c.scheduled_date <= weekEndStr && ['new', 'contacted', 'estimate_sent'].includes(c.status))
        .sort((a, b) => a.scheduled_date.localeCompare(b.scheduled_date))
        .slice(0, 8)
      setUpcomingEstimates(upcoming)

      // Stats
      const weekStart = new Date()
      const dayOfWeek = weekStart.getDay()
      weekStart.setDate(weekStart.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1))
      const weekStartStr = weekStart.toISOString().split('T')[0]
      const jobsThisWeek = allJobs.filter(j => {
        if (!j.date_start) return false
        const end = j.date_end || j.date_start
        return j.date_start <= weekEndStr && end >= weekStartStr
      }).length

      setStats({
        totalCrew: activeUsers.filter(u => u.role === 'member').length,
        clockedIn: active.length,
        jobsThisWeek,
        pendingTimesheets: todayEntries.filter(e => e.status === 'pending' && e.clock_out).length,
      })
    } catch (e) { console.error('Dashboard error:', e) }
    finally { setLoading(false) }
  }

  const formatTime = (ts) => ts ? new Date(ts).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }) : ''
  const formatPhone = (p) => { if (!p) return ''; const c = p.replace(/\D/g, ''); if (c.length === 10) return '(' + c.slice(0,3) + ') ' + c.slice(3,6) + '-' + c.slice(6); return p }
  const timeAgo = (d) => { const s = Math.floor((Date.now() - new Date(d)) / 1000); if (s < 3600) return Math.floor(s/60) + 'm ago'; if (s < 86400) return Math.floor(s/3600) + 'h ago'; return Math.floor(s/86400) + 'd ago' }
  const elapsed = (clockIn) => { const s = Math.floor((Date.now() - new Date(clockIn)) / 1000); const h = Math.floor(s/3600); const m = Math.floor((s%3600)/60); return h > 0 ? `${h}h ${m}m` : `${m}m` }

  if (loading) return <div className="flex items-center justify-center min-h-[50vh]"><div className="w-10 h-10 border-4 border-[#115997] border-t-transparent rounded-full animate-spin" /></div>

  return (
    <div className="px-4 py-4 sm:py-8">
      <div className="mb-6">
        <h2 className="text-lg sm:text-2xl font-bold text-[#273373]">Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 17 ? 'afternoon' : 'evening'}, {user?.name?.split(' ')[0]}</h2>
        <p className="text-gray-500 text-xs sm:text-sm">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <div className="bg-white rounded-xl p-3 shadow-sm">
          <p className="text-[10px] text-gray-500 uppercase tracking-wide">Crew Active</p>
          <p className="text-2xl font-bold text-emerald-600">{stats.clockedIn}<span className="text-sm text-gray-400 font-normal">/{stats.totalCrew}</span></p>
        </div>
        <div className="bg-white rounded-xl p-3 shadow-sm">
          <p className="text-[10px] text-gray-500 uppercase tracking-wide">Jobs This Week</p>
          <p className="text-2xl font-bold text-[#115997]">{stats.jobsThisWeek}</p>
        </div>
        <div className="bg-white rounded-xl p-3 shadow-sm">
          <p className="text-[10px] text-gray-500 uppercase tracking-wide">New Leads</p>
          <p className="text-2xl font-bold text-amber-600">{newLeads.length}</p>
        </div>
        <div className="bg-white rounded-xl p-3 shadow-sm">
          <p className="text-[10px] text-gray-500 uppercase tracking-wide">Pending Timesheets</p>
          <p className="text-2xl font-bold text-purple-600">{stats.pendingTimesheets}</p>
        </div>
      </div>

      <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
        {/* Active Crew — who's on the clock right now */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-semibold text-gray-900 text-sm">Active Crew</h3>
            <Link href="/admin/timesheets" className="text-xs text-[#115997] font-medium">View all</Link>
          </div>
          {activeCrew.length === 0 ? (
            <div className="p-6 text-center"><p className="text-sm text-gray-400">Nobody clocked in right now</p></div>
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
                        {' · '}{formatTime(u.entry?.clock_in)}
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
            <div className="p-6 text-center"><p className="text-sm text-gray-400">No jobs scheduled today</p></div>
          ) : (
            <div className="divide-y divide-gray-50">
              {todayJobs.map(j => (
                <div key={j.id} className="px-4 py-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{j.address}</p>
                      <p className="text-xs text-gray-500">{j.client || 'No client'}</p>
                    </div>
                    <span className={`text-[9px] font-medium px-1.5 py-0.5 rounded flex-shrink-0 ${
                      j.status === 'completed' ? 'bg-green-100 text-green-700' :
                      j.status === 'on_hold' ? 'bg-amber-100 text-amber-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>{(j.status || 'active').replace('_', ' ')}</span>
                  </div>
                  {j.crew && j.crew.length > 0 && (
                    <div className="flex items-center gap-1 mt-1.5">
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
                </div>
              ))}
            </div>
          )}
        </div>

        {/* New Leads */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-semibold text-gray-900 text-sm">New Leads</h3>
            <Link href="/admin/contacts" className="text-xs text-[#115997] font-medium">View all</Link>
          </div>
          {newLeads.length === 0 ? (
            <div className="p-6 text-center"><p className="text-sm text-gray-400">No new leads this week</p></div>
          ) : (
            <div className="divide-y divide-gray-50">
              {newLeads.map(lead => {
                const hoursOld = Math.floor((Date.now() - new Date(lead.created_at)) / 3600000)
                return (
                  <Link key={lead.id} href={'/admin/contacts/' + lead.id} className="px-4 py-3 flex items-center justify-between hover:bg-gray-50">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{lead.name}</p>
                      <p className="text-xs text-gray-500">{lead.service_type} · {formatPhone(lead.phone)}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {hoursOld > 24 && <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" title="Urgent" />}
                      <span className="text-[10px] text-gray-400">{timeAgo(lead.created_at)}</span>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>

        {/* Upcoming Estimates */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-semibold text-gray-900 text-sm">Upcoming Estimates</h3>
            <Link href="/admin/calendar" className="text-xs text-[#115997] font-medium">Calendar</Link>
          </div>
          {upcomingEstimates.length === 0 ? (
            <div className="p-6 text-center"><p className="text-sm text-gray-400">No estimates this week</p></div>
          ) : (
            <div className="divide-y divide-gray-50">
              {upcomingEstimates.map(est => (
                <Link key={est.id} href={'/admin/contacts/' + est.id} className="px-4 py-3 flex items-center justify-between hover:bg-gray-50">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{est.name}</p>
                    <p className="text-xs text-gray-500">{est.service_type}{est.address ? ` · ${est.address}` : ''}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs font-semibold text-[#115997]">{new Date(est.scheduled_date + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</p>
                    {est.scheduled_time && <p className="text-[10px] text-gray-400">{est.scheduled_time}</p>}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}