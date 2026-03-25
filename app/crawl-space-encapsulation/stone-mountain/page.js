import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export const metadata = {
  title: 'Crawl Space Encapsulation in Stone Mountain, GA | Free Inspection | Reliable Solutions Atlanta',
  description: 'Crawl space encapsulation in Stone Mountain, GA. Vapor barriers, drainage, and dehumidifiers for homes on granite substrata. Most projects $3,500-$10,000. Free inspection. 770-895-2039.',
  keywords: 'crawl space encapsulation Stone Mountain GA, crawl space vapor barrier DeKalb County, crawl space moisture Stone Mountain, crawl space sealing Stone Mountain Georgia',
  openGraph: { title: 'Crawl Space Encapsulation in Stone Mountain, GA | Reliable Solutions Atlanta', description: 'Seal your Stone Mountain crawl space against granite-driven moisture. Free inspections. 770-895-2039.', url: 'https://www.waterhelpme.com/crawl-space-encapsulation/stone-mountain', type: 'website' },
  alternates: { canonical: 'https://www.waterhelpme.com/crawl-space-encapsulation/stone-mountain' },
}

const faqs = [
  { question: 'How much does crawl space encapsulation cost in Stone Mountain, GA?', answer: 'Crawl space encapsulation in Stone Mountain typically costs between $3,500 and $10,000. Stone Mountain homes are generally smaller than north-side suburbs which keeps costs lower. Basic vapor barrier starts around $2,000. Full encapsulation with drainage, liner, and dehumidifier runs $6,000 to $12,000. Homes with active water from granite channels need drainage integration which adds $2,000 to $4,000.' },
  { question: 'Why is crawl space encapsulation so important in Stone Mountain?', answer: 'Stone Mountain has the highest rate of crawl space problems in metro Atlanta. The granite substrata channels water laterally underground, delivering it directly to crawl spaces. The 1960s-1980s homes were built with minimal moisture protection on cinder block foundations that are porous. Crawl space encapsulation is the most requested service we perform in eastern DeKalb County.' },
  { question: 'Does granite under my Stone Mountain home make encapsulation different?', answer: 'Yes. When granite is close to the surface, ground moisture cannot drain downward and instead flows laterally toward the lowest point, which is often the crawl space. Standard encapsulation with just a vapor barrier may not be enough. Many Stone Mountain homes need a drainage layer beneath the liner to capture water flowing along the granite surface before it pools under the liner.' },
  { question: 'Can encapsulation fix the mold in my Stone Mountain crawl space?', answer: 'Encapsulation eliminates the conditions mold needs to grow, which are moisture above 60% humidity and organic material to feed on. We treat existing mold before encapsulating, then the sealed environment with dehumidification prevents any recurrence. Most Stone Mountain homeowners notice the musty smell disappearing within the first week after encapsulation.' },
  { question: 'Is crawl space encapsulation worth it for an older Stone Mountain home?', answer: 'Encapsulation protects the structural wood in your home from further moisture damage, reduces energy costs by 15 to 20 percent, eliminates mold and allergens from indoor air, and discourages pest activity. Even in the more affordable Stone Mountain market, these benefits pay for the investment over time, and the transferable warranty adds value at resale.' },
]

export default function CrawlSpaceEncapsulationStoneMountain() {
  const jsonLd = { '@context': 'https://schema.org', '@type': 'Service', name: 'Crawl Space Encapsulation in Stone Mountain, GA', provider: { '@type': 'LocalBusiness', name: 'Reliable Solutions Atlanta', telephone: '+17708952039', url: 'https://www.waterhelpme.com', address: { '@type': 'PostalAddress', addressLocality: 'Stone Mountain', addressRegion: 'GA', addressCountry: 'US' }, areaServed: { '@type': 'City', name: 'Stone Mountain', containedIn: 'DeKalb County, GA' } }, serviceType: 'Crawl Space Encapsulation' }
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
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 font-display leading-tight">Crawl Space Encapsulation in Stone Mountain, GA</h1>
            <p className="text-white/80 text-lg sm:text-xl mb-8 leading-relaxed max-w-2xl">Crawl space encapsulation in Stone Mountain typically costs between $3,500 and $10,000. Reliable Solutions Atlanta is the most experienced crawl space encapsulation provider in eastern DeKalb County, where the granite substrata creates moisture conditions unlike anywhere else in metro Atlanta. Vapor barriers, drainage integration, vent sealing, and dehumidification. Free same-week inspections.</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white text-[#273373] font-bold rounded-xl hover:bg-gray-100 transition-colors">Schedule Free Inspection</Link>
              <a href="tel:+17708952039" className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-transparent border-2 border-white/30 text-white font-bold rounded-xl hover:bg-white/10 transition-colors">(770) 895-2039</a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Why Stone Mountain Crawl Spaces Need Encapsulation</h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p>Crawl space encapsulation is the single most impactful home improvement for Stone Mountain homeowners because crawl space moisture affects more homes here than in any other metro Atlanta community. The granite monadnock — the massive rock formation that defines Stone Mountain — extends underground across much of eastern DeKalb County as a shallow impermeable bedrock layer. This granite does not absorb water. Every drop of rain that reaches the rock surface flows laterally until it finds the lowest point in the area, which is often the crawl space beneath your home.</p>
            <p>The housing stock in Stone Mountain — primarily 1960s through 1980s homes in the 30083, 30087, and 30088 zip codes along Memorial Drive, Rockbridge Road, and Hairston Road — was built on cinder block foundations with minimal crawl space protection. Original construction included a thin vapor barrier on the dirt floor and open foundation vents. The cinder block walls are hollow and porous, admitting moisture through the blocks themselves. After 40 to 60 years of granite-channeled water exposure, these crawl spaces are in severe condition.</p>
            <p>The consequences of unprotected Stone Mountain crawl spaces are visible throughout the home: musty odors that permeate every room, floors that sag and bounce from moisture-weakened joists, mold spores that trigger allergies and respiratory issues, termite and pest activity attracted by the damp wood, and energy bills inflated by HVAC systems fighting the constant humidity infiltration from below.</p>
            <p>Deferred maintenance in many Stone Mountain homes has allowed these conditions to worsen over decades. By the time homeowners call us, the crawl space often has standing water, visible mold on most wood surfaces, and structural wood that has lost significant strength. The good news is that encapsulation stops the damage cycle completely and allows the structure to dry and stabilize.</p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Signs Your Stone Mountain Crawl Space Needs Encapsulation</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: 'Standing water visible in crawl space', desc: 'If you look in the crawl space access and see standing water or saturated mud, granite-channeled water is actively flooding the space. This is the most severe condition and requires drainage integration with encapsulation.' },
              { title: 'Musty smell throughout the entire house', desc: 'When the crawl space is severely damp, the musty odor is not limited to the first floor. It permeates closets, bedrooms, and even upper floors through the HVAC system that pulls air from the crawl space environment.' },
              { title: 'Floors noticeably sagging or bouncy', desc: 'Floor joists that have absorbed moisture for decades lose structural strength. If floors sag in the center of rooms or bounce when you walk, the crawl space moisture has compromised the floor structure.' },
              { title: 'Cinder block walls visibly wet or stained', desc: 'Look at the interior face of the cinder block foundation walls from inside the crawl space. If they are wet, stained, or have white mineral deposits, water is penetrating through the porous blocks from outside.' },
              { title: 'Pest company finds termite damage', desc: 'Subterranean termites need moisture to survive. Damp crawl space wood is their ideal habitat. If your termite inspection finds damage or activity, the crawl space moisture is the root cause that must be addressed.' },
              { title: 'Energy bills higher than expected', desc: 'An unsealed crawl space below a Stone Mountain home adds a massive moisture and temperature load to the HVAC system. If your bills seem high for your home size, the crawl space is likely the reason.' },
            ].map((sign, i) => (
              <div key={i} className="bg-white rounded-xl p-5 shadow-sm"><h3 className="font-semibold text-[#273373] text-base mb-2">{sign.title}</h3><p className="text-gray-600 text-sm leading-relaxed">{sign.desc}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">How We Encapsulate Crawl Spaces in Stone Mountain</h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <h3 className="text-[#273373] font-display">Granite-Level Drainage System</h3>
            <p>For Stone Mountain homes where granite channels deliver active water to the crawl space, we install a perimeter drainage system directly on or near the granite surface. The drain captures water flowing along the rock before it can pool under the home and routes it to a sump pit with pump. This drainage layer sits beneath the vapor barrier so water is managed below while the air above stays dry.</p>
            <h3 className="text-[#273373] font-display">Cinder Block Wall Treatment</h3>
            <p>Porous cinder block walls in Stone Mountain homes admit moisture through the block faces and mortar joints. We apply a dimpled drainage membrane to the interior wall surface that captures moisture weeping through the blocks and channels it downward to the perimeter drain. The 20-mil vapor barrier then goes over the drainage membrane, creating a dry interior surface.</p>
            <h3 className="text-[#273373] font-display">Structural Assessment and Repair</h3>
            <p>Before sealing a Stone Mountain crawl space, we assess all structural wood for damage. Joists weakened by moisture are sistered with new treated lumber. Failed piers are replaced with adjustable steel piers. In areas where the granite is close to the surface, we anchor piers directly to the rock, which is actually more stable than soil-supported piers. All wood receives borate treatment against future rot and pests.</p>
            <h3 className="text-[#273373] font-display">Complete Seal with Dehumidification</h3>
            <p>The 20-mil liner covers the entire floor and wall surface. Every vent is sealed with rigid foam insulation. Rim joists are sealed with spray foam. A commercial dehumidifier sized for your crawl space volume maintains 45-50% humidity. For Stone Mountain homes with severe moisture history, we install higher-capacity dehumidifiers that can handle the initial drying period when decades of saturated soil beneath the liner slowly releases its moisture.</p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Crawl Space Encapsulation Costs in Stone Mountain</h2>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#273373] text-white"><tr><th className="px-6 py-4 text-left text-sm font-semibold">Service</th><th className="px-6 py-4 text-left text-sm font-semibold">Typical Cost</th><th className="px-6 py-4 text-left text-sm font-semibold hidden sm:table-cell">Timeline</th></tr></thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ['Vapor barrier replacement (floor only)', '$1,500 – $3,000', '1 day'],
                  ['Full encapsulation (liner + vents + dehumidifier)', '$3,500 – $10,000', '2-3 days'],
                  ['Encapsulation with granite drainage', '$6,000 – $14,000', '3-4 days'],
                  ['Block wall drainage membrane', '$1,500 – $3,500', '1 day'],
                  ['Sump pump with battery backup', '$1,500 – $2,500', '1 day'],
                  ['Structural repair + encapsulation', '$7,000 – $16,000', '3-5 days'],
                ].map(([r, c, t], i) => (<tr key={i} className="hover:bg-gray-50"><td className="px-6 py-4 text-sm text-gray-900">{r}</td><td className="px-6 py-4 text-sm font-semibold text-[#115997]">{c}</td><td className="px-6 py-4 text-sm text-gray-500 hidden sm:table-cell">{t}</td></tr>))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mt-4">Financing available through GreenSky with plans starting at 0% interest. All work includes warranty.</p>
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
          <h2 className="text-2xl font-bold text-[#273373] mb-6 font-display">Related Services in Stone Mountain</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { title: 'Foundation Repair', href: '/foundation-repair/stone-mountain', desc: 'Repair granite-affected foundations before or during encapsulation.' },
              { title: 'Drainage Solutions', href: '/drainage/stone-mountain', desc: 'Exterior drainage designed for Stone Mountain granite substrata conditions.' },
              { title: 'Crawl Space Repair', href: '/crawl-space-repair', desc: 'Structural repair for joists, girders, and piers damaged by decades of moisture.' },
            ].map((s, i) => (<Link key={i} href={s.href} className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow group"><h3 className="font-semibold text-[#273373] mb-2 group-hover:text-[#115997] transition-colors">{s.title}</h3><p className="text-gray-600 text-sm">{s.desc}</p></Link>))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#273373] mb-6 font-display">Learn More About Crawl Spaces</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[{ title: 'Crawl Space Encapsulation vs Waterproofing', href: '/blog/crawl-space-encapsulation-vs-waterproofing' }, { title: 'Crawl Space Mold: Signs and Solutions', href: '/blog/crawl-space-mold-signs' }, { title: 'Crawl Space Vapor Barrier Guide', href: '/blog/crawl-space-vapor-barrier-guide' }, { title: 'Crawl Space Repair Cost in Atlanta', href: '/blog/crawl-space-repair-cost-atlanta' }].map((p, i) => (<Link key={i} href={p.href} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"><svg className="w-5 h-5 text-[#115997] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg><span className="text-sm font-medium text-gray-800">{p.title}</span></Link>))}
          </div>
        </div>
      </section>

      <section className="py-8 bg-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-gray-500 mb-4"><Link href="/" className="hover:text-[#115997]">Home</Link> {' / '}<Link href="/crawl-space-encapsulation" className="hover:text-[#115997]">Crawl Space Encapsulation</Link> {' / '}<span className="text-gray-700">Stone Mountain</span></p>
          <p className="text-sm text-gray-500">Crawl space encapsulation also available in <Link href="/crawl-space-encapsulation/lawrenceville" className="text-[#115997] hover:underline">Lawrenceville</Link>, <Link href="/crawl-space-encapsulation/marietta" className="text-[#115997] hover:underline">Marietta</Link>, <Link href="/crawl-space-encapsulation/roswell" className="text-[#115997] hover:underline">Roswell</Link>, <Link href="/crawl-space-encapsulation/alpharetta" className="text-[#115997] hover:underline">Alpharetta</Link>, <Link href="/crawl-space-encapsulation/decatur" className="text-[#115997] hover:underline">Decatur</Link>, and <Link href="/crawl-space-encapsulation/sandy-springs" className="text-[#115997] hover:underline">Sandy Springs</Link>.</p>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-[#115997]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 font-display">Free Crawl Space Inspection in Stone Mountain</h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">We know Stone Mountain crawl spaces better than anyone. We will inspect yours, document the conditions with photos, and give you a clear plan for making it dry and protected. No obligation, no pressure.</p>
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