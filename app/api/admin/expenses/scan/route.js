import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const CATEGORIES = ['materials', 'fuel', 'dump_fee', 'equipment', 'rental', 'food', 'other']

export async function POST(request) {
  try {
    const { image, mediaType } = await request.json()
    if (!image) return NextResponse.json({ error: 'No image provided' }, { status: 400 })

    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) return NextResponse.json({ error: 'Receipt scanning is not configured' }, { status: 500 })

    const today = new Date().toISOString().split('T')[0]
    const mt = mediaType || 'image/jpeg'

    // --- Extract with Claude vision (forced tool call = guaranteed schema) ---
    const aiRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 1024,
        tools: [{
          name: 'log_expense',
          description: 'Record the expense details extracted from a receipt photo.',
          input_schema: {
            type: 'object',
            properties: {
              vendor: { type: 'string', description: 'Store / vendor name exactly as printed, e.g. "The Home Depot", "Shell". Used as the expense title.' },
              amount: { type: 'number', description: 'Final grand total actually paid, including tax.' },
              tax_amount: { type: 'number', description: 'Sales tax amount if clearly shown. Omit if not present.' },
              expense_date: { type: 'string', description: 'Receipt date in YYYY-MM-DD format. Omit if missing or unreadable.' },
              category: { type: 'string', enum: CATEGORIES, description: 'Best-fit category for a waterproofing & foundation repair company. materials = concrete/sealant/lumber/hardware; fuel = gas stations; dump_fee = landfill/disposal; equipment = tools/machine purchases; rental = equipment rentals; food = crew meals; other = anything else.' },
              description: { type: 'string', description: 'Short summary of notable items purchased. Omit if nothing useful.' },
              confidence: { type: 'number', description: 'Overall confidence 0 to 1. Use below 0.6 if the image is blurry, cropped, faded, or hard to read.' },
            },
            required: ['vendor', 'amount', 'category', 'confidence'],
          },
        }],
        tool_choice: { type: 'tool', name: 'log_expense' },
        messages: [{
          role: 'user',
          content: [
            { type: 'image', source: { type: 'base64', media_type: mt, data: image } },
            { type: 'text', text: `This is a receipt for Reliable Solutions Atlanta, a waterproofing and foundation repair company. Read the receipt and call log_expense with the details. Return values exactly as printed — do not guess or round. Today is ${today}; if the receipt date is missing or unreadable, omit it rather than inventing one. Pick the single best-fit category from the allowed list.` },
          ],
        }],
      }),
    })

    if (!aiRes.ok) {
      const t = await aiRes.text()
      console.error('Anthropic error:', t)
      return NextResponse.json({ error: 'Could not read the receipt. Try a clearer photo.' }, { status: 502 })
    }

    const data = await aiRes.json()
    const toolUse = (data.content || []).find(b => b.type === 'tool_use')
    if (!toolUse?.input) return NextResponse.json({ error: 'Could not read the receipt. Try a clearer photo.' }, { status: 422 })
    const x = toolUse.input

    // --- Upload the receipt image to Supabase Storage ---
    let receipt_url = null
    try {
      const buffer = Buffer.from(image, 'base64')
      const ext = (mt.split('/')[1] || 'jpg').replace('jpeg', 'jpg')
      const path = `receipts/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`
      const { error: upErr } = await supabase.storage
        .from('rsa-receipts')
        .upload(path, buffer, { contentType: mt, upsert: false })
      if (upErr) {
        console.error('Receipt upload error:', upErr)
      } else {
        const { data: pub } = supabase.storage.from('rsa-receipts').getPublicUrl(path)
        receipt_url = pub?.publicUrl || null
      }
    } catch (e) {
      console.error('Receipt upload exception:', e)
    }

    return NextResponse.json({
      extracted: {
        title: x.vendor || '',
        amount: typeof x.amount === 'number' ? x.amount : '',
        tax_amount: typeof x.tax_amount === 'number' ? x.tax_amount : null,
        expense_date: x.expense_date || today,
        category: CATEGORIES.includes(x.category) ? x.category : 'other',
        description: x.description || '',
        confidence: typeof x.confidence === 'number' ? x.confidence : null,
      },
      receipt_url,
    })
  } catch (error) {
    console.error('Receipt scan error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}