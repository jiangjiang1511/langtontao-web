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
        destination: '/#beautiful-education',
        permanent: true,
      },
      {
        source: '/community',
        destination: '/#beautiful-community',
        permanent: true,
      },
      {
        source: '/checkup',
        destination: '/#beautiful-checkup',
        permanent: true,
      },
      {
        source: '/cases',
        destination: '/#beautiful-cases',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
