'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const ADMIN_PIN = '2026'

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [pinInput, setPinInput] = useState('')
  const [pinError, setPinError] = useState(false)
  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [selectedSubmission, setSelectedSubmission] = useState(null)
  const [notes, setNotes] = useState('')
  const [updating, setUpdating] = useState(false)

  const statuses = [
    { value: 'new', label: 'New', color: 'bg-blue-100 text-blue-800' },
    { value: 'contacted', label: 'Contacted', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'quoted', label: 'Quoted', color: 'bg-purple-100 text-purple-800' },
    { value: 'scheduled', label: 'Scheduled', color: 'bg-indigo-100 text-indigo-800' },
    { value: 'completed', label: 'Completed', color: 'bg-green-100 text-green-800' },
    { value: 'cancelled', label: 'Cancelled', color: 'bg-red-100 text-red-800' },
  ]

  useEffect(() => {
    const saved = sessionStorage.getItem('rsa_admin_auth')
    if (saved === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  const handlePinSubmit = (e) => {
    e.preventDefault()
    if (pinInput === ADMIN_PIN) {
      setIsAuthenticated(true)
      sessionStorage.setItem('rsa_admin_auth', 'true')
      setPinError(false)
    } else {
      setPinError(true)
      setPinInput('')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    sessionStorage.removeItem('rsa_admin_auth')
  }

  const fetchSubmissions = async () => {
    try {
      const url = filter === 'all' ? '/api/contact' : '/api/contact?status=' + filter
      const response = await fetch(url)
      const result = await response.json()
      if (result.data) {
        setSubmissions(result.data)
      }
    } catch (error) {
      console.error('Failed to fetch submissions:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      fetchSubmissions()
    }
  }, [filter, isAuthenticated])

  const updateSubmission = async (id, newStatus) => {
    setUpdating(true)
    try {
      const response = await fetch('/api/contact', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus, notes }),
      })
      
      if (response.ok) {
        await fetchSubmissions()
        setSelectedSubmission(null)
        setNotes('')
      }
    } catch (error) {
      console.error('Failed to update:', error)
    } finally {
      setUpdating(false)
    }
  }

  const getStatusColor = (status) => {
    const found = statuses.find(s => s.value === status)
    return found ? found.color : 'bg-gray-100 text-gray-800'
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    })
  }

  const formatDateShort = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    })
  }

  const formatPhone = (phone) => {
    const cleaned = phone.replace(/\D/g, '')
    if (cleaned.length === 10) {
      return '(' + cleaned.slice(0, 3) + ') ' + cleaned.slice(3, 6) + '-' + cleaned.slice(6)
    }
    if (cleaned.length === 11 && cleaned[0] === '1') {
      return '(' + cleaned.slice(1, 4) + ') ' + cleaned.slice(4, 7) + '-' + cleaned.slice(7)
    }
    return phone
  }

  const getCount = (status) => {
    if (status === 'all') return submissions.length
    return submissions.filter(s => s.status === status).length
  }

  const handleCall = (phone) => {
    window.location.href = 'tel:' + phone
  }

  const handleEmail = (email) => {
    window.location.href = 'mailto:' + email
  }

  // PIN Entry Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 max-w-sm w-full">
          <div className="text-center mb-6 sm:mb-8">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#273373] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#273373]">Admin Access</h1>
            <p className="text-gray-500 mt-1 text-sm sm:text-base">Enter PIN to continue</p>
          </div>

          <form onSubmit={handlePinSubmit}>
            <input
              type="password"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={4}
              value={pinInput}
              onChange={(e) => {
                setPinInput(e.target.value.replace(/\D/g, ''))
                setPinError(false)
              }}
              className={'w-full text-center text-2xl sm:text-3xl tracking-[0.5em] py-4 border-2 rounded-xl outline-none transition-colors ' + (
                pinError 
                  ? 'border-red-500 bg-red-50' 
                  : 'border-gray-200 focus:border-[#115997]'
              )}
              placeholder="••••"
              autoFocus
            />
            {pinError && (
              <p className="text-red-500 text-sm text-center mt-2">Incorrect PIN</p>
            )}
            <button
              type="submit"
              className="w-full mt-6 py-4 bg-[#115997] text-white rounded-xl font-semibold hover:bg-[#273373] transition-colors active:scale-[0.98]"
            >
              Unlock
            </button>
          </form>

          <Link 
            href="/"
            className="block text-center text-gray-500 hover:text-[#115997] mt-6 text-sm"
          >
            ← Back to website
          </Link>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#115997] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading submissions...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-6">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <h1 className="text-lg sm:text-2xl font-bold text-[#273373] truncate">RSA Admin</h1>
              <p className="text-gray-500 text-xs sm:text-sm hidden sm:block">Lead Dashboard</p>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <button
                onClick={handleLogout}
                className="text-gray-500 hover:text-red-600 p-2 sm:p-0 sm:font-medium flex items-center gap-2 text-sm"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span className="hidden sm:inline">Logout</span>
              </button>
              <Link 
                href="/"
                className="text-[#115997] hover:text-[#273373] p-2 sm:p-0 sm:font-medium flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span className="hidden sm:inline">Back to Site</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-4 sm:py-8">
        {/* Filter Pills - Horizontal Scroll on Mobile */}
        <div className="mb-4 sm:mb-8 -mx-4 px-4 overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 sm:grid sm:grid-cols-3 lg:grid-cols-6 sm:gap-4 min-w-max sm:min-w-0">
            <button 
              onClick={() => setFilter('all')}
              className={'flex-shrink-0 sm:flex-shrink bg-white rounded-xl px-4 py-3 sm:p-4 shadow-sm cursor-pointer transition-all text-left ' + (filter === 'all' ? 'ring-2 ring-[#115997]' : 'active:scale-95')}
            >
              <p className="text-gray-500 text-xs sm:text-sm">Total</p>
              <p className="text-2xl sm:text-3xl font-bold text-[#273373]">{getCount('all')}</p>
            </button>
            <button 
              onClick={() => setFilter('new')}
              className={'flex-shrink-0 sm:flex-shrink bg-white rounded-xl px-4 py-3 sm:p-4 shadow-sm cursor-pointer transition-all text-left ' + (filter === 'new' ? 'ring-2 ring-blue-500' : 'active:scale-95')}
            >
              <p className="text-gray-500 text-xs sm:text-sm">New</p>
              <p className="text-2xl sm:text-3xl font-bold text-blue-600">{getCount('new')}</p>
            </button>
            <button 
              onClick={() => setFilter('contacted')}
              className={'flex-shrink-0 sm:flex-shrink bg-white rounded-xl px-4 py-3 sm:p-4 shadow-sm cursor-pointer transition-all text-left ' + (filter === 'contacted' ? 'ring-2 ring-yellow-500' : 'active:scale-95')}
            >
              <p className="text-gray-500 text-xs sm:text-sm">Contacted</p>
              <p className="text-2xl sm:text-3xl font-bold text-yellow-600">{getCount('contacted')}</p>
            </button>
            <button 
              onClick={() => setFilter('quoted')}
              className={'flex-shrink-0 sm:flex-shrink bg-white rounded-xl px-4 py-3 sm:p-4 shadow-sm cursor-pointer transition-all text-left ' + (filter === 'quoted' ? 'ring-2 ring-purple-500' : 'active:scale-95')}
            >
              <p className="text-gray-500 text-xs sm:text-sm">Quoted</p>
              <p className="text-2xl sm:text-3xl font-bold text-purple-600">{getCount('quoted')}</p>
            </button>
            <button 
              onClick={() => setFilter('scheduled')}
              className={'flex-shrink-0 sm:flex-shrink bg-white rounded-xl px-4 py-3 sm:p-4 shadow-sm cursor-pointer transition-all text-left ' + (filter === 'scheduled' ? 'ring-2 ring-indigo-500' : 'active:scale-95')}
            >
              <p className="text-gray-500 text-xs sm:text-sm">Scheduled</p>
              <p className="text-2xl sm:text-3xl font-bold text-indigo-600">{getCount('scheduled')}</p>
            </button>
            <button 
              onClick={() => setFilter('completed')}
              className={'flex-shrink-0 sm:flex-shrink bg-white rounded-xl px-4 py-3 sm:p-4 shadow-sm cursor-pointer transition-all text-left ' + (filter === 'completed' ? 'ring-2 ring-green-500' : 'active:scale-95')}
            >
              <p className="text-gray-500 text-xs sm:text-sm">Completed</p>
              <p className="text-2xl sm:text-3xl font-bold text-green-600">{getCount('completed')}</p>
            </button>
          </div>
        </div>

        {/* Submissions List */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-100">
            <h2 className="text-base sm:text-lg font-semibold text-gray-800">
              {filter === 'all' ? 'All Submissions' : filter.charAt(0).toUpperCase() + filter.slice(1)}
              <span className="text-gray-400 font-normal ml-2">({submissions.length})</span>
            </h2>
          </div>

          {submissions.length === 0 ? (
            <div className="p-8 sm:p-12 text-center">
              <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <p className="text-gray-500">No submissions found</p>
            </div>
          ) : (
            <>
              {/* Desktop Table - Hidden on Mobile */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Contact</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Service</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {submissions.map((submission) => (
                      <tr key={submission.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(submission.created_at)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <p className="font-medium text-gray-900">{submission.name}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-gray-900">{formatPhone(submission.phone)}</p>
                          <p className="text-sm text-gray-500">{submission.email}</p>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {submission.service_type}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={'inline-flex px-2.5 py-1 rounded-full text-xs font-medium ' + getStatusColor(submission.status)}>
                            {submission.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => {
                              setSelectedSubmission(submission)
                              setNotes(submission.notes || '')
                            }}
                            className="text-[#115997] hover:text-[#273373] font-medium text-sm"
                          >
                            View / Edit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards - Hidden on Desktop */}
              <div className="md:hidden divide-y divide-gray-100">
                {submissions.map((submission) => (
                  <div 
                    key={submission.id} 
                    className="p-4 active:bg-gray-50"
                    onClick={() => {
                      setSelectedSubmission(submission)
                      setNotes(submission.notes || '')
                    }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-gray-900 truncate">{submission.name}</p>
                        <p className="text-sm text-gray-500">{submission.service_type}</p>
                      </div>
                      <div className="flex flex-col items-end ml-3">
                        <span className={'inline-flex px-2 py-0.5 rounded-full text-xs font-medium ' + getStatusColor(submission.status)}>
                          {submission.status}
                        </span>
                        <p className="text-xs text-gray-400 mt-1">{formatDateShort(submission.created_at)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleCall(submission.phone)
                        }}
                        className="flex items-center gap-1.5 text-sm text-green-600 font-medium"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        {formatPhone(submission.phone)}
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleEmail(submission.email)
                        }}
                        className="flex items-center gap-1.5 text-sm text-[#115997] font-medium truncate"
                      >
                        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span className="truncate">{submission.email}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </main>

      {/* Detail Modal - Full Screen on Mobile */}
      {selectedSubmission && (
        <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50">
          <div className="bg-white w-full sm:rounded-2xl sm:max-w-lg sm:mx-4 max-h-[95vh] sm:max-h-[90vh] overflow-y-auto rounded-t-2xl">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white p-4 sm:p-6 border-b border-gray-100 z-10">
              <div className="flex items-center justify-between">
                <h3 className="text-lg sm:text-xl font-bold text-[#273373]">Lead Details</h3>
                <button
                  onClick={() => {
                    setSelectedSubmission(null)
                    setNotes('')
                  }}
                  className="text-gray-400 hover:text-gray-600 p-1"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-4 sm:p-6 space-y-4">
              {/* Quick Actions - Prominent on Mobile */}
              <div className="flex gap-3 sm:hidden">
                <button
                  onClick={() => handleCall(selectedSubmission.phone)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3.5 bg-green-500 text-white rounded-xl font-medium active:scale-[0.98]"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call
                </button>
                <button
                  onClick={() => handleEmail(selectedSubmission.email)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3.5 bg-[#115997] text-white rounded-xl font-medium active:scale-[0.98]"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Email
                </button>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500 mb-0.5">Name</p>
                  <p className="font-medium text-gray-900 text-sm sm:text-base">{selectedSubmission.name}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500 mb-0.5">Date</p>
                  <p className="font-medium text-gray-900 text-sm sm:text-base">{formatDateShort(selectedSubmission.created_at)}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500 mb-0.5">Phone</p>
                  <button onClick={() => handleCall(selectedSubmission.phone)} className="font-medium text-[#115997] text-sm sm:text-base">
                    {formatPhone(selectedSubmission.phone)}
                  </button>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500 mb-0.5">Email</p>
                  <button onClick={() => handleEmail(selectedSubmission.email)} className="font-medium text-[#115997] break-all text-left text-sm sm:text-base">
                    {selectedSubmission.email}
                  </button>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-0.5">Service Type</p>
                <p className="font-medium text-gray-900">{selectedSubmission.service_type}</p>
              </div>

              {selectedSubmission.message && (
                <div>
                  <p className="text-xs text-gray-500 mb-1.5">Message</p>
                  <p className="text-gray-900 bg-gray-50 rounded-lg p-3 text-sm">{selectedSubmission.message}</p>
                </div>
              )}

              {/* Status Selection */}
              <div>
                <p className="text-xs text-gray-500 mb-2">Status</p>
                <div className="flex flex-wrap gap-2">
                  {statuses.map((status) => (
                    <button
                      key={status.value}
                      onClick={() => updateSubmission(selectedSubmission.id, status.value)}
                      disabled={updating}
                      className={'px-3 py-1.5 rounded-full text-sm font-medium transition-all disabled:opacity-50 active:scale-95 ' + (
                        selectedSubmission.status === status.value
                          ? status.color + ' ring-2 ring-offset-1 ring-gray-300'
                          : 'bg-gray-100 text-gray-600'
                      )}
                    >
                      {status.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div>
                <p className="text-xs text-gray-500 mb-1.5">Internal Notes</p>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#115997] focus:border-transparent outline-none resize-none text-sm"
                  placeholder="Add notes about this lead..."
                />
                <button
                  onClick={() => updateSubmission(selectedSubmission.id, selectedSubmission.status)}
                  disabled={updating}
                  className="mt-2 px-4 py-2.5 bg-[#115997] text-white rounded-lg font-medium hover:bg-[#273373] transition-colors disabled:opacity-50 text-sm active:scale-[0.98]"
                >
                  {updating ? 'Saving...' : 'Save Notes'}
                </button>
              </div>

              {/* Desktop Quick Actions */}
              <div className="hidden sm:block pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-500 mb-3">Quick Actions</p>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleCall(selectedSubmission.phone)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Call
                  </button>
                  <button
                    onClick={() => handleEmail(selectedSubmission.email)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#115997] text-white rounded-lg font-medium hover:bg-[#273373] transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Email
                  </button>
                </div>
              </div>
            </div>

            {/* Safe Area Padding for iOS */}
            <div className="h-6 sm:hidden"></div>
          </div>
        </div>
      )}
    </div>
  )
}