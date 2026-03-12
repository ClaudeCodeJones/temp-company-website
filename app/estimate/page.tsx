import type { Metadata } from 'next'
import RequestQuotePageClient from './RequestQuotePageClient'
import { brand } from '../../config/brand'
import { site } from '../../config/site'

export const metadata: Metadata = {
  title: `Request a ${site.primaryService} Quote | ${brand.name}`,
  description:
    `Request a quote for ${site.primaryService.toLowerCase()} services and project support across ${site.serviceArea}.`,
  alternates: {
    canonical: '/estimate',
  },
}

export default function RequestQuotePage() {
  return <RequestQuotePageClient />
}
