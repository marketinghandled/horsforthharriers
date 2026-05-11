import { defineType, defineField } from 'sanity'

export const clubChampionshipsPage = defineType({
  name: 'clubChampionshipsPage',
  title: 'Club Championships Page',
  type: 'document',
  groups: [
    { name: 'header', title: 'Page Header' },
    { name: 'body', title: 'Content' },
  ],
  fields: [
    defineField({ name: 'pageHeadline', title: 'Page Headline', type: 'string', group: 'header' }),
    defineField({ name: 'pageSubheading', title: 'Page Subheading', type: 'text', rows: 2, group: 'header' }),
    defineField({ name: 'heroImage', title: 'Hero Image (optional)', type: 'image', options: { hotspot: true }, group: 'header' }),
    defineField({
      name: 'bodyText', title: 'Intro Text', type: 'array',
      of: [{ type: 'block' }], group: 'body',
    }),
    defineField({
      name: 'keyPoints', title: 'Key Points', type: 'array', group: 'body',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'races', title: 'Championship Races', type: 'array', group: 'body',
      of: [{
        type: 'object',
        options: { modal: { type: 'popover' } },
        fields: [
          defineField({ name: 'raceName', title: 'Race Name', type: 'string' }),
          defineField({ name: 'date', title: 'Date', type: 'date' }),
          defineField({ name: 'location', title: 'Location', type: 'string' }),
          defineField({ name: 'url', title: 'Entry / Info Link', type: 'url' }),
        ],
        preview: { select: { title: 'raceName', subtitle: 'date' } },
      }],
    }),
  ],
  preview: { prepare: () => ({ title: 'Club Championships Page' }) },
})
