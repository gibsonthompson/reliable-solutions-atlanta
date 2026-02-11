import Header from '../components/Header'
import Footer from '../components/Footer'
import Image from 'next/image'
import Link from 'next/link'

export const metadata = {
  title: 'Crawl Space Encapsulation Atlanta | Moisture & Mold Prevention',
  description: 'Professional crawl space encapsulation in Metro Atlanta. Stop moisture, mold, and pests. Vapor barriers & dehumidifiers. Family owned. Free estimates. 770-895-2039',
}

export default function CrawlSpaceEncapsulationPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Service Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"Service","name":"Crawl Space Encapsulation","description":"Complete crawl space encapsulation services in Metro Atlanta. Vapor barriers, dehumidifiers, and moisture control to prevent mold, improve air quality, and protect your home structure.","url":"https://www.waterhelpme.com/crawl-space-encapsulation","provider":{"@id":"https://www.waterhelpme.com/#business"},"areaServed":{"@type":"State","name":"Georgia"},"serviceType":"Crawl Space Encapsulation"}) }}
      />
      <Header activePage="services" />

      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/portfolio/crawl-space-encapsulation-vapor-barrier.png"
            alt="Crawl space encapsulation installation"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-[#273373]/60" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center font-display">
            Crawl Space Encapsulation
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Intro Section */}
          <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
            <div className="relative h-[300px] rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/images/diagrams/crawl-space-encapsulation-diagram.png"
                alt="Encapsulated crawl space with white vapor barrier"
                fill
                className="object-contain"
              />
            </div>
            <div>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                Crawl spaces are the most neglected part of the home. Because they&apos;re not the most desirable place to go water and humidity can cause problems such as wood rot, fungal growth and foundation cracks. We can assess the amount of wood rot and address the cause. If wood repair is necessary like band sill, joist girder and subfloor replacement we are happy to help with repairs.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                If your crawl space is encapsulated, it means that you have gone through the process of completely sealing the entire crawl space in white plastic. When you choose encapsulation, you are required to install a dehumidifier and a sump pump, as the purpose of crawl space encapsulation is to reduce the moisture that can build up inside the crawl space. This will all help to reduce the risks of mold, and it makes for far cleaner air, too. When you go for crawl space encapsulation, you have 100% of the ground covered in a white plastic with all junctions and seams wholly sealed.
              </p>
            </div>
          </div>

          {/* Encapsulation Benefits */}
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#273373] mb-6">
              Encapsulation Benefits
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              There are plenty of benefits to crawl space encapsulation, and these include:
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-[#115997] rounded-full mt-3 flex-shrink-0"></span>
                <span className="text-gray-700 text-lg">
                  <strong>Better air quality.</strong> Crawl spaces need to be clean because you share up to 60% of the air you breathe with the crawl space. Fresh air is better for your lungs.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-[#115997] rounded-full mt-3 flex-shrink-0"></span>
                <span className="text-gray-700 text-lg">
                  <strong>Save money on your energy bill</strong> with crawl space encapsulation – up to 20% in fact! Conditioned crawl spaces can save you much more energy than you think.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-[#115997] rounded-full mt-3 flex-shrink-0"></span>
                <span className="text-gray-700 text-lg">
                  <strong>Humidity is reduced,</strong> decreasing the risk of mold.
                </span>
              </li>
            </ul>

            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Natural elements such as hot or cold winds, condensation and moisture buildup are oftentimes out of our control. Florida weather can include wet and humid days, which isn&apos;t helpful to a crawl space you&apos;re trying to keep dry.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed mb-8">
              But crawl space encapsulation allows you to battle the elements and fortify your home with long-lasting products. The investment of encapsulation often pays off in the long run.
            </p>

            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-[#115997] rounded-full mt-3 flex-shrink-0"></span>
                <span className="text-gray-700 text-lg">
                  <strong>Prevents mold</strong> - without mold in the crawl space, the air is clean, respiratory and allergy issues are kept at bay and mold remediation costs are eliminated
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-[#115997] rounded-full mt-3 flex-shrink-0"></span>
                <span className="text-gray-700 text-lg">
                  <strong>Protects wood</strong> - by keeping moisture out of a crawl space, the risk of wood rot and sagging joists is gone
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-[#115997] rounded-full mt-3 flex-shrink-0"></span>
                <span className="text-gray-700 text-lg">
                  <strong>Adds property value</strong> - should you sell your home, a house with a crawl space encapsulation is worth more
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-[#115997] rounded-full mt-3 flex-shrink-0"></span>
                <span className="text-gray-700 text-lg">
                  <strong>Protects the environment</strong> - to do your part in producing clean air, your steps to clean your crawl space won&apos;t just benefit your household, but your neighbors too.
                </span>
              </li>
            </ul>
          </div>

          {/* Related Blog Resources */}
          <div className="mt-16 pt-12 border-t border-gray-200">
            <h2 className="text-2xl md:text-3xl font-bold text-[#273373] font-display mb-8">Crawl Space Encapsulation Resources</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link href="/blog/crawl-space-encapsulation-vs-waterproofing" className="group p-6 bg-gray-50 rounded-xl hover:bg-[#115997]/5 transition-colors border border-gray-100">
                <span className="text-sm text-[#115997] font-semibold">Comparison</span>
                <h3 className="text-lg font-bold text-[#273373] mt-2 group-hover:text-[#115997] transition-colors">Encapsulation vs Waterproofing: Which Do You Need?</h3>
                <p className="text-gray-600 mt-2 text-sm">Understanding the difference can save you thousands on the right fix.</p>
              </Link>
              <Link href="/blog/crawl-space-mold-signs" className="group p-6 bg-gray-50 rounded-xl hover:bg-[#115997]/5 transition-colors border border-gray-100">
                <span className="text-sm text-[#115997] font-semibold">Warning Signs</span>
                <h3 className="text-lg font-bold text-[#273373] mt-2 group-hover:text-[#115997] transition-colors">5 Signs Your Crawl Space Has a Mold Problem</h3>
                <p className="text-gray-600 mt-2 text-sm">Crawl space mold affects your health even if you never go down there.</p>
              </Link>
              <Link href="/blog/crawl-space-vapor-barrier-guide" className="group p-6 bg-gray-50 rounded-xl hover:bg-[#115997]/5 transition-colors border border-gray-100">
                <span className="text-sm text-[#115997] font-semibold">Guide</span>
                <h3 className="text-lg font-bold text-[#273373] mt-2 group-hover:text-[#115997] transition-colors">Crawl Space Vapor Barriers: What You Need to Know</h3>
                <p className="text-gray-600 mt-2 text-sm">Why proper installation matters more than the material itself.</p>
              </Link>
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