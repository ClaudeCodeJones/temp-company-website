import type { Metadata } from 'next'
import RevealObserver from '../components/RevealObserver'
import { brand } from '../../config/brand'

export const metadata: Metadata = {
  title: `Terms of Service | ${brand.name}`,
  description: `Terms governing the use of the ${brand.name} website and services.`,
  alternates: {
    canonical: '/terms',
  },
}

export default function TermsPage() {
  return (
    <>
      <RevealObserver />

      {/* ── HERO ── */}
      <section
        style={{
          position: 'relative',
          background: '#252528',
          paddingTop: '180px',
          paddingBottom: '80px',
          overflow: 'hidden',
        }}
        aria-label="Terms of Service hero"
      >
        <div style={{ position: 'absolute', top: '-100px', left: '50%', transform: 'translateX(-50%)', width: '700px', height: '700px', background: 'radial-gradient(circle, rgba(252,212,21,0.07) 0%, transparent 65%)', pointerEvents: 'none' }} aria-hidden="true" />

        <div style={{ position: 'relative', zIndex: 10, maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div className="reveal" style={{ marginBottom: '20px' }}>
            <span className="eyebrow">Legal</span>
          </div>
          <h1 className="reveal d1 font-display" style={{ fontWeight: 700, fontSize: 'clamp(2.4rem,5vw,4.5rem)', lineHeight: 1.05, letterSpacing: '-0.03em', color: '#fff' }}>
            Terms of Service
          </h1>
          <p className="reveal d2" style={{ fontSize: '1rem', lineHeight: 1.78, color: 'var(--text-muted)', maxWidth: '540px', marginTop: '20px' }}>
            Terms governing the use of the {brand.name} website and services.
          </p>
        </div>
      </section>

      {/* ── CONTENT ── */}
      <section style={{ background: 'var(--bg-dark)', padding: '80px 0 120px' }} aria-label="Terms of Service content">
        <div style={{ maxWidth: '760px', margin: '0 auto', padding: '0 24px' }}>

          <div className="reveal" style={{ marginBottom: '48px' }}>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
              Last updated: March 2026
            </p>
          </div>

          {[
            {
              heading: 'Acceptance of Terms',
              body: 'By accessing and using this website, you accept and agree to be bound by these terms of service. If you do not agree to these terms, please do not use this website.',
            },
            {
              heading: 'Use of Website',
              body: `This website is provided for informational purposes relating to the services offered by ${brand.name}. You agree to use the site only for lawful purposes and in a manner that does not infringe the rights of others.`,
            },
            {
              heading: 'Intellectual Property',
              body: `All content on this website, including text, images, logos, and design elements, is the property of ${brand.name} or its licensors and is protected by applicable copyright and intellectual property laws.`,
            },
            {
              heading: 'Service Enquiries',
              body: `Submitting a quote request or contact form through this website does not constitute a binding contract or guarantee of service. All service agreements are subject to separate terms confirmed in writing by ${brand.name}.`,
            },
            {
              heading: 'Limitation of Liability',
              body: `${brand.name} makes no warranties regarding the accuracy or completeness of information on this website. To the extent permitted by law, we accept no liability for any loss or damage arising from your use of the site.`,
            },
            {
              heading: 'Third-Party Links',
              body: 'This website may contain links to external websites operated by third parties, including other companies within the MW Group. We are not responsible for the content or practices of those sites.',
            },
            {
              heading: 'Changes to These Terms',
              body: 'We reserve the right to update these terms at any time. Changes will be posted on this page with an updated date. Continued use of the website following changes constitutes acceptance of the revised terms.',
            },
            {
              heading: 'Contact',
              body: `For questions about these terms, contact us at ${brand.emailContact} or call ${brand.phone}.`,
            },
          ].map(({ heading, body }) => (
            <div key={heading} className="reveal" style={{ marginBottom: '48px' }}>
              <div className="orange-rule" style={{ marginBottom: '20px' }} />
              <h2 className="font-display" style={{ fontWeight: 700, fontSize: 'clamp(1.2rem,2vw,1.5rem)', letterSpacing: '-0.02em', color: '#fff', marginBottom: '16px' }}>
                {heading}
              </h2>
              <p style={{ fontSize: '1rem', lineHeight: 1.78, color: 'var(--text-muted)' }}>
                {body}
              </p>
            </div>
          ))}

        </div>
      </section>
    </>
  )
}
