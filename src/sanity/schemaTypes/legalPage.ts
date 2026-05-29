import { defineField, defineType } from 'sanity'

export const legalPage = defineType({
  name: 'legalPage',
  title: 'Legal Pages',
  type: 'document',
  fields: [
    defineField({
      name: 'pageType',
      title: 'Page Type',
      type: 'string',
      description: 'Which legal page this document represents.',
      options: {
        list: [
          { title: 'Privacy Policy', value: 'privacy' },
          { title: 'Terms of Service', value: 'terms' },
          { title: 'Cookie Settings', value: 'cookies' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'badge',
      title: 'Badge Label',
      type: 'string',
      description: 'Small label shown above the title (e.g. "Legal" or "Cookie Policy").',
    }),
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'date',
    }),
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      description: 'Each section has a heading and a body. Use "- " at the start of a line for bullets, **word** for bold, and blank lines to separate paragraphs.',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Section Heading',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'body',
              title: 'Section Body',
              type: 'text',
              rows: 10,
            }),
          ],
          preview: {
            select: { title: 'title' },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'pageType' },
  },
})
