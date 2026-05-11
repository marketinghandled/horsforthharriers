import { defineType, defineField } from 'sanity'

export const abcPage = defineType({
  name: 'abcPage',
  title: 'Apperley Bridge Canter (ABC) Page',
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
    defineField({ name: 'contactEmail', title: 'Race Enquiries Email', type: 'string', group: 'body' }),
    defineField({ name: 'entryUrl', title: 'Entry Link URL', type: 'url', group: 'body' }),
    defineField({
      name: 'details', title: 'Race Details', type: 'array', group: 'body',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'label', title: 'Label', type: 'string', description: 'e.g. Open to' }),
          defineField({ name: 'value', title: 'Value', type: 'string' }),
        ],
        preview: { select: { title: 'label', subtitle: 'value' } },
      }],
    }),
    defineField({ name: 'volunteerHeading', title: 'Volunteer Section Heading', type: 'string', group: 'body' }),
    defineField({
      name: 'volunteerText', title: 'Volunteer Section Text', type: 'array',
      of: [{ type: 'block' }], group: 'body',
    }),
    defineField({ name: 'volunteerLinkLabel', title: 'Volunteer Link Label', type: 'string', group: 'body', description: 'e.g. Sign up to volunteer' }),
    defineField({ name: 'volunteerLinkUrl', title: 'Volunteer Link URL', type: 'url', group: 'body' }),
  ],
  preview: { prepare: () => ({ title: 'ABC Page' }) },
})
