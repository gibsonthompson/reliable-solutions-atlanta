import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export const metadata = {
  title: 'Crawl Space Encapsulation in Roswell, GA | Free Inspection | Reliable Solutions Atlanta',
  description: 'Crawl space encapsulation in Roswell, GA. Heavy-duty vapor barriers, dehumidifiers, and vent sealing for North Fulton homes near the Chattahoochee corridor. Most projects $5,000-$14,000. Free inspection. 770-895-2039.',
  keywords: 'crawl space encapsulation Roswell GA, crawl space vapor barrier North Fulton, crawl space moisture Roswell, crawl space sealing Roswell Georgia',
  openGraph: { title: 'Crawl Space Encapsulation in Roswell, GA | Reliable Solutions Atlanta', description: 'Seal your Roswell crawl space against Chattahoochee corridor moisture. Free inspections. 770-895-2039.', url: 'https://www.waterhelpme.com/crawl-space-encapsulation/roswell', type: 'website' },
  alternates: { canonical: 'https://www.waterhelpme.com/crawl-space-encapsulation/roswell' },
}

const faqs = [
  { question: 'How much does crawl space encapsulation cost in Roswell, GA?', answer: 'Crawl space encapsulation in Roswell typically costs between $5,000 and $14,000. Roswell homes tend to be larger with more crawl space square footage, and the proximity to the Chattahoochee often requires drainage integration that adds to the scope. Basic vapor barrier starts around $3,000. Full encapsulation with drainage and dehumidifier runs $10,000 to $18,000.' },
  { question: 'Does the Chattahoochee River affect my Roswell crawl space?', answer: 'Yes. Homes in the 30075 and 30076 zip codes near the Chattahoochee, Vickery Creek, and Big Creek have elevated water tables that push ground moisture upward through crawl space floors. During wet seasons the water table can rise close to the surface, saturating the soil under your home even without direct rain contact. Encapsulation with a drainage layer is essential in these areas.' },
  { question: 'Do tree roots cause crawl space problems in Roswell?', answer: 'Roswell has one of the densest mature tree canopies in metro Atlanta. Large roots can penetrate through foundation vents, push against foundation walls, and grow under vapor barriers. During encapsulation we seal around root penetrations and install barriers where needed. The root systems also cycle soil moisture — drying soil in summer and leaving it saturated in winter — which stresses foundations.' },
  { question: 'Will encapsulation protect my Roswell home value?', answer: 'In the Roswell market where homes sell for $400,000 to over $1 million, a moldy or wet crawl space is a significant inspection finding. Encapsulation with documentation and transferable warranty eliminates this risk at resale and can actually increase perceived value by demonstrating proactive home maintenance to buyers.' },
  { question: 'How long does crawl space encapsulation last?', answer: 'A properly installed encapsulation system lasts 20 to 25 years or more. The 20-mil liner is designed for decades of service. Dehumidifiers typically need replacement every 8 to 12 years. We include warranty coverage and recommend an annual crawl space check to verify the system is performing as designed.' },
]

export default function CrawlSpaceEncapsulationRoswell() {
  const jsonLd = { '@context': 'https://schema.org', '@type': 'Service', name: 'Crawl Space Encapsulation in Roswell, GA', provider: { '@type': 'LocalBusiness', name: 'Reliable Solutions Atlanta', telephone: '+17708952039', url: 'https://www.waterhelpme.com', address: { '@type': 'PostalAddress', addressLocality: 'Roswell', addressRegion: 'GA', addressCountry: 'US' }, areaServed: { '@type': 'City', name: 'Roswell', containedIn: 'Fulton County, GA' } }, serviceType: 'Crawl Space Encapsulation' }
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
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 font-display leading-tight">Crawl Space Encapsulation in Roswell, GA</h1>
            <p className="text-white/80 text-lg sm:text-xl mb-8 leading-relaxed max-w-2xl">Crawl space encapsulation in Roswell typically costs between $5,000 and $14,000. Reliable Solutions Atlanta seals North Fulton crawl spaces against the elevated moisture from the Chattahoochee corridor, dense tree canopy, and Georgia clay. Heavy-duty vapor barriers, vent sealing, insulation, and commercial dehumidification. Free same-week inspections.</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white text-[#273373] font-bold rounded-xl hover:bg-gray-100 transition-colors">Schedule Free Inspection</Link>
              <a href="tel:+17708952039" className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-transparent border-2 border-white/30 text-white font-bold rounded-xl hover:bg-white/10 transition-colors">(770) 895-2039</a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Why Roswell Crawl Spaces Need Encapsulation</h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p>Roswell crawl spaces face a triple moisture assault that most metro Atlanta suburbs do not experience simultaneously. The Chattahoochee River corridor running through western Roswell raises the water table across the 30075 and 30076 zip codes. The densest mature tree canopy in North Fulton traps ground-level humidity and prevents soil from drying. And the Georgia red clay beneath it all holds moisture for weeks after each rain event.</p>
            <p>The established Roswell neighborhoods — Willeo, Crabapple, Martin Landing, Mountain Park, and the communities along Azalea Drive — were built in the 1970s through 1990s with vented crawl spaces that were considered best practice at the time. In the decades since, building science has proven that vented crawl spaces in humid climates like metro Atlanta create more problems than they solve. The open vents pull in summer air with dew points above 70°F, which condenses on the cooler crawl space surfaces and creates a perpetual moisture factory beneath your home.</p>
            <p>The tree canopy adds a unique Roswell dimension. Mature hardwoods shade the soil around homes so completely that evaporation is minimal. The leaf litter creates an organic moisture-holding layer. And the massive root systems cycle soil moisture seasonally — pulling water out during growing season and leaving the soil saturated the rest of the year. This creates year-round moisture stress on crawl spaces from below, while the vents admit humidity from above.</p>
            <p>For Roswell homeowners with significant home equity — properties in these zip codes routinely sell for $400,000 to over $1 million — crawl space moisture is not just a comfort issue. It is a structural threat and a resale liability that affects the value of one of your largest investments.</p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Signs Your Roswell Crawl Space Needs Encapsulation</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: 'Humidity above 60% in the crawl space', desc: 'A hygrometer reading above 60% relative humidity means the crawl space is wet enough to support active mold growth. In Roswell crawl spaces near the river corridor, readings of 80-90% are common in un-encapsulated spaces during summer.' },
              { title: 'Musty odor strongest in summer', desc: 'The stack effect pulls crawl space air into your living space. When summer humidity peaks and the crawl space becomes a condensation chamber, the musty smell intensifies. If the odor follows a seasonal pattern, the crawl space is the source.' },
              { title: 'Hardwood floors cupping or warping', desc: 'Roswell homes with hardwood floors are especially vulnerable to crawl space moisture. When humidity from below causes the underside of hardwood planks to absorb moisture faster than the top, the edges curl upward (cupping). This is a clear sign of excessive crawl space humidity.' },
              { title: 'HVAC system running excessively', desc: 'When unconditioned humid air enters the crawl space and migrates upward, your HVAC works harder to dehumidify the living space. Higher-than-expected energy bills during summer months often trace back to an unsealed crawl space adding moisture load to the system.' },
              { title: 'Visible condensation on ductwork or pipes', desc: 'Look at the HVAC ducts and water pipes in your crawl space. If they are sweating — covered in water droplets — the crawl space humidity is above the dew point. This condensation drips onto the ground and structure, adding even more moisture to the cycle.' },
              { title: 'Mold on stored items near the floor', desc: 'If items stored in closets or rooms above the crawl space develop mold, especially on the bottom surfaces, moisture is migrating up through the floor system from the crawl space below. This affects air quality throughout the home.' },
            ].map((sign, i) => (
              <div key={i} className="bg-white rounded-xl p-5 shadow-sm"><h3 className="font-semibold text-[#273373] text-base mb-2">{sign.title}</h3><p className="text-gray-600 text-sm leading-relaxed">{sign.desc}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">How We Encapsulate Crawl Spaces in Roswell</h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <h3 className="text-[#273373] font-display">Drainage Layer for High Water Table Areas</h3>
            <p>For Roswell homes near the Chattahoochee where ground moisture is persistent, we install a drainage mat beneath the vapor barrier. This dimpled mat creates a channel for water to flow to a sump pit rather than pooling under the liner. The vapor barrier goes over the drainage mat, and the dehumidifier manages the air above. This three-layer approach handles both liquid water and vapor in the most challenging Roswell locations.</p>
            <h3 className="text-[#273373] font-display">20-Mil Reinforced Liner with Root Protection</h3>
            <p>We use 20-mil reinforced polyethylene liner that covers the floor and extends up all foundation walls. In Roswell where tree roots can push through thinner materials, the 20-mil thickness provides puncture resistance. Where roots have penetrated the crawl space, we seal around them with spray foam and install root deflectors to prevent future penetration. All seams are overlapped 12 inches and sealed.</p>
            <h3 className="text-[#273373] font-display">Vent Sealing and Rim Joist Insulation</h3>
            <p>Every foundation vent is sealed with rigid foam insulation. The rim joists — the top of the foundation wall where the floor framing sits — are sealed with closed-cell spray foam to prevent air infiltration. This converts the crawl space from an outdoor environment to a conditioned indoor space, which is the fundamental shift that makes encapsulation work.</p>
            <h3 className="text-[#273373] font-display">Sized Dehumidification</h3>
            <p>Roswell crawl spaces near the river need larger dehumidifiers than inland properties because of the higher ambient moisture load. We size the dehumidifier based on your crawl space volume, the proximity to water features, and measured humidity levels during the inspection. The unit maintains 45-50% humidity year-round with automatic drainage so there is nothing for you to maintain.</p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Crawl Space Encapsulation Costs in Roswell</h2>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#273373] text-white"><tr><th className="px-6 py-4 text-left text-sm font-semibold">Service</th><th className="px-6 py-4 text-left text-sm font-semibold">Typical Cost</th><th className="px-6 py-4 text-left text-sm font-semibold hidden sm:table-cell">Timeline</th></tr></thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ['Vapor barrier replacement', '$2,000 – $4,000', '1 day'],
                  ['Full encapsulation (liner + vents + insulation)', '$5,000 – $14,000', '2-4 days'],
                  ['Encapsulation with drainage layer + sump', '$8,000 – $18,000', '3-5 days'],
                  ['Commercial dehumidifier', '$1,200 – $2,200', 'Same day'],
                  ['Mold treatment', '$1,500 – $3,500', '1 day'],
                  ['Root sealing and deflection', '$500 – $1,500', 'Same day'],
                ].map(([r, c, t], i) => (<tr key={i} className="hover:bg-gray-50"><td className="px-6 py-4 text-sm text-gray-900">{r}</td><td className="px-6 py-4 text-sm font-semibold text-[#115997]">{c}</td><td className="px-6 py-4 text-sm text-gray-500 hidden sm:table-cell">{t}</td></tr>))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mt-4">Financing available through GreenSky. Transferable warranty protects your home value at resale.</p>
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
          <h2 className="text-2xl font-bold text-[#273373] mb-6 font-display">Related Services in Roswell</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { title: 'Foundation Repair', href: '/foundation-repair/roswell', desc: 'Fix structural issues before encapsulation to protect a sound foundation long-term.' },
              { title: 'Drainage Solutions', href: '/drainage/roswell', desc: 'Exterior drainage reduces the water volume reaching your Roswell crawl space.' },
              { title: 'Basement Waterproofing', href: '/basement-waterproofing/roswell', desc: 'For Roswell homes with basements, interior waterproofing complements crawl space work.' },
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
          <p className="text-sm text-gray-500 mb-4"><Link href="/" className="hover:text-[#115997]">Home</Link> {' / '}<Link href="/crawl-space-encapsulation" className="hover:text-[#115997]">Crawl Space Encapsulation</Link> {' / '}<span className="text-gray-700">Roswell</span></p>
          <p className="text-sm text-gray-500">Crawl space encapsulation also available in <Link href="/crawl-space-encapsulation/lawrenceville" className="text-[#115997] hover:underline">Lawrenceville</Link>, <Link href="/crawl-space-encapsulation/marietta" className="text-[#115997] hover:underline">Marietta</Link>, <Link href="/crawl-space-encapsulation/alpharetta" className="text-[#115997] hover:underline">Alpharetta</Link>, <Link href="/crawl-space-encapsulation/decatur" className="text-[#115997] hover:underline">Decatur</Link>, <Link href="/crawl-space-encapsulation/sandy-springs" className="text-[#115997] hover:underline">Sandy Springs</Link>, and <Link href="/crawl-space-encapsulation/stone-mountain" className="text-[#115997] hover:underline">Stone Mountain</Link>.</p>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-[#115997]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 font-display">Free Crawl Space Inspection in Roswell</h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">We will crawl under your Roswell home, document the conditions with photos, and recommend the right encapsulation approach for your property's specific moisture challenges. No obligation.</p>
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