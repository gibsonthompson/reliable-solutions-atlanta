import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Link from 'next/link'
import { notFound } from 'next/navigation'

// Blog post content
const blogPosts = {
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

export async function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({
    slug: slug,
  }))
}

export async function generateMetadata({ params }) {
  const post = blogPosts[params.slug]
  
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

export default function BlogPost({ params }) {
  const post = blogPosts[params.slug]

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
              .filter(([slug]) => slug !== params.slug)
              .map(([slug, relatedPost]) => (
                <Link
                  key={slug}
                  href={`/blog/${slug}`}
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