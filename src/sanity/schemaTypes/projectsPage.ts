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
      name: 'heroImageLeft',
      title: 'Hero Image Left',
      type: 'image',
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
      name: 'heroImageCenter',
      title: 'Hero Image Center',
      type: 'image',
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
      name: 'heroImageRight',
      title: 'Hero Image Right',
      type: 'image',
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
      name: 'showcase1Title',
      title: 'Showcase 1 Title',
      type: 'string',
    }),
    defineField({
      name: 'showcase1Description',
      title: 'Showcase 1 Description',
      type: 'text',
    }),
    defineField({
      name: 'showcase1Image',
      title: 'Showcase 1 Image',
      type: 'image',
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
      name: 'showcase2Title',
      title: 'Showcase 2 Title',
      type: 'string',
    }),
    defineField({
      name: 'showcase2Description',
      title: 'Showcase 2 Description',
      type: 'text',
    }),
    defineField({
      name: 'showcase2ImageLeft',
      title: 'Showcase 2 Image Left',
      type: 'image',
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
      name: 'showcase2ImageRight',
      title: 'Showcase 2 Image Right',
      type: 'image',
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
