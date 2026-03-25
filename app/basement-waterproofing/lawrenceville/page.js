import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export const metadata = {
  title: 'Basement Waterproofing in Lawrenceville, GA | Free Inspection | Reliable Solutions Atlanta',
  description: 'Basement waterproofing in Lawrenceville, GA. Interior drainage, sump pumps, and exterior waterproofing for Gwinnett County homes. Most projects $3,000-$8,000. Free inspection. 770-895-2039.',
  keywords: 'basement waterproofing Lawrenceville GA, basement waterproofing Gwinnett County, wet basement Lawrenceville, basement leak repair Lawrenceville Georgia',
  openGraph: { title: 'Basement Waterproofing in Lawrenceville, GA | Reliable Solutions Atlanta', description: 'Stop basement water damage in your Lawrenceville home. Interior drainage, sump pumps, crack sealing. Free inspection. 770-895-2039.', url: 'https://www.waterhelpme.com/basement-waterproofing/lawrenceville', type: 'website' },
  alternates: { canonical: 'https://www.waterhelpme.com/basement-waterproofing/lawrenceville' },
}

const faqs = [
  { question: 'How much does basement waterproofing cost in Lawrenceville, GA?', answer: 'Basement waterproofing in Lawrenceville typically costs between $3,000 and $8,000 for interior drainage systems. Crack injection starts at $400 per crack. Exterior waterproofing with membrane installation ranges from $8,000 to $15,000. Sump pump installation costs $1,500 to $3,000 including battery backup.' },
  { question: 'Why does my Lawrenceville basement leak when it rains?', answer: 'Lawrenceville sits on heavy Georgia red clay that does not drain well. When it rains, the clay around your foundation becomes saturated and creates hydrostatic pressure against the basement walls. Water pushes through any crack, joint, or porous section of the concrete. The volume of rain metro Atlanta receives — over 50 inches annually — means this pressure builds multiple times per year.' },
  { question: 'Is interior or exterior waterproofing better for Lawrenceville homes?', answer: 'For most Lawrenceville homes built in the 1980s through 2000s, interior drainage systems are the most cost-effective solution. They intercept water that enters through the wall-floor joint and channel it to a sump pump. Exterior waterproofing is more thorough but costs significantly more and requires excavation around the entire foundation.' },
  { question: 'Will basement waterproofing increase my Lawrenceville home value?', answer: 'Yes. A dry basement with a professionally installed waterproofing system adds usable square footage and eliminates a major concern for buyers. In the Gwinnett County market, basement water issues are one of the most common reasons buyers negotiate lower prices or walk away from deals.' },
  { question: 'How long does basement waterproofing take in Lawrenceville?', answer: 'Interior drainage system installation typically takes 2 to 3 days. Crack injection is completed in a single day. Exterior waterproofing takes 3 to 5 days depending on the home size and landscaping. Your home remains livable throughout all types of waterproofing work.' },
]

export default function BasementWaterproofingLawrenceville() {
  const jsonLd = { '@context': 'https://schema.org', '@type': 'Service', name: 'Basement Waterproofing in Lawrenceville, GA', provider: { '@type': 'LocalBusiness', name: 'Reliable Solutions Atlanta', telephone: '+17708952039', url: 'https://www.waterhelpme.com', address: { '@type': 'PostalAddress', addressLocality: 'Lawrenceville', addressRegion: 'GA', addressCountry: 'US' }, areaServed: { '@type': 'City', name: 'Lawrenceville', containedIn: 'Gwinnett County, GA' } }, serviceType: 'Basement Waterproofing' }
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
            <p className="text-white/70 text-sm font-medium mb-3 uppercase tracking-wider">Gwinnett County, Georgia</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 font-display leading-tight">Basement Waterproofing in Lawrenceville, GA</h1>
            <p className="text-white/80 text-lg sm:text-xl mb-8 leading-relaxed max-w-2xl">
              Basement waterproofing in Lawrenceville typically costs between $3,000 and $8,000 for interior drainage systems. Reliable Solutions Atlanta stops basement leaks permanently with interior drainage, sump pump installation, crack injection, and exterior waterproofing. Free same-week inspections for Gwinnett County homeowners.
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
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Why Lawrenceville Basements Have Water Problems</h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p>Lawrenceville receives over 50 inches of rainfall per year, and the heavy Georgia red clay surrounding Gwinnett County homes is one of the worst soil types for natural drainage. Unlike sandy or loamy soils that absorb and channel water away from structures, red clay becomes a waterlogged barrier that traps moisture against basement walls for days after each rain event.</p>
            <p>The subdivisions built during Gwinnett County's rapid growth period from the 1980s through early 2000s — including areas around Sugarloaf Parkway, Collins Hill, and the 30043 and 30044 zip codes — often have basements that were finished without adequate waterproofing. Builders during this era typically applied a thin coat of damproofing to the exterior walls, which is a moisture-resistant coating, not a true waterproof membrane. After 20 to 30 years, this coating has deteriorated, leaving the bare concrete or block wall exposed to hydrostatic pressure.</p>
            <p>The grading around many Lawrenceville homes has also settled over the decades. Soil that was originally sloped away from the foundation has compacted and in some cases reversed, directing surface water toward the basement walls instead of away from them. Combined with gutters that overflow or downspouts that discharge too close to the foundation, the soil around the basement stays saturated for extended periods after each storm.</p>
            <p>We see the heaviest basement water activity in Lawrenceville during spring (March through May) when frequent rains saturate already-moist winter soil, and during late summer tropical weather events that dump large volumes of water in short periods. However, any significant rain can cause water entry in a basement that lacks proper waterproofing.</p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Signs Your Lawrenceville Basement Needs Waterproofing</h2>
          <p className="text-gray-700 text-lg mb-8">Many homeowners live with these signs for years, assuming they are normal. They are not — and they get worse over time.</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: 'Water on the floor after rain', desc: 'Even small amounts of water on the basement floor after rain indicate hydrostatic pressure is forcing water through the wall-floor joint. This will increase over time as the original damproofing continues to deteriorate.' },
              { title: 'White mineral deposits on walls', desc: 'Efflorescence — a white, chalky residue on basement walls — forms when water passes through the concrete and evaporates, leaving dissolved minerals behind. It means water is actively penetrating your walls even if you do not see puddles.' },
              { title: 'Musty or damp smell', desc: 'A persistent musty odor in the basement indicates elevated humidity and likely hidden mold growth. Even without visible water, moisture vapor passing through unprotected concrete raises humidity levels enough to support mold.' },
              { title: 'Cracks in basement walls or floor', desc: 'Cracks are entry points for water. Even hairline cracks in poured concrete walls will admit water under hydrostatic pressure. Cracks in the floor slab indicate the water table is pushing upward beneath the foundation.' },
              { title: 'Damp or peeling drywall', desc: 'If your basement is finished, water shows up as damp spots on drywall, peeling paint, or bubbling tape joints. By the time these signs appear, water has been behind the wall long enough to cause structural damage and mold growth.' },
              { title: 'Mold on stored items', desc: 'Cardboard boxes, clothing, and wood furniture stored in the basement developing mold or mildew is a clear sign that humidity levels are too high. A waterproofed basement with proper drainage maintains humidity levels that prevent this.' },
            ].map((sign, i) => (
              <div key={i} className="bg-white rounded-xl p-5 shadow-sm"><h3 className="font-semibold text-[#273373] text-base mb-2">{sign.title}</h3><p className="text-gray-600 text-sm leading-relaxed">{sign.desc}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">How We Waterproof Basements in Lawrenceville</h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <h3 className="text-[#273373] font-display">Interior French Drain System</h3>
            <p>Our most common solution for Lawrenceville basements. We cut a narrow channel along the interior perimeter of the basement floor, install a perforated drain pipe embedded in washed gravel, and route it to a sump pump pit. Water that enters through the wall-floor joint or weeps through the walls is intercepted before it reaches the living space and pumped out through a discharge line directed away from the foundation. This system works with the hydrostatic pressure rather than trying to fight it.</p>
            <h3 className="text-[#273373] font-display">Sump Pump Installation</h3>
            <p>Every interior drainage system includes a primary sump pump and we strongly recommend a battery backup system. Lawrenceville storms frequently cause power outages, and the worst time for your pump to stop working is during the exact storm that is creating the most water pressure. Our battery backup systems provide 8 to 12 hours of pumping capacity during power failures.</p>
            <h3 className="text-[#273373] font-display">Wall Crack Injection</h3>
            <p>Individual cracks in poured concrete walls are sealed with polyurethane injection. The material is injected under pressure from the interior, filling the crack from inside to outside. Polyurethane remains flexible after curing, which is important in the Lawrenceville clay environment where minor foundation movement from soil expansion and contraction is ongoing.</p>
            <h3 className="text-[#273373] font-display">Exterior Waterproofing</h3>
            <p>For homes with severe water intrusion or deteriorated exterior coatings, we excavate around the foundation, apply a rubberized waterproof membrane to the exterior wall, install drainage board and a new exterior French drain, and backfill with gravel. This is the most comprehensive solution and addresses the water at the source before it reaches the concrete.</p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Basement Waterproofing Costs in Lawrenceville</h2>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#273373] text-white"><tr><th className="px-6 py-4 text-left text-sm font-semibold">Service</th><th className="px-6 py-4 text-left text-sm font-semibold">Typical Cost</th><th className="px-6 py-4 text-left text-sm font-semibold hidden sm:table-cell">Timeline</th></tr></thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ['Crack injection (per crack)', '$400 – $800', '2-4 hours'],
                  ['Sump pump installation with backup', '$1,500 – $3,000', '1 day'],
                  ['Interior French drain (per linear ft)', '$50 – $75', '2-3 days'],
                  ['Full interior drainage system', '$3,000 – $8,000', '2-3 days'],
                  ['Exterior waterproofing (per linear ft)', '$100 – $150', '3-5 days'],
                  ['Full exterior waterproofing', '$8,000 – $15,000', '3-5 days'],
                ].map(([r, c, t], i) => (<tr key={i} className="hover:bg-gray-50"><td className="px-6 py-4 text-sm text-gray-900">{r}</td><td className="px-6 py-4 text-sm font-semibold text-[#115997]">{c}</td><td className="px-6 py-4 text-sm text-gray-500 hidden sm:table-cell">{t}</td></tr>))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mt-4">Financing available through GreenSky with plans starting at 0% interest. Transferable warranty included.</p>
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
          <h2 className="text-2xl font-bold text-[#273373] mb-6 font-display">Related Services in Lawrenceville</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { title: 'Foundation Repair', href: '/foundation-repair/lawrenceville', desc: 'Water damage and foundation damage go hand in hand. Fix both to protect your Lawrenceville home long-term.' },
              { title: 'Drainage Solutions', href: '/drainage', desc: 'Redirect surface water away from your foundation to reduce the hydrostatic pressure causing basement leaks.' },
              { title: 'Crawl Space Waterproofing', href: '/crawl-space-waterproofing', desc: 'For Lawrenceville homes with crawl spaces instead of basements, waterproofing keeps moisture out of the structure.' },
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
              { title: 'Signs You Need Basement Waterproofing', href: '/blog/signs-you-need-basement-waterproofing' },
              { title: 'Basement Waterproofing vs Damp Proofing', href: '/blog/basement-waterproofing-vs-damp-proofing' },
            ].map((p, i) => (<Link key={i} href={p.href} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"><svg className="w-5 h-5 text-[#115997] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg><span className="text-sm font-medium text-gray-800">{p.title}</span></Link>))}
          </div>
        </div>
      </section>

      <section className="py-8 bg-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-gray-500 mb-4"><Link href="/" className="hover:text-[#115997]">Home</Link> {' / '}<Link href="/basement-waterproofing" className="hover:text-[#115997]">Basement Waterproofing</Link> {' / '}<span className="text-gray-700">Lawrenceville</span></p>
          <p className="text-sm text-gray-500">Basement waterproofing also available in <Link href="/basement-waterproofing/marietta" className="text-[#115997] hover:underline">Marietta</Link>, <Link href="/basement-waterproofing/roswell" className="text-[#115997] hover:underline">Roswell</Link>, <Link href="/basement-waterproofing/alpharetta" className="text-[#115997] hover:underline">Alpharetta</Link>, <Link href="/basement-waterproofing/decatur" className="text-[#115997] hover:underline">Decatur</Link>, <Link href="/basement-waterproofing/sandy-springs" className="text-[#115997] hover:underline">Sandy Springs</Link>, and <Link href="/basement-waterproofing/stone-mountain" className="text-[#115997] hover:underline">Stone Mountain</Link>.</p>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-[#115997]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 font-display">Free Basement Inspection in Lawrenceville</h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">We will inspect your Lawrenceville basement, identify where water is entering, and give you a clear plan with pricing. No pressure, no obligation. Just honest answers about what your basement needs.</p>
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