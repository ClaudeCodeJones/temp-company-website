import type { Metadata } from 'next'
import FindTalentEnquireClient from './FindTalentEnquireClient'
import { brand } from '../../../config/brand'

export const metadata: Metadata = {
  title: `Permanent Recruitment Enquiry | ${brand.name}`,
  description: `Tell us about the role you need to fill and we will find the right permanent candidate for your team.`,
  robots: { index: false, follow: false },
}

export default function FindTalentEnquirePage() {
  return <FindTalentEnquireClient />
}
