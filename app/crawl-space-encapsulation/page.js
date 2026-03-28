import Header from '../components/Header'
import Footer from '../components/Footer'
import Image from 'next/image'
import Link from 'next/link'

export const metadata = {
  title: 'Crawl Space Encapsulation in Atlanta, GA | Free Inspection | Reliable Solutions Atlanta',
  description: 'Crawl space encapsulation in Metro Atlanta, GA. 20-mil vapor barriers, dehumidifiers, vent sealing, and wall insulation. Most projects $5,000-$12,000. BBB A+ rated. Free inspections. 770-895-2039.',
  keywords: ['crawl space encapsulation Atlanta', 'crawl space sealing Georgia', 'crawl space vapor barrier Atlanta', 'crawl space dehumidifier Atlanta', 'crawl space moisture control Metro Atlanta'],
  openGraph: {
    title: 'Crawl Space Encapsulation in Atlanta, GA | Free Inspection | Reliable Solutions Atlanta',
    description: 'Metro Atlanta crawl space encapsulation. Vapor barriers, dehumidifiers, vent sealing. Free inspections. 770-895-2039.',
    url: 'https://www.waterhelpme.com/crawl-space-encapsulation',
    type: 'website',
  },
  alternates: { canonical: 'https://www.waterhelpme.com/crawl-space-encapsulation' },
}

const faqs = [
  { question: 'How much does crawl space encapsulation cost in Atlanta, GA?', answer: 'Crawl space encapsulation in Metro Atlanta typically costs between $5,000 and $12,000. A basic vapor barrier replacement starts around $1,500 to $4,000. Full encapsulation with 20-mil liner, vent sealing, wall insulation, and commercial dehumidifier runs $7,000 to $15,000 for larger homes. Projects that include drainage integration or structural repair before encapsulation range from $10,000 to $22,000. We provide free inspections with written estimates.' },
  { question: 'What is the difference between encapsulation and waterproofing?', answer: 'Waterproofing focuses on stopping active water entry with drainage and sump pumps. Encapsulation goes further by sealing the entire crawl space into a conditioned environment — closing vents, insulating walls, covering all surfaces with a heavy-duty liner, and controlling humidity with a dehumidifier. If your crawl space has active water, you need waterproofing first. Encapsulation then manages the humidity and air quality in the sealed space.' },
  { question: 'Why do Atlanta crawl spaces need encapsulation?', answer: 'Metro Atlanta has a humid subtropical climate with summer dew points routinely above 70 degrees. Vented crawl spaces pull this hot humid air inside, where it condenses on cooler surfaces like ductwork, pipes, and floor joists. This condensation cycle runs for five months every summer, depositing moisture on your structural wood year after year. Encapsulation stops this cycle by sealing the vents and controlling the crawl space environment independently from the outside air.' },
  { question: 'Will crawl space encapsulation lower my energy bills?', answer: 'Yes. Most Metro Atlanta homeowners see a 15 to 20 percent reduction in heating and cooling costs after full encapsulation. An unsealed crawl space allows humid air in summer and cold air in winter to enter beneath the floor. Your HVAC works harder to compensate for this unconditioned air. Sealing the crawl space keeps the conditioned air in the living space and reduces the load on the HVAC system.' },
  { question: 'How long does crawl space encapsulation take?', answer: 'Most Metro Atlanta crawl space encapsulations take 2 to 4 days. Day one is preparation — debris removal, mold treatment if needed, and any structural repairs. Days two and three are liner installation, vent sealing, and wall insulation. Day four (if needed) is dehumidifier installation and final inspection. Larger homes or those requiring drainage before encapsulation may take 4 to 6 days.' },
  { question: 'Does crawl space encapsulation come with a warranty?', answer: 'Yes. All encapsulation work by Reliable Solutions Atlanta includes a transferable warranty that covers the liner, installation, and sealed components. The warranty transfers to the next homeowner if you sell, which adds value at resale. Dehumidifiers carry their own manufacturer warranty, typically 5 years. We recommend an annual crawl space check to verify the system is performing as designed.' },
]

export default function CrawlSpaceEncapsulationPage() {
  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Crawl Space Encapsulation in Atlanta, GA',
    description: 'Professional crawl space encapsulation in Metro Atlanta. 20-mil vapor barriers, vent sealing, wall insulation, commercial dehumidifiers, and complete moisture control systems.',
    url: 'https://www.waterhelpme.com/crawl-space-encapsulation',
    provider: {
      '@type': 'LocalBusiness',
      name: 'Reliable Solutions Atlanta',
      telephone: '+17708952039',
      url: 'https://www.waterhelpme.com',
      address: { '@type': 'PostalAddress', addressLocality: 'Atlanta', addressRegion: 'GA', addressCountry: 'US' },
      areaServed: { '@type': 'State', name: 'Georgia' },
    },
    serviceType: 'Crawl Space Encapsulation',
  }
  const faqJsonLd = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })) }

  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Header activePage="services" />

      {/* Hero */}
      <section className="relative min-h-[400px] md:min-h-[500px]">
        <div className="absolute inset-0">
          <Image src="/images/portfolio/crawl-space-encapsulation-vapor-barrier.png" alt="Crawl space encapsulation with white vapor barrier installed in Atlanta home" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-[#273373]/70" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-28 md:py-32 flex items-center">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-display leading-tight">Crawl Space Encapsulation in Atlanta, GA</h1>
            <p className="text-white/80 text-lg sm:text-xl mt-6 leading-relaxed max-w-2xl">Crawl space encapsulation in Metro Atlanta typically costs between $5,000 and $12,000. Reliable Solutions Atlanta seals crawl spaces with heavy-duty vapor barriers, vent sealing, wall insulation, and commercial dehumidification to permanently eliminate moisture, mold, and energy waste. Free same-week inspections.</p>
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white text-[#273373] font-bold rounded-xl hover:bg-gray-100 transition-colors">Schedule Free Inspection</Link>
              <a href="tel:+17708952039" className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-transparent border-2 border-white/30 text-white font-bold rounded-xl hover:bg-white/10 transition-colors">(770) 895-2039</a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Atlanta Crawl Spaces Need Encapsulation */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Why Atlanta Crawl Spaces Need Encapsulation</h2>
          <div className="grid lg:grid-cols-2 gap-12 items-start mb-8">
            <div className="relative h-[300px] rounded-xl overflow-hidden shadow-lg">
              <Image src="/images/diagrams/crawl-space-encapsulation-diagram.png" alt="Crawl space encapsulation diagram showing vapor barrier, dehumidifier, and sealed vents" fill className="object-contain" />
            </div>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p>The vast majority of homes in Metro Atlanta were built with vented crawl spaces. The theory was simple: open vents in the foundation walls would circulate air through the crawl space and carry moisture out. In a dry climate, this works. In Metro Atlanta, where summer dew points routinely exceed 70 degrees and annual rainfall tops 50 inches, it is a disaster.</p>
              <p>When hot humid outside air enters a vented crawl space through foundation vents, it hits surfaces that are cooler than the dew point — floor joists, ductwork, pipes, and the ground itself. The moisture in that air condenses on these surfaces exactly the way a cold glass sweats on a summer porch.</p>
            </div>
          </div>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p>This condensation cycle runs from May through September, depositing moisture on your structural wood for five months every year. After 15 to 30 years of this, the wood shows the damage: mold growth, rot, weakened joists, and an environment that attracts termites and other wood-destroying pests. Meanwhile, up to 50% of the air on your first floor rises from the crawl space through the stack effect, carrying mold spores, allergens, and musty odors into the rooms where your family lives and sleeps.</p>
            <p>The specific conditions vary across Metro Atlanta. Gwinnett County homes on clay have ground moisture continuously evaporating into the crawl space from below. Cobb County hillside homes receive additional moisture from the uphill side. North Fulton homes near the Chattahoochee have elevated water tables that keep the soil perpetually saturated. DeKalb County homes near Stone Mountain sit on granite that channels water directly to crawl spaces. And Decatur historic homes have crawl spaces that were built over a century ago with zero moisture protection of any kind. In every case, encapsulation is the definitive solution.</p>
          </div>
        </div>
      </section>

      {/* Signs Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Signs Your Crawl Space Needs Encapsulation</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: 'Musty smell in the house', desc: 'The stack effect pulls crawl space air into your living space through gaps, plumbing penetrations, and the natural upward movement of air. If you smell musty or earthy odors indoors, the crawl space is the source.' },
              { title: 'High humidity indoors despite running AC', desc: 'If your home feels clammy even with the air conditioning running, moisture is migrating up from an unsealed crawl space. Indoor humidity above 55% in summer despite AC operation points to a crawl space moisture source.' },
              { title: 'Mold on crawl space joists or subfloor', desc: 'Dark staining, white fuzzy growth, or visible mold colonies on the wood structure above the crawl space floor indicate sustained high humidity. This mold is sending spores into your living space through the floor system.' },
              { title: 'Sagging or soft floors', desc: 'When floor joists absorb moisture from a damp crawl space over years, the wood weakens and loses stiffness. Floors that feel soft, bouncy, or sag indicate moisture-damaged structural wood that needs attention.' },
              { title: 'HVAC ducts sweating or rusting in crawl space', desc: 'Condensation on HVAC ductwork in the crawl space means humidity exceeds the dew point. This water drips onto the structure, and the wet ducts lose efficiency. Encapsulation eliminates the condensation source.' },
              { title: 'Energy bills higher than they should be', desc: 'An unsealed crawl space allows hot humid air in summer and cold air in winter beneath your floors. Your HVAC works harder to compensate. After encapsulation, most homeowners see 15 to 20% energy savings.' },
            ].map((sign, i) => (
              <div key={i} className="bg-white rounded-xl p-5 shadow-sm"><h3 className="font-semibold text-[#273373] text-base mb-2">{sign.title}</h3><p className="text-gray-600 text-sm leading-relaxed">{sign.desc}</p></div>
            ))}
          </div>
        </div>
      </section>

      {/* Encapsulation Process */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">How We Encapsulate Crawl Spaces in Atlanta</h2>
          <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
            <div>
              <h3 className="text-[#273373] font-display">Preparation and Debris Removal</h3>
              <p>Before any liner goes down, we clear the crawl space of debris, old insulation, and any standing water. If mold is present on the wood structure, we treat it with professional antimicrobial solution and allow it to dry. If structural repairs are needed — damaged joists, failing piers — we complete those first so the encapsulation protects a sound structure. Encapsulating over compromised structure is a waste of money.</p>
            </div>
            <div>
              <h3 className="text-[#273373] font-display">20-Mil Reinforced Vapor Barrier</h3>
              <p>We install a 20-mil reinforced polyethylene liner across the entire crawl space floor, up the foundation walls to within a few inches of the top, and around all piers and columns. This is over three times thicker than the 6-mil builder-grade plastic that most Atlanta homes have. All seams are overlapped 12 inches and sealed with waterproof tape. The liner is mechanically fastened to the walls with termination strips. This creates a continuous sealed envelope that blocks 100% of ground moisture vapor.</p>
            </div>
            <div>
              <h3 className="text-[#273373] font-display">Vent Sealing and Wall Insulation</h3>
              <p>Every foundation vent is sealed with rigid foam insulation cut to fit each opening. The perimeter foundation walls are insulated with 2-inch closed-cell foam board that provides R-10 insulation and serves as an additional moisture barrier. Rim joists — the top of the foundation wall where the floor framing sits and where most air infiltration occurs — are sealed with spray foam. This converts the crawl space from an outdoor environment to a conditioned indoor space.</p>
            </div>
            <div>
              <h3 className="text-[#273373] font-display">Commercial Dehumidifier</h3>
              <p>A sealed crawl space needs active humidity control. We install a commercial-grade dehumidifier sized for your crawl space volume that maintains 45 to 50% relative humidity year-round. The unit drains to a condensate pump or existing drain so there is no reservoir to empty. It runs automatically, adjusting output based on actual humidity readings. For homes with WiFi access, we can install units with remote monitoring that send alerts if humidity rises above the target range.</p>
            </div>
            <div>
              <h3 className="text-[#273373] font-display">Drainage Integration (When Needed)</h3>
              <p>For crawl spaces with active water entry, we install a drainage system beneath the encapsulation liner. A perimeter French drain collects water at the walls and routes it to a sump pit with pump. A drainage mat beneath the liner channels floor water to the drain. The encapsulation liner then goes over the drainage system, creating a layered approach where water is managed below while the air above stays dry. This combined system handles both liquid water and moisture vapor.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Cost Table */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Crawl Space Encapsulation Costs in Atlanta</h2>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#273373] text-white"><tr><th className="px-6 py-4 text-left text-sm font-semibold">Service</th><th className="px-6 py-4 text-left text-sm font-semibold">Typical Cost</th><th className="px-6 py-4 text-left text-sm font-semibold hidden sm:table-cell">Timeline</th></tr></thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ['Vapor barrier only (20-mil floor)', '$1,500 – $4,000', '1 day'],
                  ['Full encapsulation (liner + vents + insulation)', '$5,000 – $12,000', '2-3 days'],
                  ['Encapsulation with drainage integration', '$8,000 – $18,000', '3-5 days'],
                  ['Commercial dehumidifier installation', '$1,000 – $2,200', 'Same day'],
                  ['Mold treatment (before encapsulation)', '$1,500 – $3,500', '1 day'],
                  ['Structural repair + encapsulation', '$10,000 – $22,000', '4-7 days'],
                ].map(([r, c, t], i) => (<tr key={i} className="hover:bg-gray-50"><td className="px-6 py-4 text-sm text-gray-900">{r}</td><td className="px-6 py-4 text-sm font-semibold text-[#115997]">{c}</td><td className="px-6 py-4 text-sm text-gray-500 hidden sm:table-cell">{t}</td></tr>))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mt-4">Financing available through GreenSky with plans starting at 0% interest. All encapsulation work includes transferable warranty. Free inspections with written estimates.</p>
        </div>
      </section>

      {/* Service Areas - City Pages */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-3 font-display">Crawl Space Encapsulation by City</h2>
          <p className="text-gray-600 mb-8">Every Metro Atlanta city has unique crawl space conditions. Select your city for pricing, methods, and FAQs specific to your area.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { city: 'Lawrenceville', county: 'Gwinnett County', href: '/crawl-space-encapsulation/lawrenceville', desc: '80s-2000s vented crawl spaces on heavy clay. Builder barriers failing after 20+ years.' },
              { city: 'Marietta', county: 'Cobb County', href: '/crawl-space-encapsulation/marietta', desc: 'Hillside moisture, pier-and-beam homes, variable-height crawl spaces.' },
              { city: 'Roswell', county: 'North Fulton', href: '/crawl-space-encapsulation/roswell', desc: 'Chattahoochee corridor humidity, tree root intrusion, high-end homes.' },
              { city: 'Alpharetta', county: 'North Fulton', href: '/crawl-space-encapsulation/alpharetta', desc: 'Failing builder-grade barriers. Slab-crawl hybrid homes. HOA compatible.' },
              { city: 'Decatur', county: 'DeKalb County', href: '/crawl-space-encapsulation/decatur', desc: 'Century-old crawl spaces with zero protection. Historic home specialists.' },
              { city: 'Sandy Springs', county: 'Fulton County', href: '/crawl-space-encapsulation/sandy-springs', desc: '60s-80s ranches and split-levels. Inspection-driven market. Decomposed granite.' },
              { city: 'Stone Mountain', county: 'DeKalb County', href: '/crawl-space-encapsulation/stone-mountain', desc: 'Granite substrata flooding. Cinder block porosity. Most common service in the area.' },
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
              { title: 'Crawl Space Waterproofing', href: '/crawl-space-waterproofing', desc: 'If your crawl space has active water, waterproofing stops the water before encapsulation seals the space.' },
              { title: 'Crawl Space Repair', href: '/crawl-space-repair', desc: 'Structural repair for moisture-damaged joists, girders, and piers before encapsulation.' },
              { title: 'Foundation Repair', href: '/foundation-repair', desc: 'Fix foundation issues alongside encapsulation for complete below-grade protection.' },
            ].map((s, i) => (<Link key={i} href={s.href} className="bg-gray-50 rounded-xl p-5 hover:shadow-md transition-shadow group border border-gray-100"><h3 className="font-semibold text-[#273373] mb-2 group-hover:text-[#115997] transition-colors">{s.title}</h3><p className="text-gray-600 text-sm">{s.desc}</p></Link>))}
          </div>
        </div>
      </section>

      {/* Blog Resources */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#273373] font-display mb-8">Crawl Space Encapsulation Resources</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { href: '/blog/crawl-space-encapsulation-vs-waterproofing', label: 'Comparison', title: 'Encapsulation vs Waterproofing: Which Do You Need?', desc: 'Understanding the difference can save you thousands on the right fix.' },
              { href: '/blog/crawl-space-vapor-barrier-guide', label: 'Guide', title: 'Crawl Space Vapor Barriers: What You Need to Know', desc: 'Why proper installation matters more than the material itself.' },
              { href: '/blog/crawl-space-mold-signs', label: 'Warning Signs', title: '5 Signs Your Crawl Space Has a Mold Problem', desc: 'Crawl space mold affects your health even if you never go down there.' },
              { href: '/blog/crawl-space-repair-cost-atlanta', label: 'Cost Guide', title: 'Crawl Space Repair Cost in Atlanta', desc: 'What to expect for structural repair alongside encapsulation.' },
              { href: '/blog/signs-you-need-basement-waterproofing', label: 'Related', title: 'Signs You Need Basement Waterproofing', desc: 'If your basement is wet, your crawl space likely needs attention too.' },
              { href: '/blog/what-to-check-after-storm-atlanta', label: 'Storm Prep', title: 'What to Check After a Storm in Atlanta', desc: 'Quick action after severe weather prevents costly moisture damage.' },
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
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">We will crawl under your home, inspect every inch, take photos, and give you an honest assessment of what your crawl space needs. If it does not need encapsulation, we will tell you. No obligation, no sales pressure.</p>
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