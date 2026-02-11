import Header from '../components/Header'
import Footer from '../components/Footer'
import Image from 'next/image'
import Link from 'next/link'

export const metadata = {
  title: 'Basement Waterproofing Atlanta | Interior & Exterior Solutions',
  description: 'Professional basement waterproofing in Metro Atlanta. French drains, sump pumps, interior & exterior solutions. Family owned, 20+ years experience. Free estimates. 770-895-2039',
}

export default function BasementWaterproofingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header activePage="services" />

      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/portfolio/exterior-waterproofing-membrane.png"
            alt="Basement waterproofing installation"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-[#273373]/60" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center font-display">
            Basement Waterproofing
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Intro Section */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="relative h-[350px]">
              <Image
                src="/images/diagrams/basement-waterproofing-diagram.png"
                alt="Basement waterproofing diagram showing water flow"
                fill
                className="object-contain"
              />
            </div>
            <div>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                A common challenge that homeowners face is water in their basements. Not only is a wet basement a pain to clean up, but it can also ruin other parts of the room. It can damage the walls in your basement and leave stains on your floors, or even cause mold to grow if left untreated.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                Reliable Solutions Atlanta contractors recognize that every home is unique and therefore treat every wet basement problem as such, creating a specific solution for every issue they come across. In order to decipher the root of your watery basement and construct an estimate for your personalized waterproofing service, Reliable Solutions Atlanta offers FREE basement inspections and evaluations. We pride ourselves on providing the most cost-effective and noninvasive resolution to your problem. Our team doesn&apos;t want to find the easiest way to finish the job and just put a band-aid on your foundation. Our goal is to do things right and find a permanent solution to keep your basement dry forever.
              </p>
            </div>
          </div>

          {/* Protection Section */}
          <div className="mb-16">
            <p className="text-gray-700 text-lg leading-relaxed mb-8">
              Basement Waterproofing is an important service that our experienced workers here at Reliable Solutions Atlanta are equipped and ready to help you with. Standing water can have an extremely harmful impact on your home. Instead of allowing a small issue such as a crack or a leak grow into a major problem. Have one of our knowledgeable contractors come out and give you a free inspection. There are a couple of ways Reliable Solutions Atlanta can provide protection to your property.
            </p>

            {/* Interior Waterproofing */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-[#273373] mb-4">
                - Interior Basement Waterproofing
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                Interior basement waterproofing involves waterproofing basement walls from the inside. This way, the water that leaks into the basement is re-routed, before it can come in, out and away from your home. It is an effective waterproofing method and a much less offensive alternative to exterior waterproofing. The interior basement waterproofing system manages the water by removing the groundwater swiftly before it touches your floor. It includes the use of interior sealers and drainage systems. Interior drainage systems are made up of pipes and drains that catch leaks or are installed under the foundation to collect excess groundwater.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                Excess water is moved towards a large basin called a sump pit that collects water and discharges it away from your home using a sump pump.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                Investing your money in waterproofing interior basement walls can reduce the risks of water flooding in your basement. These drainage systems are easy to install and generally cost less than exterior waterproofing costs.
              </p>
            </div>

            {/* Exterior Waterproofing */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-[#273373] mb-4">
                - Exterior Basement Waterproofing
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                Exterior foundation waterproofing is another service offered here at Reliable Solutions Atlanta. One thing that separates us from most other contractors who take a one-size fits all approach, our certified professionals inspect every detail of your wet basement problems to identify possible solutions. That&apos;s why we&apos;re pleased to offer exterior foundation waterproofing membranes. Exterior foundation waterproofing can be utilized in combination with a basement waterproofing system or as a stand-alone solution, and is an excellent way to guard your home from water getting in. Your Reliable Solutions Atlanta experts can help you decipher which waterproofing system is the correct fit for your damp basement problems!
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                Reliable Solutions Atlanta specializes in exterior foundation waterproofing for existing homes. The first step is carefully excavating around your foundation before installing a plasmatic core membrane around your entire foundation. This high-tech material is dynamic, moving with your building&apos;s foundation and resisting cracking, deterioration, and leaking. Forming a barrier between the water outside your home and your basement, this exterior foundation membrane is a great way to ensure your basement stays dry. If you suspect your original foundation coating is starting to fail or you&apos;re noticing leaking, our foundation contractors can help.
              </p>
            </div>

            {/* Closing */}
            <p className="text-gray-700 text-lg leading-relaxed">
              Waterproofing your home is about more than avoiding a mess. A flooded basement can be exceedingly expensive to repair, valued and precious possessions can be permanently damaged if not completely ruined, and the presence of moisture makes your home vulnerable to potentially dangerous mold growth. It can be difficult to tell if you are at risk for water damage, which is why Reliable Solutions offers a free estimate for our potential customers.
            </p>
          </div>

          {/* Related Blog Resources */}
          <div className="mt-16 pt-12 border-t border-gray-200">
            <h2 className="text-2xl md:text-3xl font-bold text-[#273373] font-display mb-8">Basement Waterproofing Resources</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link href="/blog/basement-waterproofing-cost-atlanta" className="group p-6 bg-gray-50 rounded-xl hover:bg-[#115997]/5 transition-colors border border-gray-100">
                <span className="text-sm text-[#115997] font-semibold">Cost Guide</span>
                <h3 className="text-lg font-bold text-[#273373] mt-2 group-hover:text-[#115997] transition-colors">How Much Does Basement Waterproofing Cost in Atlanta?</h3>
                <p className="text-gray-600 mt-2 text-sm">Get real pricing for interior vs exterior solutions in Metro Atlanta.</p>
              </Link>
              <Link href="/blog/signs-you-need-basement-waterproofing" className="group p-6 bg-gray-50 rounded-xl hover:bg-[#115997]/5 transition-colors border border-gray-100">
                <span className="text-sm text-[#115997] font-semibold">Warning Signs</span>
                <h3 className="text-lg font-bold text-[#273373] mt-2 group-hover:text-[#115997] transition-colors">7 Warning Signs You Need Basement Waterproofing</h3>
                <p className="text-gray-600 mt-2 text-sm">Spot the telltale signs before minor issues become major problems.</p>
              </Link>
              <Link href="/blog/interior-vs-exterior-basement-waterproofing" className="group p-6 bg-gray-50 rounded-xl hover:bg-[#115997]/5 transition-colors border border-gray-100">
                <span className="text-sm text-[#115997] font-semibold">Comparison</span>
                <h3 className="text-lg font-bold text-[#273373] mt-2 group-hover:text-[#115997] transition-colors">Interior vs Exterior Waterproofing: Which Is Right?</h3>
                <p className="text-gray-600 mt-2 text-sm">Compare approaches, costs, and effectiveness for your home.</p>
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