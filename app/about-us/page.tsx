import type { Metadata } from 'next'
import AboutClient from './AboutClient'

export const metadata: Metadata = {
  title: 'About Us | The Temp Company',
  description: 'The Temp Company is a specialist traffic management staffing business supplying workers across Marlborough, Canterbury and Wellington. Part of MW Group.',
  alternates: { canonical: '/about-us' },
}

export default function AboutPage() {
  return <AboutClient />
}
