import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export const metadata = {
  title: 'Crawl Space Encapsulation in Sandy Springs, GA | Free Inspection | Reliable Solutions Atlanta',
  description: 'Crawl space encapsulation in Sandy Springs, GA. Vapor barriers, dehumidifiers, and vent sealing for 1960s-1980s ranches and split-levels. Most projects $4,500-$12,000. Free inspection. 770-895-2039.',
  keywords: 'crawl space encapsulation Sandy Springs GA, crawl space vapor barrier Sandy Springs, crawl space moisture Sandy Springs Georgia, crawl space sealing Sandy Springs',
  openGraph: { title: 'Crawl Space Encapsulation in Sandy Springs, GA | Reliable Solutions Atlanta', description: 'Seal your Sandy Springs crawl space. Free inspections. 770-895-2039.', url: 'https://www.waterhelpme.com/crawl-space-encapsulation/sandy-springs', type: 'website' },
  alternates: { canonical: 'https://www.waterhelpme.com/crawl-space-encapsulation/sandy-springs' },
}

const faqs = [
  { question: 'How much does crawl space encapsulation cost in Sandy Springs, GA?', answer: 'Crawl space encapsulation in Sandy Springs typically costs between $4,500 and $12,000. Split-level homes with partial crawl spaces cost less than full crawl space ranches. Basic vapor barrier starts around $2,500. Full encapsulation with dehumidifier and insulation runs $6,000 to $14,000 for larger homes.' },
  { question: 'Do Sandy Springs ranches with crawl spaces need encapsulation?', answer: 'Yes. The 1960s-1980s ranches that dominate Sandy Springs were built with vented crawl spaces and minimal vapor barriers. After 40 to 60 years, the original barriers have disintegrated and the vents pull in humid air that condenses on the structure. These homes are prime candidates for encapsulation.' },
  { question: 'Will encapsulation help sell my Sandy Springs home?', answer: 'In the Sandy Springs inspection-driven market, a damp crawl space is a top finding that reduces offers or kills deals. An encapsulated crawl space with documentation and transferable warranty is a positive selling point that demonstrates proactive maintenance. Many Sandy Springs listing agents now recommend encapsulation before going to market.' },
  { question: 'Can you encapsulate just the crawl space section of my Sandy Springs split-level?', answer: 'Yes. Sandy Springs split-levels often have a crawl space under one section and a slab or basement under another. We encapsulate the crawl space section and seal the transition to the adjacent foundation type. This is a common and cost-effective project for Sandy Springs split-level homeowners.' },
  { question: 'How does decomposed granite soil affect Sandy Springs crawl spaces?', answer: 'Sandy Springs soil contains decomposed granite mixed with clay. The granite component creates fast-draining pockets that channel moisture to the crawl space in concentrated flows rather than uniform seepage. This means some areas of the crawl space may be very wet while others are relatively dry. Our encapsulation system handles both conditions.' },
]

export default function CrawlSpaceEncapsulationSandySprings() {
  const jsonLd = { '@context': 'https://schema.org', '@type': 'Service', name: 'Crawl Space Encapsulation in Sandy Springs, GA', provider: { '@type': 'LocalBusiness', name: 'Reliable Solutions Atlanta', telephone: '+17708952039', url: 'https://www.waterhelpme.com', address: { '@type': 'PostalAddress', addressLocality: 'Sandy Springs', addressRegion: 'GA', addressCountry: 'US' }, areaServed: { '@type': 'City', name: 'Sandy Springs', containedIn: 'Fulton County, GA' } }, serviceType: 'Crawl Space Encapsulation' }
  const faqJsonLd = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })) }

  return (
    <>
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <section className="relative bg-[#273373] py-16 sm:py-20 md:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-[#273373] to-[#115997] opacity-90" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-white/70 text-sm font-medium mb-3 uppercase tracking-wider">Fulton County, Georgia</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 font-display leading-tight">Crawl Space Encapsulation in Sandy Springs, GA</h1>
            <p className="text-white/80 text-lg sm:text-xl mb-8 leading-relaxed max-w-2xl">Crawl space encapsulation in Sandy Springs typically costs between $4,500 and $12,000. Reliable Solutions Atlanta seals the crawl spaces beneath Sandy Springs ranches, split-levels, and colonials with heavy-duty vapor barriers, vent sealing, and dehumidification designed for the area's decomposed granite soil and hilly terrain. Free same-week inspections.</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white text-[#273373] font-bold rounded-xl hover:bg-gray-100 transition-colors">Schedule Free Inspection</Link>
              <a href="tel:+17708952039" className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-transparent border-2 border-white/30 text-white font-bold rounded-xl hover:bg-white/10 transition-colors">(770) 895-2039</a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Why Sandy Springs Crawl Spaces Need Encapsulation</h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p>Sandy Springs has one of the highest concentrations of crawl space homes in the inner suburbs of Atlanta. The ranches and split-levels built along Roswell Road, Mount Vernon Highway, Riverside Drive, and the Powers Ferry corridor during the 1960s through 1980s predominantly use crawl space foundations. These homes are now 40 to 60 years old, and their crawl spaces have been open to the elements for their entire lifespan.</p>
            <p>The original construction in Sandy Springs used minimal moisture management — typically a thin 4-mil or 6-mil vapor barrier loosely laid on the dirt floor with open foundation vents every 150 square feet. The theory was that the vents would circulate air and remove moisture. In metro Atlanta's humid subtropical climate, this approach fails spectacularly. The vents pull in hot summer air with dew points above 70°F, which condenses on every cooler surface in the crawl space, creating the moisture problem the vents were supposed to prevent.</p>
            <p>The decomposed granite in Sandy Springs soil creates an additional challenge. Unlike uniform clay that seeps moisture evenly, the granite-clay mix channels water to specific areas of the crawl space through fast-draining granite pockets. You may find one section of a Sandy Springs crawl space bone dry while another section 10 feet away has standing water. This uneven moisture distribution means the crawl space environment varies dramatically from point to point.</p>
            <p>Sandy Springs' active real estate market drives a significant number of encapsulation projects. Homes in the 30328, 30342, and 30350 zip codes turn over frequently, and every transaction triggers a home inspection. Crawl space moisture, mold, and structural damage are among the most commonly flagged inspection findings. Sellers increasingly encapsulate before listing to avoid deal complications.</p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Signs Your Sandy Springs Crawl Space Needs Encapsulation</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: 'Cold floors in winter, clammy in summer', desc: 'The seasonal floor temperature swings in Sandy Springs ranches with vented crawl spaces are dramatic. Cold air enters through vents in winter making floors frigid. Humid air enters in summer making the house feel clammy despite AC.' },
              { title: 'Uneven moisture — wet in spots, dry in others', desc: 'Sandy Springs decomposed granite channels water to specific crawl space areas. If you see wet soil or standing water in some sections while others are dry, the granite substrate is directing water flow unpredictably.' },
              { title: 'Old vapor barrier torn or bunched up', desc: 'After 40+ years, original Sandy Springs vapor barriers are typically in pieces. If you look in the crawl space and see torn, displaced, or missing plastic, the ground moisture has been evaporating freely into the space for years.' },
              { title: 'Home inspector flagged crawl space issues', desc: 'If a home inspector noted moisture, mold, wood damage, or inadequate vapor barrier in your Sandy Springs crawl space, these findings need to be addressed. In this market, unresolved crawl space issues directly impact your sale price.' },
              { title: 'Pest company recommending moisture control', desc: 'If your termite inspection report recommends moisture reduction in the crawl space, they are seeing conditions that attract wood-destroying organisms. Encapsulation is the definitive solution that pest companies recognize and recommend.' },
              { title: 'HVAC ducts in crawl space sweating or moldy', desc: 'Air conditioning ducts in a Sandy Springs crawl space that show condensation, rust, or mold on the exterior are in an environment too humid for efficient operation. The system loses efficiency and the condensation adds moisture to an already wet space.' },
            ].map((sign, i) => (
              <div key={i} className="bg-white rounded-xl p-5 shadow-sm"><h3 className="font-semibold text-[#273373] text-base mb-2">{sign.title}</h3><p className="text-gray-600 text-sm leading-relaxed">{sign.desc}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">How We Encapsulate Crawl Spaces in Sandy Springs</h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <h3 className="text-[#273373] font-display">Split-Level Crawl Space Sealing</h3>
            <p>Sandy Springs split-levels have crawl spaces that often connect to basements or slab sections through transition walls. We seal these transitions with rigid foam and vapor barrier material so the encapsulated crawl space is isolated from the adjacent foundation sections. This prevents humid air from migrating between the sealed crawl space and unsealed areas.</p>
            <h3 className="text-[#273373] font-display">Granite-Adapted Drainage Under Liner</h3>
            <p>For Sandy Springs crawl spaces where granite channels deliver concentrated water flows, we install targeted drainage beneath the liner in the wet zones. The drainage captures water flowing along granite paths and routes it to a sump pit. The liner goes over the drainage, and the dehumidifier manages the air above. This layered approach handles the uneven moisture distribution that granite creates.</p>
            <h3 className="text-[#273373] font-display">20-Mil Liner with Full Wall Coverage</h3>
            <p>The entire crawl space floor and all foundation walls are covered with 20-mil reinforced liner. Seams are overlapped 12 inches and sealed. The liner is mechanically fastened to walls with termination strips. Every pier, pipe, and penetration is sealed individually. The result is a continuous sealed envelope with no exposed dirt or block surface.</p>
            <h3 className="text-[#273373] font-display">Vent Closure and Conditioned Air</h3>
            <p>All foundation vents are permanently sealed. Walls receive rigid foam insulation. A commercial dehumidifier maintains 45-50% humidity year-round. For Sandy Springs homes where the HVAC system has a supply duct in the crawl space, we optimize the duct placement to supplement the dehumidifier's work and maintain consistent conditions throughout the sealed space.</p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Crawl Space Encapsulation Costs in Sandy Springs</h2>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#273373] text-white"><tr><th className="px-6 py-4 text-left text-sm font-semibold">Service</th><th className="px-6 py-4 text-left text-sm font-semibold">Typical Cost</th><th className="px-6 py-4 text-left text-sm font-semibold hidden sm:table-cell">Timeline</th></tr></thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ['Vapor barrier replacement', '$1,500 – $3,500', '1 day'],
                  ['Full encapsulation (liner + vents + insulation)', '$4,500 – $12,000', '2-3 days'],
                  ['Split-level partial encapsulation', '$3,000 – $7,000', '1-2 days'],
                  ['Encapsulation with targeted drainage', '$7,000 – $15,000', '3-4 days'],
                  ['Commercial dehumidifier', '$1,000 – $2,000', 'Same day'],
                  ['Mold treatment', '$1,500 – $3,000', '1 day'],
                ].map(([r, c, t], i) => (<tr key={i} className="hover:bg-gray-50"><td className="px-6 py-4 text-sm text-gray-900">{r}</td><td className="px-6 py-4 text-sm font-semibold text-[#115997]">{c}</td><td className="px-6 py-4 text-sm text-gray-500 hidden sm:table-cell">{t}</td></tr>))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mt-4">Financing available through GreenSky. Transferable warranty included — valuable at resale.</p>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-8 font-display">Frequently Asked Questions</h2>
          <div className="space-y-4">{faqs.map((faq, i) => (<div key={i} className="bg-gray-50 rounded-xl p-6"><h3 className="font-semibold text-[#273373] text-lg mb-3">{faq.question}</h3><p className="text-gray-700 leading-relaxed">{faq.answer}</p></div>))}</div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#273373] mb-6 font-display">Related Services in Sandy Springs</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { title: 'Foundation Repair', href: '/foundation-repair/sandy-springs', desc: 'Fix split-level foundation stress points before or during encapsulation.' },
              { title: 'Drainage Solutions', href: '/drainage/sandy-springs', desc: 'Hillside drainage reduces the water reaching your Sandy Springs crawl space.' },
              { title: 'Basement Waterproofing', href: '/basement-waterproofing/sandy-springs', desc: 'For the basement section of Sandy Springs split-levels, interior waterproofing complements crawl space work.' },
            ].map((s, i) => (<Link key={i} href={s.href} className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow group"><h3 className="font-semibold text-[#273373] mb-2 group-hover:text-[#115997] transition-colors">{s.title}</h3><p className="text-gray-600 text-sm">{s.desc}</p></Link>))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#273373] mb-6 font-display">Learn More About Crawl Spaces</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[{ title: 'Crawl Space Encapsulation vs Waterproofing', href: '/blog/crawl-space-encapsulation-vs-waterproofing' }, { title: 'Crawl Space Vapor Barrier Guide', href: '/blog/crawl-space-vapor-barrier-guide' }, { title: 'Crawl Space Mold: Signs and Solutions', href: '/blog/crawl-space-mold-signs' }, { title: 'Crawl Space Repair Cost in Atlanta', href: '/blog/crawl-space-repair-cost-atlanta' }].map((p, i) => (<Link key={i} href={p.href} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"><svg className="w-5 h-5 text-[#115997] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg><span className="text-sm font-medium text-gray-800">{p.title}</span></Link>))}
          </div>
        </div>
      </section>

      <section className="py-8 bg-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-gray-500 mb-4"><Link href="/" className="hover:text-[#115997]">Home</Link> {' / '}<Link href="/crawl-space-encapsulation" className="hover:text-[#115997]">Crawl Space Encapsulation</Link> {' / '}<span className="text-gray-700">Sandy Springs</span></p>
          <p className="text-sm text-gray-500">Crawl space encapsulation also available in <Link href="/crawl-space-encapsulation/lawrenceville" className="text-[#115997] hover:underline">Lawrenceville</Link>, <Link href="/crawl-space-encapsulation/marietta" className="text-[#115997] hover:underline">Marietta</Link>, <Link href="/crawl-space-encapsulation/roswell" className="text-[#115997] hover:underline">Roswell</Link>, <Link href="/crawl-space-encapsulation/alpharetta" className="text-[#115997] hover:underline">Alpharetta</Link>, <Link href="/crawl-space-encapsulation/decatur" className="text-[#115997] hover:underline">Decatur</Link>, and <Link href="/crawl-space-encapsulation/stone-mountain" className="text-[#115997] hover:underline">Stone Mountain</Link>.</p>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-[#115997]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 font-display">Free Crawl Space Inspection in Sandy Springs</h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">Selling, buying, or just want a dry home? We will inspect your Sandy Springs crawl space, document everything with photos, and give you a clear encapsulation plan. No obligation.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#273373] font-bold rounded-xl hover:bg-gray-100 transition-colors text-lg">Schedule Free Inspection</Link>
            <a href="tel:+17708952039" className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-colors text-lg">Call (770) 895-2039</a>
          </div>
          <p className="text-white/50 text-sm mt-6">BBB A+ Accredited · IICRC Certified · 20+ Years Experience · Financing Available</p>
        </div>
      </section>
    <Footer />
    </>
  )
}