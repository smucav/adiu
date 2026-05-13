import { defineField, defineType } from 'sanity'

export const blogPage = defineType({
  name: 'blogPage',
  title: 'Blog Page',
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
      name: 'archiveTitle',
      title: 'Archive Title',
      type: 'string',
    }),
    defineField({
      name: 'archiveSubtitle',
      title: 'Archive Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'filterCategories',
      title: 'Filter Categories',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
})
