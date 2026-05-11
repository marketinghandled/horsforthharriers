import type { Metadata } from 'next'
import Image from 'next/image'
import { client } from '@/sanity/client'
import { relaysPageQuery } from '@/sanity/queries'
import PortableText from '@/components/PortableText'

export const metadata: Metadata = { title: 'Relays' }
export const revalidate = 86400

export default async function RelaysPage() {
  const page = await client.fetch<Record<string, any>>(relaysPageQuery)

  const headline = page?.pageHeadline ?? 'Relays'
  const subheading = page?.pageSubheading ?? 'Team relay events the club participates in throughout the year.'
  const bodyText = page?.bodyText ?? null
  const relayEvents: { title: string; description?: string; url?: string }[] = page?.relayEvents ?? []
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

            {/* Left — intro text */}
            <div className="space-y-8 pb-12 lg:pb-0 lg:pr-12">
              {bodyText && (
                <div>
                  <span className="text-brand-blue font-semibold text-xs uppercase tracking-widest">About</span>
                  <div className="mt-3">
                    <PortableText value={bodyText} />
                  </div>
                </div>
              )}
            </div>

            {/* Right — relay events */}
            <div className="space-y-8 pt-12 lg:pt-0 lg:pl-12">
              {heroImageUrl && (
                <Image src={heroImageUrl} alt={headline} width={600} height={360} className="w-full h-auto" />
              )}
              <div>
                <span className="text-brand-blue font-semibold text-xs uppercase tracking-widest">Events</span>
                <h2 className="mt-2 text-3xl font-bold text-gray-900">Relay Events</h2>
              </div>

              {relayEvents.length > 0 ? (
                <div className="space-y-4">
                  {relayEvents.map((event, i) => (
                    <div key={i} className="border border-gray-200 p-5 space-y-2">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-brand-blue flex-none mt-1" />
                          <h3 className="font-bold text-gray-900 text-sm">{event.title}</h3>
                        </div>
                        {event.url && (
                          <a
                            href={event.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-brand-blue font-semibold hover:underline whitespace-nowrap"
                          >
                            More info →
                          </a>
                        )}
                      </div>
                      {event.description && (
                        <p className="text-gray-600 text-sm leading-relaxed pl-5">{event.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">Relay events coming soon — check back later.</p>
              )}
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
