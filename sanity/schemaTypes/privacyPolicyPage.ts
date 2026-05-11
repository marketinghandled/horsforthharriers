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

export const privacyPolicyPage = defineType({
  name: 'privacyPolicyPage',
  title: 'Privacy Policy Page',
  type: 'document',
  fields: [
    defineField({ name: 'pageHeadline', title: 'Page Headline', type: 'string' }),
    defineField({
      name: 'bodyText',
      title: 'Body',
      type: 'array',
      of: [richTextBlock],
    }),
  ],
  preview: { prepare: () => ({ title: 'Privacy Policy Page' }) },
})
