'use client'

export const dynamic = 'force-dynamic'

import nextDynamic from 'next/dynamic'

const NextStudio = nextDynamic(
  () => import('next-sanity/studio').then((mod) => mod.NextStudio),
  { ssr: false }
)

import config from '@/sanity.config'

export default function StudioPage() {
  return <NextStudio config={config} />
}
