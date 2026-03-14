import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import RevealObserver from '../components/RevealObserver'
import { brand } from '../../config/brand'

export const metadata: Metadata = {
  title: `Hire Staff | ${brand.name}`,
  description: `Find certified traffic management workers and reliable labour for civil construction. ${brand.name} connects you with job-ready workers across Canterbury, Marlborough and Wellington.`,
  alternates: {
    canonical: '/hire-staff',
  },
}

const workers = [
  { title: 'Traffic Controllers', body: 'Experienced workers supporting traffic management crews across roadworks and infrastructure projects.' },
  { title: 'TMO Support', body: 'Additional crew available to assist STMS teams and support larger worksites.' },
  { title: 'Extra Crew', body: 'Reliable workers when projects ramp up or additional manpower is required.' },
  { title: 'General Site Labour', body: 'General labour support for civil and infrastructure work when needed.' },
]

const reasons = [
  { title: 'Workers Ready to Go', body: 'Our pool of certified TTM Workers and experienced labourers is active and available. We can have the right people on your site quickly.' },
  { title: 'Screened and Experienced', body: 'Every worker we place is screened, reference checked, and matched to the role. You get people who show up prepared.' },
  { title: 'Flexible Crew Sizes', body: 'One worker or a full crew, one day or ongoing, we scale to fit your project without locking you in.' },
]

const steps = [
  { n: '01', title: 'Tell Us What You Need', body: 'Describe your project and how many workers you require.' },
  { n: '02', title: 'We Match the Right Workers', body: 'We select workers with the right skills and availability.' },
  { n: '03', title: 'Workers Ready to Start', body: 'Staff arrive briefed and ready to work.' },
]

export default function HireStaffPage() {
  return (
    <>
      <RevealObserver />

      {/* ── HERO ── */}
      <section
        aria-label="Hire staff hero"
        style={{
          position: 'relative',
          background: 'linear-gradient(to bottom, #37373b, #000)',
          overflow: 'hidden',
        }}
      >
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: 'clamp(140px,14vw,180px) 40px clamp(80px,10vw,120px)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
          gap: '64px',
          alignItems: 'center',
        }}>

          {/* LEFT */}
          <div style={{ maxWidth: '560px' }}>
            <div className="reveal" style={{ marginBottom: '20px' }}>
              <span className="eyebrow">For Employers</span>
            </div>

            <h1 className="reveal d1 font-display" style={{
              fontWeight: 700,
              fontSize: 'clamp(2rem,4vw,3.2rem)',
              lineHeight: 1.07,
              letterSpacing: '-0.03em',
              color: '#fff',
            }}>
              Traffic Management Workers
              <span style={{ color: 'var(--brand-primary)', display: 'block', marginTop: '6px' }}>
                When You Need Them
              </span>
            </h1>

            <p className="reveal d2" style={{
              fontSize: '1.0625rem',
              lineHeight: 1.78,
              color: 'var(--text-muted)',
              maxWidth: '520px',
              marginTop: '24px',
            }}>
              The Temp Company supplies reliable traffic management workers across Christchurch, Wellington and Blenheim. Short notice cover, project support, or additional crew when demand increases.
            </p>

            <div className="reveal d3" style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', marginTop: '36px' }}>
              <a href="#request-staff" className="btn-orange" style={{ padding: '14px 28px', fontSize: '0.9rem' }}>
                Request Staff
              </a>
              <a href="tel:0800000000" className="btn-ghost" style={{ padding: '14px 28px', fontSize: '0.9rem' }}>
                Call Us
              </a>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="reveal d2" style={{
            position: 'relative',
            height: '520px',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 32px 64px rgba(0,0,0,0.5), 0 8px 24px rgba(0,0,0,0.4)',
          }}>
            <Image
              src="/images/temp-company_workers.webp"
              alt="Temp Company traffic management workers on site"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div aria-hidden="true" style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(135deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 60%, rgba(0,0,0,0.45) 100%)',
            }} />
            <div aria-hidden="true" style={{
              position: 'absolute', inset: 0,
              background: 'repeating-linear-gradient(-45deg, transparent, transparent 24px, rgba(252,212,21,0.06) 24px, rgba(252,212,21,0.06) 26px)',
            }} />
          </div>

        </div>
      </section>

      {/* ── WORKERS AVAILABLE ── */}
      <section style={{ background: 'var(--color-bg-deep)', padding: '80px 0' }}>
        <div style={{ maxWidth: '1152px', margin: '0 auto', padding: '0 40px' }}>
          <div style={{
            background: 'rgba(255,255,255,0.05)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '16px',
            boxShadow: '0 32px 64px rgba(0,0,0,0.4)',
            padding: '40px',
          }}>
            <h2 className="font-display" style={{ fontWeight: 700, fontSize: '1.375rem', color: '#fff', marginBottom: '32px' }}>
              Workers Available
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
              gap: '20px',
            }}>
              {workers.map(({ title, body }) => (
                <div key={title} style={{
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '10px',
                  padding: '24px',
                  transition: 'background 0.2s ease',
                }}>
                  <h3 className="font-display" style={{ fontWeight: 600, fontSize: '0.9375rem', color: '#fff', marginBottom: '10px' }}>{title}</h3>
                  <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.72 }}>{body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY CONTRACTORS USE US ── */}
      <section style={{ background: 'var(--bg-dark)', padding: '96px 0' }}>
        <div style={{
          maxWidth: '1152px',
          margin: '0 auto',
          padding: '0 40px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))',
          gap: '64px',
          alignItems: 'start',
        }}>

          {/* LEFT — large heading */}
          <div className="reveal">
            <h2 className="font-display" style={{
              fontWeight: 700,
              fontSize: 'clamp(1.8rem,3.5vw,2.8rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              color: '#fff',
            }}>
              Reliable Workers.<br />
              <span style={{ color: 'var(--brand-primary)' }}>Fast Placement.</span>
            </h2>
          </div>

          {/* RIGHT — plain text blocks */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {reasons.map(({ title, body }, i) => (
              <div key={title} className={`reveal d${i + 1}`} style={{
                borderLeft: '2px solid rgba(252,212,21,0.3)',
                paddingLeft: '20px',
              }}>
                <h4 className="font-display" style={{ fontWeight: 600, fontSize: '1rem', color: '#fff' }}>{title}</h4>
                <p style={{ fontSize: '0.9375rem', color: 'var(--text-muted)', lineHeight: 1.65, marginTop: '6px' }}>{body}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ background: 'var(--color-bg-deep)', padding: '96px 0' }}>
        <div style={{
          maxWidth: '1152px',
          margin: '0 auto',
          padding: '0 40px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
          gap: '24px',
        }}>
          {steps.map(({ n, title, body }, i) => (
            <div key={n} className={`reveal d${i + 1}`} style={{
              position: 'relative',
              padding: '32px 28px',
              background: 'rgba(255,255,255,0.03)',
              borderRadius: '12px',
              border: '1px solid rgba(255,255,255,0.06)',
              overflow: 'hidden',
            }}>
              {/* Ghost numeral */}
              <span className="font-display" aria-hidden="true" style={{
                position: 'absolute',
                top: '-10px',
                right: '16px',
                fontSize: '7rem',
                fontWeight: 800,
                lineHeight: 1,
                color: 'rgba(255,255,255,0.06)',
                letterSpacing: '-0.04em',
                userSelect: 'none',
              }}>{n}</span>

              {/* Foreground content */}
              <div style={{ position: 'relative', zIndex: 1 }}>
                <p className="font-display" style={{
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--brand-primary)',
                  marginBottom: '12px',
                }}>Step {n}</p>
                <h3 className="font-display" style={{ fontWeight: 600, fontSize: '1.05rem', color: '#fff', lineHeight: 1.3 }}>{title}</h3>
                <p style={{ fontSize: '0.9375rem', color: 'var(--text-muted)', lineHeight: 1.7, marginTop: '10px' }}>{body}</p>
              </div>
            </div>
          ))}
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

      {/* ── SEO TEXT ── */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '40px 24px', maxWidth: '1280px', margin: '0 auto' }}>
        <p style={{ fontSize: '0.8125rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.25)', maxWidth: '860px' }}>
          The Temp Company supplies temporary traffic management workers and general site labour across Christchurch, Wellington and Blenheim. Our crews support civil contractors, roadworks teams and infrastructure projects that require reliable short-term staffing.
        </p>
      </div>
    </>
  )
}
