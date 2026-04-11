'use client'

import Image from 'next/image'
import { Users } from 'lucide-react'

const strengths = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.3799 21.13C20.1799 21.13 19.9899 21.05 19.8499 20.91L13.4699 14.53C13.1799 14.24 13.1799 13.76 13.4699 13.47L21.2 5.74001C21.39 5.55001 21.6799 5.48001 21.9399 5.55001C22.1999 5.63001 22.3999 5.84001 22.4599 6.10001C22.6499 6.95001 22.7499 7.90001 22.7499 9.00001V15C22.7499 17.77 22.1699 19.64 20.9099 20.91C20.7699 21.05 20.5599 21.08 20.3799 21.13ZM15.0599 14L20.3199 19.26C20.9499 18.29 21.2499 16.91 21.2499 15V9.00001C21.2499 8.59001 21.2399 8.21001 21.2099 7.85001L15.0599 14Z" />
        <path d="M6.26999 22.48C6.20999 22.48 6.16001 22.47 6.10001 22.46C2.79001 21.7 1.25 19.33 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H15C19.33 1.25 21.7 2.79001 22.46 6.10001C22.52 6.35001 22.44 6.62 22.26 6.8L6.79999 22.26C6.65999 22.4 6.46999 22.48 6.26999 22.48ZM9 2.75C4.39 2.75 2.75 4.39 2.75 9V15C2.75 18.47 3.71001 20.21 6.04001 20.9L20.89 6.05C20.21 3.72 18.46 2.75999 14.99 2.75999H9V2.75Z" />
        <path d="M14.9999 22.7495H8.99989C7.89989 22.7495 6.95989 22.6595 6.09989 22.4595C5.82989 22.3995 5.61987 22.1995 5.54987 21.9395C5.46987 21.6795 5.54988 21.3994 5.73988 21.1994L13.4699 13.4695C13.7599 13.1795 14.2399 13.1795 14.5299 13.4695L20.9099 19.8495C21.0499 19.9895 21.1299 20.1795 21.1299 20.3795C21.1299 20.5795 21.0499 20.7695 20.9099 20.9095C19.6399 22.1695 17.7699 22.7495 14.9999 22.7495ZM7.84989 21.2095C8.20989 21.2395 8.58989 21.2495 8.99989 21.2495H14.9999C16.9199 21.2495 18.2899 20.9495 19.2599 20.3195L13.9999 15.0594L7.84989 21.2095Z" />
        <path d="M9.11994 13.3091C8.48994 13.3091 7.85993 13.0791 7.35993 12.6091C5.76993 11.0991 5.12996 9.43908 5.50996 7.81908C5.88996 6.15908 7.33994 5.03906 9.11994 5.03906C10.8999 5.03906 12.35 6.15908 12.73 7.81908C13.1 9.44908 12.4599 11.0991 10.8699 12.6091C10.3799 13.0691 9.74994 13.3091 9.11994 13.3091ZM6.96995 8.14906C6.64995 9.50906 7.56994 10.7291 8.39994 11.5191C8.80994 11.9091 9.43994 11.9091 9.83994 11.5191C10.6599 10.7391 11.5799 9.51906 11.2699 8.14906C10.9999 6.95906 9.93994 6.52907 9.11994 6.52907C8.29994 6.52907 7.24995 6.95906 6.96995 8.14906Z" />
        <path d="M9.1499 9.49023C8.5999 9.49023 8.1499 9.04023 8.1499 8.49023C8.1499 7.94023 8.5899 7.49023 9.1499 7.49023H9.15991C9.70991 7.49023 10.1599 7.94023 10.1599 8.49023C10.1599 9.04023 9.6999 9.49023 9.1499 9.49023Z" />
      </svg>
    ),
    title: 'Blenheim Beginnings',
    body: 'We started in Blenheim, working alongside traffic management companies who needed reliable people at short notice. From there we expanded to Christchurch, then Wellington.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M7.56 2C7.56 5.11 10 7.56 13.12 7.56C10.01 7.56 7.56 10 7.56 13.12C7.56 10.01 5.12 7.56 2 7.56C5.11 7.56 7.56 5.12 7.56 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path opacity="0.4" d="M16.4409 10.89C16.4409 14 18.8809 16.45 22.0009 16.45C18.8909 16.45 16.4409 18.89 16.4409 22.01C16.4409 18.9 14.0009 16.45 10.8809 16.45C13.9909 16.45 16.4409 14.01 16.4409 10.89Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Built on Standards',
    body: "Whether we're placing a temp worker on site or finding your next permanent hire, the standard doesn't change. Vetted, capable, and ready to go.",
  },
  {
    icon: <Users size={28} strokeWidth={1.5} aria-hidden="true" />,
    title: 'People First',
    body: 'We take time to understand the people we place and the employers we work with. That means better matches, stronger hires, and workers who show up ready to contribute.',
  },
]

const team = [
  { name: 'Amy Carswell', role: 'Operations Co-ordinator', location: 'Wellington', phone: '027 836 7266', phoneTel: '0278367266', email: 'amy@thetempcompany.co.nz', image: '/people/amy_carswell.webp' },
  { name: 'Eli Hyde', role: 'Operations Co-ordinator', location: 'Christchurch', phone: '021 836 930', phoneTel: '021836930', email: 'eli@thetempcompany.co.nz', image: '/people/eli_hyde_v1.webp' },
  { name: 'Luke Roberts', role: 'Operations Co-ordinator', location: 'Blenheim', phone: '027 836 7262', phoneTel: '0278367262', email: 'luke@thetempcompany.co.nz', image: '/people/luke_roberts_ttc1.webp' },
]

export default function AboutClient() {
  return (
    <main>
      <style>{`
        .hero-section { min-height: 80vh; }
        .hero-content { padding-top: clamp(80px, 6.5vw, 110px); padding-bottom: clamp(50px, 7vw, 80px); }
        @media (max-width: 1279px) {
          .hero-section { min-height: auto; }
          .hero-content { padding-top: 175px; padding-bottom: 32px; }
        }
        .strength-card {
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.05);
          padding: 28px;
          transition: border-color 0.2s ease;
        }
        .strength-card:hover {
          border-color: rgba(255,255,255,0.2);
        }
        .team-card {
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.1);
          background: #1c1f24;
          overflow: hidden;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .team-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.35);
        }
        .logo-link {
          font-size: 0.8rem;
          color: var(--brand-primary-dark);
          text-decoration: none;
          font-weight: 500;
          transition: opacity 0.2s ease;
        }
        .logo-link:hover {
          opacity: 0.75;
        }
        .brand-card {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .brand-card:hover {
          transform: translateY(-4px);
        }
        @media (max-width: 767px) {
          .brand-card { justify-content: flex-start; padding-left: 28px; }
        }
        .card-maw:hover  { box-shadow: 0 8px 32px rgba(253,79,0,0.25); }
        .card-mwtp:hover { box-shadow: 0 8px 32px rgba(41,131,194,0.25); }
        .card-sweepco:hover { box-shadow: 0 8px 32px rgba(204,35,36,0.25); }
        .card-qualcard:hover { box-shadow: 0 8px 32px rgba(42,95,91,0.35); }
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
      `}</style>

      {/* ── HERO ── */}
      <section className="hero-section" style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #0d2260 0%, #0a1a50 28%, #060f32 60%, #111 85%, #1a1a1a 100%)',
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
            Connecting the Right People with the Right Roles
          </h1>

          <p style={{
            fontSize: '1.0625rem',
            lineHeight: 1.75,
            color: 'rgba(255,255,255,0.8)',
            maxWidth: '650px',
            margin: '24px auto 0',
          }}>
            From temporary traffic management staffing to permanent recruitment, we connect reliable people with the right roles across civil and construction.
          </p>

        </div>
      </section>

      {/* ── SECTION 2 — INTRO PANEL ── */}
      <section className="hero-overlap-section">
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div className="rounded-2xl backdrop-blur-md border border-white/10 bg-white/10" style={{ padding: 'clamp(36px, 5vw, 56px)' }}>
            <p className="font-display" style={{
              fontSize: '0.7rem',
              fontWeight: 700,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'var(--brand-primary-dark)',
              marginBottom: '20px',
            }}>
              About The Temp Company
            </p>
            <h2 className="font-display" style={{
              fontWeight: 700,
              fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: '#fff',
              marginBottom: '28px',
            }}>
              Your Staffing and Recruitment Partner for Construction and Trades
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <p style={{ fontSize: '0.9375rem', lineHeight: 1.78, color: 'rgba(255,255,255,0.65)' }}>
                The Temp Company supports traffic management companies, civil contractors, and construction businesses across Christchurch, Wellington, and Blenheim with qualified, job-ready workers who turn up and get it done.
              </p>
              <p style={{ fontSize: '0.9375rem', lineHeight: 1.78, color: 'rgba(255,255,255,0.65)' }}>
                We provide temporary staffing across traffic management and civil labour to keep your projects moving, and permanent recruitment across construction and trades to help employers find the right people for the long term.
              </p>
              <p style={{ fontSize: '0.9375rem', lineHeight: 1.78, color: 'rgba(255,255,255,0.65)' }}>
                Through our in-house training division, MW Training and Planning, we ensure workers are trained to industry standards and ready for site from day one.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 3 — CORE STRENGTHS ── */}
      <section style={{ background: '#111', padding: 'clamp(60px, 8vw, 100px) 24px' }}>
        <div style={{ maxWidth: '1152px', margin: '0 auto' }}>
          <h2 className="font-display" style={{
            fontWeight: 700,
            fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            color: '#fff',
            marginBottom: '48px',
          }}>
            How We Got Here
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {strengths.map(({ icon, title, body }) => (
              <div key={title} className="strength-card">
                <div style={{
                  width: '48px', height: '48px',
                  borderRadius: '10px',
                  background: 'rgba(188,156,34,0.12)',
                  border: '1px solid rgba(188,156,34,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--brand-primary-dark)',
                  marginBottom: '20px',
                }}>
                  {icon}
                </div>
                <h3 className="font-display" style={{ fontWeight: 600, fontSize: '1rem', color: '#fff', marginBottom: '10px' }}>
                  {title}
                </h3>
                <p style={{ fontSize: '0.9rem', lineHeight: 1.72, color: 'rgba(255,255,255,0.55)' }}>
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 4 — MW GROUP ── */}
      <section style={{ background: '#1a1a1a', padding: 'clamp(60px, 8vw, 100px) 24px' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch" style={{ maxWidth: '1152px', margin: '0 auto' }}>

          {/* LEFT — text */}
          <div>
            <p className="font-display" style={{
              fontSize: '0.7rem',
              fontWeight: 700,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'var(--brand-primary-dark)',
              marginBottom: '20px',
            }}>
              MW Group
            </p>
            <h2 className="font-display" style={{
              fontWeight: 700,
              fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: '#fff',
              marginBottom: '28px',
            }}>
              Part of MW Group
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <p style={{ fontSize: '0.9375rem', lineHeight: 1.78, color: 'rgba(255,255,255,0.65)' }}>
                The Temp Company operates as part of MW Group, working alongside Men at Work Traffic Management, MW Training and Planning, SweepCo and QualCard to support the wider traffic management, civil, and construction trades industry.
              </p>
              <p style={{ fontSize: '0.9375rem', lineHeight: 1.78, color: 'rgba(255,255,255,0.65)' }}>
                This connection gives us direct insight into how sites operate and what&rsquo;s expected from crews, ensuring the workers we supply arrive prepared and ready to contribute.
              </p>
              <p style={{ fontSize: '0.9375rem', lineHeight: 1.78, color: 'rgba(255,255,255,0.65)' }}>
                Through this network, workers also have access to ongoing training and development pathways that support long-term capability on site.
              </p>
            </div>
          </div>

          {/* RIGHT — brand cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8" style={{ alignContent: 'stretch', height: '100%' }}>

            <a href="https://www.menatwork.co.nz" target="_blank" rel="noopener noreferrer" className="rounded-xl border border-white/10 overflow-hidden flex items-center justify-center px-8 brand-card card-maw" style={{ background: '#1c1f24', borderTop: '4px solid #fd4f00', textDecoration: 'none', minHeight: '140px' }}>
              <Image src="/logos/mwtrafficmanagement_white.webp" alt="Men at Work Traffic Management" width={200} height={52} style={{ maxHeight: '44px', width: 'auto', objectFit: 'contain' }} />
            </a>

            <a href="https://www.mwtrainplan.co.nz" target="_blank" rel="noopener noreferrer" className="rounded-xl border border-white/10 overflow-hidden flex items-center justify-center px-8 brand-card card-mwtp" style={{ background: '#1c1f24', borderTop: '4px solid #2983c2', textDecoration: 'none', minHeight: '140px' }}>
              <Image src="/logos/mwtrainingandplanning_white.webp" alt="MW Training and Planning" width={200} height={52} style={{ maxHeight: '44px', width: 'auto', objectFit: 'contain' }} />
            </a>

            <a href="https://www.qualcard.co.nz" target="_blank" rel="noopener noreferrer" className="rounded-xl border border-white/10 overflow-hidden flex items-center justify-center px-8 brand-card card-qualcard" style={{ background: '#1c1f24', borderTop: '4px solid #2a5f5b', textDecoration: 'none', minHeight: '140px' }}>
              <div className="flex items-center justify-center">
                <Image src="/logos/qualcard_white.webp" alt="QualCard" width={160} height={40} className="max-h-10 md:max-h-12 object-contain w-auto" />
              </div>
            </a>

            <a href="https://www.sweepco.co.nz" target="_blank" rel="noopener noreferrer" className="rounded-xl border border-white/10 overflow-hidden flex items-center justify-center px-8 brand-card card-sweepco" style={{ background: '#1c1f24', borderTop: '4px solid #cc2324', textDecoration: 'none', minHeight: '140px' }}>
              <Image src="/logos/sweepco_white.webp" alt="SweepCo" width={175} height={46} style={{ maxHeight: '40px', width: 'auto', objectFit: 'contain' }} />
            </a>

          </div>

        </div>
      </section>

      {/* ── SECTION 5 — TEAM ── */}
      <section id="operations-team" style={{ background: '#111', padding: 'clamp(60px, 8vw, 100px) 24px' }}>
        <div style={{ maxWidth: '1152px', margin: '0 auto' }}>
          <h2 className="font-display" style={{
            fontWeight: 700,
            fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            color: '#fff',
            marginBottom: '48px',
          }}>
            The People Behind The Temp Company
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.map(({ name, role, location, phone, phoneTel, email, image }) => (
              <div key={location} className="team-card" style={{ maxWidth: '340px', margin: '0 auto', width: '100%' }}>
                <div className="w-full aspect-[3/4] relative flex items-end justify-center overflow-hidden" style={{ background: 'radial-gradient(circle at 50% 30%, #3a4048 0%, #2a2f36 60%, #1a1d22 100%)', maxHeight: '260px' }}>
                  {image && (
                    <Image src={image} alt={name} fill sizes="(max-width: 768px) 100vw, 33vw" style={{ objectFit: 'contain', objectPosition: 'bottom' }} />
                  )}
                  <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(transparent 65%, rgba(0,0,0,0.25))', pointerEvents: 'none' }} />
                </div>
                <div style={{ padding: '18px 20px 22px' }}>
                  <p className="font-display" style={{ fontWeight: 600, fontSize: '1.0625rem', color: '#fff', marginBottom: '4px' }}>
                    {name}
                  </p>
                  <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', marginBottom: '4px' }}>
                    {role}
                  </p>
                  <p style={{ fontSize: '0.85rem', color: '#fcd415', fontWeight: 500, marginBottom: '14px' }}>
                    {location}
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '14px' }}>
                    <a href={`tel:${phoneTel}`} style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.8)', textDecoration: 'none' }}>
                      {phone}
                    </a>
                    <a href={`mailto:${email}`} style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.8)', textDecoration: 'none' }}>
                      {email}
                    </a>
                  </div>
                </div>
              </div>
            ))}
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
            Hiring, Recruiting, or Looking for Work?
          </h2>
          <p style={{
            fontSize: '1rem',
            lineHeight: 1.75,
            color: 'rgba(255,255,255,0.75)',
            maxWidth: '680px',
            margin: '0 auto 36px',
          }}>
            The Temp Company provides temporary staffing across Christchurch, Wellington and Blenheim, and permanent recruitment nationwide across traffic management, civil, and construction trades.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '14px' }}>
            <a href="/request-staff" className="hero-btn-primary">Request Staff</a>
            <a href="/find-talent" className="hero-btn-secondary">Find Talent</a>
            <a href="/find-work/apply" className="hero-btn-primary">Apply for Work</a>
          </div>
        </div>
      </section>

    </main>
  )
}
