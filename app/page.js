import HomePageClient from './HomePageClient'

export const metadata = {
  title: 'Waterproofing & Foundation Repair Atlanta GA | Reliable Solutions Atlanta',
  description: 'Family owned, 20+ years experience. 5-star rated on Google. We fix wet basements, crawl spaces, drainage, and foundation problems across Metro Atlanta — permanently. Free same-week inspections. Call 770-895-2039.',
  alternates: {
    canonical: 'https://www.waterhelpme.com',
  },
  openGraph: {
    title: 'Waterproofing & Foundation Repair Atlanta GA | Reliable Solutions Atlanta',
    description: 'Family owned, 20+ years experience. 5-star rated on Google. We fix wet basements, crawl spaces, drainage, and foundation problems across Metro Atlanta — permanently. Free same-week inspections.',
    url: 'https://www.waterhelpme.com',
    type: 'website',
  },
}

export default function HomePage() {
  return <HomePageClient />
}