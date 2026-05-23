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
    defineField({ name: 'paragraph1', title: 'Paragraph 1', type: 'text', rows: 4, group: 'body' }),
    defineField({ name: 'paragraph2', title: 'Paragraph 2', type: 'text', rows: 4, group: 'body' }),
    defineField({ name: 'paragraph3', title: 'Paragraph 3', type: 'text', rows: 4, group: 'body' }),
    defineField({
      name: 'galleryImages',
      title: 'Gallery Images (up to 6)',
      type: 'array',
      group: 'body',
      validation: Rule => Rule.max(6),
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
          defineField({ name: 'alt', title: 'Alt text', type: 'string' }),
          defineField({
            name: 'size',
            title: 'Display size',
            type: 'string',
            options: {
              list: [
                { title: 'Small (1 column)', value: 'small' },
                { title: 'Medium (2 columns)', value: 'medium' },
                { title: 'Large (3 columns — full width)', value: 'large' },
              ],
              layout: 'radio',
            },
            initialValue: 'small',
          }),
        ],
        preview: { select: { title: 'alt', media: 'image', subtitle: 'size' } },
      }],
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
