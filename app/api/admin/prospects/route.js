import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

// GET all prospects
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const search = searchParams.get('search')

    let query = supabase
      .from('rsa_prospects')
      .select('*')
      .order('created_at', { ascending: false })

    if (status && status !== 'all') {
      query = query.eq('status', status)
    }

    if (search) {
      query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%,brokerage.ilike.%${search}%,area.ilike.%${search}%`)
    }

    const { data, error } = await query

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ prospects: data })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST create prospect or bulk import
export async function POST(request) {
  try {
    const body = await request.json()

    // Bulk import
    if (body.leads && body.columnMapping) {
      return handleBulkImport(body)
    }

    // Single create
    const { name, email, phone, brokerage, area, source, notes } = body

    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('rsa_prospects')
      .insert([{ name, email, phone, brokerage, area, source: source || 'manual', notes }])
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, prospect: data })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PATCH update prospect
export async function PATCH(request) {
  try {
    const body = await request.json()
    const { id, ...updates } = body

    if (!id) {
      return NextResponse.json({ error: 'Prospect ID required' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('rsa_prospects')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, prospect: data })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE prospect
export async function DELETE(request) {
  try {
    const body = await request.json()
    const { id } = body

    if (!id) {
      return NextResponse.json({ error: 'Prospect ID required' }, { status: 400 })
    }

    // Delete outreach logs first
    await supabase
      .from('rsa_outreach_log')
      .delete()
      .eq('prospect_id', id)

    const { error } = await supabase
      .from('rsa_prospects')
      .delete()
      .eq('id', id)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// Bulk CSV import handler
async function handleBulkImport({ leads, columnMapping, defaultSource }) {
  let imported = 0
  let duplicates = 0
  const errors = []

  // Get existing emails to check duplicates
  const existingEmails = new Set()
  const { data: existing } = await supabase
    .from('rsa_prospects')
    .select('email')
    .not('email', 'is', null)

  if (existing) {
    existing.forEach(p => {
      if (p.email) existingEmails.add(p.email.toLowerCase().trim())
    })
  }

  const toInsert = []

  for (let i = 0; i < leads.length; i++) {
    const row = leads[i]
    try {
      const prospect = {
        name: row[columnMapping.name] || row[columnMapping.contact_name] || '',
        email: row[columnMapping.email] || '',
        phone: row[columnMapping.phone] || '',
        brokerage: row[columnMapping.brokerage] || '',
        area: row[columnMapping.area] || '',
        notes: row[columnMapping.notes] || '',
        source: defaultSource || 'csv_import',
        status: 'new',
      }

      if (!prospect.name.trim()) {
        errors.push({ row: i + 2, error: 'Missing name' })
        continue
      }

      // Check duplicate by email
      if (prospect.email) {
        const emailLower = prospect.email.toLowerCase().trim()
        if (existingEmails.has(emailLower)) {
          duplicates++
          continue
        }
        existingEmails.add(emailLower)
      }

      toInsert.push(prospect)
    } catch (err) {
      errors.push({ row: i + 2, error: 'Parse error' })
    }
  }

  // Batch insert (chunks of 50)
  for (let i = 0; i < toInsert.length; i += 50) {
    const chunk = toInsert.slice(i, i + 50)
    const { error } = await supabase.from('rsa_prospects').insert(chunk)
    if (error) {
      errors.push({ row: 0, error: `Batch insert failed: ${error.message}` })
    } else {
      imported += chunk.length
    }
  }

  return NextResponse.json({ imported, duplicates, errors, total: leads.length })
}