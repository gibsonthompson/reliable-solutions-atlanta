import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const user_id = searchParams.get('user_id')
    const date = searchParams.get('date') // single day YYYY-MM-DD
    const start = searchParams.get('start') // ISO range start
    const end = searchParams.get('end') // ISO range end

    if (!user_id) return NextResponse.json({ error: 'user_id required' }, { status: 400 })

    let query = supabase
      .from('rsa_time_entries')
      .select('id, user_id, job_id, entry_type, clock_in, clock_out, clock_in_lat, clock_in_lng, clock_out_lat, clock_out_lng, duration_minutes, notes, status, is_manual, created_at')
      .eq('user_id', user_id)
      .order('clock_in', { ascending: false })

    if (date) {
      // Single day query
      const dayStart = `${date}T00:00:00.000Z`
      const dayEnd = `${date}T23:59:59.999Z`
      query = query.gte('clock_in', dayStart).lte('clock_in', dayEnd)
    } else if (start && end) {
      query = query.gte('clock_in', start).lte('clock_in', end)
    } else {
      // Default: last 7 days
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)
      query = query.gte('clock_in', weekAgo.toISOString())
    }

    const { data: entries, error } = await query.limit(200)
    if (error) throw error

    // Get job addresses for entries with job_ids
    const jobIds = [...new Set((entries || []).filter(e => e.job_id).map(e => e.job_id))]
    let jobMap = {}
    if (jobIds.length > 0) {
      const { data: jobs } = await supabase
        .from('rsa_jobs')
        .select('id, address, client')
        .in('id', jobIds)
      if (jobs) {
        jobs.forEach(j => { jobMap[j.id] = j })
      }
    }

    const enriched = (entries || []).map(e => ({
      ...e,
      job_address: e.job_id && jobMap[e.job_id] ? jobMap[e.job_id].address : null,
      job_client: e.job_id && jobMap[e.job_id] ? jobMap[e.job_id].client : null,
    }))

    // Check for weekly approval status if range covers a full week
    let week_status = 'pending'
    if (start) {
      const weekStart = new Date(start)
      const day = weekStart.getDay()
      const monday = new Date(weekStart)
      monday.setDate(weekStart.getDate() - (day === 0 ? 6 : day - 1))
      const mondayStr = monday.toISOString().split('T')[0]

      const { data: weekApproval } = await supabase
        .from('rsa_timesheet_weeks')
        .select('status')
        .eq('user_id', user_id)
        .eq('week_start', mondayStr)
        .maybeSingle()

      if (weekApproval) week_status = weekApproval.status
    }

    return NextResponse.json({ entries: enriched, week_status })
  } catch (error) {
    console.error('Entries error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}