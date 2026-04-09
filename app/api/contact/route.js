import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const TELNYX_MSG_PROFILE = '40019bc3-6345-42ca-84bd-a9a2ed3bd66f'

async function sendSms(to, text) {
  if (!process.env.TELNYX_API_KEY) return false
  try {
    const res = await fetch('https://api.telnyx.com/v2/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${process.env.TELNYX_API_KEY}` },
      body: JSON.stringify({ from: process.env.RSA_TELNYX_FROM, to, text, messaging_profile_id: TELNYX_MSG_PROFILE }),
    })
    const data = await res.json()
    console.log('[SMS]', res.status, JSON.stringify(data).substring(0, 200))
    return res.ok
  } catch (err) { console.error('SMS failed:', err); return false }
}

function formatPhoneForSms(phone) {
  const digits = phone.replace(/\D/g, '')
  if (digits.length === 10) return '+1' + digits
  if (digits.length === 11 && digits.startsWith('1')) return '+' + digits
  return null
}

function formatDateForSms(dateStr) {
  const [y, m, d] = dateStr.split('-').map(Number)
  const date = new Date(y, m - 1, d)
  return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
}

function isSpam({ name, email, message }) {
  // 1. Gibberish name detection
  if (name) {
    const transitions = (name.match(/[A-Z][a-z]|[a-z][A-Z]/g) || []).length
    if (transitions > 4) return 'gibberish_name'
    const words = name.split(/\s+/)
    for (const word of words) { if (word.length > 3 && /[A-Z]{3,}/.test(word) && word !== word.toUpperCase()) return 'gibberish_name' }
    if (name.trim().split(/\s+/).length === 1 && name.trim().length > 12) return 'suspicious_name'
  }

  // 2. Dotted/fragmented email detection
  if (email) {
    const localPart = email.split('@')[0] || ''
    const dotCount = (localPart.match(/\./g) || []).length
    if (dotCount >= 4) return 'dotted_email'
    const segments = localPart.split('.')
    const tinySegments = segments.filter(s => s.length <= 2).length
    if (tinySegments >= 3) return 'fragmented_email'
  }

  // 3. Message keyword/phrase spam detection
  if (message) {
    const msgLower = message.toLowerCase()

    const spamKeywords = [
      'seo', 'search engine optimization', 'backlink', 'link building',
      'rank your website', 'first page of google', 'domain authority',
      'virtual assistant', 'cold calling', 'appointment setting',
      'lead generation', 'social media management', 'bookkeeping',
      'outsourc', 'offshore', 'filipino', 'philippines',
      'enhance your client', 'boost your client', 'grow your business',
      'scale your business', 'increase your revenue', 'increase your sales',
      'open to a quick', '15-minute', '15 minute', 'quick conversation',
      'quick call', 'quick chat', 'brief call', 'brief conversation',
      'schedule a call', 'hop on a call', 'jump on a call',
      'i\'d love to show you', 'i\'d love to discuss', 'let me show you',
      'love to connect', 'love to chat',
      'web development services', 'web design services', 'digital marketing services',
      'marketing agency', 'staffing solution', 'staffing service',
      'content creation service', 'customer support service',
      'we provide expert', 'we specialize in', 'we offer a wide range',
      'we can help enhance', 'we can help grow', 'we can help boost',
      'ai chatbot', 'ai solution', 'automation service',
      'b2b lead', 'qualified leads', 'warm leads',
      'email campaign', 'email marketing', 'bulk email',
      'pay per click', 'ppc management', 'google ads management',
      'facebook ads management', 'roi guarantee',
      'interested in learning more', 'would you be open', 'are you open to',
      'shall i send', 'can i send you', 'let me send you',
      'unsubscribe', 'opt out', 'opt-out',
    ]

    for (const keyword of spamKeywords) {
      if (msgLower.includes(keyword)) return 'spam_keyword'
    }
  }

  return null
}

export async function POST(request) {
  try {
    const body = await request.json()
    const { name, email, phone, service_type, message, source } = body
    if (!name || !email || !phone || !service_type) return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })

    const isManualEntry = source === 'calendar' || source === 'manual'
    if (!isManualEntry) {
      const spamReason = isSpam({ name, email, message })
      if (spamReason) { console.log(`[SPAM BLOCKED] reason=${spamReason} name="${name}" email="${email}"`); return NextResponse.json({ success: true }) }
    }

    const { data, error } = await supabase.from('contact_submissions').insert([{ name, email, phone, service_type, message: message || null, source: source || 'website' }]).select().single()
    if (error) { console.error('Supabase error:', error); return NextResponse.json({ error: 'Failed to submit form' }, { status: 500 }) }

    if (!isManualEntry) {
      // Internal notification — fires immediately so you know about the lead
      const smsBody = ['New Lead - RSA', name, phone, service_type, message ? message : null].filter(Boolean).join('\n')
      await sendSms(process.env.RSA_NOTIFICATION_PHONE, smsBody)

      // Customer SMS is NOT sent here anymore — it fires on PATCH when they pick a date,
      // or via the /api/contact/skip-booking endpoint if they skip the calendar
    }
    return NextResponse.json({ success: true, data })
  } catch (error) { console.error('API error:', error); return NextResponse.json({ error: 'Internal server error' }, { status: 500 }) }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const userId = searchParams.get('user_id')
    const userRole = searchParams.get('user_role')

    let query = supabase.from('contact_submissions').select('*, assigned_user:rsa_users!contact_submissions_assigned_to_fkey(id, name, username)').order('created_at', { ascending: false })
    if (status && status !== 'all') query = query.eq('status', status)
    if (userId && userRole === 'member') query = query.eq('assigned_to', userId)

    const { data, error } = await query
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ data })
  } catch (error) { return NextResponse.json({ error: 'Internal server error' }, { status: 500 }) }
}

export async function PATCH(request) {
  try {
    const body = await request.json()
    const { id, status, notes, next_follow_up, scheduled_date, scheduled_time, quoted_amount, address, close_reason, assigned_to, booked_by_customer } = body
    if (!id) return NextResponse.json({ error: 'Missing submission ID' }, { status: 400 })

    const updateData = {}
    if (status) updateData.status = status
    if (notes !== undefined) updateData.notes = notes
    if (next_follow_up !== undefined) updateData.next_follow_up = next_follow_up
    if (scheduled_date !== undefined) updateData.scheduled_date = scheduled_date
    if (scheduled_time !== undefined) updateData.scheduled_time = scheduled_time
    if (quoted_amount !== undefined) updateData.quoted_amount = quoted_amount
    if (address !== undefined) updateData.address = address
    if (close_reason !== undefined) updateData.close_reason = close_reason
    if (assigned_to !== undefined) updateData.assigned_to = assigned_to || null

    const { data, error } = await supabase.from('contact_submissions').update(updateData).eq('id', id).select('*, assigned_user:rsa_users!contact_submissions_assigned_to_fkey(id, name, username)').single()
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    // Customer booked a date from the website calendar (not admin)
    if (booked_by_customer && scheduled_date && data) {
      const firstName = data.name?.split(' ')[0] || ''
      const leadPhone = formatPhoneForSms(data.phone)
      const dateFormatted = formatDateForSms(scheduled_date)
      const timeStr = scheduled_time ? ` at ${scheduled_time}` : ''

      // Customer confirmation SMS — single text with the date included
      if (leadPhone) {
        await sendSms(leadPhone, `Hey ${firstName}, thanks for reaching out to Reliable Solutions Atlanta! Your free estimate for ${data.service_type} is scheduled for ${dateFormatted}${timeStr}. If you need to reschedule, call or text 770-895-2039. - RSA Team`)
      }

      // Internal notification — you know they picked a date
      await sendSms(process.env.RSA_NOTIFICATION_PHONE, `📅 Estimate Booked\n${data.name}\n${data.phone}\n${data.service_type}\n${dateFormatted}${timeStr}`)
    }

    return NextResponse.json({ success: true, data })
  } catch (error) { console.error('API error:', error); return NextResponse.json({ error: 'Internal server error' }, { status: 500 }) }
}