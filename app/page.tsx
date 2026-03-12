import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Phone, Check } from 'lucide-react'
import RevealObserver from './components/RevealObserver'
import WorksiteBanner from './components/WorksiteBanner'
import FaqSection from './components/home/FaqSection'
import { brand } from '../config/brand'
import { site } from '../config/site'
import { services } from '../data/services'
import { stats } from '../data/stats'

export const metadata: Metadata = {
  title: `${brand.name} | ${site.serviceArea}`,
  description: `Professional ${site.primaryService.toLowerCase()} services across ${site.serviceArea}. Trusted, reliable, and safety focused.`,
  alternates: {
    canonical: '/',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: brand.name,
  url: brand.domain,
  description: `Professional ${site.primaryService.toLowerCase()} services across ${site.serviceArea}.`,
  serviceType: site.primaryService,
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
      <section id="hero" aria-label="Hero">
        <div className="hero-bg" aria-hidden="true" />
        <div className="hero-panel" aria-hidden="true" />

        <div className="hero-content-wrap" style={{ position: 'relative', zIndex: 10, maxWidth: '1280px', margin: '0 auto', padding: 'clamp(120px,15vw,200px) 24px clamp(80px,12vw,160px)', width: '100%' }}>
          <div style={{ maxWidth: '660px' }}>

            <div className="reveal" style={{ marginBottom: '20px' }}>
              <span className="eyebrow">Traffic Management Specialists</span>
            </div>

            <h1 className="reveal d1 font-display"
                style={{ fontWeight: 700, fontSize: 'clamp(2.6rem,6vw,5rem)', lineHeight: 1.12, letterSpacing: '-0.03em' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span className="hidden md:block" style={{ width: '2px', height: '0.75em', background: 'var(--brand-primary)', flexShrink: 0 }} aria-hidden="true" />
                <span>Traffic</span>
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span className="hidden md:block" style={{ width: '2px', height: '0.75em', background: 'var(--brand-primary)', flexShrink: 0 }} aria-hidden="true" />
                <span>Management</span>
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span className="hidden md:block" style={{ width: '2px', height: '0.75em', background: '#fff', flexShrink: 0 }} aria-hidden="true" />
                <span style={{ color: 'var(--brand-primary)' }}>You Can Rely On</span>
              </span>
            </h1>

            <p className="reveal d2 font-display"
               style={{ fontWeight: 600, fontSize: 'clamp(1.1rem,2vw,1.4rem)', letterSpacing: '-0.01em', color: 'var(--text-light)', marginTop: '20px' }}>
              Keeping roads moving safely
            </p>

            <p className="reveal d3"
               style={{ fontSize: '1rem', lineHeight: 1.78, color: 'var(--text-muted)', maxWidth: '460px', marginTop: '20px' }}>
              Professional traffic management for roadworks, construction sites, events, and infrastructure projects.
              Trusted, reliable, and safety focused.
            </p>

            <div className="reveal d4" style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', marginTop: '36px' }}>
              <Link href="/estimate" className="btn-orange" style={{ padding: '14px 28px', fontSize: '0.9rem' }}>
                Get an Estimate
                <ArrowRight size={17} strokeWidth={1.5} aria-hidden="true" />
              </Link>
              {/* View Services button hidden */}
            </div>

          </div>
        </div>

      </section>



      {/* ── SERVICES ── */}
      <section id="services" style={{ background: 'var(--off-white)', padding: '100px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>

          <div style={{ marginBottom: '60px' }}>
            <div className="reveal" style={{ marginBottom: '10px' }}>
              <span className="eyebrow">What We Do</span>
            </div>
            <h2 className="section-title reveal d1" style={{ fontSize: 'clamp(1.8rem,3.5vw,3rem)', color: 'var(--bg-dark)' }}>
              Comprehensive Traffic<br />Management Services
            </h2>
            <div className="orange-rule reveal d2" style={{ marginTop: '16px' }} />
            <p className="reveal d2" style={{ marginTop: '20px', fontSize: '1rem', lineHeight: 1.7, color: 'var(--text-muted)', maxWidth: '680px' }}>
              {brand.name} provides professional {site.primaryService.toLowerCase()} services across {site.serviceArea}.
            </p>
          </div>

          <div className="services-grid">
            {services.map(({ id, title, body, image, bgSize, bgPosition, logo, linkHref, linkLabel, linkExternal }, i) => (
              <div key={id} id={id} className={`service-card reveal d${i + 1}`} style={{ backgroundImage: `url(${image})`, ...(bgSize && { backgroundSize: bgSize }), ...(bgPosition && { backgroundPosition: bgPosition }) }}>
                {logo && (
                  <img
                    src={logo}
                    alt=""
                    aria-hidden="true"
                    style={{ position: 'absolute', top: '28px', right: '14px', height: '36px', width: 'auto', opacity: 0.85, zIndex: 2, pointerEvents: 'none' }}
                  />
                )}
                <div className="service-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--brand-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14,2 14,8 20,8"/>
                  </svg>
                </div>
                <h3 className="font-display" style={{ fontWeight: 600, fontSize: '1.1rem', color: '#fff' }}>{title}</h3>
                <p style={{ fontSize: '1rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.62)', marginTop: '10px' }}>{body}</p>
                {linkExternal ? (
                  <a href={linkHref} target="_blank" rel="noopener noreferrer" className="service-link" style={{ marginTop: '16px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    {linkLabel}{' '}
                    <ArrowRight size={13} strokeWidth={1.5} aria-hidden="true" />
                  </a>
                ) : (
                  <Link href={linkHref} className="service-link" style={{ marginTop: '16px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    {linkLabel}{' '}
                    <ArrowRight size={13} strokeWidth={1.5} aria-hidden="true" />
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section id="why-us" className="w-full max-w-full overflow-x-hidden" style={{ background: 'var(--bg-dark)', padding: '100px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div className="two-col-grid">

            {/* Left: copy */}
            <div>
              <div className="reveal">
                <span className="eyebrow">Why Choose Us</span>
                <h2 className="section-title" style={{ fontSize: 'clamp(1.8rem,3.5vw,3rem)', color: '#fff', marginTop: '8px' }}>
                  Authority. Safety.<br />
                  <span style={{ color: 'var(--brand-primary)' }}>Excellence.</span>
                </h2>
                <div className="orange-rule" style={{ marginTop: '16px' }} />
                <p style={{ fontSize: '1rem', lineHeight: 1.78, color: 'var(--text-muted)', marginTop: '20px', maxWidth: '440px', width: '100%' }}>
                  {brand.name} delivers safe, reliable {site.primaryService.toLowerCase()} across {site.serviceArea}.
                  Every job is executed with care.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginTop: '36px' }}>
                {[
                  { d: 'd1', title: 'Crews You Can Rely On', body: 'When we commit to a job, our crews are there. Contractors rely on us to turn up prepared, ready to work, and keep the site moving.' },
                  { d: 'd2', title: 'Experienced Traffic Professionals', body: 'Experienced STMS and crews delivering safe, efficient traffic management from highways to local road works.' },
                  { d: 'd3', title: 'Professional On Every Site', body: 'Clear communication, proper paperwork, and well-run setups. Our crews work closely with site managers to keep projects running smoothly.' },
                ].map(({ d, title, body }) => (
                  <div key={title} className={`reveal ${d}`} style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                    <div className="feature-icon">
                      <Check size={16} strokeWidth={2} aria-hidden="true" />
                    </div>
                    <div>
                      <h4 className="font-display" style={{ fontWeight: 600, fontSize: '1rem', color: '#fff' }}>{title}</h4>
                      <p style={{ fontSize: '0.9375rem', color: 'var(--text-muted)', lineHeight: 1.65, marginTop: '5px' }}>{body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: stat boxes */}
            <div className="reveal grid grid-cols-2 gap-3" style={{ position: 'relative' }}>
              {stats.map(({ value, label, variant }) => (
                <div
                  key={label}
                  className="stat-box"
                  style={
                    variant === 'orange'
                      ? { background: 'var(--brand-primary)' }
                      : variant === 'dark'
                      ? { background: 'var(--bg-elevated)', border: '1px solid rgba(255,255,255,0.06)' }
                      : { background: 'var(--bg-mid)', border: '1px solid rgba(255,255,255,0.06)' }
                  }
                >
                  <div className="font-display" style={{ fontWeight: 700, fontSize: '2.25rem', color: variant === 'orange' ? '#fff' : 'var(--brand-primary)', lineHeight: 1 }}>{value}</div>
                  <div style={{ fontSize: '0.62rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: variant === 'orange' ? 'rgba(255,255,255,0.75)' : 'var(--text-muted)', marginTop: '8px' }}>{label}</div>
                </div>
              ))}
              <div style={{ position: 'absolute', top: 0, right: '-10px', bottom: 0, width: '3px', background: 'var(--brand-primary)', borderRadius: '2px' }} />
            </div>

          </div>
        </div>
      </section>

      {/* ── FULL-WIDTH IMAGE BANNER ── */}
      <WorksiteBanner />

      {/* ── HOW IT WORKS ── */}
      <section id="process" style={{ background: '#0A1623', padding: '100px 0', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>

          <div className="reveal" style={{ marginBottom: '64px' }}>
            <span className="eyebrow">Our Process</span>
            <h2 className="section-title" style={{ fontSize: 'clamp(1.8rem,3.5vw,3rem)', color: '#fff', marginTop: '8px' }}>
              Simple. Efficient.<br />
              <span style={{ color: 'var(--brand-primary)' }}>Reliable.</span>
            </h2>
            <div className="orange-rule" style={{ marginTop: '16px' }} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 relative">
            <div className="hidden lg:block absolute" style={{ top: '27px', left: '12.5%', right: '12.5%', height: '2px', background: 'var(--brand-primary)', pointerEvents: 'none', zIndex: 0 }} />

            {[
              { n: '01', title: 'Initial Consult', body: 'We discuss your project, timeline, and site-specific needs to understand the full scope.', solid: false },
              { n: '02', title: 'Plan & Design *', body: 'Our designers develop a detailed, compliant traffic management plan tailored to your project.', note: '* Not required if you already have an approved plan in place.', solid: false },
              { n: '03', title: 'Deploy & Execute', body: 'Accredited teams arrive on-site with equipment and signage ready to go from day one.', solid: false },
              { n: '04', title: 'Ongoing Site Management', body: 'Ongoing site monitoring ensures traffic management remains safe and effective as work progresses.', solid: false },
            ].map(({ n, title, body, note, solid }, i) => (
              <div key={n} className={`reveal d${i+1}`} style={{ position: 'relative', zIndex: 1 }}>
                <div className="process-step-inner">
                  <div className={`${solid ? 'step-circle-solid' : 'step-circle-outline'} shrink-0`} style={{ margin: '0 auto' }}>
                    <span className="step-num">{n}</span>
                  </div>
                  <div>
                    <h3 className="font-display process-step-title" style={{ fontWeight: 600, fontSize: '1rem', color: '#fff', lineHeight: 1.3 }}>{title}</h3>
                    <p style={{ fontSize: '0.9375rem', color: 'var(--text-muted)', lineHeight: 1.7, marginTop: '8px' }}>{body}</p>
                    {note && <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.6, marginTop: '10px', opacity: 0.7 }}>{note}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section" aria-label="Call to action">
        <div style={{ position: 'relative', zIndex: 10, maxWidth: '1280px', margin: '0 auto', padding: '80px 24px', textAlign: 'center' }}>
          <div className="reveal">
            <h2 className="font-display" style={{ fontWeight: 700, fontSize: 'clamp(2rem,4.5vw,4rem)', color: '#fff', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
              Ready to Get Started?
            </h2>
            <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.88)', maxWidth: '480px', margin: '20px auto 0', lineHeight: 1.72 }}>
              Contact our team today for a free consultation and estimate. We&apos;ll have a plan ready before your project begins.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '14px', marginTop: '36px' }}>
              <Link href="/estimate" className="btn-white">
                Get an Estimate
                <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" />
              </Link>
              <a href={`tel:${brand.phoneTel}`} className="btn-outline-white">
                <Phone size={16} strokeWidth={1.5} aria-hidden="true" />
                {brand.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      <FaqSection />

    </>
  )
}
