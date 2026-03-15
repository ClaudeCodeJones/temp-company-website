'use client'

import { useState, useEffect, useRef, Suspense } from 'react'
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
      <section id="apply" style={{ background: 'var(--bg-dark)', padding: '36px 0 100px' }} aria-label="Apply now">
        <div ref={sectionRef} style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px' }}>

          {/* Accented info box */}
          <div style={{ marginBottom: '32px', padding: '24px', background: 'rgba(252,212,21,0.06)', border: '1px solid rgba(252,212,21,0.15)', borderLeft: '3px solid var(--brand-primary)', borderRadius: '2px' }}>
            <p className="font-display" style={{ fontWeight: 600, fontSize: '0.9rem', color: '#fff', marginBottom: '8px' }}>Important for Casual Applicants</p>
            <p style={{ fontSize: '0.85rem', lineHeight: 1.65, color: 'var(--text-muted)', marginBottom: '14px' }}>
              Casual work is naturally sporadic. While it offers flexibility, we do expect workers to be available most of the time, ideally around 80%. This arrangement may not suit everyone.
            </p>
            <p style={{ fontSize: '0.85rem', lineHeight: 1.65, color: 'var(--text-muted)', marginBottom: '14px' }}>
              We want to ensure you fully understand the role before proceeding. If you require a consistent income, this may not be the right fit for you.
            </p>
            <p style={{ fontSize: '0.85rem', lineHeight: 1.65, color: 'var(--text-muted)' }}>
              If you are applying for a casual traffic role, please read the{' '}
              <a href="/docs/maw_casual_worker_guide.pdf" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--brand-primary)', textDecoration: 'none', fontWeight: 500 }}>
                What to Expect as a Casual Worker
              </a>
              {' '}guide before completing the application form.
            </p>
          </div>

          {/* Form */}
          <div className="reveal">
            <Suspense fallback={<div />}>
              <ApplicationForm onSuccess={() => setSubmitted(true)} sectionRef={sectionRef} />
            </Suspense>
          </div>

        </div>
      </section>

      {!submitted && (
        <section style={{
          position: 'relative',
          background: 'linear-gradient(to bottom, rgba(196,150,20,0.12) 0%, rgba(0,0,0,0.85) 40%, #000 100%)',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          overflow: 'hidden',
        }}>
          <div aria-hidden="true" style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            backgroundImage: `
              repeating-linear-gradient(0deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 60px),
              repeating-linear-gradient(90deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 60px)
            `,
          }} />
          <div style={{ position: 'relative', zIndex: 10, maxWidth: '1280px', margin: '0 auto', padding: '72px 24px', textAlign: 'center' }}>
            <h2 className="font-display" style={{ fontWeight: 700, fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', lineHeight: 1.1, letterSpacing: '-0.02em', color: '#fff', marginBottom: '16px' }}>
              Ready to Find Work?
            </h2>
            <p style={{ fontSize: '1rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.75)', maxWidth: '480px', margin: '0 auto 36px' }}>
              Get qualified workers on site quickly with The Temp Company.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '14px' }}>
              <a href="/find-work/apply" style={{ background: '#bc9c22', color: '#fff', border: 'none', borderRadius: '999px', padding: '14px 32px', fontWeight: 600, fontSize: '0.9375rem', textDecoration: 'none', display: 'inline-block', cursor: 'pointer' }}>Apply Now</a>
              <a href="/about-us#operations-team" style={{ background: 'transparent', color: '#fff', border: '1px solid rgba(255,255,255,0.45)', borderRadius: '999px', padding: '14px 32px', fontWeight: 600, fontSize: '0.9375rem', textDecoration: 'none', display: 'inline-block', cursor: 'pointer' }}>Call Us Now</a>
            </div>
          </div>
        </section>
      )}
    </>
  )
}
