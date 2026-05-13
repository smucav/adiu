import { defineField, defineType } from 'sanity'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'author',
      title: 'Author or Entity Name',
      description: 'The name of the person or company providing the testimonial.',
      type: 'string',
    }),
    defineField({
      name: 'role',
      title: 'Role or Organization',
      description: 'The job title of the person or the industry of the company.',
      type: 'string',
    }),
    defineField({
      name: 'quote',
      title: 'Testimonial Statement',
      type: 'text',
    }),
    defineField({
      name: 'photo',
      title: 'Author Photo or Company Logo',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Important for accessibility and SEO.',
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
  ],
})
