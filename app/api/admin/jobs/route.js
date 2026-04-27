import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

export async function GET() {
  try {
    const { data, error } = await supabase.from('rsa_jobs').select('*').order('date_start', { ascending: false, nullsFirst: false })
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ jobs: data })
  } catch (e) { return NextResponse.json({ error: 'Internal server error' }, { status: 500 }) }
}

export async function POST(request) {
  try {
    const body = await request.json()
    const { address, date_start, date_end, client, labor, material, gas, misc, revenue, payment_method, taxes, notes, status, description } = body
    if (!address) return NextResponse.json({ error: 'Address is required' }, { status: 400 })
    const { data, error } = await supabase.from('rsa_jobs').insert([{
      address, date_start: date_start || null, date_end: date_end || null, client: client || null,
      labor: labor || 0, material: material || 0, gas: gas || 0, misc: misc || 0,
      revenue: revenue || 0, payment_method: payment_method || null, taxes: taxes || 0,
      notes: notes || null, status: status || 'active', description: description || null
    }]).select().single()
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ success: true, job: data })
  } catch (e) { return NextResponse.json({ error: 'Internal server error' }, { status: 500 }) }
}

export async function PUT(request) {
  try {
    const body = await request.json()
    const { id } = body
    if (!id) return NextResponse.json({ error: 'Job ID required' }, { status: 400 })

    const updates = {}
    if (body.address !== undefined) updates.address = body.address
    if (body.date_start !== undefined) updates.date_start = body.date_start || null
    if (body.date_end !== undefined) updates.date_end = body.date_end || null
    if (body.client !== undefined) updates.client = body.client || null
    if (body.labor !== undefined) updates.labor = parseFloat(body.labor) || 0
    if (body.material !== undefined) updates.material = parseFloat(body.material) || 0
    if (body.gas !== undefined) updates.gas = parseFloat(body.gas) || 0
    if (body.misc !== undefined) updates.misc = parseFloat(body.misc) || 0
    if (body.revenue !== undefined) updates.revenue = parseFloat(body.revenue) || 0
    if (body.payment_method !== undefined) updates.payment_method = body.payment_method || null
    if (body.taxes !== undefined) updates.taxes = parseFloat(body.taxes) || 0
    if (body.notes !== undefined) updates.notes = body.notes || null
    if (body.status !== undefined) updates.status = body.status
    if (body.description !== undefined) updates.description = body.description || null

    if (Object.keys(updates).length === 0) return NextResponse.json({ error: 'No fields to update' }, { status: 400 })

    const { data, error } = await supabase.from('rsa_jobs').update(updates).eq('id', id).select().single()
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ success: true, job: data })
  } catch (e) {
    console.error('Jobs PUT error:', e)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json()
    if (!id) return NextResponse.json({ error: 'Job ID required' }, { status: 400 })

    // Clean up all related data before deleting the job (FK constraints would block otherwise)

    // 1. Remove crew assignments
    const { error: crewErr } = await supabase.from('rsa_job_crew').delete().eq('job_id', id)
    if (crewErr) console.error('Cleanup crew error:', crewErr.message)

    // 2. Unlink time entries (don't delete — keep the hours, just remove the job reference)
    const { error: timeErr } = await supabase
      .from('rsa_time_entries')
      .update({ job_id: null, entry_type: 'general' })
      .eq('job_id', id)
    if (timeErr) console.error('Cleanup time entries error:', timeErr.message)

    // 3. Delete expenses tied to this job
    const { error: expErr } = await supabase.from('rsa_expenses').delete().eq('job_id', id)
    if (expErr) console.error('Cleanup expenses error:', expErr.message)

    // 4. Now delete the job itself
    const { error } = await supabase.from('rsa_jobs').delete().eq('id', id)
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    return NextResponse.json({ success: true })
  } catch (e) {
    console.error('Jobs DELETE error:', e)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}