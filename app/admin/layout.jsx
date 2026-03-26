'use client'

import { useState, useEffect, createContext, useContext } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import Head from 'next/head'

const AuthContext = createContext({ isAuthenticated: false, user: null, hasPermission: () => false })
export const useAdminAuth = () => useContext(AuthContext)

export default function AdminLayout({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [checking, setChecking] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [loggingIn, setLoggingIn] = useState(false)

  useEffect(() => {
    // Prevent zoom on iOS inputs
    const meta = document.querySelector('meta[name="viewport"]')
    if (meta) meta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover')
    else {
      const m = document.createElement('meta')
      m.name = 'viewport'
      m.content = 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover'
      document.head.appendChild(m)
    }
  }, [])

  useEffect(() => {
    try {
      const saved = localStorage.getItem('rsa_admin_user')
      if (saved) { const parsed = JSON.parse(saved); setUser(parsed); setIsAuthenticated(true) }
    } catch (e) { localStorage.removeItem('rsa_admin_user') }
    setChecking(false)
  }, [])

  useEffect(() => { setSidebarOpen(false) }, [pathname])

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoginError(''); setLoggingIn(true)
    try {
      const r = await fetch('/api/admin/auth', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })
      const data = await r.json()
      if (!r.ok) { setLoginError(data.error || 'Login failed'); return }
      setUser(data.user); setIsAuthenticated(true)
      localStorage.setItem('rsa_admin_user', JSON.stringify(data.user))
    } catch (err) { setLoginError('Connection error') }
    finally { setLoggingIn(false) }
  }

  const handleLogout = () => {
    setIsAuthenticated(false); setUser(null)
    localStorage.removeItem('rsa_admin_user')
  }

  const hasPermission = (key) => {
    if (!user) return false
    if (user.role === 'admin') return true
    return user.permissions?.[key] === true
  }

  const allNavItems = [
    { href: '/admin', label: 'Dashboard', perm: 'dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { href: '/admin/contacts', label: 'Requests', perm: 'contacts', icon: 'M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4' },
    { href: '/admin/prospects', label: 'Leads', perm: 'prospects', icon: 'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z' },
    { href: '/admin/pipeline', label: 'Pipeline', perm: 'pipeline', icon: 'M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2' },
    { href: '/admin/calendar', label: 'Calendar', perm: 'calendar', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { href: '/admin/jobs', label: 'Jobs', perm: 'contacts', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
    { href: '/admin/templates', label: 'Templates', perm: 'templates', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
    { href: '/admin/users', label: 'Users', perm: 'users', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
  ]

  const navItems = allNavItems.filter(item => hasPermission(item.perm))
  const isActive = (href) => href === '/admin' ? pathname === '/admin' : pathname.startsWith(href)

  if (checking) return <div className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="w-10 h-10 border-4 border-[#115997] border-t-transparent rounded-full animate-spin" /></div>

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 max-w-sm w-full">
          <div className="text-center mb-6 sm:mb-8">
            <Image src="/images/logo.png" alt="Reliable Solutions Atlanta" width={200} height={62} className="h-12 w-auto mx-auto mb-4" />
            <p className="text-gray-500 mt-1 text-sm">Sign in to continue</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1.5">Username</label>
              <input type="text" value={username} onChange={(e) => { setUsername(e.target.value); setLoginError('') }}
                placeholder="Username" autoFocus autoComplete="username" autoCapitalize="none"
                style={{ fontSize: '16px' }}
                className="w-full px-3 py-3 border-2 border-gray-200 rounded-xl text-sm focus:border-[#115997] outline-none transition-colors" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1.5">Password</label>
              <input type="password" value={password} onChange={(e) => { setPassword(e.target.value); setLoginError('') }}
                placeholder="••••••••" autoComplete="current-password"
                style={{ fontSize: '16px' }}
                className="w-full px-3 py-3 border-2 border-gray-200 rounded-xl text-sm focus:border-[#115997] outline-none transition-colors" />
            </div>
            {loginError && <p className="text-red-500 text-sm text-center">{loginError}</p>}
            <button type="submit" disabled={loggingIn || !username || !password}
              className="w-full py-3.5 bg-[#115997] text-white rounded-xl font-semibold hover:bg-[#273373] transition-colors disabled:opacity-50">
              {loggingIn ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
          <p className="text-center text-gray-400 text-xs mt-4">Forgot password? Contact your admin.</p>
          <Link href="/" className="block text-center text-gray-500 hover:text-[#115997] mt-4 text-sm">Back to website</Link>
        </div>
      </div>
    )
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, hasPermission }}>
      <div className="min-h-screen bg-gray-50">

        {/* Desktop Header */}
        <header className="bg-white shadow-sm sticky top-0 z-40 hidden sm:block">
          <div className="max-w-[1600px] mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-8">
                <Link href="/admin" className="flex-shrink-0"><Image src="/images/logo.png" alt="RSA" width={160} height={50} className="h-10 w-auto" /></Link>
                <nav className="flex items-center gap-1">
                  {navItems.map((item) => (
                    <Link key={item.href} href={item.href}
                      className={'flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ' +
                        (isActive(item.href) ? 'bg-[#115997]/10 text-[#115997]' : 'text-gray-600 hover:bg-gray-100')}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} /></svg>
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right hidden lg:block">
                  <p className="text-sm font-medium text-gray-800">{user?.name}</p>
                  <p className="text-[10px] text-gray-400 capitalize">{user?.role}</p>
                </div>
                <Link href="/" className="text-gray-400 hover:text-[#115997] p-1.5" title="View site">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                </Link>
                <button onClick={handleLogout} className="text-gray-400 hover:text-red-600 p-1.5" title="Logout">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Mobile Header — hamburger on right */}
        <header className="bg-white shadow-sm sticky top-0 z-40 sm:hidden">
          <div className="px-4 py-3 flex items-center justify-between">
            <Link href="/admin"><Image src="/images/logo.png" alt="RSA" width={120} height={38} className="h-8 w-auto" /></Link>
            <button onClick={() => setSidebarOpen(true)} className="text-gray-600 p-1 -mr-1">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
          </div>
        </header>

        {/* Mobile Sidebar — slides from left */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 sm:hidden" onClick={() => setSidebarOpen(false)}>
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute inset-y-0 left-0 w-72 bg-white shadow-xl flex flex-col" onClick={(e) => e.stopPropagation()}>
              <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                <Image src="/images/logo.png" alt="RSA" width={140} height={44} className="h-9 w-auto" />
                <button onClick={() => setSidebarOpen(false)} className="text-gray-400 p-1">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              <div className="px-5 py-3 bg-gray-50 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#115997] flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">{user?.name?.charAt(0)?.toUpperCase()}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-800 truncate">{user?.name}</p>
                    <p className="text-[11px] text-gray-400 capitalize">{user?.role}</p>
                  </div>
                </div>
              </div>
              <nav className="flex-1 overflow-y-auto py-2 px-3">
                {navItems.map((item) => (
                  <Link key={item.href} href={item.href}
                    className={'flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors mb-0.5 ' +
                      (isActive(item.href) ? 'bg-[#115997]/10 text-[#115997]' : 'text-gray-600 active:bg-gray-100')}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} /></svg>
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="border-t border-gray-100 p-3 space-y-1" style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}>
                <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-500 active:bg-gray-100">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                  View Website
                </Link>
                <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-500 active:bg-red-50 w-full text-left">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        )}

        <main className="max-w-[1600px] mx-auto pb-6">{children}</main>
      </div>
    </AuthContext.Provider>
  )
}