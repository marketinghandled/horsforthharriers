import { defineType, defineField } from 'sanity'

export const racesPage = defineType({
  name: 'racesPage',
  title: 'Races Page',
  type: 'document',
  groups: [
    { name: 'header', title: 'Page Header' },
    { name: 'events', title: 'Events' },
  ],
  fields: [
    defineField({ name: 'pageHeadline', title: 'Page Headline', type: 'string', group: 'header' }),
    defineField({ name: 'pageSubheading', title: 'Page Subheading', type: 'text', rows: 2, group: 'header' }),
    defineField({
      name: 'events',
      title: 'Events',
      type: 'array',
      group: 'events',
      of: [{
        type: 'object',
        options: { modal: { type: 'popover' } },
        fields: [
          defineField({ name: 'title', title: 'Event Name', type: 'string' }),
          defineField({ name: 'date', title: 'Date', type: 'date' }),
          defineField({ name: 'location', title: 'Location', type: 'string' }),
          defineField({ name: 'distance', title: 'Distance', type: 'string', description: 'e.g. 5K, 10K, Half Marathon' }),
          defineField({
            name: 'type', title: 'Event Type', type: 'string',
            options: { list: ['Club Race', 'Championship', 'PECO XC', 'Yorkshire Vets', 'External Race', 'Social'] },
          }),
          defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
          defineField({ name: 'registrationUrl', title: 'Registration URL', type: 'url', description: 'Must start with https:// e.g. https://www.example.com' }),
        ],
        preview: { select: { title: 'title', subtitle: 'date' } },
      }],
    }),
  ],
  preview: { prepare: () => ({ title: 'Races Page' }) },
})
