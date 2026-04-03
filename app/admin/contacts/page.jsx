'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAdminAuth } from '../layout'

const statuses = [
  { value: 'all', label: 'All' },
  { value: 'new', label: 'New', bg: 'bg-blue-100 text-blue-700' },
  { value: 'contacted', label: 'Contacted', bg: 'bg-yellow-100 text-yellow-700' },
  { value: 'estimate_sent', label: 'Estimate Sent', bg: 'bg-indigo-100 text-indigo-700' },
  { value: 'booked', label: 'Booked', bg: 'bg-emerald-100 text-emerald-700' },
  { value: 'done', label: 'Done', bg: 'bg-green-100 text-green-700' },
  { value: 'lost', label: 'Lost', bg: 'bg-red-100 text-red-700' },
]

export default function ContactsPage() {
  const { user } = useAdminAuth()
  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('newest')
  const [showHelp, setShowHelp] = useState(false)

  useEffect(() => { if (user) fetchSubmissions() }, [user])

  const fetchSubmissions = async () => {
    try {
      const params = user.role === 'member' ? `?user_id=${user.id}&user_role=member` : ''
      const r = await fetch('/api/contact' + params); const res = await r.json(); if (res.data) setSubmissions(res.data)
    } catch (e) { console.error('Failed to fetch:', e) }
    finally { setLoading(false) }
  }

  const filtered = submissions
    .filter(s => {
      if (filter !== 'all' && s.status !== filter) return false
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
  const getStatusBadge = (status) => (statuses.find(s => s.value === status)?.bg || 'bg-gray-100 text-gray-700')
  const getStatusLabel = (status) => (statuses.find(s => s.value === status)?.label || status)
  const getStatusCount = (status) => status === 'all' ? submissions.length : submissions.filter(s => s.status === status).length
  const timeAgo = (d) => { const s = Math.floor((Date.now() - new Date(d)) / 1000); if (s < 3600) return Math.floor(s/60) + 'm ago'; if (s < 86400) return Math.floor(s/3600) + 'h ago'; if (s < 604800) return Math.floor(s/86400) + 'd ago'; return formatDate(d) }
  const getUrgencyColor = (contact) => { if (!['new', 'contacted'].includes(contact.status)) return ''; const h = (Date.now() - new Date(contact.created_at)) / 36e5; if (h < 1) return 'border-l-4 border-l-green-400'; if (h < 24) return 'border-l-4 border-l-yellow-400'; return 'border-l-4 border-l-red-400' }

  if (loading) return <div className="flex items-center justify-center min-h-[50vh]"><div className="w-10 h-10 border-4 border-[#115997] border-t-transparent rounded-full animate-spin" /></div>

  return (
    <div className="px-4 py-4 sm:py-8">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div><h2 className="text-lg sm:text-2xl font-bold text-[#273373]">{user?.role === 'member' ? 'My Requests' : 'Requests'}</h2><p className="text-gray-500 text-xs sm:text-sm">{submissions.length} total</p></div>
        <div className="flex items-center gap-2">
          <button onClick={() => setShowHelp(true)} className="px-3 py-1.5 text-xs font-medium text-gray-500 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-1.5"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.065 2.05-1.37 2.772-1.153.508.153.942.535 1.025 1.059.108.685-.378 1.232-.816 1.627-.39.354-.816.659-.816 1.267V13m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>Help</button>
          <Link href="/admin/pipeline" className="px-3 py-1.5 text-xs font-medium text-[#115997] bg-[#115997]/10 rounded-lg hover:bg-[#115997]/20 transition-colors">Board View</Link>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white rounded-xl p-3 shadow-sm"><p className="text-xs text-gray-500">New</p><p className="text-xl font-bold text-blue-600">{getStatusCount('new')}</p></div>
        <div className="bg-white rounded-xl p-3 shadow-sm"><p className="text-xs text-gray-500">Estimates</p><p className="text-xl font-bold text-indigo-600">{getStatusCount('estimate_sent')}</p></div>
        <div className="bg-white rounded-xl p-3 shadow-sm"><p className="text-xs text-gray-500">Booked</p><p className="text-xl font-bold text-emerald-600">{getStatusCount('booked')}</p></div>
      </div>

      <div className="mb-4 sm:mb-6"><div className="relative"><svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg><input type="text" placeholder="Search name, email, phone, service..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ fontSize: '16px' }} className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#115997] focus:border-transparent outline-none" /></div></div>

      <div className="mb-4 sm:mb-6 -mx-4 px-4 overflow-x-auto scrollbar-hide"><div className="flex gap-2 min-w-max sm:min-w-0 sm:flex-wrap">{statuses.map((status) => <button key={status.value} onClick={() => setFilter(status.value)} className={'flex-shrink-0 px-3 sm:px-4 py-2 rounded-full text-sm font-medium transition-all ' + (filter === status.value ? 'bg-[#115997] text-white shadow-sm' : 'bg-white text-gray-600 border border-gray-200 active:scale-95')}>{status.label}<span className={'ml-1.5 ' + (filter === status.value ? 'text-white/70' : 'text-gray-400')}>{getStatusCount(status.value)}</span></button>)}</div></div>

      <div className="flex items-center justify-between mb-3">
        <p className="text-sm text-gray-500">{filtered.length} result{filtered.length !== 1 ? 's' : ''}</p>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="text-sm text-gray-600 border-none bg-transparent focus:ring-0 cursor-pointer pr-6"><option value="newest">Newest first</option><option value="oldest">Oldest first</option><option value="scheduled">By scheduled date</option></select>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {filtered.length === 0 ? <div className="p-8 sm:p-12 text-center"><p className="text-gray-500">{search ? 'No requests match your search' : 'No requests found'}</p></div> : (
          <>
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50"><tr><th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Contact</th><th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Service</th><th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>{user?.role === 'admin' && <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Assigned</th>}<th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Scheduled</th><th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Submitted</th><th className="px-6 py-3"></th></tr></thead>
                <tbody className="divide-y divide-gray-100">
                  {filtered.map((contact) => (
                    <tr key={contact.id} className={'hover:bg-gray-50 transition-colors ' + getUrgencyColor(contact)}>
                      <td className="px-6 py-4"><p className="font-medium text-gray-900">{contact.name}</p><p className="text-sm text-gray-500">{formatPhone(contact.phone)}</p></td>
                      <td className="px-6 py-4 text-sm text-gray-700">{contact.service_type}</td>
                      <td className="px-6 py-4"><span className={'inline-flex px-2.5 py-1 rounded-full text-xs font-medium ' + getStatusBadge(contact.status)}>{getStatusLabel(contact.status)}</span></td>
                      {user?.role === 'admin' && <td className="px-6 py-4 text-sm text-gray-500">{contact.assigned_user?.name || <span className="text-gray-300">Unassigned</span>}</td>}
                      <td className="px-6 py-4 text-sm text-gray-500">{contact.scheduled_date ? formatDate(contact.scheduled_date) : '—'}</td>
                      <td className="px-6 py-4 text-sm text-gray-500"><p>{formatDateTime(contact.created_at)}</p><p className="text-xs text-gray-400">{timeAgo(contact.created_at)}</p></td>
                      <td className="px-6 py-4"><Link href={'/admin/contacts/' + contact.id} className="text-[#115997] hover:text-[#273373] font-medium text-sm">View</Link></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="md:hidden divide-y divide-gray-100">
              {filtered.map((contact) => (
                <Link key={contact.id} href={'/admin/contacts/' + contact.id} className={'block p-4 active:bg-gray-50 transition-colors ' + getUrgencyColor(contact)}>
                  <div className="flex items-start justify-between mb-1.5">
                    <div className="min-w-0 flex-1"><p className="font-semibold text-gray-900 truncate">{contact.name}</p><p className="text-sm text-gray-500">{contact.service_type}</p></div>
                    <div className="flex flex-col items-end ml-3"><span className={'inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium ' + getStatusBadge(contact.status)}>{getStatusLabel(contact.status)}</span><p className="text-[10px] text-gray-400 mt-1">{formatDateTime(contact.created_at)}</p></div>
                  </div>
                  <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
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

      {showHelp && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4" onClick={() => setShowHelp(false)}>
          <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-lg max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-5 border-b border-gray-100">
              <div className="w-8 h-1 bg-gray-300 rounded-full mx-auto mb-3 sm:hidden" />
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-[#273373]">Contacts Help</h3>
                <button onClick={() => setShowHelp(false)} className="text-gray-400 hover:text-gray-600"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
              </div>
            </div>
            <div className="p-5 space-y-5">
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-1">What is this page?</h4>
                <p className="text-sm text-gray-600 leading-relaxed">This is your list of all leads and contacts. Every person who fills out the form on the website, or is added manually, shows up here.</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-1">Status filters</h4>
                <p className="text-sm text-gray-600 leading-relaxed">Use the pill filters at the top to show only leads in a specific stage like New, Contacted, Estimate Sent, Booked, Done, or Lost. The counts update in real time.</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-1">Search</h4>
                <p className="text-sm text-gray-600 leading-relaxed">Type a name, phone number, or service type in the search bar to find a specific contact quickly.</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-1">Tap a contact</h4>
                <p className="text-sm text-gray-600 leading-relaxed">Tap any contact to open their detail page where you can call, text, email, change their status, add notes, schedule a date, and see the full activity history.</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-1">Board View</h4>
                <p className="text-sm text-gray-600 leading-relaxed">Tap "Board View" at the top right to switch to the Pipeline page where you can drag and drop contacts between stages.</p>
              </div>
            </div>
            <div className="p-5 border-t border-gray-100">
              <button onClick={() => setShowHelp(false)} className="w-full py-3 bg-[#115997] text-white rounded-xl font-semibold hover:bg-[#273373] transition-colors">Got it</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}