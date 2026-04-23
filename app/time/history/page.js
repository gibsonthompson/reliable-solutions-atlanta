'use client'

import { useState, useEffect, useCallback } from 'react'
import { useTimeAuth } from '../layout'

export default function HistoryPage() {
  const { user } = useTimeAuth()
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [weekOffset, setWeekOffset] = useState(0)
  const [weekTotals, setWeekTotals] = useState({ total: 0, regular: 0, overtime: 0, status: 'pending' })

  const getWeekRange = useCallback((offset = 0) => {
    const now = new Date()
    const day = now.getDay()
    const monday = new Date(now)
    monday.setDate(now.getDate() - (day === 0 ? 6 : day - 1) + (offset * 7))
    monday.setHours(0, 0, 0, 0)
    const sunday = new Date(monday)
    sunday.setDate(monday.getDate() + 6)
    sunday.setHours(23, 59, 59, 999)
    return { start: monday, end: sunday }
  }, [])

  const fetchEntries = useCallback(async () => {
    if (!user?.id) return
    setLoading(true)
    try {
      const { start, end } = getWeekRange(weekOffset)
      const r = await fetch(`/api/time/entries?user_id=${user.id}&start=${start.toISOString()}&end=${end.toISOString()}`)
      const data = await r.json()
      setEntries(data.entries || [])

      const totalMins = (data.entries || []).reduce((sum, e) => sum + (e.duration_minutes || 0), 0)
      const totalHours = totalMins / 60
      const regular = Math.min(totalHours, 40)
      const overtime = Math.max(0, totalHours - 40)
      setWeekTotals({
        total: totalHours,
        regular,
        overtime,
        status: data.week_status || 'pending'
      })
    } catch (e) {}
    finally { setLoading(false) }
  }, [user?.id, weekOffset, getWeekRange])

  useEffect(() => { fetchEntries() }, [fetchEntries])

  const { start: weekStart, end: weekEnd } = getWeekRange(weekOffset)

  const formatTime = (ts) => ts ? new Date(ts).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }) : '--'
  const formatDuration = (mins) => {
    if (!mins) return '0m'
    const h = Math.floor(mins / 60)
    const m = mins % 60
    if (h === 0) return `${m}m`
    return `${h}h ${m}m`
  }
  const formatHours = (h) => h.toFixed(1) + 'h'

  // Group entries by day
  const grouped = entries.reduce((acc, entry) => {
    const day = new Date(entry.clock_in).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
    if (!acc[day]) acc[day] = { entries: [], total: 0 }
    acc[day].entries.push(entry)
    acc[day].total += entry.duration_minutes || 0
    return acc
  }, {})

  return (
    <div className="px-4 py-4">
      {/* Week Navigation */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => setWeekOffset(p => p - 1)} className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-white">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <div className="text-center">
          <h2 className="text-sm font-bold text-gray-900">
            {weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – {weekEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </h2>
          {weekOffset !== 0 && (
            <button onClick={() => setWeekOffset(0)} className="text-[11px] text-[#115997] font-medium mt-0.5">This week</button>
          )}
        </div>
        <button onClick={() => setWeekOffset(p => p + 1)} className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-white">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>

      {/* Weekly Totals Card */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-900 text-sm">Weekly totals</h3>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
            weekTotals.status === 'approved' ? 'bg-green-100 text-green-700' :
            weekTotals.status === 'rejected' ? 'bg-red-100 text-red-700' :
            'bg-gray-100 text-gray-500'
          }`}>{weekTotals.status}</span>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-gray-50 rounded-lg p-3 text-center">
            <p className="text-[10px] text-gray-400 uppercase tracking-wide font-semibold">Total</p>
            <p className="text-xl font-bold text-gray-900 mt-0.5">{formatHours(weekTotals.total)}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3 text-center">
            <p className="text-[10px] text-gray-400 uppercase tracking-wide font-semibold">Regular</p>
            <p className="text-xl font-bold text-emerald-600 mt-0.5">{formatHours(weekTotals.regular)}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3 text-center">
            <p className="text-[10px] text-gray-400 uppercase tracking-wide font-semibold">Overtime</p>
            <p className={`text-xl font-bold mt-0.5 ${weekTotals.overtime > 0 ? 'text-amber-600' : 'text-gray-300'}`}>
              {formatHours(weekTotals.overtime)}
            </p>
          </div>
        </div>
        {/* Hours bar */}
        <div className="mt-3">
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${Math.min(100, (weekTotals.total / 50) * 100)}%`,
                background: weekTotals.overtime > 0
                  ? 'linear-gradient(90deg, #10b981 0%, #10b981 ' + ((weekTotals.regular / weekTotals.total) * 100) + '%, #f59e0b ' + ((weekTotals.regular / weekTotals.total) * 100) + '%, #f59e0b 100%)'
                  : '#10b981'
              }} />
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-[10px] text-gray-300">0h</span>
            <span className="text-[10px] text-gray-400 font-medium">40h</span>
            <span className="text-[10px] text-gray-300">50h</span>
          </div>
        </div>
      </div>

      {/* Entries grouped by day */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="w-8 h-8 border-3 border-[#115997] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : Object.keys(grouped).length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <p className="text-gray-400 text-sm">No time entries this week</p>
        </div>
      ) : (
        <div className="space-y-3">
          {Object.entries(grouped).map(([day, data]) => (
            <div key={day} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="px-4 py-2.5 bg-gray-50 flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-700">{day}</span>
                <span className="text-xs font-bold text-gray-900">{formatDuration(data.total)}</span>
              </div>
              <div className="divide-y divide-gray-50">
                {data.entries.map((entry) => (
                  <div key={entry.id} className="px-4 py-2.5 flex items-center justify-between">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                        entry.entry_type === 'break' ? 'bg-amber-400' :
                        entry.entry_type === 'job' ? 'bg-blue-400' : 'bg-gray-400'
                      }`} />
                      <div className="min-w-0">
                        <p className="text-sm text-gray-700">
                          {formatTime(entry.clock_in)} — {entry.clock_out ? formatTime(entry.clock_out) : <span className="text-emerald-500 font-medium">Active</span>}
                        </p>
                        {entry.job_address && <p className="text-xs text-gray-400 truncate">{entry.job_address}</p>}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className={`text-[9px] font-medium px-1.5 py-0.5 rounded ${
                        entry.status === 'approved' ? 'bg-green-100 text-green-700' :
                        entry.status === 'rejected' ? 'bg-red-100 text-red-700' :
                        'bg-gray-100 text-gray-500'
                      }`}>{entry.status}</span>
                      <span className="text-sm font-semibold text-gray-900 tabular-nums w-14 text-right">
                        {entry.duration_minutes ? formatDuration(entry.duration_minutes) : '--'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}