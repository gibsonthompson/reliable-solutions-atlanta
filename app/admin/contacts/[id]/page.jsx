'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import EmailComposer from '../../components/EmailComposer'
import { useAdminAuth } from '../../layout'

const STATUS_OPTIONS = [
  { value: 'new', label: 'New', color: 'bg-blue-100 text-blue-700 border-blue-300' },
  { value: 'contacted', label: 'Contacted', color: 'bg-yellow-100 text-yellow-700 border-yellow-300' },
  { value: 'estimate_scheduled', label: 'Est. Scheduled', color: 'bg-indigo-100 text-indigo-700 border-indigo-300' },
  { value: 'job_booked', label: 'Job Booked', color: 'bg-emerald-100 text-emerald-700 border-emerald-300' },
  { value: 'in_progress', label: 'In Progress', color: 'bg-orange-100 text-orange-700 border-orange-300' },
  { value: 'completed', label: 'Completed', color: 'bg-green-100 text-green-700 border-green-300' },
  { value: 'closed_lost', label: 'Closed/Lost', color: 'bg-red-100 text-red-700 border-red-300' },
]
const CLOSE_REASONS = ['Too expensive', 'Went with competitor', 'No response', 'Not ready yet', 'DIY', 'Other']
const SMS_TEMPLATES = [
  { label: 'On my way', text: "Hey {name}, we're on our way! Should be there in about 20 minutes. - RSA Team" },
  { label: 'Running late', text: "Hey {name}, we're running a bit behind today. Should be there within the hour. Sorry for the delay! - RSA Team" },
  { label: 'Estimate reminder', text: "Hey {name}, just a reminder we have your free inspection scheduled for {date}. We'll arrive between 8-9am. See you then! - RSA Team" },
  { label: 'Estimate ready', text: "Hey {name}, thanks for meeting with us today. I'll have your estimate ready by tomorrow. - RSA Team" },
  { label: 'Job scheduled', text: "Hey {name}, your {service} job is confirmed for {date}. We'll arrive between 8-9am. Call us if anything changes: 770-895-2039 - RSA Team" },
  { label: 'Job reminder', text: "Hey {name}, just a reminder your {service} job starts {date}. Please make sure the work area is accessible. See you then! - RSA Team" },
  { label: 'Reschedule', text: "Hey {name}, we need to reschedule your {service} appointment. Can you give us a call at 770-895-2039 so we can find a new time? Sorry for the inconvenience. - RSA Team" },
  { label: 'Follow up', text: "Hey {name}, just checking in on your {service} project. Still interested in moving forward? Happy to answer any questions. 770-895-2039 - RSA Team" },
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

  useEffect(() => { if (contactId && user) { fetchContact(); fetchOutreach(); fetchActivity(); if (user.role === 'admin') fetchUsers() } }, [contactId, user])

  const fetchContact = async () => { try { const r = await fetch('/api/contact'); const res = await r.json(); if (res.data) { const f = res.data.find(s => s.id === contactId); if (f) { setContact(f); setFormData({ name: f.name||'', email: f.email||'', phone: f.phone||'', service_type: f.service_type||'', message: f.message||'', status: f.status||'new', notes: f.notes||'', next_follow_up: f.next_follow_up||'', scheduled_date: f.scheduled_date||'', scheduled_time: f.scheduled_time||'', address: f.address||'', assigned_to: f.assigned_to||'' }) } else setError('Contact not found') } } catch(e) { setError('Failed to load') } finally { setLoading(false) } }
  const fetchOutreach = async () => { try { const r = await fetch('/api/admin/outreach?contact_id='+contactId); const d = await r.json(); if (d.outreach) setOutreachLog(d.outreach) } catch(e) {} }
  const fetchActivity = async () => { try { const r = await fetch('/api/admin/activity?contact_id='+contactId); const d = await r.json(); if (d.activity) setActivityLog(d.activity) } catch(e) {} }
  const fetchUsers = async () => { try { const r = await fetch('/api/admin/users'); const d = await r.json(); if (d.users) setTeamUsers(d.users.filter(u => u.is_active)) } catch(e) {} }

  const handleSave = async () => { setSaving(true); setError(''); setSuccessMsg(''); try { const r = await fetch('/api/contact', { method:'PATCH', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ id:contactId, status:formData.status, notes:formData.notes, next_follow_up:formData.next_follow_up||null, scheduled_date:formData.scheduled_date||null, scheduled_time:formData.scheduled_time||null, address:formData.address||null, assigned_to:formData.assigned_to||null }) }); if (r.ok) { setSuccessMsg('Saved'); fetchContact(); fetchActivity(); setTimeout(()=>setSuccessMsg(''),3000) } else setError('Failed to save') } catch(e) { setError('Failed to save') } finally { setSaving(false) } }
  const handleStatusChange = async (newStatus) => { if (newStatus==='closed_lost') { setShowCloseModal(true); return } const old=formData.status; setFormData(p=>({...p,status:newStatus})); try { await fetch('/api/contact',{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:contactId,status:newStatus})}); await fetch('/api/admin/activity',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({contact_id:contactId,action:'status_change',old_value:old,new_value:newStatus,user_id:user?.id})}); setSuccessMsg('Status updated'); fetchActivity(); setTimeout(()=>setSuccessMsg(''),2000) } catch(e) {} }
  const handleCloseLost = async () => { const old=formData.status; setFormData(p=>({...p,status:'closed_lost'})); setShowCloseModal(false); try { await fetch('/api/contact',{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:contactId,status:'closed_lost',close_reason:closeReason})}); await fetch('/api/admin/activity',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({contact_id:contactId,action:'status_change',old_value:old,new_value:'closed_lost',note:'Reason: '+closeReason,user_id:user?.id})}); setSuccessMsg('Marked as lost'); fetchActivity(); setTimeout(()=>setSuccessMsg(''),2000) } catch(e) {} }
  const handleDelete = async () => { if(!confirm('Delete this contact permanently?'))return; setDeleting(true); try{await fetch('/api/admin/outreach',{method:'DELETE',headers:{'Content-Type':'application/json'},body:JSON.stringify({contact_id:contactId})});router.push('/admin/contacts')}catch(e){setError('Failed to delete');setDeleting(false)}}

  const resolveVariables = (text) => text.replace(/\{name\}/g, contact.name.split(' ')[0]).replace(/\{service\}/g, contact.service_type).replace(/\{date\}/g, formData.scheduled_date ? new Date(formData.scheduled_date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }) : 'TBD')
  const handleCopyAndOpenMessages = async () => { const resolved = resolveVariables(smsText); try { await navigator.clipboard.writeText(resolved) } catch (e) {}; setSuccessMsg('Copied! Opening Messages...'); setShowSmsTemplates(false); setSmsText(''); setTimeout(() => { window.location.href = 'sms:' + contact.phone }, 300); setTimeout(() => setSuccessMsg(''), 3000) }

  const formatPhone = (p) => { if(!p)return''; const c=p.replace(/\D/g,''); if(c.length===10)return'('+c.slice(0,3)+') '+c.slice(3,6)+'-'+c.slice(6); if(c.length===11&&c[0]==='1')return'('+c.slice(1,4)+') '+c.slice(4,7)+'-'+c.slice(7); return p }
  const formatDate = (d) => new Date(d).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric',hour:'numeric',minute:'2-digit'})
  const timeAgo = (d) => { const s=Math.floor((Date.now()-new Date(d))/1000); if(s<60)return'just now'; if(s<3600)return Math.floor(s/60)+'m ago'; if(s<86400)return Math.floor(s/3600)+'h ago'; if(s<604800)return Math.floor(s/86400)+'d ago'; return formatDate(d) }
  const getRecommendedAction = () => { if(!contact)return null; const h=(Date.now()-new Date(contact.created_at))/36e5; if(formData.status==='new'&&h>0.5)return{text:'Call this lead ASAP — '+Math.floor(h)+'h old',urgency:h>24?'high':'medium'}; if(formData.status==='contacted')return{text:'Schedule an estimate for this lead',urgency:h>72?'high':'medium'}; if(formData.status==='estimate_scheduled')return{text:'Follow up — ready to book the job?',urgency:'medium'}; if(formData.status==='completed')return{text:'Send a review request to this customer',urgency:'low'}; return null }
  const rec = getRecommendedAction()

  if (loading) return <div className="flex items-center justify-center min-h-[50vh]"><div className="w-10 h-10 border-4 border-[#115997] border-t-transparent rounded-full animate-spin" /></div>
  if (error && !contact) return <div className="px-4 py-8 text-center"><p className="text-gray-500 mb-4">{error}</p><Link href="/admin/contacts" className="text-[#115997] font-medium text-sm">Back</Link></div>

  return (
    <div className="px-4 py-4 sm:py-8">
      <div className="mb-6">
        <Link href="/admin/contacts" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-[#115997] mb-4"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>Back to Requests</Link>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0"><h1 className="text-xl sm:text-2xl font-bold text-[#273373] truncate">{contact?.name}</h1><p className="text-sm text-gray-500">{contact?.service_type} · {timeAgo(contact?.created_at)}</p></div>
          <button onClick={handleSave} disabled={saving} className="px-3 sm:px-4 py-2 bg-[#115997] text-white text-sm font-medium rounded-xl hover:bg-[#273373] disabled:opacity-50 flex-shrink-0">{saving?'Saving...':'Save'}</button>
        </div>
      </div>

      {successMsg && <div className="mb-4 rounded-xl p-3 text-sm bg-green-50 border border-green-200 text-green-700 flex items-center gap-2"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>{successMsg}</div>}
      {error && contact && <div className="mb-4 rounded-xl p-3 text-sm bg-red-50 border border-red-200 text-red-700">{error}</div>}
      {rec && <div className={'mb-4 sm:mb-6 rounded-xl p-3 sm:p-4 flex items-center gap-2 '+(rec.urgency==='high'?'bg-amber-50 border border-amber-200':'bg-blue-50 border border-blue-200')}>{rec.urgency==='high'&&<div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse flex-shrink-0" />}<p className={'text-sm font-medium '+(rec.urgency==='high'?'text-amber-800':'text-blue-800')}>{rec.text}</p></div>}

      <div className="flex gap-2 mb-6 sm:mb-8">
        <button onClick={()=>window.location.href='tel:'+contact.phone} className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-500 text-white rounded-xl font-medium text-sm hover:bg-green-600"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>Call</button>
        {hasPermission('sms') && <button onClick={()=>setShowSmsTemplates(true)} className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#115997] text-white rounded-xl font-medium text-sm hover:bg-[#273373]"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>Text</button>}
        {hasPermission('email') && <button onClick={()=>setComposerOpen(true)} className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-purple-500 text-white rounded-xl font-medium text-sm hover:bg-purple-600"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>Email</button>}
      </div>

      <div className="mb-6 sm:mb-8"><p className="text-xs text-gray-500 mb-2">Pipeline Stage</p><div className="flex flex-wrap gap-2">{STATUS_OPTIONS.map((s)=><button key={s.value} onClick={()=>handleStatusChange(s.value)} className={'px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all active:scale-95 border '+(formData.status===s.value?s.color+' ring-2 ring-offset-1 ring-gray-300':'bg-gray-50 text-gray-500 border-gray-200')}>{s.label}</button>)}</div></div>

      <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
            <h3 className="font-semibold text-gray-800 mb-4 text-sm sm:text-base">Contact Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-gray-50 rounded-lg p-3"><p className="text-xs text-gray-500 mb-0.5">Name</p><p className="font-medium text-gray-900 text-sm">{contact?.name}</p></div>
              <div className="bg-gray-50 rounded-lg p-3"><p className="text-xs text-gray-500 mb-0.5">Service</p><p className="font-medium text-gray-900 text-sm">{contact?.service_type}</p></div>
              <div className="bg-gray-50 rounded-lg p-3"><p className="text-xs text-gray-500 mb-0.5">Phone</p><button onClick={()=>window.location.href='tel:'+contact.phone} className="font-medium text-[#115997] text-sm">{formatPhone(contact?.phone)}</button></div>
              <div className="bg-gray-50 rounded-lg p-3"><p className="text-xs text-gray-500 mb-0.5">Email</p><button onClick={()=>window.location.href='mailto:'+contact.email} className="font-medium text-[#115997] text-sm break-all text-left">{contact?.email}</button></div>
            </div>
            <div className="mt-4"><label className="block text-xs text-gray-500 mb-1.5">Property Address</label><input type="text" value={formData.address} onChange={(e)=>setFormData(p=>({...p,address:e.target.value}))} placeholder="Enter property address..." className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#115997] outline-none" /></div>
            {user?.role === 'admin' && (
              <div className="mt-4">
                <label className="block text-xs text-gray-500 mb-1.5">Assigned To</label>
                <select value={formData.assigned_to} onChange={(e) => setFormData(p => ({ ...p, assigned_to: e.target.value }))} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#115997] outline-none bg-white">
                  <option value="">Unassigned</option>
                  {teamUsers.map(u => <option key={u.id} value={u.id}>{u.name} (@{u.username})</option>)}
                </select>
              </div>
            )}
            {contact?.message && <div className="mt-4"><p className="text-xs text-gray-500 mb-1.5">Original Message</p><p className="text-sm text-gray-700 bg-gray-50 rounded-lg p-3">{contact.message}</p></div>}
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6"><h3 className="font-semibold text-gray-800 mb-4 text-sm sm:text-base">Scheduling</h3><div className="grid grid-cols-1 sm:grid-cols-2 gap-3"><div><label className="block text-xs text-gray-500 mb-1.5">Date</label><input type="date" value={formData.scheduled_date} onChange={(e)=>setFormData(p=>({...p,scheduled_date:e.target.value}))} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#115997] outline-none" /></div><div><label className="block text-xs text-gray-500 mb-1.5">Time</label><select value={formData.scheduled_time} onChange={(e)=>setFormData(p=>({...p,scheduled_time:e.target.value}))} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#115997] outline-none bg-white"><option value="">Select time...</option><option value="8:00 AM - 9:00 AM">8:00 AM - 9:00 AM</option><option value="9:00 AM - 10:00 AM">9:00 AM - 10:00 AM</option><option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option><option value="11:00 AM - 12:00 PM">11:00 AM - 12:00 PM</option><option value="12:00 PM - 1:00 PM">12:00 PM - 1:00 PM</option><option value="1:00 PM - 2:00 PM">1:00 PM - 2:00 PM</option><option value="2:00 PM - 3:00 PM">2:00 PM - 3:00 PM</option><option value="3:00 PM - 4:00 PM">3:00 PM - 4:00 PM</option><option value="4:00 PM - 5:00 PM">4:00 PM - 5:00 PM</option></select></div></div></div>
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6"><h3 className="font-semibold text-gray-800 mb-4 text-sm sm:text-base">Internal Notes</h3><textarea value={formData.notes} onChange={(e)=>setFormData(p=>({...p,notes:e.target.value}))} rows={4} placeholder="Add notes..." className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#115997] outline-none resize-none text-sm" /></div>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-4 sm:px-6 py-3 border-b border-gray-100"><h3 className="font-semibold text-gray-800 text-sm sm:text-base">Activity Timeline <span className="text-gray-400 font-normal text-sm">({activityLog.length+outreachLog.length})</span></h3></div>
            {(activityLog.length+outreachLog.length)===0?<div className="p-8 text-center"><p className="text-gray-400 text-sm">No activity yet</p></div>:(
              <div className="divide-y divide-gray-100">
                {[...activityLog.map(a=>({...a,type:'activity'})),...outreachLog.map(o=>({...o,type:'outreach'}))].sort((a,b)=>new Date(b.created_at)-new Date(a.created_at)).map((entry)=>(
                  <div key={entry.id} className="p-4 sm:px-6"><div className="flex items-start gap-3"><div className={'w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 '+(entry.type==='outreach'?'bg-purple-100':entry.action==='sms_sent'?'bg-green-100':'bg-blue-100')}><svg className={'w-3.5 h-3.5 '+(entry.type==='outreach'?'text-purple-600':entry.action==='sms_sent'?'text-green-600':'text-blue-600')} fill="none" stroke="currentColor" viewBox="0 0 24 24">{entry.type==='outreach'?<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />:<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />}</svg></div><div className="flex-1 min-w-0">{entry.type==='outreach'?<><p className="text-sm font-medium text-gray-900">Email: {entry.subject||'No subject'}</p>{entry.body&&<p className="text-xs text-gray-500 mt-1 line-clamp-2">{entry.body.substring(0,150)}...</p>}</>:entry.action==='status_change'?<><p className="text-sm text-gray-900">Status: <span className="font-medium">{entry.old_value}</span> → <span className="font-medium">{entry.new_value}</span></p>{entry.note&&<p className="text-xs text-gray-500 mt-0.5">{entry.note}</p>}</>:entry.action==='sms_sent'?<><p className="text-sm font-medium text-gray-900">SMS sent</p>{entry.note&&<p className="text-xs text-gray-500 mt-1 line-clamp-2">{entry.note}</p>}</>:<p className="text-sm text-gray-900">{entry.action}{entry.note?': '+entry.note:''}</p>}<p className="text-xs text-gray-400 mt-1">{timeAgo(entry.created_at)}</p></div></div></div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="space-y-4 sm:space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6"><h3 className="font-semibold text-gray-800 mb-4 text-sm sm:text-base">Follow-up</h3><label className="block text-xs text-gray-500 mb-1.5">Next Follow-up Date</label><input type="date" value={formData.next_follow_up} onChange={(e)=>setFormData(p=>({...p,next_follow_up:e.target.value}))} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#115997] outline-none" />{formData.next_follow_up&&<div className="mt-3 bg-amber-50 rounded-lg p-3 flex items-center gap-2"><svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg><p className="text-xs text-amber-700">Follow-up on {new Date(formData.next_follow_up).toLocaleDateString('en-US',{weekday:'short',month:'short',day:'numeric'})}</p></div>}</div>
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6"><h3 className="font-semibold text-gray-800 mb-4 text-sm sm:text-base">Activity</h3><div className="space-y-3"><div className="flex items-center justify-between"><span className="text-sm text-gray-500">Emails Sent</span><span className="text-sm font-semibold text-gray-800">{outreachLog.length}</span></div><div className="flex items-center justify-between"><span className="text-sm text-gray-500">SMS Sent</span><span className="text-sm font-semibold text-gray-800">{activityLog.filter(a=>a.action==='sms_sent').length}</span></div><div className="flex items-center justify-between"><span className="text-sm text-gray-500">Lead Age</span><span className="text-sm font-semibold text-gray-800">{Math.floor((Date.now()-new Date(contact?.created_at))/864e5)}d</span></div></div></div>
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6"><h3 className="font-semibold text-gray-800 mb-4 text-sm sm:text-base">Timestamps</h3><div className="space-y-2 text-sm"><div className="flex justify-between"><span className="text-gray-500">Created</span><span className="text-gray-800">{contact?.created_at?formatDate(contact.created_at):'—'}</span></div><div className="flex justify-between"><span className="text-gray-500">Updated</span><span className="text-gray-800">{contact?.updated_at?formatDate(contact.updated_at):'—'}</span></div></div></div>
          {hasPermission('delete_contacts') && <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-red-100"><button onClick={handleDelete} disabled={deleting} className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 disabled:opacity-50"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>{deleting?'Deleting...':'Delete Contact'}</button></div>}
        </div>
      </div>

      {showCloseModal && <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"><div className="bg-white rounded-2xl p-6 max-w-sm w-full"><h3 className="text-lg font-bold text-gray-900 mb-4">Why was this lead lost?</h3><div className="space-y-2 mb-6">{CLOSE_REASONS.map((r)=><button key={r} onClick={()=>setCloseReason(r)} className={'w-full text-left px-4 py-3 rounded-lg border text-sm transition-all '+(closeReason===r?'border-red-300 bg-red-50 text-red-700 font-medium':'border-gray-200 text-gray-700 hover:bg-gray-50')}>{r}</button>)}</div><div className="flex gap-3"><button onClick={()=>{setShowCloseModal(false);setCloseReason('')}} className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg">Cancel</button><button onClick={handleCloseLost} disabled={!closeReason} className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-red-500 rounded-lg disabled:opacity-50">Mark as Lost</button></div></div></div>}

      {showSmsTemplates && <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4"><div className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto"><div className="flex items-center justify-between mb-4"><h3 className="text-lg font-bold text-gray-900">Send SMS</h3><button onClick={()=>{setShowSmsTemplates(false);setSmsText('')}} className="text-gray-400 hover:text-gray-600"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button></div><p className="text-xs text-gray-500 mb-2">Quick templates</p><div className="flex flex-wrap gap-2 mb-4">{SMS_TEMPLATES.map((t)=><button key={t.label} onClick={()=>setSmsText(t.text)} className="px-3 py-1.5 text-xs font-medium bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200">{t.label}</button>)}</div><textarea value={smsText} onChange={(e)=>setSmsText(e.target.value)} rows={4} placeholder="Type your message..." className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#115997] outline-none resize-none mb-1" /><p className="text-xs text-gray-400 mb-4">{smsText.length}/160 · To: {formatPhone(contact?.phone)}</p><button onClick={handleCopyAndOpenMessages} disabled={!smsText} className="w-full px-4 py-2.5 text-sm font-medium text-white bg-[#115997] rounded-lg hover:bg-[#273373] disabled:opacity-50">Copy & Open Messages</button></div></div>}

      <EmailComposer isOpen={composerOpen} onClose={()=>setComposerOpen(false)} contact={contact} onSent={()=>{fetchOutreach();fetchContact();fetchActivity()}} />
    </div>
  )
}