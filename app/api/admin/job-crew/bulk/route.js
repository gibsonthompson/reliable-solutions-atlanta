import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

// GET - returns all job-crew assignments grouped by job_id, with user details
export async function GET() {
  try {
    const { data: assignments, error } = await supabase
      .from('rsa_job_crew')
      .select('id, job_id, user_id, role, assigned_at')
      .order('assigned_at', { ascending: true })

    if (error) throw error

    const userIds = [...new Set((assignments || []).map(a => a.user_id))]
    let userMap = {}
    if (userIds.length > 0) {
      const { data: users } = await supabase.from('rsa_users').select('id, name, username, color, pay_rate').in('id', userIds)
      if (users) users.forEach(u => { userMap[u.id] = u })
    }

    // Group by job_id
    const byJob = {}
    ;(assignments || []).forEach(a => {
      if (!byJob[a.job_id]) byJob[a.job_id] = []
      byJob[a.job_id].push({
        ...a,
        user_name: userMap[a.user_id]?.name || 'Unknown',
        user_username: userMap[a.user_id]?.username || '',
        user_color: userMap[a.user_id]?.color || '#115997',
        user_pay_rate: userMap[a.user_id]?.pay_rate || null,
      })
    })

    // Also group by user_id for schedule view
    const byUser = {}
    ;(assignments || []).forEach(a => {
      if (!byUser[a.user_id]) byUser[a.user_id] = []
      byUser[a.user_id].push({ job_id: a.job_id, role: a.role })
    })

    return NextResponse.json({ by_job: byJob, by_user: byUser, total: (assignments || []).length })
  } catch (error) {
    console.error('Bulk crew error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}