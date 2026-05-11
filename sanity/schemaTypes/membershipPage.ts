import { defineType, defineField } from 'sanity'

export const membershipPage = defineType({
  name: 'membershipPage',
  title: 'Membership Application Page',
  type: 'document',
  groups: [
    { name: 'options', title: 'Membership Options' },
    { name: 'confirmation', title: 'Confirmation & Payment' },
  ],
  fields: [
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
  ],
  preview: { prepare: () => ({ title: 'Membership Application Page' }) },
})
