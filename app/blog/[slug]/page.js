import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Link from 'next/link'
import { notFound } from 'next/navigation'

// Blog post content
const blogPosts = {
  'what-to-do-when-basement-floods-atlanta': {
    title: 'What to Do When Your Atlanta Basement Floods After a Storm',
    description: 'Heavy rain just flooded your basement? Here\'s your step-by-step emergency guide for Metro Atlanta homeowners dealing with water damage.',
    date: 'January 20, 2026',
    readTime: '6 min read',
    category: 'Water Damage',
    content: [
      {
        type: 'lead',
        text: "Atlanta's severe thunderstorms can dump several inches of rain in just a few hours. If you've walked downstairs to find standing water in your basement, don't panic. Taking the right steps quickly can minimize damage, prevent mold growth, and get your home back to normal faster."
      },
      {
        type: 'heading',
        text: 'Step 1: Prioritize Safety First'
      },
      {
        type: 'paragraph',
        text: "Before you step into a flooded basement, assess the danger. If water is above electrical outlets or near your breaker box, do not enter until power is shut off at the main breaker. Water and electricity are a deadly combination. If you can't safely reach your breaker box, call your power company or an electrician. Also watch for structural damage—if you notice cracked walls or sagging floors, evacuate and call a professional."
      },
      {
        type: 'heading',
        text: 'Step 2: Document Everything for Insurance'
      },
      {
        type: 'paragraph',
        text: "Before you start cleanup, document the damage thoroughly. Take photos and videos of water levels, damaged items, and affected areas. Make a written inventory of damaged belongings with approximate values. This documentation is critical for insurance claims. Most homeowner's policies cover sudden water damage from storms, though flood insurance through FEMA may be required for certain situations."
      },
      {
        type: 'heading',
        text: 'Step 3: Remove Standing Water'
      },
      {
        type: 'paragraph',
        text: "Time is critical. The longer water sits, the more damage it causes. For small amounts of water, a wet/dry vacuum can handle the job. For significant flooding, you'll need a sump pump or professional water extraction equipment. If you don't have a sump pump installed, this is a strong sign you need one for future protection. Avoid using regular household vacuums—they're not designed for water and can be dangerous."
      },
      {
        type: 'heading',
        text: 'Step 4: Dry Out the Space Completely'
      },
      {
        type: 'paragraph',
        text: "Removing visible water is only the beginning. Moisture trapped in walls, floors, and materials will lead to mold growth within 24-48 hours in Georgia's humid climate. Use fans to circulate air throughout the basement. Run a dehumidifier continuously—you'll likely need a commercial-grade unit for effective drying. Open windows if outdoor humidity is lower than indoor levels. Remove wet carpet, padding, and any porous materials that can't be thoroughly dried."
      },
      {
        type: 'heading',
        text: 'Step 5: Clean and Disinfect'
      },
      {
        type: 'paragraph',
        text: "Floodwater often contains bacteria, sewage, and contaminants. Once surfaces are dry, clean all affected areas with a solution of water and detergent, then disinfect with a mixture of one cup of bleach per gallon of water. Wear protective gloves and a mask during cleanup. Porous materials like drywall, insulation, and carpet padding that were submerged typically need to be removed and replaced rather than cleaned."
      },
      {
        type: 'heading',
        text: 'Step 6: Address the Source of the Problem'
      },
      {
        type: 'paragraph',
        text: "Emergency cleanup handles the immediate crisis, but you need to prevent future flooding. Common causes of basement flooding in Metro Atlanta include poor grading that directs water toward your foundation, clogged or inadequate gutters and downspouts, failed sump pumps or lack of a sump pump system, cracks in foundation walls allowing water intrusion, and overwhelmed drainage systems during heavy storms. A professional inspection can identify exactly why your basement flooded and recommend permanent solutions."
      },
      {
        type: 'heading',
        text: 'When to Call a Professional'
      },
      {
        type: 'paragraph',
        text: "While minor water intrusion can be handled as a DIY project, certain situations require professional help. Call a water damage restoration specialist if water is more than a few inches deep, flooding involved sewage or contaminated water, you notice mold growth or persistent musty odors, water damage has affected electrical systems, or structural damage is present. Professional restoration companies have industrial equipment that can dry your basement far more quickly and thoroughly than consumer-grade tools."
      },
      {
        type: 'heading',
        text: 'Protect Your Home from Future Storms'
      },
      {
        type: 'paragraph',
        text: "Metro Atlanta averages 50+ inches of rain per year, and severe storms are a regular occurrence. The best time to waterproof your basement is before the next big storm. Solutions like interior drainage systems, sump pump installation, and exterior waterproofing can protect your home for decades. At Reliable Solutions Atlanta, we offer free inspections to identify your home's vulnerabilities and recommend the most effective, cost-efficient solutions. Don't wait for the next flood—call us today."
      },
    ],
  },
  'basement-waterproofing-cost-atlanta': {
    title: 'How Much Does Basement Waterproofing Cost in Atlanta?',
    description: 'Get realistic pricing for basement waterproofing in Metro Atlanta. We break down costs by solution type so you can budget with confidence.',
    date: 'January 18, 2026',
    readTime: '7 min read',
    category: 'Basement Waterproofing',
    content: [
      {
        type: 'lead',
        text: "If you're dealing with a wet basement in Metro Atlanta, one of your first questions is probably \"how much will this cost to fix?\" The honest answer is: it depends. Basement waterproofing costs range from a few hundred dollars for minor repairs to $15,000 or more for comprehensive systems. Here's what drives those costs and what you can expect to pay in the Atlanta market."
      },
      {
        type: 'heading',
        text: 'Factors That Affect Waterproofing Costs'
      },
      {
        type: 'paragraph',
        text: "Every basement is different, and several factors influence the final price. The size of your basement matters—larger spaces require more materials and labor. The severity of your water problem plays a major role; minor seepage is far less expensive to address than active flooding. The type of solution needed depends on whether water is coming through walls, the floor, or both. Foundation condition affects cost if cracks need repair before waterproofing. Finally, accessibility impacts labor costs if your basement has limited access points."
      },
      {
        type: 'heading',
        text: 'Interior Waterproofing Costs'
      },
      {
        type: 'paragraph',
        text: "Interior waterproofing addresses water that's already entered your basement. These solutions are generally less expensive than exterior methods and don't require excavation. Waterproof sealants and coatings typically run $500 to $1,500 for a standard basement. These work for minor dampness but won't stop active water intrusion. Interior drainage systems (French drains) cost $3,000 to $8,000 depending on basement size and complexity. These channel water to a sump pump for removal. Sump pump installation alone costs $800 to $2,500 including the pump, basin, and discharge line."
      },
      {
        type: 'heading',
        text: 'Exterior Waterproofing Costs'
      },
      {
        type: 'paragraph',
        text: "Exterior waterproofing stops water before it reaches your foundation walls. It's more expensive but provides the most comprehensive protection. Exterior drainage systems typically cost $8,000 to $15,000 or more. This involves excavating around your foundation, installing drainage tile, and applying waterproof membranes. Exterior waterproof coatings without full excavation run $3,000 to $6,000. Grading and drainage improvements can cost $1,000 to $5,000 depending on the scope of work needed."
      },
      {
        type: 'heading',
        text: 'Crack Repair Costs'
      },
      {
        type: 'paragraph',
        text: "Foundation cracks are a common entry point for water in Atlanta homes. Simple crack injection repairs cost $250 to $800 per crack using epoxy or polyurethane injection. This is often sufficient for minor, non-structural cracks. Structural crack repair requiring carbon fiber reinforcement or wall anchors costs $1,000 to $3,000 per crack. If you have multiple cracks or signs of foundation movement, a full structural assessment is recommended."
      },
      {
        type: 'heading',
        text: 'Why Atlanta Waterproofing Costs Vary'
      },
      {
        type: 'paragraph',
        text: "Metro Atlanta presents unique challenges that can affect waterproofing costs. Georgia's red clay soil holds water and creates hydrostatic pressure against foundations—this often requires more robust drainage solutions. Older homes in neighborhoods like Decatur, East Atlanta, and Grant Park may have stone or block foundations that need specialized approaches. Homes on slopes, common in areas like Buckhead, Brookhaven, and North Fulton, face different drainage challenges than homes on flat lots."
      },
      {
        type: 'heading',
        text: 'Getting the Best Value'
      },
      {
        type: 'paragraph',
        text: "The cheapest quote isn't always the best value. When comparing waterproofing contractors, look for companies that offer free inspections and detailed written estimates, clearly explain what's causing your water problems, provide warranties on both materials and labor, have verifiable reviews and references in Metro Atlanta, and are licensed and insured to work in Georgia. Be wary of contractors who quote over the phone without seeing your basement, push for immediate decisions, or offer prices significantly below other estimates."
      },
      {
        type: 'heading',
        text: 'Is Waterproofing Worth the Investment?'
      },
      {
        type: 'paragraph',
        text: "Consider the alternative costs of not waterproofing. Water damage repairs can easily exceed $10,000 for serious flooding. Mold remediation typically costs $1,500 to $9,000. A wet basement can reduce your home's value by 10-25%. Health issues from mold exposure create ongoing medical costs. In most cases, proactive waterproofing costs less than dealing with repeated water damage."
      },
      {
        type: 'heading',
        text: 'Get a Free Estimate'
      },
      {
        type: 'paragraph',
        text: "The only way to know exactly what your basement needs—and what it will cost—is a professional inspection. At Reliable Solutions Atlanta, we provide free, no-obligation inspections and detailed estimates. We'll identify the source of your water problems, explain your options, and give you honest pricing so you can make an informed decision. Contact us today to schedule your free inspection."
      },
    ],
  },
  'french-drain-installation-atlanta-guide': {
    title: 'French Drain Installation: The Atlanta Homeowner\'s Complete Guide',
    description: 'French drains are one of the most effective solutions for Georgia\'s drainage problems. Learn how they work and whether your home needs one.',
    date: 'January 16, 2026',
    readTime: '6 min read',
    category: 'Drainage Solutions',
    content: [
      {
        type: 'lead',
        text: "French drains have been solving drainage problems for over 150 years, and they remain one of the most effective ways to manage water around your home. For Atlanta homeowners dealing with Georgia's heavy rainfall and clay soil, a properly installed French drain can mean the difference between a dry basement and costly water damage."
      },
      {
        type: 'heading',
        text: 'What Is a French Drain?'
      },
      {
        type: 'paragraph',
        text: "A French drain is a simple but effective drainage system. It consists of a perforated pipe surrounded by gravel, installed in a trench that slopes away from your home. Water naturally flows downhill and into the gravel, where it enters the perforated pipe and is carried away from your foundation. French drains can be installed around the exterior of your home, inside your basement along the perimeter, or in your yard to address surface water issues."
      },
      {
        type: 'heading',
        text: 'Signs You Need a French Drain'
      },
      {
        type: 'paragraph',
        text: "Several warning signs indicate a French drain could benefit your property. Standing water in your yard after rain suggests poor natural drainage. Water pooling against your foundation puts your basement at risk. Soggy, muddy areas that never seem to dry out indicate trapped groundwater. Water stains or dampness on basement walls show water is reaching your foundation. A musty smell in your basement or crawl space signals moisture intrusion. If you're experiencing any of these issues, a French drain may be the solution."
      },
      {
        type: 'heading',
        text: 'Interior vs. Exterior French Drains'
      },
      {
        type: 'paragraph',
        text: "Interior French drains are installed inside your basement, typically along the perimeter where the floor meets the walls. They collect water that seeps through the foundation and channel it to a sump pump for removal. Interior drains are less disruptive to install since they don't require excavating around your home. Exterior French drains are installed outside, around the foundation perimeter. They intercept groundwater before it reaches your foundation walls. While more expensive due to excavation costs, exterior drains provide the most complete protection by stopping water at the source."
      },
      {
        type: 'heading',
        text: 'Why French Drains Work Well in Atlanta'
      },
      {
        type: 'paragraph',
        text: "Metro Atlanta's conditions make French drains particularly effective. Georgia's red clay soil has poor natural drainage—water tends to sit rather than percolate down. This creates hydrostatic pressure that pushes water against your foundation. French drains provide an escape route for this trapped water. Atlanta's annual rainfall of 50+ inches means your drainage system works hard. A properly designed French drain handles even heavy storm runoff. The sloped terrain common in areas like Buckhead, Sandy Springs, and East Cobb creates natural water flow that French drains can redirect away from homes."
      },
      {
        type: 'heading',
        text: 'The Installation Process'
      },
      {
        type: 'paragraph',
        text: "Professional French drain installation follows a specific process. First, the area is assessed to determine optimal drain placement and slope. For exterior drains, a trench is excavated along the foundation—typically 18 to 24 inches wide and deep enough to reach the footer. Landscape fabric lines the trench to prevent soil from clogging the system. A layer of gravel is added, followed by the perforated drain pipe positioned with holes facing down. More gravel covers the pipe, and the trench is backfilled. For interior drains, concrete along the basement perimeter is removed, the drain system installed, and new concrete poured over it."
      },
      {
        type: 'heading',
        text: 'French Drain Costs in Atlanta'
      },
      {
        type: 'paragraph',
        text: "Interior French drains in Metro Atlanta typically cost $3,000 to $8,000 depending on basement size and whether a new sump pump is needed. Exterior French drains cost more—usually $4,000 to $12,000—due to excavation requirements. Yard drainage systems to address surface water generally run $1,500 to $5,000. While these aren't small investments, they're significantly less than the cost of repeated water damage, mold remediation, and foundation repairs."
      },
      {
        type: 'heading',
        text: 'Maintenance and Longevity'
      },
      {
        type: 'paragraph',
        text: "A properly installed French drain can last 30 to 40 years with minimal maintenance. To maximize lifespan, keep gutters and downspouts clear so they don't overwhelm the system. Avoid planting trees or shrubs with aggressive root systems near the drain line. Periodically check any visible cleanout points for debris. If you have a sump pump as part of the system, test it annually and consider a battery backup for power outages during storms."
      },
      {
        type: 'heading',
        text: 'Get Expert Installation'
      },
      {
        type: 'paragraph',
        text: "French drain installation requires proper planning, correct slope calculations, and quality materials to be effective long-term. Poor installation can actually make drainage problems worse by directing water toward your foundation instead of away from it. At Reliable Solutions Atlanta, we've installed hundreds of French drain systems throughout Metro Atlanta. We understand the unique challenges of Georgia's soil and climate. Contact us for a free inspection and estimate—we'll assess your property's drainage issues and recommend the most effective solution."
      },
    ],
  },
  'signs-you-need-basement-waterproofing': {
    title: '7 Warning Signs You Need Basement Waterproofing',
    description: 'Discover the telltale signs that your Atlanta home needs basement waterproofing before minor issues become major problems.',
    date: 'January 15, 2026',
    readTime: '5 min read',
    category: 'Basement Waterproofing',
    content: [
      {
        type: 'lead',
        text: "Water damage in your basement can lead to structural issues, mold growth, and thousands of dollars in repairs. The good news? Most basement water problems give warning signs before they become disasters. Here are 7 signs every Atlanta homeowner should watch for."
      },
      {
        type: 'heading',
        text: '1. Musty or Moldy Odors'
      },
      {
        type: 'paragraph',
        text: "If your basement smells damp, musty, or earthy, you likely have moisture problems. Mold and mildew thrive in humid environments and produce distinct odors that shouldn't be ignored. Even if you can't see visible mold, the smell indicates excess moisture that needs to be addressed."
      },
      {
        type: 'heading',
        text: '2. Visible Water Stains or Discoloration'
      },
      {
        type: 'paragraph',
        text: 'Water stains on basement walls or floors are obvious signs of water intrusion. Look for white, chalky deposits (efflorescence) on concrete walls, yellow or brown stains along walls, dark patches on the floor, and tide marks showing water levels. These stains indicate that water has been entering your basement, even if it\'s currently dry.'
      },
      {
        type: 'heading',
        text: '3. Cracks in Walls or Floor'
      },
      {
        type: 'paragraph',
        text: 'While small hairline cracks are normal in concrete, larger cracks or cracks that seem to be growing are cause for concern. Horizontal cracks in basement walls are particularly serious, as they indicate hydrostatic pressure from water-saturated soil pushing against your foundation.'
      },
      {
        type: 'heading',
        text: '4. Peeling Paint or Bubbling Wallpaper'
      },
      {
        type: 'paragraph',
        text: 'If paint is peeling or wallpaper is bubbling in your basement, moisture is likely the culprit. Water seeping through walls pushes paint and wallpaper away from the surface. This is often one of the first visible signs of a waterproofing problem.'
      },
      {
        type: 'heading',
        text: '5. Wet or Damp Spots After Rain'
      },
      {
        type: 'paragraph',
        text: "Do you notice wet spots on your basement floor or walls after heavy rain? This is a clear sign that water is finding its way into your basement. In Metro Atlanta, our frequent heavy rainstorms can quickly reveal waterproofing weaknesses."
      },
      {
        type: 'heading',
        text: '6. Rust on Metal Items'
      },
      {
        type: 'paragraph',
        text: 'Rust on appliances, support columns, or other metal items in your basement indicates high humidity levels. Even without visible water, excessive moisture in the air can cause rust and corrosion over time.'
      },
      {
        type: 'heading',
        text: '7. Increased Allergy Symptoms'
      },
      {
        type: 'paragraph',
        text: "If family members experience worse allergy symptoms when spending time in or near the basement, mold or mildew may be present. Mold spores can trigger respiratory issues, and a damp basement can significantly impact your home's air quality."
      },
      {
        type: 'heading',
        text: 'What to Do If You Notice These Signs'
      },
      {
        type: 'paragraph',
        text: "If you've noticed any of these warning signs, don't wait for the problem to get worse. Water damage compounds over time, and what starts as a minor moisture issue can become a major structural problem. At Reliable Solutions Atlanta, we offer free basement inspections to identify the source of your water problems and recommend the most effective solution."
      },
    ],
  },
  'crawl-space-encapsulation-vs-waterproofing': {
    title: 'Crawl Space Encapsulation vs Waterproofing: Which Do You Need?',
    description: 'Understanding the difference between encapsulation and waterproofing can save you thousands. Learn which solution is right for your home.',
    date: 'January 10, 2026',
    readTime: '6 min read',
    category: 'Crawl Space',
    content: [
      {
        type: 'lead',
        text: "When dealing with crawl space moisture problems, homeowners often hear about two solutions: encapsulation and waterproofing. While both address moisture issues, they're not the same thing. Understanding the difference can help you choose the right solution and avoid wasting money on the wrong fix."
      },
      {
        type: 'heading',
        text: 'What Is Crawl Space Waterproofing?'
      },
      {
        type: 'paragraph',
        text: "Crawl space waterproofing focuses on managing water that enters your crawl space. It typically involves interior drainage systems (French drains installed along the perimeter to collect and redirect water), sump pumps that remove collected water, and exterior waterproofing membranes or coatings applied to foundation walls. Waterproofing is reactive—it deals with water that's already trying to enter your crawl space."
      },
      {
        type: 'heading',
        text: 'What Is Crawl Space Encapsulation?'
      },
      {
        type: 'paragraph',
        text: "Encapsulation is a more comprehensive approach that seals your crawl space from the outside environment. A full encapsulation system includes a heavy-duty vapor barrier (typically 12-20 mil) covering the floor and walls, sealed vents to close off exterior vents that allow humid air to enter, a commercial-grade dehumidifier to control humidity levels, and often insulation added to walls for energy efficiency. Encapsulation is proactive—it prevents moisture from entering in the first place."
      },
      {
        type: 'heading',
        text: 'When Do You Need Waterproofing?'
      },
      {
        type: 'paragraph',
        text: "Waterproofing is the right choice when you have active water intrusion: standing water in your crawl space after rain, water seeping through foundation walls, high water table issues, or poor exterior drainage directing water toward your foundation. If water is physically entering your crawl space, you need to address the water source before (or along with) encapsulation."
      },
      {
        type: 'heading',
        text: 'When Do You Need Encapsulation?'
      },
      {
        type: 'paragraph',
        text: "Encapsulation is ideal when moisture and humidity are your main concerns: high humidity levels (above 60%), musty odors in your home, mold or mildew growth, condensation on pipes or ductwork, sagging or soft floors above the crawl space, or pest infestations attracted to moisture."
      },
      {
        type: 'heading',
        text: 'Why Atlanta Homes Often Need Both'
      },
      {
        type: 'paragraph',
        text: "Georgia's climate creates a perfect storm for crawl space problems. Atlanta averages 50+ inches of rain per year, summer humidity regularly exceeds 70%, and Georgia's red clay doesn't drain well, holding water against foundations. Many Atlanta homes benefit from a combined approach: waterproofing to manage water intrusion, plus encapsulation to control humidity and create a healthier crawl space environment."
      },
      {
        type: 'heading',
        text: 'The Bottom Line'
      },
      {
        type: 'paragraph',
        text: "The right solution depends on your specific situation. Waterproofing addresses water intrusion, while encapsulation controls humidity and seals out moisture. Many homes need both for complete protection. The best way to know what your home needs is a professional inspection. At Reliable Solutions Atlanta, we'll assess your crawl space, identify the source of your moisture problems, and recommend the most cost-effective solution for your situation."
      },
    ],
  },
  'why-atlanta-homes-have-foundation-problems': {
    title: 'Why Atlanta Homes Are Prone to Foundation Problems',
    description: "Georgia's red clay soil creates unique challenges for homeowners. Learn why foundation issues are common in Metro Atlanta and how to prevent them.",
    date: 'January 5, 2026',
    readTime: '7 min read',
    category: 'Foundation Repair',
    content: [
      {
        type: 'lead',
        text: "If you've lived in Metro Atlanta for any length of time, you've probably heard about foundation problems. From Lawrenceville to Marietta, Stone Mountain to Alpharetta, foundation issues affect homes throughout the region. But why is Atlanta such a hotspot for foundation problems? The answer lies beneath your feet."
      },
      {
        type: 'heading',
        text: 'The Georgia Red Clay Problem'
      },
      {
        type: 'paragraph',
        text: "Georgia is famous for its red clay soil, and while it gives our state its distinctive color, it creates major challenges for home foundations. Red clay is an \"expansive\" soil, meaning it dramatically changes volume based on moisture content. When wet, clay absorbs water and expands, pushing against your foundation. When dry, clay shrinks and pulls away, leaving gaps under your foundation. This constant expansion and contraction cycle puts tremendous stress on foundations, causing cracks, settling, and structural damage over time."
      },
      {
        type: 'heading',
        text: "Atlanta's Climate Makes It Worse"
      },
      {
        type: 'paragraph',
        text: "Our local climate compounds the clay soil problem. Atlanta receives over 50 inches of rain annually, saturating clay soil repeatedly. Summer heat dries out soil quickly, causing rapid shrinkage. The dramatic shift between wet springs and dry summers creates constant soil movement. This weather pattern means your foundation experiences the expansion/contraction cycle multiple times per year, every year."
      },
      {
        type: 'heading',
        text: 'Common Foundation Problems in Atlanta Homes'
      },
      {
        type: 'paragraph',
        text: "Foundation settling occurs when clay soil shrinks during dry periods, creating voids under your foundation. Without proper support, sections of your foundation settle unevenly, causing sloping floors, doors and windows that stick, cracks in drywall, and gaps between walls and ceiling. Foundation cracks from the pressure of expanding soil include vertical cracks (often from settling), horizontal cracks (caused by hydrostatic pressure, more serious), and stair-step cracks in brick or block foundations indicating significant movement."
      },
      {
        type: 'heading',
        text: 'Which Atlanta Areas Are Most Affected?'
      },
      {
        type: 'paragraph',
        text: "While foundation problems occur throughout Metro Atlanta, some areas are particularly prone due to soil composition and topography. These include Gwinnett County (Lawrenceville, Lilburn, Stone Mountain), DeKalb County (Decatur, Tucker, Brookhaven), Cobb County (Marietta, Smyrna, Kennesaw), and North Fulton (Alpharetta, Roswell, Johns Creek). Homes built on slopes or in areas with high water tables face additional risk."
      },
      {
        type: 'heading',
        text: 'How to Protect Your Atlanta Home'
      },
      {
        type: 'paragraph',
        text: "Maintain consistent soil moisture by watering the soil around your foundation during dry periods. Improve drainage by cleaning gutters regularly, extending downspouts at least 6 feet from your foundation, and grading your yard so water flows away from your home. Most importantly, address problems early—foundation problems only get worse (and more expensive) over time. If you notice warning signs like cracks, sticking doors, or uneven floors, get a professional inspection promptly."
      },
      {
        type: 'heading',
        text: "Don't Wait Until It's Too Late"
      },
      {
        type: 'paragraph',
        text: "Foundation repairs are an investment, but they're far less expensive than the alternative. Ignoring foundation problems can lead to major structural damage, decreased home value, and safety hazards. At Reliable Solutions Atlanta, we've been repairing foundations throughout Metro Atlanta for over 20 years. We understand the unique challenges that Georgia's soil and climate create, and we use proven techniques to permanently stabilize your foundation. Contact us for a free inspection and estimate."
      },
    ],
  },
}

// Export blogPosts for use in other files
export { blogPosts }

export async function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({
    slug: slug,
  }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const post = blogPosts[slug]
  
  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
    },
  }
}

export default async function BlogPost({ params }) {
  const { slug } = await params
  const post = blogPosts[slug]

  if (!post) {
    notFound()
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      '@type': 'Organization',
      name: 'Reliable Solutions Atlanta',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Reliable Solutions Atlanta',
      url: 'https://www.waterhelpme.com',
    },
  }

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Header />

      {/* Hero Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-[#115997] hover:text-[#273373] transition-colors mb-8"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            Back to Blog
          </Link>
          
          <div className="max-w-3xl">
            <span className="inline-block text-[#115997] text-sm font-semibold mb-4">
              {post.category}
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#273373] font-display mb-6">
              {post.title}
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-[#115997] to-[#84d2f2] rounded-full mb-6"></div>
            <div className="flex items-center text-gray-500">
              <span>{post.date}</span>
              <span className="mx-3">•</span>
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="pb-16 md:pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            {post.content.map((block, index) => {
              if (block.type === 'lead') {
                return (
                  <p key={index} className="text-xl text-gray-700 leading-relaxed mb-8 font-medium">
                    {block.text}
                  </p>
                )
              }
              if (block.type === 'heading') {
                return (
                  <h2 key={index} className="text-2xl md:text-3xl font-bold text-[#273373] font-display mt-10 mb-4">
                    {block.text}
                  </h2>
                )
              }
              if (block.type === 'paragraph') {
                return (
                  <p key={index} className="text-gray-700 text-lg leading-relaxed mb-6">
                    {block.text}
                  </p>
                )
              }
              return null
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#273373] font-display mb-4">
              Need Help With Your Home?
            </h2>
            <div className="w-24 h-1 bg-[#115997] mx-auto rounded-full mb-6"></div>
            <p className="text-gray-700 text-lg mb-8 max-w-2xl mx-auto">
              Our experts are ready to inspect your home and provide a free estimate. Don't let water damage get worse.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:770-895-2039"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#115997] text-white rounded-lg font-semibold hover:bg-[#273373] transition-all duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call 770-895-2039
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-[#115997] text-[#115997] rounded-lg font-semibold hover:bg-[#115997] hover:text-white transition-all duration-200"
              >
                Request Free Estimate
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#273373] font-display mb-4">
              Related Articles
            </h2>
            <div className="w-24 h-1 bg-[#115997] mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {Object.entries(blogPosts)
              .filter(([postSlug]) => postSlug !== slug)
              .slice(0, 3)
              .map(([postSlug, relatedPost]) => (
                <Link
                  key={postSlug}
                  href={`/blog/${postSlug}`}
                  className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group"
                >
                  <span className="text-sm text-[#115997] font-semibold">
                    {relatedPost.category}
                  </span>
                  <h3 className="text-lg font-bold text-[#273373] mt-2 group-hover:text-[#115997] transition-colors">
                    {relatedPost.title}
                  </h3>
                  <span className="inline-flex items-center gap-2 text-[#115997] font-semibold mt-4 group-hover:gap-3 transition-all text-sm">
                    Read More
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* Quick & Reliable CTA */}
      <section className="py-12 bg-[#115997]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white font-display italic">
                Quick & Reliable
              </h2>
              <p className="text-white/80 mt-1">We are available via email or phone</p>
            </div>
            <a 
              href="tel:770-895-2039"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#84d2f2] text-[#273373] rounded-lg font-semibold hover:bg-white transition-all duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call us 770-895-2039
            </a>
          </div>
        </div>
      </section>

      {/* Contact Info Bar */}
      <section className="py-8 bg-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div>
                <h4 className="text-white font-semibold">Location</h4>
                <p className="text-gray-400">Atlanta, GA</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <div>
                <h4 className="text-white font-semibold">Email</h4>
                <a href="mailto:rsolrepair@gmail.com" className="text-gray-400 hover:text-[#84d2f2]">rsolrepair@gmail.com</a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <div>
                <h4 className="text-white font-semibold">Call or Text</h4>
                <a href="tel:770-895-2039" className="text-gray-400 hover:text-[#84d2f2]">770-895-2039</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
