import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

// POST - Employee login
export async function POST(request) {
  try {
    const { username, password } = await request.json()
    if (!username || !password) return NextResponse.json({ error: 'Username and password required' }, { status: 400 })

    const { data: user, error } = await supabase
      .from('rsa_users')
      .select('id, username, name, phone, email, password_hash, role, permissions, is_active, hire_date, pay_rate, pay_type, color, emergency_contact_name, emergency_contact_phone')
      .eq('username', username.toLowerCase().trim())
      .single()

    if (error || !user) return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 })
    if (!user.is_active) return NextResponse.json({ error: 'Account is disabled. Contact your supervisor.' }, { status: 401 })

    const valid = await bcrypt.compare(password, user.password_hash)
    if (!valid) return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 })

    await supabase.from('rsa_users').update({ last_login: new Date().toISOString() }).eq('id', user.id)

    const { password_hash, ...safeUser } = user
    return NextResponse.json({ user: safeUser })
  } catch (error) {
    console.error('Time auth error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PUT - Refresh user data
export async function PUT(request) {
  try {
    const { user_id } = await request.json()
    if (!user_id) return NextResponse.json({ error: 'User ID required' }, { status: 400 })

    const { data: user, error } = await supabase
      .from('rsa_users')
      .select('id, username, name, phone, email, role, permissions, is_active, hire_date, pay_rate, pay_type, color, emergency_contact_name, emergency_contact_phone')
      .eq('id', user_id)
      .single()

    if (error || !user) return NextResponse.json({ error: 'User not found' }, { status: 404 })
    return NextResponse.json({ user })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PATCH - Change own password
export async function PATCH(request) {
  try {
    const { user_id, current_password, new_password } = await request.json()
    if (!user_id || !current_password || !new_password) return NextResponse.json({ error: 'All fields required' }, { status: 400 })
    if (new_password.length < 4) return NextResponse.json({ error: 'New password must be at least 4 characters' }, { status: 400 })

    const { data: user, error } = await supabase
      .from('rsa_users')
      .select('id, password_hash')
      .eq('id', user_id)
      .single()

    if (error || !user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

    const valid = await bcrypt.compare(current_password, user.password_hash)
    if (!valid) return NextResponse.json({ error: 'Current password is incorrect' }, { status: 401 })

    const password_hash = await bcrypt.hash(new_password, 10)
    await supabase.from('rsa_users').update({ password_hash, updated_at: new Date().toISOString() }).eq('id', user_id)

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}