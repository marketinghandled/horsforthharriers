import type { Metadata } from 'next'
import { ArrowRight } from 'lucide-react'
import { client } from '@/sanity/client'
import { ballotPageQuery } from '@/sanity/queries'

export const metadata: Metadata = { title: 'Club Ballot' }
export const revalidate = 86400

type BulletSection = { heading: string; bullets: string[] }

const DEFAULTS = {
  pageHeadline: 'Club Ballot',
  contactEmail: 'info@horsforthharriers.co.uk',
  qualifySection: {
    heading: 'To qualify to enter a club ballot for an event (e.g. London Marathon or Brass Monkey), you must:',
    bullets: [],
  },
  londonSection: {
    heading: 'In respect of the London Marathon club ballot, you must also:',
    bullets: [],
  },
  notesSection: {
    heading: 'Please note the following:',
    bullets: [],
  },
  successSection: {
    heading: 'If successful in a club ballot, the club and the relevant ballot winner will undertake the following:',
    bullets: [],
  },
}

function BulletSection({ section }: { section: BulletSection }) {
  return (
    <div className="mb-8">
      <p className="text-gray-900 font-semibold mb-3">{section.heading}</p>
      {section.bullets?.length > 0 && (
        <ul className="space-y-2 ml-1">
          {section.bullets.map((bullet, i) => (
            <li key={i} className="flex items-start gap-3 text-gray-600">
              <div className="w-1.5 h-1.5 bg-brand-blue flex-none mt-2" />
              <span className="leading-relaxed">{bullet}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default async function BallotPage() {
  const page = await client.fetch<Record<string, any>>(ballotPageQuery)

  const pageHeadline = page?.pageHeadline ?? DEFAULTS.pageHeadline
  const contactEmail = page?.contactEmail ?? DEFAULTS.contactEmail
  const qualifySection: BulletSection = page?.qualifySection ?? DEFAULTS.qualifySection
  const londonSection: BulletSection = page?.londonSection ?? DEFAULTS.londonSection
  const notesSection: BulletSection = page?.notesSection ?? DEFAULTS.notesSection
  const successSection: BulletSection = page?.successSection ?? DEFAULTS.successSection

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
            <BulletSection section={qualifySection} />
            <BulletSection section={londonSection} />
            <BulletSection section={notesSection} />
            <BulletSection section={successSection} />

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
