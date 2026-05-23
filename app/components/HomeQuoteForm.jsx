'use client'

import { useState } from 'react'
import BookingCalendar from './BookingCalendar'
import { notify } from './notify'

export default function HomeQuoteForm({ services }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    service_type: '',
    referral_source: '',
  })
  const [honeypot, setHoneypot] = useState('')
  const [status, setStatus] = useState('idle')
  const [phoneError, setPhoneError] = useState('')
  const [leadId, setLeadId] = useState(null)
  const [leadName, setLeadName] = useState('')

  const referralOptions = [
    'Google Search',
    'Facebook',
    'Nextdoor',
    'Referral / Word of Mouth',
    'Yard Sign',
    'Drove By',
    'Angi / HomeAdvisor',
    'Other',
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (name === 'phone') setPhoneError('')
  }

  const validatePhone = (phone) => {
    const digits = phone.replace(/\D/g, '')
    if (digits.length !== 10) return false
    // Reject obvious fakes: all same digit, sequential
    if (/^(\d)\1{9}$/.test(digits)) return false
    if (digits === '1234567890' || digits === '0987654321') return false
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Honeypot check — bots fill this hidden field, humans don't see it
    if (honeypot) return

    // Phone validation
    if (!validatePhone(formData.phone)) {
      setPhoneError('Please enter a valid 10-digit phone number.')
      return
    }

    setStatus('submitting')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error('Failed to submit')

      const result = await response.json()
      const id = result.data?.id || null
      setLeadId(id)
      setLeadName(formData.name)

      // Fire Meta Pixel Lead event
      if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
        window.fbq('track', 'Lead', {
          content_name: formData.service_type || 'General Inquiry',
          content_category: 'Free Estimate',
        })
      }

      notify(id, 'new_lead')

      setStatus('booking')
      setFormData({ name: '', email: '', phone: '', address: '', service_type: '', referral_source: '' })
    } catch (error) {
      setStatus('error')
    }
  }

  if (status === 'booking' || status === 'complete') {
    if (status === 'complete') {
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
            onClick={() => { setStatus('idle'); setLeadId(null) }}
            className="text-[#115997] font-semibold hover:underline"
          >
            Submit another request
          </button>
        </div>
      )
    }

    return (
      <BookingCalendar
        leadId={leadId}
        leadName={leadName}
        variant="light"
        onComplete={() => setStatus('complete')}
      />
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {status === 'error' && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
          Something went wrong. Please try again.
        </div>
      )}

      {/* Honeypot — hidden from humans, bots auto-fill it */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input
          type="text"
          id="company"
          name="company"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#84d2f2] focus:border-[#2692cc] outline-none transition-all" placeholder="Your name" required />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#84d2f2] focus:border-[#2692cc] outline-none transition-all" placeholder="your@email.com" required />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#84d2f2] focus:border-[#2692cc] outline-none transition-all ${phoneError ? 'border-red-400' : 'border-gray-200'}`} placeholder="(770) 000-0000" required />
        {phoneError && <p className="text-red-500 text-xs mt-1">{phoneError}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Property Address</label>
        <input type="text" name="address" value={formData.address} onChange={handleChange} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#84d2f2] focus:border-[#2692cc] outline-none transition-all" placeholder="Street address of the property" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">What services do you need?</label>
        <select name="service_type" value={formData.service_type} onChange={handleChange} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#84d2f2] focus:border-[#2692cc] outline-none transition-all bg-white" required>
          <option value="">Select a service...</option>
          {services.map((service) => (
            <option key={service.href} value={service.name}>{service.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">How did you hear about us?</label>
        <select name="referral_source" value={formData.referral_source} onChange={handleChange} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#84d2f2] focus:border-[#2692cc] outline-none transition-all bg-white">
          <option value="">Select one...</option>
          {referralOptions.map((option, index) => (
            <option key={index} value={option}>{option}</option>
          ))}
        </select>
      </div>
      <button type="submit" disabled={status === 'submitting'} className="w-full py-4 rounded-lg font-semibold text-white bg-[#115997] hover:bg-[#273373] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50">
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