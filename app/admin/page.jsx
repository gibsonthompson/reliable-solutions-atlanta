'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

function CalendarWidget() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(null)
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)

  const today = new Date()
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
    try {
      const r = await fetch('/api/admin/jobs')
      const d = await r.json()
      if (r.ok && d.jobs) setJobs(d.jobs)
    } catch (e) {}
    finally { setLoading(false) }
  }

  const prev = () => setCurrentDate(new Date(year, month - 1, 1))
  const next = () => setCurrentDate(new Date(year, month + 1, 1))
  const goToday = () => { setCurrentDate(new Date()); setSelectedDate(null) }

  const getJobsForDate = (day) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return jobs.filter(j => j.scheduled_date?.startsWith(dateStr) || j.created_at?.startsWith(dateStr))
  }

  const isToday = (day) => today.getDate() === day && today.getMonth() === month && today.getFullYear() === year
  const isSelected = (day) => selectedDate === day

  const cells = []
  for (let i = 0; i < firstDay; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  const selectedJobs = selectedDate ? getJobsForDate(selectedDate) : []
  const formattedSelected = selectedDate ? `${MONTHS[month]} ${selectedDate}, ${year}` : null

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 flex items-center justify-between border-b border-gray-100">
        <div>
          <h3 className="text-sm font-bold text-gray-900">{MONTHS[month]} {year}</h3>
          <button onClick={goToday} className="text-[10px] text-[#115997] font-medium hover:underline">Today</button>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={prev} className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button onClick={next} className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>

      {/* Days header */}
      <div className="grid grid-cols-7 px-4 pt-3">
        {DAYS.map(d => (
          <div key={d} className="text-center text-[10px] font-semibold text-gray-400 uppercase tracking-wider pb-2">{d}</div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 px-4 pb-3">
        {cells.map((day, i) => {
          if (day === null) return <div key={`e-${i}`} />
          const dayJobs = getJobsForDate(day)
          const hasJobs = dayJobs.length > 0
          return (
            <button key={day} onClick={() => setSelectedDate(isSelected(day) ? null : day)}
              className={`relative h-10 flex flex-col items-center justify-center rounded-lg text-sm transition-all ${
                isSelected(day)
                  ? 'bg-[#115997] text-white font-semibold'
                  : isToday(day)
                    ? 'bg-[#115997]/10 text-[#115997] font-semibold'
                    : 'text-gray-700 hover:bg-gray-50'
              }`}>
              {day}
              {hasJobs && (
                <div className={`absolute bottom-1 w-1 h-1 rounded-full ${isSelected(day) ? 'bg-white' : 'bg-[#115997]'}`} />
              )}
            </button>
          )
        })}
      </div>

      {/* Selected date detail */}
      {selectedDate && (
        <div className="border-t border-gray-100 px-5 py-3">
          <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-2">{formattedSelected}</p>
          {selectedJobs.length === 0 ? (
            <p className="text-xs text-gray-400">No jobs scheduled</p>
          ) : (
            <div className="space-y-2">
              {selectedJobs.map((j, i) => (
                <div key={i} className="flex items-center gap-2 text-xs">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#115997] flex-shrink-0" />
                  <span className="text-gray-700 font-medium truncate">{j.customer_name || j.name || 'Job'}</span>
                  <span className="text-gray-400 truncate">{j.service_type || ''}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function StatCard({ label, value, icon, href, color = '#115997' }) {
  const Card = href ? Link : 'div'
  return (
    <Card {...(href ? { href } : {})} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow group">
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${color}10` }}>
          <span style={{ color }}>{icon}</span>
        </div>
        {href && (
          <svg className="w-4 h-4 text-gray-300 group-hover:text-gray-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        )}
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-xs text-gray-400 mt-0.5">{label}</p>
    </Card>
  )
}

export default function DashboardPage() {
  const [stats, setStats] = useState({ requests: 0, leads: 0, jobs: 0, templates: 0 })
  const [recentContacts, setRecentContacts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const [contactsR, prospectsR, jobsR, templatesR] = await Promise.all([
        fetch('/api/admin/contacts').then(r => r.json()).catch(() => ({})),
        fetch('/api/admin/prospects').then(r => r.json()).catch(() => ({})),
        fetch('/api/admin/jobs').then(r => r.json()).catch(() => ({})),
        fetch('/api/admin/templates').then(r => r.json()).catch(() => ({})),
      ])

      setStats({
        requests: contactsR.contacts?.length || contactsR.total || 0,
        leads: prospectsR.prospects?.length || prospectsR.total || 0,
        jobs: jobsR.jobs?.length || jobsR.total || 0,
        templates: templatesR.templates?.length || 0,
      })

      // Get recent contacts for activity feed
      const contacts = contactsR.contacts || []
      setRecentContacts(contacts.slice(0, 5))
    } catch (e) {}
    finally { setLoading(false) }
  }

  const timeAgo = (dateStr) => {
    if (!dateStr) return ''
    const diff = Date.now() - new Date(dateStr).getTime()
    const mins = Math.floor(diff / 60000)
    if (mins < 60) return `${mins}m ago`
    const hrs = Math.floor(mins / 60)
    if (hrs < 24) return `${hrs}h ago`
    const days = Math.floor(hrs / 24)
    return `${days}d ago`
  }

  if (loading) return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="w-10 h-10 border-4 border-[#115997] border-t-transparent rounded-full animate-spin" />
    </div>
  )

  return (
    <div className="px-4 sm:px-6 py-6 sm:py-8">
      {/* Page header */}
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-400 mt-0.5">Reliable Solutions Atlanta</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <StatCard label="Requests" value={stats.requests} href="/admin/contacts"
          icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>}
          color="#115997" />
        <StatCard label="Leads" value={stats.leads} href="/admin/prospects"
          icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>}
          color="#059669" />
        <StatCard label="Jobs" value={stats.jobs} href="/admin/jobs"
          icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>}
          color="#D97706" />
        <StatCard label="Templates" value={stats.templates} href="/admin/templates"
          icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
          color="#7C3AED" />
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Calendar */}
        <div className="lg:col-span-1 order-2 lg:order-1">
          <CalendarWidget />
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2 order-1 lg:order-2">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-sm font-bold text-gray-900">Recent Requests</h3>
              <Link href="/admin/contacts" className="text-[10px] text-[#115997] font-semibold uppercase tracking-wider hover:underline">View All</Link>
            </div>
            {recentContacts.length === 0 ? (
              <div className="px-5 py-8 text-center">
                <p className="text-sm text-gray-400">No recent requests</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-50">
                {recentContacts.map((c, i) => (
                  <Link key={c.id || i} href={`/admin/contacts/${c.id || ''}`}
                    className="flex items-center gap-4 px-5 py-3.5 hover:bg-gray-50 transition-colors group">
                    <div className="w-9 h-9 rounded-full bg-[#115997]/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-[#115997] font-semibold text-xs">
                        {(c.name || c.customer_name || '?').charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900 truncate">{c.name || c.customer_name || 'Unknown'}</p>
                      <p className="text-xs text-gray-400 truncate">{c.service_type || c.message || c.email || 'No details'}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-[10px] text-gray-400">{timeAgo(c.created_at)}</p>
                      {c.status && (
                        <span className={`inline-flex px-1.5 py-0.5 rounded text-[9px] font-medium mt-0.5 ${
                          c.status === 'new' ? 'bg-blue-50 text-blue-600' :
                          c.status === 'contacted' ? 'bg-yellow-50 text-yellow-600' :
                          c.status === 'booked' ? 'bg-green-50 text-green-600' :
                          'bg-gray-50 text-gray-500'
                        }`}>{c.status}</span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Quick actions */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
            <Link href="/admin/outreach" className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow group text-center">
              <div className="w-10 h-10 rounded-xl bg-[#115997]/10 flex items-center justify-center mx-auto mb-2">
                <svg className="w-5 h-5 text-[#115997]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
              </div>
              <p className="text-xs font-semibold text-gray-700">Outreach</p>
              <p className="text-[10px] text-gray-400">Send DMs</p>
            </Link>
            <Link href="/admin/prospects" className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow group text-center">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center mx-auto mb-2">
                <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
              </div>
              <p className="text-xs font-semibold text-gray-700">Add Lead</p>
              <p className="text-[10px] text-gray-400">New prospect</p>
            </Link>
            <Link href="/admin/pipeline" className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow group text-center hidden sm:block">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center mx-auto mb-2">
                <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" /></svg>
              </div>
              <p className="text-xs font-semibold text-gray-700">Pipeline</p>
              <p className="text-[10px] text-gray-400">View deals</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}