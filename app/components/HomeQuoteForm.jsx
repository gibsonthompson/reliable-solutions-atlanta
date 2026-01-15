'use client'

import { useState } from 'react'

export default function HomeQuoteForm({ services }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service_type: '',
  })
  const [status, setStatus] = useState('idle')

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
      setFormData({ name: '', email: '', phone: '', service_type: '' })
    } catch (error) {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-[#273373] mb-2">Thank You!</h3>
        <p className="text-gray-600 mb-4">We&apos;ll contact you shortly.</p>
        <button
          onClick={() => setStatus('idle')}
          className="text-[#115997] font-semibold hover:underline"
        >
          Submit another request
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {status === 'error' && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
          Something went wrong. Please try again.
        </div>
      )}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
        <input 
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#84d2f2] focus:border-[#2692cc] outline-none transition-all"
          placeholder="Your name"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
        <input 
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#84d2f2] focus:border-[#2692cc] outline-none transition-all"
          placeholder="your@email.com"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
        <input 
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#84d2f2] focus:border-[#2692cc] outline-none transition-all"
          placeholder="(770) 000-0000"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">What services do you need?</label>
        <select 
          name="service_type"
          value={formData.service_type}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#84d2f2] focus:border-[#2692cc] outline-none transition-all bg-white"
          required
        >
          <option value="">Select a service...</option>
          {services.map((service) => (
            <option key={service.href} value={service.name}>{service.name}</option>
          ))}
        </select>
      </div>
      <button 
        type="submit"
        disabled={status === 'submitting'}
        className="w-full py-4 rounded-lg font-semibold text-white bg-[#115997] hover:bg-[#273373] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {status === 'submitting' ? 'Submitting...' : 'Submit'}
        {status !== 'submitting' && (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        )}
      </button>
    </form>
  )
}