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
    if (!user_id) return NextResponse.json({ error: 'user_id required' }, { status: 400 })

    // Find any open (no clock_out) entry for this user
    const { data: openEntry, error } = await supabase
      .from('rsa_time_entries')
      .select('id, user_id, job_id, entry_type, clock_in, clock_in_lat, clock_in_lng, notes, status')
      .eq('user_id', user_id)
      .is('clock_out', null)
      .order('clock_in', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (error) throw error

    if (openEntry) {
      // If there's a job, get the address
      let job_address = null
      if (openEntry.job_id) {
        const { data: job } = await supabase
          .from('rsa_jobs')
          .select('address')
          .eq('id', openEntry.job_id)
          .single()
        if (job) job_address = job.address
      }

      const elapsed = Math.floor((Date.now() - new Date(openEntry.clock_in).getTime()) / 1000)
      return NextResponse.json({
        clocked_in: true,
        entry: { ...openEntry, job_address },
        elapsed
      })
    }

    return NextResponse.json({ clocked_in: false, entry: null, elapsed: 0 })
  } catch (error) {
    console.error('Status error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}