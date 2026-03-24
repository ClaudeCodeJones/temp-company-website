import { NextResponse } from 'next/server'
import { sendEmail } from "@/lib/email"
import { buildEmailTemplate, escape, section, row, rowHtml } from "@/lib/emailTemplate"
import { brand } from "@/config/brand"
import { checkRateLimit } from "@/lib/rateLimit"

const allowedLicences = ['None', 'Car – Restricted', 'Car – Full', 'Class 2']

export async function POST(req: Request) {

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
    if (!fullName || !email || !phone || !city || !branch ||
        !driversLicence || !startDate || !workHistory ||
        !workingRightsConfirm || !englishConfirm || !drugTestConfirm ||
        !casualConfirm || !mojCheckConfirm) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 })
    }

    // Input length limits
    if (
      fullName.length > 200 || email.length > 254 || city.length > 200 ||
      branch.length > 200 || workHistory.length > 5000 ||
      (tmExperience && tmExperience.length > 2000) ||
      (startDate && startDate.length > 30)
    ) {
      return NextResponse.json({ error: 'Input exceeds maximum length.' }, { status: 400 })
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
      row('Working Rights', 'Confirmed', false),
      row('English', 'Confirmed', true),
      row('Drug Test', 'Confirmed', false),
      row('Casual Worker Guide', 'Confirmed', true),
      row('MOJ Check', 'Confirmed', false),
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
