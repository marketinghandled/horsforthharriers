import type { Metadata } from 'next'
import Image from 'next/image'
import { client } from '@/sanity/client'
import { pecoPageQuery } from '@/sanity/queries'
import PortableText from '@/components/PortableText'

export const metadata: Metadata = { title: 'PECO Cross Country' }
export const revalidate = 86400

export default async function PecoPage() {
  const page = await client.fetch<Record<string, any>>(pecoPageQuery)

  const headline = page?.pageHeadline ?? 'PECO Cross Country'
  const subheading = page?.pageSubheading ?? 'West Yorkshire cross country league running from autumn through winter.'
  const bodyText = page?.bodyText ?? null
  const details: { label: string; value: string }[] = page?.details ?? []
  const websiteUrl: string | null = page?.websiteUrl ?? null
  const sidebarText: string | null = page?.sidebarText ?? null
  const heroImageUrl: string | null = page?.heroImage?.asset?.url ?? null

  return (
    <>
      <div className="bg-brand-light py-5 border-b border-brand-blue/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-brand-blue font-semibold text-xs uppercase tracking-widest mb-1">Races</p>
          <h1 className="text-xl font-bold text-brand-blue">{headline}</h1>
          {subheading && <p className="mt-1 text-sm text-gray-600">{subheading}</p>}
        </div>
      </div>

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-gray-200">

            {/* Left — intro text + key info */}
            <div className="space-y-8 pb-12 lg:pb-0 lg:pr-12">
              {bodyText && (
                <div>
                  <span className="text-brand-blue font-semibold text-xs uppercase tracking-widest">About</span>
                  <div className="mt-3">
                    <PortableText value={bodyText} />
                  </div>
                </div>
              )}

              {details.length > 0 && (
                <ul className="space-y-2">
                  {details.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                      <div className="w-2 h-2 bg-brand-blue flex-none mt-1.5" />
                      <span className="text-gray-700">{item.value}</span>
                    </li>
                  ))}
                </ul>
              )}

              {sidebarText && (
                <div className="bg-brand-light border border-brand-blue/20 p-5">
                  <p className="text-gray-700 text-sm leading-relaxed">{sidebarText}</p>
                </div>
              )}
            </div>

            {/* Right — image + link */}
            <div className="space-y-8 pt-12 lg:pt-0 lg:pl-12">
              {heroImageUrl && (
                <Image src={heroImageUrl} alt={headline} width={600} height={360} className="w-full h-auto" />
              )}

              {websiteUrl && (
                <a
                  href={websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-brand-blue text-white font-bold text-sm hover:bg-brand-dark transition-colors"
                >
                  Visit the PECO website
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </a>
              )}
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
