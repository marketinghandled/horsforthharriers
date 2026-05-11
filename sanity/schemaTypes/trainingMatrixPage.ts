import { defineType, defineField } from 'sanity'

export const trainingMatrixPage = defineType({
  name: 'trainingMatrixPage',
  title: 'Training Matrix Page',
  type: 'document',
  groups: [
    { name: 'header', title: 'Page Header' },
    { name: 'matrix', title: 'Pacing Groups' },
  ],
  fields: [
    defineField({ name: 'pageHeadline', title: 'Page Headline', type: 'string', group: 'header' }),
    defineField({ name: 'introText', title: 'Intro Text', type: 'text', rows: 4, group: 'header' }),
    defineField({ name: 'footerNote', title: 'Footer Note', type: 'text', rows: 2, group: 'header', description: 'Optional note shown below the table' }),
    defineField({
      name: 'pacingGroups',
      title: 'Pacing Groups',
      type: 'array',
      group: 'matrix',
      description: 'Add each sub-group row. Group rows together by setting the same Group letter (A, B, C).',
      of: [{
        type: 'object',
        options: { modal: { type: 'popover' } },
        fields: [
          defineField({ name: 'group', title: 'Group', type: 'string', description: 'e.g. A, B, C' }),
          defineField({ name: 'subGroup', title: 'Sub-Group', type: 'string', description: 'e.g. A1, A2, A3' }),
          defineField({ name: 'paceRange', title: 'Average Pace Range (min/mile)', type: 'string', description: 'e.g. 7:30 or 7:30–7:45' }),
          defineField({ name: 'typicalDistance', title: 'Typical Distance (miles)', type: 'string', description: 'e.g. 9–10 or up to 3' }),
        ],
        preview: { select: { title: 'subGroup', subtitle: 'paceRange' } },
      }],
    }),
  ],
  preview: { prepare: () => ({ title: 'Training Matrix Page' }) },
})
