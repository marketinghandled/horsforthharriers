import { defineType, defineField } from 'sanity'

export const pecoPage = defineType({
  name: 'pecoPage',
  title: 'PECO Cross Country Page',
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
      name: 'details', title: 'Key Details', type: 'array', group: 'body',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'value', title: 'Point', type: 'string', description: 'e.g. October – February' }),
        ],
        preview: { select: { title: 'value' } },
      }],
    }),
    defineField({ name: 'websiteUrl', title: 'PECO Website URL', type: 'url', group: 'body' }),
    defineField({ name: 'sidebarText', title: 'Sidebar Text', type: 'text', rows: 4, group: 'body' }),
  ],
  preview: { prepare: () => ({ title: 'PECO Cross Country Page' }) },
})
