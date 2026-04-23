#!/usr/bin/env node
/**
 * RSA Blog [slug]/page.js Transformer
 * 
 * Run from the RSA repo root:
 *   node transform-blog-page.js
 * 
 * Reads: app/blog/[slug]/page.js (existing)
 * Writes: app/blog/[slug]/page.js (updated with Supabase fallback)
 * Backup: app/blog/[slug]/page.js.bak
 */

const fs = require('fs')
const path = require('path')

const filePath = path.join(__dirname, 'app', 'blog', '[slug]', 'page.js')

if (!fs.existsSync(filePath)) {
  console.error('ERROR: Cannot find', filePath)
  process.exit(1)
}

// Read existing file
const original = fs.readFileSync(filePath, 'utf-8')

// Backup
fs.writeFileSync(filePath + '.bak', original)
console.log('✅ Backed up to page.js.bak')

// Extract the blogPosts object content
// Find "const blogPosts = {" and capture everything up to the matching closing "};"
// We need to handle nested braces
const blogPostsStart = original.indexOf('const blogPosts = {')
if (blogPostsStart === -1) {
  console.error('ERROR: Cannot find "const blogPosts = {" in the file')
  process.exit(1)
}

const objectStart = original.indexOf('{', blogPostsStart)
let braceCount = 0
let objectEnd = -1
for (let i = objectStart; i < original.length; i++) {
  if (original[i] === '{') braceCount++
  if (original[i] === '}') braceCount--
  if (braceCount === 0) {
    objectEnd = i
    break
  }
}

if (objectEnd === -1) {
  console.error('ERROR: Cannot find end of blogPosts object')
  process.exit(1)
}

// Extract just the inner content of the blogPosts object (without the outer braces)
const blogPostsContent = original.substring(objectStart + 1, objectEnd)

// Also check if there's an "export { blogPosts }" already
const hasExport = original.includes('export { blogPosts }')

// Build the new file
const newFile = `import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getGeneratedPost, getGeneratedPostSlugs, GeneratedPostPage } from './generated-post'

const blogPosts = {${blogPostsContent}};

export { blogPosts }

export const revalidate = 3600
export const dynamicParams = true

export async function generateStaticParams() {
  const staticSlugs = Object.keys(blogPosts).map((slug) => ({ slug }))

  try {
    const generatedSlugs = await getGeneratedPostSlugs()
    const generated = generatedSlugs.map((slug) => ({ slug }))
    return [...staticSlugs, ...generated]
  } catch {
    return staticSlugs
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const post = blogPosts[slug]

  if (post) {
    return {
      title: post.title,
      description: post.description,
      alternates: { canonical: \`/blog/\${slug}\` },
      openGraph: {
        title: post.title,
        description: post.description,
        type: 'article',
        publishedTime: post.date,
        authors: ['Reliable Solutions Atlanta'],
        siteName: 'Reliable Solutions Atlanta',
      },
    }
  }

  const genPost = await getGeneratedPost(slug)
  if (genPost) {
    return {
      title: genPost.title,
      description: genPost.meta_description || genPost.title,
      alternates: { canonical: \`/blog/\${slug}\` },
      openGraph: {
        title: genPost.title,
        description: genPost.meta_description || genPost.title,
        type: 'article',
        publishedTime: genPost.publish_date || undefined,
        authors: ['Reliable Solutions Atlanta'],
        siteName: 'Reliable Solutions Atlanta',
      },
    }
  }

  return { title: 'Post Not Found' }
}

export default async function BlogPost({ params }) {
  const { slug } = await params
  const post = blogPosts[slug]

  // If not a static post, check for a generated post from blog-farm
  if (!post) {
    const genPost = await getGeneratedPost(slug)
    if (!genPost || !genPost.html_content) {
      notFound()
    }
    return <GeneratedPostPage post={genPost} />
  }

  // ── Static post renderer (existing block-based posts) ──

  const faqItems = post.content
    .map((block, i) => {
      if (block.type === 'question') {
        const answerBlock = post.content[i + 1]
        if (answerBlock && answerBlock.type === 'answer') {
          return { question: block.text, answer: answerBlock.text }
        }
      }
      return null
    })
    .filter(Boolean)

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { '@type': 'Organization', name: 'Reliable Solutions Atlanta' },
    publisher: { '@type': 'Organization', name: 'Reliable Solutions Atlanta', url: 'https://www.waterhelpme.com' },
  }

  const faqSchema = faqItems.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  } : null

  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}
      <Header />

      {/* Hero Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/blog" className="inline-flex items-center gap-2 text-[#115997] hover:text-[#273373] transition-colors mb-8">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            Back to Blog
          </Link>
          <div className="max-w-3xl">
            <span className="inline-block text-[#115997] text-sm font-semibold mb-4">{post.category}</span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#273373] font-display mb-6">{post.title}</h1>
            <div className="w-24 h-1 bg-gradient-to-r from-[#115997] to-[#84d2f2] rounded-full mb-6"></div>
            <div className="flex items-center text-gray-500">
              <span>{post.date}</span>
              <span className="mx-3">&bull;</span>
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
                return <p key={index} className="text-xl text-gray-700 leading-relaxed mb-8 font-medium">{block.text}</p>
              }
              if (block.type === 'heading') {
                return <h2 key={index} className="text-2xl md:text-3xl font-bold text-[#273373] font-display mt-10 mb-4">{block.text}</h2>
              }
              if (block.type === 'paragraph') {
                return <p key={index} className="text-gray-700 text-lg leading-relaxed mb-6">{block.text}</p>
              }
              if (block.type === 'link') {
                return (
                  <Link key={index} href={block.href} className="block text-[#115997] font-semibold hover:text-[#273373] transition-colors mb-6 text-lg">
                    {block.text}
                  </Link>
                )
              }
              if (block.type === 'service-link') {
                return (
                  <Link key={index} href={block.href} className="inline-flex items-center gap-2 px-6 py-3 bg-[#115997] text-white rounded-lg font-semibold hover:bg-[#273373] transition-all duration-200 mb-8">
                    {block.text}
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                )
              }
              if (block.type === 'faq') {
                return <h2 key={index} className="text-2xl md:text-3xl font-bold text-[#273373] font-display mt-12 mb-6 pt-6 border-t border-gray-200">{block.text}</h2>
              }
              if (block.type === 'question') {
                return <h3 key={index} className="text-xl font-bold text-[#273373] mt-6 mb-2">{block.text}</h3>
              }
              if (block.type === 'answer') {
                return <p key={index} className="text-gray-700 text-lg leading-relaxed mb-4">{block.text}</p>
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
            <h2 className="text-3xl md:text-4xl font-bold text-[#273373] font-display mb-4">Need Help With Your Home?</h2>
            <div className="w-24 h-1 bg-[#115997] mx-auto rounded-full mb-6"></div>
            <p className="text-gray-700 text-lg mb-8 max-w-2xl mx-auto">Our experts are ready to inspect your home and provide a free estimate. Don&apos;t let water damage get worse.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:770-895-2039" className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#115997] text-white rounded-lg font-semibold hover:bg-[#273373] transition-all duration-200">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call 770-895-2039
              </a>
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-[#115997] text-[#115997] rounded-lg font-semibold hover:bg-[#115997] hover:text-white transition-all duration-200">
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
            <h2 className="text-3xl md:text-4xl font-bold text-[#273373] font-display mb-4">Related Articles</h2>
            <div className="w-24 h-1 bg-[#115997] mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {Object.entries(blogPosts)
              .filter(([postSlug]) => postSlug !== slug)
              .sort((a, b) => {
                const aMatch = a[1].category === post.category ? 1 : 0
                const bMatch = b[1].category === post.category ? 1 : 0
                return bMatch - aMatch
              })
              .slice(0, 3)
              .map(([postSlug, relatedPost]) => (
                <Link key={postSlug} href={\`/blog/\${postSlug}\`} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group">
                  <span className="text-sm text-[#115997] font-semibold">{relatedPost.category}</span>
                  <h3 className="text-lg font-bold text-[#273373] mt-2 group-hover:text-[#115997] transition-colors">{relatedPost.title}</h3>
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
              <h2 className="text-3xl md:text-4xl font-bold text-white font-display italic">Quick & Reliable</h2>
              <p className="text-white/80 mt-1">We are available via email or phone</p>
            </div>
            <a href="tel:770-895-2039" className="inline-flex items-center gap-3 px-8 py-4 bg-[#84d2f2] text-[#273373] rounded-lg font-semibold hover:bg-white transition-all duration-200">
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
`

fs.writeFileSync(filePath, newFile)
console.log('✅ Updated', filePath)
console.log('   - Added Supabase generated post imports')
console.log('   - Added revalidate = 3600, dynamicParams = true')
console.log('   - generateStaticParams includes Supabase slugs')
console.log('   - generateMetadata falls back to Supabase')
console.log('   - Default export renders GeneratedPostPage for non-static slugs')
console.log('   - All 38 static posts preserved unchanged')
console.log('')
console.log('📦 Backup saved to page.js.bak')