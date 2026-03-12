'use client'

import { useEffect } from 'react'

export default function RevealObserver() {
  useEffect(() => {
    const revealEls = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') })
      },
      { threshold: 0.08, rootMargin: '0px 0px -32px 0px' }
    )
    revealEls.forEach(el => observer.observe(el))

    // Immediately reveal above-fold elements
    requestAnimationFrame(() => {
      revealEls.forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight) {
          el.classList.add('visible')
        }
      })
    })

    return () => observer.disconnect()
  }, [])

  return null
}
