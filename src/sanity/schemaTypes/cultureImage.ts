import { defineField, defineType } from 'sanity'

export const cultureImage = defineType({
  name: 'cultureImage',
  title: 'Culture & Engagement Image',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title / Caption',
      type: 'string',
      description: 'Brief description of what is happening in the photo.',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Team Building & Events', value: 'team-events' },
          { title: 'Office Life', value: 'office-life' },
          { title: 'Onsite Milestones', value: 'onsite-milestones' },
          { title: 'Workshops & Collaboration', value: 'workshops' },
        ],
      },
      initialValue: 'team-events',
    }),
    defineField({
      name: 'image',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Important for SEO and accessibility.',
        },
      ],
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    }),
  ],
})
