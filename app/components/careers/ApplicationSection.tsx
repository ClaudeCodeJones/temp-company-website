'use client'

import { useState, useEffect, useRef, Suspense } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import ApplicationForm from './ApplicationForm'

export default function ApplicationSection() {
  const [submitted, setSubmitted] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (submitted) {
      sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [submitted])

  if (submitted) {
    return (
      <section ref={sectionRef} id="apply" style={{ background: 'var(--color-bg-deep)', padding: '100px 0', borderTop: '1px solid rgba(255,255,255,0.04)' }} aria-label="Apply now">
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{
              background: 'var(--bg-elevated)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderTop: '3px solid var(--brand-primary)',
              borderRadius: '2px',
              padding: '64px 40px',
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
              <Link
                href="/"
                className="text-orange-500 text-sm hover:text-orange-400 transition mt-6 inline-block"
              >
                Back to Home →
              </Link>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <>
      <section id="apply" style={{ background: 'var(--color-bg-deep)', padding: '100px 0', borderTop: '1px solid rgba(255,255,255,0.04)' }} aria-label="Apply now">
        <div ref={sectionRef} style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div className="two-col-grid" style={{ alignItems: 'start' }}>

            {/* Left: copy */}
            <div>
              <div className="reveal" style={{ marginBottom: '10px' }}>
                <span className="eyebrow">Get In Touch</span>
              </div>
              <h2 className="section-title reveal d1" style={{ fontSize: 'clamp(1.8rem,3.5vw,3rem)', color: '#fff' }}>
                Apply Now
              </h2>
              <div className="orange-rule reveal d2" style={{ marginTop: '16px' }} />
              <p className="reveal d3" style={{ fontSize: '1rem', lineHeight: 1.78, color: 'var(--text-muted)', marginTop: '24px' }}>
                Fill in the form and one of our team will be in touch. We review every application and aim to respond within a few business days.
              </p>

              <div className="reveal d5" style={{ marginTop: '40px', padding: '24px', background: 'rgba(252,212,21,0.06)', border: '1px solid rgba(252,212,21,0.15)', borderLeft: '3px solid var(--brand-primary)', borderRadius: '2px' }}>
                <p className="font-display" style={{ fontWeight: 600, fontSize: '0.9rem', color: '#fff', marginBottom: '8px' }}>
                  Important for Casual Applicants
                </p>
                <p style={{ fontSize: '0.85rem', lineHeight: 1.65, color: 'var(--text-muted)', marginBottom: '14px' }}>
                  The nature of casual work is sporadic. While this can offer flexibility, and we do promote from within our casual pool when full-time positions become available, it may not suit everyone.
                </p>
                <p style={{ fontSize: '0.85rem', lineHeight: 1.65, color: 'var(--text-muted)', marginBottom: '14px' }}>
                  We want to ensure you fully understand the role before proceeding. If you require a consistent income, this may not be the right fit for you.
                </p>
                <p style={{ fontSize: '0.85rem', lineHeight: 1.65, color: 'var(--text-muted)' }}>
                  If you are applying for a casual traffic role, please read the{' '}
                  <a
                    href="/docs/maw_casual_worker_guide.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--brand-primary)', textDecoration: 'none', fontWeight: 500 }}
                  >
                    What to Expect as a Casual Worker
                  </a>
                  {' '}guide before completing the application form.
                </p>
              </div>
            </div>

            {/* Right: form */}
            <div className="reveal d2">
              <Suspense fallback={<div />}>
                <ApplicationForm onSuccess={() => setSubmitted(true)} sectionRef={sectionRef} />
              </Suspense>
            </div>

          </div>
        </div>
      </section>

      {!submitted && (
        <section className="cta-section" aria-label="Call to action">
          <div style={{ position: 'relative', zIndex: 10, maxWidth: '1280px', margin: '0 auto', padding: '80px 24px', textAlign: 'center' }}>
            <div className="reveal">
              <h2 className="font-display" style={{ fontWeight: 700, fontSize: 'clamp(2rem,4.5vw,4rem)', color: '#fff', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                Ready to join the team?
              </h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '14px', marginTop: '36px' }}>
                <a href="#apply" className="btn-white">
                  Apply Now
                  <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" />
                </a>
                <Link href="/contact" className="btn-outline-white">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  )
}
