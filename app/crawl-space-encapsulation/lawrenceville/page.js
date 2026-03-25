import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export const metadata = {
  title: 'Crawl Space Encapsulation in Lawrenceville, GA | Free Inspection | Reliable Solutions Atlanta',
  description: 'Crawl space encapsulation in Lawrenceville, GA. Vapor barriers, dehumidifiers, and vent sealing for Gwinnett County homes. Most projects $5,000-$12,000. Free inspection. 770-895-2039.',
  keywords: 'crawl space encapsulation Lawrenceville GA, crawl space vapor barrier Gwinnett County, crawl space moisture Lawrenceville, crawl space sealing Lawrenceville Georgia',
  openGraph: { title: 'Crawl Space Encapsulation in Lawrenceville, GA | Reliable Solutions Atlanta', description: 'Seal your Lawrenceville crawl space. Vapor barriers, dehumidifiers, vent sealing. Free inspection. 770-895-2039.', url: 'https://www.waterhelpme.com/crawl-space-encapsulation/lawrenceville', type: 'website' },
  alternates: { canonical: 'https://www.waterhelpme.com/crawl-space-encapsulation/lawrenceville' },
}

const faqs = [
  { question: 'How much does crawl space encapsulation cost in Lawrenceville, GA?', answer: 'Crawl space encapsulation in Lawrenceville typically costs between $5,000 and $12,000 depending on the size of the crawl space and the condition of the existing structure. A basic vapor barrier installation starts around $3,000. Full encapsulation with 20-mil barrier, vent sealing, insulation, and dehumidifier runs $8,000 to $15,000 for larger Gwinnett County homes.' },
  { question: 'Why do Lawrenceville crawl spaces have moisture problems?', answer: 'Lawrenceville sits on heavy Georgia red clay that holds moisture for extended periods after rain. The vented crawl space design used in 1980s-2000s Gwinnett County homes was supposed to let moisture escape, but in a humid climate like metro Atlanta, open vents actually pull humid air into the crawl space where it condenses on cooler surfaces. This creates a perpetually damp environment.' },
  { question: 'What is the difference between a vapor barrier and full encapsulation?', answer: 'A vapor barrier is a plastic sheet laid over the crawl space floor to block ground moisture. Full encapsulation seals the entire crawl space — floor, walls, and piers — with a heavy-duty liner, closes all vents, and adds a dehumidifier to control humidity. Encapsulation creates a conditioned space while a vapor barrier only addresses ground moisture.' },
  { question: 'Will crawl space encapsulation lower my Lawrenceville energy bills?', answer: 'Yes. An unsealed crawl space in Lawrenceville allows humid air in summer and cold air in winter to enter beneath your floors. Your HVAC system works harder to compensate. Homeowners typically see 15 to 20 percent reduction in heating and cooling costs after full encapsulation because the conditioned air stays in the living space instead of leaking through the floor system.' },
  { question: 'How long does crawl space encapsulation take in Lawrenceville?', answer: 'Most Lawrenceville crawl space encapsulations take 2 to 4 days. Day one is preparation — cleaning debris, addressing any standing water, and repairing structural issues. Days two and three are liner installation, vent sealing, and dehumidifier setup. Larger homes may need an additional day.' },
]

export default function CrawlSpaceEncapsulationLawrenceville() {
  const jsonLd = { '@context': 'https://schema.org', '@type': 'Service', name: 'Crawl Space Encapsulation in Lawrenceville, GA', provider: { '@type': 'LocalBusiness', name: 'Reliable Solutions Atlanta', telephone: '+17708952039', url: 'https://www.waterhelpme.com', address: { '@type': 'PostalAddress', addressLocality: 'Lawrenceville', addressRegion: 'GA', addressCountry: 'US' }, areaServed: { '@type': 'City', name: 'Lawrenceville', containedIn: 'Gwinnett County, GA' } }, serviceType: 'Crawl Space Encapsulation' }
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
            <p className="text-white/70 text-sm font-medium mb-3 uppercase tracking-wider">Gwinnett County, Georgia</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 font-display leading-tight">Crawl Space Encapsulation in Lawrenceville, GA</h1>
            <p className="text-white/80 text-lg sm:text-xl mb-8 leading-relaxed max-w-2xl">Crawl space encapsulation in Lawrenceville typically costs between $5,000 and $12,000. Reliable Solutions Atlanta seals Gwinnett County crawl spaces with heavy-duty vapor barriers, vent sealing, insulation, and dehumidification to permanently eliminate moisture, mold, and energy waste. Free same-week inspections with written estimates.</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white text-[#273373] font-bold rounded-xl hover:bg-gray-100 transition-colors">Schedule Free Inspection</Link>
              <a href="tel:+17708952039" className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-transparent border-2 border-white/30 text-white font-bold rounded-xl hover:bg-white/10 transition-colors">(770) 895-2039</a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Why Lawrenceville Crawl Spaces Need Encapsulation</h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p>The vast majority of homes built in Lawrenceville and Gwinnett County during the 1980s through 2000s building boom used vented crawl space construction. The theory was simple: open vents in the foundation walls would allow air to circulate through the crawl space and carry moisture out. In a dry climate, this works. In metro Atlanta, where summer dew points routinely exceed 70°F and annual rainfall tops 50 inches, it is a disaster.</p>
            <p>When hot, humid outside air enters a vented Lawrenceville crawl space through foundation vents, it hits surfaces that are cooler than the dew point — floor joists, ductwork, pipes, and the ground itself. The moisture in that air condenses on these surfaces exactly the way a cold drink sweats on a summer day. This condensation drips onto the ground, soaks into wood, and creates a perpetually damp environment that supports mold growth, wood rot, and pest infestation.</p>
            <p>The clay soil beneath Lawrenceville homes adds another moisture source. Even with a thin vapor barrier (the 6-mil plastic sheets that builders typically installed), ground moisture continuously evaporates into the crawl space. Georgia red clay holds water for weeks after rain, and in the 30043 and 30044 zip codes where the soil was heavily disturbed during subdivision construction, the compacted fill retains even more moisture than natural clay.</p>
            <p>The subdivisions most affected include Sugarloaf, Collins Hill, Archer Ridge, Mallard Landing, and the neighborhoods along Sugarloaf Parkway and Lawrenceville-Suwanee Road. These areas were built quickly during peak demand, and the crawl spaces received minimal attention beyond code-minimum vapor barriers and vent installation.</p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Signs Your Lawrenceville Crawl Space Needs Encapsulation</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: 'Musty smell in the house', desc: 'Up to 50% of the air you breathe on the first floor comes from the crawl space through the stack effect. If the crawl space is damp and moldy, that air carries mold spores and musty odors into your living space.' },
              { title: 'High humidity indoors despite AC', desc: 'If your Lawrenceville home feels clammy even with the air conditioning running, moisture is migrating up from an unsealed crawl space. A hygrometer reading above 55% humidity indoors during summer points to a crawl space moisture source.' },
              { title: 'Mold on crawl space joists or subfloor', desc: 'Look up at the floor joists and subfloor from inside the crawl space. Dark staining, white fuzzy growth, or visible mold colonies on the wood indicate sustained high humidity. This mold is sending spores into your living space.' },
              { title: 'Sagging or soft floors above the crawl space', desc: 'When floor joists absorb moisture from a damp crawl space, the wood weakens over time. Floors that feel soft, bouncy, or sag in the middle of rooms indicate moisture-damaged structural wood that needs to be addressed.' },
              { title: 'Pest activity — termites, ants, rodents', desc: 'Damp crawl spaces attract pests. Termites need moisture to survive and are drawn to wet wood. Rodents seek the shelter and water source. Encapsulation removes the conditions that attract them.' },
              { title: 'HVAC ductwork sweating or rusting', desc: 'If your HVAC ducts run through the crawl space and show condensation, rust, or mold on their exterior, the crawl space humidity is too high. This condensation also reduces your HVAC efficiency and can cause duct failure.' },
            ].map((sign, i) => (
              <div key={i} className="bg-white rounded-xl p-5 shadow-sm"><h3 className="font-semibold text-[#273373] text-base mb-2">{sign.title}</h3><p className="text-gray-600 text-sm leading-relaxed">{sign.desc}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">How We Encapsulate Crawl Spaces in Lawrenceville</h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <h3 className="text-[#273373] font-display">Preparation and Debris Removal</h3>
            <p>Before any liner goes down, we clear the crawl space of debris, old insulation, and any standing water. If there is existing mold on the wood structure, we treat it with antimicrobial solution. If structural repairs are needed — damaged joists, failing piers — we complete those first so the encapsulation protects a sound structure.</p>
            <h3 className="text-[#273373] font-display">20-Mil Reinforced Vapor Barrier</h3>
            <p>We install a 20-mil reinforced polyethylene liner across the entire crawl space floor, up the foundation walls to within a few inches of the top, and around all piers and columns. All seams are overlapped 12 inches and sealed with waterproof tape. The liner is mechanically fastened to the walls with termination strips. This creates a continuous sealed envelope that blocks 100% of ground moisture vapor.</p>
            <h3 className="text-[#273373] font-display">Vent Sealing and Insulation</h3>
            <p>We seal all foundation vents with rigid foam insulation cut to fit each vent opening. The perimeter foundation walls are insulated with closed-cell foam board that provides both insulation and an additional moisture barrier. Rim joists — a major source of air infiltration in Lawrenceville homes — are sealed with spray foam to prevent outside air from entering the crawl space.</p>
            <h3 className="text-[#273373] font-display">Commercial Dehumidifier</h3>
            <p>A sealed crawl space needs active humidity control. We install a commercial-grade dehumidifier sized for your crawl space volume that maintains 45-50% relative humidity year-round. The unit drains to a condensate pump or existing drain so there is no reservoir to empty. It runs automatically, adjusting output based on actual humidity readings.</p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 font-display">Crawl Space Encapsulation Costs in Lawrenceville</h2>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#273373] text-white"><tr><th className="px-6 py-4 text-left text-sm font-semibold">Service</th><th className="px-6 py-4 text-left text-sm font-semibold">Typical Cost</th><th className="px-6 py-4 text-left text-sm font-semibold hidden sm:table-cell">Timeline</th></tr></thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ['Vapor barrier only (6-mil replacement)', '$1,500 – $3,000', '1 day'],
                  ['20-mil liner floor + walls', '$4,000 – $7,000', '1-2 days'],
                  ['Full encapsulation (liner + vents + insulation)', '$5,000 – $12,000', '2-3 days'],
                  ['Commercial dehumidifier installation', '$1,000 – $2,000', 'Same day'],
                  ['Mold treatment (before encapsulation)', '$1,500 – $3,000', '1 day'],
                  ['Full encapsulation + structural repair', '$8,000 – $18,000', '3-5 days'],
                ].map(([r, c, t], i) => (<tr key={i} className="hover:bg-gray-50"><td className="px-6 py-4 text-sm text-gray-900">{r}</td><td className="px-6 py-4 text-sm font-semibold text-[#115997]">{c}</td><td className="px-6 py-4 text-sm text-gray-500 hidden sm:table-cell">{t}</td></tr>))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mt-4">Financing available through GreenSky with plans starting at 0% interest. Transferable warranty included.</p>
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
          <h2 className="text-2xl font-bold text-[#273373] mb-6 font-display">Related Services in Lawrenceville</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { title: 'Foundation Repair', href: '/foundation-repair/lawrenceville', desc: 'Fix structural issues before encapsulation to protect a sound foundation long-term.' },
              { title: 'Drainage Solutions', href: '/drainage/lawrenceville', desc: 'Exterior drainage reduces the water volume reaching your crawl space in the first place.' },
              { title: 'Crawl Space Repair', href: '/crawl-space-repair', desc: 'Structural repair for damaged joists, girders, and piers before or during encapsulation.' },
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
          <p className="text-sm text-gray-500 mb-4"><Link href="/" className="hover:text-[#115997]">Home</Link> {' / '}<Link href="/crawl-space-encapsulation" className="hover:text-[#115997]">Crawl Space Encapsulation</Link> {' / '}<span className="text-gray-700">Lawrenceville</span></p>
          <p className="text-sm text-gray-500">Crawl space encapsulation also available in <Link href="/crawl-space-encapsulation/marietta" className="text-[#115997] hover:underline">Marietta</Link>, <Link href="/crawl-space-encapsulation/roswell" className="text-[#115997] hover:underline">Roswell</Link>, <Link href="/crawl-space-encapsulation/alpharetta" className="text-[#115997] hover:underline">Alpharetta</Link>, <Link href="/crawl-space-encapsulation/decatur" className="text-[#115997] hover:underline">Decatur</Link>, <Link href="/crawl-space-encapsulation/sandy-springs" className="text-[#115997] hover:underline">Sandy Springs</Link>, and <Link href="/crawl-space-encapsulation/stone-mountain" className="text-[#115997] hover:underline">Stone Mountain</Link>.</p>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-[#115997]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 font-display">Free Crawl Space Inspection in Lawrenceville</h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">We will crawl under your Lawrenceville home, inspect every inch, take photos, and give you an honest assessment of what your crawl space needs. No obligation, no sales pressure.</p>
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