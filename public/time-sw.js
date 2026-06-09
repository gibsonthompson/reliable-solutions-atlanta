// /time-sw.js — service worker for the RSA Crew Clock PWA
// Scope is /time/ (set by registration in TimeShell.js). Restricted to same-origin GETs.

const CACHE_NAME = 'rsa-time-v2'

self.addEventListener('install', () => {
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const names = await caches.keys()
    await Promise.all(names.filter(n => n !== CACHE_NAME).map(n => caches.delete(n)))
    await self.clients.claim()
  })())
})

self.addEventListener('fetch', (event) => {
  const req = event.request
  if (req.method !== 'GET') return

  const url = new URL(req.url)
  if (url.origin !== self.location.origin) return
  if (url.pathname.startsWith('/api/')) return

  event.respondWith((async () => {
    try {
      const fresh = await fetch(req)
      if (fresh && fresh.status === 200 && fresh.type === 'basic') {
        const cache = await caches.open(CACHE_NAME)
        cache.put(req, fresh.clone())
      }
      return fresh
    } catch (e) {
      const cached = await caches.match(req)
      if (cached) return cached
      throw e
    }
  })())
})