import { NextResponse } from "next/server"
import { brand } from "@/config/brand"
import { sendEmail } from "@/lib/email"
import { buildEmailTemplate } from "@/lib/emailTemplate"

const rateLimitMap = new Map<string, { count: number; lastRequest: number }>()

let globalEmailCount = 0
const MAX_EMAILS_PER_DEPLOYMENT = 200

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
  // 1. Rate limit
  if (!checkRateLimit(req)) {
    return new Response('Too many requests', { status: 429 })
  }

  try {
    const body = await req.json()
    const { name, email, phone, branch, message, turnstileToken, companyPhone } = body

    // 2. Global email cap
    if (globalEmailCount >= MAX_EMAILS_PER_DEPLOYMENT) {
      console.warn('Email cap reached:', globalEmailCount)
      return NextResponse.json(
        { error: 'Email limit reached. Please try again later.' },
        { status: 429 }
      )
    }

    // 3. Honeypot check
    if (companyPhone) {
      return NextResponse.json({ success: true })
    }

    // 4. Turnstile verification
    // TURNSTILE TEMPORARILY BYPASSED FOR DEBUGGING
    // const verifyResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     secret: process.env.TURNSTILE_SECRET_KEY,
    //     response: turnstileToken,
    //   }),
    // })
    // const verifyData = await verifyResponse.json()
    // if (!verifyData.success) {
    //   return NextResponse.json({ error: 'Turnstile verification failed' }, { status: 400 })
    // }

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

    // 5 & 6. Process and send email
    const content = `
<table style="border-collapse:collapse;width:100%">

<tr>
<td style="font-weight:bold;padding:6px 0">Name</td>
<td>${name}</td>
</tr>

<tr>
<td style="font-weight:bold;padding:6px 0">Email</td>
<td><a href="mailto:${email}">${email}</a></td>
</tr>

<tr>
<td style="font-weight:bold;padding:6px 0">Phone</td>
<td>${phone}</td>
</tr>

<tr>
<td style="font-weight:bold;padding:6px 0">Branch</td>
<td>${branch}</td>
</tr>

<tr>
<td style="font-weight:bold;padding:6px 0">Message</td>
<td>${message}</td>
</tr>

</table>
`

    const html = buildEmailTemplate("Website Enquiry", content)

    await sendEmail({
      to: { email: 'nathan@thetempcompany.co.nz', name: 'Nathan' },
      subject: `${brand.name} Website Enquiry - ${name} (${branch})`,
      replyTo: { email: 'nathan@thetempcompany.co.nz' },
      html,
    })

    globalEmailCount++
    console.log('Global email count:', globalEmailCount)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact API error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
