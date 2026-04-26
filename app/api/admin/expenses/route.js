import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const job_id = searchParams.get('job_id')
    const user_id = searchParams.get('user_id')
    const start = searchParams.get('start')
    const end = searchParams.get('end')

    let query = supabase
      .from('rsa_expenses')
      .select('*')
      .order('expense_date', { ascending: false })

    if (job_id) query = query.eq('job_id', job_id)
    if (user_id) query = query.eq('user_id', user_id)
    if (start) query = query.gte('expense_date', start)
    if (end) query = query.lte('expense_date', end)

    const { data: expenses, error } = await query.limit(500)
    if (error) throw error

    // Enrich with user names and job addresses
    const userIds = [...new Set((expenses || []).map(e => e.user_id))]
    const jobIds = [...new Set((expenses || []).filter(e => e.job_id).map(e => e.job_id))]

    let userMap = {}
    if (userIds.length > 0) {
      const { data: users } = await supabase.from('rsa_users').select('id, name, color').in('id', userIds)
      if (users) users.forEach(u => { userMap[u.id] = u })
    }

    let jobMap = {}
    if (jobIds.length > 0) {
      const { data: jobs } = await supabase.from('rsa_jobs').select('id, address, client').in('id', jobIds)
      if (jobs) jobs.forEach(j => { jobMap[j.id] = j })
    }

    const enriched = (expenses || []).map(e => ({
      ...e,
      user_name: userMap[e.user_id]?.name || 'Unknown',
      user_color: userMap[e.user_id]?.color || '#115997',
      job_address: e.job_id && jobMap[e.job_id] ? jobMap[e.job_id].address : null,
      job_client: e.job_id && jobMap[e.job_id] ? jobMap[e.job_id].client : null,
    }))

    // Get jobs and users for dropdowns
    const { data: allJobs } = await supabase.from('rsa_jobs').select('id, address, client').order('date_start', { ascending: false }).limit(100)
    const { data: allUsers } = await supabase.from('rsa_users').select('id, name').eq('is_active', true).order('name')

    return NextResponse.json({ expenses: enriched, jobs: allJobs || [], users: allUsers || [] })
  } catch (error) {
    console.error('Expenses GET error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const { job_id, user_id, title, description, amount, category, expense_date, is_reimbursable, receipt_url } = await request.json()
    if (!user_id || !title || !amount) return NextResponse.json({ error: 'User, title, and amount required' }, { status: 400 })

    const { data, error } = await supabase
      .from('rsa_expenses')
      .insert([{
        job_id: job_id || null,
        user_id,
        title,
        description: description || null,
        amount: parseFloat(amount),
        category: category || 'other',
        expense_date: expense_date || new Date().toISOString().split('T')[0],
        is_reimbursable: is_reimbursable || false,
        receipt_url: receipt_url || null,
      }])
      .select()
      .single()

    if (error) throw error
    return NextResponse.json({ expense: data })
  } catch (error) {
    console.error('Expenses POST error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(request) {
  try {
    const body = await request.json()
    if (!body.id) return NextResponse.json({ error: 'Expense ID required' }, { status: 400 })

    const updates = { updated_at: new Date().toISOString() }
    if (body.job_id !== undefined) updates.job_id = body.job_id || null
    if (body.title !== undefined) updates.title = body.title
    if (body.description !== undefined) updates.description = body.description
    if (body.amount !== undefined) updates.amount = parseFloat(body.amount)
    if (body.category !== undefined) updates.category = body.category
    if (body.expense_date !== undefined) updates.expense_date = body.expense_date
    if (body.is_reimbursable !== undefined) updates.is_reimbursable = body.is_reimbursable
    if (body.reimbursed_at !== undefined) updates.reimbursed_at = body.reimbursed_at
    if (body.receipt_url !== undefined) updates.receipt_url = body.receipt_url

    const { data, error } = await supabase
      .from('rsa_expenses')
      .update(updates)
      .eq('id', body.id)
      .select()
      .single()

    if (error) throw error
    return NextResponse.json({ expense: data })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json()
    if (!id) return NextResponse.json({ error: 'Expense ID required' }, { status: 400 })
    const { error } = await supabase.from('rsa_expenses').delete().eq('id', id)
    if (error) throw error
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}