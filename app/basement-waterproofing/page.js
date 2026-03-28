import Header from '../components/Header'
import Footer from '../components/Footer'
import Image from 'next/image'
import Link from 'next/link'

export const metadata = {
  title: 'Basement Waterproofing in Atlanta, GA | Free Inspection | Reliable Solutions Atlanta',
  description: 'Basement waterproofing in Metro Atlanta, GA. Interior French drains, sump pumps, exterior membranes, crack injection, and wall stabilization. Most projects $3,000-$12,000. BBB A+ rated. Free inspections. 770-895-2039.',
  keywords: ['basement waterproofing Atlanta', 'wet basement Atlanta', 'basement French drain Georgia', 'basement sump pump Atlanta', 'interior waterproofing Metro Atlanta', 'exterior waterproofing Atlanta'],
  openGraph: {
    title: 'Basement Waterproofing in Atlanta, GA | Free Inspection | Reliable Solutions Atlanta',
    description: 'Metro Atlanta basement waterproofing. Interior and exterior solutions. Free inspections. 770-895-2039.',
    url: 'https://www.waterhelpme.com/basement-waterproofing',
    type: 'website',
  },
  alternates: { canonical: 'https://www.waterhelpme.com/basement-waterproofing' },
}

const faqs = [
  { question: 'How much does basement waterproofing cost in Atlanta, GA?', answer: 'Basement waterproofing in Metro Atlanta typically costs between $3,000 and $12,000 for interior systems. Interior French drain with sump pump runs $3,000 to $8,000. Crack injection starts at $500 to $1,500 per crack. Carbon fiber wall reinforcement costs $3,000 to $8,000 per wall. Exterior waterproofing membrane with excavation runs $8,000 to $20,000. We provide free inspections with written estimates so you know the exact cost before work begins.' },
  { question: 'What causes basement water in Atlanta homes?', answer: 'Metro Atlanta receives over 50 inches of rain annually on clay soil that holds water against foundation walls for days after each storm. This creates hydrostatic pressure that forces water through cracks, the wall-footer joint, and porous block walls. Homes on slopes receive additional water from hillside runoff. Homes near the Chattahoochee have elevated water tables. And homes built during the building boom on compacted fill have settling that creates gaps between the soil and the foundation wall.' },
  { question: 'Is interior or exterior waterproofing better for Atlanta basements?', answer: 'Interior waterproofing is more common and cost-effective for most Metro Atlanta basements. It manages water that enters the basement by capturing it at the wall-footer joint and routing it to a sump pump. Exterior waterproofing prevents water from reaching the wall in the first place but requires excavating around the entire foundation, which is more expensive and disruptive. Most Atlanta homes get interior waterproofing. Severe cases with wall deterioration may need exterior membrane as well.' },
  { question: 'Can I finish my Atlanta basement after waterproofing?', answer: 'Yes. A properly waterproofed basement with interior drainage, sump pump, and dehumidifier creates a dry environment suitable for finishing. We design the drainage system to be accessible for future maintenance without removing finished walls. We recommend running the system through at least one full rain season before finishing to verify complete dryness.' },
  { question: 'How long does basement waterproofing take?', answer: 'Most Metro Atlanta basement waterproofing projects take 2 to 4 days. Interior French drain and sump pump installation takes 2 to 3 days. Crack injection is same-day work. Carbon fiber wall reinforcement takes 1 day per wall. Exterior waterproofing with excavation takes 5 to 8 days. Your home remains livable throughout all interior work.' },
  { question: 'Does basement waterproofing come with a warranty?', answer: 'Yes. All basement waterproofing work by Reliable Solutions Atlanta includes a transferable warranty that covers the drainage system, sump pump installation, and any wall reinforcement. The warranty transfers to the next homeowner if you sell, which protects your investment and gives buyers confidence during the inspection process.' },
]

export default function BasementWaterproofingPage() {
  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Basement Waterproofing in Atlanta, GA',
    description: 'Professional interior and exterior basement waterproofing in Metro Atlanta. French drains, sump pumps, crack injection, wall stabilization, exterior membranes, and complete basement water management.',
    url: 'https://www.waterhelpme.com/basement-waterproofing',
    provider: {
      '@type': 'LocalBusiness',
      name: 'Reliable Solutions Atlanta',
      telephone: '+17708952039',
      url: 'https://www.waterhelpme.com',
      address: { '@type': 'PostalAddress', addressLocality: 'Atlanta', addressRegion: 'GA', addressCountry: 'US' },
      areaServed: { '@type': 'State', name: 'Georgia' },
    },
    serviceType: 'Basement Waterproofing',
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
          <Image src="/images/portfolio/basement-waterproofing-interior.png" alt="Interior basement waterproofing installation in an Atlanta home" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-[#273373]/70" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-28 md:py-32 flex items-center">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-display leading-tight">Basement Waterproofing in Atlanta, GA</h1>
            <p className="text-white/80 text-lg sm:text-xl mt-6 leading-relaxed max-w-2xl">Basement waterproofing in Metro Atlanta typically costs between $3,000 and $12,000. Reliable Solutions Atlanta stops water from entering basements across Gwinnett, Cobb, Fulton, and DeKalb counties with interior French drains, sump pumps, crack injection, wall stabilization, and exterior membrane systems. Free same-week inspections with written estimates.</p>
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white text-[#273373] font-bold rounded-xl hover:bg-gray-100 transition-colors">Schedule Free Inspection</Link>
              <a href="tel:+17708952039" className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-transparent border-2 border-white/30 text-white font-bold rounded-xl hover:bg-white/10 transition-colors">(770) 895-2039</a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Atlanta Basements Get Wet */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Why Atlanta Basements Get Wet</h2>
          <div className="grid lg:grid-cols-2 gap-12 items-start mb-8">
            <div className="relative h-[350px] rounded-xl overflow-hidden">
              <Image src="/images/diagrams/basement-waterproofing-diagram.png" alt="Basement waterproofing diagram showing interior drainage, sump pump, and water flow paths" fill className="object-contain" />
            </div>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p>Metro Atlanta basements get wet because the Georgia red clay surrounding them holds water against the foundation walls for days after every rain. With over 50 inches of annual rainfall on clay soil that drains at near-zero rates, the soil around an Atlanta basement wall is saturated for a significant portion of the year. This saturated soil creates hydrostatic pressure that pushes water through every crack, joint, and porous section of the foundation.</p>
              <p>The most common entry point is the wall-footer joint — the seam where the basement wall meets the floor slab. This cold joint was never sealed during construction and is the path of least resistance for pressurized groundwater. The second most common entry point is through cracks in poured concrete walls or through the mortar joints and hollow cores of cinder block walls.</p>
            </div>
          </div>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p>The specific conditions vary across Metro Atlanta. Cobb County hillside basements and walk-outs receive concentrated runoff from the uphill side. Gwinnett County basements on settling fill develop gaps between the soil and the foundation that channel water directly to the wall. North Fulton homes near the Chattahoochee have water tables that rise seasonally and push water up through the basement floor. DeKalb County homes near Stone Mountain sit on granite that channels water laterally at the rock surface, delivering it to the basement wall at concentrated points.</p>
            <p>A wet basement is not just an inconvenience. Water damage destroys stored belongings, promotes mold growth that affects indoor air quality throughout the home, deteriorates the foundation walls from the inside, and makes the space unusable for living or storage. Every month that water is allowed to enter a basement, the damage gets worse and the eventual repair gets more expensive.</p>
          </div>
        </div>
      </section>

      {/* Signs Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Signs Your Atlanta Basement Needs Waterproofing</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: 'Water on the basement floor after rain', desc: 'If you find puddles, wet streaks, or standing water on the basement floor during or after rain, water is entering under hydrostatic pressure. The volume typically increases with heavier storms and may follow the wall-floor joint or appear at specific crack locations.' },
              { title: 'White mineral deposits on basement walls', desc: 'White powdery residue (efflorescence) on the interior face of basement walls means water is migrating through the wall and leaving mineral deposits as it evaporates on the surface. Even if the wall appears dry now, the staining proves chronic water movement.' },
              { title: 'Musty smell in the basement', desc: 'A persistent musty or earthy odor indicates mold and mildew growth from elevated humidity. In Atlanta basements, this smell often worsens in summer when the warm humid air enters and condenses on the cooler basement surfaces.' },
              { title: 'Visible wall cracks with water staining', desc: 'Cracks in the basement wall with water stains, mineral deposits, or active dripping are confirmed water entry points. Horizontal cracks indicate lateral soil pressure. Vertical and diagonal cracks indicate settling or shrinkage.' },
              { title: 'Basement walls bowing inward', desc: 'When saturated Georgia clay pushes against basement walls with sustained hydrostatic pressure, the walls can bow inward. Even a half inch of bowing indicates significant pressure. Walls bowing more than 2 inches need reinforcement alongside waterproofing.' },
              { title: 'Paint peeling or bubbling on basement walls', desc: 'When moisture migrates through concrete or block walls, it pushes paint off the surface from behind. Peeling, bubbling, or flaking paint on basement walls is a moisture indicator even when you cannot see liquid water.' },
            ].map((sign, i) => (
              <div key={i} className="bg-white rounded-xl p-5 shadow-sm"><h3 className="font-semibold text-[#273373] text-base mb-2">{sign.title}</h3><p className="text-gray-600 text-sm leading-relaxed">{sign.desc}</p></div>
            ))}
          </div>
        </div>
      </section>

      {/* Waterproofing Methods */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Basement Waterproofing Methods We Use</h2>
          <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
            <div>
              <h3 className="text-[#273373] font-display">Interior French Drain System</h3>
              <p>We install a perimeter French drain inside the basement along the wall-footer joint where most water enters. The drain channel is cut into the basement floor, a perforated pipe is placed in a gravel bed, and the floor is patched over the system. Water entering through the wall-footer joint or through wall cracks is captured by the drain before it reaches the basement floor and is routed to the sump pit. This is the most common and cost-effective basement waterproofing method in Metro Atlanta.</p>
            </div>
            <div>
              <h3 className="text-[#273373] font-display">Sump Pump with Battery Backup</h3>
              <p>The French drain routes all collected water to a sump pit at the lowest point of the basement. A primary AC-powered submersible pump activates when the water level reaches a set point and discharges it through a line that exits the foundation and routes at least 15 feet from the house. A battery backup pump provides 8 to 12 hours of operation during power outages, which is critical in Metro Atlanta where the storms that cause the most water are the same ones that knock out power.</p>
            </div>
            <div>
              <h3 className="text-[#273373] font-display">Crack Injection</h3>
              <p>Individual wall cracks are sealed with epoxy injection (for structural cracks that need strength restored) or polyurethane injection (for water-leaking cracks that need a waterproof flexible seal). Injection ports are installed along the crack, and the material is injected under pressure to fill the crack through the full thickness of the wall. Most crack injections are completed in a single day and stop the water immediately.</p>
            </div>
            <div>
              <h3 className="text-[#273373] font-display">Carbon Fiber and Steel Wall Reinforcement</h3>
              <p>Basement walls that are bowing from lateral soil pressure need structural reinforcement alongside waterproofing. Carbon fiber straps bonded to the wall surface resist bowing force for walls with 2 inches or less of deflection. Steel I-beam braces anchored to the floor and ceiling joists stabilize walls with more severe bowing. Both methods are installed from the inside without excavation and can be concealed behind finished walls.</p>
            </div>
            <div>
              <h3 className="text-[#273373] font-display">Exterior Waterproofing Membrane</h3>
              <p>For basements where interior waterproofing alone is not sufficient — typically when the wall itself is deteriorating or when water volume is extreme — we excavate around the exterior foundation, apply a waterproofing membrane to the wall surface, install a drainage board and footer drain, and backfill with gravel. The membrane creates a permanent barrier between the soil moisture and the foundation wall. This is the most comprehensive solution and is combined with interior drainage for maximum protection.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Cost Table */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Basement Waterproofing Costs in Atlanta</h2>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#273373] text-white"><tr><th className="px-6 py-4 text-left text-sm font-semibold">Service</th><th className="px-6 py-4 text-left text-sm font-semibold">Typical Cost</th><th className="px-6 py-4 text-left text-sm font-semibold hidden sm:table-cell">Timeline</th></tr></thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ['Crack injection (per crack)', '$500 – $1,500', 'Same day'],
                  ['Interior French drain system', '$3,000 – $8,000', '2-3 days'],
                  ['Sump pump with battery backup', '$1,500 – $3,000', '1 day'],
                  ['Carbon fiber wall reinforcement (per wall)', '$3,000 – $8,000', '1 day'],
                  ['Steel I-beam wall bracing (per wall)', '$4,000 – $10,000', '1-2 days'],
                  ['Exterior waterproofing membrane', '$8,000 – $20,000', '5-8 days'],
                  ['Complete interior waterproofing system', '$5,000 – $15,000', '3-5 days'],
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
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-3 font-display">Basement Waterproofing by City</h2>
          <p className="text-gray-600 mb-8">Every Metro Atlanta city has unique soil, terrain, and basement conditions. Select your city for local pricing, methods, and FAQs.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { city: 'Lawrenceville', county: 'Gwinnett County', href: '/basement-waterproofing/lawrenceville', desc: 'Heavy clay saturation, settling fill gaps, subdivision basement flooding.' },
              { city: 'Marietta', county: 'Cobb County', href: '/basement-waterproofing/marietta', desc: 'Walk-out basements, hillside hydrostatic pressure, rocky clay seepage.' },
              { city: 'Roswell', county: 'North Fulton', href: '/basement-waterproofing/roswell', desc: 'Chattahoochee water table, tree root drainage damage, high-value homes.' },
              { city: 'Alpharetta', county: 'North Fulton', href: '/basement-waterproofing/alpharetta', desc: 'Newer homes with settling fill. Builder damproofing failure after 15-25 years.' },
              { city: 'Decatur', county: 'DeKalb County', href: '/basement-waterproofing/decatur', desc: 'Oldest basements in Atlanta. Century-old stone foundations with zero waterproofing.' },
              { city: 'Sandy Springs', county: 'Fulton County', href: '/basement-waterproofing/sandy-springs', desc: 'Split-level walk-out basements, decomposed granite fast-channel water delivery.' },
              { city: 'Stone Mountain', county: 'DeKalb County', href: '/basement-waterproofing/stone-mountain', desc: 'Granite substrata delivering concentrated water to basement walls.' },
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
              { title: 'Foundation Repair', href: '/foundation-repair', desc: 'Fix the foundation cracking and bowing caused by the same water pressure affecting your basement.' },
              { title: 'Drainage Solutions', href: '/drainage', desc: 'Exterior drainage reduces the water volume that reaches your basement walls.' },
              { title: 'Crawl Space Waterproofing', href: '/crawl-space-waterproofing', desc: 'For homes with crawl spaces alongside or instead of basements.' },
            ].map((s, i) => (<Link key={i} href={s.href} className="bg-gray-50 rounded-xl p-5 hover:shadow-md transition-shadow group border border-gray-100"><h3 className="font-semibold text-[#273373] mb-2 group-hover:text-[#115997] transition-colors">{s.title}</h3><p className="text-gray-600 text-sm">{s.desc}</p></Link>))}
          </div>
        </div>
      </section>

      {/* Blog Resources */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#273373] font-display mb-8">Basement Waterproofing Resources</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { href: '/blog/basement-waterproofing-cost-atlanta', label: 'Cost Guide', title: 'Basement Waterproofing Cost in Atlanta', desc: 'Real pricing for interior vs exterior solutions in Metro Atlanta.' },
              { href: '/blog/signs-you-need-basement-waterproofing', label: 'Warning Signs', title: '7 Warning Signs You Need Basement Waterproofing', desc: 'Spot the telltale signs before minor issues become major problems.' },
              { href: '/blog/interior-vs-exterior-basement-waterproofing', label: 'Comparison', title: 'Interior vs Exterior Waterproofing: Which Is Right?', desc: 'Compare approaches, costs, and effectiveness for your home.' },
              { href: '/blog/how-to-choose-waterproofing-contractor-atlanta', label: 'Hiring Guide', title: 'How to Choose a Waterproofing Contractor in Atlanta', desc: 'What to look for and what to avoid when hiring for your basement.' },
              { href: '/blog/basement-waterproofing-vs-damp-proofing', label: 'Know the Difference', title: 'Waterproofing vs Damp Proofing', desc: 'Why the cheap option your builder used is not real waterproofing.' },
              { href: '/blog/french-drain-vs-sump-pump', label: 'Systems', title: 'French Drain vs Sump Pump', desc: 'How these systems work together to keep your basement dry.' },
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
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 font-display">Free Basement Inspection in Metro Atlanta</h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">We will inspect your basement, identify where and how the water is entering, and give you a waterproofing plan designed for your specific conditions. If your basement does not need waterproofing, we will tell you. No obligation, no sales pressure.</p>
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