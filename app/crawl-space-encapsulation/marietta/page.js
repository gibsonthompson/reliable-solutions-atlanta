import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export const metadata = {
  title: 'Crawl Space Encapsulation in Marietta, GA | Free Inspection | Reliable Solutions Atlanta',
  description: 'Crawl space encapsulation in Marietta, GA. Vapor barriers, dehumidifiers, and moisture control for Cobb County homes on hilly terrain. Most projects $5,000-$14,000. Free inspection. 770-895-2039.',
  keywords: 'crawl space encapsulation Marietta GA, crawl space vapor barrier Cobb County, crawl space moisture Marietta, crawl space sealing Marietta Georgia',
  openGraph: { title: 'Crawl Space Encapsulation in Marietta, GA | Reliable Solutions Atlanta', description: 'Seal your Marietta crawl space from hillside moisture. Free inspections. 770-895-2039.', url: 'https://www.waterhelpme.com/crawl-space-encapsulation/marietta', type: 'website' },
  alternates: { canonical: 'https://www.waterhelpme.com/crawl-space-encapsulation/marietta' },
}

const faqs = [
  { question: 'How much does crawl space encapsulation cost in Marietta, GA?', answer: 'Crawl space encapsulation in Marietta typically costs between $5,000 and $14,000. Hillside homes in East and West Cobb often have larger or more complex crawl spaces with varying heights and multiple access points that increase the scope. Basic vapor barrier installation starts around $3,000. Full encapsulation with drainage integration runs $10,000 to $18,000.' },
  { question: 'Why are Marietta crawl spaces wetter than other areas?', answer: 'Marietta sits on hilly terrain where water flows downhill toward the lowest point — often the crawl space. The uphill side of a Marietta home receives more ground moisture than the downhill side. Combined with Cobb County red clay that holds water and the rocky substrate in West Cobb that channels water unpredictably, crawl spaces here receive moisture from multiple directions simultaneously.' },
  { question: 'Can you encapsulate a crawl space with a dirt floor?', answer: 'Yes, and most Marietta crawl spaces we encapsulate have dirt floors. The 20-mil liner covers the entire dirt surface, blocking ground moisture from evaporating into the crawl space. If the dirt floor has standing water or is excessively muddy, we address the water source with drainage before installing the liner.' },
  { question: 'Should I encapsulate if I already have a vapor barrier?', answer: 'If your Marietta home has the standard 6-mil builder-grade vapor barrier, it is likely torn, displaced, or deteriorated after 20 to 40 years. A thin barrier on the floor alone does not address wall moisture, vent humidity, or condensation. Full encapsulation replaces the old barrier with a comprehensive sealed system that controls all moisture sources.' },
  { question: 'Does crawl space encapsulation help with allergies in Marietta homes?', answer: 'Many Marietta homeowners report significant improvement in allergy symptoms after encapsulation. Mold spores, dust mites, and other allergens thrive in damp crawl spaces and migrate into living areas through the floor system. Sealing the crawl space and controlling humidity eliminates the environment these allergens need to survive.' },
]

export default function CrawlSpaceEncapsulationMarietta() {
  const jsonLd = { '@context': 'https://schema.org', '@type': 'Service', name: 'Crawl Space Encapsulation in Marietta, GA', provider: { '@type': 'LocalBusiness', name: 'Reliable Solutions Atlanta', telephone: '+17708952039', url: 'https://www.waterhelpme.com', address: { '@type': 'PostalAddress', addressLocality: 'Marietta', addressRegion: 'GA', addressCountry: 'US' }, areaServed: { '@type': 'City', name: 'Marietta', containedIn: 'Cobb County, GA' } }, serviceType: 'Crawl Space Encapsulation' }
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
            <p className="text-white/70 text-sm font-medium mb-3 uppercase tracking-wider">Cobb County, Georgia</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 font-display leading-tight">Crawl Space Encapsulation in Marietta, GA</h1>
            <p className="text-white/80 text-lg sm:text-xl mb-8 leading-relaxed max-w-2xl">Crawl space encapsulation in Marietta typically costs between $5,000 and $14,000. Reliable Solutions Atlanta seals Cobb County crawl spaces against the hillside moisture, humidity, and ground water that Marietta's terrain channels directly under your home. Full encapsulation with heavy-duty liner, vent sealing, and dehumidification. Free same-week inspections.</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white text-[#273373] font-bold rounded-xl hover:bg-gray-100 transition-colors">Schedule Free Inspection</Link>
              <a href="tel:+17708952039" className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-transparent border-2 border-white/30 text-white font-bold rounded-xl hover:bg-white/10 transition-colors">(770) 895-2039</a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Why Marietta Crawl Spaces Need Encapsulation</h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p>Marietta's rolling Cobb County terrain creates a crawl space moisture problem that flat suburbs do not face. When your home sits on a slope — as thousands of homes do in East Cobb neighborhoods like Walton, Indian Hills, Sope Creek, and Timber Ridge — the uphill side of the crawl space receives ground water flowing downhill through the clay soil. This water seeps through and under the foundation wall, saturating the crawl space dirt floor and raising humidity levels to 80% or higher.</p>
            <p>The pier-and-beam construction common in older Marietta homes (pre-1980) presents additional encapsulation challenges. These homes have crawl spaces with varying heights — sometimes as low as 18 inches in some sections and 4 feet in others — due to the natural grade of the hillside. The original wooden piers and girders have been exposed to moisture for 40 to 60 years, and many show signs of rot, mold, and insect damage that must be addressed before or during encapsulation.</p>
            <p>West Cobb homes near Kennesaw Mountain and along Due West Road face a different challenge. The rocky clay soil in this area creates subsurface water channels that deliver moisture to crawl spaces from unexpected directions. Standard vented crawl space designs cannot handle this concentrated moisture delivery, and the vents themselves make the problem worse by admitting humid summer air.</p>
            <p>The 30060, 30062, 30064, 30066, and 30067 zip codes all have significant crawl space encapsulation needs. We see the most severe conditions in homes built on the steepest lots where the grade change across the crawl space footprint exceeds 3 to 4 feet.</p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Signs Your Marietta Crawl Space Needs Encapsulation</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: 'Standing water on the uphill side', desc: 'If the uphill portion of your Marietta crawl space has standing water or perpetually wet soil while the downhill side is drier, hillside ground water is entering through or under the uphill foundation wall.' },
              { title: 'Visible mold on floor joists and subfloor', desc: 'Dark staining or fuzzy white/green growth on the wood structure above the crawl space indicates sustained humidity above 60%. This mold is actively degrading the wood strength and sending spores into your living space.' },
              { title: 'Cold floors in winter', desc: 'Vented crawl spaces in Marietta allow cold winter air to flow directly beneath your floors. If your first-floor rooms have cold floors even with the heat running, the crawl space vents are letting conditioned air escape and cold air in.' },
              { title: 'Insulation falling down between joists', desc: 'Fiberglass batt insulation in Marietta crawl spaces absorbs moisture, becomes heavy, and falls away from the subfloor. If you see sagging or fallen insulation, the crawl space humidity has exceeded what the insulation can handle.' },
              { title: 'Termite activity or pest evidence', desc: 'Damp wood in a vented crawl space is a magnet for termites, carpenter ants, and wood-boring beetles. If your annual termite inspection found activity or damage in the crawl space, moisture is the underlying cause that encapsulation addresses.' },
              { title: 'Musty smell that worsens in summer', desc: 'Hot humid air entering through vents in summer creates peak condensation conditions. The musty smell gets worse from May through September as the crawl space becomes a condensation chamber. Encapsulation stops this cycle completely.' },
            ].map((sign, i) => (
              <div key={i} className="bg-white rounded-xl p-5 shadow-sm"><h3 className="font-semibold text-[#273373] text-base mb-2">{sign.title}</h3><p className="text-gray-600 text-sm leading-relaxed">{sign.desc}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">How We Encapsulate Crawl Spaces in Marietta</h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <h3 className="text-[#273373] font-display">Drainage Integration for Hillside Homes</h3>
            <p>For Marietta homes on slopes, we often install an interior French drain along the uphill wall before encapsulating. This drain captures water entering from the hillside and routes it to a sump pit with pump. The encapsulation liner then goes over the drainage system, creating a sealed envelope where water is managed below the liner and the air above stays dry. This combined approach is essential for Cobb County hillside homes.</p>
            <h3 className="text-[#273373] font-display">Variable-Height Crawl Space Solutions</h3>
            <p>Marietta crawl spaces built on natural grades often have sections with minimal clearance. Our crews are experienced in working in tight spaces and use installation techniques adapted to crawl spaces as low as 18 inches. The liner is customized with overlapping sections that accommodate height changes, step-downs, and irregular foundation wall angles common in hillside construction.</p>
            <h3 className="text-[#273373] font-display">Structural Repair Before Encapsulation</h3>
            <p>We inspect every structural member during the crawl space assessment. Damaged or rotted joists are sistered with new treated lumber. Failed piers are replaced with adjustable steel piers. All wood receives borate treatment to prevent future rot and pest damage. Encapsulating over damaged structure is a waste — we fix it first so the encapsulation protects a sound home.</p>
            <h3 className="text-[#273373] font-display">Conditioned Crawl Space Design</h3>
            <p>After sealing the liner, closing vents, and insulating walls, we condition the crawl space with a commercial dehumidifier that maintains 45-50% humidity. For Marietta homes where the crawl space connects to the HVAC system, we can integrate a supply air duct that uses existing conditioned air to regulate the crawl space environment, further reducing dehumidifier run time and energy cost.</p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Crawl Space Encapsulation Costs in Marietta</h2>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#273373] text-white"><tr><th className="px-6 py-4 text-left text-sm font-semibold">Service</th><th className="px-6 py-4 text-left text-sm font-semibold">Typical Cost</th><th className="px-6 py-4 text-left text-sm font-semibold hidden sm:table-cell">Timeline</th></tr></thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ['Vapor barrier replacement', '$1,500 – $3,500', '1 day'],
                  ['Full encapsulation (liner + vents + insulation)', '$5,000 – $14,000', '2-4 days'],
                  ['Encapsulation with interior drainage', '$8,000 – $18,000', '3-5 days'],
                  ['Commercial dehumidifier', '$1,000 – $2,000', 'Same day'],
                  ['Mold treatment', '$1,500 – $3,500', '1 day'],
                  ['Structural repair + encapsulation', '$10,000 – $22,000', '4-6 days'],
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
          <h2 className="text-2xl font-bold text-[#273373] mb-6 font-display">Related Services in Marietta</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { title: 'Foundation Repair', href: '/foundation-repair/marietta', desc: 'Repair pier-and-beam foundations before encapsulation to protect a sound structure.' },
              { title: 'Drainage Solutions', href: '/drainage/marietta', desc: 'Exterior hillside drainage reduces the water reaching your Marietta crawl space.' },
              { title: 'Crawl Space Repair', href: '/crawl-space-repair', desc: 'Structural repair for joists, girders, and piers damaged by decades of moisture exposure.' },
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
          <p className="text-sm text-gray-500 mb-4"><Link href="/" className="hover:text-[#115997]">Home</Link> {' / '}<Link href="/crawl-space-encapsulation" className="hover:text-[#115997]">Crawl Space Encapsulation</Link> {' / '}<span className="text-gray-700">Marietta</span></p>
          <p className="text-sm text-gray-500">Crawl space encapsulation also available in <Link href="/crawl-space-encapsulation/lawrenceville" className="text-[#115997] hover:underline">Lawrenceville</Link>, <Link href="/crawl-space-encapsulation/roswell" className="text-[#115997] hover:underline">Roswell</Link>, <Link href="/crawl-space-encapsulation/alpharetta" className="text-[#115997] hover:underline">Alpharetta</Link>, <Link href="/crawl-space-encapsulation/decatur" className="text-[#115997] hover:underline">Decatur</Link>, <Link href="/crawl-space-encapsulation/sandy-springs" className="text-[#115997] hover:underline">Sandy Springs</Link>, and <Link href="/crawl-space-encapsulation/stone-mountain" className="text-[#115997] hover:underline">Stone Mountain</Link>.</p>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-[#115997]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 font-display">Free Crawl Space Inspection in Marietta</h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">We will crawl under your Marietta home, document what we find with photos, and give you a clear plan for sealing your crawl space against Cobb County moisture. No obligation.</p>
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