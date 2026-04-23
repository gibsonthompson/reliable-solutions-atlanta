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
    const start = searchParams.get('start')
    const end = searchParams.get('end')

    if (!user_id) return NextResponse.json({ error: 'user_id required' }, { status: 400 })

    // Get job IDs assigned to this user
    const { data: assignments, error: aErr } = await supabase
      .from('rsa_job_crew')
      .select('job_id, role')
      .eq('user_id', user_id)

    if (aErr) throw aErr
    if (!assignments || assignments.length === 0) return NextResponse.json({ jobs: [] })

    const jobIds = assignments.map(a => a.job_id)
    const roleMap = {}
    assignments.forEach(a => { roleMap[a.job_id] = a.role })

    // Get those jobs, filtered by date range if provided
    let query = supabase
      .from('rsa_jobs')
      .select('id, address, client, date_start, date_end, status, notes, description')
      .in('id', jobIds)
      .order('date_start', { ascending: true })

    if (start && end) {
      // Jobs that overlap with the date range
      query = query
        .or(`date_start.lte.${end},date_end.gte.${start},and(date_start.lte.${end},date_end.is.null)`)
    }

    const { data: jobs, error: jErr } = await query
    if (jErr) throw jErr

    // Enrich with crew role
    const enriched = (jobs || []).map(j => ({
      ...j,
      crew_role: roleMap[j.id] || 'crew'
    }))

    return NextResponse.json({ jobs: enriched })
  } catch (error) {
    console.error('Schedule error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}