import Link from 'next/link'
import { ArrowRight, Check, MapPin, Phone } from 'lucide-react'
import RevealObserver from './RevealObserver'
import { brand } from '../../config/brand'
import { site } from '../../config/site'

type LocationPageProps = {
  city: string
  region: string
  coverage: string[]
}

const services = [
  'Traffic Management',
  'Temporary Traffic Management Plans (TMP)',
  'Event Traffic Management',
  'Traffic Control Crews',
  'Site Setup and Monitoring',
  'Traffic Management Consultancy',
]

const reasons = [
  'Experienced STMS supervisors',
  'Modern traffic management fleet',
  `Reliable response across the region`,
  'Proven safety and compliance systems',
]

export default function LocationPage({ city, region, coverage }: LocationPageProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: brand.name,
    url: `${brand.domain}/labour-hire/${city.toLowerCase()}`,
    areaServed: region,
    address: {
      '@type': 'PostalAddress',
      addressLocality: city,
      addressCountry: 'NZ',
    },
    serviceArea: {
      '@type': 'AdministrativeArea',
      name: region,
    },
    description: `${site.primaryService} services in ${city}. ${brand.name} provides traffic control, TMP design, event traffic management and consultancy.`,
    provider: {
      '@type': 'Organization',
      name: brand.name,
      url: brand.domain,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <RevealObserver />

      {/* ── HERO ── */}
      <section
        style={{
          position: 'relative',
          background: 'var(--color-bg-deep)',
          paddingTop: '180px',
          paddingBottom: '80px',
          overflow: 'hidden',
        }}
        aria-label={`Traffic management ${city}`}
      >
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '800px',
            height: '800px',
            background: 'radial-gradient(circle, rgba(252,212,21,0.07) 0%, transparent 65%)',
            pointerEvents: 'none',
          }}
          aria-hidden="true"
        />
        <div style={{ position: 'relative', zIndex: 10, maxWidth: '1280px', margin: '0 auto', padding: '0 clamp(24px,5vw,48px)' }}>
          <div className="reveal" style={{ marginBottom: '20px' }}>
            <span className="eyebrow">{city}</span>
          </div>
          <h1
            className="reveal d1 font-display"
            style={{
              fontWeight: 700,
              fontSize: 'clamp(2.4rem,5vw,4.5rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              color: '#fff',
              maxWidth: '760px',
            }}
          >
            Traffic Management<br />
            <span style={{ color: 'var(--brand-primary)' }}>{city}</span>
          </h1>
          <div className="orange-rule reveal d2" style={{ marginTop: '24px' }} />
          <p
            className="reveal d2"
            style={{
              fontSize: '1rem',
              lineHeight: 1.78,
              color: 'var(--text-muted)',
              maxWidth: '620px',
              marginTop: '24px',
            }}
          >
            {brand.name} provides professional {site.primaryService.toLowerCase()} services across {city} and the wider {region} region. From roadworks and infrastructure projects to events and temporary traffic control, our experienced team keeps worksites safe and compliant.
          </p>
          <div className="reveal d3" style={{ marginTop: '36px' }}>
            <Link href="/request-staff" className="btn-orange" style={{ padding: '14px 28px', fontSize: '0.9rem' }}>
              Request an Estimate
              <ArrowRight size={17} strokeWidth={1.5} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section style={{ background: 'var(--bg-dark)', padding: 'clamp(60px,8vw,100px) 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 clamp(24px,5vw,48px)' }}>
          <div style={{ marginBottom: '48px' }}>
            <div className="reveal" style={{ marginBottom: '10px' }}>
              <span className="eyebrow">What We Offer</span>
            </div>
            <h2
              className="section-title reveal d1"
              style={{ fontSize: 'clamp(1.8rem,3.5vw,2.8rem)' }}
            >
              Our {city} Services
            </h2>
            <div className="orange-rule reveal d2" style={{ marginTop: '16px' }} />
          </div>

          <div
            className="reveal d2"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '16px',
            }}
          >
            {services.map((service) => (
              <div
                key={service}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  background: 'var(--bg-mid)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '4px',
                  padding: '18px 20px',
                }}
              >
                <div
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: 'rgba(252,212,21,0.12)',
                    border: '1px solid rgba(252,212,21,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                  aria-hidden="true"
                >
                  <Check size={13} strokeWidth={2.5} color="var(--brand-primary)" />
                </div>
                <span style={{ fontSize: '0.9375rem', color: 'var(--text-light)', lineHeight: 1.4 }}>
                  {service}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LOCAL COVERAGE ── */}
      <section style={{ background: 'var(--bg-mid)', padding: 'clamp(60px,8vw,100px) 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 clamp(24px,5vw,48px)' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '60px',
              alignItems: 'start',
            }}
          >
            <div>
              <div className="reveal" style={{ marginBottom: '10px' }}>
                <span className="eyebrow">Coverage Area</span>
              </div>
              <h2
                className="section-title reveal d1"
                style={{ fontSize: 'clamp(1.8rem,3.5vw,2.8rem)' }}
              >
                Local Coverage
              </h2>
              <div className="orange-rule reveal d2" style={{ marginTop: '16px' }} />
              <p
                className="reveal d2"
                style={{
                  fontSize: '1rem',
                  lineHeight: 1.78,
                  color: 'var(--text-muted)',
                  marginTop: '20px',
                  maxWidth: '480px',
                }}
              >
                Our {city} team services the full {region} region, including urban areas, state highways, and rural sites across the district.
              </p>
            </div>

            <div className="reveal d2" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {coverage.map((location) => (
                <div
                  key={location}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '14px 18px',
                    background: 'var(--bg-dark)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: '4px',
                  }}
                >
                  <MapPin size={15} strokeWidth={1.5} color="var(--brand-primary)" aria-hidden="true" />
                  <span style={{ fontSize: '0.9375rem', color: 'var(--text-light)' }}>{location}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE ── */}
      <section style={{ background: 'var(--bg-dark)', padding: 'clamp(60px,8vw,100px) 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 clamp(24px,5vw,48px)' }}>
          <div style={{ marginBottom: '48px' }}>
            <div className="reveal" style={{ marginBottom: '10px' }}>
              <span className="eyebrow">Our Difference</span>
            </div>
            <h2
              className="section-title reveal d1"
              style={{ fontSize: 'clamp(1.8rem,3.5vw,2.8rem)' }}
            >
              Why Choose {brand.name}
            </h2>
            <div className="orange-rule reveal d2" style={{ marginTop: '16px' }} />
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: '20px',
            }}
          >
            {reasons.map((reason, i) => (
              <div
                key={reason}
                className={`reveal d${i + 1}`}
                style={{
                  background: 'var(--bg-elevated)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderLeft: '3px solid var(--brand-primary)',
                  borderRadius: '4px',
                  padding: '24px',
                }}
              >
                <p style={{ fontSize: '0.9375rem', color: 'var(--text-light)', lineHeight: 1.6 }}>
                  {reason}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section" aria-label="Request a quote">
        <div
          style={{
            position: 'relative',
            zIndex: 10,
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '80px clamp(24px,5vw,48px)',
            textAlign: 'center',
          }}
        >
          <div className="reveal">
            <h2
              className="font-display"
              style={{
                fontWeight: 700,
                fontSize: 'clamp(2rem,4.5vw,3.5rem)',
                color: '#fff',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
              }}
            >
              Need Traffic Management in {city}?
            </h2>
            <p
              style={{
                fontSize: '1rem',
                color: 'rgba(255,255,255,0.88)',
                maxWidth: '480px',
                margin: '20px auto 0',
                lineHeight: 1.72,
              }}
            >
              Contact our {city} team for a free consultation and estimate. We&apos;ll have a plan ready before your project begins.
            </p>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '14px',
                marginTop: '36px',
              }}
            >
              <Link href="/request-staff" className="btn-white">
                Request an Estimate
                <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" />
              </Link>
              <a href="/contact#coordinators" className="btn-outline-white">
                <Phone size={16} strokeWidth={1.5} aria-hidden="true" />
                Call your co-ordinator
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
