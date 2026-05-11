import { defineType, defineField } from 'sanity'

const richTextBlock = {
  type: 'block' as const,
  styles: [
    { title: 'Normal', value: 'normal' },
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
    annotations: [],
  },
}

export const constitutionPage = defineType({
  name: 'constitutionPage',
  title: 'Club Constitution',
  type: 'document',
  fields: [
    defineField({ name: 'pageHeadline', title: 'Page Headline', type: 'string' }),
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Section Title', type: 'string' }),
            defineField({
              name: 'body',
              title: 'Content',
              type: 'array',
              of: [richTextBlock],
            }),
          ],
          preview: { select: { title: 'title' } },
        },
      ],
    }),
  ],
  preview: { prepare: () => ({ title: 'Club Constitution' }) },
})
