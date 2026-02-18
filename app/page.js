import HomePageClient from './HomePageClient'

export const metadata = {
  title: 'Waterproofing & Foundation Repair Atlanta GA | Reliable Solutions Atlanta',
  description: 'Atlanta waterproofing and foundation repair experts. Basement waterproofing, crawl space encapsulation, crawl space repair, drainage solutions, and foundation repair. Family owned, 20+ years experience. Free estimates. Call 770-895-2039.',
  alternates: {
    canonical: 'https://www.waterhelpme.com',
  },
  openGraph: {
    title: 'Waterproofing & Foundation Repair Atlanta GA | Reliable Solutions Atlanta',
    description: 'Atlanta waterproofing and foundation repair experts. Basement waterproofing, crawl space encapsulation, drainage solutions, and foundation repair. Family owned, 20+ years experience. Free estimates.',
    url: 'https://www.waterhelpme.com',
    type: 'website',
  },
}

export default function HomePage() {
  return <HomePageClient />
}