import Header from '../components/Header'
import Footer from '../components/Footer'
import Image from 'next/image'
import Link from 'next/link'

export const metadata = {
  title: 'Concrete Repair in Atlanta, GA | Free Estimates | Reliable Solutions Atlanta',
  description: 'Concrete repair in Metro Atlanta, GA. Driveway leveling, crack repair, sidewalk restoration, retaining wall repair, and slab replacement. Most projects $1,500-$7,000. BBB A+ rated. Free estimates. 770-895-2039.',
  keywords: ['concrete repair Atlanta', 'driveway repair Atlanta', 'concrete leveling Georgia', 'retaining wall repair Atlanta', 'sidewalk repair Metro Atlanta', 'concrete crack repair Atlanta'],
  openGraph: {
    title: 'Concrete Repair in Atlanta, GA | Free Estimates | Reliable Solutions Atlanta',
    description: 'Metro Atlanta concrete repair. Driveways, sidewalks, patios, retaining walls. Free estimates. 770-895-2039.',
    url: 'https://www.waterhelpme.com/cocnrete-repair',
    type: 'website',
  },
  alternates: { canonical: 'https://www.waterhelpme.com/cocnrete-repair' },
}

const faqs = [
  { question: 'How much does concrete repair cost in Atlanta, GA?', answer: 'Concrete repair in Metro Atlanta typically costs between $1,500 and $7,000. Polyurethane foam slab leveling starts around $800. Driveway crack repair runs $500 to $1,500. Sidewalk section replacement costs $400 to $1,200. Retaining wall repair with drainage ranges from $2,000 to $7,000. Full driveway replacement runs $3,000 to $10,000 depending on size and access. We provide free estimates on all concrete work.' },
  { question: 'Why does concrete crack and settle in Atlanta?', answer: 'Metro Atlanta sits on expansive Georgia red clay that swells when wet and shrinks when dry. This seasonal push-pull cycle creates pressure beneath concrete slabs that causes cracking, and the shrinking creates voids beneath the slab that cause settling. Heavy rainfall (50+ inches per year) accelerates soil erosion beneath concrete edges. Tree roots grow beneath slabs and lift sections. And fill soil from the building boom continues to compact beneath driveways and walkways decades after construction.' },
  { question: 'Can you level my sinking driveway without replacing it?', answer: 'If the concrete is structurally sound but has settled unevenly, polyurethane foam leveling can raise it back to its original position. Small holes are drilled in the sunken section, expanding foam is injected beneath the slab, and the concrete rises back to level. The repair is usable within 15 minutes and costs 50 to 70 percent less than full replacement. The foam is permanent, waterproof, and strong enough to support vehicle traffic.' },
  { question: 'Why do Atlanta retaining walls fail?', answer: 'Most retaining wall failures in Metro Atlanta are drainage failures. The clay soil behind the wall becomes saturated during rain and exerts massive hydrostatic pressure that pushes the wall forward. Walls built without proper drainage behind them eventually fail regardless of how well the wall itself was constructed. Adding drainage during repair reduces the pressure on the wall by 60 to 80 percent and is the critical element in a lasting repair.' },
  { question: 'Should I repair or replace my Atlanta concrete?', answer: 'If the concrete has minor to moderate cracking and the slab is structurally intact, repair and leveling are significantly more cost-effective. If the concrete is severely crumbled, broken into multiple disconnected pieces, or has exposed rebar, replacement is the better investment. We evaluate during our free estimate and recommend the approach that gives you the best result for the money.' },
  { question: 'How long does concrete repair take?', answer: 'Foam leveling is completed in 2 to 4 hours and is usable immediately. Crack repair is typically same-day work. Sidewalk section replacement takes 1 day. Retaining wall repair with drainage takes 2 to 5 days. Full driveway replacement including demolition, base preparation, pouring, and curing takes 3 to 6 days.' },
]

export default function ConcreteRepairPage() {
  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Concrete Repair in Atlanta, GA',
    description: 'Professional concrete repair in Metro Atlanta. Driveway leveling, crack sealing, sidewalk restoration, retaining wall repair and drainage, patio repair, and concrete replacement.',
    url: 'https://www.waterhelpme.com/cocnrete-repair',
    provider: {
      '@type': 'LocalBusiness',
      name: 'Reliable Solutions Atlanta',
      telephone: '+17708952039',
      url: 'https://www.waterhelpme.com',
      address: { '@type': 'PostalAddress', addressLocality: 'Atlanta', addressRegion: 'GA', addressCountry: 'US' },
      areaServed: { '@type': 'State', name: 'Georgia' },
    },
    serviceType: 'Concrete Repair',
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
          <Image src="/images/portfolio/concrete-patio-crew-working.png" alt="Concrete repair crew working on an Atlanta driveway" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-[#273373]/70" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-display leading-tight">Concrete Repair in Atlanta, GA</h1>
            <p className="text-white/80 text-lg sm:text-xl mt-6 leading-relaxed max-w-2xl">Concrete repair in Metro Atlanta typically costs between $1,500 and $7,000. Reliable Solutions Atlanta fixes cracked driveways, sinking sidewalks, damaged patios, and failing retaining walls caused by the Georgia red clay that shifts beneath every concrete surface in the metro area. Free same-week estimates.</p>
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white text-[#273373] font-bold rounded-xl hover:bg-gray-100 transition-colors">Get Free Estimate</Link>
              <a href="tel:+17708952039" className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-transparent border-2 border-white/30 text-white font-bold rounded-xl hover:bg-white/10 transition-colors">(770) 895-2039</a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Atlanta Concrete Fails */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Why Atlanta Concrete Cracks and Settles</h2>
          <div className="grid lg:grid-cols-2 gap-12 items-start mb-8">
            <div className="relative h-[350px] rounded-xl overflow-hidden">
              <Image src="/images/diagrams/foundation-crack-types-diagram.png" alt="Diagram showing common concrete crack patterns and their causes" fill className="object-contain" />
            </div>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p>Metro Atlanta concrete takes a beating from two forces that work together year after year: the expansive Georgia red clay beneath it and the 50+ inches of annual rainfall that drives the clay cycle. When the clay absorbs water, it swells and pushes upward against concrete slabs. When it dries during summer heat, it shrinks and pulls away, creating voids beneath the slab. This seasonal expansion and contraction cycle repeats annually, each time cracking the concrete a little more and creating deeper voids that cause further settling.</p>
              <p>The problem is worse in specific Metro Atlanta conditions. Gwinnett County subdivisions built on compacted fill have driveways settling as the fill continues to consolidate 20 years after construction. Cobb County hillside properties lose soil from beneath concrete edges as water concentrates and erodes the slope.</p>
            </div>
          </div>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p>North Fulton homes with dense tree canopy have roots growing beneath driveways and walkways, lifting sections and cracking slabs from below. DeKalb County homes near Stone Mountain sit on granite substrata that channels water laterally, eroding the thin soil between the rock and the concrete at an accelerated rate. And retaining walls across every Metro Atlanta community face saturated clay pressure that was never accounted for in their original construction.</p>
            <p>The good news is that most Atlanta concrete damage is repairable without full replacement. Settling slabs can be lifted with foam injection. Cracks can be sealed with flexible filler that moves with the clay. Retaining walls can be stabilized with drainage that relieves the pressure behind them. Replacement is only necessary when the concrete has broken apart beyond the point of repair.</p>
          </div>
        </div>
      </section>

      {/* Signs Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Signs You Need Concrete Repair in Atlanta</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: 'Driveway cracks widening over time', desc: 'Hairline cracks that grow wider each year indicate the clay beneath is actively shifting. Cracks wider than a quarter inch allow water infiltration that accelerates the deterioration cycle beneath the slab.' },
              { title: 'Sidewalk sections sinking or lifting', desc: 'Uneven sidewalk sections create trip hazards and liability. In Metro Atlanta, settling fill soil and growing tree roots are the two primary causes of sidewalk displacement that gets worse each year.' },
              { title: 'Patio pulling away from the house', desc: 'When the patio slab settles away from the foundation, a gap opens that directs water toward the house. This can cause basement or crawl space water problems and accelerates erosion beneath the patio itself.' },
              { title: 'Retaining wall leaning or cracking', desc: 'A retaining wall that has moved forward from its original position or developed horizontal cracks is under active hydrostatic pressure from saturated soil. This is a progressive failure that worsens with each rain.' },
              { title: 'Garage floor sinking at the apron', desc: 'The driveway-to-garage transition settles as soil beneath compacts, creating a lip that damages vehicles and allows water into the garage during rain. This is one of the most common concrete complaints in Atlanta subdivisions.' },
              { title: 'Pool deck becoming uneven', desc: 'Concrete pool decks shift as the clay beneath moves seasonally. Uneven pool deck surfaces create safety hazards and allow water to drain toward equipment rather than away from it.' },
            ].map((sign, i) => (
              <div key={i} className="bg-white rounded-xl p-5 shadow-sm"><h3 className="font-semibold text-[#273373] text-base mb-2">{sign.title}</h3><p className="text-gray-600 text-sm leading-relaxed">{sign.desc}</p></div>
            ))}
          </div>
        </div>
      </section>

      {/* Repair Methods */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Concrete Repair Methods We Use</h2>
          <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
            <div>
              <h3 className="text-[#273373] font-display">Polyurethane Foam Slab Leveling</h3>
              <p>For concrete that has settled but is structurally sound, we inject high-density polyurethane foam through small holes drilled in the slab. The foam expands beneath the concrete, filling voids and lifting the slab back to its original level. The holes are patched and the repair is usable within 15 minutes. The foam is waterproof, does not wash out, and does not compress under vehicle weight. This is the most cost-effective solution for settling driveways, sidewalks, patios, garage floors, and pool decks throughout Metro Atlanta.</p>
            </div>
            <div>
              <h3 className="text-[#273373] font-display">Crack Repair and Sealing</h3>
              <p>We repair concrete cracks using flexible polyurethane or epoxy filler that bonds to both sides of the crack and flexes with the seasonal clay movement that is unavoidable in Metro Atlanta. For wider structural cracks, we route the crack to create a clean channel, fill with structural repair material, and seal the surface. This prevents water infiltration that creates larger voids beneath the slab and accelerates the damage cycle.</p>
            </div>
            <div>
              <h3 className="text-[#273373] font-display">Retaining Wall Repair with Drainage</h3>
              <p>Most retaining wall failures in Metro Atlanta are drainage failures. We excavate behind the failing wall, install a French drain with gravel backfill to relieve hydrostatic pressure, and repair or rebuild the wall sections that have moved. The drainage behind the wall is the critical component — it reduces the pressure on the wall by 60 to 80 percent and is the difference between a repair that lasts and one that fails again within a few years.</p>
            </div>
            <div>
              <h3 className="text-[#273373] font-display">Concrete Replacement</h3>
              <p>When concrete is too damaged for repair — severely crumbled, broken into multiple pieces, or with exposed rebar — we remove the failed section and pour new concrete on a properly prepared base. We compact the subgrade, add a gravel base for drainage, and pour with fiber reinforcement and properly spaced control joints designed for the seasonal clay movement in Metro Atlanta. The result is concrete that lasts significantly longer than the original because the base and reinforcement are designed for the specific soil conditions.</p>
            </div>
            <div>
              <h3 className="text-[#273373] font-display">Masonry and Brick Repair</h3>
              <p>We also handle masonry work that accompanies concrete repair: brick pointing and replacement, stucco repair, chimney repair, and stone retaining wall restoration. For homes where concrete damage is accompanied by brick cracking or mortar deterioration, we address both in the same project so the repairs are coordinated and the underlying cause is fixed once.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Cost Table */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Concrete Repair Costs in Atlanta</h2>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#273373] text-white"><tr><th className="px-6 py-4 text-left text-sm font-semibold">Service</th><th className="px-6 py-4 text-left text-sm font-semibold">Typical Cost</th><th className="px-6 py-4 text-left text-sm font-semibold hidden sm:table-cell">Timeline</th></tr></thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ['Polyurethane foam slab leveling', '$800 – $2,500', '2-4 hours'],
                  ['Driveway crack repair and sealing', '$500 – $1,500', 'Same day'],
                  ['Sidewalk section replacement', '$400 – $1,200', '1 day'],
                  ['Retaining wall repair with drainage', '$2,000 – $7,000', '2-5 days'],
                  ['Driveway replacement (per sq ft)', '$8 – $15 per sq ft', '3-6 days'],
                  ['Patio repair or replacement', '$2,000 – $6,000', '1-3 days'],
                  ['Retaining wall full rebuild', '$5,000 – $12,000', '5-8 days'],
                  ['Brick and masonry repair', '$500 – $3,000', '1-3 days'],
                ].map(([r, c, t], i) => (<tr key={i} className="hover:bg-gray-50"><td className="px-6 py-4 text-sm text-gray-900">{r}</td><td className="px-6 py-4 text-sm font-semibold text-[#115997]">{c}</td><td className="px-6 py-4 text-sm text-gray-500 hidden sm:table-cell">{t}</td></tr>))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mt-4">Financing available through GreenSky with plans starting at 0% interest. Free estimates on all concrete and masonry work.</p>
        </div>
      </section>

      {/* Service Areas - City Pages */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-3 font-display">Concrete Repair by City</h2>
          <p className="text-gray-600 mb-8">Every Metro Atlanta city has unique soil and terrain that affects concrete differently. Select your city for local pricing, methods, and FAQs.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { city: 'Lawrenceville', county: 'Gwinnett County', href: '/cocnrete-repair/lawrenceville', desc: 'Driveways on settling fill. Clay expansion cracking. Tree root damage in subdivisions.' },
              { city: 'Marietta', county: 'Cobb County', href: '/cocnrete-repair/marietta', desc: 'Hillside retaining walls, driveway erosion, walk-out basement concrete.' },
              { city: 'Roswell', county: 'North Fulton', href: '/cocnrete-repair/roswell', desc: 'Tree root concrete damage, high-end landscape restoration, Chattahoochee erosion.' },
              { city: 'Alpharetta', county: 'North Fulton', href: '/cocnrete-repair/alpharetta', desc: 'HOA-compliant repairs. Settling fill from the building boom. Garage apron leveling.' },
              { city: 'Decatur', county: 'DeKalb County', href: '/cocnrete-repair/decatur', desc: 'Historic step restoration, root-damaged sidewalks, vintage retaining walls.' },
              { city: 'Sandy Springs', county: 'Fulton County', href: '/cocnrete-repair/sandy-springs', desc: 'Hillside driveway erosion, decomposed granite undermining, pre-sale concrete work.' },
              { city: 'Stone Mountain', county: 'DeKalb County', href: '/cocnrete-repair/stone-mountain', desc: 'Granite substrata creating voids. Foam leveling on rock is especially permanent.' },
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
              { title: 'Foundation Repair', href: '/foundation-repair', desc: 'The same clay soil that damages concrete also causes foundation cracking and settling.' },
              { title: 'Drainage Solutions', href: '/drainage', desc: 'Proper drainage prevents the soil erosion and saturation that damages concrete and retaining walls.' },
              { title: 'Crawl Space Repair', href: '/crawl-space-repair', desc: 'Fix structural damage beneath your home alongside exterior concrete work.' },
            ].map((s, i) => (<Link key={i} href={s.href} className="bg-gray-50 rounded-xl p-5 hover:shadow-md transition-shadow group border border-gray-100"><h3 className="font-semibold text-[#273373] mb-2 group-hover:text-[#115997] transition-colors">{s.title}</h3><p className="text-gray-600 text-sm">{s.desc}</p></Link>))}
          </div>
        </div>
      </section>

      {/* Blog Resources */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#273373] font-display mb-8">Concrete Repair Resources</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { href: '/blog/concrete-repair-cost-atlanta', label: 'Cost Guide', title: 'How Much Does Concrete Repair Cost in Atlanta?', desc: 'Realistic pricing for leveling, crack repair, replacement, and masonry work.' },
              { href: '/blog/concrete-leveling-vs-replacement-atlanta', label: 'Repair Options', title: 'Concrete Leveling vs. Replacement: Which Is Right?', desc: 'When leveling saves you thousands vs. when replacement is smarter.' },
              { href: '/blog/signs-concrete-needs-repair', label: 'Warning Signs', title: '6 Signs Your Concrete Needs Repair', desc: 'Spot the warning signs before small problems become expensive ones.' },
              { href: '/blog/retaining-wall-repair-cost-atlanta', label: 'Cost Guide', title: 'Retaining Wall Repair Cost in Atlanta', desc: 'What to expect for wall stabilization, drainage, and rebuilds.' },
              { href: '/blog/foundation-crack-types-atlanta', label: 'Crack Guide', title: 'Types of Foundation Cracks and What They Mean', desc: 'Learn which cracks are cosmetic and which signal structural problems.' },
              { href: '/blog/yard-drainage-problems-foundation-damage', label: 'Prevention', title: 'Yard Drainage Problems and Foundation Damage', desc: 'How poor drainage causes concrete and foundation deterioration.' },
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
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 font-display">Free Concrete Estimate in Metro Atlanta</h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">We will assess your concrete damage, determine whether repair or replacement is most cost-effective, and give you a clear written estimate. No obligation, no sales pressure.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#273373] font-bold rounded-xl hover:bg-gray-100 transition-colors text-lg">Get Free Estimate</Link>
            <a href="tel:+17708952039" className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-colors text-lg">Call (770) 895-2039</a>
          </div>
          <p className="text-white/50 text-sm mt-6">BBB A+ Accredited · IICRC Certified · 20+ Years Experience · GreenSky Financing Available</p>
        </div>
      </section>

      <Footer />
    </div>
  )
}