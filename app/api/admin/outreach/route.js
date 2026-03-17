import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

// GET outreach history for a contact
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const contactId = searchParams.get('contact_id')

    if (!contactId) {
      return NextResponse.json({ error: 'contact_id required' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('rsa_outreach_log')
      .select('*')
      .eq('contact_id', contactId)
      .order('created_at', { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ outreach: data })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST log a new outreach entry
export async function POST(request) {
  try {
    const body = await request.json()
    const { contact_id, type, subject, body: emailBody, template_id } = body

    if (!contact_id) {
      return NextResponse.json({ error: 'contact_id required' }, { status: 400 })
    }

    // Insert outreach log
    const { data, error } = await supabase
      .from('rsa_outreach_log')
      .insert([{
        contact_id,
        type: type || 'email',
        subject,
        body: emailBody,
        template_id: template_id || null,
      }])
      .select()
      .single()

    if (error) {
      console.error('Outreach insert error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Update contact outreach count and last_contacted_at
    await supabase.rpc('increment_outreach_count', { contact_uuid: contact_id }).catch(() => {
      // Fallback if RPC doesn't exist — update directly
      supabase
        .from('contact_submissions')
        .update({
          outreach_count: supabase.raw('COALESCE(outreach_count, 0) + 1'),
          last_contacted_at: new Date().toISOString(),
        })
        .eq('id', contact_id)
        .then(() => {})
        .catch(() => {})
    })

    // Simple increment fallback
    const { data: contactData } = await supabase
      .from('contact_submissions')
      .select('outreach_count')
      .eq('id', contact_id)
      .single()

    await supabase
      .from('contact_submissions')
      .update({
        outreach_count: (contactData?.outreach_count || 0) + 1,
        last_contacted_at: new Date().toISOString(),
      })
      .eq('id', contact_id)

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE outreach entries for a contact (used when deleting contact)
export async function DELETE(request) {
  try {
    const body = await request.json()
    const { contact_id } = body

    if (!contact_id) {
      return NextResponse.json({ error: 'contact_id required' }, { status: 400 })
    }

    // Delete outreach logs
    await supabase
      .from('rsa_outreach_log')
      .delete()
      .eq('contact_id', contact_id)

    // Delete the contact itself
    const { error } = await supabase
      .from('contact_submissions')
      .delete()
      .eq('id', contact_id)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}