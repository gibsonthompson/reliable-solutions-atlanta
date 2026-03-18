'use client'

import { useState, useRef, useCallback } from 'react'

const PROSPECT_FIELDS = [
  { key: 'name', label: 'Name', required: true },
  { key: 'email', label: 'Email', required: false },
  { key: 'phone', label: 'Phone', required: false },
  { key: 'brokerage', label: 'Brokerage / Company', required: false },
  { key: 'area', label: 'Area / Market', required: false },
  { key: 'notes', label: 'Notes', required: false },
]

const SOURCE_OPTIONS = [
  { value: 'csv_import', label: 'CSV Import' },
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'google', label: 'Google Search' },
  { value: 'realtor_com', label: 'Realtor.com' },
  { value: 'zillow', label: 'Zillow' },
  { value: 'referral', label: 'Referral' },
  { value: 'other', label: 'Other' },
]

// Auto-mapping for realtor CSV columns
const AUTO_MAP = {
  'name': 'name',
  'full name': 'name',
  'full_name': 'name',
  'contact name': 'name',
  'contact_name': 'name',
  'agent name': 'name',
  'agent': 'name',
  'realtor': 'name',
  'realtor name': 'name',
  'first name': '_first_name',
  'first_name': '_first_name',
  'firstname': '_first_name',
  'first': '_first_name',
  'last name': '_last_name',
  'last_name': '_last_name',
  'lastname': '_last_name',
  'last': '_last_name',
  'email': 'email',
  'email address': 'email',
  'email_address': 'email',
  'e-mail': 'email',
  'work email': 'email',
  'business email': 'email',
  'primary email': 'email',
  'phone': 'phone',
  'phone number': 'phone',
  'phone_number': 'phone',
  'mobile': 'phone',
  'mobile phone': 'phone',
  'cell': 'phone',
  'cell phone': 'phone',
  'work phone': 'phone',
  'office phone': 'phone',
  'direct phone': 'phone',
  'brokerage': 'brokerage',
  'company': 'brokerage',
  'company name': 'brokerage',
  'company_name': 'brokerage',
  'office': 'brokerage',
  'office name': 'brokerage',
  'firm': 'brokerage',
  'firm name': 'brokerage',
  'organization': 'brokerage',
  'broker': 'brokerage',
  'broker name': 'brokerage',
  'area': 'area',
  'market': 'area',
  'city': 'area',
  'location': 'area',
  'region': 'area',
  'territory': 'area',
  'zip': 'area',
  'zip code': 'area',
  'neighborhood': 'area',
  'notes': 'notes',
  'note': 'notes',
  'comments': 'notes',
  'description': 'notes',
  'bio': 'notes',
  'about': 'notes',
}

function fuzzyMatch(header) {
  const lower = header.toLowerCase().trim()
  if (AUTO_MAP[lower]) return AUTO_MAP[lower]
  // Fuzzy
  if (lower.includes('first name') || lower.includes('firstname')) return '_first_name'
  if (lower.includes('last name') || lower.includes('lastname')) return '_last_name'
  if (lower.includes('email')) return 'email'
  if (lower.includes('phone') || lower.includes('mobile') || lower.includes('cell')) return 'phone'
  if (lower.includes('brokerage') || lower.includes('company') || lower.includes('office') || lower.includes('firm')) return 'brokerage'
  if (lower.includes('area') || lower.includes('market') || lower.includes('city') || lower.includes('region')) return 'area'
  return null
}

function parseCSV(text) {
  const lines = text.split(/\r?\n/).filter(line => line.trim())
  if (lines.length < 2) return { headers: [], rows: [] }

  const headers = parseCSVLine(lines[0])
  const rows = []
  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i])
    if (values.length === 0 || values.every(v => !v.trim())) continue
    const row = {}
    headers.forEach((header, idx) => { row[header] = values[idx] || '' })
    rows.push(row)
  }
  return { headers, rows }
}

function parseCSVLine(line) {
  const result = []
  let current = ''
  let inQuotes = false
  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    const next = line[i + 1]
    if (inQuotes) {
      if (char === '"' && next === '"') { current += '"'; i++ }
      else if (char === '"') { inQuotes = false }
      else { current += char }
    } else {
      if (char === '"') { inQuotes = true }
      else if (char === ',') { result.push(current.trim()); current = '' }
      else { current += char }
    }
  }
  result.push(current.trim())
  return result
}

export default function ProspectCSVImport({ isOpen, onClose, onImportComplete }) {
  const fileInputRef = useRef(null)
  const [step, setStep] = useState('upload')
  const [fileName, setFileName] = useState('')
  const [csvHeaders, setCsvHeaders] = useState([])
  const [csvRows, setCsvRows] = useState([])
  const [columnMapping, setColumnMapping] = useState({})
  const [defaultSource, setDefaultSource] = useState('csv_import')
  const [importing, setImporting] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [firstNameCol, setFirstNameCol] = useState(null)
  const [lastNameCol, setLastNameCol] = useState(null)

  const reset = () => {
    setStep('upload'); setFileName(''); setCsvHeaders([]); setCsvRows([])
    setColumnMapping({}); setDefaultSource('csv_import'); setImporting(false)
    setResult(null); setError(''); setFirstNameCol(null); setLastNameCol(null)
  }

  const handleClose = () => { reset(); onClose() }

  const handleFileDrop = useCallback((e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) processFile(file)
  }, [])

  const processFile = (file) => {
    if (!file.name.match(/\.(csv|tsv|txt)$/i)) {
      setError('Please upload a CSV file')
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('File too large. Maximum 5MB.')
      return
    }
    setError('')
    setFileName(file.name)

    const reader = new FileReader()
    reader.onload = (e) => {
      const text = e.target?.result
      const { headers, rows } = parseCSV(text)
      if (headers.length === 0 || rows.length === 0) {
        setError('Could not parse CSV. Make sure it has headers and data rows.')
        return
      }
      setCsvHeaders(headers)
      setCsvRows(rows)

      // Auto-map
      const mapping = {}
      let fnCol = null, lnCol = null
      const usedFields = new Set()

      headers.forEach(header => {
        const match = fuzzyMatch(header)
        if (!match) return
        if (match === '_first_name') { fnCol = header }
        else if (match === '_last_name') { lnCol = header }
        else if (!usedFields.has(match)) {
          mapping[match] = header
          usedFields.add(match)
        }
      })

      if (fnCol && !mapping['name']) {
        setFirstNameCol(fnCol)
        setLastNameCol(lnCol)
        mapping['name'] = fnCol
      }

      // Auto-detect source
      const headerSet = new Set(headers.map(h => h.toLowerCase().trim()))
      if (headerSet.has('brokerage') || headerSet.has('broker')) {
        setDefaultSource('csv_import')
      }

      setColumnMapping(mapping)
      setStep('map')
    }
    reader.readAsText(file)
  }

  const handleImport = async () => {
    setImporting(true)
    setError('')
    try {
      // Combine first+last name if needed
      const processedRows = csvRows.map(row => {
        const processed = { ...row }
        if (firstNameCol && lastNameCol && columnMapping['name'] === firstNameCol) {
          processed[firstNameCol] = `${row[firstNameCol] || ''} ${row[lastNameCol] || ''}`.trim()
        }
        return processed
      })

      const response = await fetch('/api/admin/prospects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leads: processedRows,
          columnMapping,
          defaultSource,
        }),
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Import failed')

      setResult(data)
      setStep('done')
      onImportComplete()
    } catch (err) {
      setError(err.message || 'Import failed')
    } finally {
      setImporting(false)
    }
  }

  const hasRequired = Boolean(columnMapping['name'])

  const getMappedPreview = (row) => {
    const preview = {}
    for (const [field, col] of Object.entries(columnMapping)) {
      if (col && row[col]) {
        let value = row[col]
        if (field === 'name' && firstNameCol && lastNameCol && col === firstNameCol) {
          value = `${row[firstNameCol] || ''} ${row[lastNameCol] || ''}`.trim()
        }
        preview[field] = value
      }
    }
    return preview
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50">
      <div className="bg-white w-full sm:rounded-2xl sm:max-w-2xl sm:mx-4 max-h-[92vh] flex flex-col rounded-t-2xl overflow-hidden">
        {/* Header */}
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-[#115997]/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-[#115997]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-[#273373] text-sm sm:text-base">Import Prospects</h3>
              <p className="text-xs text-gray-500">
                {step === 'upload' && 'Upload your CSV file'}
                {step === 'map' && `${csvRows.length} rows found — map columns`}
                {step === 'review' && 'Review before importing'}
                {step === 'importing' && 'Importing...'}
                {step === 'done' && 'Import complete'}
              </p>
            </div>
          </div>
          <button onClick={handleClose} className="text-gray-400 hover:text-gray-600 p-1">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          {error && (
            <div className="mb-4 rounded-xl p-3 text-sm bg-red-50 border border-red-200 text-red-700 flex items-center gap-2">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
          )}

          {/* UPLOAD */}
          {step === 'upload' && (
            <div>
              <div
                className="rounded-xl p-8 sm:p-12 text-center cursor-pointer border-2 border-dashed border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors"
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleFileDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <svg className="w-10 h-10 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p className="font-medium text-sm text-gray-700 mb-1">Drop your CSV here or click to browse</p>
                <p className="text-xs text-gray-500">Supports .csv files up to 5MB</p>
              </div>
              <input ref={fileInputRef} type="file" accept=".csv,.tsv,.txt" onChange={(e) => { const f = e.target.files?.[0]; if (f) processFile(f) }} className="hidden" />
              <div className="mt-4 rounded-xl p-4 bg-blue-50 border border-blue-100">
                <p className="text-xs text-gray-700 font-medium mb-1">Tips for realtor prospecting CSVs:</p>
                <p className="text-xs text-gray-500">- Export from LinkedIn, Realtor.com, or your CRM</p>
                <p className="text-xs text-gray-500">- Include at minimum: Name and Email</p>
                <p className="text-xs text-gray-500">- Brokerage and Area columns help with personalization</p>
                <p className="text-xs text-gray-500">- Duplicate emails will be skipped automatically</p>
              </div>
            </div>
          )}

          {/* MAP */}
          {step === 'map' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-gray-800">Map your CSV columns</p>
                <span className="text-xs px-2 py-1 rounded-full bg-[#115997]/10 text-[#115997] font-medium">{csvRows.length} rows</span>
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-1.5">Lead Source</label>
                <select value={defaultSource} onChange={(e) => setDefaultSource(e.target.value)} className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#115997] focus:border-transparent outline-none">
                  {SOURCE_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </select>
              </div>

              <div className="space-y-2">
                {PROSPECT_FIELDS.map(field => (
                  <div key={field.key} className="flex items-center gap-3 rounded-lg p-3 bg-gray-50 border border-gray-200">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800">
                        {field.label}
                        {field.required && <span className="text-red-500"> *</span>}
                      </p>
                    </div>
                    <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    <select
                      value={columnMapping[field.key] || ''}
                      onChange={(e) => setColumnMapping(prev => ({ ...prev, [field.key]: e.target.value }))}
                      className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#115997] focus:border-transparent outline-none"
                    >
                      <option value="">-- Skip --</option>
                      {csvHeaders.map(h => <option key={h} value={h}>{h}</option>)}
                    </select>
                  </div>
                ))}
              </div>

              {firstNameCol && lastNameCol && columnMapping['name'] === firstNameCol && (
                <div className="rounded-lg p-3 bg-blue-50 border border-blue-200 flex items-center gap-2">
                  <svg className="w-4 h-4 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-xs text-blue-700">First + Last Name will be combined into Name</p>
                </div>
              )}

              {!hasRequired && (
                <div className="rounded-lg p-3 bg-amber-50 border border-amber-200 flex items-center gap-2">
                  <svg className="w-4 h-4 text-amber-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.072 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <p className="text-xs text-amber-700">Map the Name column to continue</p>
                </div>
              )}
            </div>
          )}

          {/* REVIEW */}
          {step === 'review' && (
            <div className="space-y-4">
              <p className="text-sm font-medium text-gray-800">Preview (first 5 rows)</p>
              <div className="space-y-2">
                {csvRows.slice(0, 5).map((row, idx) => {
                  const preview = getMappedPreview(row)
                  return (
                    <div key={idx} className="rounded-lg p-3 bg-gray-50 border border-gray-200">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium px-1.5 py-0.5 rounded bg-[#115997]/10 text-[#115997]">{idx + 1}</span>
                        <p className="text-sm font-medium text-gray-900 truncate">{preview.name || 'Unnamed'}</p>
                      </div>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
                        {preview.email && <span>{preview.email}</span>}
                        {preview.phone && <span>{preview.phone}</span>}
                        {preview.brokerage && <span>{preview.brokerage}</span>}
                        {preview.area && <span>{preview.area}</span>}
                      </div>
                    </div>
                  )
                })}
              </div>
              {csvRows.length > 5 && (
                <p className="text-xs text-center text-gray-400">...and {csvRows.length - 5} more rows</p>
              )}
              <div className="rounded-xl p-4 bg-[#115997]/10 border border-[#115997]/20">
                <p className="text-sm font-medium text-[#115997]">Ready to import {csvRows.length} prospects</p>
                <p className="text-xs text-gray-500 mt-1">
                  Source: {SOURCE_OPTIONS.find(s => s.value === defaultSource)?.label} · Duplicate emails will be skipped
                </p>
              </div>
            </div>
          )}

          {/* IMPORTING */}
          {step === 'importing' && (
            <div className="py-12 text-center">
              <div className="w-10 h-10 border-4 border-[#115997] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="font-medium text-gray-800">Importing {csvRows.length} prospects...</p>
              <p className="text-sm text-gray-500 mt-1">This may take a moment</p>
            </div>
          )}

          {/* DONE */}
          {step === 'done' && result && (
            <div className="py-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-lg font-semibold text-gray-800 mb-1">
                {result.imported} prospect{result.imported !== 1 ? 's' : ''} imported
              </p>
              {result.duplicates > 0 && (
                <p className="text-sm text-amber-600">{result.duplicates} duplicate{result.duplicates !== 1 ? 's' : ''} skipped</p>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-gray-100 flex items-center gap-2"
          style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
        >
          {step === 'upload' && (
            <button onClick={handleClose} className="flex-1 px-4 py-3 sm:py-2.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-xl">Cancel</button>
          )}
          {step === 'map' && (
            <>
              <button onClick={() => { setStep('upload'); reset() }} className="flex-1 px-4 py-3 sm:py-2.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-xl">Back</button>
              <button onClick={() => setStep('review')} disabled={!hasRequired} className="flex-[1.3] px-4 py-3 sm:py-2.5 text-sm font-medium text-white bg-[#115997] rounded-xl disabled:opacity-40 flex items-center justify-center gap-2">
                Review
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
            </>
          )}
          {step === 'review' && (
            <>
              <button onClick={() => setStep('map')} className="flex-1 px-4 py-3 sm:py-2.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-xl">Back</button>
              <button onClick={() => { setStep('importing'); handleImport() }} disabled={importing} className="flex-[1.3] px-4 py-3 sm:py-2.5 text-sm font-medium text-white bg-[#115997] rounded-xl disabled:opacity-50 flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                Import {csvRows.length} Prospects
              </button>
            </>
          )}
          {step === 'done' && (
            <button onClick={handleClose} className="flex-1 px-4 py-3 sm:py-2.5 text-sm font-medium text-white bg-[#115997] rounded-xl">Done</button>
          )}
        </div>
      </div>
    </div>
  )
}