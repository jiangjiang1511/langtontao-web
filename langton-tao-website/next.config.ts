import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/data/compound-growth/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
        ],
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/education',
        destination: '/langtontao#beautiful-education',
        permanent: true,
      },
      {
        source: '/community',
        destination: '/langtontao#beautiful-community',
        permanent: true,
      },
      {
        source: '/checkup',
        destination: '/langtontao#beautiful-checkup',
        permanent: true,
      },
      {
        source: '/cases',
        destination: '/langtontao#beautiful-cases',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
