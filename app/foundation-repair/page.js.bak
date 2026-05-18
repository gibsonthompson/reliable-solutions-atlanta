import Header from '../components/Header'
import Footer from '../components/Footer'
import Image from 'next/image'
import Link from 'next/link'

export const metadata = {
  title: 'Foundation Repair in Atlanta, GA | Free Inspection | Reliable Solutions Atlanta',
  description: 'Foundation repair in Metro Atlanta, GA. Push piers, crack sealing, wall stabilization, and slab leveling. Most projects $2,500-$15,000. BBB A+ rated, 20+ years experience. Free inspections. 770-895-2039.',
  keywords: ['foundation repair Atlanta', 'foundation repair Georgia', 'foundation crack repair Atlanta', 'push piers Atlanta', 'foundation settling Atlanta', 'foundation inspection Atlanta'],
  openGraph: {
    title: 'Foundation Repair in Atlanta, GA | Free Inspection | Reliable Solutions Atlanta',
    description: 'Metro Atlanta foundation repair specialists. Push piers, crack sealing, wall stabilization. Free inspections. 770-895-2039.',
    url: 'https://www.waterhelpme.com/foundation-repair',
    type: 'website',
  },
  alternates: { canonical: 'https://www.waterhelpme.com/foundation-repair' },
}

const faqs = [
  { question: 'How much does foundation repair cost in Atlanta, GA?', answer: 'Foundation repair in Metro Atlanta typically costs between $2,500 and $15,000. Minor crack sealing starts around $500 to $1,500. Push pier installation runs $1,000 to $2,500 per pier, and most homes need 4 to 10 piers. Wall stabilization with carbon fiber or steel braces costs $3,000 to $8,000 per wall. Full foundation restoration for severe damage ranges from $10,000 to $25,000. We provide free inspections with written estimates so you know the exact cost before any work begins.' },
  { question: 'What are the signs of foundation problems in Atlanta homes?', answer: 'The most common signs include cracks in interior drywall (especially diagonal cracks near door and window frames), doors and windows that stick or no longer close properly, visible cracks in the exterior brick or foundation wall, gaps between the floor and baseboards, uneven or sloping floors, and chimneys pulling away from the house. If you notice any of these, a free inspection can determine whether the cause is normal settling or structural damage that needs repair.' },
  { question: 'Why do Atlanta homes have so many foundation problems?', answer: 'Metro Atlanta sits on expansive red clay soil that swells when wet and shrinks when dry. This seasonal volume change creates a push-pull cycle beneath foundations that causes settling, cracking, and structural movement over time. Heavy rainfall (50+ inches per year), mature tree roots that pull moisture from the soil, and poor drainage around foundations all contribute. Homes built on improperly compacted fill soil during building booms are especially vulnerable.' },
  { question: 'How long does foundation repair take in Atlanta?', answer: 'Most foundation repairs take 1 to 3 days for a typical Atlanta home. Push pier installation is usually completed in 1 to 2 days. Crack sealing and carbon fiber wall reinforcement are often same-day projects. Complex jobs involving multiple repair methods or extensive pier work may take 3 to 5 days. Your home remains livable throughout the repair process.' },
  { question: 'Does foundation repair come with a warranty?', answer: 'Yes. All foundation repair work by Reliable Solutions Atlanta includes a transferable warranty that protects your investment and passes to the next homeowner if you sell. The warranty covers the specific repairs performed and gives both you and future buyers confidence that the foundation has been professionally addressed.' },
  { question: 'Should I fix foundation problems before selling my Atlanta home?', answer: 'Yes. Foundation issues are among the most commonly flagged findings on home inspections in Metro Atlanta. Unresolved foundation problems can reduce offers by $10,000 to $40,000 or cause buyers to walk away entirely. Professional repair with documentation and transferable warranty eliminates this risk and often costs less than the price reduction you would face by selling without repairs.' },
]

export default function FoundationRepairPage() {
  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Foundation Repair in Atlanta, GA',
    description: 'Professional foundation repair services in Metro Atlanta. Push piers, crack sealing, wall stabilization, slab leveling, and structural inspections.',
    url: 'https://www.waterhelpme.com/foundation-repair',
    provider: {
      '@type': 'LocalBusiness',
      name: 'Reliable Solutions Atlanta',
      telephone: '+17708952039',
      url: 'https://www.waterhelpme.com',
      address: { '@type': 'PostalAddress', addressLocality: 'Atlanta', addressRegion: 'GA', addressCountry: 'US' },
      areaServed: { '@type': 'State', name: 'Georgia' },
    },
    serviceType: 'Foundation Repair',
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
          <Image src="/images/portfolio/foundation-repair-crew-working-atlanta.png" alt="Foundation repair crew working on an Atlanta home" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-[#273373]/70" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-28 md:py-32 flex items-center">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-display leading-tight">Foundation Repair in Atlanta, GA</h1>
            <p className="text-white/80 text-lg sm:text-xl mt-6 leading-relaxed max-w-2xl">Foundation repair in Metro Atlanta typically costs between $2,500 and $15,000. Reliable Solutions Atlanta fixes cracking, settling, bowing walls, and structural damage in homes across Gwinnett, Cobb, Fulton, and DeKalb counties with 20+ years of experience. Free same-week inspections with written estimates.</p>
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white text-[#273373] font-bold rounded-xl hover:bg-gray-100 transition-colors">Schedule Free Inspection</Link>
              <a href="tel:+17708952039" className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-transparent border-2 border-white/30 text-white font-bold rounded-xl hover:bg-white/10 transition-colors">(770) 895-2039</a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Atlanta Has Foundation Problems */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Why Atlanta Homes Have Foundation Problems</h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p>Metro Atlanta sits on some of the most challenging foundation soil in the southeast. The Georgia red clay that underlies most of Gwinnett, Cobb, Fulton, and DeKalb counties is classified as expansive soil, meaning it changes volume significantly based on its moisture content. When the clay absorbs water during Atlanta's 50+ inches of annual rainfall, it swells and pushes upward against foundations. When it dries during summer heat, it shrinks and pulls away, leaving voids beneath the foundation that cause settling.</p>
            <p>This seasonal expansion and contraction cycle repeats year after year, each time stressing the concrete a little more. After 15 to 30 years, the cumulative effect becomes visible: cracks in the foundation walls, cracks in the interior drywall, doors that stick, floors that slope, and chimneys that pull away from the house. These are not cosmetic problems. They are signs that the foundation is moving and the home needs professional evaluation.</p>
            <p>The specific conditions vary by area. Gwinnett County homes on compacted fill soil settle as the fill continues to consolidate. Cobb County homes on hillsides face downhill soil creep and uneven moisture distribution. North Fulton homes near the Chattahoochee have elevated water tables that keep the clay perpetually saturated. DeKalb County homes near Stone Mountain face granite substrata that channels water unpredictably. And historic Decatur homes built in the early 1900s have original foundations that were never designed for the loads they carry today.</p>
          </div>
        </div>
      </section>

      {/* Signs Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Signs Your Atlanta Home Needs Foundation Repair</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: 'Diagonal drywall cracks near doors and windows', desc: 'When a foundation shifts, the wall framing above racks out of square. The rigid drywall cannot flex with the movement, so it cracks diagonally from the corners of door and window openings. These cracks grow wider over time as the foundation continues to move.' },
              { title: 'Doors and windows sticking or not closing', desc: 'Doors that used to close smoothly and now drag on the floor or leave gaps at the top indicate the door frame has racked because the floor system shifted. Windows that are difficult to open or no longer stay up have the same cause.' },
              { title: 'Cracks in exterior brick (stair-step pattern)', desc: 'Stair-step cracks in exterior brick mortar joints that follow the mortar lines upward or downward indicate the foundation has settled at one point while the adjacent section has not. The rigid brick veneer cracks along the weakest path, which is the mortar.' },
              { title: 'Visible cracks in the foundation wall', desc: 'Horizontal cracks in poured concrete or block foundation walls indicate lateral soil pressure. Vertical cracks at corners indicate settling. Diagonal cracks from corners of windows or vents indicate differential settlement. The crack pattern tells us what is causing the movement.' },
              { title: 'Floors sloping or feeling uneven', desc: 'If a ball placed on the floor rolls to one side, the foundation has settled in the direction of the roll. Sloping floors are most noticeable in long hallways and large open rooms where the span amplifies the effect of even small settlement.' },
              { title: 'Chimney pulling away from the house', desc: 'Chimneys sit on their own footings and do not always settle at the same rate as the main foundation. A visible gap between the chimney and the house wall indicates differential settlement that needs evaluation.' },
            ].map((sign, i) => (
              <div key={i} className="bg-white rounded-xl p-5 shadow-sm"><h3 className="font-semibold text-[#273373] text-base mb-2">{sign.title}</h3><p className="text-gray-600 text-sm leading-relaxed">{sign.desc}</p></div>
            ))}
          </div>
        </div>
      </section>

      {/* Repair Methods */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Foundation Repair Methods We Use</h2>
          <div className="grid lg:grid-cols-2 gap-12 items-start mb-12">
            <div className="relative h-[350px] rounded-xl overflow-hidden">
              <Image src="/images/diagrams/foundation-repair-diagram.png" alt="Foundation repair diagram showing push pier installation" fill className="object-contain" />
            </div>
            <div className="prose prose-lg max-w-none text-gray-700">
              <h3 className="text-[#273373] font-display">Hydraulic Push Piers</h3>
              <p>Push piers are steel tubes driven through the foundation footing down to stable bearing soil or bedrock beneath the expansive clay layer. Once the piers reach load-bearing depth, hydraulic jacks mounted on the piers lift the settled section of the foundation back toward its original position. Push piers are the standard solution for settling foundations on slab and raised foundations throughout Metro Atlanta. Most homes require 4 to 10 piers depending on the extent of the settlement.</p>
            </div>
          </div>
          <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
            <div>
              <h3 className="text-[#273373] font-display">Helical Piers</h3>
              <p>Helical piers use a screw-like steel shaft that is rotated into the ground until it reaches stable soil. They are used when the foundation load is lighter (such as porches, additions, and interior walls) or when the soil conditions make push piers less effective. Helical piers are also used for new construction foundation support on problematic soil. The installation is quieter and produces less vibration than push piers, which makes them suitable for work near sensitive structures.</p>
            </div>
            <div>
              <h3 className="text-[#273373] font-display">Carbon Fiber Wall Reinforcement</h3>
              <p>When foundation walls bow inward from lateral soil pressure, carbon fiber straps bonded to the interior wall surface resist the bowing force and prevent further movement. Carbon fiber is stronger than steel per unit width, does not rust, and adds only a fraction of an inch to the wall thickness. This is the preferred solution for bowing basement and crawl space walls in Metro Atlanta homes where the bowing is 2 inches or less.</p>
            </div>
            <div>
              <h3 className="text-[#273373] font-display">Crack Sealing and Injection</h3>
              <p>Foundation wall cracks are sealed with epoxy injection for structural cracks or polyurethane injection for water-leaking cracks. Epoxy restores the original strength of the concrete at the crack location. Polyurethane expands to fill the crack and any voids behind it, creating a waterproof seal that flexes slightly with seasonal movement. Most crack repairs are completed in a single day.</p>
            </div>
            <div>
              <h3 className="text-[#273373] font-display">Slab Leveling</h3>
              <p>For slab-on-grade foundations where interior or exterior sections have settled, we inject high-density polyurethane foam through small holes drilled in the slab. The expanding foam fills the void beneath the slab and lifts it back to level. This is effective for garage floors, front stoops, walkways, and interior slab sections that have settled from soil washout or compaction beneath the slab.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Cost Table */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Foundation Repair Costs in Atlanta</h2>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#273373] text-white"><tr><th className="px-6 py-4 text-left text-sm font-semibold">Repair Type</th><th className="px-6 py-4 text-left text-sm font-semibold">Typical Cost</th><th className="px-6 py-4 text-left text-sm font-semibold hidden sm:table-cell">Timeline</th></tr></thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ['Crack sealing (per crack)', '$500 – $1,500', 'Same day'],
                  ['Push pier installation (per pier)', '$1,000 – $2,500', '1 day per 4-6 piers'],
                  ['Helical pier installation (per pier)', '$1,200 – $2,800', '1 day per 4-6 piers'],
                  ['Carbon fiber wall reinforcement (per wall)', '$3,000 – $8,000', '1 day'],
                  ['Steel beam wall stabilization (per wall)', '$4,000 – $10,000', '1-2 days'],
                  ['Slab leveling (per section)', '$800 – $2,500', '2-4 hours'],
                  ['Complete foundation restoration', '$10,000 – $25,000', '3-7 days'],
                ].map(([r, c, t], i) => (<tr key={i} className="hover:bg-gray-50"><td className="px-6 py-4 text-sm text-gray-900">{r}</td><td className="px-6 py-4 text-sm font-semibold text-[#115997]">{c}</td><td className="px-6 py-4 text-sm text-gray-500 hidden sm:table-cell">{t}</td></tr>))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mt-4">Financing available through GreenSky with plans starting at 0% interest. All repairs include transferable warranty. Free inspections with written estimates.</p>
        </div>
      </section>

      {/* Service Areas - City Pages */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-3 font-display">Foundation Repair by City</h2>
          <p className="text-gray-600 mb-8">Every city has unique soil conditions, housing stock, and foundation challenges. Select your city for pricing, methods, and FAQs specific to your area.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { city: 'Lawrenceville', county: 'Gwinnett County', href: '/foundation-repair/lawrenceville', desc: '1980s-2000s homes on compacted fill soil. Clay settlement and pier failure.' },
              { city: 'Marietta', county: 'Cobb County', href: '/foundation-repair/marietta', desc: 'Historic pier-and-beam homes and hillside construction. Rocky clay mix.' },
              { city: 'Roswell', county: 'North Fulton', href: '/foundation-repair/roswell', desc: 'Chattahoochee corridor moisture, tree root damage, high-end homes.' },
              { city: 'Alpharetta', county: 'North Fulton', href: '/foundation-repair/alpharetta', desc: 'Newer homes on settling fill. Slab-on-grade and hybrid foundations.' },
              { city: 'Decatur', county: 'DeKalb County', href: '/foundation-repair/decatur', desc: 'Oldest housing stock in Atlanta. Original stacked stone pier foundations.' },
              { city: 'Sandy Springs', county: 'Fulton County', href: '/foundation-repair/sandy-springs', desc: 'Split-level stress points, decomposed granite soil, hilly terrain.' },
              { city: 'Stone Mountain', county: 'DeKalb County', href: '/foundation-repair/stone-mountain', desc: 'Granite substrata creating unpredictable water and cinder block deterioration.' },
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
              { title: 'Basement Waterproofing', href: '/basement-waterproofing', desc: 'Stop water entry that causes foundation damage from the inside.' },
              { title: 'Crawl Space Repair', href: '/crawl-space-repair', desc: 'Fix structural damage beneath your home caused by moisture and settling.' },
              { title: 'Drainage Solutions', href: '/drainage', desc: 'Proper drainage prevents the soil saturation that causes foundation movement.' },
            ].map((s, i) => (<Link key={i} href={s.href} className="bg-gray-50 rounded-xl p-5 hover:shadow-md transition-shadow group border border-gray-100"><h3 className="font-semibold text-[#273373] mb-2 group-hover:text-[#115997] transition-colors">{s.title}</h3><p className="text-gray-600 text-sm">{s.desc}</p></Link>))}
          </div>
        </div>
      </section>

      {/* Blog Resources */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#273373] font-display mb-8">Foundation Repair Resources</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { href: '/blog/foundation-repair-cost-atlanta', label: 'Cost Guide', title: 'How Much Does Foundation Repair Cost in Atlanta?', desc: 'Realistic pricing for piers, crack sealing, wall stabilization, and more.' },
              { href: '/blog/foundation-crack-types-atlanta', label: 'Crack Guide', title: 'Types of Foundation Cracks and What They Mean', desc: 'Learn which cracks are cosmetic and which signal structural problems.' },
              { href: '/blog/why-atlanta-homes-have-foundation-problems', label: 'Local Insight', title: 'Why Atlanta Homes Are Prone to Foundation Problems', desc: 'How Georgia red clay soil creates unique challenges for homeowners.' },
              { href: '/blog/signs-foundation-settling-vs-structural-damage', label: 'Diagnosis', title: 'Foundation Settling vs. Structural Damage', desc: 'Know when settling is normal and when it signals a serious problem.' },
              { href: '/blog/foundation-maintenance-seasonal-checklist', label: 'Prevention', title: 'Foundation Maintenance: A Seasonal Checklist', desc: 'Simple seasonal tasks to prevent costly foundation repairs.' },
              { href: '/blog/signs-concrete-needs-repair', label: 'Warning Signs', title: '6 Signs Your Concrete Needs Repair', desc: 'Sunken concrete near your home can signal deeper foundation issues.' },
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
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 font-display">Free Foundation Inspection in Metro Atlanta</h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">We will inspect your foundation, document the conditions with photos, explain what we find in plain language, and give you a written estimate. If you do not need repair, we will tell you that too. No obligation, no sales pressure.</p>
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