import { faqs } from '../../../data/faqs'

const schema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.schemaAnswer,
    },
  })),
}

export default function FaqSection() {
  return (
    <section
      style={{
        background: 'var(--bg-dark)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: 'clamp(60px,8vw,100px) 0',
      }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 clamp(24px,5vw,48px)' }}>
        <h2
          className="font-display"
          style={{
            fontWeight: 700,
            fontSize: 'clamp(1.8rem,3.5vw,2.8rem)',
            color: '#fff',
            letterSpacing: '-0.02em',
            marginBottom: '12px',
          }}
        >
          Frequently Asked Questions
        </h2>

        <p
          style={{
            fontSize: '1rem',
            color: 'var(--text-muted)',
            lineHeight: 1.7,
            maxWidth: '600px',
            marginBottom: '48px',
          }}
        >
          Answers to common questions about our services.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {faqs.map((faq) => (
            <div
              key={faq.question}
              style={{
                background: 'var(--bg-mid)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '4px',
                padding: 'clamp(20px,3vw,28px)',
              }}
            >
              <h3
                style={{
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: 'var(--brand-primary)',
                  marginBottom: '10px',
                  lineHeight: 1.4,
                }}
              >
                {faq.question}
              </h3>
              <p
                style={{
                  fontSize: '0.9375rem',
                  color: 'var(--text-muted)',
                  lineHeight: 1.72,
                  margin: 0,
                }}
              >
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
