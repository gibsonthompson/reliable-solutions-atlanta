import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import Telnyx from 'telnyx'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

// Initialize Telnyx if API key exists
const telnyx = process.env.TELNYX_API_KEY ? Telnyx(process.env.TELNYX_API_KEY) : null
const TELNYX_MSG_PROFILE = '40019bc3-6345-42ca-84bd-a9a2ed3bd66f'
const TELNYX_FROM = '+15058332344'

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
    if (telnyx && process.env.RSA_NOTIFICATION_PHONE) {
      try {
        const smsBody = [
          'New Lead - RSA',
          name,
          phone,
          service_type,
          message ? message : null,
        ].filter(Boolean).join('\n')

        await telnyx.messages.create({
          from: TELNYX_FROM,
          to: process.env.RSA_NOTIFICATION_PHONE,
          text: smsBody,
          messaging_profile_id: TELNYX_MSG_PROFILE,
        })
      } catch (smsError) {
        console.error('SMS notification failed:', smsError)
        // Don't fail the form submission if SMS fails
      }
    }

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