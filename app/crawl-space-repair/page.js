import Header from '../components/Header'
import Footer from '../components/Footer'
import Image from 'next/image'

export const metadata = {
  title: 'Crawl Space Repair Atlanta | Structural & Water Damage Solutions',
  description: 'Expert crawl space repair in Metro Atlanta. Sagging floors, damaged joists, moisture damage fixed. Family owned, 20+ years experience. Free estimates. 770-895-2039',
}

export default function CrawlSpaceRepairPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header activePage="services" />

      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/portfolio/crawl-space-mold-remediation.png"
            alt="Crawl space mold remediation"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-[#273373]/60" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center font-display">
            Crawl Space Repair
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
                src="/images/diagrams/basement-drainage-system-diagram.png"
                alt="Basement drainage system diagram"
                fill
                className="object-contain"
              />
            </div>
            <div>
              <p className="text-gray-700 text-lg leading-relaxed">
                Crawlspaces are the most neglected part of the home. Because they&apos;re not the most desirable place to go water and humidity can cause problems such as wood rot, fungal growth and foundation cracks. We can assess the amount of wood rot and address the cause. If wood repair is necessary like band sill, joist girder and subfloor replacement we are happy to help with repairs.
              </p>
            </div>
          </div>

          {/* Main Content */}
          <div className="mb-12">
            <p className="text-gray-700 text-lg leading-relaxed mb-8">
              If your crawl space contains standing water, mold, or dry rotted floor joists, you may wonder what steps you can take to eradicate it. Your crawl space is a vital part of your home&apos;s structure and is responsible for housing important pipes and in some cases, HVAC systems. When damage occurs, it can result in costly repairs and lower air quality in your home. At Reliable Solutions Atlanta, we offer a multi-step solution to encapsulate your crawl space and protect it from moisture and unwelcome pests.
            </p>

            {/* Signs in the Home */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-[#273373] mb-4">
                Signs of crawl space problems inside of the home:
              </h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-[#115997] rounded-full mt-3 flex-shrink-0"></span>
                  <span className="text-gray-700 text-lg">Drywall cracks in the interior</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-[#115997] rounded-full mt-3 flex-shrink-0"></span>
                  <span className="text-gray-700 text-lg">Uneven floors</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-[#115997] rounded-full mt-3 flex-shrink-0"></span>
                  <span className="text-gray-700 text-lg">Foul odors in the home</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-[#115997] rounded-full mt-3 flex-shrink-0"></span>
                  <span className="text-gray-700 text-lg">Heightened allergies or asthma symptoms</span>
                </li>
              </ul>
            </div>

            {/* Signs in the Crawl Space */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-[#273373] mb-4">
                Signs of crawl space problems inside of the crawl space:
              </h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-[#115997] rounded-full mt-3 flex-shrink-0"></span>
                  <span className="text-gray-700 text-lg">Sagging joists</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-[#115997] rounded-full mt-3 flex-shrink-0"></span>
                  <span className="text-gray-700 text-lg">Mold</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-[#115997] rounded-full mt-3 flex-shrink-0"></span>
                  <span className="text-gray-700 text-lg">Falling, rotting insulation</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-[#115997] rounded-full mt-3 flex-shrink-0"></span>
                  <span className="text-gray-700 text-lg">Cracks along the walls</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-[#115997] rounded-full mt-3 flex-shrink-0"></span>
                  <span className="text-gray-700 text-lg">Wetness</span>
                </li>
              </ul>
            </div>

            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              When pests or water gets into your crawl space, they can wreak havoc on the structural supports and appliances within the area, as well as decrease the health of your home. Things such as elevated humidity and mold and mildew can result in poor indoor air quality. This also can cause your energy bills to increase and the overall environment of your home to deteriorate. When these things happen, the stack effect is likely at play. The stack effect is the upward movement of air from the crawl space through your home. This means that any mold, pest droppings, or humidity are being circulated within the air your family breathes.
            </p>

            <p className="text-gray-700 text-lg leading-relaxed">
              To stop these issues from affecting you and your home, investing in crawl space repairs and encapsulation is the smartest choice. We offer customized solutions for your home such as vent covers, durable vapor barriers, interior drainage systems, drainage matting, dehumidifiers, and more.
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