'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAdminAuth } from '../layout'

const STATUS_COLORS = {
  estimate_sent: { bg: 'bg-indigo-50', text: 'text-indigo-700', dot: 'bg-indigo-500' },
  booked: { bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500' },
  in_progress: { bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500' },
  done: { bg: 'bg-green-50', text: 'text-green-700', dot: 'bg-green-500' },
  new: { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500' },
  contacted: { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500' },
  lost: { bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-500' },
}
const STATUS_LABELS = { estimate_sent: 'Estimate', booked: 'In Progress', in_progress: 'In Progress', done: 'Done', new: 'New', contacted: 'New', lost: 'Lost' }
const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const SERVICE_OPTIONS = ['Basement Waterproofing', 'Crawl Space Encapsulation', 'Crawl Space Repair', 'Crawl Space Waterproofing', 'Concrete Repair', 'Drainage', 'Foundation Repair', 'Other']
const TIME_OPTIONS = ['8:00 AM - 9:00 AM', '9:00 AM - 10:00 AM', '10:00 AM - 11:00 AM', '11:00 AM - 12:00 PM', '12:00 PM - 1:00 PM', '1:00 PM - 2:00 PM', '2:00 PM - 3:00 PM', '3:00 PM - 4:00 PM', '4:00 PM - 5:00 PM']

export default function CalendarPage() {
  const { user } = useAdminAuth()
  const isAdmin = user?.role === 'admin'
  const [allSubmissions, setAllSubmissions] = useState([])
  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [view, setView] = useState(typeof window !== 'undefined' && window.innerWidth < 640 ? 'week' : 'month')
  const [selectedDate, setSelectedDate] = useState(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [saving, setSaving] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')
  const [showHelp, setShowHelp] = useState(false)
  const [newEvent, setNewEvent] = useState({ name: '', phone: '', service_type: '', custom_service: '', scheduled_date: '', scheduled_time: '', status: 'estimate_sent', address: '', notes: '' })

  useEffect(() => { if (user) fetchSubmissions() }, [user])

  const fetchSubmissions = async () => {
    try {
      const params = user.role === 'member' ? `?user_id=${user.id}&user_role=member` : ''
      const r = await fetch('/api/contact' + params); const res = await r.json(); if (res.data) { setAllSubmissions(res.data); setSubmissions(res.data.filter(s => s.scheduled_date)) }
    } catch (e) {} finally { setLoading(false) }
  }

  const openAddModal = (date) => {
    const dateStr = date ? date.toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
    setNewEvent({ name: '', phone: '', service_type: '', custom_service: '', scheduled_date: dateStr, scheduled_time: '', status: 'estimate_sent', address: '', notes: '' }); setShowAddModal(true)
  }

  const handleAddEvent = async () => {
    const service = newEvent.service_type === 'Other' ? newEvent.custom_service : newEvent.service_type
    if (!newEvent.name || !service || !newEvent.scheduled_date) return; setSaving(true)
    try {
      const r = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: newEvent.name, phone: newEvent.phone || '0000000000', email: 'noemail@placeholder.com', service_type: service, message: newEvent.notes || null, source: 'calendar' }) })
      const res = await r.json()
      if (res.data) await fetch('/api/contact', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: res.data.id, status: newEvent.status, scheduled_date: newEvent.scheduled_date, scheduled_time: newEvent.scheduled_time || null, address: newEvent.address || null }) })
      setShowAddModal(false); setSuccessMsg('Event added'); fetchSubmissions(); setTimeout(() => setSuccessMsg(''), 2000)
    } catch (err) {} finally { setSaving(false) }
  }

  const getMonthDays = () => { const y = currentDate.getFullYear(), m = currentDate.getMonth(); const f = new Date(y, m, 1), l = new Date(y, m + 1, 0); const days = []; const pl = new Date(y, m, 0).getDate(); for (let i = f.getDay() - 1; i >= 0; i--) days.push({ date: new Date(y, m - 1, pl - i), isCurrentMonth: false }); for (let d = 1; d <= l.getDate(); d++) days.push({ date: new Date(y, m, d), isCurrentMonth: true }); const rem = 42 - days.length; for (let i = 1; i <= rem; i++) days.push({ date: new Date(y, m + 1, i), isCurrentMonth: false }); return days }
  const getWeekDays = () => { const s = new Date(currentDate); s.setDate(s.getDate() - s.getDay()); return Array.from({ length: 7 }, (_, i) => { const d = new Date(s); d.setDate(d.getDate() + i); return { date: d, isCurrentMonth: true } }) }
  const getEventsForDate = (date) => { const ds = date.toISOString().split('T')[0]; return submissions.filter(s => s.scheduled_date === ds) }
  const isToday = (d) => { const t = new Date(); return d.getDate() === t.getDate() && d.getMonth() === t.getMonth() && d.getFullYear() === t.getFullYear() }
  const isSameDate = (a, b) => a && b && a.getDate() === b.getDate() && a.getMonth() === b.getMonth() && a.getFullYear() === b.getFullYear()
  const navigate = (dir) => { const n = new Date(currentDate); if (view === 'month') n.setMonth(n.getMonth() + dir); else n.setDate(n.getDate() + dir * 7); setCurrentDate(n) }
  const goToToday = () => { setCurrentDate(new Date()); setSelectedDate(new Date()) }
  const formatPhone = (p) => { if (!p || p === '0000000000') return ''; const c = p.replace(/\D/g, ''); if (c.length === 10) return '(' + c.slice(0,3) + ') ' + c.slice(3,6) + '-' + c.slice(6); if (c.length === 11 && c[0] === '1') return '(' + c.slice(1,4) + ') ' + c.slice(4,7) + '-' + c.slice(7); return p }

  const days = view === 'month' ? getMonthDays() : getWeekDays()
  const selectedEvents = selectedDate ? getEventsForDate(selectedDate) : []
  const serviceValid = newEvent.service_type === 'Other' ? newEvent.custom_service.trim() : newEvent.service_type

  if (loading) return <div className="flex items-center justify-center min-h-[50vh]"><div className="flex flex-col items-center gap-3"><div className="w-10 h-10 border-4 border-[#115997] border-t-transparent rounded-full animate-spin" /><p className="text-sm text-gray-400 animate-pulse">Loading calendar...</p></div></div>

  return (
    <div className="px-4 py-5 sm:py-8">
      <div className="flex items-center justify-between mb-5 animate-[fadeUp_0.3s_ease-out]">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">{user?.role === 'member' ? 'My Calendar' : 'Calendar'}</h2>
          <p className="text-gray-400 text-sm mt-0.5">{submissions.length} scheduled</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setShowHelp(true)} className="px-3 py-2 text-xs font-medium text-gray-400 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:text-gray-600 transition-all flex items-center gap-1.5"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.065 2.05-1.37 2.772-1.153.508.153.942.535 1.025 1.059.108.685-.378 1.232-.816 1.627-.39.354-.816.659-.816 1.267V13m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>Help</button>
          {isAdmin && <button onClick={() => openAddModal(selectedDate || new Date())} className="px-3 py-2 text-xs font-semibold text-white bg-[#115997] rounded-lg hover:bg-[#0d4a7a] flex items-center gap-1 shadow-sm shadow-[#115997]/20 transition-all"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>Add</button>}
          <button onClick={goToToday} className="px-3 py-2 text-xs font-semibold text-[#115997] bg-[#115997]/[0.06] rounded-lg hover:bg-[#115997]/[0.1] transition-all">Today</button>
          <div className="flex bg-white rounded-lg p-0.5 border border-gray-200"><button onClick={() => setView('month')} className={'px-3 py-1.5 text-xs font-semibold rounded-md transition-all ' + (view === 'month' ? 'bg-[#115997] text-white shadow-sm' : 'text-gray-400')}>{view === 'month' ? 'Month' : 'Mo'}</button><button onClick={() => setView('week')} className={'px-3 py-1.5 text-xs font-semibold rounded-md transition-all ' + (view === 'week' ? 'bg-[#115997] text-white shadow-sm' : 'text-gray-400')}>{view === 'week' ? 'Week' : 'Wk'}</button></div>
        </div>
      </div>

      {successMsg && <div className="mb-4 rounded-xl p-3 text-sm bg-green-50 border border-green-200 text-green-700 flex items-center gap-2 animate-[fadeUp_0.2s_ease-out]"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>{successMsg}</div>}

      <div className="flex items-center justify-between mb-4 animate-[fadeUp_0.35s_ease-out]">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-white rounded-lg transition-all text-gray-400 hover:text-gray-600"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg></button>
        <h3 className="text-sm sm:text-base font-bold text-gray-900">{view === 'month' ? MONTHS[currentDate.getMonth()] + ' ' + currentDate.getFullYear() : (() => { const s = new Date(currentDate); s.setDate(s.getDate() - s.getDay()); const e = new Date(s); e.setDate(e.getDate() + 6); return s.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + ' — ' + e.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) })()}</h3>
        <button onClick={() => navigate(1)} className="p-2 hover:bg-white rounded-lg transition-all text-gray-400 hover:text-gray-600"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></button>
      </div>

      {/* Mobile Week Agenda */}
      {view === 'week' && (
        <div className="sm:hidden space-y-3 mb-4 animate-[fadeUp_0.4s_ease-out]">
          {(() => {
            const weekDays = getWeekDays(); const todayIndex = weekDays.findIndex(d => isToday(d.date))
            const reordered = todayIndex >= 0 ? [...weekDays.slice(todayIndex), ...weekDays.slice(0, todayIndex)] : weekDays
            return reordered.map((day, i) => {
              const events = getEventsForDate(day.date); const today = isToday(day.date); const isPast = day.date < new Date(new Date().setHours(0,0,0,0)) && !today
              return (
                <div key={i} className={'bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 ' + (isPast ? 'opacity-60' : '') + (today ? ' ring-2 ring-[#115997]' : '')}>
                  <div className={`px-4 py-3 flex items-center justify-between ${today ? 'bg-[#115997] text-white' : 'border-l-4 border-l-gray-200'}`}>
                    <div className="flex items-center gap-3">
                      <div className="text-center w-10"><p className={`text-[10px] font-bold uppercase ${today ? 'text-white/70' : 'text-gray-400'}`}>{DAYS_OF_WEEK[day.date.getDay()]}</p><p className={`text-xl font-extrabold ${today ? 'text-white' : 'text-gray-800'}`}>{day.date.getDate()}</p></div>
                      {today && <span className="text-[9px] font-bold bg-white/20 px-1.5 py-0.5 rounded-md">TODAY</span>}
                    </div>
                    {events.length > 0 && <span className={`text-xs font-bold ${today ? 'text-white/70' : 'text-gray-400'}`}>{events.length}</span>}
                  </div>
                  {events.length === 0 ? <div className="px-4 py-3"><p className="text-xs text-gray-300">{isPast ? 'No events' : 'Nothing scheduled'}</p></div> : (
                    <div className="divide-y divide-gray-50">
                      {events.map((event) => { const colors = STATUS_COLORS[event.status] || { bg: 'bg-gray-100', text: 'text-gray-700', dot: 'bg-gray-400' }; return (
                        <Link key={event.id} href={'/admin/contacts/' + event.id} className="flex items-start gap-3 px-4 py-3 active:bg-gray-50 transition-colors">
                          <div className={'w-1 self-stretch rounded-full flex-shrink-0 ' + colors.dot} />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5"><p className="font-bold text-gray-900 text-sm truncate">{event.name}</p><span className={'inline-flex px-1.5 py-0.5 rounded-md text-[9px] font-bold ' + colors.bg + ' ' + colors.text}>{STATUS_LABELS[event.status] || event.status}</span></div>
                            <p className="text-xs text-gray-400">{event.service_type}</p>
                            <div className="flex items-center gap-3 mt-1 text-xs text-gray-300">{event.scheduled_time && <span>{event.scheduled_time}</span>}{formatPhone(event.phone) && <span>{formatPhone(event.phone)}</span>}</div>
                          </div>
                          <svg className="w-4 h-4 text-gray-200 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        </Link>
                      ) })}
                    </div>
                  )}
                </div>
              )
            })
          })()}
        </div>
      )}

      {/* Desktop Grid */}
      {(view === 'month' || view === 'week') && (
        <div className={'bg-white rounded-xl shadow-sm overflow-hidden mb-4 border border-gray-100 animate-[fadeUp_0.4s_ease-out] ' + (view === 'week' ? 'hidden sm:block' : '')}>
          <div className="grid grid-cols-7 border-b border-gray-100">{DAYS_OF_WEEK.map((day) => <div key={day} className="py-2 text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">{day}</div>)}</div>
          <div className="grid grid-cols-7">
            {days.map((day, i) => {
              const events = getEventsForDate(day.date); const today = isToday(day.date); const selected = isSameDate(day.date, selectedDate)
              return (
                <button key={i} onClick={() => setSelectedDate(day.date)} className={'relative border-b border-r border-gray-50 transition-all text-left ' + (view === 'month' ? 'min-h-[72px] sm:min-h-[90px] p-1 sm:p-2' : 'min-h-[120px] p-2 sm:p-3') + (!day.isCurrentMonth ? ' bg-gray-50/30' : '') + (selected ? ' bg-[#115997]/[0.04] ring-1 ring-inset ring-[#115997]/20' : ' hover:bg-gray-50/50')}>
                  <span className={'inline-flex items-center justify-center text-xs sm:text-sm font-semibold rounded-lg w-6 h-6 sm:w-7 sm:h-7 ' + (today ? 'bg-[#115997] text-white shadow-sm' : '') + (!day.isCurrentMonth ? ' text-gray-300' : ' text-gray-700')}>{day.date.getDate()}</span>
                  {events.length > 0 && (<><div className="flex gap-0.5 mt-0.5 sm:hidden">{events.slice(0, 3).map((e, j) => <div key={j} className={'w-1.5 h-1.5 rounded-full ' + (STATUS_COLORS[e.status]?.dot || 'bg-gray-400')} />)}</div><div className="hidden sm:flex flex-col gap-0.5 mt-1">{events.slice(0, 2).map((e, j) => { const c = STATUS_COLORS[e.status] || { bg: 'bg-gray-100', text: 'text-gray-700' }; return <div key={j} className={'truncate text-[10px] font-semibold px-1.5 py-0.5 rounded-md ' + c.bg + ' ' + c.text}>{e.name.split(' ')[0]} · {STATUS_LABELS[e.status] || e.status}</div> })}{events.length > 2 && <span className="text-[10px] text-gray-300 px-1.5">+{events.length - 2}</span>}</div></>)}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Selected Date Detail */}
      {selectedDate && view === 'month' && (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 animate-[fadeUp_0.2s_ease-out]">
          <div className="px-4 sm:px-6 py-3.5 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-bold text-gray-900 text-sm">{selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}<span className="text-gray-300 font-normal ml-2">({selectedEvents.length})</span></h3>
            {isAdmin && <button onClick={() => openAddModal(selectedDate)} className="text-xs text-[#115997] font-semibold flex items-center gap-1 hover:underline"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>Add</button>}
          </div>
          {selectedEvents.length === 0 ? <div className="p-8 text-center"><p className="text-xs text-gray-300">Nothing scheduled</p></div> : (
            <div className="divide-y divide-gray-50">
              {selectedEvents.map((event) => { const colors = STATUS_COLORS[event.status] || { bg: 'bg-gray-100', text: 'text-gray-700', dot: 'bg-gray-400' }; return (
                <Link key={event.id} href={'/admin/contacts/' + event.id} className="flex items-start gap-3 p-4 sm:px-6 hover:bg-gray-50/50 transition-colors">
                  <div className={'w-1 self-stretch rounded-full flex-shrink-0 ' + colors.dot} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5"><p className="font-bold text-gray-900 text-sm truncate">{event.name}</p><span className={'inline-flex px-1.5 py-0.5 rounded-md text-[9px] font-bold ' + colors.bg + ' ' + colors.text}>{STATUS_LABELS[event.status] || event.status}</span></div>
                    <p className="text-xs text-gray-400">{event.service_type}</p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-300">{event.scheduled_time && <span>{event.scheduled_time}</span>}{formatPhone(event.phone) && <span>{formatPhone(event.phone)}</span>}</div>
                    {event.address && <p className="text-xs text-gray-300 mt-0.5">{event.address}</p>}
                  </div>
                  <svg className="w-4 h-4 text-gray-300 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </Link>
              ) })}
            </div>
          )}
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-3 px-1">{Object.entries(STATUS_LABELS).map(([key, label]) => { const c = STATUS_COLORS[key]; if (!c) return null; return <div key={key} className="flex items-center gap-1.5"><div className={'w-2 h-2 rounded-full ' + c.dot} /><span className="text-xs text-gray-400">{label}</span></div> })}</div>

      {/* Add Event Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4" onClick={() => setShowAddModal(false)}>
          <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-lg max-h-[85vh] overflow-y-auto animate-[fadeUp_0.2s_ease-out]" onClick={(e) => e.stopPropagation()}>
            <div className="p-4 sm:p-6 border-b border-gray-100">
              <div className="w-8 h-1 bg-gray-300 rounded-full mx-auto mb-3 sm:hidden" />
              <div className="flex items-center justify-between"><h3 className="text-lg font-bold text-gray-900">Add Event</h3><button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button></div>
            </div>
            <div className="p-4 sm:p-6 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div><label className="block text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-1">Date *</label><input type="date" value={newEvent.scheduled_date} onChange={(e) => setNewEvent(p => ({ ...p, scheduled_date: e.target.value }))} className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#115997]/20 outline-none transition-all" /></div>
                <div><label className="block text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-1">Time</label><select value={newEvent.scheduled_time} onChange={(e) => setNewEvent(p => ({ ...p, scheduled_time: e.target.value }))} className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-[#115997]/20 outline-none bg-white transition-all">{TIME_OPTIONS.map(t => <option key={t} value={t}>{t}</option>)}</select></div>
              </div>
              <div><label className="block text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-1">Type</label><select value={newEvent.status} onChange={(e) => setNewEvent(p => ({ ...p, status: e.target.value }))} className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#115997]/20 outline-none bg-white transition-all"><option value="estimate_sent">Estimate</option><option value="in_progress">Job</option></select></div>
              <div><label className="block text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-1">Name *</label><input type="text" value={newEvent.name} onChange={(e) => setNewEvent(p => ({ ...p, name: e.target.value }))} placeholder="Customer name" style={{ fontSize: '16px' }} className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#115997]/20 outline-none transition-all" /></div>
              <div><label className="block text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-1">Phone</label><input type="tel" value={newEvent.phone} onChange={(e) => setNewEvent(p => ({ ...p, phone: e.target.value }))} placeholder="(770) 000-0000" style={{ fontSize: '16px' }} className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#115997]/20 outline-none transition-all" /></div>
              <div>
                <label className="block text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-1">Service *</label>
                <select value={newEvent.service_type} onChange={(e) => setNewEvent(p => ({ ...p, service_type: e.target.value, custom_service: '' }))} className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-[#115997]/20 outline-none bg-white transition-all"><option value="">Select service...</option>{SERVICE_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}</select>
                {newEvent.service_type === 'Other' && <input type="text" value={newEvent.custom_service} onChange={(e) => setNewEvent(p => ({ ...p, custom_service: e.target.value }))} placeholder="Describe the service..." style={{ fontSize: '16px' }} className="w-full mt-2 px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#115997]/20 outline-none transition-all" />}
              </div>
              <div><label className="block text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-1">Address</label><input type="text" value={newEvent.address} onChange={(e) => setNewEvent(p => ({ ...p, address: e.target.value }))} placeholder="Property address" style={{ fontSize: '16px' }} className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#115997]/20 outline-none transition-all" /></div>
              <div><label className="block text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-1">Notes</label><textarea value={newEvent.notes} onChange={(e) => setNewEvent(p => ({ ...p, notes: e.target.value }))} rows={2} placeholder="Optional..." style={{ fontSize: '16px' }} className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#115997]/20 outline-none resize-none transition-all" /></div>
              <button onClick={handleAddEvent} disabled={saving || !newEvent.name || !serviceValid || !newEvent.scheduled_date} className="w-full mt-2 py-3 bg-[#115997] text-white rounded-xl font-semibold hover:bg-[#0d4a7a] disabled:opacity-40 shadow-sm shadow-[#115997]/20 transition-all">{saving ? 'Adding...' : 'Add to Calendar'}</button>
            </div>
          </div>
        </div>
      )}

      {/* Help Modal */}
      {showHelp && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4" onClick={() => setShowHelp(false)}>
          <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-lg max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-5 border-b border-gray-100"><div className="w-8 h-1 bg-gray-300 rounded-full mx-auto mb-3 sm:hidden" /><div className="flex items-center justify-between"><h3 className="text-lg font-bold text-gray-900">Calendar Help</h3><button onClick={() => setShowHelp(false)} className="text-gray-400 hover:text-gray-600"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button></div></div>
            <div className="p-5 space-y-5">
              <div><h4 className="text-sm font-bold text-gray-800 mb-1">What shows up here?</h4><p className="text-sm text-gray-500 leading-relaxed">Any contact with a scheduled date appears on the calendar. This includes estimates, inspections, and jobs.</p></div>
              <div><h4 className="text-sm font-bold text-gray-800 mb-1">Month vs Week view</h4><p className="text-sm text-gray-500 leading-relaxed">Month shows the full month with dots on busy days. Week shows a vertical agenda starting with today.</p></div>
              <div><h4 className="text-sm font-bold text-gray-800 mb-1">Tap an event</h4><p className="text-sm text-gray-500 leading-relaxed">Opens the contact detail page where you can call, text, reschedule, or update status.</p></div>
            </div>
            <div className="p-5 border-t border-gray-100"><button onClick={() => setShowHelp(false)} className="w-full py-3 bg-[#115997] text-white rounded-xl font-semibold hover:bg-[#0d4a7a] transition-colors">Got it</button></div>
          </div>
        </div>
      )}
    </div>
  )
}