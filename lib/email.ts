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
  const recipients = Array.isArray(to) ? to : [to]

  const mappedAttachments = attachments && attachments.length > 0
    ? attachments.map(a => ({ fileName: a.filename, content: a.content, contentType: a.contentType }))
    : undefined

  await Promise.all(recipients.map(async (recipient) => {
    const payload: Record<string, unknown> = {
      from: {
        email: brand.emailFrom,
        name: brand.name,
      },
      to: recipient,
      subject,
      html,
      replyTo,
    }

    if (mappedAttachments) payload.attachments = mappedAttachments

    const response = await fetch("https://api.autosend.com/v1/mails/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.AUTOSEND_API_KEY}`,
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      console.error('Autosend send failed', { status: response.status, recipient: recipient.email })
      throw new Error('Autosend send failed')
    }
  }))

  return true
}
