import { defineField, defineType } from 'sanity'

export const jobRole = defineType({
  name: 'jobRole',
  title: 'Job Role',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Full-time', value: 'fulltime' },
          { title: 'Part-time', value: 'parttime' },
          { title: 'Contract', value: 'contract' },
        ],
      },
    }),
    defineField({
      name: 'department',
      title: 'Department',
      type: 'string',
    }),
    defineField({
      name: 'applyUrl',
      title: 'Apply URL',
      type: 'string',
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
    }),
  ],
})
