import { Redis } from '@upstash/redis'
import { Ratelimit } from '@upstash/ratelimit'
import { NextResponse } from 'next/server'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

// 10 requests per minute per IP (sliding window)
const ipLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, '60 s'),
  prefix: 'ttc:ip',
})

// 3 requests per 10 minutes per email address (sliding window)
const emailLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, '600 s'),
  prefix: 'ttc:email',
})

function getIp(req: Request): string | null {
  const forwarded = req.headers.get('x-forwarded-for')?.split(',')[0].trim()
  if (forwarded) return forwarded
  const realIp = req.headers.get('x-real-ip')
  if (realIp) return realIp
  return null
}

// IP headers (x-forwarded-for, x-real-ip) are trusted only behind Vercel/edge proxy.
// If no IP is available, IP limiting is skipped; Turnstile + email limiter still protect.
function rateLimitUnavailable(): NextResponse {
  return NextResponse.json(
    { error: 'Service temporarily unavailable. Please try again shortly.' },
    { status: 503 }
  )
}

export async function checkIpRateLimit(
  req: Request
): Promise<NextResponse | null> {
  const ip = getIp(req)
  if (!ip) return null

  try {
    const { success: ipOk } = await ipLimiter.limit(ip)
    if (!ipOk) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again shortly.' },
        { status: 429 }
      )
    }
  } catch (err) {
    const name = err instanceof Error ? err.name : 'UnknownError'
    console.warn('IP rate limit check failed', { name })
    if (process.env.NODE_ENV === 'production') return rateLimitUnavailable()
  }

  return null
}

export async function checkEmailRateLimit(
  email: string
): Promise<NextResponse | null> {
  try {
    const { success: emailOk } = await emailLimiter.limit(email.toLowerCase())
    if (!emailOk) {
      return NextResponse.json(
        { error: 'Too many submissions from this email. Please try again later.' },
        { status: 429 }
      )
    }
  } catch (err) {
    const name = err instanceof Error ? err.name : 'UnknownError'
    console.warn('Email rate limit check failed', { name })
    if (process.env.NODE_ENV === 'production') return rateLimitUnavailable()
  }
  return null
}

export function getRequestIp(req: Request): string | undefined {
  return getIp(req) ?? undefined
}
