import type { Metadata } from 'next'
import { Phone, Mail } from 'lucide-react'
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
        style={{ position: 'relative', background: 'var(--color-bg-deep)', paddingTop: '180px', paddingBottom: '56px', overflow: 'hidden' }}
        aria-label="Apply hero"
      >
        <div style={{ position: 'absolute', top: '-100px', left: '50%', transform: 'translateX(-50%)', width: '700px', height: '700px', background: 'radial-gradient(circle, rgba(252,212,21,0.07) 0%, transparent 65%)', pointerEvents: 'none' }} aria-hidden="true" />

        <div style={{ position: 'relative', zIndex: 10, maxWidth: '800px', margin: '0 auto', padding: '0 24px' }}>
          <div className="reveal" style={{ marginBottom: '20px' }}>
            <span className="eyebrow">Join Our Worker Pool</span>
          </div>
          <h1 className="reveal d1 font-display" style={{ fontWeight: 700, fontSize: 'clamp(2.4rem,5vw,4.5rem)', lineHeight: 1.05, letterSpacing: '-0.03em', color: '#fff' }}>
            Apply for Work
          </h1>
          <p className="reveal d2" style={{ fontSize: '1rem', lineHeight: 1.78, color: 'var(--text-muted)', maxWidth: '480px', marginTop: '20px' }}>
            Fill in your details below and our team will be in touch. We review every application and aim to respond within a few business days.
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
        </div>
      </section>

      <ApplicationSection />
    </>
  )
}
