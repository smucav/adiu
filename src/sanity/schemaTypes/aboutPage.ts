import { defineField, defineType } from 'sanity'

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero Section' },
    { name: 'mission', title: 'Mission Section' },
    { name: 'whyChooseUs', title: 'Why Choose Us' },
    { name: 'team', title: 'Team Section' },
    { name: 'qehs', title: 'QEHS Policy Section' },
    { name: 'map', title: 'Map Configuration' },
  ],
  fields: [
    defineField({
      name: 'heroHeading',
      title: 'Hero Heading',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero Description',
      type: 'text',
      group: 'hero',
    }),
    defineField({
      name: 'heroBackgroundImage',
      title: 'Hero Background Image',
      type: 'image',
      group: 'hero',
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
      name: 'heroStats',
      title: 'Hero Stats',
      type: 'array',
      group: 'hero',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'value', title: 'Value', type: 'string' },
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'description', title: 'Description', type: 'string' },
          ],
        },
      ],
      validation: (Rule) => Rule.max(3),
    }),
    defineField({
      name: 'missionHeading',
      title: 'Mission Heading',
      type: 'string',
      group: 'mission',
    }),
    defineField({
      name: 'missionDescription',
      title: 'Mission Description',
      type: 'text',
      group: 'mission',
    }),
    defineField({
      name: 'visionStatement',
      title: 'Vision Statement',
      type: 'text',
      group: 'mission',
    }),
    defineField({
      name: 'coreValues',
      title: 'Core Values',
      type: 'array',
      group: 'mission',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'missionImage',
      title: 'Mission Image',
      type: 'image',
      group: 'mission',
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
      name: 'missionStats',
      title: 'Mission Stats',
      type: 'array',
      group: 'mission',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'value', title: 'Value', type: 'string' },
            { name: 'label', title: 'Label', type: 'string' },
          ],
        },
      ],
      validation: (Rule) => Rule.max(3),
    }),
    defineField({
      name: 'whyChooseUsSubtitle',
      title: 'Why Choose Us Subtitle',
      type: 'string',
      group: 'whyChooseUs',
    }),
    defineField({
      name: 'whyChooseUsHeading',
      title: 'Why Choose Us Heading',
      type: 'string',
      group: 'whyChooseUs',
    }),
    defineField({
      name: 'whyChooseUsBackgroundImage',
      title: 'Why Choose Us Background Image',
      type: 'image',
      group: 'whyChooseUs',
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
      name: 'teamHeading',
      title: 'Team Heading',
      type: 'string',
      group: 'team',
    }),
    defineField({
      name: 'teamDescription',
      title: 'Team Description',
      type: 'text',
      group: 'team',
    }),
    defineField({
      name: 'qehsHeading',
      title: 'QEHS Heading',
      type: 'string',
      group: 'qehs',
      initialValue: 'Our QEHS Policy',
    }),
    defineField({
      name: 'qehsDescription',
      title: 'QEHS Description',
      type: 'text',
      group: 'qehs',
    }),
    defineField({
      name: 'qehsPolicies',
      title: 'QEHS Policies',
      type: 'array',
      group: 'qehs',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'text' },
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
              fields: [
                {
                  name: 'alt',
                  type: 'string',
                  title: 'Alternative Text',
                },
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'highlightedCountries',
      title: 'Highlighted Countries',
      description: 'Countries to highlight with a neon green glow. Use common names (e.g., "Ethiopia", "Kenya", "South Africa", "United Arab Emirates"). Matching is case-insensitive.',
      type: 'array',
      group: 'map',
      of: [{ type: 'string' }],
      initialValue: ['Ethiopia'],
    }),
    defineField({
      name: 'mapScale',
      title: 'Map Scale',
      description: 'Zoom level (default: 180). Higher is closer.',
      type: 'number',
      group: 'map',
      initialValue: 180,
    }),
    defineField({
      name: 'mapCenter',
      title: 'Map Center',
      description: 'Geographic center [longitude, latitude]. Africa center is roughly [15, 10].',
      type: 'object',
      group: 'map',
      fields: [
        { name: 'lng', title: 'Longitude', type: 'number', initialValue: 40 },
        { name: 'lat', title: 'Latitude', type: 'number', initialValue: 10 },
      ],
    }),
  ],
})
