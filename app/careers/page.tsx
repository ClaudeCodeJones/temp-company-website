import type { Metadata } from 'next'
import { ShieldCheck, Users, TrendingUp, GraduationCap, Award, MapPin, ArrowRight } from 'lucide-react'
import RevealObserver from '../components/RevealObserver'
import CareerPath from '../components/careers/CareerPath'
import BranchHiringCard from '../components/careers/BranchHiringCard'
import ApplicationSection from '../components/careers/ApplicationSection'
import { brand } from '../../config/brand'
import { site } from '../../config/site'
import { branches } from '../../data/branches'

export const metadata: Metadata = {
  title: `Careers | ${brand.name}`,
  description: `Join the ${brand.name} team. View current openings and apply today.`,
  alternates: {
    canonical: '/careers',
  },
}

const benefits = [
  {
    icon: ShieldCheck,
    title: 'Safe by Default',
    body: 'Safety is not a box we tick. It is how every team member works, from day one.',
  },
  {
    icon: Users,
    title: 'Real Teams',
    body: 'Work alongside experienced crews who support your development.',
  },
  {
    icon: TrendingUp,
    title: 'Grow With Us',
    body: 'Clear pathways from TTM to STMS, Lead STMS, and beyond.',
  },
  {
    icon: GraduationCap,
    title: 'Training Provided',
    body: 'In-house training that builds real qualifications and site experience.',
  },
  {
    icon: Award,
    title: 'Industry Leadership',
    body: 'Trusted by contractors across the region for professional traffic management.',
  },
  {
    icon: MapPin,
    title: 'Five Locations',
    body: `Opportunities across our branches in ${site.serviceArea}.`,
  },
]

export default function CareersPage() {
  return (
    <>
      <RevealObserver />

      {/* ── HERO ── */}
      <section
        style={{
          position: 'relative',
          background: '#070f1b',
          paddingTop: '180px',
          paddingBottom: '100px',
          overflow: 'hidden',
        }}
        aria-label="Careers hero"
      >
        <div style={{ position: 'absolute', top: '-100px', left: '50%', transform: 'translateX(-50%)', width: '700px', height: '700px', background: 'radial-gradient(circle, rgba(242,101,34,0.07) 0%, transparent 65%)', pointerEvents: 'none' }} aria-hidden="true" />


        <div style={{ position: 'relative', zIndex: 10, maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div className="reveal" style={{ marginBottom: '20px' }}>
            <span className="eyebrow">Join the Team</span>
          </div>
          <h1 className="reveal d1 font-display" style={{ fontWeight: 700, fontSize: 'clamp(2.4rem,5vw,4.5rem)', lineHeight: 1.05, letterSpacing: '-0.03em', color: '#fff' }}>
            Build a Career in Traffic
          </h1>
          <p className="reveal d2 font-display" style={{ fontWeight: 600, fontSize: 'clamp(1rem,2vw,1.3rem)', letterSpacing: '-0.01em', color: 'var(--text-light)', marginTop: '20px' }}>
            Real work. Solid teams. A clear path forward.
          </p>
          <p className="reveal d3" style={{ fontSize: '1rem', lineHeight: 1.78, color: 'var(--text-muted)', maxWidth: '540px', marginTop: '20px' }}>
            {brand.name} has been building teams across {site.serviceArea}. We look for people who take safety seriously, show up, and want to grow in a hands-on industry.
          </p>
          <div className="reveal d4" style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', marginTop: '40px' }}>
            <a href="#apply" className="btn-orange">
              Apply Now
              <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" />
            </a>
            <a href="#openings" className="btn-ghost">
              View Openings
            </a>
          </div>
        </div>
      </section>

      {/* ── BEFORE YOU APPLY ── */}
      <section style={{ background: 'var(--bg-elevated)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '72px 0' }} aria-label="Before you apply">
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
          <div className="reveal" style={{ marginBottom: '24px' }}>
            <span className="eyebrow">Before You Apply</span>
          </div>
          <p className="reveal d1" style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--text-light)', marginBottom: '24px' }}>
            We are always looking for great people, whether you are already qualified or just starting out. Traffic management offers a clear career pathway, and we support our team to develop and progress.
            <br /><br />
            Before applying, please ensure you meet the basic requirements below.
          </p>
          <div className="reveal d2" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(420px, 100%), 1fr))', gap: '20px', marginBottom: '28px' }}>
            {[
              {
                label: 'Right to Work',
                body: 'You must hold a working holiday visa or have the legal right to work in New Zealand.',
                icon: (
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                    <rect x="4" y="7" width="24" height="18" rx="2" stroke="currentColor" strokeWidth="1.8"/>
                    <circle cx="11" cy="14" r="3" stroke="currentColor" strokeWidth="1.8"/>
                    <path d="M5 22c1.5-3 4-4 6-4s4.5 1 6 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                    <path d="M20 13h5M20 17h3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                  </svg>
                ),
              },
              {
                label: 'Drug Testing',
                body: 'All successful applicants are required to pass a pre-employment drug and alcohol test.',
                icon: (
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                    <path d="M13 4h6M16 4v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                    <path d="M11 8h10l2 4v12a2 2 0 01-2 2H11a2 2 0 01-2-2V12l2-4z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
                    <path d="M9 16h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                    <circle cx="14" cy="21" r="1.5" fill="currentColor" opacity="0.5"/>
                    <circle cx="18" cy="21" r="1.5" fill="currentColor" opacity="0.5"/>
                  </svg>
                ),
              },
              {
                label: 'Licence Requirement',
                body: 'A minimum Restricted Class 1 (car) licence is required. A Full Class 1 is preferred.',
                icon: (
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                    <rect x="3" y="8" width="26" height="16" rx="2" stroke="currentColor" strokeWidth="1.8"/>
                    <circle cx="10" cy="16" r="3" stroke="currentColor" strokeWidth="1.8"/>
                    <path d="M16 13h8M16 17h6M16 21h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                  </svg>
                ),
              },
              {
                label: 'Criminal Checks',
                body: 'All successful applicants may be subject to Ministry of Justice criminal history checks, which may affect employment eligibility.',
                icon: (
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                    <path d="M16 3L5 7v9c0 6 5 10 11 13 6-3 11-7 11-13V7L16 3z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
                    <path d="M11 16l3.5 3.5 6.5-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ),
              },
            ].map(({ label, body, icon }) => (
              <div key={label} style={{ padding: '24px 28px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderLeft: '3px solid var(--brand-primary)', borderRadius: '2px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px' }}>
                <div>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--brand-primary)', marginBottom: '8px' }}>{label}</p>
                  <p style={{ fontSize: '0.875rem', lineHeight: 1.65, color: 'var(--text-muted)' }}>{body}</p>
                </div>
                <div style={{ color: 'rgba(255,255,255,0.25)', flexShrink: 0, marginTop: '2px' }}>{icon}</div>
              </div>
            ))}
          </div>
          <p className="reveal d3" style={{ fontSize: '0.875rem', lineHeight: 1.72, color: 'var(--text-muted)', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '20px' }}>
            Applications that do not meet the criteria above may not receive a response.
          </p>
        </div>
      </section>

      {/* ── WHY WORK WITH US ── */}
      <section style={{ background: 'var(--bg-dark)', padding: '100px 0' }} aria-label="Why work with us">
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '60px', alignItems: 'start' }} className="two-col-grid">

            {/* Left: heading + intro */}
            <div className="reveal">
              <div style={{ marginBottom: '10px' }}>
                <span className="eyebrow">Why {brand.shortName}</span>
                </div>
              <h2 className="section-title" style={{ fontSize: 'clamp(1.8rem,3.5vw,3rem)', color: '#fff', marginTop: '8px' }}>
                Why Join {brand.name}
              </h2>
              <div className="orange-rule" style={{ marginTop: '16px' }} />
              <p style={{ fontSize: '1rem', lineHeight: 1.78, color: 'var(--text-muted)', marginTop: '24px', maxWidth: '440px' }}>
                Join a team that values safety, experience, and real career progression.
              </p>
            </div>

            {/* Right: feature list */}
            <div className="benefits-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '28px 40px' }}>
              {benefits.map(({ icon: Icon, title, body }, i) => (
                <div key={title} className={`reveal d${(i % 3) + 1}`} style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'rgba(242,101,34,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon size={20} color="var(--brand-primary)" strokeWidth={2} aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-display" style={{ fontWeight: 600, fontSize: '1rem', color: '#fff', marginBottom: '6px' }}>{title}</h3>
                    <p style={{ fontSize: '0.875rem', lineHeight: 1.7, color: 'var(--text-muted)' }}>{body}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── CAREER PATH ── */}
      <section style={{ background: 'var(--off-white)', padding: '112px 0 100px' }} aria-label="Career path">
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>

          <div style={{ maxWidth: '672px', marginBottom: '60px' }}>
            <div className="reveal" style={{ marginBottom: '10px' }}>
              <span className="eyebrow">Your Path</span>
            </div>
            <h2 className="section-title reveal d1" style={{ fontSize: 'clamp(1.8rem,3.5vw,3rem)', color: 'var(--bg-dark)' }}>
              Build a Career with Us
            </h2>
            <div className="orange-rule reveal d2" style={{ marginTop: '16px' }} />
            <p className="reveal d3" style={{ fontSize: '1rem', lineHeight: 1.78, color: '#5a6a7a', marginTop: '20px' }}>
              Most of our managers started on the tools. We build careers, not just rosters.
            </p>
          </div>

          <CareerPath />

        </div>
      </section>

      {/* ── CURRENT OPENINGS ── */}
      <section id="openings" style={{ background: 'var(--bg-dark)', padding: '100px 0' }} aria-label="Current openings">
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>

          <div style={{ marginBottom: '60px' }}>
            <div className="reveal" style={{ marginBottom: '10px' }}>
              <span className="eyebrow">Current Openings</span>
            </div>
            <h2 className="section-title reveal d1" style={{ fontSize: 'clamp(1.8rem,3.5vw,3rem)', color: '#fff' }}>
              Where We Are Hiring
            </h2>
            <div className="orange-rule reveal d2" style={{ marginTop: '16px' }} />
            <p className="reveal d3" style={{ fontSize: '1rem', lineHeight: 1.78, color: 'var(--text-muted)', maxWidth: '520px', marginTop: '20px' }}>
              We only accept applications for the roles listed below at each branch. Applications for any other positions will not be considered and may not be acknowledged.
            </p>
          </div>

          <div style={{ marginBottom: '32px', padding: '24px', background: 'rgba(242,101,34,0.06)', border: '1px solid rgba(242,101,34,0.15)', borderLeft: '3px solid var(--brand-primary)', borderRadius: '2px' }}>
            <p className="font-display" style={{ fontWeight: 600, fontSize: '0.9rem', color: '#fff', marginBottom: '8px' }}>
              Casual Roles
            </p>
            <p style={{ fontSize: '0.85rem', lineHeight: 1.65, color: 'var(--text-muted)', marginBottom: '10px' }}>
              Entry-level roles are often hired on a casual basis. Casual work can provide a pathway into full-time positions as they become available.
            </p>
            <p style={{ fontSize: '0.85rem', lineHeight: 1.65, color: 'var(--text-muted)' }}>
              We only accept applications for the roles listed at each branch. Applications for unlisted positions may not be acknowledged.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {[...branches].sort((a, b) => ({ hiring: 0, limited: 1, closed: 2 }[a.hiringStatus] ?? 3) - ({ hiring: 0, limited: 1, closed: 2 }[b.hiringStatus] ?? 3)).map((item, i) => (
              <div key={item.slug} className={`reveal d${(i % 4) + 1}`}>
                <BranchHiringCard item={item} />
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── APPLICATION FORM ── */}
      <ApplicationSection />

    </>
  )
}
