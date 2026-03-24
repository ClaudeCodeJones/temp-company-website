import { NextResponse } from 'next/server'

export async function verifyTurnstile(token: string): Promise<NextResponse | null> {
  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      secret: process.env.TURNSTILE_SECRET_KEY!,
      response: token,
    }),
  })
  const data = await res.json()
  if (!data.success) {
    return NextResponse.json({ error: 'Turnstile verification failed' }, { status: 400 })
  }
  return null
}
