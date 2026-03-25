import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export const metadata = {
  title: 'Drainage Solutions in Alpharetta, GA | Free Inspection | Reliable Solutions Atlanta',
  description: 'Drainage solutions in Alpharetta, GA. French drains, yard grading, downspout routing, and sump pumps for North Fulton subdivisions. Most projects $2,000-$8,000. Free inspection. 770-895-2039.',
  keywords: 'drainage Alpharetta GA, French drain Alpharetta, yard drainage North Fulton, standing water yard Alpharetta Georgia',
  openGraph: { title: 'Drainage Solutions in Alpharetta, GA | Reliable Solutions Atlanta', description: 'Fix yard flooding in your Alpharetta subdivision. Free inspections. 770-895-2039.', url: 'https://www.waterhelpme.com/drainage/alpharetta', type: 'website' },
  alternates: { canonical: 'https://www.waterhelpme.com/drainage/alpharetta' },
}

const faqs = [
  { question: 'How much do drainage solutions cost in Alpharetta, GA?', answer: 'Drainage projects in Alpharetta typically cost between $2,000 and $8,000. Simple yard drains and downspout rerouting start around $1,500. French drains for foundation protection run $2,500 to $6,000. Full property drainage systems with multiple runs and grading corrections can reach $10,000.' },
  { question: 'Why does my newer Alpharetta home have drainage problems?', answer: 'Many Alpharetta subdivisions built in the 1990s through 2010s were graded quickly during the building boom. The fill soil used to level lots was not always compacted in controlled lifts. After 15 to 25 years, this fill has settled unevenly, creating low spots and reverse grades that direct water toward the house instead of away from it.' },
  { question: 'Will my Alpharetta HOA allow drainage work?', answer: 'Most Alpharetta HOAs allow drainage improvements as long as the work does not alter the exterior appearance permanently or redirect water onto a neighboring property. We design systems with flush-mounted drain grates and underground routing that comply with typical HOA guidelines. We recommend checking your specific covenants before starting.' },
  { question: 'Can I fix drainage with just gutters and downspouts?', answer: 'Gutters and downspout extensions help, but they only manage roof water. In Alpharetta clay soil, the bigger problem is often surface runoff from the yard and neighboring properties, plus groundwater that saturates the soil from below. A complete drainage plan addresses all three water sources, not just roof water.' },
  { question: 'How do I know if my Alpharetta drainage problem is my responsibility or the builder?', answer: 'If your home is still within the builder warranty period (typically 1 to 2 years for grading, up to 10 years for structural), the builder may be responsible for drainage defects. We can provide a professional assessment documenting the drainage failure that supports a warranty claim. For homes past warranty, the homeowner is responsible.' },
]

export default function DrainageAlpharetta() {
  const jsonLd = { '@context': 'https://schema.org', '@type': 'Service', name: 'Drainage Solutions in Alpharetta, GA', provider: { '@type': 'LocalBusiness', name: 'Reliable Solutions Atlanta', telephone: '+17708952039', url: 'https://www.waterhelpme.com', address: { '@type': 'PostalAddress', addressLocality: 'Alpharetta', addressRegion: 'GA', addressCountry: 'US' }, areaServed: { '@type': 'City', name: 'Alpharetta', containedIn: 'Fulton County, GA' } }, serviceType: 'Drainage Solutions' }
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
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 font-display leading-tight">Drainage Solutions in Alpharetta, GA</h1>
            <p className="text-white/80 text-lg sm:text-xl mb-8 leading-relaxed max-w-2xl">Drainage solutions in Alpharetta typically cost between $2,000 and $8,000. Reliable Solutions Atlanta fixes the grading failures and water management issues common in North Fulton subdivisions built during the building boom. French drains, channel drains, grading corrections, and downspout routing designed for Alpharetta's clay soil and HOA requirements. Free same-week inspections.</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white text-[#273373] font-bold rounded-xl hover:bg-gray-100 transition-colors">Schedule Free Inspection</Link>
              <a href="tel:+17708952039" className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-transparent border-2 border-white/30 text-white font-bold rounded-xl hover:bg-white/10 transition-colors">(770) 895-2039</a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Why Alpharetta Has Drainage Problems</h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p>Alpharetta's drainage problems are largely a legacy of its rapid development. Between 1995 and 2010, North Fulton County was one of the fastest-growing areas in Georgia. Subdivisions like Windward, Broadwell Oaks, Thornberry, Cambridge, Cogburn Station, and the developments along Haynes Bridge Road and Old Milton Parkway were built at a pace that sometimes sacrificed long-term grading quality for construction speed.</p>
            <p>The standard approach during this era was to cut and fill lots to create level building pads on the rolling North Fulton terrain. Soil that was removed from high spots was pushed into low spots and compacted with heavy equipment. But proper compaction requires thin lifts — 6 to 8 inches at a time — with moisture control. In a market where builders were starting hundreds of homes a year, the fill was often placed in thick lifts and compacted once. This fill continues to settle 15 to 25 years later, creating depressions and reverse grades that the original builder grading plan never intended.</p>
            <p>Lot-to-lot water management is a significant issue in Alpharetta subdivisions. When lots are built close together, each lot's grading plan relies on water flowing in a specific direction. When one lot's fill settles and changes the grade, the water that was supposed to flow to the street or common area now flows toward the neighbor's house. This cascade effect means one settling lot can create drainage problems for multiple surrounding properties.</p>
            <p>The 30004, 30005, 30009, and 30022 zip codes are where we do the most drainage work in Alpharetta. The Windward community and neighborhoods along Kimball Bridge Road are particularly affected because they were built during the peak of the construction boom when the pace was fastest.</p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Signs Your Alpharetta Property Needs Drainage Work</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: 'Water pooling between houses', desc: 'In tightly-spaced Alpharetta subdivisions, water collects in the narrow side yards between homes. This saturates the soil against both foundations simultaneously and creates persistent dampness that breeds mosquitoes and kills grass.' },
              { title: 'Garage flooding from driveway runoff', desc: 'Sloped driveways in Alpharetta funnel water toward the garage door. If the original drain at the garage threshold has clogged or the driveway apron has settled, water enters the garage during moderate to heavy rain.' },
              { title: 'Foundation soil pulling away from the house', desc: 'A visible gap between the soil and the foundation wall means the fill soil has compacted and settled. This gap channels water directly against the foundation and needs to be filled and regraded.' },
              { title: 'Backyard that stays wet for days after rain', desc: 'If the rear yard holds water for 48+ hours after rain stops, the grade is either flat or reversed. In Alpharetta clay, flat areas cannot drain because the soil percolation rate approaches zero when saturated.' },
              { title: 'Neighbor added a patio or pool and now your yard floods', desc: 'Hardscaping on an uphill or adjacent lot increases runoff volume because water that used to soak into their lawn now sheets across their patio onto your property. This is a common complaint in Alpharetta HOA communities.' },
              { title: 'Mulch washing out of beds after every rain', desc: 'Concentrated runoff from roof lines, driveways, or neighboring lots flows through flower beds and carries mulch with it. The erosion path indicates where water is flowing and where a drain needs to intercept it.' },
            ].map((sign, i) => (
              <div key={i} className="bg-white rounded-xl p-5 shadow-sm"><h3 className="font-semibold text-[#273373] text-base mb-2">{sign.title}</h3><p className="text-gray-600 text-sm leading-relaxed">{sign.desc}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Drainage Solutions We Install in Alpharetta</h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <h3 className="text-[#273373] font-display">Subdivision-Compatible French Drains</h3>
            <p>We design French drains that work within the tight lot spacing common in Alpharetta subdivisions. The drain captures water from the problem area and routes it underground to the street curb, storm drain, or a discharge point at the lowest grade on the lot. All surface components use flush-mounted grates that comply with typical Alpharetta HOA standards and do not create trip hazards on shared side yards.</p>
            <h3 className="text-[#273373] font-display">Grading Correction and Fill Soil Repair</h3>
            <p>When settling fill soil has created reverse grades, we bring in compacted fill to restore proper slope away from the foundation. The minimum grade should be 6 inches of fall in the first 10 feet from the foundation. For homes where the original grade has reversed, this correction alone can eliminate foundation water problems without additional drainage infrastructure.</p>
            <h3 className="text-[#273373] font-display">Driveway Channel Drains</h3>
            <p>For garage flooding caused by driveway slope, we install channel drains at the garage threshold or across the driveway at the point where water concentrates. The channel connects to an underground pipe that carries water to the curb or a yard drain. We match the drain grate material to the driveway surface for a clean appearance.</p>
            <h3 className="text-[#273373] font-display">Downspout Collection and Underground Routing</h3>
            <p>The average Alpharetta home has 6 to 10 downspouts, each dumping concentrated roof water next to the foundation. We connect every downspout to underground solid pipe that carries the water 15 to 25 feet from the house before discharging. For a typical Alpharetta home, this removes thousands of gallons of water per year from the foundation perimeter.</p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Drainage Costs in Alpharetta</h2>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#273373] text-white"><tr><th className="px-6 py-4 text-left text-sm font-semibold">Service</th><th className="px-6 py-4 text-left text-sm font-semibold">Typical Cost</th><th className="px-6 py-4 text-left text-sm font-semibold hidden sm:table-cell">Timeline</th></tr></thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ['French drain (per linear ft)', '$25 – $50', '1-2 days'],
                  ['Yard French drain (50-100 ft)', '$2,000 – $5,000', '1-2 days'],
                  ['Grading correction', '$1,000 – $3,500', '1-2 days'],
                  ['Driveway channel drain', '$1,500 – $3,000', '1 day'],
                  ['Downspout routing (per downspout)', '$300 – $600', 'Same day'],
                  ['Full downspout system (6-10 downspouts)', '$2,000 – $5,000', '1-2 days'],
                  ['Complete property drainage', '$5,000 – $10,000', '2-4 days'],
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
          <h2 className="text-2xl font-bold text-[#273373] mb-6 font-display">Related Services in Alpharetta</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { title: 'Foundation Repair', href: '/foundation-repair/alpharetta', desc: 'Settling fill soil causes both drainage and foundation problems. Address the drainage to protect the repair.' },
              { title: 'Basement Waterproofing', href: '/basement-waterproofing/alpharetta', desc: 'Interior drainage for Alpharetta basements where exterior corrections alone are not enough.' },
              { title: 'Concrete Repair', href: '/cocnrete-repair', desc: 'Fix cracked driveways, patios, and walkways damaged by poor drainage and soil settlement.' },
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
          <p className="text-sm text-gray-500 mb-4"><Link href="/" className="hover:text-[#115997]">Home</Link> {' / '}<Link href="/drainage" className="hover:text-[#115997]">Drainage</Link> {' / '}<span className="text-gray-700">Alpharetta</span></p>
          <p className="text-sm text-gray-500">Drainage solutions also available in <Link href="/drainage/lawrenceville" className="text-[#115997] hover:underline">Lawrenceville</Link>, <Link href="/drainage/marietta" className="text-[#115997] hover:underline">Marietta</Link>, <Link href="/drainage/roswell" className="text-[#115997] hover:underline">Roswell</Link>, <Link href="/drainage/decatur" className="text-[#115997] hover:underline">Decatur</Link>, <Link href="/drainage/sandy-springs" className="text-[#115997] hover:underline">Sandy Springs</Link>, and <Link href="/drainage/stone-mountain" className="text-[#115997] hover:underline">Stone Mountain</Link>.</p>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-[#115997]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 font-display">Free Drainage Inspection in Alpharetta</h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">We will walk your Alpharetta property, identify where water is pooling and why, and give you a drainage plan that works within your HOA guidelines and budget. No obligation.</p>
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