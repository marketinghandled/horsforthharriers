import { defineType, defineField } from 'sanity'

export const committeePage = defineType({
  name: 'committeePage',
  title: 'Committee Page',
  type: 'document',
  groups: [
    { name: 'header', title: 'Page Header' },
    { name: 'members', title: 'Committee Members' },
  ],
  fields: [
    defineField({ name: 'pageHeadline', title: 'Page Headline', type: 'string', group: 'header' }),
    defineField({ name: 'pageSubheading', title: 'Page Subheading', type: 'text', rows: 2, group: 'header' }),
    defineField({
      name: 'committeeMembers', title: 'Committee Members', type: 'array', group: 'members',
      of: [{
        type: 'object',
        options: { modal: { type: 'popover' } },
        fields: [
          defineField({ name: 'name', title: 'Name', type: 'string' }),
          defineField({ name: 'role', title: 'Role', type: 'string', description: 'e.g. Chair, Secretary, Treasurer' }),
          defineField({ name: 'email', title: 'Email (optional)', type: 'string' }),
          defineField({ name: 'phone', title: 'Phone (optional)', type: 'string' }),
          defineField({ name: 'photo', title: 'Photo (optional)', type: 'image', options: { hotspot: true } }),
          defineField({ name: 'bio', title: 'Bio (optional)', type: 'text', rows: 3 }),
        ],
        preview: { select: { title: 'name', subtitle: 'role' } },
      }],
    }),
  ],
  preview: { prepare: () => ({ title: 'Committee Page' }) },
})
