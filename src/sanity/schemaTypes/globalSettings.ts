import { defineField, defineType } from 'sanity'

export const globalSettings = defineType({
  name: 'globalSettings',
  title: 'Global Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'brandGreen',
      title: 'Brand Green Color',
      type: 'string',
      description: 'Hex code for the primary brand green (e.g. #059669)',
      initialValue: '#059669',
    }),
    defineField({
      name: 'lightMint',
      title: 'Light Mint Background',
      type: 'string',
      description: 'Hex code for light mint sections',
      initialValue: '#eaf5f0',
    }),
    defineField({
      name: 'darkSlate',
      title: 'Dark Slate Background',
      type: 'string',
      description: 'Hex code for footer and dark cards',
      initialValue: '#1e293b',
    }),
    defineField({
      name: 'olive',
      title: 'Olive Accent',
      type: 'string',
      description: 'Hex code for olive elements',
      initialValue: '#4d5b4a',
    }),
    defineField({
      name: 'siteTitle',
      title: 'Site Title',
      type: 'string',
    }),
    defineField({
      name: 'siteDescription',
      title: 'Site Description',
      type: 'text',
    }),
    defineField({
      name: 'logoImage',
      title: 'Logo Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'navLinks',
      title: 'Navigation Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'href', title: 'Href', type: 'string' },
          ],
        },
      ],
    }),
    defineField({
      name: 'footerBrandDesc',
      title: 'Footer Brand Description',
      type: 'text',
    }),
    defineField({
      name: 'socialUrls',
      title: 'Social Media URLs',
      type: 'object',
      fields: [
        { name: 'facebook', title: 'Facebook', type: 'url' },
        { name: 'linkedin', title: 'LinkedIn', type: 'url' },
        { name: 'instagram', title: 'Instagram', type: 'url' },
      ],
    }),
    defineField({
      name: 'footerCopyright',
      title: 'Footer Copyright Text',
      type: 'string',
    }),
    defineField({
      name: 'privacyPolicyUrl',
      title: 'Privacy Policy URL',
      type: 'string',
    }),
    defineField({
      name: 'termsUrl',
      title: 'Terms of Service URL',
      type: 'string',
    }),
    defineField({
      name: 'supportEmail',
      title: 'Support / Contact Email',
      type: 'string',
      initialValue: 'hello@adiu.com',
    }),
    defineField({
      name: 'supportPhone',
      title: 'Support / Contact Phone',
      type: 'string',
      initialValue: '+251 11 661 0000',
    }),
    defineField({
      name: 'supportAddress',
      title: 'Support / Contact Address',
      type: 'text',
      initialValue: 'Bole Road, Addis Ababa, Ethiopia',
    }),
    defineField({
      name: 'revalidateTime',
      title: 'Cache Revalidation Time (seconds)',
      type: 'number',
      description: 'How often the website should check Sanity for updates (in seconds). Set to 0 for instant updates (may be slower), or 60+ for best performance.',
      initialValue: 60,
      validation: (Rule) => Rule.min(0),
    }),
  ],
})
