'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { Phone, Mail } from 'lucide-react'
import RevealObserver from '../components/RevealObserver'

declare global {
  interface Window {
    turnstile: {
      render: (container: HTMLElement, params: Record<string, unknown>) => string
      execute: (widgetId: string) => void
      reset: (widgetId: string) => void
    }
  }
}
import SelectWrapper from '../components/SelectWrapper'
import { brand } from '../../config/brand'
import { branches as branchList } from '../../data/branches'

type FormState = 'idle' | 'submitting' | 'success' | 'error'

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

const fieldStyle: React.CSSProperties = {
  marginBottom: '20px',
}

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null
  return <p style={{ fontSize: '0.75rem', color: '#f87171', marginTop: '4px' }}>{msg}</p>
}


export default function ContactPageClient() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', branch: '', message: '' })
  const [errors, setErrors] = useState<Partial<typeof form>>({})
  const [status, setStatus] = useState<FormState>('idle')
  const [errorMessage, setErrorMessage] = useState('Something went wrong. Please try again. If you need assistance, please contact your co-ordinator.')
  const honeypotRef = useRef<HTMLInputElement>(null)
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

  function set(field: keyof typeof form, value: string) {
    setForm(f => ({ ...f, [field]: value }))
    if (errors[field]) setErrors(e => ({ ...e, [field]: undefined }))
  }

  function validate() {
    const e: Partial<typeof form> = {}
    if (!form.name.trim()) e.name = 'Required'
    if (!form.email.trim()) e.email = 'Required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.phone.trim()) e.phone = 'Required'
    if (!form.branch) e.branch = 'Required'
    if (!form.message.trim()) e.message = 'Required'
    return e
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setStatus('submitting')
    try {
      const token = await getTurnstileToken()
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, turnstileToken: token, companyPhone: honeypotRef.current?.value ?? '' }),
      })
      const data = await res.json()
      if (!res.ok) {
        setErrorMessage(data.error || 'Something went wrong. Please try again. If you need assistance, please contact your co-ordinator.')
        setStatus('error')
        return
      }
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  const heroContent = (
    <section
      style={{
        position: 'relative',
        background: 'linear-gradient(to bottom, #1c1508 0%, #111111 55%, #000000 100%)',
        paddingTop: '180px',
        paddingBottom: '56px',
        overflow: 'hidden',
      }}
      aria-label="Contact hero"
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
          <span className="eyebrow">Contact</span>
        </div>
        <h1 className="reveal d1 font-display" style={{ fontWeight: 700, fontSize: 'clamp(2.4rem,5vw,4.5rem)', lineHeight: 1.05, letterSpacing: '-0.03em', color: '#fff' }}>
          {status === 'success' ? 'Message Sent' : 'Contact Us'}
        </h1>
        {status !== 'success' && (
          <>
            <p className="reveal d2" style={{ fontSize: '1rem', lineHeight: 1.78, color: 'var(--text-muted)', maxWidth: '480px', marginTop: '20px' }}>
              Whether you need staff or you&rsquo;re looking for work, get in touch and our team will respond as soon as possible.
            </p>
            <div style={{ width: '40px', height: '1px', background: 'rgba(255,255,255,0.15)', margin: '20px 0' }} />
            <div className="reveal d3" style={{ marginTop: '0', fontSize: '0.95rem', lineHeight: 1.78, color: 'var(--text-muted)' }}>
              <p>Prefer to call or email?</p>
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

  // ── Success state ──────────────────────────────────────────────────────────

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
                Message Sent
              </h2>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.75, maxWidth: '400px', margin: '0 auto' }}>
                Thanks for contacting {brand.name}. Our team will respond shortly.
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

  // ── Form ───────────────────────────────────────────────────────────────────

  return (
    <>
      <RevealObserver />
      {heroContent}

      {/* ── FORM SECTION ── */}
      <section style={{ background: 'var(--bg-dark)', padding: '36px 0 100px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px' }}>

          <div style={{ marginBottom: '32px', padding: '24px', background: 'rgba(252,212,21,0.06)', border: '1px solid rgba(252,212,21,0.15)', borderLeft: '3px solid var(--brand-primary)', borderRadius: '2px' }}>
            <p className="font-display" style={{ fontWeight: 600, fontSize: '0.9rem', color: '#fff', marginBottom: '8px' }}>Looking for Staff?</p>
            <p style={{ fontSize: '0.85rem', lineHeight: 1.65, color: 'var(--text-muted)', marginBottom: '14px' }}>
              If you need temporary or contract workers, please use our{' '}
              <a href="/request-staff" style={{ color: 'var(--brand-primary)', fontWeight: 500, textDecoration: 'none' }}>Request Staff</a>{' '}
              form so we can match you with the right people.
            </p>
            <p style={{ fontSize: '0.85rem', lineHeight: 1.65, color: 'var(--text-muted)', marginBottom: '14px' }}>
              If you are looking for work, please use our{' '}
              <a href="/find-work/apply" style={{ color: 'var(--brand-primary)', fontWeight: 500, textDecoration: 'none' }}>Job Application</a> form.
            </p>
            <p style={{ fontSize: '0.85rem', lineHeight: 1.65, color: 'var(--text-muted)' }}>For general enquiries, feel free to use the form below.</p>
          </div>

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
            <form autoComplete="off" onSubmit={handleSubmit} noValidate>

              {/* Honeypot field – hidden from users */}
              <input ref={honeypotRef} type="text" name="companyPhone" tabIndex={-1} autoComplete="off" className="absolute left-[-9999px] opacity-0 pointer-events-none" />

              <div style={fieldStyle}>
                <label htmlFor="name" style={labelStyle}>Name</label>
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  value={form.name}
                  onChange={e => set('name', e.target.value)}
                  style={{ ...inputStyle, borderColor: errors.name ? '#f87171' : 'rgba(255,255,255,0.12)' }}
                />
                <FieldError msg={errors.name} />
              </div>

              <div style={fieldStyle}>
                <label htmlFor="email" style={labelStyle}>Email</label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={e => set('email', e.target.value)}
                  style={{ ...inputStyle, borderColor: errors.email ? '#f87171' : 'rgba(255,255,255,0.12)' }}
                />
                <FieldError msg={errors.email} />
              </div>

              <div style={fieldStyle}>
                <label htmlFor="phone" style={labelStyle}>Phone</label>
                <input
                  id="phone"
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9+\s-]*"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={e => set('phone', e.target.value)}
                  style={{ ...inputStyle, borderColor: errors.phone ? '#f87171' : 'rgba(255,255,255,0.12)' }}
                />
                <FieldError msg={errors.phone} />
              </div>

              <div style={fieldStyle}>
                <label htmlFor="branch" style={labelStyle}>Branch</label>
                <SelectWrapper id="branch" value={form.branch} onChange={v => set('branch', v)} error={errors.branch} placeholder="Select a branch">
                  {branchList.map(b => <option key={b.slug} value={b.name} style={{ background: 'var(--color-bg-deep)', color: '#fff' }}>{b.name}</option>)}
                  <option value="General Enquiry" style={{ background: 'var(--color-bg-deep)', color: '#fff' }}>General Enquiry</option>
                </SelectWrapper>
                <FieldError msg={errors.branch} />
              </div>

              <div style={fieldStyle}>
                <label htmlFor="message" style={labelStyle}>Message</label>
                <textarea
                  id="message"
                  rows={5}
                  minLength={10}
                  required
                  value={form.message}
                  onChange={e => set('message', e.target.value)}
                  style={{ ...inputStyle, borderColor: errors.message ? '#f87171' : 'rgba(255,255,255,0.12)', resize: 'vertical' as const }}
                />
                <FieldError msg={errors.message} />
              </div>

              <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', margin: '0 0 24px' }} />

              <div ref={containerRef} style={{ display: 'none' }} />

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="btn-orange"
                style={{ width: '100%', padding: '14px 28px', fontSize: '0.9rem', justifyContent: 'center', opacity: status === 'submitting' ? 0.7 : 1, cursor: status === 'submitting' ? 'not-allowed' : 'pointer' }}
              >
                {status === 'submitting' ? 'Sending...' : 'Send Message'}
              </button>

              {status === 'error' && (
                <p
                  role="alert"
                  aria-live="assertive"
                  style={{ marginTop: '20px', fontSize: '0.9rem', color: '#f87171', textAlign: 'center', lineHeight: 1.6 }}
                >
                  {errorMessage}
                </p>
              )}

            </form>
          </div>

        </div>
      </section>
    </>
  )
}
