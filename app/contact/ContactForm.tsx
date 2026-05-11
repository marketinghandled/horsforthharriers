'use client'

import { useState } from 'react'

interface Recipient {
  label: string
  email: string
}

interface Props {
  recipients: Recipient[]
  fallbackEmail: string
}

export default function ContactForm({ recipients, fallbackEmail }: Props) {
  const defaultEmail = recipients[0]?.email ?? fallbackEmail
  const [recipientEmail, setRecipientEmail] = useState(defaultEmail)

  return (
    <form
      action={`mailto:${recipientEmail}`}
      method="post"
      encType="text/plain"
      className="space-y-4"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full px-4 py-3 border border-gray-300 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none text-sm"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full px-4 py-3 border border-gray-300 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none text-sm"
          />
        </div>
      </div>

      {recipients.length > 0 && (
        <div>
          <label htmlFor="recipient" className="block text-sm font-medium text-gray-700 mb-1">Send To</label>
          <select
            id="recipient"
            value={recipientEmail}
            onChange={(e) => setRecipientEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none text-sm bg-white"
          >
            {recipients.map((r) => (
              <option key={r.email} value={r.email}>{r.label}</option>
            ))}
          </select>
        </div>
      )}

      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
        <input
          id="subject"
          name="subject"
          type="text"
          className="w-full px-4 py-3 border border-gray-300 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none text-sm"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
        <textarea
          id="message"
          name="message"
          rows={7}
          required
          className="w-full px-4 py-3 border border-gray-300 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none text-sm resize-none"
        />
      </div>
      <button
        type="submit"
        className="w-full py-3.5 bg-brand-blue text-white font-bold text-sm hover:bg-brand-dark transition-colors"
      >
        Send Message
      </button>
    </form>
  )
}
