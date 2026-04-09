import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export const maxDuration = 120

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

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

// type: 'new_lead' | 'booked' | 'skipped'
export async function POST(request) {
  try {
    const { id, type } = await request.json()
    if (!id || !type) return NextResponse.json({ error: 'Missing id or type' }, { status: 400 })

    // Wait 60 seconds server-side before sending
    await sleep(60000)

    const { data, error } = await supabase.from('contact_submissions').select('name, phone, service_type, scheduled_date, scheduled_time').eq('id', id).single()
    if (error || !data) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    const firstName = data.name?.split(' ')[0] || ''
    const leadPhone = formatPhoneForSms(data.phone)

    if (type === 'new_lead') {
      const smsBody = ['New Lead - RSA', data.name, data.phone, data.service_type].filter(Boolean).join('\n')
      await sendSms(process.env.RSA_NOTIFICATION_PHONE, smsBody)
    }

    if (type === 'booked') {
      const dateFormatted = formatDateForSms(data.scheduled_date)
      const timeStr = data.scheduled_time ? ` at ${data.scheduled_time}` : ''

      if (leadPhone) {
        await sendSms(leadPhone, `Hey ${firstName}, thanks for reaching out to Reliable Solutions Atlanta! Your free estimate for ${data.service_type} is scheduled for ${dateFormatted}${timeStr}. If you need to reschedule, call or text 770-895-2039. - RSA Team`)
      }

      await sendSms(process.env.RSA_NOTIFICATION_PHONE, `📅 Estimate Booked\n${data.name}\n${data.phone}\n${data.service_type}\n${dateFormatted}${timeStr}`)
    }

    if (type === 'skipped') {
      if (leadPhone) {
        await sendSms(leadPhone, `Hey ${firstName}, thanks for reaching out to Reliable Solutions Atlanta! We received your request for ${data.service_type}. Our team will be calling you shortly to schedule your free inspection. If you need us sooner, call or text 770-895-2039. - RSA Team`)
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) { console.error('Notify error:', error); return NextResponse.json({ error: 'Internal server error' }, { status: 500 }) }
}