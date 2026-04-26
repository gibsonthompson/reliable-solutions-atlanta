'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function SignupPage() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  // Auto-suggest username from name
  const handleNameChange = (val) => {
    setName(val)
    setError('')
    // Only auto-fill if user hasn't manually typed a username
    if (!username || username === suggestUsername(name)) {
      setUsername(suggestUsername(val))
    }
  }

  const suggestUsername = (n) => {
    return n.trim().toLowerCase().replace(/[^a-z0-9 ]/g, '').replace(/\s+/g, '.').slice(0, 20)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name.trim()) { setError('Name is required'); return }
    if (!phone.trim()) { setError('Phone number is required'); return }
    if (!username.trim()) { setError('Username is required'); return }
    if (!password || password.length < 4) { setError('Password must be at least 4 characters'); return }
    setLoading(true); setError('')
    try {
      const r = await fetch('/api/time/signup', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          username: username.trim().toLowerCase(),
          password,
        })
      })
      const data = await r.json()
      if (!r.ok) { setError(data.error || 'Signup failed'); return }
      setDone(true)
    } catch (e) { setError('Connection error') }
    finally { setLoading(false) }
  }

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 max-w-sm w-full">
      <div className="text-center mb-6">
        <Image src="/images/logo.png" alt="Reliable Solutions Atlanta" width={200} height={62} className="h-12 w-auto mx-auto mb-3" />
        {!done && <p className="text-sm text-gray-500">Create your account to get started</p>}
      </div>

      {done ? (
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          </div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">You{"'"}re all set!</h2>
          <p className="text-sm text-gray-500 mb-6">Your account has been created. Sign in to start clocking in.</p>
          <Link href="/time" className="block w-full py-3.5 bg-[#115997] text-white rounded-xl font-bold hover:bg-[#273373] transition-colors text-sm text-center">
            Sign In
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] uppercase tracking-wider text-gray-400 mb-1.5 font-semibold">Full Name</label>
            <input type="text" value={name} onChange={(e) => handleNameChange(e.target.value)}
              placeholder="First and last name" autoFocus autoComplete="name" style={{ fontSize: '16px' }}
              className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-300 focus:border-[#115997] focus:bg-white outline-none transition-all" />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-wider text-gray-400 mb-1.5 font-semibold">Phone Number</label>
            <input type="tel" value={phone} onChange={(e) => { setPhone(e.target.value); setError('') }}
              placeholder="(770) 000-0000" autoComplete="tel" style={{ fontSize: '16px' }}
              className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-300 focus:border-[#115997] focus:bg-white outline-none transition-all" />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-wider text-gray-400 mb-1.5 font-semibold">Username</label>
            <input type="text" value={username} onChange={(e) => { setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9._-]/g, '')); setError('') }}
              placeholder="Choose a username" autoCapitalize="none" autoComplete="username" style={{ fontSize: '16px' }}
              className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-300 focus:border-[#115997] focus:bg-white outline-none transition-all" />
            <p className="text-[11px] text-gray-300 mt-1">This is what you{"'"}ll use to sign in</p>
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-wider text-gray-400 mb-1.5 font-semibold">Password</label>
            <input type="password" value={password} onChange={(e) => { setPassword(e.target.value); setError('') }}
              placeholder="At least 4 characters" autoComplete="new-password" style={{ fontSize: '16px' }}
              className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-300 focus:border-[#115997] focus:bg-white outline-none transition-all" />
          </div>
          {error && <p className="text-red-500 text-sm text-center bg-red-50 rounded-lg py-2">{error}</p>}
          <button type="submit" disabled={loading || !name || !phone || !username || !password}
            className="w-full py-3.5 bg-[#115997] text-white rounded-xl font-bold hover:bg-[#273373] transition-colors disabled:opacity-40 text-sm">
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>
      )}

      {!done && (
        <Link href="/time" className="block text-center text-gray-400 hover:text-[#115997] mt-4 text-sm transition-colors">
          Already have an account? Sign in
        </Link>
      )}
    </div>
  )
}