import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const VALID_CATEGORIES = ['crew', 'customer', 'general']

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('rsa_message_templates')
      .select('*')
      .order('category', { ascending: true })
      .order('name', { ascending: true })
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ templates: data || [] })
  } catch (e) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const body = await request.json()
    const { name, body: messageBody, category, created_by } = body
    if (!name?.trim() || !messageBody?.trim()) {
      return NextResponse.json({ error: 'Name and body are required' }, { status: 400 })
    }
    const validCategory = VALID_CATEGORIES.includes(category) ? category : 'crew'
    const { data, error } = await supabase
      .from('rsa_message_templates')
      .insert([{ name: name.trim(), body: messageBody.trim(), category: validCategory, created_by: created_by || null }])
      .select()
      .single()
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ template: data })
  } catch (e) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(request) {
  try {
    const body = await request.json()
    const { id, name, body: messageBody, category } = body
    if (!id) return NextResponse.json({ error: 'Template ID required' }, { status: 400 })
    if (!name?.trim() || !messageBody?.trim()) {
      return NextResponse.json({ error: 'Name and body are required' }, { status: 400 })
    }
    const validCategory = VALID_CATEGORIES.includes(category) ? category : 'crew'
    const { data, error } = await supabase
      .from('rsa_message_templates')
      .update({ name: name.trim(), body: messageBody.trim(), category: validCategory, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ template: data })
  } catch (e) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(request) {
  try {
    const body = await request.json()
    const { id } = body
    if (!id) return NextResponse.json({ error: 'Template ID required' }, { status: 400 })
    const { error } = await supabase.from('rsa_message_templates').delete().eq('id', id)
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ success: true })
  } catch (e) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}