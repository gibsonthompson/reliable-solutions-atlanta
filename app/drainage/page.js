import Header from '../components/Header'
import Footer from '../components/Footer'
import Image from 'next/image'
import Link from 'next/link'

export const metadata = {
  title: 'Drainage Solutions in Atlanta, GA | Free Inspection | Reliable Solutions Atlanta',
  description: 'Drainage solutions in Metro Atlanta, GA. French drains, sump pumps, yard grading, downspout routing, and retaining wall drainage. Most projects $2,000-$8,000. BBB A+ rated. Free inspections. 770-895-2039.',
  keywords: ['drainage Atlanta', 'French drain Atlanta', 'yard drainage Georgia', 'sump pump Atlanta', 'drainage solutions Metro Atlanta', 'standing water yard Atlanta'],
  openGraph: {
    title: 'Drainage Solutions in Atlanta, GA | Free Inspection | Reliable Solutions Atlanta',
    description: 'Metro Atlanta drainage specialists. French drains, sump pumps, grading, downspout routing. Free inspections. 770-895-2039.',
    url: 'https://www.waterhelpme.com/drainage',
    type: 'website',
  },
  alternates: { canonical: 'https://www.waterhelpme.com/drainage' },
}

const faqs = [
  { question: 'How much do drainage solutions cost in Atlanta, GA?', answer: 'Drainage projects in Metro Atlanta typically cost between $2,000 and $8,000. French drains run $25 to $60 per linear foot installed. Sump pump systems cost $1,500 to $3,000. Downspout underground routing runs $300 to $600 per downspout. Yard grading correction costs $1,000 to $3,500. Full property drainage plans with multiple drain runs, sump pump, and grading range from $5,000 to $15,000. We provide free inspections with written estimates.' },
  { question: 'Why does my Atlanta yard hold standing water?', answer: 'Metro Atlanta receives over 50 inches of rain annually on soil that is predominantly red clay. Clay absorbs water slowly and drains poorly, so when the soil reaches saturation during heavy rain, the excess water has nowhere to go but across the surface. Poor grading that directs water toward the house instead of away from it, compacted soil from construction, and clogged or absent drainage infrastructure all contribute to standing water.' },
  { question: 'What is the difference between a French drain and a surface drain?', answer: 'A French drain is a buried perforated pipe in a gravel-filled trench that collects groundwater from within the soil and routes it to a discharge point. A surface drain (catch basin) collects water that is already pooling on the surface through a grated inlet. Most Atlanta properties need both: French drains to manage groundwater pressure against foundations, and surface drains to capture water pooling in low spots in the yard.' },
  { question: 'Do I need a sump pump with my drainage system?', answer: 'If your property does not have a natural discharge point lower than the drain system (a slope to the street or a storm drain inlet), a sump pump is necessary to lift the collected water above grade and discharge it away from the home. Homes on flat lots or at the bottom of slopes in Metro Atlanta frequently need pump-assisted discharge. Battery backup is essential for storm-driven power outages.' },
  { question: 'Can drainage problems damage my Atlanta foundation?', answer: 'Yes. Poor drainage is the number one cause of foundation damage in Metro Atlanta. When water saturates the clay soil around your foundation, it creates hydrostatic pressure that pushes against foundation walls and causes cracking. Saturated clay beneath footings loses bearing capacity, causing settlement. Most foundation repair projects we perform trace back to a drainage failure that was never addressed.' },
  { question: 'How long does drainage installation take?', answer: 'Most Atlanta drainage projects take 1 to 3 days. A simple French drain run or downspout routing is typically completed in a single day. Full yard drainage with multiple runs and sump pump takes 2 to 3 days. Complex projects with retaining wall drainage and extensive grading may take 3 to 5 days. We restore all disturbed lawn areas with sod or seed.' },
]

export default function DrainagePage() {
  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Drainage Solutions in Atlanta, GA',
    description: 'Professional drainage system installation in Metro Atlanta. French drains, sump pumps, yard grading, downspout routing, retaining wall drainage, and complete water management systems.',
    url: 'https://www.waterhelpme.com/drainage',
    provider: {
      '@type': 'LocalBusiness',
      name: 'Reliable Solutions Atlanta',
      telephone: '+17708952039',
      url: 'https://www.waterhelpme.com',
      address: { '@type': 'PostalAddress', addressLocality: 'Atlanta', addressRegion: 'GA', addressCountry: 'US' },
      areaServed: { '@type': 'State', name: 'Georgia' },
    },
    serviceType: 'Drainage Solutions',
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
          <Image src="/images/portfolio/french-drain-pipe-installation.png" alt="French drain installation in an Atlanta yard" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-[#273373]/70" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-display leading-tight">Drainage Solutions in Atlanta, GA</h1>
            <p className="text-white/80 text-lg sm:text-xl mt-6 leading-relaxed max-w-2xl">Drainage solutions in Metro Atlanta typically cost between $2,000 and $8,000. Reliable Solutions Atlanta designs and installs French drains, sump pumps, yard grading, downspout routing, and retaining wall drainage to protect your foundation and keep your yard usable year-round. Free same-week inspections.</p>
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white text-[#273373] font-bold rounded-xl hover:bg-gray-100 transition-colors">Schedule Free Inspection</Link>
              <a href="tel:+17708952039" className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-transparent border-2 border-white/30 text-white font-bold rounded-xl hover:bg-white/10 transition-colors">(770) 895-2039</a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Atlanta Has Drainage Problems */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Why Metro Atlanta Has Drainage Problems</h2>
          <div className="grid lg:grid-cols-2 gap-12 items-start mb-8">
            <div className="relative h-[350px] rounded-xl overflow-hidden">
              <Image src="/images/diagrams/french-drain-diagram.png" alt="French drain system diagram showing gravel bed and perforated pipe" fill className="object-contain" />
            </div>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p>Metro Atlanta receives over 50 inches of rain annually — more than Seattle — on soil that is among the worst-draining in the country. Georgia red clay absorbs water slowly when dry, swells as it saturates, and then stops absorbing entirely. Once the clay reaches saturation during a heavy rain event, every additional drop of water runs across the surface or builds pressure against your foundation.</p>
              <p>The drainage challenges vary by area. Gwinnett County subdivisions built on compacted fill soil have grading that has settled and reversed over time, directing water toward homes instead of away. Cobb County hillside properties channel runoff at speed that erodes soil and overwhelms existing drainage. North Fulton homes near the Chattahoochee face a high water table that saturates soil from below.</p>
            </div>
          </div>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p>DeKalb County homes near Stone Mountain sit on granite substrata that is completely impermeable, forcing water to flow laterally along the rock surface and concentrate at foundations. Decatur historic homes have original clay tile drainage that has collapsed after a century of service. And across all areas, mature trees grow roots into drainage pipes, blocking systems that worked when the home was built but have been compromised over the decades.</p>
            <p>The consequences of poor drainage extend well beyond a soggy yard. Water pooling against foundations creates hydrostatic pressure that causes cracking and bowing of foundation walls. Saturated soil beneath footings loses bearing capacity, leading to foundation settling. Wet crawl spaces develop mold, wood rot, and pest infestations. Retaining walls without drainage behind them fail under the weight of saturated soil. Most of the foundation, crawl space, and basement problems we repair throughout Metro Atlanta trace back to a drainage failure that could have been prevented.</p>
          </div>
        </div>
      </section>

      {/* Signs Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Signs Your Atlanta Property Needs Drainage Work</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: 'Standing water in the yard after rain', desc: 'Water that pools in the yard and takes more than 24 hours to recede indicates the soil is saturated and the grade is not moving water away effectively. In Atlanta clay, puddles that last 48+ hours are common without proper drainage.' },
              { title: 'Water pooling against the foundation', desc: 'If you see water collecting at the base of the foundation walls during or after rain, the grading directs water toward the house. This is the most damaging drainage failure because the water creates direct pressure on the foundation.' },
              { title: 'Wet basement or crawl space after storms', desc: 'Water in the basement or crawl space during rain means exterior drainage has failed to keep water away from the foundation. The water is entering through cracks, joints, or porous walls under hydrostatic pressure.' },
              { title: 'Erosion channels in the yard', desc: 'Visible erosion paths where water has carved channels in the soil indicate concentrated runoff that is moving too fast. These channels deepen with each rain event and can undermine walkways, driveways, and structures.' },
              { title: 'Downspouts dumping water next to the house', desc: 'Downspouts that discharge at the foundation splash water against the wall and saturate the soil within feet of the foundation. The average Atlanta home collects thousands of gallons from roof runoff annually that needs to be routed away.' },
              { title: 'Retaining wall leaning or cracking', desc: 'A retaining wall that has developed horizontal cracks or is leaning forward is under hydrostatic pressure from saturated soil behind it. The wall does not need repair — it needs drainage behind it to relieve the pressure.' },
            ].map((sign, i) => (
              <div key={i} className="bg-white rounded-xl p-5 shadow-sm"><h3 className="font-semibold text-[#273373] text-base mb-2">{sign.title}</h3><p className="text-gray-600 text-sm leading-relaxed">{sign.desc}</p></div>
            ))}
          </div>
        </div>
      </section>

      {/* Drainage Methods */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Drainage Solutions We Install</h2>
          <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
            <div>
              <h3 className="text-[#273373] font-display">French Drains</h3>
              <p>A French drain is a perforated pipe installed in a gravel-filled trench that intercepts groundwater and surface water and routes it to a discharge point. We install French drains along foundation perimeters to relieve hydrostatic pressure, across yards to intercept hillside runoff, and around retaining walls to prevent soil pressure buildup. The pipe sits in a bed of washed gravel wrapped in filter fabric that prevents soil from clogging the system. French drains are the most versatile drainage solution we install and are the backbone of most Metro Atlanta drainage plans.</p>
            </div>
            <div>
              <h3 className="text-[#273373] font-display">Sump Pump Systems</h3>
              <p>When gravity discharge is not available — which is common on flat lots, at the base of slopes, and in areas with high water tables — a sump pump lifts collected water above grade and discharges it away from the home. We install the pump in a lined sump pit at the lowest point of the drainage system, with a primary AC pump and battery backup that provides 8 to 12 hours of pumping during power outages. The backup is critical because the storms that create the most water are the same ones that knock out power.</p>
            </div>
            <div>
              <h3 className="text-[#273373] font-display">Yard Grading and Surface Drainage</h3>
              <p>Proper grade means the soil slopes away from the foundation at a minimum of 6 inches in the first 10 feet. Many Atlanta homes have lost this grade as fill soil settled or landscaping projects changed the terrain. We regrade around foundations, create swales to channel surface water, and install catch basins in low spots that collect pooling water and route it to the drain system. For areas where regrading is not possible, we install channel drains that intercept surface water at its flow path.</p>
            </div>
            <div>
              <h3 className="text-[#273373] font-display">Downspout Underground Routing</h3>
              <p>The average Metro Atlanta home has 6 to 10 downspouts, each discharging concentrated roof water right next to the foundation. We connect every downspout to solid underground pipe that carries the water 15 to 25 feet from the house before discharging to the yard or storm system. This single improvement removes thousands of gallons per year from the foundation perimeter and is one of the most cost-effective drainage upgrades available.</p>
            </div>
            <div>
              <h3 className="text-[#273373] font-display">Retaining Wall Drainage</h3>
              <p>Retaining walls without drainage behind them are ticking time bombs. Saturated clay soil can exert thousands of pounds of pressure per linear foot against a wall, and most residential retaining walls were not designed for that load. We excavate behind failing walls, install a French drain with gravel backfill, and repair the wall. For new walls, we install drainage during construction so the wall never faces full hydrostatic pressure. Drainage reduces wall pressure by 60 to 80 percent.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Cost Table */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Drainage Costs in Metro Atlanta</h2>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#273373] text-white"><tr><th className="px-6 py-4 text-left text-sm font-semibold">Service</th><th className="px-6 py-4 text-left text-sm font-semibold">Typical Cost</th><th className="px-6 py-4 text-left text-sm font-semibold hidden sm:table-cell">Timeline</th></tr></thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ['French drain (per linear ft)', '$25 – $60', '1-2 days'],
                  ['Yard French drain (50-100 ft run)', '$2,000 – $5,000', '1-2 days'],
                  ['Sump pump with battery backup', '$1,500 – $3,000', '1 day'],
                  ['Downspout underground routing (per downspout)', '$300 – $600', 'Same day'],
                  ['Full downspout system (6-10 downspouts)', '$2,000 – $5,000', '1-2 days'],
                  ['Yard grading correction', '$1,000 – $3,500', '1-2 days'],
                  ['Retaining wall drain retrofit', '$2,000 – $5,000', '1-2 days'],
                  ['Complete property drainage plan', '$5,000 – $15,000', '3-5 days'],
                ].map(([r, c, t], i) => (<tr key={i} className="hover:bg-gray-50"><td className="px-6 py-4 text-sm text-gray-900">{r}</td><td className="px-6 py-4 text-sm font-semibold text-[#115997]">{c}</td><td className="px-6 py-4 text-sm text-gray-500 hidden sm:table-cell">{t}</td></tr>))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mt-4">Financing available through GreenSky with plans starting at 0% interest. All drainage work includes lawn restoration and warranty. Free inspections with written estimates.</p>
        </div>
      </section>

      {/* Service Areas - City Pages */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-3 font-display">Drainage Solutions by City</h2>
          <p className="text-gray-600 mb-8">Every Metro Atlanta city has unique soil, terrain, and drainage challenges. Select your city for pricing, methods, and FAQs specific to your area.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { city: 'Lawrenceville', county: 'Gwinnett County', href: '/drainage/lawrenceville', desc: 'Heavy clay and compacted fill from the building boom. Grading failures in subdivisions.' },
              { city: 'Marietta', county: 'Cobb County', href: '/drainage/marietta', desc: 'Hillside runoff, rocky clay mix, walk-out basement drainage challenges.' },
              { city: 'Roswell', county: 'North Fulton', href: '/drainage/roswell', desc: 'Chattahoochee high water table, root-damaged drains, creek overflow management.' },
              { city: 'Alpharetta', county: 'North Fulton', href: '/drainage/alpharetta', desc: 'Settling fill creating reverse grades. HOA-compliant drainage for subdivisions.' },
              { city: 'Decatur', county: 'DeKalb County', href: '/drainage/decatur', desc: 'Collapsed century-old clay tile drains. Dense canopy preventing soil drying.' },
              { city: 'Sandy Springs', county: 'Fulton County', href: '/drainage/sandy-springs', desc: 'Hilly terrain, split-level drainage, decomposed granite creating fast channels.' },
              { city: 'Stone Mountain', county: 'DeKalb County', href: '/drainage/stone-mountain', desc: 'Granite substrata forcing water laterally. Sump pump necessity on shallow rock.' },
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
              { title: 'Foundation Repair', href: '/foundation-repair', desc: 'Fix the foundation damage caused by years of poor drainage.' },
              { title: 'Basement Waterproofing', href: '/basement-waterproofing', desc: 'Interior waterproofing for basements where exterior drainage alone is not enough.' },
              { title: 'Crawl Space Waterproofing', href: '/crawl-space-waterproofing', desc: 'Stop water entry in crawl spaces with interior drainage and vapor barriers.' },
            ].map((s, i) => (<Link key={i} href={s.href} className="bg-gray-50 rounded-xl p-5 hover:shadow-md transition-shadow group border border-gray-100"><h3 className="font-semibold text-[#273373] mb-2 group-hover:text-[#115997] transition-colors">{s.title}</h3><p className="text-gray-600 text-sm">{s.desc}</p></Link>))}
          </div>
        </div>
      </section>

      {/* Blog Resources */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#273373] font-display mb-8">Drainage Resources</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { href: '/blog/french-drain-cost-atlanta', label: 'Cost Guide', title: 'French Drain Cost in Atlanta', desc: 'What to expect for French drain installation in Metro Atlanta.' },
              { href: '/blog/yard-drainage-problems-foundation-damage', label: 'Prevention', title: 'Yard Drainage Problems and Foundation Damage', desc: 'How poor drainage leads to costly foundation repairs.' },
              { href: '/blog/french-drain-vs-sump-pump', label: 'Comparison', title: 'French Drain vs Sump Pump', desc: 'How these systems work differently and why most homes need both.' },
              { href: '/blog/sump-pump-maintenance-guide', label: 'Maintenance', title: 'Sump Pump Maintenance Guide', desc: 'Test, maintain, and troubleshoot your sump pump before the next storm.' },
              { href: '/blog/what-to-check-after-storm-atlanta', label: 'Storm Prep', title: 'What to Check After a Storm in Atlanta', desc: 'Quick action after severe weather prevents costly water damage.' },
              { href: '/blog/interior-vs-exterior-basement-waterproofing', label: 'Solutions', title: 'Interior vs Exterior Waterproofing', desc: 'Compare drainage approaches, costs, and when each method works best.' },
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
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 font-display">Free Drainage Inspection in Metro Atlanta</h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">We will walk your property, map where water comes from and where it goes, and design a drainage plan that protects your foundation and makes your yard usable again. No obligation, no sales pressure.</p>
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