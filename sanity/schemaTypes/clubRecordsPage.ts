import { defineType, defineField } from 'sanity'

const holderFields = [
  defineField({ name: 'name', title: 'Name', type: 'string' }),
  defineField({ name: 'time', title: 'Time', type: 'string', description: 'e.g. 16:42' }),
  defineField({ name: 'event', title: 'Event', type: 'string', description: 'e.g. Leeds 10K 2024' }),
  defineField({ name: 'date', title: 'Date', type: 'string', description: 'e.g. April 2024' }),
  defineField({ name: 'evidenceLink', title: 'Link to Evidence', type: 'url' }),
]

export const clubRecordsPage = defineType({
  name: 'clubRecordsPage',
  title: 'Club Records Page',
  type: 'document',
  groups: [
    { name: 'header', title: 'Page Header' },
    { name: 'records', title: 'Records' },
  ],
  fields: [
    defineField({ name: 'pageHeadline', title: 'Page Headline', type: 'string', group: 'header' }),
    defineField({ name: 'pageSubheading', title: 'Page Subheading', type: 'text', rows: 2, group: 'header' }),
    defineField({
      name: 'records', title: 'Records', type: 'array', group: 'records',
      of: [{
        type: 'object',
        options: { modal: { type: 'popover' } },
        fields: [
          defineField({ name: 'distance', title: 'Distance', type: 'string', description: 'e.g. 5K, 10K, Half Marathon' }),
          defineField({ name: 'men', title: "Men's Record", type: 'object', fields: holderFields }),
          defineField({ name: 'women', title: "Women's Record", type: 'object', fields: holderFields }),
        ],
        preview: { select: { title: 'distance' } },
      }],
    }),
  ],
  preview: { prepare: () => ({ title: 'Club Records Page' }) },
})
