import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Instagram } from 'lucide-react'
import { client } from '@/sanity/client'
import { siteSettingsQuery, contactPageQuery } from '@/sanity/queries'
import { urlFor } from '@/sanity/image'

export default async function Footer() {
  const [settings, contact] = await Promise.all([
    client.fetch<Record<string, any>>(siteSettingsQuery),
    client.fetch<Record<string, any>>(contactPageQuery),
  ])

  const logoUrl = settings?.logo ? urlFor(settings.logo).height(160).url() : '/harriers-logo.png'
  const footerDescription = settings?.footerDescription ?? null
  const facebook = contact?.facebook ?? 'https://www.facebook.com/horsforthharriers'
  const instagram = contact?.instagram ?? null
  const strava = contact?.strava ?? null

  return (
    <footer className="bg-brand-blue text-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Mobile: logo + social + flat links */}
        <div className="md:hidden flex flex-col items-center gap-6 pb-8">
          <Image src={logoUrl} alt="Horsforth Harriers" width={478} height={160} className="h-10 w-auto" />
          <div className="flex gap-3">
            <a href={facebook} target="_blank" rel="noopener noreferrer"
              className="p-2 bg-white/20 hover:bg-white/30 transition-colors">
              <Facebook className="w-4 h-4" />
            </a>
            {instagram && (
              <a href={instagram} target="_blank" rel="noopener noreferrer"
                className="p-2 bg-white/20 hover:bg-white/30 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
            )}
            {strava && (
              <a href={strava} target="_blank" rel="noopener noreferrer"
                className="p-2 bg-white/20 hover:bg-white/30 transition-colors">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169" />
                </svg>
              </a>
            )}
          </div>
          <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-blue-200">
            {[
              { label: 'About', href: '/about' },
              { label: 'Membership', href: '/membership' },
              { label: 'Sessions', href: '/sessions' },
              { label: 'Couch to 5K', href: '/couch-to-5k' },
              { label: 'Contact', href: '/contact' },
              { label: 'Privacy Policy', href: '/club-documents/privacy-policy' },
              { label: 'Terms & Conditions', href: '/club-documents/terms-and-conditions' },
              { label: 'Health & Safety', href: '/club-documents/health-and-safety' },
            ].map((l) => (
              <Link key={l.label} href={l.href} className="hover:text-white transition-colors">{l.label}</Link>
            ))}
          </nav>
        </div>

        {/* Desktop: full columns */}
        <div className="hidden md:grid md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="flex flex-col items-center gap-4">
            <Image src={logoUrl} alt="Horsforth Harriers" width={478} height={160} className="h-12 w-auto" />
            {footerDescription && (
              <p className="text-blue-200 text-xs text-center leading-relaxed">{footerDescription}</p>
            )}
            <div className="flex gap-3">
              <a href={facebook} target="_blank" rel="noopener noreferrer"
                className="p-2 bg-white/20 hover:bg-white/30 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              {instagram && (
                <a href={instagram} target="_blank" rel="noopener noreferrer"
                  className="p-2 bg-white/20 hover:bg-white/30 transition-colors">
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {strava && (
                <a href={strava} target="_blank" rel="noopener noreferrer"
                  className="p-2 bg-white/20 hover:bg-white/30 transition-colors">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169" />
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* About */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">About</h3>
            <ul className="space-y-2 text-sm">
              {[
                { label: 'About the Club', href: '/about' },
                { label: 'Membership', href: '/membership' },
                { label: 'Committee', href: '/committee' },
                { label: 'Club Documents', href: '/club-documents' },
                { label: 'Club Kit', href: '/kit' },
                { label: 'Club Records', href: '/records' },
                { label: 'Club Ballot', href: '/ballot' },
                { label: 'Contact', href: '/contact' },
              ].map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-blue-200 hover:text-white transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Races */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Races</h3>
            <ul className="space-y-2 text-sm">
              {[
                { label: 'Club Championships', href: '/races/championships' },
                { label: 'PECO Cross Country', href: '/races/peco' },
                { label: 'Relays', href: '/races/relays' },
                { label: 'Yorkshire Vets', href: '/races/yorkshire-vets' },
                { label: 'Apperley Bridge Canter', href: '/races/abc' },
              ].map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-blue-200 hover:text-white transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Sessions */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Sessions</h3>
            <ul className="space-y-2 text-sm">
              {[
                { label: 'Sessions', href: '/sessions' },
                { label: 'Training Matrix', href: '/sessions/matrix' },
                { label: 'Coaches', href: '/sessions/coaches' },
                { label: 'Couch to 5K', href: '/couch-to-5k' },
              ].map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-blue-200 hover:text-white transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-blue-200">
          <p>&copy; {new Date().getFullYear()} {settings?.clubName ?? 'Horsforth Harriers'}. All rights reserved.</p>
          <div className="flex gap-5 flex-wrap justify-center">
            <Link href="/club-documents/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/club-documents/terms-and-conditions" className="hover:text-white transition-colors">Terms &amp; Conditions</Link>
            <Link href="/club-documents/health-and-safety" className="hover:text-white transition-colors">Health &amp; Safety</Link>
          </div>
          <div className="flex items-center gap-4 opacity-50">
            <Image src="https://www.horsforthharriers.co.uk/wp-content/uploads/2016/03/englandlogo2.png"
              alt="England Athletics" width={60} height={20} className="h-5 w-auto grayscale" />
            <Image src="https://www.horsforthharriers.co.uk/wp-content/uploads/2016/03/parkrunlogo.png"
              alt="parkrun" width={60} height={20} className="h-5 w-auto grayscale" />
          </div>
        </div>
      </div>
    </footer>
  )
}
