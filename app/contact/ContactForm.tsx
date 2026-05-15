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
  const [recipientEmail, setRecipientEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  if (status === 'sent') {
    return (
      <div className="border border-green-200 bg-green-50 p-8 text-center space-y-3">
        <p className="text-lg font-bold text-green-800">Message sent!</p>
        <p className="text-sm text-green-700">Thanks for getting in touch. We&apos;ll get back to you soon.</p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-4 px-5 py-2 border border-green-700 text-green-800 text-sm font-medium hover:bg-green-100 transition-colors"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault()
        setStatus('sending')
        setErrorMsg('')
        const data = new FormData(e.currentTarget)
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: data.get('name'),
            email: data.get('email'),
            subject: data.get('subject'),
            message: data.get('message'),
            to: recipientEmail || fallbackEmail,
          }),
        })
        if (res.ok) {
          setStatus('sent')
        } else {
          const json = await res.json().catch(() => ({}))
          setErrorMsg(json.error || 'Something went wrong. Please try again.')
          setStatus('error')
        }
      }}
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
            required
            value={recipientEmail}
            onChange={(e) => setRecipientEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none text-sm bg-white"
          >
            <option value="" disabled>Choose recipient…</option>
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

      {status === 'error' && (
        <p className="text-sm text-red-600">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full py-3.5 bg-brand-blue text-white font-bold text-sm hover:bg-brand-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'sending' ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  )
}
