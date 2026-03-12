import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import RevealObserver from '../components/RevealObserver'
import { brand } from '../../config/brand'

export const metadata: Metadata = {
  title: `Find Work | ${brand.name}`,
  description: `Looking for temporary or contract work? ${brand.name} connects job seekers with roles in traffic management, civil construction, events, and general labour across New Zealand.`,
  alternates: {
    canonical: '/find-work',
  },
}

const roles = [
  {
    title: 'Traffic Management',
    body: 'TTM operator roles through to qualified STMS positions. Entry-level candidates welcome.',
  },
  {
    title: 'Civil Construction',
    body: 'Labourer and operator roles on civil, roading, and infrastructure projects.',
  },
  {
    title: 'Events',
    body: 'Casual and short-term event support roles across the regions we operate in.',
  },
  {
    title: 'General Labour',
    body: 'Day-labour and project-based work available for people who want flexible hours.',
  },
]

const steps = [
  { n: '01', title: 'Submit Your Application', body: 'Tell us about your experience, qualifications, and the type of work you are looking for.' },
  { n: '02', title: 'We Review Your Details', body: 'Our team reviews your application and reaches out to discuss your availability and preferences.' },
  { n: '03', title: 'We Place You in Work', body: 'When the right role comes up, we get in touch. We work to keep you placed consistently.' },
]

export default function FindWorkPage() {
  return (
    <>
      <RevealObserver />

      {/* ── HERO ── */}
      <section
        style={{ position: 'relative', background: '#252528', paddingTop: '180px', paddingBottom: '80px', overflow: 'hidden' }}
        aria-label="Find work hero"
      >
        <div style={{ position: 'absolute', top: '-100px', left: '50%', transform: 'translateX(-50%)', width: '700px', height: '700px', background: 'radial-gradient(circle, rgba(252,212,21,0.07) 0%, transparent 65%)', pointerEvents: 'none' }} aria-hidden="true" />

        <div style={{ position: 'relative', zIndex: 10, maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ maxWidth: '680px' }}>
            <div className="reveal" style={{ marginBottom: '20px' }}>
              <span className="eyebrow">For Job Seekers</span>
            </div>
            <h1 className="reveal d1 font-display" style={{ fontWeight: 700, fontSize: 'clamp(2.4rem,5vw,4.5rem)', lineHeight: 1.05, letterSpacing: '-0.03em', color: '#fff' }}>
              Find Your Next Role<br />
              <span style={{ color: 'var(--brand-primary)' }}>With Us</span>
            </h1>
            <p className="reveal d2" style={{ fontSize: '1rem', lineHeight: 1.78, color: 'var(--text-muted)', maxWidth: '500px', marginTop: '24px' }}>
              We work with job seekers across traffic management, civil construction, events, and general labour. Whether you are experienced or just starting out, we want to hear from you.
            </p>
            <div className="reveal d3" style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', marginTop: '36px' }}>
              <Link href="/find-work/apply" className="btn-orange" style={{ padding: '14px 28px', fontSize: '0.9rem' }}>
                Apply Now
                <ArrowRight size={17} strokeWidth={1.5} aria-hidden="true" />
              </Link>
              <Link href="/contact" className="btn-ghost" style={{ padding: '14px 28px', fontSize: '0.9rem' }}>
                Talk to Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── ROLES ── */}
      <section style={{ background: 'var(--off-white)', padding: '100px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ marginBottom: '60px' }}>
            <div className="reveal" style={{ marginBottom: '10px' }}>
              <span className="eyebrow">Types of Work</span>
            </div>
            <h2 className="section-title reveal d1" style={{ fontSize: 'clamp(1.8rem,3.5vw,3rem)', color: 'var(--bg-dark)' }}>
              Roles Across<br />Multiple Industries
            </h2>
            <div className="orange-rule reveal d2" style={{ marginTop: '16px' }} />
          </div>

          <div className="services-grid">
            {roles.map(({ title, body }, i) => (
              <div key={title} className={`service-card reveal d${i + 1}`}>
                <div className="service-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--brand-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
                  </svg>
                </div>
                <h3 className="font-display" style={{ fontWeight: 600, fontSize: '1.1rem', color: '#fff' }}>{title}</h3>
                <p style={{ fontSize: '1rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.62)', marginTop: '10px' }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY WORK WITH US ── */}
      <section style={{ background: 'var(--bg-dark)', padding: '100px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <div className="reveal" style={{ marginBottom: '10px' }}>
              <span className="eyebrow">Why Work With Us</span>
            </div>
            <h2 className="section-title reveal d1" style={{ fontSize: 'clamp(1.8rem,3.5vw,3rem)', color: '#fff', marginTop: '8px' }}>
              We Look After<br />
              <span style={{ color: 'var(--brand-primary)' }}>Our People.</span>
            </h2>
            <div className="orange-rule reveal d2" style={{ marginTop: '16px' }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginTop: '40px' }}>
              {[
                { d: 'd1', title: 'Work That Fits Your Life', body: 'Casual, contract, and ongoing roles available. We work around your availability and find placements that suit you.' },
                { d: 'd2', title: 'We Support Your Development', body: 'We promote from within our worker pool and help people build their skills and qualifications over time.' },
                { d: 'd3', title: 'We Stay in Your Corner', body: 'Once you are registered with us, we keep you in mind when new opportunities come in. We work to keep you placed.' },
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

      {/* ── HOW TO APPLY ── */}
      <section id="process" style={{ background: '#252528', padding: '100px 0', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div className="reveal" style={{ marginBottom: '64px' }}>
            <span className="eyebrow">How It Works</span>
            <h2 className="section-title" style={{ fontSize: 'clamp(1.8rem,3.5vw,3rem)', color: '#fff', marginTop: '8px' }}>
              Getting Started<br />
              <span style={{ color: 'var(--brand-primary)' }}>Is Simple.</span>
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
              Ready to Apply?
            </h2>
            <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.88)', maxWidth: '480px', margin: '20px auto 0', lineHeight: 1.72 }}>
              Submit your details and our team will be in touch within a few business days.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '14px', marginTop: '36px' }}>
              <Link href="/find-work/apply" className="btn-white">
                Apply Now
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
