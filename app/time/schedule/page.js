'use client'

import { useState, useEffect, useCallback } from 'react'
import { useTimeAuth } from '../layout'

export default function SchedulePage() {
  const { user } = useTimeAuth()
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [weekOffset, setWeekOffset] = useState(0)

  const getWeekDates = useCallback((offset = 0) => {
    const now = new Date()
    const day = now.getDay()
    const monday = new Date(now)
    monday.setDate(now.getDate() - (day === 0 ? 6 : day - 1) + (offset * 7))
    monday.setHours(0, 0, 0, 0)
    const days = []
    for (let i = 0; i < 7; i++) {
      const d = new Date(monday)
      d.setDate(monday.getDate() + i)
      days.push(d)
    }
    return days
  }, [])

  const fetchJobs = useCallback(async () => {
    if (!user?.id) return
    try {
      const days = getWeekDates(weekOffset)
      const start = days[0].toISOString().split('T')[0]
      const end = days[6].toISOString().split('T')[0]
      const r = await fetch(`/api/time/schedule?user_id=${user.id}&start=${start}&end=${end}`)
      const data = await r.json()
      setJobs(data.jobs || [])
    } catch (e) {}
    finally { setLoading(false) }
  }, [user?.id, weekOffset, getWeekDates])

  useEffect(() => { fetchJobs() }, [fetchJobs])

  const weekDates = getWeekDates(weekOffset)
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const isToday = (d) => d.getTime() === today.getTime()
  const isPast = (d) => d.getTime() < today.getTime()

  const getJobsForDate = (date) => {
    const ds = date.toISOString().split('T')[0]
    return jobs.filter(j => {
      if (!j.date_start) return false
      const start = j.date_start
      const end = j.date_end || j.date_start
      return ds >= start && ds <= end
    })
  }

  const weekLabel = () => {
    const s = weekDates[0]
    const e = weekDates[6]
    const sameMonth = s.getMonth() === e.getMonth()
    if (sameMonth) return `${s.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} – ${e.getDate()}, ${e.getFullYear()}`
    return `${s.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – ${e.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
  }

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-10 h-10 border-4 border-[#115997] border-t-transparent rounded-full animate-spin" />
    </div>
  )

  return (
    <div className="px-4 py-4">
      {/* Week Navigation */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => setWeekOffset(p => p - 1)} className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-white transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <div className="text-center">
          <h2 className="text-sm font-bold text-gray-900">{weekLabel()}</h2>
          {weekOffset !== 0 && (
            <button onClick={() => setWeekOffset(0)} className="text-[11px] text-[#115997] font-medium mt-0.5">Go to this week</button>
          )}
        </div>
        <button onClick={() => setWeekOffset(p => p + 1)} className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-white transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>

      {/* Days */}
      <div className="space-y-2">
        {weekDates.map((date) => {
          const dayJobs = getJobsForDate(date)
          const td = isToday(date)
          const past = isPast(date) && !td

          return (
            <div key={date.toISOString()} className={`bg-white rounded-xl overflow-hidden transition-all ${
              td ? 'ring-2 ring-[#115997] shadow-md' : 'shadow-sm'
            } ${past ? 'opacity-60' : ''}`}>
              <div className={`px-4 py-2.5 flex items-center justify-between ${
                td ? 'bg-[#115997] text-white' : 'bg-gray-50'
              }`}>
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-bold ${td ? 'text-white' : 'text-gray-900'}`}>
                    {date.toLocaleDateString('en-US', { weekday: 'short' })}
                  </span>
                  <span className={`text-sm ${td ? 'text-white/80' : 'text-gray-500'}`}>
                    {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                  {td && <span className="text-[10px] font-bold bg-white/20 px-1.5 py-0.5 rounded">TODAY</span>}
                </div>
                {dayJobs.length > 0 && (
                  <span className={`text-xs font-medium ${td ? 'text-white/70' : 'text-gray-400'}`}>
                    {dayJobs.length} {dayJobs.length === 1 ? 'job' : 'jobs'}
                  </span>
                )}
              </div>
              <div className="px-4 py-2">
                {dayJobs.length === 0 ? (
                  <p className="text-xs text-gray-300 py-1">{past ? 'No jobs' : 'Nothing scheduled'}</p>
                ) : (
                  <div className="space-y-2 py-1">
                    {dayJobs.map((job) => (
                      <div key={job.id} className="flex items-start gap-3">
                        <div className={`w-1 h-full min-h-[32px] rounded-full flex-shrink-0 ${
                          job.status === 'completed' ? 'bg-green-400' :
                          job.status === 'on_hold' ? 'bg-amber-400' : 'bg-[#115997]'
                        }`} />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-gray-900 truncate">{job.address}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            {job.client && <span className="text-xs text-gray-500">{job.client}</span>}
                            {job.crew_role && (
                              <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${
                                job.crew_role === 'lead' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-500'
                              }`}>{job.crew_role}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}