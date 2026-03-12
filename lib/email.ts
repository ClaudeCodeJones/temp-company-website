import { brand } from '../config/brand'

export async function sendEmail({
  to,
  subject,
  html,
  replyTo,
}: {
  to: { email: string; name?: string } | { email: string; name?: string }[]
  subject: string
  html: string
  replyTo?: { email: string }
}) {
  const response = await fetch("https://api.autosend.com/v1/mails/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.AUTOSEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: {
        email: brand.emailFrom,
        name: brand.emailFromName,
      },
      to,
      subject,
      html,
      replyTo,
    }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    console.error("Autosend error:", errorText)
    throw new Error("Autosend email failed")
  }

  return true
}