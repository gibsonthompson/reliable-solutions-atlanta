import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Image from 'next/image'

export const metadata = {
  title: 'Foundation Repair in Lawrenceville, GA | Free Inspection | Reliable Solutions Atlanta',
  description: 'Foundation repair services in Lawrenceville, GA. Helical piers, push piers, and wall stabilization for Gwinnett County homes. Most repairs $2,500-$7,500. Free same-week inspection. Call 770-895-2039.',
  keywords: 'foundation repair Lawrenceville GA, foundation repair Gwinnett County, foundation crack repair Lawrenceville, pier foundation repair Lawrenceville Georgia',
  openGraph: {
    title: 'Foundation Repair in Lawrenceville, GA | Reliable Solutions Atlanta',
    description: 'Expert foundation repair for Lawrenceville and Gwinnett County homes. Free inspections, honest assessments, and repairs that last. 770-895-2039.',
    url: 'https://www.waterhelpme.com/foundation-repair/lawrenceville',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.waterhelpme.com/foundation-repair/lawrenceville',
  },
}

const faqs = [
  {
    question: 'How much does foundation repair cost in Lawrenceville, GA?',
    answer: 'Most residential foundation repairs in Lawrenceville run between $2,500 and $7,500. Simple crack repairs start around $800. Full pier installation for settling foundations can reach $10,000 to $15,000 depending on the number of piers needed and the severity of the issue.',
  },
  {
    question: 'How long does foundation repair take in Lawrenceville?',
    answer: 'Most foundation repairs in Lawrenceville are completed in 1 to 3 days. Crack injections and minor repairs can be done in a single day. Pier installation for more significant settling typically takes 2 to 3 days. Your home remains livable throughout the process.',
  },
  {
    question: 'Do I need a permit for foundation repair in Gwinnett County?',
    answer: 'Minor crack repairs and waterproofing typically do not require a permit in Gwinnett County. Structural repairs involving piers or underpinning may require a building permit depending on the scope. We handle all permitting as part of the project.',
  },
  {
    question: 'Does homeowners insurance cover foundation repair in Georgia?',
    answer: 'Standard homeowners insurance in Georgia typically does not cover foundation repair caused by settling, soil movement, or normal wear. However, if the damage was caused by a covered event like a plumbing leak or sudden ground collapse, your policy may cover it. We provide documentation that can support insurance claims.',
  },
  {
    question: 'What causes foundation problems in Lawrenceville homes?',
    answer: 'Lawrenceville sits on heavy Georgia red clay that expands when wet and shrinks when dry. This cycle puts constant pressure on foundations. Many Gwinnett County subdivisions built in the 1980s through 2000s were constructed on improperly compacted fill soil, which settles unevenly over time.',
  },
]

export default function FoundationRepairLawrenceville() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Foundation Repair in Lawrenceville, GA',
    provider: {
      '@type': 'LocalBusiness',
      name: 'Reliable Solutions Atlanta',
      telephone: '+17708952039',
      url: 'https://www.waterhelpme.com',
      address: { '@type': 'PostalAddress', addressLocality: 'Lawrenceville', addressRegion: 'GA', addressCountry: 'US' },
      geo: { '@type': 'GeoCoordinates', latitude: 33.9562, longitude: -83.988 },
      areaServed: { '@type': 'City', name: 'Lawrenceville', containedIn: 'Gwinnett County, GA' },
    },
    serviceType: 'Foundation Repair',
    areaServed: { '@type': 'City', name: 'Lawrenceville' },
    description: 'Professional foundation repair services for homes in Lawrenceville and Gwinnett County, Georgia.',
  }

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }

  return (
    <>
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* Hero */}
      <section className="relative bg-[#273373] py-16 sm:py-20 md:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-[#273373] to-[#115997] opacity-90" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-white/70 text-sm font-medium mb-3 uppercase tracking-wider">Gwinnett County, Georgia</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 font-display leading-tight">
              Foundation Repair in Lawrenceville, GA
            </h1>
            <p className="text-white/80 text-lg sm:text-xl mb-8 leading-relaxed max-w-2xl">
              Foundation repair in Lawrenceville typically costs between $2,500 and $7,500 for most residential projects. Reliable Solutions Atlanta provides free same-week inspections, honest assessments with photos, and permanent repairs backed by warranty. We have completed hundreds of foundation projects across Gwinnett County since 2005.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white text-[#273373] font-bold rounded-xl hover:bg-gray-100 transition-colors text-base">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                Schedule Free Inspection
              </Link>
              <a href="tel:+17708952039" className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-transparent border-2 border-white/30 text-white font-bold rounded-xl hover:bg-white/10 transition-colors text-base">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                (770) 895-2039
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Lawrenceville Homes Need Foundation Repair */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">
            Why Lawrenceville Homes Develop Foundation Problems
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p>
              Lawrenceville and greater Gwinnett County experienced massive residential growth from the 1980s through the early 2000s. Subdivisions like Sugarloaf Country Club, Archer Ridge, Mallard Landing, Collins Hill, and the neighborhoods around Gwinnett Place were built quickly during the housing boom, and in many cases, the soil preparation was not adequate for the long term.
            </p>
            <p>
              The soil in this part of Gwinnett County is predominantly Georgia red clay, which is one of the most problematic soil types for residential foundations. Red clay expands significantly when it absorbs moisture during spring rains and contracts during the dry summer and fall months. This constant expansion and contraction cycle creates uneven pressure on foundations that causes cracking, settling, and shifting over time.
            </p>
            <p>
              Homes built in the 1990s in Lawrenceville are now 30+ years old and many are reaching the point where deferred foundation issues become visible. We see stair-step cracking in exterior brick, interior drywall cracks radiating from door and window frames, and doors that no longer close properly. These are signs that the foundation has shifted and needs professional attention.
            </p>
            <p>
              The areas around Lawrenceville-Suwanee Road, Sugarloaf Parkway, and the 30043 and 30044 zip codes tend to have the highest concentration of foundation issues we service, largely because of the volume of construction that happened there between 1985 and 2005 combined with the heavy clay subsoil.
            </p>
          </div>
        </div>
      </section>

      {/* Signs You Need Foundation Repair */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">
            Signs Your Lawrenceville Home Needs Foundation Repair
          </h2>
          <p className="text-gray-700 text-lg mb-8">
            Many homeowners in Lawrenceville live with these warning signs for years without realizing they indicate a foundation problem. The sooner you address them, the less the repair costs.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: 'Stair-step cracks in brick exterior', desc: 'Common in Lawrenceville brick-front homes from the 1990s. The mortar joints crack in a diagonal pattern following the brick courses.' },
              { title: 'Doors and windows sticking or not latching', desc: 'When a foundation settles unevenly, the door frames shift out of square. Interior doors that used to close easily start dragging or leaving gaps.' },
              { title: 'Cracks in interior drywall', desc: 'Look for cracks above door frames, at the corners of windows, and where walls meet ceilings. These typically appear on the side of the house that is settling.' },
              { title: 'Gaps between walls and floor or ceiling', desc: 'Separation at the baseboards or crown molding is a sign of differential settling where one part of the foundation is moving while another stays put.' },
              { title: 'Uneven or sloping floors', desc: 'Place a ball on the floor. If it rolls consistently in one direction, the foundation has likely shifted. Common in homes on crawl spaces where support piers have settled.' },
              { title: 'Water pooling near the foundation after rain', desc: 'Poor drainage around the foundation accelerates soil erosion and clay expansion. Many Lawrenceville homes have inadequate grading that directs water toward the house.' },
            ].map((sign, i) => (
              <div key={i} className="bg-white rounded-xl p-5 shadow-sm">
                <h3 className="font-semibold text-[#273373] text-base mb-2">{sign.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{sign.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Do Foundation Repair */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">
            How We Repair Foundations in Lawrenceville
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p>
              The repair method depends on what is causing the problem. In Lawrenceville, the two most common scenarios are settling caused by clay soil movement and structural cracking caused by hydrostatic pressure. We determine the right approach during the free inspection.
            </p>

            <h3 className="text-[#273373] font-display">Helical Piers for Settling Foundations</h3>
            <p>
              Helical piers are steel shafts with helical plates that we screw deep into the ground until they reach stable soil or bedrock below the clay layer. They are then attached to the foundation with steel brackets to stabilize and lift the structure. This is the most common repair we perform in Lawrenceville subdivisions because the root cause is almost always the upper clay layer shifting while deeper soil remains stable.
            </p>

            <h3 className="text-[#273373] font-display">Push Piers for Heavy Structures</h3>
            <p>
              For larger homes or situations where the foundation has settled significantly, we use hydraulic push piers. These are driven straight down using the weight of the structure as resistance until they reach load-bearing soil. Push piers can handle heavier loads than helical piers and are effective for the two-story brick homes common in Gwinnett County subdivisions.
            </p>

            <h3 className="text-[#273373] font-display">Carbon Fiber Wall Stabilization</h3>
            <p>
              For basement and crawl space walls that are bowing inward from soil pressure, we install carbon fiber straps. These are bonded to the wall surface and provide tensile strength that prevents further movement. This is less invasive than wall anchors and works well for the moderate bowing we typically see in Lawrenceville homes.
            </p>

            <h3 className="text-[#273373] font-display">Crack Injection</h3>
            <p>
              Poured concrete foundations with non-structural cracks are repaired with epoxy or polyurethane injection. This fills the crack from inside to out, restoring the waterproof integrity of the wall and preventing further water intrusion that could worsen the issue.
            </p>
          </div>
        </div>
      </section>

      {/* Cost Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">
            Foundation Repair Costs in Lawrenceville
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700 mb-8">
            <p>
              Pricing varies based on the type of repair, the number of piers needed, and the accessibility of the work area. Here are typical costs we see for Lawrenceville homes in 2025-2026:
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#273373] text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Repair Type</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Typical Cost</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold hidden sm:table-cell">Timeline</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ['Crack injection (per crack)', '$400 – $800', '2-4 hours'],
                  ['Carbon fiber wall straps (per wall)', '$1,500 – $3,000', '1 day'],
                  ['Helical piers (per pier)', '$1,200 – $1,800', '1-2 days'],
                  ['Push piers (per pier)', '$1,500 – $2,200', '1-2 days'],
                  ['Full foundation stabilization (6-10 piers)', '$7,000 – $15,000', '2-3 days'],
                  ['Crawl space pier replacement', '$2,500 – $5,000', '1-2 days'],
                ].map(([repair, cost, time], i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{repair}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-[#115997]">{cost}</td>
                    <td className="px-6 py-4 text-sm text-gray-500 hidden sm:table-cell">{time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Financing available through GreenSky with plans starting at 0% interest. Most homeowners pay between $2,500 and $7,500 total.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-8 font-display">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-semibold text-[#273373] text-lg mb-3">{faq.question}</h3>
                <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#273373] mb-6 font-display">Related Services in Lawrenceville</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { title: 'Basement Waterproofing', href: '/basement-waterproofing', desc: 'Protect your Lawrenceville basement from water damage that accelerates foundation deterioration.' },
              { title: 'Crawl Space Repair', href: '/crawl-space-repair', desc: 'Many Lawrenceville homes on crawl spaces need pier replacement and structural repair.' },
              { title: 'Drainage Solutions', href: '/drainage', desc: 'Proper drainage is essential for preventing future foundation problems in clay-heavy Gwinnett County soil.' },
            ].map((service, i) => (
              <Link key={i} href={service.href} className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow group">
                <h3 className="font-semibold text-[#273373] mb-2 group-hover:text-[#115997] transition-colors">{service.title}</h3>
                <p className="text-gray-600 text-sm">{service.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Related Blog Posts */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#273373] mb-6 font-display">Learn More About Foundation Repair</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: 'Foundation Repair Cost in Atlanta: Complete Guide', href: '/blog/foundation-repair-cost-atlanta' },
              { title: 'Foundation Crack Types and What They Mean', href: '/blog/foundation-crack-types-atlanta' },
              { title: 'Signs of Foundation Settling vs Structural Damage', href: '/blog/signs-foundation-settling-vs-structural-damage' },
              { title: 'Why Atlanta Homes Have Foundation Problems', href: '/blog/why-atlanta-homes-have-foundation-problems' },
            ].map((post, i) => (
              <Link key={i} href={post.href} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <svg className="w-5 h-5 text-[#115997] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                <span className="text-sm font-medium text-gray-800">{post.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Breadcrumb + Location links */}
      <section className="py-8 bg-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-[#115997]">Home</Link> {' / '}
            <Link href="/foundation-repair" className="hover:text-[#115997]">Foundation Repair</Link> {' / '}
            <span className="text-gray-700">Lawrenceville</span>
          </p>
          <p className="text-sm text-gray-500">
            Foundation repair services also available in{' '}
            <Link href="/foundation-repair/marietta" className="text-[#115997] hover:underline">Marietta</Link>,{' '}
            <Link href="/foundation-repair/roswell" className="text-[#115997] hover:underline">Roswell</Link>,{' '}
            <Link href="/foundation-repair/alpharetta" className="text-[#115997] hover:underline">Alpharetta</Link>,{' '}
            <Link href="/foundation-repair/decatur" className="text-[#115997] hover:underline">Decatur</Link>,{' '}
            <Link href="/foundation-repair/sandy-springs" className="text-[#115997] hover:underline">Sandy Springs</Link>, and{' '}
            <Link href="/foundation-repair/stone-mountain" className="text-[#115997] hover:underline">Stone Mountain</Link>.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-16 md:py-20 bg-[#115997]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 font-display">
            Free Foundation Inspection in Lawrenceville
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            We will come to your Lawrenceville home, inspect the foundation, take photos, explain what we find in plain English, and give you a written estimate. No pressure, no sales pitch.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#273373] font-bold rounded-xl hover:bg-gray-100 transition-colors text-lg">
              Schedule Free Inspection
            </Link>
            <a href="tel:+17708952039" className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-colors text-lg">
              Call (770) 895-2039
            </a>
          </div>
          <p className="text-white/50 text-sm mt-6">BBB A+ Accredited · IICRC Certified · 20+ Years Experience · Financing Available</p>
        </div>
      </section>
    <Footer />
    </>
  )
}