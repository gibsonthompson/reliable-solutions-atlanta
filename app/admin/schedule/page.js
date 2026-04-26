'use client'

import { useState, useEffect, useCallback } from 'react'
import { useAdminAuth } from '../layout'

export default function SchedulePage() {
  const { user: adminUser, hasPermission } = useAdminAuth()
  const isAdmin = adminUser?.role === 'admin'
  const [users, setUsers] = useState([])
  const [jobs, setJobs] = useState([])
  const [crewByUser, setCrewByUser] = useState({})
  const [crewByJob, setCrewByJob] = useState({})
  const [loading, setLoading] = useState(true)
  const [weekOffset, setWeekOffset] = useState(0)
  const [successMsg, setSuccessMsg] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [addSaving, setAddSaving] = useState(false)
  const [addForm, setAddForm] = useState({ address: '', client: '', date_start: '', date_end: '', notes: '', status: 'active', crew: [] })
  const [addCrewUserId, setAddCrewUserId] = useState('')
  const [addCrewRole, setAddCrewRole] = useState('crew')
  const [assignModal, setAssignModal] = useState(null)
  const [assignJobId, setAssignJobId] = useState('')
  const [assignRole, setAssignRole] = useState('crew')

  const getWeekDates = useCallback((offset = 0) => {
    const now = new Date()
    const day = now.getDay()
    const monday = new Date(now)
    monday.setDate(now.getDate() - (day === 0 ? 6 : day - 1) + (offset * 7))
    monday.setHours(0, 0, 0, 0)
    const days = []
    for (let i = 0; i < 7; i++) { const d = new Date(monday); d.setDate(monday.getDate() + i); days.push(d) }
    return days
  }, [])

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const [usersRes, jobsRes, crewRes] = await Promise.all([
        fetch('/api/admin/users'), fetch('/api/admin/jobs'), fetch('/api/admin/job-crew/bulk'),
      ])
      const usersData = await usersRes.json()
      const jobsData = await jobsRes.json()
      const crewData = await crewRes.json()
      const activeUsers = (usersData.users || []).filter(u => u.is_active)
      setUsers(activeUsers)
      const allJobs = jobsData.jobs || []
      setJobs(allJobs)
      const jobMap = {}
      allJobs.forEach(j => { jobMap[j.id] = j })
      const userJobs = {}
      activeUsers.forEach(u => { userJobs[u.id] = [] })
      const byUser = crewData.by_user || {}
      Object.entries(byUser).forEach(([userId, assignments]) => {
        if (userJobs[userId]) {
          userJobs[userId] = assignments.filter(a => jobMap[a.job_id]).map(a => ({ ...jobMap[a.job_id], crew_role: a.role }))
        }
      })
      setCrewByUser(userJobs)
      setCrewByJob(crewData.by_job || {})
    } catch (e) { console.error('Schedule fetch error:', e) }
    finally { setLoading(false) }
  }, [])

  useEffect(() => { fetchData() }, [fetchData])

  const weekDates = getWeekDates(weekOffset)
  const today = new Date(); today.setHours(0, 0, 0, 0)
  const isToday = (d) => d.toDateString() === today.toDateString()

  const getJobsForUserOnDate = (userId, date) => {
    const ds = date.toISOString().split('T')[0]
    return (crewByUser[userId] || []).filter(j => {
      if (!j.date_start) return false
      return ds >= j.date_start && ds <= (j.date_end || j.date_start)
    })
  }

  const weekLabel = () => {
    const s = weekDates[0], e = weekDates[6]
    if (s.getMonth() === e.getMonth()) return `${s.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} – ${e.getDate()}, ${e.getFullYear()}`
    return `${s.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – ${e.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
  }

  const totalJobDays = users.reduce((sum, u) => sum + weekDates.reduce((ds, d) => ds + getJobsForUserOnDate(u.id, d).length, 0), 0)

  const openAddModal = (prefillDate, prefillUserId) => {
    const dateStr = prefillDate ? prefillDate.toISOString().split('T')[0] : weekDates[0].toISOString().split('T')[0]
    const crew = prefillUserId ? [{ user_id: prefillUserId, role: 'crew', name: users.find(u => u.id === prefillUserId)?.name || '' }] : []
    setAddForm({ address: '', client: '', date_start: dateStr, date_end: dateStr, notes: '', status: 'active', crew })
    setAddCrewUserId(''); setAddCrewRole('crew'); setShowAddModal(true)
  }

  const addCrewToForm = () => {
    if (!addCrewUserId) return
    const u = users.find(x => x.id === addCrewUserId)
    if (!u || addForm.crew.some(c => c.user_id === addCrewUserId)) return
    setAddForm(p => ({ ...p, crew: [...p.crew, { user_id: addCrewUserId, role: addCrewRole, name: u.name }] }))
    setAddCrewUserId(''); setAddCrewRole('crew')
  }

  const removeCrewFromForm = (userId) => setAddForm(p => ({ ...p, crew: p.crew.filter(c => c.user_id !== userId) }))

  const handleCreateJob = async () => {
    if (!addForm.address.trim() || !addForm.date_start) return
    setAddSaving(true)
    try {
      const r = await fetch('/api/admin/jobs', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address: addForm.address, client: addForm.client, date_start: addForm.date_start, date_end: addForm.date_end || addForm.date_start, notes: addForm.notes, status: addForm.status, labor: 0, material: 0, gas: 0, misc: 0, revenue: 0, taxes: 0 })
      })
      const jobData = await r.json()
      if (!r.ok) return
      const newJobId = jobData.job?.id
      if (!newJobId) return
      for (const c of addForm.crew) {
        await fetch('/api/admin/job-crew', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ job_id: newJobId, user_id: c.user_id, role: c.role, assigned_by: adminUser?.id }) })
      }
      setShowAddModal(false)
      setSuccessMsg(`Job created${addForm.crew.length > 0 ? ` with ${addForm.crew.length} crew` : ''}`)
      setTimeout(() => setSuccessMsg(''), 3000); fetchData()
    } catch (e) { console.error(e) }
    finally { setAddSaving(false) }
  }

  const openAssignModal = (userId, date) => { setAssignModal({ userId, date }); setAssignJobId(''); setAssignRole('crew') }

  const getUnassignedJobsForDate = (date) => {
    const ds = date.toISOString().split('T')[0]
    const userId = assignModal?.userId
    return jobs.filter(j => {
      if (!j.date_start) return false
      if (ds < j.date_start || ds > (j.date_end || j.date_start)) return false
      const crew = crewByJob[j.id] || []
      return !crew.some(c => c.user_id === userId)
    })
  }

  const handleQuickAssign = async () => {
    if (!assignJobId || !assignModal) return
    try {
      await fetch('/api/admin/job-crew', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ job_id: assignJobId, user_id: assignModal.userId, role: assignRole, assigned_by: adminUser?.id }) })
      setAssignModal(null); setSuccessMsg('Crew assigned'); setTimeout(() => setSuccessMsg(''), 2000); fetchData()
    } catch (e) {}
  }

  const availableForAdd = users.filter(u => !addForm.crew.some(c => c.user_id === u.id))

  if (!hasPermission('timesheets') && !hasPermission('calendar')) return <div className="px-4 py-16 text-center"><p className="text-gray-500 font-medium">You don't have permission to view the schedule</p></div>
  if (loading) return <div className="flex items-center justify-center min-h-[50vh]"><div className="w-10 h-10 border-4 border-[#115997] border-t-transparent rounded-full animate-spin" /></div>

  return (
    <div className="px-4 py-4 sm:py-8">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div><h2 className="text-lg sm:text-2xl font-bold text-[#273373]">Schedule</h2><p className="text-gray-500 text-xs sm:text-sm">{users.length} crew · {totalJobDays} assignments this week</p></div>
        {isAdmin && <button onClick={() => openAddModal(null, null)} className="flex items-center gap-2 px-4 py-2.5 bg-[#115997] text-white text-sm font-medium rounded-xl hover:bg-[#273373]"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>New Job</button>}
      </div>

      {successMsg && <div className="mb-4 rounded-xl p-3 text-sm bg-green-50 border border-green-200 text-green-700 flex items-center gap-2"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>{successMsg}</div>}

      <div className="flex items-center justify-between mb-4 bg-white rounded-xl shadow-sm px-4 py-3">
        <button onClick={() => setWeekOffset(p => p - 1)} className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg></button>
        <div className="text-center"><h3 className="text-sm font-bold text-gray-900">{weekLabel()}</h3>{weekOffset !== 0 && <button onClick={() => setWeekOffset(0)} className="text-[11px] text-[#115997] font-medium mt-0.5">This week</button>}</div>
        <button onClick={() => setWeekOffset(p => p + 1)} className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></button>
      </div>

      {/* Desktop Grid */}
      <div className="hidden sm:block bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead><tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left px-3 py-2.5 font-semibold text-gray-600 w-[140px] sticky left-0 bg-gray-50 z-10">Crew</th>
              {weekDates.map(d => <th key={d.toISOString()} className={`text-center px-2 py-2.5 font-semibold min-w-[130px] ${isToday(d) ? 'text-[#115997] bg-blue-50/50' : 'text-gray-600'}`}><div>{d.toLocaleDateString('en-US', { weekday: 'short' })}</div><div className={`text-[10px] mt-0.5 ${isToday(d) ? 'text-[#115997]' : 'text-gray-400'}`}>{d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>{isToday(d) && <div className="w-1 h-1 rounded-full bg-[#115997] mx-auto mt-1" />}</th>)}
            </tr></thead>
            <tbody className="divide-y divide-gray-100">
              {users.map(u => (
                <tr key={u.id} className="hover:bg-gray-50/50">
                  <td className="px-3 py-2.5 sticky left-0 bg-white z-10"><div className="flex items-center gap-2"><div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: u.color || '#115997' }}><span className="text-white font-bold text-[9px]">{u.name?.charAt(0)?.toUpperCase()}</span></div><div className="min-w-0"><p className="font-medium text-gray-900 text-[11px] truncate">{u.name}</p>{u.pay_rate && <p className="text-[9px] text-gray-400">${u.pay_rate}/hr</p>}</div></div></td>
                  {weekDates.map(d => {
                    const dayJobs = getJobsForUserOnDate(u.id, d)
                    const isPast = d.getTime() < today.getTime() && !isToday(d)
                    return (
                      <td key={d.toISOString()} className={`px-1.5 py-1.5 align-top ${isToday(d) ? 'bg-blue-50/30' : ''}`}>
                        {dayJobs.length === 0 ? (
                          <div className="h-10 flex items-center justify-center">
                            {isAdmin && !isPast ? (
                              <div className="flex gap-1">
                                <button onClick={() => openAddModal(d, u.id)} className="p-1 text-gray-300 hover:text-[#115997] hover:bg-[#115997]/10 rounded transition-colors" title="New job"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg></button>
                                <button onClick={() => openAssignModal(u.id, d)} className="p-1 text-gray-300 hover:text-emerald-600 hover:bg-emerald-50 rounded transition-colors" title="Assign existing"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 015.656 0l4 4a4 4 0 01-5.656 5.656l-1.1-1.1" /></svg></button>
                              </div>
                            ) : <span className="text-gray-200">—</span>}
                          </div>
                        ) : (
                          <div className="space-y-1">
                            {dayJobs.map(j => (
                              <div key={j.id} className={`px-1.5 py-1 rounded text-[10px] leading-tight border-l-2 ${j.status === 'completed' ? 'bg-green-50 border-green-400 text-green-700' : j.status === 'on_hold' ? 'bg-amber-50 border-amber-400 text-amber-700' : 'bg-blue-50 border-[#115997] text-gray-700'}`}>
                                <p className="font-medium truncate max-w-[110px]">{j.address}</p>
                                {j.client && <p className="text-[8px] text-gray-400 truncate">{j.client}</p>}
                                <span className={`text-[8px] font-medium ${j.crew_role === 'lead' ? 'text-purple-600' : 'text-gray-400'}`}>{j.crew_role}</span>
                              </div>
                            ))}
                            {isAdmin && !isPast && <button onClick={() => openAddModal(d, u.id)} className="w-full p-0.5 text-gray-300 hover:text-[#115997] hover:bg-[#115997]/5 rounded transition-colors flex items-center justify-center"><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg></button>}
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
        {users.length === 0 && <div className="p-8 text-center"><p className="text-gray-400 text-sm">No active crew members</p></div>}
      </div>

      {/* Mobile by day */}
      <div className="sm:hidden space-y-3">
        {weekDates.map(d => {
          const dayHasJobs = users.some(u => getJobsForUserOnDate(u.id, d).length > 0)
          const td = isToday(d); const isPast = d.getTime() < today.getTime() && !td
          return (
            <div key={d.toISOString()} className={`bg-white rounded-xl overflow-hidden shadow-sm ${td ? 'ring-2 ring-[#115997]' : ''} ${isPast ? 'opacity-60' : ''}`}>
              <div className={`px-4 py-2.5 flex items-center justify-between ${td ? 'bg-[#115997] text-white' : 'bg-gray-50'}`}>
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-bold ${td ? 'text-white' : 'text-gray-900'}`}>{d.toLocaleDateString('en-US', { weekday: 'short' })}</span>
                  <span className={`text-sm ${td ? 'text-white/80' : 'text-gray-500'}`}>{d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                  {td && <span className="text-[10px] font-bold bg-white/20 px-1.5 py-0.5 rounded">TODAY</span>}
                </div>
                {isAdmin && !isPast && <button onClick={() => openAddModal(d, null)} className={`text-[11px] font-medium flex items-center gap-1 ${td ? 'text-white/80 hover:text-white' : 'text-[#115997]'}`}><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>Add</button>}
              </div>
              <div className="px-4 py-2">
                {!dayHasJobs ? <p className="text-xs text-gray-300 py-1">No assignments</p> : (
                  <div className="space-y-2 py-1">
                    {users.map(u => {
                      const dayJobs = getJobsForUserOnDate(u.id, d)
                      if (dayJobs.length === 0) return null
                      return (
                        <div key={u.id} className="flex items-start gap-2">
                          <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: u.color || '#115997' }}><span className="text-white font-bold text-[8px]">{u.name?.charAt(0)}</span></div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-medium text-gray-700">{u.name}</p>
                            {dayJobs.map(j => (
                              <div key={j.id} className="flex items-center gap-1.5 mt-0.5">
                                <div className={`w-1 h-3 rounded-full flex-shrink-0 ${j.status === 'completed' ? 'bg-green-400' : j.status === 'on_hold' ? 'bg-amber-400' : 'bg-[#115997]'}`} />
                                <span className="text-[11px] text-gray-600 truncate">{j.address}</span>
                                <span className={`text-[9px] font-medium px-1 py-0.5 rounded ${j.crew_role === 'lead' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-500'}`}>{j.crew_role}</span>
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

      {/* CREATE JOB + ASSIGN CREW MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4" onClick={() => setShowAddModal(false)}>
          <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-lg max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-5 border-b border-gray-100">
              <div className="w-8 h-1 bg-gray-300 rounded-full mx-auto mb-3 sm:hidden" />
              <div className="flex items-center justify-between"><h3 className="text-lg font-bold text-[#273373]">New Job</h3><button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600 p-1"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button></div>
            </div>
            <div className="p-5 space-y-4">
              <div><label className="block text-xs text-gray-500 mb-1">Job Address *</label><input type="text" value={addForm.address} onChange={(e) => setAddForm(p => ({ ...p, address: e.target.value }))} placeholder="e.g. 1234 Main St NE" autoFocus style={{ fontSize: '16px' }} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#115997] outline-none" /></div>
              <div><label className="block text-xs text-gray-500 mb-1">Client</label><input type="text" value={addForm.client} onChange={(e) => setAddForm(p => ({ ...p, client: e.target.value }))} placeholder="Customer name" style={{ fontSize: '16px' }} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#115997] outline-none" /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="block text-xs text-gray-500 mb-1">Start Date *</label><input type="date" value={addForm.date_start} onChange={(e) => setAddForm(p => ({ ...p, date_start: e.target.value, date_end: p.date_end < e.target.value ? e.target.value : p.date_end }))} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#115997] outline-none" /></div>
                <div><label className="block text-xs text-gray-500 mb-1">End Date</label><input type="date" value={addForm.date_end} onChange={(e) => setAddForm(p => ({ ...p, date_end: e.target.value }))} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#115997] outline-none" /></div>
              </div>
              <div><label className="block text-xs text-gray-500 mb-1">Notes</label><input type="text" value={addForm.notes} onChange={(e) => setAddForm(p => ({ ...p, notes: e.target.value }))} placeholder="Optional" style={{ fontSize: '16px' }} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#115997] outline-none" /></div>
              <div className="pt-3 border-t border-gray-100">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Assign Crew</label>
                {addForm.crew.length > 0 && <div className="space-y-1.5 mb-3">{addForm.crew.map(c => (
                  <div key={c.user_id} className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: users.find(u => u.id === c.user_id)?.color || '#115997' }}><span className="text-white text-[8px] font-bold">{c.name?.charAt(0)}</span></div>
                      <span className="text-sm font-medium text-gray-700">{c.name}</span>
                      <span className={`text-[9px] font-medium px-1.5 py-0.5 rounded ${c.role === 'lead' ? 'bg-purple-100 text-purple-700' : c.role === 'subcontractor' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-600'}`}>{c.role}</span>
                    </div>
                    <button onClick={() => removeCrewFromForm(c.user_id)} className="p-1 text-gray-300 hover:text-red-500 rounded"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
                  </div>
                ))}</div>}
                <div className="flex items-center gap-2">
                  <select value={addCrewUserId} onChange={(e) => setAddCrewUserId(e.target.value)} className="flex-1 px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#115997] outline-none"><option value="">Select crew member...</option>{availableForAdd.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}</select>
                  <select value={addCrewRole} onChange={(e) => setAddCrewRole(e.target.value)} className="px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#115997] outline-none w-24"><option value="crew">Crew</option><option value="lead">Lead</option><option value="subcontractor">Sub</option></select>
                  <button onClick={addCrewToForm} disabled={!addCrewUserId} className="px-3 py-2.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 disabled:opacity-40">Add</button>
                </div>
              </div>
            </div>
            <div className="p-5 border-t border-gray-100 flex items-center gap-3">
              <button onClick={() => setShowAddModal(false)} className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200">Cancel</button>
              <button onClick={handleCreateJob} disabled={addSaving || !addForm.address.trim() || !addForm.date_start} className="flex-1 py-3 bg-[#115997] text-white rounded-xl font-semibold hover:bg-[#273373] disabled:opacity-40">{addSaving ? 'Creating...' : `Create Job${addForm.crew.length > 0 ? ` + ${addForm.crew.length} Crew` : ''}`}</button>
            </div>
          </div>
        </div>
      )}

      {/* ASSIGN EXISTING JOB MODAL */}
      {assignModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4" onClick={() => setAssignModal(null)}>
          <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-md max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-5 border-b border-gray-100">
              <div className="w-8 h-1 bg-gray-300 rounded-full mx-auto mb-3 sm:hidden" />
              <div className="flex items-center justify-between">
                <div><h3 className="text-lg font-bold text-[#273373]">Assign to Job</h3><p className="text-xs text-gray-500 mt-0.5">{users.find(u => u.id === assignModal.userId)?.name} · {assignModal.date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</p></div>
                <button onClick={() => setAssignModal(null)} className="text-gray-400 hover:text-gray-600 p-1"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
              </div>
            </div>
            <div className="p-5">
              {(() => {
                const available = getUnassignedJobsForDate(assignModal.date)
                if (available.length === 0) return (
                  <div className="text-center py-6">
                    <p className="text-sm text-gray-400 mb-3">No unassigned jobs on this date</p>
                    <button onClick={() => { setAssignModal(null); openAddModal(assignModal.date, assignModal.userId) }} className="text-sm text-[#115997] font-medium hover:underline">Create a new job instead</button>
                  </div>
                )
                return (
                  <div className="space-y-3">
                    <div><label className="block text-xs text-gray-500 mb-1.5">Select Job</label><select value={assignJobId} onChange={(e) => setAssignJobId(e.target.value)} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#115997] outline-none"><option value="">Choose a job...</option>{available.map(j => <option key={j.id} value={j.id}>{j.address}{j.client ? ` (${j.client})` : ''}</option>)}</select></div>
                    <div><label className="block text-xs text-gray-500 mb-1.5">Role</label><select value={assignRole} onChange={(e) => setAssignRole(e.target.value)} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#115997] outline-none"><option value="crew">Crew</option><option value="lead">Lead</option><option value="subcontractor">Sub</option></select></div>
                    <button onClick={handleQuickAssign} disabled={!assignJobId} className="w-full py-3 bg-[#115997] text-white rounded-xl font-semibold hover:bg-[#273373] disabled:opacity-40">Assign</button>
                  </div>
                )
              })()}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}