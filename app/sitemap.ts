import type { MetadataRoute } from 'next'
import { brand } from '../config/brand'
import { site } from '../config/site'
import { branches } from '../data/branches'

const base = brand.domain

export default function sitemap(): MetadataRoute.Sitemap {
  const locationUrls = branches.map(branch => ({
    url: `${base}/traffic-management/${branch.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: `${base}/about-us`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...(site.hasCareersPage ? [{
      url: `${base}/careers`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }] : []),
    {
      url: `${base}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...(site.hasQuoteForm ? [{
      url: `${base}/estimate`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }] : []),
    ...locationUrls,
  ]
}
