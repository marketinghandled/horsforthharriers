import type { Metadata } from 'next'
import { client } from '@/sanity/client'
import { trainingMatrixPageQuery } from '@/sanity/queries'

export const metadata: Metadata = { title: 'Training Matrix' }
export const revalidate = 3600

type PacingGroup = {
  group: string
  subGroup: string
  paceRange: string
  typicalDistance: string
}

type TrainingMatrixPage = {
  pageHeadline?: string
  introText?: string
  footerNote?: string
  pacingGroups?: PacingGroup[]
}

const FALLBACK_GROUPS: PacingGroup[] = [
  { group: 'A', subGroup: 'A1', paceRange: '7:30', typicalDistance: '9–10' },
  { group: 'A', subGroup: 'A2', paceRange: '7:45', typicalDistance: '8–9' },
  { group: 'A', subGroup: 'A3', paceRange: '8:15', typicalDistance: '7–8' },
  { group: 'B', subGroup: 'B1', paceRange: '8:30', typicalDistance: '7–8' },
  { group: 'B', subGroup: 'B2', paceRange: '9:00', typicalDistance: '6–7' },
  { group: 'B', subGroup: 'B3', paceRange: '9:30', typicalDistance: '6–7' },
  { group: 'C', subGroup: 'C1', paceRange: '10:00', typicalDistance: '5–6' },
  { group: 'C', subGroup: 'C2', paceRange: '11:00', typicalDistance: '5–6' },
  { group: 'C', subGroup: 'C3', paceRange: '12:00', typicalDistance: '3–4' },
  { group: 'C', subGroup: 'C4', paceRange: '13+', typicalDistance: 'up to 3' },
]

const GROUP_STYLES: Record<string, { bg: string; text: string; badge: string; row: string; altRow: string }> = {
  A: {
    bg: 'bg-brand-blue',
    text: 'text-white',
    badge: 'bg-brand-blue text-white',
    row: 'bg-blue-50',
    altRow: 'bg-blue-50/60',
  },
  B: {
    bg: 'bg-sky-600',
    text: 'text-white',
    badge: 'bg-sky-600 text-white',
    row: 'bg-sky-50',
    altRow: 'bg-sky-50/60',
  },
  C: {
    bg: 'bg-emerald-600',
    text: 'text-white',
    badge: 'bg-emerald-600 text-white',
    row: 'bg-emerald-50',
    altRow: 'bg-emerald-50/60',
  },
}

const DEFAULT_STYLE = {
  bg: 'bg-gray-500',
  text: 'text-white',
  badge: 'bg-gray-500 text-white',
  row: 'bg-gray-50',
  altRow: 'bg-gray-50/60',
}

function groupBy<T>(arr: T[], key: (item: T) => string): Map<string, T[]> {
  return arr.reduce((map, item) => {
    const k = key(item)
    map.set(k, [...(map.get(k) ?? []), item])
    return map
  }, new Map<string, T[]>())
}

export default async function TrainingMatrixPage() {
  const page = await client.fetch<TrainingMatrixPage>(trainingMatrixPageQuery)

  const headline = page?.pageHeadline ?? 'Training Matrix'
  const introText = page?.introText ?? 'The training matrix shows each pacing group, the average pace range, and the typical distance covered per session. Use this to find the right group for your current ability and goals.'
  const footerNote = page?.footerNote
  const groups = page?.pacingGroups?.length ? page.pacingGroups : FALLBACK_GROUPS

  const groupOrder = [...new Set(groups.map(g => g.group))]
  const grouped = groupBy(groups, g => g.group)

  return (
    <>
      {/* Page header */}
      <div className="bg-brand-light py-5 border-b border-brand-blue/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-xl font-bold text-brand-blue">{headline}</h1>
        </div>
      </div>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section label + heading */}
          <span className="text-brand-blue font-semibold text-xs uppercase tracking-widest">Pacing</span>
          <h2 className="mt-2 text-3xl font-bold text-gray-900 mb-4">Training Groups</h2>
          <p className="text-gray-600 leading-relaxed mb-10 max-w-2xl">{introText}</p>

          {/* Group legend */}
          <div className="flex flex-wrap gap-3 mb-8">
            {groupOrder.map(g => {
              const style = GROUP_STYLES[g] ?? DEFAULT_STYLE
              return (
                <div key={g} className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${style.badge}`}>
                  <span>Group {g}</span>
                  <span className="font-normal opacity-80">
                    {g === 'A' ? 'Advanced' : g === 'B' ? 'Intermediate' : g === 'C' ? 'Beginner / Social' : ''}
                  </span>
                </div>
              )
            })}
          </div>

          {/* Desktop table */}
          <div className="hidden sm:block overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-800 text-white">
                  <th className="text-left px-5 py-3.5 font-semibold w-24">Group</th>
                  <th className="text-left px-5 py-3.5 font-semibold w-32">Sub-Group</th>
                  <th className="text-left px-5 py-3.5 font-semibold">Avg Pace (min/mile)</th>
                  <th className="text-left px-5 py-3.5 font-semibold">Typical Distance (miles)</th>
                </tr>
              </thead>
              <tbody>
                {groupOrder.map(g => {
                  const rows = grouped.get(g) ?? []
                  const style = GROUP_STYLES[g] ?? DEFAULT_STYLE
                  return rows.map((row, i) => (
                    <tr
                      key={`${row.group}-${row.subGroup}`}
                      className={`border-t border-gray-200 ${i % 2 === 0 ? style.row : style.altRow}`}
                    >
                      {i === 0 && (
                        <td
                          rowSpan={rows.length}
                          className={`px-5 py-0 align-middle border-r border-gray-200 ${style.bg} ${style.text}`}
                        >
                          <span className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 text-xl font-bold mx-auto">
                            {g}
                          </span>
                        </td>
                      )}
                      <td className="px-5 py-3.5 font-semibold text-gray-800">{row.subGroup}</td>
                      <td className="px-5 py-3.5 text-gray-700">{row.paceRange}</td>
                      <td className="px-5 py-3.5 text-gray-700">{row.typicalDistance}</td>
                    </tr>
                  ))
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="sm:hidden space-y-6">
            {groupOrder.map(g => {
              const rows = grouped.get(g) ?? []
              const style = GROUP_STYLES[g] ?? DEFAULT_STYLE
              return (
                <div key={g} className="rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                  <div className={`${style.bg} ${style.text} px-4 py-3 flex items-center gap-3`}>
                    <span className="flex items-center justify-center w-9 h-9 rounded-full bg-white/20 text-lg font-bold">{g}</span>
                    <span className="font-semibold">
                      Group {g} — {g === 'A' ? 'Advanced' : g === 'B' ? 'Intermediate' : 'Beginner / Social'}
                    </span>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {rows.map((row, i) => (
                      <div key={row.subGroup} className={`px-4 py-3 ${i % 2 === 0 ? style.row : style.altRow}`}>
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-gray-800 w-12">{row.subGroup}</span>
                          <span className="text-gray-600 text-sm">{row.paceRange} min/mi</span>
                          <span className="text-gray-600 text-sm">{row.typicalDistance} miles</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>

          {footerNote && (
            <p className="mt-8 text-sm text-gray-500 border-l-4 border-brand-blue pl-4 leading-relaxed">
              {footerNote}
            </p>
          )}
        </div>
      </section>
    </>
  )
}
