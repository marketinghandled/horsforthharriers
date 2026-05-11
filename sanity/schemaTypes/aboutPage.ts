import { defineType, defineField } from 'sanity'

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  groups: [
    { name: 'article', title: 'Club History' },
    { name: 'quote', title: 'Quote' },
    { name: 'sidebar', title: 'Sidebar' },
  ],
  fields: [
    defineField({
      name: 'pageHeadline',
      title: 'Page Headline',
      type: 'string',
      description: 'The h1 shown at the top of the page.',
      group: 'article',
    }),

    // ── Club History ──────────────────────────────────────────────
    defineField({
      name: 'articleSubtitle',
      title: 'Article Subtitle',
      type: 'string',
      group: 'article',
      description: 'Small label above the title, e.g. "Est. 1985"',
    }),
    defineField({
      name: 'articleTitle',
      title: 'Article Title',
      type: 'string',
      group: 'article',
      description: 'e.g. "Over 30 Years of Running in Horsforth"',
    }),
    defineField({
      name: 'bodyText',
      title: 'Article Body',
      type: 'array',
      of: [{ type: 'block' }],
      group: 'article',
      description: 'The main club history paragraphs.',
    }),

    // ── Quote ─────────────────────────────────────────────────────
    defineField({
      name: 'quoteText',
      title: 'Quote',
      type: 'text',
      rows: 3,
      group: 'quote',
      description: 'The pull-quote shown in the article (without speech marks).',
    }),
    defineField({
      name: 'quoteAttribution',
      title: 'Attribution',
      type: 'string',
      group: 'quote',
      description: 'e.g. "Gordon Little — Club President & Founder"',
    }),

    // ── Sidebar ───────────────────────────────────────────────────
    defineField({
      name: 'photo',
      title: 'Club Photo',
      type: 'image',
      options: { hotspot: true },
      group: 'sidebar',
    }),
    defineField({
      name: 'founded',
      title: 'Founded',
      type: 'string',
      group: 'sidebar',
      description: 'e.g. "1985"',
    }),
    defineField({
      name: 'memberCount',
      title: 'Members',
      type: 'string',
      group: 'sidebar',
      description: 'e.g. "200+"',
    }),
    defineField({
      name: 'joinUsText',
      title: 'Come and Join Us',
      type: 'text',
      rows: 3,
      group: 'sidebar',
      description: 'Short paragraph shown below the stats — meetup days, location, etc.',
    }),

  ],
  preview: { prepare: () => ({ title: 'About Page' }) },
})
