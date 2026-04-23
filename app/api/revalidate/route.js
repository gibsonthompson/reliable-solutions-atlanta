// app/api/revalidate/route.js
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const body = await request.json()
    const { secret, slug } = body

    if (secret !== process.env.REVALIDATION_SECRET) {
      return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
    }

    // Revalidate blog index
    revalidatePath('/blog')

    // Revalidate sitemap
    revalidatePath('/sitemap.xml')

    // Revalidate specific post if slug provided
    if (slug) {
      revalidatePath(`/blog/${slug}`)
    }

    return NextResponse.json({ revalidated: true, slug: slug || 'index-only' })
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 })
  }
}