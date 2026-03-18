'use client'

import { useState } from 'react'
import type { ReactNode } from 'react'
import Image from 'next/image'
import { branches, statusLabel } from '@/data/branches'

const faqs: { q: string; a: ReactNode }[] = [
  {
    q: 'Do I need experience or tickets to apply?',
    a: "Nope. If you're new to traffic management, we'll provide full training and help you get site-ready with the right certifications.",
  },
  {
    q: 'What gear do I need to start?',
    a: "We'll supply basic PPE like hi-vis vest, steel-caps, and a hard hat.",
  },
  {
    q: 'How quickly can I start working?',
    a: "Once you're trained and cleared, you could be on site within a few days. It depends on client needs and your availability.",
  },
  {
    q: 'Do you only offer traffic roles?',
    a: 'No, although we focus on temporary traffic management, but you may be utilised as a labourer too if you wish.',
  },
  {
    q: 'What regions do you cover?',
    a: 'We operate in the Greater Wellington, Marlborough and Canterbury (Christchurch) regions.',
  },
  {
    q: 'Will I need to pass a drug test?',
    a: 'Yes.',
  },
]

export default function FindWorkPage() {
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
          background: #bc9c22;
          color: #fff;
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
          background: #d4b128;
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
          background: #bc9c22;
          color: #fff;
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
          color: var(--brand-primary-dark);
        }
        .faq-icon.open {
          transform: rotate(45deg);
          color: var(--brand-primary-dark);
        }
      `}</style>

      {/* ── HERO ── */}
      <section className="hero-section" style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: 'linear-gradient(to bottom, #2e3949 0%, #37373b 55%, #000000 100%)',
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
            lineHeight: 1.05,
            textAlign: 'center',
            letterSpacing: '-0.03em',
            color: '#fff',
          }}>
            Traffic Management Jobs Available Now
          </h1>

          <p style={{
            fontSize: '1.0625rem',
            lineHeight: 1.75,
            color: 'rgba(255,255,255,0.8)',
            maxWidth: '650px',
            margin: '24px auto 0',
          }}>
            The Temp Company connects reliable workers with traffic management and civil crews across Christchurch, Wellington and Blenheim.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '14px', marginTop: '40px' }}>
            <a href="/find-work/apply" className="hero-btn-primary">Apply Now</a>
            <a href="/about-us#operations-team" className="hero-btn-secondary">Call Us Now</a>
          </div>

        </div>
      </section>

      {/* ── INTRO SECTION ── */}
      <section className="hero-overlap-section">
        <div style={{ maxWidth: '1152px', margin: '0 auto' }}>

          {/* Feature panel */}
          <div style={{ maxWidth: '960px', margin: '0 auto 56px', position: 'relative', zIndex: 10 }}>
            <div className="rounded-2xl backdrop-blur-md border border-white/10 bg-white/10" style={{ padding: 'clamp(36px, 5vw, 56px)' }}>
              <p className="font-display" style={{
                fontSize: '0.7rem',
                fontWeight: 700,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--brand-primary-dark)',
                marginBottom: '20px',
              }}>
                For Job Seekers
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <p style={{ fontSize: '0.9375rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.62)' }}>
                  The Temp Company connects traffic management workers with steady work across Wellington, Canterbury and Marlborough.
                </p>
                <p style={{ fontSize: '0.9375rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.62)' }}>
                  We partner with reputable crews that run well, respect their people, and value good workers.
                </p>
                <p style={{ fontSize: '0.9375rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.62)' }}>
                  Whether you&rsquo;re after consistent shifts or short-term gigs, we match you with roles that suit your experience, qualifications, and availability.
                </p>
                <p style={{ fontSize: '0.9375rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.62)' }}>
                  Already TM qualified? Great. If not, our certified trainers can get you ready to step onto site.
                </p>
                <div>
                  <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--brand-primary-dark)', marginBottom: '12px' }}>
                    To join, you&rsquo;ll need to:
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
                    {[
                      'Pass a Drug Test',
                      'Have working rights in NZ',
                      'Strong communication skills in English',
                      'At least a restricted licence',
                    ].map((req) => (
                      <div key={req} style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '12px 16px' }}>
                        <span style={{ color: 'var(--brand-primary-dark)', fontSize: '0.875rem', flexShrink: 0 }}>✓</span>
                        <span style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.85)', lineHeight: 1.4 }}>{req}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2-column card row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Left — How to Apply */}
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
                color: 'var(--brand-primary-dark)',
                marginBottom: '28px',
              }}>
                How to Apply
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {[
                  {
                    icon: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 11a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 0h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 7.91a16 16 0 0 0 6.29 6.29l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                      </svg>
                    ),
                    title: 'Submit Your Details',
                    body: 'Use our application form to express your interest and provide your experience.',
                  },
                  {
                    icon: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                      </svg>
                    ),
                    title: 'We Connect',
                    body: "We'll review your info and get in touch to discuss opportunities and answer any questions you may have.",
                  },
                  {
                    icon: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
                      </svg>
                    ),
                    title: 'Get Placed',
                    body: 'Secure flexible work that matches your skills and availability in the Wellington, Canterbury &amp; Marlborough Regions.',
                  },
                ].map(({ icon, title, body }, i) => (
                  <div key={i} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                    <div style={{
                      flexShrink: 0,
                      width: '36px', height: '36px',
                      borderRadius: '8px',
                      background: 'rgba(188,156,34,0.12)',
                      border: '1px solid rgba(188,156,34,0.2)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'var(--brand-primary-dark)',
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

              <a href="/find-work/apply" className="request-btn">
                Apply Now
              </a>
            </div>

            {/* Right — Hiring Status */}
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
                color: 'var(--brand-primary-dark)',
                marginBottom: '28px',
              }}>
                Hiring Status
              </p>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {branches.map((branch, i) => {
                  const isHiring = branch.hiringStatus === 'hiring'
                  const dotColor = isHiring ? '#4ade80' : '#f87171'
                  const textColor = isHiring ? '#4ade80' : '#f87171'
                  const label = isHiring ? 'Actively Hiring' : 'Not Currently Hiring'
                  return (
                    <div key={branch.slug} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '18px 0',
                      borderBottom: i < branches.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                    }}>
                      <div>
                        <p className="font-display" style={{ fontWeight: 600, fontSize: '0.9375rem', color: '#fff', marginBottom: '3px' }}>
                          {branch.name}
                        </p>
                        <p style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.4)' }}>
                          {branch.region}
                        </p>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                        <span style={{
                          width: '8px', height: '8px',
                          borderRadius: '50%',
                          background: dotColor,
                          flexShrink: 0,
                          boxShadow: `0 0 6px ${dotColor}`,
                        }} />
                        <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: textColor }}>
                          {label}
                        </span>
                      </div>
                    </div>
                  )
                })}
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
              src="/images/temp_company_workers.webp"
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
            FAQs <span style={{ color: 'var(--brand-primary-dark)' }}>for Job Seekers</span>
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
                    color: 'rgba(188,156,34,0.9)',
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
            Ready to Find Work?
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
            <a href="/find-work/apply" className="hero-btn-primary">Apply Now</a>
            <a href="/about-us#operations-team" className="hero-btn-secondary">Call Us Now</a>
          </div>
        </div>
      </section>

    </main>
  )
}
