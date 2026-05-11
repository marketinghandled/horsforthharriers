import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { client } from '@/sanity/client'
import { howToJoinPageQuery } from '@/sanity/queries'
import PortableText from '@/components/PortableText'

export const metadata: Metadata = { title: 'How to Join Us' }
export const revalidate = 86400

type Faq = { question: string; answer: string }

const defaultFaqs: Faq[] = [
  {
    question: 'Where do you meet?',
    answer: 'Horsforth Harriers meet every Tuesday from 6:15pm. Groups set off at 6:30pm. We meet at Horsforth Brewery, 143 New Rd Side, Horsforth, Leeds LS18 4QD. See the contact page for full address and a map. Please contact us before you attend for the first time as we are using a booking system.',
  },
  {
    question: 'Where can I park?',
    answer: "There is a dedicated car park and nearby street parking. Please be aware of restricted zones and don't upset the locals!",
  },
  {
    question: 'Are there showers?',
    answer: 'Unfortunately there are no shower facilities at the brewery, so we recommend coming ready to run and heading home to freshen up afterwards.',
  },
  {
    question: 'Is there a safe place to leave valuables?',
    answer: "We don't have exclusive use of the building and ask that you try to leave your valuables at home or carry them on your run.",
  },
  {
    question: 'Is the club open all year round?',
    answer: 'Open all year and in all weather. No excuses!',
  },
  {
    question: 'Do I have to buy a vest and take part in races?',
    answer: 'A club vest is included in your joining fee and you will be encouraged to take part in relays and to proudly wear your club colours whenever you race. Club t-shirts, hoodies and other merchandise is also available.',
  },
  {
    question: 'Once I have joined, how do I obtain my club vest?',
    answer: 'To obtain your club vest please contact Louise Bisset. Message Louise on: 07534 034339 or email her from the contact page.',
  },
  {
    question: 'Will there be a group to suit my ability?',
    answer: '',
  },
  {
    question: 'How will I be kept informed of any activities?',
    answer: 'We have a closed Facebook group, targeted emails and of course this website!',
  },
  {
    question: 'Will I be asked to become involved in any voluntary work?',
    answer: '',
  },
  {
    question: 'How do I join?',
    answer: 'Click the Membership Application button on this page. We look forward to seeing you soon!',
  },
]

export default async function HowToJoinPage() {
  const page = await client.fetch<Record<string, any>>(howToJoinPageQuery)

  const intro = page?.intro ?? 'Runners of all ages and abilities are always welcome at Horsforth Harriers, we cater for one and all. We also have two members able to communicate in BSL, so this includes deaf runners.'
  const feesYear = page?.feesYear ?? '2026/27'
  const feesPeriod = page?.feesPeriod ?? '1st April 2026 to 31st March 2027'
  const rejoinFeeNote = page?.rejoinFeeNote ?? 'An additional re-joining fee of £5 is applicable for members who let their membership expire, i.e. do not pay by the end of April 2026.'
  const tshirtNote = page?.tshirtNote ?? '* Please note that a T-shirt is an additional £2 which can be paid at the time of joining or later upon collection.'
  const socialMembershipBody = page?.socialMembershipBody ?? 'Social membership is £10 and is for non-running members and allows participation in all social events organised by Horsforth Harriers.'
  const memberBenefitsHeading = page?.memberBenefitsHeading ?? 'Member Benefits'
  const memberBenefitsBody = page?.memberBenefitsBody ?? "Members of Horsforth Harriers receive discounts at selected local and national retailers, including running shops and sportswear suppliers. Details of current partner discounts are shared via the club's Facebook group and member emails."
  const faqs: Faq[] = page?.faqs?.length ? page.faqs : defaultFaqs

  return (
    <>
      <div className="bg-brand-light py-5 border-b border-brand-blue/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-xl font-bold text-brand-blue">{page?.pageHeadline ?? 'How to Join Us'}</h1>
        </div>
      </div>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          <p className="text-gray-700 leading-relaxed mb-12 text-base">{intro}</p>

          {/* Fees */}
          <div className="mb-14">
            <h2 className="text-xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200">
              {feesYear} Fees{' '}
              <span className="text-gray-500 font-normal text-base">({feesPeriod})</span>
            </h2>

            <div className="space-y-8">
              {/* Existing members */}
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Existing members</h3>
                {page?.existingMembersBody ? (
                  <div className="text-sm text-gray-600 leading-relaxed">
                    <PortableText value={page.existingMembersBody} />
                  </div>
                ) : (
                  <p className="text-gray-600 text-sm leading-relaxed mb-3">
                    If paid before the end of April 2026 competitive membership renewal is <strong>£40</strong> which
                    includes the £23 England Athletics (EA) Competition Licence. The EA Competition Licence enables
                    runners to compete in EA events as an affiliated member of Horsforth Harriers. Non-competitive
                    membership, which excludes the EA Licence is <strong>£17</strong>.
                  </p>
                )}
                <p className="text-gray-600 text-sm leading-relaxed mt-2">{rejoinFeeNote}</p>
              </div>

              {/* New members */}
              <div>
                <h3 className="font-bold text-gray-900 mb-2">New members</h3>
                {page?.newMembersIntro ? (
                  <div className="text-sm text-gray-600 leading-relaxed mb-4">
                    <PortableText value={page.newMembersIntro} />
                  </div>
                ) : (
                  <>
                    <p className="text-gray-600 text-sm leading-relaxed mb-3">
                      Prospective members are welcome to run with us a couple of times before deciding whether to join.
                      Please use the Contact option on the website to contact our Membership Secretary about this, they
                      will provide you with all the information you need.
                    </p>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      New competitive membership includes the EA Competition Licence and a Horsforth Harriers vest or
                      T-shirt* whilst new non-competitive membership excludes both of these items.
                    </p>
                  </>
                )}

                {page?.newMemberFees?.length ? (
                  <div className="bg-gray-50 border border-gray-200 p-4 text-sm text-gray-700 space-y-1.5">
                    {page.newMemberFees.map((row: { period: string; competitivePrice: number; nonCompetitivePrice: number }, i: number) => (
                      <React.Fragment key={i}>
                        <div className="flex justify-between gap-4">
                          <span>{row.period} — competitive</span>
                          <span className="font-bold whitespace-nowrap">£{row.competitivePrice}</span>
                        </div>
                        <div className="flex justify-between gap-4">
                          <span>{row.period} — non-competitive</span>
                          <span className="font-bold whitespace-nowrap">£{row.nonCompetitivePrice}</span>
                        </div>
                      </React.Fragment>
                    ))}
                  </div>
                ) : (
                  <div className="bg-gray-50 border border-gray-200 p-4 text-sm text-gray-700 space-y-1.5">
                    <div className="flex justify-between gap-4">
                      <span>1st April 2026 to 31st December 2026 — competitive</span>
                      <span className="font-bold whitespace-nowrap">£63</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span>1st April 2026 to 31st December 2026 — non-competitive</span>
                      <span className="font-bold whitespace-nowrap">£17</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span>1st January 2027 to 31st March 2027 — competitive (covers fees up to 31st March 2028)</span>
                      <span className="font-bold whitespace-nowrap">£63</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span>1st January 2027 to 31st March 2027 — non-competitive (covers fees up to 31st March 2028)</span>
                      <span className="font-bold whitespace-nowrap">£17</span>
                    </div>
                  </div>
                )}
                <p className="text-gray-500 text-xs mt-2">{tshirtNote}</p>
              </div>

              {/* Social membership */}
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Social membership</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{socialMembershipBody}</p>
              </div>
            </div>
          </div>

          {/* Member discounts */}
          <div className="mb-14">
            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-3 border-b border-gray-200">
              {memberBenefitsHeading}
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              {memberBenefitsBody}
            </p>
          </div>

          {/* Q&A */}
          <div className="mb-14">
            <h2 className="text-xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200">
              Horsforth Harriers Q &amp; A
            </h2>
            <dl className="space-y-6">
              {faqs.map((item) => (
                <div key={item.question} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                  <dt className="font-bold text-gray-900 mb-1.5">{item.question}</dt>
                  <dd className="text-gray-600 text-sm leading-relaxed">
                    {item.question === 'Will there be a group to suit my ability?' ? (
                      item.answer || (
                        <>
                          Don&apos;t worry about this. We have many groups from beginner to winner. All our group
                          leaders are England Athletics qualified and fully insured. Full details of all training
                          groups and paces can be found in the{' '}
                          <Link href="/sessions/matrix" className="text-brand-blue hover:underline">
                            Training Matrix
                          </Link>{' '}
                          under the Sessions section of this website.
                        </>
                      )
                    ) : item.question === 'Will I be asked to become involved in any voluntary work?' ? (
                      item.answer || (
                        <>
                          We hold our own race each year which boosts club funds (the{' '}
                          <Link href="/races/abc" className="text-brand-blue hover:underline">
                            Apperley Bridge Canter
                          </Link>
                          ). We ask for volunteers from our membership to guarantee the future and continuing
                          success of the race. From time to time we may also ask you to volunteer at regional
                          cross country and vets&apos; races.
                        </>
                      )
                    ) : (
                      item.answer
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* CTA */}
          <div className="bg-brand-light border border-brand-blue/20 p-8 text-center">
            <p className="text-gray-700 mb-5 text-sm">Apply for membership here:</p>
            <Link
              href="/membership"
              className="inline-flex items-center gap-2 px-8 py-3 bg-brand-blue text-white font-bold text-sm hover:bg-brand-dark transition-colors"
            >
              Membership Application <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>
    </>
  )
}
