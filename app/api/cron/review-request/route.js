import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const TELNYX_MSG_PROFILE = '40019bc3-6345-42ca-84bd-a9a2ed3bd66f'
const TELNYX_FROM = process.env.RSA_TELNYX_FROM
const GOOGLE_REVIEW_URL = 'https://www.google.com/search?q=(770)+895-2039#lrd=0x88f5bde216fbfbdf:0x8d3c5e27cda0c48b,3'

function formatPhoneForSms(phone) {
  const digits = phone.replace(/\D/g, '')
  if (digits.length === 10) return '+1' + digits
  if (digits.length === 11 && digits.startsWith('1')) return '+' + digits
  return null
}

async function sendSms(to, text) {
  if (!process.env.TELNYX_API_KEY || !TELNYX_FROM) return false

  try {
    const res = await fetch('https://api.telnyx.com/v2/messages', {
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
    const data = await res.json()
    console.log('Review SMS response:', JSON.stringify(data))
    return res.ok
  } catch (err) {
    console.error('Review SMS failed:', err)
    return false
  }
}

export async function GET(request) {
  // Verify cron secret to prevent unauthorized calls
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // Find completed leads where updated_at is 3+ days ago
    const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()

    const { data: completedLeads, error } = await supabase
      .from('contact_submissions')
      .select('id, name, phone, service_type, sms_consent')
      .eq('status', 'completed')
      .lt('updated_at', threeDaysAgo)

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    if (!completedLeads || completedLeads.length === 0) {
      return NextResponse.json({ message: 'No leads eligible for review request', sent: 0 })
    }

    let sentCount = 0
    const skipped = []

    for (const lead of completedLeads) {
      // Check if we already sent a review request
      const { data: existing } = await supabase
        .from('rsa_activity_log')
        .select('id')
        .eq('contact_id', lead.id)
        .eq('action', 'review_request_sent')
        .limit(1)

      if (existing && existing.length > 0) {
        skipped.push(lead.id)
        continue
      }

      // Skip if no SMS consent
      if (lead.sms_consent === false) {
        skipped.push(lead.id)
        continue
      }

      const to = formatPhoneForSms(lead.phone)
      if (!to) {
        skipped.push(lead.id)
        continue
      }

      const firstName = lead.name.split(' ')[0]
      const message = `Hey ${firstName}, thanks for choosing Reliable Solutions Atlanta for your ${lead.service_type.toLowerCase()} project! If you're happy with the work, we'd really appreciate a Google review — it helps us help more homeowners like you. ${GOOGLE_REVIEW_URL} Thank you! - RSA Team`

      const sent = await sendSms(to, message)

      if (sent) {
        // Log the activity
        await supabase
          .from('rsa_activity_log')
          .insert([{
            contact_id: lead.id,
            action: 'review_request_sent',
            note: 'Automated Google review request SMS sent',
          }])
        sentCount++
      }
    }

    console.log(`Review request cron: ${sentCount} sent, ${skipped.length} skipped`)
    return NextResponse.json({
      message: `Review requests sent: ${sentCount}, skipped: ${skipped.length}`,
      sent: sentCount,
      skipped: skipped.length,
    })
  } catch (error) {
    console.error('Cron error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}