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
    return res.ok
  } catch { return false }
}

function formatPhoneForSms(phone) {
  const digits = phone.replace(/\D/g, '')
  if (digits.length === 10) return '+1' + digits
  if (digits.length === 11 && digits.startsWith('1')) return '+' + digits
  return null
}

export async function POST(request) {
  try {
    const { id } = await request.json()
    if (!id) return NextResponse.json({ error: 'Missing ID' }, { status: 400 })

    const { data, error } = await supabase.from('contact_submissions').select('name, phone, service_type').eq('id', id).single()
    if (error || !data) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    const leadPhone = formatPhoneForSms(data.phone)
    if (leadPhone) {
      const firstName = data.name?.split(' ')[0] || ''
      await sendSms(leadPhone, `Hey ${firstName}, thanks for reaching out to Reliable Solutions Atlanta! We received your request for ${data.service_type}. Our team will be calling you shortly to schedule your free inspection. If you need us sooner, call or text 770-895-2039. - RSA Team`)
    }

    return NextResponse.json({ success: true })
  } catch (error) { console.error('Skip booking error:', error); return NextResponse.json({ error: 'Internal server error' }, { status: 500 }) }
}