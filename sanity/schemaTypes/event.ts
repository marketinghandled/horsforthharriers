import { defineType, defineField } from 'sanity'

export const event = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Event Name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'date', title: 'Date', type: 'datetime', validation: (r) => r.required() }),
    defineField({ name: 'location', title: 'Location', type: 'string' }),
    defineField({ name: 'distance', title: 'Distance', type: 'string', description: 'e.g. 5K, 10K, Half Marathon' }),
    defineField({
      name: 'type', title: 'Event Type', type: 'string',
      options: { list: ['Club Race', 'Championship', 'PECO XC', 'Yorkshire Vets', 'External Race', 'Social'] },
    }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 4 }),
    defineField({ name: 'registrationUrl', title: 'Registration URL', type: 'url' }),
    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
  ],
  orderings: [{ title: 'Date, Soonest', name: 'dateAsc', by: [{ field: 'date', direction: 'asc' }] }],
  preview: {
    select: { title: 'title', subtitle: 'date', media: 'image' },
  },
})
