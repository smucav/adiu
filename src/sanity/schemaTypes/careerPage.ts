import { defineField, defineType } from 'sanity'

export const careerPage = defineType({
  name: 'careerPage',
  title: 'Career Page',
  type: 'document',
  fields: [
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'heroCtaText',
      title: 'Hero CTA Text',
      type: 'string',
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
      name: 'whyWorkTitle',
      title: 'Why Work With Us Title',
      type: 'string',
    }),
    defineField({
      name: 'whyWorkSubtitle',
      title: 'Why Work With Us Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'openRolesTitle',
      title: 'Open Roles Title',
      type: 'string',
    }),
    defineField({
      name: 'openRolesSubtitle',
      title: 'Open Roles Subtitle',
      type: 'string',
    }),
  ],
})
