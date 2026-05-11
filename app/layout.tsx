import type { Metadata } from 'next'
import './globals.css'
import SiteShell from '@/components/SiteShell'
import Footer from '@/components/Footer'
import { client } from '@/sanity/client'
import { siteSettingsQuery } from '@/sanity/queries'
import { urlFor } from '@/sanity/image'

export const revalidate = 60

export const metadata: Metadata = {
  title: {
    default: 'Horsforth Harriers Running Club',
    template: '%s | Horsforth Harriers',
  },
  description:
    'One of the friendliest running clubs in North West Leeds. All abilities welcome — from beginners to experienced competitors. Join us on Tuesday nights.',
  openGraph: {
    siteName: 'Horsforth Harriers',
    locale: 'en_GB',
  },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await client.fetch<Record<string, any>>(siteSettingsQuery)
  const logoUrl = settings?.logo ? urlFor(settings.logo).height(160).url() : null

  return (
    <html lang="en">
      <body className="bg-white text-gray-900 antialiased">
        <SiteShell logoUrl={logoUrl} footer={<Footer />}>{children}</SiteShell>
      </body>
    </html>
  )
}
