'use client'

import { useState, useEffect } from 'react'
import { useAdminAuth } from '../layout'

const PERMISSION_LABELS = [
  { key: 'dashboard', label: 'Dashboard', desc: 'View the main dashboard with stats' },
  { key: 'contacts', label: 'Requests', desc: 'View and manage contact requests' },
  { key: 'prospects', label: 'Leads', desc: 'View and manage prospect leads' },
  { key: 'pipeline', label: 'Pipeline', desc: 'View and move cards on the pipeline board' },
  { key: 'calendar', label: 'Calendar', desc: 'View scheduled events on the calendar' },
  { key: 'templates', label: 'Templates', desc: 'View and manage email/SMS templates' },
  { key: 'sms', label: 'Send SMS', desc: 'Send text messages from contact pages' },
  { key: 'email', label: 'Send Email', desc: 'Compose and send emails from contact pages' },
  { key: 'delete_contacts', label: 'Delete Contacts', desc: 'Permanently delete contacts' },
]

const DEFAULT_MEMBER_PERMS = { dashboard: false, contacts: false, prospects: false, pipeline: false, calendar: true, templates: false, users: false, sms: false, email: false, delete_contacts: false }

export default function UsersPage() {
  const { hasPermission, user: currentUser } = useAdminAuth()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)
  const [saving, setSaving] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    username: '', name: '', phone: '', password: '', role: 'member',
    permissions: { ...DEFAULT_MEMBER_PERMS }
  })

  useEffect(() => { fetchUsers() }, [])
  const fetchUsers = async () => {
    try { const r = await fetch('/api/admin/users'); const d = await r.json(); if (d.users) setUsers(d.users) }
    catch (e) {} finally { setLoading(false) }
  }

  const handleNew = () => { setEditing('new'); setError(''); setFormData({ username: '', name: '', phone: '', password: '', role: 'member', permissions: { ...DEFAULT_MEMBER_PERMS } }) }
  const handleEdit = (u) => { setEditing(u.id); setError(''); setFormData({ username: u.username, name: u.name, phone: u.phone || '', password: '', role: u.role, permissions: u.permissions || {} }) }
  const handleCancel = () => { setEditing(null); setError('') }

  const handleSave = async () => {
    if (!formData.name.trim()) { setError('Name is required'); return }
    if (editing === 'new' && !formData.username.trim()) { setError('Username is required'); return }
    if (editing === 'new' && !formData.password) { setError('Password is required for new users'); return }
    setSaving(true); setError('')
    try {
      const isNew = editing === 'new'
      const payload = isNew
        ? { username: formData.username, name: formData.name, phone: formData.phone, password: formData.password, role: formData.role, permissions: formData.permissions }
        : { id: editing, name: formData.name, phone: formData.phone, role: formData.role, permissions: formData.permissions, ...(formData.password ? { password: formData.password } : {}) }
      const r = await fetch('/api/admin/users', { method: isNew ? 'POST' : 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      const data = await r.json()
      if (!r.ok) { setError(data.error || 'Failed to save'); return }
      setSuccessMsg(isNew ? 'User created' : 'User updated'); setEditing(null); fetchUsers()
      setTimeout(() => setSuccessMsg(''), 3000)
    } catch (e) { setError('Failed to save') }
    finally { setSaving(false) }
  }

  const handleToggleActive = async (u) => {
    try {
      await fetch('/api/admin/users', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: u.id, is_active: !u.is_active }) })
      fetchUsers(); setSuccessMsg(u.is_active ? 'User deactivated' : 'User activated'); setTimeout(() => setSuccessMsg(''), 2000)
    } catch (e) {}
  }

  const handleDelete = async (u) => {
    if (u.id === currentUser?.id) return
    if (!confirm('Delete ' + u.name + '? Their assigned contacts will become unassigned.')) return
    try {
      await fetch('/api/admin/users', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: u.id }) })
      fetchUsers(); setSuccessMsg('User deleted'); setTimeout(() => setSuccessMsg(''), 2000)
    } catch (e) {}
  }

  const togglePerm = (key) => setFormData(p => ({ ...p, permissions: { ...p.permissions, [key]: !p.permissions[key] } }))
  const formatDate = (d) => d ? new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }) : 'Never'

  if (!hasPermission('users')) return (
    <div className="px-4 py-16 text-center">
      <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
      <p className="text-gray-500 font-medium">You don't have permission to manage users</p>
    </div>
  )

  if (loading) return <div className="flex items-center justify-center min-h-[50vh]"><div className="w-10 h-10 border-4 border-[#115997] border-t-transparent rounded-full animate-spin" /></div>

  return (
    <div className="px-4 py-4 sm:py-8">
      <div className="flex items-center justify-between mb-6">
        <div><h2 className="text-lg sm:text-2xl font-bold text-[#273373]">Users</h2><p className="text-gray-500 text-xs sm:text-sm">{users.filter(u=>u.is_active).length} active · {users.length} total</p></div>
        {!editing && <button onClick={handleNew} className="flex items-center gap-2 px-4 py-2.5 bg-[#115997] text-white text-sm font-medium rounded-xl hover:bg-[#273373]"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>Add User</button>}
      </div>

      {successMsg && <div className="mb-4 rounded-xl p-3 text-sm bg-green-50 border border-green-200 text-green-700 flex items-center gap-2"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>{successMsg}</div>}

      {editing && (
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-6 border-2 border-[#115997]/20">
          <h3 className="font-semibold text-[#273373] mb-4">{editing === 'new' ? 'Add User' : 'Edit User'}</h3>
          {error && <div className="mb-4 rounded-lg p-3 text-sm bg-red-50 border border-red-200 text-red-700">{error}</div>}
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1.5">Username *{editing !== 'new' && ' (cannot change)'}</label>
                <input type="text" value={formData.username} onChange={(e) => setFormData(p => ({ ...p, username: e.target.value.toLowerCase().replace(/[^a-z0-9._-]/g, '') }))}
                  placeholder="Username" disabled={editing !== 'new'} autoCapitalize="none"
                  className={'w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#115997] outline-none ' + (editing !== 'new' ? 'bg-gray-50 text-gray-500' : '')} />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1.5">Full Name *</label>
                <input type="text" value={formData.name} onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))}
                  placeholder="Full name" className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#115997] outline-none" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1.5">Phone</label>
                <input type="tel" value={formData.phone} onChange={(e) => setFormData(p => ({ ...p, phone: e.target.value }))}
                  placeholder="(770) 000-0000" className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#115997] outline-none" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1.5">{editing === 'new' ? 'Password *' : 'Reset Password (leave blank to keep)'}</label>
                <input type="text" value={formData.password} onChange={(e) => setFormData(p => ({ ...p, password: e.target.value }))}
                  placeholder={editing === 'new' ? 'Simple is fine' : 'Leave blank to keep current'}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#115997] outline-none" />
                {editing === 'new' && <p className="text-[11px] text-gray-400 mt-1">Password is visible so you can share it with them. Min 4 characters.</p>}
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1.5">Role</label>
              <div className="flex bg-gray-100 rounded-lg p-0.5 w-fit">
                <button onClick={() => setFormData(p => ({ ...p, role: 'admin' }))} className={'px-4 py-2.5 text-sm font-medium rounded-md transition-colors ' + (formData.role === 'admin' ? 'bg-white text-[#115997] shadow-sm' : 'text-gray-500')}>Admin</button>
                <button onClick={() => setFormData(p => ({ ...p, role: 'member' }))} className={'px-4 py-2.5 text-sm font-medium rounded-md transition-colors ' + (formData.role === 'member' ? 'bg-white text-[#115997] shadow-sm' : 'text-gray-500')}>Member</button>
              </div>
            </div>

            {formData.role === 'member' && (
              <div>
                <label className="block text-xs text-gray-500 mb-3">What can this user access?</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {PERMISSION_LABELS.map((p) => (
                    <button key={p.key} onClick={() => togglePerm(p.key)}
                      className={'flex items-center justify-between px-3 py-3 rounded-lg border text-sm transition-all ' + (formData.permissions[p.key] ? 'border-[#115997]/30 bg-[#115997]/5' : 'border-gray-200 bg-white')}>
                      <div className="text-left">
                        <p className={'font-medium ' + (formData.permissions[p.key] ? 'text-[#115997]' : 'text-gray-700')}>{p.label}</p>
                        <p className="text-[11px] text-gray-400 mt-0.5">{p.desc}</p>
                      </div>
                      <div className={'w-9 h-5 rounded-full transition-colors flex-shrink-0 relative ' + (formData.permissions[p.key] ? 'bg-[#115997]' : 'bg-gray-300')}>
                        <div className={'absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform ' + (formData.permissions[p.key] ? 'translate-x-4' : 'translate-x-0.5')} />
                      </div>
                    </button>
                  ))}
                </div>
                <p className="text-[11px] text-gray-400 mt-2">Members only see contacts assigned to them. Admins see everything.</p>
              </div>
            )}
            {formData.role === 'admin' && (
              <div className="bg-blue-50 rounded-lg p-3 flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <p className="text-xs text-blue-700">Admins have full access to everything including user management. They see all contacts regardless of assignment.</p>
              </div>
            )}

            <div className="flex items-center gap-2 pt-2">
              <button onClick={handleCancel} className="flex-1 sm:flex-none px-4 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="flex-1 sm:flex-none px-4 py-2.5 text-sm font-medium text-white bg-[#115997] rounded-lg hover:bg-[#273373] disabled:opacity-50">{saving ? 'Saving...' : editing === 'new' ? 'Create User' : 'Save Changes'}</button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {users.length === 0 ? (
          <div className="p-8 sm:p-12 text-center">
            <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            <p className="text-gray-500">No users yet</p>
            <button onClick={handleNew} className="mt-3 text-sm text-[#115997] font-medium hover:underline">Add your first user</button>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {users.map((u) => (
              <div key={u.id} className={'p-4 sm:px-6 transition-colors ' + (u.is_active ? 'hover:bg-gray-50' : 'bg-gray-50/50')}>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={'w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ' + (u.is_active ? 'bg-[#115997]' : 'bg-gray-300')}>
                      <span className="text-white font-bold text-sm">{u.name?.charAt(0)?.toUpperCase()}</span>
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className={'font-semibold text-sm ' + (u.is_active ? 'text-gray-900' : 'text-gray-400')}>{u.name}</p>
                        <span className="text-xs text-gray-400">@{u.username}</span>
                        <span className={'inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium ' + (u.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600')}>{u.role}</span>
                        {!u.is_active && <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium bg-red-100 text-red-600">Disabled</span>}
                        {u.id === currentUser?.id && <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium bg-blue-100 text-blue-600">You</span>}
                      </div>
                      <p className="text-[11px] text-gray-400 mt-0.5">Last login: {formatDate(u.last_login)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button onClick={() => handleEdit(u)} className="p-2 text-gray-400 hover:text-[#115997] rounded-lg hover:bg-gray-100" title="Edit">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                    </button>
                    {u.id !== currentUser?.id && (
                      <>
                        <button onClick={() => handleToggleActive(u)} className={'p-2 rounded-lg ' + (u.is_active ? 'text-gray-400 hover:text-amber-600 hover:bg-amber-50' : 'text-gray-400 hover:text-green-600 hover:bg-green-50')} title={u.is_active ? 'Deactivate' : 'Activate'}>
                          {u.is_active
                            ? <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>
                            : <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                        </button>
                        <button onClick={() => handleDelete(u)} className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50" title="Delete">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                      </>
                    )}
                  </div>
                </div>
                {u.role === 'member' && u.permissions && (
                  <div className="flex flex-wrap gap-1 mt-2" style={{ marginLeft: '52px' }}>
                    {PERMISSION_LABELS.filter(p => u.permissions[p.key]).map(p => (
                      <span key={p.key} className="inline-flex px-1.5 py-0.5 rounded text-[9px] font-medium bg-gray-100 text-gray-500">{p.label}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}