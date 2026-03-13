import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    qualities: [100, 75],
  },

  async redirects() {
    return [
      {
        source: '/traffic-management-wellington',
        destination: '/traffic-management/wellington',
        permanent: true,
      },
      {
        source: '/traffic-management-christchurch',
        destination: '/traffic-management/christchurch',
        permanent: true,
      },
      {
        source: '/traffic-management-nelson',
        destination: '/traffic-management/nelson',
        permanent: true,
      },
      {
        source: '/traffic-management-blenheim',
        destination: '/traffic-management/blenheim',
        permanent: true,
      },
      {
        source: '/traffic-management-timaru',
        destination: '/traffic-management/timaru',
        permanent: true,
      },
    ]
  },
}

export default nextConfig