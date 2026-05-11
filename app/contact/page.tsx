import type { Metadata } from 'next'
import { client } from '@/sanity/client'
import { contactPageQuery } from '@/sanity/queries'
import { MapPin, Clock, Mail, Facebook, Instagram } from 'lucide-react'
import ContactForm from './ContactForm'

export const metadata: Metadata = { title: 'Contact' }
export const revalidate = 86400

const DEFAULT_MAP_URL =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2354.602891632922!2d-1.6487921032104307!3d53.8321401!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487959387affd175%3A0x7eb6ffc8ad934ec0!2sHorsforth%20Brewery%20and%20Taproom!5e0!3m2!1sen!2suk!4v1778325543614!5m2!1sen!2suk'

export default async function ContactPage() {
  const page = await client.fetch<Record<string, any>>(contactPageQuery)

  const sessionTimes: { day: string; description: string }[] = page?.sessionTimes ?? [
    { day: 'Tuesday', description: 'Club run — arrive from 6:15pm, start 6:30pm from Horsforth Brewery' },
    { day: 'Thursday', description: 'Speed sessions at 6:30pm — check Harrier Hub for location' },
  ]

  const recipients: { label: string; email: string }[] = page?.contactRecipients ?? []
  const fallbackEmail = page?.email ?? 'info@horsforthharriers.co.uk'
  const mapUrl = page?.mapEmbedUrl ?? DEFAULT_MAP_URL

  return (
    <>
      {/* Header */}
      <div className="bg-brand-light py-5 border-b border-brand-blue/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-xl font-bold text-brand-blue">Contact</h1>
        </div>
      </div>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact details */}
            <div className="space-y-5">
              <h2 className="text-2xl font-bold text-gray-900">Find Us</h2>

              <div className="flex items-start gap-4 p-5 border border-gray-200">
                <div className="p-2.5 bg-brand-blue flex-none">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Tuesday Night Meeting Point</h3>
                  {page?.address ? (
                    <address className="not-italic text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                      {page.address}
                    </address>
                  ) : (
                    <address className="not-italic text-gray-600 text-sm leading-relaxed">
                      Horsforth Brewery &amp; Taproom<br />
                      143 New Rd Side<br />
                      Horsforth, Leeds LS18 4QD
                    </address>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 border border-gray-200">
                <div className="p-2.5 bg-brand-blue flex-none">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">When to Find Us</h3>
                  {sessionTimes.map((s) => (
                    <p key={s.day} className="text-gray-600 text-sm mb-1">
                      <strong>{s.day}:</strong> {s.description}
                    </p>
                  ))}
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 border border-gray-200">
                <div className="p-2.5 bg-brand-blue flex-none">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                  <a
                    href={`mailto:${fallbackEmail}`}
                    className="text-brand-blue text-sm hover:underline"
                  >
                    {fallbackEmail}
                  </a>
                </div>
              </div>

              {/* Social */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Follow Us</h3>
                <div className="flex gap-2 flex-wrap">
                  {(page?.facebook ?? 'https://www.facebook.com/horsforthharriers') && (
                    <a
                      href={page?.facebook ?? 'https://www.facebook.com/horsforthharriers'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 text-sm font-medium text-gray-700 hover:border-brand-blue hover:text-brand-blue transition-colors"
                    >
                      <Facebook className="w-4 h-4" /> Facebook
                    </a>
                  )}
                  {page?.instagram && (
                    <a
                      href={page.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 text-sm font-medium text-gray-700 hover:border-brand-blue hover:text-brand-blue transition-colors"
                    >
                      <Instagram className="w-4 h-4" /> Instagram
                    </a>
                  )}
                  {page?.strava && (
                    <a
                      href={page.strava}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 text-sm font-medium text-gray-700 hover:border-brand-blue hover:text-brand-blue transition-colors"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169" />
                      </svg>
                      Strava
                    </a>
                  )}
                </div>
              </div>

              {/* Map */}
              <div className="border border-gray-200 overflow-hidden">
                <iframe
                  src={mapUrl}
                  width="100%"
                  height="260"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Club meeting point map"
                />
              </div>
            </div>

            {/* Contact form */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send a Message</h2>
              <ContactForm recipients={recipients} fallbackEmail={fallbackEmail} />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
