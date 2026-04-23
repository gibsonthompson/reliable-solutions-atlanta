import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

// GET - get crew for a job, or jobs for a user
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const job_id = searchParams.get('job_id')
    const user_id = searchParams.get('user_id')

    if (job_id) {
      const { data, error } = await supabase
        .from('rsa_job_crew')
        .select('id, job_id, user_id, role, assigned_at')
        .eq('job_id', job_id)

      if (error) throw error

      const userIds = (data || []).map(d => d.user_id)
      let userMap = {}
      if (userIds.length > 0) {
        const { data: users } = await supabase.from('rsa_users').select('id, name, username, color, pay_rate').in('id', userIds)
        if (users) users.forEach(u => { userMap[u.id] = u })
      }

      const enriched = (data || []).map(d => ({
        ...d,
        user_name: userMap[d.user_id]?.name || 'Unknown',
        user_username: userMap[d.user_id]?.username || '',
        user_color: userMap[d.user_id]?.color || '#115997',
      }))

      return NextResponse.json({ crew: enriched })
    }

    if (user_id) {
      const { data, error } = await supabase
        .from('rsa_job_crew')
        .select('id, job_id, role, assigned_at')
        .eq('user_id', user_id)

      if (error) throw error
      return NextResponse.json({ assignments: data || [] })
    }

    return NextResponse.json({ error: 'job_id or user_id required' }, { status: 400 })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST - assign crew to a job
export async function POST(request) {
  try {
    const { job_id, user_id, role, assigned_by } = await request.json()
    if (!job_id || !user_id) return NextResponse.json({ error: 'job_id and user_id required' }, { status: 400 })

    const { data, error } = await supabase
      .from('rsa_job_crew')
      .upsert({ job_id, user_id, role: role || 'crew', assigned_by }, { onConflict: 'job_id,user_id' })
      .select()
      .single()

    if (error) throw error
    return NextResponse.json({ assignment: data })
  } catch (error) {
    console.error('Assign crew error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE - remove crew from a job
export async function DELETE(request) {
  try {
    const { job_id, user_id, id } = await request.json()

    if (id) {
      const { error } = await supabase.from('rsa_job_crew').delete().eq('id', id)
      if (error) throw error
    } else if (job_id && user_id) {
      const { error } = await supabase.from('rsa_job_crew').delete().eq('job_id', job_id).eq('user_id', user_id)
      if (error) throw error
    } else {
      return NextResponse.json({ error: 'id or (job_id + user_id) required' }, { status: 400 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}