/**
 * One-time migration: moves orphaned siteSettings fields into their new page documents.
 * Run with: node scripts/migrate-settings.mjs
 */
import { createClient } from '@sanity/client'
import { readFileSync } from 'fs'

// Parse .env.local manually — no dotenv dependency needed
for (const line of readFileSync('.env.local', 'utf8').split('\n')) {
  const [key, ...rest] = line.split('=')
  if (key && !key.startsWith('#') && rest.length) process.env[key.trim()] = rest.join('=').trim()
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

const old = await client.fetch(`*[_type == "siteSettings"][0]`)

if (!old) {
  console.log('No siteSettings document found.')
  process.exit(0)
}

const tx = client.transaction()

// Move heroImage + heroSubtext → homePage
if (old.heroImage || old.heroSubtext || old.heroHeadline) {
  tx.createOrReplace({
    _id: 'homePage',
    _type: 'homePage',
    ...(old.heroHeadline && { heroHeadline: old.heroHeadline }),
    ...(old.heroSubtext && { heroSubtext: old.heroSubtext }),
    ...(old.heroImage && { heroImage: old.heroImage }),
  })
  console.log('✓ homePage — hero fields migrated')
}

// Move aboutText → aboutPage
if (old.aboutText) {
  tx.createOrReplace({
    _id: 'aboutPage',
    _type: 'aboutPage',
    bodyText: old.aboutText,
  })
  console.log('✓ aboutPage — aboutText migrated')
}

// Move contact + social → contactPage
if (old.contact || old.social) {
  tx.createOrReplace({
    _id: 'contactPage',
    _type: 'contactPage',
    ...(old.contact?.email && { email: old.contact.email }),
    ...(old.contact?.address && { address: old.contact.address }),
    ...(old.contact?.meetingDay && old.contact?.meetingTime && {
      sessionTimes: [{ _key: 'session-0', day: old.contact.meetingDay, description: old.contact.meetingTime }],
    }),
    ...(old.social?.facebook && { facebook: old.social.facebook }),
    ...(old.social?.twitter && { twitter: old.social.twitter }),
    ...(old.social?.instagram && { instagram: old.social.instagram }),
    ...(old.social?.strava && { strava: old.social.strava }),
  })
  console.log('✓ contactPage — contact + social migrated')
}

// Remove the orphaned fields from siteSettings using the document's actual _id
tx.patch(old._id, (p) =>
  p.unset([
    'heroHeadline', 'heroSubtext', 'heroImage',
    'aboutText',
    'contact', 'social',
  ])
)
console.log('✓ siteSettings — orphaned fields removed')

await tx.commit()
console.log('\nMigration complete.')
