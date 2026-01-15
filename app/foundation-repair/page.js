import Header from '../components/Header'
import Footer from '../components/Footer'
import Image from 'next/image'

export const metadata = {
  title: 'Foundation Repair',
  description: 'Professional foundation repair services in Atlanta. Slab foundations, raised foundations, hydraulic push piers, and structural engineering. Reliable Solutions Atlanta.',
}

export default function FoundationRepairPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header activePage="services" />

      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/foundation-repair-atlanta.png"
            alt="Foundation repair"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-[#273373]/60" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center font-display">
            Foundation Repair
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Intro Section */}
          <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
            <div className="relative h-[400px]">
              <Image
                src="/images/foundation-diagram.png"
                alt="Foundation diagram"
                fill
                className="object-contain"
              />
            </div>
            <div>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                The foundation of your building is, without a doubt, the most important part. Without a sturdy foundation, your home or business can be subject to catastrophic damage. While the causes of foundation damage or risk differ widely, our specialists at Reliable Solutions Atlanta are equipped to respond to each of your foundation repair concerns in a timely, professional, and efficient manner.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                If you see cracking within your foundation or suspect a foundation problem, time is of the essence. The foundation of a building is what holds the rest together. When problems start to arise, it can have a domino effect on other structural assets of the building. Contact us at Reliable Solutions Atlanta immediately to have a technician evaluate your building&apos;s needs and start on repairs before further damage is done.
              </p>
            </div>
          </div>

          {/* Foundation Types */}
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-bold text-[#273373] mb-2">Slab Foundation</h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                A slab foundation is when the building rests on a large slab of concrete. There is no crawl space underneath this concrete
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#273373] mb-2">Raised Foundation</h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                A raised foundation differs from a slab foundation because there is a minimum of 16 inches of crawl space.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#273373] mb-2">Hydraulic Push Piers</h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                When portions of the slab are sinking on the exterior of the property, we use a hydraulic push pier system for pier and beam foundation repair.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#273373] mb-2">Real Estate Inspections</h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                We are also proud to offer some outstanding real estate inspections if you&apos;re searching for a new house.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#273373] mb-2">Structural Engineering</h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                Finally, we offer structural engineering services for residential additions and remodels, apartment retrofit, and foundation repair.
              </p>
            </div>
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