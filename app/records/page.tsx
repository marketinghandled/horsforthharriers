import type { Metadata } from 'next'
import { client } from '@/sanity/client'
import { clubRecordsPageQuery } from '@/sanity/queries'

export const metadata: Metadata = { title: 'Club Records' }
export const revalidate = 3600

type RecordHolder = {
  name?: string
  time?: string
  event?: string
  date?: string
  evidenceLink?: string
}

type RecordEntry = {
  distance: string
  men?: RecordHolder
  women?: RecordHolder
}

type ClubRecordsPage = {
  pageHeadline?: string
  pageSubheading?: string
  records?: RecordEntry[]
}

function HolderCell({ holder }: { holder?: RecordHolder }) {
  if (!holder?.name && !holder?.time) {
    return <span className="text-gray-300">—</span>
  }
  return (
    <div className="space-y-0.5">
      {holder.name && <p className="font-medium text-gray-900">{holder.name}</p>}
      {holder.time && <p className="text-brand-blue font-semibold">{holder.time}</p>}
      {holder.event && <p className="text-gray-500 text-xs">{holder.event}</p>}
      {holder.date && <p className="text-gray-400 text-xs">{holder.date}</p>}
      {holder.evidenceLink && (
        <a
          href={holder.evidenceLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-brand-blue underline underline-offset-2 hover:opacity-70"
        >
          Evidence
        </a>
      )}
    </div>
  )
}

export default async function RecordsPage() {
  const page = await client.fetch<ClubRecordsPage>(clubRecordsPageQuery)

  const headline = page?.pageHeadline ?? 'Club Records'
  const subheading = page?.pageSubheading ?? 'Records are updated periodically. If you believe a record should be updated, please contact the committee.'
  const records = page?.records ?? []

  return (
    <>
      <div className="bg-brand-light py-5 border-b border-brand-blue/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-xl font-bold text-brand-blue">{headline}</h1>
        </div>
      </div>

      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-gray-500 mb-10 border-l-4 border-brand-blue pl-4">
            {subheading}
          </p>

          {records.length === 0 ? (
            <p className="text-gray-400 text-sm">No records have been added yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border border-gray-200">
                    <th className="text-left px-4 py-3 font-semibold text-gray-700 w-32">Distance</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700">Men</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700">Women</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((row, i) => (
                    <tr key={row.distance} className={`border-x border-b border-gray-200 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                      <td className="px-4 py-3 font-medium text-gray-900 align-top">{row.distance}</td>
                      <td className="px-4 py-3 align-top"><HolderCell holder={row.men} /></td>
                      <td className="px-4 py-3 align-top"><HolderCell holder={row.women} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
