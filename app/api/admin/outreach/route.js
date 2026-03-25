import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

// GET outreach history for a contact or prospect
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const contactId = searchParams.get('contact_id')
    const prospectId = searchParams.get('prospect_id')

    if (!contactId && !prospectId) {
      return NextResponse.json({ error: 'contact_id or prospect_id required' }, { status: 400 })
    }

    let query = supabase
      .from('rsa_outreach_log')
      .select('*')
      .order('created_at', { ascending: false })

    if (contactId) {
      query = query.eq('contact_id', contactId)
    } else {
      query = query.eq('prospect_id', prospectId)
    }

    const { data, error } = await query

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
    const { contact_id, prospect_id, type, subject, body: emailBody, template_id } = body

    if (!contact_id && !prospect_id) {
      return NextResponse.json({ error: 'contact_id or prospect_id required' }, { status: 400 })
    }

    // Insert outreach log
    const insertData = {
      type: type || 'email',
      subject,
      body: emailBody,
      template_id: template_id || null,
    }
    if (contact_id) insertData.contact_id = contact_id
    if (prospect_id) insertData.prospect_id = prospect_id

    const { data, error } = await supabase
      .from('rsa_outreach_log')
      .insert([insertData])
      .select()
      .single()

    if (error) {
      console.error('Outreach insert error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Update outreach count on the parent record
    if (contact_id) {
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
    }

    if (prospect_id) {
      const { data: prospectData } = await supabase
        .from('rsa_prospects')
        .select('outreach_count')
        .eq('id', prospect_id)
        .single()

      await supabase
        .from('rsa_prospects')
        .update({
          outreach_count: (prospectData?.outreach_count || 0) + 1,
          last_contacted_at: new Date().toISOString(),
        })
        .eq('id', prospect_id)
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE outreach entries (used when deleting a contact or prospect)
export async function DELETE(request) {
  try {
    const body = await request.json()
    const { contact_id, prospect_id } = body

    if (contact_id) {
      await supabase.from('rsa_outreach_log').delete().eq('contact_id', contact_id)
      await supabase.from('contact_submissions').delete().eq('id', contact_id)
    }

    if (prospect_id) {
      await supabase.from('rsa_outreach_log').delete().eq('prospect_id', prospect_id)
      await supabase.from('rsa_prospects').delete().eq('id', prospect_id)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}