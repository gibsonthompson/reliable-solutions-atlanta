'use client'

import { useState, useEffect, useCallback } from 'react'
import { useAdminAuth } from '../layout'

const PAYMENT_METHODS = ['ACH', 'Check', 'Cash', 'Zelle', 'Reliable', 'Other']
const STATUS_STYLES = {
  active: 'bg-blue-100 text-blue-700',
  completed: 'bg-green-100 text-green-700',
  on_hold: 'bg-amber-100 text-amber-700',
  cancelled: 'bg-red-100 text-red-700',
}

export default function JobsPage() {
  const { user } = useAdminAuth()
  const isAdmin = user?.role === 'admin'
  const [jobs, setJobs] = useState([])
  const [allUsers, setAllUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)
  const [saving, setSaving] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')
  const [showHelp, setShowHelp] = useState(false)
  const [crewByJob, setCrewByJob] = useState({})
  const [jobCosts, setJobCosts] = useState({})

  // Crew modal
  const [crewModalJob, setCrewModalJob] = useState(null)
  const [crewList, setCrewList] = useState([])
  const [crewLoading, setCrewLoading] = useState(false)
  const [newCrewUserId, setNewCrewUserId] = useState('')
  const [newCrewRole, setNewCrewRole] = useState('crew')

  const [formData, setFormData] = useState({ address: '', date_start: '', date_end: '', client: '', labor: '', material: '', gas: '', misc: '', revenue: '', payment_method: 'ACH', taxes: '', notes: '', status: 'active' })

  useEffect(() => { fetchAll() }, [])

  const fetchAll = async () => {
    setLoading(true)
    try {
      const [jobsRes, usersRes, crewRes, costsRes] = await Promise.all([
        fetch('/api/admin/jobs'),
        fetch('/api/admin/users'),
        fetch('/api/admin/job-crew/bulk'),
        fetch('/api/admin/job-costing'),
      ])
      const jobsData = await jobsRes.json()
      const usersData = await usersRes.json()
      const crewData = await crewRes.json()
      const costsData = await costsRes.json()

      if (jobsData.jobs) setJobs(jobsData.jobs)
      if (usersData.users) setAllUsers(usersData.users.filter(u => u.is_active))
      if (crewData.by_job) setCrewByJob(crewData.by_job)
      if (costsData.costs) setJobCosts(costsData.costs)
    } catch (e) {}
    finally { setLoading(false) }
  }

  const openCrewModal = async (job) => {
    setCrewModalJob(job)
    setCrewLoading(true)
    setNewCrewUserId(''); setNewCrewRole('crew')
    try {
      const r = await fetch(`/api/admin/job-crew?job_id=${job.id}`)
      const d = await r.json()
      setCrewList(d.crew || [])
    } catch (e) { setCrewList([]) }
    finally { setCrewLoading(false) }
  }

  const handleAssignCrew = async () => {
    if (!newCrewUserId || !crewModalJob) return
    try {
      await fetch('/api/admin/job-crew', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ job_id: crewModalJob.id, user_id: newCrewUserId, role: newCrewRole, assigned_by: user?.id })
      })
      setNewCrewUserId(''); setNewCrewRole('crew')
      const r = await fetch(`/api/admin/job-crew?job_id=${crewModalJob.id}`)
      const d = await r.json()
      setCrewList(d.crew || [])
      // Refresh bulk crew data
      const bulkR = await fetch('/api/admin/job-crew/bulk')
      const bulkD = await bulkR.json()
      if (bulkD.by_job) setCrewByJob(bulkD.by_job)
    } catch (e) {}
  }

  const handleRemoveCrew = async (assignmentId) => {
    if (!confirm('Remove this crew member?')) return
    try {
      await fetch('/api/admin/job-crew', {
        method: 'DELETE', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: assignmentId })
      })
      const r = await fetch(`/api/admin/job-crew?job_id=${crewModalJob.id}`)
      const d = await r.json()
      setCrewList(d.crew || [])
      const bulkR = await fetch('/api/admin/job-crew/bulk')
      const bulkD = await bulkR.json()
      if (bulkD.by_job) setCrewByJob(bulkD.by_job)
    } catch (e) {}
  }

  const getAvailableUsers = () => {
    const assigned = crewList.map(c => c.user_id)
    return allUsers.filter(u => !assigned.includes(u.id))
  }

  const handleNew = () => { setEditing('new'); setFormData({ address: '', date_start: '', date_end: '', client: '', labor: '', material: '', gas: '', misc: '', revenue: '', payment_method: 'ACH', taxes: '', notes: '', status: 'active' }) }
  const handleEdit = (j) => {
    setEditing(j.id)
    setFormData({ address: j.address || '', date_start: j.date_start || '', date_end: j.date_end || '', client: j.client || '', labor: j.labor || '', material: j.material || '', gas: j.gas || '', misc: j.misc || '', revenue: j.revenue || '', payment_method: j.payment_method || 'ACH', taxes: j.taxes || '', notes: j.notes || '', status: j.status || 'active' })
  }
  const handleCancel = () => setEditing(null)

  const handleSave = async () => {
    if (!formData.address.trim()) return
    setSaving(true)
    try {
      const payload = { ...formData, labor: parseFloat(formData.labor) || 0, material: parseFloat(formData.material) || 0, gas: parseFloat(formData.gas) || 0, misc: parseFloat(formData.misc) || 0, revenue: parseFloat(formData.revenue) || 0, taxes: parseFloat(formData.taxes) || 0 }
      const isNew = editing === 'new'
      if (!isNew) payload.id = editing
      const r = await fetch('/api/admin/jobs', { method: isNew ? 'POST' : 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      if (r.ok) { setEditing(null); fetchAll(); setSuccessMsg(isNew ? 'Job added' : 'Job updated'); setTimeout(() => setSuccessMsg(''), 2000) }
    } catch (e) {} finally { setSaving(false) }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this job?')) return
    try { await fetch('/api/admin/jobs', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) }); fetchAll(); setSuccessMsg('Job deleted'); setTimeout(() => setSuccessMsg(''), 2000) } catch (e) {}
  }

  const n = (v) => parseFloat(v) || 0
  const totalExpense = (j) => n(j.labor) + n(j.material) + n(j.gas) + n(j.misc)
  const profit = (j) => n(j.revenue) - totalExpense(j)
  const fmt = (v) => { const num = parseFloat(v); if (!num && num !== 0) return '0'; return num.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 }) }
  const fmtMoney = (v) => { const num = parseFloat(v); if (!num && num !== 0) return '$0'; return '$' + Math.abs(num).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 }) }
  const fmtDate = (d) => { if (!d) return ''; const dt = new Date(d + 'T00:00:00'); return (dt.getMonth() + 1) + '/' + dt.getDate() + '/' + String(dt.getFullYear()).slice(2) }
  const dateRange = (j) => { if (!j.date_start) return 'No dates'; return fmtDate(j.date_start) + (j.date_end ? ' – ' + fmtDate(j.date_end) : '') }
  const getJobCost = (jobId) => jobCosts[jobId] || null

  const totals = jobs.reduce((acc, j) => ({
    labor: acc.labor + n(j.labor), material: acc.material + n(j.material), gas: acc.gas + n(j.gas), misc: acc.misc + n(j.misc),
    totalExpense: acc.totalExpense + totalExpense(j), revenue: acc.revenue + n(j.revenue), profit: acc.profit + profit(j), taxes: acc.taxes + n(j.taxes)
  }), { labor: 0, material: 0, gas: 0, misc: 0, totalExpense: 0, revenue: 0, profit: 0, taxes: 0 })

  const trackedLaborTotal = Object.values(jobCosts).reduce((s, c) => s + (c.labor_cost || 0), 0)
  const trackedHoursTotal = Object.values(jobCosts).reduce((s, c) => s + (c.labor_hours || 0), 0)

  if (loading) return <div className="flex items-center justify-center min-h-[50vh]"><div className="w-10 h-10 border-4 border-[#115997] border-t-transparent rounded-full animate-spin" /></div>

  return (
    <div className="px-4 py-4 sm:py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div>
          <h2 className="text-lg sm:text-2xl font-bold text-[#273373]">All Jobs</h2>
          <p className="text-gray-500 text-xs sm:text-sm">{jobs.length} jobs · Revenue: {fmtMoney(totals.revenue)} · Profit: {fmtMoney(totals.profit)}</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setShowHelp(true)} className="px-2.5 py-2 text-gray-500 bg-gray-100 rounded-lg hover:bg-gray-200"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.065 2.05-1.37 2.772-1.153.508.153.942.535 1.025 1.059.108.685-.378 1.232-.816 1.627-.39.354-.816.659-.816 1.267V13m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></button>
          {isAdmin && !editing && <button onClick={handleNew} className="flex items-center gap-2 px-4 py-2.5 bg-[#115997] text-white text-sm font-medium rounded-xl hover:bg-[#273373]"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>Add Job</button>}
        </div>
      </div>

      {successMsg && <div className="mb-4 rounded-xl p-3 text-sm bg-green-50 border border-green-200 text-green-700 flex items-center gap-2"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>{successMsg}</div>}

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-4">
        <div className="bg-white rounded-xl p-3 shadow-sm"><p className="text-[10px] text-gray-500 uppercase tracking-wide">Revenue</p><p className="text-lg font-bold text-green-600">{fmtMoney(totals.revenue)}</p></div>
        <div className="bg-white rounded-xl p-3 shadow-sm"><p className="text-[10px] text-gray-500 uppercase tracking-wide">Expenses</p><p className="text-lg font-bold text-red-500">{fmtMoney(totals.totalExpense)}</p></div>
        <div className="bg-white rounded-xl p-3 shadow-sm"><p className="text-[10px] text-gray-500 uppercase tracking-wide">Profit</p><p className={'text-lg font-bold ' + (totals.profit >= 0 ? 'text-emerald-600' : 'text-red-600')}>{totals.profit < 0 ? '-' : ''}{fmtMoney(totals.profit)}</p></div>
        <div className="bg-white rounded-xl p-3 shadow-sm"><p className="text-[10px] text-gray-500 uppercase tracking-wide">Tracked Labor</p><p className="text-lg font-bold text-[#115997]">{trackedHoursTotal.toFixed(1)}h</p><p className="text-[10px] text-gray-400">${trackedLaborTotal.toFixed(0)} cost</p></div>
        <div className="bg-white rounded-xl p-3 shadow-sm"><p className="text-[10px] text-gray-500 uppercase tracking-wide">Taxes</p><p className="text-lg font-bold text-amber-600">{fmtMoney(totals.taxes)}</p></div>
      </div>

      {/* Add/Edit Form */}
      {editing && (
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-4 border-2 border-[#115997]/20">
          <h3 className="font-semibold text-[#273373] mb-4">{editing === 'new' ? 'Add Job' : 'Edit Job'}</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div><label className="block text-xs text-gray-500 mb-1">Address *</label><input type="text" value={formData.address} onChange={(e) => setFormData(p => ({ ...p, address: e.target.value }))} style={{ fontSize: '16px' }} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#115997] outline-none" /></div>
              <div><label className="block text-xs text-gray-500 mb-1">Client</label><input type="text" value={formData.client} onChange={(e) => setFormData(p => ({ ...p, client: e.target.value }))} style={{ fontSize: '16px' }} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#115997] outline-none" /></div>
              <div className="grid grid-cols-2 gap-2">
                <div><label className="block text-xs text-gray-500 mb-1">Start</label><input type="date" value={formData.date_start} onChange={(e) => setFormData(p => ({ ...p, date_start: e.target.value }))} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#115997] outline-none" /></div>
                <div><label className="block text-xs text-gray-500 mb-1">End</label><input type="date" value={formData.date_end} onChange={(e) => setFormData(p => ({ ...p, date_end: e.target.value }))} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#115997] outline-none" /></div>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              <div><label className="block text-xs text-gray-500 mb-1">Labor $</label><input type="number" step="0.01" value={formData.labor} onChange={(e) => setFormData(p => ({ ...p, labor: e.target.value }))} style={{ fontSize: '16px' }} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#115997] outline-none" /></div>
              <div><label className="block text-xs text-gray-500 mb-1">Material $</label><input type="number" step="0.01" value={formData.material} onChange={(e) => setFormData(p => ({ ...p, material: e.target.value }))} style={{ fontSize: '16px' }} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#115997] outline-none" /></div>
              <div><label className="block text-xs text-gray-500 mb-1">Gas $</label><input type="number" step="0.01" value={formData.gas} onChange={(e) => setFormData(p => ({ ...p, gas: e.target.value }))} style={{ fontSize: '16px' }} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#115997] outline-none" /></div>
              <div><label className="block text-xs text-gray-500 mb-1">Misc $</label><input type="number" step="0.01" value={formData.misc} onChange={(e) => setFormData(p => ({ ...p, misc: e.target.value }))} style={{ fontSize: '16px' }} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#115997] outline-none" /></div>
              <div><label className="block text-xs text-gray-500 mb-1">Status</label><select value={formData.status} onChange={(e) => setFormData(p => ({ ...p, status: e.target.value }))} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#115997] outline-none"><option value="active">Active</option><option value="completed">Completed</option><option value="on_hold">On Hold</option><option value="cancelled">Cancelled</option></select></div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div><label className="block text-xs text-gray-500 mb-1">Revenue $</label><input type="number" step="0.01" value={formData.revenue} onChange={(e) => setFormData(p => ({ ...p, revenue: e.target.value }))} style={{ fontSize: '16px' }} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#115997] outline-none" /></div>
              <div><label className="block text-xs text-gray-500 mb-1">Payment</label><select value={formData.payment_method} onChange={(e) => setFormData(p => ({ ...p, payment_method: e.target.value }))} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#115997] outline-none">{PAYMENT_METHODS.map(m => <option key={m} value={m}>{m}</option>)}</select></div>
              <div><label className="block text-xs text-gray-500 mb-1">Taxes $</label><input type="number" step="0.01" value={formData.taxes} onChange={(e) => setFormData(p => ({ ...p, taxes: e.target.value }))} style={{ fontSize: '16px' }} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#115997] outline-none" /></div>
              <div><label className="block text-xs text-gray-500 mb-1">Notes</label><input type="text" value={formData.notes} onChange={(e) => setFormData(p => ({ ...p, notes: e.target.value }))} style={{ fontSize: '16px' }} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#115997] outline-none" /></div>
            </div>
            <div className="flex items-center gap-4 text-xs text-gray-500 bg-gray-50 rounded-lg px-3 py-2">
              <span>Expense: <span className="font-semibold text-gray-800">${(n(formData.labor) + n(formData.material) + n(formData.gas) + n(formData.misc)).toFixed(2)}</span></span>
              <span>Profit: <span className={'font-semibold ' + ((n(formData.revenue) - n(formData.labor) - n(formData.material) - n(formData.gas) - n(formData.misc)) >= 0 ? 'text-green-600' : 'text-red-600')}>${(n(formData.revenue) - n(formData.labor) - n(formData.material) - n(formData.gas) - n(formData.misc)).toFixed(2)}</span></span>
            </div>
            <div className="flex items-center gap-2 pt-1">
              <button onClick={handleCancel} className="flex-1 sm:flex-none px-4 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200">Cancel</button>
              <button onClick={handleSave} disabled={saving || !formData.address.trim()} className="flex-1 sm:flex-none px-4 py-2.5 text-sm font-medium text-white bg-[#115997] rounded-lg hover:bg-[#273373] disabled:opacity-50">{saving ? 'Saving...' : editing === 'new' ? 'Add Job' : 'Save Changes'}</button>
            </div>
          </div>
        </div>
      )}

      {/* Job Cards */}
      <div className="space-y-3">
        {jobs.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <p className="text-gray-500">No jobs yet</p>
            {isAdmin && <button onClick={handleNew} className="mt-3 text-sm text-[#115997] font-medium hover:underline">Add your first job</button>}
          </div>
        ) : jobs.map((j, i) => {
          const te = totalExpense(j)
          const pr = profit(j)
          const crew = crewByJob[j.id] || []
          const cost = getJobCost(j.id)

          return (
            <div key={j.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              {/* Top row: address, status, dates, actions */}
              <div className="px-4 py-3 flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs text-gray-400 font-mono">#{i + 1}</span>
                    <h3 className="font-semibold text-gray-900 text-sm">{j.address}</h3>
                    <span className={`text-[9px] font-medium px-1.5 py-0.5 rounded ${STATUS_STYLES[j.status] || 'bg-gray-100 text-gray-600'}`}>{(j.status || 'active').replace('_', ' ')}</span>
                  </div>
                  <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                    <span>{dateRange(j)}</span>
                    {j.client && <span>· {j.client}</span>}
                    <span className={'inline-flex px-1.5 py-0.5 rounded text-[10px] font-medium ' + (j.payment_method === 'ACH' ? 'bg-blue-100 text-blue-700' : j.payment_method === 'Check' ? 'bg-purple-100 text-purple-700' : j.payment_method === 'Cash' ? 'bg-green-100 text-green-700' : j.payment_method === 'Zelle' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-600')}>{j.payment_method || '—'}</span>
                  </div>
                </div>
                {isAdmin && (
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button onClick={() => handleEdit(j)} className="p-1.5 text-gray-400 hover:text-[#115997] rounded hover:bg-gray-100" title="Edit"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg></button>
                    <button onClick={() => handleDelete(j.id)} className="p-1.5 text-gray-400 hover:text-red-600 rounded hover:bg-red-50" title="Delete"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                  </div>
                )}
              </div>

              {/* Crew Section - THE MAIN FEATURE */}
              <div className="px-4 py-2.5 bg-slate-50 border-y border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-gray-500 uppercase font-semibold tracking-wide">Crew</span>
                    {crew.length === 0 ? (
                      <span className="text-xs text-gray-400 italic">No crew assigned</span>
                    ) : (
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {crew.map(c => (
                          <div key={c.id} className="flex items-center gap-1 bg-white rounded-full pl-0.5 pr-2 py-0.5 border border-gray-200">
                            <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: c.user_color || '#115997' }}>
                              <span className="text-white text-[8px] font-bold">{c.user_name?.charAt(0)}</span>
                            </div>
                            <span className="text-[11px] text-gray-700 font-medium">{c.user_name?.split(' ')[0]}</span>
                            {c.role === 'lead' && <span className="text-[8px] text-purple-600 font-bold">LEAD</span>}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  {isAdmin && (
                    <button onClick={() => openCrewModal(j)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        crew.length === 0
                          ? 'bg-[#115997] text-white hover:bg-[#273373]'
                          : 'bg-white text-[#115997] border border-[#115997]/30 hover:bg-[#115997]/5'
                      }`}>
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      {crew.length === 0 ? 'Assign Crew' : 'Manage'}
                    </button>
                  )}
                </div>
              </div>

              {/* Financials Row */}
              <div className="px-4 py-2.5">
                <div className="flex items-center gap-4 text-xs flex-wrap">
                  <div className="flex items-center gap-1"><span className="text-gray-400">Lab:</span><span className="font-medium text-gray-700">${fmt(j.labor)}</span></div>
                  <div className="flex items-center gap-1"><span className="text-gray-400">Mat:</span><span className="font-medium text-gray-700">${fmt(j.material)}</span></div>
                  <div className="flex items-center gap-1"><span className="text-gray-400">Gas:</span><span className="font-medium text-gray-700">${fmt(j.gas)}</span></div>
                  <div className="flex items-center gap-1"><span className="text-gray-400">Misc:</span><span className="font-medium text-gray-700">${fmt(j.misc)}</span></div>
                  <div className="h-3 w-px bg-gray-200" />
                  <div className="flex items-center gap-1"><span className="text-gray-500 font-medium">Exp:</span><span className="font-semibold text-gray-800">${fmt(te)}</span></div>
                  <div className="flex items-center gap-1"><span className="text-green-600 font-medium">Rev:</span><span className="font-semibold text-green-700">${fmt(j.revenue)}</span></div>
                  <div className="flex items-center gap-1"><span className={pr >= 0 ? 'text-emerald-600' : 'text-red-600'}>Profit:</span><span className={'font-bold ' + (pr >= 0 ? 'text-emerald-600' : 'text-red-600')}>${fmt(pr)}</span></div>
                  {cost && (
                    <>
                      <div className="h-3 w-px bg-gray-200" />
                      <div className="flex items-center gap-1"><span className="text-[#115997]">Tracked:</span><span className="font-semibold text-[#115997]">{cost.labor_hours}h · ${fmt(cost.total_cost)}</span></div>
                    </>
                  )}
                  {n(j.taxes) > 0 && (
                    <div className="flex items-center gap-1"><span className="text-amber-600">Tax:</span><span className="font-medium text-amber-600">${fmt(j.taxes)}</span></div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* CREW MODAL */}
      {crewModalJob && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4" onClick={() => setCrewModalJob(null)}>
          <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-md max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-5 border-b border-gray-100">
              <div className="w-8 h-1 bg-gray-300 rounded-full mx-auto mb-3 sm:hidden" />
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-[#273373]">Manage Crew</h3>
                  <p className="text-xs text-gray-500 mt-0.5">{crewModalJob.address}</p>
                </div>
                <button onClick={() => setCrewModalJob(null)} className="text-gray-400 hover:text-gray-600 p-1">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
            </div>
            <div className="p-5">
              <div className="mb-4">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Add Crew Member</label>
                <div className="flex items-center gap-2">
                  <select value={newCrewUserId} onChange={(e) => setNewCrewUserId(e.target.value)} className="flex-1 px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#115997] outline-none">
                    <option value="">Select person...</option>
                    {getAvailableUsers().map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                  </select>
                  <select value={newCrewRole} onChange={(e) => setNewCrewRole(e.target.value)} className="px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#115997] outline-none w-28">
                    <option value="crew">Crew</option>
                    <option value="lead">Lead</option>
                    <option value="subcontractor">Sub</option>
                  </select>
                  <button onClick={handleAssignCrew} disabled={!newCrewUserId} className="px-4 py-2.5 bg-[#115997] text-white text-sm font-medium rounded-lg hover:bg-[#273373] disabled:opacity-40">Add</button>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Assigned ({crewList.length})</label>
                {crewLoading ? (
                  <div className="flex items-center justify-center py-6"><div className="w-6 h-6 border-2 border-[#115997] border-t-transparent rounded-full animate-spin" /></div>
                ) : crewList.length === 0 ? (
                  <div className="bg-gray-50 rounded-lg p-6 text-center">
                    <svg className="w-8 h-8 text-gray-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    <p className="text-sm text-gray-400">No crew assigned yet</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {crewList.map(c => (
                      <div key={c.id} className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ backgroundColor: c.user_color || '#115997' }}>
                            <span className="text-white font-bold text-sm">{c.user_name?.charAt(0)?.toUpperCase()}</span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{c.user_name}</p>
                            <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${c.role === 'lead' ? 'bg-purple-100 text-purple-700' : c.role === 'subcontractor' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-600'}`}>{c.role}</span>
                          </div>
                        </div>
                        <button onClick={() => handleRemoveCrew(c.id)} className="p-2 text-gray-300 hover:text-red-500 rounded-lg hover:bg-red-50"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="p-5 border-t border-gray-100">
              <button onClick={() => setCrewModalJob(null)} className="w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200">Done</button>
            </div>
          </div>
        </div>
      )}

      {/* Help Modal */}
      {showHelp && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4" onClick={() => setShowHelp(false)}>
          <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-lg max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-5 border-b border-gray-100">
              <div className="w-8 h-1 bg-gray-300 rounded-full mx-auto mb-3 sm:hidden" />
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-[#273373]">Jobs Help</h3>
                <button onClick={() => setShowHelp(false)} className="text-gray-400 hover:text-gray-600"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
              </div>
            </div>
            <div className="p-5 space-y-5">
              <div><h4 className="text-sm font-semibold text-gray-800 mb-1">Crew assignment</h4><p className="text-sm text-gray-600 leading-relaxed">Each job card has a Crew section. Click "Assign Crew" (blue button) to add crew members, or "Manage" to add/remove from an existing crew. Assigned crew will see the job on their schedule in the time clock app.</p></div>
              <div><h4 className="text-sm font-semibold text-gray-800 mb-1">Financials</h4><p className="text-sm text-gray-600 leading-relaxed">Each card shows labor, material, gas, misc costs, total expense, revenue, and profit. "Tracked" shows actual hours logged by crew via the time clock × their pay rate.</p></div>
              <div><h4 className="text-sm font-semibold text-gray-800 mb-1">Job status</h4><p className="text-sm text-gray-600 leading-relaxed">Jobs can be Active, Completed, On Hold, or Cancelled. Set the status when editing a job.</p></div>
            </div>
            <div className="p-5 border-t border-gray-100">
              <button onClick={() => setShowHelp(false)} className="w-full py-3 bg-[#115997] text-white rounded-xl font-semibold hover:bg-[#273373]">Got it</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}