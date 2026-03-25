import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export const metadata = {
  title: 'Drainage Solutions in Roswell, GA | Free Inspection | Reliable Solutions Atlanta',
  description: 'Drainage solutions in Roswell, GA. French drains, creek overflow management, root-damaged drain replacement, and grading for North Fulton homes. Most projects $3,000-$10,000. Free inspection. 770-895-2039.',
  keywords: 'drainage Roswell GA, French drain Roswell, yard drainage North Fulton, standing water yard Roswell Georgia, creek flooding Roswell',
  openGraph: { title: 'Drainage Solutions in Roswell, GA | Reliable Solutions Atlanta', description: 'Fix yard flooding and protect your Roswell home investment. Free inspections. 770-895-2039.', url: 'https://www.waterhelpme.com/drainage/roswell', type: 'website' },
  alternates: { canonical: 'https://www.waterhelpme.com/drainage/roswell' },
}

const faqs = [
  { question: 'How much do drainage solutions cost in Roswell, GA?', answer: 'Drainage projects in Roswell typically cost between $3,000 and $10,000. Roswell properties tend to be larger with more complex landscaping that requires careful drainage design. French drains start around $2,500. Creek bank stabilization runs $4,000 to $8,000. Full property drainage systems with multiple drain runs can reach $12,000 to $18,000.' },
  { question: 'Do tree roots damage drainage systems in Roswell?', answer: 'Yes. Roswell has one of the densest mature tree canopies in metro Atlanta. Large hardwood roots seek out moisture sources and grow into perforated drain pipes, clay tiles, and even PVC joints. A single root penetration can block an entire drain line. We use root-resistant materials and install root barriers where trees are close to new drainage runs.' },
  { question: 'Can drainage solve my Roswell creek flooding problem?', answer: 'We can manage how creek overflow affects your property by installing interception drains, regrading to redirect overflow paths, and reinforcing creek banks with riprap. However, we cannot control the creek flow itself — that is often a municipal or county responsibility. We design systems that protect your home even when creeks overflow their banks.' },
  { question: 'Will drainage work damage my Roswell landscaping?', answer: 'We take special care with established Roswell landscapes. We use narrow trenching equipment that minimizes lawn disturbance, work around mature tree root zones, and restore all disturbed areas with sod or seed. For high-end landscaping, we coordinate with your landscaper to protect plantings and hardscaping during the project.' },
  { question: 'How does the Chattahoochee River affect drainage in Roswell?', answer: 'Homes near the Chattahoochee, Vickery Creek, and Big Creek have elevated water tables that reduce the soil capacity to absorb water. During prolonged rain, the water table rises close to the surface, and your yard essentially sits on top of water. French drains still work but need to discharge to a point lower than the water table, which sometimes requires sump pump assistance.' },
]

export default function DrainageRoswell() {
  const jsonLd = { '@context': 'https://schema.org', '@type': 'Service', name: 'Drainage Solutions in Roswell, GA', provider: { '@type': 'LocalBusiness', name: 'Reliable Solutions Atlanta', telephone: '+17708952039', url: 'https://www.waterhelpme.com', address: { '@type': 'PostalAddress', addressLocality: 'Roswell', addressRegion: 'GA', addressCountry: 'US' }, areaServed: { '@type': 'City', name: 'Roswell', containedIn: 'Fulton County, GA' } }, serviceType: 'Drainage Solutions' }
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
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 font-display leading-tight">Drainage Solutions in Roswell, GA</h1>
            <p className="text-white/80 text-lg sm:text-xl mb-8 leading-relaxed max-w-2xl">Drainage solutions in Roswell typically cost between $3,000 and $10,000. Reliable Solutions Atlanta designs drainage systems that protect Roswell homes and their established landscaping from the unique challenges of the Chattahoochee corridor — high water tables, creek overflow, tree root intrusion, and clay soil saturation. Free same-week inspections.</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white text-[#273373] font-bold rounded-xl hover:bg-gray-100 transition-colors">Schedule Free Inspection</Link>
              <a href="tel:+17708952039" className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-transparent border-2 border-white/30 text-white font-bold rounded-xl hover:bg-white/10 transition-colors">(770) 895-2039</a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Why Roswell Has Drainage Challenges</h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p>Roswell's drainage challenges come from three sources that most metro Atlanta suburbs do not face simultaneously: a high water table from the Chattahoochee River and its tributaries, one of the densest mature tree canopies in the region, and clay soil that refuses to drain on its own. These factors combine to create persistent moisture problems that damage foundations, kill lawns, and make yards unusable for weeks after rain.</p>
            <p>The neighborhoods closest to the Chattahoochee — Willeo, Rivermont, Martin Landing, and the areas along Azalea Drive and River Valley Road — sit on land where the water table is naturally high. During extended wet periods, the water table can rise to within a few feet of the surface. When your soil column is already full of water from below, there is nowhere for rain to go except across the surface. French drains in these areas must account for the water table elevation and sometimes require pump-assisted discharge.</p>
            <p>Roswell's mature trees create a paradox for drainage. Their root systems consume large quantities of soil moisture during growing season, which helps keep the soil from saturation in summer. But those same roots grow into and through drainage infrastructure — clay tiles, perforated pipes, and even solid PVC joints. We frequently find that a Roswell homeowner's drainage problem is not the absence of a drain system but the failure of an existing system that has been compromised by root intrusion over 20 to 30 years.</p>
            <p>The established Roswell neighborhoods in the 30075 and 30076 zip codes also have significant landscaping investments. Properties with custom hardscaping, specimen plantings, and mature beds require drainage solutions that protect these investments rather than destroying them during installation. This is a different challenge than working in a new subdivision with nothing but grass.</p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Signs Your Roswell Property Needs Drainage Work</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: 'Perpetually soggy lawn near the creek or river', desc: 'If your property borders or sits near Vickery Creek, Big Creek, or the Chattahoochee, and portions of your lawn never fully dry out, the water table is too close to the surface for natural drainage to work.' },
              { title: 'Water pooling around mature tree bases', desc: 'Trees in Roswell yards create depressions over time as their root systems lift and shift soil. These depressions trap water that saturates the soil around the tree and can cause root rot in species not adapted to standing water.' },
              { title: 'Drainage system that used to work but no longer does', desc: 'If your property had working drainage 10 to 15 years ago but now floods again, root intrusion is the likely culprit. Roots grow slowly into pipes until they create a blockage that backs up the entire system.' },
              { title: 'Erosion along creek or property boundaries', desc: 'Creek banks on Roswell properties erode during high water events, taking soil, landscaping, and sometimes sections of lawn with them. Unchecked erosion eventually threatens structures near the bank.' },
              { title: 'Irrigation system causing foundation saturation', desc: 'Roswell homes with automatic irrigation systems sometimes overwater zones near the foundation. The clay soil becomes and stays saturated from irrigation alone, creating the same hydrostatic pressure problems as rain-driven saturation.' },
              { title: 'Mushy lawn and moss growth in shaded areas', desc: 'Dense tree canopy prevents sunlight from drying the soil. Combined with poor drainage, these areas develop a permanently waterlogged condition that kills grass and supports moss, algae, and fungal growth.' },
            ].map((sign, i) => (
              <div key={i} className="bg-white rounded-xl p-5 shadow-sm"><h3 className="font-semibold text-[#273373] text-base mb-2">{sign.title}</h3><p className="text-gray-600 text-sm leading-relaxed">{sign.desc}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Drainage Solutions We Install in Roswell</h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <h3 className="text-[#273373] font-display">Root-Resistant French Drain Systems</h3>
            <p>For Roswell properties with mature trees, we install French drains using solid-wall pipe with sealed joints that resist root penetration. The gravel bed surrounding the pipe is wrapped in non-woven filter fabric that allows water through but blocks root growth. Where drains must pass within 15 feet of large trees, we install copper root barriers that chemically discourage root growth toward the pipe without harming the tree.</p>
            <h3 className="text-[#273373] font-display">High Water Table Drainage with Pump Assist</h3>
            <p>In the Chattahoochee corridor where gravity discharge is limited by the water table, we install French drains that route to a collection pit with a submersible pump. The pump activates when the water level rises and discharges to a point beyond the saturated zone. This hybrid approach handles both surface water and the elevated water table that makes traditional gravity drains insufficient.</p>
            <h3 className="text-[#273373] font-display">Creek Bank Stabilization</h3>
            <p>For Roswell properties losing ground to creek erosion, we install riprap armoring, bio-engineered slope reinforcement, and redirect uphill drainage away from vulnerable bank sections. This is not just aesthetic — creek erosion that progresses toward a home or outbuilding becomes a structural emergency. Addressing it proactively costs a fraction of emergency stabilization.</p>
            <h3 className="text-[#273373] font-display">Landscape-Sensitive Installation</h3>
            <p>We use compact trenching equipment that fits through gates and between beds. For hardscaped areas, we core through patios and walkways and restore them after installation. We protect root zones of specimen trees by hand-digging within the drip line. All disturbed lawn areas are restored with sod matched to your existing grass type.</p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Drainage Costs in Roswell</h2>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#273373] text-white"><tr><th className="px-6 py-4 text-left text-sm font-semibold">Service</th><th className="px-6 py-4 text-left text-sm font-semibold">Typical Cost</th><th className="px-6 py-4 text-left text-sm font-semibold hidden sm:table-cell">Timeline</th></tr></thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ['French drain with root barriers (per linear ft)', '$35 – $65', '1-2 days'],
                  ['Yard French drain (50-100 ft run)', '$3,000 – $6,000', '1-2 days'],
                  ['Pump-assisted drainage system', '$4,000 – $8,000', '2-3 days'],
                  ['Creek bank stabilization', '$4,000 – $8,000', '2-4 days'],
                  ['Existing drain replacement / root clearing', '$2,000 – $5,000', '1-2 days'],
                  ['Downspout underground routing (per downspout)', '$350 – $650', 'Same day'],
                  ['Full property drainage plan', '$8,000 – $18,000', '3-5 days'],
                ].map(([r, c, t], i) => (<tr key={i} className="hover:bg-gray-50"><td className="px-6 py-4 text-sm text-gray-900">{r}</td><td className="px-6 py-4 text-sm font-semibold text-[#115997]">{c}</td><td className="px-6 py-4 text-sm text-gray-500 hidden sm:table-cell">{t}</td></tr>))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mt-4">Financing available through GreenSky. Lawn and landscape restoration included.</p>
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
              { title: 'Foundation Repair', href: '/foundation-repair/roswell', desc: 'Poor drainage causes foundation damage. Fix drainage to prevent costly structural repairs in your Roswell home.' },
              { title: 'Basement Waterproofing', href: '/basement-waterproofing/roswell', desc: 'Interior waterproofing for Roswell basements where exterior drainage alone cannot overcome the high water table.' },
              { title: 'Crawl Space Encapsulation', href: '/crawl-space-encapsulation', desc: 'For Roswell homes on crawl spaces, encapsulation seals out the ground moisture that drainage redirects.' },
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
          <p className="text-sm text-gray-500 mb-4"><Link href="/" className="hover:text-[#115997]">Home</Link> {' / '}<Link href="/drainage" className="hover:text-[#115997]">Drainage</Link> {' / '}<span className="text-gray-700">Roswell</span></p>
          <p className="text-sm text-gray-500">Drainage solutions also available in <Link href="/drainage/lawrenceville" className="text-[#115997] hover:underline">Lawrenceville</Link>, <Link href="/drainage/marietta" className="text-[#115997] hover:underline">Marietta</Link>, <Link href="/drainage/alpharetta" className="text-[#115997] hover:underline">Alpharetta</Link>, <Link href="/drainage/decatur" className="text-[#115997] hover:underline">Decatur</Link>, <Link href="/drainage/sandy-springs" className="text-[#115997] hover:underline">Sandy Springs</Link>, and <Link href="/drainage/stone-mountain" className="text-[#115997] hover:underline">Stone Mountain</Link>.</p>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-[#115997]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 font-display">Free Drainage Inspection in Roswell</h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">We will walk your Roswell property, map where water is coming from and going, and design a drainage plan that protects your home and your landscaping. No obligation.</p>
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