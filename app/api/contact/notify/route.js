import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export const maxDuration = 120

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const TELNYX_MSG_PROFILE = '40019bc3-6345-42ca-84bd-a9a2ed3bd66f'

async function sendSms(to, text) {
  if (!process.env.TELNYX_API_KEY || !to) return false
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

// Query enabled recipients subscribed to the given notification type.
// Filters notification_types in JS rather than PostgREST .contains(). supabase-js
// serializes an array arg to a Postgres array literal ({new_lead}), which only matches
// a text[] column. If notification_types is jsonb, that literal is invalid JSON, the
// query 400s, and every notification silently dispatches to zero recipients. Filtering
// here is correct whether the column is jsonb or text[], since both return JS arrays.
async function getRecipientPhones(type) {
  try {
    const { data, error } = await supabase
      .from('rsa_notification_recipients')
      .select('phone, notification_types')
      .eq('enabled', true)
    if (error) {
      console.error('[NOTIFY] Failed to load recipients:', error.message)
      return []
    }
    return (data || [])
      .filter(r => Array.isArray(r.notification_types) && r.notification_types.includes(type))
      .map(r => r.phone)
      .filter(Boolean)
  } catch (e) {
    console.error('[NOTIFY] Recipients query error:', e)
    return []
  }
}

function formatPhoneDisplay(phone) {
  const digits = phone.replace(/\D/g, '')
  if (digits.length === 10) return `${digits.slice(0,3)}-${digits.slice(3,6)}-${digits.slice(6)}`
  if (digits.length === 11 && digits[0] === '1') return `${digits.slice(1,4)}-${digits.slice(4,7)}-${digits.slice(7)}`
  return phone
}

function formatDateForSms(dateStr) {
  const [y, m, d] = dateStr.split('-').map(Number)
  const date = new Date(y, m - 1, d)
  return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

// type: 'new_lead' | 'booked' | 'skipped'
// Customer-facing confirmation texts are disabled. This endpoint only sends
// internal team/admin alerts to the numbers in rsa_notification_recipients.
export async function POST(request) {
  try {
    const { id, type } = await request.json()
    if (!id || !type) return NextResponse.json({ error: 'Missing id or type' }, { status: 400 })

    // Wait 60 seconds server-side before sending (lets customer complete booking flow)
    await sleep(60000)

    const { data, error } = await supabase
      .from('contact_submissions')
      .select('name, phone, email, service_type, scheduled_date, scheduled_time, address, message, referral_source')
      .eq('id', id)
      .single()
    if (error || !data) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    if (type === 'new_lead') {
      // Internal alert to the team. Body includes everything actionable:
      // contact info, what they need, where, where they came from, what they said.
      const lines = [
        'New Lead - RSA',
        data.name,
        formatPhoneDisplay(data.phone),
        data.service_type,
      ]
      if (data.address) lines.push(data.address)
      if (data.referral_source) lines.push(`Source: ${data.referral_source}`)
      if (data.message) lines.push('', data.message) // blank line then the message
      const smsBody = lines.filter(l => l !== undefined && l !== null).join('\n')

      const recipients = await getRecipientPhones('new_lead')
      console.log(`[NOTIFY] new_lead dispatching to ${recipients.length} recipient(s)`)
      for (const phone of recipients) await sendSms(phone, smsBody)
    }

    if (type === 'booked') {
      // Internal alert to the team only. No confirmation text to the customer.
      const dateFormatted = formatDateForSms(data.scheduled_date)
      const timeStr = data.scheduled_time ? ` at ${data.scheduled_time}` : ''

      const adminLines = [
        '📅 Estimate Booked',
        data.name,
        formatPhoneDisplay(data.phone),
        data.service_type,
      ]
      if (data.address) adminLines.push(data.address)
      adminLines.push(`${dateFormatted}${timeStr}`)
      const adminBody = adminLines.join('\n')

      const recipients = await getRecipientPhones('booked')
      console.log(`[NOTIFY] booked dispatching to ${recipients.length} recipient(s)`)
      for (const phone of recipients) await sendSms(phone, adminBody)
    }

    // 'skipped' previously sent the customer a confirmation text. Customer texts
    // are disabled, and the team already got the new_lead alert on submit, so
    // there is nothing to send here.

    return NextResponse.json({ success: true })
  } catch (error) { console.error('Notify error:', error); return NextResponse.json({ error: 'Internal server error' }, { status: 500 }) }
}