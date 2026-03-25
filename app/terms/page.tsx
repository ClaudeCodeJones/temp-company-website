import type { Metadata } from 'next'
import RevealObserver from '../components/RevealObserver'
import { brand } from '../../config/brand'

export const metadata: Metadata = {
  title: `Terms and Conditions | ${brand.name}`,
  description: `Terms and Conditions for ${brand.name}.`,
  alternates: {
    canonical: '/terms',
  },
}

export default function TermsPage() {
  return (
    <>
      <RevealObserver />

      <section
        style={{
          position: 'relative',
          background: 'var(--color-bg-deep)',
          paddingTop: '180px',
          paddingBottom: '80px',
          overflow: 'hidden',
        }}
        aria-label="Terms and Conditions hero"
      >
        <div style={{ position: 'absolute', top: '-100px', left: '50%', transform: 'translateX(-50%)', width: '700px', height: '700px', background: 'radial-gradient(circle, rgba(252,212,21,0.07) 0%, transparent 65%)', pointerEvents: 'none' }} aria-hidden="true" />

        <div style={{ position: 'relative', zIndex: 10, maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div className="reveal" style={{ marginBottom: '20px' }}>
            <span className="eyebrow">Legal</span>
          </div>
          <h1 className="reveal d1 font-display" style={{ fontWeight: 700, fontSize: 'clamp(2.4rem,5vw,4.5rem)', lineHeight: 1.05, letterSpacing: '-0.03em', color: '#fff' }}>
            Terms and Conditions
          </h1>
        </div>
      </section>

      <section style={{ background: 'var(--bg-dark)', padding: '80px 0 120px' }} aria-label="Terms and Conditions content">
        <div style={{ maxWidth: '760px', margin: '0 auto', padding: '0 24px' }}>
          <div className="reveal" style={{ marginBottom: '16px' }}>
            <div className="orange-rule" style={{ marginBottom: '28px' }} />
            <h2 className="font-display" style={{ fontWeight: 700, fontSize: 'clamp(1.4rem,2.5vw,2rem)', letterSpacing: '-0.02em', color: '#fff', marginBottom: '20px' }}>
              Coming Soon
            </h2>
            <p style={{ fontSize: '1rem', lineHeight: 1.78, color: 'var(--text-muted)' }}>
              Our Terms and Conditions are currently being finalised. For details, please contact your Operations Coordinator directly.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
