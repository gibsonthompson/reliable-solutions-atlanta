'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import EmailComposer from '../../components/EmailComposer'

const STATUS_OPTIONS = [
  { value: 'new', label: 'New', color: 'bg-blue-100 text-blue-700 border-blue-300' },
  { value: 'contacted', label: 'Contacted', color: 'bg-yellow-100 text-yellow-700 border-yellow-300' },
  { value: 'quoted', label: 'Quoted', color: 'bg-purple-100 text-purple-700 border-purple-300' },
  { value: 'scheduled', label: 'Scheduled', color: 'bg-indigo-100 text-indigo-700 border-indigo-300' },
  { value: 'completed', label: 'Completed', color: 'bg-green-100 text-green-700 border-green-300' },
  { value: 'cancelled', label: 'Cancelled', color: 'bg-red-100 text-red-700 border-red-300' },
]

export default function ContactDetailPage() {
  const params = useParams()
  const router = useRouter()
  const contactId = params.id

  const [contact, setContact] = useState(null)
  const [outreachLog, setOutreachLog] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')
  const [error, setError] = useState('')
  const [composerOpen, setComposerOpen] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service_type: '',
    message: '',
    status: 'new',
    notes: '',
    next_follow_up: '',
  })

  useEffect(() => {
    if (contactId) {
      fetchContact()
      fetchOutreach()
    }
  }, [contactId])

  const fetchContact = async () => {
    try {
      const response = await fetch('/api/contact')
      const result = await response.json()
      if (result.data) {
        const found = result.data.find(s => s.id === contactId)
        if (found) {
          setContact(found)
          setFormData({
            name: found.name || '',
            email: found.email || '',
            phone: found.phone || '',
            service_type: found.service_type || '',
            message: found.message || '',
            status: found.status || 'new',
            notes: found.notes || '',
            next_follow_up: found.next_follow_up || '',
          })
        } else {
          setError('Contact not found')
        }
      }
    } catch (err) {
      setError('Failed to load contact')
    } finally {
      setLoading(false)
    }
  }

  const fetchOutreach = async () => {
    try {
      const response = await fetch('/api/admin/outreach?contact_id=' + contactId)
      const data = await response.json()
      if (data.outreach) setOutreachLog(data.outreach)
    } catch (err) {
      console.error('Failed to fetch outreach:', err)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    setError('')
    setSuccessMsg('')

    try {
      const response = await fetch('/api/contact', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: contactId,
          status: formData.status,
          notes: formData.notes,
          next_follow_up: formData.next_follow_up || null,
        }),
      })

      if (response.ok) {
        setSuccessMsg('Saved successfully')
        fetchContact()
        setTimeout(() => setSuccessMsg(''), 3000)
      } else {
        setError('Failed to save')
      }
    } catch (err) {
      setError('Failed to save')
    } finally {
      setSaving(false)
    }
  }

  const handleStatusChange = async (newStatus) => {
    setFormData(prev => ({ ...prev, status: newStatus }))
    try {
      await fetch('/api/contact', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: contactId, status: newStatus }),
      })
      setSuccessMsg('Status updated')
      setTimeout(() => setSuccessMsg(''), 2000)
    } catch (err) {
      console.error('Failed to update status:', err)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Delete this contact permanently?')) return
    setDeleting(true)
    try {
      const response = await fetch('/api/admin/outreach', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contact_id: contactId }),
      })
      // We'll need a delete endpoint — for now just navigate back
      router.push('/admin/contacts')
    } catch (err) {
      setError('Failed to delete')
      setDeleting(false)
    }
  }

  const handleCall = (phone) => { window.location.href = 'tel:' + phone }
  const handleEmailClient = (email) => { window.location.href = 'mailto:' + email }

  const formatPhone = (phone) => {
    if (!phone) return ''
    const cleaned = phone.replace(/\D/g, '')
    if (cleaned.length === 10) return '(' + cleaned.slice(0, 3) + ') ' + cleaned.slice(3, 6) + '-' + cleaned.slice(6)
    if (cleaned.length === 11 && cleaned[0] === '1') return '(' + cleaned.slice(1, 4) + ') ' + cleaned.slice(4, 7) + '-' + cleaned.slice(7)
    return phone
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit'
    })
  }

  const timeAgo = (dateString) => {
    const seconds = Math.floor((Date.now() - new Date(dateString)) / 1000)
    if (seconds < 60) return 'just now'
    if (seconds < 3600) return Math.floor(seconds / 60) + 'm ago'
    if (seconds < 86400) return Math.floor(seconds / 3600) + 'h ago'
    if (seconds < 604800) return Math.floor(seconds / 86400) + 'd ago'
    return formatDate(dateString)
  }

  const getRecommendedAction = () => {
    if (!contact) return null
    const hoursOld = (Date.now() - new Date(contact.created_at)) / (1000 * 60 * 60)

    if (formData.status === 'new' && outreachLog.length === 0) {
      return { text: 'Send initial follow-up email', urgency: hoursOld > 24 ? 'high' : 'medium' }
    }
    if (formData.status === 'new' && outreachLog.length > 0) {
      return { text: 'Mark as Contacted since email was sent', urgency: 'low' }
    }
    if (formData.status === 'contacted' && hoursOld > 72) {
      return { text: 'Send quote follow-up — 3+ days since first contact', urgency: 'high' }
    }
    if (formData.status === 'quoted') {
      return { text: 'Follow up on quote — ready to schedule?', urgency: 'medium' }
    }
    return null
  }

  const recommendedAction = getRecommendedAction()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-10 h-10 border-4 border-[#115997] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (error && !contact) {
    return (
      <div className="px-4 py-8 text-center">
        <p className="text-gray-500 mb-4">{error}</p>
        <Link href="/admin/contacts" className="text-[#115997] font-medium text-sm">
          ← Back to Contacts
        </Link>
      </div>
    )
  }

  return (
    <div className="px-4 py-4 sm:py-8">
      {/* Back + Header */}
      <div className="mb-6">
        <Link href="/admin/contacts" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-[#115997] mb-4">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Contacts
        </Link>

        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl font-bold text-[#273373] truncate">{contact?.name}</h1>
            <p className="text-sm text-gray-500">{contact?.service_type} · Submitted {timeAgo(contact?.created_at)}</p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-3 sm:px-4 py-2 bg-[#115997] text-white text-sm font-medium rounded-xl hover:bg-[#273373] transition-colors disabled:opacity-50 active:scale-[0.98]"
            >
              {saving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      {successMsg && (
        <div className="mb-4 rounded-xl p-3 text-sm bg-green-50 border border-green-200 text-green-700 flex items-center gap-2">
          <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          {successMsg}
        </div>
      )}
      {error && contact && (
        <div className="mb-4 rounded-xl p-3 text-sm bg-red-50 border border-red-200 text-red-700">{error}</div>
      )}

      {/* Recommended Action */}
      {recommendedAction && (
        <div className={'mb-4 sm:mb-6 rounded-xl p-3 sm:p-4 flex items-center justify-between ' +
          (recommendedAction.urgency === 'high'
            ? 'bg-amber-50 border border-amber-200'
            : 'bg-blue-50 border border-blue-200')}>
          <div className="flex items-center gap-2 sm:gap-3">
            {recommendedAction.urgency === 'high' ? (
              <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse flex-shrink-0" />
            ) : (
              <svg className="w-4 h-4 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            <p className={'text-sm font-medium ' + (recommendedAction.urgency === 'high' ? 'text-amber-800' : 'text-blue-800')}>
              {recommendedAction.text}
            </p>
          </div>
          <button
            onClick={() => setComposerOpen(true)}
            className="text-xs sm:text-sm font-medium text-[#115997] hover:underline flex-shrink-0 ml-3"
          >
            Send Email →
          </button>
        </div>
      )}

      {/* Quick Actions */}
      <div className="flex gap-2 mb-6 sm:mb-8">
        <button
          onClick={() => setComposerOpen(true)}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#115997] text-white rounded-xl font-medium text-sm hover:bg-[#273373] transition-colors active:scale-[0.98]"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Email
        </button>
        <button
          onClick={() => handleCall(contact.phone)}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-500 text-white rounded-xl font-medium text-sm hover:bg-green-600 transition-colors active:scale-[0.98]"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          Call
        </button>
      </div>

      {/* Pipeline Stage */}
      <div className="mb-6 sm:mb-8">
        <p className="text-xs text-gray-500 mb-2">Pipeline Stage</p>
        <div className="flex flex-wrap gap-2">
          {STATUS_OPTIONS.map((status) => (
            <button
              key={status.value}
              onClick={() => handleStatusChange(status.value)}
              className={'px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all active:scale-95 border ' +
                (formData.status === status.value
                  ? status.color + ' ring-2 ring-offset-1 ring-gray-300'
                  : 'bg-gray-50 text-gray-500 border-gray-200')}
            >
              {status.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          {/* Contact Info */}
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2 text-sm sm:text-base">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Contact Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-0.5">Name</p>
                <p className="font-medium text-gray-900 text-sm">{contact?.name}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-0.5">Service</p>
                <p className="font-medium text-gray-900 text-sm">{contact?.service_type}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-0.5">Phone</p>
                <button onClick={() => handleCall(contact.phone)} className="font-medium text-[#115997] text-sm">
                  {formatPhone(contact?.phone)}
                </button>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-0.5">Email</p>
                <button onClick={() => handleEmailClient(contact.email)} className="font-medium text-[#115997] text-sm break-all text-left">
                  {contact?.email}
                </button>
              </div>
            </div>
            {contact?.message && (
              <div className="mt-4">
                <p className="text-xs text-gray-500 mb-1.5">Original Message</p>
                <p className="text-sm text-gray-700 bg-gray-50 rounded-lg p-3">{contact.message}</p>
              </div>
            )}
          </div>

          {/* Notes */}
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2 text-sm sm:text-base">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Internal Notes
            </h3>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              rows={4}
              placeholder="Add notes about this lead..."
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#115997] focus:border-transparent outline-none resize-none text-sm"
            />
          </div>

          {/* Outreach History */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2 text-sm sm:text-base">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Outreach History
                <span className="text-gray-400 font-normal text-sm">({outreachLog.length})</span>
              </h3>
              <button
                onClick={() => setComposerOpen(true)}
                className="text-sm text-[#115997] font-medium hover:underline"
              >
                + New Email
              </button>
            </div>

            {outreachLog.length === 0 ? (
              <div className="p-8 text-center">
                <svg className="w-10 h-10 text-gray-200 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <p className="text-gray-400 text-sm">No emails sent yet</p>
                <button
                  onClick={() => setComposerOpen(true)}
                  className="mt-3 text-sm text-[#115997] font-medium hover:underline"
                >
                  Send first email →
                </button>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {outreachLog.map((entry) => (
                  <div key={entry.id} className="p-4 sm:px-6">
                    <div className="flex items-start justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <svg className="w-3.5 h-3.5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 text-sm">{entry.subject || 'Email sent'}</p>
                          <p className="text-xs text-gray-500">{timeAgo(entry.created_at)}</p>
                        </div>
                      </div>
                    </div>
                    {entry.body && (
                      <p className="text-xs text-gray-500 mt-2 line-clamp-2 ml-9">{entry.body.substring(0, 150)}...</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4 sm:space-y-6">
          {/* Follow-up */}
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2 text-sm sm:text-base">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Follow-up
            </h3>
            <div>
              <label className="block text-xs text-gray-500 mb-1.5">Next Follow-up Date</label>
              <input
                type="date"
                value={formData.next_follow_up}
                onChange={(e) => setFormData(prev => ({ ...prev, next_follow_up: e.target.value }))}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#115997] focus:border-transparent outline-none"
              />
            </div>
            {formData.next_follow_up && (
              <div className="mt-3 bg-amber-50 rounded-lg p-3 flex items-center gap-2">
                <svg className="w-4 h-4 text-amber-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-xs text-amber-700">
                  Follow-up on {new Date(formData.next_follow_up).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                </p>
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2 text-sm sm:text-base">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Activity
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Emails Sent</span>
                <span className="text-sm font-semibold text-gray-800">{outreachLog.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Last Contact</span>
                <span className="text-sm font-semibold text-gray-800">
                  {outreachLog.length > 0 ? timeAgo(outreachLog[0].created_at) : 'Never'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Lead Age</span>
                <span className="text-sm font-semibold text-gray-800">
                  {Math.floor((Date.now() - new Date(contact?.created_at)) / (1000 * 60 * 60 * 24))}d
                </span>
              </div>
            </div>
          </div>

          {/* Timestamps */}
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2 text-sm sm:text-base">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Timestamps
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Created</span>
                <span className="text-gray-800">{contact?.created_at ? formatDate(contact.created_at) : '—'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Updated</span>
                <span className="text-gray-800">{contact?.updated_at ? formatDate(contact.updated_at) : '—'}</span>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-red-100">
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors disabled:opacity-50"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              {deleting ? 'Deleting...' : 'Delete Contact'}
            </button>
          </div>
        </div>
      </div>

      {/* Email Composer Modal */}
      <EmailComposer
        isOpen={composerOpen}
        onClose={() => setComposerOpen(false)}
        contact={contact}
        onSent={() => {
          fetchOutreach()
          fetchContact()
        }}
      />
    </div>
  )
}