import { defineField, defineType } from 'sanity'

export const servicesPage = defineType({
  name: 'servicesPage',
  title: 'Services Page',
  type: 'document',
  fields: [
    defineField({
      name: 'heroHeading',
      title: 'Hero Heading',
      type: 'string',
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero Description',
      type: 'text',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
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
      name: 'introHeading',
      title: 'Introduction Heading',
      type: 'string',
    }),
    defineField({
      name: 'introText',
      title: 'Introduction Text',
      type: 'text',
    }),
    defineField({
      name: 'offeredServices',
      title: 'Offered Services (What We Offer)',
      description: 'Select the services to display in the main Services section.',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'focusedService' }] }],
    }),
  ],
})
