import { defineField, defineType } from 'sanity'

export const contactPage = defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  fields: [
    defineField({
      name: 'heroLabel',
      title: 'Hero Label',
      type: 'string',
    }),
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
      name: 'addressHeading',
      title: 'Address Heading',
      type: 'string',
    }),
    defineField({
      name: 'addressText',
      title: 'Address Text',
      type: 'text',
    }),
    defineField({
      name: 'emailHeading',
      title: 'Email Heading',
      type: 'string',
    }),
    defineField({
      name: 'emailText',
      title: 'Email Text',
      type: 'string',
    }),
    defineField({
      name: 'mapEmbedUrl',
      title: 'Map Embed URL',
      type: 'url',
    }),
    defineField({
      name: 'faqTitle',
      title: 'FAQ Title',
      type: 'string',
    }),
    defineField({
      name: 'faqSubtitle',
      title: 'FAQ Subtitle',
      type: 'string',
    }),
  ],
})
