'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import EmailComposer from '../../components/EmailComposer'

const STATUS_OPTIONS = [
  { value: 'new', label: 'New', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  { value: 'contacted', label: 'Contacted', color: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
  { value: 'responded', label: 'Responded', color: 'bg-green-50 text-green-700 border-green-200' },
  { value: 'meeting_set', label: 'Meeting Set', color: 'bg-purple-50 text-purple-700 border-purple-200' },
  { value: 'partner', label: 'Partner', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  { value: 'not_interested', label: 'Not Interested', color: 'bg-gray-100 text-gray-500 border-gray-200' },
]
const SOURCE_OPTIONS = [{ value: 'csv_import', label: 'CSV Import' }, { value: 'linkedin', label: 'LinkedIn' }, { value: 'google', label: 'Google Search' }, { value: 'realtor_com', label: 'Realtor.com' }, { value: 'zillow', label: 'Zillow' }, { value: 'referral', label: 'Referral' }, { value: 'manual', label: 'Manual' }, { value: 'other', label: 'Other' }]
const SMS_TEMPLATES = [
  { label: 'Intro', text: "Hey {name}, this is Alex from Reliable Solutions Atlanta. We help realtors close deals faster by handling foundation and crawl space issues before they show up on inspections. Would love to be a resource for your clients. 770-895-2039" },
  { label: 'Follow up', text: "Hey {name}, just following up. If any of your listings or buyers run into crawl space or foundation concerns, we do free same-week assessments. Happy to help. 770-895-2039 - Alex, RSA" },
  { label: 'Thank you', text: "Hey {name}, thanks for the referral! We'll take great care of your client. Let me know if anything else comes up. 770-895-2039 - Alex, RSA" },
]

export default function ProspectDetailPage() {
  const params = useParams(); const router = useRouter(); const prospectId = params.id
  const [prospect, setProspect] = useState(null)
  const [outreachLog, setOutreachLog] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')
  const [error, setError] = useState('')
  const [composerOpen, setComposerOpen] = useState(false)
  const [showSmsModal, setShowSmsModal] = useState(false)
  const [smsText, setSmsText] = useState('')
  const [sendingSms, setSendingSms] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', brokerage: '', area: '', source: 'manual', status: 'new', notes: '', next_follow_up: '' })

  useEffect(() => { if (prospectId) { fetchProspect(); fetchOutreach() } }, [prospectId])
  const fetchProspect = async () => { try { const r = await fetch('/api/admin/prospects'); const d = await r.json(); if (d.prospects) { const f = d.prospects.find(p => p.id === prospectId); if (f) { setProspect(f); setFormData({ name: f.name||'', email: f.email||'', phone: f.phone||'', brokerage: f.brokerage||'', area: f.area||'', source: f.source||'manual', status: f.status||'new', notes: f.notes||'', next_follow_up: f.next_follow_up||'' }) } else setError('Lead not found') } } catch(e) { setError('Failed to load') } finally { setLoading(false) } }
  const fetchOutreach = async () => { try { const r = await fetch('/api/admin/outreach?prospect_id='+prospectId); const d = await r.json(); if (d.outreach) setOutreachLog(d.outreach) } catch(e) {} }

  const handleSave = async () => { setSaving(true); setError(''); setSuccessMsg(''); try { const r = await fetch('/api/admin/prospects', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: prospectId, ...formData, next_follow_up: formData.next_follow_up || null }) }); if (r.ok) { setSuccessMsg('Saved'); fetchProspect(); setTimeout(() => setSuccessMsg(''), 3000) } else setError('Failed') } catch(e) { setError('Failed') } finally { setSaving(false) } }
  const handleStatusChange = async (newStatus) => { setFormData(p => ({ ...p, status: newStatus })); try { await fetch('/api/admin/prospects', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: prospectId, status: newStatus }) }); setSuccessMsg('Status updated'); setTimeout(() => setSuccessMsg(''), 2000) } catch(e) {} }
  const handleDelete = async () => { if (!confirm('Delete permanently?')) return; setDeleting(true); try { await fetch('/api/admin/prospects', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: prospectId }) }); router.push('/admin/prospects') } catch(e) { setError('Failed'); setDeleting(false) } }

  const handleSendSms = async (text) => {
    if (!prospect?.phone) return; setSendingSms(true)
    try { const r = await fetch('/api/admin/sms', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ prospect_id: prospectId, phone: prospect.phone, text: text.replace('{name}', prospect.name.split(' ')[0]) }) }); if (r.ok) { setSuccessMsg('SMS sent'); setShowSmsModal(false); setSmsText(''); setTimeout(() => setSuccessMsg(''), 2000) } else setError('Failed') } catch(e) { setError('Failed') } finally { setSendingSms(false) }
  }

  const formatPhone = (p) => { if (!p) return ''; const c = p.replace(/\D/g, ''); if (c.length === 10) return '(' + c.slice(0,3) + ') ' + c.slice(3,6) + '-' + c.slice(6); if (c.length === 11 && c[0] === '1') return '(' + c.slice(1,4) + ') ' + c.slice(4,7) + '-' + c.slice(7); return p }
  const formatDate = (d) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' })
  const timeAgo = (d) => { const s = Math.floor((Date.now() - new Date(d)) / 1000); if (s < 60) return 'just now'; if (s < 3600) return Math.floor(s/60) + 'm ago'; if (s < 86400) return Math.floor(s/3600) + 'h ago'; if (s < 604800) return Math.floor(s/86400) + 'd ago'; return formatDate(d) }
  const getRecommendedAction = () => { if (!prospect) return null; const h = (Date.now() - new Date(prospect.created_at)) / 36e5; if (formData.status === 'new' && outreachLog.length === 0) return { text: 'Send initial outreach', urgency: h > 48 ? 'high' : 'medium' }; if (formData.status === 'new' && outreachLog.length > 0) return { text: 'Update status to Contacted', urgency: 'low' }; if (formData.status === 'contacted' && h > 120) return { text: 'Follow up — 5+ days since contact', urgency: 'high' }; if (formData.status === 'responded') return { text: 'Schedule a meeting', urgency: 'medium' }; return null }
  const rec = getRecommendedAction()
  const composerContact = prospect ? { id: prospect.id, name: prospect.name, email: prospect.email || '', phone: prospect.phone || '', service_type: 'Realtor Partnership' } : null
  const canSendEmail = Boolean(formData.email && formData.email.includes('@'))
  const canSendSms = Boolean(formData.phone)

  if (loading) return <div className="flex items-center justify-center min-h-[50vh]"><div className="flex flex-col items-center gap-3"><div className="w-10 h-10 border-4 border-[#115997] border-t-transparent rounded-full animate-spin" /><p className="text-sm text-gray-400 animate-pulse">Loading...</p></div></div>
  if (error && !prospect) return <div className="px-4 py-8 text-center"><p className="text-gray-400 mb-4">{error}</p><Link href="/admin/prospects" className="text-[#115997] font-semibold text-sm">← Back</Link></div>

  return (
    <div className="px-4 py-5 sm:py-8">
      <div className="mb-6 animate-[fadeUp_0.3s_ease-out]">
        <Link href="/admin/prospects" className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-[#115997] mb-4 transition-colors"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>Back</Link>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0"><h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight truncate">{prospect?.name}</h1><p className="text-sm text-gray-400 mt-0.5">{prospect?.brokerage || 'No company'} · Added {timeAgo(prospect?.created_at)}</p></div>
          <button onClick={handleSave} disabled={saving} className="px-4 py-2 bg-[#115997] text-white text-sm font-semibold rounded-xl hover:bg-[#0d4a7a] disabled:opacity-40 shadow-sm shadow-[#115997]/20 transition-all active:scale-[0.97] flex-shrink-0">{saving ? 'Saving...' : 'Save'}</button>
        </div>
      </div>

      {successMsg && <div className="mb-4 rounded-xl p-3 text-sm bg-green-50 border border-green-200 text-green-700 flex items-center gap-2 animate-[fadeUp_0.2s_ease-out]"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>{successMsg}</div>}
      {rec && <div className={'mb-5 rounded-xl p-3.5 flex items-center gap-3 animate-[fadeUp_0.35s_ease-out] ' + (rec.urgency === 'high' ? 'bg-amber-50 border border-amber-200' : 'bg-blue-50 border border-blue-200')}>{rec.urgency === 'high' && <div className="w-2.5 h-2.5 bg-amber-500 rounded-full animate-pulse flex-shrink-0" />}<p className={'text-sm font-semibold ' + (rec.urgency === 'high' ? 'text-amber-800' : 'text-blue-800')}>{rec.text}</p></div>}

      <div className="flex gap-2 mb-6 animate-[fadeUp_0.4s_ease-out]">
        <button onClick={() => setComposerOpen(true)} disabled={!canSendEmail} className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-purple-500 text-white rounded-xl font-semibold text-sm hover:bg-purple-600 disabled:opacity-40 shadow-sm shadow-purple-500/20 transition-all active:scale-[0.97]"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>Email</button>
        <button onClick={() => setShowSmsModal(true)} disabled={!canSendSms} className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#115997] text-white rounded-xl font-semibold text-sm hover:bg-[#0d4a7a] disabled:opacity-40 shadow-sm shadow-[#115997]/20 transition-all active:scale-[0.97]"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>Text</button>
        {formData.phone && <button onClick={() => window.location.href = 'tel:' + prospect.phone} className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-500 text-white rounded-xl font-semibold text-sm hover:bg-green-600 shadow-sm shadow-green-500/20 transition-all active:scale-[0.97]"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>Call</button>}
      </div>

      <div className="mb-6 animate-[fadeUp_0.45s_ease-out]"><p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-2">Pipeline Stage</p><div className="flex flex-wrap gap-2">{STATUS_OPTIONS.map((s) => <button key={s.value} onClick={() => handleStatusChange(s.value)} className={'px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-150 active:scale-95 border ' + (formData.status === s.value ? s.color + ' ring-2 ring-offset-1 ring-gray-300' : 'bg-white text-gray-400 border-gray-200 hover:border-gray-300')}>{s.label}</button>)}</div></div>

      <div className="grid gap-4 sm:gap-5 lg:grid-cols-3 animate-[fadeUp_0.5s_ease-out]">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-4 text-sm">Lead Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div><label className="block text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-1.5">Name *</label><input type="text" value={formData.name} onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))} className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#115997]/20 outline-none transition-all" /></div>
              <div><label className="block text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-1.5">Brokerage</label><input type="text" value={formData.brokerage} onChange={(e) => setFormData(p => ({ ...p, brokerage: e.target.value }))} placeholder="e.g., Keller Williams" className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#115997]/20 outline-none transition-all" /></div>
              <div><label className="block text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-1.5">Email</label><input type="email" value={formData.email} onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))} className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#115997]/20 outline-none transition-all" /></div>
              <div><label className="block text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-1.5">Phone</label><input type="tel" value={formData.phone} onChange={(e) => setFormData(p => ({ ...p, phone: e.target.value }))} className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#115997]/20 outline-none transition-all" /></div>
              <div><label className="block text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-1.5">Area</label><input type="text" value={formData.area} onChange={(e) => setFormData(p => ({ ...p, area: e.target.value }))} placeholder="e.g., Buckhead" className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#115997]/20 outline-none transition-all" /></div>
              <div><label className="block text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-1.5">Source</label><select value={formData.source} onChange={(e) => setFormData(p => ({ ...p, source: e.target.value }))} className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#115997]/20 outline-none transition-all">{SOURCE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}</select></div>
            </div>
            {!canSendEmail && !canSendSms && <p className="text-xs text-amber-600 mt-3 bg-amber-50 rounded-xl p-2.5">Add an email or phone to enable outreach</p>}
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100"><h3 className="font-bold text-gray-900 mb-4 text-sm">Internal Notes</h3><textarea value={formData.notes} onChange={(e) => setFormData(p => ({ ...p, notes: e.target.value }))} rows={4} placeholder="Notes about this lead..." className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#115997]/20 outline-none resize-none transition-all" /></div>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
            <div className="px-4 sm:px-6 py-3.5 border-b border-gray-100 flex items-center justify-between"><h3 className="font-bold text-gray-900 text-sm">Outreach History <span className="text-gray-300 font-normal ml-2">({outreachLog.length})</span></h3>{canSendEmail && <button onClick={() => setComposerOpen(true)} className="text-sm text-[#115997] font-semibold hover:underline">+ Email</button>}</div>
            {outreachLog.length === 0 ? <div className="p-8 text-center"><p className="text-gray-400 text-sm">No outreach yet</p></div> : (
              <div className="divide-y divide-gray-50">{outreachLog.map((entry) => (
                <div key={entry.id} className="p-4 sm:px-6 hover:bg-gray-50/50 transition-colors"><div className="flex items-center gap-2"><div className="w-8 h-8 bg-purple-50 rounded-xl flex items-center justify-center flex-shrink-0"><svg className="w-3.5 h-3.5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg></div><div><p className="font-semibold text-gray-900 text-sm">{entry.subject || 'Email sent'}</p><p className="text-[10px] text-gray-300">{timeAgo(entry.created_at)}</p></div></div>{entry.body && <p className="text-xs text-gray-400 mt-2 line-clamp-2 ml-10">{entry.body.substring(0, 150)}...</p>}</div>
              ))}</div>
            )}
          </div>
        </div>
        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100"><h3 className="font-bold text-gray-900 mb-4 text-sm">Follow-up</h3><label className="block text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-1.5">Next Date</label><input type="date" value={formData.next_follow_up} onChange={(e) => setFormData(p => ({ ...p, next_follow_up: e.target.value }))} className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#115997]/20 outline-none transition-all" />{formData.next_follow_up && <div className="mt-3 bg-amber-50 rounded-xl p-3 flex items-center gap-2"><svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg><p className="text-xs text-amber-700 font-medium">{new Date(formData.next_follow_up).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</p></div>}</div>
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100"><h3 className="font-bold text-gray-900 mb-4 text-sm">Activity</h3><div className="space-y-3"><div className="flex items-center justify-between"><span className="text-sm text-gray-400">Emails</span><span className="text-sm font-bold text-gray-900 tabular-nums">{outreachLog.length}</span></div><div className="flex items-center justify-between"><span className="text-sm text-gray-400">Last Contact</span><span className="text-sm font-bold text-gray-900">{outreachLog.length > 0 ? timeAgo(outreachLog[0].created_at) : 'Never'}</span></div><div className="flex items-center justify-between"><span className="text-sm text-gray-400">Added</span><span className="text-sm font-bold text-gray-900 tabular-nums">{Math.floor((Date.now() - new Date(prospect?.created_at)) / 864e5)}d ago</span></div></div></div>
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-red-100"><button onClick={handleDelete} disabled={deleting} className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-red-600 bg-red-50 rounded-xl hover:bg-red-100 disabled:opacity-50 transition-all"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>{deleting ? 'Deleting...' : 'Delete Lead'}</button></div>
        </div>
      </div>

      {showSmsModal && <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4"><div className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto animate-[fadeUp_0.2s_ease-out]"><div className="flex items-center justify-between mb-4"><h3 className="text-lg font-bold text-gray-900">Send SMS</h3><button onClick={() => { setShowSmsModal(false); setSmsText('') }} className="text-gray-400 hover:text-gray-600"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button></div><p className="text-[9px] text-gray-400 uppercase tracking-widest font-bold mb-2">Quick templates</p><div className="flex flex-wrap gap-2 mb-4">{SMS_TEMPLATES.map((t) => <button key={t.label} onClick={() => setSmsText(t.text)} className="px-3 py-1.5 text-xs font-semibold bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">{t.label}</button>)}</div><textarea value={smsText} onChange={(e) => setSmsText(e.target.value)} rows={4} placeholder="Type your message..." className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#115997]/20 outline-none resize-none mb-1 transition-all" /><p className="text-xs text-gray-300 mb-4">{smsText.length}/160 · To: {formatPhone(prospect?.phone)}</p><div className="flex gap-3"><button onClick={() => window.location.href = 'sms:' + prospect.phone} className="flex-1 px-4 py-2.5 text-sm font-semibold text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">Open Messages</button><button onClick={() => handleSendSms(smsText)} disabled={!smsText || sendingSms} className="flex-1 px-4 py-2.5 text-sm font-semibold text-white bg-[#115997] rounded-xl disabled:opacity-40 shadow-sm shadow-[#115997]/20 transition-all">{sendingSms ? 'Sending...' : 'Send via Telnyx'}</button></div></div></div>}

      <EmailComposer isOpen={composerOpen} onClose={() => setComposerOpen(false)} contact={composerContact} isProspect={true} onSent={() => { fetchOutreach(); fetchProspect() }} />
    </div>
  )
}