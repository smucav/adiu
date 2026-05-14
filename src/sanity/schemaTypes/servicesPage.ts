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
    // CTA Section
    defineField({
      name: 'ctaEyebrow',
      title: 'CTA Eyebrow Label',
      type: 'string',
      description: 'Small label above the heading, e.g. "Ready to move forward"',
    }),
    defineField({
      name: 'ctaHeading',
      title: 'CTA Heading',
      type: 'string',
      description: 'Main heading line, e.g. "Let\'s build something"',
    }),
    defineField({
      name: 'ctaSubHeading',
      title: 'CTA Sub-Heading (italic line)',
      type: 'string',
      description: 'Italic second line of the heading, e.g. "that lasts."',
    }),
    defineField({
      name: 'ctaDescription',
      title: 'CTA Description',
      type: 'text',
      description: 'Short paragraph below the heading.',
    }),
    defineField({
      name: 'ctaPrimaryText',
      title: 'CTA Primary Button Text',
      type: 'string',
    }),
    defineField({
      name: 'ctaPrimaryLink',
      title: 'CTA Primary Button Link',
      type: 'string',
    }),
    defineField({
      name: 'ctaSecondaryText',
      title: 'CTA Secondary Link Text',
      type: 'string',
    }),
    defineField({
      name: 'ctaSecondaryLink',
      title: 'CTA Secondary Link URL',
      type: 'string',
    }),
    defineField({
      name: 'ctaMetaItems',
      title: 'CTA Meta Items',
      description: 'Short trust signals shown at the bottom, e.g. "Enterprise-grade delivery"',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
})
