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

export default function Footer() {
  return (
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
  )
}
