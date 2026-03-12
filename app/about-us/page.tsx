import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, User } from 'lucide-react'
import RevealObserver from '../components/RevealObserver'
import LocationsMap from '../components/LocationsMap'
import Timeline from '../components/about/Timeline'
import { brand } from '../../config/brand'
import { site } from '../../config/site'
import { team } from '../../data/team'

export const metadata: Metadata = {
  title: `About Us | ${brand.name}`,
  description: `Learn about ${brand.name} and our leadership team.`,
  alternates: {
    canonical: '/about',
  },
}

/* ── Data ── */

const groupEntities = [
  {
    name: 'Partner Company One',
    headline: 'Specialist planning, design, and industry training services.',
    body: 'We design compliant plans and deliver practical training to support safe, professional worksites.',
    href: '#',
  },
  {
    name: 'Partner Company Two',
    headline: 'Flexible workforce solutions supporting civil, infrastructure, and construction sectors.',
    body: 'We connect skilled, vetted workers with the right opportunities, quickly and reliably.',
    href: '#',
  },
  {
    name: 'Partner Company Three',
    headline: 'Professional site services for construction, industrial, and public spaces.',
    body: 'From post-construction clean-ups to ongoing site maintenance, keeping surfaces safe and operational.',
    href: '#',
  },
  {
    name: 'Partner Company Four',
    headline: 'A digital qualification management platform built for the industry.',
    body: 'Streamlines compliance tracking, certification management, and workforce verification, all in one place.',
    href: '#',
  },
]

const seniorTeam = team.filter(m => m.group === 'senior')
const leadershipTeam = team.filter(m => m.group === 'leadership')

/* ── Page ── */

export default function AboutUsPage() {
  return (
    <>
      <RevealObserver />

      {/* ── HERO ── */}
      <section
        style={{
          position: 'relative',
          background: '#252528',
          paddingTop: '180px',
          paddingBottom: '80px',
          overflow: 'hidden',
        }}
        aria-label="About Us hero"
      >
        <div style={{ position: 'absolute', top: '-100px', left: '50%', transform: 'translateX(-50%)', width: '700px', height: '700px', background: 'radial-gradient(circle, rgba(252,212,21,0.07) 0%, transparent 65%)', pointerEvents: 'none' }} aria-hidden="true" />


        <div style={{ position: 'relative', zIndex: 10, maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div className="reveal" style={{ marginBottom: '20px' }}>
            <span className="eyebrow">Who We Are</span>
          </div>
          <h1 className="reveal d1 font-display" style={{ fontWeight: 700, fontSize: 'clamp(2.4rem,5vw,4.5rem)', lineHeight: 1.05, letterSpacing: '-0.03em', color: '#fff' }}>
            About {brand.name}
          </h1>
          <p className="reveal d2 font-display" style={{ fontWeight: 600, fontSize: 'clamp(1rem,2vw,1.3rem)', letterSpacing: '-0.01em', color: 'var(--text-light)', marginTop: '20px' }}>
            Built on hard work. Grown on trust.
          </p>
          <p className="reveal d3" style={{ fontSize: '1rem', lineHeight: 1.78, color: 'var(--text-muted)', maxWidth: '540px', marginTop: '20px' }}>
            {brand.name} has grown from an owner-operated business into a multi-division group delivering {site.primaryService.toLowerCase()}, planning, and consultancy services across {site.serviceArea}.
          </p>
        </div>
      </section>

      {/* ── BEGINNINGS ── */}
      <section style={{ background: 'var(--bg-dark)', padding: '100px 0' }} aria-label="Our beginnings">
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div className="two-col-grid">

            <div>
              <div className="reveal">
                <span className="eyebrow">Our Beginnings</span>
                <h2 className="section-title" style={{ fontSize: 'clamp(1.8rem,3.5vw,3rem)', color: '#fff', marginTop: '8px' }}>
                  How We Started
                </h2>
                <div className="orange-rule" style={{ marginTop: '16px' }} />
              </div>
              <p className="reveal d1" style={{ fontSize: '1rem', lineHeight: 1.78, color: 'var(--text-muted)', marginTop: '24px', maxWidth: '540px' }}>
                {brand.name} was founded by hands-on owner-operators who built the business through strong leadership, experienced teams, and long-term client relationships.
              </p>
              <p className="reveal d2" style={{ fontSize: '1rem', lineHeight: 1.78, color: 'var(--text-muted)', marginTop: '16px', maxWidth: '540px' }}>
                Today, {brand.name} operates across multiple regions with a reputation for practical, dependable {site.primaryService.toLowerCase()} across civil, infrastructure, and event projects.
              </p>
            </div>

            <div className="reveal d1">
              <div style={{
                width: '100%',
                aspectRatio: '4/3',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
                background: 'var(--bg-mid)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <User size={80} strokeWidth={1} style={{ color: 'rgba(255,255,255,0.1)' }} aria-hidden="true" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section style={{ background: 'var(--off-white)', borderTop: '1px solid rgba(55,55,59,0.06)', borderBottom: '1px solid rgba(55,55,59,0.06)' }} aria-label="Company history">
        <Timeline />
      </section>

      {/* ── LOCATIONS ── */}
      <section style={{ background: '#252528', padding: '80px 0', borderTop: '1px solid rgba(255,255,255,0.04)' }} aria-label="Our locations">
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>

          <div style={{ marginBottom: '40px' }}>
            <div className="reveal" style={{ marginBottom: '10px' }}>
              <span className="eyebrow">Where We Operate</span>
            </div>
            <h2 className="section-title reveal d1" style={{ fontSize: 'clamp(1.8rem,3.5vw,3rem)', color: '#fff' }}>
              Five Branches. One Standard.
            </h2>
            <div className="orange-rule reveal d2" style={{ marginTop: '16px' }} />
            <p className="reveal d3" style={{ marginTop: '20px', fontSize: '1.05rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.65)', maxWidth: '480px' }}>
              Five branches across New Zealand, delivering the same professional standard on every site.
            </p>
          </div>

          <div className="reveal d1">
            <LocationsMap />
          </div>

        </div>
      </section>

      {/* ── LEADERSHIP ── */}
      <section style={{ background: 'var(--off-white)', padding: '100px 0', borderTop: '1px solid rgba(55,55,59,0.06)' }} aria-label="Leadership team">
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>

          <div style={{ marginBottom: '60px' }}>
            <div className="reveal" style={{ marginBottom: '10px' }}>
              <span className="eyebrow">Our People</span>
            </div>
            <h2 className="section-title reveal d1" style={{ fontSize: 'clamp(1.8rem,3.5vw,3rem)', color: 'var(--bg-dark)' }}>
              Leadership
            </h2>
            <div className="orange-rule reveal d2" style={{ marginTop: '16px' }} />
            <p className="reveal d3" style={{ fontSize: '1rem', lineHeight: 1.78, color: 'var(--text-muted)', maxWidth: '480px', marginTop: '20px' }}>
              Experienced leadership across operations, regions, compliance, and growth.
            </p>
          </div>

          {/* Row 1 — Senior Leadership */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4" style={{ marginBottom: '16px' }}>
            <div style={{ background: 'rgba(252,212,21,0.04)', border: '1px solid rgba(226,226,226,0.9)', borderLeft: '4px solid var(--brand-primary)', borderRadius: '2px', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '24px 20px', boxShadow: 'inset 4px 0 12px rgba(252,212,21,0.06)' }}>
              <p className="font-display" style={{ fontWeight: 700, fontSize: '1.125rem', color: 'var(--bg-dark)', lineHeight: 1.3, marginBottom: '8px' }}>Senior Leadership Team</p>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>Executive leadership of the group</p>
            </div>
            {seniorTeam.map(({ name, title, titleShort, region, photo }, i) => (
              <div key={name} className={`team-card reveal d${i + 1}`} style={{ background: '#fff', border: '1px solid rgba(252,212,21,0.2)', borderRadius: '2px', overflow: 'hidden' }}>
                <div className="leadership-img-wrap" style={{ position: 'relative', width: '100%', aspectRatio: '1', background: 'var(--text-light)', borderBottom: '2px solid var(--brand-primary)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {photo ? (
                    <Image src={photo} alt={name} fill style={{ objectFit: 'cover', objectPosition: 'center top' }} sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1280px) 33vw, 260px" />
                  ) : (
                    <User size={48} strokeWidth={1.5} aria-hidden="true" style={{ color: 'var(--text-muted)' }} />
                  )}
                </div>
                <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <p className="font-display" style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--bg-dark)', lineHeight: 1.3 }}>{name}</p>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>
                    {titleShort ? <><span className="lg:hidden">{titleShort}</span><span className="hidden lg:inline">{title}</span></> : title}
                    {region && <><br />{region}</>}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Row 2 — Leadership Team */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <div style={{ background: 'rgba(252,212,21,0.04)', border: '1px solid rgba(226,226,226,0.9)', borderLeft: '4px solid var(--brand-primary)', borderRadius: '2px', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '24px 20px', boxShadow: 'inset 4px 0 12px rgba(252,212,21,0.06)' }}>
              <p className="font-display" style={{ fontWeight: 700, fontSize: '1.125rem', color: 'var(--bg-dark)', lineHeight: 1.3, marginBottom: '8px' }}>Leadership Team</p>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>Regional and operational management across branches</p>
            </div>
            {leadershipTeam.map(({ name, title, titleShort, region, photo }, i) => (
              <div key={name} className={`team-card reveal d${i + 1}`} style={{ background: '#fff', border: '1px solid rgba(252,212,21,0.2)', borderRadius: '2px', overflow: 'hidden' }}>
                <div className="leadership-img-wrap" style={{ position: 'relative', width: '100%', aspectRatio: '1', background: 'var(--text-light)', borderBottom: '2px solid var(--brand-primary)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {photo ? (
                    <Image src={photo} alt={name} fill style={{ objectFit: 'cover', objectPosition: 'center top' }} sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1280px) 33vw, 260px" />
                  ) : (
                    <User size={48} strokeWidth={1.5} aria-hidden="true" style={{ color: 'var(--text-muted)' }} />
                  )}
                </div>
                <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <p className="font-display" style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--bg-dark)', lineHeight: 1.3 }}>{name}</p>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>
                    {titleShort ? <><span className="lg:hidden">{titleShort}</span><span className="hidden lg:inline">{title}</span></> : title}
                    {region && <><br />{region}</>}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── MORE THAN TRAFFIC ── */}
      <section style={{ background: '#252528', padding: '100px 0' }} aria-label="Group services">
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>

          <div style={{ marginBottom: '80px' }}>
            <div className="reveal" style={{ marginBottom: '10px' }}>
              <span className="eyebrow">Our Group</span>
            </div>
            <h2 className="section-title reveal d1" style={{ fontSize: 'clamp(1.8rem,3.5vw,3rem)', color: '#fff' }}>
              More Than {site.primaryService}
            </h2>
            <div className="orange-rule reveal d2" style={{ marginTop: '16px' }} />
            <p className="reveal d3" style={{ fontSize: '1rem', lineHeight: 1.78, color: 'var(--text-muted)', maxWidth: '600px', marginTop: '20px' }}>
              While {site.primaryService.toLowerCase()} remains our core service, our group delivers broader capability across planning, training, workforce supply, and digital compliance.
            </p>
          </div>

          {/* 2×2 card grid */}
          <div className="group-grid">
            {groupEntities.map(({ name, headline, body, href }, i) => (
              <div
                key={name}
                className={`group-card reveal d${(i % 2) + 1}`}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  background: 'var(--bg-elevated)',
                  borderRadius: '2px',
                }}
              >
                <p className="font-display" style={{ fontWeight: 700, fontSize: '1.2rem', color: '#fff', marginBottom: '8px' }}>{name}</p>

                <p className="group-card-headline text-[var(--text-muted)] md:text-white text-base md:text-lg font-[400] md:font-[600] leading-relaxed max-w-[520px]" style={{ marginTop: '16px' }}>
                  {headline}
                </p>

                <p className="group-card-body" style={{ fontSize: '0.875rem', lineHeight: 1.78, color: 'var(--text-muted)', marginTop: '10px', flexGrow: 1 }}>
                  {body}
                </p>

                <a href={href} target="_blank" rel="noopener noreferrer" className="group-card-cta" style={{ marginTop: '14px' }}>
                  Visit Site
                  <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
                </a>
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
              Ready to work with a team that delivers?
            </h2>
            <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.88)', maxWidth: '480px', margin: '20px auto 0', lineHeight: 1.72 }}>
              Get in touch with our team and let&apos;s talk about your project.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '14px', marginTop: '36px' }}>
              <Link href="/contact" className="btn-white">
                Get in Touch
                <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </>
  )
}
