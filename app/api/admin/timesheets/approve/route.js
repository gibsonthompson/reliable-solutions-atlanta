import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

// POST - approve or reject a week for a user
export async function POST(request) {
  try {
    const { user_id, week_start, status, approved_by, notes } = await request.json()
    if (!user_id || !week_start || !status) return NextResponse.json({ error: 'user_id, week_start, and status required' }, { status: 400 })
    if (!['approved', 'rejected', 'pending'].includes(status)) return NextResponse.json({ error: 'Invalid status' }, { status: 400 })

    // Calculate total hours for this week
    const weekEnd = new Date(week_start + 'T00:00:00')
    weekEnd.setDate(weekEnd.getDate() + 7)

    const { data: entries } = await supabase
      .from('rsa_time_entries')
      .select('duration_minutes')
      .eq('user_id', user_id)
      .gte('clock_in', week_start + 'T00:00:00.000Z')
      .lt('clock_in', weekEnd.toISOString())
      .not('clock_out', 'is', null)

    const totalMins = (entries || []).reduce((sum, e) => sum + (e.duration_minutes || 0), 0)
    const totalHours = totalMins / 60
    const regularHours = Math.min(totalHours, 40)
    const overtimeHours = Math.max(0, totalHours - 40)

    // Upsert weekly record
    const { data, error } = await supabase
      .from('rsa_timesheet_weeks')
      .upsert({
        user_id,
        week_start,
        total_hours: parseFloat(totalHours.toFixed(2)),
        regular_hours: parseFloat(regularHours.toFixed(2)),
        overtime_hours: parseFloat(overtimeHours.toFixed(2)),
        status,
        approved_by: (status === 'approved' || status === 'rejected') ? approved_by : null,
        approved_at: (status === 'approved' || status === 'rejected') ? new Date().toISOString() : null,
        notes: notes || null,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'user_id,week_start' })
      .select()
      .single()

    if (error) throw error

    // Also update all entries for this week to match status
    if (status === 'approved' || status === 'rejected') {
      await supabase
        .from('rsa_time_entries')
        .update({ status, approved_by, approved_at: new Date().toISOString(), updated_at: new Date().toISOString() })
        .eq('user_id', user_id)
        .gte('clock_in', week_start + 'T00:00:00.000Z')
        .lt('clock_in', weekEnd.toISOString())
        .not('clock_out', 'is', null)
    }

    return NextResponse.json({ week: data })
  } catch (error) {
    console.error('Approve error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// GET - get weekly approval statuses
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const week_start = searchParams.get('week_start')

    let query = supabase.from('rsa_timesheet_weeks').select('*').order('week_start', { ascending: false })
    if (week_start) query = query.eq('week_start', week_start)

    const { data, error } = await query.limit(100)
    if (error) throw error
    return NextResponse.json({ weeks: data || [] })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}