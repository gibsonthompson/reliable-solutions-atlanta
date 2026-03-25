import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export const metadata = {
  title: 'Foundation Repair in Alpharetta, GA | Free Inspection | Reliable Solutions Atlanta',
  description: 'Foundation repair in Alpharetta, GA. Slab repair, pier installation, and crack repair for newer North Fulton homes. Most repairs $2,500-$8,000. Free inspection. 770-895-2039.',
  keywords: 'foundation repair Alpharetta GA, foundation repair North Fulton County, slab foundation repair Alpharetta, foundation settling Alpharetta Georgia',
  openGraph: { title: 'Foundation Repair in Alpharetta, GA | Reliable Solutions Atlanta', description: 'Foundation repair for Alpharetta homes. Even newer homes settle on Georgia clay. Free inspections. 770-895-2039.', url: 'https://www.waterhelpme.com/foundation-repair/alpharetta', type: 'website' },
  alternates: { canonical: 'https://www.waterhelpme.com/foundation-repair/alpharetta' },
}

const faqs = [
  { question: 'Can a new home in Alpharetta have foundation problems?', answer: 'Yes. Many Alpharetta homes built in the 1990s through 2010s are already showing foundation issues. Rapid development meant some builders did not allow adequate time for fill soil compaction. Georgia red clay also naturally settles over time regardless of how well it was compacted. A home that is 10 to 20 years old is in the window where these issues first appear.' },
  { question: 'How much does foundation repair cost in Alpharetta?', answer: 'Foundation repair in Alpharetta typically costs between $2,500 and $8,000 for most residential projects. Slab crack repairs start around $500. Pier installation for settling slabs ranges from $8,000 to $14,000 depending on the number of piers needed. Alpharetta homes on crawl spaces may cost more due to pier access requirements.' },
  { question: 'What causes slab foundations to crack in Alpharetta?', answer: 'Most Alpharetta slab cracks are caused by differential settling. The soil beneath the slab compacts unevenly due to inconsistent moisture levels, poor original compaction, or the natural behavior of Georgia red clay. The slab, which is rigid, cannot flex with the soil movement, so it cracks. Plumbing leaks beneath slabs can also erode supporting soil.' },
  { question: 'Does my Alpharetta builder warranty cover foundation cracks?', answer: 'Most Georgia builder warranties cover structural foundation defects for 10 years. However, many builders classify hairline cracks as cosmetic and exclude them from coverage. If your home is still under warranty, we can provide a professional assessment that documents whether the cracking is structural, which strengthens your warranty claim.' },
  { question: 'How do I prevent foundation problems in my Alpharetta home?', answer: 'Maintain consistent moisture levels around the foundation by keeping gutters clean, extending downspouts at least 6 feet from the house, and watering the foundation perimeter during drought months. Avoid planting large trees within 20 feet of the foundation. Address any plumbing leaks immediately, especially slab-on-grade homes where leaks erode the soil beneath the foundation.' },
]

export default function FoundationRepairAlpharetta() {
  const jsonLd = { '@context': 'https://schema.org', '@type': 'Service', name: 'Foundation Repair in Alpharetta, GA', provider: { '@type': 'LocalBusiness', name: 'Reliable Solutions Atlanta', telephone: '+17708952039', url: 'https://www.waterhelpme.com', address: { '@type': 'PostalAddress', addressLocality: 'Alpharetta', addressRegion: 'GA', addressCountry: 'US' }, areaServed: { '@type': 'City', name: 'Alpharetta', containedIn: 'Fulton County, GA' } }, serviceType: 'Foundation Repair' }
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
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 font-display leading-tight">Foundation Repair in Alpharetta, GA</h1>
            <p className="text-white/80 text-lg sm:text-xl mb-8 leading-relaxed max-w-2xl">
              Foundation repair in Alpharetta typically costs between $2,500 and $8,000 for residential homes. Even newer construction settles on Georgia red clay. Reliable Solutions Atlanta provides free inspections with same-week availability, honest assessments, and permanent repairs with transferable warranty. Over 20 years serving North Fulton County.
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
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Why Alpharetta Homes Develop Foundation Problems</h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p>Alpharetta's foundation challenges are different from older metro Atlanta suburbs because most of the housing stock is relatively new. The explosion of residential development in the 1990s and 2000s transformed Alpharetta from a small town to one of the fastest-growing cities in Georgia. Subdivisions like Windward, Broadwell Oaks, Thornberry, Cambridge, Cogburn Station, and the developments along Old Milton Parkway and Haynes Bridge Road were built during a period when demand outpaced careful construction practices.</p>
            <p>The primary issue is fill soil compaction. When builders grade a lot for construction, they excavate some areas and fill others to create a level building pad. In a market where builders were starting hundreds of homes a year, the fill soil was not always compacted in the thin, controlled layers that prevent future settling. The result is that the fill soil continues to compact under the weight of the house for years after construction, and it does not compact evenly.</p>
            <p>Most Alpharetta homes are built on slab-on-grade foundations, which are rigid concrete pads that cannot flex when the soil beneath them settles unevenly. The slab cracks at its weakest points, which are typically at corners, around plumbing penetrations, and at the junction between the garage slab and the main house slab.</p>
            <p>The 30004, 30005, 30009, and 30022 zip codes encompass the highest volume of foundation work we do in the Alpharetta area. The neighborhoods built between 1995 and 2008 are now in the 15-to-30-year window where deferred settling catches up to the structure.</p>
            <p>Another Alpharetta-specific issue is plumbing-related foundation damage. Slab-on-grade homes have water supply and drain lines running beneath the concrete. When these develop leaks, the water erodes the supporting soil beneath the slab, creating voids that lead to cracking and settling. This is more common in homes with original polybutylene plumbing, which was used extensively in North Fulton during the 1990s.</p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Signs Your Alpharetta Home Needs Foundation Repair</h2>
          <p className="text-gray-700 text-lg mb-8">Because most Alpharetta homes are slab-on-grade construction from the 1990s-2000s, the warning signs differ from older homes on crawl spaces or basements.</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: 'Tile floors cracking or popping up', desc: 'Ceramic and porcelain tile are the first to show slab movement because they are rigid. Cracks running through tiles, grout lines separating, or tiles tenting up indicate the slab beneath has shifted.' },
              { title: 'Diagonal cracks from window and door corners', desc: 'Drywall cracks that radiate diagonally from the upper corners of doors and windows are classic signs of differential settling in slab homes. The slab drops on one side, and the framing above follows.' },
              { title: 'Garage floor slab separating from house', desc: 'A visible gap between the garage slab and the main house slab is common in Alpharetta. The two slabs sit on independently poured footings and settle at different rates, creating a trip hazard and water entry point.' },
              { title: 'Exterior brick veneer cracking', desc: 'Many Alpharetta homes have partial brick veneer on the front elevation. When the slab settles unevenly, the brick cracks along mortar joints. This is structural, not cosmetic, and indicates ongoing movement.' },
              { title: 'Doors not closing flush', desc: 'When the slab tilts, door frames rack out of square. Doors that used to close with a clean click now leave gaps at the top or bottom, or drag against the frame.' },
              { title: 'Unexplained increase in water bill', desc: 'A sudden spike in water usage can indicate a slab leak. The water erodes soil beneath the foundation before you see any surface signs. If your bill jumps without explanation, get both the plumbing and the foundation checked.' },
            ].map((sign, i) => (
              <div key={i} className="bg-white rounded-xl p-5 shadow-sm"><h3 className="font-semibold text-[#273373] text-base mb-2">{sign.title}</h3><p className="text-gray-600 text-sm leading-relaxed">{sign.desc}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">How We Repair Foundations in Alpharetta</h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <h3 className="text-[#273373] font-display">Slab Pier Installation</h3>
            <p>For settling slab foundations, we core small holes through the concrete at calculated points along the foundation perimeter and interior load-bearing walls. Steel piers are driven through these cores down to stable soil, then hydraulic jacks lift the slab back to level. The cores are patched and the home is restored. Most Alpharetta slab pier jobs require 8 to 14 piers and are completed in 2 to 3 days.</p>
            <h3 className="text-[#273373] font-display">Polyurethane Foam Injection</h3>
            <p>For minor slab settlement where the voids beneath the concrete are small, we inject expanding polyurethane foam through dime-sized holes in the slab. The foam fills the void, stabilizes the soil, and lifts the slab. This is less expensive than pier installation and works well for interior slab areas, garage floors, and pool decks common in Alpharetta homes.</p>
            <h3 className="text-[#273373] font-display">Crack Stitching</h3>
            <p>Non-structural slab cracks are repaired with carbon fiber stitching. We route the crack, fill it with structural epoxy, and embed carbon fiber staples across the crack to prevent it from reopening. This restores the structural integrity of the slab at that point and prevents water from penetrating through the crack.</p>
            <h3 className="text-[#273373] font-display">Plumbing Coordination</h3>
            <p>When slab damage is caused by plumbing leaks, we coordinate with licensed plumbers to reroute the leaking lines before performing the foundation repair. Fixing the foundation without fixing the plumbing means the problem returns. We can recommend trusted plumbing contractors in the Alpharetta area who specialize in slab leak repair.</p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Foundation Repair Costs in Alpharetta</h2>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#273373] text-white"><tr><th className="px-6 py-4 text-left text-sm font-semibold">Repair Type</th><th className="px-6 py-4 text-left text-sm font-semibold">Typical Cost</th><th className="px-6 py-4 text-left text-sm font-semibold hidden sm:table-cell">Timeline</th></tr></thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ['Crack repair / stitching (per crack)', '$400 – $800', '2-4 hours'],
                  ['Polyurethane foam injection (per area)', '$1,500 – $3,500', '1 day'],
                  ['Slab piers (per pier)', '$1,200 – $1,800', '1-2 days'],
                  ['Full slab stabilization (8-14 piers)', '$8,000 – $14,000', '2-3 days'],
                  ['Garage slab releveling', '$2,000 – $4,000', '1 day'],
                  ['Crawl space pier replacement', '$2,500 – $5,000', '1-2 days'],
                ].map(([r, c, t], i) => (<tr key={i} className="hover:bg-gray-50"><td className="px-6 py-4 text-sm text-gray-900">{r}</td><td className="px-6 py-4 text-sm font-semibold text-[#115997]">{c}</td><td className="px-6 py-4 text-sm text-gray-500 hidden sm:table-cell">{t}</td></tr>))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mt-4">Financing available through GreenSky with plans starting at 0% interest. All structural repairs include transferable warranty.</p>
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
              { title: 'Drainage Solutions', href: '/drainage', desc: 'Redirect surface water away from your slab foundation to prevent soil erosion and future settling.' },
              { title: 'Concrete Repair', href: '/cocnrete-repair', desc: 'Repair cracked driveways, patios, and pool decks common in Alpharetta subdivisions.' },
              { title: 'Crawl Space Repair', href: '/crawl-space-repair', desc: 'For Alpharetta homes with crawl space foundations, pier replacement and structural repair.' },
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
              { title: 'Why Atlanta Homes Have Foundation Problems', href: '/blog/why-atlanta-homes-have-foundation-problems' },
            ].map((p, i) => (<Link key={i} href={p.href} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"><svg className="w-5 h-5 text-[#115997] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg><span className="text-sm font-medium text-gray-800">{p.title}</span></Link>))}
          </div>
        </div>
      </section>

      <section className="py-8 bg-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-gray-500 mb-4"><Link href="/" className="hover:text-[#115997]">Home</Link> {' / '}<Link href="/foundation-repair" className="hover:text-[#115997]">Foundation Repair</Link> {' / '}<span className="text-gray-700">Alpharetta</span></p>
          <p className="text-sm text-gray-500">Foundation repair also available in <Link href="/foundation-repair/lawrenceville" className="text-[#115997] hover:underline">Lawrenceville</Link>, <Link href="/foundation-repair/marietta" className="text-[#115997] hover:underline">Marietta</Link>, <Link href="/foundation-repair/roswell" className="text-[#115997] hover:underline">Roswell</Link>, <Link href="/foundation-repair/decatur" className="text-[#115997] hover:underline">Decatur</Link>, <Link href="/foundation-repair/sandy-springs" className="text-[#115997] hover:underline">Sandy Springs</Link>, and <Link href="/foundation-repair/stone-mountain" className="text-[#115997] hover:underline">Stone Mountain</Link>.</p>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-[#115997]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 font-display">Free Foundation Inspection in Alpharetta</h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">New home or not, Georgia clay does not care. We will inspect your Alpharetta home, document what we find with photos, and give you a clear written estimate. No pressure, no obligation.</p>
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