'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, MapPin, ChevronRight } from 'lucide-react'
import RevealObserver from '../../components/RevealObserver'
import { branches } from '../../../data/branches'
import { brand } from '../../../config/brand'

export default function BranchPageClient({ slug }: { slug: string }) {
  const branch = branches.find((b) => b.slug === slug)!
  const { coordinator, structuredAddress, serviceAreas, coords } = branch
  const otherBranches = branches.filter((b) => b.slug !== slug)

  return (
    <main>
      <style>{`
        .branch-hero { min-height: 80vh; }
        .branch-hero-content { padding-bottom: clamp(140px, 14vw, 200px); }
        @media (max-width: 1279px) {
          .branch-hero { min-height: auto; }
          .branch-hero-content { padding-top: 180px; padding-bottom: 72px; }
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
        .branch-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 14px;
          padding: 32px 36px;
        }
        .branch-other-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          padding: 24px 28px;
          text-decoration: none;
          transition: border-color 0.2s ease, transform 0.2s ease;
        }
        .branch-other-link:hover {
          border-color: var(--brand-primary);
          transform: translateY(-2px);
        }
        .area-tag {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 6px;
          padding: 8px 16px;
          font-size: 0.9rem;
          color: var(--text-muted);
        }
      `}</style>

      <RevealObserver />

      {/* ── HERO ── */}
      <section className="branch-hero" style={{
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
        <div className="branch-hero-content max-w-4xl mx-auto" style={{
          position: 'relative', zIndex: 10,
          paddingLeft: '24px', paddingRight: '24px',
          paddingTop: 'clamp(170px, 15vw, 210px)',
          textAlign: 'center',
        }}>
          <p className="font-display" style={{
            fontWeight: 700,
            fontSize: '0.7rem',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.7)',
            marginBottom: '16px',
          }}>
            {branch.region}
          </p>

          <h1 className="font-display" style={{
            fontWeight: 700,
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            lineHeight: 1.15,
            textAlign: 'center',
            letterSpacing: '-0.03em',
            color: '#fff',
          }}>
            {brand.name} {branch.name}
          </h1>

          <p style={{
            fontSize: '1.0625rem',
            lineHeight: 1.75,
            color: 'rgba(255,255,255,0.8)',
            maxWidth: '650px',
            margin: '24px auto 0',
          }}>
            Temporary traffic management staffing and labour hire serving {serviceAreas.join(', ')}.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '14px', marginTop: '40px' }}>
            <Link href="/request-staff" className="hero-btn-primary">Request Staff</Link>
            <Link href="/find-work/apply" className="hero-btn-secondary">Apply for Work</Link>
          </div>
        </div>
      </section>

      {/* ── OVERLAP CONTENT ── */}
      <section className="hero-overlap-section">
        <div style={{ maxWidth: '1152px', margin: '0 auto' }}>

          {/* Intro panel */}
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
                About This Branch
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <p style={{ fontSize: '0.9375rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.62)' }}>
                  Our {branch.name} branch supplies qualified, job-ready traffic management workers and general labourers to contractors and traffic management companies across the {branch.region} region.
                </p>
                <p style={{ fontSize: '0.9375rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.62)' }}>
                  Whether you need certified TTM operatives, STMS personnel, or reliable general labour, our local team can have workers on site quickly.
                </p>
                <p style={{ fontSize: '0.9375rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.62)' }}>
                  Looking for work in {branch.name}? We are always on the lookout for reliable people to join our crew. No experience? No problem. We have opportunities for both qualified and unqualified workers, and we will train you up. Get in touch with our local team or apply online.
                </p>
              </div>
            </div>
          </div>

          {/* 2-column card row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8" style={{ alignItems: 'stretch' }}>

            {/* Left: coordinator + address */}
            <div className="branch-card" style={{ display: 'flex', flexDirection: 'column' }}>
              <p className="font-display" style={{
                fontWeight: 700,
                fontSize: '0.7rem',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--brand-primary)',
                marginBottom: '28px',
              }}>
                Your Local Contact
              </p>

              <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '28px' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '12px', overflow: 'hidden', flexShrink: 0, border: '2px solid rgba(255,255,255,0.1)' }}>
                  <Image
                    src={coordinator.image}
                    alt={coordinator.name}
                    width={64}
                    height={64}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div>
                  <p style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: '2px' }}>
                    {coordinator.name}
                  </p>
                  <p style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.55)' }}>
                    {coordinator.role}, {branch.name}
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '32px' }}>
                <a
                  href={`tel:${coordinator.phoneTel}`}
                  style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: 'var(--brand-primary)', fontSize: '0.9rem' }}
                >
                  <Phone size={15} strokeWidth={1.5} />
                  <span style={{ color: 'rgba(255,255,255,0.55)' }}>{coordinator.phone}</span>
                </a>
                <a
                  href={`mailto:${coordinator.email}`}
                  style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: 'var(--brand-primary)', fontSize: '0.9rem' }}
                >
                  <Mail size={15} strokeWidth={1.5} />
                  <span style={{ color: 'rgba(255,255,255,0.55)' }}>{coordinator.email}</span>
                </a>
              </div>

              {/* Divider */}
              <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)', marginBottom: '28px' }} />

              <p className="font-display" style={{
                fontWeight: 700,
                fontSize: '0.7rem',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--brand-primary)',
                marginBottom: '16px',
              }}>
                Branch Address
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <MapPin size={16} strokeWidth={1.5} style={{ color: 'var(--brand-primary)', flexShrink: 0 }} />
                <address style={{ fontStyle: 'normal', fontSize: '0.85rem', lineHeight: 1.5, color: 'rgba(255,255,255,0.55)' }}>
                  {structuredAddress.street} <span style={{ opacity: 0.4 }}>|</span> {structuredAddress.locality} <span style={{ opacity: 0.4 }}>|</span> {structuredAddress.region} {structuredAddress.postcode}
                </address>
              </div>

              {/* Map link */}
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${structuredAddress.street}, ${structuredAddress.locality}, ${structuredAddress.region}, New Zealand`)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  marginTop: 'auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  borderRadius: '10px',
                  padding: '14px',
                  border: '1px solid rgba(255,255,255,0.08)',
                  background: 'rgba(255,255,255,0.03)',
                  textDecoration: 'none',
                  color: 'var(--brand-primary)',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  transition: 'border-color 0.2s ease',
                }}
                onMouseOver={(e) => { e.currentTarget.style.borderColor = 'var(--brand-primary)' }}
                onMouseOut={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)' }}
              >
                <MapPin size={15} strokeWidth={1.5} />
                View on Google Maps
              </a>
            </div>

            {/* Right: services + areas */}
            <div className="branch-card" style={{ display: 'flex', flexDirection: 'column' }}>
              <p className="font-display" style={{
                fontWeight: 700,
                fontSize: '0.7rem',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--brand-primary)',
                marginBottom: '28px',
              }}>
                Areas We Serve
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '36px' }}>
                {serviceAreas.map((area) => (
                  <span key={area} className="area-tag">{area}</span>
                ))}
              </div>

              {branch.hiringRoles.length > 0 && (
                <>
                  <p className="font-display" style={{
                    fontWeight: 700,
                    fontSize: '0.7rem',
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    color: 'var(--brand-primary)',
                    marginBottom: '20px',
                  }}>
                    Roles We Supply
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '36px' }}>
                    {branch.hiringRoles.map((role) => (
                      <div key={role} style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                        <div style={{
                          flexShrink: 0,
                          width: '36px', height: '36px',
                          borderRadius: '8px',
                          background: 'rgba(252,212,21,0.12)',
                          border: '1px solid rgba(252,212,21,0.2)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          color: 'var(--brand-primary)',
                        }}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                          </svg>
                        </div>
                        <p style={{ fontSize: '0.9375rem', color: '#fff', fontWeight: 500 }}>{role}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* CTAs */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: 'auto' }}>
                <Link
                  href="/request-staff"
                  className="branch-cta-link"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    borderRadius: '10px',
                    padding: '14px',
                    border: '1px solid rgba(255,255,255,0.08)',
                    background: 'rgba(255,255,255,0.03)',
                    textDecoration: 'none',
                    color: 'var(--brand-primary)',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    transition: 'border-color 0.2s ease',
                  }}
                  onMouseOver={(e) => { e.currentTarget.style.borderColor = 'var(--brand-primary)' }}
                  onMouseOut={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)' }}
                >
                  <ChevronRight size={15} strokeWidth={1.5} />
                  Request Staff
                </Link>
                <Link
                  href="/find-work/apply"
                  className="branch-cta-link"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    borderRadius: '10px',
                    padding: '14px',
                    border: '1px solid rgba(255,255,255,0.08)',
                    background: 'rgba(255,255,255,0.03)',
                    textDecoration: 'none',
                    color: 'var(--brand-primary)',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    transition: 'border-color 0.2s ease',
                  }}
                  onMouseOver={(e) => { e.currentTarget.style.borderColor = 'var(--brand-primary)' }}
                  onMouseOut={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)' }}
                >
                  <ChevronRight size={15} strokeWidth={1.5} />
                  Apply for Work
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── OTHER BRANCHES ── */}
      <section style={{ background: '#1a1a1a', paddingTop: '56px', paddingBottom: '120px' }}>
        <div style={{ maxWidth: '1152px', margin: '0 auto', padding: '0 24px' }}>
          <div className="reveal" style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p className="font-display" style={{
              fontWeight: 700,
              fontSize: '0.7rem',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'var(--brand-primary)',
              marginBottom: '16px',
            }}>
              Our Other Branches
            </p>
            <h2 className="font-display" style={{
              fontWeight: 700,
              fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
              letterSpacing: '-0.03em',
              color: '#fff',
            }}>
              We also operate in
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{ maxWidth: '720px', margin: '0 auto' }}>
            {otherBranches.map((other, i) => (
              <Link
                key={other.slug}
                href={`/branches/${other.slug}`}
                className={`reveal d${i + 1} branch-other-link`}
              >
                <div>
                  <p style={{ fontSize: '1.0625rem', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>
                    {other.name}
                  </p>
                  <p style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.55)' }}>
                    {other.region}
                  </p>
                </div>
                <ChevronRight size={18} style={{ color: 'rgba(255,255,255,0.35)' }} />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
