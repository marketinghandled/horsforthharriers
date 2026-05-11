import type { Metadata } from 'next'
import Link from 'next/link'
import { client } from '@/sanity/client'
import { constitutionPageQuery } from '@/sanity/queries'
import ConstitutionAccordion from '@/components/ConstitutionAccordion'

export const metadata: Metadata = { title: 'Club Constitution' }
export const revalidate = 86400

export default async function ConstitutionPage() {
  const page = await client.fetch<{ pageHeadline?: string; sections?: { title: string; body?: any[] }[] } | null>(constitutionPageQuery)

  const pageHeadline = page?.pageHeadline ?? 'Club Constitution'
  const sections = page?.sections ?? []

  return (
    <>
      <div className="bg-brand-light py-5 border-b border-brand-blue/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
            <Link href="/club-documents" className="hover:text-brand-blue transition-colors">Club Documents</Link>
            <span>/</span>
            <span>{pageHeadline}</span>
          </div>
          <h1 className="text-xl font-bold text-brand-blue">{pageHeadline}</h1>
        </div>
      </div>

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gray-500 text-sm mb-6">The founding rules and governance structure of Horsforth Harriers. Click each section to expand.</p>
          {sections.length > 0 ? (
            <ConstitutionAccordion sections={sections} />
          ) : (
            <p className="text-gray-500 text-sm">Content coming soon.</p>
          )}
        </div>
      </section>
    </>
  )
}
