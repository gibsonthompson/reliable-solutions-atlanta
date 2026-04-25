import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('rsa_users')
      .select('id, username, name, phone, email, role, permissions, is_active, last_login, created_at, pay_rate, pay_type, hire_date, color, emergency_contact_name, emergency_contact_phone')
      .order('created_at', { ascending: true })
    if (error) throw error
    return NextResponse.json({ users: data })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const { username, name, phone, email, password, role, permissions, pay_rate, pay_type, hire_date, color, emergency_contact_name, emergency_contact_phone } = await request.json()
    if (!username || !name || !password) return NextResponse.json({ error: 'Username, name, and password required' }, { status: 400 })
    if (password.length < 4) return NextResponse.json({ error: 'Password must be at least 4 characters' }, { status: 400 })

    const { data: existing } = await supabase.from('rsa_users').select('id').eq('username', username.toLowerCase().trim()).single()
    if (existing) return NextResponse.json({ error: 'Username already taken' }, { status: 400 })

    const password_hash = await bcrypt.hash(password, 10)
    const defaultPerms = { dashboard: false, contacts: false, prospects: false, pipeline: false, calendar: true, jobs: false, timesheets: false, templates: false, photos: false, users: false, sms: false, email: false, delete_contacts: false }

    const { data, error } = await supabase
      .from('rsa_users')
      .insert([{
        username: username.toLowerCase().trim(),
        name,
        phone: phone || null,
        email: email || null,
        password_hash,
        role: role || 'member',
        permissions: permissions || defaultPerms,
        pay_rate: pay_rate || null,
        pay_type: pay_type || 'hourly',
        hire_date: hire_date || null,
        color: color || '#115997',
        emergency_contact_name: emergency_contact_name || null,
        emergency_contact_phone: emergency_contact_phone || null,
      }])
      .select('id, username, name, phone, email, role, permissions, is_active, created_at, pay_rate, pay_type, hire_date, color, emergency_contact_name, emergency_contact_phone')
      .single()

    if (error) throw error
    return NextResponse.json({ user: data })
  } catch (error) {
    console.error('Create user error:', error)
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 })
  }
}

export async function PUT(request) {
  try {
    const body = await request.json()
    const { id } = body
    if (!id) return NextResponse.json({ error: 'User ID required' }, { status: 400 })

    const updates = { updated_at: new Date().toISOString() }
    if (body.name !== undefined) updates.name = body.name
    if (body.phone !== undefined) updates.phone = body.phone
    if (body.email !== undefined) updates.email = body.email
    if (body.role !== undefined) updates.role = body.role
    if (body.permissions !== undefined) updates.permissions = body.permissions
    if (body.is_active !== undefined) updates.is_active = body.is_active
    if (body.pay_rate !== undefined) updates.pay_rate = body.pay_rate
    if (body.pay_type !== undefined) updates.pay_type = body.pay_type
    if (body.hire_date !== undefined) updates.hire_date = body.hire_date
    if (body.color !== undefined) updates.color = body.color
    if (body.emergency_contact_name !== undefined) updates.emergency_contact_name = body.emergency_contact_name
    if (body.emergency_contact_phone !== undefined) updates.emergency_contact_phone = body.emergency_contact_phone
    if (body.password) {
      if (body.password.length < 4) return NextResponse.json({ error: 'Password must be at least 4 characters' }, { status: 400 })
      updates.password_hash = await bcrypt.hash(body.password, 10)
    }

    const { data, error } = await supabase
      .from('rsa_users')
      .update(updates)
      .eq('id', id)
      .select('id, username, name, phone, email, role, permissions, is_active, last_login, created_at, pay_rate, pay_type, hire_date, color, emergency_contact_name, emergency_contact_phone')
      .single()

    if (error) throw error
    return NextResponse.json({ user: data })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 })
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json()
    if (!id) return NextResponse.json({ error: 'User ID required' }, { status: 400 })

    await supabase.from('contact_submissions').update({ assigned_to: null }).eq('assigned_to', id)

    const { error } = await supabase.from('rsa_users').delete().eq('id', id)
    if (error) throw error
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 })
  }
}