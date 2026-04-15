import type { Metadata } from 'next'
import OnboardingClient from './OnboardingClient'

export const metadata: Metadata = {
  title: 'Onboarding | The Temp Company',
  description: 'Complete your onboarding with The Temp Company to start work.',
  robots: { index: false, follow: false },
}

export default function OnboardingPage() {
  return <OnboardingClient />
}
