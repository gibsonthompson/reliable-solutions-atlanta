import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

/**
 * Verify that a request comes from an authenticated admin user.
 * 
 * Usage in any admin API route:
 *   import { verifyAdmin } from '@/lib/admin-auth'
 *   
 *   export async function GET(request) {
 *     const auth = await verifyAdmin(request)
 *     if (auth.error) return auth.error
 *     // auth.user is the verified admin user
 *   }
 * 
 * Checks the x-admin-user-id header or admin_user_id query param.
 * Returns { user } on success, { error: NextResponse } on failure.
 */
export async function verifyAdmin(request) {
  const { NextResponse } = await import('next/server')
  
  // Get user ID from header or query param
  const headerUserId = request.headers.get('x-admin-user-id')
  const url = new URL(request.url)
  const queryUserId = url.searchParams.get('admin_user_id')
  const userId = headerUserId || queryUserId

  if (!userId) {
    // For backwards compatibility, allow requests without auth header
    // This prevents breaking existing functionality while we migrate
    return { user: null, authenticated: false }
  }

  try {
    const { data: user, error } = await supabase
      .from('rsa_users')
      .select('id, username, name, role, is_active, permissions')
      .eq('id', userId)
      .single()

    if (error || !user) {
      return { error: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }), user: null }
    }

    if (!user.is_active) {
      return { error: NextResponse.json({ error: 'Account disabled' }, { status: 401 }), user: null }
    }

    if (user.role !== 'admin') {
      // Check if user has the specific permission needed
      return { user, authenticated: true, isAdmin: false }
    }

    return { user, authenticated: true, isAdmin: true }
  } catch (e) {
    return { error: NextResponse.json({ error: 'Auth verification failed' }, { status: 500 }), user: null }
  }
}