const SMS_DELAY = 60000 // 60 seconds

export function scheduleNotify(leadId, type) {
  if (!leadId) return
  setTimeout(() => {
    fetch('/api/contact/notify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: leadId, type }),
    }).catch(() => {})
  }, SMS_DELAY)
}