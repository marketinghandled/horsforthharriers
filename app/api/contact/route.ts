import { Resend } from 'resend'
import { NextResponse } from 'next/server'
import { client } from '@/sanity/client'
import { siteSettingsQuery } from '@/sanity/queries'

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY)

  const body = await request.json()
  const { name, email, subject, message, to } = body

  if (typeof to !== 'string' || !to.endsWith('@horsforthharriers.co.uk')) {
    return NextResponse.json({ error: 'Invalid recipient' }, { status: 400 })
  }
  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const settings = await client.fetch<Record<string, any>>(siteSettingsQuery)
  const from = settings?.emailFromAddress
    ? `Horsforth Harriers Website <${settings.emailFromAddress}>`
    : 'Horsforth Harriers Website <noreply@horsforthharriers.co.uk>'

  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: email,
    subject: subject || `Message from ${name}`,
    text: `From: ${name} <${email}>\n\n${message}`,
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
