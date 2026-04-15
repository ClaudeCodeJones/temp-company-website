import type { Metadata } from 'next'
import Link from 'next/link'
import RevealObserver from '@/app/components/RevealObserver'

export const metadata: Metadata = {
  title: 'Induction | The Temp Company',
  robots: { index: false, follow: false },
}

const cards = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="9" y="2" width="6" height="4" rx="1" />
        <path d="M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2" />
        <line x1="9" y1="12" x2="15" y2="12" />
        <line x1="9" y1="16" x2="13" y2="16" />
        <polyline points="9 8 10 9 12 7" />
      </svg>
    ),
    label: 'STEP 01',
    title: 'Onboarding Form',
    body: (
      <>
        Kick things off by filling out{' '}
        <a href="/onboarding" style={{ color: 'var(--color-accent)', textDecoration: 'none', fontWeight: 600 }}>
          your details
        </a>
        , so we can do important stuff like paying you and getting you set up.
      </>
    ),
    cta: 'Fill Out Form',
    href: '/onboarding',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8" />
        <path d="M12 17v4" />
        <polygon points="10 8 16 11 10 14 10 8" />
      </svg>
    ),
    label: 'STEP 02',
    title: 'Onboarding Presentation',
    body: (
      <>
        <a href="#" style={{ color: 'var(--color-accent)', textDecoration: 'none', fontWeight: 600 }}>
          This presentation
        </a>{' '}
        covers who&rsquo;s who, what matters around here, and what you&rsquo;re stepping into.
      </>
    ),
    cta: 'Watch Video',
    href: 'https://www.canva.com/design/DAGt4bod608/NdimMLLXE4OMim9wiFSPBg/watch?utm_content=DAGt4bod608&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h5cee66f81b',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        <line x1="9" y1="9" x2="15" y2="9" />
        <line x1="9" y1="13" x2="13" y2="13" />
      </svg>
    ),
    label: 'STEP 03',
    title: 'Employee Handbook',
    body: (
      <>
        All the need-to-knows, should-knows, and things you'll pretend you read but should{' '}
        <a href="#" style={{ color: 'var(--color-accent)', textDecoration: 'none', fontWeight: 600 }}>
          actually read
        </a>
        .
      </>
    ),
    cta: 'Read Handbook',
    href: '/docs/ttc_employee_handbook_2026.pdf',
  },
]

export default function InductionPage() {
  return (
    <main>
      <style>{`
        .induction-hero { min-height: 60vh; }
        .induction-hero-content { padding-bottom: clamp(60px, 8vw, 100px); }
        @media (max-width: 1279px) {
          .induction-hero { min-height: auto; }
          .induction-hero-content { padding-top: 160px; padding-bottom: 48px; }
        }
        .induction-card-btn {
          display: block;
          width: 100%;
          background: var(--color-accent);
          color: #111;
          border: none;
          border-radius: 999px;
          padding: 14px 26px;
          font-weight: 700;
          font-size: 0.875rem;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          cursor: pointer;
          text-align: center;
          text-decoration: none;
          margin-top: auto;
          transition: opacity 0.2s ease, transform 0.2s ease;
        }
        .induction-card-btn:hover {
          opacity: 0.88;
          transform: translateY(-1px);
        }
        .induction-card {
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .induction-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 28px 60px rgba(0,0,0,0.5) !important;
        }
      `}</style>

      <RevealObserver />

      {/* ── HERO ── */}
      <section className="induction-hero" style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: 'linear-gradient(160deg, #1e1a08 0%, #252010 30%, #2e3030 65%, #3a3a3a 100%)',
      }}>

        {/* Grid overlay */}
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: `
            repeating-linear-gradient(0deg, rgba(255,255,255,0.045) 0px, rgba(255,255,255,0.045) 1px, transparent 1px, transparent 60px),
            repeating-linear-gradient(90deg, rgba(255,255,255,0.045) 0px, rgba(255,255,255,0.045) 1px, transparent 1px, transparent 60px)
          `,
        }} />

        {/* Subtle accent glow */}
        <div aria-hidden="true" style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '300px',
          background: 'radial-gradient(ellipse, rgba(252,212,21,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* Content */}
        <div className="induction-hero-content" style={{
          position: 'relative', zIndex: 10,
          maxWidth: '720px',
          margin: '0 auto',
          paddingLeft: '24px',
          paddingRight: '24px',
          paddingTop: 'clamp(160px, 14vw, 200px)',
          textAlign: 'center',
        }}>

          <h1 className="font-display reveal d1" style={{
            fontWeight: 700,
            fontSize: 'clamp(2rem, 5vw, 3.25rem)',
            lineHeight: 1.08,
            letterSpacing: '-0.03em',
            color: '#fff',
            marginBottom: '24px',
          }}>
            Complete the Onboarding Below
          </h1>

          <p className="reveal d3" style={{
            fontSize: '1.0625rem',
            lineHeight: 1.75,
            color: 'rgba(255,255,255,0.72)',
            maxWidth: '560px',
            margin: '0 auto',
          }}>
            We're dedicated to making your onboarding experience as seamless as possible.
            Please action each of the three sections below.
          </p>

        </div>
      </section>

      {/* ── CARDS ── */}
      <section style={{
        background: '#111',
        padding: 'clamp(60px, 8vw, 100px) 24px',
      }}>
        <div style={{
          maxWidth: '1152px',
          margin: '0 auto',
        }}>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
          }}>

            {cards.map((card, i) => (
              <div
                key={card.title}
                className={`induction-card reveal d${i + 1}`}
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  backdropFilter: 'blur(14px)',
                  WebkitBackdropFilter: 'blur(14px)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: '14px',
                  boxShadow: '0 20px 50px rgba(0,0,0,0.35)',
                  padding: '36px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0',
                }}
              >
                {/* Icon box */}
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  background: 'rgba(252,212,21,0.12)',
                  border: '1px solid rgba(252,212,21,0.22)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-accent)',
                  marginBottom: '24px',
                  flexShrink: 0,
                }}>
                  {card.icon}
                </div>

                {/* Step label */}
                <p style={{
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'rgba(252,212,21,0.6)',
                  marginBottom: '8px',
                }}>
                  {card.label}
                </p>

                {/* Title */}
                <h2 className="font-display" style={{
                  fontWeight: 700,
                  fontSize: '1.25rem',
                  color: '#fff',
                  letterSpacing: '-0.01em',
                  marginBottom: '14px',
                }}>
                  {card.title}
                </h2>

                {/* Body */}
                <p style={{
                  fontSize: '0.9375rem',
                  lineHeight: 1.75,
                  color: 'rgba(255,255,255,0.65)',
                  marginBottom: '32px',
                  flexGrow: 1,
                }}>
                  {card.body}
                </p>

                {/* CTA */}
                {card.href.startsWith('/') ? (
                  <Link href={card.href} className="induction-card-btn">
                    {card.cta}
                  </Link>
                ) : (
                  <a href={card.href} className="induction-card-btn" target="_blank" rel="noopener noreferrer">
                    {card.cta}
                  </a>
                )}

              </div>
            ))}

          </div>
        </div>
      </section>

    </main>
  )
}
