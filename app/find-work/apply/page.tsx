import type { Metadata } from 'next'
import RevealObserver from '../../components/RevealObserver'
import ApplicationSection from '../../components/careers/ApplicationSection'
import { brand } from '../../../config/brand'

export const metadata: Metadata = {
  title: `Apply for Work | ${brand.name}`,
  description: `Apply to register with ${brand.name} and find work in traffic management, civil construction, events, and general labour across New Zealand.`,
  alternates: {
    canonical: '/find-work/apply',
  },
}

export default function ApplyPage() {
  return (
    <>
      <RevealObserver />

      {/* ── HERO ── */}
      <section
        style={{ position: 'relative', background: '#252528', paddingTop: '180px', paddingBottom: '80px', overflow: 'hidden' }}
        aria-label="Apply hero"
      >
        <div style={{ position: 'absolute', top: '-100px', left: '50%', transform: 'translateX(-50%)', width: '700px', height: '700px', background: 'radial-gradient(circle, rgba(252,212,21,0.07) 0%, transparent 65%)', pointerEvents: 'none' }} aria-hidden="true" />

        <div style={{ position: 'relative', zIndex: 10, maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ maxWidth: '620px' }}>
            <div className="reveal" style={{ marginBottom: '20px' }}>
              <span className="eyebrow">Join Our Worker Pool</span>
            </div>
            <h1 className="reveal d1 font-display" style={{ fontWeight: 700, fontSize: 'clamp(2.4rem,5vw,4.5rem)', lineHeight: 1.05, letterSpacing: '-0.03em', color: '#fff' }}>
              Apply for Work
            </h1>
            <p className="reveal d2" style={{ fontSize: '1rem', lineHeight: 1.78, color: 'var(--text-muted)', maxWidth: '500px', marginTop: '24px' }}>
              Fill in your details below and our team will be in touch. We review every application and aim to respond within a few business days.
            </p>
          </div>
        </div>
      </section>

      <ApplicationSection />
    </>
  )
}
