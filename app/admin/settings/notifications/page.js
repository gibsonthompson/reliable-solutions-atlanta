'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAdminAuth } from '../../layout'

const NOTIFICATION_TYPES = [
  { key: 'new_lead', label: 'New Lead', desc: 'Alert when a new request comes in' },
  { key: 'booked', label: 'Estimate Booked', desc: 'Alert when a lead schedules an estimate' },
]

function formatPhoneDisplay(phone) {
  if (!phone) return ''
  const digits = phone.replace(/\D/g, '')
  if (digits.length === 10) return `(${digits.slice(0,3)}) ${digits.slice(3,6)}-${digits.slice(6)}`
  if (digits.length === 11 && digits[0] === '1') return `(${digits.slice(1,4)}) ${digits.slice(4,7)}-${digits.slice(7)}`
  return phone
}

const EMPTY_FORM = { name: '', phone: '', email: '', notification_types: ['new_lead', 'booked'] }

export default function NotificationsPage() {
  const { hasPermission } = useAdminAuth()
  const [recipients, setRecipients] = useState([])
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState(null) // null | 'new' | recipient.id
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')
  const [error, setError] = useState('')
  const [formData, setFormData] = useState(EMPTY_FORM)

  useEffect(() => { fetchRecipients() }, [])
  const fetchRecipients = async () => {
    try {
      const r = await fetch('/api/admin/notification-recipients')
      const d = await r.json()
      if (d.recipients) setRecipients(d.recipients)
    } catch (e) {}
    finally { setLoading(false) }
  }

  const flash = (msg) => { setSuccessMsg(msg); setTimeout(() => setSuccessMsg(''), 2000) }

  const openNew = () => {
    setExpanded('new'); setError('')
    setFormData(EMPTY_FORM)
  }

  const openRow = (r) => {
    if (expanded === r.id) { setExpanded(null); setError(''); return }
    setExpanded(r.id); setError('')
    setFormData({
      name: r.name || '',
      phone: formatPhoneDisplay(r.phone),
      email: r.email || '',
      notification_types: Array.isArray(r.notification_types) ? r.notification_types : ['new_lead', 'booked'],
    })
  }

  const closeForm = () => { setExpanded(null); setError('') }

  const handleSave = async () => {
    if (!formData.name.trim()) { setError('Name is required'); return }
    if (!formData.phone.trim()) { setError('Phone number is required'); return }
    if (formData.notification_types.length === 0) { setError('Select at least one notification type'); return }
    setSaving(true); setError('')
    try {
      const isNew = expanded === 'new'
      const payload = {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim() || null,
        notification_types: formData.notification_types,
      }
      if (!isNew) payload.id = expanded
      const r = await fetch('/api/admin/notification-recipients', {
        method: isNew ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const d = await r.json()
      if (!r.ok) { setError(d.error || 'Failed to save'); return }
      flash(isNew ? 'Recipient added' : 'Recipient updated')
      setExpanded(null); fetchRecipients()
    } catch (e) { setError('Failed to save') }
    finally { setSaving(false) }
  }

  const handleToggle = async (r, e) => {
    e.stopPropagation()
    const next = !r.enabled
    setRecipients(prev => prev.map(x => x.id === r.id ? { ...x, enabled: next } : x))
    try {
      const res = await fetch('/api/admin/notification-recipients', {
        method: 'PUT', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: r.id, enabled: next }),
      })
      if (!res.ok) { setRecipients(prev => prev.map(x => x.id === r.id ? { ...x, enabled: r.enabled } : x)); return }
      flash(next ? `${r.name} enabled` : `${r.name} disabled`)
    } catch (err) {
      setRecipients(prev => prev.map(x => x.id === r.id ? { ...x, enabled: r.enabled } : x))
    }
  }

  const handleDelete = async () => {
    const r = recipients.find(x => x.id === expanded)
    if (!r) return
    if (!confirm(`Delete ${r.name}? They will no longer receive any notifications.`)) return
    setDeleting(true)
    try {
      const res = await fetch('/api/admin/notification-recipients', {
        method: 'DELETE', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: r.id }),
      })
      if (!res.ok) return
      setRecipients(prev => prev.filter(x => x.id !== r.id))
      setExpanded(null); flash('Recipient deleted')
    } catch (err) {}
    finally { setDeleting(false) }
  }

  const toggleType = (key) => setFormData(p => ({
    ...p,
    notification_types: p.notification_types.includes(key)
      ? p.notification_types.filter(t => t !== key)
      : [...p.notification_types, key]
  }))

  if (!hasPermission('users')) return <div className="px-4 py-16 text-center"><p className="text-gray-400 font-medium">You don{"'"}t have permission to manage notifications</p></div>
  if (loading) return <div className="flex items-center justify-center min-h-[50vh]"><div className="flex flex-col items-center gap-3"><div className="w-10 h-10 border-4 border-[#115997] border-t-transparent rounded-full animate-spin" /><p className="text-sm text-gray-400 animate-pulse">Loading recipients...</p></div></div>

  const FormBody = ({ isNew }) => (
    <div className="space-y-4">
      {error && <div className="rounded-xl p-3 text-sm bg-red-50 border border-red-200 text-red-700">{error}</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-1.5">Name *</label>
          <input type="text" value={formData.name} onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))} placeholder="Gibson, Field Manager, etc." style={{ fontSize: '16px' }} className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#115997]/20 outline-none transition-all" />
        </div>
        <div>
          <label className="block text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-1.5">Phone *</label>
          <input type="tel" value={formData.phone} onChange={(e) => setFormData(p => ({ ...p, phone: e.target.value }))} placeholder="(770) 000-0000" style={{ fontSize: '16px' }} className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#115997]/20 outline-none transition-all" />
        </div>
      </div>
      <div>
        <label className="block text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-1.5">Email (optional)</label>
        <input type="email" value={formData.email} onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))} placeholder="name@example.com" style={{ fontSize: '16px' }} className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#115997]/20 outline-none transition-all" />
        <p className="text-[10px] text-gray-300 mt-1">Stored for future email notifications. SMS only is sent today.</p>
      </div>
      <div>
        <label className="block text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-2">Receives</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {NOTIFICATION_TYPES.map(t => (
            <button key={t.key} type="button" onClick={() => toggleType(t.key)} className={'flex items-center justify-between px-3.5 py-3 rounded-xl border text-sm transition-all ' + (formData.notification_types.includes(t.key) ? 'border-[#115997]/20 bg-[#115997]/[0.04]' : 'border-gray-200 bg-white')}>
              <div className="text-left">
                <p className={'font-semibold ' + (formData.notification_types.includes(t.key) ? 'text-[#115997]' : 'text-gray-600')}>{t.label}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">{t.desc}</p>
              </div>
              <div className={'w-9 h-5 rounded-full transition-colors flex-shrink-0 relative ' + (formData.notification_types.includes(t.key) ? 'bg-[#115997]' : 'bg-gray-300')}>
                <div className={'absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform ' + (formData.notification_types.includes(t.key) ? 'translate-x-4' : 'translate-x-0.5')} />
              </div>
            </button>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2 pt-2">
        {!isNew && <button type="button" onClick={handleDelete} disabled={deleting || saving} className="px-3.5 py-2.5 text-sm font-semibold text-red-600 bg-red-50 rounded-xl hover:bg-red-100 disabled:opacity-40 transition-colors">{deleting ? 'Deleting...' : 'Delete'}</button>}
        <div className="flex-1" />
        <button type="button" onClick={closeForm} className="px-4 py-2.5 text-sm font-semibold text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">Cancel</button>
        <button type="button" onClick={handleSave} disabled={saving || deleting} className="px-4 py-2.5 text-sm font-semibold text-white bg-[#115997] rounded-xl hover:bg-[#0d4a7a] disabled:opacity-40 shadow-sm shadow-[#115997]/20 transition-all">{saving ? 'Saving...' : isNew ? 'Add Recipient' : 'Save Changes'}</button>
      </div>
    </div>
  )

  return (
    <div className="px-4 py-5 sm:py-8">
      <div className="mb-3 animate-[fadeUp_0.25s_ease-out]">
        <Link href="/admin/settings" className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-[#115997] font-medium transition-colors">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          Settings
        </Link>
      </div>

      <div className="flex items-center justify-between mb-5 animate-[fadeUp_0.3s_ease-out]">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">Notifications</h2>
          <p className="text-gray-400 text-sm mt-0.5">{recipients.filter(r => r.enabled).length} active of {recipients.length} total</p>
        </div>
        {expanded !== 'new' && (
          <button onClick={openNew} className="flex items-center gap-2 px-4 py-2.5 bg-[#115997] text-white text-sm font-semibold rounded-xl hover:bg-[#0d4a7a] shadow-sm shadow-[#115997]/20 transition-all active:scale-[0.97]">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>Add Recipient
          </button>
        )}
      </div>

      {successMsg && <div className="mb-4 rounded-xl p-3 text-sm bg-green-50 border border-green-200 text-green-700 flex items-center gap-2 animate-[fadeUp_0.2s_ease-out]"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>{successMsg}</div>}

      {/* New recipient card pinned above the list */}
      {expanded === 'new' && (
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-3 border-2 border-[#115997]/20 animate-[fadeUp_0.2s_ease-out]">
          <h3 className="font-bold text-gray-900 mb-4 text-sm">Add Recipient</h3>
          <FormBody isNew />
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 animate-[fadeUp_0.35s_ease-out]">
        {recipients.length === 0 ? (
          <div className="p-8 sm:p-12 text-center">
            <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
            </div>
            <p className="text-gray-400 text-sm">No recipients configured</p>
            <button onClick={openNew} className="mt-3 text-sm text-[#115997] font-semibold hover:underline">Add your first recipient</button>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {recipients.map(r => {
              const isOpen = expanded === r.id
              return (
                <div key={r.id} className={(r.enabled ? '' : 'bg-gray-50/30 ') + (isOpen ? 'bg-[#115997]/[0.02]' : '')}>
                  {/* Tappable row */}
                  <button onClick={() => openRow(r)} className="w-full text-left p-4 sm:px-6 flex items-center justify-between gap-3 transition-colors hover:bg-gray-50/50">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className={'w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ' + (r.enabled ? 'bg-[#115997]/[0.08]' : 'bg-gray-100')}>
                        <svg className={'w-5 h-5 ' + (r.enabled ? 'text-[#115997]' : 'text-gray-300')} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className={'font-bold text-sm ' + (r.enabled ? 'text-gray-900' : 'text-gray-400')}>{r.name}</p>
                          {!r.enabled && <span className="inline-flex px-2 py-0.5 rounded-md text-[9px] font-semibold bg-gray-100 text-gray-500">Disabled</span>}
                        </div>
                        <p className="text-xs text-gray-400 mt-0.5 tabular-nums truncate">{formatPhoneDisplay(r.phone)}{r.email ? ' · ' + r.email : ''}</p>
                        <div className="flex flex-wrap gap-1 mt-1.5">
                          {(r.notification_types || []).map(t => {
                            const def = NOTIFICATION_TYPES.find(x => x.key === t)
                            return <span key={t} className="inline-flex px-1.5 py-0.5 rounded-md text-[9px] font-semibold bg-gray-100 text-gray-500">{def?.label || t}</span>
                          })}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      {/* Toggle stays outside expanded view */}
                      <div onClick={(e) => handleToggle(r, e)} role="button" title={r.enabled ? 'Disable' : 'Enable'} className="p-1 cursor-pointer">
                        <div className={'w-10 h-6 rounded-full transition-colors relative ' + (r.enabled ? 'bg-[#115997]' : 'bg-gray-300')}>
                          <div className={'absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ' + (r.enabled ? 'translate-x-[18px]' : 'translate-x-0.5')} />
                        </div>
                      </div>
                      <svg className={'w-4 h-4 text-gray-300 transition-transform duration-200 ' + (isOpen ? 'rotate-180' : '')} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </div>
                  </button>

                  {/* Expanded edit form */}
                  {isOpen && (
                    <div className="px-4 sm:px-6 pb-5 pt-1 border-t border-gray-100 animate-[fadeUp_0.2s_ease-out]">
                      <FormBody isNew={false} />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>

      <p className="text-[11px] text-gray-400 mt-3 px-1 leading-relaxed">Only enabled recipients subscribed to the matching event type receive alerts. SMS is sent 60 seconds after the trigger.</p>
    </div>
  )
}