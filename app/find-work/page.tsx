import type { Metadata } from 'next'
import FindWorkClient from './FindWorkClient'

export const metadata: Metadata = {
  title: 'Traffic Management Jobs | The Temp Company',
  description: 'Find traffic management work in Wellington, Blenheim and Christchurch. TTM Worker through to STMS positions. New entrants welcome. Apply online.',
  alternates: { canonical: '/find-work' },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Do I need experience or tickets to apply?',
      acceptedAnswer: { '@type': 'Answer', text: "Nope. If you're new to traffic management, we'll provide full training and help you get site-ready with the right certifications." },
    },
    {
      '@type': 'Question',
      name: 'What gear do I need to start?',
      acceptedAnswer: { '@type': 'Answer', text: "We'll supply basic PPE like hi-vis vest, steel-caps, and a hard hat." },
    },
    {
      '@type': 'Question',
      name: 'How quickly can I start working?',
      acceptedAnswer: { '@type': 'Answer', text: "Once you're trained and cleared, you could be on site within a few days. It depends on client needs and your availability." },
    },
    {
      '@type': 'Question',
      name: 'Do you only offer traffic roles?',
      acceptedAnswer: { '@type': 'Answer', text: 'No, although we focus on temporary traffic management, but you may be utilised as a labourer too if you wish.' },
    },
    {
      '@type': 'Question',
      name: 'What regions do you cover?',
      acceptedAnswer: { '@type': 'Answer', text: 'We operate in the Greater Wellington, Marlborough and Canterbury (Christchurch) regions.' },
    },
    {
      '@type': 'Question',
      name: 'Will I need to pass a drug test?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes.' },
    },
  ],
}

export default function FindWorkPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <FindWorkClient />
    </>
  )
}
