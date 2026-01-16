import './globals.css'

export const metadata = {
  metadataBase: new URL('https://www.waterhelpme.com'),
  title: {
    default: 'Reliable Solutions Atlanta | Waterproofing & Foundation Repair',
    template: '%s | Reliable Solutions Atlanta',
  },
  description: 'Atlanta\'s trusted waterproofing and foundation repair experts. Family owned with 20+ years experience. Basement waterproofing, crawl space encapsulation, drainage, and foundation repair. Free estimates. 770-895-2039',
  keywords: ['waterproofing Atlanta', 'foundation repair Atlanta', 'basement waterproofing Atlanta', 'crawl space repair Atlanta', 'crawl space encapsulation Georgia', 'drainage solutions Atlanta', 'French drain installation', 'foundation repair Lawrenceville GA'],
  authors: [{ name: 'Reliable Solutions Atlanta' }],
  creator: 'Reliable Solutions Atlanta',
  publisher: 'Reliable Solutions Atlanta',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'RSA Admin',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.waterhelpme.com',
    siteName: 'Reliable Solutions Atlanta',
    title: 'Reliable Solutions Atlanta | Waterproofing & Foundation Repair',
    description: 'Metro Atlanta\'s trusted waterproofing and foundation repair experts. Family owned, 20+ years experience. Free estimates. 770-895-2039',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Reliable Solutions Atlanta - Waterproofing & Foundation Repair',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reliable Solutions Atlanta | Waterproofing & Foundation Repair',
    description: 'Metro Atlanta\'s trusted waterproofing and foundation repair experts. Free estimates. 770-895-2039',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://www.waterhelpme.com',
  },
}

export default function RootLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    '@id': 'https://www.waterhelpme.com/#business',
    name: 'Reliable Solutions Atlanta',
    image: 'https://www.waterhelpme.com/images/og-image.jpg',
    logo: 'https://www.waterhelpme.com/images/og-image.jpg',
    url: 'https://www.waterhelpme.com',
    telephone: '+1-770-895-2039',
    email: 'rsolrepair@gmail.com',
    description: 'Atlanta\'s trusted waterproofing and foundation repair experts. Family owned with 20+ years experience.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '1361 Middleburg Hunt',
      addressLocality: 'Lawrenceville',
      addressRegion: 'GA',
      postalCode: '30043',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 33.9562,
      longitude: -83.9880,
    },
    areaServed: [
      { '@type': 'City', name: 'Atlanta' },
      { '@type': 'City', name: 'Lawrenceville' },
      { '@type': 'City', name: 'Stone Mountain' },
      { '@type': 'City', name: 'Tucker' },
      { '@type': 'City', name: 'Brookhaven' },
      { '@type': 'City', name: 'Lilburn' },
      { '@type': 'City', name: 'Decatur' },
      { '@type': 'City', name: 'Marietta' },
      { '@type': 'City', name: 'Roswell' },
      { '@type': 'City', name: 'Sandy Springs' },
      { '@type': 'City', name: 'Dunwoody' },
      { '@type': 'City', name: 'Alpharetta' },
      { '@type': 'City', name: 'Johns Creek' },
    ],
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00',
      closes: '23:59',
    },
    priceRange: '$$',
    paymentAccepted: ['Cash', 'Credit Card', 'Financing'],
    currenciesAccepted: 'USD',
    sameAs: [
      'https://www.facebook.com/myreliablesol',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Waterproofing & Foundation Services',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Basement Waterproofing' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Foundation Repair' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Crawl Space Encapsulation' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Crawl Space Repair' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Crawl Space Waterproofing' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Concrete Repair' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Drainage Solutions' } },
      ],
    },
  }

  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" href="/images/icon-192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}