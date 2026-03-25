import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export const metadata = {
  title: 'Drainage Solutions in Lawrenceville, GA | Free Inspection | Reliable Solutions Atlanta',
  description: 'Drainage solutions in Lawrenceville, GA. French drains, yard drainage, downspout extensions, and grading for Gwinnett County homes. Most projects $2,000-$8,000. Free inspection. 770-895-2039.',
  keywords: 'drainage Lawrenceville GA, French drain Lawrenceville, yard drainage Gwinnett County, standing water yard Lawrenceville Georgia',
  openGraph: { title: 'Drainage Solutions in Lawrenceville, GA | Reliable Solutions Atlanta', description: 'Fix yard flooding and foundation drainage in Lawrenceville. French drains, grading, sump pumps. Free inspection. 770-895-2039.', url: 'https://www.waterhelpme.com/drainage/lawrenceville', type: 'website' },
  alternates: { canonical: 'https://www.waterhelpme.com/drainage/lawrenceville' },
}

const faqs = [
  { question: 'How much does a French drain cost in Lawrenceville, GA?', answer: 'A French drain in Lawrenceville typically costs between $2,000 and $6,000 depending on the length and depth. Simple yard drainage runs $1,500 to $3,000. Full perimeter foundation drainage with sump pump ranges from $4,000 to $10,000. Grading corrections start around $1,000.' },
  { question: 'Why does my Lawrenceville yard hold standing water?', answer: 'Lawrenceville sits on heavy Georgia red clay that drains extremely slowly. When it rains, clay soil absorbs water until saturated, then stops absorbing entirely. Water pools on the surface in low spots and stays there for days because the clay beneath cannot accept any more moisture. Many Gwinnett County subdivisions also have compacted fill soil that drains even worse than natural clay.' },
  { question: 'Will a French drain fix my Lawrenceville yard flooding?', answer: 'In most cases, yes. A French drain collects water from saturated soil and channels it through a perforated pipe surrounded by gravel to a discharge point. In Lawrenceville clay, the key is placing the drain at the right depth and slope to intercept water before it pools. We design each system based on your specific yard grade and water patterns.' },
  { question: 'Does poor drainage damage my Lawrenceville home foundation?', answer: 'Yes. Standing water near your foundation keeps the clay soil saturated, which creates hydrostatic pressure against basement and crawl space walls. Over time, this pressure causes cracking, bowing, and water intrusion. Poor drainage is the number one cause of foundation problems in Gwinnett County homes.' },
  { question: 'How long does drainage installation take in Lawrenceville?', answer: 'Most Lawrenceville drainage projects take 1 to 3 days. A simple French drain or channel drain is typically a single day. Larger projects combining multiple drain runs, grading, and downspout rerouting take 2 to 3 days. We restore disturbed lawn areas with seed or sod as part of the project.' },
]

export default function DrainageLawrenceville() {
  const jsonLd = { '@context': 'https://schema.org', '@type': 'Service', name: 'Drainage Solutions in Lawrenceville, GA', provider: { '@type': 'LocalBusiness', name: 'Reliable Solutions Atlanta', telephone: '+17708952039', url: 'https://www.waterhelpme.com', address: { '@type': 'PostalAddress', addressLocality: 'Lawrenceville', addressRegion: 'GA', addressCountry: 'US' }, areaServed: { '@type': 'City', name: 'Lawrenceville', containedIn: 'Gwinnett County, GA' } }, serviceType: 'Drainage Solutions' }
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
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 font-display leading-tight">Drainage Solutions in Lawrenceville, GA</h1>
            <p className="text-white/80 text-lg sm:text-xl mb-8 leading-relaxed max-w-2xl">Drainage solutions in Lawrenceville typically cost between $2,000 and $8,000. Reliable Solutions Atlanta fixes yard flooding, foundation drainage, and water management problems caused by Gwinnett County's heavy clay soil. French drains, channel drains, grading corrections, and sump pump systems. Free same-week inspections.</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white text-[#273373] font-bold rounded-xl hover:bg-gray-100 transition-colors">Schedule Free Inspection</Link>
              <a href="tel:+17708952039" className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-transparent border-2 border-white/30 text-white font-bold rounded-xl hover:bg-white/10 transition-colors">(770) 895-2039</a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Why Lawrenceville Has Drainage Problems</h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p>Lawrenceville and greater Gwinnett County sit on some of the heaviest red clay soil in metro Atlanta. This clay has a percolation rate near zero when saturated — meaning once it is full of water, it stops accepting any more. Every additional drop of rain sits on the surface or runs along the top of the saturated clay until it finds a low spot. In a flat subdivision, that low spot is often your yard, your driveway, or the soil directly against your foundation.</p>
            <p>The subdivisions built during Gwinnett County's building boom from the 1980s through early 2000s — Sugarloaf, Collins Hill, Archer Ridge, Mallard Landing, and dozens of others in the 30043 and 30044 zip codes — were graded by builders who were moving quickly. The original grading was designed to slope water away from foundations, but after 20 to 30 years of soil compaction, settling, and landscaping changes, many yards have developed reverse grades that direct water toward the house.</p>
            <p>Downspout management is another chronic issue in Lawrenceville. Most homes have gutters that discharge at splash blocks directly next to the foundation. In clay soil, this concentrated water dump saturates the soil immediately around the foundation wall — exactly where you want the least amount of moisture. Extending downspouts away from the house is one of the simplest and most impactful drainage improvements available.</p>
            <p>We also see significant drainage problems in Lawrenceville caused by neighbor-to-neighbor water flow. When an uphill neighbor adds a patio, builds a retaining wall, or changes their grading, the runoff that used to spread across their yard gets concentrated and directed onto the downhill property. Georgia law addresses this through the natural flow doctrine, but the practical solution is usually a drainage system on the receiving property.</p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Signs Your Lawrenceville Property Needs Drainage Work</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: 'Standing water in the yard after rain', desc: 'If puddles remain in your yard 24+ hours after rain stops, the clay soil is saturated and has nowhere to send the water. This is the most common drainage complaint in Lawrenceville subdivisions.' },
              { title: 'Soggy or spongy lawn areas', desc: 'Spots in the yard that feel soft and squishy underfoot even when it has not rained recently indicate a high water table or subsurface water flow that keeps the soil saturated from below.' },
              { title: 'Water pooling near the foundation', desc: 'Water collecting at the base of your house within hours of rain is the most urgent drainage issue. This water creates hydrostatic pressure against basement and crawl space walls and is the primary cause of foundation damage.' },
              { title: 'Erosion channels in the yard', desc: 'Visible ruts or wash-out channels where water flows across your yard during rain indicate concentrated runoff that needs to be captured and directed. Unchecked erosion worsens with every storm.' },
              { title: 'Mulch or soil washing away from beds', desc: 'Landscaping beds that lose their mulch or soil after rain are in the path of uncontrolled runoff. The water that washes your mulch away is also depositing sediment in areas you do not want it.' },
              { title: 'Driveway or walkway flooding', desc: 'Water sheeting across the driveway or pooling at the garage entrance means surface drainage is not carrying water to the street or storm system. Channel drains at the driveway edge solve this.' },
            ].map((sign, i) => (
              <div key={i} className="bg-white rounded-xl p-5 shadow-sm"><h3 className="font-semibold text-[#273373] text-base mb-2">{sign.title}</h3><p className="text-gray-600 text-sm leading-relaxed">{sign.desc}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Drainage Solutions We Install in Lawrenceville</h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <h3 className="text-[#273373] font-display">French Drain Systems</h3>
            <p>The workhorse of Lawrenceville drainage. We trench a channel along the problem area, line it with filter fabric, fill it with washed gravel, and lay perforated pipe that collects water from the saturated soil and channels it to a discharge point — either to the street, a dry well, or a lower area of the yard away from the home. For Lawrenceville clay, we use larger gravel beds than standard specifications because the clay needs more surface area to release its water into the drain.</p>
            <h3 className="text-[#273373] font-display">Surface Channel Drains</h3>
            <p>For driveways, patios, and walkways where water sheets across the surface, we install channel drains (also called trench drains) with grated tops. These linear drains sit flush with the surface and capture water as it flows across, routing it underground to a discharge point. They are effective at the bottom of sloped driveways and at the transition between patios and lawn.</p>
            <h3 className="text-[#273373] font-display">Downspout Extensions and Underground Routing</h3>
            <p>We connect gutter downspouts to buried corrugated pipe that carries roof water 15 to 25 feet away from the foundation before discharging to grade. This single improvement removes the largest concentrated water source from your foundation perimeter. For Lawrenceville homes where the lot does not allow long surface extensions, buried routing is the clean solution.</p>
            <h3 className="text-[#273373] font-display">Grading and Swale Corrections</h3>
            <p>When the yard grade has settled and water flows toward the house instead of away from it, we regrade the soil to restore the original positive slope. We also create shallow swales — gentle V-shaped surface channels — that guide water around the house to a safe discharge location. Proper grading is the foundation of every drainage plan.</p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Drainage Costs in Lawrenceville</h2>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#273373] text-white"><tr><th className="px-6 py-4 text-left text-sm font-semibold">Service</th><th className="px-6 py-4 text-left text-sm font-semibold">Typical Cost</th><th className="px-6 py-4 text-left text-sm font-semibold hidden sm:table-cell">Timeline</th></tr></thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ['French drain (per linear ft)', '$25 – $50', '1-2 days'],
                  ['Yard French drain (50-100 ft run)', '$2,000 – $5,000', '1-2 days'],
                  ['Foundation perimeter drain', '$4,000 – $10,000', '2-3 days'],
                  ['Channel drain (per linear ft)', '$30 – $60', '1 day'],
                  ['Downspout underground routing (per downspout)', '$300 – $600', 'Same day'],
                  ['Grading and swale correction', '$1,000 – $4,000', '1-2 days'],
                  ['Sump pump with discharge line', '$1,500 – $3,000', '1 day'],
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
          <h2 className="text-2xl font-bold text-[#273373] mb-6 font-display">Related Services in Lawrenceville</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { title: 'Foundation Repair', href: '/foundation-repair/lawrenceville', desc: 'Poor drainage is the #1 cause of foundation damage. Fix drainage to prevent costly foundation repairs.' },
              { title: 'Basement Waterproofing', href: '/basement-waterproofing/lawrenceville', desc: 'Interior drainage systems for Lawrenceville basements that are already taking on water.' },
              { title: 'Crawl Space Waterproofing', href: '/crawl-space-waterproofing', desc: 'For Lawrenceville homes on crawl spaces, waterproofing keeps ground moisture out of the structure.' },
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
          <p className="text-sm text-gray-500 mb-4"><Link href="/" className="hover:text-[#115997]">Home</Link> {' / '}<Link href="/drainage" className="hover:text-[#115997]">Drainage</Link> {' / '}<span className="text-gray-700">Lawrenceville</span></p>
          <p className="text-sm text-gray-500">Drainage solutions also available in <Link href="/drainage/marietta" className="text-[#115997] hover:underline">Marietta</Link>, <Link href="/drainage/roswell" className="text-[#115997] hover:underline">Roswell</Link>, <Link href="/drainage/alpharetta" className="text-[#115997] hover:underline">Alpharetta</Link>, <Link href="/drainage/decatur" className="text-[#115997] hover:underline">Decatur</Link>, <Link href="/drainage/sandy-springs" className="text-[#115997] hover:underline">Sandy Springs</Link>, and <Link href="/drainage/stone-mountain" className="text-[#115997] hover:underline">Stone Mountain</Link>.</p>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-[#115997]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 font-display">Free Drainage Inspection in Lawrenceville</h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">We will walk your Lawrenceville property, identify where water is going and where it should go, and give you a clear plan with pricing. No obligation, no sales pressure.</p>
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