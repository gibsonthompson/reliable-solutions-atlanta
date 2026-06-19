import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export const maxDuration = 120

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

// Same messaging profile as the notify route - matches existing Telnyx setup.
const TELNYX_MSG_PROFILE = '40019bc3-6345-42ca-84bd-a9a2ed3bd66f'

function formatPhoneForSms(phone) {
  if (!phone) return null
  const digits = phone.replace(/\D/g, '')
  if (digits.length === 10) return '+1' + digits
  if (digits.length === 11 && digits.startsWith('1')) return '+' + digits
  return null
}

// Returns { success: bool, message_id?: string, error?: string }
async function sendSms(to, text) {
  if (!process.env.TELNYX_API_KEY) return { success: false, error: 'No Telnyx API key configured' }
  if (!to) return { success: false, error: 'No recipient' }
  try {
    const res = await fetch('https://api.telnyx.com/v2/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${process.env.TELNYX_API_KEY}` },
      body: JSON.stringify({ from: process.env.RSA_TELNYX_FROM, to, text, messaging_profile_id: TELNYX_MSG_PROFILE }),
    })
    const data = await res.json()
    if (res.ok) {
      return { success: true, message_id: data?.data?.id || null }
    }
    const errMsg = data?.errors?.[0]?.detail || data?.errors?.[0]?.title || `HTTP ${res.status}`
    console.error('[BROADCAST SMS]', to, errMsg)
    return { success: false, error: errMsg }
  } catch (err) {
    console.error('[BROADCAST SMS] threw:', err)
    return { success: false, error: err.message || 'Network error' }
  }
}

// GET - list recent broadcasts with their recipients (for History view)
export async function GET(request) {
  try {
    const url = new URL(request.url)
    const limit = parseInt(url.searchParams.get('limit') || '20', 10)
    const { data: broadcasts, error: bErr } = await supabase
      .from('rsa_message_broadcasts')
      .select('*, sent_by_user:sent_by(name, username)')
      .order('sent_at', { ascending: false })
      .limit(limit)
    if (bErr) return NextResponse.json({ error: bErr.message }, { status: 500 })

    if (!broadcasts || broadcasts.length === 0) return NextResponse.json({ broadcasts: [] })

    const broadcastIds = broadcasts.map(b => b.id)
    const { data: recipients, error: rErr } = await supabase
      .from('rsa_message_broadcast_recipients')
      .select('*')
      .in('broadcast_id', broadcastIds)
    if (rErr) return NextResponse.json({ error: rErr.message }, { status: 500 })

    // Group recipients by broadcast_id
    const byBroadcast = {}
    for (const r of recipients || []) {
      if (!byBroadcast[r.broadcast_id]) byBroadcast[r.broadcast_id] = []
      byBroadcast[r.broadcast_id].push(r)
    }

    const result = broadcasts.map(b => ({ ...b, recipients: byBroadcast[b.id] || [] }))
    return NextResponse.json({ broadcasts: result })
  } catch (e) {
    console.error('Broadcasts GET error:', e)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST - create broadcast, send to all recipients, return summary
// Body: { body, recipient_type, recipients: [{ phone, name, user_id?, contact_id? }], template_id?, sent_by? }
export async function POST(request) {
  try {
    const body = await request.json()
    const { body: messageBody, recipient_type, recipients, template_id, sent_by } = body

    if (!messageBody?.trim()) {
      return NextResponse.json({ error: 'Message body required' }, { status: 400 })
    }
    if (!['users', 'contacts', 'custom'].includes(recipient_type)) {
      return NextResponse.json({ error: 'Invalid recipient_type' }, { status: 400 })
    }
    if (!Array.isArray(recipients) || recipients.length === 0) {
      return NextResponse.json({ error: 'At least one recipient required' }, { status: 400 })
    }

    // Pre-format phones and filter out invalid ones
    const prepared = recipients
      .map(r => ({
        ...r,
        formatted_phone: formatPhoneForSms(r.phone),
      }))
      .filter(r => r.formatted_phone)

    if (prepared.length === 0) {
      return NextResponse.json({ error: 'No recipients with valid phone numbers' }, { status: 400 })
    }

    // 1. Insert broadcast row
    const { data: broadcast, error: bErr } = await supabase
      .from('rsa_message_broadcasts')
      .insert([{
        body: messageBody.trim(),
        template_id: template_id || null,
        recipient_type,
        recipient_count: prepared.length,
        success_count: 0,
        failed_count: 0,
        sent_by: sent_by || null,
      }])
      .select()
      .single()
    if (bErr) return NextResponse.json({ error: bErr.message }, { status: 500 })

    // 2. Insert all recipient rows up front as pending (lets us track even if send fails)
    const recipientRows = prepared.map(r => ({
      broadcast_id: broadcast.id,
      user_id: r.user_id || null,
      contact_id: r.contact_id || null,
      phone_snapshot: r.formatted_phone,
      name_snapshot: r.name || null,
      status: 'pending',
    }))
    const { data: inserted, error: rErr } = await supabase
      .from('rsa_message_broadcast_recipients')
      .insert(recipientRows)
      .select()
    if (rErr) {
      console.error('Recipient insert failed:', rErr.message)
      return NextResponse.json({ error: rErr.message }, { status: 500 })
    }

    // 3. Send sequentially. Small loop, no concurrency. Update each row as we go.
    let successCount = 0
    let failedCount = 0
    const results = []

    for (const row of inserted) {
      const result = await sendSms(row.phone_snapshot, messageBody.trim())
      if (result.success) {
        successCount++
        await supabase.from('rsa_message_broadcast_recipients').update({
          status: 'sent',
          telnyx_message_id: result.message_id,
          sent_at: new Date().toISOString(),
        }).eq('id', row.id)
        results.push({ id: row.id, phone: row.phone_snapshot, name: row.name_snapshot, status: 'sent' })
      } else {
        failedCount++
        await supabase.from('rsa_message_broadcast_recipients').update({
          status: 'failed',
          error_message: result.error,
        }).eq('id', row.id)
        results.push({ id: row.id, phone: row.phone_snapshot, name: row.name_snapshot, status: 'failed', error: result.error })
      }
    }

    // 4. Update broadcast counts
    await supabase.from('rsa_message_broadcasts').update({
      success_count: successCount,
      failed_count: failedCount,
    }).eq('id', broadcast.id)

    return NextResponse.json({
      success: true,
      broadcast_id: broadcast.id,
      summary: { total: prepared.length, sent: successCount, failed: failedCount },
      results,
    })
  } catch (e) {
    console.error('Broadcasts POST error:', e)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}