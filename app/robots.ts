import type { MetadataRoute } from 'next'
import { brand } from '../config/brand'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/api',
      },
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'Google-Extended', 'PerplexityBot', 'ClaudeBot', 'anthropic-ai', 'CCBot'],
        allow: '/',
      },
    ],
    sitemap: `${brand.domain}/sitemap.xml`,
  }
}
