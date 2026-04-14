import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

// GET all categories
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('rsa_template_categories')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: true })

    if (error) {
      console.error('[Categories GET]', error)
      return NextResponse.json({ error: error.message, hint: error.hint }, { status: 500 })
    }

    return NextResponse.json({ categories: data })
  } catch (error) {
    console.error('[Categories GET] Server error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// POST create new category
export async function POST(request) {
  try {
    const body = await request.json()
    const { key, label, desc } = body

    if (!key || !label) {
      return NextResponse.json({ error: 'Key and label are required' }, { status: 400 })
    }

    // Get max sort_order
    const { data: existing } = await supabase
      .from('rsa_template_categories')
      .select('sort_order')
      .order('sort_order', { ascending: false })
      .limit(1)

    const nextOrder = existing?.length ? (existing[0].sort_order || 0) + 1 : 100

    const { data, error } = await supabase
      .from('rsa_template_categories')
      .insert([{
        key,
        label,
        desc: desc || `Templates for ${label}`,
        is_default: false,
        sort_order: nextOrder
      }])
      .select()
      .single()

    if (error) {
      console.error('[Categories POST]', error)
      return NextResponse.json({ error: error.message, hint: error.hint }, { status: 500 })
    }

    return NextResponse.json({ success: true, category: data })
  } catch (error) {
    console.error('[Categories POST] Server error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// DELETE category
export async function DELETE(request) {
  try {
    const body = await request.json()
    const { key } = body

    if (!key) {
      return NextResponse.json({ error: 'Category key required' }, { status: 400 })
    }

    // Don't allow deleting default categories
    const { data: cat } = await supabase
      .from('rsa_template_categories')
      .select('is_default')
      .eq('key', key)
      .single()

    if (cat?.is_default) {
      return NextResponse.json({ error: 'Cannot delete default categories' }, { status: 400 })
    }

    // Move templates using this category to 'general'
    await supabase
      .from('rsa_email_templates')
      .update({ category: 'general', updated_at: new Date().toISOString() })
      .eq('category', key)

    const { error } = await supabase
      .from('rsa_template_categories')
      .delete()
      .eq('key', key)

    if (error) {
      console.error('[Categories DELETE]', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[Categories DELETE] Server error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}