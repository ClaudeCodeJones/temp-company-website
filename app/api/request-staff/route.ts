import { NextResponse } from 'next/server'
import * as Sentry from '@sentry/nextjs'
import { sendEmail } from '@/lib/email'
import { buildEmailTemplate, escape, section, row, rowHtml } from '@/lib/emailTemplate'
import { checkIpRateLimit, checkEmailRateLimit, getRequestIp } from '@/lib/rateLimit'
import { emailRegex, phoneRegex } from '@/lib/validation'
import { verifyTurnstile } from '@/lib/turnstile'

export async function POST(req: Request) {
  let branch = ''
  try {
    const body = await req.json()
    const {
      fullName, companyName, email, branch: _branch, phone, startDate, message,
      turnstileToken, companyPhone,
    } = body
    branch = _branch

    // 1. IP rate limit
    const ipError = await checkIpRateLimit(req)
    if (ipError) return ipError

    // 2. Honeypot check
    if (companyPhone) {
      return NextResponse.json({ success: true })
    }

    // 3. Turnstile verification
    const turnstileError = await verifyTurnstile(turnstileToken, getRequestIp(req))
    if (turnstileError) return turnstileError

    // Required field validation
    if (!fullName?.trim() || !companyName?.trim() || !email?.trim() || !phone?.trim() || !branch?.trim() || !message?.trim()) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 })
    }

    // Email validation
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 })
    }

    // 4. Email rate limit (after proving human)
    const emailError = await checkEmailRateLimit(email)
    if (emailError) return emailError

    // Input length limits
    if (
      fullName.length > 200 || companyName.length > 200 || email.length > 254 ||
      branch.length > 200 || message.length > 5000 ||
      (startDate && startDate.length > 30)
    ) {
      return NextResponse.json({ error: 'Input exceeds maximum length.' }, { status: 400 })
    }

    // Phone validation
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
    Sentry.captureException(error, {
      tags: { form: 'request-staff', branch: branch || 'unknown' },
      extra: { branch },
    })
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
