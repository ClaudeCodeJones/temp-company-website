import type { Metadata } from 'next'
import RequestQuotePageClient from './RequestQuotePageClient'
import { brand } from '../../config/brand'

export const metadata: Metadata = {
  title: `Request Staff | ${brand.name}`,
  description: `Submit a staff request to ${brand.name}. Tell us what you need and we will match you with the right workers across traffic management, civil construction, and general labour.`,
  alternates: {
    canonical: '/request-staff',
  },
}

export default function RequestStaffPage() {
  return <RequestQuotePageClient />
}
