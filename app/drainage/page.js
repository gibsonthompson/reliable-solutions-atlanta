import Header from '../components/Header'
import Footer from '../components/Footer'
import Image from 'next/image'

export const metadata = {
  title: 'Drainage Solutions Atlanta | French Drains & Water Management',
  description: 'Expert drainage solutions in Metro Atlanta. French drains, surface drains, downspout extensions. Protect your foundation. Family owned. Free estimates. 770-895-2039',
}

export default function DrainagePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header activePage="services" />

      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/portfolio/french-drain-pipe-installation.png"
            alt="French drain pipe installation"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-[#273373]/60" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center font-display">
            Drainage
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
                src="/images/diagrams/french-drain-diagram.png"
                alt="French drain system diagram"
                fill
                className="object-contain"
              />
            </div>
            <div>
              <p className="text-gray-700 text-lg leading-relaxed">
                Poor drainage can destroy your home! It is very important that water can flow away from your structure. If storm water is allowed to pool near your foundation, you are asking for a wet basement and the possibility of a basement wall collapse. Wet basements and cracked foundations are difficult to fix after the fact, but good perimeter drainage, both at grade and down at the footings, is a cheap and easy way to prevent problems.
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="mb-12 space-y-6">
            <p className="text-gray-700 text-lg leading-relaxed">
              Does water somehow find its way into your basement? An interior perimeter drainage system addresses hydrostatic pressure – that is, the pressure of groundwater forcing its way through the basement walls or foundation.
            </p>

            <p className="text-gray-700 text-lg leading-relaxed">
              Some contractors recommend installing a drainage system outside the foundation as a waterproofing system. The problem with exterior drain lines is that they eventually clog with silt, soil and roots.
            </p>

            <p className="text-gray-700 text-lg leading-relaxed">
              By installing an interior perimeter drainage system around the inside of the basement along the wall, you can capture water at the most common point of entry - the floor/wall joint. You can also capture water from the walls and prevent the center of the basement floor from leaking by intercepting the water at the perimeter of the floor before it gets to the center. Even in basements that are already finished, it&apos;s much easier to waterproof from the inside than the outside.
            </p>

            <p className="text-gray-700 text-lg leading-relaxed">
              It doesn&apos;t matter what&apos;s causing your basement water problem, or how your house was constructed, Reliable Solutions Atlanta drainage systems, sump pumps and other waterproofing products can be installed to create a system that&apos;s right for your home.
            </p>

            <p className="text-gray-700 text-lg leading-relaxed">
              To learn more about installing or upgrading your basement drainage system, contact us today to request a consultation with your local Reliable Solutions Atlanta waterproofing contractor.
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