import { defineType, defineField } from 'sanity'

export const membershipPage = defineType({
  name: 'membershipPage',
  title: 'Membership Application Page',
  type: 'document',
  groups: [
    { name: 'types', title: 'Membership Types' },
    { name: 'options', title: 'Membership Options' },
    { name: 'confirmation', title: 'Confirmation & Payment' },
  ],
  fields: [
    defineField({
      name: 'membershipTypes',
      title: 'Membership Types',
      type: 'array',
      group: 'types',
      description: 'The 4 membership type cards shown at the top of the page. Each needs a heading and description.',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'heading', title: 'Heading', type: 'string' }),
          defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
        ],
        preview: { select: { title: 'heading', subtitle: 'description' } },
      }],
    }),
    defineField({
      name: 'pageHeadline',
      title: 'Page Headline',
      type: 'string',
      description: 'The h1 shown at the top of the page.',
      group: 'options',
    }),
    defineField({
      name: 'feePeriodNote',
      title: 'Fee Period Note',
      type: 'string',
      description: '⚠️ The fee period appears in multiple places — update it here (shown in the form footer and on the post-submission confirmation screen) AND in the How to Join Page under "Fees Period" (shown in the fees section heading). e.g. effective from 1st April 2026 to 31st December 2026',
      group: 'options',
    }),
    defineField({
      name: 'membershipNote',
      title: 'Membership Options Note',
      type: 'text',
      rows: 4,
      group: 'options',
      description: 'The note box shown below the options table. Leave blank to use the default text.',
    }),
    defineField({
      name: 'membershipOptions',
      title: 'Membership Options',
      type: 'array',
      group: 'options',
      description: 'Each option shown in the table and as a radio button on the form',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'id', title: 'Option ID', type: 'string', description: 'e.g. A, B, C' }),
          defineField({ name: 'label', title: 'Label', type: 'string' }),
          defineField({ name: 'detail', title: 'Detail', type: 'text', rows: 2 }),
          defineField({ name: 'price', title: 'Price (£)', type: 'number' }),
        ],
        preview: { select: { title: 'id', subtitle: 'label' } },
      }],
    }),
    defineField({
      name: 'confirmationIntro',
      title: 'Confirmation Message',
      type: 'text',
      rows: 4,
      group: 'confirmation',
      description: 'Shown after the form is submitted, before the bank details',
    }),
    defineField({
      name: 'bankAccountName',
      title: 'Bank Account Name',
      type: 'string',
      group: 'confirmation',
    }),
    defineField({
      name: 'bankAccountNumber',
      title: 'Bank Account Number',
      type: 'string',
      group: 'confirmation',
    }),
    defineField({
      name: 'bankSortCode',
      title: 'Sort Code',
      type: 'string',
      group: 'confirmation',
    }),
    defineField({
      name: 'noTransferContactName',
      title: 'No Bank Transfer — Contact Name',
      type: 'string',
      group: 'confirmation',
    }),
    defineField({
      name: 'noTransferContactEmail',
      title: 'No Bank Transfer — Contact Email',
      type: 'string',
      group: 'confirmation',
    }),
    defineField({
      name: 'submissionsEmail',
      title: 'Form Submissions Email',
      type: 'string',
      group: 'confirmation',
      description: 'Must be a @horsforthharriers.co.uk address. Defaults to membership@horsforthharriers.co.uk if left blank.',
    }),
  ],
  preview: { prepare: () => ({ title: 'Membership Application Page' }) },
})
