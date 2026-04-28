'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import ProspectCSVImport from '../components/ProspectCSVImport'

const statuses = [
  { value: 'all', label: 'All' },
  { value: 'new', label: 'New', bg: 'bg-blue-50 text-blue-700' },
  { value: 'contacted', label: 'Contacted', bg: 'bg-yellow-50 text-yellow-700' },
  { value: 'responded', label: 'Responded', bg: 'bg-green-50 text-green-700' },
  { value: 'meeting_set', label: 'Meeting Set', bg: 'bg-purple-50 text-purple-700' },
  { value: 'partner', label: 'Partner', bg: 'bg-emerald-50 text-emerald-700' },
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
  const [showHelp, setShowHelp] = useState(false)

  useEffect(() => { fetchProspects() }, [])
  const fetchProspects = async () => { try { const r = await fetch('/api/admin/prospects'); const d = await r.json(); if (d.prospects) setProspects(d.prospects) } catch (err) {} finally { setLoading(false) } }

  const handleAddProspect = async (e) => {
    e.preventDefault(); if (!newProspect.name.trim()) return; setAdding(true)
    try { const r = await fetch('/api/admin/prospects', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newProspect) }); if (r.ok) { setNewProspect({ name: '', email: '', phone: '', brokerage: '', area: '' }); setShowAddForm(false); fetchProspects() } } catch (err) {} finally { setAdding(false) }
  }

  const filtered = prospects.filter(p => { if (filter !== 'all' && p.status !== filter) return false; if (search) { const q = search.toLowerCase(); return p.name?.toLowerCase().includes(q) || p.email?.toLowerCase().includes(q) || p.brokerage?.toLowerCase().includes(q) || p.area?.toLowerCase().includes(q) || p.phone?.includes(q) }; return true })

  const getStatusBadge = (status) => (statuses.find(s => s.value === status)?.bg || 'bg-gray-100 text-gray-600')
  const getStatusLabel = (status) => (statuses.find(s => s.value === status)?.label || status)
  const getStatusCount = (status) => status === 'all' ? prospects.length : prospects.filter(p => p.status === status).length
  const formatPhone = (phone) => { if (!phone) return ''; const c = phone.replace(/\D/g, ''); if (c.length === 10) return '(' + c.slice(0,3) + ') ' + c.slice(3,6) + '-' + c.slice(6); return phone }
  const timeAgo = (d) => { const s = Math.floor((Date.now() - new Date(d)) / 1000); if (s < 3600) return Math.floor(s/60) + 'm ago'; if (s < 86400) return Math.floor(s/3600) + 'h ago'; if (s < 604800) return Math.floor(s/86400) + 'd ago'; return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) }

  if (loading) return <div className="flex items-center justify-center min-h-[50vh]"><div className="flex flex-col items-center gap-3"><div className="w-10 h-10 border-4 border-[#115997] border-t-transparent rounded-full animate-spin" /><p className="text-sm text-gray-400 animate-pulse">Loading contacts...</p></div></div>

  return (
    <div className="px-4 py-5 sm:py-8">
      <div className="flex items-center justify-between mb-5 animate-[fadeUp_0.3s_ease-out]">
        <div><h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">Contacts</h2><p className="text-gray-400 text-sm mt-0.5">{prospects.length} total</p></div>
        <div className="flex items-center gap-2">
          <button onClick={() => setShowHelp(true)} className="px-2.5 py-2 text-gray-400 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:text-gray-600 transition-all"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.065 2.05-1.37 2.772-1.153.508.153.942.535 1.025 1.059.108.685-.378 1.232-.816 1.627-.39.354-.816.659-.816 1.267V13m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></button>
          <button onClick={() => setShowImport(true)} className="flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-gray-500 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg><span className="hidden sm:inline">CSV</span></button>
          <button onClick={() => setShowAddForm(!showAddForm)} className="flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-white bg-[#115997] rounded-xl hover:bg-[#0d4a7a] shadow-sm shadow-[#115997]/20 transition-all active:scale-[0.97]"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg><span className="hidden sm:inline">Add</span></button>
        </div>
      </div>

      {showAddForm && (
        <form onSubmit={handleAddProspect} className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-5 border-2 border-[#115997]/20 animate-[fadeUp_0.2s_ease-out]">
          <h3 className="font-bold text-gray-900 mb-4 text-sm">Add Contact</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input type="text" placeholder="Name *" value={newProspect.name} onChange={(e) => setNewProspect(p => ({ ...p, name: e.target.value }))} required style={{ fontSize: '16px' }} className="px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#115997]/20 focus:border-[#115997] outline-none transition-all" />
            <input type="email" placeholder="Email" value={newProspect.email} onChange={(e) => setNewProspect(p => ({ ...p, email: e.target.value }))} style={{ fontSize: '16px' }} className="px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#115997]/20 focus:border-[#115997] outline-none transition-all" />
            <input type="tel" placeholder="Phone" value={newProspect.phone} onChange={(e) => setNewProspect(p => ({ ...p, phone: e.target.value }))} style={{ fontSize: '16px' }} className="px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#115997]/20 focus:border-[#115997] outline-none transition-all" />
            <input type="text" placeholder="Company" value={newProspect.brokerage} onChange={(e) => setNewProspect(p => ({ ...p, brokerage: e.target.value }))} style={{ fontSize: '16px' }} className="px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#115997]/20 focus:border-[#115997] outline-none transition-all" />
            <input type="text" placeholder="Area / Market" value={newProspect.area} onChange={(e) => setNewProspect(p => ({ ...p, area: e.target.value }))} style={{ fontSize: '16px' }} className="px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#115997]/20 focus:border-[#115997] outline-none transition-all" />
          </div>
          <div className="flex items-center gap-2 mt-4"><button type="button" onClick={() => setShowAddForm(false)} className="px-4 py-2.5 text-sm font-semibold text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">Cancel</button><button type="submit" disabled={adding || !newProspect.name.trim()} className="px-4 py-2.5 text-sm font-semibold text-white bg-[#115997] rounded-xl disabled:opacity-40 shadow-sm shadow-[#115997]/20 transition-all">{adding ? 'Adding...' : 'Add Contact'}</button></div>
        </form>
      )}

      <div className="mb-4 animate-[fadeUp_0.35s_ease-out]"><div className="relative"><svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg><input type="text" placeholder="Search name, email, phone, company..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ fontSize: '16px' }} className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#115997]/20 focus:border-[#115997] outline-none transition-all" /></div></div>

      <div className="mb-4 -mx-4 px-4 overflow-x-auto scrollbar-hide animate-[fadeUp_0.4s_ease-out]"><div className="flex gap-2 min-w-max sm:min-w-0 sm:flex-wrap">{statuses.map((s) => <button key={s.value} onClick={() => setFilter(s.value)} className={'flex-shrink-0 px-3 sm:px-4 py-2 rounded-full text-sm font-semibold transition-all duration-150 ' + (filter === s.value ? 'bg-[#115997] text-white shadow-sm shadow-[#115997]/20' : 'bg-white text-gray-400 border border-gray-200 hover:border-gray-300 active:scale-95')}>{s.label}<span className={'ml-1.5 ' + (filter === s.value ? 'text-white/60' : 'text-gray-300')}>{getStatusCount(s.value)}</span></button>)}</div></div>

      <p className="text-sm text-gray-400 mb-3 animate-[fadeUp_0.45s_ease-out]">{filtered.length} result{filtered.length !== 1 ? 's' : ''}</p>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 animate-[fadeUp_0.5s_ease-out]">
        {filtered.length === 0 ? (
          <div className="p-8 sm:p-12 text-center"><p className="text-gray-400">{search ? 'No contacts match' : 'No contacts yet'}</p><div className="flex items-center justify-center gap-3 mt-4"><button onClick={() => setShowAddForm(true)} className="text-sm text-[#115997] font-semibold hover:underline">Add manually</button><span className="text-gray-300">or</span><button onClick={() => setShowImport(true)} className="text-sm text-[#115997] font-semibold hover:underline">Import CSV</button></div></div>
        ) : (
          <>
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50/80"><tr><th className="px-6 py-3 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">Name</th><th className="px-6 py-3 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">Company</th><th className="px-6 py-3 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">Contact</th><th className="px-6 py-3 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</th><th className="px-6 py-3 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">Outreach</th><th className="px-6 py-3"></th></tr></thead>
                <tbody className="divide-y divide-gray-50">
                  {filtered.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-6 py-4"><p className="font-semibold text-gray-900">{p.name}</p>{p.area && <p className="text-xs text-gray-400">{p.area}</p>}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{p.brokerage || '—'}</td>
                      <td className="px-6 py-4">{p.email && <p className="text-sm text-gray-400">{p.email}</p>}{p.phone && <p className="text-sm text-gray-400">{formatPhone(p.phone)}</p>}</td>
                      <td className="px-6 py-4"><span className={'inline-flex px-2.5 py-1 rounded-md text-[10px] font-bold ' + getStatusBadge(p.status)}>{getStatusLabel(p.status)}</span></td>
                      <td className="px-6 py-4 text-sm text-gray-400 tabular-nums">{p.outreach_count || 0} sent</td>
                      <td className="px-6 py-4"><Link href={'/admin/prospects/' + p.id} className="text-[#115997] hover:text-[#0d4a7a] font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity">View →</Link></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="md:hidden divide-y divide-gray-50">
              {filtered.map((p) => (
                <Link key={p.id} href={'/admin/prospects/' + p.id} className="block p-4 active:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-1.5"><div className="min-w-0 flex-1"><p className="font-bold text-gray-900 truncate">{p.name}</p><p className="text-sm text-gray-400">{p.brokerage || 'No company'}</p></div><div className="flex flex-col items-end ml-3"><span className={'inline-flex px-2 py-0.5 rounded-md text-[9px] font-bold ' + getStatusBadge(p.status)}>{getStatusLabel(p.status)}</span><p className="text-[10px] text-gray-300 mt-1">{timeAgo(p.created_at)}</p></div></div>
                  {p.area && <p className="text-xs text-gray-300 mt-1">{p.area}</p>}
                  {p.phone && <p className="text-xs text-gray-300 mt-0.5">{formatPhone(p.phone)}</p>}
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
      <ProspectCSVImport isOpen={showImport} onClose={() => setShowImport(false)} onImportComplete={fetchProspects} />

      {showHelp && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4" onClick={() => setShowHelp(false)}>
          <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-lg max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-5 border-b border-gray-100"><div className="w-8 h-1 bg-gray-300 rounded-full mx-auto mb-3 sm:hidden" /><div className="flex items-center justify-between"><h3 className="text-lg font-bold text-gray-900">Contacts Help</h3><button onClick={() => setShowHelp(false)} className="text-gray-400 hover:text-gray-600"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button></div></div>
            <div className="p-5 space-y-5">
              <div><h4 className="text-sm font-bold text-gray-800 mb-1">What is this page?</h4><p className="text-sm text-gray-500 leading-relaxed">Your contact list. Website form submissions auto-create entries here, plus manual adds and CSV imports.</p></div>
              <div><h4 className="text-sm font-bold text-gray-800 mb-1">Status pipeline</h4><p className="text-sm text-gray-500 leading-relaxed">New → Contacted → Responded → Meeting Set → Partner. Tap a contact to update status and log outreach.</p></div>
            </div>
            <div className="p-5 border-t border-gray-100"><button onClick={() => setShowHelp(false)} className="w-full py-3 bg-[#115997] text-white rounded-xl font-semibold hover:bg-[#0d4a7a] transition-colors">Got it</button></div>
          </div>
        </div>
      )}
    </div>
  )
}