'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { useAdminAuth } from '../layout'

const CATEGORY_LABELS = { crew: 'Crew', customer: 'Customer', general: 'General' }
const CATEGORY_BADGE = { crew: 'bg-blue-100 text-blue-700', customer: 'bg-purple-100 text-purple-700', general: 'bg-gray-100 text-gray-600' }

export default function MessagingPage() {
  const { user, hasPermission } = useAdminAuth()

  const [mode, setMode] = useState('users') // 'users' or 'contacts'
  const [users, setUsers] = useState([])
  const [contacts, setContacts] = useState([])
  const [templates, setTemplates] = useState([])
  const [broadcasts, setBroadcasts] = useState([])
  const [loading, setLoading] = useState(true)

  const [selectedIds, setSelectedIds] = useState(new Set())
  const [search, setSearch] = useState('')
  const [messageBody, setMessageBody] = useState('')
  const [activeTemplateId, setActiveTemplateId] = useState(null)

  const [sending, setSending] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const [showTemplatesModal, setShowTemplatesModal] = useState(false)
  const [showHelp, setShowHelp] = useState(false)
  const [expandedBroadcast, setExpandedBroadcast] = useState(null)

  useEffect(() => {
    if (!hasPermission('messaging')) return
    fetchAll()
  }, [])

  // Reset selection when mode changes
  useEffect(() => { setSelectedIds(new Set()); setSearch('') }, [mode])

  const fetchAll = async () => {
    try {
      const [u, c, t, b] = await Promise.all([
        fetch('/api/admin/users').then(r => r.json()),
        fetch('/api/contact').then(r => r.json()),
        fetch('/api/admin/messaging/templates').then(r => r.json()),
        fetch('/api/admin/messaging/broadcasts').then(r => r.json()),
      ])
      setUsers(u.users || [])
      setContacts(c.data || [])
      setTemplates(t.templates || [])
      setBroadcasts(b.broadcasts || [])
    } catch (e) { console.error('Fetch failed:', e) }
    finally { setLoading(false) }
  }

  const fetchBroadcasts = async () => {
    try { const r = await fetch('/api/admin/messaging/broadcasts'); const d = await r.json(); setBroadcasts(d.broadcasts || []) } catch (e) {}
  }
  const fetchTemplates = async () => {
    try { const r = await fetch('/api/admin/messaging/templates'); const d = await r.json(); setTemplates(d.templates || []) } catch (e) {}
  }

  // Filter recipients based on mode + search
  const recipientList = useMemo(() => {
    if (mode === 'users') {
      return users
        .filter(u => u.is_active && u.phone)
        .filter(u => !search || u.name?.toLowerCase().includes(search.toLowerCase()) || u.phone?.includes(search))
    }
    return contacts
      .filter(c => c.phone)
      .filter(c => !search || c.name?.toLowerCase().includes(search.toLowerCase()) || c.phone?.includes(search) || c.service_type?.toLowerCase().includes(search.toLowerCase()))
      .slice(0, 200) // cap to keep UI responsive
  }, [mode, users, contacts, search])

  // Templates filtered by current mode's category
  const relevantTemplates = useMemo(() => {
    const cat = mode === 'users' ? 'crew' : 'customer'
    return templates.filter(t => t.category === cat || t.category === 'general')
  }, [mode, templates])

  const toggleRecipient = (id) => {
    const next = new Set(selectedIds)
    if (next.has(id)) next.delete(id); else next.add(id)
    setSelectedIds(next)
  }
  const selectAll = () => setSelectedIds(new Set(recipientList.map(r => r.id)))
  const selectNone = () => setSelectedIds(new Set())

  const pickTemplate = (template) => {
    setMessageBody(template.body)
    setActiveTemplateId(template.id)
  }

  // SMS segment calculation - GSM-7 basic, 160 chars per segment in single, 153 in multi
  const segmentInfo = useMemo(() => {
    const len = messageBody.length
    if (len === 0) return { len: 0, segments: 0 }
    if (len <= 160) return { len, segments: 1 }
    return { len, segments: Math.ceil(len / 153) }
  }, [messageBody])

  const selectedRecipients = useMemo(() => {
    return recipientList.filter(r => selectedIds.has(r.id))
  }, [recipientList, selectedIds])

  const canSend = selectedIds.size > 0 && messageBody.trim().length > 0 && !sending

  const handleSend = async () => {
    setSending(true); setErrorMsg(''); setSuccessMsg('')
    try {
      const recipients = selectedRecipients.map(r => mode === 'users'
        ? { user_id: r.id, phone: r.phone, name: r.name }
        : { contact_id: r.id, phone: r.phone, name: r.name }
      )
      const r = await fetch('/api/admin/messaging/broadcasts', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          body: messageBody,
          recipient_type: mode,
          recipients,
          template_id: activeTemplateId,
          sent_by: user?.id,
        }),
      })
      const data = await r.json()
      if (!r.ok) { setErrorMsg(data.error || 'Send failed'); return }
      const { sent, failed, total } = data.summary || {}
      setSuccessMsg(`Sent to ${sent} of ${total}${failed > 0 ? ` (${failed} failed)` : ''}`)
      setMessageBody(''); setActiveTemplateId(null); setSelectedIds(new Set()); setShowConfirm(false)
      fetchBroadcasts()
      setTimeout(() => setSuccessMsg(''), 6000)
    } catch (e) { setErrorMsg('Send failed: ' + (e.message || 'network error')) }
    finally { setSending(false) }
  }

  const formatPhone = (p) => { if (!p) return ''; const c = p.replace(/\D/g, ''); if (c.length === 10) return '(' + c.slice(0,3) + ') ' + c.slice(3,6) + '-' + c.slice(6); if (c.length === 11 && c[0] === '1') return '(' + c.slice(1,4) + ') ' + c.slice(4,7) + '-' + c.slice(7); return p }
  const formatWhen = (d) => { const s = Math.floor((Date.now() - new Date(d)) / 1000); if (s < 60) return 'just now'; if (s < 3600) return Math.floor(s/60) + 'm ago'; if (s < 86400) return Math.floor(s/3600) + 'h ago'; if (s < 604800) return Math.floor(s/86400) + 'd ago'; return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }

  if (!hasPermission('messaging')) return <div className="px-4 py-16 text-center"><p className="text-gray-400 font-medium">You don{"'"}t have permission to send messages</p></div>
  if (loading) return <div className="flex items-center justify-center min-h-[50vh]"><div className="flex flex-col items-center gap-3"><div className="w-10 h-10 border-4 border-[#115997] border-t-transparent rounded-full animate-spin" /><p className="text-sm text-gray-400 animate-pulse">Loading...</p></div></div>

  return (
    <div className="px-4 py-5 sm:py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-5 animate-[fadeUp_0.3s_ease-out]">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">Messaging</h2>
          <p className="text-gray-400 text-sm mt-0.5">{broadcasts.length} broadcast{broadcasts.length === 1 ? '' : 's'} sent</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setShowHelp(true)} className="px-2.5 py-2 text-gray-400 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:text-gray-600 transition-all"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.065 2.05-1.37 2.772-1.153.508.153.942.535 1.025 1.059.108.685-.378 1.232-.816 1.627-.39.354-.816.659-.816 1.267V13m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></button>
          <button onClick={() => setShowTemplatesModal(true)} className="px-3 py-2 text-xs font-semibold text-[#115997] bg-[#115997]/[0.06] rounded-lg hover:bg-[#115997]/[0.1] transition-all">Templates</button>
        </div>
      </div>

      {successMsg && <div className="mb-4 rounded-xl p-3 text-sm bg-green-50 border border-green-200 text-green-700 flex items-center gap-2 animate-[fadeUp_0.2s_ease-out]"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>{successMsg}</div>}
      {errorMsg && <div className="mb-4 rounded-xl p-3 text-sm bg-red-50 border border-red-200 text-red-700">{errorMsg}</div>}

      {/* Composer */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-5 animate-[fadeUp_0.35s_ease-out]">
        {/* Mode tabs */}
        <div className="border-b border-gray-100 px-4 sm:px-5 pt-4">
          <div className="flex gap-1">
            <button onClick={() => setMode('users')} className={'px-4 py-2.5 text-sm font-semibold rounded-t-lg transition-all ' + (mode === 'users' ? 'bg-[#115997]/[0.06] text-[#115997] border-b-2 border-[#115997]' : 'text-gray-400 hover:text-gray-600')}>Crew</button>
            <button onClick={() => setMode('contacts')} className={'px-4 py-2.5 text-sm font-semibold rounded-t-lg transition-all ' + (mode === 'contacts' ? 'bg-[#115997]/[0.06] text-[#115997] border-b-2 border-[#115997]' : 'text-gray-400 hover:text-gray-600')}>Customers</button>
          </div>
        </div>

        <div className="p-4 sm:p-5 space-y-4">
          {/* Recipients */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Recipients <span className="text-gray-300 ml-1">({selectedIds.size} selected)</span></label>
              <div className="flex items-center gap-2">
                <button onClick={selectAll} className="text-[11px] font-semibold text-[#115997] hover:underline">Select all</button>
                <span className="text-gray-200">·</span>
                <button onClick={selectNone} className="text-[11px] font-semibold text-gray-400 hover:underline">Clear</button>
              </div>
            </div>
            <div className="relative mb-2">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder={mode === 'users' ? 'Search crew...' : 'Search customers by name, phone, service...'} style={{ fontSize: '16px' }} className="w-full pl-9 pr-4 py-2.5 bg-[#F5F6F8] border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#115997]/20 focus:border-[#115997] outline-none transition-all" />
            </div>
            <div className="max-h-64 overflow-y-auto space-y-1 border border-gray-100 rounded-xl p-1.5 bg-[#F5F6F8]/40">
              {recipientList.length === 0 && (
                <div className="py-6 text-center"><p className="text-xs text-gray-400">{mode === 'users' ? 'No active crew with phone numbers. Add phones in the Users page.' : (search ? 'No customers match' : 'No customers found')}</p></div>
              )}
              {recipientList.map((r) => {
                const checked = selectedIds.has(r.id)
                return (
                  <button key={r.id} onClick={() => toggleRecipient(r.id)} className={'w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-all ' + (checked ? 'bg-[#115997]/[0.06] ring-1 ring-inset ring-[#115997]/20' : 'bg-white hover:bg-gray-50')}>
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={'w-4 h-4 rounded border-2 flex-shrink-0 flex items-center justify-center transition-all ' + (checked ? 'bg-[#115997] border-[#115997]' : 'border-gray-300')}>{checked && <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}</div>
                      <div className="min-w-0">
                        <p className={'text-sm font-semibold truncate ' + (checked ? 'text-gray-900' : 'text-gray-700')}>{r.name}</p>
                        <p className="text-[11px] text-gray-400">{formatPhone(r.phone)}{mode === 'contacts' && r.service_type ? ' · ' + r.service_type : ''}</p>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
            {mode === 'contacts' && contacts.length > 200 && <p className="text-[10px] text-gray-300 mt-1.5">Showing top 200 matches. Refine search to narrow down.</p>}
          </div>

          {/* Templates */}
          {relevantTemplates.length > 0 && (
            <div>
              <label className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-2 block">Templates</label>
              <div className="flex flex-wrap gap-1.5">
                {relevantTemplates.map((t) => (
                  <button key={t.id} onClick={() => pickTemplate(t)} className={'px-2.5 py-1.5 text-[11px] font-medium rounded-lg transition-all ' + (activeTemplateId === t.id ? 'bg-[#115997] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200')}>{t.name}</button>
                ))}
              </div>
            </div>
          )}

          {/* Composer */}
          <div>
            <label className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-2 block">Message</label>
            <textarea value={messageBody} onChange={(e) => { setMessageBody(e.target.value); setActiveTemplateId(null) }} rows={5} placeholder="Type your message or pick a template above..." style={{ fontSize: '16px' }} className="w-full px-3.5 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#115997]/20 focus:border-[#115997] outline-none resize-none transition-all" />
            <div className="flex items-center justify-between mt-1.5">
              <p className="text-[11px] text-gray-400">{segmentInfo.len} chars · {segmentInfo.segments} SMS{segmentInfo.segments !== 1 ? ' segments' : ''}{segmentInfo.segments > 1 ? ' (charged per segment)' : ''}</p>
              {messageBody && <button onClick={() => { setMessageBody(''); setActiveTemplateId(null) }} className="text-[11px] text-gray-400 hover:text-red-500">Clear</button>}
            </div>
          </div>

          {/* Send */}
          <button onClick={() => setShowConfirm(true)} disabled={!canSend} className="w-full py-3 bg-[#115997] text-white text-sm font-semibold rounded-xl hover:bg-[#0d4a7a] disabled:opacity-40 disabled:cursor-not-allowed shadow-sm shadow-[#115997]/20 transition-all flex items-center justify-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
            {sending ? 'Sending...' : selectedIds.size === 0 ? 'Select recipients' : `Send to ${selectedIds.size} ${selectedIds.size === 1 ? 'person' : 'people'}`}
          </button>
        </div>
      </div>

      {/* History */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 animate-[fadeUp_0.45s_ease-out]">
        <div className="px-4 sm:px-5 py-3.5 border-b border-gray-100">
          <h3 className="font-bold text-gray-900 text-sm">History <span className="text-gray-300 font-normal">({broadcasts.length})</span></h3>
        </div>
        {broadcasts.length === 0 ? (
          <div className="p-8 text-center"><p className="text-gray-400 text-sm">No broadcasts yet</p></div>
        ) : (
          <div className="divide-y divide-gray-50">
            {broadcasts.map((b) => {
              const expanded = expandedBroadcast === b.id
              return (
                <div key={b.id}>
                  <button onClick={() => setExpandedBroadcast(expanded ? null : b.id)} className="w-full text-left p-4 sm:px-5 hover:bg-gray-50/50 transition-colors">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <p className="text-sm text-gray-800 line-clamp-2 whitespace-pre-wrap">{b.body}</p>
                        <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                          <span className={'inline-flex px-1.5 py-0.5 rounded text-[9px] font-semibold ' + (b.recipient_type === 'users' ? 'bg-blue-50 text-blue-700' : 'bg-purple-50 text-purple-700')}>{b.recipient_type === 'users' ? 'Crew' : 'Customers'}</span>
                          <span className="text-[10px] text-gray-400">{b.success_count} sent</span>
                          {b.failed_count > 0 && <span className="text-[10px] text-red-500 font-semibold">{b.failed_count} failed</span>}
                          <span className="text-[10px] text-gray-300">·</span>
                          <span className="text-[10px] text-gray-400">{formatWhen(b.sent_at)}</span>
                          {b.sent_by_user?.name && <><span className="text-[10px] text-gray-300">·</span><span className="text-[10px] text-gray-400">by {b.sent_by_user.name}</span></>}
                        </div>
                      </div>
                      <svg className={'w-4 h-4 text-gray-300 flex-shrink-0 transition-transform ' + (expanded ? 'rotate-180' : '')} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </div>
                  </button>
                  {expanded && (
                    <div className="bg-[#F5F6F8]/50 px-4 sm:px-5 py-3 border-t border-gray-100">
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-2">Recipients ({b.recipients.length})</p>
                      <div className="space-y-1">
                        {b.recipients.map((r) => (
                          <div key={r.id} className="flex items-center justify-between bg-white rounded-lg px-3 py-2 text-xs">
                            <div className="min-w-0">
                              <p className="font-semibold text-gray-800 truncate">{r.name_snapshot || 'Unknown'}</p>
                              <p className="text-[10px] text-gray-400">{formatPhone(r.phone_snapshot.replace('+1', ''))}</p>
                            </div>
                            <div className="flex-shrink-0">
                              {r.status === 'sent' ? <span className="inline-flex px-1.5 py-0.5 rounded text-[9px] font-semibold bg-green-50 text-green-700">Sent</span> : r.status === 'failed' ? <span className="inline-flex px-1.5 py-0.5 rounded text-[9px] font-semibold bg-red-50 text-red-700" title={r.error_message || ''}>Failed</span> : <span className="inline-flex px-1.5 py-0.5 rounded text-[9px] font-semibold bg-gray-100 text-gray-500">Pending</span>}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Confirm Send Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4" onClick={() => setShowConfirm(false)}>
          <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-md max-h-[85vh] overflow-y-auto animate-[fadeUp_0.2s_ease-out]" onClick={(e) => e.stopPropagation()}>
            <div className="p-5 border-b border-gray-100">
              <div className="w-8 h-1 bg-gray-300 rounded-full mx-auto mb-3 sm:hidden" />
              <h3 className="text-lg font-bold text-gray-900">Send to {selectedIds.size} {selectedIds.size === 1 ? 'person' : 'people'}?</h3>
              <p className="text-xs text-gray-400 mt-0.5">SMS will go out individually. Each person sees a private thread.</p>
            </div>
            <div className="p-5 space-y-3">
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1.5">Preview</p>
                <div className="bg-[#F5F6F8] rounded-xl p-3 text-sm text-gray-800 whitespace-pre-wrap">{messageBody}</div>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1.5">Recipients</p>
                <div className="max-h-48 overflow-y-auto space-y-1">
                  {selectedRecipients.map(r => (
                    <div key={r.id} className="flex items-center justify-between text-xs px-2 py-1">
                      <span className="font-semibold text-gray-700">{r.name}</span>
                      <span className="text-gray-400">{formatPhone(r.phone)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-5 border-t border-gray-100 flex items-center gap-3">
              <button onClick={() => setShowConfirm(false)} disabled={sending} className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors disabled:opacity-50">Cancel</button>
              <button onClick={handleSend} disabled={sending} className="flex-1 py-3 bg-[#115997] text-white rounded-xl font-semibold hover:bg-[#0d4a7a] disabled:opacity-40 shadow-sm shadow-[#115997]/20 transition-all">{sending ? 'Sending...' : 'Send Now'}</button>
            </div>
          </div>
        </div>
      )}

      {/* Templates Modal */}
      {showTemplatesModal && <TemplatesModal templates={templates} onClose={() => setShowTemplatesModal(false)} onRefresh={fetchTemplates} />}

      {/* Help Modal */}
      {showHelp && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4" onClick={() => setShowHelp(false)}>
          <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-lg max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-5 border-b border-gray-100">
              <div className="w-8 h-1 bg-gray-300 rounded-full mx-auto mb-3 sm:hidden" />
              <div className="flex items-center justify-between"><h3 className="text-lg font-bold text-gray-900">Messaging Help</h3><button onClick={() => setShowHelp(false)} className="text-gray-400 hover:text-gray-600"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button></div>
            </div>
            <div className="p-5 space-y-5">
              <div><h4 className="text-sm font-bold text-gray-800 mb-1">Two modes</h4><p className="text-sm text-gray-500 leading-relaxed">Pick Crew to text your team (active users with phone numbers on file). Pick Customers to text contacts from your CRM. Templates filter to what makes sense for each.</p></div>
              <div><h4 className="text-sm font-bold text-gray-800 mb-1">Not a group chat</h4><p className="text-sm text-gray-500 leading-relaxed">Each recipient gets a private 1-on-1 SMS from the RSA Telnyx number. Replies come back to that thread, not a group.</p></div>
              <div><h4 className="text-sm font-bold text-gray-800 mb-1">SMS segments</h4><p className="text-sm text-gray-500 leading-relaxed">Each SMS segment is up to 160 chars. Longer messages get billed per segment but still arrive as one message on most phones.</p></div>
              <div><h4 className="text-sm font-bold text-gray-800 mb-1">Templates</h4><p className="text-sm text-gray-500 leading-relaxed">Tap Templates in the header to create, edit, or delete. Use [BRACKETS] as placeholders you fill in manually before sending.</p></div>
            </div>
            <div className="p-5 border-t border-gray-100"><button onClick={() => setShowHelp(false)} className="w-full py-3 bg-[#115997] text-white rounded-xl font-semibold hover:bg-[#0d4a7a] transition-colors">Got it</button></div>
          </div>
        </div>
      )}
    </div>
  )
}

// ============================================================================
// Templates management modal
// ============================================================================
function TemplatesModal({ templates, onClose, onRefresh }) {
  const [editing, setEditing] = useState(null) // null | 'new' | template
  const [formData, setFormData] = useState({ name: '', body: '', category: 'crew' })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const startNew = () => { setEditing('new'); setFormData({ name: '', body: '', category: 'crew' }); setError('') }
  const startEdit = (t) => { setEditing(t); setFormData({ name: t.name, body: t.body, category: t.category }); setError('') }
  const cancel = () => { setEditing(null); setError('') }

  const handleSave = async () => {
    if (!formData.name.trim() || !formData.body.trim()) { setError('Name and body required'); return }
    setSaving(true); setError('')
    try {
      const isNew = editing === 'new'
      const payload = { name: formData.name.trim(), body: formData.body.trim(), category: formData.category }
      if (!isNew) payload.id = editing.id
      const r = await fetch('/api/admin/messaging/templates', { method: isNew ? 'POST' : 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      if (!r.ok) { const d = await r.json(); setError(d.error || 'Save failed'); return }
      onRefresh(); setEditing(null)
    } catch (e) { setError('Save failed') }
    finally { setSaving(false) }
  }

  const handleDelete = async (t) => {
    if (!confirm(`Delete "${t.name}"?`)) return
    try {
      await fetch('/api/admin/messaging/templates', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: t.id }) })
      onRefresh()
    } catch (e) {}
  }

  const grouped = useMemo(() => {
    const g = { crew: [], customer: [], general: [] }
    for (const t of templates) g[t.category || 'crew']?.push(t)
    return g
  }, [templates])

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4" onClick={onClose}>
      <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-2xl max-h-[90vh] flex flex-col animate-[fadeUp_0.2s_ease-out]" onClick={(e) => e.stopPropagation()}>
        <div className="p-5 border-b border-gray-100 flex-shrink-0">
          <div className="w-8 h-1 bg-gray-300 rounded-full mx-auto mb-3 sm:hidden" />
          <div className="flex items-center justify-between">
            <div><h3 className="text-lg font-bold text-gray-900">Templates</h3><p className="text-xs text-gray-400 mt-0.5">Reusable messages for crew and customer broadcasts</p></div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {editing && (
            <div className="bg-[#F5F6F8] rounded-xl p-4 space-y-3">
              <h4 className="font-bold text-gray-900 text-sm">{editing === 'new' ? 'New Template' : 'Edit Template'}</h4>
              {error && <div className="rounded-xl p-2.5 text-xs bg-red-50 border border-red-200 text-red-700">{error}</div>}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div><label className="block text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-1">Name *</label><input type="text" value={formData.name} onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))} placeholder="e.g. Morning meeting" style={{ fontSize: '16px' }} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#115997]/20 outline-none bg-white" /></div>
                <div><label className="block text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-1">Category</label><select value={formData.category} onChange={(e) => setFormData(p => ({ ...p, category: e.target.value }))} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#115997]/20 outline-none bg-white"><option value="crew">Crew</option><option value="customer">Customer</option><option value="general">General</option></select></div>
              </div>
              <div><label className="block text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-1">Body *</label><textarea value={formData.body} onChange={(e) => setFormData(p => ({ ...p, body: e.target.value }))} rows={4} placeholder="Use [BRACKETS] for placeholders you fill in before sending..." style={{ fontSize: '16px' }} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#115997]/20 outline-none bg-white resize-none" /><p className="text-[10px] text-gray-400 mt-1">{formData.body.length} chars</p></div>
              <div className="flex gap-2">
                <button onClick={cancel} className="flex-1 py-2 bg-white border border-gray-200 text-gray-600 text-sm font-semibold rounded-lg hover:bg-gray-50">Cancel</button>
                <button onClick={handleSave} disabled={saving} className="flex-1 py-2 bg-[#115997] text-white text-sm font-semibold rounded-lg hover:bg-[#0d4a7a] disabled:opacity-40">{saving ? 'Saving...' : 'Save'}</button>
              </div>
            </div>
          )}

          {!editing && <button onClick={startNew} className="w-full py-2.5 bg-[#115997]/[0.06] text-[#115997] text-sm font-semibold rounded-xl hover:bg-[#115997]/[0.1] flex items-center justify-center gap-1.5"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>New Template</button>}

          {['crew', 'customer', 'general'].map(cat => grouped[cat].length > 0 && (
            <div key={cat}>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-2">{CATEGORY_LABELS[cat]} ({grouped[cat].length})</p>
              <div className="space-y-1.5">
                {grouped[cat].map(t => (
                  <div key={t.id} className="bg-white rounded-xl border border-gray-100 p-3 group">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className="font-semibold text-sm text-gray-900">{t.name}</p>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <button onClick={() => startEdit(t)} className="p-1 text-gray-300 hover:text-[#115997] rounded transition-colors"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg></button>
                        <button onClick={() => handleDelete(t)} className="p-1 text-gray-300 hover:text-red-500 rounded transition-colors"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 whitespace-pre-wrap line-clamp-3">{t.body}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}