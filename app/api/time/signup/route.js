import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function POST(request) {
  try {
    const { name, phone, username, password } = await request.json()

    if (!name || !phone || !username || !password) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }
    if (password.length < 4) {
      return NextResponse.json({ error: 'Password must be at least 4 characters' }, { status: 400 })
    }
    if (username.length < 2) {
      return NextResponse.json({ error: 'Username must be at least 2 characters' }, { status: 400 })
    }

    const cleanUsername = username.toLowerCase().trim().replace(/[^a-z0-9._-]/g, '')

    // Check if username is taken
    const { data: existing } = await supabase
      .from('rsa_users')
      .select('id')
      .eq('username', cleanUsername)
      .single()

    if (existing) {
      return NextResponse.json({ error: 'That username is taken. Try adding a number, like ' + cleanUsername + '2' }, { status: 400 })
    }

    const password_hash = await bcrypt.hash(password, 10)

    // Random crew color
    const colors = ['#115997', '#2692cc', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316', '#6366f1']
    const color = colors[Math.floor(Math.random() * colors.length)]

    const { data: user, error } = await supabase
      .from('rsa_users')
      .insert([{
        username: cleanUsername,
        name: name.trim(),
        phone: phone.trim(),
        password_hash,
        role: 'member',
        is_active: true,
        color,
        permissions: {
          dashboard: false,
          contacts: false,
          prospects: false,
          pipeline: false,
          calendar: true,
          jobs: false,
          timesheets: false,
          templates: false,
          photos: false,
          users: false,
          sms: false,
          email: false,
          delete_contacts: false,
        }
      }])
      .select('id, username, name')
      .single()

    if (error) {
      console.error('Signup error:', error)
      return NextResponse.json({ error: 'Failed to create account' }, { status: 500 })
    }

    return NextResponse.json({ success: true, user })
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}