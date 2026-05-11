import type { Metadata } from 'next'
import Image from 'next/image'
import { client } from '@/sanity/client'
import { abcPageQuery } from '@/sanity/queries'
import PortableText from '@/components/PortableText'

export const metadata: Metadata = { title: 'Apperley Bridge Canter (ABC)' }
export const revalidate = 86400

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
                <Image src={heroImageUrl} alt={headline} width={600} height={360} className="w-full h-auto" />
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

      {/* Volunteer section */}
      <section className="border-t border-gray-200 bg-brand-light py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
        </div>
      </section>
    </>
  )
}
