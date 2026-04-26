'use client'

import { useState, useEffect, createContext, useContext, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const TimeAuthContext = createContext({ isAuthenticated: false, user: null, refreshUser: () => {} })
export const useTimeAuth = () => useContext(TimeAuthContext)

export default function TimeLayout({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [checking, setChecking] = useState(true)
  const pathname = usePathname()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [loggingIn, setLoggingIn] = useState(false)

  useEffect(() => {
    const meta = document.querySelector('meta[name="viewport"]')
    if (meta) meta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover')
  }, [])

  useEffect(() => {
    try {
      const saved = localStorage.getItem('rsa_crew_user')
      if (saved) { const parsed = JSON.parse(saved); setUser(parsed); setIsAuthenticated(true) }
    } catch (e) { localStorage.removeItem('rsa_crew_user') }
    setChecking(false)
  }, [])

  const refreshUser = useCallback(async () => {
    try {
      const saved = localStorage.getItem('rsa_crew_user')
      if (saved) {
        const parsed = JSON.parse(saved)
        const r = await fetch('/api/time/auth', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user_id: parsed.id })
        })
        if (r.ok) {
          const data = await r.json()
          setUser(data.user)
          localStorage.setItem('rsa_crew_user', JSON.stringify(data.user))
        }
      }
    } catch (e) {}
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoginError(''); setLoggingIn(true)
    try {
      const r = await fetch('/api/time/auth', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })
      const data = await r.json()
      if (!r.ok) { setLoginError(data.error || 'Login failed'); return }
      setUser(data.user); setIsAuthenticated(true)
      localStorage.setItem('rsa_crew_user', JSON.stringify(data.user))
    } catch (err) { setLoginError('Connection error') }
    finally { setLoggingIn(false) }
  }

  const handleLogout = () => {
    setIsAuthenticated(false); setUser(null)
    localStorage.removeItem('rsa_crew_user')
  }

  const navItems = [
    { href: '/time', label: 'Clock', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', exact: true },
    { href: '/time/schedule', label: 'Schedule', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { href: '/time/history', label: 'Hours', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01' },
    { href: '/time/profile', label: 'Profile', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
  ]

  const isActive = (item) => item.exact ? pathname === item.href : pathname.startsWith(item.href)

  // Allow reset password page to render without auth
  const isPublicPage = pathname === '/time/reset-password' || pathname === '/time/signup'

  if (checking) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-[#115997] border-t-transparent rounded-full animate-spin" />
    </div>
  )

  if (!isAuthenticated && !isPublicPage) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'linear-gradient(135deg, #0a3d6b 0%, #115997 40%, #2692cc 100%)' }}>
        <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 max-w-sm w-full">
          <div className="text-center mb-6">
            <Image src="/images/logo.png" alt="Reliable Solutions Atlanta" width={200} height={62} className="h-12 w-auto mx-auto mb-3" />
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-gray-400 mb-1.5 font-semibold">Username</label>
              <input type="text" value={username} onChange={(e) => { setUsername(e.target.value); setLoginError('') }}
                placeholder="Your username" autoFocus autoComplete="username" autoCapitalize="none" style={{ fontSize: '16px' }}
                className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-300 focus:border-[#115997] focus:bg-white outline-none transition-all" />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-gray-400 mb-1.5 font-semibold">Password</label>
              <input type="password" value={password} onChange={(e) => { setPassword(e.target.value); setLoginError('') }}
                placeholder="••••••••" autoComplete="current-password" style={{ fontSize: '16px' }}
                className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-300 focus:border-[#115997] focus:bg-white outline-none transition-all" />
            </div>
            {loginError && <p className="text-red-500 text-sm text-center bg-red-50 rounded-lg py-2">{loginError}</p>}
            <button type="submit" disabled={loggingIn || !username || !password}
              className="w-full py-3.5 bg-[#115997] text-white rounded-xl font-bold hover:bg-[#273373] transition-colors disabled:opacity-40 text-sm">
              {loggingIn ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
          <Link href="/time/reset-password" className="block text-center text-gray-400 hover:text-[#115997] mt-4 text-sm transition-colors">
            Forgot password?
          </Link>
          <Link href="/time/signup" className="block text-center text-[#115997] hover:text-[#273373] mt-2 text-sm font-semibold transition-colors">
            New here? Create an account
          </Link>
        </div>
      </div>
    )
  }

  // Reset password page gets a minimal shell (no bottom nav, no auth required)
  if (isPublicPage) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'linear-gradient(135deg, #0a3d6b 0%, #115997 40%, #2692cc 100%)' }}>
        {children}
      </div>
    )
  }

  return (
    <TimeAuthContext.Provider value={{ isAuthenticated, user, refreshUser }}>
      <div className="min-h-screen bg-[#F3F4F6] flex flex-col">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between flex-shrink-0 sticky top-0 z-40">
          <div className="flex items-center gap-3">
            <Image src="/images/logo.png" alt="RSA" width={110} height={34} className="h-7 w-auto" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 hidden sm:block">{user?.name}</span>
            <button onClick={handleLogout} className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors" title="Sign Out">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 pb-20 overflow-y-auto">
          <div className="max-w-lg mx-auto">
            {children}
          </div>
        </main>

        {/* Bottom Tab Bar */}
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40"
          style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
          <div className="max-w-lg mx-auto flex items-center justify-around px-2 py-1.5">
            {navItems.map((item) => {
              const active = isActive(item)
              return (
                <Link key={item.href} href={item.href}
                  className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-colors min-w-[56px] ${
                    active ? 'text-[#115997]' : 'text-gray-400'
                  }`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={active ? 2 : 1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                  </svg>
                  <span className={`text-[10px] font-medium ${active ? 'text-[#115997]' : 'text-gray-400'}`}>{item.label}</span>
                </Link>
              )
            })}
          </div>
        </nav>
      </div>
    </TimeAuthContext.Provider>
  )
}