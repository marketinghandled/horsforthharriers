import type { Metadata } from 'next'
import { ArrowRight } from 'lucide-react'
import { client } from '@/sanity/client'
import { ballotPageQuery } from '@/sanity/queries'

export const metadata: Metadata = { title: 'Club Ballot' }
export const revalidate = 86400

const DEFAULTS = {
  pageHeadline: 'Club Ballot',
  introParagraph: '',
  contactEmail: 'info@horsforthharriers.co.uk',
  section: {
    heading: '',
    bullets: [] as string[],
  },
}

export default async function BallotPage() {
  const page = await client.fetch<Record<string, any>>(ballotPageQuery)

  const pageHeadline = page?.pageHeadline ?? DEFAULTS.pageHeadline
  const introParagraph = page?.introParagraph ?? DEFAULTS.introParagraph
  const contactEmail = page?.contactEmail ?? DEFAULTS.contactEmail
  const section = page?.section ?? DEFAULTS.section

  return (
    <>
      {/* Header */}
      <div className="bg-brand-light py-5 border-b border-brand-blue/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-xl font-bold text-brand-blue">{pageHeadline}</h1>
        </div>
      </div>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            {introParagraph && (
              <p className="text-gray-600 leading-relaxed mb-8">{introParagraph}</p>
            )}

            {section.heading && (
              <div className="mb-8">
                <p className="text-gray-900 font-semibold mb-3">{section.heading}</p>
                {section.bullets?.length > 0 && (
                  <ul className="space-y-2 ml-1">
                    {section.bullets.map((bullet: string, i: number) => (
                      <li key={i} className="flex items-start gap-3 text-gray-600">
                        <div className="w-1.5 h-1.5 bg-brand-blue flex-none mt-2" />
                        <span className="leading-relaxed">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            <a
              href={`mailto:${contactEmail}`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-blue text-white font-bold text-sm hover:bg-brand-dark transition-colors"
            >
              Contact the committee <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
