import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export const metadata = {
  title: 'Foundation Repair in Sandy Springs, GA | Free Inspection | Reliable Solutions Atlanta',
  description: 'Foundation repair in Sandy Springs, GA. Expert service for 1960s-1980s ranches and split-levels. Pier installation, wall repair, crack injection. Free inspection. 770-895-2039.',
  keywords: 'foundation repair Sandy Springs GA, foundation repair Sandy Springs Georgia, foundation crack repair Sandy Springs, foundation settling Sandy Springs',
  openGraph: { title: 'Foundation Repair in Sandy Springs, GA | Reliable Solutions Atlanta', description: 'Foundation repair for Sandy Springs homes. Free inspections, permanent solutions. 770-895-2039.', url: 'https://www.waterhelpme.com/foundation-repair/sandy-springs', type: 'website' },
  alternates: { canonical: 'https://www.waterhelpme.com/foundation-repair/sandy-springs' },
}

const faqs = [
  { question: 'How much does foundation repair cost in Sandy Springs, GA?', answer: 'Foundation repair in Sandy Springs typically costs between $3,000 and $10,000 for residential projects. Homes with walk-out basements on hillsides tend to cost more due to lateral pressure repairs. Simple crack injection starts at $400. Full stabilization with piers and wall reinforcement can reach $12,000 to $16,000 for larger homes.' },
  { question: 'Why do Sandy Springs split-levels have foundation problems?', answer: 'Split-level homes have multiple foundation sections at different elevations. Each section settles independently, and the joints where sections meet are stress points. Sandy Springs has a high concentration of split-levels built in the 1960s and 1970s on sloped lots, and after 50+ years the differential settling between sections becomes significant.' },
  { question: 'Does the hilly terrain in Sandy Springs cause foundation issues?', answer: 'Yes. Sandy Springs has some of the most varied topography in the inner suburbs. Homes on slopes experience uneven soil pressure — the uphill side pushes against the foundation while the downhill side has less support. Water runoff from higher elevations saturates the uphill soil seasonally, adding hydrostatic pressure that pushes basement walls inward.' },
  { question: 'Will foundation problems affect my Sandy Springs home sale?', answer: 'Foundation issues are one of the top deal-killers in the Sandy Springs real estate market. Buyers in this price range always get professional inspections, and foundation concerns can reduce offers by $15,000 to $40,000 or cause buyers to walk. A repaired foundation with transferable warranty actually becomes a selling point.' },
  { question: 'How long does foundation repair take in Sandy Springs?', answer: 'Most Sandy Springs foundation repairs are completed in 2 to 4 days. Simple crack repairs take a single day. Wall stabilization with carbon fiber or anchors takes 1 to 2 days. Full pier installation with wall repair may take 3 to 5 days for larger homes with multiple issues.' },
]

export default function FoundationRepairSandySprings() {
  const jsonLd = { '@context': 'https://schema.org', '@type': 'Service', name: 'Foundation Repair in Sandy Springs, GA', provider: { '@type': 'LocalBusiness', name: 'Reliable Solutions Atlanta', telephone: '+17708952039', url: 'https://www.waterhelpme.com', address: { '@type': 'PostalAddress', addressLocality: 'Sandy Springs', addressRegion: 'GA', addressCountry: 'US' }, areaServed: { '@type': 'City', name: 'Sandy Springs', containedIn: 'Fulton County, GA' } }, serviceType: 'Foundation Repair' }
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
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 font-display leading-tight">Foundation Repair in Sandy Springs, GA</h1>
            <p className="text-white/80 text-lg sm:text-xl mb-8 leading-relaxed max-w-2xl">
              Foundation repair in Sandy Springs typically costs between $3,000 and $10,000 for residential homes. Reliable Solutions Atlanta has extensive experience with the 1960s-1980s ranches, split-levels, and colonials that define Sandy Springs neighborhoods. Free same-week inspections with photo documentation and written estimates.
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
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Why Sandy Springs Homes Develop Foundation Problems</h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p>Sandy Springs occupies a unique position in metro Atlanta's housing landscape. Incorporated as its own city in 2005, Sandy Springs has a housing stock that is predominantly from the 1960s, 1970s, and 1980s. The neighborhoods along Roswell Road, Riverside Drive, Mount Vernon Highway, and the Chattahoochee corridor contain thousands of ranch homes, split-level homes, and traditional colonials that are now 40 to 60 years old.</p>
            <p>The terrain in Sandy Springs is notably hilly, particularly in the western half of the city near the Chattahoochee River and along the Powers Ferry corridor. Builders in the 1960s and 1970s adapted to this terrain by building split-level and tri-level homes that step down hillsides. While this was an efficient use of sloped lots, it created foundation configurations with multiple elevation changes and stress points at every transition.</p>
            <p>The soil in Sandy Springs is a mix of Georgia red clay and decomposed granite. The clay component behaves the same as elsewhere in metro Atlanta — expanding when wet, contracting when dry. But the granite decomposition layer creates pockets of loose, sandy material that can wash out from beneath foundations during heavy rainfall. This is particularly common along the river corridor and in neighborhoods with significant grade changes.</p>
            <p>Sandy Springs also has a high rate of home turnover. Families buy older homes, renovate them, and flip them or sell them after a few years. Every real estate transaction triggers a professional home inspection, and foundation issues are flagged immediately. We see a significant number of calls from homeowners who are preparing to sell and need to resolve inspection findings, or from buyers who want a professional assessment before closing.</p>
            <p>The 30328, 30342, and 30350 zip codes are where we perform the most foundation work in Sandy Springs.</p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Signs Your Sandy Springs Home Needs Foundation Repair</h2>
          <p className="text-gray-700 text-lg mb-8">Sandy Springs homes from the 1960s-1980s show foundation distress in ways that are often mistaken for normal aging. These are not cosmetic issues.</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: 'Cracks at split-level transitions', desc: 'Where one section of a split-level meets another, the wall and floor are under stress from two independently moving foundation sections. Cracking at these transitions is the most common foundation problem in Sandy Springs.' },
              { title: 'Basement wall bowing on uphill side', desc: 'Walk-out basements on sloped lots receive soil pressure from the uphill side. After decades, this constant lateral force causes the wall to bow inward. Even a half-inch of inward movement indicates the need for stabilization.' },
              { title: 'Garage slab pulling away from house', desc: 'In Sandy Springs ranches with attached garages, the garage slab often settles independently from the main foundation. A visible gap or step between the garage floor and the house floor indicates differential settling.' },
              { title: 'Water staining on basement walls', desc: 'White mineral deposits (efflorescence) or brown staining on block basement walls indicates water is penetrating through cracks in the foundation. The water carries minerals through the wall as it passes, leaving visible deposits.' },
              { title: 'Cracked exterior brick at corners', desc: 'Brick veneer on Sandy Springs colonials and ranches tends to crack first at the building corners where two foundation walls meet. Corner cracking indicates one wall is settling while the adjacent wall is not.' },
              { title: 'Sticking sliding glass doors', desc: 'Many Sandy Springs ranches and split-levels have sliding glass doors to rear patios and decks. When the foundation shifts, the door frame racks and the heavy glass panel binds in the track. This is a reliable early indicator.' },
            ].map((sign, i) => (
              <div key={i} className="bg-white rounded-xl p-5 shadow-sm"><h3 className="font-semibold text-[#273373] text-base mb-2">{sign.title}</h3><p className="text-gray-600 text-sm leading-relaxed">{sign.desc}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">How We Repair Foundations in Sandy Springs</h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <h3 className="text-[#273373] font-display">Split-Level Foundation Repair</h3>
            <p>Split-level repairs require understanding how the different foundation sections interact. We stabilize each section independently using piers sized for that section's load, then address the transition joints between sections. This prevents one section from pulling another as it moves, which is the primary failure mode in Sandy Springs split-levels.</p>
            <h3 className="text-[#273373] font-display">Basement Wall Stabilization</h3>
            <p>For walk-out basements on Sandy Springs hillside lots, we use either carbon fiber straps for minor bowing (under 1 inch), wall anchors for moderate bowing (1 to 2 inches), or a combination approach for more severe cases. Wall anchors are installed by excavating small access points in the yard uphill of the basement, placing anchor plates in stable soil, and connecting them to the interior wall with steel rods that can be progressively tightened.</p>
            <h3 className="text-[#273373] font-display">Helical Piers for Settling Foundations</h3>
            <p>Sandy Springs' mix of clay and decomposed granite means pier depth is variable. We monitor torque readings during installation to verify each pier has reached competent bearing soil. In areas near the Chattahoochee where the granite layer is close to the surface, piers may only need to go 8 to 12 feet. In pure clay areas farther from the river, piers may need 20+ feet of depth.</p>
            <h3 className="text-[#273373] font-display">Pre-Sale Foundation Certification</h3>
            <p>For Sandy Springs homeowners preparing to sell, we offer foundation inspections with detailed reports that can be shared with buyers and their agents. If repair is needed, we provide a clear scope and timeline that fits within a typical closing schedule. If the foundation is sound, we provide documentation that supports the listing.</p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Foundation Repair Costs in Sandy Springs</h2>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#273373] text-white"><tr><th className="px-6 py-4 text-left text-sm font-semibold">Repair Type</th><th className="px-6 py-4 text-left text-sm font-semibold">Typical Cost</th><th className="px-6 py-4 text-left text-sm font-semibold hidden sm:table-cell">Timeline</th></tr></thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ['Crack injection (per crack)', '$400 – $800', '2-4 hours'],
                  ['Carbon fiber wall straps (per wall)', '$1,500 – $3,500', '1 day'],
                  ['Wall anchor system (per anchor)', '$900 – $1,600', '1 day'],
                  ['Helical piers (per pier)', '$1,200 – $2,000', '1-2 days'],
                  ['Split-level transition repair', '$2,000 – $5,000', '1-2 days'],
                  ['Full stabilization (piers + walls)', '$8,000 – $16,000', '3-5 days'],
                ].map(([r, c, t], i) => (<tr key={i} className="hover:bg-gray-50"><td className="px-6 py-4 text-sm text-gray-900">{r}</td><td className="px-6 py-4 text-sm font-semibold text-[#115997]">{c}</td><td className="px-6 py-4 text-sm text-gray-500 hidden sm:table-cell">{t}</td></tr>))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mt-4">Financing available through GreenSky. Transferable warranty included with all structural repairs.</p>
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
              { title: 'Basement Waterproofing', href: '/basement-waterproofing', desc: 'Stop water intrusion in Sandy Springs walk-out basements that accelerates foundation damage.' },
              { title: 'Drainage Solutions', href: '/drainage', desc: 'French drains and grading corrections for Sandy Springs hillside lots where runoff threatens foundations.' },
              { title: 'Crawl Space Waterproofing', href: '/crawl-space-waterproofing', desc: 'Protect crawl space foundations from moisture damage in older Sandy Springs ranches.' },
            ].map((s, i) => (<Link key={i} href={s.href} className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow group"><h3 className="font-semibold text-[#273373] mb-2 group-hover:text-[#115997] transition-colors">{s.title}</h3><p className="text-gray-600 text-sm">{s.desc}</p></Link>))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#273373] mb-6 font-display">Learn More About Foundation Repair</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: 'Foundation Repair Cost in Atlanta: Complete Guide', href: '/blog/foundation-repair-cost-atlanta' },
              { title: 'Signs of Foundation Settling vs Structural Damage', href: '/blog/signs-foundation-settling-vs-structural-damage' },
              { title: 'Foundation Crack Types and What They Mean', href: '/blog/foundation-crack-types-atlanta' },
              { title: 'Foundation Maintenance Seasonal Checklist', href: '/blog/foundation-maintenance-seasonal-checklist' },
            ].map((p, i) => (<Link key={i} href={p.href} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"><svg className="w-5 h-5 text-[#115997] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg><span className="text-sm font-medium text-gray-800">{p.title}</span></Link>))}
          </div>
        </div>
      </section>

      <section className="py-8 bg-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-gray-500 mb-4"><Link href="/" className="hover:text-[#115997]">Home</Link> {' / '}<Link href="/foundation-repair" className="hover:text-[#115997]">Foundation Repair</Link> {' / '}<span className="text-gray-700">Sandy Springs</span></p>
          <p className="text-sm text-gray-500">Foundation repair also available in <Link href="/foundation-repair/lawrenceville" className="text-[#115997] hover:underline">Lawrenceville</Link>, <Link href="/foundation-repair/marietta" className="text-[#115997] hover:underline">Marietta</Link>, <Link href="/foundation-repair/roswell" className="text-[#115997] hover:underline">Roswell</Link>, <Link href="/foundation-repair/alpharetta" className="text-[#115997] hover:underline">Alpharetta</Link>, <Link href="/foundation-repair/decatur" className="text-[#115997] hover:underline">Decatur</Link>, and <Link href="/foundation-repair/stone-mountain" className="text-[#115997] hover:underline">Stone Mountain</Link>.</p>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-[#115997]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 font-display">Free Foundation Inspection in Sandy Springs</h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">Selling, buying, or just concerned about your Sandy Springs home's foundation? We will inspect it, document everything with photos, and give you a clear written estimate. No sales pressure.</p>
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