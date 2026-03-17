'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { brand } from '../../config/brand'

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

  const isHome = pathname === '/'

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(href + '/')

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/hire-staff', label: 'Hire Staff' },
    { href: '/find-work', label: 'Find Work' },
    { href: '/about-us', label: 'About' },
    { href: '/contact', label: 'Contact' },
    { href: '/find-work/apply', label: 'App Form' },
    { href: '/request-staff', label: 'Req Staff' },
    { href: '/induction', label: 'Induction' },
  ]

  return (
    <nav id="navbar" className={[scrolled ? 'scrolled' : '', isHome ? 'home' : ''].filter(Boolean).join(' ')} role="navigation" aria-label="Main navigation">
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '96px' }}>

        {/* Left spacer on homepage keeps logo visually centred */}
        {isHome ? (
          <div style={{ width: '32px' }} aria-hidden="true" />
        ) : null}

        {/* Logo */}
        <Link href="/" style={{ flexShrink: 0, display: 'flex', alignItems: 'center', ...(isHome && { position: 'absolute', left: '50%', transform: 'translateX(-50%)' }) }}>
          <Image
            src={brand.logoPath}
            alt={brand.name}
            width={brand.logoWidth}
            height={brand.logoHeight}
            quality={100}
            style={{ height: '56px', width: 'auto' }}
            priority
          />
        </Link>

        {/* Desktop links — hidden on homepage */}
        {!isHome && (
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map(({ href, label }) => (
              <Link key={href} href={href} className={`nav-link${isActive(href) ? ' active' : ''}`}>
                {label}
              </Link>
            ))}
          </div>
        )}

        {/* Hamburger — always visible on homepage, mobile-only on other pages */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button
            id="ham-btn"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            className={`${isHome ? 'flex' : 'lg:hidden flex'} flex-col items-center justify-center gap-1.5`}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
          >
            <span ref={h1Ref} className="block w-6 h-[2px] bg-white" style={{ transition: 'transform 0.2s ease, opacity 0.2s ease' }} />
            <span ref={h2Ref} className="block w-6 h-[2px] bg-white" style={{ transition: 'opacity 0.2s ease' }} />
            <span ref={h3Ref} className="block w-6 h-[2px] bg-white" style={{ transition: 'transform 0.2s ease' }} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div id="mobile-menu" className={`fixed right-4 top-[104px] z-40 ${menuOpen ? 'open' : ''}`} style={{ width: '220px', background: 'var(--color-bg-section)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: '10px', boxShadow: '0 8px 32px rgba(0,0,0,0.45)', overflow: 'hidden' }}>
        <div style={{ padding: '12px 0', display: 'flex', flexDirection: 'column' }}>
          {navLinks.map(({ href, label }, i) => (
            <Link
              key={href}
              href={href}
              className="nav-link"
              style={{ fontSize: '0.9rem', padding: '10px 20px', borderBottom: i < navLinks.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none', display: 'block' }}
              onClick={closeMenu}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
