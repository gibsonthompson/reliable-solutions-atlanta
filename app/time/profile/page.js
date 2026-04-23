'use client'

import { useState } from 'react'
import { useTimeAuth } from '../layout'

export default function ProfilePage() {
  const { user } = useTimeAuth()
  const [currentPw, setCurrentPw] = useState('')
  const [newPw, setNewPw] = useState('')
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')
  const [err, setErr] = useState('')

  const handleChangePw = async () => {
    if (!currentPw || !newPw) { setErr('Both fields required'); return }
    if (newPw.length < 4) { setErr('New password must be at least 4 characters'); return }
    setSaving(true); setErr(''); setMsg('')
    try {
      const r = await fetch('/api/time/auth', {
        method: 'PATCH', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: user.id, current_password: currentPw, new_password: newPw })
      })
      const data = await r.json()
      if (!r.ok) { setErr(data.error || 'Failed'); return }
      setMsg('Password updated'); setCurrentPw(''); setNewPw('')
      setTimeout(() => setMsg(''), 3000)
    } catch (e) { setErr('Connection error') }
    finally { setSaving(false) }
  }

  if (!user) return null

  return (
    <div className="px-4 py-6">
      {/* Profile Card */}
      <div className="bg-white rounded-xl shadow-sm p-5 mb-4">
        <div className="flex items-center gap-4 mb-5">
          <div className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: user.color || '#115997' }}>
            <span className="text-white font-bold text-2xl">{user.name?.charAt(0)?.toUpperCase()}</span>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">{user.name}</h2>
            <p className="text-sm text-gray-500">@{user.username}</p>
            <span className={`inline-flex mt-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${
              user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600'
            }`}>{user.role}</span>
          </div>
        </div>

        <div className="space-y-3">
          {user.phone && (
            <div className="flex items-center gap-3">
              <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <a href={`tel:${user.phone}`} className="text-sm text-[#115997] font-medium">{user.phone}</a>
            </div>
          )}
          {user.email && (
            <div className="flex items-center gap-3">
              <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-sm text-gray-700">{user.email}</span>
            </div>
          )}
          {user.hire_date && (
            <div className="flex items-center gap-3">
              <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-sm text-gray-700">Hired {new Date(user.hire_date + 'T00:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            </div>
          )}
        </div>
      </div>

      {/* Change Password */}
      <div className="bg-white rounded-xl shadow-sm p-5">
        <h3 className="font-semibold text-gray-900 text-sm mb-4">Change password</h3>
        {msg && <div className="mb-3 rounded-lg p-2.5 text-sm bg-green-50 border border-green-200 text-green-700">{msg}</div>}
        {err && <div className="mb-3 rounded-lg p-2.5 text-sm bg-red-50 border border-red-200 text-red-700">{err}</div>}
        <div className="space-y-3">
          <div>
            <label className="block text-xs text-gray-500 mb-1">Current password</label>
            <input type="password" value={currentPw} onChange={(e) => { setCurrentPw(e.target.value); setErr('') }}
              style={{ fontSize: '16px' }} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#115997] outline-none" />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">New password</label>
            <input type="password" value={newPw} onChange={(e) => { setNewPw(e.target.value); setErr('') }}
              placeholder="Min 4 characters" style={{ fontSize: '16px' }} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#115997] outline-none" />
          </div>
          <button onClick={handleChangePw} disabled={saving || !currentPw || !newPw}
            className="w-full py-2.5 bg-[#115997] text-white rounded-lg font-semibold text-sm hover:bg-[#273373] disabled:opacity-40">
            {saving ? 'Updating...' : 'Update Password'}
          </button>
        </div>
      </div>
    </div>
  )
}