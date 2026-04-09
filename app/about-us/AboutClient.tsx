'use client'

import Image from 'next/image'
import { MapPin, Users, TrendingUp } from 'lucide-react'

const strengths = [
  {
    icon: <MapPin size={28} strokeWidth={1.5} aria-hidden="true" />,
    title: 'Blenheim Beginnings',
    body: 'We started in Blenheim, working alongside traffic management companies who needed reliable people at short notice. From there we expanded to Christchurch, then Wellington.',
  },
  {
    icon: <TrendingUp size={28} strokeWidth={1.5} aria-hidden="true" />,
    title: 'Three Regions, One Standard',
    body: 'We now operate across Marlborough, Canterbury and Wellington. Each region has a dedicated coordinator on the ground who knows the local crews, sites and requirements.',
  },
  {
    icon: <Users size={28} strokeWidth={1.5} aria-hidden="true" />,
    title: 'People First',
    body: 'We take time to understand the people we place, not just their qualifications. That means better matches, fewer dropouts, and workers who show up ready to contribute.',
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
        background: 'linear-gradient(to bottom, #37373b 0%, #2e3949 55%, #000000 100%)',
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
            Reliable Workers for Traffic Management and Civil Crews
          </h1>

          <p style={{
            fontSize: '1.0625rem',
            lineHeight: 1.75,
            color: 'rgba(255,255,255,0.8)',
            maxWidth: '650px',
            margin: '24px auto 0',
          }}>
            Specialising in traffic management staffing while also supplying dependable labourers when crews need extra hands on site.
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
              Your Specialised Partner for Traffic Management Staffing
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <p style={{ fontSize: '0.9375rem', lineHeight: 1.78, color: 'rgba(255,255,255,0.65)' }}>
                The Temp Company supports traffic management companies and civil contractors across Wellington, Canterbury and Marlborough with qualified, job-ready workers who turn up and get it done.
              </p>
              <p style={{ fontSize: '0.9375rem', lineHeight: 1.78, color: 'rgba(255,255,255,0.65)' }}>
                Traffic management is our core focus, and we also supply reliable labourers when crews need extra hands on site to keep projects moving.
              </p>
              <p style={{ fontSize: '0.9375rem', lineHeight: 1.78, color: 'rgba(255,255,255,0.65)' }}>
                Through our in-house training division, MW Training &amp; Planning, we ensure workers are trained to industry standards and ready for site from day one.
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
                The Temp Company operates as part of MW Group, working alongside Men at Work Traffic Management, MW Training &amp; Planning, SweepCo and QualCard to support the wider traffic management and civil infrastructure industry.
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
                    <Image src={image} alt={name} fill style={{ objectFit: 'contain', objectPosition: 'bottom' }} />
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
            Need Workers or Looking for Work?
          </h2>
          <p style={{
            fontSize: '1rem',
            lineHeight: 1.75,
            color: 'rgba(255,255,255,0.75)',
            maxWidth: '480px',
            margin: '0 auto 36px',
          }}>
            The Temp Company connects reliable workers with traffic management and civil crews when extra hands are needed.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '14px' }}>
            <a href="/request-staff" className="hero-btn-primary">Request Staff</a>
            <a href="/find-work/apply" className="hero-btn-secondary">Apply for Work</a>
          </div>
        </div>
      </section>

    </main>
  )
}
