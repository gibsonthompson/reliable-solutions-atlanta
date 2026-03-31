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

// POST — upload one or more photos
export async function POST(request) {
  try {
    const formData = await request.formData()
    const files = formData.getAll('photos')
    const uploadedBy = formData.get('uploaded_by') || null
    const uploadedByName = formData.get('uploaded_by_name') || 'Unknown'

    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'No files provided' }, { status: 400 })
    }

    const MAX_SIZE = 10 * 1024 * 1024 // 10MB
    const ALLOWED_TYPES = [
      'image/jpeg', 'image/png', 'image/webp', 'image/gif',
      'image/heic', 'image/heif', // iPhone photos
      'video/mp4', 'video/quicktime', 'video/mov' // Allow short videos too
    ]

    const results = []
    const errors = []

    for (const file of files) {
      // Validate size
      if (file.size > MAX_SIZE) {
        errors.push({ name: file.name, error: 'File exceeds 10MB limit' })
        continue
      }

      // Validate type (be lenient — iPhones sometimes send weird MIME types)
      const isAllowed = ALLOWED_TYPES.includes(file.type) ||
        file.type.startsWith('image/') ||
        file.type.startsWith('video/')
      if (!isAllowed) {
        errors.push({ name: file.name, error: 'Unsupported file type: ' + file.type })
        continue
      }

      // Generate unique filename
      const timestamp = Date.now()
      const rand = Math.random().toString(36).slice(2, 8)
      const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg'
      const filename = `${timestamp}-${rand}.${ext}`
      const storagePath = `photos/${filename}`

      // Read file buffer
      const arrayBuffer = await file.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)

      // Upload to Supabase Storage
      const { data: uploadData, error: uploadError } = await getSupabase().storage
        .from('rsa-photos')
        .upload(storagePath, buffer, {
          contentType: file.type,
          cacheControl: '31536000', // 1 year cache
          upsert: false
        })

      if (uploadError) {
        console.error('Storage upload error:', uploadError)
        errors.push({ name: file.name, error: uploadError.message })
        continue
      }

      // Get public URL
      const { data: urlData } = getSupabase().storage
        .from('rsa-photos')
        .getPublicUrl(storagePath)

      const publicUrl = urlData?.publicUrl

      if (!publicUrl) {
        errors.push({ name: file.name, error: 'Failed to get public URL' })
        continue
      }

      // Insert metadata record
      const { data: record, error: dbError } = await getSupabase()
        .from('rsa_photos')
        .insert({
          filename: storagePath,
          original_name: file.name,
          url: publicUrl,
          file_size: file.size,
          mime_type: file.type,
          uploaded_by: uploadedBy,
          uploaded_by_name: uploadedByName
        })
        .select()
        .single()

      if (dbError) {
        console.error('DB insert error:', dbError)
        errors.push({ name: file.name, error: dbError.message })
        continue
      }

      results.push(record)
    }

    return NextResponse.json({
      uploaded: results,
      errors,
      total_uploaded: results.length,
      total_errors: errors.length
    })
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

    // Get the record first (need storage path)
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
      // Continue anyway — still remove the DB record
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