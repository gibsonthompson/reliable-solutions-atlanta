import Header from './Header'
import Footer from './Footer'
import Image from 'next/image'
import Link from 'next/link'

const allServices = [
  { name: 'Basement Waterproofing', href: '/basement-waterproofing' },
  { name: 'Crawl Space Encapsulation', href: '/crawl-space-encapsulation' },
  { name: 'Crawl Space Repair', href: '/crawl-space-repair' },
  { name: 'Crawl Space Waterproofing', href: '/crawl-space-waterproofing' },
  { name: 'Concrete Repair', href: '/cocnrete-repair' },
  { name: 'Drainage', href: '/drainage' },
  { name: 'Foundation Repair', href: '/foundation-repair' },
]

export default function ServicePageTemplate({ 
  activePage,
  title, 
  subtitle,
  heroImage,
  content,
  benefits,
  relatedServices 
}) {
  return (
    <div className="min-h-screen bg-white">
      <Header activePage={activePage} />

      {/* Hero Section */}
      <section className="relative h-[300px] sm:h-[350px] md:h-[400px] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={heroImage}
            alt={title}
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#273373]/90 via-[#273373]/70 to-[#273373]/40" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 font-display">
              {title}
            </h1>
            <p className="text-lg sm:text-xl text-white/90">
              {subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Content */}
            <div className="lg:col-span-2">
              <div className="prose prose-lg max-w-none">
                {content}
              </div>

              {/* Benefits */}
              {benefits && benefits.length > 0 && (
                <div className="mt-10">
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#273373] mb-6 font-display">Benefits</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#84d2f2] flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-5 h-5 text-[#115997]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-gray-700">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100 sticky top-28">
                <h3 className="text-2xl font-bold text-[#273373] mb-6">Get a Free Quote</h3>
                <p className="text-gray-600 mb-6">
                  Contact us today for a free inspection and estimate. We&apos;ll help you find the right solution.
                </p>
                <a 
                  href="tel:770-895-2039"
                  className="w-full py-4 rounded-lg font-semibold text-white bg-[#115997] hover:bg-[#273373] transition-all duration-200 flex items-center justify-center gap-2 mb-4"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call 770-895-2039
                </a>
                <Link 
                  href="/contact"
                  className="w-full py-4 rounded-lg font-semibold text-[#115997] bg-white border-2 border-[#115997] hover:bg-[#115997] hover:text-white transition-all duration-200 flex items-center justify-center gap-2"
                >
                  Request Estimate Online
                </Link>

                {/* Other Services */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-800 mb-4">Other Services</h4>
                  <ul className="space-y-2">
                    {allServices.filter(s => s.href !== `/${activePage}`).slice(0, 5).map((service) => (
                      <li key={service.href}>
                        <Link 
                          href={service.href}
                          className="text-gray-600 hover:text-[#115997] transition-colors text-sm flex items-center gap-2"
                        >
                          <svg className="w-4 h-4 text-[#84d2f2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                          {service.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      {relatedServices && relatedServices.length > 0 && (
        <section className="py-12 sm:py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#273373] mb-8 font-display">Related Services</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedServices.map((service) => (
                <Link 
                  key={service.href}
                  href={service.href}
                  className="group bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-300 border border-gray-100"
                >
                  <h3 className="text-lg font-bold text-[#273373] mb-2 group-hover:text-[#115997] transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">{service.description}</p>
                  <span className="inline-flex items-center gap-2 text-[#115997] font-semibold text-sm">
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
      )}

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-[#115997]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 font-display">
            Ready to Get Started?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Contact us today for a free inspection and estimate. We serve all of Metro Atlanta.
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
