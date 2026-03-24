import { NextResponse } from "next/server"
import { brand } from "@/config/brand"
import { sendEmail } from "@/lib/email"
import { buildEmailTemplate, escape, section, row, rowHtml } from "@/lib/emailTemplate"
import { checkRateLimit } from "@/lib/rateLimit"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, phone, branch, message, turnstileToken, companyPhone } = body

    // 1. Rate limit (IP + email)
    const rateLimitError = await checkRateLimit(req, email)
    if (rateLimitError) return rateLimitError

    // 2. Honeypot check
    if (companyPhone) {
      return NextResponse.json({ success: true })
    }

    // 4. Turnstile verification
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
    if (!name?.trim() || !email?.trim() || !branch?.trim()) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 })
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 })
    }

    // Input length limits
    if (
      name.length > 200 || email.length > 254 || branch.length > 200 ||
      (message?.length > 5000)
    ) {
      return NextResponse.json({ error: 'Input exceeds maximum length.' }, { status: 400 })
    }

    // Phone validation
    const phoneRegex = /^[0-9+\-\s]{7,20}$/
    if (!phoneRegex.test(phone)) {
      return NextResponse.json({ error: 'Invalid phone number format' }, { status: 400 })
    }

    // Message validation
    if (!message || message.trim().length < 10) {
      return new Response(
        JSON.stringify({ error: "Please enter a more detailed message." }),
        { status: 400 }
      )
    }

    const rows = [
      section('Contact Details'),
      row('Name', name, false),
      rowHtml('Email', `<a href="mailto:${escape(email)}" style="color:#bc9c22;font-family:Arial,Helvetica,sans-serif;font-size:14px;">${escape(email)}</a>`, true),
      row('Phone', phone, false),
      row('Branch', branch, true),
      section('Message'),
      row('Message', message, false),
    ].join('')

    const html = buildEmailTemplate('Website Enquiry', rows)

    await sendEmail({
      to: { email: 'nathan@thetempcompany.co.nz', name: 'Nathan' },
      subject: `${brand.name} Website Enquiry - ${name} (${branch})`,
      replyTo: { email: 'nathan@thetempcompany.co.nz' },
      html,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact API error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
