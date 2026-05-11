import type { Metadata } from 'next'
import Image from 'next/image'
import { client } from '@/sanity/client'
import { committeePageQuery } from '@/sanity/queries'

export const metadata: Metadata = { title: 'Committee' }
export const revalidate = 86400

interface CommitteeMember {
  name: string
  role?: string
  email?: string
  phone?: string
  bio?: string
  photo?: { asset: { url: string }; hotspot?: object; crop?: object }
}

export default async function CommitteePage() {
  const page = await client.fetch<Record<string, any>>(committeePageQuery)
  const members: CommitteeMember[] = page?.committeeMembers ?? []

  return (
    <>
      <div className="bg-brand-light py-5 border-b border-brand-blue/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-xl font-bold text-brand-blue">{page?.pageHeadline ?? 'Committee'}</h1>
          <p className="text-gray-600 max-w-3xl mt-2 text-sm">
            The club committee oversees the finances and governance of the club. They coordinate the events, training,
            communications and competitions. If you have questions about the club please contact the committee using
            the contact details below.
          </p>
        </div>
      </div>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {members.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {members.map((m) => (
                <div key={m.name} className="overflow-hidden">
                  {m.photo?.asset?.url && (
                    <div className="relative h-56 w-full bg-white">
                      <Image
                        src={m.photo.asset.url}
                        alt={m.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}
                  <div className="p-5">
                    <p className="font-bold text-gray-900">{m.name}</p>
                    {m.role && <p className="text-sm text-brand-blue font-medium mt-0.5">{m.role}</p>}
                    {m.bio && <p className="text-sm text-gray-500 mt-2">{m.bio}</p>}
                    {m.email && (
                      <a href={`mailto:${m.email}`} className="text-sm text-brand-blue hover:underline mt-2 block">
                        {m.email}
                      </a>
                    )}
                    {m.phone && <p className="text-sm text-gray-500 mt-1">{m.phone}</p>}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Committee details coming soon.</p>
          )}

          <p className="text-sm text-gray-500 mt-10">
            General enquiries:{' '}
            <a href="mailto:info@horsforthharriers.co.uk" className="text-brand-blue hover:underline">
              info@horsforthharriers.co.uk
            </a>
          </p>
        </div>
      </section>
    </>
  )
}
