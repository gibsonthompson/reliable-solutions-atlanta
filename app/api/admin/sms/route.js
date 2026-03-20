import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const TELNYX_MSG_PROFILE = '40019bc3-6345-42ca-84bd-a9a2ed3bd66f'
const TELNYX_FROM = process.env.RSA_TELNYX_FROM

function formatPhoneForSms(phone) {
  const digits = phone.replace(/\D/g, '')
  if (digits.length === 10) return '+1' + digits
  if (digits.length === 11 && digits.startsWith('1')) return '+' + digits
  return null
}

export async function POST(request) {
  try {
    const body = await request.json()
    const { contact_id, phone, text } = body

    if (!contact_id || !phone || !text) {
      return NextResponse.json({ error: 'contact_id, phone, and text required' }, { status: 400 })
    }

    const to = formatPhoneForSms(phone)
    if (!to) {
      return NextResponse.json({ error: 'Invalid phone number' }, { status: 400 })
    }

    // Send via Telnyx
    const telnyxRes = await fetch('https://api.telnyx.com/v2/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.TELNYX_API_KEY}`,
      },
      body: JSON.stringify({
        from: TELNYX_FROM,
        to,
        text,
        messaging_profile_id: TELNYX_MSG_PROFILE,
      }),
    })

    const telnyxData = await telnyxRes.json()
    console.log('Telnyx SMS response:', JSON.stringify(telnyxData))

    if (!telnyxRes.ok) {
      return NextResponse.json({ error: 'SMS send failed', details: telnyxData }, { status: 500 })
    }

    // Log to activity
    await supabase
      .from('rsa_activity_log')
      .insert([{
        contact_id,
        action: 'sms_sent',
        note: text,
      }])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('SMS API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}