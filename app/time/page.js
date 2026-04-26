'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useTimeAuth } from './layout'

export default function TimeClockPage() {
  const { user } = useTimeAuth()
  const [clockStatus, setClockStatus] = useState(null)
  const [todayEntries, setTodayEntries] = useState([])
  const [todayJobs, setTodayJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [clocking, setClocking] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [todayTotal, setTodayTotal] = useState(0)
  const timerRef = useRef(null)
  const clockRef = useRef(null)

  useEffect(() => { clockRef.current = setInterval(() => setCurrentTime(new Date()), 1000); return () => clearInterval(clockRef.current) }, [])

  const fetchStatus = useCallback(async () => {
    if (!user?.id) return
    try {
      const r = await fetch(`/api/time/status?user_id=${user.id}`)
      const data = await r.json()
      setClockStatus(data)
      if (data.clocked_in && data.entry) { setElapsed(Math.floor((Date.now() - new Date(data.entry.clock_in).getTime()) / 1000)) }
      else { setElapsed(0) }
    } catch (e) {}
  }, [user?.id])

  const fetchTodayEntries = useCallback(async () => {
    if (!user?.id) return
    try {
      const today = new Date().toISOString().split('T')[0]
      const r = await fetch(`/api/time/entries?user_id=${user.id}&date=${today}`)
      const data = await r.json()
      setTodayEntries(data.entries || [])
      setTodayTotal((data.entries || []).reduce((sum, e) => sum + (e.duration_minutes || 0), 0))
    } catch (e) {}
  }, [user?.id])

  const fetchTodayJobs = useCallback(async () => {
    if (!user?.id) return
    try {
      const today = new Date().toISOString().split('T')[0]
      const r = await fetch(`/api/time/schedule?user_id=${user.id}&start=${today}&end=${today}`)
      const data = await r.json()
      setTodayJobs(data.jobs || [])
    } catch (e) {}
  }, [user?.id])

  useEffect(() => {
    const init = async () => { await Promise.all([fetchStatus(), fetchTodayEntries(), fetchTodayJobs()]); setLoading(false) }
    init()
  }, [fetchStatus, fetchTodayEntries, fetchTodayJobs])

  useEffect(() => {
    if (clockStatus?.clocked_in) { timerRef.current = setInterval(() => setElapsed(p => p + 1), 1000) }
    else { clearInterval(timerRef.current) }
    return () => clearInterval(timerRef.current)
  }, [clockStatus?.clocked_in])

  const handleClock = async (jobId = null) => {
    setClocking(true)
    try {
      const action = clockStatus?.clocked_in ? 'clock_out' : 'clock_in'
      const body = { user_id: user.id, action }
      if (action === 'clock_in' && jobId) { body.job_id = jobId; body.entry_type = 'job' }
      if (clockStatus?.entry?.id) body.entry_id = clockStatus.entry.id
      const r = await fetch('/api/time/clock', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      if (r.ok) { await fetchStatus(); await fetchTodayEntries() }
    } catch (e) {}
    finally { setClocking(false) }
  }

  const formatElapsed = (secs) => { const h = Math.floor(secs / 3600); const m = Math.floor((secs % 3600) / 60); const s = secs % 60; return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}` }
  const formatTime = (ts) => ts ? new Date(ts).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }) : '--:--'
  const formatDuration = (mins) => { if (!mins) return '0m'; const h = Math.floor(mins / 60); const m = mins % 60; return h === 0 ? `${m}m` : `${h}h ${m}m` }

  const isClockedIn = clockStatus?.clocked_in
  const hasJobsToday = todayJobs.length > 0 && !isClockedIn

  if (loading) return <div className="flex items-center justify-center min-h-[60vh]"><div className="w-10 h-10 border-4 border-[#115997] border-t-transparent rounded-full animate-spin" /></div>

  return (
    <div className="px-4 py-6">
      {/* Current Time */}
      <div className="text-center mb-5">
        <p className="text-3xl font-bold text-gray-900 tabular-nums tracking-tight">
          {currentTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true })}
        </p>
        <p className="text-sm text-gray-400 mt-0.5">
          {currentTime.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {/* ======================================= */}
      {/* CLOCKED IN STATE — big red stop button */}
      {/* ======================================= */}
      {isClockedIn && (
        <div className="flex flex-col items-center mb-6">
          <button onClick={() => handleClock(null)} disabled={clocking}
            className={`relative w-44 h-44 rounded-full flex flex-col items-center justify-center transition-all duration-300 active:scale-95 shadow-lg bg-gradient-to-br from-red-500 to-red-600 shadow-red-200 ${clocking ? 'opacity-70 scale-95' : ''}`}>
            {!clocking && <div className="absolute inset-0 rounded-full animate-ping opacity-20 bg-red-400" style={{ animationDuration: '2s' }} />}
            <svg className="w-10 h-10 text-white mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
            </svg>
            <span className="text-white font-bold text-lg">{clocking ? 'Working...' : 'Clock Out'}</span>
            <span className="text-white/80 text-sm font-medium tabular-nums mt-0.5">{formatElapsed(elapsed)}</span>
          </button>
          {clockStatus?.entry && (
            <div className="mt-3 text-center">
              <p className="text-xs text-gray-500">
                Clocked in at {formatTime(clockStatus.entry.clock_in)}
                {clockStatus.entry.entry_type === 'job' && clockStatus.entry.job_address
                  ? <span className="text-[#115997] font-medium"> · {clockStatus.entry.job_address}</span>
                  : <span className="text-gray-400"> · General</span>
                }
              </p>
            </div>
          )}
        </div>
      )}

      {/* ======================================= */}
      {/* NOT CLOCKED IN + HAS JOBS — jobs first  */}
      {/* ======================================= */}
      {hasJobsToday && (
        <div className="mb-6">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-3">
            <div className="px-4 py-3 bg-[#115997] text-white">
              <h3 className="font-bold text-sm">Today&apos;s Jobs</h3>
              <p className="text-[11px] text-white/70">Tap a job to clock in and start tracking</p>
            </div>
            <div className="divide-y divide-gray-100">
              {todayJobs.map(job => (
                <button key={job.id} onClick={() => handleClock(job.id)} disabled={clocking}
                  className="w-full px-4 py-4 flex items-center justify-between hover:bg-blue-50/50 active:bg-blue-50 transition-colors text-left">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-2 h-10 rounded-full flex-shrink-0 ${
                      job.status === 'completed' ? 'bg-green-400' : job.status === 'on_hold' ? 'bg-amber-400' : 'bg-[#115997]'
                    }`} />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">{job.address}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        {job.client && <span className="text-xs text-gray-500">{job.client}</span>}
                        <span className={`text-[9px] font-medium px-1.5 py-0.5 rounded ${
                          job.crew_role === 'lead' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-500'
                        }`}>{job.crew_role}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-emerald-500 text-white px-4 py-2 rounded-xl flex-shrink-0">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /></svg>
                    <span className="text-sm font-bold">Start</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
          {/* General clock-in as secondary */}
          <button onClick={() => handleClock(null)} disabled={clocking}
            className="w-full text-center text-sm text-gray-400 hover:text-[#115997] py-2 transition-colors">
            Or clock in without a job (general)
          </button>
        </div>
      )}

      {/* ======================================= */}
      {/* NOT CLOCKED IN + NO JOBS — big button   */}
      {/* ======================================= */}
      {!isClockedIn && !hasJobsToday && (
        <div className="flex flex-col items-center mb-6">
          <button onClick={() => handleClock(null)} disabled={clocking}
            className={`relative w-44 h-44 rounded-full flex flex-col items-center justify-center transition-all duration-300 active:scale-95 shadow-lg bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-emerald-200 ${clocking ? 'opacity-70 scale-95' : ''}`}>
            <svg className="w-10 h-10 text-white mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-white font-bold text-lg">{clocking ? 'Working...' : 'Clock In'}</span>
          </button>
          <p className="text-xs text-gray-400 mt-3">No jobs assigned today</p>
        </div>
      )}

      {/* Today's Summary */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-900 text-sm">Today&apos;s summary</h3>
          <span className="text-xs text-gray-400">{todayEntries.length} {todayEntries.length === 1 ? 'entry' : 'entries'}</span>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-gray-50 rounded-lg p-3 text-center">
            <p className="text-[10px] text-gray-400 uppercase tracking-wide font-semibold">Total</p>
            <p className="text-lg font-bold text-gray-900 mt-0.5">{formatDuration(todayTotal + (isClockedIn ? Math.floor(elapsed / 60) : 0))}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3 text-center">
            <p className="text-[10px] text-gray-400 uppercase tracking-wide font-semibold">Completed</p>
            <p className="text-lg font-bold text-emerald-600 mt-0.5">{todayEntries.filter(e => e.clock_out).length}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3 text-center">
            <p className="text-[10px] text-gray-400 uppercase tracking-wide font-semibold">Status</p>
            <p className={`text-sm font-bold mt-1 ${isClockedIn ? 'text-emerald-600' : 'text-gray-400'}`}>{isClockedIn ? 'On Clock' : 'Off Clock'}</p>
          </div>
        </div>
      </div>

      {/* Today's Entries */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900 text-sm">Today&apos;s time entries</h3>
        </div>
        {todayEntries.length === 0 && !isClockedIn ? (
          <div className="px-4 py-8 text-center">
            <svg className="w-10 h-10 text-gray-200 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <p className="text-gray-400 text-sm">No entries yet today</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {isClockedIn && clockStatus?.entry && (
              <div className="px-4 py-3 bg-emerald-50/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-sm font-semibold text-emerald-700">Active</span>
                    <span className="text-xs text-emerald-500 capitalize">{clockStatus.entry.entry_type}</span>
                  </div>
                  <span className="text-sm font-bold text-emerald-700 tabular-nums">{formatElapsed(elapsed)}</span>
                </div>
                <p className="text-xs text-emerald-600 mt-1 ml-4">
                  Started {formatTime(clockStatus.entry.clock_in)}
                  {clockStatus.entry.job_address && <span> · {clockStatus.entry.job_address}</span>}
                </p>
              </div>
            )}
            {todayEntries.filter(e => e.clock_out).map((entry) => (
              <div key={entry.id} className="px-4 py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${entry.entry_type === 'job' ? 'bg-blue-400' : entry.entry_type === 'break' ? 'bg-amber-400' : 'bg-gray-400'}`} />
                    <span className="text-sm text-gray-700">{formatTime(entry.clock_in)} — {formatTime(entry.clock_out)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${entry.status === 'approved' ? 'bg-green-100 text-green-700' : entry.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-500'}`}>{entry.status}</span>
                    <span className="text-sm font-semibold text-gray-900 tabular-nums">{formatDuration(entry.duration_minutes)}</span>
                  </div>
                </div>
                {entry.job_address && <p className="text-xs text-[#115997] mt-0.5 ml-4 font-medium">{entry.job_address}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}