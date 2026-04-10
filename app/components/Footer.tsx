'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail } from 'lucide-react'
import { brand } from '../../config/brand'
import { branches } from '../../data/branches'

export default function Footer() {
  return (
    <footer id="footer">
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '64px 24px 32px' }}>

        {/* Top grid */}
        <div className="footer-top-grid">

          {/* Brand */}
          <div>
            <Image
              src={brand.logoPath}
              alt={brand.name}
              width={150}
              height={36}
              style={{ height: '36px', width: 'auto', marginBottom: '16px' }}
            />
            <p style={{ fontSize: '0.9375rem', color: 'var(--text-muted)', lineHeight: 1.72, maxWidth: '280px' }}>
              Reliable permanent and temporary staffing solutions built on trust, relationships, and performance.
            </p>
            <div style={{ display: 'flex', gap: '10px', marginTop: '24px' }}>
              {[
                { label: 'Facebook', href: brand.social.facebook },
                { label: 'LinkedIn', href: brand.social.linkedin },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  style={{ width: '36px', height: '36px', background: 'var(--bg-mid)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'border-color 0.2s ease' }}
                  onMouseOver={e => (e.currentTarget.style.borderColor = 'var(--brand-primary)')}
                  onMouseOut={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)')}
                >
                  {label === 'Facebook' && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--text-muted)" aria-hidden="true">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                    </svg>
                  )}
                  {label === 'LinkedIn' && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" aria-hidden="true">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                      <rect x="2" y="9" width="4" height="12"/>
                      <circle cx="4" cy="4" r="2"/>
                    </svg>
                  )}

                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <div className="footer-heading">Services</div>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '11px', listStyle: 'none' }}>
              <li><a href="/request-staff" className="footer-link">Request Staff</a></li>
              <li><a href="/find-talent" className="footer-link">Find Talent</a></li>
              <li><a href="/find-work/apply" className="footer-link">Apply for Work</a></li>
            </ul>
          </div>

          {/* Locations */}
          <div>
            <div className="footer-heading">Branches</div>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '11px', listStyle: 'none' }}>
              {branches.map(({ name, slug }) => (
                <li key={slug}>
                  <a href={`/branches/${slug}`} className="footer-link">{name}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div className="footer-heading">Contact</div>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '14px', listStyle: 'none' }}>
              <li>
                <a href="/contact#coordinators" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: 'var(--brand-primary)' }}>
                  <Phone size={15} strokeWidth={1.5} aria-hidden="true" />
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Call your co-ordinator</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${brand.emailContact}`} style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: 'var(--brand-primary)' }}>
                  <Mail size={15} strokeWidth={1.5} aria-hidden="true" />
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{brand.emailContact}</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div style={{ paddingTop: '28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>© {brand.copyright}</p>
          <div style={{ display: 'flex', gap: '24px' }}>
            <a href="/terms" className="footer-link" style={{ fontSize: '0.78rem' }}>Terms and Conditions</a>
          </div>
        </div>

      </div>
    </footer>
  )
}
