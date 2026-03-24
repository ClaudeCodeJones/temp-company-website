import { NextResponse } from "next/server"
import { brand } from "@/config/brand"
import { sendEmail } from "@/lib/email"
import { buildEmailTemplate } from "@/lib/emailTemplate"

const rateLimitMap = new Map<string, { count: number; lastRequest: number }>()

function checkRateLimit(req: Request): boolean {
  const ip = req.headers.get('x-forwarded-for') ?? req.headers.get('x-real-ip') ?? 'unknown'
  const now = Date.now()
  const windowMs = 60 * 1000
  const limit = 5
  const record = rateLimitMap.get(ip)
  if (record && now - record.lastRequest < windowMs) {
    if (record.count >= limit) return false
    record.count++
    record.lastRequest = now
    rateLimitMap.set(ip, record)
  } else {
    rateLimitMap.set(ip, { count: 1, lastRequest: now })
  }
  return true
}

export async function POST(req: Request) {
  if (!checkRateLimit(req)) {
    return new Response('Too many requests', { status: 429 })
  }

  try {
    const body = await req.json()
    const {
      fullName, companyName, email, branch, phone, startDate, message,
      turnstileToken, companyPhone,
    } = body

    // Honeypot check
    if (companyPhone) {
      return NextResponse.json({ success: true })
    }

    // Verify Turnstile token
    const token = body.turnstileToken
    const verifyResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret: process.env.TURNSTILE_SECRET_KEY!,
        response: token,
      }),
    })
    const verifyData = await verifyResponse.json()
    if (!verifyData.success) {
      return NextResponse.json({ error: 'Turnstile verification failed' }, { status: 400 })
    }

    // Required field validation
    if (!fullName?.trim() || !companyName?.trim() || !email?.trim() || !phone?.trim() || !branch?.trim() || !message?.trim()) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 })
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 })
    }

    // Phone validation
    const phoneRegex = /^[0-9+\-\s]{7,20}$/
    if (!phoneRegex.test(phone)) {
      return NextResponse.json({ error: 'Invalid phone number format.' }, { status: 400 })
    }

    const content = `
<table style="border-collapse:collapse;width:100%">
<tr><td style="font-weight:bold;padding:6px 0">Name</td><td>${fullName}</td></tr>
<tr><td style="font-weight:bold;padding:6px 0">Company Name</td><td>${companyName}</td></tr>
<tr><td style="font-weight:bold;padding:6px 0">Email</td><td><a href="mailto:${email}">${email}</a></td></tr>
<tr><td style="font-weight:bold;padding:6px 0">Phone</td><td>${phone}</td></tr>
<tr><td style="font-weight:bold;padding:6px 0">Branch</td><td>${branch}</td></tr>
<tr><td style="font-weight:bold;padding:6px 0">Required Date</td><td>${startDate || 'Not specified'}</td></tr>
<tr><td style="font-weight:bold;padding:6px 0">Message</td><td style="white-space:pre-wrap">${message}</td></tr>
</table>
`

    const html = buildEmailTemplate("Staff Request", content)

    await sendEmail({
      to: { email: 'nathan@thetempcompany.co.nz', name: 'Nathan' },
      subject: `Staff Request - ${companyName} (${branch})`,
      replyTo: { email: 'nathan@thetempcompany.co.nz' },
      html,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
