import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import RevealObserver from '../components/RevealObserver'
import { brand } from '../../config/brand'

export const metadata: Metadata = {
  title: `Hire Staff | ${brand.name}`,
  description: `Find reliable temporary and contract staff for traffic management, civil construction, events, and general labour. ${brand.name} connects you with the right workers fast.`,
  alternates: {
    canonical: '/hire-staff',
  },
}

const industries = [
  {
    title: 'Traffic Management',
    body: 'Qualified TTM operators, STMS, and lead STMS for roadworks and infrastructure projects.',
  },
  {
    title: 'Civil Construction',
    body: 'Reliable labour for civil, roading, and infrastructure projects of any scale.',
  },
  {
    title: 'Events',
    body: 'Trained staff to keep events running safely, from traffic control to crowd management.',
  },
  {
    title: 'General Labour',
    body: 'Flexible workers available at short notice for project-based and day-to-day requirements.',
  },
]

const steps = [
  { n: '01', title: 'Tell Us What You Need', body: 'Describe your project, industry, and how many workers you require. We will confirm availability quickly.' },
  { n: '02', title: 'We Match the Right Workers', body: 'We draw from our vetted pool of workers and match you with people who have the right skills and experience.' },
  { n: '03', title: 'Workers Ready to Start', body: 'Staff are placed, briefed, and ready to go. We stay available to manage any changes or requirements.' },
]

export default function HireStaffPage() {
  return (
    <>
      <RevealObserver />

      {/* ── HERO ── */}
      <section
        style={{ position: 'relative', background: '#252528', paddingTop: '180px', paddingBottom: '80px', overflow: 'hidden' }}
        aria-label="Hire staff hero"
      >
        <div style={{ position: 'absolute', top: '-100px', left: '50%', transform: 'translateX(-50%)', width: '700px', height: '700px', background: 'radial-gradient(circle, rgba(252,212,21,0.07) 0%, transparent 65%)', pointerEvents: 'none' }} aria-hidden="true" />

        <div style={{ position: 'relative', zIndex: 10, maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ maxWidth: '680px' }}>
            <div className="reveal" style={{ marginBottom: '20px' }}>
              <span className="eyebrow">For Employers</span>
            </div>
            <h1 className="reveal d1 font-display" style={{ fontWeight: 700, fontSize: 'clamp(2.4rem,5vw,4.5rem)', lineHeight: 1.05, letterSpacing: '-0.03em', color: '#fff' }}>
              Reliable Staff,<br />
              <span style={{ color: 'var(--brand-primary)' }}>When You Need Them</span>
            </h1>
            <p className="reveal d2" style={{ fontSize: '1rem', lineHeight: 1.78, color: 'var(--text-muted)', maxWidth: '500px', marginTop: '24px' }}>
              We supply temporary and contract workers across traffic management, civil construction, events, and general labour. Tell us what you need and we will handle the rest.
            </p>
            <div className="reveal d3" style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', marginTop: '36px' }}>
              <Link href="/hire-staff/request-staff" className="btn-orange" style={{ padding: '14px 28px', fontSize: '0.9rem' }}>
                Request Staff
                <ArrowRight size={17} strokeWidth={1.5} aria-hidden="true" />
              </Link>
              <Link href="/contact" className="btn-ghost" style={{ padding: '14px 28px', fontSize: '0.9rem' }}>
                Talk to Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ── */}
      <section style={{ background: 'var(--off-white)', padding: '100px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ marginBottom: '60px' }}>
            <div className="reveal" style={{ marginBottom: '10px' }}>
              <span className="eyebrow">Industries We Cover</span>
            </div>
            <h2 className="section-title reveal d1" style={{ fontSize: 'clamp(1.8rem,3.5vw,3rem)', color: 'var(--bg-dark)' }}>
              The Right Workers<br />For Your Industry
            </h2>
            <div className="orange-rule reveal d2" style={{ marginTop: '16px' }} />
          </div>

          <div className="services-grid">
            {industries.map(({ title, body }, i) => (
              <div key={title} className={`service-card reveal d${i + 1}`}>
                <div className="service-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--brand-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                </div>
                <h3 className="font-display" style={{ fontWeight: 600, fontSize: '1.1rem', color: '#fff' }}>{title}</h3>
                <p style={{ fontSize: '1rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.62)', marginTop: '10px' }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section style={{ background: 'var(--bg-dark)', padding: '100px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <div className="reveal" style={{ marginBottom: '10px' }}>
              <span className="eyebrow">Why Employers Choose Us</span>
            </div>
            <h2 className="section-title reveal d1" style={{ fontSize: 'clamp(1.8rem,3.5vw,3rem)', color: '#fff', marginTop: '8px' }}>
              Vetted Workers.<br />
              <span style={{ color: 'var(--brand-primary)' }}>Fast Placement.</span>
            </h2>
            <div className="orange-rule reveal d2" style={{ marginTop: '16px' }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginTop: '40px' }}>
              {[
                { d: 'd1', title: 'Workers Ready to Go', body: 'Our pool of workers is active and available. We can have the right people on your site quickly without compromising on quality.' },
                { d: 'd2', title: 'Screened and Experienced', body: 'Every worker we place is screened, reference checked, and matched to the role. You get people who show up prepared.' },
                { d: 'd3', title: 'Flexible to Your Needs', body: 'One worker or a full crew, one day or ongoing, we scale to fit your project without locking you in.' },
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
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="process" style={{ background: '#252528', padding: '100px 0', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div className="reveal" style={{ marginBottom: '64px' }}>
            <span className="eyebrow">How It Works</span>
            <h2 className="section-title" style={{ fontSize: 'clamp(1.8rem,3.5vw,3rem)', color: '#fff', marginTop: '8px' }}>
              Simple. Fast.<br />
              <span style={{ color: 'var(--brand-primary)' }}>Reliable.</span>
            </h2>
            <div className="orange-rule" style={{ marginTop: '16px' }} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
            <div className="hidden md:block absolute" style={{ top: '27px', left: '16.5%', right: '16.5%', height: '2px', background: 'var(--brand-primary)', pointerEvents: 'none', zIndex: 0 }} />
            {steps.map(({ n, title, body }, i) => (
              <div key={n} className={`reveal d${i + 1}`} style={{ position: 'relative', zIndex: 1 }}>
                <div className="process-step-inner">
                  <div className="step-circle-outline shrink-0" style={{ margin: '0 auto' }}>
                    <span className="step-num">{n}</span>
                  </div>
                  <div>
                    <h3 className="font-display process-step-title" style={{ fontWeight: 600, fontSize: '1rem', color: '#fff', lineHeight: 1.3 }}>{title}</h3>
                    <p style={{ fontSize: '0.9375rem', color: 'var(--text-muted)', lineHeight: 1.7, marginTop: '8px' }}>{body}</p>
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
              Ready to Find Your Staff?
            </h2>
            <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.88)', maxWidth: '480px', margin: '20px auto 0', lineHeight: 1.72 }}>
              Fill out a quick request and our team will get back to you with suitable workers.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '14px', marginTop: '36px' }}>
              <Link href="/hire-staff/request-staff" className="btn-white">
                Request Staff
                <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" />
              </Link>
              <Link href="/contact" className="btn-outline-white">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
