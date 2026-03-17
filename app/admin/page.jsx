'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function AdminDashboard() {
  const [submissions, setSubmissions] = useState([])
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [followUps, setFollowUps] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await fetch('/api/contact')
      const result = await response.json()
      if (result.data) {
        const all = result.data
        setSubmissions(all)

        const now = new Date()
        setStats({
          total: all.length,
          new: all.filter(s => s.status === 'new').length,
          contacted: all.filter(s => s.status === 'contacted').length,
          quoted: all.filter(s => s.status === 'quoted').length,
          scheduled: all.filter(s => s.status === 'scheduled').length,
          completed: all.filter(s => s.status === 'completed').length,
          thisWeek: all.filter(s => {
            const created = new Date(s.created_at)
            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
            return created >= weekAgo
          }).length,
        })

        // Recommended follow-ups: new leads older than 24hrs, contacted older than 3 days
        const recs = all.filter(s => {
          const age = (now - new Date(s.created_at)) / (1000 * 60 * 60)
          if (s.status === 'new' && age > 24) return true
          if (s.status === 'contacted' && age > 72) return true
          if (s.next_follow_up) {
            const followDate = new Date(s.next_follow_up)
            followDate.setHours(0, 0, 0, 0)
            const today = new Date()
            today.setHours(0, 0, 0, 0)
            if (followDate <= today) return true
          }
          return false
        }).sort((a, b) => new Date(a.created_at) - new Date(b.created_at))

        setFollowUps(recs)
      }
    } catch (error) {
      console.error('Failed to fetch:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDateShort = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  const formatPhone = (phone) => {
    if (!phone) return ''
    const cleaned = phone.replace(/\D/g, '')
    if (cleaned.length === 10) return '(' + cleaned.slice(0, 3) + ') ' + cleaned.slice(3, 6) + '-' + cleaned.slice(6)
    if (cleaned.length === 11 && cleaned[0] === '1') return '(' + cleaned.slice(1, 4) + ') ' + cleaned.slice(4, 7) + '-' + cleaned.slice(7)
    return phone
  }

  const getStatusColor = (status) => {
    const colors = {
      new: 'bg-blue-100 text-blue-700',
      contacted: 'bg-yellow-100 text-yellow-700',
      quoted: 'bg-purple-100 text-purple-700',
      scheduled: 'bg-indigo-100 text-indigo-700',
      completed: 'bg-green-100 text-green-700',
      cancelled: 'bg-red-100 text-red-700',
    }
    return colors[status] || 'bg-gray-100 text-gray-700'
  }

  const getFollowUpReason = (submission) => {
    if (submission.next_follow_up) {
      const followDate = new Date(submission.next_follow_up)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      followDate.setHours(0, 0, 0, 0)
      if (followDate <= today) return 'Scheduled follow-up due'
    }
    const hours = Math.floor((Date.now() - new Date(submission.created_at)) / (1000 * 60 * 60))
    if (submission.status === 'new') return `New lead — ${hours}h without contact`
    if (submission.status === 'contacted') return `Contacted ${Math.floor(hours / 24)}d ago — needs follow-up`
    return 'Follow-up recommended'
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-10 h-10 border-4 border-[#115997] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="px-4 py-4 sm:py-8">
      {/* Stats Grid */}
      {stats && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="bg-white rounded-xl p-4 sm:p-5 shadow-sm">
            <p className="text-gray-500 text-xs sm:text-sm">Total Leads</p>
            <p className="text-2xl sm:text-3xl font-bold text-[#273373] mt-1">{stats.total}</p>
          </div>
          <div className="bg-white rounded-xl p-4 sm:p-5 shadow-sm">
            <p className="text-gray-500 text-xs sm:text-sm">New</p>
            <p className="text-2xl sm:text-3xl font-bold text-blue-600 mt-1">{stats.new}</p>
          </div>
          <div className="bg-white rounded-xl p-4 sm:p-5 shadow-sm">
            <p className="text-gray-500 text-xs sm:text-sm">This Week</p>
            <p className="text-2xl sm:text-3xl font-bold text-[#115997] mt-1">{stats.thisWeek}</p>
          </div>
          <div className="bg-white rounded-xl p-4 sm:p-5 shadow-sm">
            <p className="text-gray-500 text-xs sm:text-sm">Needs Follow-up</p>
            <p className="text-2xl sm:text-3xl font-bold text-amber-600 mt-1">{followUps.length}</p>
          </div>
        </div>
      )}

      {/* Recommended Follow-ups */}
      {followUps.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm mb-6 sm:mb-8 overflow-hidden">
          <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-100 flex items-center gap-2">
            <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
            <h2 className="text-base sm:text-lg font-semibold text-gray-800">Recommended Follow-ups</h2>
            <span className="text-gray-400 text-sm">({followUps.length})</span>
          </div>
          <div className="divide-y divide-gray-100">
            {followUps.slice(0, 5).map((item) => (
              <Link
                key={item.id}
                href={'/admin/contacts/' + item.id}
                className="flex items-center justify-between p-4 sm:px-6 hover:bg-gray-50 active:bg-gray-50 transition-colors"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-gray-900 text-sm truncate">{item.name}</p>
                    <span className={'inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium ' + getStatusColor(item.status)}>
                      {item.status}
                    </span>
                  </div>
                  <p className="text-xs text-amber-600">{getFollowUpReason(item)}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{item.service_type} · {formatPhone(item.phone)}</p>
                </div>
                <svg className="w-4 h-4 text-gray-400 flex-shrink-0 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
          {followUps.length > 5 && (
            <Link
              href="/admin/contacts"
              className="block text-center text-sm text-[#115997] font-medium py-3 border-t border-gray-100 hover:bg-gray-50"
            >
              View all {followUps.length} leads →
            </Link>
          )}
        </div>
      )}

      {/* Recent Submissions */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-semibold text-gray-800">Recent Submissions</h2>
          <Link href="/admin/contacts" className="text-sm text-[#115997] font-medium hover:underline">
            View all →
          </Link>
        </div>

        {submissions.length === 0 ? (
          <div className="p-8 sm:p-12 text-center">
            <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <p className="text-gray-500">No submissions yet</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {submissions.slice(0, 10).map((submission) => (
              <Link
                key={submission.id}
                href={'/admin/contacts/' + submission.id}
                className="flex items-center justify-between p-4 sm:px-6 hover:bg-gray-50 active:bg-gray-50 transition-colors"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-gray-900 text-sm truncate">{submission.name}</p>
                    <span className={'inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium ' + getStatusColor(submission.status)}>
                      {submission.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">{submission.service_type} · {formatDateShort(submission.created_at)}</p>
                </div>
                <svg className="w-4 h-4 text-gray-400 flex-shrink-0 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Pipeline Overview */}
      {stats && stats.total > 0 && (
        <div className="mt-6 sm:mt-8 bg-white rounded-xl shadow-sm p-4 sm:p-6">
          <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">Pipeline</h2>
          <div className="space-y-3">
            {[
              { label: 'New', count: stats.new, color: 'bg-blue-500' },
              { label: 'Contacted', count: stats.contacted, color: 'bg-yellow-500' },
              { label: 'Quoted', count: stats.quoted, color: 'bg-purple-500' },
              { label: 'Scheduled', count: stats.scheduled, color: 'bg-indigo-500' },
              { label: 'Completed', count: stats.completed, color: 'bg-green-500' },
            ].map((stage) => (
              <div key={stage.label} className="flex items-center gap-3">
                <p className="text-sm text-gray-600 w-24 flex-shrink-0">{stage.label}</p>
                <div className="flex-1 bg-gray-100 rounded-full h-3 overflow-hidden">
                  <div
                    className={stage.color + ' h-full rounded-full transition-all duration-500'}
                    style={{ width: stats.total > 0 ? Math.max((stage.count / stats.total) * 100, stage.count > 0 ? 4 : 0) + '%' : '0%' }}
                  />
                </div>
                <p className="text-sm font-semibold text-gray-800 w-8 text-right">{stage.count}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}