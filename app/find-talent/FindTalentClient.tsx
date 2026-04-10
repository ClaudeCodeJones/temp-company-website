'use client'

import { useState } from 'react'
import type { ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const faqs: { q: string; a: ReactNode }[] = [
  {
    q: 'What types of roles do you recruit for permanently?',
    a: "We recruit across construction and trades, including traffic management, civil works, and infrastructure. If you're not sure whether your role fits, just get in touch and we'll let you know.",
  },
  {
    q: 'What does the recruitment process look like?',
    a: 'You give us the brief, we go and find the candidates. We handle sourcing, screening, and reference checks, then present you with a shortlist. You interview and make the call. We support you through to offer and beyond.',
  },
  {
    q: 'How much does it cost?',
    a: "Our fee is 18% of the candidate's annual base salary, invoiced on acceptance of the offer. There are no upfront costs and no charge if we don't find you someone.",
  },
  {
    q: "What happens if the candidate doesn't work out?",
    a: "If a placement leaves within the first four weeks we'll find you a replacement at no cost. Between four and eight weeks we'll either find a replacement or provide a 50% credit toward your next placement. After eight weeks no replacement or refund applies.",
  },
  {
    q: 'Which regions do you cover?',
    a: 'We operate from Christchurch, Wellington, and Blenheim and recruit permanent candidates across New Zealand.',
  },
  {
    q: 'How long does it take to find someone?',
    a: "It depends on the role and the market, but we'll always give you an honest timeframe upfront. We'd rather set realistic expectations than overpromise.",
  },
  {
    q: 'Are there formal terms and conditions for the recruitment service?',
    a: <>Yes. Our T&rsquo;s and C&rsquo;s are available on our <Link href="/terms" style={{ color: 'var(--brand-primary)', textDecoration: 'none', fontWeight: 500 }}>Terms and Conditions</Link> page, and complete client documentation is available on request. Just get in touch with your local TTC coordinator.</>,
  },
]

export default function FindTalentClient() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i)
  return (
    <main>
      <style>{`
        .hero-section { min-height: 80vh; }
        .hero-content { padding-bottom: clamp(140px, 14vw, 200px); }
        @media (max-width: 1279px) {
          .hero-section { min-height: auto; }
          .hero-content { padding-top: 180px; padding-bottom: 72px; }
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
        .faq-answer {
          max-height: 0;
          overflow: hidden;
          opacity: 0;
          transition: max-height 0.3s ease, opacity 0.3s ease;
        }
        .faq-answer.open {
          max-height: 500px;
          opacity: 1;
        }
      `}</style>

      {/* ── HERO ── */}
      <section className="hero-section" style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #1a2a3a 0%, #152230 28%, #0d161e 60%, #111 85%, #1a1a1a 100%)',
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
            Permanent Recruitment for Construction and Trades
          </h1>

          <p style={{
            fontSize: '1.0625rem',
            lineHeight: 1.75,
            color: 'rgba(255,255,255,0.8)',
            maxWidth: '650px',
            margin: '24px auto 0',
          }}>
            The Temp Company connects employers with permanent hires across traffic management, civil, and construction trades in Christchurch, Wellington and Blenheim.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '14px', marginTop: '40px' }}>
            <a href="/find-talent/enquire" className="hero-btn-primary">Find Talent</a>
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
                color: 'var(--brand-primary)',
                marginBottom: '20px',
              }}>
                For Employers
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <p style={{ fontSize: '0.9375rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.62)' }}>
                  Finding the right permanent hire in construction and trades is harder than it looks. At The Temp Company, recruitment is an extension of what we already do. We live and breathe this industry, which means we understand the roles you are trying to fill and the kind of people who actually perform in them.
                </p>
                <p style={{ fontSize: '0.9375rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.62)' }}>
                  We source, screen, and present candidates who are a genuine fit for your team. You get a shortlist worth your time, not a stack of resumes to wade through.
                </p>
                <p style={{ fontSize: '0.9375rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.62)' }}>
                  If a placement doesn't work out in the first eight weeks, we'll find you a replacement.
                </p>
              </div>
            </div>
          </div>

          {/* 2-column card row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Left — How It Works */}
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
                How It Works
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {[
                  {
                    icon: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
                      </svg>
                    ),
                    title: 'Tell Us About the Role',
                    body: 'Give us the brief. Role requirements, team environment, location, and salary range.',
                  },
                  {
                    icon: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                      </svg>
                    ),
                    title: 'We Find the People',
                    body: 'We source and screen candidates from our network. You only meet the ones worth talking to.',
                  },
                  {
                    icon: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
                      </svg>
                    ),
                    title: 'You Make the Call',
                    body: 'We coordinate interviews and support you through to offer. The decision is always yours.',
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

              <a href="/find-talent/enquire" className="request-btn">
                Find Talent Now
              </a>
            </div>

            {/* Right — Why TTC */}
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
                Why TTC for Recruitment
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {[
                  {
                    icon: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
                      </svg>
                    ),
                    title: 'Industry Focused',
                    body: 'We recruit exclusively across construction, traffic management, and civil trades. We know what good looks like.',
                  },
                  {
                    icon: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                      </svg>
                    ),
                    title: 'No Time Wasters',
                    body: 'Candidates are screened and reference-checked before you see them.',
                  },
                  {
                    icon: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
                      </svg>
                    ),
                    title: 'Replacement Guarantee',
                    body: "If it doesn't work out in the first eight weeks, we've got you covered.",
                  },
                  {
                    icon: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <circle cx="12" cy="10" r="3"/><path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 7 8 11.7z"/>
                      </svg>
                    ),
                    title: 'National Network',
                    body: 'Operating from three regions, recruiting talent across New Zealand.',
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
              src="/images/temp_company_talent.webp"
              alt="Temp Company permanent recruitment"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
            <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.25)' }} />
            <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(196,150,20,0.15), rgba(0,0,0,0))' }} />
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

                <div className={`faq-answer${openIndex === i ? ' open' : ''}`}>
                  <p style={{
                    fontSize: '0.95rem',
                    lineHeight: 1.6,
                    color: 'rgba(252,212,21,0.7)',
                    marginTop: '10px',
                    paddingLeft: '16px',
                  }}>
                    {a}
                  </p>
                </div>
              </div>
            ))}
          </div>

          </div>

        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{
        position: 'relative',
        background: 'linear-gradient(to bottom, rgba(196,150,20,0.12) 0%, rgba(0,0,0,0.85) 40%, #000 100%)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        overflow: 'hidden',
      }}>
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
            Ready to Find Your Next Permanent Hire?
          </h2>
          <p style={{
            fontSize: '1rem',
            lineHeight: 1.75,
            color: 'rgba(255,255,255,0.75)',
            maxWidth: '480px',
            margin: '0 auto 36px',
          }}>
            Talk to your local TTC coordinator today.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '14px' }}>
            <a href="/find-talent/enquire" className="hero-btn-primary">Find Talent</a>
            <a href="/about-us#operations-team" className="hero-btn-secondary">Call Us Now</a>
          </div>
        </div>
      </section>

    </main>
  )
}
