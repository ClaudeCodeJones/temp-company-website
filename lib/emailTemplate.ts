import { brand } from '../config/brand'

export function buildEmailTemplate(title: string, content: string) {
  const timestamp = new Date().toLocaleString('en-NZ', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })

  return `
  <div style="background:#f4f4f4;padding:30px;font-family:Arial,Helvetica,sans-serif">

    <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
      <tr>
        <td align="center">

          <table width="600" cellpadding="0" cellspacing="0" role="presentation" style="max-width:600px;">
            <tr>
              <td>

                <div style="background:white;border-radius:6px;overflow:hidden">

                  <div style="background:#0f2235;color:white;padding:16px 20px;font-size:18px;font-weight:bold;border-top:6px solid #fd4f00;">
                    ${brand.name}
                  </div>

                  <div style="padding:20px">
                    <h2 style="margin-top:0">${title}</h2>
                    <p style="margin-top:4px;font-size:12px;color:#666">Submitted: ${timestamp}</p>

                    ${content}

                    <p style="margin-top:30px;font-size:12px;color:#666">
                      Sent from the ${brand.name} website.
                    </p>
                  </div>

                </div>

              </td>
            </tr>
          </table>

        </td>
      </tr>
    </table>

  </div>
  `
}
