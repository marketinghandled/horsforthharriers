import { defineType, defineField } from 'sanity'

const detailRow = {
  type: 'object' as const,
  fields: [
    defineField({ name: 'label', title: 'Label', type: 'string' }),
    defineField({ name: 'value', title: 'Value', type: 'string' }),
  ],
  preview: {
    select: { title: 'label', subtitle: 'value' },
  },
}

export const sessionsPage = defineType({
  name: 'sessionsPage',
  title: 'Sessions Page',
  type: 'document',
  groups: [
    { name: 'header', title: 'Page Header' },
    { name: 'notice', title: 'Quick Links Bar' },
    { name: 'tuesday', title: 'Tuesday Session' },
    { name: 'thursday', title: 'Thursday Sessions' },
  ],
  fields: [
    // ── Page Header ───────────────────────────────────────────────
    defineField({ name: 'pageHeadline', title: 'Page Headline', type: 'string', group: 'header' }),

    // ── Quick Links Bar ───────────────────────────────────────────
    defineField({ name: 'harrierHubLabel', title: 'Harrier Hub Link Label', type: 'string', group: 'notice', description: 'e.g. "Members: check Harrier Hub for the latest sessions"' }),
    defineField({ name: 'harrierHubUrl', title: 'Harrier Hub URL', type: 'url', group: 'notice' }),
    defineField({ name: 'newMembersLabel', title: 'New Members Link Label', type: 'string', group: 'notice', description: 'e.g. "New members: register here"' }),

    // ── Tuesday ───────────────────────────────────────────────────
    defineField({ name: 'tuesdayLabel', title: 'Section Label', type: 'string', group: 'tuesday', description: 'Small label above the heading, e.g. "Weekly"' }),
    defineField({ name: 'tuesdayHeadline', title: 'Headline', type: 'string', group: 'tuesday' }),
    defineField({ name: 'tuesdayBody', title: 'Body Text', type: 'array', of: [{ type: 'block' }], group: 'tuesday' }),
    defineField({
      name: 'tuesdayDetails',
      title: 'Detail Rows',
      type: 'array',
      group: 'tuesday',
      of: [detailRow],
      description: 'Key/value rows shown below the body text, e.g. "Meet / 143 New Rd Side…"',
    }),
    defineField({ name: 'tuesdayLocationName', title: 'Location Name', type: 'string', group: 'tuesday', description: 'Shown on the map card, e.g. "Horsforth Brewery"' }),
    defineField({ name: 'tuesdayLocationAddress', title: 'Location Address', type: 'string', group: 'tuesday', description: 'Shown as text on the map card, e.g. "143 New Rd Side, Horsforth, Leeds LS18 4QD"' }),
    defineField({ name: 'tuesdayMapEmbedUrl', title: 'Map Embed URL (optional)', type: 'url', group: 'tuesday', description: 'Paste the Google Maps embed URL here (Google Maps → Share → Embed a map → copy the src). If left blank, the address above is used.' }),

    // ── Thursday ──────────────────────────────────────────────────
    defineField({ name: 'thursdayLabel', title: 'Section Label', type: 'string', group: 'thursday', description: 'Small label above the heading, e.g. "Speed work"' }),
    defineField({ name: 'thursdayHeadline', title: 'Headline', type: 'string', group: 'thursday' }),

    // Winter card
    defineField({ name: 'winterBadge', title: 'Winter Badge Text', type: 'string', group: 'thursday', description: 'e.g. "September – March"' }),
    defineField({ name: 'winterTitle', title: 'Winter Card Title', type: 'string', group: 'thursday' }),
    defineField({ name: 'winterDescription', title: 'Winter Description', type: 'text', rows: 3, group: 'thursday' }),
    defineField({ name: 'winterDetails', title: 'Winter Detail Rows', type: 'array', of: [detailRow], group: 'thursday' }),
    defineField({ name: 'winterLinkText', title: 'Winter Link Text', type: 'string', group: 'thursday' }),
    defineField({ name: 'winterLinkUrl', title: 'Winter Link URL', type: 'url', group: 'thursday' }),

    // Summer card
    defineField({ name: 'summerBadge', title: 'Summer Badge Text', type: 'string', group: 'thursday', description: 'e.g. "April – August"' }),
    defineField({ name: 'summerTitle', title: 'Summer Card Title', type: 'string', group: 'thursday' }),
    defineField({ name: 'summerDescription', title: 'Summer Description', type: 'text', rows: 3, group: 'thursday' }),
    defineField({ name: 'summerDetails', title: 'Summer Detail Rows', type: 'array', of: [detailRow], group: 'thursday' }),
    defineField({ name: 'summerLinkText', title: 'Summer Link Text', type: 'string', group: 'thursday' }),
    defineField({ name: 'summerLinkUrl', title: 'Summer Link URL', type: 'url', group: 'thursday' }),

  ],
  preview: { prepare: () => ({ title: 'Sessions Page' }) },
})
