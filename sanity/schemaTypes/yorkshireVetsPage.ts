import { defineType, defineField } from 'sanity'

export const yorkshireVetsPage = defineType({
  name: 'yorkshireVetsPage',
  title: 'Yorkshire Vets Page',
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
          defineField({ name: 'value', title: 'Point', type: 'string' }),
        ],
        preview: { select: { title: 'value' } },
      }],
    }),
    defineField({ name: 'websiteUrl', title: 'YVAA Website URL', type: 'url', group: 'body' }),
  ],
  preview: { prepare: () => ({ title: 'Yorkshire Vets Page' }) },
})
