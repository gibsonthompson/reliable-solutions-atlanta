import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export const metadata = {
  title: 'Crawl Space Encapsulation in Alpharetta, GA | Free Inspection | Reliable Solutions Atlanta',
  description: 'Crawl space encapsulation in Alpharetta, GA. Replace failing builder-grade vapor barriers with full encapsulation. Vapor barriers, dehumidifiers, vent sealing. Most projects $4,500-$11,000. Free inspection. 770-895-2039.',
  keywords: 'crawl space encapsulation Alpharetta GA, crawl space vapor barrier North Fulton, crawl space moisture Alpharetta, crawl space sealing Alpharetta Georgia',
  openGraph: { title: 'Crawl Space Encapsulation in Alpharetta, GA | Reliable Solutions Atlanta', description: 'Seal your Alpharetta crawl space. Replace builder-grade barriers. Free inspections. 770-895-2039.', url: 'https://www.waterhelpme.com/crawl-space-encapsulation/alpharetta', type: 'website' },
  alternates: { canonical: 'https://www.waterhelpme.com/crawl-space-encapsulation/alpharetta' },
}

const faqs = [
  { question: 'How much does crawl space encapsulation cost in Alpharetta, GA?', answer: 'Crawl space encapsulation in Alpharetta typically costs between $4,500 and $11,000. Many Alpharetta homes have smaller crawl space sections combined with slab areas, which can reduce the total scope compared to full crawl space homes. Basic vapor barrier upgrade starts around $2,500. Full encapsulation with dehumidifier runs $7,000 to $14,000 for larger homes.' },
  { question: 'Do newer Alpharetta homes need crawl space encapsulation?', answer: 'Yes. Homes built in the 1990s and 2000s in Alpharetta with crawl space sections typically have 6-mil builder-grade vapor barriers that have deteriorated, torn, or displaced over 15 to 25 years. The vented crawl space design used during this era has been proven ineffective in humid climates. Even relatively new homes benefit from full encapsulation.' },
  { question: 'My Alpharetta home has both a slab and crawl space — can you encapsulate just the crawl section?', answer: 'Yes. Many Alpharetta homes built on sloped lots have a slab foundation on one end and a crawl space on the other where the grade drops. We encapsulate just the crawl space section, sealing it from the slab transition point. This is common in Windward, Cambridge, and other North Fulton subdivisions built on rolling terrain.' },
  { question: 'Will encapsulation void my Alpharetta termite bond?', answer: 'No. We work with your pest control company to ensure the encapsulation system is compatible with their treatment and inspection requirements. We leave termite inspection ports accessible and use liner that does not interfere with termite monitoring stations. Most pest companies prefer encapsulated crawl spaces because the dry environment discourages termite activity.' },
  { question: 'How quickly will I notice results after encapsulation?', answer: 'Most Alpharetta homeowners notice a difference within the first week. The musty smell reduces immediately as the dehumidifier lowers humidity. Within 2 to 4 weeks, indoor humidity stabilizes at a lower level and the HVAC runs less frequently. Energy bill reductions are typically visible in the first full billing cycle after encapsulation.' },
]

export default function CrawlSpaceEncapsulationAlpharetta() {
  const jsonLd = { '@context': 'https://schema.org', '@type': 'Service', name: 'Crawl Space Encapsulation in Alpharetta, GA', provider: { '@type': 'LocalBusiness', name: 'Reliable Solutions Atlanta', telephone: '+17708952039', url: 'https://www.waterhelpme.com', address: { '@type': 'PostalAddress', addressLocality: 'Alpharetta', addressRegion: 'GA', addressCountry: 'US' }, areaServed: { '@type': 'City', name: 'Alpharetta', containedIn: 'Fulton County, GA' } }, serviceType: 'Crawl Space Encapsulation' }
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
            <p className="text-white/70 text-sm font-medium mb-3 uppercase tracking-wider">North Fulton County, Georgia</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 font-display leading-tight">Crawl Space Encapsulation in Alpharetta, GA</h1>
            <p className="text-white/80 text-lg sm:text-xl mb-8 leading-relaxed max-w-2xl">Crawl space encapsulation in Alpharetta typically costs between $4,500 and $11,000. Reliable Solutions Atlanta replaces failing builder-grade vapor barriers with complete encapsulation systems that eliminate moisture, mold, and energy waste in North Fulton homes. Free same-week inspections with written estimates.</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white text-[#273373] font-bold rounded-xl hover:bg-gray-100 transition-colors">Schedule Free Inspection</Link>
              <a href="tel:+17708952039" className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-transparent border-2 border-white/30 text-white font-bold rounded-xl hover:bg-white/10 transition-colors">(770) 895-2039</a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Why Alpharetta Crawl Spaces Need Encapsulation</h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p>Alpharetta homes built during the North Fulton building boom of the 1990s and 2000s used the vented crawl space design mandated by building codes at the time. Builders installed 6-mil polyethylene vapor barriers on the crawl space floor and punched foundation vents into the walls. This was considered adequate protection. Two decades of building science have proven it is not — especially in metro Atlanta's humid subtropical climate.</p>
            <p>The 6-mil barriers installed in Alpharetta subdivisions like Windward, Broadwell Oaks, Thornberry, Cambridge, and Cogburn Station have not held up. They were laid loosely on dirt floors, not sealed at seams or fastened to walls. Over 15 to 25 years, they have torn during HVAC service calls, shifted from water flow, been chewed by rodents, and degraded from UV exposure through open vents. In most Alpharetta crawl spaces we inspect, the original barrier covers less than 50% of the floor area.</p>
            <p>The open foundation vents compound the problem. Metro Atlanta summer dew points routinely exceed 70°F. When this hot humid air enters the cooler crawl space through vents, the moisture condenses on ductwork, pipes, and floor joists. This condensation cycle runs from May through September, depositing moisture on your home's structural wood for five months every year. After 20 years of this, the wood shows damage.</p>
            <p>The 30004, 30005, 30009, and 30022 zip codes all have high concentrations of homes with failing builder-grade crawl space systems that are ready for encapsulation.</p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Signs Your Alpharetta Crawl Space Needs Encapsulation</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: 'Torn or displaced vapor barrier', desc: 'If you look in your Alpharetta crawl space access and see the plastic barrier bunched up, torn, or only partially covering the dirt floor, it is no longer providing meaningful moisture protection. The exposed dirt is evaporating moisture directly into the crawl space.' },
              { title: 'Condensation on HVAC ducts in summer', desc: 'Water droplets on the exterior of your air conditioning ducts in the crawl space mean the crawl space humidity exceeds the dew point. This water drips onto structure and insulation, and the ducts themselves lose efficiency when wet.' },
              { title: 'Fiberglass insulation sagging or falling', desc: 'The batts of fiberglass insulation installed between floor joists in Alpharetta crawl spaces absorb moisture, become heavy, and sag away from the subfloor. Fallen insulation is a visual indicator that the crawl space humidity has been too high for an extended period.' },
              { title: 'Higher energy bills than similar homes', desc: 'If your Alpharetta energy bills are higher than neighbors with similar homes, an unsealed crawl space may be the reason. Humid crawl space air forces your HVAC to work harder, and cold winter air entering through vents makes floors cold and heating less efficient.' },
              { title: 'Pest control finding moisture issues', desc: 'If your annual termite inspector notes moisture, mold, or wood damage in the crawl space, these are signs that the environment needs to be controlled. Pest companies increasingly recommend encapsulation because it eliminates the conditions pests need.' },
              { title: 'Allergies or respiratory issues worsening at home', desc: 'Mold spores, dust mites, and other allergens thrive in damp crawl spaces and migrate into living areas. If family members experience more allergies or respiratory symptoms at home than elsewhere, crawl space moisture may be contributing.' },
            ].map((sign, i) => (
              <div key={i} className="bg-white rounded-xl p-5 shadow-sm"><h3 className="font-semibold text-[#273373] text-base mb-2">{sign.title}</h3><p className="text-gray-600 text-sm leading-relaxed">{sign.desc}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">How We Encapsulate Crawl Spaces in Alpharetta</h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <h3 className="text-[#273373] font-display">Old Barrier Removal and Preparation</h3>
            <p>We remove the existing torn builder-grade barrier, all fallen insulation, and any debris accumulated over the years. The crawl space floor is leveled and any standing water is addressed with drainage before encapsulation begins. If mold is present on the wood structure, we treat it with antimicrobial solution and allow it to dry before installing the new liner.</p>
            <h3 className="text-[#273373] font-display">20-Mil Sealed Liner System</h3>
            <p>The 20-mil reinforced liner covers the entire floor and extends up all foundation walls to within 3 inches of the mudsill. All seams are overlapped 12 inches and sealed with seam tape rated for permanent adhesion. The liner is mechanically fastened to walls with termination strips and sealed at every pier, column, and pipe penetration. No exposed dirt remains.</p>
            <h3 className="text-[#273373] font-display">Vent Closure and Insulation</h3>
            <p>Foundation vents are sealed with rigid foam board cut to fit each opening and sealed at the edges with foam sealant. Foundation walls are insulated with 2-inch closed-cell foam board that provides R-10 insulation and serves as an additional vapor barrier. Rim joists are sealed with spray foam to prevent air infiltration at the most vulnerable point in the building envelope.</p>
            <h3 className="text-[#273373] font-display">Dehumidifier with Automatic Monitoring</h3>
            <p>We install a commercial-grade crawl space dehumidifier that maintains target humidity of 45-50% year-round. The unit has built-in monitoring that displays current humidity and temperature. It drains automatically to a condensate pump or existing drain line. For Alpharetta homeowners who want remote monitoring, we can install units with WiFi connectivity that send alerts to your phone.</p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Crawl Space Encapsulation Costs in Alpharetta</h2>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#273373] text-white"><tr><th className="px-6 py-4 text-left text-sm font-semibold">Service</th><th className="px-6 py-4 text-left text-sm font-semibold">Typical Cost</th><th className="px-6 py-4 text-left text-sm font-semibold hidden sm:table-cell">Timeline</th></tr></thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ['Vapor barrier upgrade (20-mil floor only)', '$2,500 – $4,500', '1 day'],
                  ['Full encapsulation (liner + vents + insulation)', '$4,500 – $11,000', '2-3 days'],
                  ['Partial crawl space encapsulation (slab/crawl combo)', '$3,000 – $7,000', '1-2 days'],
                  ['Commercial dehumidifier with monitoring', '$1,000 – $2,200', 'Same day'],
                  ['Mold treatment', '$1,500 – $3,000', '1 day'],
                  ['Old insulation removal and disposal', '$500 – $1,500', 'Same day'],
                ].map(([r, c, t], i) => (<tr key={i} className="hover:bg-gray-50"><td className="px-6 py-4 text-sm text-gray-900">{r}</td><td className="px-6 py-4 text-sm font-semibold text-[#115997]">{c}</td><td className="px-6 py-4 text-sm text-gray-500 hidden sm:table-cell">{t}</td></tr>))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mt-4">Financing available through GreenSky. Transferable warranty included.</p>
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
          <h2 className="text-2xl font-bold text-[#273373] mb-6 font-display">Related Services in Alpharetta</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { title: 'Foundation Repair', href: '/foundation-repair/alpharetta', desc: 'Address settling issues before or alongside encapsulation for complete protection.' },
              { title: 'Drainage Solutions', href: '/drainage/alpharetta', desc: 'Exterior drainage reduces the moisture load on your Alpharetta crawl space.' },
              { title: 'Crawl Space Repair', href: '/crawl-space-repair', desc: 'Structural repair for joists and piers damaged by years of moisture exposure.' },
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
          <p className="text-sm text-gray-500 mb-4"><Link href="/" className="hover:text-[#115997]">Home</Link> {' / '}<Link href="/crawl-space-encapsulation" className="hover:text-[#115997]">Crawl Space Encapsulation</Link> {' / '}<span className="text-gray-700">Alpharetta</span></p>
          <p className="text-sm text-gray-500">Crawl space encapsulation also available in <Link href="/crawl-space-encapsulation/lawrenceville" className="text-[#115997] hover:underline">Lawrenceville</Link>, <Link href="/crawl-space-encapsulation/marietta" className="text-[#115997] hover:underline">Marietta</Link>, <Link href="/crawl-space-encapsulation/roswell" className="text-[#115997] hover:underline">Roswell</Link>, <Link href="/crawl-space-encapsulation/decatur" className="text-[#115997] hover:underline">Decatur</Link>, <Link href="/crawl-space-encapsulation/sandy-springs" className="text-[#115997] hover:underline">Sandy Springs</Link>, and <Link href="/crawl-space-encapsulation/stone-mountain" className="text-[#115997] hover:underline">Stone Mountain</Link>.</p>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-[#115997]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 font-display">Free Crawl Space Inspection in Alpharetta</h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">We will inspect your Alpharetta crawl space, document the condition of the existing barrier and structure with photos, and give you a clear plan with pricing. No obligation.</p>
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