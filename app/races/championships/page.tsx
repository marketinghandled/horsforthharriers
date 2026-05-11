import type { Metadata } from 'next'
import Image from 'next/image'
import { client } from '@/sanity/client'
import { clubChampionshipsPageQuery } from '@/sanity/queries'
import PortableText from '@/components/PortableText'

export const metadata: Metadata = { title: 'Club Championships' }
export const revalidate = 86400

export default async function ClubChampionshipsPage() {
  const page = await client.fetch<Record<string, any>>(clubChampionshipsPageQuery)

  const headline = page?.pageHeadline ?? 'Club Championships'
  const subheading = page?.pageSubheading ?? 'Race throughout the year to earn points and claim the club championship title.'
  const bodyText = page?.bodyText ?? null
  const keyPoints: string[] = page?.keyPoints ?? []
  const races: { raceName: string; date?: string; location?: string; url?: string }[] = page?.races ?? []
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

            {/* Left — intro + key info */}
            <div className="space-y-8 pb-12 lg:pb-0 lg:pr-12">
              {bodyText && (
                <div>
                  <span className="text-brand-blue font-semibold text-xs uppercase tracking-widest">About</span>
                  <div className="mt-3">
                    <PortableText value={bodyText} />
                  </div>
                </div>
              )}

              {keyPoints.length > 0 && (
                <div className="border border-gray-200 p-5 space-y-3">
                  <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wide">Key Points</h3>
                  <ul className="space-y-2">
                    {keyPoints.map((point, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                        <div className="w-2 h-2 bg-brand-blue flex-none mt-1.5" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Right — races table */}
            <div className="space-y-8 pt-12 lg:pt-0 lg:pl-12">
              {heroImageUrl && (
                <Image src={heroImageUrl} alt={headline} width={600} height={360} className="w-full h-auto" />
              )}
              <div>
                <span className="text-brand-blue font-semibold text-xs uppercase tracking-widest">Schedule</span>
                <h2 className="mt-2 text-3xl font-bold text-gray-900">Championship Races</h2>
              </div>

              {races.length > 0 ? (
                <div className="space-y-3">
                  {races.map((race, i) => (
                    <div key={i} className="border border-gray-200 p-4 space-y-1">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-brand-blue flex-none mt-1" />
                          <span className="font-bold text-gray-900 text-sm">{race.raceName}</span>
                        </div>
                        {race.url && (
                          <a
                            href={race.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-brand-blue font-semibold hover:underline whitespace-nowrap"
                          >
                            Entry / Info →
                          </a>
                        )}
                      </div>
                      <div className="pl-5 space-y-0.5">
                        {race.date && (
                          <p className="text-xs text-gray-500">
                            {new Date(race.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                          </p>
                        )}
                        {race.location && <p className="text-xs text-gray-500">{race.location}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">Race schedule coming soon — check back later.</p>
              )}
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
