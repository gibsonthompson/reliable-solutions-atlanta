import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export const metadata = {
  title: 'Foundation Repair in Stone Mountain, GA | Free Inspection | Reliable Solutions Atlanta',
  description: 'Foundation repair in Stone Mountain, GA. Specialized service for homes on granite substrata with unique drainage challenges. Crawl space repair, pier installation. Free inspection. 770-895-2039.',
  keywords: 'foundation repair Stone Mountain GA, foundation repair DeKalb County, crawl space repair Stone Mountain, foundation settling Stone Mountain Georgia',
  openGraph: { title: 'Foundation Repair in Stone Mountain, GA | Reliable Solutions Atlanta', description: 'Foundation repair for Stone Mountain homes. Granite substrata specialists. Free inspections. 770-895-2039.', url: 'https://www.waterhelpme.com/foundation-repair/stone-mountain', type: 'website' },
  alternates: { canonical: 'https://www.waterhelpme.com/foundation-repair/stone-mountain' },
}

const faqs = [
  { question: 'How much does foundation repair cost in Stone Mountain, GA?', answer: 'Foundation repair in Stone Mountain typically costs between $2,000 and $7,000 for residential homes. Crawl space pier replacement starts around $2,000. Crack repairs are $400 to $800. Full structural repair with pier installation and beam work ranges from $5,000 to $12,000 depending on the scope.' },
  { question: 'How does the granite near Stone Mountain affect foundations?', answer: 'The granite monadnock that defines Stone Mountain extends underground across much of the surrounding area. Granite does not absorb water, so rainfall that would normally soak into the ground instead runs along the rock surface. This creates unpredictable subsurface water flow that can erode pockets of soil beneath foundations while leaving adjacent areas dry and stable.' },
  { question: 'Why are crawl space problems so common in Stone Mountain?', answer: 'Stone Mountain has a high percentage of homes built on crawl space foundations, many from the 1960s through 1980s. The combination of original wooden piers, bare dirt crawl space floors, poor ventilation, and the moisture created by water flowing over shallow granite creates ideal conditions for wood rot, mold, and pier failure.' },
  { question: 'Can foundation repair help with my Stone Mountain home energy bills?', answer: 'Yes. A failing crawl space foundation often means gaps between the floor and the subfloor, air infiltration through floor voids, and moisture problems that make HVAC systems work harder. Repairing the foundation and sealing the crawl space can noticeably reduce energy costs.' },
  { question: 'Do I need foundation repair or just crawl space repair?', answer: 'They often go together in Stone Mountain homes. If the support piers have failed, that is foundation repair. If the joists and subfloor are damaged from moisture, that is structural crawl space repair. We assess both during the free inspection and give you a complete picture of what needs to be done.' },
]

export default function FoundationRepairStoneMountain() {
  const jsonLd = { '@context': 'https://schema.org', '@type': 'Service', name: 'Foundation Repair in Stone Mountain, GA', provider: { '@type': 'LocalBusiness', name: 'Reliable Solutions Atlanta', telephone: '+17708952039', url: 'https://www.waterhelpme.com', address: { '@type': 'PostalAddress', addressLocality: 'Stone Mountain', addressRegion: 'GA', addressCountry: 'US' }, areaServed: { '@type': 'City', name: 'Stone Mountain', containedIn: 'DeKalb County, GA' } }, serviceType: 'Foundation Repair' }
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
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 font-display leading-tight">Foundation Repair in Stone Mountain, GA</h1>
            <p className="text-white/80 text-lg sm:text-xl mb-8 leading-relaxed max-w-2xl">
              Foundation repair in Stone Mountain typically costs between $2,000 and $7,000 for most residential projects. Reliable Solutions Atlanta understands the unique challenges of building on and around granite substrata. Free same-week inspections with honest assessments and no sales pressure. Serving Stone Mountain and eastern DeKalb County for over 20 years.
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
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Why Stone Mountain Homes Develop Foundation Problems</h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p>Stone Mountain and the surrounding communities in eastern DeKalb County have a geological feature that makes foundation problems here different from anywhere else in metro Atlanta: the granite monadnock. The massive granite formation that is visible as Stone Mountain extends underground across much of the area, creating a shallow bedrock layer that dramatically affects how water moves through the soil.</p>
            <p>Granite is impermeable. When it rains, water that would normally percolate down through soil instead hits the granite layer and flows laterally along its surface. This creates unpredictable subsurface water channels that can erode soil from beneath foundations in some areas while leaving other areas completely dry. A home might have one corner sitting on stable, dry soil while another corner sits on soil that is being actively eroded by an invisible underground stream running along the granite surface.</p>
            <p>The housing stock in Stone Mountain is predominantly from the 1960s through 1980s, with many homes built as affordable single-family residences during the suburban expansion of DeKalb County. These homes were well-built for their era, but many used construction methods and materials that have reached the end of their useful life. Wooden crawl space piers, unreinforced block foundations, and minimal moisture management were standard practice at the time.</p>
            <p>Deferred maintenance is a significant factor in the Stone Mountain area. Many homes have changed hands multiple times, and each transition can mean a gap in routine maintenance. Gutters go uncleaned, grading erodes, and crawl space vents get blocked. Over decades, these small maintenance lapses compound into significant foundation problems.</p>
            <p>The neighborhoods around Memorial Drive, Rockbridge Road, Hairston Road, and the 30083, 30087, and 30088 zip codes are where we perform the most foundation work in the Stone Mountain area. The communities near the base of the mountain itself tend to have the most granite influence on their soil conditions.</p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Signs Your Stone Mountain Home Needs Foundation Repair</h2>
          <p className="text-gray-700 text-lg mb-8">Stone Mountain homes, many on crawl space foundations from the 1960s-1980s, show foundation problems in distinct ways. Here is what to watch for.</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: 'Sagging or bouncy floors', desc: 'The most common complaint we hear from Stone Mountain homeowners. When crawl space piers fail, the floor above sags in the middle of rooms and bounces when you walk. This is structural failure, not just an old house settling.' },
              { title: 'Musty smell throughout the house', desc: 'A persistent musty odor that you notice when you first come home but goes nose-blind to after a few minutes usually indicates moisture and mold in the crawl space. The compromised foundation allows humid air to infiltrate the living space.' },
              { title: 'Cracks in cinder block foundation walls', desc: 'Many Stone Mountain homes have cinder block (CMU) foundations. Horizontal or stair-step cracks in the blocks indicate movement from soil pressure or settling. Cinder block is more brittle than poured concrete and cracks at lower stress levels.' },
              { title: 'Standing water in crawl space after rain', desc: 'If you look in your crawl space access after a rain and see standing water, the drainage around the foundation is compromised. Water flowing along the granite substrata is finding its way under your home.' },
              { title: 'Exterior foundation wall leaning outward', desc: 'When the interior floor system pushes outward against the top of a foundation wall while the soil pushes inward at the base, the wall can develop an outward lean at the top. This is visible from outside and indicates serious structural compromise.' },
              { title: 'Pest activity increasing', desc: 'Termites, carpenter ants, and rodents enter through gaps created by foundation movement. If you notice increased pest activity, particularly near exterior walls and around plumbing penetrations, foundation gaps may be the entry point.' },
            ].map((sign, i) => (
              <div key={i} className="bg-white rounded-xl p-5 shadow-sm"><h3 className="font-semibold text-[#273373] text-base mb-2">{sign.title}</h3><p className="text-gray-600 text-sm leading-relaxed">{sign.desc}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">How We Repair Foundations in Stone Mountain</h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <h3 className="text-[#273373] font-display">Crawl Space Pier Replacement</h3>
            <p>This is the most common foundation repair we perform in Stone Mountain. We remove failed wooden or concrete block piers and replace them with adjustable steel piers on engineered concrete footings. Each new pier is positioned based on the current load requirements of the home and adjusted to re-level the floor system. In areas where granite is close to the surface, we anchor piers directly to the rock, which actually creates a stronger connection than soil-supported piers.</p>

            <h3 className="text-[#273373] font-display">Beam and Joist Repair</h3>
            <p>Decades of crawl space moisture take a toll on the wooden structure. We repair or replace damaged girder beams, sister weakened floor joists with new lumber, and reinforce connections between structural members. All new and existing wood is treated with borate preservative to prevent future rot and termite damage.</p>

            <h3 className="text-[#273373] font-display">Subsurface Drainage Solutions</h3>
            <p>Stone Mountain's granite substrata makes standard French drain approaches insufficient in some locations. We design drainage systems that account for the granite layer, routing water away from the foundation through channels that work with the natural water flow patterns rather than against them. In some cases, we install sump pump systems in crawl spaces to actively remove water that accumulates from subsurface granite runoff.</p>

            <h3 className="text-[#273373] font-display">Block Wall Reinforcement</h3>
            <p>For cinder block foundation walls showing cracks or movement, we use carbon fiber reinforcement or steel channel bracing depending on the severity. Carbon fiber works well for hairline to moderate cracking. Steel channels are used when the wall has displaced more than an inch or when the block has begun to deteriorate from moisture exposure.</p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Foundation Repair Costs in Stone Mountain</h2>
          <div className="prose prose-lg max-w-none text-gray-700 mb-8"><p>Stone Mountain foundation repair costs are generally lower than the north side of metro Atlanta because the housing stock is smaller and more accessible. The granite substrata can actually reduce pier costs in some cases because anchoring to rock is more straightforward than driving to deep soil layers.</p></div>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#273373] text-white"><tr><th className="px-6 py-4 text-left text-sm font-semibold">Repair Type</th><th className="px-6 py-4 text-left text-sm font-semibold">Typical Cost</th><th className="px-6 py-4 text-left text-sm font-semibold hidden sm:table-cell">Timeline</th></tr></thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ['Crawl space pier replacement (per pier)', '$600 – $1,200', '1 day'],
                  ['Full crawl space pier system', '$2,000 – $6,000', '1-3 days'],
                  ['Beam and joist repair', '$1,500 – $4,000', '1-2 days'],
                  ['Block wall reinforcement (per wall)', '$1,200 – $2,500', '1 day'],
                  ['Crack injection (per crack)', '$400 – $700', '2-4 hours'],
                  ['Complete structural repair + drainage', '$5,000 – $12,000', '3-5 days'],
                ].map(([r, c, t], i) => (<tr key={i} className="hover:bg-gray-50"><td className="px-6 py-4 text-sm text-gray-900">{r}</td><td className="px-6 py-4 text-sm font-semibold text-[#115997]">{c}</td><td className="px-6 py-4 text-sm text-gray-500 hidden sm:table-cell">{t}</td></tr>))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mt-4">Financing available through GreenSky with plans starting at 0% interest. All structural repairs include warranty.</p>
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
              { title: 'Crawl Space Encapsulation', href: '/crawl-space-encapsulation', desc: 'Seal your Stone Mountain crawl space to stop the moisture cycle that destroys foundations.' },
              { title: 'Crawl Space Repair', href: '/crawl-space-repair', desc: 'Structural repair for failing crawl space supports, joists, and subfloor systems.' },
              { title: 'Drainage Solutions', href: '/drainage', desc: 'Custom drainage systems designed for Stone Mountain granite substrata conditions.' },
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
              { title: 'Crawl Space Mold: Signs and Solutions', href: '/blog/crawl-space-mold-signs' },
              { title: 'Crawl Space Vapor Barrier Guide', href: '/blog/crawl-space-vapor-barrier-guide' },
            ].map((p, i) => (<Link key={i} href={p.href} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"><svg className="w-5 h-5 text-[#115997] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg><span className="text-sm font-medium text-gray-800">{p.title}</span></Link>))}
          </div>
        </div>
      </section>

      <section className="py-8 bg-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-gray-500 mb-4"><Link href="/" className="hover:text-[#115997]">Home</Link> {' / '}<Link href="/foundation-repair" className="hover:text-[#115997]">Foundation Repair</Link> {' / '}<span className="text-gray-700">Stone Mountain</span></p>
          <p className="text-sm text-gray-500">Foundation repair also available in <Link href="/foundation-repair/lawrenceville" className="text-[#115997] hover:underline">Lawrenceville</Link>, <Link href="/foundation-repair/marietta" className="text-[#115997] hover:underline">Marietta</Link>, <Link href="/foundation-repair/roswell" className="text-[#115997] hover:underline">Roswell</Link>, <Link href="/foundation-repair/alpharetta" className="text-[#115997] hover:underline">Alpharetta</Link>, <Link href="/foundation-repair/decatur" className="text-[#115997] hover:underline">Decatur</Link>, and <Link href="/foundation-repair/sandy-springs" className="text-[#115997] hover:underline">Sandy Springs</Link>.</p>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-[#115997]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 font-display">Free Foundation Inspection in Stone Mountain</h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">We know Stone Mountain soil and we know Stone Mountain homes. We will inspect your foundation, explain what is happening in plain English, and give you a written estimate. No obligation, no pressure.</p>
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