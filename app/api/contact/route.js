import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const TELNYX_MSG_PROFILE = '40019bc3-6345-42ca-84bd-a9a2ed3bd66f'
const TELNYX_FROM = '+15058332344'

async function sendSmsNotification(text) {
  if (!process.env.TELNYX_API_KEY || !process.env.RSA_NOTIFICATION_PHONE) return

  try {
    await fetch('https://api.telnyx.com/v2/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.TELNYX_API_KEY}`,
      },
      body: JSON.stringify({
        from: TELNYX_FROM,
        to: process.env.RSA_NOTIFICATION_PHONE,
        text,
        messaging_profile_id: TELNYX_MSG_PROFILE,
      }),
    })
  } catch (err) {
    console.error('SMS notification failed:', err)
  }
}

// ── Spam Detection (name + email + message patterns) ─────────────────
function isSpam({ name, email, message }) {
  // 1. Name pattern detection — gibberish mixed-case like "DaFtEleExbYZPCNV"
  if (name) {
    // Count uppercase-to-lowercase transitions (real names have 1-2, gibberish has many)
    const transitions = (name.match(/[A-Z][a-z]|[a-z][A-Z]/g) || []).length
    if (transitions > 4) return 'gibberish_name'

    // 3+ consecutive uppercase in a single word (excluding all-caps words like "LLC")
    const words = name.split(/\s+/)
    for (const word of words) {
      if (word.length > 3 && /[A-Z]{3,}/.test(word) && word !== word.toUpperCase()) {
        return 'gibberish_name'
      }
    }

    // Single word with 12+ chars and no spaces — very likely bot
    if (name.trim().split(/\s+/).length === 1 && name.trim().length > 12) {
      return 'suspicious_name'
    }
  }

  // 2. Email pattern — multiple dots before @ like "ho.l.u.w.o.g.e@gmail.com"
  if (email) {
    const localPart = email.split('@')[0] || ''
    const dotCount = (localPart.match(/\./g) || []).length
    if (dotCount >= 4) return 'dotted_email'

    // Single-char segments between dots: a.b.c.d.e@
    const segments = localPart.split('.')
    const tinySegments = segments.filter(s => s.length <= 2).length
    if (tinySegments >= 3) return 'fragmented_email'
  }

  // 3. Message keyword detection — spam solicitations
  if (message) {
    const msgLower = message.toLowerCase()
    const spamKeywords = ['seo', 'search engine optimization', 'backlink', 'link building', 'rank your website', 'first page of google', 'domain authority']
    for (const keyword of spamKeywords) {
      if (msgLower.includes(keyword)) return 'spam_keyword_' + keyword.replace(/\s+/g, '_')
    }
  }

  return null
}

export async function POST(request) {
  try {
    const body = await request.json()
    const { name, email, phone, service_type, message } = body

    if (!name || !email || !phone || !service_type) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check for spam
    const spamReason = isSpam({ name, email, message })
    if (spamReason) {
      console.log(`[SPAM BLOCKED] reason=${spamReason} name="${name}" email="${email}"`)
      // Return 200 so bots think it worked
      return NextResponse.json({ success: true })
    }

    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([{ name, email, phone, service_type, message: message || null }])
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: 'Failed to submit form' }, { status: 500 })
    }

    // Send SMS notification
    const smsBody = [
      'New Lead - RSA',
      name,
      phone,
      service_type,
      message ? message : null,
    ].filter(Boolean).join('\n')

    await sendSmsNotification(smsBody)

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')

    let query = supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false })

    if (status && status !== 'all') {
      query = query.eq('status', status)
    }

    const { data, error } = await query

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ data })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PATCH(request) {
  try {
    const body = await request.json()
    const { id, status, notes, next_follow_up } = body

    if (!id) {
      return NextResponse.json({ error: 'Missing submission ID' }, { status: 400 })
    }

    const updateData = {}
    if (status) updateData.status = status
    if (notes !== undefined) updateData.notes = notes
    if (next_follow_up !== undefined) updateData.next_follow_up = next_follow_up

    const { data, error } = await supabase
      .from('contact_submissions')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}