'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { ArrowRight } from 'lucide-react'
import { brand } from '../../config/brand'
import { site } from '../../config/site'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const h1Ref = useRef<HTMLSpanElement>(null)
  const h2Ref = useRef<HTMLSpanElement>(null)
  const h3Ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = () => {
    setMenuOpen(false)
    if (h1Ref.current && h2Ref.current && h3Ref.current) {
      h1Ref.current.style.transform = ''
      h2Ref.current.style.opacity = '1'
      h3Ref.current.style.transform = ''
    }
  }

  const toggleMenu = () => {
    const next = !menuOpen
    setMenuOpen(next)
    if (h1Ref.current && h2Ref.current && h3Ref.current) {
      if (next) {
        h1Ref.current.style.transform = 'translateY(7px) rotate(45deg)'
        h2Ref.current.style.opacity = '0'
        h3Ref.current.style.transform = 'translateY(-7px) rotate(-45deg)'
      } else {
        h1Ref.current.style.transform = ''
        h2Ref.current.style.opacity = '1'
        h3Ref.current.style.transform = ''
      }
    }
  }

  const isActive = (href: string) => pathname === href

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about-us', label: 'About Us' },
    ...(site.hasCareersPage ? [{ href: '/careers', label: 'Careers', scrollTop: true }] : []),
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <nav id="navbar" className={scrolled ? 'scrolled' : ''} role="navigation" aria-label="Main navigation">
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '96px' }}>

        {/* Logo */}
        <Link href="/" style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
          <Image
            src={brand.logoPath}
            alt={brand.name}
            width={brand.logoWidth}
            height={brand.logoHeight}
            style={{ height: '74px', width: 'auto' }}
            priority
          />
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map(({ href, label, scrollTop }) => (
            <Link key={href} href={href} className={`nav-link${isActive(href) ? ' active' : ''}`} onClick={scrollTop ? () => window.scrollTo({ top: 0 }) : undefined}>
              {label}
            </Link>
          ))}
        </div>

        {/* CTA + hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {site.hasQuoteForm && (
            <div id="hdrcta-wrap">
              <Link id="hdrcta" href="/estimate" className="btn-orange" style={{ fontSize: '0.8rem', padding: '10px 20px' }}>
                Get an Estimate
                <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
              </Link>
            </div>
          )}
          <button
            id="ham-btn"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            className="lg:hidden flex flex-col items-center justify-center gap-1.5"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
          >
            <span ref={h1Ref} className="block w-6 h-[2px] bg-white" style={{ transition: 'transform 0.2s ease, opacity 0.2s ease' }} />
            <span ref={h2Ref} className="block w-6 h-[2px] bg-white" style={{ transition: 'opacity 0.2s ease' }} />
            <span ref={h3Ref} className="block w-6 h-[2px] bg-white" style={{ transition: 'transform 0.2s ease' }} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div id="mobile-menu" className={`fixed left-0 right-0 top-[96px] w-full max-w-full overflow-x-hidden z-40 ${menuOpen ? 'open' : ''}`} style={{ background: 'var(--bg-mid)', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {navLinks.map(({ href, label, scrollTop }, i) => (
            <Link
              key={href}
              href={href}
              className="nav-link"
              style={{ fontSize: '1rem', padding: '8px 0', borderBottom: i < navLinks.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}
              onClick={() => { closeMenu(); if (scrollTop) window.scrollTo({ top: 0 }) }}
            >
              {label}
            </Link>
          ))}
          {site.hasQuoteForm && (
            <Link id="mobcta" href="/estimate" className="lg:hidden btn-orange w-full" style={{ textAlign: 'center', marginTop: '8px' }} onClick={closeMenu}>
              Get an Estimate
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}
