'use client'

import { useState, useRef, ChangeEvent } from 'react'
import { Phone, Mail, Calendar } from 'lucide-react'
import Link from 'next/link'
import Turnstile from 'react-turnstile'
import RevealObserver from '../components/RevealObserver'
import SelectWrapper from '../components/SelectWrapper'
import { brand } from '../../config/brand'
import { branches as branchList } from '../../data/branches'

// ── Shared styles (match contact page) ───────────────────────────────────────

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
            <label key={opt.value} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.9rem', color: selected ? '#fff' : 'var(--text-muted)' }}>
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
                border: selected ? '2px solid #fd4f00' : '2px solid #9ca3af',
                background: selected ? '#fd4f00' : 'transparent',
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

// ── Constants ─────────────────────────────────────────────────────────────────

const timeOptions: { value: string; label: string }[] = []
for (let m = 7 * 60; m <= 16 * 60; m += 15) {
  const h = Math.floor(m / 60)
  const min = m % 60
  const ampm = h < 12 ? 'AM' : 'PM'
  const h12 = h % 12 || 12
  timeOptions.push({
    value: `${h.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`,
    label: `${h12}:${min.toString().padStart(2, '0')} ${ampm}`,
  })
}

const yesNo = [{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]
const yesNoUnsure = [{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }, { value: 'unsure', label: 'Unsure' }]

// ── Types ─────────────────────────────────────────────────────────────────────

type S1 = {
  fullName: string; companyName: string; title: string
  phone: string; email: string; hasAccount: string; branch: string
}

type S2 = {
  projectName: string; projectTiming: string; location: string; hasLocationFile: boolean; locationFile: File | null
  plantNeeded: string; workTimes: string; unattendedSite: string
  selfTM: string; selfTMDetail: string; wantsTMP: string; wantsCAR: string
  costType: string; onsiteMeeting: string; meetingDate: string; meetingTime: string
  otherInfo: string
}

type S1Errors = Partial<Record<keyof S1, string>>
type S2Errors = Partial<Record<keyof S2, string>>
type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

// ── Page ──────────────────────────────────────────────────────────────────────

export default function RequestQuotePageClient() {
  const [step, setStep] = useState<1 | 2>(1)
  const [status, setStatus] = useState<FormStatus>('idle')

  const [s1, setS1] = useState<S1>({
    fullName: '', companyName: '', title: '',
    phone: '', email: '', hasAccount: '', branch: '',
  })
  const [s1Errors, setS1Errors] = useState<S1Errors>({})

  const [s2, setS2] = useState<S2>({
    projectName: '', projectTiming: '', location: '', hasLocationFile: false, locationFile: null,
    plantNeeded: '', workTimes: '', unattendedSite: '',
    selfTM: '', selfTMDetail: '', wantsTMP: '', wantsCAR: '',
    costType: '', onsiteMeeting: '', meetingDate: '', meetingTime: '',
    otherInfo: '',
  })
  const [s2Errors, setS2Errors] = useState<S2Errors>({})
  const [fileError, setFileError] = useState('')
  const [turnstileToken, setTurnstileToken] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)
  const honeypotRef = useRef<HTMLInputElement>(null)
  const meetingDateRef = useRef<HTMLInputElement>(null)

  function setF1(field: keyof S1, value: string) {
    setS1(f => ({ ...f, [field]: value }))
    if (s1Errors[field]) setS1Errors(e => ({ ...e, [field]: undefined }))
    // Clear Lump Sum if branch changes away from Wellington
    if (field === 'branch' && value !== 'Wellington' && s2.costType === 'Lump Sum') {
      setS2(f => ({ ...f, costType: '' }))
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function setF2(field: keyof S2, value: any) {
    setS2(f => ({ ...f, [field]: value }))
    if (s2Errors[field]) setS2Errors(e => ({ ...e, [field]: undefined }))
  }

  function validateStep1(): boolean {
    const e: S1Errors = {}
    if (!s1.fullName.trim()) e.fullName = 'Required'
    if (!s1.companyName.trim()) e.companyName = 'Required'
    if (!s1.title.trim()) e.title = 'Required'
    if (!s1.phone.trim()) e.phone = 'Required'
    if (!s1.email.trim()) e.email = 'Required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s1.email)) e.email = 'Enter a valid email'
    if (!s1.hasAccount) e.hasAccount = 'Please select an option'
    if (!s1.branch) e.branch = 'Required'
    setS1Errors(e)
    return Object.keys(e).length === 0
  }

  function validateStep2(): boolean {
    const e: S2Errors = {}
    if (!s2.projectName.trim()) e.projectName = 'Required'
    if (!s2.projectTiming.trim()) e.projectTiming = 'Required'
    if (!s2.location.trim()) e.location = 'Required'
    if (!s2.plantNeeded.trim()) e.plantNeeded = 'Required'
    if (!s2.workTimes.trim()) e.workTimes = 'Required'
    if (!s2.unattendedSite) e.unattendedSite = 'Please select an option'
    if (!s2.selfTM) e.selfTM = 'Please select an option'
    if (s2.selfTM === 'yes' && !s2.selfTMDetail.trim()) e.selfTMDetail = 'Required'
    if (!s2.wantsTMP) e.wantsTMP = 'Please select an option'
    if (s2.wantsTMP === 'yes' && !s2.wantsCAR) e.wantsCAR = 'Please select an option'
    if (!s2.costType) e.costType = 'Required'
    if (!s2.onsiteMeeting) e.onsiteMeeting = 'Please select an option'
    if (s2.onsiteMeeting === 'yes') {
      if (!s2.meetingDate) e.meetingDate = 'Required'
      if (!s2.meetingTime) e.meetingTime = 'Required'
    }
    setS2Errors(e)
    return Object.keys(e).length === 0
  }

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) { setF2('locationFile', null); return }
    const allowedTypes = [
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'image/jpeg', 'application/pdf', 'image/png',
    ]
    const ext = file.name.split('.').pop()?.toLowerCase() ?? ''
    const allowedExts = ['docx', 'jpeg', 'jpg', 'pdf', 'png']
    if (!allowedTypes.includes(file.type) && !allowedExts.includes(ext)) {
      setFileError('Invalid file type. Accepted: DOCX, JPEG, PDF, PNG')
      e.target.value = ''
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      setFileError('File exceeds the 5MB limit')
      e.target.value = ''
      return
    }
    setFileError('')
    setF2('locationFile', file)
  }

  function toBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve((reader.result as string).split(',')[1])
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  async function handleSubmit() {
    if (!validateStep2()) return
    setStatus('submitting')
    try {
      let fileData: { name: string; base64: string; type: string } | null = null
      if (s2.locationFile) {
        const base64 = await toBase64(s2.locationFile)
        fileData = { name: s2.locationFile.name, base64, type: s2.locationFile.type }
      }
      const res = await fetch('/api/request-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...s1, ...s2, locationFile: undefined, fileData, turnstileToken, companyPhone: honeypotRef.current?.value ?? '' }),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  // Lump Sum only available for Wellington
  const costTypes = ['Hourly', 'Daily', 'Weekly', ...(s1.branch === 'Wellington' ? ['Lump Sum'] : [])]

  const heroContent = (
    <section
      style={{ position: 'relative', background: '#070f1b', paddingTop: '180px', paddingBottom: '56px', overflow: 'hidden' }}
      aria-label="Request an estimate"
    >
      <div style={{ position: 'absolute', top: '-100px', left: '50%', transform: 'translateX(-50%)', width: '700px', height: '700px', background: 'radial-gradient(circle, rgba(242,101,34,0.07) 0%, transparent 65%)', pointerEvents: 'none' }} aria-hidden="true" />

      <div style={{ position: 'relative', zIndex: 10, maxWidth: '800px', margin: '0 auto', padding: '0 24px' }}>
        <div className="reveal" style={{ marginBottom: '20px' }}>
          <span className="eyebrow">Traffic Management Services</span>
        </div>
        <h1 className="reveal d1 font-display" style={{ fontWeight: 700, fontSize: 'clamp(2.4rem,5vw,4.5rem)', lineHeight: 1.05, letterSpacing: '-0.03em', color: '#fff' }}>
          {status === 'success' ? 'Request Submitted' : 'Request an Estimate'}
        </h1>
        {status !== 'success' && (
          <>
            <div className="reveal d2" style={{ fontSize: '0.95rem', lineHeight: 1.78, color: 'var(--text-muted)', maxWidth: '480px', marginTop: '20px' }}>
              <p>Provide a few details about your project and we&apos;ll prepare pricing for you. If we need any additional information, we&apos;ll get in touch.</p>
            </div>
            <div className="reveal d2" style={{ width: '40px', height: '1px', background: 'rgba(255,255,255,0.15)', margin: '20px 0' }} />
            <div className="reveal d3" style={{ fontSize: '0.95rem', lineHeight: 1.78, color: 'var(--text-muted)' }}>
              <p>Prefer to discuss it first?</p>
              <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                <a href={`tel:${brand.phoneTel}`} className="flex items-center gap-2 hover:opacity-80" style={{ color: 'var(--brand-primary)', fontWeight: 500, textDecoration: 'none', fontSize: '0.85rem' }}>
                  <Phone size={14} />
                  {brand.phone}
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

  // ── Success state ─────────────────────────────────────────────────────────

  if (status === 'success') {
    return (
      <>
        <RevealObserver />
        {heroContent}
        <section style={{ background: 'var(--bg-dark)', padding: '36px 0 100px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px' }}>
            <div style={{ background: 'var(--bg-mid)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '4px', padding: 'clamp(28px, 5vw, 48px)', textAlign: 'center' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h2 className="font-display" style={{ fontWeight: 700, fontSize: '1.5rem', color: '#fff', marginBottom: '12px' }}>
                Request Submitted
              </h2>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.75, maxWidth: '400px', margin: '0 auto' }}>
                Thank you for providing your project details. Our team will review the information and get back to you shortly.
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

  // ── Form ──────────────────────────────────────────────────────────────────

  return (
    <>
      <RevealObserver />
      {heroContent}

      <section style={{ background: 'var(--bg-dark)', padding: '36px 0 100px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px' }}>

          {/* Progress indicator */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '32px' }}>
            {[1, 2].map((n, i) => (
              <div key={n} style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'center', gap: '6px' }}>
                  <div style={{
                    width: '32px', height: '32px', borderRadius: '50%',
                    background: step >= n ? 'var(--brand-primary)' : 'rgba(255,255,255,0.08)',
                    border: step >= n ? 'none' : '1px solid rgba(255,255,255,0.18)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.8rem', fontWeight: 700, color: '#fff',
                    transition: 'background 0.2s ease',
                  }}>{n}</div>
                  <span style={{
                    fontSize: '0.68rem', letterSpacing: '0.06em',
                    color: step === n ? '#fff' : 'var(--text-muted)',
                    fontWeight: step === n ? 600 : 400,
                    whiteSpace: 'nowrap' as const,
                  }}>
                    {n === 1 ? 'Client Details' : 'Project Details'}
                  </span>
                </div>
                {i === 0 && (
                  <div style={{ width: '72px', height: '1px', background: step >= 2 ? 'var(--brand-primary)' : 'rgba(255,255,255,0.12)', margin: '0 8px 20px', flexShrink: 0, transition: 'background 0.2s ease' }} />
                )}
              </div>
            ))}
          </div>

          {/* Card */}
          <div
            className="reveal"
            style={{
              background: 'var(--bg-mid)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '4px',
              padding: 'clamp(28px, 5vw, 48px)',
            }}
          >
            <p style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: 'var(--brand-primary)', marginBottom: '28px' }}>
              Step {step} of 2: {step === 1 ? 'Client Details' : 'Project Details'}
            </p>

            {/* ── STEP 1: CLIENT DETAILS ── */}
            {step === 1 && (
              <div>

                {/* Honeypot field – hidden from users */}
                <input ref={honeypotRef} type="text" name="companyPhone" tabIndex={-1} autoComplete="off" className="absolute left-[-9999px] opacity-0 pointer-events-none" />

                <div style={fieldStyle}>
                  <label htmlFor="fullName" style={labelStyle}>Full Name *</label>
                  <input id="fullName" type="text" autoComplete="name" placeholder="e.g. Blair Johnson" value={s1.fullName} onChange={e => setF1('fullName', e.target.value)}
                    style={{ ...inputStyle, borderColor: s1Errors.fullName ? '#f87171' : 'rgba(255,255,255,0.12)' }} />
                  <FieldError msg={s1Errors.fullName} />
                </div>

                <div style={fieldStyle}>
                  <label htmlFor="companyName" style={labelStyle}>Company Name *</label>
                  <input id="companyName" type="text" autoComplete="organization" value={s1.companyName} onChange={e => setF1('companyName', e.target.value)}
                    style={{ ...inputStyle, borderColor: s1Errors.companyName ? '#f87171' : 'rgba(255,255,255,0.12)' }} />
                  <FieldError msg={s1Errors.companyName} />
                </div>

                <div style={fieldStyle}>
                  <label htmlFor="title" style={labelStyle}>Title *</label>
                  <input id="title" type="text" autoComplete="organization-title" placeholder="e.g. Project Manager, Director, GM" value={s1.title} onChange={e => setF1('title', e.target.value)}
                    style={{ ...inputStyle, borderColor: s1Errors.title ? '#f87171' : 'rgba(255,255,255,0.12)' }} />
                  <FieldError msg={s1Errors.title} />
                </div>

                <div style={fieldStyle}>
                  <label htmlFor="phone" style={labelStyle}>Phone Number *</label>
                  <input id="phone" type="tel" inputMode="numeric" pattern="[0-9+\s-]*" autoComplete="tel" value={s1.phone} onChange={e => setF1('phone', e.target.value)}
                    style={{ ...inputStyle, borderColor: s1Errors.phone ? '#f87171' : 'rgba(255,255,255,0.12)' }} />
                  <FieldError msg={s1Errors.phone} />
                </div>

                <div style={fieldStyle}>
                  <label htmlFor="email" style={labelStyle}>Email *</label>
                  <input id="email" type="email" autoComplete="email" value={s1.email} onChange={e => setF1('email', e.target.value)}
                    style={{ ...inputStyle, borderColor: s1Errors.email ? '#f87171' : 'rgba(255,255,255,0.12)' }} />
                  <FieldError msg={s1Errors.email} />
                </div>

                <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', margin: '0 0 24px' }} />

                <div style={fieldStyle}>
                  <label htmlFor="branch" style={labelStyle}>Branch *</label>
                  <SelectWrapper id="branch" value={s1.branch} onChange={v => setF1('branch', v)} error={s1Errors.branch} placeholder="Select a branch">
                    {branchList.map(b => <option key={b.slug} value={b.name} style={{ background: '#0d1f33', color: '#fff' }}>{b.name}</option>)}
                  </SelectWrapper>
                  <FieldError msg={s1Errors.branch} />
                </div>

                <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', margin: '0 0 24px' }} />

                <div style={fieldStyle}>
                  <label style={labelStyle}>Do you have an account with {brand.name} currently? *</label>
                  <RadioGroup
                    name="hasAccount"
                    value={s1.hasAccount}
                    onChange={v => setF1('hasAccount', v)}
                    options={yesNoUnsure}
                    error={s1Errors.hasAccount}
                  />
                  {s1.hasAccount === 'unsure' && (
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '16px', lineHeight: 1.5 }}>
                      Unsure is fine, we can confirm this when reviewing your request.
                    </p>
                  )}
                </div>

                <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', margin: '0 0 24px' }} />

                <button
                  type="button"
                  onClick={() => { if (validateStep1()) setStep(2) }}
                  className="btn-orange"
                  style={{ width: '100%', padding: '14px 28px', fontSize: '0.9rem', justifyContent: 'center' }}
                >
                  Next
                </button>
              </div>
            )}

            {/* ── STEP 2: PROJECT DETAILS ── */}
            {step === 2 && (
              <div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.65, marginBottom: '24px' }}>
                  If you&apos;re unsure about any field, simply enter &ldquo;Unsure&rdquo; and we can discuss the details later.
                </p>

                {/* Project name */}
                <div style={fieldStyle}>
                  <label htmlFor="projectName" style={labelStyle}>Project/Job Name *</label>
                  <input id="projectName" type="text" placeholder='e.g. "Main St Bridge Maintenance"' value={s2.projectName} onChange={e => setF2('projectName', e.target.value)}
                    style={{ ...inputStyle, borderColor: s2Errors.projectName ? '#f87171' : 'rgba(255,255,255,0.12)' }} />
                  <FieldError msg={s2Errors.projectName} />
                </div>

                {/* Project Timing */}
                <div style={fieldStyle}>
                  <label htmlFor="projectTiming" style={labelStyle}>Project Timing / Start Date *</label>
                  <input id="projectTiming" type="text" placeholder='e.g. "11 May", "Late July" or "TBC"' value={s2.projectTiming} onChange={e => setF2('projectTiming', e.target.value)}
                    style={{ ...inputStyle, borderColor: s2Errors.projectTiming ? '#f87171' : 'rgba(255,255,255,0.12)' }} />
                  <FieldError msg={s2Errors.projectTiming} />
                </div>

                <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', margin: '0 0 24px' }} />

                {/* Location */}
                <div style={fieldStyle}>
                  <label htmlFor="location" style={labelStyle}>Location &amp; supporting documents *</label>
                  <input id="location" type="text" placeholder="Enter the site address or description of area" value={s2.location} onChange={e => setF2('location', e.target.value)}
                    style={{ ...inputStyle, borderColor: s2Errors.location ? '#f87171' : 'rgba(255,255,255,0.12)' }} />
                  <FieldError msg={s2Errors.location} />
                </div>

                {/* Location file checkbox */}
                <div style={fieldStyle}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '0.9rem', color: 'var(--text-light)' }}>
                    <input
                      type="checkbox"
                      checked={s2.hasLocationFile}
                      onChange={e => {
                        setF2('hasLocationFile', e.target.checked)
                        if (!e.target.checked) {
                          setF2('locationFile', null)
                          setFileError('')
                          if (fileRef.current) fileRef.current.value = ''
                        }
                      }}
                      style={{ accentColor: 'var(--brand-primary)', width: '16px', height: '16px', cursor: 'pointer', flexShrink: 0 }}
                    />
                    I have location information to upload
                  </label>
                </div>

                {/* File upload (conditional) */}
                {s2.hasLocationFile && (
                  <div style={fieldStyle}>
                    <label htmlFor="locationFile" style={labelStyle}>Upload Location Information</label>
                    <input
                      ref={fileRef}
                      id="locationFile"
                      type="file"
                      accept=".docx,.jpeg,.jpg,.pdf,.png"
                      onChange={handleFileChange}
                      style={{ ...inputStyle, padding: '10px 16px', cursor: 'pointer' }}
                    />
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '6px', lineHeight: 1.5 }}>
                      Accepted formats: DOCX, JPEG, PDF, PNG. Maximum file size 5MB.
                    </p>
                    {fileError && <p style={{ fontSize: '0.75rem', color: '#f87171', marginTop: '4px' }}>{fileError}</p>}
                  </div>
                )}
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', margin: '0 0 24px' }} />

                {/* Plant needed */}
                <div style={fieldStyle}>
                  <label htmlFor="plantNeeded" style={labelStyle}>What plant will be needed on site? *</label>
                  <textarea id="plantNeeded" rows={4} value={s2.plantNeeded} onChange={e => setF2('plantNeeded', e.target.value)}
                    placeholder=""
                    style={{ ...inputStyle, borderColor: s2Errors.plantNeeded ? '#f87171' : 'rgba(255,255,255,0.12)', resize: 'vertical' as const }} />
                  <FieldError msg={s2Errors.plantNeeded} />
                </div>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', margin: '0 0 24px' }} />

                {/* Work times */}
                <div style={fieldStyle}>
                  <label htmlFor="workTimes" style={labelStyle}>What are your work times for your crew? *</label>
                  <input id="workTimes" type="text" value={s2.workTimes} onChange={e => setF2('workTimes', e.target.value)}
                    placeholder=""
                    style={{ ...inputStyle, borderColor: s2Errors.workTimes ? '#f87171' : 'rgba(255,255,255,0.12)' }} />
                  <FieldError msg={s2Errors.workTimes} />
                </div>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', margin: '0 0 24px' }} />

                {/* Unattended site */}
                <div style={fieldStyle}>
                  <label style={labelStyle}>Will you need an unattended site? *</label>
                  <RadioGroup name="unattendedSite" value={s2.unattendedSite} onChange={v => setF2('unattendedSite', v)} options={yesNoUnsure} error={s2Errors.unattendedSite} />
                </div>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', margin: '0 0 24px' }} />

                {/* Self TM */}
                <div style={fieldStyle}>
                  <label style={labelStyle}>Do you wish to undertake any of the Traffic Management yourself? *</label>
                  <RadioGroup
                    name="selfTM"
                    value={s2.selfTM}
                    onChange={v => { setF2('selfTM', v); if (v !== 'yes') setF2('selfTMDetail', '') }}
                    options={yesNoUnsure}
                    error={s2Errors.selfTM}
                  />
                </div>

                {/* Self TM detail (conditional) */}
                {s2.selfTM === 'yes' && (
                  <div style={fieldStyle}>
                    <label htmlFor="selfTMDetail" style={labelStyle}>Please detail which part of the TM you will undertake *</label>
                    <textarea id="selfTMDetail" rows={4} value={s2.selfTMDetail} onChange={e => setF2('selfTMDetail', e.target.value)}
                      style={{ ...inputStyle, borderColor: s2Errors.selfTMDetail ? '#f87171' : 'rgba(255,255,255,0.12)', resize: 'vertical' as const }} />
                    <FieldError msg={s2Errors.selfTMDetail} />
                  </div>
                )}
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', margin: '0 0 24px' }} />

                {/* Wants TMP */}
                <div style={fieldStyle}>
                  <label style={labelStyle}>I'd like a TMP (Traffic Management Plan) *</label>
                  <RadioGroup
                    name="wantsTMP"
                    value={s2.wantsTMP}
                    onChange={v => { setF2('wantsTMP', v); if (v !== 'yes') setF2('wantsCAR', '') }}
                    options={yesNoUnsure}
                    error={s2Errors.wantsTMP}
                  />
                </div>

                {/* Wants CAR (conditional) */}
                {s2.wantsTMP === 'yes' && (
                  <div style={fieldStyle}>
                    <label style={labelStyle}>I'd like a CAR (Corridor Access Request) *</label>
                    <RadioGroup name="wantsCAR" value={s2.wantsCAR} onChange={v => setF2('wantsCAR', v)} options={yesNo} error={s2Errors.wantsCAR} />
                  </div>
                )}
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', margin: '0 0 24px' }} />

                {/* Cost type */}
                <div style={fieldStyle}>
                  <label htmlFor="costType" style={labelStyle}>Which type of cost would you like? *</label>
                  <SelectWrapper id="costType" value={s2.costType} onChange={v => setF2('costType', v)} error={s2Errors.costType} placeholder="Select a cost type">
                    {costTypes.map(t => <option key={t} value={t} style={{ background: '#0d1f33', color: '#fff' }}>{t}</option>)}
                  </SelectWrapper>
                  <FieldError msg={s2Errors.costType} />
                  {s1.branch && s1.branch !== 'Wellington' && (
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '6px', lineHeight: 1.5 }}>
                      Lump Sum pricing is only available for the Wellington branch.
                    </p>
                  )}
                </div>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', margin: '0 0 24px' }} />

                {/* Onsite meeting */}
                <div style={fieldStyle}>
                  <label style={labelStyle}>Would you like to have an onsite meeting? *</label>
                  <RadioGroup
                    name="onsiteMeeting"
                    value={s2.onsiteMeeting}
                    onChange={v => {
                      setF2('onsiteMeeting', v)
                      if (v !== 'yes') { setF2('meetingDate', ''); setF2('meetingTime', '') }
                    }}
                    options={yesNo}
                    error={s2Errors.onsiteMeeting}
                  />
                </div>

                {/* Meeting date + time (conditional) */}
                {s2.onsiteMeeting === 'yes' && (
                  <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4" style={{ marginBottom: '20px' }}>
                    <div>
                      <label htmlFor="meetingDate" style={labelStyle}>Date *</label>
                      <div style={{ position: 'relative' }}>
                        {!s2.meetingDate && (
                          <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', color: 'rgba(255,255,255,0.45)', pointerEvents: 'none', zIndex: 1 }}>Select date</span>
                        )}
                        <input
                          ref={meetingDateRef}
                          id="meetingDate"
                          type="date"
                          value={s2.meetingDate}
                          min={new Date().toISOString().split('T')[0]}
                          onChange={e => setF2('meetingDate', e.target.value)}
                          style={{ ...inputStyle, borderColor: s2Errors.meetingDate ? '#f87171' : 'rgba(255,255,255,0.12)', color: s2.meetingDate ? '#fff' : 'transparent', paddingRight: '44px' }}
                        />
                        <button
                          type="button"
                          onClick={() => meetingDateRef.current?.showPicker()}
                          style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', padding: '4px', cursor: 'pointer', color: 'rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center' }}
                          tabIndex={-1}
                          aria-label="Open date picker"
                        >
                          <Calendar size={16} strokeWidth={1.5} aria-hidden="true" />
                        </button>
                      </div>
                      <FieldError msg={s2Errors.meetingDate} />
                    </div>
                    <div>
                      <label htmlFor="meetingTime" style={labelStyle}>Time *</label>
                      <SelectWrapper id="meetingTime" value={s2.meetingTime} onChange={v => setF2('meetingTime', v)} error={s2Errors.meetingTime} placeholder="Select time">
                        {timeOptions.map(t => <option key={t.value} value={t.value} style={{ background: '#0d1f33', color: '#fff' }}>{t.label}</option>)}
                      </SelectWrapper>
                      <FieldError msg={s2Errors.meetingTime} />
                    </div>
                  </div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '-8px', marginBottom: '20px' }}>
                    We&apos;ll do our best to accommodate your requested date and time.
                  </p>
                  </>
                )}
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', margin: '0 0 24px' }} />

                {/* Other info */}
                <div style={fieldStyle}>
                  <label htmlFor="otherInfo" style={labelStyle}>Please enter any other information for us</label>
                  <textarea id="otherInfo" rows={4} value={s2.otherInfo} onChange={e => setF2('otherInfo', e.target.value)}
                    style={{ ...inputStyle, borderColor: 'rgba(255,255,255,0.12)', resize: 'vertical' as const }} />
                </div>

                <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', margin: '0 0 24px' }} />

                {/* Turnstile – invisible mode */}
                <Turnstile
                  sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                  size="invisible"
                  onVerify={(token) => setTurnstileToken(token)}
                />

                {/* Buttons */}
                <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '12px' }}>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={status === 'submitting'}
                    className="btn-orange"
                    style={{ width: '100%', padding: '14px 28px', fontSize: '0.9rem', justifyContent: 'center', opacity: status === 'submitting' ? 0.7 : 1, cursor: status === 'submitting' ? 'not-allowed' : 'pointer' }}
                  >
                    {status === 'submitting' ? 'Submitting...' : 'Submit Request'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="btn-ghost"
                    style={{ width: '100%', padding: '14px 28px', fontSize: '0.9rem', justifyContent: 'center', cursor: 'pointer' }}
                  >
                    Back
                  </button>
                </div>

                {status === 'error' && (
                  <p role="alert" aria-live="assertive" style={{ marginTop: '20px', fontSize: '0.9rem', color: '#f87171', textAlign: 'center', lineHeight: 1.6 }}>
                    {`Something went wrong. Please try again or call us on ${brand.phone}.`}
                  </p>
                )}
              </div>
            )}

          </div>
        </div>
      </section>
    </>
  )
}
