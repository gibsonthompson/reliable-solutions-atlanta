'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import HomeQuoteForm from './components/HomeQuoteForm'

export default function HomePage() {
  const [activeAccordion, setActiveAccordion] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [servicesDropdown, setServicesDropdown] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % 3)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

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
    {
      title: 'About Reliable Solutions Atlanta',
      content: 'Reliable Solutions Atlanta is a family owned and operated business, with over 20 years of experience in waterproofing and foundation repair. Founded in 2015, with many years of knowledge and experience as technicians, we wanted to bring to Metro Atlanta a reliable company that thrives on expert level repairs and customer satisfaction, offering an extensive warranty program unmatched in our industry.'
    },
    {
      title: 'Free Quote',
      content: 'Call to schedule a FREE quote for your next waterproofing or foundation repair project! Our experts will assess your property and provide a detailed estimate at no cost to you.'
    },
    {
      title: 'Competitive Pricing',
      content: 'Highest quality materials at affordable prices! We pride ourselves on providing the most cost-effective and noninvasive resolution to your problem.'
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

  const serviceCards = [
    {
      title: 'Basement Waterproofing',
      description: 'A common challenge that homeowners face is water in their basements. Not only is a wet basement a pain to clean up, but it can also ruin other parts of the room.',
      href: '/basement-waterproofing',
      image: '/images/foundation-repair-atlanta.png'
    },
    {
      title: 'Crawl Space Encapsulation',
      description: "If your crawlspace is musty, smelly, or wet, you've got a leak somewhere. Often times, you will smell a leak long before you see it.",
      href: '/crawl-space-encapsulation',
      image: '/images/french-drain-installation-crew.png'
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
      image: '/images/foundation-excavation-team.png'
    }
  ]

  const testimonials = [
    {
      name: 'Torrey Williams',
      text: "I unexpectedly discovered standing water in a utility room of my finished basement. I called Reliable since they showed they are open 24 hrs. Alejandro (Alex) took my call right away and scheduled a time to come out the next day. The crew, led by Gabriel, were punctual, communicated clearly and took care of my home and yard as if it were their own. My basement is bone dry after a heavy rain!! I can't thank these guys enough.",
      image: '/images/waterproofing-truck-atlanta-job-site.png'
    },
    {
      name: 'Jessica Y.',
      text: 'Reliable Solutions arrived on time and did a wonderful job installing downspouts around my house. They were professional, polite, and hard working. All questions were answered and detailed explanations were given. I would not hesitate to recommend Reliable Solutions for any waterproofing and/or drainage issues.',
      image: '/images/reliable-solutions-atlanta-fleet.png'
    },
    {
      name: 'Felix F.',
      text: 'We highly recommend Reliable Solutions Atlanta. We are very pleased with how they handled our basement waterproofing job. From the initial consult to completion they were knowledgeable, efficient and very easy to work with. The crew worked quickly, efficiently and left everything clean and in order.',
      image: '/images/waterproofing-crew-hard-hats.png'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-2">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image 
                src="/images/logo.png" 
                alt="Reliable Solutions Atlanta - Waterproofing & Foundation Repair" 
                width={280} 
                height={112}
                className="h-16 sm:h-20 md:h-24 w-auto"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              <Link href="/" className="text-[#115997] font-semibold hover:text-[#273373] transition-colors">
                Home
              </Link>
              <Link href="/about" className="text-gray-700 font-medium hover:text-[#115997] transition-colors">
                About
              </Link>
              <div 
                className="relative"
                onMouseEnter={() => setServicesDropdown(true)}
                onMouseLeave={() => setServicesDropdown(false)}
              >
                <button className="text-gray-700 font-medium hover:text-[#115997] transition-colors flex items-center gap-1">
                  Services
                  <svg className={`w-4 h-4 transition-transform ${servicesDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {servicesDropdown && (
                  <div className="absolute top-full left-0 mt-1 w-64 bg-white shadow-xl rounded-lg border border-gray-100 py-2 z-50">
                    {services.map((service) => (
                      <Link 
                        key={service.href} 
                        href={service.href} 
                        className="block px-4 py-2.5 text-gray-700 hover:bg-[#84d2f2]/20 hover:text-[#115997] transition-colors"
                      >
                        {service.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <Link href="/portfolio" className="text-gray-700 font-medium hover:text-[#115997] transition-colors">
                Portfolio
              </Link>
              <Link href="/service-area" className="text-gray-700 font-medium hover:text-[#115997] transition-colors">
                Service Area
              </Link>
              <Link href="/contact" className="text-gray-700 font-medium hover:text-[#115997] transition-colors">
                Contact
              </Link>
            </nav>

            {/* CTA Button */}
            <a 
              href="tel:770-895-2039" 
              className="hidden md:flex items-center gap-2 px-5 py-2.5 border-2 border-[#115997] text-[#115997] rounded-lg font-semibold transition-all duration-200 hover:bg-[#115997] hover:text-white"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call Us 770-895-2039
            </a>

            {/* Mobile menu button */}
            <button 
              className="lg:hidden p-2 text-gray-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="lg:hidden pb-4 border-t border-gray-100 mt-2 pt-4">
              <Link href="/" className="block py-2 text-[#115997] font-semibold">Home</Link>
              <Link href="/about" className="block py-2 text-gray-700">About</Link>
              <div className="py-2">
                <span className="text-gray-700 font-medium">Services</span>
                <div className="ml-4 mt-2 space-y-1">
                  {services.map((service) => (
                    <Link key={service.href} href={service.href} className="block py-1.5 text-gray-600 text-sm">{service.name}</Link>
                  ))}
                </div>
              </div>
              <Link href="/portfolio" className="block py-2 text-gray-700">Portfolio</Link>
              <Link href="/service-area" className="block py-2 text-gray-700">Service Area</Link>
              <Link href="/contact" className="block py-2 text-gray-700">Contact</Link>
              <a href="tel:770-895-2039" className="block mt-4 text-center py-3 bg-[#115997] text-white rounded-lg font-semibold">
                Call Us 770-895-2039
              </a>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
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

      {/* About & Quote Section */}
      <section className="py-10 sm:py-14 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-6 md:mb-8 font-display">
                Why Choose Reliable Solutions?
              </h2>
              <div className="space-y-3">
                {accordionItems.map((item, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                    <button
                      onClick={() => setActiveAccordion(activeAccordion === index ? -1 : index)}
                      className="w-full flex items-center gap-4 p-5 text-left"
                    >
                      <div className="w-8 h-8 rounded-full bg-[#84d2f2] flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-[#115997]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="font-semibold text-lg text-gray-800 flex-grow">{item.title}</span>
                      <svg 
                        className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${activeAccordion === index ? 'rotate-180' : ''}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ${activeAccordion === index ? 'max-h-48' : 'max-h-0'}`}>
                      <div className="px-5 pb-5">
                        <p className="text-gray-600 leading-relaxed pl-12">{item.content}</p>
                      </div>
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

      {/* Financing Section */}
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
              <div key={plan.id} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <h4 className="font-bold text-lg text-gray-800 mb-1">{plan.title}</h4>
                <p className="text-gray-600 text-sm mb-2">{plan.subtitle}</p>
                <p className="text-xs text-gray-500 mb-4">{plan.details}</p>
                <a 
                  href={`https://projects.greensky.com/MerchantLoanApplication?apptype=short&merchant=81102520&dealerplan=${plan.id}&channel=External-Button-03`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-3 text-center rounded-lg font-semibold text-white bg-green-500 hover:bg-green-600 transition-colors"
                >
                  Apply Now
                </a>
              </div>
            ))}
          </div>

          <p className="text-white/60 text-xs text-center mt-8 max-w-3xl mx-auto">
            *Subject to credit approval. Loans provided by Synovus Bank, Member FDIC. GreenSky® is a registered trademark of GreenSky, LLC.
          </p>
        </div>
      </section>

      {/* Services Cards Section */}
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

      {/* Testimonials Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#273373] mb-3 md:mb-4 font-display">
              What Our Customers Say
            </h2>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-4">
                    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="relative w-16 h-16 rounded-full overflow-hidden">
                          <Image
                            src={testimonial.image}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-bold text-[#273373]">{testimonial.name}</h4>
                          <div className="flex gap-1 text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-600 leading-relaxed italic">&ldquo;{testimonial.text}&rdquo;</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${currentTestimonial === index ? 'bg-[#115997]' : 'bg-gray-300'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-[#273373]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 font-display">
              Ready to Protect Your Home?
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto">
              Contact us today for a free inspection and estimate.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-[#115997] flex items-center justify-center flex-shrink-0">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h4 className="text-white font-semibold text-lg">Location</h4>
                <p className="text-gray-400">Atlanta, GA</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-[#115997] flex items-center justify-center flex-shrink-0">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h4 className="text-white font-semibold text-lg">Email</h4>
                <a href="mailto:rsolrepair@gmail.com" className="text-gray-400 hover:text-[#84d2f2] transition-colors">rsolrepair@gmail.com</a>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-[#115997] flex items-center justify-center flex-shrink-0">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <h4 className="text-white font-semibold text-lg">Call or Text</h4>
                <a href="tel:770-895-2039" className="text-gray-400 hover:text-[#84d2f2] transition-colors">770-895-2039</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
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