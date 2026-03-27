import Link from 'next/link'

export const metadata = {
  title: 'Basement Waterproofing in Marietta, GA | Free Inspection | Reliable Solutions Atlanta',
  description: 'Basement waterproofing in Marietta, GA. Walk-out basement specialists for Cobb County hillside homes. Interior drainage, exterior membrane, sump pumps. Free inspection. 770-895-2039.',
  keywords: 'basement waterproofing Marietta GA, basement waterproofing Cobb County, wet basement Marietta, walk-out basement waterproofing Marietta Georgia',
  openGraph: { title: 'Basement Waterproofing in Marietta, GA | Reliable Solutions Atlanta', description: 'Stop water in your Marietta basement. Walk-out basement specialists. Free inspections. 770-895-2039.', url: 'https://www.waterhelpme.com/basement-waterproofing/marietta', type: 'website' },
  alternates: { canonical: 'https://www.waterhelpme.com/basement-waterproofing/marietta' },
}

const faqs = [
  { question: 'How much does basement waterproofing cost in Marietta, GA?', answer: 'Basement waterproofing in Marietta typically costs between $3,500 and $10,000. Walk-out basements on hillside lots in East and West Cobb often require both interior and exterior work, pushing costs toward the higher end. Interior-only drainage systems start around $3,500. Exterior waterproofing with excavation ranges from $8,000 to $16,000.' },
  { question: 'Why do walk-out basements in Marietta leak more than full basements?', answer: 'Walk-out basements have three buried walls and one exposed wall. The three buried walls receive different amounts of soil pressure depending on the grade. The uphill wall gets the most water pressure while the walk-out wall gets none. This uneven pressure concentrates water entry on specific walls, and the hillside grade channels water directly toward those walls during rain.' },
  { question: 'Can I finish my Marietta basement if it has water issues?', answer: 'You should waterproof first, then finish. Installing drywall, carpet, and fixtures over a wet basement leads to mold growth behind walls and expensive tear-outs within a few years. We waterproof the space first, verify it stays dry through multiple rain events, then you can safely finish it knowing the water problem is solved.' },
  { question: 'Does Marietta get enough rain to need basement waterproofing?', answer: 'Metro Atlanta receives over 50 inches of rain per year, which is more than Seattle. Cobb County specifically gets heavy spring storms and late summer tropical moisture that dumps large volumes quickly. The clay soil retains this water and presses it against basement walls for days after each rain event.' },
  { question: 'Will waterproofing fix the mold smell in my Marietta basement?', answer: 'Yes. The musty smell is caused by mold and mildew growing in a damp environment. Waterproofing stops the water entry, and we recommend running a dehumidifier to control residual humidity. Existing mold on surfaces should be remediated after waterproofing to ensure a clean, dry space.' },
]

export default function BasementWaterproofingMarietta() {
  const jsonLd = { '@context': 'https://schema.org', '@type': 'Service', name: 'Basement Waterproofing in Marietta, GA', provider: { '@type': 'LocalBusiness', name: 'Reliable Solutions Atlanta', telephone: '+17708952039', url: 'https://www.waterhelpme.com', address: { '@type': 'PostalAddress', addressLocality: 'Marietta', addressRegion: 'GA', addressCountry: 'US' }, areaServed: { '@type': 'City', name: 'Marietta', containedIn: 'Cobb County, GA' } }, serviceType: 'Basement Waterproofing' }
  const faqJsonLd = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })) }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <section className="relative bg-[#273373] py-16 sm:py-20 md:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-[#273373] to-[#115997] opacity-90" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-white/70 text-sm font-medium mb-3 uppercase tracking-wider">Cobb County, Georgia</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 font-display leading-tight">Basement Waterproofing in Marietta, GA</h1>
            <p className="text-white/80 text-lg sm:text-xl mb-8 leading-relaxed max-w-2xl">
              Basement waterproofing in Marietta typically costs between $3,500 and $10,000. Reliable Solutions Atlanta specializes in walk-out basements on Cobb County's hilly terrain, where water follows the grade straight into your lowest level. Free same-week inspections with honest assessments and detailed photo documentation.
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
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Why Marietta Basements Have Water Problems</h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p>Marietta's rolling terrain is what gives Cobb County its character, but it creates a specific basement waterproofing challenge that flat suburbs do not face. Neighborhoods in East Cobb \u2014 Walton, Indian Hills, Sope Creek, Timber Ridge, and the communities along Johnson Ferry Road and Lower Roswell Road \u2014 are built on slopes that naturally channel water downhill. That downhill destination is often a walk-out basement wall.</p>
            <p>Walk-out basements are the dominant basement type in Marietta because builders adapted to the sloped lots by stepping the house into the hillside. The result is a basement with one or two walls fully below grade on the uphill side and an exposed wall or sliding door on the downhill side. The buried walls absorb the full force of water draining down the hillside through saturated clay soil.</p>
            <p>The problem is compounded by the age of most Marietta homes with basements. The 1970s and 1980s homes that make up much of East Cobb and the Marietta neighborhoods near Kennesaw Mountain were built with exterior damproofing \u2014 a thin asphalt-based coating \u2014 that was never designed to handle sustained hydrostatic pressure. After 40 to 50 years, this coating has cracked, peeled, or dissolved entirely. The block walls underneath are porous and admit water through every mortar joint.</p>
            <p>West Cobb homes near Due West, Acworth Highway, and Dallas Highway face additional challenges from the rocky soil mixed with clay. Water flows along rock surfaces underground and can appear in basements at unexpected locations \u2014 not just through the walls, but up through the floor slab where water pressure from below finds a path through cracks and joints.</p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Signs Your Marietta Basement Needs Waterproofing</h2>
          <p className="text-gray-700 text-lg mb-8">Walk-out basements on slopes show water problems differently than flat-lot basements. Here is what Marietta homeowners should watch for.</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: 'Water streaming down one specific wall', desc: 'In hillside basements, water concentrates on the uphill wall. You may see actual streams running down the wall surface during heavy rain while other walls stay completely dry. This is hydrostatic pressure from saturated hillside soil.' },
              { title: 'Floor puddles on the uphill side only', desc: 'Water pooling along the base of the uphill wall after rain is the wall-floor joint failing under pressure. The floor may be dry everywhere else. This targeted water entry pattern is characteristic of hillside basements.' },
              { title: 'Efflorescence heavier on one wall', desc: 'White mineral deposits concentrated on the uphill wall indicate chronic water penetration through that specific wall. The uneven distribution confirms the water is coming from the hillside soil, not from a plumbing leak or general humidity.' },
              { title: 'Bowing or cracking on the uphill wall', desc: 'Beyond just water, hillside soil pressure can push the uphill basement wall inward. This is both a waterproofing and a structural issue. Horizontal cracks or visible inward bow require foundation repair combined with waterproofing.' },
              { title: 'Water appearing through the floor slab', desc: 'In West Cobb homes on rocky soil, water can travel along rock surfaces underground and push up through the basement floor. If you see water bubbling through floor cracks or at the base of interior walls after rain, subsurface water is the cause.' },
              { title: 'Humidity above 60% even with AC running', desc: 'If your basement feels clammy or a hygrometer reads above 60% humidity despite air conditioning, moisture is entering through the walls and floor. This level of humidity supports mold growth and damages stored belongings.' },
            ].map((sign, i) => (
              <div key={i} className="bg-white rounded-xl p-5 shadow-sm"><h3 className="font-semibold text-[#273373] text-base mb-2">{sign.title}</h3><p className="text-gray-600 text-sm leading-relaxed">{sign.desc}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">How We Waterproof Basements in Marietta</h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <h3 className="text-[#273373] font-display">Targeted Interior Drainage</h3>
            <p>For Marietta hillside basements, we often install interior drainage selectively on the walls that are receiving water pressure rather than the full perimeter. The uphill wall and the two side walls that transition from below-grade to above-grade are where the water enters. The walk-out wall typically needs no drainage. This targeted approach reduces cost while fully addressing the problem.</p>
            <h3 className="text-[#273373] font-display">Exterior Curtain Drain</h3>
            <p>A curtain drain is installed uphill of the basement to intercept water flowing down the hillside before it reaches the foundation wall. We excavate a trench across the uphill side of the home, install perforated pipe in gravel, and route the water to a discharge point downhill. This reduces the hydrostatic pressure on the basement wall by diverting the water source. For Marietta hillside homes, this is often the most effective single intervention.</p>
            <h3 className="text-[#273373] font-display">Wall Membrane Systems</h3>
            <p>When excavation is feasible on the uphill side, we apply a waterproof membrane to the exterior of the buried walls. In Marietta's rocky clay soil, we use a dimpled drainage board over the membrane to create an air gap that allows water to drain freely to the footer drain rather than sitting against the membrane. This is the gold standard for hillside basement waterproofing.</p>
            <h3 className="text-[#273373] font-display">Sump Pump with Gravity Discharge</h3>
            <p>Walk-out basements have an advantage: the exposed downhill wall allows gravity discharge of collected water without relying solely on a pump. We route interior drainage to a sump pit, but the discharge line exits through the downhill wall and uses gravity to carry water away from the house. The pump serves as backup during extreme events, not as the primary discharge method.</p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Basement Waterproofing Costs in Marietta</h2>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#273373] text-white"><tr><th className="px-6 py-4 text-left text-sm font-semibold">Service</th><th className="px-6 py-4 text-left text-sm font-semibold">Typical Cost</th><th className="px-6 py-4 text-left text-sm font-semibold hidden sm:table-cell">Timeline</th></tr></thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ['Crack injection (per crack)', '$400 \u2013 $800', '2-4 hours'],
                  ['Targeted interior drainage (1-2 walls)', '$2,500 \u2013 $5,000', '1-2 days'],
                  ['Full interior drainage system', '$4,000 \u2013 $10,000', '2-3 days'],
                  ['Exterior curtain drain', '$3,000 \u2013 $6,000', '2-3 days'],
                  ['Exterior wall membrane', '$8,000 \u2013 $16,000', '3-5 days'],
                  ['Sump pump with battery backup', '$1,500 \u2013 $3,000', '1 day'],
                ].map(([r, c, t], i) => (<tr key={i} className="hover:bg-gray-50"><td className="px-6 py-4 text-sm text-gray-900">{r}</td><td className="px-6 py-4 text-sm font-semibold text-[#115997]">{c}</td><td className="px-6 py-4 text-sm text-gray-500 hidden sm:table-cell">{t}</td></tr>))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mt-4">Financing available through GreenSky. All waterproofing work includes transferable warranty.</p>
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
          <h2 className="text-2xl font-bold text-[#273373] mb-6 font-display">Related Services in Marietta</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { title: 'Foundation Repair', href: '/foundation-repair/marietta', desc: 'Hillside soil pressure damages both waterproofing and foundations. Fix both for a lasting solution.' },
              { title: 'Drainage Solutions', href: '/drainage', desc: 'Surface grading and French drains to redirect water before it reaches your Marietta basement walls.' },
              { title: 'Crawl Space Encapsulation', href: '/crawl-space-encapsulation', desc: 'For Marietta homes with crawl spaces, full encapsulation controls moisture at the source.' },
            ].map((s, i) => (<Link key={i} href={s.href} className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow group"><h3 className="font-semibold text-[#273373] mb-2 group-hover:text-[#115997] transition-colors">{s.title}</h3><p className="text-gray-600 text-sm">{s.desc}</p></Link>))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#273373] mb-6 font-display">Learn More About Basement Waterproofing</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: 'Basement Waterproofing Cost in Atlanta', href: '/blog/basement-waterproofing-cost-atlanta' },
              { title: 'Interior vs Exterior Basement Waterproofing', href: '/blog/interior-vs-exterior-basement-waterproofing' },
              { title: 'How to Choose a Waterproofing Contractor', href: '/blog/how-to-choose-waterproofing-contractor-atlanta' },
              { title: 'Signs You Need Basement Waterproofing', href: '/blog/signs-you-need-basement-waterproofing' },
            ].map((p, i) => (<Link key={i} href={p.href} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"><svg className="w-5 h-5 text-[#115997] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg><span className="text-sm font-medium text-gray-800">{p.title}</span></Link>))}
          </div>
        </div>
      </section>

      <section className="py-8 bg-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-gray-500 mb-4"><Link href="/" className="hover:text-[#115997]">Home</Link> {' / '}<Link href="/basement-waterproofing" className="hover:text-[#115997]">Basement Waterproofing</Link> {' / '}<span className="text-gray-700">Marietta</span></p>
          <p className="text-sm text-gray-500">Basement waterproofing also available in <Link href="/basement-waterproofing/lawrenceville" className="text-[#115997] hover:underline">Lawrenceville</Link>, <Link href="/basement-waterproofing/roswell" className="text-[#115997] hover:underline">Roswell</Link>, <Link href="/basement-waterproofing/alpharetta" className="text-[#115997] hover:underline">Alpharetta</Link>, <Link href="/basement-waterproofing/decatur" className="text-[#115997] hover:underline">Decatur</Link>, <Link href="/basement-waterproofing/sandy-springs" className="text-[#115997] hover:underline">Sandy Springs</Link>, and <Link href="/basement-waterproofing/stone-mountain" className="text-[#115997] hover:underline">Stone Mountain</Link>.</p>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-[#115997]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 font-display">Free Basement Inspection in Marietta</h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">We will inspect your Marietta basement, trace where the water is entering, and recommend the most cost-effective solution for your specific terrain and foundation type. No obligation.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#273373] font-bold rounded-xl hover:bg-gray-100 transition-colors text-lg">Schedule Free Inspection</Link>
            <a href="tel:+17708952039" className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-colors text-lg">Call (770) 895-2039</a>
          </div>
          <p className="text-white/50 text-sm mt-6">BBB A+ Accredited \u00b7 IICRC Certified \u00b7 20+ Years Experience \u00b7 Financing Available</p>
        </div>
      </section>
    </>
  )
}