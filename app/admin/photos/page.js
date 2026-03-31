'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useAdminAuth } from '../layout'

// Client-side Supabase for direct storage uploads (bypasses Vercel 4.5MB limit)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export default function PhotosPage() {
  const { user, hasPermission } = useAdminAuth()
  const isAdmin = user?.role === 'admin'
  const fileInputRef = useRef(null)

  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState({ current: 0, total: 0 })
  const [selectedPhotos, setSelectedPhotos] = useState(new Set())
  const [selectMode, setSelectMode] = useState(false)
  const [previewPhoto, setPreviewPhoto] = useState(null)
  const [dragOver, setDragOver] = useState(false)
  const [deleting, setDeleting] = useState(null)
  const [downloadingAll, setDownloadingAll] = useState(false)
  const [toast, setToast] = useState(null)

  useEffect(() => { fetchPhotos() }, [])

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  const fetchPhotos = async () => {
    try {
      const r = await fetch('/api/admin/photos?limit=200')
      const res = await r.json()
      if (res.data) setPhotos(res.data)
    } catch (e) { console.error('Failed to fetch photos:', e) }
    finally { setLoading(false) }
  }

  const handleUpload = async (files) => {
    if (!files || files.length === 0) return

    const fileArray = Array.from(files)
    setUploading(true)
    setUploadProgress({ current: 0, total: fileArray.length })

    const MAX_SIZE = 10 * 1024 * 1024 // 10MB
    let totalUploaded = 0
    let totalErrors = 0

    for (let i = 0; i < fileArray.length; i++) {
      const file = fileArray[i]

      if (file.size > MAX_SIZE) {
        totalErrors++
        setUploadProgress({ current: i + 1, total: fileArray.length })
        continue
      }

      if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
        totalErrors++
        setUploadProgress({ current: i + 1, total: fileArray.length })
        continue
      }

      try {
        const timestamp = Date.now()
        const rand = Math.random().toString(36).slice(2, 8)
        const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg'
        const storagePath = `photos/${timestamp}-${rand}.${ext}`

        // Upload directly to Supabase Storage from browser (no Vercel limit)
        const { error: uploadError } = await supabase.storage
          .from('rsa-photos')
          .upload(storagePath, file, {
            contentType: file.type,
            cacheControl: '31536000',
            upsert: false
          })

        if (uploadError) {
          console.error('Storage upload error:', uploadError)
          totalErrors++
          setUploadProgress({ current: i + 1, total: fileArray.length })
          continue
        }

        const { data: urlData } = supabase.storage
          .from('rsa-photos')
          .getPublicUrl(storagePath)

        // Save metadata via API (tiny JSON, no file data)
        const r = await fetch('/api/admin/photos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            filename: storagePath,
            original_name: file.name,
            url: urlData?.publicUrl,
            file_size: file.size,
            mime_type: file.type,
            uploaded_by: user?.id || null,
            uploaded_by_name: user?.name || 'Unknown'
          })
        })

        if (r.ok) totalUploaded++
        else totalErrors++
      } catch (e) {
        console.error('Upload error:', e)
        totalErrors++
      }

      setUploadProgress({ current: i + 1, total: fileArray.length })
    }

    setUploading(false)
    setUploadProgress({ current: 0, total: 0 })

    if (totalUploaded > 0) {
      showToast(totalUploaded + ' photo' + (totalUploaded !== 1 ? 's' : '') + ' uploaded')
      fetchPhotos()
    }
    if (totalErrors > 0) {
      showToast(totalErrors + ' file' + (totalErrors !== 1 ? 's' : '') + ' failed to upload', 'error')
    }

    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this photo? This cannot be undone.')) return
    setDeleting(id)
    try {
      const r = await fetch('/api/admin/photos', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      })
      if (r.ok) {
        setPhotos(prev => prev.filter(p => p.id !== id))
        setSelectedPhotos(prev => { const n = new Set(prev); n.delete(id); return n })
        showToast('Photo deleted')
        if (previewPhoto?.id === id) setPreviewPhoto(null)
      } else {
        showToast('Failed to delete', 'error')
      }
    } catch (e) { showToast('Failed to delete', 'error') }
    finally { setDeleting(null) }
  }

  const handleBulkDelete = async () => {
    if (selectedPhotos.size === 0) return
    if (!confirm('Delete ' + selectedPhotos.size + ' photo' + (selectedPhotos.size !== 1 ? 's' : '') + '? This cannot be undone.')) return

    const ids = Array.from(selectedPhotos)
    let deleted = 0
    for (const id of ids) {
      try {
        const r = await fetch('/api/admin/photos', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id })
        })
        if (r.ok) deleted++
      } catch (e) { /* continue */ }
    }
    showToast(deleted + ' photo' + (deleted !== 1 ? 's' : '') + ' deleted')
    setSelectedPhotos(new Set())
    setSelectMode(false)
    fetchPhotos()
  }

  const downloadPhoto = async (photo) => {
    try {
      const r = await fetch(photo.url)
      const blob = await r.blob()
      const a = document.createElement('a')
      a.href = URL.createObjectURL(blob)
      a.download = photo.original_name || 'photo.jpg'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(a.href)
    } catch (e) {
      window.open(photo.url, '_blank')
    }
  }

  const downloadSelected = async () => {
    const selected = photos.filter(p => selectedPhotos.has(p.id))
    if (selected.length === 0) return
    if (selected.length === 1) { downloadPhoto(selected[0]); return }

    setDownloadingAll(true)
    try {
      for (const photo of selected) {
        await downloadPhoto(photo)
        await new Promise(r => setTimeout(r, 300))
      }
      showToast(selected.length + ' photos downloaded')
    } catch (e) {
      showToast('Some downloads may have failed', 'error')
    }
    finally { setDownloadingAll(false) }
  }

  const downloadAll = async () => {
    if (photos.length === 0) return
    setDownloadingAll(true)
    try {
      for (const photo of photos) {
        await downloadPhoto(photo)
        await new Promise(r => setTimeout(r, 300))
      }
      showToast(photos.length + ' photos downloaded')
    } catch (e) {
      showToast('Some downloads may have failed', 'error')
    }
    finally { setDownloadingAll(false) }
  }

  const toggleSelect = (id) => {
    setSelectedPhotos(prev => {
      const n = new Set(prev)
      if (n.has(id)) n.delete(id)
      else n.add(id)
      return n
    })
  }

  const selectAll = () => {
    if (selectedPhotos.size === photos.length) setSelectedPhotos(new Set())
    else setSelectedPhotos(new Set(photos.map(p => p.id)))
  }

  const handleDragOver = useCallback((e) => { e.preventDefault(); setDragOver(true) }, [])
  const handleDragLeave = useCallback((e) => { e.preventDefault(); setDragOver(false) }, [])
  const handleDrop = useCallback((e) => {
    e.preventDefault()
    setDragOver(false)
    const files = e.dataTransfer?.files
    if (files?.length > 0) handleUpload(files)
  }, [user])

  const formatSize = (bytes) => {
    if (!bytes) return ''
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / 1048576).toFixed(1) + ' MB'
  }

  const formatDate = (d) => {
    const date = new Date(d)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) +
      ' at ' + date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
  }

  const isVideo = (photo) => photo.mime_type?.startsWith('video/')

  if (loading) return <div className="flex items-center justify-center min-h-[50vh]"><div className="w-10 h-10 border-4 border-[#115997] border-t-transparent rounded-full animate-spin" /></div>

  return (
    <div className="px-4 py-4 sm:py-8"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg sm:text-2xl font-bold text-[#273373]">Photos</h2>
          <p className="text-gray-500 text-xs sm:text-sm">{photos.length} photo{photos.length !== 1 ? 's' : ''} uploaded</p>
        </div>
        <div className="flex items-center gap-2">
          {photos.length > 0 && (
            <button onClick={() => { setSelectMode(!selectMode); setSelectedPhotos(new Set()) }}
              className={'px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ' +
                (selectMode ? 'bg-[#115997] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200')}>
              {selectMode ? 'Cancel' : 'Select'}
            </button>
          )}
          <label className="px-3 py-1.5 text-xs font-medium bg-[#115997] text-white rounded-lg hover:bg-[#273373] transition-colors cursor-pointer flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            Upload
            <input ref={fileInputRef} type="file" multiple accept="image/*,video/*" className="hidden"
              onChange={(e) => handleUpload(e.target.files)} />
          </label>
        </div>
      </div>

      {/* Select mode toolbar */}
      {selectMode && (
        <div className="bg-white rounded-xl shadow-sm p-3 mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={selectAll} className="text-xs font-medium text-[#115997]">
              {selectedPhotos.size === photos.length ? 'Deselect all' : 'Select all'}
            </button>
            <span className="text-xs text-gray-500">{selectedPhotos.size} selected</span>
          </div>
          <div className="flex items-center gap-2">
            {selectedPhotos.size > 0 && (
              <>
                <button onClick={downloadSelected} disabled={downloadingAll}
                  className="px-3 py-1.5 text-xs font-medium bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                  {downloadingAll ? 'Downloading...' : 'Download'}
                </button>
                {isAdmin && (
                  <button onClick={handleBulkDelete}
                    className="px-3 py-1.5 text-xs font-medium bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors">
                    Delete
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {/* Upload progress */}
      {uploading && (
        <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Uploading photos...</span>
            <span className="text-xs text-gray-500">{uploadProgress.current} / {uploadProgress.total}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-[#115997] h-2 rounded-full transition-all duration-300"
              style={{ width: (uploadProgress.total > 0 ? (uploadProgress.current / uploadProgress.total) * 100 : 0) + '%' }} />
          </div>
        </div>
      )}

      {/* Drag overlay */}
      {dragOver && (
        <div className="fixed inset-0 bg-[#115997]/10 z-40 flex items-center justify-center pointer-events-none">
          <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
            <svg className="w-12 h-12 text-[#115997] mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
            <p className="text-lg font-semibold text-[#273373]">Drop photos here</p>
          </div>
        </div>
      )}

      {/* Empty state */}
      {photos.length === 0 && !uploading && (
        <label className="bg-white rounded-xl shadow-sm p-8 sm:p-12 text-center mb-6 border-2 border-dashed border-gray-300 hover:border-[#115997] transition-colors cursor-pointer block">
          <div className="w-16 h-16 bg-[#115997]/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-[#115997]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          </div>
          <p className="font-semibold text-gray-800 mb-1">No photos yet</p>
          <p className="text-sm text-gray-500 mb-4">Tap to upload from your camera roll, or drag and drop on desktop.</p>
          <span className="inline-flex px-4 py-2 bg-[#115997] text-white rounded-lg text-sm font-medium">Choose Photos</span>
          <input type="file" multiple accept="image/*,video/*" className="hidden"
            onChange={(e) => handleUpload(e.target.files)} />
        </label>
      )}

      {/* Download all button */}
      {photos.length > 0 && isAdmin && !selectMode && (
        <button onClick={downloadAll} disabled={downloadingAll}
          className="w-full sm:w-auto mb-4 px-4 py-2.5 text-sm font-medium bg-green-50 text-green-700 rounded-xl hover:bg-green-100 transition-colors flex items-center justify-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
          {downloadingAll ? 'Downloading all...' : 'Download All (' + photos.length + ')'}
        </button>
      )}

      {/* Photo grid */}
      {photos.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-1.5 sm:gap-2">
          {photos.map((photo) => (
            <div key={photo.id} className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 group cursor-pointer"
              onClick={() => {
                if (selectMode) toggleSelect(photo.id)
                else setPreviewPhoto(photo)
              }}>
              {isVideo(photo) ? (
                <video src={photo.url} className="w-full h-full object-cover" muted playsInline preload="metadata" />
              ) : (
                <img src={photo.url} alt={photo.original_name} className="w-full h-full object-cover" loading="lazy" />
              )}

              {isVideo(photo) && (
                <div className="absolute bottom-1 left-1 bg-black/60 rounded px-1.5 py-0.5 flex items-center gap-1">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                  <span className="text-white text-[9px] font-medium">Video</span>
                </div>
              )}

              {selectMode && (
                <div className={'absolute top-1.5 left-1.5 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ' +
                  (selectedPhotos.has(photo.id) ? 'bg-[#115997] border-[#115997]' : 'bg-white/80 border-white')}>
                  {selectedPhotos.has(photo.id) && (
                    <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  )}
                </div>
              )}

              {!selectMode && (
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors hidden sm:flex items-end justify-between p-2 opacity-0 group-hover:opacity-100">
                  <span className="text-white text-[10px] truncate max-w-[80%]">{photo.uploaded_by_name}</span>
                  <button onClick={(e) => { e.stopPropagation(); downloadPhoto(photo) }}
                    className="w-7 h-7 bg-white/90 rounded-full flex items-center justify-center hover:bg-white">
                    <svg className="w-3.5 h-3.5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                  </button>
                </div>
              )}
            </div>
          ))}

          {!selectMode && (
            <label className="relative aspect-square rounded-lg overflow-hidden bg-gray-50 border-2 border-dashed border-gray-300 hover:border-[#115997] transition-colors cursor-pointer flex flex-col items-center justify-center gap-1">
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              <span className="text-[10px] text-gray-400 font-medium">Add more</span>
              <input type="file" multiple accept="image/*,video/*" className="hidden"
                onChange={(e) => handleUpload(e.target.files)} />
            </label>
          )}
        </div>
      )}

      {/* Preview Modal */}
      {previewPhoto && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-0 sm:p-4"
          onClick={() => setPreviewPhoto(null)}>
          <button onClick={() => setPreviewPhoto(null)}
            className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30"
            style={{ top: 'max(1rem, env(safe-area-inset-top))' }}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>

          <div className="max-w-4xl max-h-[85vh] w-full" onClick={(e) => e.stopPropagation()}>
            {isVideo(previewPhoto) ? (
              <video src={previewPhoto.url} controls autoPlay playsInline className="max-w-full max-h-[70vh] mx-auto rounded-lg" />
            ) : (
              <img src={previewPhoto.url} alt={previewPhoto.original_name} className="max-w-full max-h-[70vh] mx-auto rounded-lg object-contain" />
            )}

            <div className="bg-white/10 backdrop-blur-sm rounded-xl mt-3 p-3 mx-2 sm:mx-0 flex items-center justify-between">
              <div className="min-w-0 flex-1 mr-3">
                <p className="text-white text-sm font-medium truncate">{previewPhoto.original_name}</p>
                <p className="text-white/60 text-xs">
                  {formatDate(previewPhoto.created_at)}
                  {previewPhoto.file_size ? ' · ' + formatSize(previewPhoto.file_size) : ''}
                  {previewPhoto.uploaded_by_name ? ' · ' + previewPhoto.uploaded_by_name : ''}
                </p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button onClick={() => downloadPhoto(previewPhoto)}
                  className="px-3 py-2 bg-white text-gray-800 rounded-lg text-xs font-medium hover:bg-gray-100 flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                  Download
                </button>
                {isAdmin && (
                  <button onClick={() => handleDelete(previewPhoto.id)} disabled={deleting === previewPhoto.id}
                    className="px-3 py-2 bg-red-500/80 text-white rounded-lg text-xs font-medium hover:bg-red-500 flex items-center gap-1.5 disabled:opacity-50">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    {deleting === previewPhoto.id ? '...' : 'Delete'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className={'fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-xl shadow-lg text-sm font-medium ' +
          (toast.type === 'error' ? 'bg-red-600 text-white' : 'bg-gray-800 text-white')}
          style={{ bottom: 'max(1.5rem, calc(env(safe-area-inset-bottom) + 0.5rem))' }}>
          {toast.msg}
        </div>
      )}
    </div>
  )
}