import type { Metadata } from 'next'
import Image from 'next/image'
import { client } from '@/sanity/client'
import { coachesPageQuery } from '@/sanity/queries'

export const metadata: Metadata = { title: 'Coaches' }
export const revalidate = 86400

interface Coach {
  name: string
  role?: string
  email?: string
  phone?: string
  bio?: string
  qualifications?: string
  photo?: { asset: { url: string }; hotspot?: object; crop?: object }
}

export default async function CoachesPage() {
  const page = await client.fetch<Record<string, any>>(coachesPageQuery)
  const coaches: Coach[] = page?.coaches ?? []

  return (
    <>
      <div className="bg-brand-light py-5 border-b border-brand-blue/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-xl font-bold text-brand-blue">{page?.pageHeadline ?? 'Coaches'}</h1>
        </div>
      </div>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{page?.pageSubheading ?? 'Meet the Coaches'}</h2>

          {coaches.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {coaches.map((c) => (
                <div key={c.name} className="border border-gray-200 overflow-hidden">
                  {c.photo?.asset?.url && (
                    <Image
                      src={c.photo.asset.url}
                      alt={c.name}
                      width={400}
                      height={300}
                      className="w-full object-cover object-top"
                    />
                  )}
                  <div className="p-5">
                    <p className="font-bold text-gray-900">{c.name}</p>
                    {c.role && <p className="text-sm text-brand-blue font-medium mt-0.5">{c.role}</p>}
                    {c.qualifications && <p className="text-sm text-gray-500 mt-0.5">{c.qualifications}</p>}
                    {c.bio && <p className="text-sm text-gray-500 mt-2">{c.bio}</p>}
                    {c.email && (
                      <a href={`mailto:${c.email}`} className="text-sm text-brand-blue hover:underline mt-2 block">
                        {c.email}
                      </a>
                    )}
                    {c.phone && <p className="text-sm text-gray-500 mt-1">{c.phone}</p>}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Coach details coming soon.</p>
          )}
        </div>
      </section>
    </>
  )
}
