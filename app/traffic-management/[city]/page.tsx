import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import LocationPage from '../../components/LocationPage'
import { brand } from '../../../config/brand'
import { site } from '../../../config/site'
import { branches } from '../../../data/branches'

type Props = {
  params: Promise<{ city: string }>
}

export async function generateStaticParams() {
  return branches.map(b => ({ city: b.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params
  const branch = branches.find(b => b.slug === city)
  if (!branch) return {}

  return {
    title: `${site.primaryService} ${branch.name} | ${brand.name}`,
    description: `Professional ${site.primaryService.toLowerCase()} services in ${branch.name}. ${brand.name} provides ${site.primaryService.toLowerCase()} across ${branch.region}.`,
    alternates: {
      canonical: `/traffic-management/${branch.slug}`,
    },
  }
}

export default async function CityPage({ params }: Props) {
  const { city } = await params
  const branch = branches.find(b => b.slug === city)
  if (!branch) notFound()

  return (
    <LocationPage
      city={branch.name}
      region={branch.region}
      coverage={branch.serviceAreas}
    />
  )
}
