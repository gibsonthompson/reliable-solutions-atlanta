import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export const metadata = {
  title: 'Foundation Repair in Decatur, GA | Free Inspection | Reliable Solutions Atlanta',
  description: 'Foundation repair in Decatur, GA. Specializing in historic home foundations, pier-and-beam restoration, and structural repair for DeKalb County homes. Free inspection. 770-895-2039.',
  keywords: 'foundation repair Decatur GA, foundation repair DeKalb County, historic home foundation repair Decatur, pier and beam repair Decatur Georgia',
  openGraph: { title: 'Foundation Repair in Decatur, GA | Reliable Solutions Atlanta', description: 'Foundation repair for Decatur historic homes and modern builds. Free inspections. 770-895-2039.', url: 'https://www.waterhelpme.com/foundation-repair/decatur', type: 'website' },
  alternates: { canonical: 'https://www.waterhelpme.com/foundation-repair/decatur' },
}

const faqs = [
  { question: 'How much does foundation repair cost in Decatur, GA?', answer: 'Foundation repair in Decatur ranges from $3,000 to $12,000 depending on the age and type of foundation. Historic homes with original pier-and-beam foundations typically cost more due to the complexity of working with century-old construction. Crack repairs in newer homes start around $500. Full structural restoration can reach $15,000 for severely deteriorated historic foundations.' },
  { question: 'Can you repair a 100-year-old foundation in Decatur?', answer: 'Yes. We have extensive experience with Decatur historic homes built from the early 1900s through the 1940s. We understand original construction methods including stacked stone piers, brick pillar foundations, and early poured concrete. We modernize the support system while preserving the character of the home.' },
  { question: 'Do I need historic preservation approval for foundation repair in Decatur?', answer: 'Properties within the Decatur Historic District may need approval from the Historic Preservation Commission for exterior work. However, foundation repair that does not alter the exterior appearance of the home typically does not require approval. We are familiar with the process and can advise on your specific situation.' },
  { question: 'Why are crawl spaces in Decatur homes so wet?', answer: 'Decatur has dense tree canopy that traps moisture at ground level, and many older homes were built without modern moisture barriers. The original crawl spaces have bare dirt floors, inadequate ventilation, and no vapor barriers. This creates a constantly damp environment that accelerates foundation deterioration through wood rot and soil erosion.' },
  { question: 'Should I waterproof my crawl space when repairing the foundation?', answer: 'We strongly recommend it for Decatur homes. Fixing the structural foundation without addressing the moisture that caused the damage means the new piers and beams are exposed to the same conditions that destroyed the originals. Crawl space encapsulation paired with foundation repair provides a comprehensive solution that lasts.' },
]

export default function FoundationRepairDecatur() {
  const jsonLd = { '@context': 'https://schema.org', '@type': 'Service', name: 'Foundation Repair in Decatur, GA', provider: { '@type': 'LocalBusiness', name: 'Reliable Solutions Atlanta', telephone: '+17708952039', url: 'https://www.waterhelpme.com', address: { '@type': 'PostalAddress', addressLocality: 'Decatur', addressRegion: 'GA', addressCountry: 'US' }, areaServed: { '@type': 'City', name: 'Decatur', containedIn: 'DeKalb County, GA' } }, serviceType: 'Foundation Repair' }
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
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 font-display leading-tight">Foundation Repair in Decatur, GA</h1>
            <p className="text-white/80 text-lg sm:text-xl mb-8 leading-relaxed max-w-2xl">
              Foundation repair in Decatur typically costs between $3,000 and $12,000 depending on the age of the home. Reliable Solutions Atlanta specializes in historic Decatur homes with original pier-and-beam foundations dating back to the early 1900s, as well as modern structural repair for newer DeKalb County homes. Free same-week inspections available.
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
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Why Decatur Homes Develop Foundation Problems</h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p>Decatur contains some of the oldest residential housing stock in metro Atlanta. The neighborhoods surrounding the Decatur Square — Oakhurst, Winnona Park, Great Lakes, MAK District, and the historic downtown core — include craftsman bungalows, Tudor revivals, and colonial homes built from 1900 through the 1940s. These homes sit on original foundations that were never designed to last 100+ years without intervention.</p>
            <p>The original pier-and-beam foundations in historic Decatur homes used stacked fieldstone, hand-laid brick columns, or early unreinforced concrete piers. These materials deteriorate over decades of exposure to moisture and soil movement. Wooden girders and floor joists resting on these piers absorb moisture from the crawl space and develop rot, weakening the entire floor structure.</p>
            <p>Decatur's dense tree canopy — one of the defining features of the community — creates a uniquely challenging moisture environment. The tree cover prevents sunlight from drying the ground around homes, and leaf debris clogs gutters and creates organic soil layers that hold moisture against foundations. The combination of old construction, heavy tree cover, and Georgia clay creates conditions where foundation deterioration is not a question of if, but when.</p>
            <p>The revitalization of Decatur over the past two decades has also brought a wave of renovations to historic homes. We frequently find that previous renovations added weight to structures — second-story additions, heavy tile bathrooms, granite countertops — without reinforcing the original foundation to handle the increased load. The foundation that adequately supported a 1920s bungalow may not support the same structure after a major renovation.</p>
            <p>The 30030, 30032, and 30033 zip codes are where we do the most foundation work in the Decatur area.</p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Signs Your Decatur Home Needs Foundation Repair</h2>
          <p className="text-gray-700 text-lg mb-8">Historic Decatur homes show foundation problems differently than suburban construction. Here is what to look for.</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: 'Severely sloping floors', desc: 'In homes from the 1920s-1940s, it is not unusual to find floors that slope 2 or more inches across a room. Homeowners often assume this is just part of living in an old house, but it indicates pier failure that is repairable.' },
              { title: 'Bouncy, soft, or spongy floors', desc: 'When crawl space piers settle or rot, the girders they support drop. The floor joists spanning between girders then flex under foot traffic, creating a bouncy feel. This is structural, not cosmetic.' },
              { title: 'Visible daylight under exterior walls', desc: 'In pier-and-beam homes, if you can see daylight between the bottom of the exterior siding and the foundation, the structure has dropped away from its original position. This also allows pest entry and moisture intrusion.' },
              { title: 'Crumbling mortar in original brick piers', desc: 'If you can see the crawl space piers, check the mortar between bricks or stones. If it crumbles when you touch it or is missing entirely, the pier has lost structural integrity.' },
              { title: 'Plaster cracking in multiple rooms', desc: 'Original plaster walls and ceilings in Decatur bungalows crack when the structure shifts. Unlike drywall cracks that can be patched, plaster cracks indicate movement that needs to be stopped at the foundation level.' },
              { title: 'Doors that swing open or closed on their own', desc: 'When the foundation settles unevenly, door frames tilt. A door that will not stay where you put it is responding to gravity pulling it along the slope of a tilted frame.' },
            ].map((sign, i) => (
              <div key={i} className="bg-white rounded-xl p-5 shadow-sm"><h3 className="font-semibold text-[#273373] text-base mb-2">{sign.title}</h3><p className="text-gray-600 text-sm leading-relaxed">{sign.desc}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">How We Repair Foundations in Decatur</h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <h3 className="text-[#273373] font-display">Historic Pier-and-Beam Restoration</h3>
            <p>This is our specialty in Decatur. We remove failing stacked stone, brick, or concrete piers and replace them with modern adjustable steel piers on properly poured concrete footings. We then re-level the floor system incrementally — historic homes need to be leveled slowly over days to avoid cracking plaster or stressing framing joints. We repair or sister any deteriorated girders and joists as part of the project.</p>
            <h3 className="text-[#273373] font-display">Crawl Space Structural Repair</h3>
            <p>Decatur crawl spaces are often the root of the problem. We install new support beams and piers where the original system has failed, reinforce existing structures where they still have integrity, and address any wood rot or termite damage that has weakened the floor system. We treat all new and existing wood with borate preservative to prevent future rot and pest damage.</p>
            <h3 className="text-[#273373] font-display">Foundation and Encapsulation Combined</h3>
            <p>For Decatur homes, we strongly recommend pairing foundation repair with crawl space encapsulation. After replacing failed piers and re-leveling the structure, we install a heavy-duty vapor barrier across the crawl space floor and walls, seal all vents, and add a dehumidifier. This controls the moisture environment that caused the original damage and protects the new structural work for decades.</p>
            <h3 className="text-[#273373] font-display">Supplemental Pier Addition</h3>
            <p>Homes that have been renovated with second-story additions or heavy materials often need additional piers beyond the original layout. We engineer supplemental pier locations based on the current load distribution, not the original 1920s design, ensuring the foundation supports the home as it exists today.</p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Foundation Repair Costs in Decatur</h2>
          <div className="prose prose-lg max-w-none text-gray-700 mb-8"><p>Decatur foundation repair costs tend to be higher than newer suburbs because the work is more complex. Historic homes require more piers, more beam work, and more careful leveling. The investment is proportional to the value these homes hold in a market where renovated Decatur bungalows sell for $500,000+.</p></div>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#273373] text-white"><tr><th className="px-6 py-4 text-left text-sm font-semibold">Repair Type</th><th className="px-6 py-4 text-left text-sm font-semibold">Typical Cost</th><th className="px-6 py-4 text-left text-sm font-semibold hidden sm:table-cell">Timeline</th></tr></thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ['Pier replacement (per pier)', '$800 – $1,500', '1 day'],
                  ['Full pier-and-beam restoration', '$5,000 – $12,000', '3-5 days'],
                  ['Girder/joist repair or sistering', '$1,500 – $4,000', '1-2 days'],
                  ['Supplemental pier installation', '$1,200 – $2,000 per pier', '1-2 days'],
                  ['Foundation + encapsulation combo', '$8,000 – $18,000', '4-6 days'],
                  ['Crack injection (newer homes)', '$400 – $800', '2-4 hours'],
                ].map(([r, c, t], i) => (<tr key={i} className="hover:bg-gray-50"><td className="px-6 py-4 text-sm text-gray-900">{r}</td><td className="px-6 py-4 text-sm font-semibold text-[#115997]">{c}</td><td className="px-6 py-4 text-sm text-gray-500 hidden sm:table-cell">{t}</td></tr>))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mt-4">Financing available through GreenSky. All structural repairs include warranty.</p>
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
              { title: 'Crawl Space Encapsulation', href: '/crawl-space-encapsulation', desc: 'Essential for Decatur historic homes. Seal the crawl space to protect new foundation work from the moisture that caused the original damage.' },
              { title: 'Crawl Space Repair', href: '/crawl-space-repair', desc: 'Structural repair for failing crawl space supports, joists, and girders in older DeKalb County homes.' },
              { title: 'Drainage Solutions', href: '/drainage', desc: 'Redirect surface water away from your Decatur home to reduce the moisture loading on your foundation.' },
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
              { title: 'Why Atlanta Homes Have Foundation Problems', href: '/blog/why-atlanta-homes-have-foundation-problems' },
              { title: 'Foundation Crack Types and What They Mean', href: '/blog/foundation-crack-types-atlanta' },
              { title: 'Crawl Space Mold: Signs and Solutions', href: '/blog/crawl-space-mold-signs' },
            ].map((p, i) => (<Link key={i} href={p.href} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"><svg className="w-5 h-5 text-[#115997] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg><span className="text-sm font-medium text-gray-800">{p.title}</span></Link>))}
          </div>
        </div>
      </section>

      <section className="py-8 bg-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-gray-500 mb-4"><Link href="/" className="hover:text-[#115997]">Home</Link> {' / '}<Link href="/foundation-repair" className="hover:text-[#115997]">Foundation Repair</Link> {' / '}<span className="text-gray-700">Decatur</span></p>
          <p className="text-sm text-gray-500">Foundation repair also available in <Link href="/foundation-repair/lawrenceville" className="text-[#115997] hover:underline">Lawrenceville</Link>, <Link href="/foundation-repair/marietta" className="text-[#115997] hover:underline">Marietta</Link>, <Link href="/foundation-repair/roswell" className="text-[#115997] hover:underline">Roswell</Link>, <Link href="/foundation-repair/alpharetta" className="text-[#115997] hover:underline">Alpharetta</Link>, <Link href="/foundation-repair/sandy-springs" className="text-[#115997] hover:underline">Sandy Springs</Link>, and <Link href="/foundation-repair/stone-mountain" className="text-[#115997] hover:underline">Stone Mountain</Link>.</p>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-[#115997]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 font-display">Free Foundation Inspection in Decatur</h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">Whether your Decatur home was built in 1920 or 2020, we will inspect the foundation, explain what we find, and give you a written estimate. We understand historic construction and we treat every home with the care it deserves.</p>
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