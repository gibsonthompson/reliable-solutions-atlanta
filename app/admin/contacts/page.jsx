'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const statuses = [
  { value: 'all', label: 'All' },
  { value: 'new', label: 'New', bg: 'bg-blue-100 text-blue-700' },
  { value: 'contacted', label: 'Contacted', bg: 'bg-yellow-100 text-yellow-700' },
  { value: 'estimate_scheduled', label: 'Est. Scheduled', bg: 'bg-indigo-100 text-indigo-700' },
  { value: 'estimate_completed', label: 'Est. Completed', bg: 'bg-purple-100 text-purple-700' },
  { value: 'job_booked', label: 'Job Booked', bg: 'bg-emerald-100 text-emerald-700' },
  { value: 'in_progress', label: 'In Progress', bg: 'bg-orange-100 text-orange-700' },
  { value: 'completed', label: 'Completed', bg: 'bg-green-100 text-green-700' },
  { value: 'closed_lost', label: 'Closed/Lost', bg: 'bg-red-100 text-red-700' },
]

export default function ContactsPage() {
  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('newest')

  useEffect(() => {
    fetchSubmissions()
  }, [])

  const fetchSubmissions = async () => {
    try {
      const response = await fetch('/api/contact')
      const result = await response.json()
      if (result.data) setSubmissions(result.data)
    } catch (error) {
      console.error('Failed to fetch:', error)
    } finally {
      setLoading(false)
    }
  }

  const filtered = submissions
    .filter(s => {
      if (filter !== 'all' && s.status !== filter) return false
      if (search) {
        const q = search.toLowerCase()
        return (
          s.name?.toLowerCase().includes(q) ||
          s.email?.toLowerCase().includes(q) ||
          s.phone?.includes(q) ||
          s.service_type?.toLowerCase().includes(q)
        )
      }
      return true
    })
    .sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.created_at) - new Date(a.created_at)
      if (sortBy === 'oldest') return new Date(a.created_at) - new Date(b.created_at)
      if (sortBy === 'scheduled') {
        if (!a.scheduled_date && !b.scheduled_date) return 0
        if (!a.scheduled_date) return 1
        if (!b.scheduled_date) return -1
        return new Date(a.scheduled_date) - new Date(b.scheduled_date)
      }
      return 0
    })

  const formatPhone = (phone) => {
    if (!phone) return ''
    const cleaned = phone.replace(/\D/g, '')
    if (cleaned.length === 10) return '(' + cleaned.slice(0, 3) + ') ' + cleaned.slice(3, 6) + '-' + cleaned.slice(6)
    if (cleaned.length === 11 && cleaned[0] === '1') return '(' + cleaned.slice(1, 4) + ') ' + cleaned.slice(4, 7) + '-' + cleaned.slice(7)
    return phone
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric'
    })
  }

  const getStatusBadge = (status) => {
    const found = statuses.find(s => s.value === status)
    return found?.bg || 'bg-gray-100 text-gray-700'
  }

  const getStatusLabel = (status) => {
    const found = statuses.find(s => s.value === status)
    return found?.label || status
  }

  const getStatusCount = (status) => {
    if (status === 'all') return submissions.length
    return submissions.filter(s => s.status === status).length
  }

  const timeAgo = (dateString) => {
    const seconds = Math.floor((Date.now() - new Date(dateString)) / 1000)
    if (seconds < 3600) return Math.floor(seconds / 60) + 'm ago'
    if (seconds < 86400) return Math.floor(seconds / 3600) + 'h ago'
    if (seconds < 604800) return Math.floor(seconds / 86400) + 'd ago'
    return formatDate(dateString)
  }

  // Color code by lead age: green < 1hr, yellow < 24hr, red > 24hr (only for new/contacted)
  const getUrgencyColor = (contact) => {
    if (!['new', 'contacted'].includes(contact.status)) return ''
    const hours = (Date.now() - new Date(contact.created_at)) / (1000 * 60 * 60)
    if (hours < 1) return 'border-l-4 border-l-green-400'
    if (hours < 24) return 'border-l-4 border-l-yellow-400'
    return 'border-l-4 border-l-red-400'
  }

  // Pipeline value
  const pipelineValue = submissions
    .filter(s => ['job_booked', 'in_progress'].includes(s.status) && s.quoted_amount)
    .reduce((sum, s) => sum + Number(s.quoted_amount), 0)

  const completedValue = submissions
    .filter(s => s.status === 'completed' && s.quoted_amount)
    .reduce((sum, s) => sum + Number(s.quoted_amount), 0)

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-10 h-10 border-4 border-[#115997] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="px-4 py-4 sm:py-8">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div>
          <h2 className="text-lg sm:text-2xl font-bold text-[#273373]">Lead Pipeline</h2>
          <p className="text-gray-500 text-xs sm:text-sm">{submissions.length} total leads</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <div className="bg-white rounded-xl p-3 shadow-sm">
          <p className="text-xs text-gray-500">New Leads</p>
          <p className="text-xl font-bold text-blue-600">{getStatusCount('new')}</p>
        </div>
        <div className="bg-white rounded-xl p-3 shadow-sm">
          <p className="text-xs text-gray-500">Upcoming Estimates</p>
          <p className="text-xl font-bold text-indigo-600">{getStatusCount('estimate_scheduled')}</p>
        </div>
        <div className="bg-white rounded-xl p-3 shadow-sm">
          <p className="text-xs text-gray-500">Jobs Booked</p>
          <p className="text-xl font-bold text-emerald-600">{getStatusCount('job_booked') + getStatusCount('in_progress')}</p>
        </div>
        <div className="bg-white rounded-xl p-3 shadow-sm">
          <p className="text-xs text-gray-500">Pipeline Value</p>
          <p className="text-xl font-bold text-[#273373]">
            {pipelineValue > 0 ? '$' + pipelineValue.toLocaleString() : '—'}
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="mb-4 sm:mb-6">
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search name, email, phone, service..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#115997] focus:border-transparent outline-none"
          />
        </div>
      </div>

      {/* Filter Pills */}
      <div className="mb-4 sm:mb-6 -mx-4 px-4 overflow-x-auto scrollbar-hide">
        <div className="flex gap-2 min-w-max sm:min-w-0 sm:flex-wrap">
          {statuses.map((status) => {
            const count = getStatusCount(status.value)
            return (
              <button
                key={status.value}
                onClick={() => setFilter(status.value)}
                className={'flex-shrink-0 px-3 sm:px-4 py-2 rounded-full text-sm font-medium transition-all ' +
                  (filter === status.value
                    ? 'bg-[#115997] text-white shadow-sm'
                    : 'bg-white text-gray-600 border border-gray-200 active:scale-95')}
              >
                {status.label}
                <span className={'ml-1.5 ' + (filter === status.value ? 'text-white/70' : 'text-gray-400')}>
                  {count}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Sort */}
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm text-gray-500">{filtered.length} result{filtered.length !== 1 ? 's' : ''}</p>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="text-sm text-gray-600 border-none bg-transparent focus:ring-0 cursor-pointer pr-6"
        >
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
          <option value="scheduled">By scheduled date</option>
        </select>
      </div>

      {/* Contacts List */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-8 sm:p-12 text-center">
            <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <p className="text-gray-500">
              {search ? 'No contacts match your search' : 'No contacts found'}
            </p>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Contact</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Service</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Scheduled</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Submitted</th>
                    <th className="px-6 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filtered.map((contact) => (
                    <tr key={contact.id} className={'hover:bg-gray-50 transition-colors ' + getUrgencyColor(contact)}>
                      <td className="px-6 py-4">
                        <p className="font-medium text-gray-900">{contact.name}</p>
                        <p className="text-sm text-gray-500">{formatPhone(contact.phone)}</p>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">{contact.service_type}</td>
                      <td className="px-6 py-4">
                        <span className={'inline-flex px-2.5 py-1 rounded-full text-xs font-medium ' + getStatusBadge(contact.status)}>
                          {getStatusLabel(contact.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {contact.scheduled_date ? (
                          <span>
                            {formatDate(contact.scheduled_date)}
                            {contact.scheduled_time && <span className="text-gray-400"> · {contact.scheduled_time}</span>}
                          </span>
                        ) : '—'}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {contact.quoted_amount ? '$' + Number(contact.quoted_amount).toLocaleString() : '—'}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {timeAgo(contact.created_at)}
                      </td>
                      <td className="px-6 py-4">
                        <Link
                          href={'/admin/contacts/' + contact.id}
                          className="text-[#115997] hover:text-[#273373] font-medium text-sm"
                        >
                          View →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden divide-y divide-gray-100">
              {filtered.map((contact) => (
                <Link
                  key={contact.id}
                  href={'/admin/contacts/' + contact.id}
                  className={'block p-4 active:bg-gray-50 transition-colors ' + getUrgencyColor(contact)}
                >
                  <div className="flex items-start justify-between mb-1.5">
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-gray-900 truncate">{contact.name}</p>
                      <p className="text-sm text-gray-500">{contact.service_type}</p>
                    </div>
                    <div className="flex flex-col items-end ml-3">
                      <span className={'inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium ' + getStatusBadge(contact.status)}>
                        {getStatusLabel(contact.status)}
                      </span>
                      <p className="text-[10px] text-gray-400 mt-1">{timeAgo(contact.created_at)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {formatPhone(contact.phone)}
                    </span>
                    {contact.scheduled_date && (
                      <span className="flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {formatDate(contact.scheduled_date)}
                      </span>
                    )}
                    {contact.quoted_amount && (
                      <span className="font-medium text-gray-700">${Number(contact.quoted_amount).toLocaleString()}</span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}