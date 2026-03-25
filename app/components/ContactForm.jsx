'use client'

import { useState } from 'react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service_type: '',
    message: '',
  })
  const [status, setStatus] = useState('idle')

  const serviceOptions = [
    'Basement Waterproofing',
    'Foundation Repair',
    'Crawl Space Repair',
    'Crawl Space Encapsulation',
    'Crawl Space Waterproofing',
    'Concrete Repair',
    'Drainage',
    'Other',
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('submitting')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error('Failed to submit')

      setStatus('success')
      setFormData({ name: '', email: '', phone: '', service_type: '', message: '' })
    } catch (error) {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-green-500/20 backdrop-blur-sm rounded-xl p-8 text-center">
        <svg className="w-16 h-16 text-green-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-2xl font-bold text-white mb-2">Thank You!</h3>
        <p className="text-white/90 mb-4">We&apos;ve received your request and will contact you shortly.</p>
        <button
          onClick={() => setStatus('idle')}
          className="px-6 py-2 bg-white text-[#273373] rounded-lg font-semibold hover:bg-gray-100 transition-colors"
        >
          Submit Another Request
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {status === 'error' && (
        <div className="bg-red-500/20 backdrop-blur-sm rounded-lg p-4 text-white">
          <p>Something went wrong. Please try again.</p>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-white mb-1">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm rounded-lg border-0 focus:ring-2 focus:ring-[#115997] text-gray-800"
            required
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-white mb-1">Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm rounded-lg border-0 focus:ring-2 focus:ring-[#115997] text-gray-800"
            required
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="email" className="block text-white mb-1">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm rounded-lg border-0 focus:ring-2 focus:ring-[#115997] text-gray-800"
            required
          />
        </div>
        <div>
          <label htmlFor="service_type" className="block text-white mb-1">Service type</label>
          <select
            id="service_type"
            name="service_type"
            value={formData.service_type}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm rounded-lg border-0 focus:ring-2 focus:ring-[#115997] text-gray-800"
            required
          >
            <option value="">Select a service</option>
            {serviceOptions.map((service, index) => (
              <option key={index} value={service}>{service}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-white mb-1">Message</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm rounded-lg border-0 focus:ring-2 focus:ring-[#115997] text-gray-800 resize-none"
        />
      </div>

      <div className="text-center pt-4">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="inline-flex items-center gap-2 px-8 py-4 bg-[#115997] text-white rounded-lg font-semibold hover:bg-[#273373] transition-all duration-200 text-lg disabled:opacity-50"
        >
          {status === 'submitting' ? 'Submitting...' : 'Submit Request'}
          {status !== 'submitting' && (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          )}
        </button>
      </div>
    </form>
  )
}