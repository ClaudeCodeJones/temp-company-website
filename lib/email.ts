import { brand } from '../config/brand'

export type EmailAttachment = {
  filename: string
  content: string
  contentType?: string
}

export async function sendEmail({
  to,
  subject,
  html,
  replyTo,
  attachments,
}: {
  to: { email: string; name?: string } | { email: string; name?: string }[]
  subject: string
  html: string
  replyTo?: { email: string }
  attachments?: EmailAttachment[]
}) {
  const payload: Record<string, unknown> = {
    from: {
      email: brand.emailFrom,
      name: brand.name,
    },
    to,
    subject,
    html,
    replyTo,
  }

  if (attachments && attachments.length > 0) {
    payload.attachments = attachments.map(a => ({
      fileName: a.filename,
      content: a.content,
      contentType: a.contentType,
    }))
  }

  const response = await fetch("https://api.autosend.com/v1/mails/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.AUTOSEND_API_KEY}`,
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    console.error('Autosend send failed', { status: response.status })
    throw new Error('Autosend send failed')
  }

  return true
}
