import { defineType, defineField } from 'sanity'

const richTextBlock = {
  type: 'block' as const,
  styles: [
    { title: 'Normal', value: 'normal' },
    { title: 'Heading 2', value: 'h2' },
    { title: 'Heading 3', value: 'h3' },
    { title: 'Heading 4', value: 'h4' },
  ],
  lists: [
    { title: 'Bullet', value: 'bullet' },
    { title: 'Numbered', value: 'number' },
  ],
  marks: {
    decorators: [
      { title: 'Bold', value: 'strong' },
      { title: 'Italic', value: 'em' },
    ],
    annotations: [
      {
        name: 'link',
        type: 'object',
        title: 'Link',
        fields: [{ name: 'href', type: 'url', title: 'URL' }],
      },
    ],
  },
}

export const healthAndSafetyPage = defineType({
  name: 'healthAndSafetyPage',
  title: 'Health & Safety Page',
  type: 'document',
  fields: [
    defineField({ name: 'pageHeadline', title: 'Page Headline', type: 'string' }),
    defineField({
      name: 'bodyText',
      title: 'Body',
      type: 'array',
      of: [richTextBlock],
    }),
    defineField({
      name: 'contacts',
      title: 'Contacts',
      type: 'array',
      description: 'People listed at the bottom of the page, e.g. the H&S Officer.',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'name', title: 'Name', type: 'string' }),
          defineField({ name: 'role', title: 'Role', type: 'string', description: 'Optional — e.g. "Health & Safety Officer"' }),
          defineField({ name: 'email', title: 'Email', type: 'string', description: 'Optional' }),
        ],
        preview: { select: { title: 'name', subtitle: 'role' } },
      }],
    }),
  ],
  preview: { prepare: () => ({ title: 'Health & Safety Page' }) },
})
