import { NextResponse } from 'next/server'

// Review-request texts to customers are disabled. This endpoint used to text
// completed leads a Google review request 3 days after the job closed. We no
// longer send any texts to customers, so the cron now returns without sending.
//
// The route is kept (not deleted) because vercel.json schedules a daily cron at
// this path. Deleting it would make that cron 404 every day. The auth check is
// preserved so the endpoint still rejects unauthorized calls.

export async function GET(request) {
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  return NextResponse.json({ message: 'Review request texts are disabled', sent: 0 })
}