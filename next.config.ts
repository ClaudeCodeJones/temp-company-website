import { withSentryConfig } from '@sentry/nextjs';
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

export default withSentryConfig(nextConfig, {
  // For all available options, see:
  // https://www.npmjs.com/package/@sentry/webpack-plugin#options

  org: "mw-group",

  project: "javascript-nextjs",

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  tunnelRoute: "/monitoring",

  webpack: {
    // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true,

    // Tree-shaking options for reducing bundle size
    treeshake: {
      // Automatically tree-shake Sentry logger statements to reduce bundle size
      removeDebugLogging: true,
    },
  },
});
