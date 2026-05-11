import { defineType, defineField } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'clubName', title: 'Club Name', type: 'string' }),
    defineField({ name: 'tagline', title: 'Tagline', type: 'string' }),
    defineField({ name: 'logo', title: 'Logo', type: 'image' }),
    defineField({
      name: 'footerDescription', title: 'Footer Description', type: 'text', rows: 2,
      description: 'Short blurb shown in the website footer',
    }),
  ],
  preview: { prepare: () => ({ title: 'Site Settings' }) },
})
