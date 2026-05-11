import { defineType, defineField } from 'sanity'

export const clubDocumentsPage = defineType({
  name: 'clubDocumentsPage',
  title: 'Club Documents Page',
  type: 'document',
  groups: [
    { name: 'header', title: 'Page Header' },
    { name: 'documents', title: 'Documents' },
  ],
  fields: [
    defineField({ name: 'pageHeadline', title: 'Page Headline', type: 'string', group: 'header' }),
    defineField({
      name: 'documents', title: 'Documents', type: 'array', group: 'documents',
      description: '⚠️ Club Constitution, Terms & Conditions, Health & Safety, and Privacy Policy must be edited using their own dedicated editor pages — find them in the left-hand navigation.',
      of: [{
        type: 'object',
        options: { modal: { type: 'popover' } },
        fields: [
          defineField({ name: 'title', title: 'Title', type: 'string' }),
          defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
          defineField({ name: 'file', title: 'File (optional)', type: 'file' }),
          defineField({ name: 'url', title: 'Link URL (optional)', type: 'url' }),
        ],
        preview: { select: { title: 'title', subtitle: 'description' } },
      }],
    }),
  ],
  preview: { prepare: () => ({ title: 'Club Documents Page' }) },
})
