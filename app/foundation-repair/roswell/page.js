import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export const metadata = {
  title: 'Foundation Repair in Roswell, GA | Free Inspection | Reliable Solutions Atlanta',
  description: 'Foundation repair in Roswell, GA. Expert service for 1970s-1990s homes along the Chattahoochee corridor. Helical piers, crack repair, wall stabilization. Free inspection. 770-895-2039.',
  keywords: 'foundation repair Roswell GA, foundation repair North Fulton, foundation crack repair Roswell, foundation settling Roswell Georgia',
  openGraph: { title: 'Foundation Repair in Roswell, GA | Reliable Solutions Atlanta', description: 'Expert foundation repair for Roswell homes. Free inspections, permanent solutions. 770-895-2039.', url: 'https://www.waterhelpme.com/foundation-repair/roswell', type: 'website' },
  alternates: { canonical: 'https://www.waterhelpme.com/foundation-repair/roswell' },
}

const faqs = [
  { question: 'How much does foundation repair cost in Roswell, GA?', answer: 'Foundation repair in Roswell typically costs between $3,500 and $10,000 for residential projects. Roswell homes tend to be larger than the metro average, which means more linear footage of foundation to stabilize. Minor crack repairs start around $500. Full pier systems for larger homes range from $10,000 to $18,000.' },
  { question: 'Do mature trees cause foundation problems in Roswell?', answer: 'Yes. Roswell has some of the most heavily treed neighborhoods in metro Atlanta. Large hardwoods like oaks and poplars draw enormous amounts of moisture from the soil during growing season, causing clay soil to shrink and pull away from foundations. Roots can also grow under foundations and push upward as they expand.' },
  { question: 'Will foundation repair affect my Roswell home resale value?', answer: 'Foundation repair actually protects and often improves resale value. In the Roswell market where homes sell in the $400,000 to $800,000+ range, unresolved foundation issues can reduce offers by $20,000 to $50,000 or kill deals entirely. A repaired foundation with transferable warranty gives buyers confidence.' },
  { question: 'How do Roswell home inspections handle foundation issues?', answer: 'North Fulton home inspectors are trained to flag foundation concerns. In the competitive Roswell market, buyers almost always get a professional inspection. Having a pre-existing foundation repair with documentation and warranty eliminates that negotiation point and keeps your deal on track.' },
  { question: 'What neighborhoods in Roswell have the most foundation issues?', answer: 'We see the highest concentration of foundation work in neighborhoods along the Chattahoochee corridor including Willeo, Martin Landing, Rivermont, and Azalea. Older subdivisions in the 30075 and 30076 zip codes built in the 1970s and 1980s are also common. Homes near creeks and rivers have more moisture-related foundation issues.' },
]

export default function FoundationRepairRoswell() {
  const jsonLd = { '@context': 'https://schema.org', '@type': 'Service', name: 'Foundation Repair in Roswell, GA', provider: { '@type': 'LocalBusiness', name: 'Reliable Solutions Atlanta', telephone: '+17708952039', url: 'https://www.waterhelpme.com', address: { '@type': 'PostalAddress', addressLocality: 'Roswell', addressRegion: 'GA', addressCountry: 'US' }, areaServed: { '@type': 'City', name: 'Roswell', containedIn: 'Fulton County, GA' } }, serviceType: 'Foundation Repair' }
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
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 font-display leading-tight">Foundation Repair in Roswell, GA</h1>
            <p className="text-white/80 text-lg sm:text-xl mb-8 leading-relaxed max-w-2xl">
              Foundation repair in Roswell typically costs between $3,500 and $10,000. Reliable Solutions Atlanta provides free inspections for Roswell homeowners with same-week availability. We specialize in the established 1970s-1990s homes that make up much of Roswell's housing stock, with permanent repairs backed by transferable warranty.
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
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Why Roswell Homes Develop Foundation Problems</h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p>Roswell is one of the most established residential communities in North Fulton County. The majority of homes were built between the early 1970s and the late 1990s, with neighborhoods like Willeo, Crabapple, Martin Landing, Mountain Park, and the historic Roswell district anchoring the community. These homes are well-built, but after 30 to 50 years on Georgia clay, foundations start showing their age.</p>
            <p>What makes Roswell unique from a foundation perspective is the tree canopy. Roswell has some of the densest mature tree coverage in metro Atlanta. Large hardwood trees — oaks, poplars, hickories — have root systems that extend 30 to 50 feet from the trunk. During summer months, these roots pull massive amounts of water from the clay soil, causing it to shrink and compact. The foundation, which was originally placed on fully hydrated soil, is now sitting on soil that has pulled away from it, creating voids that allow settling.</p>
            <p>The Chattahoochee River corridor that runs through western Roswell adds another layer. Homes near the river, Vickery Creek, and Big Creek sit on soil that stays saturated for much of the year. The constant moisture keeps the clay expanded, putting hydrostatic pressure on basement and crawl space walls. Then during drought periods, the soil contracts rapidly, and the sudden change creates foundation movement.</p>
            <p>Roswell's real estate market compounds the urgency. Homes in the 30075 and 30076 zip codes routinely sell for $400,000 to over $1 million. At those price points, a buyer's inspection that flags foundation issues can reduce an offer by $30,000 or more. Addressing foundation problems proactively protects the significant equity Roswell homeowners have in their properties.</p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Signs Your Roswell Home Needs Foundation Repair</h2>
          <p className="text-gray-700 text-lg mb-8">Roswell homes show foundation distress differently depending on the age and construction type. Here are the most common signs we see in this area.</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: 'Cracks in hardwood or tile floors', desc: 'In higher-end Roswell homes with hardwood or tile, foundation movement shows up as cracked tiles or separating hardwood planks before you might notice wall cracks. The rigid flooring material amplifies even small shifts.' },
              { title: 'Exterior brick cracking near roofline', desc: 'Many Roswell homes are full brick. Cracking that starts near the top of the wall and works downward indicates the foundation on one side is dropping while the upper structure resists the movement.' },
              { title: 'Gaps around doors and window frames', desc: 'As the foundation shifts, the framing racks out of square. Look for daylight around exterior door frames or gaps that appear at the top of windows that were not there before.' },
              { title: 'Basement wall bowing inward', desc: 'Homes with walk-out basements along hillsides near the Chattahoochee are susceptible to lateral soil pressure that pushes basement walls inward. Any visible inward bow, even a quarter inch, should be evaluated.' },
              { title: 'Trees within 20 feet of the house', desc: 'If large trees are close to your foundation, monitor for seasonal cracking patterns. Cracks that widen in summer drought and close during rainy periods indicate tree roots are affecting the soil moisture beneath your foundation.' },
              { title: 'Musty smell in basement or crawl space', desc: 'Foundation cracks let moisture in. In Roswell homes where the water table is influenced by nearby creeks, even hairline foundation cracks can admit enough moisture to cause mold growth and musty odors.' },
            ].map((sign, i) => (
              <div key={i} className="bg-white rounded-xl p-5 shadow-sm"><h3 className="font-semibold text-[#273373] text-base mb-2">{sign.title}</h3><p className="text-gray-600 text-sm leading-relaxed">{sign.desc}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">How We Repair Foundations in Roswell</h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <h3 className="text-[#273373] font-display">Helical Piers with Depth Verification</h3>
            <p>Roswell's mix of clay and rocky substrate means pier depth varies significantly even within a single property. We verify torque readings at each pier location to ensure every pier reaches competent bearing soil. In some Roswell neighborhoods, piers need to go 15 to 25 feet down to reach stable strata below the clay zone affected by tree root moisture cycling.</p>
            <h3 className="text-[#273373] font-display">Push Piers for Larger Homes</h3>
            <p>Many Roswell homes are 3,000+ square feet with heavy brick veneer. Push piers use the structure's weight to drive steel piers to bedrock, providing the load capacity needed for these larger homes. We typically use push piers on full-brick Roswell colonials and two-story homes where the foundation load exceeds helical pier capacity.</p>
            <h3 className="text-[#273373] font-display">Basement Wall Stabilization</h3>
            <p>For walk-out basements common in the Chattahoochee corridor neighborhoods, we install either carbon fiber straps for minor bowing or wall anchor systems for more significant inward movement. Both methods stabilize the wall and prevent progressive failure without the need to excavate the entire exterior.</p>
            <h3 className="text-[#273373] font-display">Root Barrier Installation</h3>
            <p>When tree roots are contributing to foundation problems, we install root barriers between the tree and the foundation. These physical barriers redirect root growth away from the foundation zone without harming the tree. In Roswell, where mature trees are valued and often protected, this is a critical part of a lasting foundation repair.</p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Foundation Repair Costs in Roswell</h2>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#273373] text-white"><tr><th className="px-6 py-4 text-left text-sm font-semibold">Repair Type</th><th className="px-6 py-4 text-left text-sm font-semibold">Typical Cost</th><th className="px-6 py-4 text-left text-sm font-semibold hidden sm:table-cell">Timeline</th></tr></thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ['Crack injection (per crack)', '$400 – $900', '2-4 hours'],
                  ['Carbon fiber wall straps (per wall)', '$1,500 – $3,500', '1 day'],
                  ['Helical piers (per pier)', '$1,300 – $2,000', '1-2 days'],
                  ['Push piers (per pier)', '$1,600 – $2,500', '1-2 days'],
                  ['Full stabilization (8-12 piers)', '$10,000 – $18,000', '2-4 days'],
                  ['Wall anchor system (per anchor)', '$800 – $1,500', '1 day'],
                  ['Root barrier installation', '$1,500 – $3,000', '1 day'],
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
          <h2 className="text-2xl font-bold text-[#273373] mb-6 font-display">Related Services in Roswell</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { title: 'Basement Waterproofing', href: '/basement-waterproofing', desc: 'Protect walk-out basements in the Chattahoochee corridor from water intrusion.' },
              { title: 'Drainage Solutions', href: '/drainage', desc: 'Redirect surface and subsurface water away from your Roswell home to prevent future foundation damage.' },
              { title: 'Crawl Space Encapsulation', href: '/crawl-space-encapsulation', desc: 'Seal your crawl space to control the moisture that drives clay soil movement.' },
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
              { title: 'Why Atlanta Homes Have Foundation Problems', href: '/blog/why-atlanta-homes-have-foundation-problems' },
              { title: 'Foundation Maintenance Seasonal Checklist', href: '/blog/foundation-maintenance-seasonal-checklist' },
            ].map((p, i) => (<Link key={i} href={p.href} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"><svg className="w-5 h-5 text-[#115997] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg><span className="text-sm font-medium text-gray-800">{p.title}</span></Link>))}
          </div>
        </div>
      </section>

      <section className="py-8 bg-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-gray-500 mb-4"><Link href="/" className="hover:text-[#115997]">Home</Link> {' / '}<Link href="/foundation-repair" className="hover:text-[#115997]">Foundation Repair</Link> {' / '}<span className="text-gray-700">Roswell</span></p>
          <p className="text-sm text-gray-500">Foundation repair also available in <Link href="/foundation-repair/lawrenceville" className="text-[#115997] hover:underline">Lawrenceville</Link>, <Link href="/foundation-repair/marietta" className="text-[#115997] hover:underline">Marietta</Link>, <Link href="/foundation-repair/alpharetta" className="text-[#115997] hover:underline">Alpharetta</Link>, <Link href="/foundation-repair/decatur" className="text-[#115997] hover:underline">Decatur</Link>, <Link href="/foundation-repair/sandy-springs" className="text-[#115997] hover:underline">Sandy Springs</Link>, and <Link href="/foundation-repair/stone-mountain" className="text-[#115997] hover:underline">Stone Mountain</Link>.</p>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-[#115997]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 font-display">Free Foundation Inspection in Roswell</h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">Protect your Roswell home's value with a free professional foundation inspection. We will give you an honest assessment with photos and a written estimate. No obligation.</p>
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