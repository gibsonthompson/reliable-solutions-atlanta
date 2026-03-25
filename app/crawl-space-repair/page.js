import Header from '../components/Header'
import Footer from '../components/Footer'
import Image from 'next/image'
import Link from 'next/link'

export const metadata = {
  title: 'Crawl Space Repair in Atlanta, GA | Free Inspection | Reliable Solutions Atlanta',
  description: 'Crawl space structural repair in Metro Atlanta, GA. Pier replacement, joist sistering, girder repair, floor leveling, and mold remediation. Most projects $2,500-$10,000. BBB A+ rated. Free inspections. 770-895-2039.',
  keywords: ['crawl space repair Atlanta', 'sagging floor repair Georgia', 'floor joist repair Atlanta', 'pier replacement Atlanta', 'crawl space structural repair Metro Atlanta'],
  openGraph: {
    title: 'Crawl Space Repair in Atlanta, GA | Free Inspection | Reliable Solutions Atlanta',
    description: 'Metro Atlanta crawl space structural repair. Pier replacement, joist sistering, floor leveling. Free inspections. 770-895-2039.',
    url: 'https://www.waterhelpme.com/crawl-space-repair',
    type: 'website',
  },
  alternates: { canonical: 'https://www.waterhelpme.com/crawl-space-repair' },
}

const faqs = [
  { question: 'How much does crawl space repair cost in Atlanta, GA?', answer: 'Crawl space structural repair in Metro Atlanta typically costs between $2,500 and $10,000. Individual pier replacement runs $600 to $1,500 per pier. Joist sistering costs $100 to $250 per joist. Girder beam replacement ranges from $2,000 to $5,000. Full structural restoration with multiple pier replacements, beam work, and floor leveling runs $5,000 to $20,000 for severe cases. We provide free inspections with written estimates.' },
  { question: 'Why are the floors in my Atlanta home sagging?', answer: 'Sagging floors are caused by failing support in the crawl space beneath. The three most common causes in Metro Atlanta are pier settlement from clay soil movement, joist weakening from decades of moisture absorption, and girder rot at the bearing points where beams rest on piers. The heavy Georgia red clay cycles between wet and dry seasonally, shifting the piers that support your floor system. After 20 to 60 years of this movement, the floor above shows the damage.' },
  { question: 'What is joist sistering and do I need it?', answer: 'Joist sistering is attaching a new piece of treated lumber alongside a damaged floor joist to restore its structural capacity. You need it when joists have been weakened by moisture damage, wood rot, or insect activity but still retain enough strength to contribute to the overall floor system. We evaluate each joist during inspection and only sister the ones that have lost significant stiffness. Joists that are too far gone get fully replaced.' },
  { question: 'Can you level my sagging Atlanta floors?', answer: 'Yes. We level floors by replacing failed piers with adjustable steel piers that can be precisely set to the correct height. The floor is raised incrementally over several hours to avoid cracking drywall or stressing framing connections. Most Atlanta floor leveling projects achieve results within a quarter inch of level across the room. The adjustable piers can be fine-tuned after the initial set if any additional settling occurs.' },
  { question: 'Should I repair the crawl space structure before or during a renovation?', answer: 'Before. Adding weight from a new kitchen with granite counters, a tile bathroom, or a second-story addition to a crawl space that is already failing structurally makes the problem worse and costs more to fix later. We recommend completing crawl space structural repair and waterproofing before any above-grade renovation that adds load to the floor system.' },
  { question: 'How long does crawl space repair take?', answer: 'Most Metro Atlanta crawl space repairs take 1 to 4 days. Simple pier replacement or joist sistering is completed in a single day. Comprehensive structural restoration with multiple pier replacements, beam work, and floor leveling takes 2 to 5 days. Your home remains livable throughout the entire process.' },
]

export default function CrawlSpaceRepairPage() {
  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Crawl Space Repair in Atlanta, GA',
    description: 'Professional crawl space structural repair in Metro Atlanta. Pier replacement, joist sistering, girder beam repair, floor leveling, mold remediation, and complete structural restoration.',
    url: 'https://www.waterhelpme.com/crawl-space-repair',
    provider: {
      '@type': 'LocalBusiness',
      name: 'Reliable Solutions Atlanta',
      telephone: '+17708952039',
      url: 'https://www.waterhelpme.com',
      address: { '@type': 'PostalAddress', addressLocality: 'Atlanta', addressRegion: 'GA', addressCountry: 'US' },
      areaServed: { '@type': 'State', name: 'Georgia' },
    },
    serviceType: 'Crawl Space Repair',
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
          <Image src="/images/portfolio/crawl-space-mold-remediation.png" alt="Crawl space structural repair and mold remediation in Atlanta" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-[#273373]/70" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-display leading-tight">Crawl Space Repair in Atlanta, GA</h1>
            <p className="text-white/80 text-lg sm:text-xl mt-6 leading-relaxed max-w-2xl">Crawl space structural repair in Metro Atlanta typically costs between $2,500 and $10,000. Reliable Solutions Atlanta fixes sagging floors, failing piers, damaged joists, rotted girders, and moisture-compromised structure beneath homes across Gwinnett, Cobb, Fulton, and DeKalb counties. Free same-week inspections with photo documentation.</p>
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white text-[#273373] font-bold rounded-xl hover:bg-gray-100 transition-colors">Schedule Free Inspection</Link>
              <a href="tel:+17708952039" className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-transparent border-2 border-white/30 text-white font-bold rounded-xl hover:bg-white/10 transition-colors">(770) 895-2039</a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Atlanta Crawl Spaces Need Repair */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Why Atlanta Crawl Spaces Need Structural Repair</h2>
          <div className="grid lg:grid-cols-2 gap-12 items-start mb-8">
            <div className="relative h-[350px] rounded-xl overflow-hidden">
              <Image src="/images/diagrams/basement-drainage-system-diagram.png" alt="Crawl space structural support system diagram" fill className="object-contain" />
            </div>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p>Crawl spaces are the most neglected part of Metro Atlanta homes, and the consequences of that neglect show up as sagging floors, bouncing when you walk, doors that stick, and cracks in the walls above. The structural wood beneath your home — floor joists, girder beams, and support piers — has been absorbing moisture from the humid Georgia climate for the entire life of the house.</p>
              <p>This moisture damage progresses slowly enough that homeowners do not notice until the floor visibly sags or a home inspector documents the damage. By that point, the structural members have often lost 30 to 50 percent of their original load-bearing capacity.</p>
            </div>
          </div>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p>The specific damage patterns vary across Metro Atlanta. Gwinnett County homes built in the 1980s through 2000s on compacted fill soil have piers that settle as the fill continues to consolidate. Cobb County homes on hillsides face one-sided moisture exposure that weakens the uphill structure faster than the downhill side. North Fulton homes near the Chattahoochee have elevated humidity that promotes year-round moisture absorption in the wood. DeKalb County homes near Stone Mountain have granite substrata that channels water directly to crawl spaces, creating the most severe moisture conditions in the metro area. And Decatur historic homes built in the early 1900s have original stacked stone piers and rough-sawn beams that have been deteriorating for over a century.</p>
            <p>The stack effect makes crawl space damage a whole-house problem. Up to 50% of the air on your first floor rises from the crawl space, carrying mold spores, dust mite allergens, and musty odors from the damp environment below. Fixing the crawl space structure improves both the physical integrity of your home and the air quality your family breathes.</p>
          </div>
        </div>
      </section>

      {/* Signs Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Signs Your Crawl Space Needs Repair</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: 'Floors sagging in the center of rooms', desc: 'When crawl space piers settle or girder beams weaken, the floor sags along the center line where the span between supports is longest. This sag gets worse over time as the structure continues to lose strength under the load.' },
              { title: 'Bouncy or springy floors when walking', desc: 'Floors that bounce or flex underfoot indicate floor joists have lost stiffness from moisture damage, rot, or insect activity. Healthy joists are rigid. Bouncing means the wood can no longer carry its load without deflecting.' },
              { title: 'Doors sticking or not latching properly', desc: 'When the floor system drops unevenly, door frames rack out of square. Doors that used to close smoothly start dragging, leaving gaps, or missing the strike plate. Multiple doors with the same problem indicates a systemic structural issue.' },
              { title: 'Drywall cracks near door and window frames', desc: 'Diagonal cracks radiating from the corners of door and window openings indicate the floor system has shifted beneath the wall framing. The rigid drywall cannot flex with the movement, so it cracks at the stress points.' },
              { title: 'Visible mold covering crawl space wood', desc: 'If joists, girders, and the subfloor are covered in dark staining or fuzzy mold growth, the wood has been at high moisture content for years. This level of mold indicates the wood has lost structural capacity alongside the surface damage.' },
              { title: 'Uneven tile or cracked grout lines', desc: 'Tile floors in kitchens and bathrooms are rigid and show crawl space movement immediately. Cracked tiles, popped grout, or surfaces that develop unevenness over time point to a shifting floor structure beneath.' },
            ].map((sign, i) => (
              <div key={i} className="bg-white rounded-xl p-5 shadow-sm"><h3 className="font-semibold text-[#273373] text-base mb-2">{sign.title}</h3><p className="text-gray-600 text-sm leading-relaxed">{sign.desc}</p></div>
            ))}
          </div>
        </div>
      </section>

      {/* Repair Methods */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Crawl Space Repair Methods We Use</h2>
          <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
            <div>
              <h3 className="text-[#273373] font-display">Adjustable Steel Pier Replacement</h3>
              <p>We remove failed concrete block, wooden, or stacked stone piers and replace them with adjustable steel piers on properly poured concrete footings. Steel piers can be precisely adjusted to lift the girder back to level and can be readjusted in the future if any additional settling occurs. For homes on granite substrata in eastern DeKalb County, we anchor piers directly to the rock for the most permanent support available. For homes on settling fill in Gwinnett and North Fulton, we use oversized footings to distribute load across the compacting soil.</p>
            </div>
            <div>
              <h3 className="text-[#273373] font-display">Joist Sistering</h3>
              <p>Damaged floor joists are reinforced by bolting a new piece of pressure-treated lumber alongside the existing joist. The new sister joist carries the load the damaged joist can no longer handle. We use structural screws and construction adhesive to bond the new wood to the existing joist, creating a composite member that is stronger than the original. All new lumber is borate-treated to resist future moisture and pest damage in the crawl space environment.</p>
            </div>
            <div>
              <h3 className="text-[#273373] font-display">Girder Beam Repair and Replacement</h3>
              <p>Main girder beams develop rot at the bearing points where they rest on piers because moisture concentrates at these contact surfaces. When the rot is limited to the bearing area, we sister the beam with new treated lumber that spans across the damaged zone. When the beam has failed extensively, we temporarily jack the floor above, remove the failed beam, install a new beam sized for current load requirements, and lower the floor onto the new support. We often install a larger beam than the original to support renovation-added weight.</p>
            </div>
            <div>
              <h3 className="text-[#273373] font-display">Floor Leveling</h3>
              <p>After structural repairs are complete, we level the floor system using the adjustable steel piers. We raise the floor incrementally over several hours, checking with a laser level and monitoring for stress on finishes above. For homes with hardwood floors, tile, or built-in cabinetry, we raise slowly to minimize cosmetic damage. Most Atlanta floor leveling achieves results within a quarter inch of perfectly level, which eliminates the rolling-ball and door-sticking problems.</p>
            </div>
            <div>
              <h3 className="text-[#273373] font-display">Mold Treatment and Borate Application</h3>
              <p>Before completing structural repairs, we treat all mold-affected surfaces with professional antimicrobial solution. After repairs, every piece of structural wood — new and existing — receives borate preservative treatment. Borate penetrates the wood and provides long-term protection against both rot and wood-destroying insects. This protects the repaired structure from the same conditions that damaged the original.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Cost Table */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Crawl Space Repair Costs in Atlanta</h2>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#273373] text-white"><tr><th className="px-6 py-4 text-left text-sm font-semibold">Repair Type</th><th className="px-6 py-4 text-left text-sm font-semibold">Typical Cost</th><th className="px-6 py-4 text-left text-sm font-semibold hidden sm:table-cell">Timeline</th></tr></thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ['Pier replacement (per pier)', '$600 – $1,500', '1 day'],
                  ['Joist sistering (per joist)', '$100 – $250', '1 day'],
                  ['Girder beam sistering', '$1,500 – $3,500', '1-2 days'],
                  ['Girder beam full replacement', '$2,500 – $5,000', '1-2 days'],
                  ['Floor leveling (per affected area)', '$1,500 – $4,000', '1 day'],
                  ['Mold treatment', '$1,500 – $3,500', '1 day'],
                  ['Full structural restoration', '$5,000 – $20,000', '3-7 days'],
                ].map(([r, c, t], i) => (<tr key={i} className="hover:bg-gray-50"><td className="px-6 py-4 text-sm text-gray-900">{r}</td><td className="px-6 py-4 text-sm font-semibold text-[#115997]">{c}</td><td className="px-6 py-4 text-sm text-gray-500 hidden sm:table-cell">{t}</td></tr>))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mt-4">Financing available through GreenSky with plans starting at 0% interest. All structural work includes transferable warranty. We recommend pairing repair with waterproofing or encapsulation to protect the new structure.</p>
        </div>
      </section>

      {/* Service Areas - City Pages */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-3 font-display">Crawl Space Repair by City</h2>
          <p className="text-gray-600 mb-8">Every Metro Atlanta city has unique housing stock, soil conditions, and crawl space challenges. Select your city for pricing, methods, and FAQs specific to your area.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { city: 'Lawrenceville', county: 'Gwinnett County', href: '/crawl-space-repair/lawrenceville', desc: 'Settling piers on compacted fill. Moisture-damaged joists in subdivision homes.' },
              { city: 'Marietta', county: 'Cobb County', href: '/crawl-space-repair/marietta', desc: 'Historic pier-and-beam restoration. Hillside variable-height crawl spaces.' },
              { city: 'Roswell', county: 'North Fulton', href: '/crawl-space-repair/roswell', desc: 'Tree root displacement, Chattahoochee moisture, high-end floor protection.' },
              { city: 'Alpharetta', county: 'North Fulton', href: '/crawl-space-repair/alpharetta', desc: 'Slab-to-crawl transition stress. Builder warranty documentation support.' },
              { city: 'Decatur', county: 'DeKalb County', href: '/crawl-space-repair/decatur', desc: 'Century-old stacked stone pier replacement. Historic home floor leveling.' },
              { city: 'Sandy Springs', county: 'Fulton County', href: '/crawl-space-repair/sandy-springs', desc: 'Split-level differential settlement. Decomposed granite pier challenges.' },
              { city: 'Stone Mountain', county: 'DeKalb County', href: '/crawl-space-repair/stone-mountain', desc: 'Granite-anchored piers. Severe moisture damage from granite-channeled water.' },
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
              { title: 'Crawl Space Encapsulation', href: '/crawl-space-encapsulation', desc: 'Seal the crawl space after structural repair to prevent the moisture damage from recurring.' },
              { title: 'Crawl Space Waterproofing', href: '/crawl-space-waterproofing', desc: 'Stop the active water entry that causes the wood rot and pier deterioration.' },
              { title: 'Foundation Repair', href: '/foundation-repair', desc: 'Fix foundation wall and footing issues alongside crawl space structural work.' },
            ].map((s, i) => (<Link key={i} href={s.href} className="bg-gray-50 rounded-xl p-5 hover:shadow-md transition-shadow group border border-gray-100"><h3 className="font-semibold text-[#273373] mb-2 group-hover:text-[#115997] transition-colors">{s.title}</h3><p className="text-gray-600 text-sm">{s.desc}</p></Link>))}
          </div>
        </div>
      </section>

      {/* Blog Resources */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#273373] font-display mb-8">Crawl Space Repair Resources</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { href: '/blog/crawl-space-repair-cost-atlanta', label: 'Cost Guide', title: 'Crawl Space Repair Cost in Atlanta', desc: 'What to expect for pier replacement, joist sistering, and floor leveling.' },
              { href: '/blog/crawl-space-mold-signs', label: 'Warning Signs', title: '5 Signs Your Crawl Space Has a Mold Problem', desc: 'Crawl space mold affects your health even if you never go down there.' },
              { href: '/blog/crawl-space-encapsulation-vs-waterproofing', label: 'Comparison', title: 'Encapsulation vs Waterproofing: Which Do You Need?', desc: 'Understanding the difference can save you thousands on the right fix.' },
              { href: '/blog/crawl-space-vapor-barrier-guide', label: 'Guide', title: 'Crawl Space Vapor Barriers: What You Need to Know', desc: 'Why proper installation matters more than the material itself.' },
              { href: '/blog/signs-foundation-settling-vs-structural-damage', label: 'Diagnosis', title: 'Foundation Settling vs Structural Damage', desc: 'Know when settling is normal and when it signals a serious problem.' },
              { href: '/blog/why-atlanta-homes-have-foundation-problems', label: 'Local Insight', title: 'Why Atlanta Homes Have Foundation Problems', desc: 'How Georgia red clay creates unique challenges for homeowners.' },
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
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">We will crawl under your home, inspect every pier, joist, and girder, take photos, and give you an honest structural assessment with pricing. If your crawl space does not need repair, we will tell you. No obligation, no pressure.</p>
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