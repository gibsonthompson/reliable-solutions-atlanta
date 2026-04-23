'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useTimeAuth } from '../layout'

export default function TimeClockPage() {
  const { user } = useTimeAuth()
  const [clockStatus, setClockStatus] = useState(null) // null = loading, { clocked_in, entry, elapsed }
  const [todayEntries, setTodayEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [clocking, setClocking] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const [gpsStatus, setGpsStatus] = useState('idle') // idle, getting, got, failed
  const [currentTime, setCurrentTime] = useState(new Date())
  const [todayTotal, setTodayTotal] = useState(0)
  const timerRef = useRef(null)
  const clockRef = useRef(null)

  // Live clock
  useEffect(() => {
    clockRef.current = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(clockRef.current)
  }, [])

  const fetchStatus = useCallback(async () => {
    if (!user?.id) return
    try {
      const r = await fetch(`/api/time/status?user_id=${user.id}`)
      const data = await r.json()
      setClockStatus(data)
      if (data.clocked_in && data.entry) {
        const start = new Date(data.entry.clock_in).getTime()
        setElapsed(Math.floor((Date.now() - start) / 1000))
      } else {
        setElapsed(0)
      }
    } catch (e) { console.error('Status fetch error:', e) }
  }, [user?.id])

  const fetchTodayEntries = useCallback(async () => {
    if (!user?.id) return
    try {
      const today = new Date().toISOString().split('T')[0]
      const r = await fetch(`/api/time/entries?user_id=${user.id}&date=${today}`)
      const data = await r.json()
      setTodayEntries(data.entries || [])
      // Calculate total
      const total = (data.entries || []).reduce((sum, e) => sum + (e.duration_minutes || 0), 0)
      setTodayTotal(total)
    } catch (e) {}
  }, [user?.id])

  useEffect(() => {
    const init = async () => {
      await Promise.all([fetchStatus(), fetchTodayEntries()])
      setLoading(false)
    }
    init()
  }, [fetchStatus, fetchTodayEntries])

  // Elapsed timer
  useEffect(() => {
    if (clockStatus?.clocked_in) {
      timerRef.current = setInterval(() => setElapsed(p => p + 1), 1000)
    } else {
      clearInterval(timerRef.current)
    }
    return () => clearInterval(timerRef.current)
  }, [clockStatus?.clocked_in])

  const getGPS = () => {
    return new Promise((resolve) => {
      if (!navigator.geolocation) { resolve(null); return }
      setGpsStatus('getting')
      navigator.geolocation.getCurrentPosition(
        (pos) => { setGpsStatus('got'); resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }) },
        () => { setGpsStatus('failed'); resolve(null) },
        { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 }
      )
    })
  }

  const handleClock = async () => {
    setClocking(true)
    try {
      const gps = await getGPS()
      const action = clockStatus?.clocked_in ? 'clock_out' : 'clock_in'
      const body = { user_id: user.id, action }
      if (gps) {
        if (action === 'clock_in') { body.clock_in_lat = gps.lat; body.clock_in_lng = gps.lng }
        else { body.clock_out_lat = gps.lat; body.clock_out_lng = gps.lng }
      }
      if (clockStatus?.entry?.id) body.entry_id = clockStatus.entry.id

      const r = await fetch('/api/time/clock', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body)
      })
      if (r.ok) {
        await fetchStatus()
        await fetchTodayEntries()
      }
    } catch (e) { console.error('Clock error:', e) }
    finally { setClocking(false); setGpsStatus('idle') }
  }

  const formatElapsed = (secs) => {
    const h = Math.floor(secs / 3600)
    const m = Math.floor((secs % 3600) / 60)
    const s = secs % 60
    return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  }

  const formatTime = (ts) => {
    if (!ts) return '--:--'
    return new Date(ts).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
  }

  const formatDuration = (mins) => {
    if (!mins) return '0m'
    const h = Math.floor(mins / 60)
    const m = mins % 60
    if (h === 0) return `${m}m`
    return `${h}h ${m}m`
  }

  const isClockedIn = clockStatus?.clocked_in

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-10 h-10 border-4 border-[#115997] border-t-transparent rounded-full animate-spin" />
    </div>
  )

  return (
    <div className="px-4 py-6">
      {/* Current Time */}
      <div className="text-center mb-6">
        <p className="text-3xl font-bold text-gray-900 tabular-nums tracking-tight">
          {currentTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true })}
        </p>
        <p className="text-sm text-gray-400 mt-0.5">
          {currentTime.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {/* Big Clock Button */}
      <div className="flex flex-col items-center mb-8">
        <button
          onClick={handleClock}
          disabled={clocking}
          className={`relative w-44 h-44 rounded-full flex flex-col items-center justify-center transition-all duration-300 active:scale-95 shadow-lg ${
            isClockedIn
              ? 'bg-gradient-to-br from-red-500 to-red-600 shadow-red-200'
              : 'bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-emerald-200'
          } ${clocking ? 'opacity-70 scale-95' : ''}`}
        >
          {/* Pulse ring when clocked in */}
          {isClockedIn && !clocking && (
            <div className="absolute inset-0 rounded-full animate-ping opacity-20 bg-red-400" style={{ animationDuration: '2s' }} />
          )}
          <svg className="w-10 h-10 text-white mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            {isClockedIn
              ? <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
              : <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            }
          </svg>
          <span className="text-white font-bold text-lg">
            {clocking ? 'Working...' : isClockedIn ? 'Clock Out' : 'Clock In'}
          </span>
          {isClockedIn && (
            <span className="text-white/80 text-sm font-medium tabular-nums mt-0.5">
              {formatElapsed(elapsed)}
            </span>
          )}
        </button>

        {/* GPS indicator */}
        <div className="flex items-center gap-1.5 mt-3">
          <div className={`w-2 h-2 rounded-full ${
            gpsStatus === 'got' ? 'bg-green-400' :
            gpsStatus === 'getting' ? 'bg-amber-400 animate-pulse' :
            gpsStatus === 'failed' ? 'bg-red-400' : 'bg-gray-300'
          }`} />
          <span className="text-[11px] text-gray-400">
            {gpsStatus === 'getting' ? 'Getting location...' :
             gpsStatus === 'got' ? 'Location captured' :
             gpsStatus === 'failed' ? 'Location unavailable' :
             'GPS ready'}
          </span>
        </div>

        {/* Status text */}
        {isClockedIn && clockStatus?.entry && (
          <div className="mt-3 text-center">
            <p className="text-xs text-gray-500">
              Clocked in at {formatTime(clockStatus.entry.clock_in)}
              {clockStatus.entry.job_id && clockStatus.entry.job_address && (
                <span className="text-[#115997]"> · {clockStatus.entry.job_address}</span>
              )}
            </p>
          </div>
        )}
      </div>

      {/* Today's Summary Card */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-900 text-sm">Today&apos;s summary</h3>
          <span className="text-xs text-gray-400">{todayEntries.length} {todayEntries.length === 1 ? 'entry' : 'entries'}</span>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-gray-50 rounded-lg p-3 text-center">
            <p className="text-[10px] text-gray-400 uppercase tracking-wide font-semibold">Total</p>
            <p className="text-lg font-bold text-gray-900 mt-0.5">
              {formatDuration(todayTotal + (isClockedIn ? Math.floor(elapsed / 60) : 0))}
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3 text-center">
            <p className="text-[10px] text-gray-400 uppercase tracking-wide font-semibold">Completed</p>
            <p className="text-lg font-bold text-emerald-600 mt-0.5">{todayEntries.filter(e => e.clock_out).length}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3 text-center">
            <p className="text-[10px] text-gray-400 uppercase tracking-wide font-semibold">Status</p>
            <p className={`text-sm font-bold mt-1 ${isClockedIn ? 'text-emerald-600' : 'text-gray-400'}`}>
              {isClockedIn ? 'On Clock' : 'Off Clock'}
            </p>
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
            <svg className="w-10 h-10 text-gray-200 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-gray-400 text-sm">No entries yet today</p>
            <p className="text-gray-300 text-xs mt-1">Tap the green button to start</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {/* Active entry at top */}
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
                </p>
              </div>
            )}
            {/* Completed entries */}
            {todayEntries.filter(e => e.clock_out).map((entry) => (
              <div key={entry.id} className="px-4 py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      entry.entry_type === 'break' ? 'bg-amber-400' :
                      entry.entry_type === 'job' ? 'bg-blue-400' : 'bg-gray-400'
                    }`} />
                    <span className="text-sm text-gray-700">
                      {formatTime(entry.clock_in)} — {formatTime(entry.clock_out)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${
                      entry.status === 'approved' ? 'bg-green-100 text-green-700' :
                      entry.status === 'rejected' ? 'bg-red-100 text-red-700' :
                      'bg-gray-100 text-gray-500'
                    }`}>{entry.status}</span>
                    <span className="text-sm font-semibold text-gray-900 tabular-nums">
                      {formatDuration(entry.duration_minutes)}
                    </span>
                  </div>
                </div>
                {entry.job_address && (
                  <p className="text-xs text-gray-400 mt-0.5 ml-4">{entry.job_address}</p>
                )}
                {entry.notes && (
                  <p className="text-xs text-gray-400 mt-0.5 ml-4 italic">{entry.notes}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}