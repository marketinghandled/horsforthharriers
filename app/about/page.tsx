import type { Metadata } from 'next'
import Image from 'next/image'
import { client } from '@/sanity/client'
import { aboutPageQuery } from '@/sanity/queries'
import { urlFor } from '@/sanity/image'
import PortableText from '@/components/PortableText'

export const metadata: Metadata = { title: 'About' }
export const revalidate = 86400

export default async function AboutPage() {
  const page = await client.fetch<Record<string, any>>(aboutPageQuery)

  const articleSubtitle = page?.articleSubtitle ?? 'Est. 1985'
  const articleTitle = page?.articleTitle ?? 'Over 30 Years of Running in Horsforth'
  const quoteText = page?.quoteText ?? 'People who join us seem to stay with us proving that as a club we must be doing something right. My motto for the club has always been 50% running and 50% social, and long may that continue to be so.'
  const quoteAttribution = page?.quoteAttribution ?? 'Gordon Little — Club President & Founder'
  const founded = page?.founded ?? '1985'
  const memberCount = page?.memberCount ?? '200+'
  const joinUsText = page?.joinUsText ?? 'Horsforth Harriers welcomes runners old and new every Tuesday and Thursday at Horsforth Brewery, 143 New Rd Side, Horsforth, Leeds LS18 4QD.'

  return (
    <>
      {/* Header */}
      <div className="bg-brand-light py-5 border-b border-brand-blue/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-xl font-bold text-brand-blue">{page?.pageHeadline ?? 'About'}</h1>
        </div>
      </div>

      {/* Main content */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12 items-start">

            {/* Left — title + story */}
            <div className="lg:col-span-2 space-y-5">
              <span className="text-brand-blue font-semibold text-xs uppercase tracking-widest">{articleSubtitle}</span>
              <h2 className="text-3xl font-bold text-gray-900">{articleTitle}</h2>

              {page?.bodyText ? (
                <PortableText value={page.bodyText} />
              ) : (
                <>
                  <p className="text-gray-600 leading-relaxed">
                    Horsforth Harriers was established in 1985 following a chance meeting between runners and old friends Gordon Little and John Holmes. After a chat about their running goals, the pair decided to place an advertisement in the Wharfe Valley Times seeking other runners who would be interested in joining a running club in Horsforth. A week or so later the ten potential new club members set out for their first run.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    The club has grown from that initial few to over 200 members in the past 40 years. A few of the original members still remain and founder member Gordon Little is the president of the Club.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    Horsforth Harriers is widely regarded in the running community as the friendliest running club in North West Leeds. It remains a club that welcomes experienced runners, as well as new runners starting out and seeking the encouragement and support of fellow runners.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    The more experienced runner will also find much to inspire them at Horsforth Harriers. The club&apos;s faster runners are constantly striving for improvement and pushing themselves to the limit in races at local, national and international levels. The club has a rich history of race victories in both team and individual categories throughout the three decades since its inception.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    Horsforth Harriers is primarily a road running club and members take part in races from 5K through to marathon, ultra and beyond. Members also take part in cross country, fell and trail races. The club does not consider itself to be an &ldquo;elite&rdquo; club and there is no compulsion for members to take part in races or events.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    The club participates in two cross country leagues during the winter months, as well as sending runners to regional and national championships.
                  </p>
                </>
              )}

              <blockquote className="border-l-4 border-brand-blue pl-5 my-6">
                <p className="text-gray-700 italic leading-relaxed">&ldquo;{quoteText}&rdquo;</p>
                <footer className="mt-3 text-sm font-semibold text-brand-blue">{quoteAttribution}</footer>
              </blockquote>
            </div>

            {/* Right — photo + stats */}
            <div className="space-y-3">
              {page?.photo ? (
                <div className="relative w-full h-56 rounded-xl overflow-hidden">
                  <Image
                    src={urlFor(page.photo).width(600).height(448).url()}
                    alt="Club photo"
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-full h-56 bg-gray-100 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300">
                  <span className="text-gray-400 text-xs">Club photo — coming soon</span>
                </div>
              )}

              {[
                { label: 'Founded', value: founded },
                { label: 'Members', value: memberCount },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-500 text-sm">{label}</span>
                  <span className="font-semibold text-gray-900 text-sm">{value}</span>
                </div>
              ))}

              <div className="pt-4">
                <h3 className="font-bold text-gray-900 mb-2">Come and join us</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{joinUsText}</p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
