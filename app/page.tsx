import Link from 'next/link'
import { client } from '@/sanity/client'
import { homePageQuery } from '@/sanity/queries'
import { urlFor } from '@/sanity/image'
import HeroSection from '@/components/HeroSection'
import PortableText from '@/components/PortableText'
import { ArrowRight } from 'lucide-react'

export const revalidate = 3600

export default async function HomePage() {
  const page = await client.fetch<Record<string, any>>(homePageQuery)

  const welcomeHeadline = page?.welcomeHeadline ?? "North West Leeds' Friendliest Running Club"
  const abcHeadline = page?.abcHeadline ?? 'Volunteer at the Apperley Bridge Canter'
  const abcBody = page?.abcBody ?? 'The ABC is our flagship annual race and it only happens because of our brilliant volunteers. We need marshals, water station helpers, and finish-line crew. If you can spare a few hours on race day, we\'d love to have you involved — no experience needed.'
  const abcButtonLabel = page?.abcButtonLabel ?? 'Volunteer & Race Info'

  return (
    <>
      <HeroSection
        headline={page?.heroHeadline}
        subtext={page?.heroSubtext}
        imageUrl={page?.heroImage ? urlFor(page.heroImage).width(1920).url() : null}
      />

      {/* Welcome + ABC — 50/50 split */}
      <section className="grid md:grid-cols-2">
        <div className="bg-white py-12 px-8 lg:px-16 flex flex-col">
          <span className="text-brand-blue font-semibold text-xs uppercase tracking-widest">Welcome</span>
          <h2 className="mt-2 text-2xl font-bold text-gray-900 mb-3">
            {welcomeHeadline}
          </h2>
          {page?.welcomeBody ? (
            <div className="flex-1 text-sm [&>div]:!prose-sm [&_p]:text-gray-600 [&_p]:text-sm [&_p]:leading-relaxed [&_p]:mb-0">
              <PortableText value={page.welcomeBody} />
            </div>
          ) : (
            <p className="text-gray-600 text-sm leading-relaxed flex-1">
              We are widely regarded in the running community as one of the friendliest clubs in North West Leeds. We welcome all abilities – from new runners through to experienced competitors. We have a membership of over 200 runners, comprising of men and women aged from 18 – 80. Runners joining us will benefit from the vast knowledge and experience of our members. Whether your ambition is to run competitively or just to improve your fitness and meet new friends, Horsforth Harriers is the club for you!
            </p>
          )}
          <Link
            href="/how-to-join"
            className="mt-5 inline-flex items-center gap-2 px-4 py-2 bg-brand-blue text-white font-semibold text-sm hover:bg-brand-dark transition-colors self-start"
          >
            How to Join <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="bg-gray-900 py-12 px-8 lg:px-16 flex flex-col">
          <span className="text-gray-400 font-semibold text-xs uppercase tracking-widest">Annual Race</span>
          <h2 className="mt-2 text-2xl font-bold text-white mb-3">
            {abcHeadline}
          </h2>
          <p className="text-gray-300 text-sm leading-relaxed flex-1">
            {abcBody}
          </p>
          <Link
            href="/races/abc"
            className="mt-5 inline-flex items-center gap-2 px-4 py-2 bg-white text-gray-900 font-bold text-sm hover:bg-gray-100 transition-colors self-start"
          >
            {abcButtonLabel} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  )
}
