// app/blog/[slug]/generated-post.js
//
// Helper component for rendering blog-farm generated posts.
// Called by the main [slug]/page.js when a slug doesn't exist in blogPosts.

import { createClient } from '@supabase/supabase-js'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Link from 'next/link'
import './generated-post.css'

const blogSupabase = createClient(
  process.env.BLOG_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.BLOG_SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY
)

const CATEGORY_LABELS = {
  'foundation-repair': 'Foundation Repair',
  'basement-waterproofing': 'Basement Waterproofing',
  'crawl-space': 'Crawl Space',
  'drainage': 'Drainage',
  'concrete-repair': 'Concrete Repair',
  'water-damage': 'Water Damage',
  'guide': 'Guide',
}

export async function getGeneratedPost(slug) {
  try {
    const { data: biz } = await blogSupabase
      .from('blog_businesses').select('id').eq('slug', 'rsa').single()
    if (!biz) return null

    const { data: post } = await blogSupabase
      .from('blog_generated_posts')
      .select('title, slug, html_content, meta_description, primary_keyword, secondary_keywords, category, publish_date, read_time, word_count, excerpt')
      .eq('business_id', biz.id)
      .eq('slug', slug)
      .eq('status', 'published')
      .single()

    return post
  } catch {
    return null
  }
}

export async function getGeneratedPostSlugs() {
  try {
    const { data: biz } = await blogSupabase
      .from('blog_businesses').select('id').eq('slug', 'rsa').single()
    if (!biz) return []

    const { data: posts } = await blogSupabase
      .from('blog_generated_posts')
      .select('slug')
      .eq('business_id', biz.id)
      .eq('status', 'published')

    return (posts || []).map(p => p.slug)
  } catch {
    return []
  }
}

export async function getGeneratedPostsForIndex() {
  try {
    const { data: biz } = await blogSupabase
      .from('blog_businesses').select('id').eq('slug', 'rsa').single()
    if (!biz) return []

    const { data: posts } = await blogSupabase
      .from('blog_generated_posts')
      .select('slug, title, meta_description, category, publish_date, read_time, word_count')
      .eq('business_id', biz.id)
      .eq('status', 'published')
      .order('publish_date', { ascending: false })

    const CATEGORY_IMAGE_POOLS = {
      'foundation-repair': [
        '/images/foundation-repair-atlanta.png',
        '/images/portfolio/foundation-repair-crew-working-atlanta.png',
        '/images/portfolio/foundation-excavation-crew.png',
        '/images/waterproofing-truck-atlanta-job-site.png',
      ],
      'basement-waterproofing': [
        '/images/portfolio/basement-waterproofing-interior.png',
        '/images/portfolio/exterior-waterproofing-membrane.png',
        '/images/waterproofing-truck-atlanta-job-site.png',
      ],
      'crawl-space': [
        '/images/portfolio/crawl-space-encapsulation-vapor-barrier.png',
        '/images/portfolio/crawl-space-mold-remediation.png',
        '/images/portfolio/basement-waterproofing-interior.png',
      ],
      'drainage': [
        '/images/portfolio/french-drain-pipe-installation.png',
        '/images/portfolio/drainage-gravel-install-brick-home.png',
        '/images/portfolio/exterior-waterproofing-membrane.png',
      ],
      'concrete-repair': [
        '/images/portfolio/concrete-pad-finishing.png',
        '/images/portfolio/foundation-excavation-crew.png',
        '/images/portfolio/foundation-repair-crew-working-atlanta.png',
      ],
      'water-damage': [
        '/images/portfolio/exterior-waterproofing-membrane.png',
        '/images/portfolio/basement-waterproofing-interior.png',
        '/images/waterproofing-truck-atlanta-job-site.png',
      ],
    }

    const ALL_IMAGES = [
      '/images/foundation-repair-atlanta.png',
      '/images/portfolio/foundation-repair-crew-working-atlanta.png',
      '/images/portfolio/foundation-excavation-crew.png',
      '/images/portfolio/basement-waterproofing-interior.png',
      '/images/portfolio/exterior-waterproofing-membrane.png',
      '/images/portfolio/crawl-space-encapsulation-vapor-barrier.png',
      '/images/portfolio/french-drain-pipe-installation.png',
      '/images/portfolio/concrete-pad-finishing.png',
      '/images/waterproofing-truck-atlanta-job-site.png',
    ]

    // Pick a deterministic image based on slug hash so same post always gets same image
    function pickImage(slug, category) {
      const pool = CATEGORY_IMAGE_POOLS[category] || ALL_IMAGES
      let hash = 0
      for (let i = 0; i < slug.length; i++) {
        hash = ((hash << 5) - hash) + slug.charCodeAt(i)
        hash |= 0
      }
      return pool[Math.abs(hash) % pool.length]
    }

    return (posts || []).map(p => ({
      slug: p.slug,
      title: p.title,
      excerpt: p.meta_description || '',
      category: CATEGORY_LABELS[p.category] || p.category || 'Guide',
      date: p.publish_date
        ? new Date(p.publish_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
        : 'April 2026',
      readTime: p.read_time || `${Math.ceil((p.word_count || 2000) / 200)} min read`,
      image: pickImage(p.slug, p.category),
      generated: true,
    }))
  } catch {
    return []
  }
}

export function GeneratedPostPage({ post }) {
  const category = CATEGORY_LABELS[post.category] || post.category || 'Guide'
  const publishDate = post.publish_date
    ? new Date(post.publish_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

  // Extract FAQ items for schema
  const faqItems = []
  const patterns = [
    /<(?:h3|h4|button)[^>]*class="faq-question"[^>]*>([\s\S]*?)<\/(?:h3|h4|button)>[\s\S]*?<(?:p|div)[^>]*class="faq-answer[^"]*"[^>]*>([\s\S]*?)<\/(?:p|div)>/gi,
    /<div[^>]*class="faq-item"[^>]*>[\s\S]*?<(?:h3|strong)[^>]*>([\s\S]*?)<\/(?:h3|strong)>\s*<p[^>]*>([\s\S]*?)<\/p>/gi,
  ]
  for (const regex of patterns) {
    let m
    while ((m = regex.exec(post.html_content)) !== null) {
      const q = m[1].replace(/<[^>]*>/g, '').trim()
      const a = m[2].replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
      if (q && a) faqItems.push({ question: q, answer: a })
    }
    if (faqItems.length > 0) break
  }

  const schemaGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: post.title,
        description: post.meta_description || post.title,
        datePublished: post.publish_date || new Date().toISOString().split('T')[0],
        dateModified: post.publish_date || new Date().toISOString().split('T')[0],
        author: { '@id': 'https://www.waterhelpme.com/#organization' },
        publisher: { '@id': 'https://www.waterhelpme.com/#organization' },
        mainEntityOfPage: `https://www.waterhelpme.com/blog/${post.slug}`,
        wordCount: post.word_count || undefined,
      },
      {
        '@type': 'Organization',
        '@id': 'https://www.waterhelpme.com/#organization',
        name: 'Reliable Solutions Atlanta',
        url: 'https://www.waterhelpme.com',
        description: "Atlanta's Trusted Waterproofing & Foundation Experts",
        foundingDate: '2015',
        telephone: '770-895-2039',
        email: 'rsolrepair@gmail.com',
        areaServed: { '@type': 'State', name: 'Georgia' },
        knowsAbout: ['basement waterproofing', 'foundation repair', 'crawl space encapsulation', 'French drain installation', 'concrete leveling', 'mold remediation'],
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.waterhelpme.com' },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.waterhelpme.com/blog' },
          { '@type': 'ListItem', position: 3, name: post.title },
        ],
      },
      ...(faqItems.length > 0 ? [{
        '@type': 'FAQPage',
        mainEntity: faqItems.map(faq => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      }] : []),
    ],
  }

  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }} />
      <Header />

      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/blog" className="inline-flex items-center gap-2 text-[#115997] hover:text-[#273373] transition-colors mb-8">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            Back to Blog
          </Link>
          <div className="max-w-3xl">
            <span className="inline-block text-[#115997] text-sm font-semibold mb-4">{category}</span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#273373] font-display mb-6">{post.title}</h1>
            <div className="w-24 h-1 bg-gradient-to-r from-[#115997] to-[#84d2f2] rounded-full mb-6"></div>
            <div className="flex items-center text-gray-500">
              <span>{publishDate}</span>
              <span className="mx-3">&bull;</span>
              <span>{post.read_time || `${Math.ceil((post.word_count || 2000) / 200)} min read`}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16 md:pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl generated-article">
            <div className="article-content" dangerouslySetInnerHTML={{ __html: post.html_content }} />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#273373] font-display mb-4">Need Help With Your Home?</h2>
            <div className="w-24 h-1 bg-[#115997] mx-auto rounded-full mb-6"></div>
            <p className="text-gray-700 text-lg mb-8 max-w-2xl mx-auto">Our experts are ready to inspect your home and provide a free estimate. Don&apos;t let water damage get worse.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:770-895-2039" className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#115997] text-white rounded-lg font-semibold hover:bg-[#273373] transition-all duration-200">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                Call 770-895-2039
              </a>
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-[#115997] text-[#115997] rounded-lg font-semibold hover:bg-[#115997] hover:text-white transition-all duration-200">
                Request Free Estimate
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-[#115997]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white font-display italic">Quick & Reliable</h2>
              <p className="text-white/80 mt-1">We are available via email or phone</p>
            </div>
            <a href="tel:770-895-2039" className="inline-flex items-center gap-3 px-8 py-4 bg-[#84d2f2] text-[#273373] rounded-lg font-semibold hover:bg-white transition-all duration-200">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              Call us 770-895-2039
            </a>
          </div>
        </div>
      </section>

      <section className="py-8 bg-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              <div><h4 className="text-white font-semibold">Location</h4><p className="text-gray-400">Atlanta, GA</p></div>
            </div>
            <div className="flex items-center gap-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              <div><h4 className="text-white font-semibold">Email</h4><a href="mailto:rsolrepair@gmail.com" className="text-gray-400 hover:text-[#84d2f2]">rsolrepair@gmail.com</a></div>
            </div>
            <div className="flex items-center gap-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              <div><h4 className="text-white font-semibold">Call or Text</h4><a href="tel:770-895-2039" className="text-gray-400 hover:text-[#84d2f2]">770-895-2039</a></div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}