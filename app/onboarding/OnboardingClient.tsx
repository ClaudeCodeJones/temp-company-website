'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { ArrowRight, ArrowLeft, Calendar, Check } from 'lucide-react'
import Link from 'next/link'
import RevealObserver from '../components/RevealObserver'
import SelectWrapper from '../components/SelectWrapper'
import FieldError from '../components/FieldError'
import { inputStyle, labelStyle, fieldStyle } from '../components/formStyles'
import { useTurnstile } from '../../hooks/useTurnstile'
import { brand } from '../../config/brand'
import FileUpload, { type UploadedFile } from './FileUpload'

// ── Types ───────────────────────────────────────────────────────────────────

type FormState = 'idle' | 'submitting' | 'success' | 'error'

type FormData = {
  // Page 1
  fullName: string
  preferredName: string
  designation: string
  dob: string
  phone: string
  email: string
  address: string
  suburb: string
  city: string
  postalCode: string
  convicted: string
  convictedDetails: string
  // Page 2
  inductionDate: string
  branch: string
  legalStatus: string
  howHeard: string
  irdNumber: string
  bankAccount: string
  taxCode: string
  kiwiSaverStatus: string
  kiwiSaverRate: string
  // Page 3
  ethnicBackground: string[]
  ethnicBackgroundOther: string
  emergencyName: string
  relationship: string
  relationshipOther: string
  emergencyPhone: string
  emergencyNotes: string
  // Page 4
  hasLicence: string
  licenceType: string
  licenceNumber: string
  licenceVersion: string
  licenceExpiry: string
  class2Endorsement: boolean
  canDrive: string
  // Page 5
  ttmQualification: string
  ttmQualificationOther: string
  nsn: string
  proofOption: string
  warrantId: string
  proofOtherDetails: string
  // Page 6
  shirtSize: string
  steelCapBoots: string
  bootSize: string
  bootSizeOther: string
  // Page 7
  drugTesting: string
  codeOfConduct: string
  photoPermission: string
  declaration: string
}

type FileFields = {
  visaFile: UploadedFile | null
  kiwiSaverOptOutFile: UploadedFile | null
  licenceFrontFile: UploadedFile | null
  licenceBackFile: UploadedFile | null
  qualificationFile: UploadedFile | null
}

const INITIAL_FORM: FormData = {
  fullName: '', preferredName: '', designation: '', dob: '', phone: '', email: '',
  address: '', suburb: '', city: '', postalCode: '', convicted: '', convictedDetails: '',
  inductionDate: '', branch: '', legalStatus: '', howHeard: '',
  irdNumber: '', bankAccount: '', taxCode: '', kiwiSaverStatus: '', kiwiSaverRate: '',
  ethnicBackground: [], ethnicBackgroundOther: '',
  emergencyName: '', relationship: '', relationshipOther: '',
  emergencyPhone: '', emergencyNotes: '',
  hasLicence: '', licenceType: '', licenceNumber: '', licenceVersion: '',
  licenceExpiry: '', class2Endorsement: false, canDrive: '',
  ttmQualification: '', ttmQualificationOther: '', nsn: '', proofOption: '',
  warrantId: '', proofOtherDetails: '',
  shirtSize: '', steelCapBoots: '', bootSize: '', bootSizeOther: '',
  drugTesting: '', codeOfConduct: '', photoPermission: '', declaration: '',
}

const INITIAL_FILES: FileFields = {
  visaFile: null, kiwiSaverOptOutFile: null,
  licenceFrontFile: null, licenceBackFile: null,
  qualificationFile: null,
}

// ── Enum lists ──────────────────────────────────────────────────────────────

const OPTS = {
  designation: ['Male', 'Female', 'Gender Neutral', 'Prefer not to say'],
  convicted: ['Yes', 'No'],
  branch: ['Wellington', 'Blenheim', 'Christchurch'],
  legalStatus: ['NZ Citizen', 'Permanent Resident', 'Work Visa'],
  howHeard: ['Facebook', 'LinkedIn', 'Men at Work Website', 'MSD'],
  kiwiSaverStatus: [
    'Yes - I am enrolled in KiwiSaver',
    'No - I am not enrolled',
    'I have opted out of KiwiSaver',
  ],
  kiwiSaverRate: ['3%', '4%', '5%', '6%', '8%', '10%'],
  ethnicBackground: [
    'NZ European', 'Maori (Ngai Tahu)', 'Maori (Other)', 'Pacific Islands',
    'Asia', 'Africa', 'Central/South America', 'Europe', 'Middle East',
    'North America', 'Other', "I'd rather not say",
  ],
  relationship: ['Husband/Wife', 'Partner', 'Parent', 'Child', 'Sibling', 'Friend', 'Other'],
  licenceType: ['Learners', 'Restricted', 'Full', 'Overseas'],
  canDrive: ['Automatic only', 'Manual or automatic'],
  ttmQualification: ['None', 'TTM Worker', 'TMO NP', 'TMO P', 'STMS NP', 'STMS A', 'STMS AB', 'STMS ABC', 'Other'],
  proofOption: ['I have a Warrant ID Number', 'I have a Certificate or other proof', 'Other'],
  shirtSize: ['S', 'M', 'L', 'XL', '2XL', '3XL', '5XL'],
  steelCapBoots: ['I have my own thanks', 'I need some please'],
  bootSize: ['I have my own', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', 'Other'],
} as const

const STEPS = [
  'Personal',
  'Employment',
  'Background',
  'Licence',
  'Training',
  'PPE',
  'Policies',
] as const

const STORAGE_KEY = 'ttc-onboarding-v1'

// ── Helpers ─────────────────────────────────────────────────────────────────

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phoneRegex = /^[0-9+\-\s]{7,20}$/

function dropdownOpts(list: readonly string[]) {
  return list.map(v => (
    <option key={v} value={v} style={{ background: 'var(--color-bg-deep)', color: '#fff' }}>{v}</option>
  ))
}

// ── Main component ─────────────────────────────────────────────────────────

export default function OnboardingClient() {
  const [step, setStep] = useState<number>(1)
  const [form, setForm] = useState<FormData>(INITIAL_FORM)
  const [files, setFiles] = useState<FileFields>(INITIAL_FILES)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<FormState>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [hydrated, setHydrated] = useState(false)
  const [devMode, setDevMode] = useState(false)

  const honeypotRef = useRef<HTMLInputElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const { containerRef, getTurnstileToken, removeTurnstile } = useTurnstile()

  // Hydrate from localStorage (form data only, not files)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const saved = JSON.parse(raw)
        if (saved.form) setForm({ ...INITIAL_FORM, ...saved.form })
        if (typeof saved.step === 'number' && saved.step >= 1 && saved.step <= 7) {
          setStep(saved.step)
        }
      }
    } catch {}
    if (process.env.NODE_ENV !== 'production') {
      try {
        const params = new URLSearchParams(window.location.search)
        if (params.get('dev') === '1') setDevMode(true)
      } catch {}
    }
    setHydrated(true)
  }, [])

  // Persist form + step. Strip high-value PII (IRD, bank account) so a later
  // XSS or device compromise can't harvest it from localStorage.
  useEffect(() => {
    if (!hydrated) return
    try {
      const { irdNumber: _ird, bankAccount: _bank, ...safeForm } = form
      void _ird; void _bank
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ form: safeForm, step }))
    } catch {}
  }, [form, step, hydrated])

  const set = useCallback(<K extends keyof FormData>(field: K, value: FormData[K]) => {
    setForm(prev => ({ ...prev, [field]: value }))
    setErrors(prev => {
      if (!prev[field as string]) return prev
      const next = { ...prev }
      delete next[field as string]
      return next
    })
  }, [])

  const setFile = useCallback(<K extends keyof FileFields>(field: K, file: UploadedFile | null) => {
    setFiles(prev => ({ ...prev, [field]: file }))
    setErrors(prev => {
      if (!prev[field as string]) return prev
      const next = { ...prev }
      delete next[field as string]
      return next
    })
  }, [])

  function scrollToCard() {
    requestAnimationFrame(() => {
      if (cardRef.current) {
        const y = cardRef.current.getBoundingClientRect().top + window.scrollY - 100
        window.scrollTo({ top: y, behavior: 'smooth' })
      }
    })
  }

  // ── Per-page validation ────────────────────────────────────────────────

  function validateStep(s: number): Record<string, string> {
    const e: Record<string, string> = {}

    if (s === 1) {
      if (!form.fullName.trim()) e.fullName = 'Required'
      if (!form.designation) e.designation = 'Required'
      if (!form.dob) e.dob = 'Required'
      else if (isNaN(Date.parse(form.dob))) e.dob = 'Enter a valid date'
      if (!form.phone.trim()) e.phone = 'Required'
      else if (!phoneRegex.test(form.phone)) e.phone = 'Enter a valid phone number'
      if (!form.email.trim()) e.email = 'Required'
      else if (!emailRegex.test(form.email)) e.email = 'Enter a valid email'
      if (!form.address.trim()) e.address = 'Required'
      if (!form.suburb.trim()) e.suburb = 'Required'
      if (!form.city.trim()) e.city = 'Required'
      if (!form.postalCode.trim()) e.postalCode = 'Required'
      if (form.convicted === 'Yes' && !form.convictedDetails.trim()) {
        e.convictedDetails = 'Please provide details'
      }
    }

    if (s === 2) {
      if (form.inductionDate && isNaN(Date.parse(form.inductionDate))) {
        e.inductionDate = 'Enter a valid date'
      }
      if (!form.branch) e.branch = 'Required'
      if (!form.legalStatus) e.legalStatus = 'Required'
      if (!form.howHeard) e.howHeard = 'Required'
      if (!form.irdNumber.trim()) e.irdNumber = 'Required'
      if (!form.bankAccount.trim()) e.bankAccount = 'Required'
      if (!form.taxCode.trim()) e.taxCode = 'Required'
      if (!form.kiwiSaverStatus) e.kiwiSaverStatus = 'Required'
      if (form.legalStatus === 'Work Visa' && !files.visaFile) {
        e.visaFile = 'Please upload your Work Visa'
      }
      if (form.kiwiSaverStatus === 'Yes - I am enrolled in KiwiSaver' && !form.kiwiSaverRate) {
        e.kiwiSaverRate = 'Required'
      }
      if (form.kiwiSaverStatus === 'I have opted out of KiwiSaver' && !files.kiwiSaverOptOutFile) {
        e.kiwiSaverOptOutFile = 'Please upload IRD opt-out letter'
      }
    }

    if (s === 3) {
      if (form.ethnicBackground.length === 0) e.ethnicBackground = 'Please select at least one'
      if (form.ethnicBackground.includes('Other') && !form.ethnicBackgroundOther.trim()) {
        e.ethnicBackgroundOther = 'Please specify'
      }
      if (!form.emergencyName.trim()) e.emergencyName = 'Required'
      if (!form.relationship) e.relationship = 'Required'
      if (form.relationship === 'Other' && !form.relationshipOther.trim()) {
        e.relationshipOther = 'Please specify'
      }
      if (form.emergencyPhone && !phoneRegex.test(form.emergencyPhone)) {
        e.emergencyPhone = 'Enter a valid phone number'
      }
    }

    if (s === 4) {
      if (form.hasLicence === 'Yes') {
        if (!form.licenceType) e.licenceType = 'Required'
        if (!form.licenceNumber.trim()) e.licenceNumber = 'Required'
        if (!form.licenceVersion.trim()) e.licenceVersion = 'Required'
        if (!form.licenceExpiry) e.licenceExpiry = 'Required'
        else if (isNaN(Date.parse(form.licenceExpiry))) e.licenceExpiry = 'Enter a valid date'
        if (!form.canDrive) e.canDrive = 'Required'
        if (!files.licenceFrontFile) e.licenceFrontFile = 'Please upload front of licence'
        if (!files.licenceBackFile) e.licenceBackFile = 'Please upload back of licence'
      }
    }

    if (s === 5) {
      if (!form.ttmQualification) e.ttmQualification = 'Required'
      if (form.ttmQualification === 'Other' && !form.ttmQualificationOther.trim()) {
        e.ttmQualificationOther = 'Please specify'
      }
      if (form.ttmQualification && form.ttmQualification !== 'None') {
        if (!form.proofOption) e.proofOption = 'Required'
        if (form.proofOption === 'I have a Warrant ID Number' && !form.warrantId.trim()) {
          e.warrantId = 'Required'
        }
        if (form.proofOption === 'I have a Certificate or other proof' && !files.qualificationFile) {
          e.qualificationFile = 'Please upload proof'
        }
        if (form.proofOption === 'Other' && !form.proofOtherDetails.trim()) {
          e.proofOtherDetails = 'Please provide details'
        }
      }
    }

    if (s === 6) {
      if (!form.shirtSize) e.shirtSize = 'Required'
      if (!form.steelCapBoots) e.steelCapBoots = 'Required'
      if (form.steelCapBoots === 'I need some please' && !form.bootSize) {
        e.bootSize = 'Required'
      }
      if (form.bootSize === 'Other' && !form.bootSizeOther.trim()) {
        e.bootSizeOther = 'Please specify'
      }
    }

    if (s === 7) {
      if (!form.drugTesting) e.drugTesting = 'Required'
      if (!form.codeOfConduct) e.codeOfConduct = 'Required'
      if (!form.photoPermission) e.photoPermission = 'Required'
      if (!form.declaration) e.declaration = 'Required'
    }

    return e
  }

  function goNext() {
    if (!devMode) {
      const e = validateStep(step)
      if (Object.keys(e).length) { setErrors(e); return }
    }
    setErrors({})
    setStep(s => Math.min(s + 1, 7))
    scrollToCard()
  }

  function goBack() {
    setErrors({})
    setStep(s => Math.max(s - 1, 1))
    scrollToCard()
  }

  async function submit() {
    const e = validateStep(7)
    if (Object.keys(e).length) { setErrors(e); return }
    setErrors({})
    setStatus('submitting')

    try {
      const token = await getTurnstileToken()
      const payload = {
        ...form,
        visaFile: files.visaFile,
        kiwiSaverOptOutFile: files.kiwiSaverOptOutFile,
        licenceFrontFile: files.licenceFrontFile,
        licenceBackFile: files.licenceBackFile,
        qualificationFile: files.qualificationFile,
        turnstileToken: token,
        companyPhone: honeypotRef.current?.value ?? '',
      }
      const res = await fetch('/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setErrorMessage(data.error || 'Something went wrong. Please try again.')
        setStatus('error')
        return
      }
      try { localStorage.removeItem(STORAGE_KEY) } catch {}
      removeTurnstile()
      setStatus('success')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch {
      setErrorMessage('Something went wrong. Please try again.')
      setStatus('error')
    }
  }

  // ── Hero ────────────────────────────────────────────────────────────────

  const hero = (
    <section
      style={{
        position: 'relative',
        background: 'linear-gradient(to bottom, #1c1508 0%, #111111 55%, #000000 100%)',
        paddingTop: '180px',
        paddingBottom: '56px',
        overflow: 'hidden',
      }}
      aria-label="Onboarding hero"
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
          <span className="eyebrow">Onboarding</span>
        </div>
        <h1 className="reveal d1 font-display" style={{ fontWeight: 700, fontSize: 'clamp(2.4rem,5vw,4.5rem)', lineHeight: 1.05, letterSpacing: '-0.03em', color: '#fff' }}>
          {status === 'success' ? 'Welcome Aboard' : 'Onboarding Form'}
        </h1>
        {status !== 'success' && (
          <p className="reveal d2" style={{ fontSize: '1rem', lineHeight: 1.78, color: 'var(--text-muted)', maxWidth: '520px', marginTop: '20px' }}>
            Complete the sections below to finish your onboarding with {brand.name}. Your progress saves automatically as you go.
          </p>
        )}
      </div>
    </section>
  )

  // ── Success ─────────────────────────────────────────────────────────────

  if (status === 'success') {
    return (
      <>
        <RevealObserver />
        {hero}
        <section style={{ background: 'var(--bg-dark)', padding: '36px 0 100px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px' }}>
            <div style={{
              background: 'var(--bg-elevated)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderTop: '3px solid var(--brand-primary)',
              borderRadius: '2px',
              padding: '48px 40px',
              textAlign: 'center',
            }}>
              <div style={{
                width: '56px', height: '56px', borderRadius: '50%',
                background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px',
              }}>
                <Check size={24} strokeWidth={2.5} color="#4ade80" aria-hidden="true" />
              </div>
              <h2 className="font-display" style={{ fontWeight: 700, fontSize: '1.6rem', color: '#fff', marginBottom: '16px' }}>
                Thank you and Welcome Aboard
              </h2>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.75, maxWidth: '520px', margin: '0 auto 12px' }}>
                For any questions please contact us at{' '}
                <a href="mailto:info@thetempcompany.co.nz" style={{ color: 'var(--brand-primary)', textDecoration: 'none' }}>info@thetempcompany.co.nz</a>{' '}
                or call one of our branches.
              </p>
              <div style={{
                display: 'flex', flexDirection: 'column', gap: '8px',
                maxWidth: '360px', margin: '24px auto 0',
                fontSize: '0.9rem', color: 'var(--text-muted)',
              }}>
                <div>
                  <a href="tel:0278367266" style={{ color: 'var(--brand-primary)', textDecoration: 'none', fontWeight: 500 }}>027 836 7266</a>
                  <span style={{ color: 'var(--text-muted)' }}> &middot; Wellington (Amy)</span>
                </div>
                <div>
                  <a href="tel:0278367262" style={{ color: 'var(--brand-primary)', textDecoration: 'none', fontWeight: 500 }}>027 836 7262</a>
                  <span style={{ color: 'var(--text-muted)' }}> &middot; Blenheim (Luke)</span>
                </div>
                <div>
                  <a href="tel:021836930" style={{ color: 'var(--brand-primary)', textDecoration: 'none', fontWeight: 500 }}>021 836 930</a>
                  <span style={{ color: 'var(--text-muted)' }}> &middot; Christchurch (Eli)</span>
                </div>
              </div>
              <Link href="/" style={{ display: 'inline-block', marginTop: '28px', color: 'var(--brand-primary)', fontSize: '0.9rem', textDecoration: 'none' }}>
                Back to Home
              </Link>
            </div>
          </div>
        </section>
      </>
    )
  }

  // ── Form ────────────────────────────────────────────────────────────────

  return (
    <>
      <RevealObserver />
      {hero}

      <section style={{ background: 'var(--bg-dark)', padding: '36px 0 100px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px' }}>

          <div
            ref={cardRef}
            className="reveal"
            style={{
              background: 'var(--bg-elevated)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderTop: '3px solid var(--brand-primary)',
              borderRadius: '2px',
              padding: '32px 24px',
            }}
          >
            <div ref={containerRef} style={{ display: 'none' }} />

            {/* Honeypot */}
            <input
              ref={honeypotRef}
              type="text"
              name="companyPhone"
              tabIndex={-1}
              autoComplete="off"
              className="absolute left-[-9999px] opacity-0 pointer-events-none"
            />

            {devMode && (
              <div style={{
                marginBottom: '16px', padding: '10px 14px',
                background: 'rgba(252,212,21,0.08)', border: '1px solid rgba(252,212,21,0.3)',
                borderRadius: '2px', fontSize: '0.8rem', color: 'var(--brand-primary)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap',
              }}>
                <span>Dev mode: validation bypassed. Click any step to jump.</span>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {STEPS.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => { setErrors({}); setStep(i + 1); scrollToCard() }}
                      style={{
                        width: '26px', height: '26px', borderRadius: '2px',
                        background: step === i + 1 ? 'var(--brand-primary)' : 'rgba(255,255,255,0.06)',
                        color: step === i + 1 ? '#000' : '#fff',
                        border: '1px solid rgba(252,212,21,0.3)',
                        fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer',
                      }}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <Stepper step={step} />

            <div style={{ paddingTop: '8px' }}>
              {step === 1 && <Step1 form={form} errors={errors} set={set} />}
              {step === 2 && <Step2 form={form} files={files} errors={errors} set={set} setFile={setFile} />}
              {step === 3 && <Step3 form={form} errors={errors} set={set} />}
              {step === 4 && <Step4 form={form} files={files} errors={errors} set={set} setFile={setFile} />}
              {step === 5 && <Step5 form={form} files={files} errors={errors} set={set} setFile={setFile} />}
              {step === 6 && <Step6 form={form} errors={errors} set={set} />}
              {step === 7 && <Step7 form={form} errors={errors} set={set} />}
            </div>

            {status === 'error' && (
              <p role="alert" aria-live="assertive" style={{
                marginTop: '20px', padding: '12px 14px',
                background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.25)',
                borderRadius: '2px', fontSize: '0.85rem', color: '#fca5a5', lineHeight: 1.6,
              }}>
                {errorMessage}
              </p>
            )}

            <div style={{
              display: 'flex', gap: '12px', marginTop: '32px',
              paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.07)',
            }}>
              {step > 1 && (
                <button type="button" onClick={goBack} className="btn-ghost" style={{ flexShrink: 0 }}>
                  <ArrowLeft size={16} strokeWidth={1.5} aria-hidden="true" />
                  Back
                </button>
              )}
              {step < 7 && (
                <button type="button" onClick={goNext} className="btn-orange" style={{ flex: 1, justifyContent: 'center' }}>
                  Next
                  <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" />
                </button>
              )}
              {step === 7 && (
                <button
                  type="button"
                  onClick={submit}
                  disabled={status === 'submitting'}
                  className="btn-orange"
                  style={{
                    flex: 1, justifyContent: 'center',
                    opacity: status === 'submitting' ? 0.6 : 1,
                    cursor: status === 'submitting' ? 'wait' : 'pointer',
                  }}
                >
                  {status === 'submitting' ? 'Submitting...' : 'Submit Onboarding'}
                  {status !== 'submitting' && <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" />}
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

// ── Stepper ────────────────────────────────────────────────────────────────

function Stepper({ step }: { step: number }) {
  const pct = (step / STEPS.length) * 100
  return (
    <div style={{ marginBottom: '28px' }}>
      {/* Mobile: "Step X of Y" + progress bar */}
      <div className="block md:hidden">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '10px' }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
            Step {step} of {STEPS.length}
          </span>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
            {STEPS[step - 1]}
          </span>
        </div>
        <div style={{ height: '3px', background: 'rgba(255,255,255,0.08)', borderRadius: '2px', overflow: 'hidden' }}>
          <div style={{
            height: '100%', width: `${pct}%`,
            background: 'var(--brand-primary)',
            transition: 'width 0.4s ease',
          }} />
        </div>
      </div>

      {/* Desktop: full labelled stepper */}
      <div className="hidden md:block">
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${STEPS.length}, 1fr)` }}>
          {STEPS.map((label, i) => {
            const n = i + 1
            const done = n < step
            const active = n === step
            const prevDone = i > 0 && (i) < step
            return (
              <div key={label} style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                {i > 0 && (
                  <div style={{
                    position: 'absolute',
                    top: '14px',
                    right: 'calc(50% + 18px)',
                    left: 'calc(-50% + 18px)',
                    height: '1px',
                    background: prevDone ? 'rgba(252,212,21,0.3)' : 'rgba(255,255,255,0.08)',
                    zIndex: 0,
                  }} />
                )}
                <div style={{
                  position: 'relative',
                  zIndex: 1,
                  width: '28px', height: '28px', borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.72rem', fontWeight: 600,
                  background: active ? 'var(--brand-primary)' : done ? 'rgba(252,212,21,0.2)' : 'rgba(255,255,255,0.08)',
                  color: active ? '#000' : done ? 'var(--brand-primary)' : 'var(--text-muted)',
                  border: active ? '2px solid var(--brand-primary)' : done ? '1px solid rgba(252,212,21,0.3)' : '1px solid rgba(255,255,255,0.1)',
                  transition: 'background 0.25s ease, color 0.25s ease, border-color 0.25s ease',
                  flexShrink: 0,
                  boxSizing: 'border-box',
                }}>
                  {done ? <Check size={12} strokeWidth={2.5} /> : n}
                </div>
                <span style={{
                  fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
                  color: active ? '#fff' : 'var(--text-muted)',
                  whiteSpace: 'nowrap',
                }}>
                  {label}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// ── Reusable field primitives ──────────────────────────────────────────────

function PageIntro({ eyebrow, text }: { eyebrow: string; text: string }) {
  return (
    <div style={{ marginBottom: '28px' }}>
      <div style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--brand-primary)', marginBottom: '8px' }}>
        {eyebrow}
      </div>
      <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>{text}</p>
    </div>
  )
}

function Helper({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '8px', lineHeight: 1.5 }}>
      {children}
    </p>
  )
}

function TextField({
  label, value, onChange, error, placeholder, helper, type = 'text', autoComplete, inputMode,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  error?: string
  placeholder?: string
  helper?: React.ReactNode
  type?: string
  autoComplete?: string
  inputMode?: 'text' | 'numeric' | 'tel' | 'email'
}) {
  return (
    <div style={fieldStyle}>
      <label style={labelStyle}>{label}</label>
      {helper && <Helper>{helper}</Helper>}
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        inputMode={inputMode}
        style={{ ...inputStyle, borderColor: error ? '#f87171' : 'rgba(255,255,255,0.12)' }}
      />
      <FieldError msg={error} />
    </div>
  )
}

function TextAreaField({
  label, value, onChange, error, placeholder, helper, rows = 4,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  error?: string
  placeholder?: string
  helper?: React.ReactNode
  rows?: number
}) {
  return (
    <div style={fieldStyle}>
      <label style={labelStyle}>{label}</label>
      {helper && <Helper>{helper}</Helper>}
      <textarea
        rows={rows}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={{ ...inputStyle, resize: 'vertical' as const, minHeight: '88px', borderColor: error ? '#f87171' : 'rgba(255,255,255,0.12)' }}
      />
      <FieldError msg={error} />
    </div>
  )
}

function DateField({
  label, value, onChange, error, helper,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  error?: string
  helper?: React.ReactNode
}) {
  const ref = useRef<HTMLInputElement>(null)
  return (
    <div style={fieldStyle}>
      <label style={labelStyle}>{label}</label>
      {helper && <Helper>{helper}</Helper>}
      <div style={{ position: 'relative' }}>
        <input
          ref={ref}
          type="date"
          value={value}
          onChange={e => onChange(e.target.value)}
          style={{ ...inputStyle, paddingRight: '44px', borderColor: error ? '#f87171' : 'rgba(255,255,255,0.12)' }}
        />
        <button
          type="button"
          onClick={() => ref.current?.showPicker?.()}
          tabIndex={-1}
          aria-label="Open date picker"
          style={{
            position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
            background: 'none', border: 'none', padding: '4px',
            cursor: 'pointer', color: 'var(--text-muted)',
            display: 'flex', alignItems: 'center',
          }}
        >
          <Calendar size={16} strokeWidth={1.5} aria-hidden="true" />
        </button>
      </div>
      <FieldError msg={error} />
    </div>
  )
}

function DropdownField({
  label, value, onChange, options, error, placeholder, helper,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  options: readonly string[]
  error?: string
  placeholder: string
  helper?: React.ReactNode
}) {
  return (
    <div style={fieldStyle}>
      <label style={labelStyle}>{label}</label>
      {helper && <Helper>{helper}</Helper>}
      <SelectWrapper value={value} onChange={onChange} error={error} placeholder={placeholder}>
        {dropdownOpts(options)}
      </SelectWrapper>
      <FieldError msg={error} />
    </div>
  )
}

// Multi-select checklist for ethnic background
function MultiSelectField({
  label, values, onToggle, options, error, helper,
}: {
  label: string
  values: string[]
  onToggle: (v: string) => void
  options: readonly string[]
  error?: string
  helper?: React.ReactNode
}) {
  return (
    <div style={fieldStyle}>
      <label style={labelStyle}>{label}</label>
      {helper && <Helper>{helper}</Helper>}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '6px 14px',
        padding: '14px 16px',
        background: 'rgba(255,255,255,0.03)',
        border: `1px solid ${error ? '#f87171' : 'rgba(255,255,255,0.08)'}`,
        borderRadius: '2px',
      }}>
        {options.map(o => {
          const checked = values.includes(o)
          return (
            <label key={o} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', padding: '4px 0' }}>
              <input
                type="checkbox"
                checked={checked}
                onChange={() => onToggle(o)}
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
                    <polyline points="1.5 5 4 7.5 8.5 2.5" stroke="#000" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </span>
              <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.85)' }}>{o}</span>
            </label>
          )
        })}
      </div>
      <FieldError msg={error} />
    </div>
  )
}

// Yes/No pill-style selector
function YesNoField({
  label, value, onChange, error, helper,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  error?: string
  helper?: React.ReactNode
}) {
  return (
    <div style={fieldStyle}>
      <label style={labelStyle}>{label}</label>
      {helper && <Helper>{helper}</Helper>}
      <div style={{ display: 'flex', gap: '10px' }}>
        {['Yes', 'No'].map(opt => {
          const active = value === opt
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(opt)}
              style={{
                flex: 1, padding: '12px 16px',
                borderRadius: '2px',
                border: active ? '1px solid var(--brand-primary)' : '1px solid rgba(255,255,255,0.14)',
                background: active ? 'rgba(252,212,21,0.12)' : 'rgba(255,255,255,0.03)',
                color: active ? '#fff' : 'var(--text-muted)',
                fontSize: '0.9rem', fontWeight: 500,
                cursor: 'pointer',
                transition: 'border-color 0.15s ease, background 0.15s ease',
              }}
            >
              {opt}
            </button>
          )
        })}
      </div>
      <FieldError msg={error} />
    </div>
  )
}

// ── Step components ────────────────────────────────────────────────────────

type StepBase = {
  form: FormData
  errors: Record<string, string>
  set: <K extends keyof FormData>(field: K, value: FormData[K]) => void
}
type StepWithFiles = StepBase & {
  files: FileFields
  setFile: <K extends keyof FileFields>(field: K, file: UploadedFile | null) => void
}

function Step1({ form, errors, set }: StepBase) {
  return (
    <>
      <PageIntro eyebrow="Personal Details" text="Please fill out the information below to begin your onboarding." />

      <TextField label="First and Last Name" value={form.fullName} onChange={v => set('fullName', v)} error={errors.fullName} placeholder="e.g. Anthony Simpson" autoComplete="name" />
      <TextField label="Preferred Name" value={form.preferredName} onChange={v => set('preferredName', v)} placeholder="Optional" />
      <DropdownField label="Designation" value={form.designation} onChange={v => set('designation', v)} options={OPTS.designation} error={errors.designation} placeholder="Select designation" />
      <DateField label="Date of Birth" value={form.dob} onChange={v => set('dob', v)} error={errors.dob} />
      <TextField label="Phone Number" value={form.phone} onChange={v => set('phone', v)} error={errors.phone} placeholder="027 123 4567" type="tel" inputMode="tel" autoComplete="tel" />
      <TextField label="Email Address" value={form.email} onChange={v => set('email', v)} error={errors.email} placeholder="your.email@example.com" type="email" inputMode="email" autoComplete="email" />
      <TextField label="Address" value={form.address} onChange={v => set('address', v)} error={errors.address} placeholder="Street Address" autoComplete="street-address" />
      <TextField label="Suburb" value={form.suburb} onChange={v => set('suburb', v)} error={errors.suburb} placeholder="Suburb" />
      <TextField label="City/Town" value={form.city} onChange={v => set('city', v)} error={errors.city} placeholder="City or Town" />
      <TextField label="Postal Code" value={form.postalCode} onChange={v => set('postalCode', v)} error={errors.postalCode} placeholder="Postal Code" autoComplete="postal-code" />

      <DropdownField label="Have you ever been convicted of a crime?" value={form.convicted} onChange={v => set('convicted', v)} options={OPTS.convicted} placeholder="Select an option" />
      {form.convicted === 'Yes' && (
        <TextAreaField label="If yes, please explain" value={form.convictedDetails} onChange={v => set('convictedDetails', v)} error={errors.convictedDetails} placeholder="Please provide details including dates" />
      )}
    </>
  )
}

function Step2({ form, files, errors, set, setFile }: StepWithFiles) {
  return (
    <>
      <PageIntro eyebrow="Employment Info" text="Please fill out the information below to continue your onboarding." />

      <DateField label="Induction Date" value={form.inductionDate} onChange={v => set('inductionDate', v)} error={errors.inductionDate} helper="If you know it" />
      <DropdownField label="Branch" value={form.branch} onChange={v => set('branch', v)} options={OPTS.branch} error={errors.branch} placeholder="TTC Branch" helper="Branch you'll work at" />
      <DropdownField label="Your legal status in New Zealand" value={form.legalStatus} onChange={v => set('legalStatus', v)} options={OPTS.legalStatus} error={errors.legalStatus} placeholder="Select your status" />

      {form.legalStatus === 'Work Visa' && (
        <div style={fieldStyle}>
          <label style={labelStyle}>Please upload evidence of your Work Visa</label>
          <FileUpload value={files.visaFile} onChange={f => setFile('visaFile', f)} error={errors.visaFile} />
        </div>
      )}

      <DropdownField label="How did you hear about this job?" value={form.howHeard} onChange={v => set('howHeard', v)} options={OPTS.howHeard} error={errors.howHeard} placeholder="Select an option" />
      <TextField label="IRD Number" value={form.irdNumber} onChange={v => set('irdNumber', v)} error={errors.irdNumber} placeholder="e.g. 123-456-789" helper="Your 8 or 9 digit IRD number (with or without hyphens)" />
      <TextField label="Bank Account Number" value={form.bankAccount} onChange={v => set('bankAccount', v)} error={errors.bankAccount} placeholder="e.g. 12-3456-7890123-00" helper="Your full bank account number" />
      <TextField
        label="Tax Code"
        value={form.taxCode}
        onChange={v => set('taxCode', v)}
        error={errors.taxCode}
        placeholder="e.g. M, ME, SB, S etc"
        helper={<>If you&rsquo;re unsure please visit{' '}<a href="https://bit.ly/4iT9by5" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--brand-primary)', textDecoration: 'underline' }}>https://bit.ly/4iT9by5</a></>}
      />
      <DropdownField label="KiwiSaver Status" value={form.kiwiSaverStatus} onChange={v => set('kiwiSaverStatus', v)} options={OPTS.kiwiSaverStatus} error={errors.kiwiSaverStatus} placeholder="Select your status" />

      {form.kiwiSaverStatus === 'Yes - I am enrolled in KiwiSaver' && (
        <DropdownField label="Choose a KiwiSaver Rate" value={form.kiwiSaverRate} onChange={v => set('kiwiSaverRate', v)} options={OPTS.kiwiSaverRate} error={errors.kiwiSaverRate} placeholder="Select a rate" />
      )}
      {form.kiwiSaverStatus === 'I have opted out of KiwiSaver' && (
        <div style={fieldStyle}>
          <label style={labelStyle}>Upload proof from the IRD (opt-out letter)</label>
          <FileUpload value={files.kiwiSaverOptOutFile} onChange={f => setFile('kiwiSaverOptOutFile', f)} error={errors.kiwiSaverOptOutFile} />
        </div>
      )}
    </>
  )
}

function Step3({ form, errors, set }: StepBase) {
  function toggleEthnic(v: string) {
    const list = form.ethnicBackground.includes(v)
      ? form.ethnicBackground.filter(x => x !== v)
      : [...form.ethnicBackground, v]
    set('ethnicBackground', list)
  }

  return (
    <>
      <PageIntro eyebrow="Background and Emergencies" text="Please fill out the information below to continue your onboarding." />

      <MultiSelectField
        label="What is your ethnic background?"
        values={form.ethnicBackground}
        onToggle={toggleEthnic}
        options={OPTS.ethnicBackground}
        error={errors.ethnicBackground}
        helper="Multiple selections are ok"
      />
      {form.ethnicBackground.includes('Other') && (
        <TextField label="Please specify" value={form.ethnicBackgroundOther} onChange={v => set('ethnicBackgroundOther', v)} error={errors.ethnicBackgroundOther} placeholder="Your ethnic background" />
      )}

      <TextField label="Emergency Contact Name" value={form.emergencyName} onChange={v => set('emergencyName', v)} error={errors.emergencyName} placeholder="Contact person's first and last name" />
      <DropdownField label="Relationship" value={form.relationship} onChange={v => set('relationship', v)} options={OPTS.relationship} error={errors.relationship} placeholder="Select relationship" />
      {form.relationship === 'Other' && (
        <TextField label="Please specify" value={form.relationshipOther} onChange={v => set('relationshipOther', v)} error={errors.relationshipOther} placeholder="Relationship" />
      )}

      <TextField label="Emergency Contact Phone" value={form.emergencyPhone} onChange={v => set('emergencyPhone', v)} error={errors.emergencyPhone} placeholder="021 123 4567" type="tel" inputMode="tel" />
      <TextAreaField label="Emergency information" value={form.emergencyNotes} onChange={v => set('emergencyNotes', v)} placeholder="e.g. allergies or medical conditions" helper="Please detail any information that may be useful in an emergency" />
    </>
  )
}

function Step4({ form, files, errors, set, setFile }: StepWithFiles) {
  return (
    <>
      <PageIntro eyebrow="Driver's Licence & Transport" text="Please fill out the information below to continue your onboarding." />

      <YesNoField label="Do you have a current Driver's Licence?" value={form.hasLicence} onChange={v => set('hasLicence', v)} />

      {form.hasLicence === 'Yes' && (
        <>
          <DropdownField label="Driver's Licence Type" value={form.licenceType} onChange={v => set('licenceType', v)} options={OPTS.licenceType} error={errors.licenceType} placeholder="Select licence type" />
          <TextField label="Driver's Licence Number" value={form.licenceNumber} onChange={v => set('licenceNumber', v)} error={errors.licenceNumber} placeholder="e.g. AB123456" />
          <TextField label="Driver's Licence Version" value={form.licenceVersion} onChange={v => set('licenceVersion', v)} error={errors.licenceVersion} placeholder="e.g. 456" />
          <DateField label="Expiry Date" value={form.licenceExpiry} onChange={v => set('licenceExpiry', v)} error={errors.licenceExpiry} />

          <div style={fieldStyle}>
            <label style={labelStyle}>Endorsement</label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', padding: '8px 0' }}>
              <input
                type="checkbox"
                checked={form.class2Endorsement}
                onChange={() => set('class2Endorsement', !form.class2Endorsement)}
                style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
              />
              <span style={{
                width: '16px', height: '16px', borderRadius: '2px', flexShrink: 0,
                border: form.class2Endorsement ? '2px solid var(--brand-primary)' : '2px solid rgba(255,255,255,0.2)',
                background: form.class2Endorsement ? 'var(--brand-primary)' : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {form.class2Endorsement && (
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                    <polyline points="1.5 5 4 7.5 8.5 2.5" stroke="#000" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </span>
              <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.85)' }}>Class 2</span>
            </label>
          </div>

          <DropdownField label="I can drive" value={form.canDrive} onChange={v => set('canDrive', v)} options={OPTS.canDrive} error={errors.canDrive} placeholder="Select option" />

          <div style={fieldStyle}>
            <label style={labelStyle}>Front of Licence</label>
            <FileUpload
              value={files.licenceFrontFile}
              onChange={f => setFile('licenceFrontFile', f)}
              error={errors.licenceFrontFile}
              helperText="Upload a clear photo of the front of your licence"
              maxBytes={5 * 1024 * 1024}
            />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Back of Licence</label>
            <FileUpload
              value={files.licenceBackFile}
              onChange={f => setFile('licenceBackFile', f)}
              error={errors.licenceBackFile}
              helperText="Upload a clear photo of the back of your licence"
              maxBytes={5 * 1024 * 1024}
            />
          </div>
        </>
      )}
    </>
  )
}

function Step5({ form, files, errors, set, setFile }: StepWithFiles) {
  return (
    <>
      <PageIntro eyebrow="Certifications & Training" text="Please fill out the information below to continue your onboarding." />

      <DropdownField
        label="What TTM qualifications do you currently hold?"
        value={form.ttmQualification}
        onChange={v => {
          set('ttmQualification', v)
          if (v === 'None') {
            set('ttmQualificationOther', '')
            set('nsn', '')
            set('proofOption', '')
            set('warrantId', '')
            set('proofOtherDetails', '')
            setFile('qualificationFile', null)
          }
        }}
        options={OPTS.ttmQualification}
        error={errors.ttmQualification}
        placeholder="Select your qualification"
      />
      {form.ttmQualification === 'Other' && (
        <TextField label="Please specify" value={form.ttmQualificationOther} onChange={v => set('ttmQualificationOther', v)} error={errors.ttmQualificationOther} placeholder="Your qualification" />
      )}

      {form.ttmQualification && form.ttmQualification !== 'None' && (
        <>
          <TextField
            label="NSN (National Student Number)"
            value={form.nsn}
            onChange={v => set('nsn', v)}
            placeholder="Enter your NSN"
            helper="If you don't know your NSN number, you can call NZQA on 0800 697 296 (M-F 8am-5pm)"
          />

          <DropdownField label="Please choose one of these options" value={form.proofOption} onChange={v => set('proofOption', v)} options={OPTS.proofOption} error={errors.proofOption} placeholder="Select an option" />

          {form.proofOption === 'I have a Warrant ID Number' && (
            <TextField label="Warrant ID Number" value={form.warrantId} onChange={v => set('warrantId', v)} error={errors.warrantId} placeholder="Enter your NZTA Warrant ID" />
          )}
          {form.proofOption === 'I have a Certificate or other proof' && (
            <div style={fieldStyle}>
              <label style={labelStyle}>Please upload proof of your qualification</label>
              <FileUpload value={files.qualificationFile} onChange={f => setFile('qualificationFile', f)} error={errors.qualificationFile} />
            </div>
          )}
          {form.proofOption === 'Other' && (
            <TextAreaField label="Please provide details" value={form.proofOtherDetails} onChange={v => set('proofOtherDetails', v)} error={errors.proofOtherDetails} placeholder="Tell us about your qualifications" />
          )}
        </>
      )}
    </>
  )
}

function Step6({ form, errors, set }: StepBase) {
  return (
    <>
      <PageIntro eyebrow="PPE & Uniform" text="Please fill out the information below to continue your onboarding." />

      <DropdownField label="Shirt/Top Size" value={form.shirtSize} onChange={v => set('shirtSize', v)} options={OPTS.shirtSize} error={errors.shirtSize} placeholder="Select vest size" />
      <DropdownField label="Steel Cap Boots" value={form.steelCapBoots} onChange={v => set('steelCapBoots', v)} options={OPTS.steelCapBoots} error={errors.steelCapBoots} placeholder="Select an option" />

      {form.steelCapBoots === 'I need some please' && (
        <>
          <DropdownField
            label="Boot Size (no half sizes)"
            value={form.bootSize}
            onChange={v => set('bootSize', v)}
            options={OPTS.bootSize}
            error={errors.bootSize}
            placeholder="Select boot size"
            helper="Sizes are in US Men's"
          />
          {form.bootSize === 'Other' && (
            <TextField label="Please specify" value={form.bootSizeOther} onChange={v => set('bootSizeOther', v)} error={errors.bootSizeOther} placeholder="Your boot size" />
          )}
        </>
      )}
    </>
  )
}

function Step7({ form, errors, set }: StepBase) {
  const agreeOpt = ['I understand and agree to this policy']
  const photoOpts = ['I give permission', 'I do not give permission']
  const declOpts = ['I understand and agree with the above statement']

  return (
    <>
      <PageIntro eyebrow="Policies & Submissions" text="Please read each policy, then confirm below." />

      <div style={fieldStyle}>
        <label style={labelStyle}>
          Please read the{' '}
          <a href="/docs/consent-to-drug-testing.pdf" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--brand-primary)', textDecoration: 'underline', textTransform: 'none', letterSpacing: 0, fontWeight: 600 }}>
            Consent to Drug Testing
          </a>{' '}
          Policy
        </label>
        <Helper>Click the link above to read the policy. If you do not agree we will be unable to progress your employment.</Helper>
        <SelectWrapper value={form.drugTesting} onChange={v => set('drugTesting', v)} error={errors.drugTesting} placeholder="Select an option">
          {dropdownOpts(agreeOpt)}
        </SelectWrapper>
        <FieldError msg={errors.drugTesting} />
      </div>

      <div style={fieldStyle}>
        <label style={labelStyle}>
          Please read our{' '}
          <a href="/docs/code-of-conduct.pdf" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--brand-primary)', textDecoration: 'underline', textTransform: 'none', letterSpacing: 0, fontWeight: 600 }}>
            Code of Conduct
          </a>
        </label>
        <Helper>Click the link above to read the Code. If you do not agree we will be unable to progress your employment.</Helper>
        <SelectWrapper value={form.codeOfConduct} onChange={v => set('codeOfConduct', v)} error={errors.codeOfConduct} placeholder="Select an option">
          {dropdownOpts(agreeOpt)}
        </SelectWrapper>
        <FieldError msg={errors.codeOfConduct} />
      </div>

      <div style={fieldStyle}>
        <label style={labelStyle}>Photo/Video Permission</label>
        <Helper>We would be grateful if you would give us permission to use work related photos/videos of you in our printed and online publicity.</Helper>
        <SelectWrapper value={form.photoPermission} onChange={v => set('photoPermission', v)} error={errors.photoPermission} placeholder="Select an option">
          {dropdownOpts(photoOpts)}
        </SelectWrapper>
        <FieldError msg={errors.photoPermission} />
      </div>

      <div style={fieldStyle}>
        <label style={labelStyle}>Declaration</label>
        <div style={{
          padding: '16px',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '2px',
          marginBottom: '12px',
        }}>
          <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.85)', lineHeight: 1.65, marginBottom: '10px' }}>
            I hereby declare that all the information provided is, to the best of my knowledge, true, complete, and accurate.
          </p>
          <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.85)', lineHeight: 1.65 }}>
            I understand that any falsification, misrepresentation, or omission of relevant details may result in the withdrawal of any previous offer of employment or other opportunities.
          </p>
        </div>
        <SelectWrapper value={form.declaration} onChange={v => set('declaration', v)} error={errors.declaration} placeholder="Select an option">
          {dropdownOpts(declOpts)}
        </SelectWrapper>
        <FieldError msg={errors.declaration} />
      </div>
    </>
  )
}
