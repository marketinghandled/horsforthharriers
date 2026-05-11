import type { Metadata } from 'next'
import { client } from '@/sanity/client'
import { membershipPageQuery } from '@/sanity/queries'
import MembershipForm from '@/components/MembershipForm'

export const metadata: Metadata = { title: 'Membership Application' }
export const revalidate = 86400

const defaultOptions = [
  { id: 'A', label: 'Competitive Membership Fee – existing members', detail: 'Includes England Athletics Competition Licence. By selecting this option and providing payment you will receive an EA Competition licence entitling you to compete in all EA events as an affiliated member of Horsforth Harriers.', price: 40 },
  { id: 'B', label: 'Non-competitive Membership Fee – existing members', detail: '', price: 17 },
  { id: 'C', label: 'Competitive Membership Fee – new members', detail: 'Includes England Athletics Competition Licence and Club Vest. By selecting this option and providing payment you will receive an EA Competition licence entitling you to compete in all EA events as an affiliated member of Horsforth Harriers. Please note that a Club T-shirt is available as opposed to a Club Vest for an additional £2.00.', price: 63 },
  { id: 'D', label: 'Non-competitive Membership Fee – new members', detail: '', price: 17 },
  { id: 'E', label: 'Second claim membership of Horsforth Harriers', detail: 'My EA Licence has been purchased via my first claim club.', price: 15 },
  { id: 'F', label: 'Social membership', detail: '', price: 10 },
  { id: 'G', label: 'Competitive Membership Fee plus Re-joining Fee', detail: "Includes England Athletics' Competition Licence. Includes additional £5.00 fee for members who let their membership expire.", price: 45 },
  { id: 'H', label: 'Non-competitive Membership Fee plus Re-joining Fee', detail: 'Includes additional £5.00 fee for members who let their membership expire.', price: 22 },
]

const defaultPayment = {
  confirmationIntro: 'Thanks for completing the Horsforth Harriers membership form. In order to progress your application please pay the appropriate fee. No action will be taken by the club until the fee is paid.',
  bankAccountName: 'Horsforth Harriers Running Club',
  bankAccountNumber: '19913660',
  bankSortCode: '30-99-50',
  noTransferContactName: 'Steve Wood',
  noTransferContactEmail: 'steve.w.wood@outlook.com',
}

const defaultFeePeriodNote = '1st April 2026 to 31st December 2026'

export default async function MembershipPage() {
  const page = await client.fetch<Record<string, any>>(membershipPageQuery)

  const options = page?.membershipOptions?.length ? page.membershipOptions : defaultOptions
  const feePeriodNote = page?.feePeriodNote ?? defaultFeePeriodNote
  const payment = {
    confirmationIntro: page?.confirmationIntro ?? defaultPayment.confirmationIntro,
    bankAccountName: page?.bankAccountName ?? defaultPayment.bankAccountName,
    bankAccountNumber: page?.bankAccountNumber ?? defaultPayment.bankAccountNumber,
    bankSortCode: page?.bankSortCode ?? defaultPayment.bankSortCode,
    noTransferContactName: page?.noTransferContactName ?? defaultPayment.noTransferContactName,
    noTransferContactEmail: page?.noTransferContactEmail ?? defaultPayment.noTransferContactEmail,
  }

  return (
    <>
      <div className="bg-brand-light py-5 border-b border-brand-blue/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-xl font-bold text-brand-blue">{page?.pageHeadline ?? 'Membership Application Form 2026-27'}</h1>
        </div>
      </div>

      <MembershipForm options={options} feePeriodNote={feePeriodNote} payment={payment} />
    </>
  )
}
