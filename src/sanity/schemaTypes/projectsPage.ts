import { defineField, defineType } from 'sanity'

export const projectsPage = defineType({
  name: 'projectsPage',
  title: 'Projects Page',
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
      title: 'Hero CTA Button Text',
      type: 'string',
      initialValue: 'explore our work',
    }),
    defineField({
      name: 'heroImages',
      title: 'Hero Deck Images',
      description: 'Upload exactly 8 images for the animated "deck of cards" hero section. If fewer are provided, fallbacks will be used.',
      type: 'array',
      validation: (Rule) => Rule.max(8),
      of: [
        {
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
        },
      ],
    }),
    defineField({
      name: 'servicesHeading',
      title: 'Services Heading',
      type: 'string',
    }),
    defineField({
      name: 'servicesSubtitle',
      title: 'Services Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'featuredServices',
      title: 'Featured Projects (Focused Work)',
      description: 'Select the projects to display in the Focused Work section.',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'project' }] }],
    }),
  ],
})
