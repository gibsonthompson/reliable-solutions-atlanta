import Header from '../components/Header'
import Footer from '../components/Footer'
import Image from 'next/image'

export const metadata = {
  title: 'Portfolio',
  description: 'View our portfolio of completed waterproofing, foundation repair, and crawl space projects in Metro Atlanta. Reliable Solutions Atlanta.',
}

export default function PortfolioPage() {
  // Portfolio images - actual project photos
  const portfolioImages = [
    { src: '/images/portfolio/foundation-repair-crew-working-atlanta.png', alt: 'Foundation repair crew working in Atlanta' },
    { src: '/images/portfolio/stone-porch-steps-completed.png', alt: 'Completed stone porch steps' },
    { src: '/images/portfolio/foundation-repair-in-progress.png', alt: 'Foundation repair in progress' },
    { src: '/images/portfolio/french-drain-pipe-installation.png', alt: 'French drain pipe installation' },
    { src: '/images/portfolio/reliable-solutions-atlanta-truck.png', alt: 'Reliable Solutions Atlanta truck on job site' },
    { src: '/images/portfolio/downspout-drainage-completed.png', alt: 'Completed downspout drainage installation' },
    { src: '/images/portfolio/concrete-patio-crew-working.png', alt: 'Crew working on concrete patio' },
    { src: '/images/portfolio/concrete-truck-job-site.png', alt: 'Concrete truck at job site' },
    { src: '/images/portfolio/concrete-pad-finishing.png', alt: 'Finishing concrete pad' },
    { src: '/images/portfolio/crawl-space-mold-remediation.png', alt: 'Crawl space mold remediation' },
    { src: '/images/portfolio/exterior-waterproofing-membrane.png', alt: 'Exterior waterproofing membrane installation' },
    { src: '/images/portfolio/drainage-crew-excavator.png', alt: 'Drainage crew with excavator' },
    { src: '/images/portfolio/crew-gravel-drainage-install.png', alt: 'Crew installing gravel drainage' },
    { src: '/images/portfolio/basement-waterproofing-interior.png', alt: 'Interior basement waterproofing' },
    { src: '/images/portfolio/french-drain-crew-digging.png', alt: 'Crew digging French drain' },
    { src: '/images/portfolio/drainage-gravel-install-brick-home.png', alt: 'Drainage gravel installation at brick home' },
    { src: '/images/portfolio/crew-loading-debris-truck.png', alt: 'Crew loading debris into truck' },
    { src: '/images/portfolio/foundation-excavation-crew.png', alt: 'Foundation excavation crew' },
    { src: '/images/portfolio/french-drain-luxury-home.png', alt: 'French drain installation at luxury home' },
    { src: '/images/portfolio/crawl-space-encapsulation-vapor-barrier.png', alt: 'Crawl space encapsulation vapor barrier' },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header activePage="portfolio" />

      {/* Portfolio Header */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#273373] font-display">
              Our Portfolio
            </h1>
            <div className="w-24 h-1 bg-[#115997] mx-auto mt-4 rounded-full"></div>
          </div>

          {/* Portfolio Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolioImages.map((image, index) => (
              <div 
                key={index}
                className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg group cursor-pointer"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[#273373]/0 group-hover:bg-[#273373]/40 transition-all duration-300" />
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