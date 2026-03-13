'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail } from 'lucide-react'
import { brand } from '../../config/brand'
import { site } from '../../config/site'
import { branches } from '../../data/branches'
import { services } from '../../data/services'

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
              Reliable temporary staffing solutions built on trust, responsiveness, and performance.
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
                  {label === 'Instagram' && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" aria-hidden="true">
                      <rect x="2" y="2" width="20" height="20" rx="5"/>
                      <circle cx="12" cy="12" r="4"/>
                      <circle cx="17.5" cy="6.5" r="0.5" fill="var(--text-muted)"/>
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
              {services.map(({ id, title }) => (
                <li key={id}><a href={`/#${id}`} className="footer-link">{title}</a></li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div>
            <div className="footer-heading">Branches</div>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '11px', listStyle: 'none' }}>
              {branches.map(({ name, slug }) => (
                <li key={slug}>
                  <span className="footer-link" style={{ cursor: 'default' }}>{name}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div className="footer-heading">Contact</div>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '14px', listStyle: 'none' }}>
              <li>
                <a href={`tel:${brand.phoneTel}`} style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: 'var(--brand-primary)' }}>
                  <Phone size={15} strokeWidth={1.5} aria-hidden="true" />
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{brand.phone}</span>
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
            <a href="/privacy" className="footer-link" style={{ fontSize: '0.78rem' }}>Privacy Policy</a>
            <a href="/terms" className="footer-link" style={{ fontSize: '0.78rem' }}>Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  )
}
