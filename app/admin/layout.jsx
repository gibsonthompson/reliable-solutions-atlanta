'use client'

import { useState, useEffect, createContext, useContext } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const ADMIN_PIN = '2026'

const AuthContext = createContext({ isAuthenticated: false })
export const useAdminAuth = () => useContext(AuthContext)

export default function AdminLayout({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [pinInput, setPinInput] = useState('')
  const [pinError, setPinError] = useState(false)
  const [checking, setChecking] = useState(true)
  const pathname = usePathname()

  useEffect(() => {
    const saved = sessionStorage.getItem('rsa_admin_auth')
    if (saved === 'true') setIsAuthenticated(true)
    setChecking(false)
  }, [])

  const handlePinSubmit = (e) => {
    e.preventDefault()
    if (pinInput === ADMIN_PIN) {
      setIsAuthenticated(true)
      sessionStorage.setItem('rsa_admin_auth', 'true')
      setPinError(false)
    } else {
      setPinError(true)
      setPinInput('')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    sessionStorage.removeItem('rsa_admin_auth')
  }

  if (checking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#115997] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  // PIN Entry
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 max-w-sm w-full">
          <div className="text-center mb-6 sm:mb-8">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#273373] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#273373]">RSA Admin</h1>
            <p className="text-gray-500 mt-1 text-sm">Enter PIN to continue</p>
          </div>
          <form onSubmit={handlePinSubmit}>
            <input
              type="password"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={4}
              value={pinInput}
              onChange={(e) => { setPinInput(e.target.value.replace(/\D/g, '')); setPinError(false) }}
              className={'w-full text-center text-2xl sm:text-3xl tracking-[0.5em] py-4 border-2 rounded-xl outline-none transition-colors ' +
                (pinError ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-[#115997]')}
              placeholder="••••"
              autoFocus
            />
            {pinError && <p className="text-red-500 text-sm text-center mt-2">Incorrect PIN</p>}
            <button type="submit" className="w-full mt-6 py-4 bg-[#115997] text-white rounded-xl font-semibold hover:bg-[#273373] transition-colors active:scale-[0.98]">
              Unlock
            </button>
          </form>
          <Link href="/" className="block text-center text-gray-500 hover:text-[#115997] mt-6 text-sm">
            ← Back to website
          </Link>
        </div>
      </div>
    )
  }

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { href: '/admin/contacts', label: 'Contacts', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
    { href: '/admin/templates', label: 'Templates', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
  ]

  const isActive = (href) => {
    if (href === '/admin') return pathname === '/admin'
    return pathname.startsWith(href)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      <div className="min-h-screen bg-gray-50 pb-20 sm:pb-6">
        {/* Desktop Header */}
        <header className="bg-white shadow-sm sticky top-0 z-40 hidden sm:block">
          <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-8">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-[#273373]">RSA Admin</h1>
                  <p className="text-gray-500 text-xs sm:text-sm">Reliable Solutions Atlanta</p>
                </div>
                <nav className="flex items-center gap-1">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ' +
                        (isActive(item.href)
                          ? 'bg-[#115997]/10 text-[#115997]'
                          : 'text-gray-600 hover:bg-gray-100')}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                      </svg>
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </div>
              <div className="flex items-center gap-3">
                <Link href="/" className="text-gray-500 hover:text-[#115997] text-sm font-medium flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Site
                </Link>
                <button onClick={handleLogout} className="text-gray-500 hover:text-red-600 text-sm font-medium flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Mobile Header */}
        <header className="bg-white shadow-sm sticky top-0 z-40 sm:hidden">
          <div className="px-4 py-3 flex items-center justify-between">
            <h1 className="text-lg font-bold text-[#273373]">RSA Admin</h1>
            <button onClick={handleLogout} className="text-gray-400 p-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="max-w-7xl mx-auto">
          {children}
        </main>

        {/* Mobile Bottom Nav */}
        <nav className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 safe-area-bottom">
          <div className="flex items-center justify-around py-2" style={{ paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))' }}>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={'flex flex-col items-center gap-1 px-3 py-1.5 rounded-lg transition-colors ' +
                  (isActive(item.href) ? 'text-[#115997]' : 'text-gray-400')}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                </svg>
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </AuthContext.Provider>
  )
}