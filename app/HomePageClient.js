'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Header from './components/Header'

export default function HomePageClient() {
  const services = [
    { name: 'Basement Waterproofing', href: '/basement-waterproofing' },
    { name: 'Crawl Space Encapsulation', href: '/crawl-space-encapsulation' },
    { name: 'Crawl Space Repair', href: '/crawl-space-repair' },
    { name: 'Crawl Space Waterproofing', href: '/crawl-space-waterproofing' },
    { name: 'Concrete Repair', href: '/cocnrete-repair' },
    { name: 'Drainage', href: '/drainage' },
    { name: 'Foundation Repair', href: '/foundation-repair' },
  ]

  const serviceCards = [
    {
      title: 'Basement Waterproofing',
      description: 'A common challenge that homeowners face is water in their basements. Not only is a wet basement a pain to clean up, but it can also ruin other parts of the room.',
      href: '/basement-waterproofing',
      image: '/images/portfolio/basement-waterproofing-interior.png'
    },
    {
      title: 'Crawl Space Encapsulation',
      description: "If your crawlspace is musty, smelly, or wet, you've got a leak somewhere. Often times, you will smell a leak long before you see it.",
      href: '/crawl-space-encapsulation',
      image: '/images/portfolio/crawl-space-encapsulation-vapor-barrier.png'
    },
    {
      title: 'Foundation Repair',
      description: 'The foundation of your building is, without a doubt, the most important part. Without a sturdy foundation, your home can be subject to catastrophic damage.',
      href: '/foundation-repair',
      image: '/images/excavator-foundation-work.png'
    },
    {
      title: 'Drainage',
      description: 'Poor drainage can destroy your home! It is very important that water can flow away from your structure to prevent basement flooding and foundation damage.',
      href: '/drainage',
      image: '/images/portfolio/drainage-crew-excavator.png'
    }
  ]

  const financingPlans = [
    { 
      id: '4158', 
      title: 'No Interest if Paid in Full in 15 Months', 
      subtitle: 'with Payments Required',
      details: 'Plan 4158. Rates range from 17.99% - 24.99% APR.'
    },
    { 
      id: '4129', 
      title: 'No Interest if Paid in Full in 12 Months', 
      subtitle: 'with No Payments Required',
      details: 'Plan 4129. Fixed rate of 9.99% APR.'
    },
    { 
      id: '4069', 
      title: 'No Interest if Paid in Full in 6 Months', 
      subtitle: 'with No Payments Required',
      details: 'Plan 4069. Fixed rate of 9.99% APR.'
    },
  ]

  // Testimonials — add more here later
  const testimonials = [
    {
      name: 'Torrey Williams',
      text: "I unexpectedly discovered standing water in a utility room of my finished basement. I called Reliable since they showed they are open 24 hrs. Alejandro (Alex) took my call right away and scheduled a time to come out the next day. The crew, led by Gabriel, were punctual, communicated clearly and took care of my home and yard as if it were their own. My basement is bone dry after a heavy rain!! I can't thank these guys enough.",
      rating: 5,
    },
    {
      name: 'Jessica Y.',
      text: 'Reliable Solutions arrived on time and did a wonderful job installing downspouts around my house. They were professional, polite, and hard working. All questions were answered and detailed explanations were given. I would not hesitate to recommend Reliable Solutions for any waterproofing and/or drainage issues.',
      rating: 5,
    },
    {
      name: 'Felix F.',
      text: 'We highly recommend Reliable Solutions Atlanta. We are very pleased with how they handled our basement waterproofing job. From the initial consult to completion they were knowledgeable, efficient and very easy to work with. The crew worked quickly, efficiently and left everything clean and in order.',
      rating: 5,
    },
    // ADD MORE TESTIMONIALS BELOW — same format: { name, text, rating }
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header activePage="home" />

      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative h-[450px] sm:h-[500px] md:h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/drainage-installation-atlanta-home.png"
            alt="Reliable Solutions Atlanta crew installing drainage system"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#273373]/90 via-[#273373]/70 to-[#273373]/40 md:to-transparent" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight font-display">
              Atlanta&apos;s Trusted Waterproofing &amp; Foundation Experts
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 md:mb-8 leading-relaxed">
              Family owned with over 20 years of experience. We protect your home from water damage with permanent solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="tel:770-895-2039"
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-lg bg-[#2692cc] text-white hover:bg-[#84d2f2] hover:text-[#273373] transition-all duration-200 w-full sm:w-auto"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Get Free Estimate
              </a>
              <Link 
                href="/our-services"
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-lg bg-white/10 text-white border-2 border-white/30 hover:bg-white hover:text-[#273373] transition-all duration-200 w-full sm:w-auto"
              >
                View Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ TESTIMONIAL WALL ═══════════════ */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-14">
            <p className="text-[#2692cc] font-semibold text-sm tracking-wider uppercase mb-3">Real Reviews From Real Customers</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-4 font-display">
              Don&apos;t Take Our Word For It
            </h2>
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-gray-600 font-semibold text-sm sm:text-base">5.0 on Google</span>
            </div>
            <p className="text-gray-500 text-sm max-w-xl mx-auto">
              See what homeowners across Metro Atlanta are saying about their experience with Reliable Solutions.
            </p>
          </div>

          {/* Masonry-style grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-5 space-y-4 sm:space-y-5">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="break-inside-avoid bg-white rounded-2xl p-5 sm:p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100"
              >
                {/* Stars */}
                <div className="flex gap-0.5 mb-3">
                  {[...Array(testimonial.rating || 5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Review text */}
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base mb-4">
                  &ldquo;{testimonial.text}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                  <div className="w-9 h-9 rounded-full bg-[#273373] flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">{testimonial.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{testimonial.name}</p>
                    <p className="text-xs text-gray-400">Verified Customer</p>
                  </div>
                  {/* Google icon */}
                  <div className="ml-auto">
                    <svg className="w-5 h-5 text-gray-300" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Google review link */}
          <div className="text-center mt-8 sm:mt-10">
            <a 
              href="https://www.google.com/search?q=(770)+895-2039#lrd=0x88f5bde216fbfbdf:0x8d3c5e27cda0c48b,1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#115997] font-semibold hover:text-[#273373] transition-colors text-sm sm:text-base"
            >
              Read all reviews on Google
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════ SERVICES ═══════════════ */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-3 md:mb-4 font-display">
              Our Services
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
              We provide comprehensive waterproofing and foundation repair solutions for Metro Atlanta homeowners.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {serviceCards.map((service) => (
              <Link 
                key={service.href}
                href={service.href}
                className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg text-[#273373] mb-2 group-hover:text-[#115997] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ GREENSKY FINANCING ═══════════════ */}
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

          <p className="text-white/60 text-xs text-center mt-8 max-w-3xl mx-auto">
            *Subject to credit approval. Loans provided by Synovus Bank, Member FDIC. GreenSky® is a registered trademark of GreenSky, LLC. Ask us about financing when you schedule your free estimate.
          </p>
        </div>
      </section>

      {/* ═══════════════ CTA — CONTACT PAGE ═══════════════ */}
      <section className="py-16 sm:py-20 md:py-24 bg-[#273373] relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-white rounded-full translate-x-1/3 translate-y-1/3" />
        </div>

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-white/90 text-xs sm:text-sm font-medium">Free Inspections Available This Week</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 md:mb-6 font-display leading-tight">
            Ready to Fix Your Water or Foundation Problem?
          </h2>
          <p className="text-white/80 text-base sm:text-lg mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed">
            Tell us about your project and we&apos;ll schedule a free, no-obligation inspection. Most estimates delivered within 24 hours.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold rounded-lg bg-[#2692cc] text-white hover:bg-[#84d2f2] hover:text-[#273373] transition-all duration-200 w-full sm:w-auto shadow-lg shadow-[#2692cc]/30"
            >
              Request Your Free Estimate
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <a
              href="tel:770-895-2039"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold rounded-lg bg-white/10 text-white border-2 border-white/30 hover:bg-white hover:text-[#273373] transition-all duration-200 w-full sm:w-auto"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call 770-895-2039
            </a>
          </div>

          <p className="text-white/40 text-xs mt-6">No pressure, no commitment — just honest advice from people who care about your home.</p>
        </div>
      </section>

      {/* ═══════════════ FOOTER ═══════════════ */}
      <footer className="bg-[#111] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Social */}
            <div className="col-span-2 md:col-span-1">
              <h4 className="text-white font-semibold mb-4">Social</h4>
              <div className="flex gap-3 mb-4">
                <a href="#" className="w-10 h-10 rounded-full bg-[#273373] flex items-center justify-center hover:bg-[#115997] transition-colors">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-[#273373] flex items-center justify-center hover:bg-[#115997] transition-colors">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-[#273373] flex items-center justify-center hover:bg-[#115997] transition-colors">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                  </svg>
                </a>
              </div>
              <a 
                href="https://www.google.com/search?q=(770)+895-2039#lrd=0x88f5bde216fbfbdf:0x8d3c5e27cda0c48b,3"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <div className="bg-white px-4 py-2 rounded-lg flex items-center gap-1">
                  <span className="text-xs font-medium text-gray-700">LEAVE US A</span>
                  <span className="font-bold text-[#4285f4]">G</span>
                  <span className="font-bold text-[#ea4335]">o</span>
                  <span className="font-bold text-[#fbbc05]">o</span>
                  <span className="font-bold text-[#4285f4]">g</span>
                  <span className="font-bold text-[#34a853]">l</span>
                  <span className="font-bold text-[#ea4335]">e</span>
                  <span className="text-xs font-medium text-gray-700 ml-1">Review</span>
                </div>
              </a>
            </div>

            {/* Navigation */}
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

            {/* Services */}
            <div>
              <h4 className="text-white font-semibold mb-4">Services</h4>
              <ul className="space-y-2">
                {services.map((service) => (
                  <li key={service.href}>
                    <Link href={service.href} className="text-gray-400 hover:text-white transition-colors text-sm">{service.name}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Hours & Certifications */}
            <div>
              <h4 className="text-white font-semibold mb-4">Working Hours</h4>
              <p className="text-gray-400 text-sm mb-1">Mon - Sun</p>
              <p className="text-white font-medium mb-6">Open 24 Hours</p>
              
              <div className="flex flex-col gap-3">
                <div className="bg-white rounded-lg p-2 inline-flex w-fit">
                  <Image
                    src="/images/iicrc-badge.webp"
                    alt="IICRC Certified"
                    width={120}
                    height={45}
                    className="h-10 w-auto"
                  />
                </div>
                <a 
                  href="https://www.bbb.org/us/ga/lawrenceville/profile/basement-waterproofing/reliable-solutions-atlanta-llc-0443-28134092"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white rounded-lg p-2 inline-flex w-fit hover:bg-gray-100 transition-colors"
                >
                  <Image
                    src="/images/bbb-badge.webp"
                    alt="BBB A+ Accredited Business"
                    width={120}
                    height={45}
                    className="h-10 w-auto"
                  />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-10 pt-8 text-center">
            <p className="text-gray-500 text-sm">© 2026 All Rights Reserved | Reliable Solutions Atlanta</p>
          </div>
        </div>
      </footer>
    </div>
  )
}