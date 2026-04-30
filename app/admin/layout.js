'use client'

import { useState, useEffect, createContext, useContext } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

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
    // Viewport
    const meta = document.querySelector('meta[name="viewport"]')
    if (meta) meta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover')
    else { const m = document.createElement('meta'); m.name = 'viewport'; m.content = 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover'; document.head.appendChild(m) }
    // Font
    if (!document.querySelector('link[href*="DM+Sans"]')) {
      const link = document.createElement('link'); link.rel = 'stylesheet'
      link.href = 'https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800&display=swap'
      document.head.appendChild(link)
    }
  }, [])

  useEffect(() => {
    try { const saved = localStorage.getItem('rsa_admin_user'); if (saved) { const parsed = JSON.parse(saved); setUser(parsed); setIsAuthenticated(true) } }
    catch (e) { localStorage.removeItem('rsa_admin_user') }
    setChecking(false)
  }, [])

  useEffect(() => { setSidebarOpen(false) }, [pathname])

  const handleLogin = async (e) => {
    e.preventDefault(); setLoginError(''); setLoggingIn(true)
    try {
      const r = await fetch('/api/admin/auth', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username, password }) })
      const data = await r.json()
      if (!r.ok) { setLoginError(data.error || 'Login failed'); return }
      setUser(data.user); setIsAuthenticated(true); localStorage.setItem('rsa_admin_user', JSON.stringify(data.user))
    } catch (err) { setLoginError('Connection error') }
    finally { setLoggingIn(false) }
  }

  const handleLogout = () => { setIsAuthenticated(false); setUser(null); localStorage.removeItem('rsa_admin_user') }

  const hasPermission = (key) => { if (!user) return false; if (user.role === 'admin') return true; return user.permissions?.[key] === true }

  // Grouped navigation
  const navGroups = [
    { label: null, items: [
      { href: '/admin', label: 'Dashboard', perm: 'dashboard', icon: <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg> },
    ]},
    { label: 'CRM', items: [
      { href: '/admin/contacts', label: 'Requests', perm: 'contacts', icon: <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg> },
      { href: '/admin/pipeline', label: 'Pipeline', perm: 'pipeline', icon: <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" /></svg> },
      { href: '/admin/prospects', label: 'Contacts', perm: 'prospects', icon: <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg> },
      { href: '/admin/calendar', label: 'Calendar', perm: 'calendar', icon: <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg> },
      { href: '/admin/outreach', label: 'Outreach', perm: 'templates', icon: <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg> },
    ]},
    { label: 'Operations', items: [
      { href: '/admin/schedule', label: 'Schedule', perm: 'timesheets', icon: <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg> },
      { href: '/admin/jobs', label: 'Jobs', perm: 'jobs', icon: <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg> },
      { href: '/admin/timesheets', label: 'Timesheets', perm: 'timesheets', icon: <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
      { href: '/admin/expenses', label: 'Expenses', perm: 'jobs', icon: <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg> },
    ]},
    { label: 'Settings', items: [
      { href: '/admin/templates', label: 'Templates', perm: 'templates', icon: <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg> },
      { href: '/admin/photos', label: 'Photos', perm: 'photos', icon: <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg> },
      { href: '/admin/users', label: 'Users', perm: 'users', icon: <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg> },
    ]},
  ]

  // Filter by permissions
  const filteredGroups = navGroups.map(g => ({
    ...g,
    items: g.items.filter(item => hasPermission(item.perm))
  })).filter(g => g.items.length > 0)

  const isActive = (href) => href === '/admin' ? pathname === '/admin' : pathname.startsWith(href)

  if (checking) return (
    <div className="min-h-screen bg-[#F5F6F8] flex items-center justify-center" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-[#115997] border-t-transparent rounded-full animate-spin" />
      </div>
    </div>
  )

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F5F6F8] flex items-center justify-center p-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 p-6 sm:p-8 max-w-sm w-full border border-gray-100">
          <div className="text-center mb-8">
            <Image src="/images/logo.png" alt="Reliable Solutions Atlanta" width={200} height={62} className="h-12 w-auto mx-auto mb-4" />
            <p className="text-gray-400 text-sm">Sign in to continue</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-gray-400 font-semibold mb-1.5">Username</label>
              <input type="text" value={username} onChange={(e) => { setUsername(e.target.value); setLoginError('') }}
                placeholder="Username" autoFocus autoComplete="username" autoCapitalize="none" style={{ fontSize: '16px' }}
                className="w-full px-4 py-3 bg-[#F5F6F8] border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-300 focus:border-[#115997] focus:bg-white focus:ring-2 focus:ring-[#115997]/10 outline-none transition-all" />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-gray-400 font-semibold mb-1.5">Password</label>
              <input type="password" value={password} onChange={(e) => { setPassword(e.target.value); setLoginError('') }}
                placeholder="••••••••" autoComplete="current-password" style={{ fontSize: '16px' }}
                className="w-full px-4 py-3 bg-[#F5F6F8] border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-300 focus:border-[#115997] focus:bg-white focus:ring-2 focus:ring-[#115997]/10 outline-none transition-all" />
            </div>
            {loginError && <p className="text-red-500 text-sm text-center font-medium">{loginError}</p>}
            <button type="submit" disabled={loggingIn || !username || !password}
              className="w-full py-3.5 bg-[#115997] text-white rounded-xl font-semibold hover:bg-[#0d4a7a] transition-all disabled:opacity-40 shadow-sm shadow-[#115997]/20 active:scale-[0.98]">
              {loggingIn ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
          <p className="text-center text-gray-300 text-xs mt-5">Forgot password? Contact your admin.</p>
          <Link href="/" className="block text-center text-gray-400 hover:text-[#115997] mt-3 text-sm transition-colors">← Back to website</Link>
        </div>
      </div>
    )
  }

  const SidebarContent = ({ mobile = false }) => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center px-5 py-5 flex-shrink-0">
        <Image src="/images/logo.png" alt="Reliable Solutions Atlanta" width={160} height={50} className="h-8 w-auto" />
      </div>

      {/* Nav Groups */}
      <nav className="flex-1 overflow-y-auto px-3 py-1">
        {filteredGroups.map((group, gi) => (
          <div key={gi} className={gi > 0 ? 'mt-4' : ''}>
            {group.label && (
              <p className="px-3 mb-1.5 text-[9px] uppercase tracking-[0.15em] font-bold text-gray-300">{group.label}</p>
            )}
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const active = isActive(item.href)
                return (
                  <Link key={item.href} href={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-150 group relative ${
                      active
                        ? 'bg-[#115997]/[0.07] text-[#115997]'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50/80'
                    }`}>
                    {active && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-[#115997] rounded-r-full" />}
                    <span className={`flex-shrink-0 transition-colors ${active ? 'text-[#115997]' : 'text-gray-400 group-hover:text-gray-500'}`}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="flex-shrink-0 border-t border-gray-100 px-3 py-3 space-y-0.5"
        style={{ paddingBottom: mobile ? 'max(0.75rem, env(safe-area-inset-bottom))' : undefined }}>
        <Link href="/" target="_blank"
          className="flex items-center gap-3 px-3 py-2 rounded-xl text-[13px] text-gray-400 hover:text-[#115997] hover:bg-gray-50/80 transition-all">
          <svg className="w-[18px] h-[18px] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
          <span>View Website</span>
        </Link>
        <div className="flex items-center gap-3 px-3 py-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#115997] flex items-center justify-center flex-shrink-0 shadow-sm shadow-[#115997]/20">
            <span className="text-white font-bold text-xs">{user?.name?.charAt(0)?.toUpperCase()}</span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[13px] font-semibold text-gray-800 truncate">{user?.name}</p>
            <p className="text-[10px] text-gray-400 capitalize">{user?.role}</p>
          </div>
        </div>
        <button onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2 rounded-xl text-[13px] text-gray-400 hover:text-red-500 hover:bg-red-50/80 transition-all w-full">
          <svg className="w-[18px] h-[18px] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  )

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, hasPermission }}>
      <div className="min-h-screen bg-[#F5F6F8] flex desktop-zoom" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex flex-col fixed inset-y-0 left-0 z-30 bg-white border-r border-gray-200/80 w-[220px]">
          <SidebarContent />
        </aside>

        {/* Mobile Header */}
        <header className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200/80">
          <div className="px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button onClick={() => setSidebarOpen(true)} className="text-gray-500 hover:text-gray-700 p-1 -ml-1">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
              </button>
              <Image src="/images/logo.png" alt="RSA" width={120} height={38} className="h-7 w-auto" />
            </div>
            <div className="w-8 h-8 rounded-lg bg-[#115997] flex items-center justify-center shadow-sm shadow-[#115997]/20">
              <span className="text-white font-bold text-xs">{user?.name?.charAt(0)?.toUpperCase()}</span>
            </div>
          </div>
        </header>

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden" onClick={() => setSidebarOpen(false)}>
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
            <div className="absolute inset-y-0 left-0 w-[260px] bg-white shadow-2xl animate-[slideIn_0.2s_ease-out]" onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setSidebarOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1 z-10">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
              <SidebarContent mobile />
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 lg:ml-[220px] mt-[56px] lg:mt-0 min-h-screen">
          <div className="max-w-[1400px] mx-auto">
            {children}
          </div>
        </main>
      </div>
      <style jsx global>{`
        @keyframes slideIn {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (min-width: 1024px) {
          .desktop-zoom { zoom: 0.8; }
        }
        /* Scrollbar */
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </AuthContext.Provider>
  )
}