import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function GET() {
  try {
    const { data: assignments, error } = await supabase
      .from('rsa_job_crew')
      .select('id, job_id, user_id, role, assigned_at')
      .order('assigned_at', { ascending: true })

    if (error) throw error

    // Get user details — only active users
    const userIds = [...new Set((assignments || []).map(a => a.user_id))]
    let userMap = {}
    if (userIds.length > 0) {
      const { data: users } = await supabase.from('rsa_users').select('id, name, username, color, pay_rate, is_active').in('id', userIds)
      if (users) users.forEach(u => { userMap[u.id] = u })
    }

    // Verify which jobs still exist (handles orphaned crew assignments)
    const jobIds = [...new Set((assignments || []).map(a => a.job_id))]
    let existingJobIds = new Set()
    if (jobIds.length > 0) {
      const { data: jobs } = await supabase.from('rsa_jobs').select('id').in('id', jobIds)
      if (jobs) jobs.forEach(j => { existingJobIds.add(j.id) })
    }

    // Filter out assignments for deleted jobs or deactivated users
    const validAssignments = (assignments || []).filter(a =>
      existingJobIds.has(a.job_id) && userMap[a.user_id]
    )

    // Group by job_id (only include active users)
    const byJob = {}
    validAssignments.forEach(a => {
      const user = userMap[a.user_id]
      if (!user?.is_active) return // skip deactivated users in job crew lists
      if (!byJob[a.job_id]) byJob[a.job_id] = []
      byJob[a.job_id].push({
        ...a,
        user_name: user.name || 'Unknown',
        user_username: user.username || '',
        user_color: user.color || '#115997',
        user_pay_rate: user.pay_rate || null,
      })
    })

    // Group by user_id (include all for schedule purposes)
    const byUser = {}
    validAssignments.forEach(a => {
      if (!byUser[a.user_id]) byUser[a.user_id] = []
      byUser[a.user_id].push({ job_id: a.job_id, role: a.role })
    })

    return NextResponse.json({ by_job: byJob, by_user: byUser, total: validAssignments.length })
  } catch (error) {
    console.error('Bulk crew error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}