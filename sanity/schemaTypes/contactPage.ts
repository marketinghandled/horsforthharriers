import { defineType, defineField } from 'sanity'

export const contactPage = defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  groups: [
    { name: 'header', title: 'Page Header' },
    { name: 'details', title: 'Contact Details' },
    { name: 'form', title: 'Contact Form' },
    { name: 'social', title: 'Social Links' },
  ],
  fields: [
    defineField({ name: 'pageHeadline', title: 'Page Headline', type: 'string', group: 'header' }),
    defineField({ name: 'pageSubheading', title: 'Page Subheading', type: 'text', rows: 2, group: 'header' }),
    defineField({ name: 'email', title: 'Contact Email', type: 'string', group: 'details' }),
    defineField({ name: 'address', title: 'Address', type: 'text', rows: 4, group: 'details' }),
    defineField({
      name: 'sessionTimes', title: 'Session Times', type: 'array', group: 'details',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'day', title: 'Day', type: 'string' }),
          defineField({ name: 'description', title: 'Description', type: 'string', description: 'e.g. "Club run — arrive 6:45pm, start 7:00pm"' }),
        ],
        preview: { select: { title: 'day', subtitle: 'description' } },
      }],
    }),
    defineField({
      name: 'mapEmbedUrl',
      title: 'Google Maps Embed URL',
      type: 'url',
      group: 'details',
      description: 'Paste the embed URL from Google Maps (Share → Embed a map → copy the src="..." value)',
    }),
    defineField({
      name: 'contactRecipients',
      title: 'Message Recipients',
      type: 'array',
      group: 'form',
      description: 'People visitors can choose to send a message to. The first entry is the default.',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'label', title: 'Label', type: 'string', description: 'e.g. "General Enquiries", "Membership Secretary"' }),
          defineField({ name: 'email', title: 'Email Address', type: 'string' }),
        ],
        preview: { select: { title: 'label', subtitle: 'email' } },
      }],
    }),
    defineField({ name: 'facebook', title: 'Facebook URL', type: 'url', group: 'social' }),
    defineField({ name: 'instagram', title: 'Instagram URL', type: 'url', group: 'social' }),
    defineField({ name: 'strava', title: 'Strava URL', type: 'url', group: 'social' }),
  ],
  preview: { prepare: () => ({ title: 'Contact Page' }) },
})
