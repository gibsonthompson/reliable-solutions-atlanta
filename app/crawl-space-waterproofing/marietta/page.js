import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export const metadata = {
  title: 'Crawl Space Waterproofing in Marietta, GA | Free Inspection | Reliable Solutions Atlanta',
  description: 'Crawl space waterproofing in Marietta, GA. Stop hillside water entry in Cobb County crawl spaces. Interior drainage, sump pumps, vapor barriers. Most projects $3,500-$10,000. Free inspection. 770-895-2039.',
  keywords: 'crawl space waterproofing Marietta GA, crawl space water Cobb County, wet crawl space Marietta, crawl space drainage Marietta Georgia',
  openGraph: { title: 'Crawl Space Waterproofing in Marietta, GA | Reliable Solutions Atlanta', description: 'Stop hillside water in your Marietta crawl space. Free inspections. 770-895-2039.', url: 'https://www.waterhelpme.com/crawl-space-waterproofing/marietta', type: 'website' },
  alternates: { canonical: 'https://www.waterhelpme.com/crawl-space-waterproofing/marietta' },
}

const faqs = [
  { question: 'How much does crawl space waterproofing cost in Marietta, GA?', answer: 'Crawl space waterproofing in Marietta typically costs between $3,500 and $10,000. Hillside homes in East and West Cobb often require more extensive drainage than flat lots due to the volume of water flowing downhill toward the crawl space. Interior drainage with sump pump starts around $3,000. Full waterproofing with exterior curtain drain integration runs $8,000 to $14,000.' },
  { question: 'Why does my Marietta crawl space only flood on one side?', answer: 'Marietta homes on slopes receive water from the uphill direction. The uphill crawl space wall takes the full force of hillside water pressure while the downhill wall stays dry. This one-sided water entry pattern is characteristic of Cobb County hillside construction and is addressed with targeted drainage on the affected wall.' },
  { question: 'Can you waterproof a pier-and-beam crawl space in Marietta?', answer: 'Yes. Many older Marietta homes near the Square and in historic neighborhoods have pier-and-beam foundations with open crawl spaces. We install drainage around and between the piers, lay vapor barrier across the entire floor, and seal the perimeter. Pier-and-beam crawl spaces often need structural repair before waterproofing.' },
  { question: 'Should I combine waterproofing with exterior drainage in Marietta?', answer: 'For hillside Marietta homes, combining interior crawl space waterproofing with an exterior curtain drain is the most effective approach. The curtain drain intercepts hillside water before it reaches the foundation, reducing the volume the interior system needs to handle. This combination costs more upfront but provides the most complete protection.' },
  { question: 'Will waterproofing stop the mold in my Marietta crawl space?', answer: 'Waterproofing stops the active water entry that feeds mold growth. Once the water source is controlled and a vapor barrier is in place, humidity drops below the 60% threshold mold needs to survive. We treat existing mold before waterproofing and recommend adding a dehumidifier for complete humidity control.' },
]

export default function CrawlSpaceWaterproofingMarietta() {
  const jsonLd = { '@context': 'https://schema.org', '@type': 'Service', name: 'Crawl Space Waterproofing in Marietta, GA', provider: { '@type': 'LocalBusiness', name: 'Reliable Solutions Atlanta', telephone: '+17708952039', url: 'https://www.waterhelpme.com', address: { '@type': 'PostalAddress', addressLocality: 'Marietta', addressRegion: 'GA', addressCountry: 'US' }, areaServed: { '@type': 'City', name: 'Marietta', containedIn: 'Cobb County, GA' } }, serviceType: 'Crawl Space Waterproofing' }
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
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 font-display leading-tight">Crawl Space Waterproofing in Marietta, GA</h1>
            <p className="text-white/80 text-lg sm:text-xl mb-8 leading-relaxed max-w-2xl">Crawl space waterproofing in Marietta typically costs between $3,500 and $10,000. Reliable Solutions Atlanta stops hillside water from flooding Cobb County crawl spaces with interior drainage, sump pumps, vapor barriers, and exterior curtain drain integration designed for the hilly terrain that channels water toward your home. Free same-week inspections.</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white text-[#273373] font-bold rounded-xl hover:bg-gray-100 transition-colors">Schedule Free Inspection</Link>
              <a href="tel:+17708952039" className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-transparent border-2 border-white/30 text-white font-bold rounded-xl hover:bg-white/10 transition-colors">(770) 895-2039</a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Why Marietta Crawl Spaces Take On Water</h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p>Marietta crawl spaces flood because Cobb County terrain acts as a funnel. The rolling hills in East Cobb neighborhoods like Walton, Indian Hills, Sope Creek, and Timber Ridge create natural water channels that flow downhill toward the lowest points, and the crawl space beneath your home is almost always lower than the surrounding grade. Every rain event sends water rushing toward your foundation from uphill.</p>
            <p>The clay and rocky soil mix in Marietta makes the problem worse. Pure clay absorbs water slowly but at least absorbs some. The rock mixed into West Cobb soil near Kennesaw Mountain and Due West Road does not absorb water at all. Rainfall hits the rocky layer and flows laterally until it finds a permeable path, which is often the backfill around your foundation. This concentrated water delivery overwhelms the minimal waterproofing that builders applied during original construction.</p>
            <p>Older Marietta homes near the Square and along Whitlock Avenue and Church Street have pier-and-beam crawl spaces with stacked stone or brick piers sitting on dirt floors. These crawl spaces have no waterproofing at all. Water enters from every direction, saturates the dirt floor, and creates a perpetually wet environment that rots the wooden structure above. The 30060, 30062, 30064, 30066, and 30067 zip codes all have significant crawl space water problems that worsen with each year of deferred maintenance.</p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Signs Your Marietta Crawl Space Needs Waterproofing</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: 'Water pooling on the uphill side only', desc: 'If the uphill portion of your Marietta crawl space has standing water while the downhill side is dry, hillside ground water is entering through or under the uphill foundation wall. This directional water entry needs targeted drainage.' },
              { title: 'Mud or saturated soil on the crawl space floor', desc: 'Dirt floors in Marietta crawl spaces that never dry indicate constant water entry from below or through the walls. If the soil squelches underfoot even during dry weather, the crawl space needs drainage and a vapor barrier.' },
              { title: 'Water staining on foundation walls', desc: 'Tide lines, dark stains, or white mineral deposits on the interior of crawl space walls show the high-water mark from past flooding events. These marks trace the path of water entry and indicate recurring problems.' },
              { title: 'Rotting wood visible on piers or joists', desc: 'In older Marietta pier-and-beam crawl spaces, look at the wooden piers, girders, and the bottom edges of floor joists. Soft, dark, or crumbling wood indicates moisture damage that has been progressing for years.' },
              { title: 'Musty smell that worsens after rain', desc: 'If the musty odor in your home intensifies after rain and then gradually fades, the crawl space is taking on water during rain events that then slowly evaporates. The smell follows the water cycle.' },
              { title: 'Insulation falling from between joists', desc: 'Fiberglass insulation in a wet Marietta crawl space absorbs moisture, triples in weight, and falls away from the subfloor. Sagging or fallen batts are a clear visual indicator of chronic moisture problems.' },
            ].map((sign, i) => (
              <div key={i} className="bg-white rounded-xl p-5 shadow-sm"><h3 className="font-semibold text-[#273373] text-base mb-2">{sign.title}</h3><p className="text-gray-600 text-sm leading-relaxed">{sign.desc}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">How We Waterproof Crawl Spaces in Marietta</h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <h3 className="text-[#273373] font-display">Targeted Uphill Wall Drainage</h3>
            <p>For Marietta hillside homes, we focus drainage on the walls receiving water pressure. We install a French drain along the uphill wall and wrap it around the corners to capture any water that migrates along the side walls. This targeted approach costs less than full perimeter drainage while addressing the actual water entry points specific to your hillside orientation.</p>
            <h3 className="text-[#273373] font-display">Exterior Curtain Drain Integration</h3>
            <p>When the volume of hillside water overwhelms interior drainage alone, we install an exterior curtain drain across the uphill side of the house. This trench drain intercepts water flowing down the hill before it reaches the foundation wall, reducing the hydrostatic pressure the interior system needs to handle. For steep East Cobb lots, this combination is often the only approach that fully solves the problem.</p>
            <h3 className="text-[#273373] font-display">Sump Pump with Gravity-Assist Discharge</h3>
            <p>Marietta hillside homes have an advantage: the downhill side provides a natural gravity discharge point. We route the sump pump discharge through the downhill foundation wall and use the grade to carry water away from the house. The pump still activates during heavy events, but gravity handles the discharge rather than pumping uphill, which extends pump life and reduces energy cost.</p>
            <h3 className="text-[#273373] font-display">Vapor Barrier with Drainage Mat</h3>
            <p>On crawl space floors where water pools before reaching the perimeter drain, we install a drainage mat beneath the vapor barrier. The mat creates channels for water to flow freely to the drain instead of pooling under the plastic. The 20-mil vapor barrier over the mat prevents ground moisture from evaporating upward. This layered system manages both liquid water and moisture vapor.</p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Crawl Space Waterproofing Costs in Marietta</h2>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#273373] text-white"><tr><th className="px-6 py-4 text-left text-sm font-semibold">Service</th><th className="px-6 py-4 text-left text-sm font-semibold">Typical Cost</th><th className="px-6 py-4 text-left text-sm font-semibold hidden sm:table-cell">Timeline</th></tr></thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ['Vapor barrier (20-mil, floor + walls)', '$2,000 – $4,500', '1 day'],
                  ['Targeted wall drainage (1-2 walls)', '$2,500 – $5,000', '1-2 days'],
                  ['Full perimeter drainage + sump', '$3,500 – $10,000', '2-3 days'],
                  ['Exterior curtain drain', '$3,000 – $6,000', '2-3 days'],
                  ['Interior + exterior combined system', '$6,000 – $14,000', '3-5 days'],
                  ['Drainage mat under vapor barrier', '$1,000 – $2,500', '1 day'],
                ].map(([r, c, t], i) => (<tr key={i} className="hover:bg-gray-50"><td className="px-6 py-4 text-sm text-gray-900">{r}</td><td className="px-6 py-4 text-sm font-semibold text-[#115997]">{c}</td><td className="px-6 py-4 text-sm text-gray-500 hidden sm:table-cell">{t}</td></tr>))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mt-4">Financing available through GreenSky. Transferable warranty included with all waterproofing work.</p>
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
              { title: 'Crawl Space Encapsulation', href: '/crawl-space-encapsulation/marietta', desc: 'After waterproofing stops water, encapsulation seals and conditions the crawl space.' },
              { title: 'Foundation Repair', href: '/foundation-repair/marietta', desc: 'Repair hillside foundation damage caused by the same water affecting your crawl space.' },
              { title: 'Drainage Solutions', href: '/drainage/marietta', desc: 'Exterior hillside drainage reduces water volume reaching your Marietta crawl space.' },
            ].map((s, i) => (<Link key={i} href={s.href} className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow group"><h3 className="font-semibold text-[#273373] mb-2 group-hover:text-[#115997] transition-colors">{s.title}</h3><p className="text-gray-600 text-sm">{s.desc}</p></Link>))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#273373] mb-6 font-display">Learn More About Crawl Spaces</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[{ title: 'Crawl Space Encapsulation vs Waterproofing', href: '/blog/crawl-space-encapsulation-vs-waterproofing' }, { title: 'Crawl Space Vapor Barrier Guide', href: '/blog/crawl-space-vapor-barrier-guide' }, { title: 'Crawl Space Mold: Signs and Solutions', href: '/blog/crawl-space-mold-signs' }, { title: 'French Drain Cost in Atlanta', href: '/blog/french-drain-cost-atlanta' }].map((p, i) => (<Link key={i} href={p.href} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"><svg className="w-5 h-5 text-[#115997] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg><span className="text-sm font-medium text-gray-800">{p.title}</span></Link>))}
          </div>
        </div>
      </section>

      <section className="py-8 bg-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-gray-500 mb-4"><Link href="/" className="hover:text-[#115997]">Home</Link> {' / '}<Link href="/crawl-space-waterproofing" className="hover:text-[#115997]">Crawl Space Waterproofing</Link> {' / '}<span className="text-gray-700">Marietta</span></p>
          <p className="text-sm text-gray-500">Crawl space waterproofing also available in <Link href="/crawl-space-waterproofing/lawrenceville" className="text-[#115997] hover:underline">Lawrenceville</Link>, <Link href="/crawl-space-waterproofing/roswell" className="text-[#115997] hover:underline">Roswell</Link>, <Link href="/crawl-space-waterproofing/alpharetta" className="text-[#115997] hover:underline">Alpharetta</Link>, <Link href="/crawl-space-waterproofing/decatur" className="text-[#115997] hover:underline">Decatur</Link>, <Link href="/crawl-space-waterproofing/sandy-springs" className="text-[#115997] hover:underline">Sandy Springs</Link>, and <Link href="/crawl-space-waterproofing/stone-mountain" className="text-[#115997] hover:underline">Stone Mountain</Link>.</p>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-[#115997]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 font-display">Free Crawl Space Inspection in Marietta</h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">We will crawl under your Marietta home, find where the water is entering, and design a waterproofing system that works with your hillside terrain. No obligation.</p>
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