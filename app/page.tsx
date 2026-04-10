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
  '@type': ['LocalBusiness', 'EmploymentAgency'],
  name: brand.name,
  url: brand.domain,
  description: site.description,
  serviceType: site.businessType,
  image: `${brand.domain}${brand.logoPath}`,
  areaServed: ['Wellington', 'Marlborough', 'Canterbury'],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    email: 'info@thetempcompany.co.nz',
  },
  location: [
    {
      '@type': 'Place',
      name: 'Wellington Branch',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '23 Meachen St',
        addressLocality: 'Seaview, Lower Hutt',
        addressRegion: 'Wellington',
        addressCountry: 'NZ',
      },
    },
    {
      '@type': 'Place',
      name: 'Blenheim Branch',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '7 Freswick St',
        addressLocality: 'Blenheim',
        addressRegion: 'Marlborough',
        addressCountry: 'NZ',
      },
    },
    {
      '@type': 'Place',
      name: 'Christchurch Branch',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '25 Blakes Rd',
        addressLocality: 'Belfast, Christchurch',
        addressRegion: 'Canterbury',
        addressCountry: 'NZ',
      },
    },
  ],
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
          background: 'linear-gradient(to bottom, #37373b 0%, #2e3949 55%, #000000 100%)',
          overflow: 'hidden',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* Grid overlay */}
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
          backgroundImage: `
            repeating-linear-gradient(0deg, rgba(255,255,255,0.045) 0px, rgba(255,255,255,0.045) 1px, transparent 1px, transparent 60px),
            repeating-linear-gradient(90deg, rgba(255,255,255,0.045) 0px, rgba(255,255,255,0.045) 1px, transparent 1px, transparent 60px)
          `,
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
            People When You Need <span style={{ color: 'var(--brand-primary)' }}>Them</span>
          </h1>

          <p className="reveal d2" style={{
            fontSize: '1.0625rem',
            lineHeight: 1.78,
            color: 'var(--text-muted)',
            maxWidth: '680px',
            margin: '28px auto 0',
          }}>
            Whether you need someone <strong style={{ color: '#fff', fontWeight: 600 }}>tomorrow</strong> or <strong style={{ color: '#fff', fontWeight: 600 }}>someone for keeps</strong>, we&rsquo;ve got you covered.{' '}
            <span className="hero-locations">Temporary workers ready at short notice in <strong style={{ color: '#fff', fontWeight: 600 }}>Christchurch</strong>, <strong style={{ color: '#fff', fontWeight: 600 }}>Wellington</strong> and <strong style={{ color: '#fff', fontWeight: 600 }}>Blenheim</strong>.{' '}<span className="hero-locations">Permanent recruitment services are available <strong style={{ color: '#fff', fontWeight: 600 }}>nationwide</strong> across all industries.</span></span>
          </p>

          {/* Gateway tiles */}
          <div className="reveal d3 gateway-hero-grid">

            <Link href="/hire-staff" className="gateway-hero-card gateway-hero-card--staff">
              <span className="font-display gateway-hero-card-title">I&rsquo;m Looking<br />for Temp Staff</span>
            </Link>

            <Link href="/find-talent" className="gateway-hero-card gateway-hero-card--talent">
              <span className="font-display gateway-hero-card-title">I&rsquo;m Looking<br />to Fill a Position</span>
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
