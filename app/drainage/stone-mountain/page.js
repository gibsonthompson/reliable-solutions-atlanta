import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export const metadata = {
  title: 'Drainage Solutions in Stone Mountain, GA | Free Inspection | Reliable Solutions Atlanta',
  description: 'Drainage solutions in Stone Mountain, GA. French drains, sump pumps, and granite substrata drainage for DeKalb County homes. Most projects $1,500-$7,000. Free inspection. 770-895-2039.',
  keywords: 'drainage Stone Mountain GA, French drain Stone Mountain, yard drainage DeKalb County, standing water Stone Mountain Georgia, granite drainage',
  openGraph: { title: 'Drainage Solutions in Stone Mountain, GA | Reliable Solutions Atlanta', description: 'Fix yard flooding caused by granite substrata in Stone Mountain. Free inspections. 770-895-2039.', url: 'https://www.waterhelpme.com/drainage/stone-mountain', type: 'website' },
  alternates: { canonical: 'https://www.waterhelpme.com/drainage/stone-mountain' },
}

const faqs = [
  { question: 'How much do drainage solutions cost in Stone Mountain, GA?', answer: 'Drainage in Stone Mountain typically costs between $1,500 and $7,000. Stone Mountain homes are generally smaller, which keeps costs lower than north-side suburbs. French drains start around $1,500. Sump pump systems for crawl spaces run $1,500 to $2,500. Full perimeter drainage with pump and discharge costs $4,000 to $8,000.' },
  { question: 'Why does my Stone Mountain yard flood when my neighbor stays dry?', answer: 'The granite monadnock extends underground unevenly across the Stone Mountain area. Your property may sit directly above a granite shelf that channels water from a wide area toward your house, while your neighbor sits on a deeper soil column that absorbs water normally. Underground granite channels are invisible from the surface and vary from lot to lot.' },
  { question: 'Can you install a French drain on granite bedrock?', answer: 'Yes, but the approach differs from standard installation. When granite is close to the surface, we cannot trench to the normal depth. We install shallow French drains with wider gravel beds that capture water running along the rock surface and route it to a collection point. In some areas we trench directly on top of the granite, using the rock as a natural floor for the drain channel.' },
  { question: 'Why does my Stone Mountain crawl space flood?', answer: 'Water flowing laterally along shallow granite eventually finds the lowest point in the area, which is often the crawl space beneath your home. The crawl space sits in a depression relative to the surrounding grade, and water following the granite surface flows directly under the house. A perimeter drain with sump pump captures this water before it floods the crawl space.' },
  { question: 'Is a sump pump necessary for Stone Mountain homes?', answer: 'For homes on shallow granite, a sump pump is almost always necessary because gravity drainage is limited. The granite prevents drains from going deep enough to use gravity to a daylight discharge point. The pump lifts collected water above grade and discharges it away from the home. Battery backup is essential given the storm-driven power outages common in metro Atlanta.' },
]

export default function DrainageStoneMountain() {
  const jsonLd = { '@context': 'https://schema.org', '@type': 'Service', name: 'Drainage Solutions in Stone Mountain, GA', provider: { '@type': 'LocalBusiness', name: 'Reliable Solutions Atlanta', telephone: '+17708952039', url: 'https://www.waterhelpme.com', address: { '@type': 'PostalAddress', addressLocality: 'Stone Mountain', addressRegion: 'GA', addressCountry: 'US' }, areaServed: { '@type': 'City', name: 'Stone Mountain', containedIn: 'DeKalb County, GA' } }, serviceType: 'Drainage Solutions' }
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
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 font-display leading-tight">Drainage Solutions in Stone Mountain, GA</h1>
            <p className="text-white/80 text-lg sm:text-xl mb-8 leading-relaxed max-w-2xl">Drainage solutions in Stone Mountain typically cost between $1,500 and $7,000. Reliable Solutions Atlanta designs drainage specifically for the granite substrata conditions in eastern DeKalb County, where water runs laterally along underground rock instead of soaking into the ground. French drains, sump pumps, crawl space drainage, and foundation protection. Free same-week inspections.</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white text-[#273373] font-bold rounded-xl hover:bg-gray-100 transition-colors">Schedule Free Inspection</Link>
              <a href="tel:+17708952039" className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-transparent border-2 border-white/30 text-white font-bold rounded-xl hover:bg-white/10 transition-colors">(770) 895-2039</a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Why Stone Mountain Has Unique Drainage Problems</h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p>Stone Mountain's drainage problems are unlike anywhere else in metro Atlanta because of what is underground. The granite monadnock — the massive rock formation visible as Stone Mountain itself — extends underground across much of the surrounding area as a shallow bedrock layer. This granite is completely impermeable. Water cannot pass through it. Every drop of rain that soaks into the thin soil layer above the granite eventually hits rock and has nowhere to go but sideways.</p>
            <p>This lateral water movement creates invisible underground streams that follow the contours of the granite surface. A depression in the rock that is 3 feet underground can channel water from acres of surrounding land into a concentrated flow that arrives at your foundation or crawl space. Your neighbor 50 feet away might sit on a granite ridge that sheds water while you sit in a granite trough that collects it. There is no way to predict this from looking at the surface — it requires probing or observing water behavior during rain to understand the subsurface patterns.</p>
            <p>The housing stock in Stone Mountain — primarily 1960s through 1980s homes in the 30083, 30087, and 30088 zip codes along Memorial Drive, Rockbridge Road, and Hairston Road — was built without accounting for granite drainage patterns. Builders in this era installed simple footer drains and assumed the soil would absorb water normally. On granite, that assumption fails completely.</p>
            <p>The shallow soil layer above granite also has limited storage capacity. In areas where the granite is only 2 to 4 feet below the surface, the thin soil column saturates quickly during even moderate rain. Once saturated, all additional water runs across the surface or along the rock layer. This is why Stone Mountain homes can experience flooding from storms that cause no problems in other parts of metro Atlanta with deeper soil profiles.</p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Signs Your Stone Mountain Property Needs Drainage Work</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: 'Flooding from light rain that does not affect neighbors', desc: 'If your property floods from rain that your neighbors handle fine, you likely sit in a granite depression that collects subsurface water from a wide area. The water is not just coming from your lot — it is arriving from underground.' },
              { title: 'Crawl space standing water year-round', desc: 'Stone Mountain crawl spaces built over granite depressions can have standing water even during dry periods. The granite funnels groundwater from the surrounding area into the lowest point, which is often the space beneath your home.' },
              { title: 'Yard that is always soggy in the same spots', desc: 'Persistent wet spots that correspond to subsurface granite troughs indicate water is being channeled to those locations from underground. These spots never fully dry because the granite continues delivering water from the surrounding area.' },
              { title: 'Foundation walls with water staining from below', desc: 'If you see water stains that start at the base of the foundation and extend upward, water is being pushed up from below by pressure on the granite surface. This is different from wall leaks that start higher and drip downward.' },
              { title: 'Exposed granite visible in yard or at surface', desc: 'If you can see rock outcroppings in your yard, the granite is at or near the surface across your property. Every rain event sends water across this rock surface toward the lowest point, which may be your house.' },
              { title: 'Sump pump running constantly during wet seasons', desc: 'If you already have a sump pump and it runs frequently or continuously during rainy periods, the granite is delivering more water than the current system can manage. The pump needs a larger collection system feeding it.' },
            ].map((sign, i) => (
              <div key={i} className="bg-white rounded-xl p-5 shadow-sm"><h3 className="font-semibold text-[#273373] text-base mb-2">{sign.title}</h3><p className="text-gray-600 text-sm leading-relaxed">{sign.desc}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Drainage Solutions We Install in Stone Mountain</h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <h3 className="text-[#273373] font-display">Shallow French Drains on Granite</h3>
            <p>Where granite is close to the surface, standard-depth French drains are not possible. We install shallow drains directly on top of the granite surface, using the rock as a natural impermeable floor for the drain channel. The gravel bed above the pipe captures water running along the rock surface and the pipe carries it to a collection point. These shallow systems are effective because they are installed exactly where the water is traveling — on the granite itself.</p>
            <h3 className="text-[#273373] font-display">Crawl Space Perimeter Drainage with Sump</h3>
            <p>For Stone Mountain crawl spaces that flood from granite-channeled water, we install a perimeter drain inside the crawl space that collects water at the foundation walls and routes it to a sump pit. A submersible pump with battery backup discharges the water away from the house. This is the most common drainage solution we install in Stone Mountain because so many homes have crawl spaces sitting on or near granite.</p>
            <h3 className="text-[#273373] font-display">Granite Surface Interception Drain</h3>
            <p>When we can identify the direction of the underground water flow, we install an interception drain uphill of the house that captures water at the granite surface before it reaches the foundation. We trench down to the rock, lay pipe in gravel directly on the granite, and route the water around the house to a safe discharge point. This catches the water at the source rather than trying to manage it after it arrives.</p>
            <h3 className="text-[#273373] font-display">Surface Grading and Swale Creation</h3>
            <p>Even on thin soil over granite, surface grading makes a difference. We create positive slope away from the foundation using added topsoil and create shallow swales that direct surface water to drain collection points. On rocky lots where traditional grading is limited, we use a combination of added soil, retaining edging, and channel drains to control surface flow.</p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Drainage Costs in Stone Mountain</h2>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#273373] text-white"><tr><th className="px-6 py-4 text-left text-sm font-semibold">Service</th><th className="px-6 py-4 text-left text-sm font-semibold">Typical Cost</th><th className="px-6 py-4 text-left text-sm font-semibold hidden sm:table-cell">Timeline</th></tr></thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ['Shallow French drain on granite (per linear ft)', '$20 – $45', '1-2 days'],
                  ['Yard French drain (50-80 ft run)', '$1,500 – $4,000', '1-2 days'],
                  ['Crawl space perimeter drain + sump', '$2,500 – $5,000', '1-2 days'],
                  ['Granite surface interception drain', '$2,000 – $5,000', '1-2 days'],
                  ['Sump pump with battery backup', '$1,500 – $2,500', '1 day'],
                  ['Surface grading and swale creation', '$1,000 – $3,000', '1-2 days'],
                  ['Full property drainage system', '$4,000 – $8,000', '2-4 days'],
                ].map(([r, c, t], i) => (<tr key={i} className="hover:bg-gray-50"><td className="px-6 py-4 text-sm text-gray-900">{r}</td><td className="px-6 py-4 text-sm font-semibold text-[#115997]">{c}</td><td className="px-6 py-4 text-sm text-gray-500 hidden sm:table-cell">{t}</td></tr>))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mt-4">Financing available through GreenSky with plans starting at 0% interest. Lawn restoration included.</p>
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
              { title: 'Foundation Repair', href: '/foundation-repair/stone-mountain', desc: 'Granite-channeled water damages foundations. Fix drainage to prevent ongoing structural damage.' },
              { title: 'Basement Waterproofing', href: '/basement-waterproofing/stone-mountain', desc: 'Interior waterproofing for Stone Mountain basements where granite delivers water to the walls.' },
              { title: 'Crawl Space Encapsulation', href: '/crawl-space-encapsulation', desc: 'Seal your crawl space after drainage is installed to create a completely dry environment under your home.' },
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
          <p className="text-sm text-gray-500 mb-4"><Link href="/" className="hover:text-[#115997]">Home</Link> {' / '}<Link href="/drainage" className="hover:text-[#115997]">Drainage</Link> {' / '}<span className="text-gray-700">Stone Mountain</span></p>
          <p className="text-sm text-gray-500">Drainage solutions also available in <Link href="/drainage/lawrenceville" className="text-[#115997] hover:underline">Lawrenceville</Link>, <Link href="/drainage/marietta" className="text-[#115997] hover:underline">Marietta</Link>, <Link href="/drainage/roswell" className="text-[#115997] hover:underline">Roswell</Link>, <Link href="/drainage/alpharetta" className="text-[#115997] hover:underline">Alpharetta</Link>, <Link href="/drainage/decatur" className="text-[#115997] hover:underline">Decatur</Link>, and <Link href="/drainage/sandy-springs" className="text-[#115997] hover:underline">Sandy Springs</Link>.</p>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-[#115997]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 font-display">Free Drainage Inspection in Stone Mountain</h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">We know how water moves through Stone Mountain soil and rock. We will inspect your property, identify the subsurface water patterns affecting your home, and design a drainage solution that works with the granite. No obligation.</p>
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