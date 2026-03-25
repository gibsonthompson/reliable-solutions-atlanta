import Header from '../components/Header'
import Footer from '../components/Footer'
import Link from 'next/link'

export const metadata = {
  title: 'Service Areas',
  description: 'Reliable Solutions Atlanta serves Metro Atlanta including Lawrenceville, Marietta, Roswell, Alpharetta, Decatur, Sandy Springs, Stone Mountain, and surrounding areas. 770-895-2039',
}

export default function ServiceAreaPage() {
  // Cities WITH dedicated pages (link to them)
  const featuredAreas = [
    { name: 'Lawrenceville', state: 'GA', slug: 'lawrenceville', county: 'Gwinnett County', lat: 33.956, lng: -83.988 },
    { name: 'Marietta', state: 'GA', slug: 'marietta', county: 'Cobb County', lat: 33.953, lng: -84.550 },
    { name: 'Roswell', state: 'GA', slug: 'roswell', county: 'Fulton County', lat: 34.023, lng: -84.362 },
    { name: 'Alpharetta', state: 'GA', slug: 'alpharetta', county: 'Fulton County', lat: 34.075, lng: -84.294 },
    { name: 'Decatur', state: 'GA', slug: 'decatur', county: 'DeKalb County', lat: 33.775, lng: -84.296 },
    { name: 'Sandy Springs', state: 'GA', slug: 'sandy-springs', county: 'Fulton County', lat: 33.924, lng: -84.379 },
    { name: 'Stone Mountain', state: 'GA', slug: 'stone-mountain', county: 'DeKalb County', lat: 33.808, lng: -84.170 },
  ]

  // Additional cities we serve (no dedicated pages yet)
  const additionalAreas = [
    { name: 'Atlanta', state: 'GA', lat: 33.749, lng: -84.388 },
    { name: 'Tucker', state: 'GA', lat: 33.855, lng: -84.217 },
    { name: 'Brookhaven', state: 'GA', lat: 33.859, lng: -84.339 },
    { name: 'Lilburn', state: 'GA', lat: 33.890, lng: -84.143 },
    { name: 'Dunwoody', state: 'GA', lat: 33.946, lng: -84.334 },
    { name: 'Johns Creek', state: 'GA', lat: 34.029, lng: -84.198 },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header activePage="service-area" />

      {/* Hero */}
      <section className="bg-[#273373] py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 font-display">
            Serving Metro Atlanta
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Reliable Solutions Atlanta provides waterproofing and foundation repair services across the greater Metro Atlanta area. Select a city below to learn about the unique challenges we solve in your area.
          </p>
        </div>
      </section>

      {/* Featured Service Areas - with dedicated pages */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#273373] mb-8 text-center font-display">
            Our Primary Service Areas
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredAreas.map((area) => (
              <Link
                key={area.slug}
                href={`/service-area/${area.slug}`}
                className="group relative bg-gray-100 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {/* Map */}
                <div className="h-[250px] relative">
                  <iframe
                    src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(area.name + ', ' + area.state)}&zoom=11`}
                    width="100%"
                    height="100%"
                    style={{ border: 0, pointerEvents: 'none' }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Map of ${area.name}, ${area.state}`}
                  />
                </div>
                {/* Info overlay */}
                <div className="p-5 bg-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-[#273373] group-hover:text-[#115997] transition-colors font-display">
                        {area.name}, {area.state}
                      </h3>
                      <p className="text-gray-500 text-sm">{area.county}</p>
                    </div>
                    <span className="inline-flex items-center gap-1 text-[#115997] font-semibold text-sm group-hover:gap-2 transition-all">
                      Learn More
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Areas */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#273373] mb-8 text-center font-display">
            We Also Serve
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {additionalAreas.map((area) => (
              <div
                key={area.name}
                className="bg-white rounded-xl p-5 text-center shadow-sm border border-gray-100"
              >
                <svg className="w-6 h-6 text-[#115997] mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <h3 className="font-semibold text-[#273373]">{area.name}</h3>
                <p className="text-gray-500 text-xs">{area.state}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-500 mt-8">
            Don&apos;t see your city? We may still serve your area!{' '}
            <a href="tel:770-895-2039" className="text-[#115997] font-semibold hover:underline">Call 770-895-2039</a>
          </p>
        </div>
      </section>

      {/* Quick & Reliable CTA */}
      <section className="py-12 bg-[#115997]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white font-display italic">
                Quick &amp; Reliable
              </h2>
              <p className="text-white/80 mt-1">We are available via email or phone</p>
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

      {/* Contact Info Bar */}
      <section className="py-8 bg-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div>
                <h4 className="text-white font-semibold">Location</h4>
                <p className="text-gray-400">Lawrenceville, GA</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <div>
                <h4 className="text-white font-semibold">Email</h4>
                <a href="mailto:rsolrepair@gmail.com" className="text-gray-400 hover:text-[#84d2f2]">rsolrepair@gmail.com</a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <div>
                <h4 className="text-white font-semibold">Call or Text</h4>
                <a href="tel:770-895-2039" className="text-gray-400 hover:text-[#84d2f2]">770-895-2039</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
