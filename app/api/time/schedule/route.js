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
    const include_unscheduled = searchParams.get('include_unscheduled') // 'true' to get jobs with no dates

    if (!user_id) return NextResponse.json({ error: 'user_id required' }, { status: 400 })

    const { data: assignments, error: aErr } = await supabase
      .from('rsa_job_crew')
      .select('job_id, role')
      .eq('user_id', user_id)

    if (aErr) throw aErr
    if (!assignments || assignments.length === 0) return NextResponse.json({ jobs: [], unscheduled: [] })

    const jobIds = assignments.map(a => a.job_id)
    const roleMap = {}
    assignments.forEach(a => { roleMap[a.job_id] = a.role })

    const { data: jobs, error: jErr } = await supabase
      .from('rsa_jobs')
      .select('id, address, client, date_start, date_end, status, notes, description')
      .in('id', jobIds)
      .order('date_start', { ascending: true, nullsFirst: false })

    if (jErr) throw jErr

    const allJobs = jobs || []

    // Split into scheduled and unscheduled
    const unscheduled = allJobs
      .filter(j => !j.date_start && j.status !== 'completed' && j.status !== 'cancelled')
      .map(j => ({ ...j, crew_role: roleMap[j.id] || 'crew' }))

    let scheduled = allJobs.filter(j => j.date_start)

    // Filter by date range if provided
    if (start && end) {
      scheduled = scheduled.filter(j => {
        const jobEnd = j.date_end || j.date_start
        return j.date_start <= end && jobEnd >= start
      })
    }

    const enriched = scheduled.map(j => ({ ...j, crew_role: roleMap[j.id] || 'crew' }))

    return NextResponse.json({
      jobs: enriched,
      unscheduled: include_unscheduled === 'true' ? unscheduled : [],
    })
  } catch (error) {
    console.error('Schedule error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}