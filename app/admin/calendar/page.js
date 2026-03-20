'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const STATUS_COLORS = {
  estimate_scheduled: { bg: 'bg-indigo-100', text: 'text-indigo-700', dot: 'bg-indigo-500' },
  estimate_completed: { bg: 'bg-purple-100', text: 'text-purple-700', dot: 'bg-purple-500' },
  job_booked: { bg: 'bg-emerald-100', text: 'text-emerald-700', dot: 'bg-emerald-500' },
  in_progress: { bg: 'bg-orange-100', text: 'text-orange-700', dot: 'bg-orange-500' },
  completed: { bg: 'bg-green-100', text: 'text-green-700', dot: 'bg-green-500' },
}

const STATUS_LABELS = {
  estimate_scheduled: 'Estimate',
  estimate_completed: 'Est. Done',
  job_booked: 'Job Booked',
  in_progress: 'In Progress',
  completed: 'Completed',
}

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

export default function CalendarPage() {
  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [view, setView] = useState('month') // 'month' or 'week'
  const [selectedDate, setSelectedDate] = useState(null)

  useEffect(() => {
    fetchSubmissions()
  }, [])

  const fetchSubmissions = async () => {
    try {
      const response = await fetch('/api/contact')
      const result = await response.json()
      if (result.data) {
        setSubmissions(result.data.filter(s => s.scheduled_date))
      }
    } catch (error) {
      console.error('Failed to fetch:', error)
    } finally {
      setLoading(false)
    }
  }

  // Calendar helpers
  const getMonthDays = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startPad = firstDay.getDay()
    const days = []

    // Previous month padding
    const prevLastDay = new Date(year, month, 0).getDate()
    for (let i = startPad - 1; i >= 0; i--) {
      days.push({ date: new Date(year, month - 1, prevLastDay - i), isCurrentMonth: false })
    }

    // Current month
    for (let d = 1; d <= lastDay.getDate(); d++) {
      days.push({ date: new Date(year, month, d), isCurrentMonth: true })
    }

    // Next month padding
    const remaining = 42 - days.length
    for (let i = 1; i <= remaining; i++) {
      days.push({ date: new Date(year, month + 1, i), isCurrentMonth: false })
    }

    return days
  }

  const getWeekDays = () => {
    const start = new Date(currentDate)
    start.setDate(start.getDate() - start.getDay())
    const days = []
    for (let i = 0; i < 7; i++) {
      const d = new Date(start)
      d.setDate(d.getDate() + i)
      days.push({ date: d, isCurrentMonth: true })
    }
    return days
  }

  const getEventsForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0]
    return submissions.filter(s => s.scheduled_date === dateStr)
  }

  const isToday = (date) => {
    const today = new Date()
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
  }

  const isSameDate = (a, b) => {
    if (!a || !b) return false
    return a.getDate() === b.getDate() &&
      a.getMonth() === b.getMonth() &&
      a.getFullYear() === b.getFullYear()
  }

  const navigate = (direction) => {
    const next = new Date(currentDate)
    if (view === 'month') {
      next.setMonth(next.getMonth() + direction)
    } else {
      next.setDate(next.getDate() + (direction * 7))
    }
    setCurrentDate(next)
  }

  const goToToday = () => {
    setCurrentDate(new Date())
    setSelectedDate(new Date())
  }

  const formatPhone = (phone) => {
    if (!phone) return ''
    const cleaned = phone.replace(/\D/g, '')
    if (cleaned.length === 10) return '(' + cleaned.slice(0, 3) + ') ' + cleaned.slice(3, 6) + '-' + cleaned.slice(6)
    if (cleaned.length === 11 && cleaned[0] === '1') return '(' + cleaned.slice(1, 4) + ') ' + cleaned.slice(4, 7) + '-' + cleaned.slice(7)
    return phone
  }

  const days = view === 'month' ? getMonthDays() : getWeekDays()
  const selectedEvents = selectedDate ? getEventsForDate(selectedDate) : []

  // Count totals for the visible period
  const allVisibleEvents = days.filter(d => d.isCurrentMonth).flatMap(d => getEventsForDate(d.date))
  const estimateCount = allVisibleEvents.filter(e => e.status === 'estimate_scheduled').length
  const jobCount = allVisibleEvents.filter(e => ['job_booked', 'in_progress'].includes(e.status)).length

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-10 h-10 border-4 border-[#115997] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="px-4 py-4 sm:py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div>
          <h2 className="text-lg sm:text-2xl font-bold text-[#273373]">Calendar</h2>
          <p className="text-gray-500 text-xs sm:text-sm">
            {estimateCount} estimate{estimateCount !== 1 ? 's' : ''} · {jobCount} job{jobCount !== 1 ? 's' : ''}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={goToToday}
            className="px-3 py-1.5 text-xs font-medium text-[#115997] bg-[#115997]/10 rounded-lg hover:bg-[#115997]/20 transition-colors"
          >
            Today
          </button>
          <div className="flex bg-gray-100 rounded-lg p-0.5">
            <button
              onClick={() => setView('month')}
              className={'px-3 py-1.5 text-xs font-medium rounded-md transition-colors ' +
                (view === 'month' ? 'bg-white text-[#115997] shadow-sm' : 'text-gray-500')}
            >
              Month
            </button>
            <button
              onClick={() => setView('week')}
              className={'px-3 py-1.5 text-xs font-medium rounded-md transition-colors ' +
                (view === 'week' ? 'bg-white text-[#115997] shadow-sm' : 'text-gray-500')}
            >
              Week
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h3 className="text-base sm:text-lg font-semibold text-[#273373]">
          {view === 'month'
            ? MONTHS[currentDate.getMonth()] + ' ' + currentDate.getFullYear()
            : (() => {
                const start = new Date(currentDate)
                start.setDate(start.getDate() - start.getDay())
                const end = new Date(start)
                end.setDate(end.getDate() + 6)
                return start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + ' — ' + end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
              })()
          }
        </h3>
        <button onClick={() => navigate(1)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-4">
        {/* Day headers */}
        <div className="grid grid-cols-7 border-b border-gray-100">
          {DAYS_OF_WEEK.map((day) => (
            <div key={day} className="py-2 text-center text-xs font-semibold text-gray-500 uppercase">
              {day}
            </div>
          ))}
        </div>

        {/* Days grid */}
        <div className={'grid grid-cols-7 ' + (view === 'month' ? '' : '')}>
          {days.map((day, i) => {
            const events = getEventsForDate(day.date)
            const today = isToday(day.date)
            const selected = isSameDate(day.date, selectedDate)

            return (
              <button
                key={i}
                onClick={() => setSelectedDate(day.date)}
                className={'relative border-b border-r border-gray-50 transition-colors text-left ' +
                  (view === 'month' ? 'min-h-[72px] sm:min-h-[90px] p-1 sm:p-2' : 'min-h-[120px] p-2 sm:p-3') +
                  (!day.isCurrentMonth ? ' bg-gray-50/50' : '') +
                  (selected ? ' bg-[#115997]/5 ring-1 ring-inset ring-[#115997]/20' : ' hover:bg-gray-50')}
              >
                <span className={'inline-flex items-center justify-center text-xs sm:text-sm font-medium rounded-full w-6 h-6 sm:w-7 sm:h-7 ' +
                  (today ? 'bg-[#115997] text-white' : '') +
                  (!day.isCurrentMonth ? ' text-gray-300' : ' text-gray-700')}>
                  {day.date.getDate()}
                </span>

                {/* Event dots (mobile) */}
                {events.length > 0 && (
                  <div className="flex gap-0.5 mt-0.5 sm:hidden">
                    {events.slice(0, 3).map((e, j) => {
                      const colors = STATUS_COLORS[e.status] || { dot: 'bg-gray-400' }
                      return <div key={j} className={'w-1.5 h-1.5 rounded-full ' + colors.dot} />
                    })}
                    {events.length > 3 && <span className="text-[8px] text-gray-400">+{events.length - 3}</span>}
                  </div>
                )}

                {/* Event chips (desktop) */}
                {events.length > 0 && (
                  <div className="hidden sm:flex flex-col gap-0.5 mt-1">
                    {events.slice(0, 2).map((e, j) => {
                      const colors = STATUS_COLORS[e.status] || { bg: 'bg-gray-100', text: 'text-gray-700' }
                      return (
                        <div key={j} className={'truncate text-[10px] font-medium px-1.5 py-0.5 rounded ' + colors.bg + ' ' + colors.text}>
                          {e.name.split(' ')[0]} · {STATUS_LABELS[e.status] || e.status}
                        </div>
                      )
                    })}
                    {events.length > 2 && (
                      <span className="text-[10px] text-gray-400 px-1.5">+{events.length - 2} more</span>
                    )}
                  </div>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Selected Date Detail */}
      {selectedDate && (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-800 text-sm sm:text-base">
              {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
              <span className="text-gray-400 font-normal ml-2">({selectedEvents.length} event{selectedEvents.length !== 1 ? 's' : ''})</span>
            </h3>
          </div>

          {selectedEvents.length === 0 ? (
            <div className="p-8 text-center">
              <svg className="w-10 h-10 text-gray-200 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-gray-400 text-sm">Nothing scheduled</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {selectedEvents.map((event) => {
                const colors = STATUS_COLORS[event.status] || { bg: 'bg-gray-100', text: 'text-gray-700', dot: 'bg-gray-400' }
                return (
                  <Link
                    key={event.id}
                    href={'/admin/contacts/' + event.id}
                    className="flex items-start gap-3 p-4 sm:px-6 hover:bg-gray-50 active:bg-gray-50 transition-colors"
                  >
                    <div className={'w-1 self-stretch rounded-full flex-shrink-0 ' + colors.dot} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold text-gray-900 text-sm truncate">{event.name}</p>
                        <span className={'inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium ' + colors.bg + ' ' + colors.text}>
                          {STATUS_LABELS[event.status] || event.status}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">{event.service_type}</p>
                      <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-500">
                        {event.scheduled_time && (
                          <span className="flex items-center gap-1">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {event.scheduled_time}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          {formatPhone(event.phone)}
                        </span>
                        {event.quoted_amount && (
                          <span className="font-medium text-gray-700">${Number(event.quoted_amount).toLocaleString()}</span>
                        )}
                      </div>
                      {event.address && (
                        <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {event.address}
                        </p>
                      )}
                    </div>
                    <svg className="w-4 h-4 text-gray-400 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
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
          const colors = STATUS_COLORS[key]
          return (
            <div key={key} className="flex items-center gap-1.5">
              <div className={'w-2 h-2 rounded-full ' + colors.dot} />
              <span className="text-xs text-gray-500">{label}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}