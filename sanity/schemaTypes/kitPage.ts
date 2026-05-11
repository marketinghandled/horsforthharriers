import { defineType, defineField } from 'sanity'

export const kitPage = defineType({
  name: 'kitPage',
  title: 'Club Kit Page',
  type: 'document',
  groups: [
    { name: 'committeeKit', title: 'Committee Kit' },
    { name: 'onlineShop', title: 'Online Shop' },
  ],
  fields: [
    // — Committee kit —
    defineField({
      name: 'committeeContactName',
      title: 'Contact Name',
      type: 'string',
      group: 'committeeKit',
    }),
    defineField({
      name: 'committeeContactPhone',
      title: 'Contact Phone',
      type: 'string',
      group: 'committeeKit',
    }),
    defineField({
      name: 'committeeContactEmail',
      title: 'Contact Email',
      type: 'string',
      group: 'committeeKit',
    }),
    defineField({
      name: 'vestDescription',
      title: 'Vest Description',
      type: 'text',
      rows: 3,
      group: 'committeeKit',
    }),
    defineField({
      name: 'tshirtDescription',
      title: 'T-Shirt Description',
      type: 'text',
      rows: 4,
      group: 'committeeKit',
    }),

    // — Online shop —
    defineField({
      name: 'shopUrl',
      title: 'Shop URL',
      type: 'url',
      group: 'onlineShop',
    }),
    defineField({
      name: 'shopIntro',
      title: 'Shop Intro',
      type: 'text',
      rows: 2,
      group: 'onlineShop',
    }),
    defineField({
      name: 'shopItems',
      title: 'Shop Items',
      type: 'array',
      group: 'onlineShop',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'name', title: 'Item Name', type: 'string' }),
          defineField({ name: 'price', title: 'Price (inc. VAT)', type: 'string' }),
        ],
        preview: { select: { title: 'name', subtitle: 'price' } },
      }],
    }),
    defineField({
      name: 'vatNote',
      title: 'VAT / Postage Note',
      type: 'text',
      rows: 2,
      group: 'onlineShop',
    }),
    defineField({
      name: 'collectionAddress',
      title: 'Collection Address',
      type: 'text',
      rows: 2,
      group: 'onlineShop',
    }),
    defineField({
      name: 'sizingNote',
      title: 'Sizing / Returns Note',
      type: 'text',
      rows: 3,
      group: 'onlineShop',
    }),
  ],
  preview: { prepare: () => ({ title: 'Club Kit Page' }) },
})
