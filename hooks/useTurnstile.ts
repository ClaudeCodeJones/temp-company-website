'use client'

import { useRef, useEffect } from 'react'

declare global {
  interface Window {
    turnstile: {
      render: (container: HTMLElement, params: Record<string, unknown>) => string
      execute: (widgetId: string) => void
      reset: (widgetId: string) => void
    }
  }
}

export function useTurnstile() {
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string>('')
  const callbackRef = useRef<((token: string) => void) | null>(null)

  useEffect(() => {
    const init = () => {
      if (!containerRef.current || widgetIdRef.current) return
      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!,
        size: 'invisible',
        callback: (token: string) => {
          callbackRef.current?.(token)
          callbackRef.current = null
        },
      })
    }
    if (typeof window !== 'undefined' && window.turnstile) {
      init()
    } else {
      const interval = setInterval(() => {
        if (window.turnstile) { clearInterval(interval); init() }
      }, 100)
      return () => clearInterval(interval)
    }
  }, [])

  function getTurnstileToken(): Promise<string> {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => reject(new Error('Turnstile timeout')), 15000)
      callbackRef.current = (token) => { clearTimeout(timeout); resolve(token) }
      if (widgetIdRef.current) {
        window.turnstile.reset(widgetIdRef.current)
        window.turnstile.execute(widgetIdRef.current)
      } else {
        clearTimeout(timeout)
        reject(new Error('Turnstile not ready'))
      }
    })
  }

  return { containerRef, getTurnstileToken }
}
