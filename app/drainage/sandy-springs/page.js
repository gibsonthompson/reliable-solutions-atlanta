import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export const metadata = {
  title: 'Drainage Solutions in Sandy Springs, GA | Free Inspection | Reliable Solutions Atlanta',
  description: 'Drainage solutions in Sandy Springs, GA. Hillside French drains, split-level drainage, erosion control, and foundation protection for Fulton County homes. Most projects $2,500-$9,000. Free inspection. 770-895-2039.',
  keywords: 'drainage Sandy Springs GA, French drain Sandy Springs, yard drainage Sandy Springs Georgia, hillside drainage Sandy Springs, erosion control Sandy Springs',
  openGraph: { title: 'Drainage Solutions in Sandy Springs, GA | Reliable Solutions Atlanta', description: 'Fix hillside runoff and yard drainage in Sandy Springs. Free inspections. 770-895-2039.', url: 'https://www.waterhelpme.com/drainage/sandy-springs', type: 'website' },
  alternates: { canonical: 'https://www.waterhelpme.com/drainage/sandy-springs' },
}

const faqs = [
  { question: 'How much do drainage solutions cost in Sandy Springs, GA?', answer: 'Drainage in Sandy Springs typically costs between $2,500 and $9,000. Hillside properties along Roswell Road and Powers Ferry require more complex systems than flatter lots. French drains start around $2,000. Hillside interception drains run $3,000 to $7,000. Full property drainage for larger Sandy Springs homes can reach $12,000.' },
  { question: 'Why does my Sandy Springs hillside yard erode?', answer: 'Sandy Springs terrain funnels water downhill at speed. The decomposed granite in the soil drains quickly on the surface but creates fast-moving channels that carry soil with them. Unlike pure clay that holds soil particles together, the granite-clay mix erodes more easily because the granite particles are loose and get carried by water movement.' },
  { question: 'Can drainage fix water in my Sandy Springs split-level lower level?', answer: 'In many cases, yes. Split-level lower levels in Sandy Springs sit partially below grade and receive water from the uphill side. An exterior interception drain installed above the buried wall captures this water before it reaches the foundation. This is often more effective and less expensive than interior waterproofing for split-level homes.' },
  { question: 'Do I need drainage work before selling my Sandy Springs home?', answer: 'If your property has visible drainage issues — standing water, erosion, wet basement or crawl space — fixing them before listing avoids inspection findings that kill deals or reduce offers. In the Sandy Springs market, drainage and water issues are the most commonly flagged items on home inspections after roof condition.' },
  { question: 'How does Sandy Springs soil differ from the rest of metro Atlanta?', answer: 'Sandy Springs has a higher concentration of decomposed granite mixed with the typical Georgia red clay. Granite particles do not absorb water and create fast-draining surface pockets mixed with slow-draining clay sections. This inconsistency means water moves unpredictably — fast in some spots, stagnant in others — making drainage design more complex than in uniform clay areas.' },
]

export default function DrainageSandySprings() {
  const jsonLd = { '@context': 'https://schema.org', '@type': 'Service', name: 'Drainage Solutions in Sandy Springs, GA', provider: { '@type': 'LocalBusiness', name: 'Reliable Solutions Atlanta', telephone: '+17708952039', url: 'https://www.waterhelpme.com', address: { '@type': 'PostalAddress', addressLocality: 'Sandy Springs', addressRegion: 'GA', addressCountry: 'US' }, areaServed: { '@type': 'City', name: 'Sandy Springs', containedIn: 'Fulton County, GA' } }, serviceType: 'Drainage Solutions' }
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
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 font-display leading-tight">Drainage Solutions in Sandy Springs, GA</h1>
            <p className="text-white/80 text-lg sm:text-xl mb-8 leading-relaxed max-w-2xl">Drainage solutions in Sandy Springs typically cost between $2,500 and $9,000. Reliable Solutions Atlanta designs drainage for Sandy Springs' hilly terrain and mixed granite-clay soil — where water moves fast on the surface and unpredictably underground. French drains, hillside interception, erosion control, and split-level foundation protection. Free same-week inspections.</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white text-[#273373] font-bold rounded-xl hover:bg-gray-100 transition-colors">Schedule Free Inspection</Link>
              <a href="tel:+17708952039" className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-transparent border-2 border-white/30 text-white font-bold rounded-xl hover:bg-white/10 transition-colors">(770) 895-2039</a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Why Sandy Springs Has Drainage Challenges</h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p>Sandy Springs sits on some of the most varied terrain in the inner suburbs of Atlanta. The neighborhoods along Roswell Road, Riverside Drive, Mount Vernon Highway, and the Powers Ferry corridor were built on rolling hills where the grade can change 15 to 30 feet within a single residential lot. This terrain means every rain event sends water downhill with enough energy to erode soil, overwhelm landscaping, and deliver concentrated flows against foundations.</p>
            <p>The soil composition in Sandy Springs adds unpredictability. Unlike Gwinnett County's uniform red clay or DeKalb County's clay-over-granite, Sandy Springs has a heterogeneous mix of decomposed granite particles and red clay that varies from lot to lot and even across a single property. The granite component creates pockets that drain almost instantly while the clay sections hold water indefinitely. Water flows rapidly through granite zones and pools in clay zones, creating an uneven moisture pattern that standard drainage designs do not always account for.</p>
            <p>The 1960s through 1980s homes that dominate Sandy Springs — ranches, split-levels, and colonials along the 30328, 30342, and 30350 zip codes — were built with minimal exterior drainage. The standard practice was a simple swale in the yard and maybe a footer drain connected to the storm system. After 40 to 60 years, the swales have eroded or been graded over by landscaping projects, and the footer drains have collapsed or been severed by root growth.</p>
            <p>The western Sandy Springs neighborhoods near the Chattahoochee also face seasonal water table elevation. When the river is high from upstream rain, the water table rises in the floodplain neighborhoods, reducing the soil's capacity to absorb additional water. During these periods, even light rain causes flooding because the soil is already full from below.</p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Signs Your Sandy Springs Property Needs Drainage Work</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: 'Erosion on slopes between properties', desc: 'Sandy Springs lots on hills often share slope drainage. When the uphill property runoff concentrates at the property line, it erodes channels down the slope that deepen with every storm and threaten fences and structures.' },
              { title: 'Split-level lower level taking on water', desc: 'The below-grade wall of a Sandy Springs split-level receives concentrated hillside runoff. Water enters through the wall-floor joint and through cracks in the block. Exterior drainage intercepts this water before it reaches the wall.' },
              { title: 'Driveway or walkway undermined by wash-out', desc: 'Fast-moving surface water in Sandy Springs erodes the soil supporting driveways and walkways, creating voids underneath that eventually cause cracking and settlement. The erosion path needs drainage to slow the water and redirect it.' },
              { title: 'Retaining wall failing on a slope', desc: 'Sandy Springs has thousands of retaining walls holding back hillside soil. Without drainage behind them, saturated clay and granite soil creates massive pressure that pushes walls forward. Most wall failures we see are drainage failures.' },
              { title: 'Standing water in the lowest yard section', desc: 'The natural low point of a Sandy Springs hillside lot collects all the runoff from above. If this low point is near the house, the concentrated water is a direct threat to the foundation. If it is in the yard, it makes that area unusable.' },
              { title: 'Water staining on foundation exterior', desc: 'Dark stains or green algae growth on the exterior of your Sandy Springs foundation walls indicates soil is staying wet against the wall for extended periods. This sustained moisture is penetrating the wall and damaging it from both sides.' },
            ].map((sign, i) => (
              <div key={i} className="bg-white rounded-xl p-5 shadow-sm"><h3 className="font-semibold text-[#273373] text-base mb-2">{sign.title}</h3><p className="text-gray-600 text-sm leading-relaxed">{sign.desc}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Drainage Solutions We Install in Sandy Springs</h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <h3 className="text-[#273373] font-display">Split-Level Foundation Drainage</h3>
            <p>We install a French drain along the uphill side of split-level foundations where the wall is below grade. The drain intercepts hillside runoff before it reaches the wall and routes it to a discharge point on the downhill side of the property. For homes where space between the wall and the property line is tight, we use narrow-trench techniques that fit in 12-inch corridors.</p>
            <h3 className="text-[#273373] font-display">Hillside Interception and Terracing</h3>
            <p>For steeply sloped Sandy Springs lots, a single drain cannot handle the volume of water moving downhill. We install interception drains at multiple elevations that capture water progressively as it flows down the slope. Each drain reduces the volume reaching the next level, preventing the overwhelming surge that causes erosion and foundation flooding at the bottom.</p>
            <h3 className="text-[#273373] font-display">Granite-Adapted Drain Design</h3>
            <p>Sandy Springs' decomposed granite creates fast-draining pockets that standard French drain spacing can miss. We probe the soil during design to identify granite veins and clay pockets. The drain layout follows the actual water paths through the soil rather than assuming uniform flow. In granite zones, we use wider gravel beds to capture the fast-moving water before it reaches the foundation.</p>
            <h3 className="text-[#273373] font-display">Erosion Control and Stabilization</h3>
            <p>For eroding slopes, we combine drainage with physical stabilization. Rip-rap, turf reinforcement mats, and plantings with deep root systems slow water velocity and hold soil in place. Drainage carries the water; stabilization prevents the soil from going with it. This combination approach is essential on Sandy Springs hillsides where water moves fast enough to carry significant soil volume.</p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Drainage Costs in Sandy Springs</h2>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#273373] text-white"><tr><th className="px-6 py-4 text-left text-sm font-semibold">Service</th><th className="px-6 py-4 text-left text-sm font-semibold">Typical Cost</th><th className="px-6 py-4 text-left text-sm font-semibold hidden sm:table-cell">Timeline</th></tr></thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ['French drain (per linear ft)', '$30 – $55', '1-2 days'],
                  ['Split-level foundation drain', '$2,500 – $5,000', '1-2 days'],
                  ['Hillside interception system', '$3,500 – $8,000', '2-3 days'],
                  ['Retaining wall drain retrofit', '$2,000 – $5,000', '1-2 days'],
                  ['Erosion control and stabilization', '$2,000 – $6,000', '1-3 days'],
                  ['Downspout underground routing', '$300 – $600 per downspout', 'Same day'],
                  ['Full property drainage plan', '$6,000 – $12,000', '3-5 days'],
                ].map(([r, c, t], i) => (<tr key={i} className="hover:bg-gray-50"><td className="px-6 py-4 text-sm text-gray-900">{r}</td><td className="px-6 py-4 text-sm font-semibold text-[#115997]">{c}</td><td className="px-6 py-4 text-sm text-gray-500 hidden sm:table-cell">{t}</td></tr>))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mt-4">Financing available through GreenSky. Lawn restoration included with all drainage projects.</p>
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
              { title: 'Foundation Repair', href: '/foundation-repair/sandy-springs', desc: 'Hillside drainage failures cause foundation damage. Fix the water to protect the structure.' },
              { title: 'Basement Waterproofing', href: '/basement-waterproofing/sandy-springs', desc: 'Interior waterproofing for Sandy Springs basements where exterior drainage needs reinforcement.' },
              { title: 'Crawl Space Waterproofing', href: '/crawl-space-waterproofing', desc: 'For Sandy Springs ranches on crawl spaces, waterproofing blocks moisture from entering the floor system.' },
            ].map((s, i) => (<Link key={i} href={s.href} className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow group"><h3 className="font-semibold text-[#273373] mb-2 group-hover:text-[#115997] transition-colors">{s.title}</h3><p className="text-gray-600 text-sm">{s.desc}</p></Link>))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#273373] mb-6 font-display">Learn More About Drainage</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[{ title: 'French Drain Cost in Atlanta', href: '/blog/french-drain-cost-atlanta' }, { title: 'Yard Drainage Problems and Foundation Damage', href: '/blog/yard-drainage-problems-foundation-damage' }, { title: 'French Drain vs Sump Pump', href: '/blog/french-drain-vs-sump-pump' }, { title: 'Sump Pump Maintenance Guide', href: '/blog/sump-pump-maintenance-guide' }].map((p, i) => (<Link key={i} href={p.href} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"><svg className="w-5 h-5 text-[#115997] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg><span className="text-sm font-medium text-gray-800">{p.title}</span></Link>))}
          </div>
        </div>
      </section>

      <section className="py-8 bg-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-gray-500 mb-4"><Link href="/" className="hover:text-[#115997]">Home</Link> {' / '}<Link href="/drainage" className="hover:text-[#115997]">Drainage</Link> {' / '}<span className="text-gray-700">Sandy Springs</span></p>
          <p className="text-sm text-gray-500">Drainage solutions also available in <Link href="/drainage/lawrenceville" className="text-[#115997] hover:underline">Lawrenceville</Link>, <Link href="/drainage/marietta" className="text-[#115997] hover:underline">Marietta</Link>, <Link href="/drainage/roswell" className="text-[#115997] hover:underline">Roswell</Link>, <Link href="/drainage/alpharetta" className="text-[#115997] hover:underline">Alpharetta</Link>, <Link href="/drainage/decatur" className="text-[#115997] hover:underline">Decatur</Link>, and <Link href="/drainage/stone-mountain" className="text-[#115997] hover:underline">Stone Mountain</Link>.</p>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-[#115997]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 font-display">Free Drainage Inspection in Sandy Springs</h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">We will walk your Sandy Springs property during or after rain if possible, trace where water flows and where it pools, and design a drainage plan for your specific terrain. No obligation.</p>
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