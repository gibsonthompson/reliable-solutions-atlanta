import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export const metadata = {
  title: 'Basement Waterproofing in Stone Mountain, GA | Free Inspection | Reliable Solutions Atlanta',
  description: 'Basement waterproofing in Stone Mountain, GA. Interior drainage, sump pumps, and block wall sealing for homes on granite substrata. Most projects $2,500-$7,000. Free inspection. 770-895-2039.',
  keywords: 'basement waterproofing Stone Mountain GA, basement waterproofing DeKalb County, wet basement Stone Mountain, basement leak repair Stone Mountain Georgia',
  openGraph: { title: 'Basement Waterproofing in Stone Mountain, GA | Reliable Solutions Atlanta', description: 'Stop water in your Stone Mountain basement. Granite substrata specialists. Free inspections. 770-895-2039.', url: 'https://www.waterhelpme.com/basement-waterproofing/stone-mountain', type: 'website' },
  alternates: { canonical: 'https://www.waterhelpme.com/basement-waterproofing/stone-mountain' },
}

const faqs = [
  { question: 'How much does basement waterproofing cost in Stone Mountain, GA?', answer: 'Basement waterproofing in Stone Mountain typically costs between $2,500 and $7,000 for interior drainage systems. Stone Mountain homes are generally smaller than north-side suburbs, which keeps costs lower. Crack injection starts at $400. Sump pump installation with battery backup costs $1,500 to $2,500.' },
  { question: 'How does the granite near Stone Mountain affect basement water?', answer: 'The granite monadnock extends underground across much of the Stone Mountain area. Granite is impermeable to water, so rainfall that would normally soak into the ground instead runs along the rock surface underground. This creates fast-moving subsurface water channels that can deliver large volumes of water to your basement walls and floor from unexpected directions.' },
  { question: 'Why does my Stone Mountain basement flood even in light rain?', answer: 'If your home sits on shallow granite, even light rain has nowhere to go but sideways along the rock surface. A small amount of rain over a large area funnels into concentrated streams that hit your foundation. You may see flooding from light rain that does not affect your neighbors, because the granite channels are specific to your property location.' },
  { question: 'Can you waterproof a cinder block basement in Stone Mountain?', answer: 'Yes. Cinder block basements are the most common type in Stone Mountain. Block walls are hollow and porous, which makes them especially vulnerable to water. We install interior drainage board on the block walls to capture water weeping through the block cores and channel it to the perimeter drain and sump pump.' },
  { question: 'Is it worth waterproofing an older Stone Mountain home?', answer: 'A waterproofed basement adds usable square footage, eliminates mold and moisture problems, and reduces energy costs. Even in the more affordable Stone Mountain market, a dry basement versus a wet one can mean a $10,000 to $20,000 difference in home value. The waterproofing investment typically pays for itself at resale.' },
]

export default function BasementWaterproofingStoneMountain() {
  const jsonLd = { '@context': 'https://schema.org', '@type': 'Service', name: 'Basement Waterproofing in Stone Mountain, GA', provider: { '@type': 'LocalBusiness', name: 'Reliable Solutions Atlanta', telephone: '+17708952039', url: 'https://www.waterhelpme.com', address: { '@type': 'PostalAddress', addressLocality: 'Stone Mountain', addressRegion: 'GA', addressCountry: 'US' }, areaServed: { '@type': 'City', name: 'Stone Mountain', containedIn: 'DeKalb County, GA' } }, serviceType: 'Basement Waterproofing' }
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
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 font-display leading-tight">Basement Waterproofing in Stone Mountain, GA</h1>
            <p className="text-white/80 text-lg sm:text-xl mb-8 leading-relaxed max-w-2xl">Basement waterproofing in Stone Mountain typically costs between $2,500 and $7,000. Reliable Solutions Atlanta understands the unique water challenges created by the granite substrata in eastern DeKalb County. We stop basement leaks permanently with drainage systems designed for how water actually moves through Stone Mountain soil. Free same-week inspections.</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white text-[#273373] font-bold rounded-xl hover:bg-gray-100 transition-colors">Schedule Free Inspection</Link>
              <a href="tel:+17708952039" className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-transparent border-2 border-white/30 text-white font-bold rounded-xl hover:bg-white/10 transition-colors">(770) 895-2039</a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Why Stone Mountain Basements Have Water Problems</h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p>Stone Mountain basement waterproofing presents a challenge unlike anywhere else in metro Atlanta because of what lies beneath the surface. The granite monadnock — the massive rock formation visible as Stone Mountain itself — extends underground across much of the surrounding area. This shallow bedrock layer fundamentally changes how water behaves in the soil around your home.</p>
            <p>In most of metro Atlanta, rainwater percolates downward through clay soil. In Stone Mountain, water hits the impermeable granite layer and flows laterally along its surface. This creates fast-moving underground streams that are invisible from above. A home might sit directly in the path of one of these streams, receiving a concentrated flow of water against its basement walls while a neighbor 50 feet away stays completely dry.</p>
            <p>The housing stock in Stone Mountain — primarily 1960s through 1980s homes in the 30083, 30087, and 30088 zip codes — was built with cinder block basements. Block walls are hollow and porous, making them especially vulnerable to water intrusion. Water enters through the exterior face of the block, fills the hollow cores, and weeps through the interior face. The original mortar between blocks deteriorates over decades, creating additional entry paths.</p>
            <p>The areas around Memorial Drive, Rockbridge Road, and the neighborhoods near the base of Stone Mountain have the shallowest granite and therefore the most severe basement water problems. However, we service homes throughout eastern DeKalb County where granite influence varies from property to property.</p>
            <p>Deferred maintenance amplifies the problem in many Stone Mountain homes. Clogged gutters, deteriorated downspout extensions, and eroded grading direct surface water toward the foundation. When this surface water meets subsurface granite-channeled water, the volume overwhelms any original drainage that may have existed.</p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Signs Your Stone Mountain Basement Needs Waterproofing</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: 'Water appearing from unexpected directions', desc: 'Granite subsurface channels deliver water from uphill areas that may not be visible from your property. You may see water entering from a direction that does not match the surface grade. This is water following the rock layer underground.' },
              { title: 'Standing water on basement floor after rain', desc: 'If water pools on the basement floor within hours of rain starting, the volume arriving at your foundation exceeds what the floor-wall joint can contain. This is common in Stone Mountain homes directly in the path of granite drainage channels.' },
              { title: 'Weeping through cinder block walls', desc: 'Water trickling or weeping from the interior face of block walls is the hollow cores filling with water from outside. You may see it concentrated at certain blocks where the mortar has failed or the block face is most porous.' },
              { title: 'White staining across block walls', desc: 'Efflorescence spread across large sections of block wall rather than concentrated at a few points indicates the entire wall is taking on water. This is common when the original exterior coating has fully deteriorated.' },
              { title: 'Mold on floor joists above the basement', desc: 'Look up at the wooden floor joists above your Stone Mountain basement. If they show mold growth on the bottom faces, the basement humidity is high enough to damage the structure of your home, not just stored belongings.' },
              { title: 'Floor drain backing up during rain', desc: 'Older Stone Mountain homes sometimes have floor drains connected to footer drains. When the footer drain is overwhelmed by granite-channeled water, it backs up through the floor drain, bringing water into the basement through the drain itself.' },
            ].map((sign, i) => (
              <div key={i} className="bg-white rounded-xl p-5 shadow-sm"><h3 className="font-semibold text-[#273373] text-base mb-2">{sign.title}</h3><p className="text-gray-600 text-sm leading-relaxed">{sign.desc}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">How We Waterproof Basements in Stone Mountain</h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <h3 className="text-[#273373] font-display">Interior Drainage with High-Volume Capacity</h3>
            <p>Stone Mountain's granite-channeled water can arrive in high volumes during storms. Our interior drainage systems use larger-diameter pipe and oversized gravel beds to handle these surge flows. The perimeter channel intercepts water at the wall-floor joint before it reaches the living space and routes it to a sump pit sized for your property's specific water volume.</p>
            <h3 className="text-[#273373] font-display">Block Wall Interior Drainage Board</h3>
            <p>For cinder block basements, we install a dimpled HDPE drainage board on the interior wall surface. The board creates an air gap that captures water weeping through the block cores and channels it downward to the perimeter drain. This prevents water from contacting anything on the interior side of the board — drywall, insulation, or stored items.</p>
            <h3 className="text-[#273373] font-display">Sump Pump with Redundant Backup</h3>
            <p>Given the volume of water that granite channels can deliver, we install primary pumps rated for high flow and pair them with battery backup systems. For Stone Mountain homes with severe water, we install dual-pump systems where two pumps alternate to reduce wear and provide immediate backup if one fails. The discharge routes to a daylight point away from the foundation.</p>
            <h3 className="text-[#273373] font-display">Exterior Interception Drain</h3>
            <p>When we can identify the direction of the granite subsurface water channel, we install an interception drain uphill of the basement to capture the water before it reaches the foundation. This drain is installed deeper than a standard French drain — down to the granite surface — to intercept water at the layer where it is traveling. This can dramatically reduce the volume that reaches the basement walls.</p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Basement Waterproofing Costs in Stone Mountain</h2>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#273373] text-white"><tr><th className="px-6 py-4 text-left text-sm font-semibold">Service</th><th className="px-6 py-4 text-left text-sm font-semibold">Typical Cost</th><th className="px-6 py-4 text-left text-sm font-semibold hidden sm:table-cell">Timeline</th></tr></thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ['Crack and mortar joint sealing', '$400 – $800', '2-4 hours'],
                  ['Interior perimeter drainage', '$2,500 – $7,000', '2-3 days'],
                  ['Block wall drainage board', '$1,500 – $3,500', '1-2 days'],
                  ['Sump pump with battery backup', '$1,500 – $2,500', '1 day'],
                  ['Dual sump pump system', '$2,500 – $4,000', '1 day'],
                  ['Exterior interception drain', '$2,500 – $5,000', '2-3 days'],
                ].map(([r, c, t], i) => (<tr key={i} className="hover:bg-gray-50"><td className="px-6 py-4 text-sm text-gray-900">{r}</td><td className="px-6 py-4 text-sm font-semibold text-[#115997]">{c}</td><td className="px-6 py-4 text-sm text-gray-500 hidden sm:table-cell">{t}</td></tr>))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mt-4">Financing available through GreenSky with plans starting at 0% interest. All work includes warranty.</p>
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
              { title: 'Foundation Repair', href: '/foundation-repair/stone-mountain', desc: 'Granite substrata affects both waterproofing and foundation stability. Address both for a lasting solution.' },
              { title: 'Crawl Space Encapsulation', href: '/crawl-space-encapsulation', desc: 'Many Stone Mountain homes have crawl spaces. Encapsulation stops moisture from entering the living space.' },
              { title: 'Drainage Solutions', href: '/drainage', desc: 'Custom drainage designed for Stone Mountain granite conditions to redirect water before it reaches your basement.' },
            ].map((s, i) => (<Link key={i} href={s.href} className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow group"><h3 className="font-semibold text-[#273373] mb-2 group-hover:text-[#115997] transition-colors">{s.title}</h3><p className="text-gray-600 text-sm">{s.desc}</p></Link>))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#273373] mb-6 font-display">Learn More About Basement Waterproofing</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[{ title: 'Basement Waterproofing Cost in Atlanta', href: '/blog/basement-waterproofing-cost-atlanta' }, { title: 'Interior vs Exterior Basement Waterproofing', href: '/blog/interior-vs-exterior-basement-waterproofing' }, { title: 'French Drain Cost in Atlanta', href: '/blog/french-drain-cost-atlanta' }, { title: 'Sump Pump Maintenance Guide', href: '/blog/sump-pump-maintenance-guide' }].map((p, i) => (<Link key={i} href={p.href} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"><svg className="w-5 h-5 text-[#115997] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg><span className="text-sm font-medium text-gray-800">{p.title}</span></Link>))}
          </div>
        </div>
      </section>

      <section className="py-8 bg-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-gray-500 mb-4"><Link href="/" className="hover:text-[#115997]">Home</Link> {' / '}<Link href="/basement-waterproofing" className="hover:text-[#115997]">Basement Waterproofing</Link> {' / '}<span className="text-gray-700">Stone Mountain</span></p>
          <p className="text-sm text-gray-500">Basement waterproofing also available in <Link href="/basement-waterproofing/lawrenceville" className="text-[#115997] hover:underline">Lawrenceville</Link>, <Link href="/basement-waterproofing/marietta" className="text-[#115997] hover:underline">Marietta</Link>, <Link href="/basement-waterproofing/roswell" className="text-[#115997] hover:underline">Roswell</Link>, <Link href="/basement-waterproofing/alpharetta" className="text-[#115997] hover:underline">Alpharetta</Link>, <Link href="/basement-waterproofing/decatur" className="text-[#115997] hover:underline">Decatur</Link>, and <Link href="/basement-waterproofing/sandy-springs" className="text-[#115997] hover:underline">Sandy Springs</Link>.</p>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-[#115997]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 font-display">Free Basement Inspection in Stone Mountain</h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">We know how water moves through Stone Mountain soil. We will inspect your basement, explain where the water is coming from and why, and give you a clear written estimate. No obligation, no pressure.</p>
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