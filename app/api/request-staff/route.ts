import { NextResponse } from "next/server"
import { sendEmail } from "@/lib/email"
import { buildEmailTemplate, escape, section, row, rowHtml } from "@/lib/emailTemplate"
import { checkRateLimit } from "@/lib/rateLimit"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const {
      fullName, companyName, email, branch, phone, startDate, message,
      turnstileToken, companyPhone,
    } = body

    // Rate limit (IP + email)
    const rateLimitError = await checkRateLimit(req, email)
    if (rateLimitError) return rateLimitError

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

    const rows = [
      section('Client Details'),
      row('Name', fullName, false),
      row('Company', companyName, true),
      rowHtml('Email', `<a href="mailto:${escape(email)}" style="color:#bc9c22;font-family:Arial,Helvetica,sans-serif;font-size:14px;">${escape(email)}</a>`, false),
      row('Phone', phone, true),
      row('Branch', branch, false),
      row('Required Date', startDate || 'Not specified', true),
      section('Request Details'),
      row('Message', message, false),
    ].join('')

    const html = buildEmailTemplate('Staff Request', rows)

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
