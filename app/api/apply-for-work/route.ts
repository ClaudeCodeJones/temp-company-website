import { NextResponse } from 'next/server'
import { sendEmail } from '@/lib/email'
import { buildEmailTemplate, escape, section, row, rowHtml } from '@/lib/emailTemplate'
import { brand } from '@/config/brand'
import { checkIpRateLimit, checkEmailRateLimit, getRequestIp } from '@/lib/rateLimit'
import { emailRegex, phoneRegex } from '@/lib/validation'
import { verifyTurnstile } from '@/lib/turnstile'

const allowedLicences = ['Car – Restricted', 'Car – Full', 'Class 2']

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const {
      fullName, email, phone, city, branch,
      driversLicence, startDate,
      workHistory, tmExperience,
      englishConfirm, drugTestConfirm,
      casualConfirm, mojCheckConfirm,
      turnstileToken, companyPhone,
    } = body

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

    // Required field validation (trim strings to reject whitespace-only)
    if (!fullName?.trim() || !email?.trim() || !phone?.trim() || !city?.trim() || !branch?.trim() ||
        !driversLicence?.trim() || !startDate || !workHistory?.trim() ||
        !englishConfirm || !drugTestConfirm ||
        !casualConfirm || !mojCheckConfirm) {
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
      fullName.length > 200 || email.length > 254 || city.length > 200 ||
      branch.length > 200 || workHistory.length > 5000 ||
      (tmExperience && tmExperience.length > 2000) ||
      (startDate && startDate.length > 30)
    ) {
      return NextResponse.json({ error: 'Input exceeds maximum length.' }, { status: 400 })
    }

    // Phone validation
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

    const rows = [
      section('Applicant Details'),
      row('Name', fullName, false),
      rowHtml('Email', `<a href="mailto:${escape(email)}" style="color:#bc9c22;font-family:Arial,Helvetica,sans-serif;font-size:14px;">${escape(email)}</a>`, true),
      row('Phone', phone, false),
      row('City', city, true),
      row('Branch', branch, false),
      row('Driver Licence', driversLicence, true),
      row('Start Date', startDate, false),
      section('Experience'),
      row('Work Background', workHistory, false),
      row('TM Experience', tmExperience || 'Not provided', true),
      section('Confirmations'),
      row('English', 'Confirmed', false),
      row('Drug Test', 'Confirmed', true),
      row('Casual Worker Guide', 'Confirmed', false),
      row('MOJ Check', 'Confirmed', true),
    ].join('')

    const html = buildEmailTemplate('Job Application', rows)

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
