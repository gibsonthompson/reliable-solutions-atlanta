'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAdminAuth } from './layout'

const STATUS_COLORS = {
  estimate_sent: { bg: 'bg-indigo-100', text: 'text-indigo-700', dot: 'bg-indigo-500' },
  booked: { bg: 'bg-emerald-100', text: 'text-emerald-700', dot: 'bg-emerald-500' },
  done: { bg: 'bg-green-100', text: 'text-green-700', dot: 'bg-green-500' },
  new: { bg: 'bg-blue-100', text: 'text-blue-700', dot: 'bg-blue-500' },
  contacted: { bg: 'bg-yellow-100', text: 'text-yellow-700', dot: 'bg-yellow-500' },
  lost: { bg: 'bg-red-100', text: 'text-red-700', dot: 'bg-red-500' },
}
const STATUS_LABELS = { estimate_sent: 'Estimate', booked: 'Booked', done: 'Done', new: 'New', contacted: 'Contacted', lost: 'Lost' }
const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const SERVICE_OPTIONS = ['Basement Waterproofing', 'Crawl Space Encapsulation', 'Crawl Space Repair', 'Crawl Space Waterproofing', 'Concrete Repair', 'Drainage', 'Foundation Repair', 'Other']
const TIME_OPTIONS = ['8:00 AM - 9:00 AM', '9:00 AM - 10:00 AM', '10:00 AM - 11:00 AM', '11:00 AM - 12:00 PM', '12:00 PM - 1:00 PM', '1:00 PM - 2:00 PM', '2:00 PM - 3:00 PM', '3:00 PM - 4:00 PM', '4:00 PM - 5:00 PM']

function StatCard({ label, value, icon, href, color = '#115997' }) {
  return (
    <Link href={href} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow group">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${color}10` }}>
          <span style={{ color }}>{icon}</span>
        </div>
        <div>
          <p className="text-xl font-bold text-gray-900">{value}</p>
          <p className="text-xs text-gray-400">{label}</p>
        </div>
      </div>
    </Link>
  )
}

export default function DashboardPage() {
  const { user } = useAdminAuth()
  const isAdmin = user?.role === 'admin'

  const [allContacts, setAllContacts] = useState([])
  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({ requests: 0, leads: 0, jobs: 0, templates: 0 })

  // Calendar state
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())

  // Add event modal
  const [showAddModal, setShowAddModal] = useState(false)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState(null)
  const [newEvent, setNewEvent] = useState({ name: '', phone: '', service_type: '', custom_service: '', scheduled_date: '', scheduled_time: '', status: 'estimate_sent', address: '', notes: '' })

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 3000) }

  useEffect(() => {
    if (user) {
      fetchContacts()
      fetchStats()
    }
  }, [user])

  const fetchContacts = async () => {
    try {
      const params = user?.role === 'member' ? `?user_id=${user.id}&user_role=member` : ''
      const r = await fetch('/api/contact' + params)
      const res = await r.json()
      if (res.data) {
        setAllContacts(res.data)
        setSubmissions(res.data.filter(s => s.scheduled_date))
      }
    } catch (e) {}
    finally { setLoading(false) }
  }

  const fetchStats = async () => {
    try {
      const [prospectsR, jobsR, templatesR] = await Promise.all([
        fetch('/api/admin/prospects').then(r => r.json()).catch(() => ({})),
        fetch('/api/admin/jobs').then(r => r.json()).catch(() => ({})),
        fetch('/api/admin/templates').then(r => r.json()).catch(() => ({})),
      ])
      setStats(prev => ({
        ...prev,
        leads: prospectsR.prospects?.length || prospectsR.total || 0,
        jobs: jobsR.jobs?.length || jobsR.total || 0,
        templates: templatesR.templates?.length || 0,
      }))
    } catch (e) {}
  }

  // Calendar helpers
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const prevMonthDays = new Date(year, month, 0).getDate()

  const getEventsForDate = (dateStr) => submissions.filter(s => s.scheduled_date === dateStr)
  const isToday = (day) => {
    const t = new Date()
    return day === t.getDate() && month === t.getMonth() && year === t.getFullYear()
  }
  const isSelected = (day) => {
    return selectedDate && day === selectedDate.getDate() && month === selectedDate.getMonth() && year === selectedDate.getFullYear()
  }
  const dateStr = (day) => `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`

  const navigate = (dir) => setCurrentDate(new Date(year, month + dir, 1))
  const goToday = () => { setCurrentDate(new Date()); setSelectedDate(new Date()) }

  // Build calendar grid
  const cells = []
  for (let i = firstDay - 1; i >= 0; i--) cells.push({ day: prevMonthDays - i, current: false })
  for (let d = 1; d <= daysInMonth; d++) cells.push({ day: d, current: true })
  const rem = 42 - cells.length
  for (let i = 1; i <= rem; i++) cells.push({ day: i, current: false })

  // Selected date events
  const selectedDateStr = selectedDate ? `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}` : null
  const selectedEvents = selectedDateStr ? submissions.filter(s => s.scheduled_date === selectedDateStr) : []

  const formatPhone = (p) => {
    if (!p || p === '0000000000') return ''
    const c = p.replace(/\D/g, '')
    if (c.length === 10) return '(' + c.slice(0, 3) + ') ' + c.slice(3, 6) + '-' + c.slice(6)
    return p
  }

  const timeAgo = (dateStr) => {
    if (!dateStr) return ''
    const diff = Date.now() - new Date(dateStr).getTime()
    const mins = Math.floor(diff / 60000)
    if (mins < 60) return `${mins}m ago`
    const hrs = Math.floor(mins / 60)
    if (hrs < 24) return `${hrs}h ago`
    return `${Math.floor(hrs / 24)}d ago`
  }

  // Add event
  const openAddModal = (date) => {
    const d = date || new Date()
    const ds = d.toISOString().split('T')[0]
    setNewEvent({ name: '', phone: '', service_type: '', custom_service: '', scheduled_date: ds, scheduled_time: '', status: 'estimate_sent', address: '', notes: '' })
    setShowAddModal(true)
  }

  const handleAddEvent = async () => {
    const service = newEvent.service_type === 'Other' ? newEvent.custom_service : newEvent.service_type
    if (!newEvent.name || !service || !newEvent.scheduled_date) return
    setSaving(true)
    try {
      const r = await fetch('/api/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newEvent.name, phone: newEvent.phone || '0000000000', email: 'noemail@placeholder.com', service_type: service, message: newEvent.notes || null, source: 'calendar' })
      })
      const res = await r.json()
      if (res.data) {
        await fetch('/api/contact', {
          method: 'PATCH', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: res.data.id, status: newEvent.status, scheduled_date: newEvent.scheduled_date, scheduled_time: newEvent.scheduled_time || null, address: newEvent.address || null })
        })
      }
      setShowAddModal(false)
      showToast('Event added')
      fetchContacts()
    } catch (err) {}
    finally { setSaving(false) }
  }

  const serviceValid = newEvent.service_type === 'Other' ? newEvent.custom_service.trim() : newEvent.service_type

  // Recent contacts (last 5 not necessarily with dates)
  const recentContacts = allContacts.slice(0, 5)

  if (loading) return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="w-10 h-10 border-4 border-[#115997] border-t-transparent rounded-full animate-spin" />
    </div>
  )

  return (
    <div className="px-4 sm:px-6 py-5 sm:py-8">
      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 px-4 py-3 rounded-xl shadow-lg text-sm font-medium bg-green-600 text-white flex items-center gap-2 animate-[slideIn_0.2s_ease-out]">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          {toast}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-400">Reliable Solutions Atlanta</p>
        </div>
        {isAdmin && (
          <button onClick={() => openAddModal(selectedDate)} className="flex items-center gap-1.5 px-3 py-2 bg-[#115997] text-white text-sm font-medium rounded-lg hover:bg-[#273373] transition-colors">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            <span className="hidden sm:inline">Add Event</span>
            <span className="sm:hidden">Add</span>
          </button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        <StatCard label="Requests" value={allContacts.length} href="/admin/contacts"
          icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>}
          color="#115997" />
        <StatCard label="Leads" value={stats.leads} href="/admin/prospects"
          icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>}
          color="#059669" />
        <StatCard label="Scheduled" value={submissions.length} href="/admin/calendar"
          icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
          color="#D97706" />
        <StatCard label="Templates" value={stats.templates} href="/admin/templates"
          icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
          color="#7C3AED" />
      </div>

      {/* Main grid: Calendar + Recent */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-5">
        {/* Calendar — takes 3 cols */}
        <div className="xl:col-span-3">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Calendar header */}
            <div className="px-5 py-4 flex items-center justify-between border-b border-gray-100">
              <div className="flex items-center gap-3">
                <h3 className="text-base font-bold text-gray-900">{MONTHS[month]} {year}</h3>
                <button onClick={goToday} className="text-[10px] text-[#115997] font-semibold uppercase tracking-wider hover:underline">Today</button>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => navigate(-1)} className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <button onClick={() => navigate(1)} className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>
              </div>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 border-b border-gray-50">
              {DAYS_OF_WEEK.map(d => (
                <div key={d} className="py-2.5 text-center text-[10px] font-semibold text-gray-400 uppercase tracking-wider">{d}</div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7">
              {cells.map((cell, i) => {
                const ds = cell.current ? dateStr(cell.day) : null
                const events = ds ? getEventsForDate(ds) : []
                const today = cell.current && isToday(cell.day)
                const selected = cell.current && isSelected(cell.day)
                return (
                  <button key={i}
                    onClick={() => {
                      if (cell.current) setSelectedDate(new Date(year, month, cell.day))
                    }}
                    className={`relative border-b border-r border-gray-50 min-h-[56px] sm:min-h-[90px] p-1 sm:p-2 text-left transition-colors ${
                      !cell.current ? 'bg-gray-50/50' : ''
                    } ${selected ? 'bg-[#115997]/5 ring-1 ring-inset ring-[#115997]/20' : 'hover:bg-gray-50'}`}>
                    <span className={`inline-flex items-center justify-center text-xs sm:text-sm font-medium rounded-full w-7 h-7 ${
                      today ? 'bg-[#115997] text-white' : !cell.current ? 'text-gray-300' : 'text-gray-700'
                    }`}>{cell.day}</span>
                    {events.length > 0 && (
                      <>
                        {/* Mobile dots */}
                        <div className="flex gap-0.5 mt-0.5 sm:hidden">
                          {events.slice(0, 3).map((e, j) => (
                            <div key={j} className={`w-1.5 h-1.5 rounded-full ${STATUS_COLORS[e.status]?.dot || 'bg-gray-400'}`} />
                          ))}
                        </div>
                        {/* Desktop event pills */}
                        <div className="hidden sm:flex flex-col gap-0.5 mt-1">
                          {events.slice(0, 2).map((e, j) => {
                            const c = STATUS_COLORS[e.status] || { bg: 'bg-gray-100', text: 'text-gray-700' }
                            return (
                              <div key={j} className={`truncate text-[10px] font-medium px-1.5 py-0.5 rounded ${c.bg} ${c.text}`}>
                                {e.name?.split(' ')[0]} · {STATUS_LABELS[e.status] || e.status}
                              </div>
                            )
                          })}
                          {events.length > 2 && <span className="text-[10px] text-gray-400 px-1.5">+{events.length - 2}</span>}
                        </div>
                      </>
                    )}
                  </button>
                )
              })}
            </div>

            {/* Selected date detail */}
            {selectedDate && (
              <div className="border-t border-gray-100">
                <div className="px-5 py-3 flex items-center justify-between bg-gray-50/50">
                  <h4 className="text-sm font-semibold text-gray-800">
                    {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                    <span className="text-gray-400 font-normal ml-2">({selectedEvents.length})</span>
                  </h4>
                  {isAdmin && (
                    <button onClick={() => openAddModal(selectedDate)} className="text-xs text-[#115997] font-medium flex items-center gap-1 hover:underline">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>Add
                    </button>
                  )}
                </div>
                {selectedEvents.length === 0 ? (
                  <div className="px-5 py-6 text-center"><p className="text-xs text-gray-400">Nothing scheduled</p></div>
                ) : (
                  <div className="divide-y divide-gray-50">
                    {selectedEvents.map((event) => {
                      const colors = STATUS_COLORS[event.status] || { bg: 'bg-gray-100', text: 'text-gray-700', dot: 'bg-gray-400' }
                      return (
                        <Link key={event.id} href={`/admin/contacts/${event.id}`} className="flex items-start gap-3 px-5 py-3 hover:bg-gray-50 transition-colors">
                          <div className={`w-1 self-stretch rounded-full flex-shrink-0 ${colors.dot}`} />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <p className="font-semibold text-gray-900 text-sm truncate">{event.name}</p>
                              <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium ${colors.bg} ${colors.text}`}>{STATUS_LABELS[event.status] || event.status}</span>
                            </div>
                            <p className="text-xs text-gray-500">{event.service_type}</p>
                            <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                              {event.scheduled_time && <span>{event.scheduled_time}</span>}
                              {formatPhone(event.phone) && <span>{formatPhone(event.phone)}</span>}
                            </div>
                          </div>
                          <svg className="w-4 h-4 text-gray-300 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        </Link>
                      )
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Legend */}
            <div className="px-5 py-3 border-t border-gray-100 flex flex-wrap gap-3">
              {Object.entries(STATUS_LABELS).map(([key, label]) => {
                const c = STATUS_COLORS[key]
                if (!c) return null
                return (
                  <div key={key} className="flex items-center gap-1.5">
                    <div className={`w-2 h-2 rounded-full ${c.dot}`} />
                    <span className="text-[10px] text-gray-400">{label}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Right column: Recent + Quick Actions */}
        <div className="xl:col-span-2 space-y-4">
          {/* Recent Requests */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-sm font-bold text-gray-900">Recent Requests</h3>
              <Link href="/admin/contacts" className="text-[10px] text-[#115997] font-semibold uppercase tracking-wider hover:underline">View All</Link>
            </div>
            {recentContacts.length === 0 ? (
              <div className="px-5 py-8 text-center"><p className="text-sm text-gray-400">No recent requests</p></div>
            ) : (
              <div className="divide-y divide-gray-50">
                {recentContacts.map((c, i) => (
                  <Link key={c.id || i} href={`/admin/contacts/${c.id || ''}`}
                    className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 transition-colors">
                    <div className="w-9 h-9 rounded-full bg-[#115997]/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-[#115997] font-semibold text-xs">{(c.name || '?').charAt(0).toUpperCase()}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900 truncate">{c.name || 'Unknown'}</p>
                      <p className="text-xs text-gray-400 truncate">{c.service_type || c.email || 'No details'}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-[10px] text-gray-400">{timeAgo(c.created_at)}</p>
                      {c.status && (
                        <span className={`inline-flex px-1.5 py-0.5 rounded text-[9px] font-medium mt-0.5 ${
                          STATUS_COLORS[c.status]?.bg || 'bg-gray-50'} ${STATUS_COLORS[c.status]?.text || 'text-gray-500'
                        }`}>{STATUS_LABELS[c.status] || c.status}</span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Quick actions */}
          <div className="grid grid-cols-2 gap-3">
            <Link href="/admin/outreach" className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow text-center">
              <div className="w-10 h-10 rounded-xl bg-[#115997]/10 flex items-center justify-center mx-auto mb-2">
                <svg className="w-5 h-5 text-[#115997]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
              </div>
              <p className="text-xs font-semibold text-gray-700">Outreach</p>
              <p className="text-[10px] text-gray-400">Send DMs</p>
            </Link>
            <Link href="/admin/pipeline" className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow text-center">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center mx-auto mb-2">
                <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" /></svg>
              </div>
              <p className="text-xs font-semibold text-gray-700">Pipeline</p>
              <p className="text-[10px] text-gray-400">View deals</p>
            </Link>
          </div>
        </div>
      </div>

      {/* Add Event Modal — same as calendar page */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4" onClick={() => setShowAddModal(false)}>
          <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-lg max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-4 sm:p-6 border-b border-gray-100">
              <div className="w-8 h-1 bg-gray-300 rounded-full mx-auto mb-3 sm:hidden" />
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900">Add Event</h3>
                <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
            </div>
            <div className="p-4 sm:p-6 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Date *</label>
                  <input type="date" value={newEvent.scheduled_date} onChange={(e) => setNewEvent(p => ({ ...p, scheduled_date: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#115997] outline-none" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Time</label>
                  <select value={newEvent.scheduled_time} onChange={(e) => setNewEvent(p => ({ ...p, scheduled_time: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-xs focus:ring-2 focus:ring-[#115997] outline-none bg-white">
                    <option value="">Select...</option>
                    {TIME_OPTIONS.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Type</label>
                <select value={newEvent.status} onChange={(e) => setNewEvent(p => ({ ...p, status: e.target.value }))}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#115997] outline-none bg-white">
                  <option value="estimate_sent">Estimate</option>
                  <option value="booked">Job</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Name *</label>
                <input type="text" value={newEvent.name} onChange={(e) => setNewEvent(p => ({ ...p, name: e.target.value }))}
                  placeholder="Customer name" style={{ fontSize: '16px' }}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#115997] outline-none" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Phone</label>
                <input type="tel" value={newEvent.phone} onChange={(e) => setNewEvent(p => ({ ...p, phone: e.target.value }))}
                  placeholder="(770) 000-0000" style={{ fontSize: '16px' }}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#115997] outline-none" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Service *</label>
                <select value={newEvent.service_type} onChange={(e) => setNewEvent(p => ({ ...p, service_type: e.target.value, custom_service: '' }))}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-xs focus:ring-2 focus:ring-[#115997] outline-none bg-white">
                  <option value="">Select service...</option>
                  {SERVICE_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                {newEvent.service_type === 'Other' && (
                  <input type="text" value={newEvent.custom_service} onChange={(e) => setNewEvent(p => ({ ...p, custom_service: e.target.value }))}
                    placeholder="Describe the service..." style={{ fontSize: '16px' }}
                    className="w-full mt-2 px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#115997] outline-none" />
                )}
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Address</label>
                <input type="text" value={newEvent.address} onChange={(e) => setNewEvent(p => ({ ...p, address: e.target.value }))}
                  placeholder="Property address" style={{ fontSize: '16px' }}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#115997] outline-none" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Notes</label>
                <textarea value={newEvent.notes} onChange={(e) => setNewEvent(p => ({ ...p, notes: e.target.value }))}
                  rows={2} placeholder="Optional..." style={{ fontSize: '16px' }}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#115997] outline-none resize-none" />
              </div>
              <button onClick={handleAddEvent}
                disabled={saving || !newEvent.name || !serviceValid || !newEvent.scheduled_date}
                className="w-full mt-2 py-3 bg-[#115997] text-white rounded-xl font-semibold hover:bg-[#273373] disabled:opacity-50">
                {saving ? 'Adding...' : 'Add to Calendar'}
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes slideIn {
          from { transform: translateY(-10px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  )
}