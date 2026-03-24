import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    qualities: [100, 75],
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              `script-src 'self' 'unsafe-inline'${process.env.NODE_ENV === 'development' ? " 'unsafe-eval'" : ''} https://challenges.cloudflare.com`,
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob:",
              "frame-src https://challenges.cloudflare.com",
              "connect-src 'self' https://challenges.cloudflare.com",
            ].join('; '),
          },
        ],
      },
    ]
  },

  async redirects() {
    return [
      {
        source: '/traffic-management-wellington',
        destination: '/labour-hire/wellington',
        permanent: true,
      },
      {
        source: '/traffic-management-christchurch',
        destination: '/labour-hire/christchurch',
        permanent: true,
      },
      {
        source: '/traffic-management-nelson',
        destination: '/labour-hire/nelson',
        permanent: true,
      },
      {
        source: '/traffic-management-blenheim',
        destination: '/labour-hire/blenheim',
        permanent: true,
      },
      {
        source: '/traffic-management-timaru',
        destination: '/labour-hire/timaru',
        permanent: true,
      },
    ]
  },
}

export default nextConfig