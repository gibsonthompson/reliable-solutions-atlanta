'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useAdminAuth } from '../layout'
import { PIPELINE_STAGES, STAGE_BY_KEY, SERVICE_OPTIONS } from '../../../lib/pipeline'

const statuses = [{ value: 'all', label: 'All' }, ...PIPELINE_STAGES.map(s => ({ value: s.key, label: s.label, bg: s.badge }))]

const EMPTY_NEW_CONTACT = { name: '', phone: '', email: '', service_type: '', custom_service: '', initial_status: 'new', address: '', message: '' }

export default function ContactsPage() {
  const { user } = useAdminAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('newest')
  const [showHelp, setShowHelp] = useState(false)
  const [showAdd, setShowAdd] = useState(false)
  const [newContact, setNewContact] = useState(EMPTY_NEW_CONTACT)
  const [saving, setSaving] = useState(false)
  const [addError, setAddError] = useState('')

  useEffect(() => { if (user) fetchSubmissions() }, [user])

  // Auto-open Add modal when arriving with ?new=1 (e.g. from the pipeline page)
  useEffect(() => {
    if (searchParams.get('new') === '1') {
      setShowAdd(true)
      setNewContact(EMPTY_NEW_CONTACT)
      // Clean the URL so refreshing doesn't re-open it
      router.replace('/admin/contacts')
    }
  }, [searchParams, router])

  const fetchSubmissions = async () => {
    try {
      const params = user.role === 'member' ? `?user_id=${user.id}&user_role=member` : ''
      const r = await fetch('/api/contact' + params); const res = await r.json(); if (res.data) setSubmissions(res.data)
    } catch (e) { console.error('Failed to fetch:', e) }
    finally { setLoading(false) }
  }

  const resolveServiceType = () => newContact.service_type === 'Other' ? (newContact.custom_service.trim() || 'Other') : newContact.service_type
  const isAddValid = newContact.name.trim() && newContact.phone.trim() && (newContact.service_type && (newContact.service_type !== 'Other' || newContact.custom_service.trim()))

  const handleAddContact = async () => {
    if (!isAddValid) return
    setSaving(true); setAddError('')
    try {
      const r = await fetch('/api/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newContact.name.trim(),
          phone: newContact.phone.trim(),
          email: newContact.email.trim() || null,
          service_type: resolveServiceType(),
          address: newContact.address.trim() || null,
          message: newContact.message.trim() || null,
          source: 'admin',
          initial_status: newContact.initial_status,
        })
      })
      const res = await r.json()
      if (!r.ok) { setAddError(res.error || 'Failed to create contact'); return }
      // Navigate to the new contact's detail page
      const newId = res.data?.id
      setShowAdd(false); setNewContact(EMPTY_NEW_CONTACT)
      if (newId) router.push('/admin/contacts/' + newId)
      else fetchSubmissions()
    } catch (e) { setAddError('Failed to create contact') }
    finally { setSaving(false) }
  }

  const filtered = submissions
    .filter(s => {
      if (filter !== 'all' && (s.status || 'new') !== filter) return false
      if (search) { const q = search.toLowerCase(); return s.name?.toLowerCase().includes(q) || s.email?.toLowerCase().includes(q) || s.phone?.includes(q) || s.service_type?.toLowerCase().includes(q) }
      return true
    })
    .sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.created_at) - new Date(a.created_at)
      if (sortBy === 'oldest') return new Date(a.created_at) - new Date(b.created_at)
      if (sortBy === 'scheduled') { if (!a.scheduled_date && !b.scheduled_date) return 0; if (!a.scheduled_date) return 1; if (!b.scheduled_date) return -1; return new Date(a.scheduled_date) - new Date(b.scheduled_date) }
      return 0
    })

  const formatPhone = (phone) => { if (!phone) return ''; const c = phone.replace(/\D/g, ''); if (c.length === 10) return '(' + c.slice(0,3) + ') ' + c.slice(3,6) + '-' + c.slice(6); if (c.length === 11 && c[0] === '1') return '(' + c.slice(1,4) + ') ' + c.slice(4,7) + '-' + c.slice(7); return phone }
  const formatDate = (d) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  const formatDateTime = (d) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })
  const getStatusBadge = (status) => STAGE_BY_KEY[status]?.badge || 'bg-gray-100 text-gray-700'
  const getStatusLabel = (status) => STAGE_BY_KEY[status]?.label || status
  const getStatusCount = (status) => status === 'all' ? submissions.length : submissions.filter(s => (s.status || 'new') === status).length
  const timeAgo = (d) => { const s = Math.floor((Date.now() - new Date(d)) / 1000); if (s < 3600) return Math.floor(s/60) + 'm ago'; if (s < 86400) return Math.floor(s/3600) + 'h ago'; if (s < 604800) return Math.floor(s/86400) + 'd ago'; return formatDate(d) }
  const getUrgencyColor = (contact) => { if (!['new', 'contacting'].includes(contact.status)) return ''; const h = (Date.now() - new Date(contact.created_at)) / 36e5; if (h < 1) return 'border-l-4 border-l-green-400'; if (h < 24) return 'border-l-4 border-l-yellow-400'; return 'border-l-4 border-l-red-400' }

  if (loading) return <div className="flex items-center justify-center min-h-[50vh]"><div className="flex flex-col items-center gap-3"><div className="w-10 h-10 border-4 border-[#115997] border-t-transparent rounded-full animate-spin" /><p className="text-sm text-gray-400 animate-pulse">Loading requests...</p></div></div>

  return (
    <div className="px-4 py-5 sm:py-8">
      <div className="flex items-center justify-between mb-5 sm:mb-6 animate-[fadeUp_0.3s_ease-out]">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">{user?.role === 'member' ? 'My Requests' : 'Requests'}</h2>
          <p className="text-gray-400 text-sm mt-0.5">{submissions.length} total</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setShowHelp(true)} className="px-2.5 py-2 text-xs font-medium text-gray-400 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:text-gray-600 transition-all"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.065 2.05-1.37 2.772-1.153.508.153.942.535 1.025 1.059.108.685-.378 1.232-.816 1.627-.39.354-.816.659-.816 1.267V13m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></button>
          <Link href="/admin/pipeline" className="px-3 py-2 text-xs font-semibold text-[#115997] bg-[#115997]/[0.06] rounded-lg hover:bg-[#115997]/[0.1] transition-all">Board View</Link>
          <button onClick={() => { setNewContact(EMPTY_NEW_CONTACT); setAddError(''); setShowAdd(true) }} className="px-3 py-2 text-xs font-semibold text-white bg-[#115997] rounded-lg hover:bg-[#0d4a7a] shadow-sm shadow-[#115997]/20 transition-all flex items-center gap-1"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>Add</button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 animate-[fadeUp_0.35s_ease-out]">
        <div className="bg-white rounded-xl p-3.5 shadow-sm border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-blue-400 rounded-r" />
          <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold ml-2">New</p>
          <p className="text-2xl font-extrabold text-gray-900 ml-2 mt-0.5 tabular-nums">{getStatusCount('new')}</p>
        </div>
        <div className="bg-white rounded-xl p-3.5 shadow-sm border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-indigo-400 rounded-r" />
          <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold ml-2">Estimates Out</p>
          <p className="text-2xl font-extrabold text-gray-900 ml-2 mt-0.5 tabular-nums">{getStatusCount('estimate_sent')}</p>
        </div>
        <div className="bg-white rounded-xl p-3.5 shadow-sm border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-purple-400 rounded-r" />
          <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold ml-2">Won</p>
          <p className="text-2xl font-extrabold text-gray-900 ml-2 mt-0.5 tabular-nums">{getStatusCount('job_scheduled')}</p>
        </div>
        <div className="bg-white rounded-xl p-3.5 shadow-sm border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-amber-400 rounded-r" />
          <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold ml-2">Awaiting Pay</p>
          <p className="text-2xl font-extrabold text-gray-900 ml-2 mt-0.5 tabular-nums">{getStatusCount('awaiting_payment')}</p>
        </div>
      </div>

      <div className="mb-4 sm:mb-6 animate-[fadeUp_0.4s_ease-out]"><div className="relative"><svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg><input type="text" placeholder="Search name, email, phone, service..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ fontSize: '16px' }} className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#115997]/20 focus:border-[#115997] outline-none transition-all" /></div></div>

      <div className="mb-4 sm:mb-6 -mx-4 px-4 overflow-x-auto scrollbar-hide animate-[fadeUp_0.45s_ease-out]"><div className="flex gap-2 sm:flex-wrap">{statuses.map((status) => <button key={status.value} onClick={() => setFilter(status.value)} className={'flex-shrink-0 px-3 sm:px-4 py-2 rounded-full text-sm font-medium transition-all duration-150 ' + (filter === status.value ? 'bg-[#115997] text-white shadow-sm shadow-[#115997]/20' : 'bg-white text-gray-500 border border-gray-200 hover:border-gray-300 active:scale-95')}>{status.label}<span className={'ml-1.5 ' + (filter === status.value ? 'text-white/60' : 'text-gray-400')}>{getStatusCount(status.value)}</span></button>)}</div></div>

      <div className="flex items-center justify-between mb-3 animate-[fadeUp_0.5s_ease-out]">
        <p className="text-sm text-gray-400">{filtered.length} result{filtered.length !== 1 ? 's' : ''}</p>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="text-sm text-gray-500 border-none bg-transparent focus:ring-0 cursor-pointer pr-6"><option value="newest">Newest first</option><option value="oldest">Oldest first</option><option value="scheduled">By scheduled date</option></select>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 animate-[fadeUp_0.55s_ease-out]">
        {filtered.length === 0 ? <div className="p-8 sm:p-12 text-center"><p className="text-gray-400">{search ? 'No requests match your search' : 'No requests found'}</p></div> : (
          <>
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50/80"><tr><th className="px-6 py-3 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">Contact</th><th className="px-6 py-3 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">Service</th><th className="px-6 py-3 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</th>{user?.role === 'admin' && <th className="px-6 py-3 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">Assigned</th>}<th className="px-6 py-3 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">Scheduled</th><th className="px-6 py-3 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">Submitted</th><th className="px-6 py-3"></th></tr></thead>
                <tbody className="divide-y divide-gray-100">
                  {filtered.map((contact) => (
                    <tr key={contact.id} className={'hover:bg-gray-50/50 transition-colors group ' + getUrgencyColor(contact)}>
                      <td className="px-6 py-4"><p className="font-semibold text-gray-900 text-sm">{contact.name}</p><p className="text-xs text-gray-400 mt-0.5">{formatPhone(contact.phone)}</p></td>
                      <td className="px-6 py-4 text-sm text-gray-600">{contact.service_type}</td>
                      <td className="px-6 py-4"><span className={'inline-flex px-2.5 py-1 rounded-md text-[10px] font-semibold ' + getStatusBadge(contact.status)}>{getStatusLabel(contact.status)}</span></td>
                      {user?.role === 'admin' && <td className="px-6 py-4 text-sm text-gray-400">{contact.assigned_user?.name || <span className="text-gray-300">-</span>}</td>}
                      <td className="px-6 py-4 text-sm text-gray-400">{contact.scheduled_date ? formatDate(contact.scheduled_date) : '-'}</td>
                      <td className="px-6 py-4 text-sm text-gray-400"><p>{formatDateTime(contact.created_at)}</p><p className="text-[10px] text-gray-300 mt-0.5">{timeAgo(contact.created_at)}</p></td>
                      <td className="px-6 py-4"><Link href={'/admin/contacts/' + contact.id} className="text-[#115997] hover:text-[#0d4a7a] font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity">View →</Link></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="md:hidden divide-y divide-gray-100">
              {filtered.map((contact) => (
                <Link key={contact.id} href={'/admin/contacts/' + contact.id} className={'block p-4 active:bg-gray-50 transition-colors ' + getUrgencyColor(contact)}>
                  <div className="flex items-start justify-between mb-1.5">
                    <div className="min-w-0 flex-1"><p className="font-semibold text-gray-900 truncate">{contact.name}</p><p className="text-sm text-gray-400">{contact.service_type}</p></div>
                    <div className="flex flex-col items-end ml-3"><span className={'inline-flex px-2 py-0.5 rounded-md text-[10px] font-semibold ' + getStatusBadge(contact.status)}>{getStatusLabel(contact.status)}</span><p className="text-[10px] text-gray-300 mt-1">{formatDateTime(contact.created_at)}</p></div>
                  </div>
                  <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                    <span className="flex items-center gap-1"><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>{formatPhone(contact.phone)}</span>
                    {contact.scheduled_date && <span className="flex items-center gap-1"><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>{formatDate(contact.scheduled_date)}</span>}
                    {user?.role === 'admin' && contact.assigned_user && <span className="text-[#115997]">{contact.assigned_user.name}</span>}
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Add Contact Modal */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4" onClick={() => setShowAdd(false)}>
          <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-lg max-h-[90vh] overflow-y-auto animate-[fadeUp_0.2s_ease-out]" onClick={(e) => e.stopPropagation()}>
            <div className="p-4 sm:p-5 border-b border-gray-100">
              <div className="w-8 h-1 bg-gray-300 rounded-full mx-auto mb-3 sm:hidden" />
              <div className="flex items-center justify-between">
                <div><h3 className="text-lg font-bold text-gray-900">Add Contact</h3><p className="text-xs text-gray-400 mt-0.5">Manual entry for phone-in leads or referrals</p></div>
                <button onClick={() => setShowAdd(false)} className="text-gray-400 hover:text-gray-600 p-1"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
              </div>
            </div>

            <div className="p-4 sm:p-5 space-y-3">
              {addError && <div className="rounded-xl p-3 text-sm bg-red-50 border border-red-200 text-red-700">{addError}</div>}

              <div><label className="block text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-1">Name *</label><input type="text" value={newContact.name} onChange={(e) => setNewContact(p => ({ ...p, name: e.target.value }))} placeholder="Customer name" autoFocus style={{ fontSize: '16px' }} className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#115997]/20 focus:border-[#115997] outline-none transition-all" /></div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div><label className="block text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-1">Phone *</label><input type="tel" value={newContact.phone} onChange={(e) => setNewContact(p => ({ ...p, phone: e.target.value }))} placeholder="(770) 000-0000" style={{ fontSize: '16px' }} className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#115997]/20 focus:border-[#115997] outline-none transition-all" /></div>
                <div><label className="block text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-1">Email</label><input type="email" value={newContact.email} onChange={(e) => setNewContact(p => ({ ...p, email: e.target.value }))} placeholder="Optional" style={{ fontSize: '16px' }} className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#115997]/20 focus:border-[#115997] outline-none transition-all" /></div>
              </div>

              <div>
                <label className="block text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-1">Service *</label>
                <select value={newContact.service_type} onChange={(e) => setNewContact(p => ({ ...p, service_type: e.target.value, custom_service: '' }))} className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#115997]/20 focus:border-[#115997] outline-none bg-white transition-all">
                  <option value="">Select service...</option>
                  {SERVICE_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                {newContact.service_type === 'Other' && <input type="text" value={newContact.custom_service} onChange={(e) => setNewContact(p => ({ ...p, custom_service: e.target.value }))} placeholder="Describe the service..." style={{ fontSize: '16px' }} className="w-full mt-2 px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#115997]/20 focus:border-[#115997] outline-none transition-all" />}
              </div>

              <div>
                <label className="block text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-1">Initial Stage</label>
                <select value={newContact.initial_status} onChange={(e) => setNewContact(p => ({ ...p, initial_status: e.target.value }))} className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#115997]/20 focus:border-[#115997] outline-none bg-white transition-all">
                  {PIPELINE_STAGES.map(s => <option key={s.key} value={s.key}>{s.label}</option>)}
                </select>
                <p className="text-[10px] text-gray-400 mt-1">Defaults to New. Skip ahead if they{"'"}re already past first contact.</p>
              </div>

              <div><label className="block text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-1">Address</label><input type="text" value={newContact.address} onChange={(e) => setNewContact(p => ({ ...p, address: e.target.value }))} placeholder="Optional" style={{ fontSize: '16px' }} className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#115997]/20 focus:border-[#115997] outline-none transition-all" /></div>

              <div><label className="block text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-1">Notes</label><textarea value={newContact.message} onChange={(e) => setNewContact(p => ({ ...p, message: e.target.value }))} rows={2} placeholder="What they said, what they want..." style={{ fontSize: '16px' }} className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#115997]/20 focus:border-[#115997] outline-none resize-none transition-all" /></div>
            </div>

            <div className="p-4 sm:p-5 border-t border-gray-100 flex items-center gap-3">
              <button onClick={() => setShowAdd(false)} className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors">Cancel</button>
              <button onClick={handleAddContact} disabled={saving || !isAddValid} className="flex-1 py-3 bg-[#115997] text-white rounded-xl font-semibold hover:bg-[#0d4a7a] disabled:opacity-40 shadow-sm shadow-[#115997]/20 transition-all">{saving ? 'Adding...' : 'Add Contact'}</button>
            </div>
          </div>
        </div>
      )}

      {showHelp && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4" onClick={() => setShowHelp(false)}>
          <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-lg max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-5 border-b border-gray-100">
              <div className="w-8 h-1 bg-gray-300 rounded-full mx-auto mb-3 sm:hidden" />
              <div className="flex items-center justify-between"><h3 className="text-lg font-bold text-gray-900">Requests Help</h3><button onClick={() => setShowHelp(false)} className="text-gray-400 hover:text-gray-600"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button></div>
            </div>
            <div className="p-5 space-y-5">
              <div><h4 className="text-sm font-bold text-gray-800 mb-1">What is this page?</h4><p className="text-sm text-gray-500 leading-relaxed">Every person who fills out the form on the website shows up here. You can also tap Add to manually create a contact for phone-in leads or referrals.</p></div>
              <div><h4 className="text-sm font-bold text-gray-800 mb-1">Pipeline stages</h4><p className="text-sm text-gray-500 leading-relaxed">Leads move through 9 stages from New to Complete (or Lost). Use Board View for the visual pipeline with drag-and-drop.</p></div>
              <div><h4 className="text-sm font-bold text-gray-800 mb-1">Tap a contact</h4><p className="text-sm text-gray-500 leading-relaxed">Open their detail page to call, text, email, change status, create a job, schedule a date, and see activity history.</p></div>
            </div>
            <div className="p-5 border-t border-gray-100"><button onClick={() => setShowHelp(false)} className="w-full py-3 bg-[#115997] text-white rounded-xl font-semibold hover:bg-[#0d4a7a] transition-colors">Got it</button></div>
          </div>
        </div>
      )}
    </div>
  )
}