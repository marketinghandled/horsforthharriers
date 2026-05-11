import type { NextConfig } from 'next'

const config: NextConfig = {
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
