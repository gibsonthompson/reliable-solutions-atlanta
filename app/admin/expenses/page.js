'use client'

import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { useAdminAuth } from '../layout'

const MILEAGE_RATE = 0.725 // IRS 2026 business rate, dollars per mile

const CATEGORIES = [
  { value: 'materials', label: 'Materials', color: 'bg-blue-50 text-blue-700' },
  { value: 'fuel', label: 'Fuel', color: 'bg-amber-50 text-amber-700' },
  { value: 'dump_fee', label: 'Dump Fee', color: 'bg-orange-50 text-orange-700' },
  { value: 'equipment', label: 'Equipment', color: 'bg-purple-50 text-purple-700' },
  { value: 'rental', label: 'Rental', color: 'bg-indigo-50 text-indigo-700' },
  { value: 'mileage', label: 'Mileage', color: 'bg-teal-50 text-teal-700' },
  { value: 'food', label: 'Food', color: 'bg-green-50 text-green-700' },
  { value: 'other', label: 'Other', color: 'bg-gray-100 text-gray-600' },
]

const PERIODS = [
  { value: 'week', label: 'Week' },
  { value: 'month', label: 'Month' },
  { value: 'quarter', label: 'Quarter' },
  { value: 'year', label: 'Year' },
  { value: 'all', label: 'All' },
  { value: 'custom', label: 'Custom' },
]

const blankForm = () => ({ job_id: '', user_id: '', title: '', description: '', amount: '', category: 'materials', expense_date: new Date().toISOString().split('T')[0], is_reimbursable: false, receipt_url: '', miles: '' })

const fmt = (d) => d.toISOString().split('T')[0]
const getPeriodRange = (period, customStart, customEnd) => {
  const now = new Date()
  if (period === 'all') return { start: null, end: null, label: 'All Time' }
  if (period === 'custom') return { start: customStart || null, end: customEnd || null, label: customStart && customEnd ? `${customStart} to ${customEnd}` : 'Custom' }
  if (period === 'week') {
    const s = new Date(now); s.setDate(now.getDate() - now.getDay())
    const e = new Date(s); e.setDate(s.getDate() + 6)
    return { start: fmt(s), end: fmt(e), label: 'This Week' }
  }
  if (period === 'month') {
    const s = new Date(now.getFullYear(), now.getMonth(), 1)
    const e = new Date(now.getFullYear(), now.getMonth() + 1, 0)
    return { start: fmt(s), end: fmt(e), label: now.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) }
  }
  if (period === 'quarter') {
    const q = Math.floor(now.getMonth() / 3)
    const s = new Date(now.getFullYear(), q * 3, 1)
    const e = new Date(now.getFullYear(), q * 3 + 3, 0)
    return { start: fmt(s), end: fmt(e), label: `Q${q + 1} ${now.getFullYear()}` }
  }
  if (period === 'year') {
    const s = new Date(now.getFullYear(), 0, 1)
    const e = new Date(now.getFullYear(), 11, 31)
    return { start: fmt(s), end: fmt(e), label: String(now.getFullYear()) }
  }
  return { start: null, end: null, label: '' }
}

export default function ExpensesPage() {
  const { user: adminUser, hasPermission } = useAdminAuth()
  const [expenses, setExpenses] = useState([])
  const [jobs, setJobs] = useState([])
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [adding, setAdding] = useState(false)
  const [editing, setEditing] = useState(null)
  const [saving, setSaving] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [pdfMenuOpen, setPdfMenuOpen] = useState(false)
  const [formData, setFormData] = useState(blankForm())
  const [scanning, setScanning] = useState(false)
  const [scanError, setScanError] = useState('')
  const [scanConfidence, setScanConfidence] = useState(null)
  const [expandedId, setExpandedId] = useState(null)
  const [period, setPeriod] = useState('month')
  const [customStart, setCustomStart] = useState('')
  const [customEnd, setCustomEnd] = useState('')
  const [sortBy, setSortBy] = useState('date')
  const [sortDir, setSortDir] = useState('desc')
  const [exporting, setExporting] = useState(false)

  const range = useMemo(() => getPeriodRange(period, customStart, customEnd), [period, customStart, customEnd])

  const fetchExpenses = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (range.start) params.set('start', range.start)
      if (range.end) params.set('end', range.end)
      const r = await fetch(`/api/admin/expenses?${params.toString()}`); const data = await r.json()
      setExpenses(data.expenses || []); setJobs(data.jobs || []); setUsers(data.users || [])
    } catch (e) {}
    finally { setLoading(false) }
  }, [range.start, range.end])

  useEffect(() => { fetchExpenses() }, [fetchExpenses])

  const handleNew = () => { setAdding(true); setEditing(null); setScanConfidence(null); setScanError(''); setFormData({ ...blankForm(), user_id: adminUser?.id || '', category: filterCategory !== 'all' ? filterCategory : 'materials' }) }
  const handleEdit = (e) => { setEditing(e.id); setAdding(false); setExpandedId(null); setScanConfidence(null); setScanError(''); setFormData({ job_id: e.job_id || '', user_id: e.user_id, title: e.title, description: e.description || '', amount: e.amount, category: e.category, expense_date: e.expense_date, is_reimbursable: e.is_reimbursable, receipt_url: e.receipt_url || '', miles: e.miles || '' }) }
  const closeForm = () => { setAdding(false); setEditing(null); setScanConfidence(null); setScanError('') }

  const updateField = (field, value) => {
    setFormData(p => {
      const next = { ...p, [field]: value }
      if (field === 'miles' && p.category === 'mileage' && value && !isNaN(parseFloat(value))) {
        next.amount = (parseFloat(value) * MILEAGE_RATE).toFixed(2)
      }
      if (field === 'category' && value === 'mileage' && p.miles && !isNaN(parseFloat(p.miles))) {
        next.amount = (parseFloat(p.miles) * MILEAGE_RATE).toFixed(2)
      }
      return next
    })
  }

  const compressImage = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const img = document.createElement('img')
      img.onload = () => {
        try {
          const maxW = 1600
          const scale = Math.min(1, maxW / (img.width || 1600))
          const canvas = document.createElement('canvas')
          canvas.width = Math.max(1, Math.round(img.width * scale))
          canvas.height = Math.max(1, Math.round(img.height * scale))
          canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height)
          resolve(canvas.toDataURL('image/jpeg', 0.85).split(',')[1])
        } catch (e) { reject(e) }
      }
      img.onerror = () => reject(new Error('Could not decode image. Try a JPEG or PNG.'))
      img.src = reader.result
    }
    reader.onerror = () => reject(new Error('Could not read file.'))
    reader.readAsDataURL(file)
  })

  const handleFileSelected = async (e) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    setScanError(''); setScanning(true); window.scrollTo({ top: 0, behavior: 'smooth' })
    try {
      const base64 = await compressImage(file)
      const r = await fetch('/api/admin/expenses/scan', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ image: base64, mediaType: 'image/jpeg' }) })
      const data = await r.json().catch(() => ({}))
      if (!r.ok) throw new Error(data.error || `Scan failed (HTTP ${r.status})`)
      const x = data.extracted || {}
      setEditing(null); setAdding(true); setScanConfidence(x.confidence ?? null)
      setFormData({
        ...blankForm(),
        user_id: adminUser?.id || '',
        title: x.title || '',
        description: x.description || '',
        amount: x.amount != null && x.amount !== '' ? String(x.amount) : '',
        category: x.category || 'materials',
        expense_date: x.expense_date || new Date().toISOString().split('T')[0],
        receipt_url: data.receipt_url || '',
        miles: '',
      })
    } catch (err) {
      console.error('[scan] error:', err)
      setScanError(err.message || 'Could not scan receipt.')
    } finally {
      setScanning(false)
    }
  }

  const handleSave = async () => {
    if (!formData.title.trim() || !formData.amount) return
    setSaving(true)
    try {
      const payload = { ...formData, amount: parseFloat(formData.amount), miles: formData.miles ? parseFloat(formData.miles) : null }
      if (editing) payload.id = editing
      const r = await fetch('/api/admin/expenses', { method: editing ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      if (r.ok) { closeForm(); setSuccessMsg(editing ? 'Expense updated' : 'Expense added'); setTimeout(() => setSuccessMsg(''), 2000); fetchExpenses() }
    } catch (e) {}
    finally { setSaving(false) }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this expense?')) return
    try { await fetch('/api/admin/expenses', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) }); setExpandedId(null); setSuccessMsg('Expense deleted'); setTimeout(() => setSuccessMsg(''), 2000); fetchExpenses() } catch (e) {}
  }

  const handleReimburse = async (expense) => {
    try { await fetch('/api/admin/expenses', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: expense.id, reimbursed_at: expense.reimbursed_at ? null : new Date().toISOString() }) }); fetchExpenses() } catch (e) {}
  }

  const toggleExpand = (id) => { setExpandedId(prev => prev === id ? null : id) }
  const toggleSort = (col) => {
    if (sortBy === col) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortBy(col); setSortDir(col === 'date' || col === 'amount' ? 'desc' : 'asc') }
  }

  const getCatStyle = (cat) => CATEGORIES.find(c => c.value === cat)?.color || 'bg-gray-100 text-gray-600'
  const getCatLabel = (cat) => CATEGORIES.find(c => c.value === cat)?.label || cat

  const filteredExpenses = useMemo(() =>
    filterCategory === 'all' ? expenses : expenses.filter(e => e.category === filterCategory),
    [expenses, filterCategory]
  )

  const sortedExpenses = useMemo(() => {
    const arr = [...filteredExpenses]
    arr.sort((a, b) => {
      let v = 0
      if (sortBy === 'date') v = (a.expense_date || '').localeCompare(b.expense_date || '')
      else if (sortBy === 'amount') v = parseFloat(a.amount || 0) - parseFloat(b.amount || 0)
      else if (sortBy === 'title') v = (a.title || '').localeCompare(b.title || '')
      else if (sortBy === 'category') v = (a.category || '').localeCompare(b.category || '')
      return sortDir === 'asc' ? v : -v
    })
    return arr
  }, [filteredExpenses, sortBy, sortDir])

  const totalAmount = filteredExpenses.reduce((s, e) => s + parseFloat(e.amount || 0), 0)
  const totalMiles = filteredExpenses.reduce((s, e) => s + parseFloat(e.miles || 0), 0)
  const reimbursableTotal = filteredExpenses.filter(e => e.is_reimbursable && !e.reimbursed_at).reduce((s, e) => s + parseFloat(e.amount || 0), 0)

  const confTone = scanConfidence == null ? null : scanConfidence >= 0.8 ? 'bg-green-50 text-green-700 border-green-200' : scanConfidence >= 0.6 ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-red-50 text-red-700 border-red-200'

  const exportPDF = async (periodOverride = null) => {
    setExporting(true)
    try {
      const exportRange = periodOverride ? getPeriodRange(periodOverride, '', '') : range

      // Fetch fresh expenses for export range if it differs from current view
      let exportSource = sortedExpenses
      if (periodOverride && (exportRange.start !== range.start || exportRange.end !== range.end)) {
        const params = new URLSearchParams()
        if (exportRange.start) params.set('start', exportRange.start)
        if (exportRange.end) params.set('end', exportRange.end)
        const r = await fetch(`/api/admin/expenses?${params.toString()}`)
        const data = await r.json()
        let pulled = data.expenses || []
        if (filterCategory !== 'all') pulled = pulled.filter(e => e.category === filterCategory)
        pulled.sort((a, b) => {
          let v = 0
          if (sortBy === 'date') v = (a.expense_date || '').localeCompare(b.expense_date || '')
          else if (sortBy === 'amount') v = parseFloat(a.amount || 0) - parseFloat(b.amount || 0)
          else if (sortBy === 'title') v = (a.title || '').localeCompare(b.title || '')
          else if (sortBy === 'category') v = (a.category || '').localeCompare(b.category || '')
          return sortDir === 'asc' ? v : -v
        })
        exportSource = pulled
      }

      const exportTotal = exportSource.reduce((s, e) => s + parseFloat(e.amount || 0), 0)
      const exportMiles = exportSource.reduce((s, e) => s + parseFloat(e.miles || 0), 0)

      const { default: jsPDF } = await import('jspdf')
      const autoTableMod = await import('jspdf-autotable')
      const autoTable = autoTableMod.default || autoTableMod.autoTable

      const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'letter' })
      const W = doc.internal.pageSize.getWidth()

      doc.setFillColor(17, 89, 151)
      doc.rect(0, 0, W, 22, 'F')
      doc.setTextColor(255, 255, 255)
      doc.setFont('helvetica', 'bold'); doc.setFontSize(16)
      doc.text('Reliable Solutions Atlanta', 14, 11)
      doc.setFont('helvetica', 'normal'); doc.setFontSize(10)
      doc.text('Expense Report', 14, 17)

      doc.setTextColor(60, 60, 60); doc.setFontSize(10)
      doc.text(`Period:  ${exportRange.label}`, 14, 30)
      if (filterCategory !== 'all') doc.text(`Category:  ${getCatLabel(filterCategory)}`, 14, 35)
      const genY = filterCategory !== 'all' ? 40 : 35
      doc.text(`Generated:  ${new Date().toLocaleString('en-US')}`, 14, genY)
      doc.setFont('helvetica', 'bold')
      doc.text(`${exportSource.length} expenses     Total $${exportTotal.toFixed(2)}${exportMiles > 0 ? `     ${exportMiles.toFixed(1)} mi` : ''}`, 14, genY + 6)
      doc.setFont('helvetica', 'normal')

      const rows = exportSource.map(e => [
        e.expense_date,
        e.title,
        getCatLabel(e.category),
        e.job_address || '-',
        e.user_name || '-',
        e.miles ? `${parseFloat(e.miles).toFixed(1)}` : '',
        `$${parseFloat(e.amount).toFixed(2)}`,
      ])

      autoTable(doc, {
        startY: genY + 13,
        head: [['Date', 'Vendor', 'Category', 'Job', 'Crew', 'Miles', 'Amount']],
        body: rows,
        foot: [['', '', '', '', '', 'TOTAL', `$${exportTotal.toFixed(2)}`]],
        theme: 'striped',
        headStyles: { fillColor: [17, 89, 151], textColor: 255, fontStyle: 'bold' },
        footStyles: { fillColor: [240, 240, 240], textColor: 0, fontStyle: 'bold' },
        styles: { fontSize: 9, cellPadding: 2.5 },
        columnStyles: { 5: { halign: 'right' }, 6: { halign: 'right' } },
        margin: { left: 14, right: 14 },
      })

      let y = (doc.lastAutoTable?.finalY || 60) + 8
      if (y > doc.internal.pageSize.getHeight() - 50) { doc.addPage(); y = 20 }
      doc.setFont('helvetica', 'bold'); doc.setFontSize(11); doc.setTextColor(40, 40, 40)
      doc.text('Breakdown by Category', 14, y)

      const breakdown = CATEGORIES.map(c => {
        const sub = exportSource.filter(e => e.category === c.value)
        const subTotal = sub.reduce((s, e) => s + parseFloat(e.amount || 0), 0)
        return sub.length > 0 ? [c.label, String(sub.length), `$${subTotal.toFixed(2)}`] : null
      }).filter(Boolean)

      autoTable(doc, {
        startY: y + 4,
        head: [['Category', 'Count', 'Total']],
        body: breakdown,
        theme: 'plain',
        headStyles: { fillColor: [240, 240, 240], textColor: 60, fontStyle: 'bold' },
        styles: { fontSize: 9, cellPadding: 2 },
        columnStyles: { 2: { halign: 'right' } },
        margin: { left: 14 },
        tableWidth: 110,
      })

      const safeLabel = exportRange.label.replace(/[^\w]+/g, '-').replace(/^-|-$/g, '')
      doc.save(`RSA-Expenses-${safeLabel}-${new Date().toISOString().split('T')[0]}.pdf`)
    } catch (e) {
      console.error('PDF export error:', e)
      alert('Could not generate PDF. ' + (e.message || ''))
    } finally {
      setExporting(false)
    }
  }

  if (!hasPermission('jobs') && !hasPermission('timesheets')) return <div className="px-4 py-16 text-center"><p className="text-gray-400 font-medium">You don{"'"}t have permission to view expenses</p></div>

  const scanLabelBase = 'flex items-center gap-2 px-4 py-2.5 bg-[#115997] text-white text-sm font-semibold rounded-xl hover:bg-[#0d4a7a] shadow-sm shadow-[#115997]/20 transition-all active:scale-[0.97] cursor-pointer select-none'

  const SortHeader = ({ col, children, align = 'left' }) => (
    <th className={`px-3 py-2.5 font-bold text-gray-400 text-[10px] uppercase tracking-widest cursor-pointer hover:text-gray-700 select-none text-${align}`} onClick={() => toggleSort(col)}>
      <span className="inline-flex items-center gap-1">
        {children}
        {sortBy === col && <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">{sortDir === 'asc' ? <path d="M14.7 12.7L10 8l-4.7 4.7-1.4-1.4L10 5.2l6.1 6.1z" /> : <path d="M5.3 7.3L10 12l4.7-4.7 1.4 1.4L10 14.8 3.9 8.7z" />}</svg>}
      </span>
    </th>
  )

  return (
    <div className="px-4 py-5 sm:py-8">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-5 animate-[fadeUp_0.3s_ease-out]">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">Expenses</h2>
          <p className="text-gray-400 text-sm mt-0.5">
            {expenses.length} expenses · ${totalAmount.toFixed(2)} total
            {totalMiles > 0 && <span> · {totalMiles.toFixed(1)} mi</span>}
            {reimbursableTotal > 0 && <span className="text-amber-500"> · ${reimbursableTotal.toFixed(2)} pending</span>}
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <label className={`${scanLabelBase} ${scanning ? 'opacity-60 pointer-events-none' : ''}`}>
            <input type="file" accept="image/*" onChange={handleFileSelected} disabled={scanning} className="sr-only" />
            {scanning
              ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /><span>Reading…</span></>
              : <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg><span className="hidden sm:inline">Scan Receipt</span><span className="sm:hidden">Scan</span></>}
          </label>
          <button onClick={handleNew} className="flex items-center gap-2 px-3.5 py-2.5 bg-white border border-gray-200 text-gray-700 text-sm font-semibold rounded-xl hover:bg-gray-50 transition-all active:scale-[0.97]">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg><span className="hidden sm:inline">Manual</span>
          </button>
          <div className="relative">
            <button onClick={() => setPdfMenuOpen(o => !o)} disabled={exporting || expenses.length === 0} title="Export PDF" className="flex items-center gap-2 px-3.5 py-2.5 bg-white border border-gray-200 text-gray-700 text-sm font-semibold rounded-xl hover:bg-gray-50 transition-all active:scale-[0.97] disabled:opacity-40">
              {exporting
                ? <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                : <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>}
              <span className="hidden sm:inline">PDF</span>
              {!exporting && <svg className={`w-3 h-3 transition-transform ${pdfMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>}
            </button>
            {pdfMenuOpen && (
              <>
                <div onClick={() => setPdfMenuOpen(false)} className="fixed inset-0 z-30" />
                <div className="absolute right-0 top-full mt-1.5 z-40 bg-white rounded-xl shadow-lg border border-gray-100 py-1 w-52 animate-[fadeUp_0.15s_ease-out]">
                  <p className="px-4 py-1.5 text-[10px] text-gray-400 uppercase tracking-widest font-semibold">Export for</p>
                  <button onClick={() => { setPdfMenuOpen(false); exportPDF('month') }} className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors">This Month</button>
                  <button onClick={() => { setPdfMenuOpen(false); exportPDF('quarter') }} className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors">This Quarter</button>
                  <button onClick={() => { setPdfMenuOpen(false); exportPDF('year') }} className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors">This Year</button>
                  <div className="border-t border-gray-100 my-1" />
                  <button onClick={() => { setPdfMenuOpen(false); exportPDF(null) }} className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                    Current view
                    <span className="block text-[10px] text-gray-400 mt-0.5">{range.label}</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {scanning && <div className="mb-4 rounded-xl p-3 text-sm bg-blue-50 border border-blue-200 text-blue-700 flex items-center gap-2"><div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />Reading receipt…</div>}
      {successMsg && <div className="mb-4 rounded-xl p-3 text-sm bg-green-50 border border-green-200 text-green-700 flex items-center gap-2 animate-[fadeUp_0.2s_ease-out]"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>{successMsg}</div>}
      {scanError && <div className="mb-4 rounded-xl p-3 text-sm bg-red-50 border border-red-200 text-red-700 flex items-start gap-2 animate-[fadeUp_0.2s_ease-out]"><svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg><div><div className="font-semibold mb-0.5">Scan failed</div><div>{scanError}</div></div></div>}

      {/* Period filter */}
      <div className="mb-4 animate-[fadeUp_0.32s_ease-out]">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 -mx-1 px-1">
          {PERIODS.map(p => (
            <button key={p.value} onClick={() => setPeriod(p.value)} className={`flex-shrink-0 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${period === p.value ? 'bg-[#115997] text-white shadow-sm shadow-[#115997]/20' : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300'}`}>
              {p.label}
            </button>
          ))}
          <div className="ml-2 text-[11px] text-gray-400 whitespace-nowrap font-medium">{range.label}</div>
        </div>
        {period === 'custom' && (
          <div className="mt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <input type="date" value={customStart} onChange={(e) => setCustomStart(e.target.value)} className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#115997]/20 focus:border-[#115997] outline-none" />
            <span className="text-gray-400 text-xs text-center">to</span>
            <input type="date" value={customEnd} onChange={(e) => setCustomEnd(e.target.value)} className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#115997]/20 focus:border-[#115997] outline-none" />
          </div>
        )}
      </div>

      {/* Category filter */}
      <div className="flex gap-3 mb-4 animate-[fadeUp_0.35s_ease-out]">
        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className="px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm bg-white focus:ring-2 focus:ring-[#115997]/20 focus:border-[#115997] outline-none transition-all">
          <option value="all">All categories</option>
          {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
        </select>
      </div>

      {/* Category Summary */}
      {filterCategory === 'all' && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4 animate-[fadeUp_0.4s_ease-out]">
          {CATEGORIES.filter(c => expenses.some(e => e.category === c.value)).map(cat => {
            const catTotal = expenses.filter(e => e.category === cat.value).reduce((s, e) => s + parseFloat(e.amount || 0), 0)
            const catCount = expenses.filter(e => e.category === cat.value).length
            return (
              <div key={cat.value} className="bg-white rounded-xl p-3.5 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-0.5">
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">{cat.label}</p>
                  <span className="text-[10px] text-gray-300 font-medium">{catCount}</span>
                </div>
                <p className="text-lg font-extrabold text-gray-900 tabular-nums">${catTotal.toFixed(2)}</p>
              </div>
            )
          })}
        </div>
      )}

      {/* Add/Edit Form */}
      {(adding || editing) && (
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-4 border-2 border-[#115997]/20 animate-[fadeUp_0.2s_ease-out]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900">{editing ? 'Edit Expense' : adding && scanConfidence != null ? 'Confirm Scanned Expense' : 'Add Expense'}</h3>
            {scanConfidence != null && (
              <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2 py-1 rounded-lg border ${confTone}`}>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                AI-filled · {Math.round(scanConfidence * 100)}% sure
              </span>
            )}
          </div>
          {scanConfidence != null && scanConfidence < 0.8 && (
            <p className="text-xs text-amber-600 -mt-2 mb-4">Low confidence, double-check the amount and date before saving.</p>
          )}
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div><label className="block text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-1">Category</label><select value={formData.category} onChange={(e) => updateField('category', e.target.value)} className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#115997]/20 outline-none transition-all">{CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}</select></div>
              <div><label className="block text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-1">Title *</label><input type="text" value={formData.title} onChange={(e) => updateField('title', e.target.value)} placeholder="e.g. Concrete mix, gas fill-up" style={{ fontSize: '16px' }} className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#115997]/20 focus:border-[#115997] outline-none transition-all" /></div>
              <div>
                <label className="block text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-1">Amount *{formData.category === 'mileage' && formData.miles ? <span className="text-teal-600 normal-case tracking-normal ml-1">(@ ${MILEAGE_RATE}/mi)</span> : null}</label>
                <input type="number" step="0.01" value={formData.amount} onChange={(e) => updateField('amount', e.target.value)} placeholder="0.00" style={{ fontSize: '16px' }} className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#115997]/20 focus:border-[#115997] outline-none transition-all" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div><label className="block text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-1">Job</label><select value={formData.job_id} onChange={(e) => updateField('job_id', e.target.value)} className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#115997]/20 outline-none transition-all"><option value="">No job (general)</option>{jobs.map(j => <option key={j.id} value={j.id}>{j.address}</option>)}</select></div>
              <div><label className="block text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-1">Crew Member</label><select value={formData.user_id} onChange={(e) => updateField('user_id', e.target.value)} className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#115997]/20 outline-none transition-all"><option value="">Select person</option>{users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}</select></div>
              <div><label className="block text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-1">Date</label><input type="date" value={formData.expense_date} onChange={(e) => updateField('expense_date', e.target.value)} className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#115997]/20 outline-none transition-all" /></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2"><label className="block text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-1">Description</label><input type="text" value={formData.description} onChange={(e) => updateField('description', e.target.value)} placeholder="Optional details" style={{ fontSize: '16px' }} className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#115997]/20 outline-none transition-all" /></div>
              <div>
                <label className="block text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-1">Miles {formData.category === 'mileage' ? '*' : <span className="text-gray-300 normal-case tracking-normal">(optional)</span>}</label>
                <input type="number" step="0.1" value={formData.miles} onChange={(e) => updateField('miles', e.target.value)} placeholder="0.0" style={{ fontSize: '16px' }} className={`w-full px-3.5 py-2.5 border rounded-xl text-sm outline-none transition-all ${formData.category === 'mileage' ? 'border-teal-300 bg-teal-50/30 focus:ring-2 focus:ring-teal-200' : 'border-gray-200 focus:ring-2 focus:ring-[#115997]/20'}`} />
              </div>
            </div>
            <div>
              <button onClick={() => updateField('is_reimbursable', !formData.is_reimbursable)}
                className={'flex items-center gap-2 px-3.5 py-2.5 rounded-xl border text-sm transition-all ' + (formData.is_reimbursable ? 'border-amber-200 bg-amber-50 text-amber-700' : 'border-gray-200 text-gray-400')}>
                <div className={'w-8 h-4 rounded-full transition-colors relative ' + (formData.is_reimbursable ? 'bg-amber-500' : 'bg-gray-300')}>
                  <div className={'absolute top-0.5 w-3 h-3 rounded-full bg-white shadow-sm transition-transform ' + (formData.is_reimbursable ? 'translate-x-4' : 'translate-x-0.5')} />
                </div>
                Reimbursable
              </button>
            </div>

            {formData.receipt_url && (
              <div className="flex items-center gap-3 p-2.5 bg-gray-50 rounded-xl border border-gray-100">
                <a href={formData.receipt_url} target="_blank" rel="noopener noreferrer" className="block w-12 h-12 rounded-lg overflow-hidden border border-gray-200 flex-shrink-0 bg-white">
                  <img src={formData.receipt_url} alt="Receipt" className="w-full h-full object-cover" />
                </a>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-gray-700">Receipt attached</p>
                  <a href={formData.receipt_url} target="_blank" rel="noopener noreferrer" className="text-[11px] text-[#115997] hover:underline">View full image</a>
                </div>
                <button onClick={() => updateField('receipt_url', '')} className="ml-auto text-[11px] text-gray-400 hover:text-red-600 font-medium">Remove</button>
              </div>
            )}

            <div className="flex items-center gap-2 pt-1">
              <button onClick={closeForm} className="flex-1 sm:flex-none px-4 py-2.5 text-sm font-semibold text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">Cancel</button>
              <button onClick={handleSave} disabled={saving || !formData.title.trim() || !formData.amount} className="flex-1 sm:flex-none px-4 py-2.5 text-sm font-semibold text-white bg-[#115997] rounded-xl hover:bg-[#0d4a7a] disabled:opacity-40 shadow-sm shadow-[#115997]/20 transition-all">{saving ? 'Saving...' : editing ? 'Save Changes' : 'Add Expense'}</button>
            </div>
          </div>
        </div>
      )}

      {/* Expenses List */}
      {loading ? (
        <div className="flex items-center justify-center py-12"><div className="w-10 h-10 border-4 border-[#115997] border-t-transparent rounded-full animate-spin" /></div>
      ) : expenses.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center border border-gray-100">
          <svg className="w-12 h-12 text-gray-200 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
          <p className="text-gray-400 text-sm">No expenses for {range.label.toLowerCase()}</p>
          <label className="mt-3 inline-block text-sm text-[#115997] font-semibold hover:underline cursor-pointer">
            <input type="file" accept="image/*" onChange={handleFileSelected} disabled={scanning} className="sr-only" />
            Scan your first receipt
          </label>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 animate-[fadeUp_0.45s_ease-out]">
          {/* Desktop Table */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-200">
                  <SortHeader col="date">Date</SortHeader>
                  <SortHeader col="title">Title</SortHeader>
                  <SortHeader col="category">Category</SortHeader>
                  <th className="text-left px-3 py-2.5 font-bold text-gray-400 text-[10px] uppercase tracking-widest">Job</th>
                  <th className="text-left px-3 py-2.5 font-bold text-gray-400 text-[10px] uppercase tracking-widest">Crew</th>
                  <SortHeader col="amount" align="right">Amount</SortHeader>
                  <th className="text-center px-3 py-2.5 font-bold text-gray-400 text-[10px] uppercase tracking-widest">Status</th>
                  <th className="px-3 py-2.5 w-8"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {sortedExpenses.map(exp => {
                  const isExpanded = expandedId === exp.id
                  return (
                    <React.Fragment key={exp.id}>
                      <tr onClick={() => toggleExpand(exp.id)} className={`cursor-pointer transition-colors ${isExpanded ? 'bg-blue-50/30' : 'hover:bg-gray-50/50'}`}>
                        <td className="px-3 py-2.5 text-gray-500 whitespace-nowrap">{new Date(exp.expense_date + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</td>
                        <td className="px-3 py-2.5">
                          <div className="flex items-center gap-1.5">
                            {exp.receipt_url && (
                              <span title="Has receipt" className="text-gray-300 flex-shrink-0">
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
                              </span>
                            )}
                            <p className="font-semibold text-gray-900">{exp.title}</p>
                            {exp.miles ? <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-teal-50 text-teal-700">{parseFloat(exp.miles).toFixed(1)} mi</span> : null}
                          </div>
                        </td>
                        <td className="px-3 py-2.5"><span className={`inline-flex px-1.5 py-0.5 rounded-md text-[10px] font-bold ${getCatStyle(exp.category)}`}>{getCatLabel(exp.category)}</span></td>
                        <td className="px-3 py-2.5 text-gray-500 max-w-[150px] truncate">{exp.job_address || '—'}</td>
                        <td className="px-3 py-2.5">
                          <div className="flex items-center gap-1.5">
                            <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm" style={{ backgroundColor: exp.user_color }}>
                              <span className="text-white text-[7px] font-bold">{exp.user_name?.charAt(0)}</span>
                            </div>
                            <span className="text-gray-500 text-[11px]">{exp.user_name}</span>
                          </div>
                        </td>
                        <td className="px-3 py-2.5 text-right font-bold text-gray-900 tabular-nums">${parseFloat(exp.amount).toFixed(2)}</td>
                        <td className="px-3 py-2.5 text-center">
                          {exp.is_reimbursable ? (
                            <button onClick={(e) => { e.stopPropagation(); handleReimburse(exp) }} className={`text-[10px] font-bold px-2 py-0.5 rounded-md cursor-pointer transition-colors ${exp.reimbursed_at ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700 hover:bg-amber-100'}`}>
                              {exp.reimbursed_at ? 'Reimbursed' : 'Pending'}
                            </button>
                          ) : <span className="text-gray-200 text-[10px]">—</span>}
                        </td>
                        <td className="px-3 py-2.5 text-gray-300">
                          <svg className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                        </td>
                      </tr>
                      {isExpanded && (
                        <tr className="bg-blue-50/20">
                          <td colSpan={8} className="px-4 py-4">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                              <div className="lg:col-span-2 space-y-3">
                                {exp.description && (
                                  <div><p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-0.5">Description</p><p className="text-sm text-gray-700">{exp.description}</p></div>
                                )}
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                                  <div><p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-0.5">Date</p><p className="text-gray-700 font-medium">{new Date(exp.expense_date + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</p></div>
                                  {exp.miles && <div><p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-0.5">Miles</p><p className="text-teal-700 font-bold">{parseFloat(exp.miles).toFixed(1)} mi</p></div>}
                                  <div><p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-0.5">Reimbursable</p><p className="text-gray-700 font-medium">{exp.is_reimbursable ? (exp.reimbursed_at ? 'Paid back' : 'Pending') : 'No'}</p></div>
                                  <div><p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-0.5">Logged</p><p className="text-gray-700 font-medium">{exp.created_at ? new Date(exp.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '—'}</p></div>
                                </div>
                                {exp.job_address && (
                                  <div><p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-0.5">Job</p><p className="text-sm text-gray-700">{exp.job_address}{exp.job_client ? ` · ${exp.job_client}` : ''}</p></div>
                                )}
                              </div>
                              <div className="space-y-3">
                                {exp.receipt_url && (
                                  <a href={exp.receipt_url} target="_blank" rel="noopener noreferrer" className="block bg-white rounded-lg border border-gray-200 overflow-hidden hover:border-[#115997] transition-colors">
                                    <img src={exp.receipt_url} alt="Receipt" className="w-full h-32 object-cover" />
                                    <p className="px-3 py-1.5 text-[11px] text-[#115997] font-semibold">View receipt →</p>
                                  </a>
                                )}
                                <div className="flex items-center gap-2">
                                  <button onClick={() => handleEdit(exp)} className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold text-[#115997] bg-white border border-[#115997]/20 rounded-lg hover:bg-[#115997]/5 transition-colors">
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>Edit
                                  </button>
                                  <button onClick={() => handleDelete(exp.id)} className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold text-red-600 bg-white border border-red-200 rounded-lg hover:bg-red-50 transition-colors">
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>Delete
                                  </button>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  )
                })}
              </tbody>
              <tfoot>
                <tr className="bg-gray-50/80 border-t-2 border-gray-200 font-bold text-xs">
                  <td className="px-3 py-2.5 text-gray-500" colSpan={5}>TOTAL ({expenses.length} expenses{totalMiles > 0 ? `, ${totalMiles.toFixed(1)} mi` : ''})</td>
                  <td className="px-3 py-2.5 text-right tabular-nums text-gray-900">${totalAmount.toFixed(2)}</td>
                  <td colSpan={2}></td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="sm:hidden divide-y divide-gray-50">
            {sortedExpenses.map(exp => {
              const isExpanded = expandedId === exp.id
              return (
                <div key={exp.id} className={isExpanded ? 'bg-blue-50/30' : ''}>
                  <div className="p-4 cursor-pointer" onClick={() => toggleExpand(exp.id)}>
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <div className="min-w-0">
                        <p className="font-bold text-gray-900 text-sm flex items-center gap-1.5">
                          {exp.receipt_url && (
                            <span title="Has receipt" className="text-gray-300 flex-shrink-0">
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
                            </span>
                          )}
                          {exp.title}
                          {exp.miles ? <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-teal-50 text-teal-700">{parseFloat(exp.miles).toFixed(1)} mi</span> : null}
                        </p>
                        <p className="text-xs text-gray-400">
                          {new Date(exp.expense_date + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          {exp.job_address ? ` · ${exp.job_address}` : ''}
                        </p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="font-extrabold text-gray-900 tabular-nums">${parseFloat(exp.amount).toFixed(2)}</p>
                        <span className={`inline-flex px-1.5 py-0.5 rounded-md text-[9px] font-bold ${getCatStyle(exp.category)}`}>{getCatLabel(exp.category)}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full flex items-center justify-center shadow-sm" style={{ backgroundColor: exp.user_color }}>
                          <span className="text-white text-[7px] font-bold">{exp.user_name?.charAt(0)}</span>
                        </div>
                        <span className="text-xs text-gray-400">{exp.user_name}</span>
                        {exp.is_reimbursable && (
                          <button onClick={(e) => { e.stopPropagation(); handleReimburse(exp) }} className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md ${exp.reimbursed_at ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>
                            {exp.reimbursed_at ? 'Reimbursed' : 'Pending'}
                          </button>
                        )}
                      </div>
                      <svg className={`w-4 h-4 text-gray-300 transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </div>
                  </div>
                  {isExpanded && (
                    <div className="px-4 pb-4 space-y-3">
                      {exp.description && (
                        <div><p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-0.5">Description</p><p className="text-sm text-gray-700">{exp.description}</p></div>
                      )}
                      {exp.receipt_url && (
                        <a href={exp.receipt_url} target="_blank" rel="noopener noreferrer" className="block bg-white rounded-lg border border-gray-200 overflow-hidden">
                          <img src={exp.receipt_url} alt="Receipt" className="w-full h-40 object-cover" />
                          <p className="px-3 py-1.5 text-[11px] text-[#115997] font-semibold">View receipt →</p>
                        </a>
                      )}
                      <div className="flex items-center gap-2">
                        <button onClick={() => handleEdit(exp)} className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold text-[#115997] bg-white border border-[#115997]/20 rounded-lg">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>Edit
                        </button>
                        <button onClick={() => handleDelete(exp.id)} className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold text-red-600 bg-white border border-red-200 rounded-lg">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
            <div className="px-4 py-3 bg-gray-50/80 border-t-2 border-gray-200">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-gray-500">TOTAL ({expenses.length}{totalMiles > 0 ? `, ${totalMiles.toFixed(1)} mi` : ''})</span>
                <span className="font-extrabold text-gray-900 tabular-nums">${totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}