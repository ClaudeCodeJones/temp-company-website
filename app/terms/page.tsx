import type { Metadata } from 'next'
import RevealObserver from '../components/RevealObserver'
import { brand } from '../../config/brand'

export const metadata: Metadata = {
  title: `Terms and Conditions | ${brand.name}`,
  description: `Terms and Conditions for ${brand.name}.`,
  alternates: {
    canonical: '/terms',
  },
}

const sections = [
  {
    number: '1.',
    title: 'Acceptance of Terms',
    body: 'TTC supplies traffic management personnel to you, the client, on a casual basis. While on assignment, TTC staff work under your day-to-day supervision, direction, and control. TTC remains the employer and retains the right to manage its employment relationship.',
  },
  {
    number: '2.',
    title: 'Relationship Between Parties',
    list: [
      'Source and supply trained TTM workers.',
      'Pay wages, holiday pay, KiwiSaver, PAYE, and other entitlements.',
      'Provide basic PPE as standard.',
    ],
  },
  {
    number: '3.',
    title: 'Responsibilities of TTC',
    body: 'You agree to:',
    list: [
      'Provide a safe working environment.',
      'Induct TTC staff into your health and safety procedures.',
      'Supervise, instruct, and monitor TTC staff on site.',
      'Ensure TTC staff are only performing duties within their assigned scope.',
      'Treat TTC staff as you would your own employees while they are on assignment.',
      'Accept liability for any damage or cost arising from the actions or omissions of TTC staff.',
      'Not engage in any behaviour that would expose TTC to a personal grievance under the Employment Relations Act 2000.',
    ],
  },
  {
    number: '4.',
    title: 'Responsibilities of the Client',
    body: 'You agree to:',
    list: [
      'Provide a safe working environment.',
      'Induct TTC staff into your health and safety procedures.',
      'Supervise, instruct, and monitor TTC staff on site.',
      'Ensure TTC staff are only performing duties within their assigned scope.',
      'Treat TTC staff as you would your own employees while they are on assignment.',
      'Accept liability for any damage or cost arising from the actions or omissions of TTC staff.',
      'Not engage in any behaviour that would expose TTC to a personal grievance under the Employment Relations Act 2000.',
    ],
  },
  {
    number: '5.',
    title: 'Conduct and Site Behaviour',
    body: 'All TTC staff are subject to a Code of Conduct and are expected to behave professionally, respectfully, and in accordance with site rules at all times while on assignment. Clients may request the removal of a TTC staff member from site due to serious concerns relating to conduct or performance. TTC will review such requests in good faith and take appropriate steps, which may include reassignment, disciplinary action, or removal from future placements.',
  },
  {
    number: '6.',
    title: 'Health & Safety',
    list: [
      'You must ensure full compliance with the Health and Safety at Work Act 2015.',
      'All incidents, near misses, or unsafe conditions involving TTC staff must be reported to TTC immediately.',
      'You must nominate a H&S contact person for TTC staff.',
      'Agree to separate Health and Safety Document.',
    ],
  },
  {
    number: '7.',
    title: 'Hours, Minimum Charge, and Cancellations',
    body: 'Minimum daily charge is four (4) hours per staff member. Cancellation notices must be given:',
    list: [
      '24 hours prior for nightshift work',
      '12 hours prior for dayshift work',
    ],
    footer: 'If cancelled inside these timeframes, the minimum charge will apply.',
  },
  {
    number: '8.',
    title: 'Public Holidays',
    body: "Work performed by TTC staff on a New Zealand public holiday will be charged at time and a half (1.5x) the applicable hourly rate. This is in addition to any standard charges and reflects TTC's obligations under the Holidays Act 2003. This rate applies to all recognised New Zealand public holidays. Any work commencing on a public holiday will be charged at the public holiday rate for the full duration of that shift, unless otherwise agreed in writing.",
  },
  {
    number: '9.',
    title: 'Timesheets and Invoicing',
    list: [
      'Staff hours will be logged through MyTTM (digital timesheet system). Clients may request paper forms as additional backup.',
      'Invoices are issued weekly and due within 7 days of receipt.',
      'Late payments may incur interest and/or result in withdrawal of TTC staff.',
    ],
  },
  {
    number: '10.',
    title: 'Conversion to Direct Hire',
    body: 'If you, or any related third party, wish to employ a TTC worker directly, a conversion fee may apply.\n\nWhere the worker has completed fewer than 750 hours on assignment with you, a conversion fee will be charged.\n\nThe fee is calculated as a percentage of a notional annual salary based on 40 hours per week at $25 per hour.\n\nNo conversion fee applies once the worker has completed 750 hours.\n\nThis applies regardless of whether the engagement is direct or through any associated entity.',
  },
  {
    number: '11.',
    title: 'Permanent Recruitment Services',
    body: 'TTC may provide permanent recruitment services, including sourcing and placing candidates into employment with Clients.\n\nPlacement fees apply and are calculated as a percentage of the candidate\'s base salary.\n\nThe placement fee is payable upon acceptance of an offer of employment by the candidate.\n\nFull terms, including fee structure, payment terms, and replacement guarantees, are outlined in TTC\'s Recruitment Terms & Conditions.',
  },
  {
    number: '12.',
    title: 'Full Terms & Conditions',
    body: 'These website terms are a summary only.\n\nTTC operates under a range of formal agreements, including Client Terms & Conditions, Recruitment Terms & Conditions, Health & Safety Declarations, and Triangular Employment Agreements.\n\nFull terms will be provided and must be accepted prior to engagement.',
  },
  {
    number: '13.',
    title: 'Insurance',
    body: "TTC staff are not covered under TTC's liability insurance while on your site. You are responsible for ensuring appropriate cover is in place.",
  },
  {
    number: '14.',
    title: 'Limitation of Liability',
    body: 'TTC is not liable for any loss, damage, or cost incurred by you resulting from TTC staff conduct or from failure to supply staff. You indemnify TTC against any costs, claims, or damages resulting from TTC staff actions while under your control.',
  },
  {
    number: '15.',
    title: 'Governing Law',
    body: 'These terms are governed by New Zealand law.',
  },
]

export default function TermsPage() {
  return (
    <>
      <RevealObserver />

      <section
        style={{
          position: 'relative',
          background: 'var(--color-bg-deep)',
          paddingTop: '180px',
          paddingBottom: '80px',
          overflow: 'hidden',
        }}
        aria-label="Terms and Conditions hero"
      >
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '700px',
            height: '700px',
            background: 'radial-gradient(circle, rgba(252,212,21,0.07) 0%, transparent 65%)',
            pointerEvents: 'none',
          }}
          aria-hidden="true"
        />
        <div style={{ position: 'relative', zIndex: 10, maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div className="reveal" style={{ marginBottom: '20px' }}>
            <span className="eyebrow">Legal</span>
          </div>
          <h1
            className="reveal d1 font-display"
            style={{ fontWeight: 700, fontSize: 'clamp(2.4rem,5vw,4.5rem)', lineHeight: 1.05, letterSpacing: '-0.03em', color: '#fff' }}
          >
            Terms and Conditions
          </h1>
        </div>
      </section>

      <section style={{ background: 'var(--bg-dark)', padding: '80px 0 120px' }} aria-label="Terms and Conditions content">
        <div style={{ maxWidth: '760px', margin: '0 auto', padding: '0 24px' }}>

          <div className="reveal" style={{ marginBottom: '56px' }}>
            <p style={{ fontSize: '1rem', lineHeight: 1.78, color: 'var(--text-muted)', marginBottom: '20px' }}>
              The Temp Company, a division of Men at Work Ltd (Hereafter referred to as "TTC")
            </p>
            <p style={{ fontSize: '1rem', lineHeight: 1.78, color: 'var(--text-muted)', marginBottom: '12px' }}>
              These terms apply when you engage TTC to supply temporary traffic management staff.
            </p>
            <p style={{ fontSize: '1rem', lineHeight: 1.78, color: 'var(--text-muted)', marginBottom: '8px' }}>
              Acceptance is confirmed either by:
            </p>
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginBottom: '12px' }}>
              <li style={{ fontSize: '1rem', lineHeight: 1.78, color: 'var(--text-muted)', marginBottom: '4px' }}>Signing these terms, or</li>
              <li style={{ fontSize: '1rem', lineHeight: 1.78, color: 'var(--text-muted)' }}>Engaging a TTC-supplied worker.</li>
            </ul>
            <p style={{ fontSize: '1rem', lineHeight: 1.78, color: 'var(--text-muted)' }}>
              These terms replace any previous agreement and apply to all future assignments unless agreed otherwise in writing.
            </p>
          </div>

          {sections.map((section, i) => (
            <div
              key={section.number}
              className={`reveal d${Math.min((i % 4) + 1, 4)}`}
              style={{ marginBottom: '44px' }}
            >
              <div className="orange-rule" style={{ marginBottom: '20px' }} />
              <h3
                className="font-display"
                style={{
                  fontWeight: 700,
                  fontSize: 'clamp(1.15rem,2vw,1.35rem)',
                  letterSpacing: '-0.02em',
                  color: '#fff',
                  marginBottom: '16px',
                }}
              >
                {section.number} {section.title}
              </h3>

              {section.body && section.body.split('\n\n').map((paragraph, pIdx, arr) => (
                <p key={pIdx} style={{ fontSize: '1rem', lineHeight: 1.78, color: 'var(--text-muted)', marginBottom: (pIdx < arr.length - 1) ? '12px' : (section.list ? '12px' : 0) }}>
                  {paragraph}
                </p>
              ))}

              {section.list && (
                <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginBottom: section.footer ? '12px' : 0 }}>
                  {section.list.map((item) => (
                    <li key={item} style={{ fontSize: '1rem', lineHeight: 1.78, color: 'var(--text-muted)', marginBottom: '6px' }}>
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              {section.footer && (
                <p style={{ fontSize: '1rem', lineHeight: 1.78, color: 'var(--text-muted)' }}>
                  {section.footer}
                </p>
              )}
            </div>
          ))}

        </div>
      </section>
    </>
  )
}
