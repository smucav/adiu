import { defineField, defineType } from 'sanity'

export const serviceFeatureItem = defineType({
  name: 'serviceFeatureItem',
  title: 'Service Feature Item',
  type: 'object',
  fields: [
    defineField({
      name: 'text',
      title: 'Feature Text',
      type: 'string',
      description: 'A short bullet point, e.g. "Optimized performance"',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: 'text' },
  },
})
