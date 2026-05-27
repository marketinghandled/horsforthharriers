import type { NextConfig } from 'next'

const config: NextConfig = {
  async redirects() {
    return [
      // Legacy URL: club constitution
      {
        source: '/members-section/club-constitution',
        destination: '/club-documents/constitution',
        permanent: true,
      },
      {
        source: '/members-section/club-constitution/',
        destination: '/club-documents/constitution',
        permanent: true,
      },
      // Catch-all: any other /members-section/* → homepage
      {
        source: '/members-section/:path*',
        destination: '/',
        permanent: true,
      },
    ]
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
      { protocol: 'https', hostname: 'www.horsforthharriers.co.uk' },
    ],
  },
  serverExternalPackages: ['@sanity/client', '@sanity/image-url', 'next-sanity'],
  experimental: {
    optimizePackageImports: ['lucide-react', '@sanity/icons', '@sanity/ui'],
  },
}

export default config
