// lib/pipeline.js
// Single source of truth for the contact pipeline.
// All pages that reference status values import from here.
// To add/remove/rename stages, update this file plus the SQL check constraint.

export const PIPELINE_STAGES = [
  {
    key: 'new',
    label: 'New',
    short: 'New',
    bg: 'bg-blue-50',
    text: 'text-blue-600',
    badge: 'bg-blue-100 text-blue-700',
    dot: 'bg-blue-500',
    pillActive: 'bg-blue-100 text-blue-700 border-blue-200',
    order: 1,
    terminal: false,
    help: 'New leads from the website. They got an auto-confirmation text. Call them ASAP.',
  },
  {
    key: 'contacting',
    label: 'Contacting',
    short: 'Contacting',
    bg: 'bg-sky-50',
    text: 'text-sky-600',
    badge: 'bg-sky-100 text-sky-700',
    dot: 'bg-sky-500',
    pillActive: 'bg-sky-100 text-sky-700 border-sky-200',
    order: 2,
    terminal: false,
    help: 'You are trying to reach them. Keep the cadence: text, call, text, email.',
  },
  {
    key: 'estimate_scheduled',
    label: 'Estimate Scheduled',
    short: 'Est. Scheduled',
    bg: 'bg-cyan-50',
    text: 'text-cyan-600',
    badge: 'bg-cyan-100 text-cyan-700',
    dot: 'bg-cyan-500',
    pillActive: 'bg-cyan-100 text-cyan-700 border-cyan-200',
    order: 3,
    terminal: false,
    help: 'Inspection is on the calendar. Show up on time, take photos, get the measurements.',
  },
  {
    key: 'estimate_sent',
    label: 'Estimate Sent',
    short: 'Est. Sent',
    bg: 'bg-indigo-50',
    text: 'text-indigo-600',
    badge: 'bg-indigo-100 text-indigo-700',
    dot: 'bg-indigo-500',
    pillActive: 'bg-indigo-100 text-indigo-700 border-indigo-200',
    order: 4,
    terminal: false,
    help: 'Quote delivered. Waiting on a yes or no. Follow up if no response in 3 days.',
  },
  {
    key: 'job_scheduled',
    label: 'Job Scheduled',
    short: 'Job Scheduled',
    bg: 'bg-purple-50',
    text: 'text-purple-600',
    badge: 'bg-purple-100 text-purple-700',
    dot: 'bg-purple-500',
    pillActive: 'bg-purple-100 text-purple-700 border-purple-200',
    order: 5,
    terminal: false,
    help: 'They accepted the quote. Work date is set. Confirm crew and materials. Moving to In Progress auto-creates a Job record.',
  },
  {
    key: 'in_progress',
    label: 'In Progress',
    short: 'In Progress',
    bg: 'bg-emerald-50',
    text: 'text-emerald-600',
    badge: 'bg-emerald-100 text-emerald-700',
    dot: 'bg-emerald-500',
    pillActive: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    order: 6,
    terminal: false,
    help: 'Crew is on site working. Finish the job and send the invoice.',
  },
  {
    key: 'awaiting_payment',
    label: 'Awaiting Payment',
    short: 'Awaiting Pay',
    bg: 'bg-amber-50',
    text: 'text-amber-600',
    badge: 'bg-amber-100 text-amber-700',
    dot: 'bg-amber-500',
    pillActive: 'bg-amber-100 text-amber-700 border-amber-200',
    order: 7,
    terminal: false,
    help: 'Work done, invoice out. Send a payment reminder if no response in 3 days.',
  },
  {
    key: 'complete',
    label: 'Complete',
    short: 'Complete',
    bg: 'bg-green-50',
    text: 'text-green-600',
    badge: 'bg-green-100 text-green-700',
    dot: 'bg-green-500',
    pillActive: 'bg-green-100 text-green-700 border-green-200',
    order: 8,
    terminal: true,
    help: 'Paid and closed. Ask for a Google review.',
  },
  {
    key: 'lost',
    label: 'Lost',
    short: 'Lost',
    bg: 'bg-red-50',
    text: 'text-red-600',
    badge: 'bg-red-100 text-red-700',
    dot: 'bg-red-400',
    pillActive: 'bg-red-100 text-red-700 border-red-200',
    order: 9,
    terminal: true,
    help: 'They decided not to move forward. Queue for win-back in 60-90 days.',
  },
]

export const STAGE_KEYS = PIPELINE_STAGES.map(s => s.key)
export const STAGE_BY_KEY = Object.fromEntries(PIPELINE_STAGES.map(s => [s.key, s]))

export const getStage = (key) => STAGE_BY_KEY[key] || STAGE_BY_KEY['new']
export const getStageLabel = (key) => getStage(key).label
export const isTerminal = (key) => STAGE_BY_KEY[key]?.terminal || false

// For dashboards, filters, and KPIs.
export const TERMINAL_STAGES = ['complete', 'lost']
export const SALES_ACTIVE_STAGES = ['estimate_scheduled', 'estimate_sent', 'job_scheduled', 'in_progress', 'awaiting_payment']

// Revenue projection sums quoted_amount for these stages (customer has been quoted, money expected).
export const REVENUE_PROJECTION_STAGES = ['estimate_sent', 'job_scheduled', 'in_progress', 'awaiting_payment']

// Close reasons for "lost" transitions.
export const CLOSE_REASONS = ['Too expensive', 'Went with competitor', 'No response', 'Not ready yet', 'DIY', 'Other']

// Recommended next action based on stage and contact data.
// Returns { text, urgency: 'low'|'medium'|'high' } or null.
export function getRecommendedAction(stage, contact) {
  if (!contact || !stage) return null

  const ageHours = (Date.now() - new Date(contact.created_at)) / 36e5
  const scheduledDate = contact.scheduled_date ? new Date(contact.scheduled_date + 'T00:00:00') : null
  const daysUntilScheduled = scheduledDate ? Math.floor((scheduledDate - Date.now()) / 864e5) : null

  switch (stage) {
    case 'new':
      if (ageHours > 24) return { text: `Lead is ${Math.floor(ageHours)}h old — call now`, urgency: 'high' }
      if (ageHours > 1) return { text: `Lead is ${Math.floor(ageHours)}h old — call ASAP`, urgency: 'medium' }
      return { text: 'New lead — call them within the hour', urgency: 'high' }

    case 'contacting':
      if (ageHours > 72) return { text: 'Lead has been in Contacting over 3 days — try a different channel or mark lost', urgency: 'high' }
      return { text: 'Keep trying. Use the cadence: text, call, text, email', urgency: 'medium' }

    case 'estimate_scheduled':
      if (!scheduledDate) return { text: 'No date set — pick one below', urgency: 'medium' }
      if (daysUntilScheduled < 0) return { text: 'Inspection date has passed — reschedule or update status', urgency: 'high' }
      if (daysUntilScheduled === 0) return { text: 'Inspection is today — confirm and head out', urgency: 'high' }
      if (daysUntilScheduled === 1) return { text: 'Inspection tomorrow — send a reminder text', urgency: 'medium' }
      return { text: `Inspection in ${daysUntilScheduled} days`, urgency: 'low' }

    case 'estimate_sent':
      return { text: 'Follow up if no response in 3 days', urgency: 'medium' }

    case 'job_scheduled':
      if (!scheduledDate) return { text: 'Marked won but no work date set — add one below', urgency: 'medium' }
      if (daysUntilScheduled < 0) return { text: 'Work date has passed — move to In Progress or reschedule', urgency: 'high' }
      if (daysUntilScheduled === 0) return { text: 'Work starts today — confirm crew is dispatched', urgency: 'high' }
      if (daysUntilScheduled <= 2) return { text: `Work in ${daysUntilScheduled} days — send reminder, confirm crew and materials`, urgency: 'medium' }
      return { text: `Work scheduled in ${daysUntilScheduled} days`, urgency: 'low' }

    case 'in_progress':
      return { text: 'Crew on site. Move to Awaiting Payment when the invoice goes out', urgency: 'low' }

    case 'awaiting_payment':
      return { text: 'Send a payment reminder if invoice is 3+ days old', urgency: 'medium' }

    case 'complete':
      return { text: 'Paid and closed. Ask for a Google review if you have not already', urgency: 'low' }

    case 'lost':
      return { text: 'Dead deal. Queue for win-back in 60-90 days', urgency: 'low' }

    default:
      return null
  }
}