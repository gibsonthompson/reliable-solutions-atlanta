'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import EmailComposer from '../../components/EmailComposer'

const STATUS_OPTIONS = [
  { value: 'new', label: 'New', color: 'bg-blue-100 text-blue-700 border-blue-300' },
  { value: 'contacted', label: 'Contacted', color: 'bg-yellow-100 text-yellow-700 border-yellow-300' },
  { value: 'responded', label: 'Responded', color: 'bg-green-100 text-green-700 border-green-300' },
  { value: 'meeting_set', label: 'Meeting Set', color: 'bg-purple-100 text-purple-700 border-purple-300' },
  { value: 'partner', label: 'Partner', color: 'bg-emerald-100 text-emerald-700 border-emerald-300' },
  { value: 'not_interested', label: 'Not Interested', color: 'bg-gray-100 text-gray-500 border-gray-300' },
]

const SOURCE_OPTIONS = [
  { value: 'csv_import', label: 'CSV Import' },
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'google', label: 'Google Search' },
  { value: 'realtor_com', label: 'Realtor.com' },
  { value: 'zillow', label: 'Zillow' },
  { value: 'referral', label: 'Referral' },
  { value: 'manual', label: 'Manual' },
  { value: 'other', label: 'Other' },
]

export default function ProspectDetailPage() {
  const params = useParams()
  const router = useRouter()
  const prospectId = params.id

  const [prospect, setProspect] = useState(null)
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
    brokerage: '',
    area: '',
    source: 'manual',
    status: 'new',
    notes: '',
    next_follow_up: '',
  })

  useEffect(() => {
    if (prospectId) {
      fetchProspect()
      fetchOutreach()
    }
  }, [prospectId])

  const fetchProspect = async () => {
    try {
      const response = await fetch('/api/admin/prospects')
      const data = await response.json()
      if (data.prospects) {
        const found = data.prospects.find(p => p.id === prospectId)
        if (found) {
          setProspect(found)
          setFormData({
            name: found.name || '',
            email: found.email || '',
            phone: found.phone || '',
            brokerage: found.brokerage || '',
            area: found.area || '',
            source: found.source || 'manual',
            status: found.status || 'new',
            notes: found.notes || '',
            next_follow_up: found.next_follow_up || '',
          })
        } else {
          setError('Prospect not found')
        }
      }
    } catch (err) {
      setError('Failed to load prospect')
    } finally {
      setLoading(false)
    }
  }

  const fetchOutreach = async () => {
    try {
      const response = await fetch('/api/admin/outreach?prospect_id=' + prospectId)
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
      const response = await fetch('/api/admin/prospects', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: prospectId,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          brokerage: formData.brokerage,
          area: formData.area,
          source: formData.source,
          status: formData.status,
          notes: formData.notes,
          next_follow_up: formData.next_follow_up || null,
        }),
      })

      if (response.ok) {
        setSuccessMsg('Saved successfully')
        fetchProspect()
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
      await fetch('/api/admin/prospects', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: prospectId, status: newStatus }),
      })
      setSuccessMsg('Status updated')
      setTimeout(() => setSuccessMsg(''), 2000)
    } catch (err) {
      console.error('Failed to update status:', err)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Delete this prospect permanently?')) return
    setDeleting(true)
    try {
      await fetch('/api/admin/prospects', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: prospectId }),
      })
      router.push('/admin/prospects')
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
    if (!prospect) return null
    const hoursOld = (Date.now() - new Date(prospect.created_at)) / (1000 * 60 * 60)

    if (formData.status === 'new' && outreachLog.length === 0) {
      return { text: 'Send initial outreach email to this realtor', urgency: hoursOld > 48 ? 'high' : 'medium' }
    }
    if (formData.status === 'new' && outreachLog.length > 0) {
      return { text: 'Update status to Contacted since email was sent', urgency: 'low' }
    }
    if (formData.status === 'contacted' && hoursOld > 120) {
      return { text: 'Follow up — 5+ days since first contact', urgency: 'high' }
    }
    if (formData.status === 'responded') {
      return { text: 'Schedule a meeting or call to build the relationship', urgency: 'medium' }
    }
    return null
  }

  const recommendedAction = getRecommendedAction()

  // Build a contact-like object for the EmailComposer
  const composerContact = prospect ? {
    id: prospect.id,
    name: prospect.name,
    email: prospect.email || '',
    phone: prospect.phone || '',
    service_type: 'Realtor Partnership',
    // The composer logs to rsa_outreach_log using contact_id
    // We need to modify the outreach API to support prospect_id too
  } : null

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-10 h-10 border-4 border-[#115997] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (error && !prospect) {
    return (
      <div className="px-4 py-8 text-center">
        <p className="text-gray-500 mb-4">{error}</p>
        <Link href="/admin/prospects" className="text-[#115997] font-medium text-sm">Back to Prospects</Link>
      </div>
    )
  }

  const canSendEmail = Boolean(formData.email && formData.email.includes('@'))

  return (
    <div className="px-4 py-4 sm:py-8">
      {/* Back + Header */}
      <div className="mb-6">
        <Link href="/admin/prospects" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-[#115997] mb-4">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Prospects
        </Link>

        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl font-bold text-[#273373] truncate">{prospect?.name}</h1>
            <p className="text-sm text-gray-500">
              {prospect?.brokerage || 'No brokerage'} · Added {timeAgo(prospect?.created_at)}
            </p>
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

      {/* Recommended Action */}
      {recommendedAction && (
        <div className={'mb-4 sm:mb-6 rounded-xl p-3 sm:p-4 flex items-center justify-between ' +
          (recommendedAction.urgency === 'high' ? 'bg-amber-50 border border-amber-200' : 'bg-blue-50 border border-blue-200')}>
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
          {canSendEmail && (
            <button onClick={() => setComposerOpen(true)} className="text-xs sm:text-sm font-medium text-[#115997] hover:underline flex-shrink-0 ml-3">
              Send Email
            </button>
          )}
        </div>
      )}

      {/* Quick Actions */}
      <div className="flex gap-2 mb-6 sm:mb-8">
        <button
          onClick={() => setComposerOpen(true)}
          disabled={!canSendEmail}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#115997] text-white rounded-xl font-medium text-sm hover:bg-[#273373] transition-colors active:scale-[0.98] disabled:opacity-40"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Email
        </button>
        {formData.phone && (
          <button
            onClick={() => handleCall(prospect.phone)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-500 text-white rounded-xl font-medium text-sm hover:bg-green-600 transition-colors active:scale-[0.98]"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Call
          </button>
        )}
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
          {/* Prospect Info */}
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
            <h3 className="font-semibold text-gray-800 mb-4 text-sm sm:text-base">Prospect Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1.5">Name *</label>
                <input type="text" value={formData.name} onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#115997] focus:border-transparent outline-none" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1.5">Brokerage</label>
                <input type="text" value={formData.brokerage} onChange={(e) => setFormData(p => ({ ...p, brokerage: e.target.value }))} placeholder="e.g., Keller Williams" className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#115997] focus:border-transparent outline-none" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1.5">Email</label>
                <input type="email" value={formData.email} onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#115997] focus:border-transparent outline-none" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1.5">Phone</label>
                <input type="tel" value={formData.phone} onChange={(e) => setFormData(p => ({ ...p, phone: e.target.value }))} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#115997] focus:border-transparent outline-none" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1.5">Area / Market</label>
                <input type="text" value={formData.area} onChange={(e) => setFormData(p => ({ ...p, area: e.target.value }))} placeholder="e.g., Buckhead, Decatur" className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#115997] focus:border-transparent outline-none" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1.5">Source</label>
                <select value={formData.source} onChange={(e) => setFormData(p => ({ ...p, source: e.target.value }))} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#115997] focus:border-transparent outline-none">
                  {SOURCE_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </select>
              </div>
            </div>
            {!canSendEmail && (
              <p className="text-xs text-amber-600 mt-3 bg-amber-50 rounded-lg p-2">Add an email address to enable outreach</p>
            )}
          </div>

          {/* Notes */}
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
            <h3 className="font-semibold text-gray-800 mb-4 text-sm sm:text-base">Internal Notes</h3>
            <textarea value={formData.notes} onChange={(e) => setFormData(p => ({ ...p, notes: e.target.value }))} rows={4} placeholder="Notes about this realtor..." className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#115997] focus:border-transparent outline-none resize-none" />
          </div>

          {/* Outreach History */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-semibold text-gray-800 text-sm sm:text-base">
                Outreach History
                <span className="text-gray-400 font-normal text-sm ml-2">({outreachLog.length})</span>
              </h3>
              {canSendEmail && (
                <button onClick={() => setComposerOpen(true)} className="text-sm text-[#115997] font-medium hover:underline">+ New Email</button>
              )}
            </div>
            {outreachLog.length === 0 ? (
              <div className="p-8 text-center">
                <svg className="w-10 h-10 text-gray-200 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <p className="text-gray-400 text-sm">No outreach sent yet</p>
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
            <h3 className="font-semibold text-gray-800 mb-4 text-sm sm:text-base">Follow-up</h3>
            <div>
              <label className="block text-xs text-gray-500 mb-1.5">Next Follow-up Date</label>
              <input type="date" value={formData.next_follow_up} onChange={(e) => setFormData(p => ({ ...p, next_follow_up: e.target.value }))} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#115997] focus:border-transparent outline-none" />
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

          {/* Activity Stats */}
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
            <h3 className="font-semibold text-gray-800 mb-4 text-sm sm:text-base">Activity</h3>
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
                <span className="text-sm text-gray-500">Added</span>
                <span className="text-sm font-semibold text-gray-800">
                  {Math.floor((Date.now() - new Date(prospect?.created_at)) / (1000 * 60 * 60 * 24))}d ago
                </span>
              </div>
            </div>
          </div>

          {/* Delete */}
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-red-100">
            <button onClick={handleDelete} disabled={deleting} className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors disabled:opacity-50">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              {deleting ? 'Deleting...' : 'Delete Prospect'}
            </button>
          </div>
        </div>
      </div>

      {/* Email Composer */}
      <EmailComposer
        isOpen={composerOpen}
        onClose={() => setComposerOpen(false)}
        contact={composerContact}
        isProspect={true}
        onSent={() => {
          fetchOutreach()
          fetchProspect()
        }}
      />
    </div>
  )
}