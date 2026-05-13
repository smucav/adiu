import { defineField, defineType } from 'sanity'

export const stat = defineType({
  name: 'stat',
  title: 'Stat Element',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Stat Title / Label',
      type: 'string',
    }),
    defineField({
      name: 'number',
      title: 'Number Value',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description Text',
      type: 'text',
    }),
    defineField({
      name: 'themeColor',
      title: 'Card Theme Color',
      type: 'string',
      options: {
        list: [
          { title: 'Dark Slate', value: 'dark' },
          { title: 'Brand Green', value: 'brand' },
          { title: 'Olive', value: 'olive' },
        ]
      }
    }),
  ],
})
