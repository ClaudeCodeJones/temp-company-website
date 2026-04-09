import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { branches } from '../../../data/branches'
import { brand } from '../../../config/brand'
import BranchPageClient from './BranchPageClient'

export function generateStaticParams() {
  return branches.map((b) => ({ slug: b.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const branch = branches.find((b) => b.slug === slug)
  if (!branch) return {}

  return {
    title: `${brand.name} ${branch.name} | Traffic Management Staffing ${branch.region}`,
    description: branch.seoDescription,
    alternates: {
      canonical: `/branches/${branch.slug}`,
    },
    openGraph: {
      title: `${brand.name} ${branch.name} | Traffic Management Staffing ${branch.region}`,
      description: branch.seoDescription,
      url: `${brand.domain}/branches/${branch.slug}`,
      siteName: brand.name,
      type: 'website',
    },
  }
}

export default async function BranchPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const branch = branches.find((b) => b.slug === slug)
  if (!branch) notFound()

  const { coordinator, structuredAddress, serviceAreas } = branch

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'EmploymentAgency'],
    name: `${brand.name} ${branch.name}`,
    url: `${brand.domain}/branches/${branch.slug}`,
    description: branch.seoDescription,
    telephone: coordinator.phone,
    email: coordinator.email,
    image: `${brand.domain}${brand.logoPath}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: structuredAddress.street,
      addressLocality: structuredAddress.locality,
      addressRegion: structuredAddress.region,
      postalCode: structuredAddress.postcode,
      addressCountry: structuredAddress.country,
    },
    areaServed: serviceAreas.map((area) => ({
      '@type': 'City',
      name: area,
    })),
    parentOrganization: {
      '@type': 'Organization',
      name: brand.name,
      url: brand.domain,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BranchPageClient slug={slug} />
    </>
  )
}
