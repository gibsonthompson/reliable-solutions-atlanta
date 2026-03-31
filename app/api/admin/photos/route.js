import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

let _supabase
function getSupabase() {
  if (!_supabase) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!url || !key) throw new Error('Missing Supabase env vars')
    _supabase = createClient(url, key)
  }
  return _supabase
}

// GET — list all photos, newest first
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = (page - 1) * limit

    const { data, error, count } = await getSupabase()
      .from('rsa_photos')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (error) throw error

    return NextResponse.json({ data, total: count, page, limit })
  } catch (err) {
    console.error('Photos GET error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

// POST — save photo metadata (file already uploaded direct to Supabase Storage from client)
export async function POST(request) {
  try {
    const body = await request.json()
    const { filename, original_name, url, file_size, mime_type, uploaded_by, uploaded_by_name } = body

    if (!filename || !url) {
      return NextResponse.json({ error: 'Missing filename or url' }, { status: 400 })
    }

    // Only include uploaded_by if it's a valid-looking UUID (FK constraint will reject garbage)
    const isValidUUID = uploaded_by && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(uploaded_by)

    const insertData = {
      filename,
      original_name: original_name || 'photo.jpg',
      url,
      file_size: file_size || 0,
      mime_type: mime_type || 'image/jpeg',
      uploaded_by_name: uploaded_by_name || 'Unknown'
    }
    if (isValidUUID) insertData.uploaded_by = uploaded_by

    const { data: record, error: dbError } = await getSupabase()
      .from('rsa_photos')
      .insert(insertData)
      .select()
      .single()

    if (dbError) {
      console.error('Photos DB insert error:', JSON.stringify(dbError))
      return NextResponse.json({ error: dbError.message, details: dbError }, { status: 500 })
    }

    return NextResponse.json({ data: record, total_uploaded: 1, total_errors: 0 })
  } catch (err) {
    console.error('Photos POST error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

// DELETE — delete a photo by ID
export async function DELETE(request) {
  try {
    const { id } = await request.json()

    if (!id) {
      return NextResponse.json({ error: 'Missing photo ID' }, { status: 400 })
    }

    const { data: photo, error: fetchError } = await getSupabase()
      .from('rsa_photos')
      .select('*')
      .eq('id', id)
      .single()

    if (fetchError || !photo) {
      return NextResponse.json({ error: 'Photo not found' }, { status: 404 })
    }

    // Delete from storage
    const { error: storageError } = await getSupabase().storage
      .from('rsa-photos')
      .remove([photo.filename])

    if (storageError) {
      console.error('Storage delete error:', storageError)
    }

    // Delete DB record
    const { error: dbError } = await getSupabase()
      .from('rsa_photos')
      .delete()
      .eq('id', id)

    if (dbError) throw dbError

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Photos DELETE error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}