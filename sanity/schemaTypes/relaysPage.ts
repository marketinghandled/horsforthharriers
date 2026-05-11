import { defineType, defineField } from 'sanity'

export const relaysPage = defineType({
  name: 'relaysPage',
  title: 'Relays Page',
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
      name: 'relayEvents', title: 'Relay Events', type: 'array', group: 'body',
      of: [{
        type: 'object',
        options: { modal: { type: 'popover' } },
        fields: [
          defineField({ name: 'title', title: 'Event Name', type: 'string' }),
          defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
          defineField({ name: 'url', title: 'Link (optional)', type: 'url' }),
        ],
        preview: { select: { title: 'title', subtitle: 'description' } },
      }],
    }),
  ],
  preview: { prepare: () => ({ title: 'Relays Page' }) },
})
