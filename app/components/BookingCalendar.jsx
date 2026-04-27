'use client'

import { useState } from 'react'
import { notify } from './notify'

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const TIME_SLOTS = [
  '8:00 AM - 9:00 AM',
  '9:00 AM - 10:00 AM',
  '10:00 AM - 11:00 AM',
  '11:00 AM - 12:00 PM',
  '12:00 PM - 1:00 PM',
  '1:00 PM - 2:00 PM',
  '2:00 PM - 3:00 PM',
  '3:00 PM - 4:00 PM',
  '4:00 PM - 5:00 PM',
]

export default function BookingCalendar({ leadId, leadName, onComplete, variant = 'light' }) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState('')
  const [status, setStatus] = useState('idle')
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Earliest bookable date is tomorrow
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  const firstName = leadName?.split(' ')[0] || ''

  const getDays = () => {
    const y = currentMonth.getFullYear()
    const m = currentMonth.getMonth()
    const first = new Date(y, m, 1)
    const last = new Date(y, m + 1, 0)
    const days = []
    for (let i = 0; i < first.getDay(); i++) {
      const d = new Date(y, m, -first.getDay() + i + 1)
      days.push({ date: d, disabled: true, outside: true })
    }
    for (let d = 1; d <= last.getDate(); d++) {
      const date = new Date(y, m, d)
      const isPast = date < tomorrow // Changed: today is no longer selectable
      const isSunday = date.getDay() === 0
      days.push({ date, disabled: isPast || isSunday, outside: false })
    }
    const rem = 42 - days.length
    for (let i = 1; i <= rem; i++) {
      days.push({ date: new Date(y, m + 1, i), disabled: true, outside: true })
    }
    return days
  }

  const isSelected = (d) =>
    selectedDate &&
    d.getDate() === selectedDate.getDate() &&
    d.getMonth() === selectedDate.getMonth() &&
    d.getFullYear() === selectedDate.getFullYear()

  const isToday = (d) =>
    d.getDate() === today.getDate() &&
    d.getMonth() === today.getMonth() &&
    d.getFullYear() === today.getFullYear()

  const canGoPrev = () => {
    const now = new Date()
    return (
      currentMonth.getFullYear() > now.getFullYear() ||
      (currentMonth.getFullYear() === now.getFullYear() && currentMonth.getMonth() > now.getMonth())
    )
  }

  const navigate = (dir) => {
    if (dir === -1 && !canGoPrev()) return
    setCurrentMonth((prev) => {
      const n = new Date(prev)
      n.setMonth(n.getMonth() + dir)
      return n
    })
  }

  const handleBook = async () => {
    if (!selectedDate || !selectedTime || !leadId) return
    setStatus('saving')
    try {
      const dateStr = selectedDate.toISOString().split('T')[0]
      await fetch('/api/contact', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: leadId,
          scheduled_date: dateStr,
          scheduled_time: selectedTime,
          status: 'estimate_sent',
        }),
      })
      notify(leadId, 'booked')
      setStatus('done')
    } catch {
      setStatus('idle')
    }
  }

  const dark = variant === 'dark'

  if (status === 'done') {
    return (
      <div className={`rounded-xl p-8 text-center ${dark ? 'bg-green-500/20 backdrop-blur-sm' : 'bg-white border border-gray-100 shadow-md'}`}>
        <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${dark ? 'bg-green-400/20' : 'bg-green-100'}`}>
          <svg className={`w-8 h-8 ${dark ? 'text-green-400' : 'text-green-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className={`text-2xl font-bold mb-2 ${dark ? 'text-white' : 'text-[#273373]'}`}>You&apos;re All Set{firstName ? `, ${firstName}` : ''}!</h3>
        <p className={`mb-1 ${dark ? 'text-white/90' : 'text-gray-600'}`}>
          Your free estimate is scheduled for
        </p>
        <p className={`text-lg font-semibold mb-4 ${dark ? 'text-white' : 'text-[#115997]'}`}>
          {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} — {selectedTime}
        </p>
        <p className={`text-sm ${dark ? 'text-white/70' : 'text-gray-500'}`}>
          Our team will confirm your appointment shortly.
        </p>
        {onComplete && (
          <button onClick={onComplete} className={`mt-6 px-6 py-2 rounded-lg font-semibold transition-colors ${dark ? 'bg-white text-[#273373] hover:bg-gray-100' : 'text-[#115997] hover:underline'}`}>
            Done
          </button>
        )}
      </div>
    )
  }

  const days = getDays()

  return (
    <div className={`rounded-xl overflow-hidden ${dark ? 'bg-white/10 backdrop-blur-sm' : 'bg-white border border-gray-100 shadow-md'}`}>
      <div className={`px-5 py-4 ${dark ? 'border-b border-white/10' : 'border-b border-gray-100'}`}>
        <div className="flex items-center gap-2 mb-1">
          <div className={`w-2 h-2 rounded-full ${dark ? 'bg-[#84d2f2]' : 'bg-[#115997]'}`} />
          <span className={`text-xs font-semibold uppercase tracking-wider ${dark ? 'text-white/60' : 'text-gray-400'}`}>Step 2 of 2</span>
        </div>
        <h3 className={`text-xl font-bold ${dark ? 'text-white' : 'text-[#273373]'}`}>
          Choose a Preferred Date
        </h3>
        <p className={`text-sm mt-1 ${dark ? 'text-white/70' : 'text-gray-500'}`}>
          Pick a date and time that works best for your free estimate.
        </p>
      </div>

      <div className="px-5 py-4">
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={() => navigate(-1)}
            disabled={!canGoPrev()}
            className={`p-1.5 rounded-lg transition-colors disabled:opacity-30 ${dark ? 'hover:bg-white/10 text-white' : 'hover:bg-gray-100 text-gray-600'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <span className={`text-sm font-semibold ${dark ? 'text-white' : 'text-[#273373]'}`}>
            {MONTHS[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </span>
          <button
            onClick={() => navigate(1)}
            className={`p-1.5 rounded-lg transition-colors ${dark ? 'hover:bg-white/10 text-white' : 'hover:bg-gray-100 text-gray-600'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>

        <div className="grid grid-cols-7 mb-1">
          {DAYS.map((d) => (
            <div key={d} className={`text-center text-[10px] font-semibold uppercase py-1 ${dark ? 'text-white/40' : 'text-gray-400'}`}>{d}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-[2px]">
          {days.map((day, i) => {
            const sel = isSelected(day.date)
            const tod = isToday(day.date)
            return (
              <button
                key={i}
                disabled={day.disabled}
                onClick={() => { setSelectedDate(day.date); setSelectedTime('') }}
                className={
                  'relative flex items-center justify-center h-9 sm:h-10 rounded-lg text-sm font-medium transition-all ' +
                  (day.disabled
                    ? (day.outside
                        ? (dark ? 'text-white/10' : 'text-gray-200')
                        : (dark ? 'text-white/20 line-through' : 'text-gray-300 line-through')) + ' cursor-default'
                    : sel
                      ? 'bg-[#115997] text-white shadow-md'
                      : tod
                        ? (dark ? 'bg-white/15 text-white font-bold' : 'bg-[#115997]/10 text-[#115997] font-bold')
                        : (dark ? 'text-white hover:bg-white/10' : 'text-gray-700 hover:bg-gray-100')
                  )
                }
              >
                {day.date.getDate()}
              </button>
            )
          })}
        </div>
      </div>

      {selectedDate && (
        <div className={`px-5 py-4 ${dark ? 'border-t border-white/10' : 'border-t border-gray-100'}`}>
          <p className={`text-xs font-semibold uppercase tracking-wider mb-3 ${dark ? 'text-white/50' : 'text-gray-400'}`}>
            {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })} — Select a Time
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {TIME_SLOTS.map((slot) => (
              <button
                key={slot}
                onClick={() => setSelectedTime(slot)}
                className={
                  'px-3 py-2.5 rounded-lg text-xs font-medium transition-all ' +
                  (selectedTime === slot
                    ? 'bg-[#115997] text-white shadow-md'
                    : dark
                      ? 'bg-white/10 text-white hover:bg-white/20'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                  )
                }
              >
                {slot}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className={`px-5 py-4 flex flex-col gap-2 ${dark ? 'border-t border-white/10' : 'border-t border-gray-100'}`}>
        <button
          onClick={handleBook}
          disabled={!selectedDate || !selectedTime || status === 'saving'}
          className="w-full py-3 rounded-xl font-semibold text-white bg-[#115997] hover:bg-[#273373] disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
        >
          {status === 'saving' ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Booking...
            </>
          ) : (
            <>
              Confirm Date
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </>
          )}
        </button>
        <button
          onClick={() => { notify(leadId, 'skipped'); onComplete?.() }}
          className={`w-full py-2 rounded-lg text-sm font-medium transition-colors ${dark ? 'text-white/60 hover:text-white/80' : 'text-gray-400 hover:text-gray-600'}`}
        >
          Skip — I&apos;ll schedule later
        </button>
      </div>
    </div>
  )
}