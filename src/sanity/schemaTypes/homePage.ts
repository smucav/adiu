import { defineField, defineType } from 'sanity'

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero Description',
      type: 'text',
    }),
    defineField({
      name: 'heroCtaText',
      title: 'Hero CTA Text',
      type: 'string',
    }),
    defineField({
      name: 'heroCtaLink',
      title: 'Hero CTA Link',
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
      name: 'partnersLabel',
      title: 'Partners Label',
      type: 'string',
    }),
    defineField({
      name: 'featuresHeading',
      title: 'Features Heading',
      type: 'string',
    }),
    defineField({
      name: 'featuresDescription',
      title: 'Features Description',
      type: 'text',
    }),
    defineField({
      name: 'featuresImage',
      title: 'Features Image',
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
      name: 'featurePoints',
      title: 'Feature Points',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'text' },
          ],
        },
      ],
    }),
    defineField({
      name: 'statsHeading',
      title: 'Stats Heading',
      type: 'string',
    }),
    defineField({
      name: 'statsDescription',
      title: 'Stats Description',
      type: 'text',
    }),
    defineField({
      name: 'statsCtaText',
      title: 'Stats CTA Text',
      type: 'string',
    }),
    defineField({
      name: 'statsCtaLink',
      title: 'Stats CTA Link',
      type: 'string',
    }),
    defineField({
      name: 'awardsHeading',
      title: 'Awards Heading',
      type: 'string',
    }),
    defineField({
      name: 'awardsDescription',
      title: 'Awards Description',
      type: 'text',
    }),
    defineField({
      name: 'awardsStats',
      title: 'Awards Section Mini-Stats',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'value', title: 'Value (e.g. 12+)', type: 'string' },
            { name: 'label', title: 'Label (e.g. Awards)', type: 'string' },
          ],
        },
      ],
    }),
    defineField({
      name: 'actionBannerHeading',
      title: 'Action Banner Heading',
      type: 'string',
    }),
    defineField({
      name: 'actionBannerDescription',
      title: 'Action Banner Description',
      type: 'text',
    }),
    defineField({
      name: 'actionBannerCtaText',
      title: 'Action Banner CTA Text',
      type: 'string',
    }),
    defineField({
      name: 'actionBannerCtaLink',
      title: 'Action Banner CTA Link',
      type: 'string',
    }),
    defineField({
      name: 'actionBannerImage',
      title: 'Action Banner Image',
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
      name: 'testimonialsHeading',
      title: 'Testimonials Heading',
      type: 'string',
    }),
    defineField({
      name: 'testimonialsDescription',
      title: 'Testimonials Description',
      type: 'text',
    }),
    defineField({
      name: 'articlesHeading',
      title: 'Articles Heading',
      type: 'string',
    }),
    defineField({
      name: 'articlesDescription',
      title: 'Articles Description',
      type: 'text',
    }),
    defineField({
      name: 'articlesCtaText',
      title: 'Articles CTA Text',
      type: 'string',
    }),
    defineField({
      name: 'articlesCtaLink',
      title: 'Articles CTA Link',
      type: 'string',
    }),
  ],
})
