'use client'

import { useState, useRef, useEffect } from 'react'
import { Phone, Mail, Calendar } from 'lucide-react'
import Link from 'next/link'
import RevealObserver from '../components/RevealObserver'
import { brand } from '../../config/brand'

declare global {
  interface Window {
    turnstile: {
      render: (container: HTMLElement, params: Record<string, unknown>) => string
      execute: (widgetId: string) => void
      reset: (widgetId: string) => void
    }
  }
}

// ── Shared styles ─────────────────────────────────────────────────────────────

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.12)',
  borderRadius: '2px',
  padding: '12px 16px',
  fontFamily: 'Inter, sans-serif',
  fontSize: '0.9rem',
  color: '#fff',
  outline: 'none',
  appearance: 'none' as const,
  colorScheme: 'dark' as const,
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: 'Inter, sans-serif',
  fontSize: '0.75rem',
  fontWeight: 600,
  letterSpacing: '0.08em',
  textTransform: 'uppercase' as const,
  color: 'var(--text-light)',
  marginBottom: '8px',
}

const fieldStyle: React.CSSProperties = { marginBottom: '20px' }

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null
  return <p style={{ fontSize: '0.75rem', color: '#f87171', marginTop: '4px' }}>{msg}</p>
}

function RadioGroup({ name, value, onChange, options, error }: {
  name: string; value: string; onChange: (v: string) => void
  options: { value: string; label: string }[]; error?: string
}) {
  return (
    <>
      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' as const }}>
        {options.map(opt => {
          const selected = value === opt.value
          return (
            <label key={opt.value} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.85rem', color: 'rgba(255,255,255,0.8)' }}>
              <input
                type="radio"
                name={name}
                value={opt.value}
                checked={selected}
                onChange={() => onChange(opt.value)}
                style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
              />
              <span style={{
                width: '16px', height: '16px', borderRadius: '50%', flexShrink: 0,
                border: selected ? '2px solid #fcd415' : '2px solid #9ca3af',
                background: selected ? 'var(--color-accent)' : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {selected && <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#fff' }} />}
              </span>
              {opt.label}
            </label>
          )
        })}
      </div>
      {error && <p style={{ fontSize: '0.75rem', color: '#f87171', marginTop: '4px' }}>{error}</p>}
    </>
  )
}

// ── Types ─────────────────────────────────────────────────────────────────────

type FormState = {
  fullName: string
  companyName: string
  email: string
  branch: string
  phone: string
  startDate: string
  message: string
}

type FormErrors = Partial<Record<keyof FormState, string>>
type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

const branchOptions = [
  { value: 'Wellington', label: 'Wellington' },
  { value: 'Marlborough', label: 'Marlborough' },
  { value: 'Canterbury', label: 'Canterbury' },
]

// ── Page ──────────────────────────────────────────────────────────────────────

export default function RequestQuotePageClient() {
  const [status, setStatus] = useState<FormStatus>('idle')
  const [form, setForm] = useState<FormState>({
    fullName: '', companyName: '', email: '',
    branch: '', phone: '', startDate: '', message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const honeypotRef = useRef<HTMLInputElement>(null)
  const startDateRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string>('')
  const callbackRef = useRef<((token: string) => void) | null>(null)

  useEffect(() => {
    const init = () => {
      if (!containerRef.current || widgetIdRef.current) return
      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!,
        size: 'invisible',
        callback: (token: string) => {
          callbackRef.current?.(token)
          callbackRef.current = null
        },
      })
    }
    if (typeof window !== 'undefined' && window.turnstile) {
      init()
    } else {
      const interval = setInterval(() => {
        if (window.turnstile) { clearInterval(interval); init() }
      }, 100)
      return () => clearInterval(interval)
    }
  }, [])

  function getTurnstileToken(): Promise<string> {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => reject(new Error('Turnstile timeout')), 15000)
      callbackRef.current = (token) => { clearTimeout(timeout); resolve(token) }
      if (widgetIdRef.current) {
        window.turnstile.reset(widgetIdRef.current)
        window.turnstile.execute(widgetIdRef.current)
      } else {
        clearTimeout(timeout)
        reject(new Error('Turnstile not ready'))
      }
    })
  }

  function setField(field: keyof FormState, value: string) {
    setForm(f => ({ ...f, [field]: value }))
    if (errors[field]) setErrors(e => ({ ...e, [field]: undefined }))
  }

  function validate(): boolean {
    const e: FormErrors = {}
    if (!form.fullName.trim()) e.fullName = 'Required'
    if (!form.companyName.trim()) e.companyName = 'Required'
    if (!form.email.trim()) e.email = 'Required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.branch) e.branch = 'Please select a branch'
    if (!form.phone.trim()) e.phone = 'Required'
    if (!form.message.trim()) e.message = 'Required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function handleSubmit() {
    if (!validate()) return
    setStatus('submitting')
    try {
      const token = await getTurnstileToken()
      const res = await fetch('/api/request-staff', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, turnstileToken: token, companyPhone: honeypotRef.current?.value ?? '' }),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  const heroContent = (
    <section
      style={{ position: 'relative', background: 'linear-gradient(to bottom, #0e1520 0%, #1a2535 55%, #000000 100%)', paddingTop: '180px', paddingBottom: '56px', overflow: 'hidden' }}
      aria-label="Request staff"
    >
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `
          repeating-linear-gradient(0deg, rgba(255,255,255,0.045) 0px, rgba(255,255,255,0.045) 1px, transparent 1px, transparent 60px),
          repeating-linear-gradient(90deg, rgba(255,255,255,0.045) 0px, rgba(255,255,255,0.045) 1px, transparent 1px, transparent 60px)
        `,
      }} />

      <div style={{ position: 'relative', zIndex: 10, maxWidth: '800px', margin: '0 auto', padding: '0 24px' }}>
        <div className="reveal" style={{ marginBottom: '20px' }}>
          <span className="eyebrow">Labour Hire</span>
        </div>
        <h1 className="reveal d1 font-display" style={{ fontWeight: 700, fontSize: 'clamp(2.4rem,5vw,4.5rem)', lineHeight: 1.05, letterSpacing: '-0.03em', color: '#fff' }}>
          {status === 'success' ? 'Request Submitted' : 'Request Staff'}
        </h1>
        {status !== 'success' && (
          <>
            <div className="reveal d2" style={{ fontSize: '0.95rem', lineHeight: 1.78, color: 'var(--text-muted)', maxWidth: '480px', marginTop: '20px' }}>
              <p>Tell us what workers you need and when, and our team will be in touch shortly.</p>
            </div>
            <div className="reveal d2" style={{ width: '40px', height: '1px', background: 'rgba(255,255,255,0.15)', margin: '20px 0' }} />
            <div className="reveal d3" style={{ fontSize: '0.95rem', lineHeight: 1.78, color: 'var(--text-muted)' }}>
              <p>Prefer to discuss it first?</p>
              <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                <a href="/about-us#operations-team" className="flex items-center gap-2 hover:opacity-80" style={{ color: 'var(--brand-primary)', fontWeight: 500, textDecoration: 'none', fontSize: '0.85rem' }}>
                  <Phone size={14} />
                  Call our Co-ordinator
                </a>
                <span style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>
                <a href={`mailto:${brand.emailContact}`} className="flex items-center gap-2 hover:opacity-80" style={{ color: 'var(--brand-primary)', fontWeight: 500, textDecoration: 'none', fontSize: '0.85rem' }}>
                  <Mail size={14} />
                  {brand.emailContact}
                </a>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  )

  // ── Success state ────────────────────────────────────────────────────────────

  if (status === 'success') {
    return (
      <>
        <RevealObserver />
        {heroContent}
        <section style={{ background: 'var(--bg-dark)', padding: '36px 0 100px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px' }}>
            <div style={{ background: 'var(--bg-elevated)', border: '1px solid rgba(255,255,255,0.08)', borderTop: '3px solid var(--brand-primary)', borderRadius: '2px', padding: '40px', textAlign: 'center' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h2 className="font-display" style={{ fontWeight: 700, fontSize: '1.5rem', color: '#fff', marginBottom: '12px' }}>
                Request Submitted
              </h2>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.75, maxWidth: '400px', margin: '0 auto' }}>
                Thanks for getting in touch. Our team will review your request and get back to you shortly.
              </p>
              <Link
                href="/"
                className="text-orange-500 text-sm hover:text-orange-400 transition mt-6 inline-block"
              >
                Back to Home →
              </Link>
            </div>
          </div>
        </section>
      </>
    )
  }

  // ── Form ─────────────────────────────────────────────────────────────────────

  return (
    <>
      <RevealObserver />
      {heroContent}

      <section style={{ background: 'var(--bg-dark)', padding: '36px 0 100px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px' }}>

          <div
            className="reveal"
            style={{
              background: 'var(--bg-elevated)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderTop: '3px solid var(--brand-primary)',
              borderRadius: '2px',
              padding: '40px',
            }}
          >
            {/* Honeypot field */}
            <input ref={honeypotRef} type="text" name="companyPhone" tabIndex={-1} autoComplete="off" className="absolute left-[-9999px] opacity-0 pointer-events-none" />

            {/* fullName */}
            <div style={fieldStyle}>
              <label htmlFor="fullName" style={labelStyle}>Name *</label>
              <input
                id="fullName"
                type="text"
                autoComplete="name"
                value={form.fullName}
                onChange={e => setField('fullName', e.target.value)}
                style={{ ...inputStyle, borderColor: errors.fullName ? '#f87171' : 'rgba(255,255,255,0.12)' }}
              />
              <FieldError msg={errors.fullName} />
            </div>

            {/* companyName */}
            <div style={fieldStyle}>
              <label htmlFor="companyName" style={labelStyle}>Company Name *</label>
              <input
                id="companyName"
                type="text"
                autoComplete="organization"
                value={form.companyName}
                onChange={e => setField('companyName', e.target.value)}
                style={{ ...inputStyle, borderColor: errors.companyName ? '#f87171' : 'rgba(255,255,255,0.12)' }}
              />
              <FieldError msg={errors.companyName} />
            </div>

            {/* email */}
            <div style={fieldStyle}>
              <label htmlFor="email" style={labelStyle}>Email Address *</label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={e => setField('email', e.target.value)}
                style={{ ...inputStyle, borderColor: errors.email ? '#f87171' : 'rgba(255,255,255,0.12)' }}
              />
              <FieldError msg={errors.email} />
            </div>

            <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', margin: '4px 0 24px' }} />

            {/* branch */}
            <div style={fieldStyle}>
              <label style={labelStyle}>Which branch do you need workers from? *</label>
              <RadioGroup
                name="branch"
                value={form.branch}
                onChange={v => setField('branch', v)}
                options={branchOptions}
                error={errors.branch}
              />
            </div>

            <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', margin: '4px 0 24px' }} />

            {/* phone */}
            <div style={fieldStyle}>
              <label htmlFor="phone" style={labelStyle}>Phone *</label>
              <input
                id="phone"
                type="tel"
                inputMode="numeric"
                pattern="[0-9+\s-]*"
                autoComplete="tel"
                value={form.phone}
                onChange={e => setField('phone', e.target.value)}
                style={{ ...inputStyle, borderColor: errors.phone ? '#f87171' : 'rgba(255,255,255,0.12)' }}
              />
              <FieldError msg={errors.phone} />
            </div>

            {/* startDate */}
            <div style={fieldStyle}>
              <label htmlFor="startDate" style={labelStyle}>When do you require staff?</label>
              <div style={{ position: 'relative' }}>
                {!form.startDate && (
                  <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', color: 'rgba(255,255,255,0.45)', pointerEvents: 'none', zIndex: 1 }}>Select date</span>
                )}
                <input
                  ref={startDateRef}
                  id="startDate"
                  type="date"
                  value={form.startDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={e => setField('startDate', e.target.value)}
                  style={{ ...inputStyle, color: form.startDate ? '#fff' : 'transparent', paddingRight: '44px' }}
                />
                <button
                  type="button"
                  onClick={() => startDateRef.current?.showPicker()}
                  style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', padding: '4px', cursor: 'pointer', color: 'rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center' }}
                  tabIndex={-1}
                  aria-label="Open date picker"
                >
                  <Calendar size={16} strokeWidth={1.5} aria-hidden="true" />
                </button>
              </div>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)', marginTop: '6px', lineHeight: 1.6 }}>
                Leave blank if this is a general enquiry
              </p>
            </div>

            <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', margin: '4px 0 24px' }} />

            {/* message */}
            <div style={fieldStyle}>
              <label htmlFor="message" style={labelStyle}>Tell us what staff you need *</label>
              <textarea
                id="message"
                rows={5}
                value={form.message}
                onChange={e => setField('message', e.target.value)}
                style={{ ...inputStyle, borderColor: errors.message ? '#f87171' : 'rgba(255,255,255,0.12)', resize: 'vertical' as const }}
              />
              <FieldError msg={errors.message} />
            </div>

            <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', margin: '4px 0 24px' }} />

            <div ref={containerRef} style={{ display: 'none' }} />

            <button
              type="button"
              onClick={handleSubmit}
              disabled={status === 'submitting'}
              className="btn-orange"
              style={{ width: '100%', padding: '14px 28px', fontSize: '0.9rem', justifyContent: 'center', opacity: status === 'submitting' ? 0.7 : 1, cursor: status === 'submitting' ? 'not-allowed' : 'pointer' }}
            >
              {status === 'submitting' ? 'Submitting...' : 'Submit Request'}
            </button>

            {status === 'error' && (
              <p role="alert" aria-live="assertive" style={{ marginTop: '20px', fontSize: '0.9rem', color: '#f87171', textAlign: 'center', lineHeight: 1.6 }}>
                Something went wrong. Please try again or call our co-ordinator.
              </p>
            )}
          </div>

        </div>
      </section>
    </>
  )
}
