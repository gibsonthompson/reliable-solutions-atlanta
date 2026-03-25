import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export const metadata = {
  title: 'Drainage Solutions in Decatur, GA | Free Inspection | Reliable Solutions Atlanta',
  description: 'Drainage solutions in Decatur, GA. French drains, grading, downspout routing, and moisture management for historic DeKalb County homes. Most projects $2,500-$8,000. Free inspection. 770-895-2039.',
  keywords: 'drainage Decatur GA, French drain Decatur, yard drainage DeKalb County, standing water Decatur Georgia, historic home drainage',
  openGraph: { title: 'Drainage Solutions in Decatur, GA | Reliable Solutions Atlanta', description: 'Fix yard drainage and protect your Decatur home. Free inspections. 770-895-2039.', url: 'https://www.waterhelpme.com/drainage/decatur', type: 'website' },
  alternates: { canonical: 'https://www.waterhelpme.com/drainage/decatur' },
}

const faqs = [
  { question: 'How much do drainage solutions cost in Decatur, GA?', answer: 'Drainage in Decatur typically costs between $2,500 and $8,000. Older properties with mature trees and original clay tile drains that need full replacement run toward the higher end. French drains start around $2,000. Full perimeter foundation drainage with new discharge lines ranges from $5,000 to $12,000.' },
  { question: 'Why is my Decatur yard always damp even without recent rain?', answer: 'Decatur has the densest tree canopy in metro Atlanta. The canopy blocks sunlight from reaching the soil surface, which prevents evaporation. Fallen leaves create an organic layer that holds moisture like a sponge. Combined with clay soil that drains slowly, the ground stays perpetually damp in heavily shaded areas regardless of recent rainfall.' },
  { question: 'Do old clay drainage tiles still work in Decatur homes?', answer: 'Almost never. Original clay drainage tiles in Decatur homes from the 1920s through 1950s have typically collapsed, been crushed by soil weight, or been completely filled with tree roots. If your home has original clay tile drains, they are almost certainly not functioning and need to be replaced with modern PVC or corrugated pipe.' },
  { question: 'Will drainage work affect my mature Decatur trees?', answer: 'We design around root zones to protect mature trees. Trenching equipment stays outside the drip line of significant trees, and within the root zone we hand-dig to avoid severing major roots. In some cases we route drain lines around trees rather than through root zones. Losing a 50-year-old oak is never worth saving 10 feet of trench.' },
  { question: 'Does my Decatur historic district have drainage restrictions?', answer: 'The Decatur Historic District Commission primarily governs exterior appearance changes. Underground drainage work and grading that does not alter the visible character of the property typically does not require commission approval. We are familiar with the process and can advise on your specific situation before starting work.' },
]

export default function DrainageDecatur() {
  const jsonLd = { '@context': 'https://schema.org', '@type': 'Service', name: 'Drainage Solutions in Decatur, GA', provider: { '@type': 'LocalBusiness', name: 'Reliable Solutions Atlanta', telephone: '+17708952039', url: 'https://www.waterhelpme.com', address: { '@type': 'PostalAddress', addressLocality: 'Decatur', addressRegion: 'GA', addressCountry: 'US' }, areaServed: { '@type': 'City', name: 'Decatur', containedIn: 'DeKalb County, GA' } }, serviceType: 'Drainage Solutions' }
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
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 font-display leading-tight">Drainage Solutions in Decatur, GA</h1>
            <p className="text-white/80 text-lg sm:text-xl mb-8 leading-relaxed max-w-2xl">Drainage solutions in Decatur typically cost between $2,500 and $8,000. Reliable Solutions Atlanta understands the unique moisture challenges of Decatur's historic neighborhoods — dense tree canopy, century-old failed drainage, and clay soil that never dries. French drains, grading corrections, drain tile replacement, and foundation drainage. Free same-week inspections.</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white text-[#273373] font-bold rounded-xl hover:bg-gray-100 transition-colors">Schedule Free Inspection</Link>
              <a href="tel:+17708952039" className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-transparent border-2 border-white/30 text-white font-bold rounded-xl hover:bg-white/10 transition-colors">(770) 895-2039</a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Why Decatur Has Drainage Challenges</h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p>Decatur's drainage challenges are fundamentally different from newer suburbs because the infrastructure is old, the trees are massive, and the original drainage design assumed a different use of the properties than what exists today. The neighborhoods surrounding the Decatur Square — Oakhurst, Winnona Park, Great Lakes, MAK District, and the Clairemont Avenue corridor in the 30030, 30032, and 30033 zip codes — have homes built from 1900 through the 1940s with drainage systems that are 80 to 120 years old.</p>
            <p>Original Decatur drainage consisted of hand-laid clay tiles — short sections of unglazed clay pipe placed end to end in a trench. These tiles were designed to collect water at the foundation footing and channel it to a discharge point. After a century of service, the clay has cracked, the joints have separated, tree roots have filled the pipe interiors, and soil has collapsed the trench in multiple locations. The drain that once protected these homes has long since stopped functioning.</p>
            <p>The tree canopy creates a drainage problem unique to Decatur. Oakhurst and Winnona Park have some of the highest canopy coverage percentages in DeKalb County. Large oaks, poplars, sweet gums, and pines create near-total shade over many properties. This shade prevents the soil from drying between rains — the evaporation that removes moisture from soil in sunny yards simply does not occur under dense canopy. The fallen leaf layer compounds this by creating a 2 to 4 inch organic mulch that holds water like a sponge.</p>
            <p>Decatur's revitalization has also changed how properties use water. Homes that originally had simple landscapes now have extensive gardens, raised beds, and irrigation systems. The additional water input from irrigation, combined with the inability of the existing drainage to handle it, keeps soil around foundations perpetually saturated.</p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Signs Your Decatur Property Needs Drainage Work</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: 'Moss and algae taking over your lawn', desc: 'When grass dies from perpetual shade and moisture, moss and algae fill in. This is not a lawn problem — it is a drainage problem. The soil is too wet for grass to survive, and no amount of reseeding will fix it without addressing the drainage first.' },
              { title: 'Standing water around the foundation for days', desc: 'Water that pools against the foundation of a Decatur home and stays for 48+ hours is actively damaging the structure. Original stone and block foundations are porous and absorb this water, leading to crawl space moisture and foundation deterioration.' },
              { title: 'Crawl space perpetually wet or muddy', desc: 'If you look in your crawl space access and see standing water or mud, surface water and groundwater are finding their way under the house. The original drainage that was supposed to prevent this has failed.' },
              { title: 'Root heave creating trip hazards and water traps', desc: 'Large tree roots pushing through driveways, walkways, and patios create surface depressions where water collects. These root-heaved areas also block the natural surface flow of water away from the house.' },
              { title: 'Leaf debris clogging existing drain inlets', desc: 'If your property has existing drainage inlets or catch basins, Decatur leaf fall can overwhelm them. Clogged inlets cause the entire drainage system to back up, flooding areas that would otherwise drain properly.' },
              { title: 'Musty smell in the house during humid weather', desc: 'When the soil around a Decatur home stays saturated, moisture migrates through the foundation into the crawl space and basement. This elevated moisture creates a musty odor throughout the house that gets worse in summer when ambient humidity is already high.' },
            ].map((sign, i) => (
              <div key={i} className="bg-white rounded-xl p-5 shadow-sm"><h3 className="font-semibold text-[#273373] text-base mb-2">{sign.title}</h3><p className="text-gray-600 text-sm leading-relaxed">{sign.desc}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Drainage Solutions We Install in Decatur</h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <h3 className="text-[#273373] font-display">Clay Tile Replacement with Modern Drainage</h3>
            <p>We locate and remove failed original clay tile systems and replace them with modern perforated PVC or corrugated pipe in a gravel bed wrapped in filter fabric. The new system follows an optimized route that may differ from the original — we design based on where water actually needs to go today, not where a 1920s plumber laid tile. Root barriers protect the new pipe in areas where mature trees are close.</p>
            <h3 className="text-[#273373] font-display">Canopy-Adapted Drainage Design</h3>
            <p>Standard French drains in heavily treed Decatur yards can clog with organic debris within a few years. We use larger gravel beds with robust filter fabric and install clean-out ports at key points so the system can be maintained without excavation. For properties with extreme canopy coverage, we install solid-lid collection boxes with removable filters that can be cleaned seasonally.</p>
            <h3 className="text-[#273373] font-display">Foundation Perimeter Drainage</h3>
            <p>For Decatur homes with crawl spaces or basements that are taking on water, we install a new perimeter drain at the foundation footing. This captures water before it enters the foundation and routes it to a discharge point. For homes with limited discharge options due to lot configuration, we install a sump pit with pump at the lowest point of the drain system.</p>
            <h3 className="text-[#273373] font-display">Surface Grading with Root Zone Protection</h3>
            <p>Regrading around Decatur homes requires working within the root zones of mature trees that are often within a few feet of the foundation. We hand-grade within root zones, adding soil in thin layers to build proper slope without burying root flares. We never cut grade within tree root zones because removing soil exposes and damages roots that the tree depends on.</p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Drainage Costs in Decatur</h2>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#273373] text-white"><tr><th className="px-6 py-4 text-left text-sm font-semibold">Service</th><th className="px-6 py-4 text-left text-sm font-semibold">Typical Cost</th><th className="px-6 py-4 text-left text-sm font-semibold hidden sm:table-cell">Timeline</th></tr></thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ['Clay tile replacement (per linear ft)', '$30 – $60', '1-3 days'],
                  ['French drain with clean-outs', '$2,500 – $6,000', '1-2 days'],
                  ['Foundation perimeter drain', '$4,000 – $10,000', '2-3 days'],
                  ['Grading correction with root protection', '$1,500 – $4,000', '1-2 days'],
                  ['Downspout underground routing', '$300 – $600 per downspout', 'Same day'],
                  ['Sump pump with discharge line', '$1,500 – $3,000', '1 day'],
                  ['Full property drainage system', '$5,000 – $12,000', '3-5 days'],
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
          <h2 className="text-2xl font-bold text-[#273373] mb-6 font-display">Related Services in Decatur</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { title: 'Foundation Repair', href: '/foundation-repair/decatur', desc: 'Drainage failure is the #1 cause of foundation damage in historic Decatur homes.' },
              { title: 'Basement Waterproofing', href: '/basement-waterproofing/decatur', desc: 'Interior waterproofing for Decatur basements where exterior drainage cannot fully stop water entry.' },
              { title: 'Crawl Space Encapsulation', href: '/crawl-space-encapsulation', desc: 'Seal your Decatur crawl space to block the ground moisture that drainage redirects away from the foundation.' },
            ].map((s, i) => (<Link key={i} href={s.href} className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow group"><h3 className="font-semibold text-[#273373] mb-2 group-hover:text-[#115997] transition-colors">{s.title}</h3><p className="text-gray-600 text-sm">{s.desc}</p></Link>))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#273373] mb-6 font-display">Learn More About Drainage</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[{ title: 'French Drain Cost in Atlanta', href: '/blog/french-drain-cost-atlanta' }, { title: 'Yard Drainage Problems and Foundation Damage', href: '/blog/yard-drainage-problems-foundation-damage' }, { title: 'What to Check After a Storm in Atlanta', href: '/blog/what-to-check-after-storm-atlanta' }, { title: 'Sump Pump Maintenance Guide', href: '/blog/sump-pump-maintenance-guide' }].map((p, i) => (<Link key={i} href={p.href} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"><svg className="w-5 h-5 text-[#115997] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg><span className="text-sm font-medium text-gray-800">{p.title}</span></Link>))}
          </div>
        </div>
      </section>

      <section className="py-8 bg-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-gray-500 mb-4"><Link href="/" className="hover:text-[#115997]">Home</Link> {' / '}<Link href="/drainage" className="hover:text-[#115997]">Drainage</Link> {' / '}<span className="text-gray-700">Decatur</span></p>
          <p className="text-sm text-gray-500">Drainage solutions also available in <Link href="/drainage/lawrenceville" className="text-[#115997] hover:underline">Lawrenceville</Link>, <Link href="/drainage/marietta" className="text-[#115997] hover:underline">Marietta</Link>, <Link href="/drainage/roswell" className="text-[#115997] hover:underline">Roswell</Link>, <Link href="/drainage/alpharetta" className="text-[#115997] hover:underline">Alpharetta</Link>, <Link href="/drainage/sandy-springs" className="text-[#115997] hover:underline">Sandy Springs</Link>, and <Link href="/drainage/stone-mountain" className="text-[#115997] hover:underline">Stone Mountain</Link>.</p>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-[#115997]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 font-display">Free Drainage Inspection in Decatur</h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">We understand Decatur's unique moisture challenges. We will inspect your property, trace the water sources, and design a drainage solution that respects your trees and your historic home. No obligation.</p>
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