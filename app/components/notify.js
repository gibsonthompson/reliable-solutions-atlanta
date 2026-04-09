export function notify(leadId, type) {
  if (!leadId) return
  fetch('/api/contact/notify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: leadId, type }),
  }).catch(() => {})
}