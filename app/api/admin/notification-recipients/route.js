import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const ALLOWED_TYPES = ['new_lead', 'booked']

function normalizePhone(input) {
  if (!input) return null
  const digits = String(input).replace(/\D/g, '')
  if (digits.length === 10) return '+1' + digits
  if (digits.length === 11 && digits.startsWith('1')) return '+' + digits
  return null
}

function sanitizeTypes(types) {
  if (!Array.isArray(types)) return ['new_lead', 'booked']
  const filtered = types.filter(t => ALLOWED_TYPES.includes(t))
  return filtered.length > 0 ? filtered : ['new_lead']
}

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('rsa_notification_recipients')
      .select('*')
      .order('created_at', { ascending: true })
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ recipients: data || [] })
  } catch (e) {
    console.error('Recipients GET error:', e)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const body = await request.json()
    const { name, phone, email, notification_types, enabled } = body
    if (!name?.trim()) return NextResponse.json({ error: 'Name is required' }, { status: 400 })
    const normalizedPhone = normalizePhone(phone)
    if (!normalizedPhone) return NextResponse.json({ error: 'Valid 10-digit phone number is required' }, { status: 400 })

    const insertData = {
      name: name.trim(),
      phone: normalizedPhone,
      email: email?.trim() || null,
      enabled: enabled !== false,
      notification_types: sanitizeTypes(notification_types),
    }

    const { data, error } = await supabase
      .from('rsa_notification_recipients')
      .insert([insertData])
      .select()
      .single()
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ recipient: data })
  } catch (e) {
    console.error('Recipients POST error:', e)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(request) {
  try {
    const body = await request.json()
    const { id, name, phone, email, notification_types, enabled } = body
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })

    const updateData = {}
    if (name !== undefined) {
      if (!name.trim()) return NextResponse.json({ error: 'Name cannot be empty' }, { status: 400 })
      updateData.name = name.trim()
    }
    if (phone !== undefined) {
      const normalizedPhone = normalizePhone(phone)
      if (!normalizedPhone) return NextResponse.json({ error: 'Valid 10-digit phone number is required' }, { status: 400 })
      updateData.phone = normalizedPhone
    }
    if (email !== undefined) updateData.email = email?.trim() || null
    if (notification_types !== undefined) updateData.notification_types = sanitizeTypes(notification_types)
    if (enabled !== undefined) updateData.enabled = !!enabled

    const { data, error } = await supabase
      .from('rsa_notification_recipients')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ recipient: data })
  } catch (e) {
    console.error('Recipients PUT error:', e)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(request) {
  try {
    const body = await request.json()
    const { id } = body
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })

    const { error } = await supabase
      .from('rsa_notification_recipients')
      .delete()
      .eq('id', id)
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ success: true })
  } catch (e) {
    console.error('Recipients DELETE error:', e)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}