'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import { ArrowRight, Calendar } from 'lucide-react'
import Turnstile from 'react-turnstile'
import SelectWrapper from '../SelectWrapper'
import { brand } from '../../../config/brand'
import { branches as branchList } from '../../../data/branches'

type FormState = 'idle' | 'submitting' | 'success' | 'error'

const tmExperienceOptions = [
  'None',
  'TTM Worker',
  'TMO (NP)',
  'TMO (P)',
  'STMS (NP)',
  'STMS Cat A/B',
  'STMS Cat C',
  'Other (please describe below)',
]

const licenceOptions = ['Restricted (Car)', 'Full (Car)', 'Class 2 (Truck)']

const contactOptions = [
  { value: 'email', label: "Yep, I'm happy with an Email" },
  { value: 'text', label: 'A text would be great' },
  { value: 'call', label: 'Please give me a call' },
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
  value, checked, onChange, label,
}: { value: string; checked: boolean; onChange: () => void; label: string }) {
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', padding: '6px 0' }}>
      <input
        type="checkbox"
        value={value}
        checked={checked}
        onChange={onChange}
        style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
      />
      <span style={{
        width: '16px', height: '16px', borderRadius: '2px', flexShrink: 0,
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
      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.4 }}>{label}</span>
    </label>
  )
}

export default function ApplicationForm({ onSuccess, sectionRef }: { onSuccess?: () => void; sectionRef?: React.RefObject<HTMLDivElement | null> }) {
  const searchParams = useSearchParams()
  const [step, setStep] = useState<1 | 2>(1)
  const [state, setState] = useState<FormState>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [turnstileToken, setTurnstileToken] = useState('')
  const honeypotRef = useRef<HTMLInputElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const dateRef = useRef<HTMLInputElement>(null)

  const branchParam = searchParams.get('branch')
  const preselectedBranch = branchParam
    ? branchList.find(b => b.name.toLowerCase() === branchParam.toLowerCase())?.name ?? ''
    : ''

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    startDate: '',
    branch: preselectedBranch,
    experience: '',
    licences: [] as string[],
    contactMethod: '',
    workHistory: '',
    aboutYourself: '',
    healthIssues: '',
    accHistory: '',
    howDidYouHear: '',
    casualConfirm: false,
    drugAlcoholConfirm: false,
    criminalHistoryConfirm: false,
    experienceOther: '',
    rightToWork: '',
    visaExpiry: '',
    interviewDay: '',
    interviewTime: '',
  })

  function set(field: string, value: string | boolean | string[]) {
    setForm(prev => ({ ...prev, [field]: value }))
    setErrors(prev => ({ ...prev, [field]: '' }))
  }

  useEffect(() => {
    const matched = branchParam
      ? branchList.find(b => b.name.toLowerCase() === branchParam.toLowerCase())?.name ?? ''
      : ''
    setForm(prev => ({ ...prev, branch: matched }))
  }, [branchParam])

  function toggleLicence(licence: string) {
    setForm(prev => ({
      ...prev,
      licences: prev.licences.includes(licence)
        ? prev.licences.filter(l => l !== licence)
        : [...prev.licences, licence],
    }))
    setErrors(prev => ({ ...prev, licences: '' }))
  }

  function validateStep1() {
    const e: Record<string, string> = {}
    if (!form.fullName.trim()) e.fullName = 'Required'
    if (!form.email.trim()) e.email = 'Required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.phone.trim()) e.phone = 'Required'
    if (!form.city.trim()) e.city = 'Required'
    if (!form.startDate) e.startDate = 'Required'
    if (!form.branch) e.branch = 'Select a branch'
    if (!form.rightToWork) e.rightToWork = 'Required'
    return e
  }

  function validateStep2() {
    const e: Record<string, string> = {}
    if (!form.experience) e.experience = 'Please select your experience level'
    if (form.licences.length === 0) e.licences = 'Please select at least one licence'
    if (!form.contactMethod) e.contactMethod = 'Please select a contact preference'
    if (!form.workHistory.trim()) e.workHistory = 'Required'
    if (!form.aboutYourself.trim()) e.aboutYourself = 'Required'
    if (!form.healthIssues.trim()) e.healthIssues = 'Required'
    if (!form.accHistory.trim()) e.accHistory = 'Required'
    if (!form.drugAlcoholConfirm) e.drugAlcoholConfirm = 'You must confirm this before submitting'
    if (!form.criminalHistoryConfirm) e.criminalHistoryConfirm = 'You must confirm this before submitting'
    return e
  }

  function handleNext() {
    const e = validateStep1()
    if (Object.keys(e).length > 0) { setErrors(e); return }
    setErrors({})
    setStep(2)
    requestAnimationFrame(() => { if (cardRef.current) { const headerOffset = 100; const y = cardRef.current.getBoundingClientRect().top + window.scrollY - headerOffset; window.scrollTo({ top: y, behavior: 'smooth' }) } })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const e2 = validateStep2()
    if (Object.keys(e2).length > 0) { setErrors(e2); return }
    setErrors({})
    setState('submitting')

    try {
      const res = await fetch('/api/careers-application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, turnstileToken, companyPhone: honeypotRef.current?.value ?? '' }),
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
      {/* Step indicator */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
            Step {step} of 2
          </span>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
            {step === 1 ? 'Personal Details' : 'Experience & Background'}
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

          <div style={{ marginBottom: '20px' }}>
            <label style={labelStyle}>Full Name</label>
            <input
              type="text" autoComplete="name" value={form.fullName}
              onChange={e => set('fullName', e.target.value)}
              style={{ ...inputStyle, borderColor: errors.fullName ? '#f87171' : 'rgba(255,255,255,0.12)' }}
            />
            <FieldError msg={errors.fullName} />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={labelStyle}>Email</label>
            <input
              type="email" autoComplete="email" value={form.email}
              onChange={e => set('email', e.target.value)}
              style={{ ...inputStyle, borderColor: errors.email ? '#f87171' : 'rgba(255,255,255,0.12)' }}
            />
            <FieldError msg={errors.email} />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={labelStyle}>City / Town</label>
            <input
              type="text" value={form.city}
              onChange={e => set('city', e.target.value)}
              style={{ ...inputStyle, borderColor: errors.city ? '#f87171' : 'rgba(255,255,255,0.12)' }}
            />
            <FieldError msg={errors.city} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5" style={{ marginBottom: '20px' }}>
            <div>
              <label style={labelStyle}>Phone</label>
              <input
                type="tel" inputMode="numeric" pattern="[0-9+\s-]*" autoComplete="tel" value={form.phone}
                onChange={e => set('phone', e.target.value)}
                style={{ ...inputStyle, borderColor: errors.phone ? '#f87171' : 'rgba(255,255,255,0.12)' }}
              />
              <FieldError msg={errors.phone} />
            </div>
            <div>
              <label style={labelStyle}>Earliest Start Date</label>
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
          </div>

          <div style={fieldGroupStyle}>
            <label style={labelStyle}>Right to Work (NZ)</label>
            <SelectWrapper value={form.rightToWork} onChange={v => set('rightToWork', v)} error={errors.rightToWork} placeholder="Select one">
              <option value="NZ Citizen / Resident (no work restrictions)" style={{ background: 'var(--color-bg-elevated)', color: '#fff' }}>NZ Citizen / Resident (no work restrictions)</option>
              <option value="Valid Work Visa" style={{ background: 'var(--color-bg-elevated)', color: '#fff' }}>Valid Work Visa</option>
              <option value="No current right to work in NZ" style={{ background: 'var(--color-bg-elevated)', color: '#fff' }}>No current right to work in NZ</option>
            </SelectWrapper>
            <FieldError msg={errors.rightToWork} />
          </div>

          {form.rightToWork === 'Valid Work Visa' && (
            <div style={fieldGroupStyle}>
              <label style={labelStyle}>Visa Expiry Date</label>
              <div style={{ position: 'relative' }}>
                {!form.visaExpiry && (
                  <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', color: 'rgba(255,255,255,0.45)', pointerEvents: 'none', zIndex: 1 }}>Select expiry date</span>
                )}
                <input
                  type="date"
                  value={form.visaExpiry}
                  onChange={e => set('visaExpiry', e.target.value)}
                  style={{ ...inputStyle, borderColor: 'rgba(255,255,255,0.12)', color: form.visaExpiry ? '#fff' : 'transparent' }}
                />
              </div>
            </div>
          )}

          <div style={fieldGroupStyle}>
            <label style={labelStyle}>Applying For</label>
            <SelectWrapper value={form.branch} onChange={v => set('branch', v)} error={errors.branch} placeholder="Select branch">
              {branchList.map(b => (
                <option key={b.slug} value={b.name} style={{ background: 'var(--color-bg-elevated)', color: '#fff' }}>{b.name}</option>
              ))}
            </SelectWrapper>
            <FieldError msg={errors.branch} />
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
          {/* TM Experience */}
          <div style={{ marginBottom: '28px' }}>
            <label style={labelStyle}>Traffic Management Qualifications</label>
            <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '0 24px' }}>
              {tmExperienceOptions.map(opt => (
                <RadioOption
                  key={opt} name="experience" value={opt}
                  checked={form.experience === opt}
                  onChange={() => set('experience', opt)}
                  label={opt}
                />
              ))}
            </div>
            {form.experience === 'Other (please describe below)' && (
              <div style={{ marginTop: '12px' }}>
                <textarea
                  rows={3}
                  placeholder="Please describe your experience..."
                  value={form.experienceOther ?? ''}
                  onChange={e => set('experienceOther', e.target.value)}
                  style={{ ...inputStyle, resize: 'vertical', minHeight: '80px', borderColor: 'rgba(255,255,255,0.12)' }}
                />
              </div>
            )}
            <FieldError msg={errors.experience} />
          </div>

          {/* Divider */}
          <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', marginBottom: '28px' }} />

          {/* Licences */}
          <div style={{ marginBottom: '28px' }}>
            <label style={labelStyle}>Licence(s) Held</label>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.35)', marginBottom: '10px' }}>
              Note: You must hold at least a Restricted (Car), Full (Car), or Class 2 licence. Learner licences or no licence are not accepted.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0 32px' }}>
              {licenceOptions.map(opt => (
                <CheckboxOption
                  key={opt} value={opt}
                  checked={form.licences.includes(opt)}
                  onChange={() => toggleLicence(opt)}
                  label={opt}
                />
              ))}
            </div>
            <FieldError msg={errors.licences} />
          </div>

          {/* Divider */}
          <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', marginBottom: '28px' }} />

          {/* Text areas */}
          {[
            { field: 'workHistory', label: 'Brief Work History (Last 2 Years)', placeholder: 'Employer names, roles held, dates...' },
            { field: 'aboutYourself', label: 'Tell Us a Bit More About Yourself', placeholder: 'Your motivations, strengths, what you are looking for...' },
            { field: 'healthIssues', label: 'Any Health Issues We Should Be Aware Of?', placeholder: 'This is a high stress, physically demanding job. Please be honest...' },
            { field: 'accHistory', label: 'Any ACC History We Should Be Aware Of?', placeholder: 'Please describe any relevant ACC claims or injuries...' },
          ].map(({ field, label, placeholder }) => (
            <div key={field} style={{ marginBottom: '20px' }}>
              <label style={labelStyle}>{label}</label>
              <textarea
                rows={3}
                placeholder={placeholder}
                value={(form as Record<string, unknown>)[field] as string}
                onChange={e => set(field, e.target.value)}
                style={{
                  ...inputStyle,
                  resize: 'vertical',
                  minHeight: '88px',
                  borderColor: errors[field] ? '#f87171' : 'rgba(255,255,255,0.12)',
                }}
              />
              <FieldError msg={errors[field]} />
            </div>
          ))}

          <div style={{ marginBottom: '28px' }}>
            <label style={labelStyle}>
              How Did You Hear About This Role?{' '}
              <span style={{ color: 'var(--text-muted)', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>(optional)</span>
            </label>
            <textarea
              rows={2}
              value={form.howDidYouHear}
              onChange={e => set('howDidYouHear', e.target.value)}
              style={{ ...inputStyle, resize: 'vertical', minHeight: '64px' }}
            />
          </div>

          {/* Divider */}
          <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', marginBottom: '28px' }} />

          {/* Interview scheduling */}
          <div style={{ marginBottom: '28px' }}>
            <label style={labelStyle}>Preferred Interview Day &amp; Time</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5" style={{ marginBottom: '10px' }}>
              <div>
                <SelectWrapper value={form.interviewDay} onChange={v => set('interviewDay', v)} placeholder="Any day">
                  <option value="Any day">Any day</option>
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                </SelectWrapper>
              </div>
              <div>
                <SelectWrapper value={form.interviewTime} onChange={v => set('interviewTime', v)} placeholder="Any time">
                  <option value="Any time">Any time</option>
                  <option value="7:00 – 9:00">7:00 – 9:00</option>
                  <option value="9:00 – 12:00">9:00 – 12:00</option>
                  <option value="12:00 – 3:00">12:00 – 3:00</option>
                  <option value="3:00 – 5:00">3:00 – 5:00</option>
                </SelectWrapper>
              </div>
            </div>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.35)' }}>
              We will do our best to schedule your interview within your preferred time.
            </p>
          </div>

          {/* Contact preference */}
          <div style={{ marginBottom: '28px' }}>
            <label style={labelStyle}>Preferred Contact Method</label>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '10px', lineHeight: 1.5 }}>
              We prefer to email you so we have a record of our conversation, but how would you like us to contact you?
            </p>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {contactOptions.map(opt => (
                <RadioOption
                  key={opt.value} name="contactMethod" value={opt.value}
                  checked={form.contactMethod === opt.value}
                  onChange={() => set('contactMethod', opt.value)}
                  label={opt.label}
                />
              ))}
            </div>
            <FieldError msg={errors.contactMethod} />
          </div>

          {/* Divider */}
          <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', marginBottom: '28px' }} />

          {/* Confirmations */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px' }}>
            {!['STMS Cat A/B', 'STMS Cat C'].includes(form.experience) && (
              <div style={{ padding: '16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '2px' }}>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px' }}>Casual Worker Guide</p>
                <CheckboxOption
                  value="casualConfirm"
                  checked={form.casualConfirm}
                  onChange={() => set('casualConfirm', !form.casualConfirm)}
                  label="I confirm I have read 'What to Expect as a Casual Worker'."
                />
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.35)', marginTop: '8px' }}>
                  See the link above for the full guide before confirming.
                </p>
              </div>
            )}
            <div style={{ padding: '16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '2px' }}>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px' }}>Drug &amp; Alcohol Test</p>
              <CheckboxOption
                value="drugAlcoholConfirm"
                checked={form.drugAlcoholConfirm}
                onChange={() => set('drugAlcoholConfirm', !form.drugAlcoholConfirm)}
                label="I confirm that I am able to pass a drug and alcohol test."
              />
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.35)', marginTop: '8px' }}>
                Drug and alcohol testing costs exceed $150. Please only proceed if you are confident you will pass the test.
              </p>
              <FieldError msg={errors.drugAlcoholConfirm} />
            </div>
            <div style={{ padding: '16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '2px' }}>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px' }}>Criminal History Check</p>
              <CheckboxOption
                value="criminalHistoryConfirm"
                checked={form.criminalHistoryConfirm}
                onChange={() => set('criminalHistoryConfirm', !form.criminalHistoryConfirm)}
                label="I consent to a Ministry of Justice criminal history check if required."
              />
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.35)', marginTop: '8px' }}>
                This check only applies if you are successful in your application.
              </p>
              <FieldError msg={errors.criminalHistoryConfirm} />
            </div>
          </div>

          {state === 'error' && (
            <p style={{ fontSize: '0.85rem', color: '#f87171', marginBottom: '16px' }}>
              {`Something went wrong. Please try again or call us on ${brand.phone}.`}
            </p>
          )}

          {/* Turnstile – invisible mode */}
          <Turnstile
            sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
            size="invisible"
            onVerify={(token) => setTurnstileToken(token)}
          />

          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              type="button"
              onClick={() => { setStep(1); setErrors({}); requestAnimationFrame(() => { if (cardRef.current) { const headerOffset = 100; const y = cardRef.current.getBoundingClientRect().top + window.scrollY - headerOffset; window.scrollTo({ top: y, behavior: 'smooth' }) } }) }}
              className="btn-ghost"
              style={{ flexShrink: 0 }}
            >
              Back
            </button>
            <button
              type="submit"
              disabled={state === 'submitting'}
              className="btn-orange"
              style={{ flex: 1, justifyContent: 'center', opacity: state === 'submitting' ? 0.7 : 1 }}
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
