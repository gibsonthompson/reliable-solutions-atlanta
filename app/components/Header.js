'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const services = [
  { name: 'Basement Waterproofing', href: '/basement-waterproofing' },
  { name: 'Crawl Space Encapsulation', href: '/crawl-space-encapsulation' },
  { name: 'Crawl Space Repair', href: '/crawl-space-repair' },
  { name: 'Crawl Space Waterproofing', href: '/crawl-space-waterproofing' },
  { name: 'Concrete Repair', href: '/cocnrete-repair' },
  { name: 'Drainage', href: '/drainage' },
  { name: 'Foundation Repair', href: '/foundation-repair' },
]

export default function Header({ activePage }) {
  const [servicesDropdown, setServicesDropdown] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isServicePage = services.some(s => s.href === `/${activePage}`)

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-2">
          {/* Logo - BIGGER */}
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
            <Link href="/" className={`font-medium hover:text-[#115997] transition-colors ${activePage === 'home' ? 'text-[#115997] font-semibold' : 'text-gray-700'}`}>
              Home
            </Link>
            <Link href="/about" className={`font-medium hover:text-[#115997] transition-colors ${activePage === 'about' ? 'text-[#115997] font-semibold' : 'text-gray-700'}`}>
              About
            </Link>
            <div 
              className="relative"
              onMouseEnter={() => setServicesDropdown(true)}
              onMouseLeave={() => setServicesDropdown(false)}
            >
              <button className={`font-medium hover:text-[#115997] transition-colors flex items-center gap-1 ${isServicePage || activePage === 'our-services' ? 'text-[#115997] font-semibold' : 'text-gray-700'}`}>
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
            <Link href="/portfolio" className={`font-medium hover:text-[#115997] transition-colors ${activePage === 'portfolio' ? 'text-[#115997] font-semibold' : 'text-gray-700'}`}>
              Portfolio
            </Link>
            <Link href="/service-area" className={`font-medium hover:text-[#115997] transition-colors ${activePage === 'service-area' ? 'text-[#115997] font-semibold' : 'text-gray-700'}`}>
              Service Area
            </Link>
            <Link href="/contact" className={`font-medium hover:text-[#115997] transition-colors ${activePage === 'contact' ? 'text-[#115997] font-semibold' : 'text-gray-700'}`}>
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
            <Link href="/" className={`block py-2 ${activePage === 'home' ? 'text-[#115997] font-semibold' : 'text-gray-700'}`}>Home</Link>
            <Link href="/about" className={`block py-2 ${activePage === 'about' ? 'text-[#115997] font-semibold' : 'text-gray-700'}`}>About</Link>
            <div className="py-2">
              <span className={`font-medium ${isServicePage || activePage === 'our-services' ? 'text-[#115997]' : 'text-gray-700'}`}>Services</span>
              <div className="ml-4 mt-2 space-y-1">
                {services.map((service) => (
                  <Link key={service.href} href={service.href} className="block py-1.5 text-gray-600 text-sm">{service.name}</Link>
                ))}
              </div>
            </div>
            <Link href="/portfolio" className={`block py-2 ${activePage === 'portfolio' ? 'text-[#115997] font-semibold' : 'text-gray-700'}`}>Portfolio</Link>
            <Link href="/service-area" className={`block py-2 ${activePage === 'service-area' ? 'text-[#115997] font-semibold' : 'text-gray-700'}`}>Service Area</Link>
            <Link href="/contact" className={`block py-2 ${activePage === 'contact' ? 'text-[#115997] font-semibold' : 'text-gray-700'}`}>Contact</Link>
            <a href="tel:770-895-2039" className="block mt-4 text-center py-3 bg-[#115997] text-white rounded-lg font-semibold">
              Call Us 770-895-2039
            </a>
          </div>
        )}
      </div>
    </header>
  )
}
