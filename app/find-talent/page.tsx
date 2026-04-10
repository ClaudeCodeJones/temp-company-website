import type { Metadata } from 'next'
import FindTalentClient from './FindTalentClient'

export const metadata: Metadata = {
  title: 'Permanent Recruitment for Construction & Trades | The Temp Company',
  description: 'The Temp Company connects employers with permanent hires across traffic management, civil, and construction trades in Christchurch, Wellington and Blenheim.',
  alternates: { canonical: '/find-talent' },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What types of roles do you recruit for permanently?',
      acceptedAnswer: { '@type': 'Answer', text: "We recruit across construction and trades, including traffic management, civil works, and infrastructure. If you're not sure whether your role fits, just get in touch and we'll let you know." },
    },
    {
      '@type': 'Question',
      name: 'What does the recruitment process look like?',
      acceptedAnswer: { '@type': 'Answer', text: 'You give us the brief, we go and find the candidates. We handle sourcing, screening, and reference checks, then present you with a shortlist. You interview and make the call. We support you through to offer and beyond.' },
    },
    {
      '@type': 'Question',
      name: 'How much does it cost?',
      acceptedAnswer: { '@type': 'Answer', text: "Our fee is 18% of the candidate's annual base salary, invoiced on acceptance of the offer. There are no upfront costs and no charge if we don't find you someone." },
    },
    {
      '@type': 'Question',
      name: "What happens if the candidate doesn't work out?",
      acceptedAnswer: { '@type': 'Answer', text: "If a placement leaves within the first four weeks we'll find you a replacement at no cost. Between four and eight weeks we'll either find a replacement or provide a 50% credit toward your next placement. After eight weeks no replacement or refund applies." },
    },
    {
      '@type': 'Question',
      name: 'Which regions do you cover?',
      acceptedAnswer: { '@type': 'Answer', text: 'We operate from Christchurch, Wellington, and Blenheim and recruit permanent candidates across New Zealand.' },
    },
    {
      '@type': 'Question',
      name: 'How long does it take to find someone?',
      acceptedAnswer: { '@type': 'Answer', text: "It depends on the role and the market, but we'll always give you an honest timeframe upfront. We'd rather set realistic expectations than overpromise." },
    },
    {
      '@type': 'Question',
      name: 'Are there formal terms and conditions for the recruitment service?',
      acceptedAnswer: { '@type': 'Answer', text: "Yes. Our t's and c's are available on our Terms and Conditions page, and complete client documentation is available on request. Just get in touch with your local TTC coordinator." },
    },
  ],
}

export default function FindTalentPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <FindTalentClient />
    </>
  )
}
