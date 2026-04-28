'use client'

import { useState, useEffect, useCallback } from 'react'
import { useAdminAuth } from '../layout'

export default function TimesheetsPage() {
  const { user: adminUser, hasPermission } = useAdminAuth()
  const [view, setView] = useState('day')
  const [entries, setEntries] = useState([])
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [dateOffset, setDateOffset] = useState(0)
  const [filterUser, setFilterUser] = useState('')
  const [editing, setEditing] = useState(null)
  const [adding, setAdding] = useState(false)
  const [saving, setSaving] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')
  const [weekApprovals, setWeekApprovals] = useState({})
  const [formData, setFormData] = useState({ user_id: '', job_id: '', entry_type: 'general', clock_in_date: '', clock_in_time: '', clock_out_date: '', clock_out_time: '', notes: '' })

  const getDateRange = useCallback(() => {
    const now = new Date()
    if (view === 'day') { const d = new Date(now); d.setDate(d.getDate() + dateOffset); const dateStr = d.toISOString().split('T')[0]; return { start: `${dateStr}T00:00:00.000Z`, end: `${dateStr}T23:59:59.999Z`, label: d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }), dateStr } }
    else { const day = now.getDay(); const monday = new Date(now); monday.setDate(now.getDate() - (day === 0 ? 6 : day - 1) + (dateOffset * 7)); monday.setHours(0, 0, 0, 0); const sunday = new Date(monday); sunday.setDate(monday.getDate() + 6); sunday.setHours(23, 59, 59, 999); return { start: monday.toISOString(), end: sunday.toISOString(), label: `${monday.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – ${sunday.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`, weekStart: monday.toISOString().split('T')[0] } }
  }, [view, dateOffset])

  const fetchEntries = useCallback(async () => {
    setLoading(true)
    try {
      const range = getDateRange(); let url = `/api/admin/timesheets?start=${range.start}&end=${range.end}`; if (filterUser) url += `&user_id=${filterUser}`
      const r = await fetch(url); const data = await r.json(); setEntries(data.entries || []); setUsers(data.users || [])
      if (view === 'week' && range.weekStart) { const ar = await fetch(`/api/admin/timesheets/approve?week_start=${range.weekStart}`); const ad = await ar.json(); const map = {}; (ad.weeks || []).forEach(w => { map[w.user_id] = w }); setWeekApprovals(map) }
    } catch (e) { console.error(e) }
    finally { setLoading(false) }
  }, [getDateRange, filterUser, view])

  useEffect(() => { fetchEntries() }, [fetchEntries])

  const formatTime = (ts) => ts ? new Date(ts).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }) : '--'
  const formatDuration = (mins) => { if (!mins) return '0m'; const h = Math.floor(mins / 60); const m = mins % 60; if (h === 0) return `${m}m`; return `${h}h ${m}m` }
  const formatHours = (mins) => (mins / 60).toFixed(1) + 'h'

  const groupedByUser = entries.reduce((acc, e) => {
    if (!acc[e.user_id]) acc[e.user_id] = { name: e.user_name, username: e.user_username, color: e.user_color, entries: [], totalMins: 0, laborCost: 0 }
    acc[e.user_id].entries.push(e); acc[e.user_id].totalMins += e.duration_minutes || 0; acc[e.user_id].laborCost += parseFloat(e.labor_cost || 0); return acc
  }, {})
  users.forEach(u => { if (!groupedByUser[u.id] && !filterUser) groupedByUser[u.id] = { name: u.name, username: u.username, color: u.color || '#115997', entries: [], totalMins: 0, laborCost: 0 } })

  const handleApproveWeek = async (userId, status) => {
    const range = getDateRange()
    try { await fetch('/api/admin/timesheets/approve', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ user_id: userId, week_start: range.weekStart, status, approved_by: adminUser?.id }) }); setSuccessMsg(status === 'approved' ? 'Week approved' : 'Week rejected'); setTimeout(() => setSuccessMsg(''), 2000); fetchEntries() } catch (e) {}
  }

  const handleEditEntry = (entry) => {
    const ciDate = new Date(entry.clock_in); const coDate = entry.clock_out ? new Date(entry.clock_out) : null
    setEditing(entry.id); setFormData({ user_id: entry.user_id, job_id: entry.job_id || '', entry_type: entry.entry_type, clock_in_date: ciDate.toISOString().split('T')[0], clock_in_time: ciDate.toTimeString().slice(0, 5), clock_out_date: coDate ? coDate.toISOString().split('T')[0] : ciDate.toISOString().split('T')[0], clock_out_time: coDate ? coDate.toTimeString().slice(0, 5) : '', notes: entry.notes || '' })
  }

  const handleNewEntry = () => { const range = getDateRange(); const dateStr = view === 'day' ? range.dateStr : new Date().toISOString().split('T')[0]; setAdding(true); setFormData({ user_id: filterUser || '', job_id: '', entry_type: 'general', clock_in_date: dateStr, clock_in_time: '08:00', clock_out_date: dateStr, clock_out_time: '17:00', notes: '' }) }

  const handleSave = async () => {
    if (!formData.clock_in_date || !formData.clock_in_time) return; setSaving(true)
    try {
      const clockIn = new Date(`${formData.clock_in_date}T${formData.clock_in_time}:00`); const clockOut = formData.clock_out_time ? new Date(`${formData.clock_out_date || formData.clock_in_date}T${formData.clock_out_time}:00`) : null
      if (adding) { if (!formData.user_id) { setSaving(false); return }; await fetch('/api/admin/timesheets', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ user_id: formData.user_id, job_id: formData.job_id || null, entry_type: formData.entry_type, clock_in: clockIn.toISOString(), clock_out: clockOut?.toISOString(), notes: formData.notes, created_by: adminUser?.id }) }) }
      else { await fetch('/api/admin/timesheets', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: editing, clock_in: clockIn.toISOString(), clock_out: clockOut?.toISOString(), job_id: formData.job_id || null, entry_type: formData.entry_type, notes: formData.notes }) }) }
      setEditing(null); setAdding(false); setSuccessMsg(adding ? 'Entry added' : 'Entry updated'); setTimeout(() => setSuccessMsg(''), 2000); fetchEntries()
    } catch (e) {} finally { setSaving(false) }
  }

  const handleDelete = async (id) => { if (!confirm('Delete this time entry?')) return; try { await fetch('/api/admin/timesheets', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) }); setSuccessMsg('Entry deleted'); setTimeout(() => setSuccessMsg(''), 2000); fetchEntries() } catch (e) {} }
  const handleApproveEntry = async (id, status) => { try { await fetch('/api/admin/timesheets', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, status, approved_by: adminUser?.id }) }); fetchEntries() } catch (e) {} }
  const handleExport = () => { const r = getDateRange(); let url = `/api/admin/timesheets/export?start=${r.start}&end=${r.end}`; if (filterUser) url += `&user_id=${filterUser}`; window.open(url, '_blank') }

  const range = getDateRange()
  const totalMins = entries.reduce((s, e) => s + (e.duration_minutes || 0), 0)
  const totalCost = entries.reduce((s, e) => s + parseFloat(e.labor_cost || 0), 0)

  if (!hasPermission('timesheets') && !hasPermission('users')) return <div className="px-4 py-16 text-center"><p className="text-gray-400 font-medium">You don{"'"}t have permission to view timesheets</p></div>

  return (
    <div className="px-4 py-5 sm:py-8">
      <div className="flex items-center justify-between mb-5 animate-[fadeUp_0.3s_ease-out]">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">Timesheets</h2>
          <p className="text-gray-400 text-sm mt-0.5">{Object.keys(groupedByUser).length} crew · {formatHours(totalMins)} total{totalCost > 0 ? ` · $${totalCost.toFixed(0)} labor` : ''}</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handleExport} className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-600 text-sm font-semibold rounded-xl hover:bg-gray-50 transition-all">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>CSV
          </button>
          <button onClick={handleNewEntry} className="flex items-center gap-2 px-4 py-2.5 bg-[#115997] text-white text-sm font-semibold rounded-xl hover:bg-[#0d4a7a] shadow-sm shadow-[#115997]/20 transition-all active:scale-[0.97]">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>Add
          </button>
        </div>
      </div>

      {successMsg && <div className="mb-4 rounded-xl p-3 text-sm bg-green-50 border border-green-200 text-green-700 flex items-center gap-2 animate-[fadeUp_0.2s_ease-out]"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>{successMsg}</div>}

      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-4 animate-[fadeUp_0.35s_ease-out]">
        <div className="flex bg-white rounded-xl p-0.5 w-fit border border-gray-200">
          <button onClick={() => { setView('day'); setDateOffset(0) }} className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${view === 'day' ? 'bg-[#115997] text-white shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}>Day</button>
          <button onClick={() => { setView('week'); setDateOffset(0) }} className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${view === 'week' ? 'bg-[#115997] text-white shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}>Week</button>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setDateOffset(p => p - 1)} className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-white transition-all"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg></button>
          <span className="text-sm font-bold text-gray-700 min-w-[180px] text-center">{range.label}</span>
          <button onClick={() => setDateOffset(p => p + 1)} className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-white transition-all"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></button>
          {dateOffset !== 0 && <button onClick={() => setDateOffset(0)} className="text-xs text-[#115997] font-semibold hover:underline">Today</button>}
        </div>
        <select value={filterUser} onChange={(e) => setFilterUser(e.target.value)} className="px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm bg-white focus:ring-2 focus:ring-[#115997]/20 outline-none sm:ml-auto transition-all">
          <option value="">All crew</option>
          {users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
        </select>
      </div>

      {/* Add/Edit Form */}
      {(adding || editing) && (
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-4 border-2 border-[#115997]/20 animate-[fadeUp_0.2s_ease-out]">
          <h3 className="font-bold text-gray-900 mb-4">{adding ? 'Add Manual Entry' : 'Edit Entry'}</h3>
          <div className="space-y-4">
            {adding && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div><label className="block text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-1">Crew Member *</label><select value={formData.user_id} onChange={(e) => setFormData(p => ({ ...p, user_id: e.target.value }))} className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#115997]/20 outline-none"><option value="">Select crew member</option>{users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}</select></div>
                <div><label className="block text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-1">Type</label><select value={formData.entry_type} onChange={(e) => setFormData(p => ({ ...p, entry_type: e.target.value }))} className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#115997]/20 outline-none"><option value="general">General</option><option value="job">Job</option><option value="break">Break</option></select></div>
              </div>
            )}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div><label className="block text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-1">Clock In Date</label><input type="date" value={formData.clock_in_date} onChange={(e) => setFormData(p => ({ ...p, clock_in_date: e.target.value, clock_out_date: p.clock_out_date || e.target.value }))} className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#115997]/20 outline-none transition-all" /></div>
              <div><label className="block text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-1">Clock In Time</label><input type="time" value={formData.clock_in_time} onChange={(e) => setFormData(p => ({ ...p, clock_in_time: e.target.value }))} className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#115997]/20 outline-none transition-all" /></div>
              <div><label className="block text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-1">Clock Out Date</label><input type="date" value={formData.clock_out_date} onChange={(e) => setFormData(p => ({ ...p, clock_out_date: e.target.value }))} className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#115997]/20 outline-none transition-all" /></div>
              <div><label className="block text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-1">Clock Out Time</label><input type="time" value={formData.clock_out_time} onChange={(e) => setFormData(p => ({ ...p, clock_out_time: e.target.value }))} className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#115997]/20 outline-none transition-all" /></div>
            </div>
            <div><label className="block text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-1">Notes</label><input type="text" value={formData.notes} onChange={(e) => setFormData(p => ({ ...p, notes: e.target.value }))} placeholder="Optional" style={{ fontSize: '16px' }} className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#115997]/20 outline-none transition-all" /></div>
            {formData.clock_in_time && formData.clock_out_time && (
              <div className="bg-[#F5F6F8] rounded-xl px-4 py-2.5 text-xs text-gray-400">
                Duration: <span className="font-bold text-gray-700">{(() => { const ci = new Date(`${formData.clock_in_date}T${formData.clock_in_time}:00`); const co = new Date(`${formData.clock_out_date || formData.clock_in_date}T${formData.clock_out_time}:00`); const mins = Math.round((co - ci) / 60000); return mins > 0 ? formatDuration(mins) : 'Invalid' })()}</span>
              </div>
            )}
            <div className="flex items-center gap-2 pt-1">
              <button onClick={() => { setEditing(null); setAdding(false) }} className="flex-1 sm:flex-none px-4 py-2.5 text-sm font-semibold text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="flex-1 sm:flex-none px-4 py-2.5 text-sm font-semibold text-white bg-[#115997] rounded-xl hover:bg-[#0d4a7a] disabled:opacity-40 shadow-sm shadow-[#115997]/20 transition-all">{saving ? 'Saving...' : adding ? 'Add Entry' : 'Save Changes'}</button>
            </div>
          </div>
        </div>
      )}

      {/* Entries by User */}
      {loading ? (
        <div className="flex items-center justify-center py-12"><div className="w-10 h-10 border-4 border-[#115997] border-t-transparent rounded-full animate-spin" /></div>
      ) : Object.keys(groupedByUser).length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center border border-gray-100"><p className="text-gray-400 text-sm">No time entries for this period</p></div>
      ) : (
        <div className="space-y-3 animate-[fadeUp_0.4s_ease-out]">
          {Object.entries(groupedByUser).sort((a, b) => a[1].name.localeCompare(b[1].name)).map(([userId, data]) => {
            const weekApproval = weekApprovals[userId]
            return (
              <div key={userId} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                <div className="px-4 py-3.5 border-b border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm" style={{ backgroundColor: data.color }}>
                      <span className="text-white font-bold text-xs">{data.name?.charAt(0)?.toUpperCase()}</span>
                    </div>
                    <div><p className="font-bold text-gray-900 text-sm">{data.name}</p><p className="text-[10px] text-gray-300">@{data.username}</p></div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-sm font-extrabold text-gray-900 tabular-nums">{formatHours(data.totalMins)}</p>
                      {data.laborCost > 0 && <p className="text-[10px] text-gray-300 tabular-nums">${data.laborCost.toFixed(2)}</p>}
                    </div>
                    {view === 'week' && (
                      <div className="flex items-center gap-1">
                        {weekApproval?.status === 'approved' ? <span className="text-[10px] font-bold px-2 py-1 rounded-md bg-green-50 text-green-700">Approved</span>
                        : weekApproval?.status === 'rejected' ? <span className="text-[10px] font-bold px-2 py-1 rounded-md bg-red-50 text-red-700">Rejected</span>
                        : <>
                            <button onClick={() => handleApproveWeek(userId, 'approved')} className="p-1.5 text-gray-300 hover:text-green-600 rounded-lg hover:bg-green-50 transition-all" title="Approve"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg></button>
                            <button onClick={() => handleApproveWeek(userId, 'rejected')} className="p-1.5 text-gray-300 hover:text-red-600 rounded-lg hover:bg-red-50 transition-all" title="Reject"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
                          </>}
                      </div>
                    )}
                  </div>
                </div>
                {data.entries.length === 0 ? (
                  <div className="px-4 py-3 text-center"><p className="text-xs text-gray-300">No entries</p></div>
                ) : (
                  <div className="divide-y divide-gray-50">
                    {data.entries.map((entry) => (
                      <div key={entry.id} className={`px-4 py-2.5 flex items-center justify-between group hover:bg-gray-50/50 transition-colors ${!entry.clock_out ? 'bg-emerald-50/30' : ''}`}>
                        <div className="flex items-center gap-2 min-w-0 flex-1">
                          <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${!entry.clock_out ? 'bg-emerald-500 animate-pulse' : entry.entry_type === 'break' ? 'bg-amber-400' : entry.entry_type === 'job' ? 'bg-blue-400' : 'bg-gray-300'}`} />
                          <div className="min-w-0">
                            <p className="text-sm text-gray-700">
                              {formatTime(entry.clock_in)} — {entry.clock_out ? formatTime(entry.clock_out) : <span className="text-emerald-600 font-semibold">Active</span>}
                              {entry.is_manual && <span className="text-[9px] text-amber-500 font-bold ml-1.5">MANUAL</span>}
                            </p>
                            <div className="flex items-center gap-2 mt-0.5">
                              {entry.job_address && <span className="text-[11px] text-gray-400 truncate max-w-[200px]">{entry.job_address}</span>}
                              {entry.notes && <span className="text-[11px] text-gray-300 italic truncate max-w-[150px]">{entry.notes}</span>}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md ${entry.status === 'approved' ? 'bg-green-50 text-green-700' : entry.status === 'rejected' ? 'bg-red-50 text-red-700' : 'bg-gray-100 text-gray-400'}`}>{entry.status}</span>
                          <span className="text-sm font-bold text-gray-900 tabular-nums w-14 text-right">{entry.duration_minutes ? formatDuration(entry.duration_minutes) : '--'}</span>
                          <div className="flex items-center gap-0.5 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                            {entry.status === 'pending' && <button onClick={() => handleApproveEntry(entry.id, 'approved')} className="p-1 text-gray-300 hover:text-green-600 rounded-lg hover:bg-green-50 transition-all"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg></button>}
                            <button onClick={() => handleEditEntry(entry)} className="p-1 text-gray-300 hover:text-[#115997] rounded-lg hover:bg-gray-50 transition-all"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg></button>
                            <button onClick={() => handleDelete(entry.id)} className="p-1 text-gray-300 hover:text-red-600 rounded-lg hover:bg-red-50 transition-all"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}