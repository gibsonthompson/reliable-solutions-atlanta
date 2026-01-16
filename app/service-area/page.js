import Header from '../components/Header'
import Footer from '../components/Footer'

export const metadata = {
  title: 'Service Areas',
  description: 'Reliable Solutions Atlanta serves Metro Atlanta including Lawrenceville, Stone Mountain, Decatur, Marietta, Roswell, Alpharetta, and surrounding areas. 770-895-2039',
}

export default function ServiceAreaPage() {
  const serviceAreas = [
  { name: 'Atlanta', state: 'GA', lat: 33.749, lng: -84.388 },
  { name: 'Stone Mountain', state: 'GA', lat: 33.808, lng: -84.170 },
  { name: 'Tucker', state: 'GA', lat: 33.855, lng: -84.217 },
  { name: 'Brookhaven', state: 'GA', lat: 33.859, lng: -84.339 },
  { name: 'Lilburn', state: 'GA', lat: 33.890, lng: -84.143 },
  { name: 'Decatur', state: 'GA', lat: 33.775, lng: -84.296 },
  { name: 'Marietta', state: 'GA', lat: 33.953, lng: -84.550 },
  { name: 'Roswell', state: 'GA', lat: 34.023, lng: -84.362 },
  { name: 'Sandy Springs', state: 'GA', lat: 33.924, lng: -84.379 },
  { name: 'Dunwoody', state: 'GA', lat: 33.946, lng: -84.334 },
  { name: 'Alpharetta', state: 'GA', lat: 34.075, lng: -84.294 },
  { name: 'Johns Creek', state: 'GA', lat: 34.029, lng: -84.198 },
  { name: 'Lawrenceville', state: 'GA', lat: 33.956, lng: -83.988 },
]

  return (
    <div className="min-h-screen bg-white">
      <Header activePage="service-area" />

      {/* Service Areas Grid */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceAreas.map((area, index) => (
              <div 
                key={index} 
                className="relative bg-gray-100 rounded-xl overflow-hidden shadow-lg"
              >
                {/* Map placeholder with static map image */}
                <div className="h-[300px] relative">
                  <iframe
                    src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(area.name + ', ' + area.state)}&zoom=11`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Map of ${area.name}, ${area.state}`}
                  />
                  {/* Location label overlay */}
                  <div className="absolute top-4 left-4 bg-white px-4 py-2 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold text-[#273373] font-display">
                      {area.name} {area.state}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick & Reliable CTA */}
      <section className="py-12 bg-[#115997]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white font-display italic">
                Quick & Reliable
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
                <p className="text-gray-400">Atlanta, GA</p>
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