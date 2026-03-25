import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export const metadata = {
  title: 'Crawl Space Waterproofing in Roswell, GA | Free Inspection | Reliable Solutions Atlanta',
  description: 'Crawl space waterproofing in Roswell, GA. Interior drainage, sump pumps, and vapor barriers for North Fulton homes near the Chattahoochee. Most projects $3,500-$10,000. Free inspection. 770-895-2039.',
  keywords: 'crawl space waterproofing Roswell GA, crawl space water North Fulton, wet crawl space Roswell, crawl space drainage Roswell Georgia',
  openGraph: { title: 'Crawl Space Waterproofing in Roswell, GA | Reliable Solutions Atlanta', description: 'Stop water in your Roswell crawl space. Free inspections. 770-895-2039.', url: 'https://www.waterhelpme.com/crawl-space-waterproofing/roswell', type: 'website' },
  alternates: { canonical: 'https://www.waterhelpme.com/crawl-space-waterproofing/roswell' },
}

const faqs = [
  { question: 'How much does crawl space waterproofing cost in Roswell, GA?', answer: 'Crawl space waterproofing in Roswell typically costs between $3,500 and $10,000. Larger Roswell homes with more crawl space square footage and proximity to the Chattahoochee corridor run toward the higher end. Interior drainage with sump pump starts around $3,000. Full waterproofing with sub-floor drainage mat and vapor barrier runs $7,000 to $14,000.' },
  { question: 'Does the Chattahoochee River cause crawl space water in Roswell?', answer: 'Yes. Homes in the 30075 and 30076 zip codes near the Chattahoochee, Vickery Creek, and Big Creek have elevated water tables. During prolonged wet periods, the water table rises and pushes moisture upward through the crawl space floor. Standard vapor barriers cannot stop pressurized water from below. These homes need drainage beneath the barrier.' },
  { question: 'Can tree roots cause crawl space water problems in Roswell?', answer: 'Indirectly, yes. Roswell has dense mature tree canopy. Large root systems block original footer drains installed during construction, causing water to back up against the foundation. Roots also create channels in the soil that funnel water toward the crawl space. We clear root blockages and install root-resistant drainage during waterproofing.' },
  { question: 'Should I waterproof before selling my Roswell home?', answer: 'In the Roswell market where homes sell for $400,000 to over $1 million, a wet crawl space is a deal-threatening inspection finding. Waterproofing before listing eliminates this risk. The transferable warranty we provide gives buyers confidence and can prevent $15,000 to $30,000 in price negotiation over crawl space issues.' },
  { question: 'What is the difference between waterproofing and encapsulation for Roswell crawl spaces?', answer: 'Waterproofing stops active water entry with drainage and pumps. Encapsulation goes further by sealing the entire crawl space with vent closure, wall insulation, and dehumidification. Many Roswell homes benefit from both, with waterproofing managing the water and encapsulation managing the humidity.' },
]

export default function CrawlSpaceWaterproofingRoswell() {
  const jsonLd = { '@context': 'https://schema.org', '@type': 'Service', name: 'Crawl Space Waterproofing in Roswell, GA', provider: { '@type': 'LocalBusiness', name: 'Reliable Solutions Atlanta', telephone: '+17708952039', url: 'https://www.waterhelpme.com', address: { '@type': 'PostalAddress', addressLocality: 'Roswell', addressRegion: 'GA', addressCountry: 'US' }, areaServed: { '@type': 'City', name: 'Roswell', containedIn: 'Fulton County, GA' } }, serviceType: 'Crawl Space Waterproofing' }
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
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 font-display leading-tight">Crawl Space Waterproofing in Roswell, GA</h1>
            <p className="text-white/80 text-lg sm:text-xl mb-8 leading-relaxed max-w-2xl">Crawl space waterproofing in Roswell typically costs between $3,500 and $10,000. Reliable Solutions Atlanta stops water from entering Roswell crawl spaces affected by the Chattahoochee corridor high water table, dense tree root intrusion, and clay soil saturation. Interior drainage, sump pumps, sub-floor drainage mats, and heavy-duty vapor barriers. Free same-week inspections.</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white text-[#273373] font-bold rounded-xl hover:bg-gray-100 transition-colors">Schedule Free Inspection</Link>
              <a href="tel:+17708952039" className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-transparent border-2 border-white/30 text-white font-bold rounded-xl hover:bg-white/10 transition-colors">(770) 895-2039</a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Why Roswell Crawl Spaces Take On Water</h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p>Roswell crawl spaces face water pressure from both above and below, which is unusual in metro Atlanta. The Chattahoochee River and its tributaries raise the water table in western Roswell neighborhoods like Willeo, Rivermont, Martin Landing, and the areas along Azalea Drive. During extended wet periods, this water table can rise close to the crawl space floor level, pushing moisture upward through the dirt with enough pressure to pool on top of standard vapor barriers.</p>
            <p>From above, the dense mature tree canopy that defines Roswell traps humidity at ground level and prevents the soil around foundations from drying between rains. The massive root systems of oaks, poplars, and hickories grow into and through the original footer drains installed during the 1970s through 1990s construction of most Roswell homes. A single root penetration can block an entire drainage run, causing water to back up against the foundation wall and enter the crawl space.</p>
            <p>The clay soil in the 30075 and 30076 zip codes compounds both problems. Clay absorbs water slowly and releases it slowly, maintaining saturated conditions around the foundation for days after each rain. Irrigation systems common on Roswell properties add to the soil moisture even during dry periods, keeping the clay around the foundation perpetually damp.</p>
            <p>For Roswell homeowners with significant home equity, crawl space water is not just a maintenance issue. It is a structural threat that damages floor joists, promotes mold growth that affects indoor air quality, and creates inspection findings that can cost $20,000 to $40,000 in reduced sale price.</p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Signs Your Roswell Crawl Space Needs Waterproofing</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: 'Water pooling on top of existing vapor barrier', desc: 'If the vapor barrier in your Roswell crawl space has water sitting on top of it, water is entering from the walls or rising from below with enough volume to overwhelm the barrier. The barrier is trapping water rather than stopping it.' },
              { title: 'Hardwood floors cupping or warping upstairs', desc: 'Roswell homes with hardwood floors are highly sensitive to crawl space moisture. When humidity from below causes the underside of planks to absorb moisture, the edges curl upward. This cupping indicates the crawl space humidity exceeds safe levels.' },
              { title: 'High humidity readings in the crawl space', desc: 'A hygrometer reading above 60% relative humidity in the crawl space means conditions support active mold growth. Near the Chattahoochee, readings of 80-90% are common in un-waterproofed crawl spaces during summer months.' },
              { title: 'Mold on floor joists visible from below', desc: 'Dark staining or fuzzy growth on the bottom faces of floor joists and the underside of the subfloor indicates sustained moisture damage. This mold is sending spores into your living space through gaps in the floor system.' },
              { title: 'Root masses visible in the crawl space', desc: 'If tree roots have grown through foundation vents or wall cracks into the crawl space, they are also growing into your drainage infrastructure outside. Root intrusion is both a symptom and a cause of crawl space water problems.' },
              { title: 'Increased allergy symptoms at home', desc: 'Mold spores and dust mites from a wet crawl space migrate upward into living areas. If family members experience more respiratory symptoms at home than elsewhere, the crawl space is a likely source of airborne allergens.' },
            ].map((sign, i) => (
              <div key={i} className="bg-white rounded-xl p-5 shadow-sm"><h3 className="font-semibold text-[#273373] text-base mb-2">{sign.title}</h3><p className="text-gray-600 text-sm leading-relaxed">{sign.desc}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">How We Waterproof Crawl Spaces in Roswell</h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <h3 className="text-[#273373] font-display">Sub-Floor Drainage for High Water Table</h3>
            <p>For Roswell homes near the Chattahoochee where water pushes up from below, we install a drainage mat beneath the vapor barrier that captures rising water and channels it to the perimeter drain. The mat sits directly on the dirt floor and creates a pathway for water to flow to the sump pit without pooling under the liner. This is essential in river corridor homes where standard vapor barriers alone get overwhelmed from below.</p>
            <h3 className="text-[#273373] font-display">Root-Resistant Perimeter Drainage</h3>
            <p>We install perimeter French drains using solid-wall pipe with sealed joints that resist root penetration. Where the drain passes near large trees, we add copper root barriers that chemically discourage root growth toward the pipe. This protects the investment from the same root intrusion that likely compromised the original drainage system.</p>
            <h3 className="text-[#273373] font-display">High-Capacity Sump System</h3>
            <p>Roswell crawl spaces near water features require higher-capacity pumps than standard installations. We size the pump based on measured water volume during the inspection and install a battery backup rated for 10+ hours. The discharge line routes to a point beyond the saturated zone so the water does not cycle back to the foundation.</p>
            <h3 className="text-[#273373] font-display">20-Mil Reinforced Vapor Barrier</h3>
            <p>The vapor barrier covers the entire floor over the drainage mat and extends up all foundation walls. All seams are overlapped 12 inches and sealed with permanent tape. The barrier is mechanically fastened to walls and sealed around every pier and pipe penetration. This stops ground moisture vapor from entering the crawl space air even after the drainage system handles the liquid water.</p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Crawl Space Waterproofing Costs in Roswell</h2>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#273373] text-white"><tr><th className="px-6 py-4 text-left text-sm font-semibold">Service</th><th className="px-6 py-4 text-left text-sm font-semibold">Typical Cost</th><th className="px-6 py-4 text-left text-sm font-semibold hidden sm:table-cell">Timeline</th></tr></thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ['Vapor barrier (20-mil, floor + walls)', '$2,000 – $5,000', '1 day'],
                  ['Sub-floor drainage mat', '$1,500 – $3,500', '1 day'],
                  ['Perimeter drain with root barriers', '$3,500 – $7,000', '1-2 days'],
                  ['High-capacity sump pump with backup', '$2,000 – $3,500', '1 day'],
                  ['Full waterproofing system', '$5,000 – $14,000', '2-4 days'],
                  ['Exterior footer drain replacement', '$3,000 – $6,000', '2-3 days'],
                ].map(([r, c, t], i) => (<tr key={i} className="hover:bg-gray-50"><td className="px-6 py-4 text-sm text-gray-900">{r}</td><td className="px-6 py-4 text-sm font-semibold text-[#115997]">{c}</td><td className="px-6 py-4 text-sm text-gray-500 hidden sm:table-cell">{t}</td></tr>))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mt-4">Financing available through GreenSky. Transferable warranty protects your investment at resale.</p>
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
          <h2 className="text-2xl font-bold text-[#273373] mb-6 font-display">Related Services in Roswell</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { title: 'Crawl Space Encapsulation', href: '/crawl-space-encapsulation/roswell', desc: 'After waterproofing stops water, encapsulation seals and conditions the crawl space.' },
              { title: 'Foundation Repair', href: '/foundation-repair/roswell', desc: 'Fix foundation damage caused by the same water affecting your Roswell crawl space.' },
              { title: 'Drainage Solutions', href: '/drainage/roswell', desc: 'Exterior drainage and root-damaged drain replacement for Roswell properties.' },
            ].map((s, i) => (<Link key={i} href={s.href} className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow group"><h3 className="font-semibold text-[#273373] mb-2 group-hover:text-[#115997] transition-colors">{s.title}</h3><p className="text-gray-600 text-sm">{s.desc}</p></Link>))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#273373] mb-6 font-display">Learn More About Crawl Spaces</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[{ title: 'Crawl Space Encapsulation vs Waterproofing', href: '/blog/crawl-space-encapsulation-vs-waterproofing' }, { title: 'Crawl Space Vapor Barrier Guide', href: '/blog/crawl-space-vapor-barrier-guide' }, { title: 'Crawl Space Mold: Signs and Solutions', href: '/blog/crawl-space-mold-signs' }, { title: 'Sump Pump Maintenance Guide', href: '/blog/sump-pump-maintenance-guide' }].map((p, i) => (<Link key={i} href={p.href} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"><svg className="w-5 h-5 text-[#115997] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg><span className="text-sm font-medium text-gray-800">{p.title}</span></Link>))}
          </div>
        </div>
      </section>

      <section className="py-8 bg-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-gray-500 mb-4"><Link href="/" className="hover:text-[#115997]">Home</Link> {' / '}<Link href="/crawl-space-waterproofing" className="hover:text-[#115997]">Crawl Space Waterproofing</Link> {' / '}<span className="text-gray-700">Roswell</span></p>
          <p className="text-sm text-gray-500">Crawl space waterproofing also available in <Link href="/crawl-space-waterproofing/lawrenceville" className="text-[#115997] hover:underline">Lawrenceville</Link>, <Link href="/crawl-space-waterproofing/marietta" className="text-[#115997] hover:underline">Marietta</Link>, <Link href="/crawl-space-waterproofing/alpharetta" className="text-[#115997] hover:underline">Alpharetta</Link>, <Link href="/crawl-space-waterproofing/decatur" className="text-[#115997] hover:underline">Decatur</Link>, <Link href="/crawl-space-waterproofing/sandy-springs" className="text-[#115997] hover:underline">Sandy Springs</Link>, and <Link href="/crawl-space-waterproofing/stone-mountain" className="text-[#115997] hover:underline">Stone Mountain</Link>.</p>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-[#115997]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 font-display">Free Crawl Space Inspection in Roswell</h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">Protect your Roswell home investment. We will inspect the crawl space, find where water is entering, and give you a waterproofing plan designed for your specific conditions. No obligation.</p>
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