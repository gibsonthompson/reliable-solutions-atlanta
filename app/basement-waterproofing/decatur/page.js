import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export const metadata = {
  title: 'Basement Waterproofing in Decatur, GA | Free Inspection | Reliable Solutions Atlanta',
  description: 'Basement waterproofing in Decatur, GA. Specialists in historic home basements and crawl space conversions. Interior drainage, exterior membrane, moisture control. Free inspection. 770-895-2039.',
  keywords: 'basement waterproofing Decatur GA, basement waterproofing DeKalb County, wet basement Decatur, basement leak repair Decatur Georgia, historic home waterproofing',
  openGraph: { title: 'Basement Waterproofing in Decatur, GA | Reliable Solutions Atlanta', description: 'Stop water in your Decatur basement. Historic home specialists. Free inspections. 770-895-2039.', url: 'https://www.waterhelpme.com/basement-waterproofing/decatur', type: 'website' },
  alternates: { canonical: 'https://www.waterhelpme.com/basement-waterproofing/decatur' },
}

const faqs = [
  { question: 'How much does basement waterproofing cost in Decatur, GA?', answer: 'Basement waterproofing in Decatur typically costs between $3,500 and $12,000. Historic homes with original stone or block foundations cost more due to the irregularity of the walls and the need for specialized approaches. Interior drainage systems start around $3,500. Full exterior excavation and membrane work ranges from $10,000 to $18,000.' },
  { question: 'Can you waterproof an old stone foundation basement in Decatur?', answer: 'Yes. We specialize in the stacked stone and rubble stone foundations found in Decatur homes built before 1940. These foundations require different techniques than modern poured concrete. We use interior drainage combined with a dimpled membrane that spans the irregular wall surface, creating a drainage plane that channels water to the perimeter drain.' },
  { question: 'Why is my Decatur basement wet even when it has not rained?', answer: 'Decatur has dense tree canopy that traps ground moisture and prevents evaporation. The soil around older homes stays damp much longer than in open areas. Additionally, old stone and block foundations are porous enough to admit moisture vapor continuously. High ambient soil moisture combined with porous walls means the basement stays wet regardless of recent rainfall.' },
  { question: 'Should I waterproof before finishing my Decatur basement?', answer: 'Absolutely. Decatur bungalows and craftsmen homes with dry basements are in high demand and command premium prices. But finishing a wet basement without waterproofing first guarantees mold behind drywall within a year or two. Waterproof first, verify dryness through multiple rain cycles, then finish with confidence.' },
  { question: 'Will waterproofing my Decatur basement reduce radon?', answer: 'A sealed and waterproofed basement with a sump pump system can help reduce radon levels because the drainage system provides a pathway for soil gases to vent. However, a dedicated radon mitigation system may still be needed. We can coordinate with radon specialists during the waterproofing project to integrate both systems.' },
]

export default function BasementWaterproofingDecatur() {
  const jsonLd = { '@context': 'https://schema.org', '@type': 'Service', name: 'Basement Waterproofing in Decatur, GA', provider: { '@type': 'LocalBusiness', name: 'Reliable Solutions Atlanta', telephone: '+17708952039', url: 'https://www.waterhelpme.com', address: { '@type': 'PostalAddress', addressLocality: 'Decatur', addressRegion: 'GA', addressCountry: 'US' }, areaServed: { '@type': 'City', name: 'Decatur', containedIn: 'DeKalb County, GA' } }, serviceType: 'Basement Waterproofing' }
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
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 font-display leading-tight">Basement Waterproofing in Decatur, GA</h1>
            <p className="text-white/80 text-lg sm:text-xl mb-8 leading-relaxed max-w-2xl">Basement waterproofing in Decatur typically costs between $3,500 and $12,000 depending on the age and foundation type. Reliable Solutions Atlanta specializes in the unique challenges of Decatur's historic homes, including original stone foundations, century-old block walls, and basements that were never designed with modern waterproofing. Free same-week inspections.</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white text-[#273373] font-bold rounded-xl hover:bg-gray-100 transition-colors">Schedule Free Inspection</Link>
              <a href="tel:+17708952039" className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-transparent border-2 border-white/30 text-white font-bold rounded-xl hover:bg-white/10 transition-colors">(770) 895-2039</a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Why Decatur Basements Have Water Problems</h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p>Decatur has the most challenging basement waterproofing conditions in metro Atlanta because it has the oldest housing stock. The neighborhoods surrounding the Decatur Square — Oakhurst, Winnona Park, Great Lakes, MAK District, and the Clairemont Avenue corridor — contain homes built from the early 1900s through the 1940s. These homes have basements and partial basements that were constructed with materials and methods that predate modern waterproofing entirely.</p>
            <p>Original Decatur basements were built with stacked fieldstone, rubble stone, hand-laid brick, or early unreinforced concrete block. None of these materials are waterproof. They were built with the expectation that basements would be utility spaces — root cellars, coal rooms, mechanical areas — not living space. Water entry was considered normal, and the dirt floors common in original Decatur basements were expected to absorb it.</p>
            <p>Over the past two decades, Decatur's real estate market has driven homeowners to convert these basements into usable space. But finishing a basement that was never waterproofed leads to predictable problems: mold behind drywall, ruined carpet, damaged stored belongings, and eventually structural damage to the framing that contacts the wet foundation.</p>
            <p>The tree canopy that makes Decatur neighborhoods so desirable also keeps the soil around foundations perpetually damp. Mature oaks, poplars, and pines shade the ground from drying sunlight, and their leaf litter creates organic soil layers that hold moisture like a sponge. The 30030, 30032, and 30033 zip codes have some of the highest canopy coverage percentages in metro Atlanta, which directly correlates to higher basement moisture levels.</p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Signs Your Decatur Basement Needs Waterproofing</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: 'Water seeping through stone or block walls', desc: 'Original stone and block foundations in Decatur are porous by nature. You may see actual water weeping through mortar joints, between stones, or through the faces of deteriorated blocks during and after rain.' },
              { title: 'Damp dirt floor in unfinished basement', desc: 'Many original Decatur basements still have dirt floors or thin concrete that was poured over dirt decades ago. Standing moisture on the surface or a perpetually damp feel indicates groundwater is actively pushing upward.' },
              { title: 'White mineral staining on old brick or stone', desc: 'Heavy efflorescence on original masonry walls indicates decades of water migration through the foundation. In Decatur homes, this staining can be inches thick in severe cases.' },
              { title: 'Mold or mildew on basement walls and ceiling', desc: 'The combination of porous walls, dense canopy moisture, and poor ventilation creates ideal mold conditions. Black or green growth on walls, ceiling joists, and stored items is common in un-waterproofed Decatur basements.' },
              { title: 'Peeling paint or crumbling mortar', desc: 'Mortar between stones or blocks that crumbles when touched has been saturated and dried thousands of times. Paint that peels in sheets indicates moisture is pushing through from behind. Both are signs the wall needs protection.' },
              { title: 'Rust on mechanical equipment', desc: 'Furnaces, water heaters, and electrical panels in damp Decatur basements develop rust prematurely. If your basement mechanical equipment is corroding, the humidity level is high enough to cause long-term structural damage as well.' },
            ].map((sign, i) => (
              <div key={i} className="bg-white rounded-xl p-5 shadow-sm"><h3 className="font-semibold text-[#273373] text-base mb-2">{sign.title}</h3><p className="text-gray-600 text-sm leading-relaxed">{sign.desc}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">How We Waterproof Basements in Decatur</h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <h3 className="text-[#273373] font-display">Dimpled Membrane Wall System</h3>
            <p>For Decatur's irregular stone and block walls, we install a dimpled HDPE membrane on the interior wall surface. The dimples create an air gap that allows water to drain freely down the wall face into the perimeter drain without touching the living space. This system does not require the wall surface to be smooth or uniform, making it ideal for the rough fieldstone foundations common in Oakhurst and Winnona Park homes.</p>
            <h3 className="text-[#273373] font-display">Interior French Drain with Concrete Floor</h3>
            <p>For basements with dirt floors or deteriorated thin concrete, we install a full interior French drain system and pour a new concrete floor. The drain channel sits in gravel beneath the new slab, collecting water that enters through the walls and from below. This transforms an unusable dirt-floor basement into a clean, dry space with a proper concrete floor.</p>
            <h3 className="text-[#273373] font-display">Exterior Excavation and Membrane</h3>
            <p>When feasible around Decatur homes, exterior waterproofing provides the most complete protection. We excavate to the footer, repoint or parge deteriorated mortar joints, apply a waterproof membrane, install drainage board, and replace the footer drain. For historic homes, we take care to protect original landscaping and coordinate with any historic district requirements.</p>
            <h3 className="text-[#273373] font-display">Dehumidification System</h3>
            <p>Even after stopping active water entry, Decatur's ambient soil moisture means vapor will continue to pass through old masonry for years. We install commercial-grade dehumidifiers that maintain 45-50% humidity, which prevents mold growth and protects anything stored or built in the basement.</p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Basement Waterproofing Costs in Decatur</h2>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#273373] text-white"><tr><th className="px-6 py-4 text-left text-sm font-semibold">Service</th><th className="px-6 py-4 text-left text-sm font-semibold">Typical Cost</th><th className="px-6 py-4 text-left text-sm font-semibold hidden sm:table-cell">Timeline</th></tr></thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ['Dimpled membrane wall system', '$3,000 – $6,000', '1-2 days'],
                  ['Interior drain + new concrete floor', '$5,000 – $12,000', '3-5 days'],
                  ['Sump pump with battery backup', '$1,500 – $3,000', '1 day'],
                  ['Exterior excavation + membrane', '$10,000 – $18,000', '4-6 days'],
                  ['Mortar repointing (per wall)', '$1,500 – $3,500', '1-2 days'],
                  ['Commercial dehumidifier installation', '$1,000 – $2,000', 'Same day'],
                ].map(([r, c, t], i) => (<tr key={i} className="hover:bg-gray-50"><td className="px-6 py-4 text-sm text-gray-900">{r}</td><td className="px-6 py-4 text-sm font-semibold text-[#115997]">{c}</td><td className="px-6 py-4 text-sm text-gray-500 hidden sm:table-cell">{t}</td></tr>))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mt-4">Financing available through GreenSky. All waterproofing work includes transferable warranty.</p>
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
              { title: 'Foundation Repair', href: '/foundation-repair/decatur', desc: 'Historic Decatur foundations need structural repair alongside waterproofing for a complete solution.' },
              { title: 'Crawl Space Encapsulation', href: '/crawl-space-encapsulation', desc: 'Many Decatur bungalows have crawl spaces. Full encapsulation controls moisture at the source.' },
              { title: 'Drainage Solutions', href: '/drainage', desc: 'Surface drainage to redirect water away from your Decatur foundation and reduce soil saturation.' },
            ].map((s, i) => (<Link key={i} href={s.href} className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow group"><h3 className="font-semibold text-[#273373] mb-2 group-hover:text-[#115997] transition-colors">{s.title}</h3><p className="text-gray-600 text-sm">{s.desc}</p></Link>))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#273373] mb-6 font-display">Learn More About Basement Waterproofing</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[{ title: 'Basement Waterproofing Cost in Atlanta', href: '/blog/basement-waterproofing-cost-atlanta' }, { title: 'Basement Waterproofing vs Damp Proofing', href: '/blog/basement-waterproofing-vs-damp-proofing' }, { title: 'Interior vs Exterior Basement Waterproofing', href: '/blog/interior-vs-exterior-basement-waterproofing' }, { title: 'Crawl Space Mold: Signs and Solutions', href: '/blog/crawl-space-mold-signs' }].map((p, i) => (<Link key={i} href={p.href} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"><svg className="w-5 h-5 text-[#115997] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg><span className="text-sm font-medium text-gray-800">{p.title}</span></Link>))}
          </div>
        </div>
      </section>

      <section className="py-8 bg-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-gray-500 mb-4"><Link href="/" className="hover:text-[#115997]">Home</Link> {' / '}<Link href="/basement-waterproofing" className="hover:text-[#115997]">Basement Waterproofing</Link> {' / '}<span className="text-gray-700">Decatur</span></p>
          <p className="text-sm text-gray-500">Basement waterproofing also available in <Link href="/basement-waterproofing/lawrenceville" className="text-[#115997] hover:underline">Lawrenceville</Link>, <Link href="/basement-waterproofing/marietta" className="text-[#115997] hover:underline">Marietta</Link>, <Link href="/basement-waterproofing/roswell" className="text-[#115997] hover:underline">Roswell</Link>, <Link href="/basement-waterproofing/alpharetta" className="text-[#115997] hover:underline">Alpharetta</Link>, <Link href="/basement-waterproofing/sandy-springs" className="text-[#115997] hover:underline">Sandy Springs</Link>, and <Link href="/basement-waterproofing/stone-mountain" className="text-[#115997] hover:underline">Stone Mountain</Link>.</p>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-[#115997]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 font-display">Free Basement Inspection in Decatur</h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">Whether your Decatur home was built in 1920 or 2020, we understand the construction methods and the waterproofing solutions that work for each. Free inspection with honest assessment and written estimate.</p>
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