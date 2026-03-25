import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Image from 'next/image'

export const metadata = {
  title: 'Foundation Repair in Marietta, GA | Free Inspection | Reliable Solutions Atlanta',
  description: 'Foundation repair services in Marietta, GA. Pier installation, wall stabilization, and crack repair for Cobb County homes. Historic and modern homes. Free inspection. Call 770-895-2039.',
  keywords: 'foundation repair Marietta GA, foundation repair Cobb County, foundation crack repair Marietta, pier and beam repair Marietta Georgia',
  openGraph: {
    title: 'Foundation Repair in Marietta, GA | Reliable Solutions Atlanta',
    description: 'Expert foundation repair for Marietta and Cobb County homes from historic districts to newer subdivisions. Free inspections. 770-895-2039.',
    url: 'https://www.waterhelpme.com/foundation-repair/marietta',
    type: 'website',
  },
  alternates: { canonical: 'https://www.waterhelpme.com/foundation-repair/marietta' },
}

const faqs = [
  {
    question: 'How much does foundation repair cost in Marietta, GA?',
    answer: 'Foundation repair in Marietta typically costs between $3,000 and $9,000 for residential homes. Older pier-and-beam homes in historic Marietta may cost more due to accessibility challenges. Minor crack repairs start around $500. Full stabilization with piers ranges from $8,000 to $15,000.',
  },
  {
    question: 'Why do older Marietta homes have more foundation issues?',
    answer: 'Homes built before 1970 in Marietta often sit on original pier-and-beam foundations with wooden supports that deteriorate over decades. The hilly terrain in areas around Kennesaw Mountain and East Cobb also creates natural water runoff patterns that erode soil supporting foundations.',
  },
  {
    question: 'Can you repair a pier-and-beam foundation in Marietta?',
    answer: 'Yes. Pier-and-beam repair is one of the most common services we perform in Marietta. We replace deteriorated wooden piers with adjustable steel or concrete piers, re-level the floor system, and address any girder or joist damage. Most pier-and-beam repairs take 1 to 3 days.',
  },
  {
    question: 'How do I know if my Marietta home has a foundation problem?',
    answer: 'The most common signs in Marietta homes include bouncy or uneven floors (especially in pier-and-beam homes), stair-step cracks in brick exterior walls, doors that stick or swing open on their own, and visible gaps between the chimney and the house. Homes on slopes are particularly susceptible.',
  },
  {
    question: 'Does the hilly terrain in Marietta affect foundations?',
    answer: 'Significantly. Homes built on slopes in areas like East Cobb, Kennesaw, and West Cobb experience lateral soil pressure on downhill foundation walls. Water runoff from higher elevations saturates the soil on the uphill side while the downhill side dries out, creating differential settlement.',
  },
]

export default function FoundationRepairMarietta() {
  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'Service', name: 'Foundation Repair in Marietta, GA',
    provider: { '@type': 'LocalBusiness', name: 'Reliable Solutions Atlanta', telephone: '+17708952039', url: 'https://www.waterhelpme.com',
      address: { '@type': 'PostalAddress', addressLocality: 'Marietta', addressRegion: 'GA', addressCountry: 'US' },
      areaServed: { '@type': 'City', name: 'Marietta', containedIn: 'Cobb County, GA' } },
    serviceType: 'Foundation Repair', areaServed: { '@type': 'City', name: 'Marietta' },
  }
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
            <p className="text-white/70 text-sm font-medium mb-3 uppercase tracking-wider">Cobb County, Georgia</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 font-display leading-tight">Foundation Repair in Marietta, GA</h1>
            <p className="text-white/80 text-lg sm:text-xl mb-8 leading-relaxed max-w-2xl">
              Foundation repair in Marietta typically costs between $3,000 and $9,000 for residential projects. Reliable Solutions Atlanta specializes in both historic pier-and-beam foundations and modern slab repairs across Cobb County. Free same-week inspections with detailed photo documentation. Over 20 years of experience in metro Atlanta.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white text-[#273373] font-bold rounded-xl hover:bg-gray-100 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                Schedule Free Inspection
              </Link>
              <a href="tel:+17708952039" className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-transparent border-2 border-white/30 text-white font-bold rounded-xl hover:bg-white/10 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                (770) 895-2039
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Why Marietta Homes Develop Foundation Problems</h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p>
              Marietta has a uniquely diverse housing stock that creates different foundation challenges depending on when and where your home was built. The historic Marietta Square area and surrounding neighborhoods like Church Street, Whitlock Avenue, and the Kennesaw Avenue corridor contain homes dating back to the late 1800s and early 1900s. These homes typically sit on original pier-and-beam foundations with wooden or stacked-stone supports that have been deteriorating for over a century.
            </p>
            <p>
              East Cobb neighborhoods like Walton, Indian Hills, Sope Creek, and the communities along Johnson Ferry Road were largely built in the 1970s and 1980s. These homes sit on a mix of crawl space and slab foundations on terrain that is significantly hillier than the flatter eastern suburbs. The rolling hills of Cobb County mean many homes are built on slopes, which creates one of the most challenging foundation conditions: differential soil pressure. The uphill side of the foundation receives more water saturation and soil pressure, while the downhill side has less support as soil erodes away.
            </p>
            <p>
              West Cobb and the areas near Kennesaw Mountain have rocky soil mixed with clay, which can create unpredictable settling patterns. Water follows the path of least resistance through rocky strata, sometimes eroding pockets of softer soil beneath foundations while leaving other sections fully supported. This creates the uneven settling that shows up as cracked brick, sticking doors, and sloping floors.
            </p>
            <p>
              The 30060, 30062, 30064, 30066, and 30067 zip codes are where we perform the most foundation work in the Marietta area.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Signs Your Marietta Home Needs Foundation Repair</h2>
          <p className="text-gray-700 text-lg mb-8">The signs differ depending on whether your home has a pier-and-beam foundation, crawl space, or slab. Here is what to look for in Marietta specifically.</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: 'Bouncy or sagging floors', desc: 'In pier-and-beam homes around historic Marietta, wooden support piers rot or settle over time. The floor above becomes soft, bouncy, or visibly sloped. This is a structural issue, not just an annoyance.' },
              { title: 'Chimney pulling away from the house', desc: 'This is common in Cobb County homes on sloped lots. The chimney, which sits on its own foundation pad, settles at a different rate than the main structure, creating a visible gap.' },
              { title: 'Horizontal cracks in basement walls', desc: 'Homes with basements on hillsides in East Cobb are susceptible to lateral pressure from saturated soil. Horizontal cracks indicate the wall is bowing inward from hydrostatic pressure.' },
              { title: 'Stair-step cracks in exterior brick', desc: 'Common in 1970s-1990s Marietta brick homes. The foundation shifts and the rigid brick exterior cracks along the mortar joints in a diagonal stair-step pattern.' },
              { title: 'Cracks in garage floor slab', desc: 'Attached garages on slab foundations often show signs of settling before the main house. Cracks wider than a quarter inch or uneven sections indicate foundation movement.' },
              { title: 'Water intrusion in basement or crawl space', desc: 'Water following the foundation from uphill saturates the soil and eventually finds its way through cracks and joints. This is both a symptom and a cause of further damage.' },
            ].map((sign, i) => (
              <div key={i} className="bg-white rounded-xl p-5 shadow-sm">
                <h3 className="font-semibold text-[#273373] text-base mb-2">{sign.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{sign.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">How We Repair Foundations in Marietta</h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p>Marietta's varied terrain and housing stock means we use a wider range of repair methods here than in most metro Atlanta suburbs.</p>

            <h3 className="text-[#273373] font-display">Pier-and-Beam Restoration</h3>
            <p>For historic Marietta homes, we remove deteriorated wooden piers and replace them with adjustable steel piers on concrete footings. We re-level the floor system using the new piers and repair any damaged girders or joists. This is specialized work that requires understanding the original construction methods while modernizing the support system.</p>

            <h3 className="text-[#273373] font-display">Helical Piers for Hillside Homes</h3>
            <p>Homes on slopes in East and West Cobb require careful pier placement that accounts for the grade. We install helical piers at calculated angles and depths that reach stable soil below the zone affected by water runoff and erosion. Each pier location is engineered for the specific soil conditions at that point on the slope.</p>

            <h3 className="text-[#273373] font-display">Wall Anchors for Lateral Pressure</h3>
            <p>Basement walls bowing from hillside soil pressure are stabilized with wall anchors. We excavate small access points in the yard, place anchor plates in stable soil beyond the failure zone, and connect them to the interior wall with steel rods. These can be tightened over time to gradually straighten the wall.</p>

            <h3 className="text-[#273373] font-display">French Drain Integration</h3>
            <p>In Marietta, foundation repair often needs to be paired with drainage improvements. We frequently install interior or exterior French drains as part of foundation projects to redirect the water that caused the problem in the first place. Fixing the foundation without fixing the drainage means the problem returns.</p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Foundation Repair Costs in Marietta</h2>
          <div className="prose prose-lg max-w-none text-gray-700 mb-8"><p>Costs in Marietta tend to be slightly higher than the metro average due to the terrain challenges and the prevalence of older homes requiring more complex repairs.</p></div>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#273373] text-white"><tr><th className="px-6 py-4 text-left text-sm font-semibold">Repair Type</th><th className="px-6 py-4 text-left text-sm font-semibold">Typical Cost</th><th className="px-6 py-4 text-left text-sm font-semibold hidden sm:table-cell">Timeline</th></tr></thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ['Pier-and-beam restoration', '$3,000 – $8,000', '2-4 days'],
                  ['Helical pier installation (per pier)', '$1,200 – $2,000', '1-2 days'],
                  ['Wall anchor system (per anchor)', '$800 – $1,500', '1 day'],
                  ['Carbon fiber wall straps (per wall)', '$1,500 – $3,000', '1 day'],
                  ['Crack injection (per crack)', '$400 – $800', '2-4 hours'],
                  ['Full stabilization with drainage', '$10,000 – $18,000', '3-5 days'],
                ].map(([repair, cost, time], i) => (
                  <tr key={i} className="hover:bg-gray-50"><td className="px-6 py-4 text-sm text-gray-900">{repair}</td><td className="px-6 py-4 text-sm font-semibold text-[#115997]">{cost}</td><td className="px-6 py-4 text-sm text-gray-500 hidden sm:table-cell">{time}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mt-4">Financing available through GreenSky with plans starting at 0% interest.</p>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-8 font-display">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (<div key={i} className="bg-gray-50 rounded-xl p-6"><h3 className="font-semibold text-[#273373] text-lg mb-3">{faq.question}</h3><p className="text-gray-700 leading-relaxed">{faq.answer}</p></div>))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#273373] mb-6 font-display">Related Services in Marietta</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { title: 'Basement Waterproofing', href: '/basement-waterproofing', desc: 'Essential for Marietta hillside homes where water follows the grade into basements.' },
              { title: 'Drainage Solutions', href: '/drainage', desc: 'French drains and grading corrections to redirect water away from your Cobb County home.' },
              { title: 'Crawl Space Encapsulation', href: '/crawl-space-encapsulation', desc: 'Protect pier-and-beam foundations from moisture damage with full encapsulation.' },
            ].map((service, i) => (
              <Link key={i} href={service.href} className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow group">
                <h3 className="font-semibold text-[#273373] mb-2 group-hover:text-[#115997] transition-colors">{service.title}</h3>
                <p className="text-gray-600 text-sm">{service.desc}</p>
              </Link>
            ))}
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
              { title: 'Foundation Crack Types and What They Mean', href: '/blog/foundation-crack-types-atlanta' },
              { title: 'Foundation Maintenance Seasonal Checklist', href: '/blog/foundation-maintenance-seasonal-checklist' },
            ].map((post, i) => (
              <Link key={i} href={post.href} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <svg className="w-5 h-5 text-[#115997] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                <span className="text-sm font-medium text-gray-800">{post.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 bg-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-gray-500 mb-4"><Link href="/" className="hover:text-[#115997]">Home</Link> {' / '}<Link href="/foundation-repair" className="hover:text-[#115997]">Foundation Repair</Link> {' / '}<span className="text-gray-700">Marietta</span></p>
          <p className="text-sm text-gray-500">Foundation repair services also available in{' '}<Link href="/foundation-repair/lawrenceville" className="text-[#115997] hover:underline">Lawrenceville</Link>,{' '}<Link href="/foundation-repair/roswell" className="text-[#115997] hover:underline">Roswell</Link>,{' '}<Link href="/foundation-repair/alpharetta" className="text-[#115997] hover:underline">Alpharetta</Link>,{' '}<Link href="/foundation-repair/decatur" className="text-[#115997] hover:underline">Decatur</Link>,{' '}<Link href="/foundation-repair/sandy-springs" className="text-[#115997] hover:underline">Sandy Springs</Link>, and{' '}<Link href="/foundation-repair/stone-mountain" className="text-[#115997] hover:underline">Stone Mountain</Link>.</p>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-[#115997]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 font-display">Free Foundation Inspection in Marietta</h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">We will come to your Marietta home, inspect the foundation, take photos, and give you a written estimate. Whether your home is a historic craftsman or a 1990s brick colonial, we know the building methods and the soil.</p>
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