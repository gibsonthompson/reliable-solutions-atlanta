'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import HomeQuoteForm from './components/HomeQuoteForm'
import Header from './components/Header'

export default function HomePageClient() {
  const [activeAccordion, setActiveAccordion] = useState(0)

  const services = [
    { name: 'Basement Waterproofing', href: '/basement-waterproofing' },
    { name: 'Crawl Space Encapsulation', href: '/crawl-space-encapsulation' },
    { name: 'Crawl Space Repair', href: '/crawl-space-repair' },
    { name: 'Crawl Space Waterproofing', href: '/crawl-space-waterproofing' },
    { name: 'Concrete Repair', href: '/cocnrete-repair' },
    { name: 'Drainage', href: '/drainage' },
    { name: 'Foundation Repair', href: '/foundation-repair' },
  ]

  const accordionItems = [
    { title: 'About Reliable Solutions Atlanta', content: 'Reliable Solutions Atlanta is a family owned and operated business, with over 20 years of experience in waterproofing and foundation repair. Founded in 2015, with many years of knowledge and experience as technicians, we wanted to bring to Metro Atlanta a reliable company that thrives on expert level repairs and customer satisfaction, offering an extensive warranty program unmatched in our industry.' },
    { title: 'Free Quote', content: 'Call to schedule a FREE quote for your next waterproofing or foundation repair project! Our experts will assess your property and provide a detailed estimate at no cost to you.' },
    { title: 'Competitive Pricing', content: 'Highest quality materials at affordable prices! We pride ourselves on providing the most cost-effective and noninvasive resolution to your problem.' }
  ]

  const financingPlans = [
    { id: '4158', title: 'No Interest if Paid in Full in 15 Months', subtitle: 'with Payments Required', details: 'Plan 4158. Rates range from 17.99% - 24.99% APR.' },
    { id: '4129', title: 'No Interest if Paid in Full in 12 Months', subtitle: 'with No Payments Required', details: 'Plan 4129. Fixed rate of 9.99% APR.' },
    { id: '4069', title: 'No Interest if Paid in Full in 6 Months', subtitle: 'with No Payments Required', details: 'Plan 4069. Fixed rate of 9.99% APR.' },
  ]

  const serviceCards = [
    { title: 'Basement Waterproofing', description: 'A common challenge that homeowners face is water in their basements. Not only is a wet basement a pain to clean up, but it can also ruin other parts of the room.', href: '/basement-waterproofing', image: '/images/portfolio/basement-waterproofing-interior.png' },
    { title: 'Crawl Space Encapsulation', description: "If your crawlspace is musty, smelly, or wet, you've got a leak somewhere. Often times, you will smell a leak long before you see it.", href: '/crawl-space-encapsulation', image: '/images/portfolio/crawl-space-encapsulation-vapor-barrier.png' },
    { title: 'Foundation Repair', description: 'The foundation of your building is, without a doubt, the most important part. Without a sturdy foundation, your home can be subject to catastrophic damage.', href: '/foundation-repair', image: '/images/excavator-foundation-work.png' },
    { title: 'Drainage', description: 'Poor drainage can destroy your home! It is very important that water can flow away from your structure to prevent basement flooding and foundation damage.', href: '/drainage', image: '/images/portfolio/drainage-crew-excavator.png' }
  ]

  // Add more testimonials here — same format: { name: '...', text: '...' }
  const testimonials = [
    { name: 'Torrey Williams', text: "I unexpectedly discovered standing water in a utility room of my finished basement. I called Reliable since they showed they are open 24 hrs. Alejandro (Alex) took my call right away and scheduled a time to come out the next day. The crew, led by Gabriel, were punctual, communicated clearly and took care of my home and yard as if it were their own. My basement is bone dry after a heavy rain!! I can't thank these guys enough." },
    { name: 'Jessica Y.', text: 'Reliable Solutions arrived on time and did a wonderful job installing downspouts around my house. They were professional, polite, and hard working. All questions were answered and detailed explanations were given. I would not hesitate to recommend Reliable Solutions for any waterproofing and/or drainage issues.' },
    { name: 'Felix F.', text: 'We highly recommend Reliable Solutions Atlanta. We are very pleased with how they handled our basement waterproofing job. From the initial consult to completion they were knowledgeable, efficient and very easy to work with. The crew worked quickly, efficiently and left everything clean and in order.' },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header activePage="home" />

      {/* Hero */}
      <section className="relative h-[450px] sm:h-[500px] md:h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/drainage-installation-atlanta-home.png" alt="Reliable Solutions Atlanta crew installing drainage system" fill className="object-cover object-center" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-[#273373]/90 via-[#273373]/70 to-[#273373]/40 md:to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight font-display">Atlanta&apos;s Trusted Waterproofing &amp; Foundation Experts</h1>
            <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 md:mb-8 leading-relaxed">Family owned with over 20 years of experience. We protect your home from water damage with permanent solutions.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="tel:770-895-2039" className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-lg bg-[#2692cc] text-white hover:bg-[#84d2f2] hover:text-[#273373] transition-all duration-200 w-full sm:w-auto">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                Get Free Estimate
              </a>
              <Link href="/our-services" className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-lg bg-white/10 text-white border-2 border-white/30 hover:bg-white hover:text-[#273373] transition-all duration-200 w-full sm:w-auto">View Services</Link>
            </div>
          </div>
        </div>
      </section>

      {/* About & Quote */}
      <section className="py-10 sm:py-14 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 md:mb-8 font-display">Why Choose Reliable Solutions?</h2>
              <div className="space-y-3">
                {accordionItems.map((item, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                    <button onClick={() => setActiveAccordion(activeAccordion === index ? -1 : index)} className="w-full flex items-center gap-4 p-5 text-left">
                      <div className="w-8 h-8 rounded-full bg-[#84d2f2] flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-[#115997]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      </div>
                      <span className="font-semibold text-lg text-gray-800 flex-grow">{item.title}</span>
                      <svg className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${activeAccordion === index ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ${activeAccordion === index ? 'max-h-48' : 'max-h-0'}`}>
                      <div className="px-5 pb-5"><p className="text-gray-600 leading-relaxed pl-12">{item.content}</p></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-[#273373] mb-6">Request a Free Quote</h3>
              <HomeQuoteForm services={services} />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-10 sm:py-14 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-3 md:mb-4 font-display">What Our Customers Say</h2>
            <div className="flex items-center justify-center gap-1.5 mb-3">
              {[...Array(5)].map((_, i) => (<svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>))}
              <span className="text-gray-500 text-sm ml-1">5.0 on Google</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (<svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>))}
                </div>
                <p className="text-gray-600 leading-relaxed text-sm mb-4 italic">&ldquo;{testimonial.text}&rdquo;</p>
                <p className="font-semibold text-[#273373] text-sm">— {testimonial.name}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <a href="https://www.google.com/search?q=(770)+895-2039#lrd=0x88f5bde216fbfbdf:0x8d3c5e27cda0c48b,1" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-[#273373] transition-colors text-sm font-medium">
              <svg className="w-4 h-4" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
              Read All Reviews on Google
            </a>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-3 md:mb-4 font-display">Our Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">We provide comprehensive waterproofing and foundation repair solutions for Metro Atlanta homeowners.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {serviceCards.map((service) => (
              <Link key={service.href} href={service.href} className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="relative h-48 overflow-hidden"><Image src={service.image} alt={service.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" /></div>
                <div className="p-5">
                  <h3 className="font-bold text-lg text-[#273373] mb-2 group-hover:text-[#115997] transition-colors">{service.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Financing — no Apply Now */}
      <section className="py-10 sm:py-14 md:py-16 bg-[#115997]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-10">
            <p className="text-white/80 text-xs sm:text-sm font-medium tracking-wider uppercase mb-3">Financing Options From</p>
            <div className="inline-block bg-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg shadow-lg">
              <span className="text-2xl sm:text-3xl font-bold text-green-500">Green</span>
              <span className="text-2xl sm:text-3xl font-bold text-blue-500">Sky</span>
              <span className="text-lg sm:text-xl align-top">®</span>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {financingPlans.map((plan) => (
              <div key={plan.id} className="bg-white rounded-xl p-6 shadow-lg">
                <h4 className="font-bold text-lg text-gray-800 mb-1">{plan.title}</h4>
                <p className="text-gray-600 text-sm mb-2">{plan.subtitle}</p>
                <p className="text-xs text-gray-500">{plan.details}</p>
              </div>
            ))}
          </div>
          <p className="text-white/60 text-xs text-center mt-8 max-w-3xl mx-auto">*Subject to credit approval. Loans provided by Synovus Bank, Member FDIC. GreenSky® is a registered trademark of GreenSky, LLC. Ask about financing when you schedule your free estimate.</p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-16 md:py-20 bg-[#273373]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 font-display">Ready to Protect Your Home?</h2>
              <p className="text-white/80 mb-6 leading-relaxed">Whether it&apos;s a wet basement, a crumbling foundation, or a crawl space that needs attention — we&apos;ve seen it all. Tell us what&apos;s going on and we&apos;ll schedule a free inspection at your property. No pressure, no obligation.</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-6 py-4 text-lg font-semibold rounded-lg bg-[#2692cc] text-white hover:bg-[#84d2f2] hover:text-[#273373] transition-all duration-200 w-full sm:w-auto">
                  Request Free Estimate
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
                <a href="tel:770-895-2039" className="inline-flex items-center justify-center gap-2 px-6 py-4 text-lg font-semibold rounded-lg bg-white/10 text-white border-2 border-white/30 hover:bg-white hover:text-[#273373] transition-all duration-200 w-full sm:w-auto">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  770-895-2039
                </a>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="w-14 h-14 rounded-full bg-[#115997] flex items-center justify-center mx-auto mb-3"><svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></div>
                <p className="text-white font-semibold text-sm">Free Inspections</p>
                <p className="text-white/50 text-xs mt-1">Same week availability</p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 rounded-full bg-[#115997] flex items-center justify-center mx-auto mb-3"><svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></div>
                <p className="text-white font-semibold text-sm">20+ Years</p>
                <p className="text-white/50 text-xs mt-1">Experience you can trust</p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 rounded-full bg-[#115997] flex items-center justify-center mx-auto mb-3"><svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg></div>
                <p className="text-white font-semibold text-sm">Family Owned</p>
                <p className="text-white/50 text-xs mt-1">Local & accountable</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#111] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-2 md:col-span-1">
              <h4 className="text-white font-semibold mb-4">Social</h4>
              <div className="flex gap-3 mb-4">
                <a href="#" className="w-10 h-10 rounded-full bg-[#273373] flex items-center justify-center hover:bg-[#115997] transition-colors"><svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg></a>
                <a href="#" className="w-10 h-10 rounded-full bg-[#273373] flex items-center justify-center hover:bg-[#115997] transition-colors"><svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg></a>
                <a href="#" className="w-10 h-10 rounded-full bg-[#273373] flex items-center justify-center hover:bg-[#115997] transition-colors"><svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg></a>
              </div>
              <a href="https://www.google.com/search?q=(770)+895-2039#lrd=0x88f5bde216fbfbdf:0x8d3c5e27cda0c48b,3" target="_blank" rel="noopener noreferrer" className="inline-block">
                <div className="bg-white px-4 py-2 rounded-lg flex items-center gap-1"><span className="text-xs font-medium text-gray-700">LEAVE US A</span><span className="font-bold text-[#4285f4]">G</span><span className="font-bold text-[#ea4335]">o</span><span className="font-bold text-[#fbbc05]">o</span><span className="font-bold text-[#4285f4]">g</span><span className="font-bold text-[#34a853]">l</span><span className="font-bold text-[#ea4335]">e</span><span className="text-xs font-medium text-gray-700 ml-1">Review</span></div>
              </a>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Navigation</h4>
              <ul className="space-y-2">
                <li><Link href="/" className="text-gray-400 hover:text-white transition-colors text-sm">Home</Link></li>
                <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors text-sm">About</Link></li>
                <li><Link href="/our-services" className="text-gray-400 hover:text-white transition-colors text-sm">Services</Link></li>
                <li><Link href="/portfolio" className="text-gray-400 hover:text-white transition-colors text-sm">Portfolio</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Services</h4>
              <ul className="space-y-2">{services.map((service) => (<li key={service.href}><Link href={service.href} className="text-gray-400 hover:text-white transition-colors text-sm">{service.name}</Link></li>))}</ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Working Hours</h4>
              <p className="text-gray-400 text-sm mb-1">Mon - Sun</p>
              <p className="text-white font-medium mb-6">Open 24 Hours</p>
              <div className="flex flex-col gap-3">
                <div className="bg-white rounded-lg p-2 inline-flex w-fit"><Image src="/images/iicrc-badge.webp" alt="IICRC Certified" width={120} height={45} className="h-10 w-auto" /></div>
                <a href="https://www.bbb.org/us/ga/lawrenceville/profile/basement-waterproofing/reliable-solutions-atlanta-llc-0443-28134092" target="_blank" rel="noopener noreferrer" className="bg-white rounded-lg p-2 inline-flex w-fit hover:bg-gray-100 transition-colors"><Image src="/images/bbb-badge.webp" alt="BBB A+ Accredited Business" width={120} height={45} className="h-10 w-auto" /></a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-10 pt-8 text-center"><p className="text-gray-500 text-sm">© 2026 All Rights Reserved | Reliable Solutions Atlanta</p></div>
        </div>
      </footer>
    </div>
  )
}