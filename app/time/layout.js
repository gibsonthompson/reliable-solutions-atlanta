import TimeShell from './TimeShell'

export const metadata = {
  title: 'Clock',
  manifest: '/time-manifest.json',
  appleWebApp: {
    capable: true,
    title: 'Clock',
    statusBarStyle: 'default',
  },
  icons: {
    apple: [
      { url: '/images/icon-192.png', sizes: '192x192' },
      { url: '/images/icon-512.png', sizes: '512x512' },
    ],
  },
}

export const viewport = {
  themeColor: '#115997',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
}

export default function TimeLayout({ children }) {
  return <TimeShell>{children}</TimeShell>
}