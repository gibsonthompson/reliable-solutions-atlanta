import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const start = searchParams.get('start')
    const end = searchParams.get('end')
    const user_id = searchParams.get('user_id')

    if (!start || !end) return NextResponse.json({ error: 'start and end dates required' }, { status: 400 })

    let query = supabase
      .from('rsa_time_entries')
      .select('id, user_id, job_id, entry_type, clock_in, clock_out, duration_minutes, notes, status, is_manual')
      .gte('clock_in', start)
      .lte('clock_in', end)
      .not('clock_out', 'is', null)
      .order('clock_in', { ascending: true })

    if (user_id) query = query.eq('user_id', user_id)

    const { data: entries, error } = await query.limit(2000)
    if (error) throw error

    // Get user details
    const userIds = [...new Set((entries || []).map(e => e.user_id))]
    let userMap = {}
    if (userIds.length > 0) {
      const { data: users } = await supabase.from('rsa_users').select('id, name, username, pay_rate').in('id', userIds)
      if (users) users.forEach(u => { userMap[u.id] = u })
    }

    // Get job addresses
    const jobIds = [...new Set((entries || []).filter(e => e.job_id).map(e => e.job_id))]
    let jobMap = {}
    if (jobIds.length > 0) {
      const { data: jobs } = await supabase.from('rsa_jobs').select('id, address').in('id', jobIds)
      if (jobs) jobs.forEach(j => { jobMap[j.id] = j })
    }

    // Build CSV
    const headers = ['Date', 'Employee', 'Username', 'Clock In', 'Clock Out', 'Hours', 'Minutes', 'Type', 'Job Address', 'Pay Rate', 'Labor Cost', 'Status', 'Manual', 'Notes']
    const rows = (entries || []).map(e => {
      const ciDate = new Date(e.clock_in)
      const coDate = new Date(e.clock_out)
      const hours = e.duration_minutes ? (e.duration_minutes / 60).toFixed(2) : '0'
      const payRate = userMap[e.user_id]?.pay_rate || 0
      const laborCost = e.duration_minutes ? ((e.duration_minutes / 60) * payRate).toFixed(2) : '0'

      return [
        ciDate.toLocaleDateString('en-US'),
        userMap[e.user_id]?.name || 'Unknown',
        userMap[e.user_id]?.username || '',
        ciDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
        coDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
        hours,
        e.duration_minutes || 0,
        e.entry_type,
        e.job_id && jobMap[e.job_id] ? jobMap[e.job_id].address : '',
        payRate ? '$' + payRate : '',
        laborCost !== '0' ? '$' + laborCost : '',
        e.status,
        e.is_manual ? 'Yes' : 'No',
        (e.notes || '').replace(/,/g, ';').replace(/\n/g, ' '),
      ]
    })

    // Add summary rows per employee
    const summaryByUser = {}
    ;(entries || []).forEach(e => {
      if (!summaryByUser[e.user_id]) summaryByUser[e.user_id] = { name: userMap[e.user_id]?.name || 'Unknown', totalMins: 0, totalCost: 0, payRate: userMap[e.user_id]?.pay_rate || 0 }
      summaryByUser[e.user_id].totalMins += e.duration_minutes || 0
      summaryByUser[e.user_id].totalCost += (e.duration_minutes || 0) / 60 * (userMap[e.user_id]?.pay_rate || 0)
    })

    rows.push([]) // blank line
    rows.push(['SUMMARY', '', '', '', '', '', '', '', '', '', '', '', '', ''])
    rows.push(['Employee', '', '', '', '', 'Total Hours', 'Total Minutes', '', '', 'Pay Rate', 'Total Labor Cost', 'Regular Hours', 'Overtime Hours', ''])
    Object.values(summaryByUser).forEach(s => {
      const totalHours = s.totalMins / 60
      const regular = Math.min(totalHours, 40)
      const overtime = Math.max(0, totalHours - 40)
      rows.push([s.name, '', '', '', '', totalHours.toFixed(2), s.totalMins, '', '', s.payRate ? '$' + s.payRate : '', '$' + s.totalCost.toFixed(2), regular.toFixed(2), overtime.toFixed(2), ''])
    })

    const csvContent = [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n')

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="timesheets-${start}-to-${end}.csv"`,
      },
    })
  } catch (error) {
    console.error('CSV export error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}