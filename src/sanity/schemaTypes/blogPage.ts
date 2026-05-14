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
      name: 'heroBadge',
      title: 'Hero Badge',
      type: 'string',
      description: 'The small label above the title (e.g., Knowledge Center)',
      initialValue: 'Knowledge Center',
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
    defineField({
      name: 'searchPlaceholder',
      title: 'Search Placeholder',
      type: 'string',
      initialValue: 'Search the archive...',
    }),
    defineField({
      name: 'searchButtonText',
      title: 'Search Button Text',
      type: 'string',
      initialValue: 'Find Insights',
    }),
    defineField({
      name: 'featuredLabel',
      title: 'Featured Card Label',
      type: 'string',
      initialValue: 'Latest Highlight',
    }),
  ],
})
