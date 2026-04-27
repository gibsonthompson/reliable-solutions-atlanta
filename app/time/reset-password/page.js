'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function ResetPasswordPage() {
  const [step, setStep] = useState(1) // 1 = verify, 2 = new password, 3 = done
  const [username, setUsername] = useState('')
  const [phone, setPhone] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [userId, setUserId] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleVerify = async (e) => {
    e.preventDefault()
    if (!username.trim() || !phone.trim()) { setError('Both fields are required'); return }
    setLoading(true); setError('')
    try {
      const r = await fetch('/api/time/reset-password', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ step: 'verify', username: username.trim().toLowerCase(), phone: phone.trim() })
      })
      const data = await r.json()
      if (!r.ok) { setError(data.error || 'Verification failed'); return }
      setUserId(data.user_id)
      setStep(2)
    } catch (e) { setError('Connection error') }
    finally { setLoading(false) }
  }

  const handleReset = async (e) => {
    e.preventDefault()
    if (!newPassword || !confirmPassword) { setError('Both fields are required'); return }
    if (newPassword.length < 4) { setError('Password must be at least 4 characters'); return }
    if (newPassword !== confirmPassword) { setError('Passwords do not match'); return }
    setLoading(true); setError('')
    try {
      const r = await fetch('/api/time/reset-password', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ step: 'reset', user_id: userId, new_password: newPassword })
      })
      const data = await r.json()
      if (!r.ok) { setError(data.error || 'Reset failed'); return }
      setStep(3)
    } catch (e) { setError('Connection error') }
    finally { setLoading(false) }
  }

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 max-w-sm w-full">
      <div className="text-center mb-6">
        <Image src="/images/logo.png" alt="Reliable Solutions Atlanta" width={200} height={62} className="h-12 w-auto mx-auto mb-3" />
        <h2 className="text-lg font-bold text-gray-900">
          {step === 1 ? 'Reset Password' : step === 2 ? 'Set New Password' : 'All Set'}
        </h2>
        {step === 1 && <p className="text-sm text-gray-400 mt-1">Verify your identity to continue</p>}
      </div>

      {step === 1 && (
        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <label className="block text-[10px] uppercase tracking-wider text-gray-400 mb-1.5 font-semibold">Username</label>
            <input type="text" value={username} onChange={(e) => { setUsername(e.target.value); setError('') }}
              placeholder="Your username" autoFocus autoCapitalize="none" style={{ fontSize: '16px' }}
              className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-300 focus:border-[#115997] focus:bg-white outline-none transition-all" />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-wider text-gray-400 mb-1.5 font-semibold">Phone Number</label>
            <input type="tel" value={phone} onChange={(e) => { setPhone(e.target.value); setError('') }}
              placeholder="The phone number on your account" style={{ fontSize: '16px' }}
              className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-300 focus:border-[#115997] focus:bg-white outline-none transition-all" />
          </div>
          {error && <p className="text-red-500 text-sm text-center bg-red-50 rounded-lg py-2">{error}</p>}
          <button type="submit" disabled={loading || !username || !phone}
            className="w-full py-3.5 bg-[#115997] text-white rounded-xl font-bold hover:bg-[#273373] transition-colors disabled:opacity-40 text-sm">
            {loading ? 'Verifying...' : 'Continue'}
          </button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleReset} className="space-y-4">
          <div>
            <label className="block text-[10px] uppercase tracking-wider text-gray-400 mb-1.5 font-semibold">New Password</label>
            <input type="password" value={newPassword} onChange={(e) => { setNewPassword(e.target.value); setError('') }}
              placeholder="Min 4 characters" autoFocus style={{ fontSize: '16px' }}
              className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-300 focus:border-[#115997] focus:bg-white outline-none transition-all" />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-wider text-gray-400 mb-1.5 font-semibold">Confirm Password</label>
            <input type="password" value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value); setError('') }}
              placeholder="Type it again" style={{ fontSize: '16px' }}
              className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-300 focus:border-[#115997] focus:bg-white outline-none transition-all" />
          </div>
          {error && <p className="text-red-500 text-sm text-center bg-red-50 rounded-lg py-2">{error}</p>}
          <button type="submit" disabled={loading || !newPassword || !confirmPassword}
            className="w-full py-3.5 bg-[#115997] text-white rounded-xl font-bold hover:bg-[#273373] transition-colors disabled:opacity-40 text-sm">
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      )}

      {step === 3 && (
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          </div>
          <p className="text-sm text-gray-600 mb-4">Your password has been reset. You can now sign in with your new password.</p>
          <Link href="/time" className="block w-full py-3.5 bg-[#115997] text-white rounded-xl font-bold hover:bg-[#273373] transition-colors text-sm text-center">
            Sign In
          </Link>
        </div>
      )}

      {step !== 3 && (
        <Link href="/time" className="block text-center text-gray-400 hover:text-[#115997] mt-4 text-sm transition-colors">
          Back to sign in
        </Link>
      )}
    </div>
  )
}