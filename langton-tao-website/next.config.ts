import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/education',
        destination: '/langtontao#education',
        permanent: true,
      },
      {
        source: '/community',
        destination: '/langtontao#community',
        permanent: true,
      },
      {
        source: '/checkup',
        destination: '/langtontao#checkup-cases',
        permanent: true,
      },
      {
        source: '/cases',
        destination: '/langtontao#checkup-cases',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
