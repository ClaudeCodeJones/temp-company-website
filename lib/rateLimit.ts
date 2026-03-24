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

function getIp(req: Request): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    req.headers.get('x-real-ip') ??
    'unknown'
  )
}

export async function checkRateLimit(
  req: Request,
  email?: string
): Promise<NextResponse | null> {
  const ip = getIp(req)

  const { success: ipOk } = await ipLimiter.limit(ip)
  if (!ipOk) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again shortly.' },
      { status: 429 }
    )
  }

  if (email) {
    const { success: emailOk } = await emailLimiter.limit(email.toLowerCase())
    if (!emailOk) {
      return NextResponse.json(
        { error: 'Too many submissions from this email. Please try again later.' },
        { status: 429 }
      )
    }
  }

  return null
}
