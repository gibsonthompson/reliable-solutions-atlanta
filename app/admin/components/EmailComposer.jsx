'use client'

import { useState, useEffect, useRef } from 'react'

const RSA_PHONE = '(770) 895-2039'
const RSA_WEBSITE = 'waterhelpme.com'
const RSA_EMAIL = 'rsolrepair@gmail.com'
const GOOGLE_REVIEW_URL = 'https://www.google.com/search?q=(770)+895-2039#lrd=0x88f5bde216fbfbdf:0x8d3c5e27cda0c48b,3'

// Generate branded HTML email shell — wraps plain text body in RSA branding
function generateEmailHTML({ subject, body }) {
  const bodyHTML = body
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\n\n/g, '</p><p style="margin:0 0 16px 0;color:#374151;font-size:15px;line-height:1.75;">')
    .replace(/\n/g, '<br>')

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#f3f4f6;font-family:Arial,Helvetica,sans-serif;-webkit-font-smoothing:antialiased;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f3f4f6;padding:24px 12px;">
<tr><td align="center">
<table role="presentation" width="620" cellpadding="0" cellspacing="0" style="max-width:620px;width:100%;">

<!-- HEADER -->
<tr><td style="background-color:#ffffff;padding:28px 40px 20px 40px;border-radius:12px 12px 0 0;border-left:1px solid #e5e7eb;border-right:1px solid #e5e7eb;border-top:1px solid #e5e7eb;text-align:center;">
  <img src="https://waterhelpme.com/images/logo.png" alt="Reliable Solutions Atlanta" width="200" style="max-width:200px;height:auto;display:inline-block;margin-bottom:12px;" />
  <p style="margin:0;color:#6b7280;font-size:12px;letter-spacing:0.5px;text-transform:uppercase;">
    Waterproofing &amp; Foundation Repair Experts &middot; Metro Atlanta
  </p>
</td></tr>

<!-- HEADLINE -->
<tr><td style="background-color:#115997;padding:24px 40px;text-align:center;">
  <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700;line-height:1.35;">
    ${subject.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}
  </h1>
</td></tr>

<!-- BODY -->
<tr><td style="background-color:#ffffff;padding:36px 40px;border-left:1px solid #e5e7eb;border-right:1px solid #e5e7eb;">
  <p style="margin:0 0 16px 0;color:#374151;font-size:15px;line-height:1.75;">${bodyHTML}</p>
</td></tr>

<!-- CTA -->
<tr><td style="background-color:#f8fafc;padding:28px 40px;border-left:1px solid #e5e7eb;border-right:1px solid #e5e7eb;text-align:center;">
  <p style="margin:0 0 4px 0;color:#273373;font-size:17px;font-weight:700;">Alejandro Lopez</p>
  <p style="margin:0 0 16px 0;color:#6b7280;font-size:14px;">Reliable Solutions Atlanta</p>
  <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto;">
  <tr><td>
    <a href="tel:+17708952039" style="display:inline-block;background-color:#115997;color:#ffffff;font-size:15px;font-weight:600;text-decoration:none;padding:14px 32px;border-radius:8px;">
      Call: ${RSA_PHONE}
    </a>
  </td></tr>
  </table>
  <p style="margin:12px 0 0 0;color:#9ca3af;font-size:12px;">Or reply directly to this email</p>
</td></tr>

<!-- TRUST BAR -->
<tr><td style="background-color:#ffffff;padding:24px 40px;border-left:1px solid #e5e7eb;border-right:1px solid #e5e7eb;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding:0 12px;vertical-align:middle;">
        <img src="https://waterhelpme.com/images/bbb-badge.png" alt="BBB Accredited Business A+" height="44" style="height:44px;width:auto;display:inline-block;background-color:#ffffff;border-radius:4px;" />
      </td>
      <td align="center" style="padding:0 12px;vertical-align:middle;">
        <img src="https://waterhelpme.com/images/iicrc-badge.png" alt="IICRC Certified" height="44" style="height:44px;width:auto;display:inline-block;" />
      </td>
      <td align="center" style="padding:0 12px;vertical-align:middle;">
        <table role="presentation" cellpadding="0" cellspacing="0">
          <tr><td align="center" style="padding-bottom:4px;">
            <img src="https://waterhelpme.com/images/google-logo.png" alt="Google" height="24" style="height:24px;width:auto;display:inline-block;" />
          </td></tr>
          <tr><td align="center">
            <span style="color:#f59e0b;font-size:14px;letter-spacing:1px;">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
          </td></tr>
          <tr><td align="center">
            <a href="${GOOGLE_REVIEW_URL}" style="color:#374151;font-size:11px;text-decoration:none;font-weight:600;">60+ 5-Star Reviews</a>
          </td></tr>
        </table>
      </td>
      <td align="center" style="padding:0 12px;vertical-align:middle;">
        <img src="https://waterhelpme.com/images/greensky-badge.png" alt="GreenSky Financing Available" height="40" style="height:40px;width:auto;display:inline-block;" />
      </td>
    </tr>
  </table>
</td></tr>

<!-- FINANCING -->
<tr><td style="background-color:#ffffff;padding:0 40px 20px 40px;border-left:1px solid #e5e7eb;border-right:1px solid #e5e7eb;text-align:center;">
  <p style="margin:0;color:#6b7280;font-size:12px;line-height:1.5;">
    Financing options available through GreenSky &mdash; homeowners can pay over time with plans starting at 0% interest.
  </p>
</td></tr>

<!-- FOOTER -->
<tr><td style="background-color:#1e293b;padding:28px 40px;border-radius:0 0 12px 12px;text-align:center;">
  <p style="margin:0 0 4px 0;color:#ffffff;font-size:15px;font-weight:700;">Reliable Solutions Atlanta</p>
  <p style="margin:0 0 4px 0;color:rgba(255,255,255,0.6);font-size:12px;">Waterproofing &middot; Foundation Repair &middot; Drainage &middot; Crawl Space</p>
  <p style="margin:0 0 4px 0;color:rgba(255,255,255,0.6);font-size:12px;">${RSA_PHONE} &middot; ${RSA_EMAIL} &middot; ${RSA_WEBSITE}</p>
  <p style="margin:0 0 16px 0;color:rgba(255,255,255,0.4);font-size:11px;">Serving Metro Atlanta &middot; Licensed &amp; Insured &middot; 20+ Years Experience</p>
  <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto 16px auto;">
    <tr>
      <td style="padding:0 6px;">
        <a href="${GOOGLE_REVIEW_URL}" style="display:inline-block;width:30px;height:30px;background-color:rgba(255,255,255,0.12);border-radius:50%;text-align:center;line-height:30px;text-decoration:none;color:#ffffff;font-size:13px;font-weight:700;" title="Google Reviews">G</a>
      </td>
      <td style="padding:0 6px;">
        <a href="#FACEBOOK_URL" style="display:inline-block;width:30px;height:30px;background-color:rgba(255,255,255,0.12);border-radius:50%;text-align:center;line-height:30px;text-decoration:none;color:#ffffff;font-size:13px;font-weight:700;" title="Facebook">f</a>
      </td>
      <td style="padding:0 6px;">
        <a href="#INSTAGRAM_URL" style="display:inline-block;width:30px;height:30px;background-color:rgba(255,255,255,0.12);border-radius:50%;text-align:center;line-height:30px;text-decoration:none;color:#ffffff;font-size:13px;font-weight:700;" title="Instagram">ig</a>
      </td>
    </tr>
  </table>
  <p style="margin:0;color:rgba(255,255,255,0.25);font-size:10px;line-height:1.5;">
    You received this because we thought it might be useful for your real estate business.<br>
    If you&rsquo;d prefer not to hear from us, simply reply &ldquo;unsubscribe&rdquo; and we&rsquo;ll remove you right away.
  </p>
</td></tr>

</table>
</td></tr>
</table>
</body>
</html>`
}

function replaceVariables(text, contact) {
  if (!text) return ''
  return text
    .replace(/\{name\}/g, contact.name || '')
    .replace(/\{first_name\}/g, (contact.name || '').split(' ')[0])
    .replace(/\{email\}/g, contact.email || '')
    .replace(/\{phone\}/g, contact.phone || '')
    .replace(/\{service_type\}/g, contact.service_type || '')
    .replace(/\{target_area\}/g, 'Metro Atlanta')
}

export default function EmailComposer({ isOpen, onClose, contact, onSent, isProspect = false }) {
  const [templates, setTemplates] = useState([])
  const [selectedTemplate, setSelectedTemplate] = useState('')
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [logged, setLogged] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const previewRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      setSubject('')
      setBody('')
      setSelectedTemplate('')
      setCopied(false)
      setLogged(false)
      setShowPreview(false)
      fetchTemplates()
    }
  }, [isOpen])

  const fetchTemplates = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/admin/templates')
      const data = await response.json()
      if (data.templates) {
        setTemplates(data.templates)
        // Auto-select default template
        const def = data.templates.find(t => t.is_default)
        if (def) handleTemplateSelect(def)
      }
    } catch (error) {
      console.error('Failed to fetch templates:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template.id)
    setSubject(replaceVariables(template.subject, contact))
    setBody(replaceVariables(template.body, contact))
  }

  const emailHTML = generateEmailHTML({
    subject,
    body,
  })

  const handleCopyHTML = async () => {
    try {
      // Copy as rich HTML so Gmail/Outlook preserves formatting
      const blob = new Blob([emailHTML], { type: 'text/html' })
      const plainBlob = new Blob([body], { type: 'text/plain' })
      await navigator.clipboard.write([
        new ClipboardItem({
          'text/html': blob,
          'text/plain': plainBlob,
        })
      ])
      setCopied(true)
      setTimeout(() => setCopied(false), 3000)
    } catch (err) {
      // Fallback: copy plain text
      await navigator.clipboard.writeText(`Subject: ${subject}\n\n${body}`)
      setCopied(true)
      setTimeout(() => setCopied(false), 3000)
    }
  }

  const handleLogAndCopy = async () => {
    await handleCopyHTML()

    // Log outreach
    try {
      await fetch('/api/admin/outreach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...(isProspect ? { prospect_id: contact.id } : { contact_id: contact.id }),
          type: 'email',
          subject,
          body,
          template_id: selectedTemplate || null,
        }),
      })
      setLogged(true)
      if (onSent) onSent()
      setTimeout(() => onClose(), 2000)
    } catch (error) {
      console.error('Failed to log outreach:', error)
    }
  }

  const handleOpenGmail = () => {
    const gmailUrl = `https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(contact.email)}&su=${encodeURIComponent(subject)}`
    window.open(gmailUrl, '_blank')
  }

  if (!isOpen || !contact) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50">
      <div className="bg-white w-full sm:rounded-2xl sm:max-w-4xl sm:mx-4 max-h-[95vh] sm:max-h-[90vh] flex flex-col rounded-t-2xl overflow-hidden">
        {/* Header */}
        <div className="sticky top-0 bg-white px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-100 z-10 flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold text-[#273373] text-sm sm:text-base truncate">Compose Email</h3>
              <p className="text-xs text-gray-500 truncate">To: {contact.name} &middot; {contact.email}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="flex flex-col lg:flex-row">
            {/* Editor */}
            <div className="flex-1 p-4 sm:p-6 space-y-4">
              {/* Template Selector */}
              <div>
                <label className="block text-xs text-gray-500 mb-1.5">Template</label>
                <select
                  value={selectedTemplate}
                  onChange={(e) => {
                    const tmpl = templates.find(t => t.id === e.target.value)
                    if (tmpl) handleTemplateSelect(tmpl)
                  }}
                  className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#115997] focus:border-transparent outline-none"
                >
                  <option value="">Select a template...</option>
                  {templates.map((t) => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
                </select>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-xs text-gray-500 mb-1.5">Subject (also used as headline)</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Email subject line..."
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#115997] focus:border-transparent outline-none"
                />
              </div>

              {/* Body */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs text-gray-500">Message</label>
                  <span className="text-[10px] text-gray-400">
                    Variables: {'{name}'} {'{first_name}'} {'{service_type}'} {'{target_area}'}
                  </span>
                </div>
                <textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Write your email message..."
                  rows={10}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#115997] focus:border-transparent outline-none resize-none"
                  style={{ lineHeight: '1.7', minHeight: '250px' }}
                />
              </div>

              {/* Toggle Preview (mobile) */}
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="sm:hidden w-full py-2.5 text-sm font-medium text-[#115997] border border-[#115997]/30 rounded-xl active:scale-[0.98]"
              >
                {showPreview ? 'Hide Preview' : 'Show Branded Preview'}
              </button>
            </div>

            {/* Live Preview */}
            <div className={'lg:w-[380px] lg:border-l border-gray-100 bg-gray-50 p-4 sm:p-6 ' + (showPreview ? 'block' : 'hidden lg:block')}>
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Email Preview</p>
                <span className="text-[10px] text-gray-400">How it looks in inbox</span>
              </div>
              <div
                ref={previewRef}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
                style={{ transform: 'scale(0.55)', transformOrigin: 'top left', width: '182%', maxHeight: '900px' }}
              >
                <div dangerouslySetInnerHTML={{ __html: emailHTML }} />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white px-4 sm:px-6 py-3 sm:py-4 border-t border-gray-100 safe-area-bottom"
          style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
        >
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-3 sm:py-2.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors text-center"
            >
              Cancel
            </button>

            <button
              onClick={handleCopyHTML}
              disabled={!body}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-3 sm:py-2.5 text-sm font-medium bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-40"
            >
              {copied ? (
                <><svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg><span className="text-green-600">Copied!</span></>
              ) : (
                <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg><span>Copy</span></>
              )}
            </button>

            <button
              onClick={handleLogAndCopy}
              disabled={!body || logged}
              className="flex-[1.3] sm:flex-none flex items-center justify-center gap-2 px-4 py-3 sm:py-2.5 text-sm font-medium text-white bg-[#115997] rounded-xl hover:bg-[#273373] transition-colors disabled:opacity-50 active:scale-[0.98]"
            >
              {logged ? (
                <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg><span>Logged!</span></>
              ) : (
                <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg><span>Copy &amp; Log</span></>
              )}
            </button>

            <button
              onClick={handleOpenGmail}
              disabled={!contact.email}
              className="hidden sm:flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-40"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Gmail
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}