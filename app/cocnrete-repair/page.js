import Header from '../components/Header'
import Footer from '../components/Footer'
import Image from 'next/image'
import Link from 'next/link'

export const metadata = {
  title: 'Concrete Repair Atlanta | Driveways, Patios & Foundation Slabs',
  description: 'Professional concrete repair in Metro Atlanta. Cracks, settling, leveling for driveways, patios, sidewalks. Family owned, 20+ years experience. Free estimates. 770-895-2039',
}

export default function ConcreteRepairPage() {
  const services = [
    'Brick or Stone Pointing, Replacement or Resetting',
    'Stabilization and Rebuilds',
    'Stucco Repairs or Application',
    'Chimney Repairs or Builds',
    'Retaining Wall Repairs or Builds',
    'Concrete Sidewalks, Patios, Steps Repaired or Built',
    'Masonry Cleaning',
    'Basement Waterproofing',
    'Glass Block Installations',
    'Foundation Repairs',
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header activePage="services" />

      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/portfolio/concrete-patio-crew-working.png"
            alt="Concrete patio crew working"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-[#273373]/60" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center font-display">
            Concrete Repair
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
                src="/images/diagrams/foundation-crack-types-diagram.png"
                alt="Foundation crack types diagram"
                fill
                className="object-contain"
              />
            </div>
            <div>
              <p className="text-gray-700 text-lg leading-relaxed">
                Whether you are a homeowner looking for repair work or a commercial property owner who needs to improve the look of your business, choose the company that has been providing expertise and professionalism in masonry for years. Our quality masonry work has been satisfying clients in the region for as long as we&apos;ve been in business. People count on use to provide them with high levels of skill, reliable and professional service and complete satisfaction in the work that we provide for them.
              </p>
            </div>
          </div>

          {/* Whatever your Masonry Needs Are */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-[#273373] mb-4">
              Whatever your Masonry Needs Are
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              There are so many ways that a masonry contractor can help. Whether you are looking for a brand new installation, repairs or restoration, we are known for providing top quality masonry. We are a full service masonry contractor and can help you with any of the following:
            </p>
            <ul className="space-y-3 mb-8">
              {services.map((service, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-[#115997] rounded-full mt-3 flex-shrink-0"></span>
                  <span className="text-gray-700 text-lg">{service}</span>
                </li>
              ))}
            </ul>
            <p className="text-gray-700 text-lg leading-relaxed">
              When you all our company you can have full confidence that we will provide you with the skill and know-how you need to have the job done right.
            </p>
          </div>

          {/* Masonry You Can Rely On */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-[#273373] mb-4">
              Masonry You Can Rely On
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              When you hire a contractor it always feels like you&apos;re taking a chance. Will they show up on time? Will they do the job right? We are one of the top masonry contractors in the region, and we&apos;ve earned that reputation by providing both high quality work and customer service. We understand how important it is to you to have your masonry job done well, done economically and done on schedule. Call us today and put your job in the hands of professionals you can trust.
            </p>
          </div>

          {/* A Great Reputation */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-[#273373] mb-4">
              A Great Reputation in the Community
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              We have been working in your community and your neighborhood for many years, and we take pride in the reputation of our company&apos;s masonry. Our commercial and residential clients alike have come to rely on us for all of their masonry needs, and once you&apos;ve used us you will too. Whether your job is big or small, a new installation or a quick repair job, call us today and see the difference working with a true professional can make.
            </p>
          </div>

          {/* Related Blog Resources */}
          <div className="mt-16 pt-12 border-t border-gray-200">
            <h2 className="text-2xl md:text-3xl font-bold text-[#273373] font-display mb-8">Concrete & Foundation Resources</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link href="/blog/foundation-crack-types-atlanta" className="group p-6 bg-gray-50 rounded-xl hover:bg-[#115997]/5 transition-colors border border-gray-100">
                <span className="text-sm text-[#115997] font-semibold">Crack Guide</span>
                <h3 className="text-lg font-bold text-[#273373] mt-2 group-hover:text-[#115997] transition-colors">Types of Foundation Cracks and What They Mean</h3>
                <p className="text-gray-600 mt-2 text-sm">Learn which cracks are cosmetic and which signal structural problems.</p>
              </Link>
              <Link href="/blog/signs-foundation-settling-vs-structural-damage" className="group p-6 bg-gray-50 rounded-xl hover:bg-[#115997]/5 transition-colors border border-gray-100">
                <span className="text-sm text-[#115997] font-semibold">Diagnosis</span>
                <h3 className="text-lg font-bold text-[#273373] mt-2 group-hover:text-[#115997] transition-colors">Foundation Settling vs. Structural Damage</h3>
                <p className="text-gray-600 mt-2 text-sm">Know when settling is normal and when it signals a serious problem.</p>
              </Link>
              <Link href="/blog/why-atlanta-homes-have-foundation-problems" className="group p-6 bg-gray-50 rounded-xl hover:bg-[#115997]/5 transition-colors border border-gray-100">
                <span className="text-sm text-[#115997] font-semibold">Local Insight</span>
                <h3 className="text-lg font-bold text-[#273373] mt-2 group-hover:text-[#115997] transition-colors">Why Atlanta Homes Are Prone to Foundation Problems</h3>
                <p className="text-gray-600 mt-2 text-sm">How Georgia&apos;s red clay soil creates unique challenges for homeowners.</p>
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