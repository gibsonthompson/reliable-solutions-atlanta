'use client'

import { useState, useEffect, useCallback } from 'react'
import { useAdminAuth } from '../layout'

const CATEGORIES = [
  { value: 'materials', label: 'Materials', color: 'bg-blue-100 text-blue-700' },
  { value: 'fuel', label: 'Fuel', color: 'bg-amber-100 text-amber-700' },
  { value: 'dump_fee', label: 'Dump Fee', color: 'bg-orange-100 text-orange-700' },
  { value: 'equipment', label: 'Equipment', color: 'bg-purple-100 text-purple-700' },
  { value: 'rental', label: 'Rental', color: 'bg-indigo-100 text-indigo-700' },
  { value: 'food', label: 'Food', color: 'bg-green-100 text-green-700' },
  { value: 'other', label: 'Other', color: 'bg-gray-100 text-gray-600' },
]

export default function ExpensesPage() {
  const { user: adminUser, hasPermission } = useAdminAuth()
  const [expenses, setExpenses] = useState([])
  const [jobs, setJobs] = useState([])
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [adding, setAdding] = useState(false)
  const [editing, setEditing] = useState(null)
  const [saving, setSaving] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')
  const [filterJob, setFilterJob] = useState('')
  const [filterUser, setFilterUser] = useState('')
  const [formData, setFormData] = useState({ job_id: '', user_id: '', title: '', description: '', amount: '', category: 'materials', expense_date: new Date().toISOString().split('T')[0], is_reimbursable: false })

  const fetchExpenses = useCallback(async () => {
    setLoading(true)
    try {
      let url = '/api/admin/expenses?'
      if (filterJob) url += `job_id=${filterJob}&`
      if (filterUser) url += `user_id=${filterUser}&`
      const r = await fetch(url)
      const data = await r.json()
      setExpenses(data.expenses || [])
      setJobs(data.jobs || [])
      setUsers(data.users || [])
    } catch (e) {}
    finally { setLoading(false) }
  }, [filterJob, filterUser])

  useEffect(() => { fetchExpenses() }, [fetchExpenses])

  const handleNew = () => {
    setAdding(true); setEditing(null)
    setFormData({ job_id: filterJob || '', user_id: adminUser?.id || '', title: '', description: '', amount: '', category: 'materials', expense_date: new Date().toISOString().split('T')[0], is_reimbursable: false })
  }

  const handleEdit = (e) => {
    setEditing(e.id); setAdding(false)
    setFormData({ job_id: e.job_id || '', user_id: e.user_id, title: e.title, description: e.description || '', amount: e.amount, category: e.category, expense_date: e.expense_date, is_reimbursable: e.is_reimbursable })
  }

  const handleSave = async () => {
    if (!formData.title.trim() || !formData.amount) return
    setSaving(true)
    try {
      const payload = { ...formData, amount: parseFloat(formData.amount) }
      if (editing) payload.id = editing
      const r = await fetch('/api/admin/expenses', {
        method: editing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (r.ok) {
        setAdding(false); setEditing(null)
        setSuccessMsg(editing ? 'Expense updated' : 'Expense added')
        setTimeout(() => setSuccessMsg(''), 2000)
        fetchExpenses()
      }
    } catch (e) {}
    finally { setSaving(false) }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this expense?')) return
    try {
      await fetch('/api/admin/expenses', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
      setSuccessMsg('Expense deleted'); setTimeout(() => setSuccessMsg(''), 2000)
      fetchExpenses()
    } catch (e) {}
  }

  const handleReimburse = async (expense) => {
    try {
      await fetch('/api/admin/expenses', {
        method: 'PUT', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: expense.id, reimbursed_at: expense.reimbursed_at ? null : new Date().toISOString() })
      })
      fetchExpenses()
    } catch (e) {}
  }

  const getCatStyle = (cat) => CATEGORIES.find(c => c.value === cat)?.color || 'bg-gray-100 text-gray-600'
  const getCatLabel = (cat) => CATEGORIES.find(c => c.value === cat)?.label || cat
  const totalAmount = expenses.reduce((s, e) => s + parseFloat(e.amount || 0), 0)
  const reimbursableTotal = expenses.filter(e => e.is_reimbursable && !e.reimbursed_at).reduce((s, e) => s + parseFloat(e.amount || 0), 0)

  if (!hasPermission('jobs') && !hasPermission('timesheets')) return (
    <div className="px-4 py-16 text-center">
      <p className="text-gray-500 font-medium">You don{"'"}t have permission to view expenses</p>
    </div>
  )

  return (
    <div className="px-4 py-4 sm:py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div>
          <h2 className="text-lg sm:text-2xl font-bold text-[#273373]">Expenses</h2>
          <p className="text-gray-500 text-xs sm:text-sm">
            {expenses.length} expenses · ${totalAmount.toFixed(2)} total
            {reimbursableTotal > 0 && <span className="text-amber-600"> · ${reimbursableTotal.toFixed(2)} pending reimbursement</span>}
          </p>
        </div>
        <button onClick={handleNew} className="flex items-center gap-2 px-4 py-2.5 bg-[#115997] text-white text-sm font-medium rounded-xl hover:bg-[#273373]">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Add Expense
        </button>
      </div>

      {successMsg && <div className="mb-4 rounded-xl p-3 text-sm bg-green-50 border border-green-200 text-green-700 flex items-center gap-2"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>{successMsg}</div>}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <select value={filterJob} onChange={(e) => setFilterJob(e.target.value)} className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#115997] outline-none">
          <option value="">All jobs</option>
          {jobs.map(j => <option key={j.id} value={j.id}>{j.address}{j.client ? ` (${j.client})` : ''}</option>)}
        </select>
        <select value={filterUser} onChange={(e) => setFilterUser(e.target.value)} className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#115997] outline-none">
          <option value="">All crew</option>
          {users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
        </select>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        {CATEGORIES.filter(c => expenses.some(e => e.category === c.value)).map(cat => {
          const catTotal = expenses.filter(e => e.category === cat.value).reduce((s, e) => s + parseFloat(e.amount || 0), 0)
          return (
            <div key={cat.value} className="bg-white rounded-xl p-3 shadow-sm">
              <p className="text-[10px] text-gray-500 uppercase tracking-wide">{cat.label}</p>
              <p className="text-lg font-bold text-gray-900">${catTotal.toFixed(2)}</p>
            </div>
          )
        })}
      </div>

      {/* Add/Edit Form */}
      {(adding || editing) && (
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-4 border-2 border-[#115997]/20">
          <h3 className="font-semibold text-[#273373] mb-4">{editing ? 'Edit Expense' : 'Add Expense'}</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Title *</label>
                <input type="text" value={formData.title} onChange={(e) => setFormData(p => ({ ...p, title: e.target.value }))}
                  placeholder="e.g. Concrete mix, gas fill-up" style={{ fontSize: '16px' }}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#115997] outline-none" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Amount *</label>
                <input type="number" step="0.01" value={formData.amount} onChange={(e) => setFormData(p => ({ ...p, amount: e.target.value }))}
                  placeholder="0.00" style={{ fontSize: '16px' }}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#115997] outline-none" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Category</label>
                <select value={formData.category} onChange={(e) => setFormData(p => ({ ...p, category: e.target.value }))}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#115997] outline-none">
                  {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Job</label>
                <select value={formData.job_id} onChange={(e) => setFormData(p => ({ ...p, job_id: e.target.value }))}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#115997] outline-none">
                  <option value="">No job (general)</option>
                  {jobs.map(j => <option key={j.id} value={j.id}>{j.address}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Crew Member</label>
                <select value={formData.user_id} onChange={(e) => setFormData(p => ({ ...p, user_id: e.target.value }))}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#115997] outline-none">
                  <option value="">Select person</option>
                  {users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Date</label>
                <input type="date" value={formData.expense_date} onChange={(e) => setFormData(p => ({ ...p, expense_date: e.target.value }))}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#115997] outline-none" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Description</label>
                <input type="text" value={formData.description} onChange={(e) => setFormData(p => ({ ...p, description: e.target.value }))}
                  placeholder="Optional details" style={{ fontSize: '16px' }}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#115997] outline-none" />
              </div>
              <div className="flex items-end">
                <button onClick={() => setFormData(p => ({ ...p, is_reimbursable: !p.is_reimbursable }))}
                  className={'flex items-center gap-2 px-3 py-2.5 rounded-lg border text-sm transition-all ' + (formData.is_reimbursable ? 'border-amber-300 bg-amber-50 text-amber-700' : 'border-gray-200 text-gray-500')}>
                  <div className={'w-8 h-4 rounded-full transition-colors relative ' + (formData.is_reimbursable ? 'bg-amber-500' : 'bg-gray-300')}>
                    <div className={'absolute top-0.5 w-3 h-3 rounded-full bg-white shadow-sm transition-transform ' + (formData.is_reimbursable ? 'translate-x-4' : 'translate-x-0.5')} />
                  </div>
                  Reimbursable
                </button>
              </div>
            </div>
            <div className="flex items-center gap-2 pt-1">
              <button onClick={() => { setAdding(false); setEditing(null) }} className="flex-1 sm:flex-none px-4 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200">Cancel</button>
              <button onClick={handleSave} disabled={saving || !formData.title.trim() || !formData.amount}
                className="flex-1 sm:flex-none px-4 py-2.5 text-sm font-medium text-white bg-[#115997] rounded-lg hover:bg-[#273373] disabled:opacity-50">
                {saving ? 'Saving...' : editing ? 'Save Changes' : 'Add Expense'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Expenses List */}
      {loading ? (
        <div className="flex items-center justify-center py-12"><div className="w-10 h-10 border-4 border-[#115997] border-t-transparent rounded-full animate-spin" /></div>
      ) : expenses.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
          <p className="text-gray-400 text-sm">No expenses recorded</p>
          <button onClick={handleNew} className="mt-3 text-sm text-[#115997] font-medium hover:underline">Add your first expense</button>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Desktop Table */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-3 py-2.5 font-semibold text-gray-600">Date</th>
                  <th className="text-left px-3 py-2.5 font-semibold text-gray-600">Title</th>
                  <th className="text-left px-3 py-2.5 font-semibold text-gray-600">Category</th>
                  <th className="text-left px-3 py-2.5 font-semibold text-gray-600">Job</th>
                  <th className="text-left px-3 py-2.5 font-semibold text-gray-600">Crew</th>
                  <th className="text-right px-3 py-2.5 font-semibold text-gray-600">Amount</th>
                  <th className="text-center px-3 py-2.5 font-semibold text-gray-600">Status</th>
                  <th className="px-3 py-2.5 w-20"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {expenses.map(exp => (
                  <tr key={exp.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-3 py-2 text-gray-600 whitespace-nowrap">{new Date(exp.expense_date + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</td>
                    <td className="px-3 py-2">
                      <p className="font-medium text-gray-900">{exp.title}</p>
                      {exp.description && <p className="text-[10px] text-gray-400 mt-0.5">{exp.description}</p>}
                    </td>
                    <td className="px-3 py-2"><span className={`inline-flex px-1.5 py-0.5 rounded text-[10px] font-medium ${getCatStyle(exp.category)}`}>{getCatLabel(exp.category)}</span></td>
                    <td className="px-3 py-2 text-gray-600 max-w-[150px] truncate">{exp.job_address || '—'}</td>
                    <td className="px-3 py-2">
                      <div className="flex items-center gap-1.5">
                        <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: exp.user_color }}>
                          <span className="text-white text-[7px] font-bold">{exp.user_name?.charAt(0)}</span>
                        </div>
                        <span className="text-gray-600 text-[11px]">{exp.user_name}</span>
                      </div>
                    </td>
                    <td className="px-3 py-2 text-right font-semibold text-gray-900 tabular-nums">${parseFloat(exp.amount).toFixed(2)}</td>
                    <td className="px-3 py-2 text-center">
                      {exp.is_reimbursable ? (
                        <button onClick={() => handleReimburse(exp)} className={`text-[10px] font-medium px-2 py-0.5 rounded-full cursor-pointer ${exp.reimbursed_at ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700 hover:bg-amber-200'}`}>
                          {exp.reimbursed_at ? 'Reimbursed' : 'Pending'}
                        </button>
                      ) : <span className="text-gray-300 text-[10px]">—</span>}
                    </td>
                    <td className="px-3 py-2">
                      <div className="flex items-center gap-0.5">
                        <button onClick={() => handleEdit(exp)} className="p-1.5 text-gray-400 hover:text-[#115997] rounded hover:bg-gray-100"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg></button>
                        <button onClick={() => handleDelete(exp.id)} className="p-1.5 text-gray-400 hover:text-red-600 rounded hover:bg-red-50"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-gray-50 border-t-2 border-gray-300 font-semibold text-xs">
                  <td className="px-3 py-2.5" colSpan={5}>TOTAL ({expenses.length} expenses)</td>
                  <td className="px-3 py-2.5 text-right tabular-nums">${totalAmount.toFixed(2)}</td>
                  <td colSpan={2}></td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="sm:hidden divide-y divide-gray-100">
            {expenses.map(exp => (
              <div key={exp.id} className="p-4">
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div className="min-w-0">
                    <p className="font-semibold text-gray-900 text-sm">{exp.title}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(exp.expense_date + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      {exp.job_address ? ` · ${exp.job_address}` : ''}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-bold text-gray-900">${parseFloat(exp.amount).toFixed(2)}</p>
                    <span className={`inline-flex px-1.5 py-0.5 rounded text-[9px] font-medium ${getCatStyle(exp.category)}`}>{getCatLabel(exp.category)}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: exp.user_color }}>
                      <span className="text-white text-[7px] font-bold">{exp.user_name?.charAt(0)}</span>
                    </div>
                    <span className="text-xs text-gray-500">{exp.user_name}</span>
                    {exp.is_reimbursable && (
                      <button onClick={() => handleReimburse(exp)} className={`text-[9px] font-medium px-1.5 py-0.5 rounded-full ${exp.reimbursed_at ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                        {exp.reimbursed_at ? 'Reimbursed' : 'Pending'}
                      </button>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={() => handleEdit(exp)} className="p-1.5 text-gray-400 hover:text-[#115997] rounded"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg></button>
                    <button onClick={() => handleDelete(exp.id)} className="p-1.5 text-gray-400 hover:text-red-600 rounded"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}