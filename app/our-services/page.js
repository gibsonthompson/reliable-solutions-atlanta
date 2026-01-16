import Header from '../components/Header'
import Footer from '../components/Footer'
import Image from 'next/image'
import Link from 'next/link'

export const metadata = {
  title: 'Our Services',
  description: 'Waterproofing and foundation repair services in Metro Atlanta. Basement waterproofing, crawl space encapsulation, foundation repair, drainage solutions. Free estimates. 770-895-2039',
}

export default function OurServicesPage() {
  const services = [
    {
      name: 'Basement Waterproofing',
      href: '/basement-waterproofing',
      description: 'Interior and exterior waterproofing solutions to keep your basement dry and protected from water damage.',
      image: '/images/foundation-waterproofing-membrane.png'
    },
    {
      name: 'Crawl Space Encapsulation',
      href: '/crawl-space-encapsulation',
      description: '100% sealing of your crawl space with vapor barriers, dehumidifiers, and moisture control systems.',
      image: '/images/drainage-installation-atlanta-home.png'
    },
    {
      name: 'Crawl Space Repair',
      href: '/crawl-space-repair',
      description: 'Structural repairs, vent covers, vapor barriers, and drainage solutions for damaged crawl spaces.',
      image: '/images/foundation-excavation-work.png'
    },
    {
      name: 'Crawl Space Waterproofing',
      href: '/crawl-space-waterproofing',
      description: 'Vapor barrier installation and waterproofing to prevent moisture, mold, and structural damage.',
      image: '/images/waterproofing-crew-hard-hats.png'
    },
    {
      name: 'Concrete Repair',
      href: '/cocnrete-repair',
      description: 'Masonry services including brick and stone pointing, crack repair, and retaining wall construction.',
      image: '/images/foundation-repair-atlanta-crew.png'
    },
    {
      name: 'Drainage',
      href: '/drainage',
      description: 'Interior and exterior drainage systems, French drains, and sump pumps to manage water around your home.',
      image: '/images/drainage-installation-atlanta-home.png'
    },
    {
      name: 'Foundation Repair',
      href: '/foundation-repair',
      description: 'Expert foundation repair for slab and raised foundations using hydraulic push piers and structural engineering.',
      image: '/images/foundation-excavation-work.png'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header activePage="our-services" />

      {/* Hero Section */}
      <section className="relative h-[300px] sm:h-[350px] md:h-[400px] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/foundation-waterproofing-membrane.png"
            alt="Waterproofing services in Atlanta"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#273373]/90 via-[#273373]/70 to-[#273373]/40" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 font-display">
              Our Services
            </h1>
            <p className="text-lg sm:text-xl text-white/90">
              Comprehensive waterproofing and foundation solutions for Metro Atlanta homeowners.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-4 font-display">
              What We Do
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From basement waterproofing to foundation repair, we provide permanent solutions that protect your home.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.map((service) => (
              <Link 
                key={service.href} 
                href={service.href}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#273373] mb-2 group-hover:text-[#115997] transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {service.description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-[#115997] font-semibold text-sm">
                    Learn More
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-[#115997]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 font-display">
            Not Sure What You Need?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Contact us for a free inspection. We&apos;ll assess your home and recommend the best solution for your situation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:770-895-2039"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold rounded-lg bg-[#2692cc] text-white hover:bg-[#84d2f2] hover:text-[#273373] transition-all duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call 770-895-2039
            </a>
            <Link 
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold rounded-lg bg-white text-[#115997] hover:bg-gray-100 transition-all duration-200"
            >
              Request Free Estimate
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
