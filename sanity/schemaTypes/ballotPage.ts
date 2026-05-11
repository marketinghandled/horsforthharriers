import { defineType, defineField } from 'sanity'

const bulletSection = (name: string, title: string, defaultHeading: string) =>
  defineField({
    name,
    title,
    type: 'object',
    fields: [
      defineField({ name: 'heading', title: 'Section Heading', type: 'string', initialValue: defaultHeading }),
      defineField({
        name: 'bullets',
        title: 'Bullet Points',
        type: 'array',
        of: [{ type: 'string' }],
      }),
    ],
  })

export const ballotPage = defineType({
  name: 'ballotPage',
  title: 'Club Ballot Page',
  type: 'document',
  fields: [
    defineField({ name: 'pageHeadline', title: 'Page Headline', type: 'string' }),
    bulletSection(
      'qualifySection',
      'Qualify Section',
      'To qualify to enter a club ballot for an event (e.g. London Marathon or Brass Monkey), you must:'
    ),
    bulletSection(
      'londonSection',
      'London Marathon Section',
      'In respect of the London Marathon club ballot, you must also:'
    ),
    bulletSection(
      'notesSection',
      'Notes Section',
      'Please note the following:'
    ),
    bulletSection(
      'successSection',
      'If Successful Section',
      'If successful in a club ballot, the club and the relevant ballot winner will undertake the following:'
    ),
    defineField({ name: 'contactEmail', title: 'Contact Email', type: 'string' }),
  ],
  preview: { prepare: () => ({ title: 'Club Ballot Page' }) },
})
