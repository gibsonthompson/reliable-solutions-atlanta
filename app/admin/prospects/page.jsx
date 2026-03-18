'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import ProspectCSVImport from '../components/ProspectCSVImport'

const statuses = [
  { value: 'all', label: 'All' },
  { value: 'new', label: 'New', bg: 'bg-blue-100 text-blue-700' },
  { value: 'contacted', label: 'Contacted', bg: 'bg-yellow-100 text-yellow-700' },
  { value: 'responded', label: 'Responded', bg: 'bg-green-100 text-green-700' },
  { value: 'meeting_set', label: 'Meeting Set', bg: 'bg-purple-100 text-purple-700' },
  { value: 'partner', label: 'Partner', bg: 'bg-emerald-100 text-emerald-700' },
  { value: 'not_interested', label: 'Not Interested', bg: 'bg-gray-100 text-gray-500' },
]

export default function ProspectsPage() {
  const [prospects, setProspects] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [showImport, setShowImport] = useState(false)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newProspect, setNewProspect] = useState({ name: '', email: '', phone: '', brokerage: '', area: '' })
  const [adding, setAdding] = useState(false)

  useEffect(() => {
    fetchProspects()
  }, [])

  const fetchProspects = async () => {
    try {
      const response = await fetch('/api/admin/prospects')
      const data = await response.json()
      if (data.prospects) setProspects(data.prospects)
    } catch (err) {
      console.error('Failed to fetch prospects:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleAddProspect = async (e) => {
    e.preventDefault()
    if (!newProspect.name.trim()) return
    setAdding(true)
    try {
      const response = await fetch('/api/admin/prospects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProspect),
      })
      if (response.ok) {
        setNewProspect({ name: '', email: '', phone: '', brokerage: '', area: '' })
        setShowAddForm(false)
        fetchProspects()
      }
    } catch (err) {
      console.error('Failed to add prospect:', err)
    } finally {
      setAdding(false)
    }
  }

  const filtered = prospects
    .filter(p => {
      if (filter !== 'all' && p.status !== filter) return false
      if (search) {
        const q = search.toLowerCase()
        return (
          p.name?.toLowerCase().includes(q) ||
          p.email?.toLowerCase().includes(q) ||
          p.brokerage?.toLowerCase().includes(q) ||
          p.area?.toLowerCase().includes(q)
        )
      }
      return true
    })

  const getStatusBadge = (status) => {
    const found = statuses.find(s => s.value === status)
    return found?.bg || 'bg-gray-100 text-gray-600'
  }

  const getStatusLabel = (status) => {
    const found = statuses.find(s => s.value === status)
    return found?.label || status
  }

  const getStatusCount = (status) => {
    if (status === 'all') return prospects.length
    return prospects.filter(p => p.status === status).length
  }

  const formatPhone = (phone) => {
    if (!phone) return ''
    const cleaned = phone.replace(/\D/g, '')
    if (cleaned.length === 10) return '(' + cleaned.slice(0, 3) + ') ' + cleaned.slice(3, 6) + '-' + cleaned.slice(6)
    return phone
  }

  const timeAgo = (dateString) => {
    const seconds = Math.floor((Date.now() - new Date(dateString)) / 1000)
    if (seconds < 3600) return Math.floor(seconds / 60) + 'm ago'
    if (seconds < 86400) return Math.floor(seconds / 3600) + 'h ago'
    if (seconds < 604800) return Math.floor(seconds / 86400) + 'd ago'
    return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
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
      {/* Header */}
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div>
          <h2 className="text-lg sm:text-2xl font-bold text-[#273373]">Prospects</h2>
          <p className="text-gray-500 text-xs sm:text-sm">{prospects.length} total prospects (realtors, agents, partners)</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowImport(true)}
            className="flex items-center gap-1.5 px-3 sm:px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="hidden sm:inline">Import CSV</span>
          </button>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-1.5 px-3 sm:px-4 py-2 text-sm font-medium text-white bg-[#115997] rounded-xl hover:bg-[#273373] transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span className="hidden sm:inline">Add</span>
          </button>
        </div>
      </div>

      {/* Quick Add Form */}
      {showAddForm && (
        <form onSubmit={handleAddProspect} className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-4 sm:mb-6 border-2 border-[#115997]/20">
          <h3 className="font-semibold text-[#273373] mb-4 text-sm">Add Prospect</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input type="text" placeholder="Name *" value={newProspect.name} onChange={(e) => setNewProspect(p => ({ ...p, name: e.target.value }))} required className="px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#115997] focus:border-transparent outline-none" />
            <input type="email" placeholder="Email" value={newProspect.email} onChange={(e) => setNewProspect(p => ({ ...p, email: e.target.value }))} className="px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#115997] focus:border-transparent outline-none" />
            <input type="tel" placeholder="Phone" value={newProspect.phone} onChange={(e) => setNewProspect(p => ({ ...p, phone: e.target.value }))} className="px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#115997] focus:border-transparent outline-none" />
            <input type="text" placeholder="Brokerage" value={newProspect.brokerage} onChange={(e) => setNewProspect(p => ({ ...p, brokerage: e.target.value }))} className="px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#115997] focus:border-transparent outline-none" />
            <input type="text" placeholder="Area / Market" value={newProspect.area} onChange={(e) => setNewProspect(p => ({ ...p, area: e.target.value }))} className="px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#115997] focus:border-transparent outline-none" />
          </div>
          <div className="flex items-center gap-2 mt-4">
            <button type="button" onClick={() => setShowAddForm(false)} className="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-lg">Cancel</button>
            <button type="submit" disabled={adding || !newProspect.name.trim()} className="px-4 py-2 text-sm font-medium text-white bg-[#115997] rounded-lg disabled:opacity-50">{adding ? 'Adding...' : 'Add Prospect'}</button>
          </div>
        </form>
      )}

      {/* Search */}
      <div className="mb-4">
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input type="text" placeholder="Search name, email, brokerage, area..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#115997] focus:border-transparent outline-none" />
        </div>
      </div>

      {/* Filter Pills */}
      <div className="mb-4 -mx-4 px-4 overflow-x-auto scrollbar-hide">
        <div className="flex gap-2 min-w-max sm:min-w-0 sm:flex-wrap">
          {statuses.map((s) => (
            <button
              key={s.value}
              onClick={() => setFilter(s.value)}
              className={'flex-shrink-0 px-3 sm:px-4 py-2 rounded-full text-sm font-medium transition-all ' +
                (filter === s.value ? 'bg-[#115997] text-white shadow-sm' : 'bg-white text-gray-600 border border-gray-200 active:scale-95')}
            >
              {s.label}
              <span className={'ml-1.5 ' + (filter === s.value ? 'text-white/70' : 'text-gray-400')}>{getStatusCount(s.value)}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-gray-500 mb-3">{filtered.length} result{filtered.length !== 1 ? 's' : ''}</p>

      {/* Prospects List */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-8 sm:p-12 text-center">
            <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <p className="text-gray-500">{search ? 'No prospects match your search' : 'No prospects yet'}</p>
            <div className="flex items-center justify-center gap-3 mt-4">
              <button onClick={() => setShowAddForm(true)} className="text-sm text-[#115997] font-medium hover:underline">Add manually</button>
              <span className="text-gray-300">or</span>
              <button onClick={() => setShowImport(true)} className="text-sm text-[#115997] font-medium hover:underline">Import CSV</button>
            </div>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Brokerage</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Contact</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Outreach</th>
                    <th className="px-6 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filtered.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-medium text-gray-900">{p.name}</p>
                        {p.area && <p className="text-xs text-gray-500">{p.area}</p>}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">{p.brokerage || '--'}</td>
                      <td className="px-6 py-4">
                        {p.email && <p className="text-sm text-gray-500">{p.email}</p>}
                        {p.phone && <p className="text-sm text-gray-500">{formatPhone(p.phone)}</p>}
                      </td>
                      <td className="px-6 py-4">
                        <span className={'inline-flex px-2.5 py-1 rounded-full text-xs font-medium ' + getStatusBadge(p.status)}>
                          {getStatusLabel(p.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">{p.outreach_count || 0} sent</td>
                      <td className="px-6 py-4">
                        <Link href={'/admin/prospects/' + p.id} className="text-[#115997] hover:text-[#273373] font-medium text-sm">View</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden divide-y divide-gray-100">
              {filtered.map((p) => (
                <Link key={p.id} href={'/admin/prospects/' + p.id} className="block p-4 active:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-1.5">
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-gray-900 truncate">{p.name}</p>
                      <p className="text-sm text-gray-500">{p.brokerage || 'No brokerage'}</p>
                    </div>
                    <div className="flex flex-col items-end ml-3">
                      <span className={'inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium ' + getStatusBadge(p.status)}>
                        {getStatusLabel(p.status)}
                      </span>
                      <p className="text-[10px] text-gray-400 mt-1">{timeAgo(p.created_at)}</p>
                    </div>
                  </div>
                  {p.area && <p className="text-xs text-gray-400 mt-1">{p.area}</p>}
                  {p.outreach_count > 0 && (
                    <p className="text-xs text-gray-400 mt-1">{p.outreach_count} emails sent</p>
                  )}
                </Link>
              ))}
            </div>
          </>
        )}
      </div>

      {/* CSV Import Modal */}
      <ProspectCSVImport
        isOpen={showImport}
        onClose={() => setShowImport(false)}
        onImportComplete={fetchProspects}
      />
    </div>
  )
}