import type { Metadata } from 'next'
import ContactPageClient from './ContactPageClient'
import { brand } from '../../config/brand'
import { site } from '../../config/site'

export const metadata: Metadata = {
  title: `Contact ${brand.name}`,
  description:
    `Contact ${brand.name} for ${site.primaryService.toLowerCase()} services, project support, and enquiries across ${site.serviceArea}.`,
  alternates: {
    canonical: '/contact',
  },
}

export default function ContactPage() {
  return <ContactPageClient />
}
