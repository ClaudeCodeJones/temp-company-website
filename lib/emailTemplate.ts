import { brand } from '../config/brand'

// Brand colours
const C = {
  bg:         '#0a0f1a',
  card:       '#0e1520',
  rowOdd:     '#0e1520',
  rowEven:    '#111827',
  sectionBar: '#1a2535',
  accent:     '#bc9c22',
  label:      'rgba(255,255,255,0.45)',
  value:      '#ffffff',
  divider:    'rgba(255,255,255,0.06)',
  muted:      'rgba(255,255,255,0.3)',
}

export function escape(str: unknown): string {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export function section(label: string): string {
  return `
    <tr>
      <td colspan="2" style="background:${C.sectionBar};padding:10px 20px;border-top:2px solid ${C.accent};">
        <span style="font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:${C.accent};">${escape(label)}</span>
      </td>
    </tr>`
}

export function row(label: string, value: unknown, even = false): string {
  return rowHtml(label, `<span style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:${C.value};white-space:pre-wrap;">${escape(value)}</span>`, even)
}

export function rowHtml(label: string, valueHtml: string, even = false): string {
  const bg = even ? C.rowEven : C.rowOdd
  return `
    <tr style="background:${bg};">
      <td style="font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:${C.label};padding:11px 20px;width:36%;vertical-align:top;border-bottom:1px solid ${C.divider};">${escape(label)}</td>
      <td style="padding:11px 20px;vertical-align:top;border-bottom:1px solid ${C.divider};">${valueHtml}</td>
    </tr>`
}

export function buildEmailTemplate(title: string, rows: string): string {
  const timestamp = new Date().toLocaleString('en-NZ', {
    day: 'numeric', month: 'short', year: 'numeric',
    hour: 'numeric', minute: '2-digit', hour12: true,
  })

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:${C.bg};">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:${C.bg};padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" role="presentation" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:#1a2535;padding:18px 24px;border-top:3px solid ${C.accent};">
              <span style="font-family:Arial,Helvetica,sans-serif;font-size:18px;font-weight:700;color:#ffffff;">${escape(brand.name)}</span>
              <span style="font-family:Arial,Helvetica,sans-serif;font-size:13px;color:${C.muted};margin-left:12px;">${escape(title)}</span>
            </td>
          </tr>

          <!-- Timestamp -->
          <tr>
            <td style="background:${C.card};padding:8px 24px;border-bottom:1px solid ${C.divider};">
              <span style="font-family:Arial,Helvetica,sans-serif;font-size:11px;color:${C.muted};">Submitted: ${timestamp}</span>
            </td>
          </tr>

          <!-- Data rows -->
          <tr>
            <td style="padding:0;">
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                ${rows}
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:${C.sectionBar};padding:14px 24px;">
              <span style="font-family:Arial,Helvetica,sans-serif;font-size:11px;color:${C.muted};">Sent from the ${escape(brand.name)} website.</span>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}
