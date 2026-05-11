'use client'

import { useState } from 'react'

type MembershipOption = {
  id: string
  label: string
  detail?: string
  price: number
}

type PaymentDetails = {
  confirmationIntro: string
  bankAccountName: string
  bankAccountNumber: string
  bankSortCode: string
  noTransferContactName: string
  noTransferContactEmail: string
}

type Props = {
  options: MembershipOption[]
  feePeriodNote: string
  payment: PaymentDetails
}

export default function MembershipForm({ options, feePeriodNote, payment }: Props) {
  const [selectedOption, setSelectedOption] = useState<string>('')
  const [submitted, setSubmitted] = useState(false)

  const selectedPrice = options.find((o) => o.id === selectedOption)?.price ?? 0

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-brand-light border border-brand-blue/20 p-8 space-y-6">
          <p className="text-gray-700 leading-relaxed">{payment.confirmationIntro}</p>

          <div className="border-t border-brand-blue/20 pt-6 space-y-2 text-sm text-gray-700">
            <p className="font-bold uppercase tracking-wide text-xs text-gray-500 mb-3">Bank Transfer Details</p>
            <div className="flex gap-2">
              <span className="text-gray-500 w-40 flex-none">Account Name</span>
              <span className="font-semibold">{payment.bankAccountName}</span>
            </div>
            <div className="flex gap-2">
              <span className="text-gray-500 w-40 flex-none">Account No</span>
              <span className="font-semibold">{payment.bankAccountNumber}</span>
            </div>
            <div className="flex gap-2">
              <span className="text-gray-500 w-40 flex-none">Sort Code</span>
              <span className="font-semibold">{payment.bankSortCode}</span>
            </div>
          </div>

          <p className="text-sm text-gray-600">
            Ensure you state your name as the reference on your transfer.
          </p>

          <p className="text-sm text-gray-600">
            If you do not have the facility to make a bank transfer please contact{' '}
            <a href={`mailto:${payment.noTransferContactEmail}`} className="text-brand-blue hover:underline">
              {payment.noTransferContactName}
            </a>
            .
          </p>

          <p className="text-xs text-gray-500">{feePeriodNote}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <p className="text-gray-600 text-sm mb-8">
        Effective from {feePeriodNote}. Once the form has been submitted, the screen will display how to make your payment.
      </p>

      {/* Options table */}
      <div className="mb-10 overflow-x-auto">
        <table className="w-full text-sm border border-gray-200">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-4 py-3 text-left font-bold text-gray-700 w-10">Option</th>
              <th className="px-4 py-3 text-left font-bold text-gray-700">Description</th>
              <th className="px-4 py-3 text-right font-bold text-gray-700 whitespace-nowrap">Fee</th>
            </tr>
          </thead>
          <tbody>
            {options.map((opt, i) => (
              <tr key={opt.id} className={`border-b border-gray-100 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                <td className="px-4 py-3 font-bold text-brand-blue">{opt.id}</td>
                <td className="px-4 py-3">
                  <div className="font-medium text-gray-900">{opt.label}</div>
                  {opt.detail && <div className="text-gray-500 text-xs mt-0.5">{opt.detail}</div>}
                </td>
                <td className="px-4 py-3 text-right font-bold text-gray-900 whitespace-nowrap">£{opt.price}.00</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Membership rights note */}
      <div className="bg-gray-50 border border-gray-200 p-4 text-xs text-gray-600 mb-10 leading-relaxed">
        <p>
          Options <strong>A, B, C, D, E, G &amp; H</strong> allow full Horsforth Harriers membership rights
          including: All voting rights and participation in all social events and training programmes.
        </p>
        <p className="mt-1.5">
          Option <strong>F</strong> allows participation in all social events organised by Horsforth Harriers.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          setSubmitted(true)
        }}
        className="space-y-8"
      >
        {/* Personal details */}
        <div>
          <h2 className="text-base font-bold text-gray-900 mb-5 pb-2 border-b border-gray-200">Personal Details</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="sm:col-span-2 flex flex-wrap gap-3">
              <div className="flex-none">
                <label className="block text-xs font-medium text-gray-700 mb-1">Title</label>
                <select className="border border-gray-300 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-brand-blue">
                  <option value="">—</option>
                  {['Mr.', 'Mrs.', 'Miss', 'Ms.', 'Dr.', 'Prof.', 'Rev.'].map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div className="flex-1 min-w-32">
                <label className="block text-xs font-medium text-gray-700 mb-1">First name <span className="text-red-500">*</span></label>
                <input required type="text" className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-brand-blue" />
              </div>
              <div className="flex-1 min-w-32">
                <label className="block text-xs font-medium text-gray-700 mb-1">Last name <span className="text-red-500">*</span></label>
                <input required type="text" className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-brand-blue" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Gender <span className="text-red-500">*</span></label>
              <select required className="w-full border border-gray-300 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-brand-blue">
                <option value="">Select…</option>
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Date of birth <span className="text-red-500">*</span></label>
              <input required type="date" className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-brand-blue" />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-gray-700 mb-1">Street address <span className="text-red-500">*</span></label>
              <input required type="text" className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-brand-blue mb-2" placeholder="Street address" />
              <input type="text" className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-brand-blue mb-2" placeholder="Address line 2" />
              <input required type="text" className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-brand-blue max-w-48" placeholder="Post code" />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Home telephone</label>
              <input type="tel" className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-brand-blue" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Mobile number</label>
              <input type="tel" placeholder="07700 000000" pattern="^(\+44\s?7\d{3}|\(?07\d{3}\)?)\s?\d{3}\s?\d{3}$" className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-brand-blue" />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-gray-700 mb-1">Email <span className="text-red-500">*</span></label>
              <input required type="email" className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-brand-blue" />
            </div>
          </div>
        </div>

        {/* Membership option */}
        <div>
          <h2 className="text-base font-bold text-gray-900 mb-5 pb-2 border-b border-gray-200">
            Membership Options <span className="text-red-500">*</span>
          </h2>
          <div className="space-y-3">
            {options.map((opt) => (
              <label
                key={opt.id}
                className={`flex items-start gap-3 p-4 border cursor-pointer transition-colors ${
                  selectedOption === opt.id
                    ? 'border-brand-blue bg-brand-light'
                    : 'border-gray-200 hover:border-brand-blue/40'
                }`}
              >
                <input
                  type="radio"
                  name="membership_option"
                  value={opt.id}
                  required
                  checked={selectedOption === opt.id}
                  onChange={() => setSelectedOption(opt.id)}
                  className="mt-0.5 accent-brand-blue flex-none"
                />
                <div className="flex-1 min-w-0">
                  <span className="font-medium text-gray-900 text-sm">
                    {opt.id}: {opt.label}
                  </span>
                  {opt.detail && (
                    <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">{opt.detail}</p>
                  )}
                </div>
                <span className="font-bold text-gray-900 text-sm whitespace-nowrap">£{opt.price}.00</span>
              </label>
            ))}
          </div>
        </div>

        {/* Total */}
        <div className="border-t-2 border-gray-200 pt-5">
          <div className="flex items-center justify-between text-lg font-bold">
            <span className="text-gray-900">Total</span>
            <span className="text-brand-blue">£ {selectedPrice.toFixed(2)}</span>
          </div>

        </div>

        {/* EA data notice */}
        <div className="bg-gray-50 border border-gray-200 p-4 text-xs text-gray-600 leading-relaxed">
          When you become a member of or renew your membership with Horsforth Harriers you will automatically
          be registered as a member of England Athletics. We will provide England Athletics with your personal
          data which they will use to enable access to an online portal for you (called myAthletics). England
          Athletics will contact you to invite you to sign into and update your MyAthletics portal (which,
          amongst other things, allows you to set and amend your privacy settings). If you have any questions
          about the continuing privacy of your personal data when it is shared with England Athletics, please
          contact{' '}
          <a href="mailto:dataprotection@englandathletics.org" className="text-brand-blue hover:underline">
            dataprotection@englandathletics.org
          </a>
          .
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-brand-blue text-white font-bold text-sm hover:bg-brand-dark transition-colors"
        >
          Submit Application
        </button>
      </form>
    </div>
  )
}
