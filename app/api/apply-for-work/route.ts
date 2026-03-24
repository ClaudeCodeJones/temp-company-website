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

const allowedLicences = ['None', 'Car – Restricted', 'Car – Full', 'Class 2']

export async function POST(req: NextRequest) {
  if (!checkRateLimit(req)) {
    return new Response('Too many requests', { status: 429 })
  }

  try {
    const body = await req.json()
    const {
      fullName, email, phone, city, branch,
      driversLicence, startDate,
      workHistory, tmExperience,
      workingRightsConfirm, englishConfirm, drugTestConfirm,
      casualConfirm, mojCheckConfirm,
      turnstileToken, companyPhone,
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

    // Required field validation
    if (!fullName || !email || !phone || !city || !branch ||
        !driversLicence || !startDate || !workHistory ||
        !englishConfirm || !drugTestConfirm ||
        !casualConfirm || !mojCheckConfirm) {
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
      return NextResponse.json({ error: 'Invalid phone number format' }, { status: 400 })
    }

    // Start date validation
    if (isNaN(Date.parse(startDate))) {
      return NextResponse.json({ error: 'Invalid start date.' }, { status: 400 })
    }

    // Driver licence validation
    if (!allowedLicences.includes(driversLicence)) {
      return NextResponse.json({ error: 'Invalid driver licence value.' }, { status: 400 })
    }

    const content = `
<table style="border-collapse:collapse;width:100%">
<tr><td style="font-weight:bold;padding:6px 0">Name</td><td>${fullName}</td></tr>
<tr><td style="font-weight:bold;padding:6px 0">Email</td><td><a href="mailto:${email}">${email}</a></td></tr>
<tr><td style="font-weight:bold;padding:6px 0">Phone</td><td>${phone}</td></tr>
<tr><td style="font-weight:bold;padding:6px 0">City</td><td>${city}</td></tr>
<tr><td style="font-weight:bold;padding:6px 0">Branch</td><td>${branch}</td></tr>
<tr><td style="font-weight:bold;padding:6px 0">Driver Licence</td><td>${driversLicence}</td></tr>
<tr><td style="font-weight:bold;padding:6px 0">Earliest Start Date</td><td>${startDate}</td></tr>
<tr><td style="font-weight:bold;padding:6px 0">Work Background</td><td style="white-space:pre-wrap">${workHistory}</td></tr>
<tr><td style="font-weight:bold;padding:6px 0">Traffic Management Experience</td><td style="white-space:pre-wrap">${tmExperience || 'Not provided'}</td></tr>
<tr><td style="font-weight:bold;padding:6px 0">Working Rights Confirmation</td><td>Yes</td></tr>
<tr><td style="font-weight:bold;padding:6px 0">English Confirmation</td><td>Yes</td></tr>
<tr><td style="font-weight:bold;padding:6px 0">Drug Test Acknowledgement</td><td>Yes</td></tr>
<tr><td style="font-weight:bold;padding:6px 0">Casual Worker Document Confirmation</td><td>Yes</td></tr>
<tr><td style="font-weight:bold;padding:6px 0">MOJ Check Confirmation</td><td>Yes</td></tr>
</table>
`

    const html = buildEmailTemplate("Website Job Application", content)

    await sendEmail({
      to: { email: 'nathan@thetempcompany.co.nz', name: 'Nathan' },
      subject: `Job Application - ${fullName} (${branch})`,
      replyTo: { email: 'nathan@thetempcompany.co.nz' },
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
