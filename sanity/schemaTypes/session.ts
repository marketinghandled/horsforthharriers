import { defineType, defineField } from 'sanity'

export const session = defineType({
  name: 'session',
  title: 'Training Session',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Session Name', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'day', title: 'Day', type: 'string',
      options: { list: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'time', title: 'Time', type: 'string', description: 'e.g. 7:00pm' }),
    defineField({ name: 'location', title: 'Location', type: 'string' }),
    defineField({ name: 'coach', title: 'Coach / Leader', type: 'string' }),
    defineField({
      name: 'level', title: 'Ability Level', type: 'string',
      options: { list: ['All Abilities', 'Beginners', 'Intermediate', 'Advanced'] },
    }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 4 }),
    defineField({ name: 'order', title: 'Display Order', type: 'number' }),
  ],
  orderings: [{ title: 'Day Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'title', subtitle: 'day' },
  },
})
