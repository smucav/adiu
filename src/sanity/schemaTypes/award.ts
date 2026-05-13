import { defineField, defineType } from 'sanity'

export const award = defineType({
  name: 'award',
  title: 'Award',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Award Name',
      type: 'string',
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'badgeImage',
      title: 'Badge Image',
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
      name: 'org',
      title: 'Issuing Organization',
      type: 'string',
    }),
    defineField({
      name: 'status',
      title: 'Status Badge Color',
      type: 'string',
      options: {
        list: [
          { title: 'Amber', value: 'amber' },
          { title: 'Green', value: 'green' },
          { title: 'Blue', value: 'blue' },
        ],
      },
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
    }),
  ],
})
