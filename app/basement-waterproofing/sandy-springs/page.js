import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export const metadata = {
  title: 'Basement Waterproofing in Sandy Springs, GA | Free Inspection | Reliable Solutions Atlanta',
  description: 'Basement waterproofing in Sandy Springs, GA. Interior drainage, wall repair, and sump pumps for 1960s-1980s ranches and split-levels. Most projects $3,000-$10,000. Free inspection. 770-895-2039.',
  keywords: 'basement waterproofing Sandy Springs GA, basement waterproofing Sandy Springs Georgia, wet basement Sandy Springs, basement leak repair Sandy Springs',
  openGraph: { title: 'Basement Waterproofing in Sandy Springs, GA | Reliable Solutions Atlanta', description: 'Stop water in your Sandy Springs basement. Free inspections. 770-895-2039.', url: 'https://www.waterhelpme.com/basement-waterproofing/sandy-springs', type: 'website' },
  alternates: { canonical: 'https://www.waterhelpme.com/basement-waterproofing/sandy-springs' },
}

const faqs = [
  { question: 'How much does basement waterproofing cost in Sandy Springs, GA?', answer: 'Basement waterproofing in Sandy Springs typically costs between $3,000 and $10,000 for interior systems. Walk-out basements on sloped lots with multiple water entry points run toward the higher end. Crack injection starts at $400. Full exterior waterproofing ranges from $8,000 to $15,000.' },
  { question: 'Why does my Sandy Springs split-level have water in the lower level?', answer: 'Split-level homes have a lower level that sits partially below grade. The buried walls receive hydrostatic pressure from saturated soil while the above-grade walls do not. Water enters at the wall-floor joint on the buried side and through cracks in the block walls. The decomposed granite in Sandy Springs soil also creates fast-draining pockets that channel water toward the foundation.' },
  { question: 'Will waterproofing help sell my Sandy Springs home?', answer: 'In the Sandy Springs real estate market, a wet basement is a top-three inspection concern. Waterproofing before listing eliminates this issue and the transferable warranty we provide gives buyers confidence. Homes with documented waterproofing systems sell faster and for higher prices than comparable homes with unresolved water issues.' },
  { question: 'Can I waterproof just one wall of my Sandy Springs basement?', answer: 'Yes. In many Sandy Springs homes on slopes, water only enters through the walls that are below grade. We can install a targeted drainage system on just the affected walls rather than the full perimeter. This reduces cost while fully solving the problem. We determine the right scope during the free inspection.' },
  { question: 'How does Sandy Springs soil affect basement waterproofing?', answer: 'Sandy Springs has a mix of clay and decomposed granite. The granite component creates pockets that drain quickly, channeling water toward the foundation in concentrated flows rather than uniform seepage. This means water entry in Sandy Springs basements often appears at specific points rather than uniformly across a wall. Our drainage system is designed to capture these concentrated flows.' },
]

export default function BasementWaterproofingSandySprings() {
  const jsonLd = { '@context': 'https://schema.org', '@type': 'Service', name: 'Basement Waterproofing in Sandy Springs, GA', provider: { '@type': 'LocalBusiness', name: 'Reliable Solutions Atlanta', telephone: '+17708952039', url: 'https://www.waterhelpme.com', address: { '@type': 'PostalAddress', addressLocality: 'Sandy Springs', addressRegion: 'GA', addressCountry: 'US' }, areaServed: { '@type': 'City', name: 'Sandy Springs', containedIn: 'Fulton County, GA' } }, serviceType: 'Basement Waterproofing' }
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
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 font-display leading-tight">Basement Waterproofing in Sandy Springs, GA</h1>
            <p className="text-white/80 text-lg sm:text-xl mb-8 leading-relaxed max-w-2xl">Basement waterproofing in Sandy Springs typically costs between $3,000 and $10,000. Reliable Solutions Atlanta has extensive experience with the 1960s-1980s ranches, split-levels, and colonials that define Sandy Springs neighborhoods. We stop water permanently with solutions designed for your home's specific foundation type and terrain. Free same-week inspections.</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white text-[#273373] font-bold rounded-xl hover:bg-gray-100 transition-colors">Schedule Free Inspection</Link>
              <a href="tel:+17708952039" className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-transparent border-2 border-white/30 text-white font-bold rounded-xl hover:bg-white/10 transition-colors">(770) 895-2039</a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Why Sandy Springs Basements Have Water Problems</h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p>Sandy Springs has one of the highest concentrations of basement-equipped homes in metro Atlanta because the hilly terrain naturally lends itself to walk-out and daylight basement construction. The neighborhoods along Roswell Road, Riverside Drive, Mount Vernon Highway, and the Powers Ferry corridor were built predominantly in the 1960s through 1980s with basements that took advantage of the sloped lots.</p>
            <p>The problem is that 1960s and 1970s waterproofing technology was primitive by today's standards. Builders applied a thin layer of asphalt emulsion to the exterior walls, installed a simple perforated clay tile at the footer, and backfilled with the same clay soil they had excavated. After 40 to 60 years, the asphalt coating has dissolved, the clay tiles have crushed under soil weight or been infiltrated by roots, and the backfill has compacted into a dense layer that holds water against the wall.</p>
            <p>Sandy Springs soil adds a unique factor. The decomposed granite mixed with clay creates a soil that behaves unpredictably with water. The granite component allows water to drain rapidly through certain paths while the clay component traps it in others. This means water arrives at basement walls in concentrated streams rather than uniform seepage, creating specific wet spots rather than generally damp conditions.</p>
            <p>The Chattahoochee River corridor along the western edge of Sandy Springs raises the water table in riverside neighborhoods. Homes in the 30328 zip code near the river and along Riverside Drive experience seasonal water table fluctuations that can push water up through basement floor slabs during prolonged wet periods. The 30342 and 30350 zip codes have more terrain-driven water issues from the hilly interior neighborhoods.</p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Signs Your Sandy Springs Basement Needs Waterproofing</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: 'Water entering at specific wall spots', desc: 'Unlike homes in uniform clay, Sandy Springs basements often leak at specific points where decomposed granite channels water to the wall. You may see one wet area while the rest of the wall stays dry.' },
              { title: 'Damp or wet carpet in the lower level', desc: 'Split-level lower levels in Sandy Springs are frequently carpeted. Dampness at the edges where carpet meets the below-grade walls is often the first sign of water entry that has been happening for some time.' },
              { title: 'Musty smell concentrated in one area', desc: 'Localized musty odors near a specific wall or corner point to a concentrated water entry spot. Sandy Springs granite drainage patterns create these focused problem areas rather than general dampness.' },
              { title: 'Efflorescence on block walls', desc: 'White mineral deposits on the cinder block walls common in Sandy Springs 1960s-1970s homes indicate water is migrating through the porous block. Heavy deposits mean sustained water penetration over years.' },
              { title: 'Paint peeling on basement walls', desc: 'Many Sandy Springs basement walls have been painted over the years. When moisture pushes through from outside, paint bubbles, peels, and flakes off. Repainting will not fix this — the water source must be addressed.' },
              { title: 'Water stains on the floor near the walls', desc: 'Dark stains or tide lines on the concrete floor along the base of walls trace the path of water entry. These marks remain visible even when the floor is dry and show the extent of water that enters during rain events.' },
            ].map((sign, i) => (
              <div key={i} className="bg-white rounded-xl p-5 shadow-sm"><h3 className="font-semibold text-[#273373] text-base mb-2">{sign.title}</h3><p className="text-gray-600 text-sm leading-relaxed">{sign.desc}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">How We Waterproof Basements in Sandy Springs</h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <h3 className="text-[#273373] font-display">Targeted Perimeter Drainage</h3>
            <p>For Sandy Springs homes where water enters through specific wall sections, we install interior drainage along the affected walls rather than the full perimeter. This targeted approach intercepts water at the known entry points and routes it to the sump pit while reducing cost. If the inspection reveals water entry potential on additional walls, we extend the system accordingly.</p>
            <h3 className="text-[#273373] font-display">Block Wall Drainage Board</h3>
            <p>Cinder block walls in Sandy Springs 1960s-1970s homes are hollow. Water enters the block cores from outside, fills them, and weeps through the interior face. We install an interior drainage board that captures this weeping water and channels it to the perimeter drain. This is a solution specific to block-wall construction that poured concrete homes do not need.</p>
            <h3 className="text-[#273373] font-display">Sump Pump with Hillside Discharge</h3>
            <p>Sandy Springs' hilly terrain means most basements have a natural downhill side for pump discharge. We route the discharge line to exit through or near the lowest exterior grade point, using gravity to carry water away from the house. The pump still activates during heavy events, but the gravity discharge reduces pump run time and extends its life.</p>
            <h3 className="text-[#273373] font-display">Exterior Spot Repair</h3>
            <p>When water entry is isolated to one wall or area, exterior spot repair is sometimes more cost-effective than full interior drainage. We excavate the problem section, apply a waterproof membrane, install new drain tile, and backfill with gravel. This is particularly effective for Sandy Springs homes where a single concentrated granite drainage path is delivering water to a specific wall section.</p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Basement Waterproofing Costs in Sandy Springs</h2>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#273373] text-white"><tr><th className="px-6 py-4 text-left text-sm font-semibold">Service</th><th className="px-6 py-4 text-left text-sm font-semibold">Typical Cost</th><th className="px-6 py-4 text-left text-sm font-semibold hidden sm:table-cell">Timeline</th></tr></thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ['Crack injection (per crack)', '$400 – $800', '2-4 hours'],
                  ['Targeted drainage (1-2 walls)', '$2,500 – $5,000', '1-2 days'],
                  ['Full interior perimeter drainage', '$4,000 – $10,000', '2-3 days'],
                  ['Block wall drainage board', '$2,000 – $4,000', '1-2 days'],
                  ['Sump pump with battery backup', '$1,500 – $3,000', '1 day'],
                  ['Exterior spot waterproofing', '$3,000 – $6,000', '2-3 days'],
                ].map(([r, c, t], i) => (<tr key={i} className="hover:bg-gray-50"><td className="px-6 py-4 text-sm text-gray-900">{r}</td><td className="px-6 py-4 text-sm font-semibold text-[#115997]">{c}</td><td className="px-6 py-4 text-sm text-gray-500 hidden sm:table-cell">{t}</td></tr>))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mt-4">Financing available through GreenSky. Transferable warranty included with all work.</p>
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
              { title: 'Foundation Repair', href: '/foundation-repair/sandy-springs', desc: 'Water-damaged basement walls often need structural reinforcement alongside waterproofing.' },
              { title: 'Drainage Solutions', href: '/drainage', desc: 'Surface and subsurface drainage to intercept water before it reaches your Sandy Springs basement.' },
              { title: 'Crawl Space Waterproofing', href: '/crawl-space-waterproofing', desc: 'For Sandy Springs ranches with crawl spaces, waterproofing protects the floor structure from below.' },
            ].map((s, i) => (<Link key={i} href={s.href} className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow group"><h3 className="font-semibold text-[#273373] mb-2 group-hover:text-[#115997] transition-colors">{s.title}</h3><p className="text-gray-600 text-sm">{s.desc}</p></Link>))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#273373] mb-6 font-display">Learn More About Basement Waterproofing</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[{ title: 'Basement Waterproofing Cost in Atlanta', href: '/blog/basement-waterproofing-cost-atlanta' }, { title: 'Interior vs Exterior Basement Waterproofing', href: '/blog/interior-vs-exterior-basement-waterproofing' }, { title: 'Signs You Need Basement Waterproofing', href: '/blog/signs-you-need-basement-waterproofing' }, { title: 'How to Choose a Waterproofing Contractor', href: '/blog/how-to-choose-waterproofing-contractor-atlanta' }].map((p, i) => (<Link key={i} href={p.href} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"><svg className="w-5 h-5 text-[#115997] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg><span className="text-sm font-medium text-gray-800">{p.title}</span></Link>))}
          </div>
        </div>
      </section>

      <section className="py-8 bg-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-gray-500 mb-4"><Link href="/" className="hover:text-[#115997]">Home</Link> {' / '}<Link href="/basement-waterproofing" className="hover:text-[#115997]">Basement Waterproofing</Link> {' / '}<span className="text-gray-700">Sandy Springs</span></p>
          <p className="text-sm text-gray-500">Basement waterproofing also available in <Link href="/basement-waterproofing/lawrenceville" className="text-[#115997] hover:underline">Lawrenceville</Link>, <Link href="/basement-waterproofing/marietta" className="text-[#115997] hover:underline">Marietta</Link>, <Link href="/basement-waterproofing/roswell" className="text-[#115997] hover:underline">Roswell</Link>, <Link href="/basement-waterproofing/alpharetta" className="text-[#115997] hover:underline">Alpharetta</Link>, <Link href="/basement-waterproofing/decatur" className="text-[#115997] hover:underline">Decatur</Link>, and <Link href="/basement-waterproofing/stone-mountain" className="text-[#115997] hover:underline">Stone Mountain</Link>.</p>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-[#115997]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 font-display">Free Basement Inspection in Sandy Springs</h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">Selling, buying, or just tired of a wet basement? We will inspect your Sandy Springs home, trace the water source, and give you a clear written estimate. No obligation.</p>
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