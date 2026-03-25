import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export const metadata = {
  title: 'Basement Waterproofing in Alpharetta, GA | Free Inspection | Reliable Solutions Atlanta',
  description: 'Basement waterproofing in Alpharetta, GA. Interior drainage, crack repair, and sump pump installation for North Fulton homes. Most projects $3,000-$9,000. Free inspection. 770-895-2039.',
  keywords: 'basement waterproofing Alpharetta GA, basement waterproofing North Fulton, wet basement Alpharetta, basement leak repair Alpharetta Georgia',
  openGraph: { title: 'Basement Waterproofing in Alpharetta, GA | Reliable Solutions Atlanta', description: 'Stop basement water in your Alpharetta home. Free inspections. 770-895-2039.', url: 'https://www.waterhelpme.com/basement-waterproofing/alpharetta', type: 'website' },
  alternates: { canonical: 'https://www.waterhelpme.com/basement-waterproofing/alpharetta' },
}

const faqs = [
  { question: 'How much does basement waterproofing cost in Alpharetta, GA?', answer: 'Basement waterproofing in Alpharetta typically costs between $3,000 and $9,000 for interior drainage systems. Crack injection starts at $400. Full exterior waterproofing ranges from $9,000 to $16,000. Many Alpharetta homes have partial daylight basements that cost less than full below-grade basements to waterproof.' },
  { question: 'Do newer Alpharetta homes need basement waterproofing?', answer: 'Yes. Homes built in the 1990s and 2000s in Alpharetta are now 20 to 30 years old. The original damproofing has begun to fail, and settlement cracks in the poured concrete walls provide entry points for water. We see increasing calls from Alpharetta homeowners in Windward, Cambridge, and Thornberry who assumed their newer homes were immune to water problems.' },
  { question: 'Why is my Alpharetta basement only wet on one side?', answer: 'Uneven grading is the most common cause. Many Alpharetta homes sit on lots that slope toward the house from one direction. That side receives more surface water runoff, and the soil stays saturated longer. The opposite side may stay dry because the grade slopes away. Correcting the drainage on the wet side is often enough to solve the problem.' },
  { question: 'Can I waterproof my Alpharetta basement from the inside?', answer: 'Interior waterproofing is the most common and cost-effective approach for Alpharetta basements. We install a perimeter drainage system beneath the floor that collects water at the wall-floor joint and routes it to a sump pump. This works with the hydrostatic pressure rather than fighting it. For most Alpharetta homes, interior systems are the best value.' },
  { question: 'Will a sump pump alone fix my wet Alpharetta basement?', answer: 'A sump pump without a drainage system only removes water that has already reached the pit. Without a perimeter drain to channel water to the pit, most of the water still ends up on your floor. A complete system includes the drainage channel, the sump pit, and the pump working together.' },
]

export default function BasementWaterproofingAlpharetta() {
  const jsonLd = { '@context': 'https://schema.org', '@type': 'Service', name: 'Basement Waterproofing in Alpharetta, GA', provider: { '@type': 'LocalBusiness', name: 'Reliable Solutions Atlanta', telephone: '+17708952039', url: 'https://www.waterhelpme.com', address: { '@type': 'PostalAddress', addressLocality: 'Alpharetta', addressRegion: 'GA', addressCountry: 'US' }, areaServed: { '@type': 'City', name: 'Alpharetta', containedIn: 'Fulton County, GA' } }, serviceType: 'Basement Waterproofing' }
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
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 font-display leading-tight">Basement Waterproofing in Alpharetta, GA</h1>
            <p className="text-white/80 text-lg sm:text-xl mb-8 leading-relaxed max-w-2xl">Basement waterproofing in Alpharetta typically costs between $3,000 and $9,000 for interior drainage systems. Reliable Solutions Atlanta provides permanent solutions for wet basements in North Fulton County homes, from newer Windward-area construction to established neighborhoods along Old Milton Parkway. Free same-week inspections with written estimates.</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white text-[#273373] font-bold rounded-xl hover:bg-gray-100 transition-colors">Schedule Free Inspection</Link>
              <a href="tel:+17708952039" className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-transparent border-2 border-white/30 text-white font-bold rounded-xl hover:bg-white/10 transition-colors">(770) 895-2039</a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Why Alpharetta Basements Have Water Problems</h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p>Alpharetta experienced its most intense residential building period between 1995 and 2010. During this era, subdivisions like Windward, Broadwell Oaks, Thornberry, Cambridge, Cogburn Station, and the developments along Haynes Bridge Road and Old Milton Parkway added thousands of homes. Many of these homes include partial or daylight basements that were marketed as bonus square footage, but the waterproofing applied during construction was minimal.</p>
            <p>The standard practice during Alpharetta's building boom was to spray a thin asphalt-based damproofing coating on the exterior foundation walls before backfilling. This coating is designed to resist moisture, not water under pressure. It was never intended to handle the hydrostatic pressure that builds in Georgia red clay during sustained rain. After 15 to 25 years of exposure to soil chemicals, root growth, and freeze-thaw cycles, this coating has failed on most Alpharetta homes.</p>
            <p>Another Alpharetta-specific factor is the fill soil used to create level building pads. When builders graded lots in the rolling North Fulton terrain, they cut into hillsides and filled low spots. The fill soil was often not compacted in controlled lifts, so it continues to settle and compact decades later. As it compacts, it can pull away from the foundation wall, creating channels that direct water straight to the basement.</p>
            <p>The 30004, 30005, 30009, and 30022 zip codes are where we perform the most basement waterproofing work in the Alpharetta area. Homes in the Windward community and along Kimball Bridge Road are particularly common calls due to the combination of large basements, clay soil, and original damproofing that has reached the end of its life.</p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Signs Your Alpharetta Basement Needs Waterproofing</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: 'Water at the wall-floor joint after rain', desc: 'The most common entry point in Alpharetta basements. Water seeps in where the floor slab meets the wall because this joint is not sealed and hydrostatic pressure forces water through the gap.' },
              { title: 'Damp carpet or wet spots on finished floors', desc: 'Many Alpharetta basements were finished by the builder or by homeowners. Water shows up first as damp spots in carpet or warped laminate flooring. By the time you feel it, water has been present behind the walls for some time.' },
              { title: 'Efflorescence on unfinished walls', desc: 'If any portion of your Alpharetta basement is unfinished, look for white powdery deposits on the concrete. This mineral residue is left behind when water passes through the wall and evaporates. It confirms active water penetration.' },
              { title: 'Hairline cracks in poured concrete walls', desc: 'Poured concrete basement walls in Alpharetta homes develop shrinkage cracks as the concrete cures and ages. These hairline cracks widen slightly over time and become entry points for pressurized water during rain events.' },
              { title: 'Musty odor that gets worse in summer', desc: 'Summer humidity in Alpharetta can push outdoor dew points above 70°F. Moisture vapor passes through unprotected concrete walls and condenses in the cooler basement, creating a damp environment that produces a persistent musty smell.' },
              { title: 'Dehumidifier running constantly', desc: 'If your basement dehumidifier fills its reservoir daily or runs nonstop, it is fighting a losing battle against moisture entering through the concrete. A waterproofing system stops the water at the source rather than trying to remove it after it enters.' },
            ].map((sign, i) => (
              <div key={i} className="bg-white rounded-xl p-5 shadow-sm"><h3 className="font-semibold text-[#273373] text-base mb-2">{sign.title}</h3><p className="text-gray-600 text-sm leading-relaxed">{sign.desc}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">How We Waterproof Basements in Alpharetta</h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <h3 className="text-[#273373] font-display">Interior Perimeter Drainage</h3>
            <p>We install a French drain channel beneath the basement floor along the perimeter where water enters. The channel collects water at the wall-floor joint and routes it through a perforated pipe to a sump pit. This is the most cost-effective solution for Alpharetta basements because it intercepts water at the entry point without requiring exterior excavation through landscaping and hardscaping.</p>
            <h3 className="text-[#273373] font-display">Crack Injection with Flexible Polyurethane</h3>
            <p>Poured concrete basements in Alpharetta develop shrinkage and settlement cracks that leak under pressure. We inject flexible polyurethane resin that fills the crack from inside to outside and remains elastic to accommodate minor future movement. This is important in Alpharetta where fill soil settlement can cause ongoing micro-movement in the foundation.</p>
            <h3 className="text-[#273373] font-display">Sump Pump with Battery and Water Alarm</h3>
            <p>Every system includes a primary sump pump rated for the expected water volume, a battery backup for power outages, and a water alarm that alerts you if the water level rises above normal. For Alpharetta homes in HOA communities where exterior discharge must be managed carefully, we route the discharge line to appropriate locations that comply with community standards.</p>
            <h3 className="text-[#273373] font-display">Exterior Grading and Drainage Correction</h3>
            <p>When the exterior grade has settled and is directing water toward the foundation, we regrade the soil to restore proper slope away from the house. We also extend downspouts, install splash blocks, and when necessary add surface drainage channels to redirect water before it saturates the soil around the basement. This is often done as a complement to interior drainage rather than a standalone solution.</p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Basement Waterproofing Costs in Alpharetta</h2>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#273373] text-white"><tr><th className="px-6 py-4 text-left text-sm font-semibold">Service</th><th className="px-6 py-4 text-left text-sm font-semibold">Typical Cost</th><th className="px-6 py-4 text-left text-sm font-semibold hidden sm:table-cell">Timeline</th></tr></thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ['Crack injection (per crack)', '$400 – $800', '2-4 hours'],
                  ['Interior perimeter drainage', '$3,000 – $9,000', '2-3 days'],
                  ['Sump pump with battery backup', '$1,500 – $3,000', '1 day'],
                  ['Exterior grading correction', '$1,500 – $4,000', '1-2 days'],
                  ['Exterior waterproofing membrane', '$9,000 – $16,000', '3-5 days'],
                  ['Dehumidifier installation', '$800 – $1,500', 'Same day'],
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
          <h2 className="text-2xl font-bold text-[#273373] mb-6 font-display">Related Services in Alpharetta</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { title: 'Foundation Repair', href: '/foundation-repair/alpharetta', desc: 'Settlement cracks that leak water also indicate foundation movement. Address both for a lasting fix.' },
              { title: 'Drainage Solutions', href: '/drainage', desc: 'Correct exterior grading and install French drains to reduce water pressure on your Alpharetta basement.' },
              { title: 'Crawl Space Waterproofing', href: '/crawl-space-waterproofing', desc: 'For Alpharetta homes with crawl spaces, waterproofing prevents moisture from entering the structure.' },
            ].map((s, i) => (<Link key={i} href={s.href} className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow group"><h3 className="font-semibold text-[#273373] mb-2 group-hover:text-[#115997] transition-colors">{s.title}</h3><p className="text-gray-600 text-sm">{s.desc}</p></Link>))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#273373] mb-6 font-display">Learn More About Basement Waterproofing</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[{ title: 'Basement Waterproofing Cost in Atlanta', href: '/blog/basement-waterproofing-cost-atlanta' }, { title: 'Interior vs Exterior Basement Waterproofing', href: '/blog/interior-vs-exterior-basement-waterproofing' }, { title: 'Signs You Need Basement Waterproofing', href: '/blog/signs-you-need-basement-waterproofing' }, { title: 'How to Choose a Waterproofing Contractor', href: '/blog/how-to-choose-waterproofing-contractor-atlanta' }].map((p, i) => (<Link key={i} href={p.href} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"><svg className="w-5 h-5 text-[#115997] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg><span className="text-sm font-medium text-gray-800">{p.title}</span></Link>))}
          </div>
        </div>
      </section>

      <section className="py-8 bg-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-gray-500 mb-4"><Link href="/" className="hover:text-[#115997]">Home</Link> {' / '}<Link href="/basement-waterproofing" className="hover:text-[#115997]">Basement Waterproofing</Link> {' / '}<span className="text-gray-700">Alpharetta</span></p>
          <p className="text-sm text-gray-500">Basement waterproofing also available in <Link href="/basement-waterproofing/lawrenceville" className="text-[#115997] hover:underline">Lawrenceville</Link>, <Link href="/basement-waterproofing/marietta" className="text-[#115997] hover:underline">Marietta</Link>, <Link href="/basement-waterproofing/roswell" className="text-[#115997] hover:underline">Roswell</Link>, <Link href="/basement-waterproofing/decatur" className="text-[#115997] hover:underline">Decatur</Link>, <Link href="/basement-waterproofing/sandy-springs" className="text-[#115997] hover:underline">Sandy Springs</Link>, and <Link href="/basement-waterproofing/stone-mountain" className="text-[#115997] hover:underline">Stone Mountain</Link>.</p>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-[#115997]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 font-display">Free Basement Inspection in Alpharetta</h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">We will inspect your Alpharetta basement, find where the water is getting in, and give you a clear plan with pricing. No pressure, no surprise upsells. Just honest answers.</p>
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