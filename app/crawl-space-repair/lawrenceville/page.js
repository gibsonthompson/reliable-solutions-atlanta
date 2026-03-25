import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export const metadata = {
  title: 'Crawl Space Repair in Lawrenceville, GA | Free Inspection | Reliable Solutions Atlanta',
  description: 'Crawl space repair in Lawrenceville, GA. Joist sistering, pier replacement, girder repair, and subfloor leveling for Gwinnett County homes. Most projects $2,500-$8,000. Free inspection. 770-895-2039.',
  keywords: 'crawl space repair Lawrenceville GA, crawl space structural repair Gwinnett County, floor joist repair Lawrenceville, sagging floor repair Lawrenceville Georgia',
  openGraph: { title: 'Crawl Space Repair in Lawrenceville, GA | Reliable Solutions Atlanta', description: 'Fix sagging floors and structural damage in your Lawrenceville crawl space. Free inspections. 770-895-2039.', url: 'https://www.waterhelpme.com/crawl-space-repair/lawrenceville', type: 'website' },
  alternates: { canonical: 'https://www.waterhelpme.com/crawl-space-repair/lawrenceville' },
}

const faqs = [
  { question: 'How much does crawl space repair cost in Lawrenceville, GA?', answer: 'Crawl space structural repair in Lawrenceville typically costs between $2,500 and $8,000. Individual pier replacement runs $600 to $1,200 per pier. Joist sistering costs $100 to $200 per joist. Full crawl space structural restoration with multiple pier replacements and beam work ranges from $5,000 to $12,000.' },
  { question: 'Why are the floors in my Lawrenceville home sagging?', answer: 'Sagging floors in Lawrenceville homes are caused by failing crawl space support piers. The homes built during the 1980s through 2000s Gwinnett County building boom used concrete block or wooden piers on footings placed on compacted fill soil. After 20 to 30 years, the fill has settled unevenly, causing piers to drop and the floor above to sag.' },
  { question: 'What is joist sistering and do I need it?', answer: 'Joist sistering is attaching a new piece of lumber alongside a damaged floor joist to restore its structural capacity. You need it when joists have been weakened by moisture damage, wood rot, or insect activity. We evaluate each joist during inspection and only sister the ones that have lost significant strength.' },
  { question: 'Can you level my Lawrenceville floors from the crawl space?', answer: 'Yes. We level floors by replacing failed piers with adjustable steel piers that can be precisely set to the correct height. The floor is raised incrementally to avoid cracking drywall or stressing framing connections. Most Lawrenceville floor leveling projects achieve results within a quarter inch of level across the room.' },
  { question: 'How long does crawl space repair take in Lawrenceville?', answer: 'Most Lawrenceville crawl space repairs take 1 to 3 days. Simple pier replacement or joist sistering is completed in a single day. Comprehensive structural restoration with multiple pier replacements, beam work, and floor leveling takes 2 to 4 days. Your home remains livable throughout.' },
]

export default function CrawlSpaceRepairLawrenceville() {
  const jsonLd = { '@context': 'https://schema.org', '@type': 'Service', name: 'Crawl Space Repair in Lawrenceville, GA', provider: { '@type': 'LocalBusiness', name: 'Reliable Solutions Atlanta', telephone: '+17708952039', url: 'https://www.waterhelpme.com', address: { '@type': 'PostalAddress', addressLocality: 'Lawrenceville', addressRegion: 'GA', addressCountry: 'US' }, areaServed: { '@type': 'City', name: 'Lawrenceville', containedIn: 'Gwinnett County, GA' } }, serviceType: 'Crawl Space Repair' }
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
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 font-display leading-tight">Crawl Space Repair in Lawrenceville, GA</h1>
            <p className="text-white/80 text-lg sm:text-xl mb-8 leading-relaxed max-w-2xl">Crawl space structural repair in Lawrenceville typically costs between $2,500 and $8,000. Reliable Solutions Atlanta fixes sagging floors, failing piers, damaged joists, and weakened girders in Gwinnett County homes where decades of moisture and settling fill soil have compromised the floor structure. Free same-week inspections with detailed photo documentation.</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white text-[#273373] font-bold rounded-xl hover:bg-gray-100 transition-colors">Schedule Free Inspection</Link>
              <a href="tel:+17708952039" className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-transparent border-2 border-white/30 text-white font-bold rounded-xl hover:bg-white/10 transition-colors">(770) 895-2039</a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Why Lawrenceville Crawl Spaces Need Structural Repair</h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p>Lawrenceville homes built during the Gwinnett County building boom of the 1980s through 2000s are reaching the age where crawl space structural problems become visible. The subdivisions in the 30043 and 30044 zip codes — Sugarloaf, Collins Hill, Archer Ridge, Mallard Landing — were constructed quickly on fill soil that was not always compacted to engineering standards. After 20 to 30 years, this fill has continued to settle, taking the crawl space support piers with it.</p>
            <p>When piers settle, the girder beams they support drop. The floor joists spanning between girders follow, and the floor above sags. In a typical Lawrenceville home, you might notice a dip in the center of a room, a ball that rolls to one side on its own, or a door that has started dragging on the floor. These are signs that the support system beneath the floor has shifted.</p>
            <p>Moisture compounds the problem. Vented crawl spaces in Gwinnett County homes admit humid air that condenses on the cooler wood structure. Over years, this chronic moisture weakens joists, causes girder connections to loosen, and promotes wood rot at contact points where girders rest on piers. The structural wood loses strength gradually until it can no longer carry the floor load above.</p>
            <p>Termite and carpenter ant damage is another common factor in Lawrenceville crawl spaces. The damp wood attracts wood-destroying insects that hollow out joists and girders from the inside. The damage is often invisible from above until the floor noticeably sags or bounces.</p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Signs Your Lawrenceville Crawl Space Needs Repair</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: 'Floors sagging in the center of rooms', desc: 'When crawl space piers settle or girders weaken, the floor above dips in the middle where the span between supports is longest. This sag worsens over time as the structure continues to lose strength.' },
              { title: 'Bouncy or springy floors when walking', desc: 'Floors that bounce underfoot indicate the joists have lost stiffness from moisture damage, rot, or insect activity. Healthy floor joists are rigid. Bouncy joists have been compromised and need reinforcement.' },
              { title: 'Doors sticking or not latching properly', desc: 'When the floor system drops unevenly, door frames rack out of square. Interior doors that used to close smoothly start dragging, leaving gaps, or not latching. This tracks directly to crawl space pier settlement.' },
              { title: 'Visible gaps between floor and baseboards', desc: 'Separation between the floor surface and the baseboards along walls indicates the floor has dropped while the walls stayed in place. The gap follows the line of the settling section of the floor system.' },
              { title: 'Cracks in drywall above door frames', desc: 'Diagonal cracks radiating from the corners of door and window frames upstairs are caused by the floor system shifting beneath the wall framing. The wall cannot flex with the movement, so the drywall cracks.' },
              { title: 'Uneven tile or cracked grout lines', desc: 'Tile floors in kitchens and bathrooms are rigid and show crawl space movement immediately. Cracked tiles, popped grout, or uneven surfaces that develop over time point to a shifting floor structure beneath.' },
            ].map((sign, i) => (
              <div key={i} className="bg-white rounded-xl p-5 shadow-sm"><h3 className="font-semibold text-[#273373] text-base mb-2">{sign.title}</h3><p className="text-gray-600 text-sm leading-relaxed">{sign.desc}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">How We Repair Crawl Spaces in Lawrenceville</h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <h3 className="text-[#273373] font-display">Adjustable Steel Pier Replacement</h3>
            <p>We remove failed concrete block or wooden piers and replace them with adjustable steel piers on properly poured concrete footings. Steel piers can be precisely adjusted to lift the girder back to level and can be readjusted in the future if any additional settling occurs. For Lawrenceville homes on compacted fill, we size the footings larger than standard to distribute the load across the settling soil.</p>

            <h3 className="text-[#273373] font-display">Joist Sistering</h3>
            <p>Damaged floor joists are reinforced by bolting a new piece of treated lumber alongside the existing joist. The new sister joist carries the load that the damaged joist can no longer handle. We use structural screws and construction adhesive to bond the new wood to the existing joist, creating a composite member that is stronger than the original. All new lumber is pressure-treated and borate-treated to resist future moisture and pest damage.</p>

            <h3 className="text-[#273373] font-display">Girder Beam Repair and Replacement</h3>
            <p>When main girder beams have rotted, split, or been damaged by insects, we either sister them with new treated lumber or replace them entirely. For full replacement, we temporarily support the floor above with jacks, remove the failed girder, install the new beam on new piers, and lower the floor onto the new support. This is the most significant crawl space structural repair and is common in Lawrenceville homes where moisture damage has been unaddressed for years.</p>

            <h3 className="text-[#273373] font-display">Floor Leveling</h3>
            <p>After replacing piers and repairing damaged wood, we level the floor system using the adjustable piers. We raise the floor incrementally over several hours to avoid cracking drywall or stressing framing connections. A laser level verifies the floor is within tolerance. Most Lawrenceville floor leveling achieves results within a quarter inch of perfectly level.</p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Crawl Space Repair Costs in Lawrenceville</h2>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#273373] text-white"><tr><th className="px-6 py-4 text-left text-sm font-semibold">Service</th><th className="px-6 py-4 text-left text-sm font-semibold">Typical Cost</th><th className="px-6 py-4 text-left text-sm font-semibold hidden sm:table-cell">Timeline</th></tr></thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ['Pier replacement (per pier)', '$600 – $1,200', '1 day'],
                  ['Joist sistering (per joist)', '$100 – $200', '1 day'],
                  ['Girder beam sistering', '$1,500 – $3,000', '1-2 days'],
                  ['Girder beam full replacement', '$2,500 – $5,000', '1-2 days'],
                  ['Floor leveling (per room area)', '$1,500 – $3,500', '1 day'],
                  ['Full structural restoration', '$5,000 – $12,000', '2-4 days'],
                ].map(([r, c, t], i) => (<tr key={i} className="hover:bg-gray-50"><td className="px-6 py-4 text-sm text-gray-900">{r}</td><td className="px-6 py-4 text-sm font-semibold text-[#115997]">{c}</td><td className="px-6 py-4 text-sm text-gray-500 hidden sm:table-cell">{t}</td></tr>))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mt-4">Financing available through GreenSky. All structural work includes warranty. We recommend pairing repair with waterproofing or encapsulation to protect the new structure.</p>
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
              { title: 'Crawl Space Encapsulation', href: '/crawl-space-encapsulation/lawrenceville', desc: 'Seal the crawl space after structural repair to prevent the moisture damage from recurring.' },
              { title: 'Foundation Repair', href: '/foundation-repair/lawrenceville', desc: 'Fix foundation wall and footing issues that contribute to crawl space structural problems.' },
              { title: 'Crawl Space Waterproofing', href: '/crawl-space-waterproofing/lawrenceville', desc: 'Stop the water entry that causes the wood rot and pier settling in the first place.' },
            ].map((s, i) => (<Link key={i} href={s.href} className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow group"><h3 className="font-semibold text-[#273373] mb-2 group-hover:text-[#115997] transition-colors">{s.title}</h3><p className="text-gray-600 text-sm">{s.desc}</p></Link>))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#273373] mb-6 font-display">Learn More About Crawl Spaces</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[{ title: 'Crawl Space Repair Cost in Atlanta', href: '/blog/crawl-space-repair-cost-atlanta' }, { title: 'Crawl Space Mold: Signs and Solutions', href: '/blog/crawl-space-mold-signs' }, { title: 'Crawl Space Encapsulation vs Waterproofing', href: '/blog/crawl-space-encapsulation-vs-waterproofing' }, { title: 'Signs of Foundation Settling vs Structural Damage', href: '/blog/signs-foundation-settling-vs-structural-damage' }].map((p, i) => (<Link key={i} href={p.href} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"><svg className="w-5 h-5 text-[#115997] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg><span className="text-sm font-medium text-gray-800">{p.title}</span></Link>))}
          </div>
        </div>
      </section>

      <section className="py-8 bg-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-gray-500 mb-4"><Link href="/" className="hover:text-[#115997]">Home</Link> {' / '}<Link href="/crawl-space-repair" className="hover:text-[#115997]">Crawl Space Repair</Link> {' / '}<span className="text-gray-700">Lawrenceville</span></p>
          <p className="text-sm text-gray-500">Crawl space repair also available in <Link href="/crawl-space-repair/marietta" className="text-[#115997] hover:underline">Marietta</Link>, <Link href="/crawl-space-repair/roswell" className="text-[#115997] hover:underline">Roswell</Link>, <Link href="/crawl-space-repair/alpharetta" className="text-[#115997] hover:underline">Alpharetta</Link>, <Link href="/crawl-space-repair/decatur" className="text-[#115997] hover:underline">Decatur</Link>, <Link href="/crawl-space-repair/sandy-springs" className="text-[#115997] hover:underline">Sandy Springs</Link>, and <Link href="/crawl-space-repair/stone-mountain" className="text-[#115997] hover:underline">Stone Mountain</Link>.</p>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-[#115997]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 font-display">Free Crawl Space Inspection in Lawrenceville</h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">We will crawl under your Lawrenceville home, inspect every pier, joist, and girder, take photos, and give you an honest structural assessment with pricing. No obligation, no sales pressure.</p>
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