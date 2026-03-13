import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    qualities: [100, 75],
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