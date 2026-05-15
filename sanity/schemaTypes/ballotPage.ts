import { defineType, defineField } from 'sanity'

export const ballotPage = defineType({
  name: 'ballotPage',
  title: 'Club Ballot Page',
  type: 'document',
  fields: [
    defineField({ name: 'pageHeadline', title: 'Page Headline', type: 'string' }),
    defineField({ name: 'introParagraph', title: 'Intro Paragraph', type: 'text' }),
    defineField({
      name: 'section',
      title: 'Section',
      type: 'object',
      fields: [
        defineField({ name: 'heading', title: 'Section Heading', type: 'string' }),
        defineField({
          name: 'bullets',
          title: 'Bullet Points',
          type: 'array',
          of: [{ type: 'string' }],
        }),
      ],
    }),
    defineField({ name: 'contactEmail', title: 'Contact Email', type: 'string' }),
  ],
  preview: { prepare: () => ({ title: 'Club Ballot Page' }) },
})
