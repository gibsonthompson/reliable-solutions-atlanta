'use client'

import { useState, useEffect, useCallback } from 'react'
import { useAdminAuth } from '../layout'

export default function SchedulePage() {
  const { hasPermission } = useAdminAuth()
  const [users, setUsers] = useState([])
  const [jobs, setJobs] = useState([])
  const [assignments, setAssignments] = useState({}) // { userId: [{ job, role }] }
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

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const [usersRes, jobsRes] = await Promise.all([
        fetch('/api/admin/users'),
        fetch('/api/admin/jobs'),
      ])
      const usersData = await usersRes.json()
      const jobsData = await jobsRes.json()
      const activeUsers = (usersData.users || []).filter(u => u.is_active)
      setUsers(activeUsers)
      setJobs(jobsData.jobs || [])

      // Fetch crew assignments for all jobs
      const allAssignments = {}
      activeUsers.forEach(u => { allAssignments[u.id] = [] })

      for (const job of (jobsData.jobs || [])) {
        try {
          const r = await fetch(`/api/admin/job-crew?job_id=${job.id}`)
          const d = await r.json()
          ;(d.crew || []).forEach(c => {
            if (allAssignments[c.user_id]) {
              allAssignments[c.user_id].push({ ...job, crew_role: c.role })
            }
          })
        } catch (e) {}
      }
      setAssignments(allAssignments)
    } catch (e) {}
    finally { setLoading(false) }
  }, [])

  useEffect(() => { fetchData() }, [fetchData])

  const weekDates = getWeekDates(weekOffset)
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const isToday = (d) => d.toDateString() === today.toDateString()

  const getJobsForUserOnDate = (userId, date) => {
    const ds = date.toISOString().split('T')[0]
    const userJobs = assignments[userId] || []
    return userJobs.filter(j => {
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

  // Count total assigned job-days this week
  const totalJobDays = users.reduce((sum, u) => {
    return sum + weekDates.reduce((ds, d) => ds + getJobsForUserOnDate(u.id, d).length, 0)
  }, 0)

  if (!hasPermission('timesheets') && !hasPermission('calendar')) return (
    <div className="px-4 py-16 text-center">
      <p className="text-gray-500 font-medium">You don{"'"}t have permission to view the schedule</p>
    </div>
  )

  if (loading) return <div className="flex items-center justify-center min-h-[50vh]"><div className="w-10 h-10 border-4 border-[#115997] border-t-transparent rounded-full animate-spin" /></div>

  return (
    <div className="px-4 py-4 sm:py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div>
          <h2 className="text-lg sm:text-2xl font-bold text-[#273373]">Schedule</h2>
          <p className="text-gray-500 text-xs sm:text-sm">{users.length} crew · {totalJobDays} job assignments this week</p>
        </div>
      </div>

      {/* Week Navigation */}
      <div className="flex items-center justify-between mb-4 bg-white rounded-xl shadow-sm px-4 py-3">
        <button onClick={() => setWeekOffset(p => p - 1)} className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <div className="text-center">
          <h3 className="text-sm font-bold text-gray-900">{weekLabel()}</h3>
          {weekOffset !== 0 && (
            <button onClick={() => setWeekOffset(0)} className="text-[11px] text-[#115997] font-medium mt-0.5">This week</button>
          )}
        </div>
        <button onClick={() => setWeekOffset(p => p + 1)} className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>

      {/* Schedule Grid - Desktop */}
      <div className="hidden sm:block bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-3 py-2.5 font-semibold text-gray-600 whitespace-nowrap w-[140px] sticky left-0 bg-gray-50 z-10">Crew Member</th>
                {weekDates.map(d => (
                  <th key={d.toISOString()} className={`text-center px-2 py-2.5 font-semibold whitespace-nowrap min-w-[120px] ${isToday(d) ? 'text-[#115997] bg-blue-50/50' : 'text-gray-600'}`}>
                    <div>{d.toLocaleDateString('en-US', { weekday: 'short' })}</div>
                    <div className={`text-[10px] mt-0.5 ${isToday(d) ? 'text-[#115997]' : 'text-gray-400'}`}>
                      {d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </div>
                    {isToday(d) && <div className="w-1 h-1 rounded-full bg-[#115997] mx-auto mt-1" />}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map(u => (
                <tr key={u.id} className="hover:bg-gray-50/50">
                  <td className="px-3 py-2.5 sticky left-0 bg-white z-10">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: u.color || '#115997' }}>
                        <span className="text-white font-bold text-[9px]">{u.name?.charAt(0)?.toUpperCase()}</span>
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-gray-900 text-[11px] truncate">{u.name}</p>
                        {u.pay_rate && <p className="text-[9px] text-gray-400">${u.pay_rate}/hr</p>}
                      </div>
                    </div>
                  </td>
                  {weekDates.map(d => {
                    const dayJobs = getJobsForUserOnDate(u.id, d)
                    return (
                      <td key={d.toISOString()} className={`px-1.5 py-1.5 align-top ${isToday(d) ? 'bg-blue-50/30' : ''}`}>
                        {dayJobs.length === 0 ? (
                          <div className="h-8 flex items-center justify-center">
                            <span className="text-gray-200">—</span>
                          </div>
                        ) : (
                          <div className="space-y-1">
                            {dayJobs.map(j => (
                              <div key={j.id} className={`px-1.5 py-1 rounded text-[10px] leading-tight border-l-2 ${
                                j.status === 'completed' ? 'bg-green-50 border-green-400 text-green-700' :
                                j.status === 'on_hold' ? 'bg-amber-50 border-amber-400 text-amber-700' :
                                'bg-blue-50 border-[#115997] text-gray-700'
                              }`}>
                                <p className="font-medium truncate max-w-[100px]">{j.address}</p>
                                {j.client && <p className="text-[8px] text-gray-400 truncate">{j.client}</p>}
                                <span className={`text-[8px] font-medium ${
                                  j.crew_role === 'lead' ? 'text-purple-600' : 'text-gray-400'
                                }`}>{j.crew_role}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {users.length === 0 && (
          <div className="p-8 text-center">
            <p className="text-gray-400 text-sm">No active crew members</p>
          </div>
        )}
      </div>

      {/* Schedule - Mobile (by day) */}
      <div className="sm:hidden space-y-3">
        {weekDates.map(d => {
          const dayHasJobs = users.some(u => getJobsForUserOnDate(u.id, d).length > 0)
          const td = isToday(d)
          const isPast = d.getTime() < today.getTime() && !td

          return (
            <div key={d.toISOString()} className={`bg-white rounded-xl overflow-hidden shadow-sm ${
              td ? 'ring-2 ring-[#115997]' : ''
            } ${isPast ? 'opacity-60' : ''}`}>
              <div className={`px-4 py-2.5 flex items-center justify-between ${
                td ? 'bg-[#115997] text-white' : 'bg-gray-50'
              }`}>
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-bold ${td ? 'text-white' : 'text-gray-900'}`}>
                    {d.toLocaleDateString('en-US', { weekday: 'short' })}
                  </span>
                  <span className={`text-sm ${td ? 'text-white/80' : 'text-gray-500'}`}>
                    {d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                  {td && <span className="text-[10px] font-bold bg-white/20 px-1.5 py-0.5 rounded">TODAY</span>}
                </div>
              </div>
              <div className="px-4 py-2">
                {!dayHasJobs ? (
                  <p className="text-xs text-gray-300 py-1">No assignments</p>
                ) : (
                  <div className="space-y-2 py-1">
                    {users.map(u => {
                      const dayJobs = getJobsForUserOnDate(u.id, d)
                      if (dayJobs.length === 0) return null
                      return (
                        <div key={u.id} className="flex items-start gap-2">
                          <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: u.color || '#115997' }}>
                            <span className="text-white font-bold text-[8px]">{u.name?.charAt(0)}</span>
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-medium text-gray-700">{u.name}</p>
                            {dayJobs.map(j => (
                              <div key={j.id} className="flex items-center gap-1.5 mt-0.5">
                                <div className={`w-1 h-3 rounded-full flex-shrink-0 ${
                                  j.status === 'completed' ? 'bg-green-400' :
                                  j.status === 'on_hold' ? 'bg-amber-400' : 'bg-[#115997]'
                                }`} />
                                <span className="text-[11px] text-gray-600 truncate">{j.address}</span>
                                <span className={`text-[9px] font-medium px-1 py-0.5 rounded ${
                                  j.crew_role === 'lead' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-500'
                                }`}>{j.crew_role}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )
                    })}
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