import { NextResponse } from 'next/server'

export async function verifyTurnstile(token: string, remoteip?: string): Promise<NextResponse | null> {
  const params: Record<string, string> = {
    secret: process.env.TURNSTILE_SECRET_KEY!,
    response: token,
  }
  if (remoteip) params.remoteip = remoteip

  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(params),
  })
  const data = await res.json()
  if (!data.success) {
    return NextResponse.json({ error: 'Turnstile verification failed' }, { status: 400 })
  }
  return null
}
