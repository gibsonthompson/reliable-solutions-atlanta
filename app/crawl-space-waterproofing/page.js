import Header from '../components/Header'
import Footer from '../components/Footer'
import Image from 'next/image'
import Link from 'next/link'

export const metadata = {
  title: 'Crawl Space Waterproofing in Atlanta, GA | Free Inspection | Reliable Solutions Atlanta',
  description: 'Crawl space waterproofing in Metro Atlanta, GA. Interior drainage, sump pumps, vapor barriers, and wall membrane systems. Most projects $3,000-$10,000. BBB A+ rated. Free inspections. 770-895-2039.',
  keywords: ['crawl space waterproofing Atlanta', 'crawl space water Atlanta', 'wet crawl space Georgia', 'crawl space drainage Atlanta', 'crawl space sump pump Atlanta'],
  openGraph: {
    title: 'Crawl Space Waterproofing in Atlanta, GA | Free Inspection | Reliable Solutions Atlanta',
    description: 'Stop water in your Metro Atlanta crawl space. Interior drainage, sump pumps, vapor barriers. Free inspections. 770-895-2039.',
    url: 'https://www.waterhelpme.com/crawl-space-waterproofing',
    type: 'website',
  },
  alternates: { canonical: 'https://www.waterhelpme.com/crawl-space-waterproofing' },
}

const faqs = [
  { question: 'How much does crawl space waterproofing cost in Atlanta, GA?', answer: 'Crawl space waterproofing in Metro Atlanta typically costs between $3,000 and $10,000. A vapor barrier installation alone starts around $1,500 to $4,000. Interior perimeter drainage with sump pump runs $2,500 to $7,000. Full waterproofing with drainage, pump, vapor barrier, and wall membrane ranges from $5,000 to $14,000 for larger homes. We provide free inspections with written estimates.' },
  { question: 'What is the difference between crawl space waterproofing and encapsulation?', answer: 'Waterproofing focuses on stopping active water entry with drainage systems, sump pumps, and vapor barriers. Encapsulation goes further by sealing the entire crawl space into a conditioned environment with vent closure, wall insulation, and dehumidification. If your crawl space has active water entering through the walls or floor, you need waterproofing first. Encapsulation can then be added for complete moisture and humidity control.' },
  { question: 'Why does my Atlanta crawl space have standing water?', answer: 'Metro Atlanta receives over 50 inches of rain annually on clay soil that drains poorly. When the clay around your foundation becomes saturated, hydrostatic pressure forces water through cracks in block walls, through the wall-footer joint, and up through the dirt floor. Homes on slopes receive additional water flowing downhill toward the foundation. Homes near the Chattahoochee have elevated water tables that push moisture up from below.' },
  { question: 'Do I need a sump pump in my Atlanta crawl space?', answer: 'If your crawl space has active water entry, a sump pump is almost always necessary. Most Metro Atlanta lots do not have a natural discharge point lower than the crawl space floor for gravity drainage. The pump collects water from the perimeter drain and discharges it away from the home. Battery backup is essential because the storms that cause the worst flooding are the same ones that cause power outages.' },
  { question: 'Can crawl space waterproofing fix my mold problem?', answer: 'Waterproofing stops the water entry that feeds mold growth. Once the water source is controlled and a vapor barrier is in place, humidity drops below the 60% threshold mold needs to survive. We treat existing mold before waterproofing and recommend adding a dehumidifier for complete humidity control if you want full encapsulation-level protection.' },
  { question: 'How long does crawl space waterproofing take?', answer: 'Most Metro Atlanta crawl space waterproofing projects take 1 to 3 days. A simple vapor barrier and sump pump installation is typically a single day. Full perimeter drainage with vapor barrier and wall membrane takes 2 to 3 days. Complex projects combining waterproofing with structural repair take 3 to 5 days. Your home remains livable throughout.' },
]

export default function CrawlSpaceWaterproofingPage() {
  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Crawl Space Waterproofing in Atlanta, GA',
    description: 'Professional crawl space waterproofing in Metro Atlanta. Interior drainage, sump pumps, vapor barriers, wall membranes, and complete water management for wet crawl spaces.',
    url: 'https://www.waterhelpme.com/crawl-space-waterproofing',
    provider: {
      '@type': 'LocalBusiness',
      name: 'Reliable Solutions Atlanta',
      telephone: '+17708952039',
      url: 'https://www.waterhelpme.com',
      address: { '@type': 'PostalAddress', addressLocality: 'Atlanta', addressRegion: 'GA', addressCountry: 'US' },
      areaServed: { '@type': 'State', name: 'Georgia' },
    },
    serviceType: 'Crawl Space Waterproofing',
  }
  const faqJsonLd = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })) }

  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Header activePage="services" />

      {/* Hero */}
      <section className="relative h-[400px] md:h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/portfolio/crawl-space-encapsulation-vapor-barrier.png" alt="Crawl space waterproofing with vapor barrier installation in Atlanta" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-[#273373]/70" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-display leading-tight">Crawl Space Waterproofing in Atlanta, GA</h1>
            <p className="text-white/80 text-lg sm:text-xl mt-6 leading-relaxed max-w-2xl">Crawl space waterproofing in Metro Atlanta typically costs between $3,000 and $10,000. Reliable Solutions Atlanta stops water from entering crawl spaces across Gwinnett, Cobb, Fulton, and DeKalb counties with interior drainage, sump pumps, vapor barriers, and wall membrane systems designed for Georgia clay soil. Free same-week inspections.</p>
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white text-[#273373] font-bold rounded-xl hover:bg-gray-100 transition-colors">Schedule Free Inspection</Link>
              <a href="tel:+17708952039" className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-transparent border-2 border-white/30 text-white font-bold rounded-xl hover:bg-white/10 transition-colors">(770) 895-2039</a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Atlanta Crawl Spaces Take On Water */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Why Atlanta Crawl Spaces Take On Water</h2>
          <div className="grid lg:grid-cols-2 gap-12 items-start mb-8">
            <div className="relative h-[350px] rounded-xl overflow-hidden">
              <Image src="/images/diagrams/crawl-space-encapsulation-diagram.png" alt="Crawl space waterproofing system diagram showing drainage, vapor barrier, and sump pump" fill className="object-contain" />
            </div>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p>Metro Atlanta crawl spaces take on water because the Georgia red clay surrounding foundations holds moisture like a sponge and then pushes it against foundation walls under hydrostatic pressure. When the clay reaches saturation during rain events, the pressure forces water through every crack, joint, and porous section of the foundation into the crawl space below.</p>
              <p>The problem is worse than most homeowners realize. Over 50 inches of annual rainfall on clay soil that drains at near-zero rates means the soil around an Atlanta foundation is saturated for a significant portion of the year. During these periods, every rain event adds water to an already-full soil column, and that water has to go somewhere.</p>
            </div>
          </div>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p>The specific water entry patterns vary by area. Gwinnett County crawl spaces on compacted fill soil take water through settling gaps around the foundation. Cobb County hillside homes receive concentrated hillside runoff on the uphill crawl space wall. North Fulton homes near the Chattahoochee have water tables that push moisture up through the crawl space floor from below. DeKalb County homes near Stone Mountain sit on impermeable granite that channels water laterally along the rock surface directly to the crawl space. And Decatur historic homes have century-old foundations with no waterproofing of any kind.</p>
            <p>Left unaddressed, crawl space water causes progressive damage: wood rot in floor joists and girders, mold growth that sends spores into living spaces, pest infestations attracted by the damp environment, foundation deterioration from sustained moisture contact, and energy waste from HVAC systems fighting the humidity infiltration from below. The longer water is allowed to enter a crawl space, the more expensive the eventual repair becomes.</p>
          </div>
        </div>
      </section>

      {/* Signs Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Signs Your Crawl Space Needs Waterproofing</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: 'Standing water or mud in the crawl space', desc: 'If you look in the crawl space access and see standing water, wet soil, or mud, water is actively entering from the walls, floor, or both. This is beyond what a vapor barrier alone can handle and needs a drainage solution.' },
              { title: 'Musty smell in the house above', desc: 'Up to 50% of the air on your first floor originates from the crawl space through the natural stack effect. If you smell musty or earthy odors in your living space, moisture in the crawl space is producing the mold and mildew causing that smell.' },
              { title: 'Water stains on foundation walls', desc: 'White mineral deposits (efflorescence) or dark staining on the interior face of crawl space walls indicates water has been penetrating through the block or concrete. Even if the surface is currently dry, the staining proves chronic water migration.' },
              { title: 'Sagging or bouncy floors above', desc: 'When floor joists absorb moisture from a wet crawl space, the wood weakens over time. Floors that sag, feel soft, or bounce when walked on indicate the structural wood has been compromised by sustained moisture exposure.' },
              { title: 'Vapor barrier floating or displaced', desc: 'If the existing vapor barrier has water pooling on top of it or has been pushed out of position by water flow, the water entry volume exceeds what the barrier can manage. The water needs to be captured and routed out first.' },
              { title: 'Mold visible on joists or subfloor', desc: 'Dark staining, white fuzzy growth, or green-black colonies on the wood structure above the crawl space floor indicate sustained humidity above 60%. This mold is actively degrading the wood and sending spores into your living space.' },
            ].map((sign, i) => (
              <div key={i} className="bg-white rounded-xl p-5 shadow-sm"><h3 className="font-semibold text-[#273373] text-base mb-2">{sign.title}</h3><p className="text-gray-600 text-sm leading-relaxed">{sign.desc}</p></div>
            ))}
          </div>
        </div>
      </section>

      {/* Waterproofing Methods */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Crawl Space Waterproofing Methods We Use</h2>
          <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
            <div>
              <h3 className="text-[#273373] font-display">Interior Perimeter Drainage</h3>
              <p>We install a French drain channel along the interior perimeter of the crawl space where the foundation wall meets the floor. This drain intercepts water entering through the wall-footer joint — the most common entry point in Metro Atlanta crawl spaces — and through the base of cinder block walls. The perforated pipe sits in a gravel bed that provides storage capacity during heavy rain and routes all collected water to the sump pit. For crawl spaces where water also enters through the floor, we extend the drainage beneath a sub-floor drainage mat.</p>
            </div>
            <div>
              <h3 className="text-[#273373] font-display">Sump Pump with Battery Backup</h3>
              <p>The perimeter drain routes to a sump pit installed at the lowest point of the crawl space. A primary submersible pump activates when water reaches a set level and discharges it through a line that exits the foundation and routes at least 15 feet from the house. A battery backup system provides 8 to 12 hours of pumping during power outages. For crawl spaces with high water volume, we install dual-pump systems where two pumps alternate to handle sustained flow without overworking a single unit.</p>
            </div>
            <div>
              <h3 className="text-[#273373] font-display">Block Wall Drainage Membrane</h3>
              <p>Cinder block foundation walls are hollow and porous, freely admitting water through the block faces and mortar joints. We install a dimpled HDPE membrane on the interior wall surface that creates an air gap. Water weeping through the blocks hits the membrane and flows downward by gravity to the perimeter drain at the base. The crawl space side of the membrane stays dry. This is essential for the cinder block foundations common throughout Metro Atlanta.</p>
            </div>
            <div>
              <h3 className="text-[#273373] font-display">Heavy-Duty Vapor Barrier</h3>
              <p>After the drainage system is managing the liquid water, we install a 20-mil reinforced vapor barrier across the entire crawl space floor and up the foundation walls. The barrier prevents ground moisture from evaporating into the crawl space air and directs any residual surface water to the perimeter drain. All seams are overlapped 12 inches and sealed with waterproof tape. The barrier is mechanically fastened to walls and sealed at every pier and pipe penetration.</p>
            </div>
            <div>
              <h3 className="text-[#273373] font-display">Crack and Joint Sealing</h3>
              <p>Visible cracks in poured concrete walls and open mortar joints in cinder block are sealed with hydraulic cement or polyurethane injection. While the perimeter drain handles the bulk of water management, sealing entry points reduces the volume the system needs to handle and prevents water from spraying onto the crawl space structure during heavy hydrostatic pressure events.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Cost Table */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Crawl Space Waterproofing Costs in Atlanta</h2>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#273373] text-white"><tr><th className="px-6 py-4 text-left text-sm font-semibold">Service</th><th className="px-6 py-4 text-left text-sm font-semibold">Typical Cost</th><th className="px-6 py-4 text-left text-sm font-semibold hidden sm:table-cell">Timeline</th></tr></thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ['Vapor barrier (20-mil, floor + walls)', '$1,500 – $4,000', '1 day'],
                  ['Interior perimeter drain', '$2,500 – $6,000', '1-2 days'],
                  ['Sump pump with battery backup', '$1,500 – $3,000', '1 day'],
                  ['Block wall drainage membrane', '$1,500 – $3,500', '1 day'],
                  ['Full waterproofing (drain + pump + barrier)', '$3,000 – $10,000', '2-3 days'],
                  ['Crack and joint sealing', '$500 – $1,500', 'Same day'],
                  ['Waterproofing + structural repair', '$6,000 – $16,000', '3-5 days'],
                ].map(([r, c, t], i) => (<tr key={i} className="hover:bg-gray-50"><td className="px-6 py-4 text-sm text-gray-900">{r}</td><td className="px-6 py-4 text-sm font-semibold text-[#115997]">{c}</td><td className="px-6 py-4 text-sm text-gray-500 hidden sm:table-cell">{t}</td></tr>))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mt-4">Financing available through GreenSky with plans starting at 0% interest. All waterproofing work includes transferable warranty. Free inspections with written estimates.</p>
        </div>
      </section>

      {/* Service Areas - City Pages */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-3 font-display">Crawl Space Waterproofing by City</h2>
          <p className="text-gray-600 mb-8">Every Metro Atlanta city has unique soil conditions and water entry patterns. Select your city for pricing, methods, and FAQs specific to your area.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { city: 'Lawrenceville', county: 'Gwinnett County', href: '/crawl-space-waterproofing/lawrenceville', desc: 'Heavy clay, compacted fill, hydrostatic pressure from saturated soil.' },
              { city: 'Marietta', county: 'Cobb County', href: '/crawl-space-waterproofing/marietta', desc: 'Hillside water entry on uphill walls. Curtain drain integration.' },
              { city: 'Roswell', county: 'North Fulton', href: '/crawl-space-waterproofing/roswell', desc: 'Chattahoochee high water table pushing moisture up through the floor.' },
              { city: 'Alpharetta', county: 'North Fulton', href: '/crawl-space-waterproofing/alpharetta', desc: 'Failing builder-grade barriers. Slab-to-crawl transition sealing.' },
              { city: 'Decatur', county: 'DeKalb County', href: '/crawl-space-waterproofing/decatur', desc: 'Century-old crawl spaces with zero waterproofing. Stone wall membranes.' },
              { city: 'Sandy Springs', county: 'Fulton County', href: '/crawl-space-waterproofing/sandy-springs', desc: 'Split-level partial waterproofing. Granite-channeled concentrated water.' },
              { city: 'Stone Mountain', county: 'DeKalb County', href: '/crawl-space-waterproofing/stone-mountain', desc: 'Granite substrata flooding. Cinder block porosity. Sump pump necessity.' },
            ].map((area, i) => (
              <Link key={i} href={area.href} className="bg-gray-50 rounded-xl p-5 hover:bg-[#115997]/5 transition-colors border border-gray-100 group">
                <h3 className="font-bold text-[#273373] group-hover:text-[#115997] transition-colors">{area.city}</h3>
                <p className="text-xs text-[#115997] font-medium mt-1">{area.county}</p>
                <p className="text-gray-600 text-sm mt-2">{area.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-8 font-display">Frequently Asked Questions</h2>
          <div className="space-y-4">{faqs.map((faq, i) => (<div key={i} className="bg-white rounded-xl p-6 shadow-sm"><h3 className="font-semibold text-[#273373] text-lg mb-3">{faq.question}</h3><p className="text-gray-700 leading-relaxed">{faq.answer}</p></div>))}</div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#273373] mb-6 font-display">Related Services</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { title: 'Crawl Space Encapsulation', href: '/crawl-space-encapsulation', desc: 'After waterproofing stops the water, encapsulation seals and conditions the entire crawl space.' },
              { title: 'Crawl Space Repair', href: '/crawl-space-repair', desc: 'Fix structural damage to joists, girders, and piers caused by years of moisture exposure.' },
              { title: 'Drainage Solutions', href: '/drainage', desc: 'Exterior drainage reduces the water volume reaching your crawl space in the first place.' },
            ].map((s, i) => (<Link key={i} href={s.href} className="bg-gray-50 rounded-xl p-5 hover:shadow-md transition-shadow group border border-gray-100"><h3 className="font-semibold text-[#273373] mb-2 group-hover:text-[#115997] transition-colors">{s.title}</h3><p className="text-gray-600 text-sm">{s.desc}</p></Link>))}
          </div>
        </div>
      </section>

      {/* Blog Resources */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#273373] font-display mb-8">Crawl Space Resources</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { href: '/blog/crawl-space-encapsulation-vs-waterproofing', label: 'Comparison', title: 'Encapsulation vs Waterproofing: Which Do You Need?', desc: 'Understanding the difference can save you thousands on the right fix.' },
              { href: '/blog/crawl-space-vapor-barrier-guide', label: 'Guide', title: 'Crawl Space Vapor Barriers: What You Need to Know', desc: 'Why proper installation matters more than the material itself.' },
              { href: '/blog/crawl-space-mold-signs', label: 'Warning Signs', title: '5 Signs Your Crawl Space Has a Mold Problem', desc: 'Crawl space mold affects your health even if you never go down there.' },
              { href: '/blog/crawl-space-repair-cost-atlanta', label: 'Cost Guide', title: 'Crawl Space Repair Cost in Atlanta', desc: 'What to expect for structural repair alongside waterproofing.' },
              { href: '/blog/french-drain-vs-sump-pump', label: 'Comparison', title: 'French Drain vs Sump Pump', desc: 'How these systems work differently and why most crawl spaces need both.' },
              { href: '/blog/sump-pump-maintenance-guide', label: 'Maintenance', title: 'Sump Pump Maintenance Guide', desc: 'Test, maintain, and troubleshoot your sump pump before the next storm.' },
            ].map((post, i) => (
              <Link key={i} href={post.href} className="group p-6 bg-white rounded-xl hover:bg-[#115997]/5 transition-colors border border-gray-100">
                <span className="text-sm text-[#115997] font-semibold">{post.label}</span>
                <h3 className="text-lg font-bold text-[#273373] mt-2 group-hover:text-[#115997] transition-colors">{post.title}</h3>
                <p className="text-gray-600 mt-2 text-sm">{post.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-16 md:py-20 bg-[#115997]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 font-display">Free Crawl Space Inspection in Metro Atlanta</h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">We will crawl under your home, find where the water is entering, document the conditions with photos, and give you a clear waterproofing plan with pricing. If your crawl space does not need waterproofing, we will tell you. No obligation, no pressure.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#273373] font-bold rounded-xl hover:bg-gray-100 transition-colors text-lg">Schedule Free Inspection</Link>
            <a href="tel:+17708952039" className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-colors text-lg">Call (770) 895-2039</a>
          </div>
          <p className="text-white/50 text-sm mt-6">BBB A+ Accredited · IICRC Certified · 20+ Years Experience · GreenSky Financing Available</p>
        </div>
      </section>

      <Footer />
    </div>
  )
}