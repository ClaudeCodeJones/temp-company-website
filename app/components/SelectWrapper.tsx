'use client'

import React, { useState, useRef, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'

export default function SelectWrapper({
  id,
  value,
  onChange,
  error,
  placeholder,
  children,
}: {
  id?: string
  value: string
  onChange: (v: string) => void
  error?: string
  placeholder: string
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Build options from children
  const options: { value: string; label: string }[] = []
  React.Children.forEach(children, child => {
    if (React.isValidElement(child) && child.type === 'option') {
      const props = child.props as { value?: string; children?: React.ReactNode }
      if (props.value !== undefined && props.value !== '') {
        options.push({ value: props.value, label: String(props.children) })
      }
    }
  })

  const selected = options.find(o => o.value === value)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === 'Escape') setOpen(false)
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpen(o => !o) }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      const idx = options.findIndex(o => o.value === value)
      const next = options[Math.min(idx + 1, options.length - 1)]
      if (next) onChange(next.value)
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      const idx = options.findIndex(o => o.value === value)
      const prev = options[Math.max(idx - 1, 0)]
      if (prev) onChange(prev.value)
    }
  }

  const borderColor = error ? '#f87171' : 'rgba(255,255,255,0.12)'
  const sharedInputStyle: React.CSSProperties = {
    width: '100%',
    background: '#0d1f33',
    border: `1px solid ${borderColor}`,
    borderRadius: '2px',
    padding: '12px 16px',
    fontFamily: 'Inter, sans-serif',
    fontSize: '0.9rem',
    outline: 'none',
  }

  return (
    <div ref={ref} style={{ position: 'relative' }}>

      {/* Native select — mobile only (md and up: hidden) */}
      <select
        id={id}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="block md:hidden"
        style={{
          ...sharedInputStyle,
          color: value ? '#fff' : 'rgba(255,255,255,0.45)',
          paddingRight: '16px',
        }}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>

      {/* Custom dropdown — desktop only (below md: hidden) */}
      <div className="hidden md:block">
        <button
          id={id}
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={() => setOpen(o => !o)}
          onKeyDown={handleKey}
          style={{
            ...sharedInputStyle,
            padding: '12px 40px 12px 16px',
            color: selected ? '#fff' : 'rgba(255,255,255,0.45)',
            cursor: 'pointer',
            textAlign: 'left',
            display: 'block',
          }}
        >
          {selected ? selected.label : placeholder}
        </button>

        {/* Chevron */}
        <ChevronDown
          size={14}
          strokeWidth={1.5}
          style={{
            position: 'absolute', right: '14px', top: '50%',
            transform: `translateY(-50%) rotate(${open ? '180deg' : '0deg'})`,
            transition: 'transform 0.18s ease',
            pointerEvents: 'none', color: 'var(--text-muted)',
          }}
          aria-hidden="true"
        />

        {/* Dropdown list */}
        {open && (
          <ul
            role="listbox"
            style={{
              position: 'absolute',
              top: 'calc(100% + 4px)',
              left: 0,
              right: 0,
              background: '#0d1f33',
              border: '1px solid rgba(255,255,255,0.14)',
              borderRadius: '2px',
              margin: 0,
              padding: '4px 0',
              listStyle: 'none',
              zIndex: 50,
              boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
            }}
          >
            {options.map(opt => (
              <li
                key={opt.value}
                role="option"
                aria-selected={opt.value === value}
                onClick={() => { onChange(opt.value); setOpen(false) }}
                style={{
                  padding: '10px 16px',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  color: opt.value === value ? 'var(--brand-primary)' : '#fff',
                  background: opt.value === value ? 'rgba(253,79,0,0.08)' : 'transparent',
                }}
                onMouseEnter={e => {
                  if (opt.value !== value) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)'
                }}
                onMouseLeave={e => {
                  if (opt.value !== value) (e.currentTarget as HTMLElement).style.background = 'transparent'
                }}
              >
                {opt.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
