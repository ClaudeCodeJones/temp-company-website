'use client'

import { useEffect, useRef } from 'react'

export default function WorksiteBanner() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const isMobile = () => window.innerWidth <= 768

    const update = () => {
      if (!sectionRef.current || !bgRef.current) return
      if (isMobile()) {
        bgRef.current.style.transform = 'translateY(0)'
        return
      }
      const rect = sectionRef.current.getBoundingClientRect()
      const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height)
      const offset = (progress - 0.5) * rect.height * 0.22
      bgRef.current.style.transform = `translateY(${offset}px)`
    }

    const onScroll = () => {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(update)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    update()

    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div ref={sectionRef} className="worksite-banner">
      <div ref={bgRef} className="worksite-banner-bg" />
      <div className="worksite-banner-overlay" />
    </div>
  )
}
