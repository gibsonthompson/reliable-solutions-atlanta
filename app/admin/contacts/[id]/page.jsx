'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import EmailComposer from '../../components/EmailComposer'
import { useAdminAuth } from '../../layout'

const STATUS_OPTIONS = [
  { value: 'new', label: 'New', color: 'bg-blue-100 text-blue-700 border-blue-200' },
  { value: 'estimate_sent', label: 'Estimate Sent', color: 'bg-indigo-100 text-indigo-700 border-indigo-200' },
  { value: 'in_progress', label: 'In Progress', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  { value: 'done', label: 'Done', color: 'bg-green-100 text-green-700 border-green-200' },
  { value: 'lost', label: 'Lost', color: 'bg-red-100 text-red-700 border-red-200' },
]
const CLOSE_REASONS = ['Too expensive', 'Went with competitor', 'No response', 'Not ready yet', 'DIY', 'Other']
const SMS_TEMPLATES = [
  { label: 'New lead intro', text: "Hey {name}, this is Alex from Reliable Solutions Atlanta. We got your request for {service} and wanted to reach out. We offer free same-week inspections. Give us a call at 770-895-2039 or reply to this text to get scheduled. - RSA Team" },
  { label: 'Follow up', text: "Hey {name}, just checking in on your {service} project. Still interested in moving forward? Happy to answer any questions. 770-895-2039 - RSA Team" },
  { label: 'Estimate reminder', text: "Hey {name}, just a reminder we have your free inspection scheduled for {date}. We'll arrive between 8-9am. See you then! - RSA Team" },
  { label: 'Estimate sent', text: "Hey {name}, thanks for meeting with us today. I'll have your estimate ready by tomorrow. - RSA Team" },
  { label: 'Estimate booked', text: "Hey {name}, your free inspection for {service} is booked. We'll arrive between 8-9am. If you need to reschedule, call us at 770-895-2039. See you then! - RSA Team" },
  { label: 'Job scheduled', text: "Hey {name}, your {service} job is confirmed for {date}. We'll arrive between 8-9am. Call us if anything changes: 770-895-2039 - RSA Team" },
  { label: 'Job reminder', text: "Hey {name}, just a reminder your {service} job starts {date}. Please make sure the work area is accessible. See you then! - RSA Team" },
  { label: 'On my way', text: "Hey {name}, we're on our way! Should be there in about 20 minutes. - RSA Team" },
  { label: 'Running late', text: "Hey {name}, we're running a bit behind today. Should be there within the hour. Sorry for the delay! - RSA Team" },
  { label: 'Reschedule', text: "Hey {name}, we need to reschedule your {service} appointment. Can you give us a call at 770-895-2039 so we can find a new time? Sorry for the inconvenience. - RSA Team" },
  { label: 'Job complete', text: "Hey {name}, your {service} project is officially complete. Everything is covered under our transferable warranty. If you have any questions, call us anytime at 770-895-2039. - RSA Team" },
  { label: 'Thank you', text: "Hey {name}, the {service} work is all done! Thanks for choosing Reliable Solutions Atlanta. If you have any questions about your warranty or the work, call us anytime at 770-895-2039. - RSA Team" },
  { label: 'Payment reminder', text: "Hey {name}, just a friendly reminder about the outstanding balance for your {service} project. Give us a call at 770-895-2039 if you have any questions. - RSA Team" },
  { label: 'Review request', text: "Hey {name}, thanks for choosing Reliable Solutions Atlanta! If you are happy with the work, we would love a Google review: https://www.google.com/search?q=(770)+895-2039#lrd=0x88f5bde216fbfbdf:0x8d3c5e27cda0c48b,3 - RSA Team" },
]

export default function ContactDetailPage() {
  const { user, hasPermission } = useAdminAuth()
  const params = useParams()
  const router = useRouter()
  const contactId = params.id
  const [contact, setContact] = useState(null)
  const [outreachLog, setOutreachLog] = useState([])
  const [activityLog, setActivityLog] = useState([])
  const [teamUsers, setTeamUsers] = useState([])
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
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', service_type: '', message: '', status: 'new', notes: '', next_follow_up: '', scheduled_date: '', scheduled_time: '', address: '', assigned_to: '' })
  const [showHelp, setShowHelp] = useState(false)
  const [showJobModal, setShowJobModal] = useState(false)
  const [jobSaving, setJobSaving] = useState(false)
  const [jobForm, setJobForm] = useState({ address: '', client: '', date_start: '', date_end: '', notes: '', crew: [] })
  const [allCrewUsers, setAllCrewUsers] = useState([])
  const [addCrewUserId, setAddCrewUserId] = useState('')
  const [addCrewRole, setAddCrewRole] = useState('crew')

  useEffect(() => { if (contactId && user) { fetchContact(); fetchOutreach(); fetchActivity(); if (user.role === 'admin') fetchUsers() } }, [contactId, user])

  const fetchContact = async () => { try { const r = await fetch('/api/contact'); const res = await r.json(); if (res.data) { const f = res.data.find(s => s.id === contactId); if (f) { setContact(f); setFormData({ name: f.name||'', email: f.email||'', phone: f.phone||'', service_type: f.service_type||'', message: f.message||'', status: f.status||'new', notes: f.notes||'', next_follow_up: f.next_follow_up||'', scheduled_date: f.scheduled_date||'', scheduled_time: f.scheduled_time||'', address: f.address||'', assigned_to: f.assigned_to||'' }) } else setError('Contact not found') } } catch(e) { setError('Failed to load') } finally { setLoading(false) } }
  const fetchOutreach = async () => { try { const r = await fetch('/api/admin/outreach?contact_id='+contactId); const d = await r.json(); if (d.outreach) setOutreachLog(d.outreach) } catch(e) {} }
  const fetchActivity = async () => { try { const r = await fetch('/api/admin/activity?contact_id='+contactId); const d = await r.json(); if (d.activity) setActivityLog(d.activity) } catch(e) {} }
  const fetchUsers = async () => { try { const r = await fetch('/api/admin/users'); const d = await r.json(); if (d.users) { setTeamUsers(d.users.filter(u => u.is_active)); setAllCrewUsers(d.users.filter(u => u.is_active)) } } catch(e) {} }

  const handleSave = async () => { setSaving(true); setError(''); setSuccessMsg(''); try { const r = await fetch('/api/contact', { method:'PATCH', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ id:contactId, status:formData.status, notes:formData.notes, next_follow_up:formData.next_follow_up||null, scheduled_date:formData.scheduled_date||null, scheduled_time:formData.scheduled_time||null, address:formData.address||null, assigned_to:formData.assigned_to||null }) }); if (r.ok) { setSuccessMsg('Saved'); fetchContact(); fetchActivity(); setTimeout(()=>setSuccessMsg(''),3000) } else setError('Failed to save') } catch(e) { setError('Failed to save') } finally { setSaving(false) } }
  const handleStatusChange = async (newStatus) => {
    if (newStatus === 'lost') { setShowCloseModal(true); return }
    const old = formData.status; setFormData(p => ({ ...p, status: newStatus }))
    try {
      await fetch('/api/contact', { method:'PATCH', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ id:contactId, status:newStatus }) })
      await fetch('/api/admin/activity', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ contact_id:contactId, action:'status_change', old_value:old, new_value:newStatus, user_id:user?.id }) })
      setSuccessMsg('Status updated'); fetchActivity(); setTimeout(() => setSuccessMsg(''), 3000)
    } catch(e) {}
  }
  const handleCloseLost = async () => { const old = formData.status; setFormData(p => ({ ...p, status: 'lost' })); setShowCloseModal(false); try { await fetch('/api/contact', { method:'PATCH', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ id:contactId, status:'lost', close_reason:closeReason }) }); await fetch('/api/admin/activity', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ contact_id:contactId, action:'status_change', old_value:old, new_value:'lost', note:'Reason: '+closeReason, user_id:user?.id }) }); setSuccessMsg('Marked as lost'); fetchActivity(); setTimeout(() => setSuccessMsg(''), 2000) } catch(e) {} }

  const openJobModal = () => {
    setJobForm({ address: formData.address || '', client: contact?.name || '', date_start: formData.scheduled_date || '', date_end: '', notes: contact?.service_type || '', crew: [] })
    setAddCrewUserId(''); setAddCrewRole('crew')
    setShowJobModal(true)
  }

  const addCrewToJobForm = () => {
    if (!addCrewUserId) return
    const u = allCrewUsers.find(x => x.id === addCrewUserId)
    if (!u || jobForm.crew.some(c => c.user_id === addCrewUserId)) return
    setJobForm(p => ({ ...p, crew: [...p.crew, { user_id: addCrewUserId, role: addCrewRole, name: u.name, color: u.color }] }))
    setAddCrewUserId(''); setAddCrewRole('crew')
  }

  const removeCrewFromJobForm = (userId) => {
    setJobForm(p => ({ ...p, crew: p.crew.filter(c => c.user_id !== userId) }))
  }

  const handleCreateJob = async () => {
    if (!jobForm.address.trim()) return
    setJobSaving(true)
    try {
      const r = await fetch('/api/admin/jobs', { method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address: jobForm.address, client: jobForm.client, date_start: jobForm.date_start || null, date_end: jobForm.date_end || null, notes: jobForm.notes || null, status: 'active', labor: 0, material: 0, gas: 0, misc: 0, revenue: 0, taxes: 0 })
      })
      if (!r.ok) return
      const jobData = await r.json()
      const newJobId = jobData.job?.id
      if (newJobId && jobForm.crew.length > 0) {
        for (const c of jobForm.crew) {
          await fetch('/api/admin/job-crew', { method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ job_id: newJobId, user_id: c.user_id, role: c.role, assigned_by: user?.id }) })
        }
      }
      setShowJobModal(false)
      setSuccessMsg(`Job created${jobForm.crew.length > 0 ? ` with ${jobForm.crew.length} crew assigned` : ' — assign crew on Jobs or Schedule page'}`)
      setTimeout(() => setSuccessMsg(''), 4000)
    } catch (e) {}
    finally { setJobSaving(false) }
  }

  const handleDelete = async () => { if (!confirm('Delete this contact permanently?')) return; setDeleting(true); try { await fetch('/api/admin/outreach', { method:'DELETE', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ contact_id:contactId }) }); router.push('/admin/contacts') } catch(e) { setError('Failed to delete'); setDeleting(false) } }

  const resolveVariables = (text) => text.replace(/\{name\}/g, contact.name.split(' ')[0]).replace(/\{service\}/g, contact.service_type).replace(/\{date\}/g, formData.scheduled_date ? new Date(formData.scheduled_date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }) : 'TBD')
  const handleCopyAndOpenMessages = async () => { const resolved = resolveVariables(smsText); try { await navigator.clipboard.writeText(resolved) } catch(e) {}; setSuccessMsg('Copied! Opening Messages...'); setShowSmsTemplates(false); setSmsText(''); setTimeout(() => { window.location.href = 'sms:' + contact.phone }, 300); setTimeout(() => setSuccessMsg(''), 3000) }

  const formatPhone = (p) => { if (!p) return ''; const c = p.replace(/\D/g, ''); if (c.length === 10) return '(' + c.slice(0,3) + ') ' + c.slice(3,6) + '-' + c.slice(6); if (c.length === 11 && c[0] === '1') return '(' + c.slice(1,4) + ') ' + c.slice(4,7) + '-' + c.slice(7); return p }
  const formatDate = (d) => new Date(d).toLocaleDateString('en-US', { month:'short', day:'numeric', year:'numeric', hour:'numeric', minute:'2-digit' })
  const timeAgo = (d) => { const s = Math.floor((Date.now() - new Date(d)) / 1000); if (s < 60) return 'just now'; if (s < 3600) return Math.floor(s/60) + 'm ago'; if (s < 86400) return Math.floor(s/3600) + 'h ago'; if (s < 604800) return Math.floor(s/86400) + 'd ago'; return formatDate(d) }
  const getRecommendedAction = () => { if (!contact) return null; const h = (Date.now() - new Date(contact.created_at)) / 36e5; if (formData.status === 'new' && h > 0.5) return { text: 'Call this lead ASAP — ' + Math.floor(h) + 'h old', urgency: h > 24 ? 'high' : 'medium' }; if (formData.status === 'contacted') return { text: 'Schedule a free inspection for this lead', urgency: h > 72 ? 'high' : 'medium' }; if (formData.status === 'estimate_sent') return { text: 'Follow up — waiting on their decision', urgency: 'medium' }; if (formData.status === 'done') return { text: 'Send a review request from the SMS templates', urgency: 'low' }; return null }
  const rec = getRecommendedAction()

  if (loading) return <div className="flex items-center justify-center min-h-[50vh]"><div className="flex flex-col items-center gap-3"><div className="w-10 h-10 border-4 border-[#115997] border-t-transparent rounded-full animate-spin" /><p className="text-sm text-gray-400 animate-pulse">Loading contact...</p></div></div>
  if (error && !contact) return <div className="px-4 py-8 text-center"><p className="text-gray-400 mb-4">{error}</p><Link href="/admin/contacts" className="text-[#115997] font-semibold text-sm">← Back</Link></div>

  return (
    <div className="px-4 py-5 sm:py-8">
      {/* Header */}
      <div className="mb-6 animate-[fadeUp_0.3s_ease-out]">
        <Link href="/admin/contacts" className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-[#115997] mb-4 transition-colors"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>Back</Link>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0"><h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight truncate">{contact?.name}</h1><p className="text-sm text-gray-400 mt-0.5">{contact?.service_type} · Submitted {new Date(contact?.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}</p></div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button onClick={() => setShowHelp(true)} className="px-2.5 py-2 text-gray-400 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:text-gray-600 transition-all"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.065 2.05-1.37 2.772-1.153.508.153.942.535 1.025 1.059.108.685-.378 1.232-.816 1.627-.39.354-.816.659-.816 1.267V13m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></button>
            <button onClick={handleSave} disabled={saving} className="px-4 py-2 bg-[#115997] text-white text-sm font-semibold rounded-xl hover:bg-[#0d4a7a] disabled:opacity-40 shadow-sm shadow-[#115997]/20 transition-all active:scale-[0.97]">{saving ? 'Saving...' : 'Save'}</button>
          </div>
        </div>
      </div>

      {successMsg && <div className="mb-4 rounded-xl p-3 text-sm bg-green-50 border border-green-200 text-green-700 flex items-center gap-2 animate-[fadeUp_0.2s_ease-out]"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>{successMsg}</div>}
      {error && contact && <div className="mb-4 rounded-xl p-3 text-sm bg-red-50 border border-red-200 text-red-700">{error}</div>}
      {rec && <div className={'mb-5 rounded-xl p-3.5 flex items-center gap-3 animate-[fadeUp_0.35s_ease-out] ' + (rec.urgency === 'high' ? 'bg-amber-50 border border-amber-200' : 'bg-blue-50 border border-blue-200')}>{rec.urgency === 'high' && <div className="w-2.5 h-2.5 bg-amber-500 rounded-full animate-pulse flex-shrink-0" />}<p className={'text-sm font-semibold ' + (rec.urgency === 'high' ? 'text-amber-800' : 'text-blue-800')}>{rec.text}</p></div>}

      {/* Quick Actions */}
      <div className="flex gap-2 mb-6 animate-[fadeUp_0.4s_ease-out]">
        <button onClick={() => window.location.href = 'tel:' + contact.phone} className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-500 text-white rounded-xl font-semibold text-sm hover:bg-green-600 shadow-sm shadow-green-500/20 transition-all active:scale-[0.97]"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>Call</button>
        <button onClick={openJobModal} className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-amber-500 text-white rounded-xl font-semibold text-sm hover:bg-amber-600 shadow-sm shadow-amber-500/20 transition-all active:scale-[0.97]"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>Job</button>
        {hasPermission('sms') && <button onClick={() => setShowSmsTemplates(true)} className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#115997] text-white rounded-xl font-semibold text-sm hover:bg-[#0d4a7a] shadow-sm shadow-[#115997]/20 transition-all active:scale-[0.97]"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>Text</button>}
        {hasPermission('email') && <button onClick={() => setComposerOpen(true)} className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-purple-500 text-white rounded-xl font-semibold text-sm hover:bg-purple-600 shadow-sm shadow-purple-500/20 transition-all active:scale-[0.97]"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>Email</button>}
      </div>

      {/* Pipeline Stage */}
      <div className="mb-6 animate-[fadeUp_0.45s_ease-out]"><p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-2">Pipeline Stage</p><div className="flex flex-wrap gap-2">{STATUS_OPTIONS.map((s) => <button key={s.value} onClick={() => handleStatusChange(s.value)} className={'px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-150 active:scale-95 border ' + (formData.status === s.value ? s.color + ' ring-2 ring-offset-1 ring-gray-300' : 'bg-white text-gray-400 border-gray-200 hover:border-gray-300')}>{s.label}</button>)}</div></div>

      <div className="grid gap-4 sm:gap-5 lg:grid-cols-3 animate-[fadeUp_0.5s_ease-out]">
        <div className="lg:col-span-2 space-y-4">
          {/* Contact Info */}
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-4 text-sm">Contact Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-[#F5F6F8] rounded-xl p-3"><p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-0.5">Name</p><p className="font-semibold text-gray-900 text-sm">{contact?.name}</p></div>
              <div className="bg-[#F5F6F8] rounded-xl p-3"><p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-0.5">Service</p><p className="font-semibold text-gray-900 text-sm">{contact?.service_type}</p></div>
              <div className="bg-[#F5F6F8] rounded-xl p-3"><p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-0.5">Phone</p><button onClick={() => window.location.href = 'tel:' + contact.phone} className="font-semibold text-[#115997] text-sm hover:underline">{formatPhone(contact?.phone)}</button></div>
              <div className="bg-[#F5F6F8] rounded-xl p-3"><p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-0.5">Email</p><button onClick={() => window.location.href = 'mailto:' + contact.email} className="font-semibold text-[#115997] text-sm break-all text-left hover:underline">{contact?.email}</button></div>
            </div>
            <div className="mt-4"><label className="block text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-1.5">Property Address</label><input type="text" value={formData.address} onChange={(e) => setFormData(p => ({ ...p, address: e.target.value }))} placeholder="Enter property address..." style={{ fontSize: '16px' }} className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#115997]/20 focus:border-[#115997] outline-none transition-all" /></div>
            {user?.role === 'admin' && (
              <div className="mt-4"><label className="block text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-1.5">Assigned To</label><select value={formData.assigned_to} onChange={(e) => setFormData(p => ({ ...p, assigned_to: e.target.value }))} className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#115997]/20 focus:border-[#115997] outline-none bg-white transition-all"><option value="">Unassigned</option>{teamUsers.map(u => <option key={u.id} value={u.id}>{u.name} (@{u.username})</option>)}</select></div>
            )}
            {contact?.message && <div className="mt-4"><p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-1.5">Original Message</p><p className="text-sm text-gray-600 bg-[#F5F6F8] rounded-xl p-3 leading-relaxed">{contact.message}</p></div>}
          </div>

          {/* Scheduling */}
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100"><h3 className="font-bold text-gray-900 mb-4 text-sm">Scheduling</h3><div className="grid grid-cols-1 sm:grid-cols-2 gap-3"><div><label className="block text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-1.5">Date</label><input type="date" value={formData.scheduled_date} onChange={(e) => setFormData(p => ({ ...p, scheduled_date: e.target.value }))} className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#115997]/20 focus:border-[#115997] outline-none transition-all" /></div><div><label className="block text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-1.5">Time</label><select value={formData.scheduled_time} onChange={(e) => setFormData(p => ({ ...p, scheduled_time: e.target.value }))} className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#115997]/20 focus:border-[#115997] outline-none bg-white transition-all"><option value="">Select time...</option><option value="8:00 AM - 9:00 AM">8-9 AM</option><option value="9:00 AM - 10:00 AM">9-10 AM</option><option value="10:00 AM - 11:00 AM">10-11 AM</option><option value="11:00 AM - 12:00 PM">11-12 PM</option><option value="12:00 PM - 1:00 PM">12-1 PM</option><option value="1:00 PM - 2:00 PM">1-2 PM</option><option value="2:00 PM - 3:00 PM">2-3 PM</option><option value="3:00 PM - 4:00 PM">3-4 PM</option><option value="4:00 PM - 5:00 PM">4-5 PM</option></select></div></div></div>

          {/* Notes */}
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100"><h3 className="font-bold text-gray-900 mb-4 text-sm">Internal Notes</h3><textarea value={formData.notes} onChange={(e) => setFormData(p => ({ ...p, notes: e.target.value }))} rows={4} placeholder="Add notes..." style={{ fontSize: '16px' }} className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#115997]/20 focus:border-[#115997] outline-none resize-none text-sm transition-all" /></div>

          {/* Activity */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
            <div className="px-4 sm:px-6 py-3.5 border-b border-gray-100"><h3 className="font-bold text-gray-900 text-sm">Activity <span className="text-gray-300 font-normal text-sm">({activityLog.length + outreachLog.length})</span></h3></div>
            {(activityLog.length + outreachLog.length) === 0 ? <div className="p-8 text-center"><p className="text-gray-400 text-sm">No activity yet</p></div> : (
              <div className="divide-y divide-gray-50">
                {[...activityLog.map(a => ({ ...a, type: 'activity' })), ...outreachLog.map(o => ({ ...o, type: 'outreach' }))].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).map((entry) => (
                  <div key={entry.id} className="p-4 sm:px-6 hover:bg-gray-50/50 transition-colors"><div className="flex items-start gap-3"><div className={'w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ' + (entry.type === 'outreach' ? 'bg-purple-100' : entry.action === 'sms_sent' ? 'bg-green-100' : entry.action === 'review_request_sent' ? 'bg-amber-100' : 'bg-blue-100')}><svg className={'w-3.5 h-3.5 ' + (entry.type === 'outreach' ? 'text-purple-600' : entry.action === 'sms_sent' ? 'text-green-600' : entry.action === 'review_request_sent' ? 'text-amber-600' : 'text-blue-600')} fill="none" stroke="currentColor" viewBox="0 0 24 24">{entry.type === 'outreach' ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /> : entry.action === 'review_request_sent' ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />}</svg></div><div className="flex-1 min-w-0">{entry.type === 'outreach' ? <><p className="text-sm font-semibold text-gray-900">Email: {entry.subject || 'No subject'}</p>{entry.body && <p className="text-xs text-gray-400 mt-1 line-clamp-2">{entry.body.substring(0, 150)}...</p>}</> : entry.action === 'status_change' ? <><p className="text-sm text-gray-700">Status: <span className="font-semibold">{entry.old_value}</span> → <span className="font-semibold">{entry.new_value}</span></p>{entry.note && <p className="text-xs text-gray-400 mt-0.5">{entry.note}</p>}</> : entry.action === 'review_request_sent' ? <p className="text-sm font-semibold text-amber-700">Google review request sent</p> : entry.action === 'sms_sent' ? <><p className="text-sm font-semibold text-gray-900">SMS sent</p>{entry.note && <p className="text-xs text-gray-400 mt-1 line-clamp-2">{entry.note}</p>}</> : <p className="text-sm text-gray-700">{entry.action}{entry.note ? ': ' + entry.note : ''}</p>}<p className="text-[10px] text-gray-300 mt-1">{timeAgo(entry.created_at)}</p></div></div></div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100"><h3 className="font-bold text-gray-900 mb-4 text-sm">Follow-up</h3><label className="block text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-1.5">Next Follow-up Date</label><input type="date" value={formData.next_follow_up} onChange={(e) => setFormData(p => ({ ...p, next_follow_up: e.target.value }))} className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#115997]/20 focus:border-[#115997] outline-none transition-all" />{formData.next_follow_up && <div className="mt-3 bg-amber-50 rounded-xl p-3 flex items-center gap-2"><svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg><p className="text-xs text-amber-700 font-medium">Follow-up on {new Date(formData.next_follow_up).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</p></div>}</div>
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100"><h3 className="font-bold text-gray-900 mb-4 text-sm">Stats</h3><div className="space-y-3"><div className="flex items-center justify-between"><span className="text-sm text-gray-400">Emails</span><span className="text-sm font-bold text-gray-900 tabular-nums">{outreachLog.length}</span></div><div className="flex items-center justify-between"><span className="text-sm text-gray-400">SMS</span><span className="text-sm font-bold text-gray-900 tabular-nums">{activityLog.filter(a => a.action === 'sms_sent').length}</span></div><div className="flex items-center justify-between"><span className="text-sm text-gray-400">Lead Age</span><span className="text-sm font-bold text-gray-900 tabular-nums">{Math.floor((Date.now() - new Date(contact?.created_at)) / 864e5)}d</span></div></div></div>
          {hasPermission('delete_contacts') && <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-red-100"><button onClick={handleDelete} disabled={deleting} className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-red-600 bg-red-50 rounded-xl hover:bg-red-100 disabled:opacity-50 transition-all"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>{deleting ? 'Deleting...' : 'Delete Contact'}</button></div>}
        </div>
      </div>

      {/* Close/Lost Modal */}
      {showCloseModal && <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"><div className="bg-white rounded-2xl p-6 max-w-sm w-full animate-[fadeUp_0.2s_ease-out]"><h3 className="text-lg font-bold text-gray-900 mb-4">Why was this lead lost?</h3><div className="space-y-2 mb-6">{CLOSE_REASONS.map((r) => <button key={r} onClick={() => setCloseReason(r)} className={'w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all ' + (closeReason === r ? 'border-red-300 bg-red-50 text-red-700' : 'border-gray-200 text-gray-600 hover:bg-gray-50')}>{r}</button>)}</div><div className="flex gap-3"><button onClick={() => { setShowCloseModal(false); setCloseReason('') }} className="flex-1 px-4 py-2.5 text-sm font-semibold text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200">Cancel</button><button onClick={handleCloseLost} disabled={!closeReason} className="flex-1 px-4 py-2.5 text-sm font-semibold text-white bg-red-500 rounded-xl disabled:opacity-40 hover:bg-red-600">Mark Lost</button></div></div></div>}

      {/* SMS Modal */}
      {showSmsTemplates && <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4"><div className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto animate-[fadeUp_0.2s_ease-out]"><div className="flex items-center justify-between mb-4"><h3 className="text-lg font-bold text-gray-900">Send SMS</h3><button onClick={() => { setShowSmsTemplates(false); setSmsText('') }} className="text-gray-400 hover:text-gray-600"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button></div><p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-2">Quick templates</p><div className="flex flex-wrap gap-1.5 mb-4">{SMS_TEMPLATES.map((t) => <button key={t.label} onClick={() => setSmsText(t.text)} className="px-2.5 py-1.5 text-[11px] font-medium bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">{t.label}</button>)}</div><textarea value={smsText} onChange={(e) => setSmsText(e.target.value)} rows={4} placeholder="Type your message..." style={{ fontSize: '16px' }} className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#115997]/20 focus:border-[#115997] outline-none resize-none mb-1 transition-all" /><p className="text-xs text-gray-300 mb-4">{smsText.length}/160 · To: {formatPhone(contact?.phone)}</p><button onClick={handleCopyAndOpenMessages} disabled={!smsText} className="w-full px-4 py-3 text-sm font-semibold text-white bg-[#115997] rounded-xl hover:bg-[#0d4a7a] disabled:opacity-40 shadow-sm shadow-[#115997]/20 transition-all">Copy & Open Messages</button></div></div>}

      {/* Create Job Modal */}
      {showJobModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4" onClick={() => setShowJobModal(false)}>
          <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-md max-h-[85vh] overflow-y-auto animate-[fadeUp_0.2s_ease-out]" onClick={(e) => e.stopPropagation()}>
            <div className="p-5 border-b border-gray-100">
              <div className="w-8 h-1 bg-gray-300 rounded-full mx-auto mb-3 sm:hidden" />
              <div className="flex items-center justify-between">
                <div><h3 className="text-lg font-bold text-gray-900">Create Job</h3><p className="text-xs text-gray-400 mt-0.5">From: {contact?.name}</p></div>
                <button onClick={() => setShowJobModal(false)} className="text-gray-400 hover:text-gray-600 p-1"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
              </div>
            </div>
            <div className="p-5 space-y-4">
              <div><label className="block text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-1">Property Address *</label><input type="text" value={jobForm.address} onChange={(e) => setJobForm(p => ({ ...p, address: e.target.value }))} placeholder="Job site address" autoFocus style={{ fontSize: '16px' }} className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#115997]/20 focus:border-[#115997] outline-none transition-all" /></div>
              <div><label className="block text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-1">Client</label><input type="text" value={jobForm.client} onChange={(e) => setJobForm(p => ({ ...p, client: e.target.value }))} style={{ fontSize: '16px' }} className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#115997]/20 focus:border-[#115997] outline-none transition-all" /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="block text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-1">Start Date</label><input type="date" value={jobForm.date_start} onChange={(e) => setJobForm(p => ({ ...p, date_start: e.target.value }))} className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#115997]/20 focus:border-[#115997] outline-none transition-all" /></div>
                <div><label className="block text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-1">End Date</label><input type="date" value={jobForm.date_end} onChange={(e) => setJobForm(p => ({ ...p, date_end: e.target.value }))} className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#115997]/20 focus:border-[#115997] outline-none transition-all" /></div>
              </div>
              <div><label className="block text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-1">Service / Notes</label><input type="text" value={jobForm.notes} onChange={(e) => setJobForm(p => ({ ...p, notes: e.target.value }))} style={{ fontSize: '16px' }} className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#115997]/20 focus:border-[#115997] outline-none transition-all" /></div>

              {/* Crew assignment */}
              <div className="pt-3 border-t border-gray-100">
                <label className="block text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-2">Assign Crew</label>
                {jobForm.crew.length > 0 && <div className="space-y-1.5 mb-3">{jobForm.crew.map(c => (
                  <div key={c.user_id} className="flex items-center justify-between bg-[#F5F6F8] rounded-xl px-3 py-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg flex items-center justify-center shadow-sm" style={{ backgroundColor: c.color || '#115997' }}><span className="text-white text-[8px] font-bold">{c.name?.charAt(0)}</span></div>
                      <span className="text-sm font-medium text-gray-700">{c.name}</span>
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md ${c.role === 'lead' ? 'bg-purple-100 text-purple-700' : c.role === 'subcontractor' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-600'}`}>{c.role}</span>
                    </div>
                    <button onClick={() => removeCrewFromJobForm(c.user_id)} className="p-1 text-gray-300 hover:text-red-500 rounded"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
                  </div>
                ))}</div>}
                <div className="flex items-center gap-2">
                  <select value={addCrewUserId} onChange={(e) => setAddCrewUserId(e.target.value)} className="flex-1 px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#115997]/20 outline-none"><option value="">Select crew...</option>{allCrewUsers.filter(u => !jobForm.crew.some(c => c.user_id === u.id)).map(u => <option key={u.id} value={u.id}>{u.name}</option>)}</select>
                  <select value={addCrewRole} onChange={(e) => setAddCrewRole(e.target.value)} className="px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#115997]/20 outline-none w-24"><option value="crew">Crew</option><option value="lead">Lead</option><option value="subcontractor">Sub</option></select>
                  <button onClick={addCrewToJobForm} disabled={!addCrewUserId} className="px-3 py-2.5 bg-gray-100 text-gray-700 text-sm font-semibold rounded-xl hover:bg-gray-200 disabled:opacity-40">Add</button>
                </div>
              </div>
            </div>
            <div className="p-5 border-t border-gray-100 flex items-center gap-3">
              <button onClick={() => setShowJobModal(false)} className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors">Cancel</button>
              <button onClick={handleCreateJob} disabled={jobSaving || !jobForm.address.trim()} className="flex-1 py-3 bg-[#115997] text-white rounded-xl font-semibold hover:bg-[#0d4a7a] disabled:opacity-40 shadow-sm shadow-[#115997]/20 transition-all">{jobSaving ? 'Creating...' : 'Create Job'}</button>
            </div>
          </div>
        </div>
      )}

      <EmailComposer isOpen={composerOpen} onClose={() => setComposerOpen(false)} contact={contact} onSent={() => { fetchOutreach(); fetchContact(); fetchActivity() }} />

      {/* Help Modal */}
      {showHelp && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4" onClick={() => setShowHelp(false)}>
          <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-lg max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-5 border-b border-gray-100">
              <div className="w-8 h-1 bg-gray-300 rounded-full mx-auto mb-3 sm:hidden" />
              <div className="flex items-center justify-between"><h3 className="text-lg font-bold text-gray-900">Contact Page Help</h3><button onClick={() => setShowHelp(false)} className="text-gray-400 hover:text-gray-600"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button></div>
            </div>
            <div className="p-5 space-y-5">
              <div><h4 className="text-sm font-bold text-gray-800 mb-1">Quick actions</h4><p className="text-sm text-gray-500 leading-relaxed">Call the customer, create a job from this contact, send a text using templates, or compose an email. Each opens right from this page.</p></div>
              <div><h4 className="text-sm font-bold text-gray-800 mb-1">Create Job</h4><p className="text-sm text-gray-500 leading-relaxed">Tap the amber Job button to create a job pre-filled with this contact{"'"}s address, name, and service type. You can assign crew directly in the modal.</p></div>
              <div><h4 className="text-sm font-bold text-gray-800 mb-1">Status</h4><p className="text-sm text-gray-500 leading-relaxed">Change the pipeline status using the pills. Moving to "Lost" asks for a reason. The recommended action updates based on status.</p></div>
              <div><h4 className="text-sm font-bold text-gray-800 mb-1">Scheduling</h4><p className="text-sm text-gray-500 leading-relaxed">Set a date and time for estimates or jobs. This makes the contact show up on the Calendar.</p></div>
              <div><h4 className="text-sm font-bold text-gray-800 mb-1">Remember to save</h4><p className="text-sm text-gray-500 leading-relaxed">After editing fields, tap the blue Save button at the top right.</p></div>
            </div>
            <div className="p-5 border-t border-gray-100"><button onClick={() => setShowHelp(false)} className="w-full py-3 bg-[#115997] text-white rounded-xl font-semibold hover:bg-[#0d4a7a] transition-colors">Got it</button></div>
          </div>
        </div>
      )}
    </div>
  )
}