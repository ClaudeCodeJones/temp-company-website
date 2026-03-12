import type { Metadata } from 'next'
import RevealObserver from '../components/RevealObserver'
import { brand } from '../../config/brand'

export const metadata: Metadata = {
  title: `Privacy Policy | ${brand.name}`,
  description: `How ${brand.name} collects, uses and protects information provided through our website.`,
  alternates: {
    canonical: '/privacy',
  },
}

export default function PrivacyPage() {
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
        aria-label="Privacy Policy hero"
      >
        <div style={{ position: 'absolute', top: '-100px', left: '50%', transform: 'translateX(-50%)', width: '700px', height: '700px', background: 'radial-gradient(circle, rgba(252,212,21,0.07) 0%, transparent 65%)', pointerEvents: 'none' }} aria-hidden="true" />

        <div style={{ position: 'relative', zIndex: 10, maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div className="reveal" style={{ marginBottom: '20px' }}>
            <span className="eyebrow">Legal</span>
          </div>
          <h1 className="reveal d1 font-display" style={{ fontWeight: 700, fontSize: 'clamp(2.4rem,5vw,4.5rem)', lineHeight: 1.05, letterSpacing: '-0.03em', color: '#fff' }}>
            Privacy Policy
          </h1>
          <p className="reveal d2" style={{ fontSize: '1rem', lineHeight: 1.78, color: 'var(--text-muted)', maxWidth: '540px', marginTop: '20px' }}>
            How {brand.name} collects, uses and protects information provided through our website.
          </p>
        </div>
      </section>

      {/* ── CONTENT ── */}
      <section style={{ background: 'var(--bg-dark)', padding: '80px 0 120px' }} aria-label="Privacy Policy content">
        <div style={{ maxWidth: '760px', margin: '0 auto', padding: '0 24px' }}>

          <div className="reveal" style={{ marginBottom: '48px' }}>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
              Last updated: March 2026
            </p>
          </div>

          {[
            {
              heading: 'Introduction',
              body: `${brand.name} is committed to protecting your privacy. This policy outlines how we collect, use, and safeguard personal information when you use our website or contact us about our services.`,
            },
            {
              heading: 'Information We Collect',
              body: 'We may collect personal information you provide directly, including your name, email address, phone number, and details about your project or enquiry when you submit a quote request, contact form, or job application through our website.',
            },
            {
              heading: 'How We Use Your Information',
              body: 'Information you provide is used to respond to your enquiry, process your quote request, assess job applications, and communicate with you about our services. We do not sell or share your personal information with third parties for marketing purposes.',
            },
            {
              heading: 'Data Storage and Security',
              body: 'We take reasonable steps to protect your personal information from unauthorised access, loss, or misuse. Information submitted through our website is transmitted securely and stored in accordance with applicable privacy laws.',
            },
            {
              heading: 'Cookies',
              body: 'Our website may use cookies to improve your browsing experience. You can configure your browser to refuse cookies, though some features of the site may not function as intended if you do so.',
            },
            {
              heading: 'Your Rights',
              body: `You have the right to access, correct, or request deletion of personal information we hold about you. To make a request, contact us at ${brand.emailContact}.`,
            },
            {
              heading: 'Contact',
              body: `If you have any questions about this privacy policy or how we handle your information, please contact us at ${brand.emailContact} or call ${brand.phone}.`,
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
