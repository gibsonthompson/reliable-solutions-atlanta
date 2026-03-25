import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const contactId = searchParams.get('contact_id')

    if (!contactId) {
      return NextResponse.json({ error: 'contact_id required' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('rsa_activity_log')
      .select('*')
      .eq('contact_id', contactId)
      .order('created_at', { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ activity: data })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const body = await request.json()
    const { contact_id, action, old_value, new_value, note } = body

    if (!contact_id || !action) {
      return NextResponse.json({ error: 'contact_id and action required' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('rsa_activity_log')
      .insert([{
        contact_id,
        action,
        old_value: old_value || null,
        new_value: new_value || null,
        note: note || null,
      }])
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