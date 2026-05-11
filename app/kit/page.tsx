import type { Metadata } from 'next'
import { client } from '@/sanity/client'
import { kitPageQuery } from '@/sanity/queries'

export const metadata: Metadata = { title: 'Club Kit' }
export const revalidate = 86400

export default async function KitPage() {
  const page = await client.fetch<Record<string, any>>(kitPageQuery)

  const contactName = page?.committeeContactName ?? 'Louise Bisset'
  const contactPhone = page?.committeeContactPhone ?? '07534 034339'
  const contactEmail = page?.committeeContactEmail ?? 'louise.bisset@icloud.com'
  const vestDescription = page?.vestDescription ?? 'A club vest is supplied as part of your club membership fee when you first join. The vest is the official garment to wear when representing the club in any race.'
  const tshirtDescription = page?.tshirtDescription ?? 'Club t-shirts are an optional extra and can be ordered for an additional charge. Currently, they can only be ordered in bundles of 5 of the same size so please be aware if you want to order a t-shirt, the order will only be placed once there are 4 other requests for the same size t-shirt. T-shirt orders can be placed with Louise.'
  const shopUrl = page?.shopUrl ?? 'https://customsportskit.co.uk/athletic-clubs/horsforth-harriers/'
  const shopIntro = page?.shopIntro ?? 'Additional branded items can be ordered directly through our team store on Custom Sports Kit.'
  const shopItems = page?.shopItems ?? [
    { name: 'Horsforth Harriers Pull on hoodie', price: '£19.02' },
    { name: 'Horsforth Harriers Zipped hoodie', price: '£22.32' },
    { name: 'Horsforth Harriers Fleece', price: '£19.20' },
    { name: 'Horsforth Harriers Base Layer', price: '£25.02' },
  ]
  const vatNote = page?.vatNote ?? 'All prices include VAT where applicable. Collection is free of charge and postage is either Royal Mail or a tracked courier service to a UK address when purchased through our team store.'
  const collectionAddress = page?.collectionAddress ?? 'PECO Ltd, Unit 12, Springfield Commercial Centre, Bagley Lane.'
  const sizingNote = page?.sizingNote ?? 'Sizing options can be viewed on the PECO website. PECO do not accept returns based on fit, so make sure you check your dimensions against the size chart in the product description when ordering.'

  return (
    <>
      {/* Header */}
      <div className="bg-brand-light py-5 border-b border-brand-blue/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-xl font-bold text-brand-blue">Club Kit</h1>
        </div>
      </div>

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-gray-200">

            {/* Left — Committee kit */}
            <div className="space-y-8 pb-12 lg:pb-0 lg:pr-12">
              <div>
                <span className="text-brand-blue font-semibold text-xs uppercase tracking-widest">Via the Committee</span>
                <h2 className="mt-2 text-3xl font-bold text-gray-900">Vest &amp; T-Shirt</h2>
              </div>

              <div className="space-y-4">
                <div className="bg-brand-light border border-brand-blue/20 p-5 space-y-3">
                  <p className="text-gray-600 text-sm leading-relaxed">
                    To obtain a club vest or t-shirt please contact {contactName}:
                  </p>
                  <div className="space-y-2 text-sm">
                    <a href={`tel:${contactPhone.replace(/\s/g, '')}`} className="flex items-center gap-2 text-brand-blue hover:underline">
                      <svg className="w-4 h-4 flex-none" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                      </svg>
                      {contactPhone}
                    </a>
                    <a href={`mailto:${contactEmail}`} className="flex items-center gap-2 text-brand-blue hover:underline break-all">
                      <svg className="w-4 h-4 flex-none" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                      {contactEmail}
                    </a>
                  </div>
                </div>

                <div className="border border-gray-200 p-5 space-y-2">
                  <div className="flex items-center gap-3 mb-1">
                    <div className="w-2 h-2 bg-brand-blue flex-none" />
                    <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wide">Club Vest</h3>
                    <span className="ml-auto text-xs text-brand-blue font-semibold bg-brand-light px-2 py-0.5">Included with membership</span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{vestDescription}</p>
                </div>

                <div className="border border-gray-200 p-5 space-y-2">
                  <div className="flex items-center gap-3 mb-1">
                    <div className="w-2 h-2 bg-brand-blue flex-none" />
                    <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wide">Club T-Shirt</h3>
                    <span className="ml-auto text-xs text-gray-500 font-semibold bg-gray-100 px-2 py-0.5">Optional extra</span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{tshirtDescription}</p>
                </div>
              </div>
            </div>

            {/* Right — Online shop */}
            <div className="space-y-8 pt-12 lg:pt-0 lg:pl-12">
              <div>
                <span className="text-brand-blue font-semibold text-xs uppercase tracking-widest">Order Online</span>
                <h2 className="mt-2 text-3xl font-bold text-gray-900">Custom Kit Store</h2>
                <p className="mt-4 text-gray-600 leading-relaxed">{shopIntro}</p>
              </div>

              <div className="space-y-2">
                {shopItems.map((item: { name: string; price: string }) => (
                  <div key={item.name} className="flex items-center justify-between border border-gray-200 px-4 py-3 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-brand-blue flex-none" />
                      <span className="text-gray-900 text-sm font-medium">{item.name}</span>
                    </div>
                    <span className="text-brand-blue font-bold text-sm whitespace-nowrap">{item.price}</span>
                  </div>
                ))}
              </div>

              <a
                href={shopUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-brand-blue text-white font-bold text-sm hover:bg-brand-dark transition-colors"
              >
                Visit the team store
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
              </a>

              <div className="space-y-4">
                <div className="border border-gray-200 p-5 space-y-3">
                  <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wide">Delivery &amp; Collection</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{vatNote}</p>
                  <div className="pt-1 border-t border-gray-100">
                    <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide mb-1">Collection address</p>
                    <p className="text-gray-700 text-sm">{collectionAddress}</p>
                  </div>
                </div>
                <div className="border border-amber-200 bg-amber-50 p-5 space-y-2">
                  <h3 className="font-bold text-amber-800 text-sm uppercase tracking-wide">Sizing &amp; Returns</h3>
                  <p className="text-amber-900 text-sm leading-relaxed">{sizingNote}</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
