import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function POST(request) {
  try {
    const body = await request.json()

    if (body.step === 'verify') {
      const { username, phone } = body
      if (!username || !phone) return NextResponse.json({ error: 'Username and phone required' }, { status: 400 })

      const { data: user, error } = await supabase
        .from('rsa_users')
        .select('id, phone, is_active')
        .eq('username', username.toLowerCase().trim())
        .single()

      if (error || !user) return NextResponse.json({ error: 'No account found with that username' }, { status: 404 })
      if (!user.is_active) return NextResponse.json({ error: 'This account is disabled' }, { status: 401 })

      // Normalize phone numbers for comparison (strip everything except digits)
      const normalizePhone = (p) => (p || '').replace(/\D/g, '')
      const inputDigits = normalizePhone(phone)
      const storedDigits = normalizePhone(user.phone)

      if (!storedDigits) return NextResponse.json({ error: 'No phone number on file. Contact your admin to reset your password.' }, { status: 400 })
      if (inputDigits !== storedDigits) return NextResponse.json({ error: 'Phone number does not match our records' }, { status: 401 })

      return NextResponse.json({ user_id: user.id })
    }

    if (body.step === 'reset') {
      const { user_id, new_password } = body
      if (!user_id || !new_password) return NextResponse.json({ error: 'User ID and new password required' }, { status: 400 })
      if (new_password.length < 4) return NextResponse.json({ error: 'Password must be at least 4 characters' }, { status: 400 })

      const password_hash = await bcrypt.hash(new_password, 10)
      const { error } = await supabase
        .from('rsa_users')
        .update({ password_hash, updated_at: new Date().toISOString() })
        .eq('id', user_id)

      if (error) throw error
      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ error: 'Invalid step' }, { status: 400 })
  } catch (error) {
    console.error('Reset password error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}