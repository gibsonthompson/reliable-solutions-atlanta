const SMS_DELAY = 60000 // 60 seconds

const pendingNotifications = []

function flushPending() {
  while (pendingNotifications.length > 0) {
    const { leadId, type, timerId } = pendingNotifications.shift()
    clearTimeout(timerId)
    // sendBeacon works during page unload — fetch does not
    navigator.sendBeacon(
      '/api/contact/notify',
      new Blob([JSON.stringify({ id: leadId, type })], { type: 'application/json' })
    )
  }
}

if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', flushPending)
}

export function scheduleNotify(leadId, type) {
  if (!leadId) return
  const timerId = setTimeout(() => {
    // Remove from pending since it's firing normally
    const idx = pendingNotifications.findIndex((n) => n.timerId === timerId)
    if (idx !== -1) pendingNotifications.splice(idx, 1)

    fetch('/api/contact/notify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: leadId, type }),
    }).catch(() => {})
  }, SMS_DELAY)

  pendingNotifications.push({ leadId, type, timerId })
}