import { defineType, defineField } from 'sanity'

export const couchTo5kPage = defineType({
  name: 'couchTo5kPage',
  title: 'Couch to 5K Page',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content' },
    { name: 'nextCourse', title: 'Next Course' },
    { name: 'meetingPoint', title: 'Meeting Point' },
  ],
  fields: [
    defineField({
      name: 'introParagraph1',
      title: 'Intro Paragraph 1',
      type: 'text',
      rows: 3,
      group: 'content',
    }),
    defineField({
      name: 'introParagraph2',
      title: 'Intro Paragraph 2',
      type: 'text',
      rows: 3,
      group: 'content',
    }),
    defineField({
      name: 'highlights',
      title: 'Key Points',
      type: 'array',
      group: 'content',
      of: [{ type: 'string' }],
      description: 'Bullet points shown on the page',
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'nextCourseStart',
      title: 'Course Start Date',
      type: 'string',
      group: 'nextCourse',
      description: 'e.g. Tuesday 27th January',
    }),
    defineField({
      name: 'nextCourseGraduation',
      title: 'Graduation Date',
      type: 'string',
      group: 'nextCourse',
      description: 'e.g. Saturday 28th March',
    }),
    defineField({
      name: 'meetingName',
      title: 'Venue Name',
      type: 'string',
      group: 'meetingPoint',
    }),
    defineField({
      name: 'meetingAddress',
      title: 'Venue Address',
      type: 'text',
      rows: 3,
      group: 'meetingPoint',
      description: 'Street, town and postcode on separate lines',
    }),
    defineField({
      name: 'meetingTime',
      title: 'Meeting Time',
      type: 'string',
      group: 'meetingPoint',
      description: 'e.g. Tuesdays at 7pm',
    }),
  ],
  preview: { prepare: () => ({ title: 'Couch to 5K Page' }) },
})
