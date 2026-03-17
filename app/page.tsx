import type { Metadata } from 'next'
import Link from 'next/link'
import RevealObserver from './components/RevealObserver'
import { brand } from '../config/brand'
import { site } from '../config/site'

export const metadata: Metadata = {
  title: `${brand.name} | ${site.serviceArea}`,
  description: site.description,
  alternates: {
    canonical: '/',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: brand.name,
  url: brand.domain,
  description: site.description,
  serviceType: site.businessType,
  sameAs: [brand.social.facebook, brand.social.linkedin].filter(Boolean),
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <RevealObserver />

      {/* ── HERO ── */}
      <section
        aria-label="Hero"
        style={{
          position: 'relative',
          background: 'var(--color-bg-main)',
          overflow: 'hidden',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* Radial glow */}
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
          background: 'radial-gradient(circle at center, rgba(252,212,21,0.22) 0%, rgba(252,212,21,0.12) 25%, rgba(252,212,21,0.05) 40%, rgba(252,212,21,0) 60%)',
        }} />

        <div style={{
          position: 'relative', zIndex: 10,
          width: '100%',
          maxWidth: '960px', margin: '0 auto',
          padding: 'clamp(120px,12vw,140px) 24px clamp(80px,12vw,140px)',
          textAlign: 'center',
        }}>

          <h1 className="reveal d1 font-display" style={{
            fontWeight: 700,
            fontSize: 'clamp(2.8rem,6.5vw,5.5rem)',
            lineHeight: 1.04,
            letterSpacing: '-0.03em',
            color: '#fff',
          }}>
            Staff When You Need <span style={{ color: 'var(--brand-primary)' }}>Them</span>
          </h1>

          <p className="reveal d2" style={{
            fontSize: '1.0625rem',
            lineHeight: 1.78,
            color: 'var(--text-muted)',
            maxWidth: '680px',
            margin: '28px auto 0',
          }}>
            Temporary workers for traffic management, civil and infrastructure projects.<br /><br />
            <strong style={{ color: '#fff', fontWeight: 600 }}>Christchurch</strong>, <strong style={{ color: '#fff', fontWeight: 600 }}>Wellington</strong> and <strong style={{ color: '#fff', fontWeight: 600 }}>Blenheim</strong>. Ready at short notice.
          </p>

          {/* Gateway tiles */}
          <div className="reveal d3 gateway-hero-grid">

            <Link href="/hire-staff" className="gateway-hero-card gateway-hero-card--staff">
              <span className="font-display gateway-hero-card-title">I&rsquo;m Looking<br />for Staff</span>
            </Link>

            <Link href="/find-work" className="gateway-hero-card gateway-hero-card--work">
              <span className="font-display gateway-hero-card-title">I&rsquo;m Looking<br />for Work</span>
            </Link>

          </div>

        </div>
      </section>
    </>
  )
}
