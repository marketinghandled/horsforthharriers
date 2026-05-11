import type { Metadata } from 'next'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import { client } from '@/sanity/client'
import { sessionsPageQuery } from '@/sanity/queries'
import { MapPin, ExternalLink, ArrowRight } from 'lucide-react'

export const metadata: Metadata = { title: 'Training Sessions' }
export const revalidate = 86400

type DetailRow = { _key: string; label: string; value: string }

export default async function SessionsPage() {
  const page = await client.fetch<Record<string, any>>(sessionsPageQuery)

  // ── Quick links ──────────────────────────────────────────────────
  const harrierHubLabel = page?.harrierHubLabel ?? 'Members: check Harrier Hub for the latest sessions'
  const harrierHubUrl   = page?.harrierHubUrl   ?? 'https://horsforthharriers.co.uk'
  const newMembersLabel = page?.newMembersLabel  ?? 'New members: register here'

  // ── Tuesday ──────────────────────────────────────────────────────
  const tuesdayLabel   = page?.tuesdayLabel   ?? 'Weekly'
  const tuesdayHeadline = page?.tuesdayHeadline ?? 'Tuesday Club Run'
  const tuesdayBody    = page?.tuesdayBody
  const tuesdayDetails: DetailRow[] = page?.tuesdayDetails ?? [
    { _key: 'meet',   label: 'Meet',   value: '143 New Rd Side, Horsforth, Leeds LS18 4QD' },
    { _key: 'arrive', label: 'Arrive', value: '6:15pm' },
    { _key: 'start',  label: 'Start',  value: '6:30pm' },
    { _key: 'level',  label: 'Level',  value: 'All abilities' },
  ]
  const tuesdayLocationName    = page?.tuesdayLocationName    ?? 'Horsforth Brewery'
  const tuesdayLocationAddress = page?.tuesdayLocationAddress ?? '143 New Rd Side, Horsforth, Leeds LS18 4QD'
  const tuesdayMapEmbedUrl     = page?.tuesdayMapEmbedUrl

  // ── Thursday ─────────────────────────────────────────────────────
  const thursdayLabel   = page?.thursdayLabel   ?? 'Speed work'
  const thursdayHeadline = page?.thursdayHeadline ?? 'Thursday Sessions'

  const winterBadge       = page?.winterBadge       ?? 'September – March'
  const winterTitle       = page?.winterTitle       ?? 'Winter Sessions'
  const winterDescription = page?.winterDescription ?? 'Structured street-lit sessions in and around Horsforth and Cookridge. Routes vary each week — members should check the Harrier Hub for the current week\'s meeting point and route.'
  const winterDetails: DetailRow[] = page?.winterDetails ?? [
    { _key: 'time',     label: 'Time',     value: '6:30pm' },
    { _key: 'location', label: 'Location', value: 'Varies — check Harrier Hub' },
    { _key: 'type',     label: 'Type',     value: 'Street-lit structured runs' },
  ]
  const winterLinkText = page?.winterLinkText ?? 'Check Harrier Hub'
  const winterLinkUrl  = page?.winterLinkUrl  ?? 'https://horsforthharriers.co.uk'

  const summerBadge       = page?.summerBadge       ?? 'April – August'
  const summerTitle       = page?.summerTitle       ?? 'Summer Sessions'
  const summerDescription = page?.summerDescription ?? 'Summer speed sessions are held at Trinity Track. A great opportunity to work on your pace with coached interval and tempo sessions in a proper track environment.'
  const summerDetails: DetailRow[] = page?.summerDetails ?? [
    { _key: 'time',     label: 'Time',     value: '6:30pm' },
    { _key: 'location', label: 'Location', value: 'Trinity Track, Leeds' },
    { _key: 'type',     label: 'Type',     value: 'Track intervals & tempo' },
  ]
  const summerLinkText = page?.summerLinkText as string | undefined
  const summerLinkUrl  = page?.summerLinkUrl  as string | undefined

  const mapSrc = tuesdayMapEmbedUrl ?? `https://maps.google.com/maps?q=${encodeURIComponent(tuesdayLocationAddress)}&output=embed`

  return (
    <>
      {/* Header */}
      <div className="bg-brand-light py-5 border-b border-brand-blue/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-xl font-bold text-brand-blue">
            {page?.pageHeadline ?? 'Sessions'}
          </h1>
        </div>
      </div>

      {/* Quick links bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-8">
          <a
            href={harrierHubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-blue hover:underline"
          >
            {harrierHubLabel} <ExternalLink className="w-3.5 h-3.5 flex-none" />
          </a>
          <span className="hidden sm:block w-px h-4 bg-gray-200" />
          <Link
            href="/how-to-join"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-brand-blue transition-colors"
          >
            {newMembersLabel} <ArrowRight className="w-3.5 h-3.5 flex-none" />
          </Link>
        </div>
      </div>

      {/* Tuesday */}
      <section id="tuesday" className="py-20 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <span className="text-brand-blue font-semibold text-xs uppercase tracking-widest">
                {tuesdayLabel}
              </span>
              <h2 className="mt-3 text-3xl font-bold text-gray-900 mb-6">{tuesdayHeadline}</h2>

              {tuesdayBody && (
                <div className="text-gray-600 leading-relaxed mb-6 prose prose-sm max-w-none">
                  <PortableText value={tuesdayBody} />
                </div>
              )}

              <div className="space-y-3">
                {tuesdayDetails.map(({ _key, label, value }) => (
                  <div key={_key} className="flex items-start gap-3 py-2.5 border-b border-gray-100">
                    <span className="text-gray-400 text-sm w-20 flex-none">{label}</span>
                    <span className="text-gray-900 font-medium text-sm">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 overflow-hidden">
              <iframe
                src={mapSrc}
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={tuesdayLocationName}
              />
              <div className="p-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-brand-blue flex-none mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{tuesdayLocationName}</p>
                    <p className="text-gray-500 text-xs">{tuesdayLocationAddress}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Thursday */}
      <section id="thursday" className="py-20 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-brand-blue font-semibold text-xs uppercase tracking-widest">
            {thursdayLabel}
          </span>
          <h2 className="mt-3 text-3xl font-bold text-gray-900 mb-10">{thursdayHeadline}</h2>
          <div className="grid md:grid-cols-2 gap-6">

            {/* Winter */}
            <div className="bg-white border border-gray-200 p-7">
              <div className="inline-block px-2 py-0.5 bg-brand-light text-brand-blue text-xs font-semibold mb-4">
                {winterBadge}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{winterTitle}</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-5">{winterDescription}</p>
              <div className="space-y-2 text-sm text-gray-600 mb-6">
                {winterDetails.map(({ _key, label, value }, i) => (
                  <div
                    key={_key}
                    className={`flex items-center gap-2 py-2${i < winterDetails.length - 1 ? ' border-b border-gray-100' : ''}`}
                  >
                    <span className="text-gray-400 w-20">{label}</span>
                    <span className="font-medium text-gray-900">{value}</span>
                  </div>
                ))}
              </div>
              {winterLinkText && winterLinkUrl && (
                <a
                  href={winterLinkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-brand-blue font-semibold hover:underline"
                >
                  {winterLinkText} <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>

            {/* Summer */}
            <div className="bg-white border border-gray-200 p-7">
              <div className="inline-block px-2 py-0.5 bg-green-100 text-green-700 text-xs font-semibold mb-4">
                {summerBadge}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{summerTitle}</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-5">{summerDescription}</p>
              <div className="space-y-2 text-sm text-gray-600 mb-6">
                {summerDetails.map(({ _key, label, value }, i) => (
                  <div
                    key={_key}
                    className={`flex items-center gap-2 py-2${i < summerDetails.length - 1 ? ' border-b border-gray-100' : ''}`}
                  >
                    <span className="text-gray-400 w-20">{label}</span>
                    <span className="font-medium text-gray-900">{value}</span>
                  </div>
                ))}
              </div>
              {summerLinkText && summerLinkUrl && (
                <a
                  href={summerLinkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-brand-blue font-semibold hover:underline"
                >
                  {summerLinkText} <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>

          </div>
        </div>
      </section>

    </>
  )
}
