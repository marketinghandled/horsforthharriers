import type { Metadata } from 'next'
import Link from 'next/link'
import { client } from '@/sanity/client'
import { clubDocumentsPageQuery } from '@/sanity/queries'

export const metadata: Metadata = { title: 'Club Documents' }

const PAGES = [
  {
    title: 'Club Constitution',
    desc: 'The founding rules and governance structure of Horsforth Harriers.',
    href: '/club-documents/constitution',
  },
  {
    title: 'Terms & Conditions',
    desc: 'Terms and conditions for club membership and participation.',
    href: '/club-documents/terms-and-conditions',
  },
  {
    title: 'Health & Safety',
    desc: 'Our commitment to the safety of all members and guests.',
    href: '/club-documents/health-and-safety',
  },
  {
    title: 'Privacy Policy',
    desc: 'How we collect, use, and protect member data.',
    href: '/club-documents/privacy-policy',
  },
]

type CmsDocument = {
  title: string
  description?: string
  fileUrl?: string
  url?: string
}

type PageData = {
  pageHeadline?: string
  documents?: CmsDocument[]
}

export default async function ClubDocumentsPage() {
  const page = await client.fetch<PageData | null>(clubDocumentsPageQuery)

  const headline = page?.pageHeadline ?? 'Club Documents'
  const cmsDocuments = page?.documents ?? []

  return (
    <>
      <div className="bg-brand-light py-5 border-b border-brand-blue/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-xl font-bold text-brand-blue">{headline}</h1>
        </div>
      </div>

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PAGES.map((doc) => (
              <Link
                key={doc.title}
                href={doc.href}
                className="bg-white border border-gray-200 p-5 hover:border-brand-blue hover:shadow-sm transition-all group"
              >
                <h3 className="font-bold text-gray-900 mb-2 text-sm group-hover:text-brand-blue transition-colors">{doc.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{doc.desc}</p>
                <span className="text-xs text-brand-blue mt-3 block">View document →</span>
              </Link>
            ))}
            {cmsDocuments.map((doc) => {
              const href = doc.fileUrl ?? doc.url ?? '#'
              return (
                <a
                  key={doc.title}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white border border-gray-200 p-5 hover:border-brand-blue hover:shadow-sm transition-all group"
                >
                  <h3 className="font-bold text-gray-900 mb-2 text-sm group-hover:text-brand-blue transition-colors">{doc.title}</h3>
                  {doc.description && <p className="text-gray-500 text-xs leading-relaxed">{doc.description}</p>}
                  <span className="text-xs text-brand-blue mt-3 block">Download PDF →</span>
                </a>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
