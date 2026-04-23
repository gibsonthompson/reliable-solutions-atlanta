import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function POST(request) {
  try {
    const body = await request.json()
    const { user_id, action, entry_id, job_id, entry_type, notes, clock_in_lat, clock_in_lng, clock_out_lat, clock_out_lng } = body

    if (!user_id || !action) return NextResponse.json({ error: 'user_id and action required' }, { status: 400 })

    if (action === 'clock_in') {
      // Check if already clocked in
      const { data: open } = await supabase
        .from('rsa_time_entries')
        .select('id')
        .eq('user_id', user_id)
        .is('clock_out', null)
        .limit(1)
        .single()

      if (open) return NextResponse.json({ error: 'Already clocked in. Clock out first.' }, { status: 400 })

      const { data: entry, error } = await supabase
        .from('rsa_time_entries')
        .insert([{
          user_id,
          job_id: job_id || null,
          entry_type: entry_type || 'general',
          clock_in: new Date().toISOString(),
          clock_in_lat: clock_in_lat || null,
          clock_in_lng: clock_in_lng || null,
          notes: notes || null,
          status: 'pending',
          is_manual: false,
          created_by: user_id,
        }])
        .select()
        .single()

      if (error) throw error
      return NextResponse.json({ entry, message: 'Clocked in' })
    }

    if (action === 'clock_out') {
      // Find the open entry
      let query = supabase
        .from('rsa_time_entries')
        .select('*')
        .eq('user_id', user_id)
        .is('clock_out', null)

      if (entry_id) query = query.eq('id', entry_id)

      const { data: openEntry, error: findErr } = await query.order('clock_in', { ascending: false }).limit(1).single()

      if (findErr || !openEntry) return NextResponse.json({ error: 'No open time entry found' }, { status: 400 })

      const clockOut = new Date()
      const clockIn = new Date(openEntry.clock_in)
      const durationMinutes = Math.round((clockOut.getTime() - clockIn.getTime()) / 60000)

      const { data: entry, error } = await supabase
        .from('rsa_time_entries')
        .update({
          clock_out: clockOut.toISOString(),
          clock_out_lat: clock_out_lat || null,
          clock_out_lng: clock_out_lng || null,
          duration_minutes: durationMinutes,
          updated_at: new Date().toISOString(),
        })
        .eq('id', openEntry.id)
        .select()
        .single()

      if (error) throw error
      return NextResponse.json({ entry, message: 'Clocked out', duration_minutes: durationMinutes })
    }

    return NextResponse.json({ error: 'Invalid action. Use clock_in or clock_out.' }, { status: 400 })
  } catch (error) {
    console.error('Clock error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}