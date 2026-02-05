import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { cityData, allCitySlugs, getCityData } from './cityData'

// Generate static params for all cities
export async function generateStaticParams() {
  return allCitySlugs.map((slug) => ({ city: slug }))
}

// Generate unique metadata per city
export async function generateMetadata({ params }) {
  const { city } = await params
  const data = getCityData(city)
  if (!data) return {}

  return {
    title: data.metaTitle,
    description: data.metaDescription,
    alternates: {
      canonical: `https://www.waterhelpme.com/service-area/${city}`,
    },
    openGraph: {
      title: data.metaTitle,
      description: data.metaDescription,
      url: `https://www.waterhelpme.com/service-area/${city}`,
      type: 'website',
    },
  }
}

export default async function CityPage({ params }) {
  const { city } = await params
  const data = getCityData(city)
  if (!data) notFound()

  const services = [
    {
      name: 'Basement Waterproofing',
      href: '/basement-waterproofing',
      description: `Interior and exterior basement waterproofing solutions for ${data.name} homes. We stop water intrusion at the source and keep your basement dry permanently.`,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      name: 'Foundation Repair',
      href: '/foundation-repair',
      description: `Foundation stabilization and crack repair for ${data.county} properties. We address settling, bowing walls, and structural damage with engineered solutions.`,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
    {
      name: 'Crawl Space Encapsulation',
      href: '/crawl-space-encapsulation',
      description: `Full crawl space encapsulation with vapor barriers, dehumidifiers, and insulation. Eliminate moisture, mold, and pests under your ${data.name} home.`,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      name: 'Drainage Solutions',
      href: '/drainage',
      description: `French drains, sump pumps, and yard drainage systems designed for ${data.county}\u2019s clay soil and rainfall patterns. Redirect water away from your foundation.`,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
    },
    {
      name: 'Crawl Space Repair',
      href: '/crawl-space-repair',
      description: `Structural crawl space repairs including jack posts, beam replacement, and support systems. Stabilize sagging floors and restore structural integrity.`,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      name: 'Concrete Repair',
      href: '/cocnrete-repair',
      description: `Concrete leveling, crack repair, and restoration for driveways, patios, sidewalks, and garage floors throughout ${data.name} and surrounding areas.`,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        </svg>
      ),
    },
  ]

  // JSON-LD schema for local business + service area
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    name: 'Reliable Solutions Atlanta',
    url: `https://www.waterhelpme.com/service-area/${city}`,
    telephone: '+1-770-895-2039',
    email: 'rsolrepair@gmail.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '1361 Middleburg Hunt',
      addressLocality: 'Lawrenceville',
      addressRegion: 'GA',
      postalCode: '30043',
      addressCountry: 'US',
    },
    areaServed: {
      '@type': 'City',
      name: data.name,
      containedInPlace: {
        '@type': 'AdministrativeArea',
        name: data.county,
      },
    },
    description: data.metaDescription,
    priceRange: '$$',
  }

  return (
    <div className="min-h-screen bg-white">
      <Header activePage="service-area" />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <section className="relative bg-[#273373] py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 25% 50%, #115997 0%, transparent 50%), radial-gradient(circle at 75% 50%, #84d2f2 0%, transparent 50%)',
          }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#115997]/50 rounded-full text-[#84d2f2] text-sm font-medium mb-6">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Serving {data.name}, {data.state} &bull; {data.county}
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight font-display">
                {data.heroHeading}
              </h1>
              <p className="text-lg text-white/80 mb-8 leading-relaxed">
                {data.heroSubtext}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="tel:770-895-2039"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold rounded-lg bg-[#2692cc] text-white hover:bg-[#84d2f2] hover:text-[#273373] transition-all duration-200"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Get Free Estimate
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold rounded-lg bg-white/10 text-white border-2 border-white/30 hover:bg-white hover:text-[#273373] transition-all duration-200"
                >
                  Contact Us Online
                </Link>
              </div>
            </div>

            {/* Map Embed */}
            <div className="hidden lg:block">
              <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10">
                <iframe
                  src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(data.name + ', ' + data.state)}&zoom=12`}
                  width="100%"
                  height="350"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Map of ${data.name}, ${data.state}`}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Local Challenges Section */}
      <section className="py-14 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-4 font-display">
              Why {data.name} Homes Need Waterproofing
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              {data.commonHomeTypes}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {data.localChallenges.map((challenge, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-8 border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-full bg-[#84d2f2]/20 flex items-center justify-center mb-5">
                  <span className="text-[#115997] font-bold text-lg">{index + 1}</span>
                </div>
                <h3 className="text-xl font-bold text-[#273373] mb-3">{challenge.title}</h3>
                <p className="text-gray-600 leading-relaxed">{challenge.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services We Offer Section */}
      <section className="py-14 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-4 font-display">
              Our Services in {data.name}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We provide comprehensive waterproofing and foundation repair solutions tailored to {data.county}&apos;s unique soil and climate conditions.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="group bg-gray-50 rounded-xl p-6 hover:bg-[#273373] transition-all duration-300 border border-gray-100 hover:border-[#273373]"
              >
                <div className="text-[#115997] group-hover:text-[#84d2f2] mb-4 transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-lg font-bold text-[#273373] group-hover:text-white mb-2 transition-colors">
                  {service.name}
                </h3>
                <p className="text-gray-600 group-hover:text-white/70 text-sm leading-relaxed transition-colors">
                  {service.description}
                </p>
                <span className="inline-flex items-center gap-1 mt-4 text-[#115997] group-hover:text-[#84d2f2] font-semibold text-sm transition-colors">
                  Learn More
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Local Stats & Trust */}
      <section className="py-14 md:py-20 bg-[#115997]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 font-display">
                Trusted by {data.name} Homeowners
              </h2>
              <p className="text-white/80 text-lg leading-relaxed mb-6">
                {data.localStats}
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white/10 rounded-xl p-5">
                  <p className="text-3xl font-bold text-[#84d2f2]">20+</p>
                  <p className="text-white/70 text-sm mt-1">Years Experience</p>
                </div>
                <div className="bg-white/10 rounded-xl p-5">
                  <p className="text-3xl font-bold text-[#84d2f2]">A+</p>
                  <p className="text-white/70 text-sm mt-1">BBB Rating</p>
                </div>
                <div className="bg-white/10 rounded-xl p-5">
                  <p className="text-3xl font-bold text-[#84d2f2]">IICRC</p>
                  <p className="text-white/70 text-sm mt-1">Certified</p>
                </div>
                <div className="bg-white/10 rounded-xl p-5">
                  <p className="text-3xl font-bold text-[#84d2f2]">Free</p>
                  <p className="text-white/70 text-sm mt-1">Estimates</p>
                </div>
              </div>
            </div>

            {/* Neighborhoods & Nearby */}
            <div>
              <div className="bg-white/10 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-white mb-4">
                  {data.name} Neighborhoods We Serve
                </h3>
                <div className="flex flex-wrap gap-2 mb-8">
                  {data.neighborhoods.map((neighborhood) => (
                    <span key={neighborhood} className="px-3 py-1.5 bg-white/10 rounded-full text-white text-sm">
                      {neighborhood}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl font-bold text-white mb-4">
                  Nearby Cities We Also Serve
                </h3>
                <div className="flex flex-wrap gap-2">
                  {data.nearbyAreas.map((area) => {
                    const areaSlug = area.toLowerCase().replace(/\s+/g, '-')
                    const hasPage = allCitySlugs.includes(areaSlug)
                    return hasPage ? (
                      <Link
                        key={area}
                        href={`/service-area/${areaSlug}`}
                        className="px-3 py-1.5 bg-[#84d2f2]/20 rounded-full text-[#84d2f2] text-sm hover:bg-[#84d2f2]/30 transition-colors underline-offset-2"
                      >
                        {area} &rarr;
                      </Link>
                    ) : (
                      <span key={area} className="px-3 py-1.5 bg-white/10 rounded-full text-white/70 text-sm">
                        {area}
                      </span>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section - unique per city for SEO */}
      <section className="py-14 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#273373] mb-8 text-center font-display">
            Frequently Asked Questions: Waterproofing in {data.name}
          </h2>
          <div className="space-y-4">
            {[
              {
                q: `How much does basement waterproofing cost in ${data.name}?`,
                a: `Basement waterproofing costs in ${data.name} typically range from $2,000 to $10,000+ depending on the scope. Interior French drain systems average $3,000\u2013$7,000, while exterior waterproofing can run $5,000\u2013$15,000. We provide free estimates with transparent pricing\u2014no high-pressure sales tactics.`
              },
              {
                q: `Do ${data.name} homes commonly have foundation problems?`,
                a: `Yes. ${data.county}\u2019s clay-heavy soil expands and contracts with moisture changes, putting constant stress on foundations. Common signs include wall cracks, sticking doors, uneven floors, and gaps around windows. If you notice any of these, schedule a free inspection before the problem worsens.`
              },
              {
                q: `How quickly can you respond to a water emergency in ${data.name}?`,
                a: `We\u2019re based in Lawrenceville and serve all of ${data.county}, so we can typically respond to ${data.name} emergency calls within a few hours. We\u2019re available 7 days a week. Call us at 770-895-2039 for immediate assistance.`
              },
              {
                q: `What warranty do you offer for waterproofing in ${data.name}?`,
                a: `We offer an extensive transferable warranty on all our waterproofing systems\u2014one of the strongest in the industry. Your warranty stays with the home if you sell, which adds value to your property. Ask us for full warranty details during your free estimate.`
              },
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-bold text-[#273373] mb-2">{faq.q}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick & Reliable CTA */}
      <section className="py-12 bg-[#273373]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white font-display italic">
                Quick &amp; Reliable in {data.name}
              </h2>
              <p className="text-white/80 mt-1">Available 7 days a week for estimates and emergencies</p>
            </div>
            <a
              href="tel:770-895-2039"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#84d2f2] text-[#273373] rounded-lg font-semibold hover:bg-white transition-all duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call us 770-895-2039
            </a>
          </div>
        </div>
      </section>

      {/* Back to Service Areas + Contact Info */}
      <section className="py-8 bg-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <Link
              href="/service-area"
              className="text-gray-400 hover:text-white transition-colors inline-flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              View All Service Areas
            </Link>
            <div className="flex flex-wrap items-center gap-6">
              <a href="mailto:rsolrepair@gmail.com" className="text-gray-400 hover:text-[#84d2f2] text-sm">rsolrepair@gmail.com</a>
              <a href="tel:770-895-2039" className="text-gray-400 hover:text-[#84d2f2] text-sm">770-895-2039</a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
