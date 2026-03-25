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
      .select('id, username, name, phone, role, permissions, is_active, last_login, created_at')
      .order('created_at', { ascending: true })
    if (error) throw error
    return NextResponse.json({ users: data })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const { username, name, phone, password, role, permissions } = await request.json()
    if (!username || !name || !password) return NextResponse.json({ error: 'Username, name, and password required' }, { status: 400 })
    if (password.length < 4) return NextResponse.json({ error: 'Password must be at least 4 characters' }, { status: 400 })

    const { data: existing } = await supabase.from('rsa_users').select('id').eq('username', username.toLowerCase().trim()).single()
    if (existing) return NextResponse.json({ error: 'Username already taken' }, { status: 400 })

    const password_hash = await bcrypt.hash(password, 10)
    const defaultPerms = { dashboard: false, contacts: false, prospects: false, pipeline: false, calendar: true, templates: false, users: false, sms: false, email: false, delete_contacts: false }

    const { data, error } = await supabase
      .from('rsa_users')
      .insert([{ username: username.toLowerCase().trim(), name, phone: phone || null, password_hash, role: role || 'member', permissions: permissions || defaultPerms }])
      .select('id, username, name, phone, role, permissions, is_active, created_at')
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
    const { id, name, phone, role, permissions, is_active, password } = await request.json()
    if (!id) return NextResponse.json({ error: 'User ID required' }, { status: 400 })

    const updates = { updated_at: new Date().toISOString() }
    if (name !== undefined) updates.name = name
    if (phone !== undefined) updates.phone = phone
    if (role !== undefined) updates.role = role
    if (permissions !== undefined) updates.permissions = permissions
    if (is_active !== undefined) updates.is_active = is_active
    if (password) {
      if (password.length < 4) return NextResponse.json({ error: 'Password must be at least 4 characters' }, { status: 400 })
      updates.password_hash = await bcrypt.hash(password, 10)
    }

    const { data, error } = await supabase
      .from('rsa_users')
      .update(updates)
      .eq('id', id)
      .select('id, username, name, phone, role, permissions, is_active, last_login, created_at')
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