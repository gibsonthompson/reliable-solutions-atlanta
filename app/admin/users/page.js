'use client'

import { useState, useEffect } from 'react'
import { useAdminAuth } from '../layout'

const PERMISSION_LABELS = [
  { key: 'dashboard', label: 'Dashboard', desc: 'View the main dashboard with stats' },
  { key: 'contacts', label: 'Requests', desc: 'View and manage contact requests' },
  { key: 'prospects', label: 'Leads', desc: 'View and manage prospect leads' },
  { key: 'pipeline', label: 'Pipeline', desc: 'View and move cards on the pipeline board' },
  { key: 'calendar', label: 'Calendar', desc: 'View scheduled events on the calendar' },
  { key: 'jobs', label: 'Jobs', desc: 'View and manage jobs' },
  { key: 'timesheets', label: 'Timesheets', desc: 'View and manage crew timesheets' },
  { key: 'templates', label: 'Templates', desc: 'View and manage email/SMS templates' },
  { key: 'photos', label: 'Photos', desc: 'Upload and view job photos' },
  { key: 'sms', label: 'Send SMS', desc: 'Send text messages from contact pages' },
  { key: 'email', label: 'Send Email', desc: 'Compose and send emails from contact pages' },
  { key: 'delete_contacts', label: 'Delete Contacts', desc: 'Permanently delete contacts' },
]

const CREW_COLORS = ['#115997', '#2692cc', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316', '#6366f1', '#84cc16', '#06b6d4']

export default function UsersPage() {
  const { hasPermission, user: currentUser } = useAdminAuth()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)
  const [saving, setSaving] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')
  const [error, setError] = useState('')
  const [showHelp, setShowHelp] = useState(false)
  const [formData, setFormData] = useState({ username: '', name: '', phone: '', email: '', password: '', role: 'member', pay_rate: '', pay_type: 'hourly', hire_date: '', color: '#115997', emergency_contact_name: '', emergency_contact_phone: '', permissions: { dashboard: false, contacts: false, prospects: false, pipeline: false, calendar: true, jobs: false, timesheets: false, templates: false, photos: false, sms: false, email: false, delete_contacts: false } })

  useEffect(() => { fetchUsers() }, [])
  const fetchUsers = async () => { try { const r = await fetch('/api/admin/users'); const d = await r.json(); if (d.users) setUsers(d.users) } catch (e) {} finally { setLoading(false) } }

  const handleNew = () => { setEditing('new'); setError(''); setFormData({ username: '', name: '', phone: '', email: '', password: '', role: 'member', pay_rate: '', pay_type: 'hourly', hire_date: '', color: CREW_COLORS[Math.floor(Math.random() * CREW_COLORS.length)], emergency_contact_name: '', emergency_contact_phone: '', permissions: { dashboard: false, contacts: false, prospects: false, pipeline: false, calendar: true, jobs: false, timesheets: false, templates: false, photos: false, sms: false, email: false, delete_contacts: false } }) }
  const handleEdit = (u) => { setEditing(u.id); setError(''); setFormData({ username: u.username, name: u.name, phone: u.phone || '', email: u.email || '', password: '', role: u.role, pay_rate: u.pay_rate || '', pay_type: u.pay_type || 'hourly', hire_date: u.hire_date || '', color: u.color || '#115997', emergency_contact_name: u.emergency_contact_name || '', emergency_contact_phone: u.emergency_contact_phone || '', permissions: u.permissions || {} }) }
  const handleCancel = () => { setEditing(null); setError('') }

  const handleSave = async () => {
    if (!formData.name.trim()) { setError('Name is required'); return }
    if (editing === 'new' && !formData.username.trim()) { setError('Username is required'); return }
    if (editing === 'new' && (!formData.password || formData.password.length < 4)) { setError('Password required (min 4 characters)'); return }
    setSaving(true); setError('')
    try {
      const isNew = editing === 'new'
      const payload = { name: formData.name, phone: formData.phone, email: formData.email || null, role: formData.role, permissions: formData.permissions, pay_rate: formData.pay_rate ? parseFloat(formData.pay_rate) : null, pay_type: formData.pay_type, hire_date: formData.hire_date || null, color: formData.color, emergency_contact_name: formData.emergency_contact_name || null, emergency_contact_phone: formData.emergency_contact_phone || null }
      if (isNew) { payload.username = formData.username; payload.password = formData.password } else { payload.id = editing; if (formData.password) payload.password = formData.password }
      const r = await fetch('/api/admin/users', { method: isNew ? 'POST' : 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }); const data = await r.json()
      if (!r.ok) { setError(data.error || 'Failed to save'); return }
      setSuccessMsg(isNew ? 'User created' : 'User updated'); setEditing(null); fetchUsers(); setTimeout(() => setSuccessMsg(''), 3000)
    } catch (e) { setError('Failed to save') } finally { setSaving(false) }
  }

  const handleToggleActive = async (u) => { try { await fetch('/api/admin/users', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: u.id, is_active: !u.is_active }) }); fetchUsers(); setSuccessMsg(u.is_active ? 'User deactivated' : 'User activated'); setTimeout(() => setSuccessMsg(''), 2000) } catch (e) {} }
  const handleDelete = async (u) => { if (u.id === currentUser?.id) return; if (!confirm('Delete ' + u.name + '? Their assigned contacts will become unassigned.')) return; try { await fetch('/api/admin/users', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: u.id }) }); fetchUsers(); setSuccessMsg('User deleted'); setTimeout(() => setSuccessMsg(''), 2000) } catch (e) {} }

  const togglePerm = (key) => setFormData(p => ({ ...p, permissions: { ...p.permissions, [key]: !p.permissions[key] } }))
  const formatDate = (d) => d ? new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }) : 'Never'

  if (!hasPermission('users')) return <div className="px-4 py-16 text-center"><p className="text-gray-400 font-medium">You don{"'"}t have permission to manage users</p></div>
  if (loading) return <div className="flex items-center justify-center min-h-[50vh]"><div className="flex flex-col items-center gap-3"><div className="w-10 h-10 border-4 border-[#115997] border-t-transparent rounded-full animate-spin" /><p className="text-sm text-gray-400 animate-pulse">Loading users...</p></div></div>

  return (
    <div className="px-4 py-5 sm:py-8">
      <div className="flex items-center justify-between mb-5 animate-[fadeUp_0.3s_ease-out]">
        <div><h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">Users</h2><p className="text-gray-400 text-sm mt-0.5">{users.filter(u=>u.is_active).length} active · {users.length} total</p></div>
        <div className="flex items-center gap-2">
          <button onClick={() => setShowHelp(true)} className="px-2.5 py-2 text-gray-400 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:text-gray-600 transition-all"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.065 2.05-1.37 2.772-1.153.508.153.942.535 1.025 1.059.108.685-.378 1.232-.816 1.627-.39.354-.816.659-.816 1.267V13m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></button>
          {!editing && <button onClick={handleNew} className="flex items-center gap-2 px-4 py-2.5 bg-[#115997] text-white text-sm font-semibold rounded-xl hover:bg-[#0d4a7a] shadow-sm shadow-[#115997]/20 transition-all active:scale-[0.97]"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>Add User</button>}
        </div>
      </div>

      {successMsg && <div className="mb-4 rounded-xl p-3 text-sm bg-green-50 border border-green-200 text-green-700 flex items-center gap-2 animate-[fadeUp_0.2s_ease-out]"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>{successMsg}</div>}

      {editing && (
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-5 border-2 border-[#115997]/20 animate-[fadeUp_0.2s_ease-out]">
          <h3 className="font-bold text-gray-900 mb-4">{editing === 'new' ? 'Add User' : 'Edit User'}</h3>
          {error && <div className="mb-4 rounded-xl p-3 text-sm bg-red-50 border border-red-200 text-red-700">{error}</div>}
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><label className="block text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-1.5">Username *{editing !== 'new' && ' (cannot change)'}</label><input type="text" value={formData.username} onChange={(e) => setFormData(p => ({ ...p, username: e.target.value.toLowerCase().replace(/[^a-z0-9._-]/g, '') }))} placeholder="e.g. alex" disabled={editing !== 'new'} autoCapitalize="none" style={{ fontSize: '16px' }} className={'w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#115997]/20 outline-none transition-all ' + (editing !== 'new' ? 'bg-gray-50 text-gray-400' : '')} /></div>
              <div><label className="block text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-1.5">Full Name *</label><input type="text" value={formData.name} onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))} placeholder="Full name" style={{ fontSize: '16px' }} className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#115997]/20 outline-none transition-all" /></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><label className="block text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-1.5">Phone</label><input type="tel" value={formData.phone} onChange={(e) => setFormData(p => ({ ...p, phone: e.target.value }))} placeholder="(770) 000-0000" style={{ fontSize: '16px' }} className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#115997]/20 outline-none transition-all" /></div>
              <div><label className="block text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-1.5">Email</label><input type="email" value={formData.email} onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))} placeholder="email@example.com" style={{ fontSize: '16px' }} className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#115997]/20 outline-none transition-all" /></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><label className="block text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-1.5">{editing === 'new' ? 'Password *' : 'Reset Password (leave blank)'}</label><input type="text" value={formData.password} onChange={(e) => setFormData(p => ({ ...p, password: e.target.value }))} placeholder={editing === 'new' ? 'Simple is fine' : 'Leave blank to keep current'} style={{ fontSize: '16px' }} className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#115997]/20 outline-none transition-all" />{editing === 'new' && <p className="text-[10px] text-gray-300 mt-1">Visible so you can share it. Min 4 characters.</p>}</div>
              <div><label className="block text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-1.5">Role</label><div className="flex bg-white rounded-xl p-0.5 w-fit border border-gray-200"><button onClick={() => setFormData(p => ({ ...p, role: 'admin' }))} className={'px-4 py-2.5 text-sm font-semibold rounded-lg transition-all ' + (formData.role === 'admin' ? 'bg-[#115997] text-white shadow-sm' : 'text-gray-400')}>Admin</button><button onClick={() => setFormData(p => ({ ...p, role: 'member' }))} className={'px-4 py-2.5 text-sm font-semibold rounded-lg transition-all ' + (formData.role === 'member' ? 'bg-[#115997] text-white shadow-sm' : 'text-gray-400')}>Member</button></div></div>
            </div>

            <div className="pt-3 border-t border-gray-100">
              <h4 className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-3">Crew Details</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div><label className="block text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-1.5">Pay Rate ($/hr)</label><input type="number" step="0.01" value={formData.pay_rate} onChange={(e) => setFormData(p => ({ ...p, pay_rate: e.target.value }))} placeholder="0.00" style={{ fontSize: '16px' }} className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#115997]/20 outline-none transition-all" /></div>
                <div><label className="block text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-1.5">Pay Type</label><select value={formData.pay_type} onChange={(e) => setFormData(p => ({ ...p, pay_type: e.target.value }))} className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#115997]/20 outline-none transition-all"><option value="hourly">Hourly</option><option value="salary">Salary</option></select></div>
                <div><label className="block text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-1.5">Hire Date</label><input type="date" value={formData.hire_date} onChange={(e) => setFormData(p => ({ ...p, hire_date: e.target.value }))} className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#115997]/20 outline-none transition-all" /></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
                <div><label className="block text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-1.5">Emergency Contact</label><input type="text" value={formData.emergency_contact_name} onChange={(e) => setFormData(p => ({ ...p, emergency_contact_name: e.target.value }))} placeholder="Contact name" style={{ fontSize: '16px' }} className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#115997]/20 outline-none transition-all" /></div>
                <div><label className="block text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-1.5">Emergency Phone</label><input type="tel" value={formData.emergency_contact_phone} onChange={(e) => setFormData(p => ({ ...p, emergency_contact_phone: e.target.value }))} placeholder="(770) 000-0000" style={{ fontSize: '16px' }} className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#115997]/20 outline-none transition-all" /></div>
              </div>
              <div className="mt-3"><label className="block text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-1.5">Calendar Color</label><div className="flex items-center gap-2 flex-wrap">{CREW_COLORS.map(c => <button key={c} onClick={() => setFormData(p => ({ ...p, color: c }))} className={'w-8 h-8 rounded-lg border-2 transition-all shadow-sm ' + (formData.color === c ? 'border-gray-900 scale-110 ring-2 ring-offset-1 ring-gray-300' : 'border-transparent hover:scale-105')} style={{ backgroundColor: c }} />)}</div></div>
            </div>

            {formData.role === 'member' && (
              <div className="pt-3 border-t border-gray-100">
                <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-3">Permissions</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {PERMISSION_LABELS.map((p) => (
                    <button key={p.key} onClick={() => togglePerm(p.key)} className={'flex items-center justify-between px-3.5 py-3 rounded-xl border text-sm transition-all ' + (formData.permissions[p.key] ? 'border-[#115997]/20 bg-[#115997]/[0.04]' : 'border-gray-200 bg-white')}>
                      <div className="text-left"><p className={'font-semibold ' + (formData.permissions[p.key] ? 'text-[#115997]' : 'text-gray-600')}>{p.label}</p><p className="text-[10px] text-gray-400 mt-0.5">{p.desc}</p></div>
                      <div className={'w-9 h-5 rounded-full transition-colors flex-shrink-0 relative ' + (formData.permissions[p.key] ? 'bg-[#115997]' : 'bg-gray-300')}><div className={'absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform ' + (formData.permissions[p.key] ? 'translate-x-4' : 'translate-x-0.5')} /></div>
                    </button>
                  ))}
                </div>
                <p className="text-[10px] text-gray-300 mt-2">Members only see contacts assigned to them.</p>
              </div>
            )}
            {formData.role === 'admin' && <div className="bg-blue-50 rounded-xl p-3 flex items-center gap-2"><svg className="w-4 h-4 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg><p className="text-xs text-blue-700">Admins have full access to everything.</p></div>}

            <div className="flex items-center gap-2 pt-2">
              <button onClick={handleCancel} className="flex-1 sm:flex-none px-4 py-2.5 text-sm font-semibold text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="flex-1 sm:flex-none px-4 py-2.5 text-sm font-semibold text-white bg-[#115997] rounded-xl hover:bg-[#0d4a7a] disabled:opacity-40 shadow-sm shadow-[#115997]/20 transition-all">{saving ? 'Saving...' : editing === 'new' ? 'Create User' : 'Save Changes'}</button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 animate-[fadeUp_0.35s_ease-out]">
        {users.length === 0 ? (
          <div className="p-8 sm:p-12 text-center"><p className="text-gray-400">No users yet</p><button onClick={handleNew} className="mt-3 text-sm text-[#115997] font-semibold hover:underline">Add your first user</button></div>
        ) : (
          <div className="divide-y divide-gray-50">
            {users.map((u) => (
              <div key={u.id} className={'p-4 sm:px-6 transition-colors hover:bg-gray-50/50 ' + (u.is_active ? '' : 'bg-gray-50/30')}>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm" style={{ backgroundColor: u.is_active ? (u.color || '#115997') : '#d1d5db' }}>
                      <span className="text-white font-bold text-sm">{u.name?.charAt(0)?.toUpperCase()}</span>
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className={'font-bold text-sm ' + (u.is_active ? 'text-gray-900' : 'text-gray-400')}>{u.name}</p>
                        <span className="text-xs text-gray-300">@{u.username}</span>
                        <span className={'inline-flex px-2 py-0.5 rounded-md text-[9px] font-bold ' + (u.role === 'admin' ? 'bg-purple-50 text-purple-700' : 'bg-gray-100 text-gray-500')}>{u.role}</span>
                        {!u.is_active && <span className="inline-flex px-2 py-0.5 rounded-md text-[9px] font-bold bg-red-50 text-red-600">Disabled</span>}
                        {u.id === currentUser?.id && <span className="inline-flex px-2 py-0.5 rounded-md text-[9px] font-bold bg-blue-50 text-blue-600">You</span>}
                      </div>
                      <div className="flex items-center gap-3 mt-0.5">
                        <p className="text-[10px] text-gray-300">Last login: {formatDate(u.last_login)}</p>
                        {u.pay_rate && <p className="text-[10px] text-gray-300">${u.pay_rate}/hr</p>}
                        {u.hire_date && <p className="text-[10px] text-gray-300">Hired {new Date(u.hire_date + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</p>}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button onClick={() => handleEdit(u)} className="p-2 text-gray-300 hover:text-[#115997] rounded-lg hover:bg-gray-50 transition-all" title="Edit"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg></button>
                    {u.id !== currentUser?.id && <>
                      <button onClick={() => handleToggleActive(u)} className={'p-2 rounded-lg transition-all ' + (u.is_active ? 'text-gray-300 hover:text-amber-600 hover:bg-amber-50' : 'text-gray-300 hover:text-green-600 hover:bg-green-50')} title={u.is_active ? 'Deactivate' : 'Activate'}>{u.is_active ? <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg> : <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}</button>
                      <button onClick={() => handleDelete(u)} className="p-2 text-gray-300 hover:text-red-600 rounded-lg hover:bg-red-50 transition-all" title="Delete"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                    </>}
                  </div>
                </div>
                {u.role === 'member' && u.permissions && (
                  <div className="flex flex-wrap gap-1 mt-2" style={{ marginLeft: '52px' }}>
                    {PERMISSION_LABELS.filter(p => u.permissions[p.key]).map(p => <span key={p.key} className="inline-flex px-1.5 py-0.5 rounded-md text-[9px] font-bold bg-gray-100 text-gray-400">{p.label}</span>)}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {showHelp && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4" onClick={() => setShowHelp(false)}>
          <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-lg max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-5 border-b border-gray-100"><div className="w-8 h-1 bg-gray-300 rounded-full mx-auto mb-3 sm:hidden" /><div className="flex items-center justify-between"><h3 className="text-lg font-bold text-gray-900">Users Help</h3><button onClick={() => setShowHelp(false)} className="text-gray-400 hover:text-gray-600"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button></div></div>
            <div className="p-5 space-y-5">
              <div><h4 className="text-sm font-bold text-gray-800 mb-1">Admins vs Members</h4><p className="text-sm text-gray-500 leading-relaxed">Admins have full access. Members only see assigned contacts and enabled pages.</p></div>
              <div><h4 className="text-sm font-bold text-gray-800 mb-1">Crew Details</h4><p className="text-sm text-gray-500 leading-relaxed">Set hourly pay rate to auto-calculate labor costs on timesheets. Calendar color determines schedule appearance.</p></div>
              <div><h4 className="text-sm font-bold text-gray-800 mb-1">Deactivating vs Deleting</h4><p className="text-sm text-gray-500 leading-relaxed">Deactivate to preserve history. Delete is permanent and unassigns all contacts.</p></div>
            </div>
            <div className="p-5 border-t border-gray-100"><button onClick={() => setShowHelp(false)} className="w-full py-3 bg-[#115997] text-white rounded-xl font-semibold hover:bg-[#0d4a7a] transition-colors">Got it</button></div>
          </div>
        </div>
      )}
    </div>
  )
}