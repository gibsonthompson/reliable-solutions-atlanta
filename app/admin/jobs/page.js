'use client'

import { useState, useEffect } from 'react'
import { useAdminAuth } from '../layout'

const PAYMENT_METHODS = ['ACH', 'Check', 'Cash', 'Zelle', 'Reliable', 'Other']

export default function JobsPage() {
  const { user } = useAdminAuth()
  const isAdmin = user?.role === 'admin'
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)
  const [saving, setSaving] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')
  const [showHelp, setShowHelp] = useState(false)
  const [formData, setFormData] = useState({ address: '', date_start: '', date_end: '', client: '', labor: '', material: '', gas: '', misc: '', revenue: '', payment_method: 'ACH', taxes: '', notes: '' })

  useEffect(() => { fetchJobs() }, [])
  const fetchJobs = async () => {
    try { const r = await fetch('/api/admin/jobs'); const d = await r.json(); if (d.jobs) setJobs(d.jobs) }
    catch (e) {} finally { setLoading(false) }
  }

  const handleNew = () => { setEditing('new'); setFormData({ address: '', date_start: '', date_end: '', client: '', labor: '', material: '', gas: '', misc: '', revenue: '', payment_method: 'ACH', taxes: '', notes: '' }) }
  const handleEdit = (j) => {
    setEditing(j.id)
    setFormData({ address: j.address || '', date_start: j.date_start || '', date_end: j.date_end || '', client: j.client || '', labor: j.labor || '', material: j.material || '', gas: j.gas || '', misc: j.misc || '', revenue: j.revenue || '', payment_method: j.payment_method || 'ACH', taxes: j.taxes || '', notes: j.notes || '' })
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
      if (r.ok) { setEditing(null); fetchJobs(); setSuccessMsg(isNew ? 'Job added' : 'Job updated'); setTimeout(() => setSuccessMsg(''), 2000) }
    } catch (e) {} finally { setSaving(false) }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this job?')) return
    try { await fetch('/api/admin/jobs', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) }); fetchJobs(); setSuccessMsg('Job deleted'); setTimeout(() => setSuccessMsg(''), 2000) } catch (e) {}
  }

  const n = (v) => parseFloat(v) || 0
  const totalExpense = (j) => n(j.labor) + n(j.material) + n(j.gas) + n(j.misc)
  const profit = (j) => n(j.revenue) - totalExpense(j)
  const fmt = (v) => { const num = parseFloat(v); if (!num && num !== 0) return ''; return num.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 }) }
  const fmtMoney = (v) => { const num = parseFloat(v); if (!num && num !== 0) return '$0'; return '$' + Math.abs(num).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 }) }
  const fmtDate = (d) => { if (!d) return ''; const dt = new Date(d + 'T00:00:00'); return (dt.getMonth() + 1) + '/' + dt.getDate() + '/' + String(dt.getFullYear()).slice(2) }
  const dateRange = (j) => { if (!j.date_start) return ''; return fmtDate(j.date_start) + (j.date_end ? '-' + fmtDate(j.date_end) : '') }

  // Totals
  const totals = jobs.reduce((acc, j) => ({
    labor: acc.labor + n(j.labor), material: acc.material + n(j.material), gas: acc.gas + n(j.gas), misc: acc.misc + n(j.misc),
    totalExpense: acc.totalExpense + totalExpense(j), revenue: acc.revenue + n(j.revenue), profit: acc.profit + profit(j), taxes: acc.taxes + n(j.taxes)
  }), { labor: 0, material: 0, gas: 0, misc: 0, totalExpense: 0, revenue: 0, profit: 0, taxes: 0 })

  if (loading) return <div className="flex items-center justify-center min-h-[50vh]"><div className="w-10 h-10 border-4 border-[#115997] border-t-transparent rounded-full animate-spin" /></div>

  return (
    <div className="px-4 py-4 sm:py-8">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div>
          <h2 className="text-lg sm:text-2xl font-bold text-[#273373]">All Jobs</h2>
          <p className="text-gray-500 text-xs sm:text-sm">{jobs.length} jobs · Revenue: {fmtMoney(totals.revenue)} · Profit: {fmtMoney(totals.profit)}</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setShowHelp(true)} className="px-2.5 py-2 text-gray-500 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.065 2.05-1.37 2.772-1.153.508.153.942.535 1.025 1.059.108.685-.378 1.232-.816 1.627-.39.354-.816.659-.816 1.267V13m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></button>
          {isAdmin && !editing && <button onClick={handleNew} className="flex items-center gap-2 px-4 py-2.5 bg-[#115997] text-white text-sm font-medium rounded-xl hover:bg-[#273373]"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>Add Job</button>}
        </div>
      </div>

      {successMsg && <div className="mb-4 rounded-xl p-3 text-sm bg-green-50 border border-green-200 text-green-700 flex items-center gap-2"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>{successMsg}</div>}

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        <div className="bg-white rounded-xl p-3 shadow-sm"><p className="text-[10px] text-gray-500 uppercase tracking-wide">Total Revenue</p><p className="text-lg font-bold text-green-600">{fmtMoney(totals.revenue)}</p></div>
        <div className="bg-white rounded-xl p-3 shadow-sm"><p className="text-[10px] text-gray-500 uppercase tracking-wide">Total Expenses</p><p className="text-lg font-bold text-red-500">{fmtMoney(totals.totalExpense)}</p></div>
        <div className="bg-white rounded-xl p-3 shadow-sm"><p className="text-[10px] text-gray-500 uppercase tracking-wide">Total Profit</p><p className={'text-lg font-bold ' + (totals.profit >= 0 ? 'text-emerald-600' : 'text-red-600')}>{totals.profit < 0 ? '-' : ''}{fmtMoney(totals.profit)}</p></div>
        <div className="bg-white rounded-xl p-3 shadow-sm"><p className="text-[10px] text-gray-500 uppercase tracking-wide">Total Taxes</p><p className="text-lg font-bold text-amber-600">{fmtMoney(totals.taxes)}</p></div>
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
                <div><label className="block text-xs text-gray-500 mb-1">Start Date</label><input type="date" value={formData.date_start} onChange={(e) => setFormData(p => ({ ...p, date_start: e.target.value }))} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#115997] outline-none" /></div>
                <div><label className="block text-xs text-gray-500 mb-1">End Date</label><input type="date" value={formData.date_end} onChange={(e) => setFormData(p => ({ ...p, date_end: e.target.value }))} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#115997] outline-none" /></div>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div><label className="block text-xs text-gray-500 mb-1">Labor $</label><input type="number" step="0.01" value={formData.labor} onChange={(e) => setFormData(p => ({ ...p, labor: e.target.value }))} style={{ fontSize: '16px' }} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#115997] outline-none" /></div>
              <div><label className="block text-xs text-gray-500 mb-1">Material $</label><input type="number" step="0.01" value={formData.material} onChange={(e) => setFormData(p => ({ ...p, material: e.target.value }))} style={{ fontSize: '16px' }} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#115997] outline-none" /></div>
              <div><label className="block text-xs text-gray-500 mb-1">Gas $</label><input type="number" step="0.01" value={formData.gas} onChange={(e) => setFormData(p => ({ ...p, gas: e.target.value }))} style={{ fontSize: '16px' }} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#115997] outline-none" /></div>
              <div><label className="block text-xs text-gray-500 mb-1">Misc $</label><input type="number" step="0.01" value={formData.misc} onChange={(e) => setFormData(p => ({ ...p, misc: e.target.value }))} style={{ fontSize: '16px' }} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#115997] outline-none" /></div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div><label className="block text-xs text-gray-500 mb-1">Revenue $</label><input type="number" step="0.01" value={formData.revenue} onChange={(e) => setFormData(p => ({ ...p, revenue: e.target.value }))} style={{ fontSize: '16px' }} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#115997] outline-none" /></div>
              <div><label className="block text-xs text-gray-500 mb-1">Payment Method</label><select value={formData.payment_method} onChange={(e) => setFormData(p => ({ ...p, payment_method: e.target.value }))} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#115997] outline-none">{PAYMENT_METHODS.map(m => <option key={m} value={m}>{m}</option>)}</select></div>
              <div><label className="block text-xs text-gray-500 mb-1">Taxes $</label><input type="number" step="0.01" value={formData.taxes} onChange={(e) => setFormData(p => ({ ...p, taxes: e.target.value }))} style={{ fontSize: '16px' }} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#115997] outline-none" /></div>
              <div><label className="block text-xs text-gray-500 mb-1">Notes</label><input type="text" value={formData.notes} onChange={(e) => setFormData(p => ({ ...p, notes: e.target.value }))} style={{ fontSize: '16px' }} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#115997] outline-none" /></div>
            </div>
            {/* Live calculated preview */}
            <div className="flex items-center gap-4 text-xs text-gray-500 bg-gray-50 rounded-lg px-3 py-2">
              <span>Total Expense: <span className="font-semibold text-gray-800">${(n(formData.labor) + n(formData.material) + n(formData.gas) + n(formData.misc)).toFixed(2)}</span></span>
              <span>Profit: <span className={'font-semibold ' + ((n(formData.revenue) - n(formData.labor) - n(formData.material) - n(formData.gas) - n(formData.misc)) >= 0 ? 'text-green-600' : 'text-red-600')}>${(n(formData.revenue) - n(formData.labor) - n(formData.material) - n(formData.gas) - n(formData.misc)).toFixed(2)}</span></span>
            </div>
            <div className="flex items-center gap-2 pt-1">
              <button onClick={handleCancel} className="flex-1 sm:flex-none px-4 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200">Cancel</button>
              <button onClick={handleSave} disabled={saving || !formData.address.trim()} className="flex-1 sm:flex-none px-4 py-2.5 text-sm font-medium text-white bg-[#115997] rounded-lg hover:bg-[#273373] disabled:opacity-50">{saving ? 'Saving...' : editing === 'new' ? 'Add Job' : 'Save Changes'}</button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Table */}
      <div className="hidden sm:block bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-3 py-2.5 font-semibold text-gray-600 whitespace-nowrap">#</th>
                <th className="text-left px-3 py-2.5 font-semibold text-gray-600 whitespace-nowrap">Address</th>
                <th className="text-left px-3 py-2.5 font-semibold text-gray-600 whitespace-nowrap">Date</th>
                <th className="text-left px-3 py-2.5 font-semibold text-gray-600 whitespace-nowrap">Client</th>
                <th className="text-right px-3 py-2.5 font-semibold text-gray-600 whitespace-nowrap">Labor</th>
                <th className="text-right px-3 py-2.5 font-semibold text-gray-600 whitespace-nowrap">Material</th>
                <th className="text-right px-3 py-2.5 font-semibold text-gray-600 whitespace-nowrap">Gas</th>
                <th className="text-right px-3 py-2.5 font-semibold text-gray-600 whitespace-nowrap">Misc</th>
                <th className="text-right px-3 py-2.5 font-semibold text-[#273373] whitespace-nowrap">Expense</th>
                <th className="text-right px-3 py-2.5 font-semibold text-green-700 whitespace-nowrap">Revenue</th>
                <th className="text-right px-3 py-2.5 font-semibold text-emerald-700 whitespace-nowrap">Profit</th>
                <th className="text-left px-3 py-2.5 font-semibold text-gray-600 whitespace-nowrap">Payment</th>
                <th className="text-right px-3 py-2.5 font-semibold text-gray-600 whitespace-nowrap">Taxes</th>
                {isAdmin && <th className="px-3 py-2.5 w-16"></th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {jobs.map((j, i) => {
                const te = totalExpense(j)
                const pr = profit(j)
                return (
                  <tr key={j.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-3 py-2 text-gray-400">{i + 1}</td>
                    <td className="px-3 py-2 font-medium text-gray-900 max-w-[180px] truncate">{j.address}</td>
                    <td className="px-3 py-2 text-gray-600 whitespace-nowrap">{dateRange(j)}</td>
                    <td className="px-3 py-2 text-gray-600 max-w-[120px] truncate">{j.client}</td>
                    <td className="px-3 py-2 text-right text-gray-700 tabular-nums">{fmt(j.labor)}</td>
                    <td className="px-3 py-2 text-right text-gray-700 tabular-nums">{fmt(j.material)}</td>
                    <td className="px-3 py-2 text-right text-gray-700 tabular-nums">{fmt(j.gas)}</td>
                    <td className="px-3 py-2 text-right text-gray-700 tabular-nums">{fmt(j.misc)}</td>
                    <td className="px-3 py-2 text-right font-medium text-gray-900 tabular-nums">{fmt(te)}</td>
                    <td className="px-3 py-2 text-right font-medium text-green-700 tabular-nums">{fmt(j.revenue)}</td>
                    <td className={'px-3 py-2 text-right font-semibold tabular-nums ' + (pr >= 0 ? 'text-emerald-600' : 'text-red-600')}>{fmt(pr)}</td>
                    <td className="px-3 py-2"><span className={'inline-flex px-1.5 py-0.5 rounded text-[10px] font-medium ' + (j.payment_method === 'ACH' ? 'bg-blue-100 text-blue-700' : j.payment_method === 'Check' ? 'bg-purple-100 text-purple-700' : j.payment_method === 'Cash' ? 'bg-green-100 text-green-700' : j.payment_method === 'Zelle' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-600')}>{j.payment_method || '—'}</span></td>
                    <td className="px-3 py-2 text-right text-gray-600 tabular-nums">{fmt(j.taxes)}</td>
                    {isAdmin && (
                      <td className="px-3 py-2">
                        <div className="flex items-center gap-0.5">
                          <button onClick={() => handleEdit(j)} className="p-1.5 text-gray-400 hover:text-[#115997] rounded hover:bg-gray-100"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg></button>
                          <button onClick={() => handleDelete(j.id)} className="p-1.5 text-gray-400 hover:text-red-600 rounded hover:bg-red-50"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                        </div>
                      </td>
                    )}
                  </tr>
                )
              })}
            </tbody>
            {jobs.length > 0 && (
              <tfoot>
                <tr className="bg-gray-50 border-t-2 border-gray-300 font-semibold text-xs">
                  <td className="px-3 py-2.5" colSpan={4}>TOTALS ({jobs.length} jobs)</td>
                  <td className="px-3 py-2.5 text-right tabular-nums">{fmt(totals.labor)}</td>
                  <td className="px-3 py-2.5 text-right tabular-nums">{fmt(totals.material)}</td>
                  <td className="px-3 py-2.5 text-right tabular-nums">{fmt(totals.gas)}</td>
                  <td className="px-3 py-2.5 text-right tabular-nums">{fmt(totals.misc)}</td>
                  <td className="px-3 py-2.5 text-right text-gray-900 tabular-nums">{fmt(totals.totalExpense)}</td>
                  <td className="px-3 py-2.5 text-right text-green-700 tabular-nums">{fmt(totals.revenue)}</td>
                  <td className={'px-3 py-2.5 text-right tabular-nums ' + (totals.profit >= 0 ? 'text-emerald-600' : 'text-red-600')}>{fmt(totals.profit)}</td>
                  <td className="px-3 py-2.5"></td>
                  <td className="px-3 py-2.5 text-right tabular-nums">{fmt(totals.taxes)}</td>
                  {isAdmin && <td></td>}
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="sm:hidden space-y-3">
        {jobs.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <p className="text-gray-500">No jobs yet</p>
            {isAdmin && <button onClick={handleNew} className="mt-3 text-sm text-[#115997] font-medium hover:underline">Add your first job</button>}
          </div>
        ) : jobs.map((j, i) => {
          const te = totalExpense(j)
          const pr = profit(j)
          return (
            <div key={j.id} className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="min-w-0">
                  <p className="font-semibold text-gray-900 text-sm truncate">{j.address}</p>
                  <p className="text-xs text-gray-500">{dateRange(j)}{j.client ? ' · ' + j.client : ''}</p>
                </div>
                {isAdmin && (
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button onClick={() => handleEdit(j)} className="p-1.5 text-gray-400 hover:text-[#115997] rounded hover:bg-gray-100"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg></button>
                    <button onClick={() => handleDelete(j.id)} className="p-1.5 text-gray-400 hover:text-red-600 rounded hover:bg-red-50"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                  </div>
                )}
              </div>
              <div className="grid grid-cols-4 gap-2 text-xs mb-2">
                <div><span className="text-gray-400 block">Labor</span><span className="font-medium">${fmt(j.labor)}</span></div>
                <div><span className="text-gray-400 block">Material</span><span className="font-medium">${fmt(j.material)}</span></div>
                <div><span className="text-gray-400 block">Gas</span><span className="font-medium">${fmt(j.gas)}</span></div>
                <div><span className="text-gray-400 block">Misc</span><span className="font-medium">${fmt(j.misc)}</span></div>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <div className="flex items-center gap-3 text-xs">
                  <span className="text-gray-500">Exp: <span className="font-semibold text-gray-800">${fmt(te)}</span></span>
                  <span className="text-gray-500">Rev: <span className="font-semibold text-green-700">${fmt(j.revenue)}</span></span>
                  <span className={'font-semibold ' + (pr >= 0 ? 'text-emerald-600' : 'text-red-600')}>P: ${fmt(pr)}</span>
                </div>
                <span className={'inline-flex px-1.5 py-0.5 rounded text-[10px] font-medium ' + (j.payment_method === 'ACH' ? 'bg-blue-100 text-blue-700' : j.payment_method === 'Check' ? 'bg-purple-100 text-purple-700' : j.payment_method === 'Cash' ? 'bg-green-100 text-green-700' : j.payment_method === 'Zelle' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-600')}>{j.payment_method || '—'}</span>
              </div>
            </div>
          )
        })}
      </div>

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
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-1">What is this page?</h4>
                <p className="text-sm text-gray-600 leading-relaxed">This is your job expense tracker. Every completed job gets logged here with the address, dates, costs, revenue, and payment info. It replaces the Excel spreadsheet.</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-1">Calculated fields</h4>
                <p className="text-sm text-gray-600 leading-relaxed">Total Expense is automatically calculated as Labor + Material + Gas + Misc. Profit is Revenue minus Total Expense. You do not need to enter these — they update on their own.</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-1">Adding a job</h4>
                <p className="text-sm text-gray-600 leading-relaxed">Tap Add Job, fill in the address and costs, then save. The address is the only required field. Everything else is optional but the more you fill in, the more useful the totals and reports become.</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-1">Payment methods</h4>
                <p className="text-sm text-gray-600 leading-relaxed">Track how you were paid for each job: ACH, Check, Cash, Zelle, or Reliable. This helps with bookkeeping and tax prep.</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-1">Summary totals</h4>
                <p className="text-sm text-gray-600 leading-relaxed">The cards at the top and the totals row at the bottom of the table show your running totals across all jobs for revenue, expenses, profit, and taxes.</p>
              </div>
            </div>
            <div className="p-5 border-t border-gray-100">
              <button onClick={() => setShowHelp(false)} className="w-full py-3 bg-[#115997] text-white rounded-xl font-semibold hover:bg-[#273373] transition-colors">Got it</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}