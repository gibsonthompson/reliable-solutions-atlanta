'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useAdminAuth } from '../layout'

export default function SettingsPage() {
  const { hasPermission } = useAdminAuth()
  const [notifStats, setNotifStats] = useState({ total: 0, enabled: 0 })

  useEffect(() => { fetchNotifStats() }, [])
  const fetchNotifStats = async () => {
    try {
      const r = await fetch('/api/admin/notification-recipients')
      const d = await r.json()
      const list = d.recipients || []
      setNotifStats({ total: list.length, enabled: list.filter(x => x.enabled).length })
    } catch (e) {}
  }

  if (!hasPermission('users')) return <div className="px-4 py-16 text-center"><p className="text-gray-400 font-medium">You don{"'"}t have permission to access settings</p></div>

  const cards = [
    {
      href: '/admin/settings/notifications',
      label: 'Notifications',
      desc: 'Manage who receives SMS alerts for new leads and bookings',
      meta: notifStats.total > 0 ? `${notifStats.enabled} active of ${notifStats.total}` : 'No recipients yet',
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />,
    },
  ]

  return (
    <div className="px-4 py-5 sm:py-8">
      <div className="mb-5 animate-[fadeUp_0.3s_ease-out]">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">Settings</h2>
        <p className="text-gray-400 text-sm mt-0.5">System configuration and integrations</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 animate-[fadeUp_0.4s_ease-out]">
        {cards.map(card => (
          <Link key={card.href} href={card.href}
            className="group bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all border border-gray-100 hover:border-[#115997]/20">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#115997]/[0.08] flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-[#115997]" fill="none" stroke="currentColor" viewBox="0 0 24 24">{card.icon}</svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-semibold text-gray-900 text-sm">{card.label}</p>
                  <svg className="w-4 h-4 text-gray-300 group-hover:text-[#115997] group-hover:translate-x-0.5 transition-all flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </div>
                <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{card.desc}</p>
                {card.meta && <p className="text-[11px] text-[#115997] font-medium mt-2">{card.meta}</p>}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}