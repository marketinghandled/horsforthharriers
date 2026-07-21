import type { Metadata } from 'next'
import Image from 'next/image'
import { client } from '@/sanity/client'
import { abcPageQuery } from '@/sanity/queries'
import PortableText from '@/components/PortableText'
import { urlFor } from '@/sanity/image'

export const metadata: Metadata = { title: 'Apperley Bridge Canter (ABC)' }
export const revalidate = 3600

export default async function AbcPage() {
  const page = await client.fetch<Record<string, any>>(abcPageQuery)

  const headline = page?.pageHeadline ?? 'Apperley Bridge Canter (ABC)'
  const subheading = page?.pageSubheading ?? 'A popular local race organised by Horsforth Harriers.'
  const bodyText = page?.bodyText ?? null
  const contactEmail: string | null = page?.contactEmail ?? null
  const entryUrl: string | null = page?.entryUrl ?? null
  const details: { label: string; value: string }[] = page?.details ?? []
  const volunteerHeading: string = page?.volunteerHeading ?? 'Volunteer at the ABC'
  const volunteerText = page?.volunteerText ?? null
  const volunteerLinkLabel: string | null = page?.volunteerLinkLabel ?? null
  const volunteerLinkUrl: string | null = page?.volunteerLinkUrl ?? null
  const heroImageUrl: string | null = page?.heroImage ? urlFor(page.heroImage).width(600).url() : null
  const volunteerImageUrl: string | null = page?.volunteerImage ? urlFor(page.volunteerImage).width(600).url() : null
  const stravaUrl: string | null = page?.stravaUrl ?? null
  const youtubeUrl: string | null = page?.youtubeUrl ?? null
  const courseRecordImages: { asset: { url: string }; alt?: string }[] = page?.courseRecordImages ?? []
  const youtubeId = youtubeUrl?.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/)?.[1] ?? null

  const abcJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SportsEvent',
    name: headline,
    organizer: {
      '@type': 'SportsOrganization',
      name: 'Horsforth Harriers',
      url: 'https://www.horsforthharriers.co.uk',
    },
    performer: {
      '@type': 'SportsOrganization',
      name: 'Horsforth Harriers',
      url: 'https://www.horsforthharriers.co.uk',
    },
    ...(entryUrl ? { url: entryUrl } : {}),
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(abcJsonLd) }}
      />
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

              {contactEmail && (
                <div className="bg-brand-light border border-brand-blue/20 p-5 space-y-2">
                  <h3 className="font-bold text-brand-blue text-sm uppercase tracking-wide">Race Enquiries</h3>
                  <a
                    href={`mailto:${contactEmail}`}
                    className="flex items-center gap-2 text-sm text-brand-blue hover:underline break-all"
                  >
                    <svg className="w-4 h-4 flex-none" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                    {contactEmail}
                  </a>
                </div>
              )}
            </div>

            {/* Right — race details + entry link */}
            <div className="space-y-8 pt-12 lg:pt-0 lg:pl-12">
              {heroImageUrl && (
                <Image src={heroImageUrl} alt={headline} width={600} height={400} className="w-full h-auto" />
              )}
              <div>
                <span className="text-brand-blue font-semibold text-xs uppercase tracking-widest">Details</span>
                <h2 className="mt-2 text-3xl font-bold text-gray-900">Race Information</h2>
              </div>

              {details.length > 0 && (
                <div className="divide-y divide-gray-100 border border-gray-200">
                  {details.map((item, i) => (
                    <div key={i} className="flex items-start gap-4 px-4 py-3">
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-wide w-28 flex-none pt-0.5">{item.label}</span>
                      <span className="text-sm text-gray-900">{item.value}</span>
                    </div>
                  ))}
                </div>
              )}

              {entryUrl && (
                <a
                  href={entryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-brand-blue text-white font-bold text-sm hover:bg-brand-dark transition-colors"
                >
                  Enter the race
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </a>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Strava / course records / video */}
      {(stravaUrl || courseRecordImages.length > 0 || youtubeId) && (
        <section className="border-t border-gray-200 bg-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

            {stravaUrl && (
              <div>
                <span className="text-brand-blue font-semibold text-xs uppercase tracking-widest">The Route</span>
                <div className="mt-4">
                  <a
                    href={stravaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-brand-blue text-white font-bold text-sm hover:bg-brand-dark transition-colors"
                  >
                    View route on Strava
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                  </a>
                </div>
              </div>
            )}

            {courseRecordImages.length > 0 && (
              <div>
                <span className="text-brand-blue font-semibold text-xs uppercase tracking-widest">Course Records</span>
                <div className={`mt-4 grid gap-4 ${courseRecordImages.length > 1 ? 'sm:grid-cols-2' : 'max-w-lg'}`}>
                  {courseRecordImages.map((img, i) => (
                    <Image
                      key={i}
                      src={urlFor(img).width(800).url()}
                      alt={img.alt ?? 'Course record'}
                      width={800}
                      height={500}
                      className="w-full h-auto"
                    />
                  ))}
                </div>
              </div>
            )}

            {youtubeId && (
              <div>
                <span className="text-brand-blue font-semibold text-xs uppercase tracking-widest">On the Course</span>
                <div className="mt-4 relative aspect-video max-w-3xl">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${youtubeId}`}
                    title="ABC race video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
              </div>
            )}

          </div>
        </section>
      )}

      {/* Volunteer section */}
      <section className="border-t border-gray-200 bg-brand-light py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`grid gap-10 items-center ${volunteerImageUrl ? 'lg:grid-cols-2' : ''}`}>
            <div className="max-w-2xl">
              <span className="text-brand-blue font-semibold text-xs uppercase tracking-widest">Get Involved</span>
              <h2 className="mt-2 text-3xl font-bold text-gray-900">{volunteerHeading}</h2>
              {volunteerText && (
                <div className="mt-4">
                  <PortableText value={volunteerText} />
                </div>
              )}
              {volunteerLinkUrl && (
                <a
                  href={volunteerLinkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-brand-blue text-white font-bold text-sm hover:bg-brand-dark transition-colors"
                >
                  {volunteerLinkLabel ?? 'Sign up to volunteer'}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </a>
              )}
            </div>
            {volunteerImageUrl && (
              <Image src={volunteerImageUrl} alt={volunteerHeading} width={600} height={400} className="w-1/2 h-auto rounded-xl block mx-auto" />
            )}
          </div>
        </div>
      </section>
    </>
  )
}
