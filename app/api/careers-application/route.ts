import { NextRequest, NextResponse } from 'next/server'
import { sendEmail } from "@/lib/email"
import { buildEmailTemplate } from "@/lib/emailTemplate"
import { brand } from "@/config/brand"

const rateLimitMap = new Map<string, { count: number; lastRequest: number }>()

function checkRateLimit(req: NextRequest): boolean {
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

export async function POST(req: NextRequest) {
  if (!checkRateLimit(req)) {
    return new Response('Too many requests', { status: 429 })
  }

  try {
    const body = await req.json()
    const {
      fullName, email, phone, city, startDate, branch,
      experience, licences, contactMethod,
      workHistory, aboutYourself, healthIssues, accHistory,
      howDidYouHear, casualConfirm, turnstileToken, companyPhone,
    } = body

    // Honeypot check
    if (companyPhone) {
      return NextResponse.json({ success: true })
    }

    // Verify Turnstile token
    const verifyResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        secret: process.env.TURNSTILE_SECRET_KEY,
        response: turnstileToken,
      }),
    })
    const verifyData = await verifyResponse.json()
    if (!verifyData.success) {
      return NextResponse.json({ error: 'Turnstile verification failed' }, { status: 400 })
    }

    // Phone validation
    const phoneRegex = /^[0-9+\-\s]{7,20}$/
    if (!phoneRegex.test(phone)) {
      return NextResponse.json({ error: 'Invalid phone number format' }, { status: 400 })
    }

    // Basic validation
    if (!fullName || !email || !phone || !city || !branch ||
        !experience || !licences?.length || !contactMethod ||
        !workHistory || !aboutYourself || !healthIssues || !accHistory) {
      return NextResponse.json(
        { error: 'Missing required fields.' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address.' },
        { status: 400 }
      )
    }

    const content = `
<table style="border-collapse:collapse;width:100%">
<tr><td style="font-weight:bold;padding:6px 0">Name</td><td>${fullName}</td></tr>
<tr><td style="font-weight:bold;padding:6px 0">Email</td><td><a href="mailto:${email}">${email}</a></td></tr>
<tr><td style="font-weight:bold;padding:6px 0">Phone</td><td>${phone}</td></tr>
<tr><td style="font-weight:bold;padding:6px 0">City</td><td>${city}</td></tr>
<tr><td style="font-weight:bold;padding:6px 0">Branch</td><td>${branch}</td></tr>
<tr><td style="font-weight:bold;padding:6px 0">Available From</td><td>${startDate || 'Not specified'}</td></tr>
<tr><td style="font-weight:bold;padding:6px 0">Experience</td><td>${experience}</td></tr>
<tr><td style="font-weight:bold;padding:6px 0">Licences</td><td>${Array.isArray(licences) ? licences.join(', ') : licences}</td></tr>
<tr><td style="font-weight:bold;padding:6px 0">Preferred Contact</td><td>${contactMethod}</td></tr>
<tr><td style="font-weight:bold;padding:6px 0">Work History</td><td>${workHistory}</td></tr>
<tr><td style="font-weight:bold;padding:6px 0">About Yourself</td><td>${aboutYourself}</td></tr>
<tr><td style="font-weight:bold;padding:6px 0">Health Issues</td><td>${healthIssues}</td></tr>
<tr><td style="font-weight:bold;padding:6px 0">ACC History</td><td>${accHistory}</td></tr>
<tr><td style="font-weight:bold;padding:6px 0">How Did You Hear</td><td>${howDidYouHear || 'Not specified'}</td></tr>
<tr><td style="font-weight:bold;padding:6px 0">Casual Confirmed</td><td>${casualConfirm ? 'Yes' : 'No'}</td></tr>
</table>
`

    const html = buildEmailTemplate("Website Job Application", content)

    await sendEmail({
      to: { email: brand.emailCareers, name: brand.name },
      subject: `Job Application - ${fullName} (${branch}, ${experience})`,
      replyTo: { email },
      html,
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
