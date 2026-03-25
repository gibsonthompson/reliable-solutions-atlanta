import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export const metadata = {
  title: 'Crawl Space Waterproofing in Lawrenceville, GA | Free Inspection | Reliable Solutions Atlanta',
  description: 'Crawl space waterproofing in Lawrenceville, GA. Interior drainage, sump pumps, and vapor barriers for Gwinnett County homes. Most projects $3,000-$9,000. Free inspection. 770-895-2039.',
  keywords: 'crawl space waterproofing Lawrenceville GA, crawl space water Gwinnett County, wet crawl space Lawrenceville, crawl space drainage Lawrenceville Georgia',
  openGraph: { title: 'Crawl Space Waterproofing in Lawrenceville, GA | Reliable Solutions Atlanta', description: 'Stop water in your Lawrenceville crawl space. Interior drainage, sump pumps, vapor barriers. Free inspection. 770-895-2039.', url: 'https://www.waterhelpme.com/crawl-space-waterproofing/lawrenceville', type: 'website' },
  alternates: { canonical: 'https://www.waterhelpme.com/crawl-space-waterproofing/lawrenceville' },
}

const faqs = [
  { question: 'How much does crawl space waterproofing cost in Lawrenceville, GA?', answer: 'Crawl space waterproofing in Lawrenceville typically costs between $3,000 and $9,000 for interior drainage systems with sump pump. Simple vapor barrier installation starts around $1,500. Full waterproofing with perimeter drain, sump pump, and vapor barrier runs $5,000 to $12,000 for larger Gwinnett County homes.' },
  { question: 'What is the difference between crawl space waterproofing and encapsulation?', answer: 'Waterproofing focuses on stopping active water entry with drainage systems, sump pumps, and vapor barriers. Encapsulation goes further by sealing the entire crawl space as a conditioned environment with vent closure, wall insulation, and dehumidification. Many Lawrenceville homes need waterproofing first, then encapsulation for complete moisture control.' },
  { question: 'Why does my Lawrenceville crawl space have standing water?', answer: 'Lawrenceville sits on heavy Georgia red clay that becomes saturated during rain and holds water for days. The clay around your foundation creates hydrostatic pressure that pushes water through cracks in block walls, through the wall-footer joint, and up through the dirt floor. Homes in the 30043 and 30044 zip codes on compacted fill soil are especially susceptible.' },
  { question: 'Can I waterproof my crawl space without a sump pump?', answer: 'If your Lawrenceville crawl space has active water entry, a sump pump is almost always necessary. Gravity drainage alone requires a discharge point lower than the crawl space floor, which is not available on most Gwinnett County lots. The pump collects water from the perimeter drain and discharges it away from the home.' },
  { question: 'How long does crawl space waterproofing take in Lawrenceville?', answer: 'Most Lawrenceville crawl space waterproofing projects take 1 to 3 days. A simple vapor barrier and sump pump installation is typically a single day. Full perimeter drainage with vapor barrier takes 2 to 3 days. Your home remains livable throughout the process.' },
]

export default function CrawlSpaceWaterproofingLawrenceville() {
  const jsonLd = { '@context': 'https://schema.org', '@type': 'Service', name: 'Crawl Space Waterproofing in Lawrenceville, GA', provider: { '@type': 'LocalBusiness', name: 'Reliable Solutions Atlanta', telephone: '+17708952039', url: 'https://www.waterhelpme.com', address: { '@type': 'PostalAddress', addressLocality: 'Lawrenceville', addressRegion: 'GA', addressCountry: 'US' }, areaServed: { '@type': 'City', name: 'Lawrenceville', containedIn: 'Gwinnett County, GA' } }, serviceType: 'Crawl Space Waterproofing' }
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
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 font-display leading-tight">Crawl Space Waterproofing in Lawrenceville, GA</h1>
            <p className="text-white/80 text-lg sm:text-xl mb-8 leading-relaxed max-w-2xl">Crawl space waterproofing in Lawrenceville typically costs between $3,000 and $9,000. Reliable Solutions Atlanta stops water from entering Gwinnett County crawl spaces with interior drainage systems, sump pumps, and heavy-duty vapor barriers designed for the heavy clay soil that saturates during every rain. Free same-week inspections.</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white text-[#273373] font-bold rounded-xl hover:bg-gray-100 transition-colors">Schedule Free Inspection</Link>
              <a href="tel:+17708952039" className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-transparent border-2 border-white/30 text-white font-bold rounded-xl hover:bg-white/10 transition-colors">(770) 895-2039</a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Why Lawrenceville Crawl Spaces Take On Water</h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p>Lawrenceville and Gwinnett County receive over 50 inches of rain annually, and the heavy Georgia red clay surrounding foundations is one of the slowest-draining soil types in the southeast. When it rains, the clay absorbs water until it reaches capacity, then stops absorbing entirely. The remaining water sits against your foundation walls and beneath your crawl space floor, building hydrostatic pressure that forces water through every crack, joint, and porous section of the foundation.</p>
            <p>The subdivisions built during Gwinnett County's building boom from the 1980s through 2000s — Sugarloaf, Collins Hill, Archer Ridge, Mallard Landing, and neighborhoods along Sugarloaf Parkway in the 30043 and 30044 zip codes — used cinder block and poured concrete foundations with minimal waterproofing. The exterior was coated with a thin layer of damproofing that has deteriorated after 20 to 30 years of soil contact and moisture exposure.</p>
            <p>Many of these homes also sit on compacted fill soil that was not properly compacted during construction. This fill continues to settle, creating low spots around the foundation that direct water toward the crawl space instead of away from it. The combination of heavy clay, failed damproofing, and poor grading creates persistent crawl space water problems that worsen with each passing year.</p>
            <p>Unlike basements where water is visible immediately, crawl space water often goes unnoticed for months or years. Homeowners only discover the problem when they notice musty odors upstairs, floors becoming soft or bouncy, or a pest inspector reports moisture damage during a routine termite inspection.</p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Signs Your Lawrenceville Crawl Space Needs Waterproofing</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: 'Standing water or mud in the crawl space', desc: 'If you look in your crawl space access and see standing water, wet soil, or mud, hydrostatic pressure is forcing water through or under the foundation. This is active water entry that requires a drainage solution, not just a vapor barrier.' },
              { title: 'Water stains on cinder block walls', desc: 'White mineral deposits or dark staining on the interior face of crawl space walls indicates water has been penetrating through the blocks. Even if the surface is currently dry, the staining proves chronic water migration.' },
              { title: 'Musty smell in the house above', desc: 'Up to 50% of the air on your first floor originates from the crawl space through the stack effect. If you smell musty or earthy odors in your living space, water in the crawl space is creating the mold and mildew producing that smell.' },
              { title: 'Sagging or soft floors', desc: 'When floor joists absorb moisture from a wet crawl space, the wood weakens over time. Floors that sag in the center of rooms or feel soft underfoot indicate structural wood is being damaged by sustained moisture.' },
              { title: 'Vapor barrier floating or displaced', desc: 'If the existing vapor barrier in your Lawrenceville crawl space is floating on water, bunched up against the walls, or displaced from its original position, water is entering with enough volume to move the plastic.' },
              { title: 'Rust on HVAC or plumbing in crawl space', desc: 'Metal ductwork, pipes, and equipment in the crawl space developing rust or corrosion indicates sustained high humidity. If metal is rusting, the wood structure is absorbing moisture at the same rate.' },
            ].map((sign, i) => (
              <div key={i} className="bg-white rounded-xl p-5 shadow-sm"><h3 className="font-semibold text-[#273373] text-base mb-2">{sign.title}</h3><p className="text-gray-600 text-sm leading-relaxed">{sign.desc}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">How We Waterproof Crawl Spaces in Lawrenceville</h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <h3 className="text-[#273373] font-display">Interior Perimeter Drainage</h3>
            <p>We install a French drain channel along the interior perimeter of the crawl space where the foundation wall meets the floor. This drain intercepts water entering through the wall-footer joint and through the base of cinder block walls. The perforated pipe sits in a gravel bed that provides storage capacity during heavy rain and routes all collected water to the sump pit.</p>
            <h3 className="text-[#273373] font-display">Sump Pump with Battery Backup</h3>
            <p>The perimeter drain routes to a sump pit installed at the lowest point of the crawl space. A primary submersible pump activates when water reaches a set level and discharges it through a line that exits the foundation and routes at least 15 feet from the house. A battery backup system provides 8 to 12 hours of pumping during power outages, which is critical during the storms that cause the water problem in the first place.</p>
            <h3 className="text-[#273373] font-display">Heavy-Duty Vapor Barrier</h3>
            <p>After the drainage system is in place, we install a 20-mil reinforced vapor barrier across the entire crawl space floor and up the foundation walls. The barrier prevents ground moisture from evaporating into the crawl space air and directs any surface water to the perimeter drain. All seams are overlapped and sealed with waterproof tape.</p>
            <h3 className="text-[#273373] font-display">Wall Crack and Joint Sealing</h3>
            <p>Visible cracks in poured concrete walls and open mortar joints in cinder block are sealed with hydraulic cement or polyurethane injection. While the perimeter drain handles the bulk of water management, sealing entry points reduces the volume the system needs to handle and prevents water from spraying onto the crawl space structure during heavy hydrostatic pressure events.</p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Crawl Space Waterproofing Costs in Lawrenceville</h2>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#273373] text-white"><tr><th className="px-6 py-4 text-left text-sm font-semibold">Service</th><th className="px-6 py-4 text-left text-sm font-semibold">Typical Cost</th><th className="px-6 py-4 text-left text-sm font-semibold hidden sm:table-cell">Timeline</th></tr></thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ['Vapor barrier (20-mil, floor + walls)', '$1,500 – $4,000', '1 day'],
                  ['Sump pump with battery backup', '$1,500 – $3,000', '1 day'],
                  ['Interior perimeter drain', '$2,500 – $6,000', '1-2 days'],
                  ['Full waterproofing (drain + pump + barrier)', '$3,000 – $9,000', '2-3 days'],
                  ['Crack and joint sealing', '$500 – $1,500', 'Same day'],
                  ['Exterior foundation waterproofing', '$6,000 – $12,000', '3-5 days'],
                ].map(([r, c, t], i) => (<tr key={i} className="hover:bg-gray-50"><td className="px-6 py-4 text-sm text-gray-900">{r}</td><td className="px-6 py-4 text-sm font-semibold text-[#115997]">{c}</td><td className="px-6 py-4 text-sm text-gray-500 hidden sm:table-cell">{t}</td></tr>))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mt-4">Financing available through GreenSky with plans starting at 0% interest. Transferable warranty included.</p>
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
              { title: 'Crawl Space Encapsulation', href: '/crawl-space-encapsulation/lawrenceville', desc: 'After waterproofing stops the water, encapsulation seals and conditions the entire crawl space.' },
              { title: 'Foundation Repair', href: '/foundation-repair/lawrenceville', desc: 'Water damage and foundation damage go hand in hand. Fix both for lasting protection.' },
              { title: 'Drainage Solutions', href: '/drainage/lawrenceville', desc: 'Exterior drainage reduces the water volume reaching your crawl space walls.' },
            ].map((s, i) => (<Link key={i} href={s.href} className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow group"><h3 className="font-semibold text-[#273373] mb-2 group-hover:text-[#115997] transition-colors">{s.title}</h3><p className="text-gray-600 text-sm">{s.desc}</p></Link>))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#273373] mb-6 font-display">Learn More About Crawl Spaces</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[{ title: 'Crawl Space Encapsulation vs Waterproofing', href: '/blog/crawl-space-encapsulation-vs-waterproofing' }, { title: 'Crawl Space Vapor Barrier Guide', href: '/blog/crawl-space-vapor-barrier-guide' }, { title: 'Crawl Space Mold: Signs and Solutions', href: '/blog/crawl-space-mold-signs' }, { title: 'Crawl Space Repair Cost in Atlanta', href: '/blog/crawl-space-repair-cost-atlanta' }].map((p, i) => (<Link key={i} href={p.href} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"><svg className="w-5 h-5 text-[#115997] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg><span className="text-sm font-medium text-gray-800">{p.title}</span></Link>))}
          </div>
        </div>
      </section>

      <section className="py-8 bg-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-gray-500 mb-4"><Link href="/" className="hover:text-[#115997]">Home</Link> {' / '}<Link href="/crawl-space-waterproofing" className="hover:text-[#115997]">Crawl Space Waterproofing</Link> {' / '}<span className="text-gray-700">Lawrenceville</span></p>
          <p className="text-sm text-gray-500">Crawl space waterproofing also available in <Link href="/crawl-space-waterproofing/marietta" className="text-[#115997] hover:underline">Marietta</Link>, <Link href="/crawl-space-waterproofing/roswell" className="text-[#115997] hover:underline">Roswell</Link>, <Link href="/crawl-space-waterproofing/alpharetta" className="text-[#115997] hover:underline">Alpharetta</Link>, <Link href="/crawl-space-waterproofing/decatur" className="text-[#115997] hover:underline">Decatur</Link>, <Link href="/crawl-space-waterproofing/sandy-springs" className="text-[#115997] hover:underline">Sandy Springs</Link>, and <Link href="/crawl-space-waterproofing/stone-mountain" className="text-[#115997] hover:underline">Stone Mountain</Link>.</p>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-[#115997]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 font-display">Free Crawl Space Inspection in Lawrenceville</h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">We will crawl under your Lawrenceville home, find where the water is entering, and give you a clear waterproofing plan with pricing. No obligation, no sales pressure.</p>
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