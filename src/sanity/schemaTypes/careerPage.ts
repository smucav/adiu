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
    defineField({
      name: 'lookingForTitle',
      title: 'Who We’re Looking For Title',
      type: 'string',
      initialValue: 'Who We’re Looking For',
    }),
    defineField({
      name: 'lookingForItems',
      title: 'Who We’re Looking For Items',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'galleryTag',
      title: 'Culture Gallery Tag',
      type: 'string',
      initialValue: 'Life at Adiu',
      description: 'Small label above the gallery section heading.',
    }),
    defineField({
      name: 'galleryTitle',
      title: 'Culture Gallery Title',
      type: 'string',
      initialValue: 'our team in action',
    }),
    defineField({
      name: 'gallerySubtitle',
      title: 'Culture Gallery Subtitle',
      type: 'text',
      initialValue: 'A snapshot of our journey. From collaborative engineering workshops to team milestones and offsite adventures, here is how we build together.',
    }),
  ],
})
