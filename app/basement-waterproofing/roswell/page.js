import Link from 'next/link'

export const metadata = {
  title: 'Basement Waterproofing in Roswell, GA | Free Inspection | Reliable Solutions Atlanta',
  description: 'Basement waterproofing in Roswell, GA. Protect your North Fulton home from water damage near the Chattahoochee corridor. Interior drainage, exterior membrane, sump pumps. Free inspection. 770-895-2039.',
  keywords: 'basement waterproofing Roswell GA, basement waterproofing North Fulton, wet basement Roswell, basement leak repair Roswell Georgia',
  openGraph: { title: 'Basement Waterproofing in Roswell, GA | Reliable Solutions Atlanta', description: 'Protect your Roswell home value with professional basement waterproofing. Free inspection. 770-895-2039.', url: 'https://www.waterhelpme.com/basement-waterproofing/roswell', type: 'website' },
  alternates: { canonical: 'https://www.waterhelpme.com/basement-waterproofing/roswell' },
}

const faqs = [
  { question: 'How much does basement waterproofing cost in Roswell, GA?', answer: 'Basement waterproofing in Roswell typically costs between $4,000 and $12,000. Roswell homes tend to be larger with more linear footage of basement wall, which increases material and labor costs. Interior drainage systems start around $4,000. Full exterior waterproofing for larger homes can reach $18,000. Crack injection starts at $400 per crack.' },
  { question: 'Does living near the Chattahoochee affect my basement?', answer: 'Yes. Homes in the Chattahoochee River corridor neighborhoods \u2014 Willeo, Rivermont, Martin Landing, and areas along Azalea Drive \u2014 have higher water tables than homes farther from the river. The water table can rise during prolonged rainy periods and push water up through the basement floor slab and through the wall-floor joint, even when the walls themselves are sound.' },
  { question: 'Should I waterproof before selling my Roswell home?', answer: 'In the Roswell market where homes sell for $400,000 to over $1 million, a wet basement is one of the most damaging inspection findings. Waterproofing before listing eliminates this negotiation point and can pay for itself by preventing a $20,000 to $40,000 price reduction. The transferable warranty we provide becomes a selling asset.' },
  { question: 'Can tree roots cause basement water problems in Roswell?', answer: 'Indirectly, yes. Roswell has dense mature tree coverage. Large root systems can damage exterior drainage tiles installed during original construction, clog them, or redirect water flow toward the foundation. Roots can also create channels in the soil that funnel water toward the basement walls.' },
  { question: 'How long does a basement waterproofing system last?', answer: 'A properly installed interior drainage system with quality sump pump lasts 25+ years with basic maintenance. The drainage channel itself is virtually permanent. Sump pumps should be replaced every 8 to 10 years. Exterior waterproofing membranes last 30 to 50 years. We include warranty coverage with all installations.' },
]

export default function BasementWaterproofingRoswell() {
  const jsonLd = { '@context': 'https://schema.org', '@type': 'Service', name: 'Basement Waterproofing in Roswell, GA', provider: { '@type': 'LocalBusiness', name: 'Reliable Solutions Atlanta', telephone: '+17708952039', url: 'https://www.waterhelpme.com', address: { '@type': 'PostalAddress', addressLocality: 'Roswell', addressRegion: 'GA', addressCountry: 'US' }, areaServed: { '@type': 'City', name: 'Roswell', containedIn: 'Fulton County, GA' } }, serviceType: 'Basement Waterproofing' }
  const faqJsonLd = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })) }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <section className="relative bg-[#273373] py-16 sm:py-20 md:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-[#273373] to-[#115997] opacity-90" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-white/70 text-sm font-medium mb-3 uppercase tracking-wider">North Fulton County, Georgia</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 font-display leading-tight">Basement Waterproofing in Roswell, GA</h1>
            <p className="text-white/80 text-lg sm:text-xl mb-8 leading-relaxed max-w-2xl">
              Basement waterproofing in Roswell typically costs between $4,000 and $12,000 depending on the size and severity. Reliable Solutions Atlanta protects Roswell homes from water damage with permanent solutions designed for the Chattahoochee corridor's high water table and clay soil conditions. Free same-week inspections with transferable warranty on all work.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white text-[#273373] font-bold rounded-xl hover:bg-gray-100 transition-colors">Schedule Free Inspection</Link>
              <a href="tel:+17708952039" className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-transparent border-2 border-white/30 text-white font-bold rounded-xl hover:bg-white/10 transition-colors">(770) 895-2039</a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Why Roswell Basements Have Water Problems</h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p>Roswell's proximity to the Chattahoochee River and its tributaries \u2014 Vickery Creek, Big Creek, and Willeo Creek \u2014 creates a higher water table than most metro Atlanta suburbs. During extended wet periods, the water table rises close to or above the basement floor level in neighborhoods along the river corridor. This pushes water upward through the slab and through the wall-floor joint, creating basement flooding even in homes that have never had water issues before.</p>
            <p>The established Roswell neighborhoods in the 30075 and 30076 zip codes were primarily built in the 1970s through 1990s with basements that relied on simple footing drains and damproofing. These systems were designed for normal conditions, not for the sustained hydrostatic pressure that the Chattahoochee corridor's elevated water table creates. After 30 to 50 years, the original drainage has typically been crushed by soil weight, clogged by root intrusion from Roswell's dense tree canopy, or simply deteriorated.</p>
            <p>The mature trees that define Roswell's character contribute to the problem in another way. Large hardwood roots grow into and through the original drainage tiles that were installed around the foundation during construction. A single root penetration can block the entire drainage system, causing water to back up against the foundation wall. Homeowners often do not realize their perimeter drain is compromised until water appears in the basement during a heavy rain.</p>
            <p>The clay soil in Roswell also retains water from the well-irrigated lawns and gardens that are common in the area. Sprinkler systems that run regularly keep the soil near the foundation saturated, adding to the hydrostatic pressure against basement walls even during dry periods.</p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Signs Your Roswell Basement Needs Waterproofing</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: 'Water seeping through the floor slab', desc: 'Unique to the river corridor: when the water table rises, water pushes upward through cracks and joints in the floor. You may see damp spots or actual water appearing in the middle of the floor, not just at the walls.' },
              { title: 'Persistent high humidity despite HVAC', desc: 'Roswell basements near creeks often read 70%+ humidity even with the AC running. Moisture vapor passes through unprotected concrete continuously. A dehumidifier runs nonstop but never gets the space below 60%.' },
              { title: 'Mold on basement walls or ceiling', desc: 'Visible mold growth \u2014 especially on the lower portions of walls or on the ceiling near the wall-floor joint \u2014 indicates sustained water intrusion. In finished Roswell basements, mold often grows behind drywall before becoming visible.' },
              { title: 'Rusted metal in the basement', desc: 'Metal HVAC ducts, water heater jackets, electrical panels, and stored tools developing rust indicates chronic elevated humidity. Metal does not rust in a properly dry basement.' },
              { title: 'Staining at the wall-floor joint', desc: 'A dark line or mineral deposit line along the base of basement walls traces the path where water enters. This is the most common entry point in Roswell basements where the original footing drain has failed.' },
              { title: 'Landscape settling near the foundation', desc: 'If the soil or mulch near your foundation is sinking, the original backfill is compacting and pulling away from the wall. This creates a channel that funnels surface water directly against the basement wall.' },
            ].map((sign, i) => (
              <div key={i} className="bg-white rounded-xl p-5 shadow-sm"><h3 className="font-semibold text-[#273373] text-base mb-2">{sign.title}</h3><p className="text-gray-600 text-sm leading-relaxed">{sign.desc}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">How We Waterproof Basements in Roswell</h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <h3 className="text-[#273373] font-display">Interior Perimeter Drainage with Sub-Slab Depressurization</h3>
            <p>For Roswell homes near the river corridor where floor seepage is a concern, we install a comprehensive interior system that includes both a perimeter drain along the walls and a sub-slab drainage layer. The sub-slab system collects water pushing up from below the foundation and channels it to the sump pit before it can reach the floor surface. This dual approach handles both wall water and floor water.</p>
            <h3 className="text-[#273373] font-display">High-Capacity Sump Pump Systems</h3>
            <p>Roswell basements near water features often require higher-capacity pumps than standard installations. We size the pump to handle the volume of water your specific location generates during peak events. Every system includes a battery backup and we offer water-powered backup options for homes with municipal water. The discharge line routes to a location that prevents the water from cycling back to the foundation.</p>
            <h3 className="text-[#273373] font-display">Vapor Barrier on Interior Walls</h3>
            <p>Even after stopping active water entry, moisture vapor continues to pass through concrete. For Roswell homeowners planning to finish their basement, we install a vapor barrier system on the interior walls that creates an air gap between the concrete and the living space. This prevents humidity transfer and provides a surface that can receive drywall or paneling without risk of mold.</p>
            <h3 className="text-[#273373] font-display">Exterior Drain Tile Replacement</h3>
            <p>When the original footing drain has been compromised by roots or age, we excavate along the affected walls and replace the drain tile with modern perforated pipe in a gravel bed. We also install root barriers where large trees are within 25 feet of the foundation to prevent future root intrusion into the new drainage system.</p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Basement Waterproofing Costs in Roswell</h2>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#273373] text-white"><tr><th className="px-6 py-4 text-left text-sm font-semibold">Service</th><th className="px-6 py-4 text-left text-sm font-semibold">Typical Cost</th><th className="px-6 py-4 text-left text-sm font-semibold hidden sm:table-cell">Timeline</th></tr></thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ['Crack injection (per crack)', '$400 \u2013 $900', '2-4 hours'],
                  ['Interior drainage with sub-slab system', '$5,000 \u2013 $12,000', '2-4 days'],
                  ['High-capacity sump pump with backup', '$2,000 \u2013 $3,500', '1 day'],
                  ['Interior vapor barrier system', '$2,500 \u2013 $5,000', '1-2 days'],
                  ['Exterior drain tile replacement (per wall)', '$3,000 \u2013 $6,000', '2-3 days'],
                  ['Full exterior waterproofing', '$10,000 \u2013 $18,000', '4-6 days'],
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
              { title: 'Foundation Repair', href: '/foundation-repair/roswell', desc: 'Water intrusion accelerates foundation damage. Address both to protect your Roswell home long-term.' },
              { title: 'Drainage Solutions', href: '/drainage', desc: 'Surface and subsurface drainage to reduce the water volume reaching your basement walls.' },
              { title: 'Crawl Space Encapsulation', href: '/crawl-space-encapsulation', desc: 'For Roswell homes with crawl spaces, encapsulation controls moisture from both ground and air sources.' },
            ].map((s, i) => (<Link key={i} href={s.href} className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow group"><h3 className="font-semibold text-[#273373] mb-2 group-hover:text-[#115997] transition-colors">{s.title}</h3><p className="text-gray-600 text-sm">{s.desc}</p></Link>))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#273373] mb-6 font-display">Learn More About Basement Waterproofing</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: 'Basement Waterproofing Cost in Atlanta', href: '/blog/basement-waterproofing-cost-atlanta' },
              { title: 'Interior vs Exterior Basement Waterproofing', href: '/blog/interior-vs-exterior-basement-waterproofing' },
              { title: 'Basement Waterproofing vs Damp Proofing', href: '/blog/basement-waterproofing-vs-damp-proofing' },
              { title: 'How to Choose a Waterproofing Contractor', href: '/blog/how-to-choose-waterproofing-contractor-atlanta' },
            ].map((p, i) => (<Link key={i} href={p.href} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"><svg className="w-5 h-5 text-[#115997] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg><span className="text-sm font-medium text-gray-800">{p.title}</span></Link>))}
          </div>
        </div>
      </section>

      <section className="py-8 bg-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-gray-500 mb-4"><Link href="/" className="hover:text-[#115997]">Home</Link> {' / '}<Link href="/basement-waterproofing" className="hover:text-[#115997]">Basement Waterproofing</Link> {' / '}<span className="text-gray-700">Roswell</span></p>
          <p className="text-sm text-gray-500">Basement waterproofing also available in <Link href="/basement-waterproofing/lawrenceville" className="text-[#115997] hover:underline">Lawrenceville</Link>, <Link href="/basement-waterproofing/marietta" className="text-[#115997] hover:underline">Marietta</Link>, <Link href="/basement-waterproofing/alpharetta" className="text-[#115997] hover:underline">Alpharetta</Link>, <Link href="/basement-waterproofing/decatur" className="text-[#115997] hover:underline">Decatur</Link>, <Link href="/basement-waterproofing/sandy-springs" className="text-[#115997] hover:underline">Sandy Springs</Link>, and <Link href="/basement-waterproofing/stone-mountain" className="text-[#115997] hover:underline">Stone Mountain</Link>.</p>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-[#115997]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 font-display">Free Basement Inspection in Roswell</h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">Protect your Roswell home's value with a professional basement inspection. We identify the water source, recommend the right solution, and give you a clear written estimate. No obligation, no sales pressure.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#273373] font-bold rounded-xl hover:bg-gray-100 transition-colors text-lg">Schedule Free Inspection</Link>
            <a href="tel:+17708952039" className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-colors text-lg">Call (770) 895-2039</a>
          </div>
          <p className="text-white/50 text-sm mt-6">BBB A+ Accredited \u00b7 IICRC Certified \u00b7 20+ Years Experience \u00b7 Financing Available</p>
        </div>
      </section>
    </>
  )
}