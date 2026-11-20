// lib/spamFilter.js
// Single source of truth for website form spam detection.
// Used by /api/contact (blocks the submission) and /api/contact/notify
// (refuses to text the team about anything that looks like spam).
// Scans EVERY free-text field, not just the message, because the homepage
// quote form has no message box and spam lands in name/address instead.

// Hard blocks: if any of these appear in any field, it never reaches the team.
// Matched against the lowercased text AND a squashed copy with spaces and
// punctuation stripped, so "G o u l d  St" and "r-e-v-i-e-w-s" still match.
const HARD_BLOCK_TERMS = [
  'gould',
  'review',
  'website',
  'webpage',
  'web site',
]

const SPAM_KEYWORDS = [
  'seo', 'search engine optimization', 'backlink', 'link building',
  'rank your website', 'first page of google', 'domain authority',
  'google ranking', 'google maps ranking', 'google business profile', 'gbp',
  '5 star', '5-star', 'five star', 'star rating', 'reputation management',
  'virtual assistant', 'cold calling', 'appointment setting',
  'lead generation', 'social media management', 'bookkeeping',
  'outsourc', 'offshore', 'filipino', 'philippines',
  'enhance your client', 'boost your client', 'grow your business',
  'scale your business', 'increase your revenue', 'increase your sales',
  'open to a quick', '15-minute', '15 minute', 'quick conversation',
  'quick call', 'quick chat', 'brief call', 'brief conversation',
  'schedule a call', 'hop on a call', 'jump on a call',
  'i\'d love to show you', 'i\'d love to discuss', 'let me show you',
  'love to connect', 'love to chat',
  'web development services', 'web design services', 'digital marketing services',
  'marketing agency', 'staffing solution', 'staffing service',
  'content creation service', 'customer support service',
  'we provide expert', 'we specialize in', 'we offer a wide range',
  'we can help enhance', 'we can help grow', 'we can help boost',
  'ai chatbot', 'ai solution', 'automation service',
  'b2b lead', 'qualified leads', 'warm leads',
  'email campaign', 'email marketing', 'bulk email',
  'pay per click', 'ppc management', 'google ads management',
  'facebook ads management', 'roi guarantee',
  'interested in learning more', 'would you be open', 'are you open to',
  'shall i send', 'can i send you', 'let me send you',
  'unsubscribe', 'opt out', 'opt-out',
  'sheridan, wy', 'sheridan wy',
]

// Links never belong in a homeowner's estimate request.
const LINK_PATTERN = /(https?:\/\/|www\.|\b[a-z0-9-]+\.(com|net|org|io|co|biz|info|xyz|site|online)\b)/i

function squash(text) {
  return text.toLowerCase().replace(/[^a-z0-9]/g, '')
}

function checkName(name) {
  if (!name) return null
  const transitions = (name.match(/[A-Z][a-z]|[a-z][A-Z]/g) || []).length
  if (transitions > 4) return 'gibberish_name'
  const words = name.split(/\s+/)
  for (const word of words) {
    if (word.length > 3 && /[A-Z]{3,}/.test(word) && word !== word.toUpperCase()) return 'gibberish_name'
  }
  if (name.trim().split(/\s+/).length === 1 && name.trim().length > 12) return 'suspicious_name'
  return null
}

function checkEmail(email) {
  if (!email) return null
  const localPart = email.split('@')[0] || ''
  const dotCount = (localPart.match(/\./g) || []).length
  if (dotCount >= 4) return 'dotted_email'
  const segments = localPart.split('.')
  const tinySegments = segments.filter(s => s.length <= 2).length
  if (tinySegments >= 3) return 'fragmented_email'
  return null
}

// Returns a reason string if the submission is spam, otherwise null.
// fields: { name, email, phone, address, message, service_type, referral_source, company }
// `company` is the hidden honeypot field. Real people never see it.
export function isSpam(fields = {}) {
  const { name, email, address, message, service_type, referral_source, company } = fields

  if (company && String(company).trim()) return 'honeypot'

  const nameReason = checkName(name)
  if (nameReason) return nameReason
  const emailReason = checkEmail(email)
  if (emailReason) return emailReason

  // Every free-text field except email (emails contain domains on purpose).
  const textFields = [name, address, message, service_type, referral_source]
    .filter(v => typeof v === 'string' && v.trim())
  if (textFields.length === 0) return null

  const combined = textFields.join(' \n ').toLowerCase()
  const squashed = squash(combined)

  for (const term of HARD_BLOCK_TERMS) {
    if (combined.includes(term) || squashed.includes(squash(term))) return `blocked_term:${term}`
  }

  // Email field also gets the hard-block check (e.g. reviews@..., gould...@).
  if (email) {
    const emailLower = String(email).toLowerCase()
    for (const term of HARD_BLOCK_TERMS) {
      const t = squash(term)
      if (t && squash(emailLower).includes(t)) return `blocked_term_email:${term}`
    }
  }

  for (const keyword of SPAM_KEYWORDS) {
    if (combined.includes(keyword)) return `spam_keyword:${keyword}`
  }

  if (LINK_PATTERN.test(combined)) return 'contains_link'

  return null
}
