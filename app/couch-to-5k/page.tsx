import type { Metadata } from 'next'
import { client } from '@/sanity/client'
import { couchTo5kPageQuery } from '@/sanity/queries'

export const metadata: Metadata = { title: 'Couch to 5K' }
export const revalidate = 86400

export default async function CouchTo5KPage() {
  const page = await client.fetch<Record<string, any>>(couchTo5kPageQuery)

  const introParagraph1 = page?.introParagraph1 ?? 'If you are new to running or just need some extra encouragement then why not sign up to the Horsforth Harriers’ Couch to 5K programme.'
  const introParagraph2 = page?.introParagraph2 ?? 'Each course lasts for nine weeks and comprises a weekly guided run and two solo runs, with a graduation at a local parkrun. The cost is £10 per person, redeemable against club membership upon successful completion of the course.'
  const highlights = page?.highlights ?? [
    'Nine-week structured programme',
    'Weekly guided run plus two solo runs',
    'Graduation at a local parkrun',
    '£10 per person — redeemable against club membership',
    'Guided runs every Tuesday at 7pm',
  ]
  const contactEmail = page?.contactEmail ?? 'C25K@horsforthharriers.co.uk'
  const nextCourseStart = page?.nextCourseStart ?? 'Tuesday 27th January'
  const nextCourseGraduation = page?.nextCourseGraduation ?? 'Saturday 28th March'
  const meetingName = page?.meetingName ?? 'Horsforth Sports Club'
  const meetingAddress = page?.meetingAddress ?? "King George's Field, Brownberrie Lane\nLS18 5SB"
  const meetingTime = page?.meetingTime ?? 'Tuesdays at 7pm'

  const meetingLines = meetingAddress.split('\n').filter(Boolean)

  return (
    <>
      <div className="bg-brand-light py-5 border-b border-brand-blue/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-xl font-bold text-brand-blue">Couch to 5K</h1>
        </div>
      </div>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
<p className="text-gray-600 leading-relaxed mb-4">{introParagraph1}</p>
              <p className="text-gray-600 leading-relaxed mb-6">{introParagraph2}</p>
              <div className="space-y-2 mb-8">
                {highlights.map((point: string) => (
                  <div key={point} className="flex items-start gap-3 py-2 border-b border-gray-100">
                    <div className="w-1.5 h-1.5 bg-brand-blue mt-2 flex-none" />
                    <p className="text-gray-600 text-sm">{point}</p>
                  </div>
                ))}
              </div>
              <a
                href={`mailto:${contactEmail}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-brand-blue text-white font-bold text-sm hover:bg-brand-dark transition-colors"
              >
                Email us to find out more
              </a>
            </div>
            <div className="space-y-6">
              <div className="bg-brand-light border border-brand-blue/20 p-8">
                <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wide">Next Course</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-4">
                    <span className="text-xs font-bold text-brand-blue bg-white border border-brand-blue/20 px-2 py-1 whitespace-nowrap">Starts</span>
                    <p className="text-gray-700 text-sm">{nextCourseStart}</p>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="text-xs font-bold text-brand-blue bg-white border border-brand-blue/20 px-2 py-1 whitespace-nowrap">Graduation</span>
                    <p className="text-gray-700 text-sm">{nextCourseGraduation}</p>
                  </div>
                </div>
              </div>
              <div className="border border-gray-200 p-8">
                <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wide">Meeting Point</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-1">{meetingName}</p>
                {meetingLines.map((line: string, i: number) => (
                  <p key={i} className="text-gray-600 text-sm leading-relaxed mb-1">{line}</p>
                ))}
                <p className="text-brand-blue font-semibold text-sm mt-3">{meetingTime}</p>
              </div>
              <div className="border border-gray-200 p-8">
                <h3 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wide">Get in Touch</h3>
                <a
                  href={`mailto:${contactEmail}`}
                  className="text-brand-blue text-sm hover:underline break-all"
                >
                  {contactEmail}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
