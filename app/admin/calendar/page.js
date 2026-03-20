'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const STATUS_COLORS = {
  estimate_scheduled: { bg: 'bg-indigo-100', text: 'text-indigo-700', dot: 'bg-indigo-500' },
  estimate_completed: { bg: 'bg-purple-100', text: 'text-purple-700', dot: 'bg-purple-500' },
  job_booked: { bg: 'bg-emerald-100', text: 'text-emerald-700', dot: 'bg-emerald-500' },
  in_progress: { bg: 'bg-orange-100', text: 'text-orange-700', dot: 'bg-orange-500' },
  completed: { bg: 'bg-green-100', text: 'text-green-700', dot: 'bg-green-500' },
  new: { bg: 'bg-blue-100', text: 'text-blue-700', dot: 'bg-blue-500' },
  contacted: { bg: 'bg-yellow-100', text: 'text-yellow-700', dot: 'bg-yellow-500' },
}
const STATUS_LABELS = {
  estimate_scheduled: 'Estimate', estimate_completed: 'Est. Done', job_booked: 'Job Booked',
  in_progress: 'In Progress', completed: 'Completed', new: 'New', contacted: 'Contacted',
}
const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const SERVICE_OPTIONS = [
  'Basement Waterproofing', 'Crawl Space Encapsulation', 'Crawl Space Repair',
  'Crawl Space Waterproofing', 'Concrete Repair', 'Drainage', 'Foundation Repair',
]

const TIME_OPTIONS = [
  '8:00 AM - 9:00 AM', '9:00 AM - 10:00 AM', '10:00 AM - 11:00 AM', '11:00 AM - 12:00 PM',
  '12:00 PM - 1:00 PM', '1:00 PM - 2:00 PM', '2:00 PM - 3:00 PM', '3:00 PM - 4:00 PM', '4:00 PM - 5:00 PM',
]

export default function CalendarPage() {
  const [allSubmissions, setAllSubmissions] = useState([])
  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [view, setView] = useState('month')
  const [selectedDate, setSelectedDate] = useState(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [addMode, setAddMode] = useState('new') // 'new' or 'existing'
  const [existingSearch, setExistingSearch] = useState('')
  const [saving, setSaving] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')
  const [newEvent, setNewEvent] = useState({ name: '', phone: '', email: '', service_type: '', scheduled_date: '', scheduled_time: '', status: 'estimate_scheduled', notes: '' })

  useEffect(() => { fetchSubmissions() }, [])

  const fetchSubmissions = async () => {
    try {
      const response = await fetch('/api/contact')
      const result = await response.json()
      if (result.data) {
        setAllSubmissions(result.data)
        setSubmissions(result.data.filter(s => s.scheduled_date))
      }
    } catch (error) { console.error('Failed to fetch:', error) }
    finally { setLoading(false) }
  }

  const openAddModal = (date) => {
    const dateStr = date ? date.toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
    setNewEvent({ name: '', phone: '', email: '', service_type: '', scheduled_date: dateStr, scheduled_time: '', status: 'estimate_scheduled', notes: '' })
    setAddMode('new')
    setExistingSearch('')
    setShowAddModal(true)
  }

  const handleAddNew = async () => {
    if (!newEvent.name || !newEvent.phone || !newEvent.service_type || !newEvent.scheduled_date) return
    setSaving(true)
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newEvent.name,
          phone: newEvent.phone,
          email: newEvent.email || 'noemail@placeholder.com',
          service_type: newEvent.service_type,
          message: newEvent.notes || null,
        }),
      })
      const result = await response.json()
      if (result.data) {
        // Now set the scheduled date and status
        await fetch('/api/contact', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: result.data.id,
            status: newEvent.status,
            scheduled_date: newEvent.scheduled_date,
            scheduled_time: newEvent.scheduled_time || null,
          }),
        })
      }
      setShowAddModal(false)
      setSuccessMsg('Event added')
      fetchSubmissions()
      setTimeout(() => setSuccessMsg(''), 2000)
    } catch (err) { console.error('Failed to add:', err) }
    finally { setSaving(false) }
  }

  const handleScheduleExisting = async (contact) => {
    setSaving(true)
    try {
      await fetch('/api/contact', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: contact.id,
          scheduled_date: newEvent.scheduled_date,
          scheduled_time: newEvent.scheduled_time || null,
          status: newEvent.status,
        }),
      })
      await fetch('/api/admin/activity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contact_id: contact.id, action: 'status_change', old_value: contact.status, new_value: newEvent.status, note: 'Scheduled from calendar' }),
      })
      setShowAddModal(false)
      setSuccessMsg('Scheduled ' + contact.name)
      fetchSubmissions()
      setTimeout(() => setSuccessMsg(''), 2000)
    } catch (err) { console.error('Failed:', err) }
    finally { setSaving(false) }
  }

  const getMonthDays = () => {
    const year = currentDate.getFullYear(), month = currentDate.getMonth()
    const firstDay = new Date(year, month, 1), lastDay = new Date(year, month + 1, 0)
    const days = []
    const prevLast = new Date(year, month, 0).getDate()
    for (let i = firstDay.getDay() - 1; i >= 0; i--) days.push({ date: new Date(year, month - 1, prevLast - i), isCurrentMonth: false })
    for (let d = 1; d <= lastDay.getDate(); d++) days.push({ date: new Date(year, month, d), isCurrentMonth: true })
    const rem = 42 - days.length
    for (let i = 1; i <= rem; i++) days.push({ date: new Date(year, month + 1, i), isCurrentMonth: false })
    return days
  }

  const getWeekDays = () => {
    const start = new Date(currentDate); start.setDate(start.getDate() - start.getDay())
    return Array.from({ length: 7 }, (_, i) => { const d = new Date(start); d.setDate(d.getDate() + i); return { date: d, isCurrentMonth: true } })
  }

  const getEventsForDate = (date) => { const ds = date.toISOString().split('T')[0]; return submissions.filter(s => s.scheduled_date === ds) }
  const isToday = (d) => { const t = new Date(); return d.getDate() === t.getDate() && d.getMonth() === t.getMonth() && d.getFullYear() === t.getFullYear() }
  const isSameDate = (a, b) => a && b && a.getDate() === b.getDate() && a.getMonth() === b.getMonth() && a.getFullYear() === b.getFullYear()
  const navigate = (dir) => { const n = new Date(currentDate); if (view === 'month') n.setMonth(n.getMonth() + dir); else n.setDate(n.getDate() + dir * 7); setCurrentDate(n) }
  const goToToday = () => { setCurrentDate(new Date()); setSelectedDate(new Date()) }
  const formatPhone = (phone) => { if (!phone) return ''; const c = phone.replace(/\D/g, ''); if (c.length === 10) return '(' + c.slice(0,3) + ') ' + c.slice(3,6) + '-' + c.slice(6); if (c.length === 11 && c[0] === '1') return '(' + c.slice(1,4) + ') ' + c.slice(4,7) + '-' + c.slice(7); return phone }
  const formatDate = (d) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

  const days = view === 'month' ? getMonthDays() : getWeekDays()
  const selectedEvents = selectedDate ? getEventsForDate(selectedDate) : []
  const unscheduledLeads = allSubmissions.filter(s => !s.scheduled_date && !['completed', 'closed_lost'].includes(s.status))

  // Existing contacts filtered by search
  const filteredExisting = existingSearch
    ? unscheduledLeads.filter(s => s.name.toLowerCase().includes(existingSearch.toLowerCase()) || s.phone.includes(existingSearch) || s.service_type.toLowerCase().includes(existingSearch.toLowerCase()))
    : unscheduledLeads.slice(0, 10)

  if (loading) return <div className="flex items-center justify-center min-h-[50vh]"><div className="w-10 h-10 border-4 border-[#115997] border-t-transparent rounded-full animate-spin" /></div>

  return (
    <div className="px-4 py-4 sm:py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div>
          <h2 className="text-lg sm:text-2xl font-bold text-[#273373]">Calendar</h2>
          <p className="text-gray-500 text-xs sm:text-sm">{submissions.length} scheduled events</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => openAddModal(selectedDate || new Date())} className="px-3 py-1.5 text-xs font-medium text-white bg-[#115997] rounded-lg hover:bg-[#273373] transition-colors flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            Add Event
          </button>
          <button onClick={goToToday} className="px-3 py-1.5 text-xs font-medium text-[#115997] bg-[#115997]/10 rounded-lg hover:bg-[#115997]/20 transition-colors">Today</button>
          <div className="flex bg-gray-100 rounded-lg p-0.5">
            <button onClick={() => setView('month')} className={'px-3 py-1.5 text-xs font-medium rounded-md transition-colors ' + (view === 'month' ? 'bg-white text-[#115997] shadow-sm' : 'text-gray-500')}>Month</button>
            <button onClick={() => setView('week')} className={'px-3 py-1.5 text-xs font-medium rounded-md transition-colors ' + (view === 'week' ? 'bg-white text-[#115997] shadow-sm' : 'text-gray-500')}>Week</button>
          </div>
        </div>
      </div>

      {successMsg && (
        <div className="mb-4 rounded-xl p-3 text-sm bg-green-50 border border-green-200 text-green-700 flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          {successMsg}
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-lg"><svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg></button>
        <h3 className="text-base sm:text-lg font-semibold text-[#273373]">
          {view === 'month' ? MONTHS[currentDate.getMonth()] + ' ' + currentDate.getFullYear() : (() => { const s = new Date(currentDate); s.setDate(s.getDate() - s.getDay()); const e = new Date(s); e.setDate(e.getDate() + 6); return s.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + ' — ' + e.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) })()}
        </h3>
        <button onClick={() => navigate(1)} className="p-2 hover:bg-gray-100 rounded-lg"><svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></button>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-4">
        <div className="grid grid-cols-7 border-b border-gray-100">
          {DAYS_OF_WEEK.map((day) => <div key={day} className="py-2 text-center text-xs font-semibold text-gray-500 uppercase">{day}</div>)}
        </div>
        <div className="grid grid-cols-7">
          {days.map((day, i) => {
            const events = getEventsForDate(day.date)
            const today = isToday(day.date)
            const selected = isSameDate(day.date, selectedDate)
            return (
              <button key={i} onClick={() => setSelectedDate(day.date)}
                className={'relative border-b border-r border-gray-50 transition-colors text-left ' + (view === 'month' ? 'min-h-[72px] sm:min-h-[90px] p-1 sm:p-2' : 'min-h-[120px] p-2 sm:p-3') + (!day.isCurrentMonth ? ' bg-gray-50/50' : '') + (selected ? ' bg-[#115997]/5 ring-1 ring-inset ring-[#115997]/20' : ' hover:bg-gray-50')}>
                <span className={'inline-flex items-center justify-center text-xs sm:text-sm font-medium rounded-full w-6 h-6 sm:w-7 sm:h-7 ' + (today ? 'bg-[#115997] text-white' : '') + (!day.isCurrentMonth ? ' text-gray-300' : ' text-gray-700')}>{day.date.getDate()}</span>
                {events.length > 0 && (
                  <>
                    <div className="flex gap-0.5 mt-0.5 sm:hidden">
                      {events.slice(0, 3).map((e, j) => <div key={j} className={'w-1.5 h-1.5 rounded-full ' + (STATUS_COLORS[e.status]?.dot || 'bg-gray-400')} />)}
                      {events.length > 3 && <span className="text-[8px] text-gray-400">+{events.length - 3}</span>}
                    </div>
                    <div className="hidden sm:flex flex-col gap-0.5 mt-1">
                      {events.slice(0, 2).map((e, j) => {
                        const c = STATUS_COLORS[e.status] || { bg: 'bg-gray-100', text: 'text-gray-700' }
                        return <div key={j} className={'truncate text-[10px] font-medium px-1.5 py-0.5 rounded ' + c.bg + ' ' + c.text}>{e.name.split(' ')[0]} · {STATUS_LABELS[e.status] || e.status}</div>
                      })}
                      {events.length > 2 && <span className="text-[10px] text-gray-400 px-1.5">+{events.length - 2} more</span>}
                    </div>
                  </>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Selected Date Detail */}
      {selectedDate && (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-semibold text-gray-800 text-sm sm:text-base">
              {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
              <span className="text-gray-400 font-normal ml-2">({selectedEvents.length})</span>
            </h3>
            <button onClick={() => openAddModal(selectedDate)} className="text-sm text-[#115997] font-medium hover:underline flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              Add
            </button>
          </div>
          {selectedEvents.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-400 text-sm mb-3">Nothing scheduled</p>
              <button onClick={() => openAddModal(selectedDate)} className="text-sm text-[#115997] font-medium hover:underline">Add an event →</button>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {selectedEvents.map((event) => {
                const colors = STATUS_COLORS[event.status] || { bg: 'bg-gray-100', text: 'text-gray-700', dot: 'bg-gray-400' }
                return (
                  <Link key={event.id} href={'/admin/contacts/' + event.id} className="flex items-start gap-3 p-4 sm:px-6 hover:bg-gray-50 transition-colors">
                    <div className={'w-1 self-stretch rounded-full flex-shrink-0 ' + colors.dot} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold text-gray-900 text-sm truncate">{event.name}</p>
                        <span className={'inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium ' + colors.bg + ' ' + colors.text}>{STATUS_LABELS[event.status] || event.status}</span>
                      </div>
                      <p className="text-xs text-gray-500">{event.service_type}</p>
                      <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-500">
                        {event.scheduled_time && <span>{event.scheduled_time}</span>}
                        <span>{formatPhone(event.phone)}</span>
                      </div>
                      {event.address && <p className="text-xs text-gray-400 mt-1">{event.address}</p>}
                    </div>
                    <svg className="w-4 h-4 text-gray-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      )}

      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-3 px-1">
        {Object.entries(STATUS_LABELS).map(([key, label]) => {
          const c = STATUS_COLORS[key]
          if (!c) return null
          return <div key={key} className="flex items-center gap-1.5"><div className={'w-2 h-2 rounded-full ' + c.dot} /><span className="text-xs text-gray-500">{label}</span></div>
        })}
      </div>

      {/* Add Event Modal */}
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

              {/* Mode toggle */}
              <div className="flex bg-gray-100 rounded-lg p-0.5 mt-4">
                <button onClick={() => setAddMode('new')} className={'flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ' + (addMode === 'new' ? 'bg-white text-[#115997] shadow-sm' : 'text-gray-500')}>New Contact</button>
                <button onClick={() => setAddMode('existing')} className={'flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ' + (addMode === 'existing' ? 'bg-white text-[#115997] shadow-sm' : 'text-gray-500')}>
                  Existing Lead
                  {unscheduledLeads.length > 0 && <span className="ml-1 text-xs text-gray-400">({unscheduledLeads.length})</span>}
                </button>
              </div>
            </div>

            <div className="p-4 sm:p-6">
              {/* Shared fields: date, time, status */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Date</label>
                  <input type="date" value={newEvent.scheduled_date} onChange={(e) => setNewEvent(prev => ({ ...prev, scheduled_date: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#115997] focus:border-transparent outline-none" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Time</label>
                  <select value={newEvent.scheduled_time} onChange={(e) => setNewEvent(prev => ({ ...prev, scheduled_time: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#115997] focus:border-transparent outline-none bg-white">
                    <option value="">Select time...</option>
                    {TIME_OPTIONS.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-xs text-gray-500 mb-1">Type</label>
                <select value={newEvent.status} onChange={(e) => setNewEvent(prev => ({ ...prev, status: e.target.value }))}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#115997] focus:border-transparent outline-none bg-white">
                  <option value="estimate_scheduled">Estimate</option>
                  <option value="job_booked">Job</option>
                  <option value="in_progress">In Progress</option>
                </select>
              </div>

              {addMode === 'new' ? (
                <>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Name *</label>
                      <input type="text" value={newEvent.name} onChange={(e) => setNewEvent(prev => ({ ...prev, name: e.target.value }))} placeholder="Customer name"
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#115997] focus:border-transparent outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Phone *</label>
                      <input type="tel" value={newEvent.phone} onChange={(e) => setNewEvent(prev => ({ ...prev, phone: e.target.value }))} placeholder="(770) 000-0000"
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#115997] focus:border-transparent outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Email</label>
                      <input type="email" value={newEvent.email} onChange={(e) => setNewEvent(prev => ({ ...prev, email: e.target.value }))} placeholder="Optional"
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#115997] focus:border-transparent outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Service *</label>
                      <select value={newEvent.service_type} onChange={(e) => setNewEvent(prev => ({ ...prev, service_type: e.target.value }))}
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#115997] focus:border-transparent outline-none bg-white">
                        <option value="">Select service...</option>
                        {SERVICE_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Notes</label>
                      <textarea value={newEvent.notes} onChange={(e) => setNewEvent(prev => ({ ...prev, notes: e.target.value }))} rows={2} placeholder="Optional notes..."
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#115997] focus:border-transparent outline-none resize-none" />
                    </div>
                  </div>
                  <button onClick={handleAddNew} disabled={saving || !newEvent.name || !newEvent.phone || !newEvent.service_type}
                    className="w-full mt-4 py-3 bg-[#115997] text-white rounded-xl font-semibold hover:bg-[#273373] transition-colors disabled:opacity-50">
                    {saving ? 'Adding...' : 'Add to Calendar'}
                  </button>
                </>
              ) : (
                <>
                  <div className="mb-3">
                    <div className="relative">
                      <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                      <input type="text" placeholder="Search existing leads..." value={existingSearch} onChange={(e) => setExistingSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#115997] focus:border-transparent outline-none" />
                    </div>
                  </div>
                  {filteredExisting.length === 0 ? (
                    <div className="py-6 text-center text-sm text-gray-400">No unscheduled leads found</div>
                  ) : (
                    <div className="space-y-2 max-h-[300px] overflow-y-auto">
                      {filteredExisting.map((contact) => (
                        <button key={contact.id} onClick={() => handleScheduleExisting(contact)} disabled={saving}
                          className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left disabled:opacity-50">
                          <div className="min-w-0">
                            <p className="font-medium text-sm text-gray-900 truncate">{contact.name}</p>
                            <p className="text-xs text-gray-500">{contact.service_type} · {formatPhone(contact.phone)}</p>
                          </div>
                          <svg className="w-4 h-4 text-[#115997] flex-shrink-0 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                        </button>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}