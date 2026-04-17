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
      fullName, companyName, email, phone, branch: _branch, otherRegion,
      roleTitle, salaryRange, candidateDetails,
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

    // 4. Required field validation
    if (!fullName?.trim() || !companyName?.trim() || !email?.trim() || !phone?.trim() || !branch?.trim() || !roleTitle?.trim() || !candidateDetails?.trim()) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 })
    }

    // 5. Email validation
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 })
    }

    // 6. Email rate limit
    const emailError = await checkEmailRateLimit(email)
    if (emailError) return emailError

    // 7. Input length limits
    if (
      fullName.length > 200 || companyName.length > 200 || email.length > 254 ||
      phone.length > 30 || branch.length > 200 || roleTitle.length > 200 ||
      (salaryRange && salaryRange.length > 100) || candidateDetails.length > 5000
    ) {
      return NextResponse.json({ error: 'Input exceeds maximum length.' }, { status: 400 })
    }

    // 8. Phone validation
    if (!phoneRegex.test(phone)) {
      return NextResponse.json({ error: 'Invalid phone number format.' }, { status: 400 })
    }

    const rows = [
      section('Contact Details'),
      row('Name', fullName, false),
      row('Company', companyName, true),
      rowHtml('Email', `<a href="mailto:${escape(email)}" style="color:#bc9c22;font-family:Arial,Helvetica,sans-serif;font-size:14px;">${escape(email)}</a>`, false),
      row('Phone', phone, true),
      row('Region', branch === 'Other' ? `Other - ${otherRegion || 'not specified'}` : branch, false),
      section('Role Details'),
      row('Role Title', roleTitle, false),
      row('Salary Range', salaryRange || 'Not specified', true),
      row('Candidate Requirements', candidateDetails, false),
    ].join('')

    const html = buildEmailTemplate('Permanent Recruitment Enquiry', rows)

    await sendEmail({
      to: { email: 'nathan@thetempcompany.co.nz', name: 'Nathan' },
      subject: `Recruitment Enquiry - ${roleTitle} (${companyName}, ${branch})`,
      replyTo: { email },
      html,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    Sentry.captureException(error, {
      tags: { form: 'find-talent-enquire', branch: branch || 'unknown' },
      extra: { branch },
    })
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
