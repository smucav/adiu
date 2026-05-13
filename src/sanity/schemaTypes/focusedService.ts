import { defineField, defineType } from 'sanity'

export const focusedService = defineType({
  name: 'focusedService',
  title: 'Focused Service',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Wireless Infrastructure', value: 'wireless' },
          { title: 'Cloud Services', value: 'cloud' },
          { title: 'Data Centers', value: 'datacenter' },
          { title: 'Security Systems', value: 'security' },
          { title: 'ICT Consulting', value: 'consulting' },
        ],
      },
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      description: 'Used for the grid/listing view.',
      type: 'text',
    }),
    defineField({
      name: 'content',
      title: 'Detailed Content',
      description: 'Detailed information for the service detail page / modal.',
      type: 'array',
      of: [
        { type: 'block' },
        { 
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'image',
      title: 'Featured Image',
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
    }),
  ],
})
