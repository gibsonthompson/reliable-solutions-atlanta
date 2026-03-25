import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

// GET all templates
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('rsa_email_templates')
      .select('*')
      .order('is_default', { ascending: false })
      .order('created_at', { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ templates: data })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST create new template
export async function POST(request) {
  try {
    const body = await request.json()
    const { name, subject, body: templateBody, category, is_default } = body

    if (!name || !subject || !templateBody) {
      return NextResponse.json({ error: 'Name, subject, and body are required' }, { status: 400 })
    }

    // If setting as default, unset existing defaults
    if (is_default) {
      await supabase
        .from('rsa_email_templates')
        .update({ is_default: false })
        .eq('is_default', true)
    }

    const { data, error } = await supabase
      .from('rsa_email_templates')
      .insert([{ name, subject, body: templateBody, category: category || 'general', is_default: is_default || false }])
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, template: data })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PUT update template
export async function PUT(request) {
  try {
    const body = await request.json()
    const { id, name, subject, body: templateBody, category, is_default } = body

    if (!id) {
      return NextResponse.json({ error: 'Template ID required' }, { status: 400 })
    }

    // If setting as default, unset existing defaults
    if (is_default) {
      await supabase
        .from('rsa_email_templates')
        .update({ is_default: false })
        .eq('is_default', true)
        .neq('id', id)
    }

    const updateData = {}
    if (name !== undefined) updateData.name = name
    if (subject !== undefined) updateData.subject = subject
    if (templateBody !== undefined) updateData.body = templateBody
    if (category !== undefined) updateData.category = category
    if (is_default !== undefined) updateData.is_default = is_default
    updateData.updated_at = new Date().toISOString()

    const { data, error } = await supabase
      .from('rsa_email_templates')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, template: data })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE template
export async function DELETE(request) {
  try {
    const body = await request.json()
    const { id } = body

    if (!id) {
      return NextResponse.json({ error: 'Template ID required' }, { status: 400 })
    }

    const { error } = await supabase
      .from('rsa_email_templates')
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