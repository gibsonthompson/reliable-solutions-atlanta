'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import EmailComposer from '../../components/EmailComposer'

const STATUS_OPTIONS = [
  { value: 'new', label: 'New', color: 'bg-blue-100 text-blue-700 border-blue-300' },
  { value: 'contacted', label: 'Contacted', color: 'bg-yellow-100 text-yellow-700 border-yellow-300' },
  { value: 'estimate_scheduled', label: 'Est. Scheduled', color: 'bg-indigo-100 text-indigo-700 border-indigo-300' },
  { value: 'estimate_completed', label: 'Est. Completed', color: 'bg-purple-100 text-purple-700 border-purple-300' },
  { value: 'job_booked', label: 'Job Booked', color: 'bg-emerald-100 text-emerald-700 border-emerald-300' },
  { value: 'in_progress', label: 'In Progress', color: 'bg-orange-100 text-orange-700 border-orange-300' },
  { value: 'completed', label: 'Completed', color: 'bg-green-100 text-green-700 border-green-300' },
  { value: 'closed_lost', label: 'Closed/Lost', color: 'bg-red-100 text-red-700 border-red-300' },
]

const CLOSE_REASONS = [
  'Too expensive',
  'Went with competitor',
  'No response',
  'Not ready yet',
  'DIY',
  'Other',
]

const SMS_TEMPLATES = [
  { label: 'On my way', text: "Hey {name}, we're on our way! Should be there in about 20 minutes. - RSA Team" },
  { label: 'Estimate ready', text: "Hey {name}, thanks for meeting with us today. I'll have your estimate ready by tomorrow. - RSA Team" },
  { label: 'Job scheduled', text: "Hey {name}, your {service} job is confirmed for {date}. We'll arrive between 8-9am. Call us if anything changes: 770-895-2039 - RSA Team" },
  { label: 'Follow up', text: "Hey {name}, just checking in on your {service} project. Still interested in moving forward? Happy to answer any questions. 770-895-2039 - RSA Team" },
]

export default function ContactDetailPage() {
  const params = useParams()
  const router = useRouter()
  const contactId = params.id

  const [contact, setContact] = useState(null)
  const [outreachLog, setOutreachLog] = useState([])
  const [activityLog, setActivityLog] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')
  const [error, setError] = useState('')
  const [composerOpen, setComposerOpen] = useState(false)
  const [showCloseModal, setShowCloseModal] = useState(false)
  const [closeReason, setCloseReason] = useState('')
  const [showSmsTemplates, setShowSmsTemplates] = useState(false)
  const [smsText, setSmsText] = useState('')
  const [sendingSms, setSendingSms] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service_type: '',
    message: '',
    status: 'new',
    notes: '',
    next_follow_up: '',
    scheduled_date: '',
    scheduled_time: '',
    quoted_amount: '',
    address: '',
  })

  useEffect(() => {
    if (contactId) {
      fetchContact()
      fetchOutreach()
      fetchActivity()
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
            scheduled_date: found.scheduled_date || '',
            scheduled_time: found.scheduled_time || '',
            quoted_amount: found.quoted_amount || '',
            address: found.address || '',
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

  const fetchActivity = async () => {
    try {
      const response = await fetch('/api/admin/activity?contact_id=' + contactId)
      const data = await response.json()
      if (data.activity) setActivityLog(data.activity)
    } catch (err) {
      console.error('Failed to fetch activity:', err)
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
          scheduled_date: formData.scheduled_date || null,
          scheduled_time: formData.scheduled_time || null,
          quoted_amount: formData.quoted_amount || null,
          address: formData.address || null,
        }),
      })

      if (response.ok) {
        setSuccessMsg('Saved successfully')
        fetchContact()
        fetchActivity()
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
    if (newStatus === 'closed_lost') {
      setShowCloseModal(true)
      return
    }

    const oldStatus = formData.status
    setFormData(prev => ({ ...prev, status: newStatus }))

    try {
      await fetch('/api/contact', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: contactId, status: newStatus }),
      })

      // Log activity
      await fetch('/api/admin/activity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contact_id: contactId,
          action: 'status_change',
          old_value: oldStatus,
          new_value: newStatus,
        }),
      })

      setSuccessMsg('Status updated')
      fetchActivity()
      setTimeout(() => setSuccessMsg(''), 2000)
    } catch (err) {
      console.error('Failed to update status:', err)
    }
  }

  const handleCloseLost = async () => {
    const oldStatus = formData.status
    setFormData(prev => ({ ...prev, status: 'closed_lost' }))
    setShowCloseModal(false)

    try {
      await fetch('/api/contact', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: contactId,
          status: 'closed_lost',
          close_reason: closeReason,
        }),
      })

      await fetch('/api/admin/activity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contact_id: contactId,
          action: 'status_change',
          old_value: oldStatus,
          new_value: 'closed_lost',
          note: 'Reason: ' + closeReason,
        }),
      })

      setSuccessMsg('Marked as closed/lost')
      fetchActivity()
      setTimeout(() => setSuccessMsg(''), 2000)
    } catch (err) {
      console.error('Failed:', err)
    }
  }

  const handleSendSms = async (text) => {
    setSendingSms(true)
    try {
      const response = await fetch('/api/admin/sms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contact_id: contactId,
          phone: contact.phone,
          text: text
            .replace('{name}', contact.name.split(' ')[0])
            .replace('{service}', contact.service_type)
            .replace('{date}', formData.scheduled_date ? new Date(formData.scheduled_date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }) : 'TBD'),
        }),
      })

      if (response.ok) {
        setSuccessMsg('SMS sent')
        setShowSmsTemplates(false)
        setSmsText('')
        fetchActivity()
        setTimeout(() => setSuccessMsg(''), 2000)
      } else {
        setError('Failed to send SMS')
      }
    } catch (err) {
      setError('Failed to send SMS')
    } finally {
      setSendingSms(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Delete this contact permanently?')) return
    setDeleting(true)
    try {
      await fetch('/api/admin/outreach', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contact_id: contactId }),
      })
      router.push('/admin/contacts')
    } catch (err) {
      setError('Failed to delete')
      setDeleting(false)
    }
  }

  const handleCall = (phone) => { window.location.href = 'tel:' + phone }
  const handleText = (phone) => { window.location.href = 'sms:' + phone }
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

    if (formData.status === 'new' && hoursOld > 0.5) {
      return { text: 'Call this lead ASAP — ' + Math.floor(hoursOld) + 'h old', urgency: hoursOld > 24 ? 'high' : 'medium', action: 'call' }
    }
    if (formData.status === 'contacted') {
      return { text: 'Schedule an estimate for this lead', urgency: hoursOld > 72 ? 'high' : 'medium', action: 'schedule' }
    }
    if (formData.status === 'estimate_completed' && !formData.quoted_amount) {
      return { text: 'Enter the quoted amount', urgency: 'medium', action: 'quote' }
    }
    if (formData.status === 'estimate_completed' && formData.quoted_amount) {
      return { text: 'Follow up — ready to book the job?', urgency: 'medium', action: 'followup' }
    }
    if (formData.status === 'completed') {
      return { text: 'Send a review request to this customer', urgency: 'low', action: 'review' }
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
        <Link href="/admin/contacts" className="text-[#115997] font-medium text-sm">← Back to Contacts</Link>
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
          Back to Pipeline
        </Link>

        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl font-bold text-[#273373] truncate">{contact?.name}</h1>
            <p className="text-sm text-gray-500">{contact?.service_type} · {timeAgo(contact?.created_at)}</p>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-3 sm:px-4 py-2 bg-[#115997] text-white text-sm font-medium rounded-xl hover:bg-[#273373] transition-colors disabled:opacity-50 active:scale-[0.98] flex-shrink-0"
          >
            {saving ? 'Saving...' : 'Save'}
          </button>
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
          (recommendedAction.urgency === 'high' ? 'bg-amber-50 border border-amber-200' : 'bg-blue-50 border border-blue-200')}>
          <div className="flex items-center gap-2 sm:gap-3">
            {recommendedAction.urgency === 'high' && <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse flex-shrink-0" />}
            <p className={'text-sm font-medium ' + (recommendedAction.urgency === 'high' ? 'text-amber-800' : 'text-blue-800')}>
              {recommendedAction.text}
            </p>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="flex gap-2 mb-6 sm:mb-8">
        <button
          onClick={() => handleCall(contact.phone)}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-500 text-white rounded-xl font-medium text-sm hover:bg-green-600 transition-colors active:scale-[0.98]"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          Call
        </button>
        <button
          onClick={() => setShowSmsTemplates(true)}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#115997] text-white rounded-xl font-medium text-sm hover:bg-[#273373] transition-colors active:scale-[0.98]"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          Text
        </button>
        <button
          onClick={() => setComposerOpen(true)}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-purple-500 text-white rounded-xl font-medium text-sm hover:bg-purple-600 transition-colors active:scale-[0.98]"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Email
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
            <h3 className="font-semibold text-gray-800 mb-4 text-sm sm:text-base">Contact Information</h3>
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

            {/* Address */}
            <div className="mt-4">
              <label className="block text-xs text-gray-500 mb-1.5">Property Address</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                placeholder="Enter property address..."
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#115997] focus:border-transparent outline-none"
              />
            </div>

            {contact?.message && (
              <div className="mt-4">
                <p className="text-xs text-gray-500 mb-1.5">Original Message</p>
                <p className="text-sm text-gray-700 bg-gray-50 rounded-lg p-3">{contact.message}</p>
              </div>
            )}
          </div>

          {/* Scheduling & Quote */}
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
            <h3 className="font-semibold text-gray-800 mb-4 text-sm sm:text-base">Scheduling & Quote</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1.5">Scheduled Date</label>
                <input
                  type="date"
                  value={formData.scheduled_date}
                  onChange={(e) => setFormData(prev => ({ ...prev, scheduled_date: e.target.value }))}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#115997] focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1.5">Time</label>
                <select
                  value={formData.scheduled_time}
                  onChange={(e) => setFormData(prev => ({ ...prev, scheduled_time: e.target.value }))}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#115997] focus:border-transparent outline-none bg-white"
                >
                  <option value="">Select time...</option>
                  <option value="8:00 AM - 9:00 AM">8:00 AM - 9:00 AM</option>
                  <option value="9:00 AM - 10:00 AM">9:00 AM - 10:00 AM</option>
                  <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
                  <option value="11:00 AM - 12:00 PM">11:00 AM - 12:00 PM</option>
                  <option value="12:00 PM - 1:00 PM">12:00 PM - 1:00 PM</option>
                  <option value="1:00 PM - 2:00 PM">1:00 PM - 2:00 PM</option>
                  <option value="2:00 PM - 3:00 PM">2:00 PM - 3:00 PM</option>
                  <option value="3:00 PM - 4:00 PM">3:00 PM - 4:00 PM</option>
                  <option value="4:00 PM - 5:00 PM">4:00 PM - 5:00 PM</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1.5">Quoted Amount</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                  <input
                    type="number"
                    value={formData.quoted_amount}
                    onChange={(e) => setFormData(prev => ({ ...prev, quoted_amount: e.target.value }))}
                    placeholder="0.00"
                    className="w-full pl-7 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#115997] focus:border-transparent outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
            <h3 className="font-semibold text-gray-800 mb-4 text-sm sm:text-base">Internal Notes</h3>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              rows={4}
              placeholder="Add notes about this lead..."
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#115997] focus:border-transparent outline-none resize-none text-sm"
            />
          </div>

          {/* Activity Timeline */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-100">
              <h3 className="font-semibold text-gray-800 text-sm sm:text-base">
                Activity Timeline
                <span className="text-gray-400 font-normal text-sm ml-1">({activityLog.length + outreachLog.length})</span>
              </h3>
            </div>

            {(activityLog.length + outreachLog.length) === 0 ? (
              <div className="p-8 text-center">
                <p className="text-gray-400 text-sm">No activity yet</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {/* Merge and sort activity + outreach by date */}
                {[
                  ...activityLog.map(a => ({ ...a, type: 'activity' })),
                  ...outreachLog.map(o => ({ ...o, type: 'outreach' })),
                ]
                  .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                  .map((entry) => (
                    <div key={entry.id} className="p-4 sm:px-6">
                      <div className="flex items-start gap-3">
                        <div className={'w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ' +
                          (entry.type === 'outreach' ? 'bg-purple-100' :
                           entry.action === 'status_change' ? 'bg-blue-100' :
                           entry.action === 'sms_sent' ? 'bg-green-100' : 'bg-gray-100')}>
                          {entry.type === 'outreach' ? (
                            <svg className="w-3.5 h-3.5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          ) : entry.action === 'sms_sent' ? (
                            <svg className="w-3.5 h-3.5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                          ) : (
                            <svg className="w-3.5 h-3.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          {entry.type === 'outreach' ? (
                            <>
                              <p className="text-sm font-medium text-gray-900">Email sent: {entry.subject || 'No subject'}</p>
                              {entry.body && <p className="text-xs text-gray-500 mt-1 line-clamp-2">{entry.body.substring(0, 150)}...</p>}
                            </>
                          ) : entry.action === 'status_change' ? (
                            <>
                              <p className="text-sm text-gray-900">
                                Status changed: <span className="font-medium">{entry.old_value}</span> → <span className="font-medium">{entry.new_value}</span>
                              </p>
                              {entry.note && <p className="text-xs text-gray-500 mt-0.5">{entry.note}</p>}
                            </>
                          ) : entry.action === 'sms_sent' ? (
                            <>
                              <p className="text-sm font-medium text-gray-900">SMS sent</p>
                              {entry.note && <p className="text-xs text-gray-500 mt-1 line-clamp-2">{entry.note}</p>}
                            </>
                          ) : (
                            <p className="text-sm text-gray-900">{entry.action}{entry.note ? ': ' + entry.note : ''}</p>
                          )}
                          <p className="text-xs text-gray-400 mt-1">{timeAgo(entry.created_at)}</p>
                        </div>
                      </div>
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
            <h3 className="font-semibold text-gray-800 mb-4 text-sm sm:text-base">Follow-up</h3>
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
            <h3 className="font-semibold text-gray-800 mb-4 text-sm sm:text-base">Activity</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Emails Sent</span>
                <span className="text-sm font-semibold text-gray-800">{outreachLog.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">SMS Sent</span>
                <span className="text-sm font-semibold text-gray-800">
                  {activityLog.filter(a => a.action === 'sms_sent').length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Lead Age</span>
                <span className="text-sm font-semibold text-gray-800">
                  {Math.floor((Date.now() - new Date(contact?.created_at)) / (1000 * 60 * 60 * 24))}d
                </span>
              </div>
              {formData.quoted_amount && (
                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <span className="text-sm text-gray-500">Quote</span>
                  <span className="text-sm font-bold text-[#273373]">${Number(formData.quoted_amount).toLocaleString()}</span>
                </div>
              )}
            </div>
          </div>

          {/* Timestamps */}
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
            <h3 className="font-semibold text-gray-800 mb-4 text-sm sm:text-base">Timestamps</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Created</span>
                <span className="text-gray-800">{contact?.created_at ? formatDate(contact.created_at) : '—'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Updated</span>
                <span className="text-gray-800">{contact?.updated_at ? formatDate(contact.updated_at) : '—'}</span>
              </div>
              {contact?.source && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Source</span>
                  <span className="text-gray-800 capitalize">{contact.source}</span>
                </div>
              )}
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

      {/* Close/Lost Modal */}
      {showCloseModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Close/Lost Reason</h3>
            <div className="space-y-2 mb-6">
              {CLOSE_REASONS.map((reason) => (
                <button
                  key={reason}
                  onClick={() => setCloseReason(reason)}
                  className={'w-full text-left px-4 py-3 rounded-lg border text-sm transition-all ' +
                    (closeReason === reason
                      ? 'border-red-300 bg-red-50 text-red-700 font-medium'
                      : 'border-gray-200 text-gray-700 hover:bg-gray-50')}
                >
                  {reason}
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => { setShowCloseModal(false); setCloseReason('') }}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleCloseLost}
                disabled={!closeReason}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 disabled:opacity-50"
              >
                Mark as Lost
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SMS Templates Modal */}
      {showSmsTemplates && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Send SMS</h3>
              <button onClick={() => { setShowSmsTemplates(false); setSmsText('') }} className="text-gray-400 hover:text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Quick templates */}
            <p className="text-xs text-gray-500 mb-2">Quick templates</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {SMS_TEMPLATES.map((t) => (
                <button
                  key={t.label}
                  onClick={() => setSmsText(t.text)}
                  className="px-3 py-1.5 text-xs font-medium bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Custom message */}
            <textarea
              value={smsText}
              onChange={(e) => setSmsText(e.target.value)}
              rows={4}
              placeholder="Type your message..."
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#115997] focus:border-transparent outline-none resize-none mb-1"
            />
            <p className="text-xs text-gray-400 mb-4">{smsText.length}/160 characters · To: {formatPhone(contact?.phone)}</p>

            <div className="flex gap-3">
              <button
                onClick={() => handleText(contact.phone)}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Open Messages
              </button>
              <button
                onClick={() => handleSendSms(smsText)}
                disabled={!smsText || sendingSms}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-[#115997] rounded-lg hover:bg-[#273373] disabled:opacity-50"
              >
                {sendingSms ? 'Sending...' : 'Send via Telnyx'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Email Composer Modal */}
      <EmailComposer
        isOpen={composerOpen}
        onClose={() => setComposerOpen(false)}
        contact={contact}
        onSent={() => {
          fetchOutreach()
          fetchContact()
          fetchActivity()
        }}
      />
    </div>
  )
}