import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import { STAGE_KEYS } from '../../../lib/pipeline'
import { isSpam } from '../../../lib/spamFilter'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

// Triggers auto-job creation only on in_progress (per Gibson's preference).
// Idempotent via existingJob duplicate check on address+client.
const AUTO_JOB_STATUSES = ['in_progress']

async function createAutoJob(contactRow) {
  try {
    const jobAddress = contactRow.address || contactRow.name || 'No address'
    const jobClient = contactRow.name || ''

    const { data: existingJob } = await supabase
      .from('rsa_jobs')
      .select('id')
      .eq('address', jobAddress)
      .eq('client', jobClient)
      .limit(1)
      .maybeSingle()

    if (existingJob) {
      return { created: false, reason: 'already_exists', job_id: existingJob.id }
    }

    const { data: newJob, error: jobError } = await supabase.from('rsa_jobs').insert([{
      address: jobAddress,
      client: jobClient,
      notes: contactRow.service_type || null,
      description: contactRow.service_type || null,
      date_start: contactRow.scheduled_date || null,
      date_end: null,
      status: 'active',
      labor: 0,
      material: 0,
      gas: 0,
      misc: 0,
      revenue: 0,
      taxes: 0,
      payment_method: null,
    }]).select().single()

    if (jobError) {
      console.error('[AUTO-JOB] Failed:', jobError.message)
      return { created: false, error: jobError.message }
    }

    console.log(`[AUTO-JOB] Created job ${newJob.id} for ${jobClient} at ${jobAddress}`)
    return { created: true, job_id: newJob.id }
  } catch (jobErr) {
    console.error('[AUTO-JOB] Error:', jobErr)
    return { created: false, error: jobErr.message }
  }
}

export async function POST(request) {
  try {
    const body = await request.json()
    const { name, email, phone, service_type, message, source, address, referral_source, initial_status, company } = body
    if (!name || !phone || !service_type) return NextResponse.json({ error: 'Missing required fields (name, phone, service type)' }, { status: 400 })

    const isManualEntry = source === 'calendar' || source === 'manual' || source === 'admin'
    if (!isManualEntry) {
      if (!email) return NextResponse.json({ error: 'Missing email' }, { status: 400 })
      const spamReason = isSpam({ name, email, phone, address, message, service_type, referral_source, company })
      if (spamReason) {
        console.log(`[SPAM BLOCKED] reason=${spamReason} name="${name}" email="${email}" address="${address || ''}"`)
        // Respond like a normal success so bots don't learn they were filtered. No row, no contact, no text.
        return NextResponse.json({ success: true })
      }
    }

    // Validate initial_status against the pipeline single source of truth. Only admin/manual sources can set this.
    const status = (isManualEntry && initial_status && STAGE_KEYS.includes(initial_status)) ? initial_status : 'new'

    const insertData = { name, email: email || null, phone, service_type, message: message || null, source: source || 'website', status }
    if (address) insertData.address = address
    if (referral_source) insertData.referral_source = referral_source

    const { data, error } = await supabase.from('contact_submissions').insert([insertData]).select().single()
    if (error) { console.error('Supabase error:', error); return NextResponse.json({ error: 'Failed to submit form' }, { status: 500 }) }

    try {
      let isDuplicate = false
      if (email && email !== 'noemail@placeholder.com') {
        const { data: existing } = await supabase
          .from('rsa_prospects')
          .select('id')
          .eq('email', email.toLowerCase().trim())
          .limit(1)
          .maybeSingle()
        if (existing) isDuplicate = true
      }

      if (!isDuplicate) {
        const prospectData = {
          name,
          email: (email && email !== 'noemail@placeholder.com') ? email : null,
          phone: phone !== '0000000000' ? phone : null,
          source: source || 'website',
          status: 'new',
          notes: service_type + (address ? ' - ' + address : '') + (message ? ' - ' + message : ''),
          area: service_type,
        }
        const { error: prospectError } = await supabase.from('rsa_prospects').insert([prospectData])
        if (prospectError) console.error('Auto-create contact error:', prospectError.message)
        else console.log(`[AUTO-CONTACT] Created contact for ${name} (${email || 'no email'}) from ${source || 'website'}`)
      } else {
        console.log(`[AUTO-CONTACT] Skipped duplicate for ${email}`)
      }
    } catch (prospectErr) {
      console.error('Auto-create contact failed:', prospectErr)
    }

    return NextResponse.json({ success: true, data })
  } catch (error) { console.error('API error:', error); return NextResponse.json({ error: 'Internal server error' }, { status: 500 }) }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const userId = searchParams.get('user_id')
    const userRole = searchParams.get('user_role')

    let query = supabase.from('contact_submissions').select('*, assigned_user:rsa_users!contact_submissions_assigned_to_fkey(id, name, username)').order('created_at', { ascending: false })
    if (status && status !== 'all') query = query.eq('status', status)
    if (userId && userRole === 'member') query = query.eq('assigned_to', userId)

    const { data, error } = await query
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ data })
  } catch (error) { return NextResponse.json({ error: 'Internal server error' }, { status: 500 }) }
}

export async function PATCH(request) {
  try {
    const body = await request.json()
    const { id, status, notes, next_follow_up, scheduled_date, scheduled_time, quoted_amount, address, close_reason, assigned_to } = body
    if (!id) return NextResponse.json({ error: 'Missing submission ID' }, { status: 400 })

    const updateData = {}
    if (status) updateData.status = status
    if (notes !== undefined) updateData.notes = notes
    if (next_follow_up !== undefined) updateData.next_follow_up = next_follow_up
    if (scheduled_date !== undefined) updateData.scheduled_date = scheduled_date
    if (scheduled_time !== undefined) updateData.scheduled_time = scheduled_time
    if (quoted_amount !== undefined) updateData.quoted_amount = quoted_amount
    if (address !== undefined) updateData.address = address
    if (close_reason !== undefined) updateData.close_reason = close_reason
    if (assigned_to !== undefined) updateData.assigned_to = assigned_to || null

    const { data, error } = await supabase.from('contact_submissions').update(updateData).eq('id', id).select('*, assigned_user:rsa_users!contact_submissions_assigned_to_fkey(id, name, username)').single()

    if (error) {
      const { data: fallbackData } = await supabase.from('contact_submissions').select('*').eq('id', id).single()
      if (!fallbackData) return NextResponse.json({ error: error.message }, { status: 500 })
      let autoJobResult = null
      if (AUTO_JOB_STATUSES.includes(status)) {
        autoJobResult = await createAutoJob(fallbackData)
      }
      return NextResponse.json({ success: true, data: fallbackData, autoJob: autoJobResult })
    }

    let autoJobResult = null
    if (AUTO_JOB_STATUSES.includes(status) && data) {
      autoJobResult = await createAutoJob(data)
    }

    return NextResponse.json({ success: true, data, autoJob: autoJobResult })
  } catch (error) { console.error('API error:', error); return NextResponse.json({ error: 'Internal server error' }, { status: 500 }) }
}