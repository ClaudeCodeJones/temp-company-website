'use client'

import { useState, useRef } from 'react'
import { useTurnstile } from '../../../hooks/useTurnstile'
import { Phone, Mail } from 'lucide-react'
import Link from 'next/link'
import RevealObserver from '../../components/RevealObserver'
import FieldError from '../../components/FieldError'
import SelectWrapper from '../../components/SelectWrapper'
import { brand } from '../../../config/brand'
import { branches } from '../../../data/branches'
import { inputStyle, labelStyle, fieldStyle } from '../../components/formStyles'

type FormState = {
  fullName: string
  companyName: string
  email: string
  phone: string
  branch: string
  otherRegion: string
  roleTitle: string
  salaryRange: string
  candidateDetails: string
}

type FormErrors = Partial<Record<keyof FormState, string>>
type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

export default function FindTalentEnquireClient() {
  const [status, setStatus] = useState<FormStatus>('idle')
  const [form, setForm] = useState<FormState>({
    fullName: '', companyName: '', email: '', phone: '',
    branch: '', otherRegion: '', roleTitle: '', salaryRange: '', candidateDetails: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const honeypotRef = useRef<HTMLInputElement>(null)
  const { containerRef, getTurnstileToken } = useTurnstile()

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
    if (!form.phone.trim()) e.phone = 'Required'
    if (!form.branch) e.branch = 'Please select a branch'
    if (!form.roleTitle.trim()) e.roleTitle = 'Required'
    if (!form.candidateDetails.trim()) e.candidateDetails = 'Required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function handleSubmit() {
    if (!validate()) return
    setStatus('submitting')
    try {
      const token = await getTurnstileToken()
      const res = await fetch('/api/find-talent-enquire', {
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
      style={{ position: 'relative', background: 'linear-gradient(to bottom, #0e1520 0%, #1a2535 55%, #000000 100%)', paddingTop: '180px', paddingBottom: '100px', overflow: 'hidden' }}
      aria-label="Permanent recruitment enquiry"
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
          <span className="eyebrow">Permanent Recruitment</span>
        </div>
        <h1 className="reveal d1 font-display" style={{ fontWeight: 700, fontSize: 'clamp(2.4rem,5vw,4.5rem)', lineHeight: 1.05, letterSpacing: '-0.03em', color: '#fff' }}>
          {status === 'success' ? 'Enquiry Submitted' : 'Find Talent'}
        </h1>
        {status !== 'success' && (
          <>
            <div className="reveal d2" style={{ fontSize: '0.95rem', lineHeight: 1.78, color: 'var(--text-muted)', maxWidth: '480px', marginTop: '20px' }}>
              <p>Tell us about the role you need to fill and what you are looking for in a candidate. Our team will be in touch.</p>
            </div>
            <div className="reveal d2" style={{ width: '40px', height: '1px', background: 'rgba(255,255,255,0.15)', margin: '20px 0' }} />
            <div className="reveal d3" style={{ fontSize: '0.95rem', lineHeight: 1.78, color: 'var(--text-muted)' }}>
              <p>Prefer to talk it through first?</p>
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
                Enquiry Submitted
              </h2>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.75, maxWidth: '400px', margin: '0 auto' }}>
                Thanks for getting in touch. Our team will review your enquiry and get back to you shortly.
              </p>
              <Link
                href="/"
                style={{ color: 'var(--brand-primary)', fontSize: '0.875rem', textDecoration: 'none', marginTop: '24px', display: 'inline-block' }}
              >
                Back to Home
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

            <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', margin: '4px 0 24px' }} />

            {/* branch */}
            <div style={fieldStyle}>
              <label htmlFor="branch" style={labelStyle}>Which region are you based in? *</label>
              <SelectWrapper id="branch" value={form.branch} onChange={v => setField('branch', v)} error={errors.branch} placeholder="Select a region">
                {branches.map(b => (
                  <option key={b.slug} value={b.name} style={{ background: 'var(--color-bg-deep)', color: '#fff' }}>{b.name}</option>
                ))}
                <option value="Other" style={{ background: 'var(--color-bg-deep)', color: '#fff' }}>Another Region</option>
              </SelectWrapper>
              <FieldError msg={errors.branch} />
            </div>

            {form.branch === 'Other' && (
              <div style={fieldStyle}>
                <label htmlFor="otherRegion" style={labelStyle}>Please specify your city or town *</label>
                <input
                  id="otherRegion"
                  type="text"
                  autoComplete="address-level2"
                  value={form.otherRegion}
                  onChange={e => setField('otherRegion', e.target.value)}
                  style={{ ...inputStyle, borderColor: 'rgba(255,255,255,0.12)' }}
                />
              </div>
            )}

            <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', margin: '4px 0 24px' }} />

            {/* roleTitle */}
            <div style={fieldStyle}>
              <label htmlFor="roleTitle" style={labelStyle}>Role Title *</label>
              <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginBottom: '8px' }}>e.g. Lab Technician, Operations Manager, Project Manager</p>
              <input
                id="roleTitle"
                type="text"
                value={form.roleTitle}
                onChange={e => setField('roleTitle', e.target.value)}
                style={{ ...inputStyle, borderColor: errors.roleTitle ? '#f87171' : 'rgba(255,255,255,0.12)' }}
              />
              <FieldError msg={errors.roleTitle} />
            </div>

            {/* salaryRange */}
            <div style={fieldStyle}>
              <label htmlFor="salaryRange" style={labelStyle}>
                Salary Range{' '}
                <span style={{ fontWeight: 400, textTransform: 'none', letterSpacing: 0, color: 'rgba(255,255,255,0.4)' }}>(optional)</span>
              </label>
              <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginBottom: '8px' }}>e.g. $95,000 to $105,000</p>
              <input
                id="salaryRange"
                type="text"
                value={form.salaryRange}
                onChange={e => setField('salaryRange', e.target.value)}
                style={{ ...inputStyle, borderColor: 'rgba(255,255,255,0.12)' }}
              />
            </div>

            <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', margin: '4px 0 24px' }} />

            {/* candidateDetails */}
            <div style={fieldStyle}>
              <label htmlFor="candidateDetails" style={labelStyle}>What are you looking for in a candidate? *</label>
              <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginBottom: '8px' }}>Tell us about the role, the team environment, key responsibilities, and any qualifications or experience that matter to you.</p>
              <textarea
                id="candidateDetails"
                rows={6}
                value={form.candidateDetails}
                onChange={e => setField('candidateDetails', e.target.value)}
                style={{ ...inputStyle, borderColor: errors.candidateDetails ? '#f87171' : 'rgba(255,255,255,0.12)', resize: 'vertical' as const }}
              />
              <FieldError msg={errors.candidateDetails} />
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
              {status === 'submitting' ? 'Submitting...' : 'Submit Enquiry'}
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
