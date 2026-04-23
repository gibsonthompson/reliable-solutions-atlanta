import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

// GET - list all time entries with filters
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const user_id = searchParams.get('user_id')
    const date = searchParams.get('date')
    const start = searchParams.get('start')
    const end = searchParams.get('end')
    const status = searchParams.get('status')

    let query = supabase
      .from('rsa_time_entries')
      .select('id, user_id, job_id, entry_type, clock_in, clock_out, clock_in_lat, clock_in_lng, clock_out_lat, clock_out_lng, duration_minutes, notes, status, is_manual, approved_by, approved_at, created_by, created_at, updated_at')
      .order('clock_in', { ascending: false })

    if (user_id) query = query.eq('user_id', user_id)
    if (status) query = query.eq('status', status)

    if (date) {
      query = query.gte('clock_in', `${date}T00:00:00.000Z`).lte('clock_in', `${date}T23:59:59.999Z`)
    } else if (start && end) {
      query = query.gte('clock_in', start).lte('clock_in', end)
    }

    const { data: entries, error } = await query.limit(500)
    if (error) throw error

    // Enrich with user names and job addresses
    const userIds = [...new Set((entries || []).map(e => e.user_id))]
    const jobIds = [...new Set((entries || []).filter(e => e.job_id).map(e => e.job_id))]

    let userMap = {}
    if (userIds.length > 0) {
      const { data: users } = await supabase.from('rsa_users').select('id, name, username, color, pay_rate').in('id', userIds)
      if (users) users.forEach(u => { userMap[u.id] = u })
    }

    let jobMap = {}
    if (jobIds.length > 0) {
      const { data: jobs } = await supabase.from('rsa_jobs').select('id, address, client').in('id', jobIds)
      if (jobs) jobs.forEach(j => { jobMap[j.id] = j })
    }

    const enriched = (entries || []).map(e => ({
      ...e,
      user_name: userMap[e.user_id]?.name || 'Unknown',
      user_username: userMap[e.user_id]?.username || '',
      user_color: userMap[e.user_id]?.color || '#115997',
      user_pay_rate: userMap[e.user_id]?.pay_rate || 0,
      job_address: e.job_id && jobMap[e.job_id] ? jobMap[e.job_id].address : null,
      job_client: e.job_id && jobMap[e.job_id] ? jobMap[e.job_id].client : null,
      labor_cost: e.duration_minutes && userMap[e.user_id]?.pay_rate
        ? ((e.duration_minutes / 60) * userMap[e.user_id].pay_rate).toFixed(2)
        : null,
    }))

    // Also get active users for the filter dropdown
    const { data: allUsers } = await supabase
      .from('rsa_users')
      .select('id, name, username, color, pay_rate')
      .eq('is_active', true)
      .order('name')

    return NextResponse.json({ entries: enriched, users: allUsers || [] })
  } catch (error) {
    console.error('Timesheets GET error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST - create manual time entry (admin override)
export async function POST(request) {
  try {
    const { user_id, job_id, entry_type, clock_in, clock_out, notes, created_by } = await request.json()
    if (!user_id || !clock_in || !clock_out) return NextResponse.json({ error: 'user_id, clock_in, and clock_out required' }, { status: 400 })

    const clockInDate = new Date(clock_in)
    const clockOutDate = new Date(clock_out)
    if (clockOutDate <= clockInDate) return NextResponse.json({ error: 'Clock out must be after clock in' }, { status: 400 })

    const durationMinutes = Math.round((clockOutDate.getTime() - clockInDate.getTime()) / 60000)

    const { data: entry, error } = await supabase
      .from('rsa_time_entries')
      .insert([{
        user_id,
        job_id: job_id || null,
        entry_type: entry_type || 'general',
        clock_in: clockInDate.toISOString(),
        clock_out: clockOutDate.toISOString(),
        duration_minutes: durationMinutes,
        notes: notes || null,
        status: 'approved',
        is_manual: true,
        created_by: created_by || null,
      }])
      .select()
      .single()

    if (error) throw error
    return NextResponse.json({ entry })
  } catch (error) {
    console.error('Timesheets POST error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PUT - edit a time entry (admin override)
export async function PUT(request) {
  try {
    const { id, clock_in, clock_out, job_id, entry_type, notes, status, approved_by } = await request.json()
    if (!id) return NextResponse.json({ error: 'Entry ID required' }, { status: 400 })

    const updates = { updated_at: new Date().toISOString() }
    if (clock_in !== undefined) updates.clock_in = clock_in
    if (clock_out !== undefined) updates.clock_out = clock_out
    if (job_id !== undefined) updates.job_id = job_id
    if (entry_type !== undefined) updates.entry_type = entry_type
    if (notes !== undefined) updates.notes = notes
    if (status !== undefined) {
      updates.status = status
      if (status === 'approved' || status === 'rejected') {
        updates.approved_by = approved_by || null
        updates.approved_at = new Date().toISOString()
      }
    }

    // Recalculate duration if times changed
    if (updates.clock_in || updates.clock_out) {
      const { data: existing } = await supabase.from('rsa_time_entries').select('clock_in, clock_out').eq('id', id).single()
      if (existing) {
        const ci = new Date(updates.clock_in || existing.clock_in)
        const co = updates.clock_out || existing.clock_out
        if (co) {
          updates.duration_minutes = Math.round((new Date(co).getTime() - ci.getTime()) / 60000)
        }
      }
    }

    const { data: entry, error } = await supabase
      .from('rsa_time_entries')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return NextResponse.json({ entry })
  } catch (error) {
    console.error('Timesheets PUT error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE - remove a time entry
export async function DELETE(request) {
  try {
    const { id } = await request.json()
    if (!id) return NextResponse.json({ error: 'Entry ID required' }, { status: 400 })

    const { error } = await supabase.from('rsa_time_entries').delete().eq('id', id)
    if (error) throw error
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}