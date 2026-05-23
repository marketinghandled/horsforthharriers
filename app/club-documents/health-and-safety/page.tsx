import type { Metadata } from 'next'
import Link from 'next/link'
import { client } from '@/sanity/client'
import { healthAndSafetyPageQuery } from '@/sanity/queries'
import PortableText from '@/components/PortableText'

export const metadata: Metadata = { title: 'Health & Safety' }
export const revalidate = 60

export default async function HealthAndSafetyPage() {
  const page = await client.fetch<Record<string, any>>(healthAndSafetyPageQuery)

  const pageHeadline = page?.pageHeadline ?? 'Health & Safety'

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
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {page?.contacts?.length > 0 && (
            <div className="mb-10 border-b border-gray-200 pb-8">
              <ul className="space-y-3">
                {page.contacts.map((contact: { name?: string; role?: string; email?: string }, i: number) => (
                  <li key={i} className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-3">
                    <span className="font-semibold text-gray-900 text-sm">{contact.name}</span>
                    {contact.role && (
                      <span className="text-gray-500 text-sm">{contact.role}</span>
                    )}
                    {contact.email && (
                      <a href={`mailto:${contact.email}`} className="text-brand-blue text-sm hover:underline sm:ml-auto">
                        {contact.email}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {page?.bodyText ? (
            <PortableText value={page.bodyText} />
          ) : (
            <p className="text-gray-500 text-sm">Content coming soon.</p>
          )}
        </div>
      </section>
    </>
  )
}
