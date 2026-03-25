import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export const metadata = {
  title: 'Drainage Solutions in Marietta, GA | Free Inspection | Reliable Solutions Atlanta',
  description: 'Drainage solutions in Marietta, GA. Hillside drainage, French drains, retaining wall drainage, and erosion control for Cobb County homes. Most projects $2,500-$10,000. Free inspection. 770-895-2039.',
  keywords: 'drainage Marietta GA, French drain Marietta, hillside drainage Cobb County, yard drainage Marietta Georgia, erosion control Marietta',
  openGraph: { title: 'Drainage Solutions in Marietta, GA | Reliable Solutions Atlanta', description: 'Fix hillside runoff and yard drainage in Marietta. Free inspections. 770-895-2039.', url: 'https://www.waterhelpme.com/drainage/marietta', type: 'website' },
  alternates: { canonical: 'https://www.waterhelpme.com/drainage/marietta' },
}

const faqs = [
  { question: 'How much do drainage solutions cost in Marietta, GA?', answer: 'Drainage projects in Marietta typically cost between $2,500 and $10,000. Hillside homes in East and West Cobb often require more extensive systems than flat lots due to the volume of water moving downhill. French drains start around $2,000. Curtain drains for hillside interception run $3,000 to $6,000. Full property drainage systems with multiple runs can reach $10,000 to $15,000.' },
  { question: 'Why does my Marietta hillside yard erode so badly?', answer: 'Cobb County hills create natural water velocity. When rain falls on a slope, gravity accelerates the water as it flows downhill. This fast-moving water picks up soil particles and carries them away, creating erosion channels that deepen with every storm. The clay and rocky soil mix in Marietta does not absorb water fast enough to slow the runoff before it gains speed.' },
  { question: 'Do I need a retaining wall drain in Marietta?', answer: 'If you have a retaining wall, it almost certainly needs drainage. Retaining walls in Marietta hold back clay soil that becomes extremely heavy when saturated. Without a drain behind the wall to relieve hydrostatic pressure, the water-loaded soil pushes the wall forward until it fails. Most retaining wall failures in Cobb County are drainage failures, not structural failures.' },
  { question: 'Can drainage fix my wet walk-out basement in Marietta?', answer: 'Exterior drainage is often the most effective first step for wet walk-out basements on Marietta hillsides. A curtain drain installed uphill of the basement intercepts water flowing down the hill before it reaches the foundation. This can reduce or eliminate water entry without the need for interior basement waterproofing.' },
  { question: 'How do you handle drainage on rocky Marietta soil?', answer: 'West Cobb and areas near Kennesaw Mountain have rocky soil mixed with clay. We use rock saws and mini excavators to trench through rocky sections. The rock actually helps drainage once the trench is installed because it does not compact around the pipe like clay does. We size the gravel bed larger in rocky areas to ensure water can reach the pipe.' },
]

export default function DrainageMarietta() {
  const jsonLd = { '@context': 'https://schema.org', '@type': 'Service', name: 'Drainage Solutions in Marietta, GA', provider: { '@type': 'LocalBusiness', name: 'Reliable Solutions Atlanta', telephone: '+17708952039', url: 'https://www.waterhelpme.com', address: { '@type': 'PostalAddress', addressLocality: 'Marietta', addressRegion: 'GA', addressCountry: 'US' }, areaServed: { '@type': 'City', name: 'Marietta', containedIn: 'Cobb County, GA' } }, serviceType: 'Drainage Solutions' }
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
            <p className="text-white/70 text-sm font-medium mb-3 uppercase tracking-wider">Cobb County, Georgia</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 font-display leading-tight">Drainage Solutions in Marietta, GA</h1>
            <p className="text-white/80 text-lg sm:text-xl mb-8 leading-relaxed max-w-2xl">Drainage solutions in Marietta typically cost between $2,500 and $10,000. Reliable Solutions Atlanta designs drainage systems specifically for Cobb County's hilly terrain, where water moves fast downhill and causes erosion, foundation damage, and basement flooding. French drains, curtain drains, hillside interception, and retaining wall drainage. Free same-week inspections.</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white text-[#273373] font-bold rounded-xl hover:bg-gray-100 transition-colors">Schedule Free Inspection</Link>
              <a href="tel:+17708952039" className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-transparent border-2 border-white/30 text-white font-bold rounded-xl hover:bg-white/10 transition-colors">(770) 895-2039</a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Why Marietta Has Drainage Challenges</h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p>Marietta's rolling hills are what make Cobb County beautiful, but they create drainage problems that flat suburbs never face. Water follows gravity, and in a hilly neighborhood every property receives runoff from the properties above it. The East Cobb communities along Johnson Ferry Road, Lower Roswell Road, and the Sope Creek area have some of the most significant grade changes in metro Atlanta, with some lots dropping 20 to 40 feet from the back property line to the front.</p>
            <p>When rain falls on these slopes, the clay soil absorbs what it can and then the rest runs downhill as surface flow. This surface flow accelerates as it moves, picking up energy and soil particles. By the time it reaches the lower portion of a yard — where the house usually sits — it is moving fast enough to erode landscaping, undercut retaining walls, and deliver large volumes of water against the foundation in a short period.</p>
            <p>West Cobb presents a different drainage challenge. The areas near Kennesaw Mountain, Due West Road, and Dallas Highway have soil with a high rock content mixed into the clay. Rock does not absorb water at all, so surface flow starts immediately when rain begins. The rocky substrate also prevents water from draining vertically through the soil column, forcing it to flow laterally until it finds a low point — often a yard, a driveway, or a foundation wall.</p>
            <p>Historic Marietta near the Square and the neighborhoods along Church Street and Whitlock Avenue have mature landscaping and large trees that create root systems blocking original drainage infrastructure. Roots grow into clay drainage tiles installed decades ago, clogging them and causing water to back up in unexpected locations.</p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Signs Your Marietta Property Needs Drainage Work</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: 'Erosion gullies on hillside yards', desc: 'Visible channels carved into your lawn where water flows during rain. These gullies deepen with every storm and can eventually undermine retaining walls, fences, and structures.' },
              { title: 'Retaining wall leaning or cracking', desc: 'A retaining wall that is tilting forward, developing horizontal cracks, or has gaps opening between blocks is failing from water pressure behind it. The soil behind the wall is saturated and pushing with thousands of pounds of force.' },
              { title: 'Water flowing toward the house during rain', desc: 'Stand in your yard during moderate rain and watch where water goes. If it flows toward any part of your house rather than away from it, the grading is wrong and needs correction before foundation damage occurs.' },
              { title: 'Soggy area at the base of a slope', desc: 'A perpetually wet zone at the bottom of a hill collects water from the entire slope above it. If your home sits at the base of a slope, this soggy zone may be right against your foundation.' },
              { title: 'Driveway wash-out or sediment deposits', desc: 'Sediment collecting at the bottom of a sloped driveway or on sidewalks after rain indicates uncontrolled surface runoff. The soil that deposited there came from somewhere on your property that is actively eroding.' },
              { title: 'Basement or crawl space water on the uphill side', desc: 'Water appearing inside the home on the side that faces uphill is almost always a drainage issue, not a waterproofing issue. The solution starts outside with intercepting the water before it reaches the wall.' },
            ].map((sign, i) => (
              <div key={i} className="bg-white rounded-xl p-5 shadow-sm"><h3 className="font-semibold text-[#273373] text-base mb-2">{sign.title}</h3><p className="text-gray-600 text-sm leading-relaxed">{sign.desc}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Drainage Solutions We Install in Marietta</h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <h3 className="text-[#273373] font-display">Hillside Curtain Drains</h3>
            <p>A curtain drain is installed across the slope above the problem area to intercept water as it flows downhill. We trench across the full width of the water path, install perforated pipe in gravel, and route it to a discharge point at the side of the property. This captures the subsurface water that feeds the soggy zone before it reaches your foundation or retaining wall. For Marietta hillside homes, this is often the single most impactful drainage improvement.</p>
            <h3 className="text-[#273373] font-display">Retaining Wall French Drains</h3>
            <p>Every retaining wall needs a drain behind it to relieve hydrostatic pressure. We install a perforated pipe in a gravel pocket along the back of the wall with weep holes that allow water to exit through the wall face. For existing walls that were built without drainage, we can retrofit a drain by excavating behind the wall and installing the system without dismantling the wall itself.</p>
            <h3 className="text-[#273373] font-display">Terraced Drainage Systems</h3>
            <p>For steep Marietta lots where a single drain cannot handle the volume, we install multiple drain runs at different elevations. Each run captures water at its level and routes it to the side, preventing it from accumulating as it flows downhill. This terraced approach is effective on lots with 20+ feet of grade change where the water volume at the bottom would overwhelm a single system.</p>
            <h3 className="text-[#273373] font-display">Erosion Control with Riprap and Hardscaping</h3>
            <p>In areas where water velocity is too high for grass or mulch to survive, we install riprap (loose stone), dry creek beds, or hardscaped channels that slow and direct the water without eroding. These features can be designed to look like natural landscape elements while solving the drainage problem permanently.</p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Drainage Costs in Marietta</h2>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#273373] text-white"><tr><th className="px-6 py-4 text-left text-sm font-semibold">Service</th><th className="px-6 py-4 text-left text-sm font-semibold">Typical Cost</th><th className="px-6 py-4 text-left text-sm font-semibold hidden sm:table-cell">Timeline</th></tr></thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ['French drain (per linear ft)', '$25 – $55', '1-2 days'],
                  ['Hillside curtain drain', '$3,000 – $6,000', '1-2 days'],
                  ['Retaining wall drain retrofit', '$2,000 – $5,000', '1-2 days'],
                  ['Terraced multi-run system', '$5,000 – $12,000', '2-4 days'],
                  ['Dry creek bed / riprap channel', '$1,500 – $4,000', '1-2 days'],
                  ['Downspout underground routing', '$300 – $600 per downspout', 'Same day'],
                  ['Full property drainage plan', '$6,000 – $15,000', '3-5 days'],
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
          <h2 className="text-2xl font-bold text-[#273373] mb-6 font-display">Related Services in Marietta</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { title: 'Foundation Repair', href: '/foundation-repair/marietta', desc: 'Hillside drainage problems cause foundation damage. Fix the drainage to prevent recurring repairs.' },
              { title: 'Basement Waterproofing', href: '/basement-waterproofing/marietta', desc: 'Interior waterproofing for Marietta walk-out basements where exterior drainage alone is not enough.' },
              { title: 'Crawl Space Encapsulation', href: '/crawl-space-encapsulation', desc: 'For Marietta homes on crawl spaces, encapsulation works with drainage to keep the structure dry.' },
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
          <p className="text-sm text-gray-500 mb-4"><Link href="/" className="hover:text-[#115997]">Home</Link> {' / '}<Link href="/drainage" className="hover:text-[#115997]">Drainage</Link> {' / '}<span className="text-gray-700">Marietta</span></p>
          <p className="text-sm text-gray-500">Drainage solutions also available in <Link href="/drainage/lawrenceville" className="text-[#115997] hover:underline">Lawrenceville</Link>, <Link href="/drainage/roswell" className="text-[#115997] hover:underline">Roswell</Link>, <Link href="/drainage/alpharetta" className="text-[#115997] hover:underline">Alpharetta</Link>, <Link href="/drainage/decatur" className="text-[#115997] hover:underline">Decatur</Link>, <Link href="/drainage/sandy-springs" className="text-[#115997] hover:underline">Sandy Springs</Link>, and <Link href="/drainage/stone-mountain" className="text-[#115997] hover:underline">Stone Mountain</Link>.</p>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-[#115997]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 font-display">Free Drainage Inspection in Marietta</h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">We will walk your Marietta property, trace where water is coming from and where it needs to go, and design a drainage plan that works with your terrain. Free inspection, no obligation.</p>
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