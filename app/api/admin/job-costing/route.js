import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

// GET - returns costing data for one or all jobs
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const job_id = searchParams.get('job_id')

    // Get time entries grouped by job
    let timeQuery = supabase
      .from('rsa_time_entries')
      .select('job_id, user_id, duration_minutes')
      .not('clock_out', 'is', null)
      .not('job_id', 'is', null)

    if (job_id) timeQuery = timeQuery.eq('job_id', job_id)

    const { data: timeEntries, error: tErr } = await timeQuery
    if (tErr) throw tErr

    // Get expenses grouped by job
    let expQuery = supabase
      .from('rsa_expenses')
      .select('job_id, amount, category')
      .not('job_id', 'is', null)

    if (job_id) expQuery = expQuery.eq('job_id', job_id)

    const { data: expenses, error: eErr } = await expQuery
    if (eErr) throw eErr

    // Get user pay rates
    const userIds = [...new Set((timeEntries || []).map(e => e.user_id))]
    let payRates = {}
    if (userIds.length > 0) {
      const { data: users } = await supabase.from('rsa_users').select('id, pay_rate').in('id', userIds)
      if (users) users.forEach(u => { payRates[u.id] = parseFloat(u.pay_rate) || 0 })
    }

    // Aggregate by job
    const jobCosts = {}

    ;(timeEntries || []).forEach(e => {
      if (!jobCosts[e.job_id]) jobCosts[e.job_id] = { labor_minutes: 0, labor_cost: 0, expense_total: 0, expenses_by_category: {} }
      jobCosts[e.job_id].labor_minutes += e.duration_minutes || 0
      jobCosts[e.job_id].labor_cost += ((e.duration_minutes || 0) / 60) * (payRates[e.user_id] || 0)
    })

    ;(expenses || []).forEach(e => {
      if (!jobCosts[e.job_id]) jobCosts[e.job_id] = { labor_minutes: 0, labor_cost: 0, expense_total: 0, expenses_by_category: {} }
      const amt = parseFloat(e.amount) || 0
      jobCosts[e.job_id].expense_total += amt
      jobCosts[e.job_id].expenses_by_category[e.category] = (jobCosts[e.job_id].expenses_by_category[e.category] || 0) + amt
    })

    // Round values
    Object.keys(jobCosts).forEach(jid => {
      jobCosts[jid].labor_hours = parseFloat((jobCosts[jid].labor_minutes / 60).toFixed(2))
      jobCosts[jid].labor_cost = parseFloat(jobCosts[jid].labor_cost.toFixed(2))
      jobCosts[jid].expense_total = parseFloat(jobCosts[jid].expense_total.toFixed(2))
      jobCosts[jid].total_cost = parseFloat((jobCosts[jid].labor_cost + jobCosts[jid].expense_total).toFixed(2))
    })

    return NextResponse.json({ costs: jobCosts })
  } catch (error) {
    console.error('Job costing error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}