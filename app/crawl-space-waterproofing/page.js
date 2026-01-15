import Header from '../components/Header'
import Footer from '../components/Footer'
import Image from 'next/image'

export const metadata = {
  title: 'Crawl Space Waterproofing',
  description: 'Professional crawl space waterproofing services in Atlanta. Vapor barriers, encapsulation, and moisture control. Reliable Solutions Atlanta.',
}

export default function CrawlSpaceWaterproofingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header activePage="services" />

      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/portfolio/crawl-space-encapsulation-vapor-barrier.png"
            alt="Crawl space encapsulation with vapor barrier"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-[#273373]/60" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center font-display">
            Crawl Space Waterproofing
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Intro Section */}
          <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
            <div className="relative h-[350px]">
              <Image
                src="/images/diagrams/crawl-space-encapsulation-diagram.png"
                alt="Crawl space encapsulation diagram"
                fill
                className="object-contain"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#273373] mb-4">
                Check your Crawl Space today!
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                If your home has a crawl space, you probably try to avoid it at all costs. The dark and damp environment in this area of your home can serve as the perfect place for all kinds of insects and rodents. Even worse, it often provides the ideal conditions for mold and mildew to thrive. If left untreated, mold can be very hard to eradicate, causing damage to your property and posing a threat to your health.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                Crawlspace Encapsulation is only needed with a dirt floor crawlspace. The crawl space encapsulation process includes covering the dirt floor and foundation walls with a heavy vapor barrier. The installation of crawlspace encapsulation can usually be completed in one day for many homes. While providing you with a free quote we can determine if a crawlspace encapsulation is the proper solution for your ground water intrusion problems.
              </p>
            </div>
          </div>

          {/* Waterproofing Benefits */}
          <div className="mb-12">
            <h2 className="text-xl font-bold text-[#273373] mb-4">
              Waterproofing can avoid:
            </h2>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-[#115997] rounded-full mt-3 flex-shrink-0"></span>
                <span className="text-gray-700 text-lg">Mold Problems</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-[#115997] rounded-full mt-3 flex-shrink-0"></span>
                <span className="text-gray-700 text-lg">Standing Water</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-[#115997] rounded-full mt-3 flex-shrink-0"></span>
                <span className="text-gray-700 text-lg">Bugs</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-[#115997] rounded-full mt-3 flex-shrink-0"></span>
                <span className="text-gray-700 text-lg">Structural Problems</span>
              </li>
            </ul>

            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              The techniques used to waterproof a crawl space depend on several factors, including the type of foundation you have, where the water is coming from, whether you have a storm drain near your house, and the grade of the soil around the foundation.
            </p>

            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              A waterproof, condensation-proof vapor barrier is the key to waterproofing your crawl space. This prevents moisture in the soil under and around your home&apos;s foundation from evaporating and entering the crawl space. A vapor barrier is a specially engineered, heavy-duty polyethylene sheet designed to deflect water rather than absorb it.
            </p>

            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Waterproofing methods may be implemented either on the exterior of your home or interior of the crawl space.
            </p>

            <p className="text-gray-700 text-lg leading-relaxed">
              To enjoy all the benefits of a waterproof crawl space, please contact us today.
            </p>
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