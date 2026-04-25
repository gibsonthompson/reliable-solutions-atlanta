import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function POST(request) {
  try {
    const { username, password } = await request.json()
    if (!username || !password) return NextResponse.json({ error: 'Username and password required' }, { status: 400 })

    const { data: user, error } = await supabase
      .from('rsa_users')
      .select('id, username, name, phone, email, password_hash, role, permissions, is_active, pay_rate, pay_type, hire_date, color, emergency_contact_name, emergency_contact_phone')
      .eq('username', username.toLowerCase().trim())
      .single()

    if (error || !user) return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 })
    if (!user.is_active) return NextResponse.json({ error: 'Account is disabled. Contact your admin.' }, { status: 401 })

    const valid = await bcrypt.compare(password, user.password_hash)
    if (!valid) return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 })

    await supabase.from('rsa_users').update({ last_login: new Date().toISOString() }).eq('id', user.id)

    const { password_hash, ...safeUser } = user
    if (safeUser.role === 'admin') {
      safeUser.permissions = {
        dashboard: true, contacts: true, prospects: true, pipeline: true,
        calendar: true, jobs: true, timesheets: true, templates: true,
        photos: true, users: true, sms: true, email: true, delete_contacts: true, crew: true
      }
    }

    return NextResponse.json({ user: safeUser })
  } catch (error) {
    console.error('Auth error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}