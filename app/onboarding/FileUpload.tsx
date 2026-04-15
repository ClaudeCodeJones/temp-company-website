'use client'

import { useRef, useState, DragEvent, ChangeEvent } from 'react'
import { Upload, X, FileText } from 'lucide-react'

export type UploadedFile = {
  filename: string
  contentType: string
  data: string
  size: number
}

const DEFAULT_MAX_BYTES = 10 * 1024 * 1024
const ALLOWED = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif', 'application/pdf']

async function fileToBase64(file: File): Promise<string> {
  const buf = await file.arrayBuffer()
  const bytes = new Uint8Array(buf)
  let binary = ''
  const chunkSize = 0x8000
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize))
  }
  return btoa(binary)
}

export default function FileUpload({
  value,
  onChange,
  error,
  helperText,
  maxBytes = DEFAULT_MAX_BYTES,
}: {
  value: UploadedFile | null
  onChange: (file: UploadedFile | null) => void
  error?: string
  helperText?: string
  maxBytes?: number
}) {
  const maxMb = Math.round(maxBytes / (1024 * 1024))
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)
  const [localError, setLocalError] = useState<string>('')

  async function handleFile(file: File) {
    setLocalError('')
    if (!ALLOWED.includes(file.type)) {
      setLocalError('Only JPG, PNG, WebP, HEIC or PDF files are supported.')
      return
    }
    if (file.size > maxBytes) {
      setLocalError(`File must be under ${maxMb}MB.`)
      return
    }
    try {
      const data = await fileToBase64(file)
      onChange({
        filename: file.name,
        contentType: file.type,
        data,
        size: file.size,
      })
    } catch {
      setLocalError('Failed to read file. Please try again.')
    }
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) handleFile(file)
  }

  function handleSelect(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
    e.target.value = ''
  }

  function clear() {
    onChange(null)
    setLocalError('')
  }

  const displayError = error || localError
  const borderColor = displayError ? '#f87171' : dragging ? 'var(--brand-primary)' : 'rgba(255,255,255,0.14)'
  const kb = value ? Math.round(value.size / 1024) : 0

  return (
    <div>
      {!value && (
        <div
          onDragOver={e => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          role="button"
          tabIndex={0}
          onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); inputRef.current?.click() } }}
          style={{
            border: `1.5px dashed ${borderColor}`,
            background: dragging ? 'rgba(252,212,21,0.05)' : 'rgba(255,255,255,0.03)',
            borderRadius: '4px',
            padding: '28px 20px',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'border-color 0.15s ease, background 0.15s ease',
          }}
        >
          <Upload size={22} strokeWidth={1.5} style={{ color: 'var(--text-muted)', margin: '0 auto 10px' }} aria-hidden="true" />
          <p style={{ fontSize: '0.85rem', color: '#fff', marginBottom: '4px' }}>
            Drag and drop a file or <span style={{ color: 'var(--brand-primary)', fontWeight: 500 }}>browse</span>
          </p>
          <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
            JPG, PNG or PDF &middot; max {maxMb}MB
          </p>
        </div>
      )}

      {value && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: '12px',
          padding: '12px 14px',
          border: '1px solid rgba(255,255,255,0.12)',
          background: 'rgba(255,255,255,0.03)',
          borderRadius: '4px',
        }}>
          <FileText size={18} strokeWidth={1.5} style={{ color: 'var(--brand-primary)', flexShrink: 0 }} aria-hidden="true" />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: '0.85rem', color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {value.filename}
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
              {kb} KB
            </div>
          </div>
          <button
            type="button"
            onClick={clear}
            aria-label="Remove file"
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'var(--text-muted)', padding: '4px',
              display: 'flex', alignItems: 'center',
            }}
          >
            <X size={16} strokeWidth={1.5} />
          </button>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept=".jpg,.jpeg,.png,.webp,.heic,.heif,.pdf"
        onChange={handleSelect}
        style={{ display: 'none' }}
      />

      {helperText && !displayError && (
        <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '6px', lineHeight: 1.5 }}>
          {helperText}
        </p>
      )}
      {displayError && (
        <p style={{ fontSize: '0.75rem', color: '#f87171', marginTop: '6px' }}>{displayError}</p>
      )}
    </div>
  )
}
