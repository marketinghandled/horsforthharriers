import { defineType, defineField } from 'sanity'

export const coachesPage = defineType({
  name: 'coachesPage',
  title: 'Coaches Page',
  type: 'document',
  groups: [
    { name: 'header', title: 'Page Header' },
    { name: 'coaches', title: 'Coaches' },
  ],
  fields: [
    defineField({ name: 'pageHeadline', title: 'Page Headline', type: 'string', group: 'header' }),
    defineField({ name: 'pageSubheading', title: 'Page Subheading', type: 'text', rows: 2, group: 'header' }),
    defineField({
      name: 'coaches', title: 'Coaches', type: 'array', group: 'coaches',
      of: [{
        type: 'object',
        options: { modal: { type: 'popover' } },
        fields: [
          defineField({ name: 'name', title: 'Name', type: 'string' }),
          defineField({ name: 'role', title: 'Role', type: 'string', description: 'e.g. Head Coach, Assistant Coach' }),
          defineField({ name: 'email', title: 'Email (optional)', type: 'string' }),
          defineField({ name: 'phone', title: 'Phone (optional)', type: 'string' }),
          defineField({ name: 'photo', title: 'Photo (optional)', type: 'image', options: { hotspot: true } }),
          defineField({ name: 'bio', title: 'Bio (optional)', type: 'text', rows: 3 }),
          defineField({ name: 'qualifications', title: 'Qualifications (optional)', type: 'string' }),
        ],
        preview: { select: { title: 'name', subtitle: 'role', media: 'photo' } },
      }],
    }),
  ],
  preview: { prepare: () => ({ title: 'Coaches Page' }) },
})
