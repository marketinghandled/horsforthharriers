import { defineType, defineField } from 'sanity'

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero Section' },
    { name: 'welcome', title: 'Welcome Section' },
    { name: 'abc', title: 'ABC Race Section' },
  ],
  fields: [
    // ─── Hero ────────────────────────────────────────────────────────────────
    defineField({
      name: 'heroImage',
      title: 'Hero Background Image',
      type: 'image',
      options: { hotspot: true },
      group: 'hero',
      description: 'Full-screen background photo shown behind the main headline. Recommended: landscape, at least 1920×1080px.',
    }),
    defineField({
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'string',
      group: 'hero',
      description: 'Large white text displayed over the hero image. Keep it short — one line works best.',
    }),
    defineField({
      name: 'heroSubtext',
      title: 'Hero Subtext',
      type: 'text',
      rows: 2,
      group: 'hero',
      description: 'Optional one-line summary shown below the headline.',
    }),

    // ─── Welcome ─────────────────────────────────────────────────────────────
    defineField({
      name: 'welcomeHeadline',
      title: 'Welcome Headline',
      type: 'string',
      group: 'welcome',
      description: 'Bold heading for the welcome section on the left side of the page.',
    }),
    defineField({
      name: 'welcomeBody',
      title: 'Welcome Body Text',
      type: 'array',
      of: [{ type: 'block' }],
      group: 'welcome',
      description: 'Main welcome paragraph(s). Keep it friendly and welcoming — this is the first thing visitors read about the club.',
    }),

    // ─── ABC Race ────────────────────────────────────────────────────────────
    defineField({
      name: 'abcHeadline',
      title: 'ABC Section Headline',
      type: 'string',
      group: 'abc',
      description: 'Heading for the dark ABC volunteer panel on the right side of the welcome section.',
    }),
    defineField({
      name: 'abcBody',
      title: 'ABC Section Body Text',
      type: 'text',
      rows: 4,
      group: 'abc',
      description: 'Short paragraph asking for volunteers. Mention what roles are needed and that no experience is required.',
    }),
    defineField({
      name: 'abcButtonLabel',
      title: 'ABC Button Label',
      type: 'string',
      group: 'abc',
      description: 'Text on the button linking to the ABC race page. e.g. "Volunteer & Race Info"',
    }),
  ],
  preview: { prepare: () => ({ title: 'Home Page' }) },
})
