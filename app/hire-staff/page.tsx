import type { Metadata } from 'next'
import HireStaffClient from './HireStaffClient'

export const metadata: Metadata = {
  title: 'Hire Traffic Management Staff | The Temp Company',
  description: 'Reliable certified TTM workers, STMS and Lead STMS for traffic management companies and civil contractors across Wellington, Blenheim and Christchurch.',
  alternates: { canonical: '/hire-staff' },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What types of roles can you supply?',
      acceptedAnswer: { '@type': 'Answer', text: 'We specialise in temporary traffic management, and all staff are at least TTM Workers, but can supply general labour too.' },
    },
    {
      '@type': 'Question',
      name: 'Do your workers have their own gear and transport?',
      acceptedAnswer: { '@type': 'Answer', text: 'Our workers come with their own PPE and transport.' },
    },
    {
      '@type': 'Question',
      name: 'Can you supply staff at short notice?',
      acceptedAnswer: { '@type': 'Answer', text: "Yes, we're built for fast turnaround. If you need crew urgently, give us a call and we'll do our best to fill it the same day." },
    },
    {
      '@type': 'Question',
      name: 'What areas do you cover?',
      acceptedAnswer: { '@type': 'Answer', text: "We currently supply labour across Wellington, Marlborough and Canterbury (Christchurch), and we're growing. If you're outside that, flick us a message and we'll see what we can do." },
    },
    {
      '@type': 'Question',
      name: 'Are your workers trained and compliant?',
      acceptedAnswer: { '@type': 'Answer', text: "Yes. Every worker is briefed and checked before heading to site. We handle inductions, qualifications, and only place people who meet your safety standards." },
    },
    {
      '@type': 'Question',
      name: 'What are your rates?',
      acceptedAnswer: { '@type': 'Answer', text: "We operate on clear hourly rates for each role, with an additional loading for night shifts. Get in touch and we'll send through our current rate card." },
    },
    {
      '@type': 'Question',
      name: 'Are there formal terms and conditions for hiring staff?',
      acceptedAnswer: { '@type': 'Answer', text: "Yes. Our t's and c's are available on our Terms and Conditions page, and complete client documentation is available on request. Just get in touch with your local TTC coordinator." },
    },
  ],
}

export default function HireStaffPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <HireStaffClient />
    </>
  )
}
