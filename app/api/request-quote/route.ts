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


function yn(val: string) {
  return val === 'yes' ? 'Yes' : val === 'no' ? 'No' : val || '-'
}

function row(label: string, value: string) {
  return `
    <tr>
      <td style="padding:10px 16px;background:#0d1b2a;color:#7a8fa3;font-size:12px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;white-space:nowrap;border-bottom:1px solid #1f2d3d;">${label}</td>
      <td style="padding:10px 16px;background:#162435;color:#fff;font-size:14px;border-bottom:1px solid #1f2d3d;">${value || '-'}</td>
    </tr>`
}

function section(heading: string, rows: string) {
  return `
    <tr>
      <td colspan="2" style="padding:16px 16px 8px;background:#0a1628;color:#fd4f00;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;border-bottom:2px solid #fd4f00;">
        ${heading}
      </td>
    </tr>
    ${rows}`
}

export async function POST(req: Request) {
  if (!checkRateLimit(req)) {
    return new Response('Too many requests', { status: 429 })
  }

  try {
    const body = await req.json()
    const {
      fullName, companyName, title, phone, email, hasAccount, branch,
      projectName, projectTiming, location, plantNeeded, workTimes, unattendedSite,
      selfTM, selfTMDetail, wantsTMP, wantsCAR,
      costType, onsiteMeeting, meetingDate, meetingTime,
      otherInfo, fileData, turnstileToken, companyPhone,
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

    const meetingInfo = onsiteMeeting === 'yes' && meetingDate
      ? `${meetingDate} at ${meetingTime}`
      : yn(onsiteMeeting) === 'No' ? 'No' : '-'

    const fileInfo = fileData
      ? `${fileData.name} (attached)`
      : 'Not provided'

    const content = `
      <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border:1px solid #1f2d3d;">
        ${section('Client Details', `
          ${row('Name', fullName)}
          ${row('Company', companyName)}
          ${row('Title', title)}
          ${row('Phone', phone)}
          ${row('Email', email)}
          ${row('Existing Account', yn(hasAccount))}
          ${row('Branch', branch)}
        `)}
        ${section('Project Details', `
          ${projectName ? row('Project Name', projectName) : ''}
          ${projectTiming ? row('Expected Timing', projectTiming) : ''}
          ${row('Location', location)}
          ${row('Location File', fileInfo)}
          ${row('Plant Required', plantNeeded)}
          ${row('Work Times', workTimes)}
          ${row('Unattended Site', yn(unattendedSite))}
          ${row('Self TM', yn(selfTM))}
          ${selfTM === 'yes' ? row('Self TM Detail', selfTMDetail) : ''}
          ${row('Wants TMP', yn(wantsTMP))}
          ${wantsTMP === 'yes' ? row('Wants CAR', yn(wantsCAR)) : ''}
          ${row('Cost Type', costType)}
          ${row('Onsite Meeting', meetingInfo)}
          ${otherInfo ? row('Other Information', otherInfo) : ''}
        `)}
      </table>
    `

    const html = buildEmailTemplate("Website Quote Request", content)

    const subject = projectName
      ? `Estimate Request - ${projectName} (${companyName})`
      : `Estimate Request (${companyName})`

    await sendEmail({
      to: { email: brand.emailQuotes, name: brand.name },
      subject,
      replyTo: { email },
      html,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
