'use client'

import { useState } from 'react'
import type { ReactNode } from 'react'
import Image from 'next/image'

const faqs: { q: string; a: ReactNode }[] = [
  {
    q: 'What types of roles can you supply?',
    a: 'We specialise in temporary traffic management, and all staff are at least TTM Workers, but can supply general labour too.',
  },
  {
    q: 'Do your workers have their own gear and transport?',
    a: 'Our workers come with their own PPE and transport.',
  },
  {
    q: 'Can you supply staff at short notice?',
    a: "Yes, we're built for fast turnaround. If you need crew urgently, give us a call and we'll do our best to fill it the same day.",
  },
  {
    q: 'What areas do you cover?',
    a: "We currently supply labour across Wellington, Marlborough and Canterbury (Christchurch), and we're growing. If you're outside that, flick us a message and we'll see what we can do.",
  },
  {
    q: 'Are your workers trained and compliant?',
    a: "Yes. Every worker is briefed and checked before heading to site. We handle inductions, qualifications, and only place people who meet your safety standards.",
  },
  {
    q: 'What are your rates?',
    a: 'We operate on clear hourly rates for each role, with an additional loading for night shifts. Get in touch and we\'ll send through our current rate card.',
  },
]

export default function HireStaffPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i)
  return (
    <main>
      <style>{`
        .hero-section { min-height: 80vh; }
        .hero-content { padding-bottom: clamp(50px, 7vw, 80px); }
        @media (max-width: 1279px) {
          .hero-section { min-height: auto; }
          .hero-content { padding-top: 180px; padding-bottom: 32px; }
        }
        .hero-btn-primary {
          background: #facc15;
          color: #111;
          border: none;
          border-radius: 999px;
          padding: 14px 32px;
          font-weight: 600;
          font-size: 0.9375rem;
          text-decoration: none;
          display: inline-block;
          transition: background 0.2s ease, transform 0.2s ease;
          cursor: pointer;
        }
        .hero-btn-primary:hover {
          background: #ffd84d;
          transform: translateY(-1px);
        }
        .hero-btn-secondary {
          background: transparent;
          color: #fff;
          border: 1px solid rgba(255,255,255,0.45);
          border-radius: 999px;
          padding: 14px 32px;
          font-weight: 600;
          font-size: 0.9375rem;
          text-decoration: none;
          display: inline-block;
          transition: background 0.2s ease, border-color 0.2s ease;
          cursor: pointer;
        }
        .hero-btn-secondary:hover {
          background: rgba(255,255,255,0.06);
          border-color: rgba(255,255,255,0.8);
        }
        .request-btn {
          display: block;
          width: 100%;
          background: var(--brand-primary);
          color: #000;
          border: none;
          border-radius: 999px;
          padding: 14px 26px;
          font-weight: 600;
          font-size: 0.9375rem;
          cursor: pointer;
          text-align: center;
          text-decoration: none;
          margin-top: 28px;
          transition: opacity 0.2s ease;
        }
        .request-btn:hover {
          opacity: 0.88;
        }
        .faq-row {
          border-bottom: 1px solid rgba(255,255,255,0.08);
          padding: 22px 0;
          border-radius: 6px;
          transition: background 0.2s ease;
        }
        .faq-row:hover {
          background: rgba(255,255,255,0.03);
        }
        .faq-btn {
          width: 100%;
          background: none;
          border: none;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          padding: 0;
          text-align: left;
        }
        .faq-btn .faq-question {
          color: #fff;
          transition: color 0.2s ease;
        }
        .faq-btn:hover .faq-question {
          color: rgba(255,255,255,0.95);
        }
        .faq-btn .faq-icon {
          color: rgba(255,255,255,0.5);
          transition: color 0.2s ease, transform 0.2s ease;
        }
        .faq-btn:hover .faq-icon {
          color: var(--brand-primary);
        }
        .faq-icon.open {
          transform: rotate(45deg);
          color: var(--brand-primary);
        }
      `}</style>

      {/* ── HERO ── */}
      <section className="hero-section" style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #a9871f 0%, #9a7c1d 28%, #6b5a20 55%, #2f2f2f 82%, #1a1a1a 100%)',
      }}>

        {/* Grid overlay */}
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: `
            repeating-linear-gradient(0deg, rgba(255,255,255,0.045) 0px, rgba(255,255,255,0.045) 1px, transparent 1px, transparent 60px),
            repeating-linear-gradient(90deg, rgba(255,255,255,0.045) 0px, rgba(255,255,255,0.045) 1px, transparent 1px, transparent 60px)
          `,
        }} />

        {/* Content */}
        <div className="hero-content max-w-4xl mx-auto" style={{
          position: 'relative', zIndex: 10,
          paddingLeft: '24px', paddingRight: '24px',
          paddingTop: 'clamp(170px, 15vw, 210px)',
          textAlign: 'center',
        }}>

          <h1 className="font-display" style={{
            fontWeight: 700,
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            lineHeight: 1.15,
            textAlign: 'center',
            letterSpacing: '-0.03em',
            color: '#fff',
          }}>
            Traffic Management Workers On Demand
          </h1>

          <p style={{
            fontSize: '1.0625rem',
            lineHeight: 1.75,
            color: 'rgba(255,255,255,0.8)',
            maxWidth: '650px',
            margin: '24px auto 0',
          }}>
            The Temp Company supplies reliable traffic management workers across Christchurch, Wellington and Blenheim.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '14px', marginTop: '40px' }}>
            <a href="#request-staff" className="hero-btn-primary">Request Staff</a>
            <a href="/about-us#operations-team" className="hero-btn-secondary">Call Us Now</a>
          </div>

        </div>
      </section>

      {/* ── INTRO SECTION ── */}
      <section style={{
        background: 'linear-gradient(to bottom, transparent 80px, #1a1a1a 80px)',
        marginTop: '-80px',
        paddingTop: '0',
        paddingLeft: '24px',
        paddingRight: '24px',
        paddingBottom: 'clamp(60px, 8vw, 100px)',
        position: 'relative',
        zIndex: 1,
      }}>
        <div style={{ maxWidth: '1152px', margin: '0 auto' }}>

          {/* Feature panel */}
          <div style={{ maxWidth: '960px', margin: '0 auto 56px', position: 'relative', zIndex: 10 }}>
            <div className="rounded-2xl backdrop-blur-md border border-white/10 bg-white/10" style={{ padding: 'clamp(36px, 5vw, 56px)' }}>
              <p className="font-display" style={{
                fontSize: '0.7rem',
                fontWeight: 700,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--brand-primary)',
                marginBottom: '20px',
              }}>
                For Employers
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <p style={{ fontSize: '0.9375rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.62)' }}>
                  Finding reliable, fully ticketed TTM staff shouldn&rsquo;t be a gamble.
                </p>
                <p style={{ fontSize: '0.9375rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.62)' }}>
                  At The Temp Company, we take the uncertainty out of workforce supply by connecting you with our team who are already qualified (TTM Worker), properly equipped, and ready to step into the job, no hand-holding required.
                </p>
                <p style={{ fontSize: '0.9375rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.62)' }}>
                  Traffic management is our core focus, supplying dependable workers who slot straight into live worksites. We also provide labourers to support civil contractors, traffic companies, and event crews when additional support is needed.
                </p>
                <p style={{ fontSize: '0.9375rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.62)' }}>
                  You get consistency, compliance, and confidence in every placement.
                </p>
              </div>
            </div>
          </div>

          {/* 2-column card row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Left — How to Request */}
            <div style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '14px',
              padding: '32px 36px',
            }}>
              <p className="font-display" style={{
                fontWeight: 700,
                fontSize: '0.7rem',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--brand-primary)',
                marginBottom: '28px',
              }}>
                How to Request TM Staff
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {[
                  {
                    icon: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 11a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 0h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 7.91a16 16 0 0 0 6.29 6.29l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                      </svg>
                    ),
                    title: 'Contact Us',
                    body: 'Reach out via phone, email or complete our form.',
                  },
                  {
                    icon: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                      </svg>
                    ),
                    title: 'We Match',
                    body: "We'll match your needs with our pool of qualified TM workers or labourers.",
                  },
                  {
                    icon: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
                      </svg>
                    ),
                    title: 'Staff Deployed',
                    body: 'Your selected crew arrives ready to work safely and efficiently.',
                  },
                ].map(({ icon, title, body }, i) => (
                  <div key={i} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                    <div style={{
                      flexShrink: 0,
                      width: '36px', height: '36px',
                      borderRadius: '8px',
                      background: 'rgba(252,212,21,0.12)',
                      border: '1px solid rgba(252,212,21,0.2)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'var(--brand-primary)',
                    }}>
                      {icon}
                    </div>
                    <div>
                      <p className="font-display" style={{ fontWeight: 600, fontSize: '0.9375rem', color: '#fff', marginBottom: '4px' }}>
                        {title}
                      </p>
                      <p style={{ fontSize: '0.875rem', lineHeight: 1.65, color: 'rgba(255,255,255,0.55)' }}>
                        {body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <a href="#request-staff" className="request-btn">
                Request Staff Now
              </a>
            </div>

            {/* Right — Value proposition */}
            <div style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '14px',
              padding: '32px 36px',
            }}>
              <p className="font-display" style={{
                fontWeight: 700,
                fontSize: '0.7rem',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--brand-primary)',
                marginBottom: '28px',
              }}>
                Built for Traffic Management
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {[
                  {
                    icon: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
                      </svg>
                    ),
                    title: 'Traffic Management Specialists',
                    body: 'Workers who understand live sites and integrate quickly into established crews.',
                  },
                  {
                    icon: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                      </svg>
                    ),
                    title: 'Built for Industry',
                    body: 'Ready-to-go labour for traffic management and civil crews.',
                  },
                  {
                    icon: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                      </svg>
                    ),
                    title: 'Quality and Reliability',
                    body: 'People selected for attitude, reliability, and consistency on site.',
                  },
                  {
                    icon: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                      </svg>
                    ),
                    title: 'Fast Response',
                    body: 'Crews available when you need them, including short notice placements.',
                  },
                ].map(({ icon, title, body }, i) => (
                  <div key={i} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                    <div style={{
                      flexShrink: 0,
                      width: '36px', height: '36px',
                      borderRadius: '8px',
                      background: 'rgba(252,212,21,0.12)',
                      border: '1px solid rgba(252,212,21,0.2)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'var(--brand-primary)',
                    }}>
                      {icon}
                    </div>
                    <div>
                      <p className="font-display" style={{ fontWeight: 600, fontSize: '0.9375rem', color: '#fff', marginBottom: '4px' }}>
                        {title}
                      </p>
                      <p style={{ fontSize: '0.875rem', lineHeight: 1.65, color: 'rgba(255,255,255,0.55)' }}>
                        {body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ background: '#1a1a1a', paddingTop: '56px', paddingBottom: '120px' }}>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-14" style={{ maxWidth: '1152px', margin: '0 auto', padding: '0 24px', alignItems: 'start' }}>

          {/* LEFT — image */}
          <div className="hidden lg:block lg:col-span-2" style={{ position: 'relative', height: '600px', borderRadius: '20px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.14)', boxShadow: '0 20px 50px rgba(0,0,0,0.45)' }}>
            <Image
              src="/images/temp_company_workers_hsv1.webp"
              alt="Temp Company traffic management workers on site"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
            {/* Dark overlay */}
            <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.25)' }} />
            {/* Gold gradient top edge */}
            <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(196,150,20,0.15), rgba(0,0,0,0))' }} />
            {/* Grid overlay */}
            <div aria-hidden="true" style={{
              position: 'absolute', inset: 0, opacity: 0.15,
              backgroundImage: `
                repeating-linear-gradient(0deg, rgba(255,255,255,1) 0px, rgba(255,255,255,1) 1px, transparent 1px, transparent 60px),
                repeating-linear-gradient(90deg, rgba(255,255,255,1) 0px, rgba(255,255,255,1) 1px, transparent 1px, transparent 60px)
              `,
            }} />
          </div>

          {/* RIGHT — FAQ content */}
          <div className="lg:col-span-3">

          <h2 className="font-display" style={{
            fontWeight: 700,
            fontSize: 'clamp(1.8rem, 2.5vw, 2.4rem)',
            color: '#fff',
            marginBottom: '60px',
          }}>
            FAQs <span style={{ color: 'var(--brand-primary)' }}>for Employers</span>
          </h2>

          <div>
            {faqs.map(({ q, a }, i) => (
              <div key={i} className="faq-row">
                <button
                  onClick={() => toggle(i)}
                  className="faq-btn"
                  aria-expanded={openIndex === i}
                >
                  <span className="faq-question" style={{
                    fontWeight: 400,
                    fontSize: '1.05rem',
                    lineHeight: 1.4,
                  }}>
                    {q}
                  </span>
                  <span className={`faq-icon${openIndex === i ? ' open' : ''}`} style={{
                    flexShrink: 0,
                    width: '24px', height: '24px',
                    borderRadius: '50%',
                    border: '1px solid rgba(255,255,255,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.1rem',
                    lineHeight: 1,
                  }}>
                    +
                  </span>
                </button>

                {openIndex === i && (
                  <p style={{
                    fontSize: '0.95rem',
                    lineHeight: 1.6,
                    color: 'rgba(252,212,21,0.7)',
                    marginTop: '10px',
                  }}>
                    {a}
                  </p>
                )}
              </div>
            ))}
          </div>

          </div>{/* end right column */}

        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{
        position: 'relative',
        background: 'linear-gradient(to bottom, rgba(196,150,20,0.12) 0%, rgba(0,0,0,0.85) 40%, #000 100%)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        overflow: 'hidden',
      }}>
        {/* Grid overlay */}
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: `
            repeating-linear-gradient(0deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 60px),
            repeating-linear-gradient(90deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 60px)
          `,
        }} />
        <div style={{ position: 'relative', zIndex: 10, maxWidth: '1280px', margin: '0 auto', padding: '72px 24px', textAlign: 'center' }}>
          <h2 className="font-display" style={{
            fontWeight: 700,
            fontSize: 'clamp(1.8rem, 3.5vw, 3rem)',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            color: '#fff',
            marginBottom: '16px',
          }}>
            Need Traffic Management Staff?
          </h2>
          <p style={{
            fontSize: '1rem',
            lineHeight: 1.75,
            color: 'rgba(255,255,255,0.75)',
            maxWidth: '480px',
            margin: '0 auto 36px',
          }}>
            Get qualified workers on site quickly with The Temp Company.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '14px' }}>
            <a href="#request-staff" className="hero-btn-primary">Request Staff</a>
            <a href="/about-us#operations-team" className="hero-btn-secondary">Call Us Now</a>
          </div>
        </div>
      </section>

    </main>
  )
}
