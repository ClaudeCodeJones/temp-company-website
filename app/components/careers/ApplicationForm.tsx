'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import { ArrowRight, Calendar } from 'lucide-react'
import SelectWrapper from '../SelectWrapper'

declare global {
  interface Window {
    turnstile: {
      render: (container: HTMLElement, params: Record<string, unknown>) => string
      execute: (widgetId: string) => void
      reset: (widgetId: string) => void
    }
  }
}
import { brand } from '../../../config/brand'
import { branches as branchList } from '../../../data/branches'

const activeBranches = branchList.filter(b => b.hiringStatus === 'hiring')

type FormState = 'idle' | 'submitting' | 'success' | 'error'

const driversLicenceOptions = [
  { value: 'None', label: 'None (application will not be accepted)' },
  { value: 'Car – Restricted', label: 'Car – Restricted' },
  { value: 'Car – Full', label: 'Car – Full' },
  { value: 'Class 2', label: 'Class 2' },
]

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

const fieldGroupStyle: React.CSSProperties = {
  marginBottom: '20px',
}

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null
  return <p style={{ fontSize: '0.75rem', color: '#f87171', marginTop: '4px' }}>{msg}</p>
}

function RadioOption({
  name, value, checked, onChange, label,
}: { name: string; value: string; checked: boolean; onChange: () => void; label: string }) {
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', padding: '6px 0' }}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
      />
      <span style={{
        width: '16px', height: '16px', borderRadius: '50%', flexShrink: 0,
        border: checked ? '2px solid #fcd415' : '2px solid #9ca3af',
        background: checked ? 'var(--color-accent)' : 'transparent',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {checked && <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#fff' }} />}
      </span>
      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.4 }}>{label}</span>
    </label>
  )
}

function CheckboxOption({
  checked, onChange, label,
}: { checked: boolean; onChange: () => void; label: string }) {
  return (
    <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', cursor: 'pointer', padding: '6px 0' }}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
      />
      <span style={{
        width: '16px', height: '16px', borderRadius: '2px', flexShrink: 0, marginTop: '1px',
        border: checked ? '2px solid var(--brand-primary)' : '2px solid rgba(255,255,255,0.2)',
        background: checked ? 'var(--brand-primary)' : 'transparent',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {checked && (
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
            <polyline points="1.5 5 4 7.5 8.5 2.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.5 }}>{label}</span>
    </label>
  )
}

export default function ApplicationForm({ onSuccess, sectionRef }: { onSuccess?: () => void; sectionRef?: React.RefObject<HTMLDivElement | null> }) {
  const searchParams = useSearchParams()
  const [step, setStep] = useState<1 | 2>(1)
  const [state, setState] = useState<FormState>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const honeypotRef = useRef<HTMLInputElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const dateRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string>('')
  const callbackRef = useRef<((token: string) => void) | null>(null)

  const branchParam = searchParams.get('branch')
  const preselectedBranch = branchParam
    ? activeBranches.find(b => b.name.toLowerCase() === branchParam.toLowerCase())?.name ?? ''
    : ''

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    branch: preselectedBranch,
    driversLicence: '',
    startDate: '',
    workHistory: '',
    tmExperience: '',
    englishConfirm: false,
    drugTestConfirm: false,
    casualConfirm: false,
    mojCheckConfirm: false,
  })

  function set(field: string, value: string | boolean) {
    setForm(prev => ({ ...prev, [field]: value }))
    setErrors(prev => ({ ...prev, [field]: '' }))
  }

  useEffect(() => {
    const matched = branchParam
      ? activeBranches.find(b => b.name.toLowerCase() === branchParam.toLowerCase())?.name ?? ''
      : ''
    setForm(prev => ({ ...prev, branch: matched }))
  }, [branchParam])

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

  function scrollToCard() {
    requestAnimationFrame(() => {
      if (cardRef.current) {
        const y = cardRef.current.getBoundingClientRect().top + window.scrollY - 100
        window.scrollTo({ top: y, behavior: 'smooth' })
      }
    })
  }

  function validateStep1() {
    const e: Record<string, string> = {}
    if (!form.fullName.trim()) e.fullName = 'Required'
    if (!form.email.trim()) e.email = 'Required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.phone.trim()) e.phone = 'Required'
    if (!form.city.trim()) e.city = 'Required'
    if (!form.branch) e.branch = 'Select a branch'
    if (!form.driversLicence) e.driversLicence = 'Please select your licence type'
    if (!form.startDate) e.startDate = 'Required'
    return e
  }

  function validateStep2() {
    const e: Record<string, string> = {}
    if (!form.workHistory.trim()) e.workHistory = 'Required'
    if (!form.englishConfirm) e.englishConfirm = 'You must confirm this before submitting'
    if (!form.drugTestConfirm) e.drugTestConfirm = 'You must confirm this before submitting'
    if (!form.casualConfirm) e.casualConfirm = 'You must confirm this before submitting'
    if (!form.mojCheckConfirm) e.mojCheckConfirm = 'You must confirm this before submitting'
    return e
  }

  function handleNext() {
    const e = validateStep1()
    if (Object.keys(e).length > 0) { setErrors(e); return }
    setErrors({})
    setStep(2)
    scrollToCard()
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const e2 = validateStep2()
    if (Object.keys(e2).length > 0) { setErrors(e2); return }
    setErrors({})
    setState('submitting')

    try {
      const token = await getTurnstileToken()
      const res = await fetch('/api/apply-for-work', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, turnstileToken: token, companyPhone: honeypotRef.current?.value ?? '' }),
      })
      if (res.ok) {
        if (onSuccess) { onSuccess(); return }
        setState('success')
      } else {
        setState('error')
      }
    } catch {
      setState('error')
    }
  }

  if (state === 'success') {
    return (
      <div style={{
        background: 'var(--bg-elevated)', border: '1px solid rgba(255,255,255,0.08)',
        borderTop: '3px solid var(--brand-primary)', borderRadius: '2px',
        padding: '64px 40px', textAlign: 'center',
      }}>
        <div style={{
          width: '56px', height: '56px', background: 'rgba(34,197,94,0.12)',
          borderRadius: '50%', display: 'flex', alignItems: 'center',
          justifyContent: 'center', margin: '0 auto 24px',
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="font-display" style={{ fontWeight: 700, fontSize: '1.4rem', color: '#fff', marginBottom: '12px' }}>
          Application Received
        </h3>
        <p style={{ fontSize: '0.9rem', lineHeight: 1.7, color: 'var(--text-muted)', maxWidth: '360px', margin: '0 auto' }}>
          Thanks for getting in touch. Our team will review your application and reach out within a few days.
        </p>
      </div>
    )
  }

  const cardStyle: React.CSSProperties = {
    background: 'var(--bg-elevated)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderTop: '3px solid var(--brand-primary)',
    borderRadius: '2px',
    padding: '40px',
  }

  return (
    <div ref={cardRef} style={cardStyle}>
      <div ref={containerRef} style={{ display: 'none' }} />
      {/* Step indicator */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
            Step {step} of 2
          </span>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
            {step === 1 ? 'Your Details' : 'Experience & Confirmations'}
          </span>
        </div>
        <div style={{ height: '2px', background: 'rgba(255,255,255,0.08)', borderRadius: '1px' }}>
          <div style={{ height: '100%', width: step === 1 ? '50%' : '100%', background: 'var(--brand-primary)', borderRadius: '1px', transition: 'width 0.4s ease' }} />
        </div>
      </div>

      {/* ── STEP 1 ── */}
      {step === 1 && (
        <div style={{ paddingBottom: '40px' }}>
          {/* Honeypot field – hidden from users */}
          <input ref={honeypotRef} type="text" name="companyPhone" tabIndex={-1} autoComplete="off" className="absolute left-[-9999px] opacity-0 pointer-events-none" />

          {/* Full Name */}
          <div style={fieldGroupStyle}>
            <label style={labelStyle}>Name</label>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)', marginBottom: '8px' }}>Enter your first and last name</p>
            <input
              type="text" autoComplete="name" value={form.fullName}
              onChange={e => set('fullName', e.target.value)}
              style={{ ...inputStyle, borderColor: errors.fullName ? '#f87171' : 'rgba(255,255,255,0.12)' }}
            />
            <FieldError msg={errors.fullName} />
          </div>

          {/* Email */}
          <div style={fieldGroupStyle}>
            <label style={labelStyle}>Email Address</label>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)', marginBottom: '8px' }}>Enter your email address</p>
            <input
              type="email" autoComplete="email" value={form.email}
              onChange={e => set('email', e.target.value)}
              style={{ ...inputStyle, borderColor: errors.email ? '#f87171' : 'rgba(255,255,255,0.12)' }}
            />
            <FieldError msg={errors.email} />
          </div>

          {/* Phone */}
          <div style={fieldGroupStyle}>
            <label style={labelStyle}>Phone</label>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)', marginBottom: '8px' }}>Enter your phone number</p>
            <input
              type="tel" inputMode="numeric" pattern="[0-9+\s-]*" autoComplete="tel" value={form.phone}
              onChange={e => set('phone', e.target.value)}
              style={{ ...inputStyle, borderColor: errors.phone ? '#f87171' : 'rgba(255,255,255,0.12)' }}
            />
            <FieldError msg={errors.phone} />
          </div>

          {/* City */}
          <div style={fieldGroupStyle}>
            <label style={labelStyle}>Which city or town do you currently live in?</label>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)', marginBottom: '8px' }}>Where are you living now?</p>
            <input
              type="text" value={form.city}
              onChange={e => set('city', e.target.value)}
              style={{ ...inputStyle, borderColor: errors.city ? '#f87171' : 'rgba(255,255,255,0.12)' }}
            />
            <FieldError msg={errors.city} />
          </div>

          {/* Branch */}
          <div style={fieldGroupStyle}>
            <label style={labelStyle}>Which branch are you applying to?</label>
            <SelectWrapper value={form.branch} onChange={v => set('branch', v)} error={errors.branch} placeholder="Select branch">
              {activeBranches.map(b => (
                <option key={b.slug} value={b.name} style={{ background: 'var(--color-bg-elevated)', color: '#fff' }}>{b.name}</option>
              ))}
            </SelectWrapper>
            <FieldError msg={errors.branch} />
          </div>

          {/* Driver Licence */}
          <div style={fieldGroupStyle}>
            <label style={labelStyle}>What driver licence do you currently hold?</label>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.35)', marginBottom: '10px' }}>
              You must hold at least a Restricted licence to be considered.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {driversLicenceOptions.map(opt => (
                <RadioOption
                  key={opt.value}
                  name="driversLicence"
                  value={opt.value}
                  checked={form.driversLicence === opt.value}
                  onChange={() => set('driversLicence', opt.value)}
                  label={opt.label}
                />
              ))}
            </div>
            <FieldError msg={errors.driversLicence} />
            {form.driversLicence === 'None' && (
              <p style={{ fontSize: '0.75rem', color: '#f87171', marginTop: '6px' }}>
                Applicants must hold at least a Restricted driver licence to be considered.
              </p>
            )}
          </div>

          {/* Start Date */}
          <div style={fieldGroupStyle}>
            <label style={labelStyle}>When is your earliest start date?</label>
            <div style={{ position: 'relative' }}>
              <input
                ref={dateRef}
                type="date" value={form.startDate}
                onChange={e => set('startDate', e.target.value)}
                style={{ ...inputStyle, borderColor: errors.startDate ? '#f87171' : 'rgba(255,255,255,0.12)', paddingRight: '44px' }}
              />
              <button
                type="button"
                onClick={() => dateRef.current?.showPicker()}
                style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', padding: '4px', cursor: 'pointer', color: 'rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center' }}
                tabIndex={-1}
                aria-label="Open date picker"
              >
                <Calendar size={16} strokeWidth={1.5} aria-hidden="true" />
              </button>
            </div>
            <FieldError msg={errors.startDate} />
          </div>

          <button type="button" onClick={handleNext} className="btn-orange" style={{ width: '100%', justifyContent: 'center' }}>
            Next
            <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" />
          </button>
        </div>
      )}

      {/* ── STEP 2 ── */}
      {step === 2 && (
        <form autoComplete="off" onSubmit={handleSubmit} noValidate>

          {/* Work Background */}
          <div style={fieldGroupStyle}>
            <label style={labelStyle}>Work Background</label>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.35)', marginBottom: '8px' }}>
              Tell us about your work experience over the last few years.
            </p>
            <textarea
              rows={4}
              value={form.workHistory}
              onChange={e => set('workHistory', e.target.value)}
              style={{ ...inputStyle, resize: 'vertical', minHeight: '100px', borderColor: errors.workHistory ? '#f87171' : 'rgba(255,255,255,0.12)' }}
            />
            <FieldError msg={errors.workHistory} />
          </div>

          {/* TM Experience */}
          <div style={fieldGroupStyle}>
            <label style={labelStyle}>
              Traffic Management Experience{' '}
              <span style={{ color: 'var(--text-muted)', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>(optional)</span>
            </label>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.35)', marginBottom: '8px' }}>
              Tell us about any traffic management experience or qualifications you have. Leave blank if none.
            </p>
            <textarea
              rows={3}
              value={form.tmExperience}
              onChange={e => set('tmExperience', e.target.value)}
              style={{ ...inputStyle, resize: 'vertical', minHeight: '88px', borderColor: 'rgba(255,255,255,0.12)' }}
            />
          </div>

          {/* Divider */}
          <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', margin: '8px 0 28px' }} />

          {/* Confirmations */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px' }}>
            <div style={{ padding: '16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '2px' }}>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px' }}>English Communication</p>
              <CheckboxOption
                checked={form.englishConfirm}
                onChange={() => set('englishConfirm', !form.englishConfirm)}
                label="I confirm I have strong communication skills in English"
              />
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.35)', marginTop: '8px' }}>
                Clear communication is essential for safety when working around live traffic and crews on site.
              </p>
              <FieldError msg={errors.englishConfirm} />
            </div>
            <div style={{ padding: '16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '2px' }}>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px' }}>Drug &amp; Alcohol Test</p>
              <CheckboxOption
                checked={form.drugTestConfirm}
                onChange={() => set('drugTestConfirm', !form.drugTestConfirm)}
                label="I understand that passing a drug and alcohol test may be required"
              />
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.35)', marginTop: '8px' }}>
                Drug and alcohol testing costs exceed $150. Please only proceed if you are confident you will pass the test.
              </p>
              <FieldError msg={errors.drugTestConfirm} />
            </div>
            <div style={{ padding: '16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '2px' }}>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px' }}>Casual Worker Guide</p>
              <CheckboxOption
                checked={form.casualConfirm}
                onChange={() => set('casualConfirm', !form.casualConfirm)}
                label="I have read the document 'What to Expect as a Casual Worker'"
              />
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.35)', marginTop: '8px' }}>
                See the link above for the full guide before confirming.
              </p>
              <FieldError msg={errors.casualConfirm} />
            </div>
            <div style={{ padding: '16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '2px' }}>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px' }}>Criminal History Check</p>
              <CheckboxOption
                checked={form.mojCheckConfirm}
                onChange={() => set('mojCheckConfirm', !form.mojCheckConfirm)}
                label="I understand that a Ministry of Justice criminal history check may be required"
              />
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.35)', marginTop: '8px' }}>
                This check only applies if you are successful in your application.
              </p>
              <FieldError msg={errors.mojCheckConfirm} />
            </div>
          </div>

          {state === 'error' && (
            <p style={{ fontSize: '0.85rem', color: '#f87171', marginBottom: '16px' }}>
              {'If something went wrong, please contact your co-ordinator for assistance.'}
            </p>
          )}

          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              type="button"
              onClick={() => { setStep(1); setErrors({}); scrollToCard() }}
              className="btn-ghost"
              style={{ flexShrink: 0 }}
            >
              Back
            </button>
            <button
              type="submit"
              disabled={state === 'submitting' || form.driversLicence === 'None'}
              className="btn-orange"
              style={{ flex: 1, justifyContent: 'center', opacity: (state === 'submitting' || form.driversLicence === 'None') ? 0.4 : 1, cursor: form.driversLicence === 'None' ? 'not-allowed' : undefined }}
            >
              {state === 'submitting' ? 'Sending...' : 'Submit Application'}
              {state !== 'submitting' && (
                <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" />
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
