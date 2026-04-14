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
      console.error('[Templates GET]', error)
      return NextResponse.json({ error: error.message, code: error.code, details: error.details }, { status: 500 })
    }

    return NextResponse.json({ templates: data })
  } catch (error) {
    console.error('[Templates GET] Server error:', error)
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
  }
}

// POST create new template
export async function POST(request) {
  try {
    const body = await request.json()
    const { name, subject, body: templateBody, category, pipeline_stage, is_default, type } = body
    const templateType = type || 'email'

    if (!name || !templateBody) {
      return NextResponse.json({ error: 'Name and body are required' }, { status: 400 })
    }

    if (templateType === 'email' && !subject) {
      return NextResponse.json({ error: 'Subject is required for email templates' }, { status: 400 })
    }

    if (is_default) {
      await supabase
        .from('rsa_email_templates')
        .update({ is_default: false })
        .eq('is_default', true)
        .eq('type', templateType)
    }

    const insertPayload = {
      name,
      subject: templateType === 'email' ? subject : null,
      body: templateBody,
      category: category || 'general',
      pipeline_stage: pipeline_stage || null,
      is_default: is_default || false,
      type: templateType,
    }

    console.log('[Templates POST] Inserting:', JSON.stringify(insertPayload))

    const { data, error } = await supabase
      .from('rsa_email_templates')
      .insert([insertPayload])
      .select()
      .single()

    if (error) {
      console.error('[Templates POST]', error)
      return NextResponse.json({ error: error.message, code: error.code, details: error.details, hint: error.hint }, { status: 500 })
    }

    return NextResponse.json({ success: true, template: data })
  } catch (error) {
    console.error('[Templates POST] Server error:', error)
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
  }
}

// PUT update template
export async function PUT(request) {
  try {
    const body = await request.json()
    const { id, name, subject, body: templateBody, category, pipeline_stage, is_default, type } = body

    if (!id) {
      return NextResponse.json({ error: 'Template ID required' }, { status: 400 })
    }

    if (is_default && type) {
      await supabase
        .from('rsa_email_templates')
        .update({ is_default: false })
        .eq('is_default', true)
        .eq('type', type)
        .neq('id', id)
    }

    const updateData = {}
    if (name !== undefined) updateData.name = name
    if (subject !== undefined) updateData.subject = subject || null
    if (templateBody !== undefined) updateData.body = templateBody
    if (category !== undefined) updateData.category = category
    if (pipeline_stage !== undefined) updateData.pipeline_stage = pipeline_stage || null
    if (is_default !== undefined) updateData.is_default = is_default
    if (type !== undefined) updateData.type = type
    updateData.updated_at = new Date().toISOString()

    console.log('[Templates PUT] Updating id:', id, 'with:', JSON.stringify(updateData))

    const { data, error } = await supabase
      .from('rsa_email_templates')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('[Templates PUT]', error)
      return NextResponse.json({ error: error.message, code: error.code, details: error.details, hint: error.hint }, { status: 500 })
    }

    return NextResponse.json({ success: true, template: data })
  } catch (error) {
    console.error('[Templates PUT] Server error:', error)
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
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
      console.error('[Templates DELETE]', error)
      return NextResponse.json({ error: error.message, code: error.code }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[Templates DELETE] Server error:', error)
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
  }
}