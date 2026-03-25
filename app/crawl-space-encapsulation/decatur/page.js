import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export const metadata = {
  title: 'Crawl Space Encapsulation in Decatur, GA | Free Inspection | Reliable Solutions Atlanta',
  description: 'Crawl space encapsulation in Decatur, GA. Specialists in historic home crawl spaces with original dirt floors. Vapor barriers, structural repair, dehumidification. Most projects $5,000-$15,000. Free inspection. 770-895-2039.',
  keywords: 'crawl space encapsulation Decatur GA, crawl space vapor barrier DeKalb County, crawl space moisture Decatur, historic home crawl space Decatur Georgia',
  openGraph: { title: 'Crawl Space Encapsulation in Decatur, GA | Reliable Solutions Atlanta', description: 'Seal your Decatur historic crawl space. Free inspections. 770-895-2039.', url: 'https://www.waterhelpme.com/crawl-space-encapsulation/decatur', type: 'website' },
  alternates: { canonical: 'https://www.waterhelpme.com/crawl-space-encapsulation/decatur' },
}

const faqs = [
  { question: 'How much does crawl space encapsulation cost in Decatur, GA?', answer: 'Crawl space encapsulation in Decatur typically costs between $5,000 and $15,000. Historic homes often require structural repair before encapsulation, which adds to the scope. Basic vapor barrier on a clean crawl space starts around $3,500. Full encapsulation with pier replacement, mold treatment, and dehumidification for older homes ranges from $10,000 to $20,000.' },
  { question: 'Can you encapsulate a crawl space in a 100-year-old Decatur home?', answer: 'Yes, and we specialize in it. Decatur bungalows from the early 1900s have crawl spaces that were never designed for modern moisture management. The original dirt floors, stacked stone piers, and zero ventilation or barrier create extreme moisture conditions. We address the structural issues first, then seal the space with modern encapsulation that protects the home for decades.' },
  { question: 'Why is my Decatur crawl space so much worse than other areas?', answer: 'Decatur has three factors that combine to create the worst crawl space conditions in metro Atlanta: the oldest housing stock with no original moisture protection, the densest tree canopy that prevents soil drying, and clay soil that holds water indefinitely. Add that many Decatur homes have been renovated above while the crawl space was ignored, and you get severe conditions.' },
  { question: 'Should I encapsulate during a Decatur home renovation?', answer: 'The best time to encapsulate a Decatur crawl space is during a renovation. Contractors are already on site, the crawl space is accessible, and you can address structural issues, plumbing, and electrical at the same time. We coordinate with general contractors regularly on Decatur renovation projects to integrate encapsulation into the overall scope.' },
  { question: 'Will encapsulation fix the mold smell in my Decatur bungalow?', answer: 'Yes. The musty smell in Decatur homes comes from mold and mildew growing in the damp crawl space. Encapsulation stops the moisture source, and the dehumidifier brings humidity down to levels that cannot support mold growth. We treat existing mold before encapsulating so the sealed space starts clean and stays clean.' },
]

export default function CrawlSpaceEncapsulationDecatur() {
  const jsonLd = { '@context': 'https://schema.org', '@type': 'Service', name: 'Crawl Space Encapsulation in Decatur, GA', provider: { '@type': 'LocalBusiness', name: 'Reliable Solutions Atlanta', telephone: '+17708952039', url: 'https://www.waterhelpme.com', address: { '@type': 'PostalAddress', addressLocality: 'Decatur', addressRegion: 'GA', addressCountry: 'US' }, areaServed: { '@type': 'City', name: 'Decatur', containedIn: 'DeKalb County, GA' } }, serviceType: 'Crawl Space Encapsulation' }
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
            <p className="text-white/70 text-sm font-medium mb-3 uppercase tracking-wider">DeKalb County, Georgia</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 font-display leading-tight">Crawl Space Encapsulation in Decatur, GA</h1>
            <p className="text-white/80 text-lg sm:text-xl mb-8 leading-relaxed max-w-2xl">Crawl space encapsulation in Decatur typically costs between $5,000 and $15,000. Reliable Solutions Atlanta specializes in the century-old crawl spaces beneath Decatur's historic bungalows and craftsman homes. We address the structural damage, seal out the moisture, and transform the worst crawl spaces in metro Atlanta into clean, dry, protected environments. Free same-week inspections.</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white text-[#273373] font-bold rounded-xl hover:bg-gray-100 transition-colors">Schedule Free Inspection</Link>
              <a href="tel:+17708952039" className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-transparent border-2 border-white/30 text-white font-bold rounded-xl hover:bg-white/10 transition-colors">(770) 895-2039</a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Why Decatur Crawl Spaces Need Encapsulation</h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p>Decatur crawl spaces are the most challenging in metro Atlanta because they are the oldest and least protected. The craftsman bungalows, Tudor revivals, and colonial homes in Oakhurst, Winnona Park, Great Lakes, and the MAK District were built from 1900 through the 1940s with crawl spaces that have bare dirt floors, original stacked stone or brick piers, and no vapor barrier or ventilation system of any kind. These crawl spaces were built a century ago when moisture management beneath a home was not considered.</p>
            <p>The result after 80 to 120 years is severe. Bare dirt floors continuously evaporate ground moisture into the crawl space air. Original wooden piers, girders, and floor joists have been absorbing this moisture for decades, developing advanced rot, mold colonies, and insect damage. The dense Decatur tree canopy that shades these homes prevents the surrounding soil from ever drying, maintaining a constant moisture supply from below. Summer humidity entering through gaps in the stone foundation walls adds moisture from outside.</p>
            <p>Decatur's revitalization over the past two decades has brought extensive renovations to these historic homes — new kitchens with heavy granite counters, second-story additions, tile bathrooms — all adding weight to structures that were already compromised by moisture damage. The crawl space that barely supported the original 1920s bungalow now carries significantly more load on weakened structure.</p>
            <p>The 30030, 30032, and 30033 zip codes have the highest concentration of homes needing comprehensive crawl space work in the metro area. Many Decatur homeowners are unaware of the conditions beneath their home until a home inspector, pest company, or plumber reports what they find during a service call.</p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Signs Your Decatur Crawl Space Needs Encapsulation</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: 'Severe sloping or bouncy floors', desc: 'When Decatur crawl space piers fail from rot, the floor structure above drops. Floors that slope noticeably across a room or bounce when you walk indicate the support system has deteriorated and needs replacement before encapsulation.' },
              { title: 'Visible mold covering structural wood', desc: 'In the worst Decatur crawl spaces, mold covers floor joists, girders, and the underside of the subfloor in a continuous layer. This is not just surface contamination — it indicates the wood has been at or above 60% moisture content for an extended period.' },
              { title: 'Musty odor throughout the entire house', desc: 'In Decatur bungalows with minimal separation between the crawl space and living area, the musty smell permeates every room. Guests notice it when they walk in. This is crawl space air entering the living space through gaps, plumbing penetrations, and the natural stack effect.' },
              { title: 'Standing water or mud in the crawl space', desc: 'Many original Decatur crawl spaces have standing water or perpetually muddy dirt floors. Without any barrier or drainage, surface water and ground moisture collect in the lowest points and never evaporate because the tree canopy prevents drying.' },
              { title: 'Termite damage reported on inspection', desc: 'Damp wood in Decatur crawl spaces is a primary target for subterranean termites. If your pest inspection has found termite damage or active colonies, the moisture that attracted them must be controlled to prevent reinfestation after treatment.' },
              { title: 'Renovation planned or in progress', desc: 'If you are planning or actively renovating your Decatur home, now is the optimal time to address the crawl space. Adding load to a compromised structure without fixing the foundation is risky. Encapsulation during renovation is more cost-effective than doing it separately.' },
            ].map((sign, i) => (
              <div key={i} className="bg-white rounded-xl p-5 shadow-sm"><h3 className="font-semibold text-[#273373] text-base mb-2">{sign.title}</h3><p className="text-gray-600 text-sm leading-relaxed">{sign.desc}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">How We Encapsulate Crawl Spaces in Decatur</h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <h3 className="text-[#273373] font-display">Structural Assessment and Repair First</h3>
            <p>Every Decatur encapsulation project begins with a thorough structural assessment. We evaluate every pier, girder, joist, and structural connection. Failed stacked stone or brick piers are replaced with adjustable steel piers on concrete footings. Rotted girders are replaced or sistered. Damaged joists are reinforced. All wood receives borate preservative treatment. We never encapsulate over compromised structure.</p>
            <h3 className="text-[#273373] font-display">Mold Remediation</h3>
            <p>Most Decatur crawl spaces we work on have significant mold present. We treat all affected surfaces with professional antimicrobial solution, mechanically remove heavy growth, and allow the treated surfaces to dry before installing the encapsulation system. The sealed environment with dehumidification then prevents any recurrence because the conditions mold needs to grow no longer exist.</p>
            <h3 className="text-[#273373] font-display">Heavy-Duty Liner on Irregular Surfaces</h3>
            <p>Decatur crawl spaces have irregular dirt floors, fieldstone walls, and uneven grades that require more liner customization than newer homes. We use 20-mil reinforced liner that conforms to the irregular surfaces, overlapping generously at seams and sealing around every stone pier, pipe penetration, and wall irregularity. The liner extends up the rough stone walls and is fastened with mechanical anchors appropriate for masonry.</p>
            <h3 className="text-[#273373] font-display">Drainage Integration Where Needed</h3>
            <p>For Decatur crawl spaces with active water entry, we install an interior French drain along the foundation perimeter before the liner goes down. The drain routes to a sump pit with pump. The liner then goes over the drainage system, creating a sealed envelope. For crawl spaces with just ground moisture and no active water, the liner and dehumidifier are sufficient without drainage.</p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Crawl Space Encapsulation Costs in Decatur</h2>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#273373] text-white"><tr><th className="px-6 py-4 text-left text-sm font-semibold">Service</th><th className="px-6 py-4 text-left text-sm font-semibold">Typical Cost</th><th className="px-6 py-4 text-left text-sm font-semibold hidden sm:table-cell">Timeline</th></tr></thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ['Basic vapor barrier (floor only)', '$2,500 – $4,500', '1 day'],
                  ['Full encapsulation (liner + vents + dehumidifier)', '$5,000 – $15,000', '2-4 days'],
                  ['Encapsulation with structural repair', '$10,000 – $20,000', '4-7 days'],
                  ['Mold remediation', '$2,000 – $4,000', '1-2 days'],
                  ['Pier replacement (per pier)', '$800 – $1,500', '1 day'],
                  ['Commercial dehumidifier', '$1,000 – $2,000', 'Same day'],
                ].map(([r, c, t], i) => (<tr key={i} className="hover:bg-gray-50"><td className="px-6 py-4 text-sm text-gray-900">{r}</td><td className="px-6 py-4 text-sm font-semibold text-[#115997]">{c}</td><td className="px-6 py-4 text-sm text-gray-500 hidden sm:table-cell">{t}</td></tr>))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mt-4">Financing available through GreenSky. Transferable warranty included with all encapsulation work.</p>
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
          <h2 className="text-2xl font-bold text-[#273373] mb-6 font-display">Related Services in Decatur</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { title: 'Foundation Repair', href: '/foundation-repair/decatur', desc: 'Replace century-old pier foundations before or during encapsulation.' },
              { title: 'Drainage Solutions', href: '/drainage/decatur', desc: 'Exterior drainage reduces the water load on your Decatur crawl space.' },
              { title: 'Crawl Space Repair', href: '/crawl-space-repair', desc: 'Joist, girder, and subfloor repair for moisture-damaged Decatur home structure.' },
            ].map((s, i) => (<Link key={i} href={s.href} className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow group"><h3 className="font-semibold text-[#273373] mb-2 group-hover:text-[#115997] transition-colors">{s.title}</h3><p className="text-gray-600 text-sm">{s.desc}</p></Link>))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#273373] mb-6 font-display">Learn More About Crawl Spaces</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[{ title: 'Crawl Space Repair Cost in Atlanta', href: '/blog/crawl-space-repair-cost-atlanta' }, { title: 'Crawl Space Mold: Signs and Solutions', href: '/blog/crawl-space-mold-signs' }, { title: 'Crawl Space Encapsulation vs Waterproofing', href: '/blog/crawl-space-encapsulation-vs-waterproofing' }, { title: 'Crawl Space Vapor Barrier Guide', href: '/blog/crawl-space-vapor-barrier-guide' }].map((p, i) => (<Link key={i} href={p.href} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"><svg className="w-5 h-5 text-[#115997] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg><span className="text-sm font-medium text-gray-800">{p.title}</span></Link>))}
          </div>
        </div>
      </section>

      <section className="py-8 bg-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-gray-500 mb-4"><Link href="/" className="hover:text-[#115997]">Home</Link> {' / '}<Link href="/crawl-space-encapsulation" className="hover:text-[#115997]">Crawl Space Encapsulation</Link> {' / '}<span className="text-gray-700">Decatur</span></p>
          <p className="text-sm text-gray-500">Crawl space encapsulation also available in <Link href="/crawl-space-encapsulation/lawrenceville" className="text-[#115997] hover:underline">Lawrenceville</Link>, <Link href="/crawl-space-encapsulation/marietta" className="text-[#115997] hover:underline">Marietta</Link>, <Link href="/crawl-space-encapsulation/roswell" className="text-[#115997] hover:underline">Roswell</Link>, <Link href="/crawl-space-encapsulation/alpharetta" className="text-[#115997] hover:underline">Alpharetta</Link>, <Link href="/crawl-space-encapsulation/sandy-springs" className="text-[#115997] hover:underline">Sandy Springs</Link>, and <Link href="/crawl-space-encapsulation/stone-mountain" className="text-[#115997] hover:underline">Stone Mountain</Link>.</p>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-[#115997]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 font-display">Free Crawl Space Inspection in Decatur</h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">Whether your Decatur home was built in 1920 or 2020, we will inspect the crawl space, document everything with photos, and give you an honest plan for making it right. No obligation.</p>
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