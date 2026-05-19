import type { PortableTextBlock } from '@portabletext/types'

export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
}

export interface SanityGlobalSettings {
  brandGreen: string
  lightMint: string
  darkSlate: string
  olive: string
  siteTitle: string
  siteDescription?: string
  logoImage?: SanityImage
  navLinks?: Array<{ label: string; href: string }>
  footerBrandDesc?: string
  socialUrls?: {
    facebook?: string
    linkedin?: string
    instagram?: string
    twitter?: string
    youtube?: string
  }
  footerCopyright?: string
  privacyPolicyUrl?: string
  termsUrl?: string
  supportEmail?: string
  supportPhone?: string
  supportAddress?: string
}

export interface SanityStat {
  _id: string
  number: string
  title: string
  description?: string
  themeColor?: 'dark' | 'brand' | 'olive'
  order?: number
}

export interface SanityTestimonial {
  _id: string
  author: string
  role: string
  quote: string
  photo?: SanityImage
}

export interface SanityArticle {
  _id: string
  title: string
  slug: { current: string }
  categories: string[]
  publishedAt: string
  mainImage: SanityImage
  excerpt: string
  body: PortableTextBlock[]
  author: {
    name: string
    role: string
    bio?: string
    image: SanityImage
    socialLinks?: Array<{ platform: string; url: string }>
  }
  readTime: string
}

export interface SanityHomePage {
  heroTitle: string
  heroDescription: string
  heroCtaText: string
  heroCtaLink: string
  heroImage: SanityImage
  partnersLabel: string
  featuresHeading: string
  featuresDescription: string
  featuresImage: SanityImage
  featurePoints: Array<{ title: string; description: string }>
  statsHeading: string
  statsDescription: string
  statsCtaText: string
  statsCtaLink: string
  awardsHeading: string
  awardsDescription: string
  awardsStats?: Array<{ value: string; label: string }>
  actionBannerHeading: string
  actionBannerDescription: string
  actionBannerCtaText: string
  actionBannerCtaLink: string
  testimonialsHeading: string
  testimonialsDescription: string
  articlesHeading: string
  articlesDescription: string
  articlesCtaText: string
  articlesCtaLink: string
}

export interface SanityAboutPage {
  heroHeading: string
  heroDescription: string
  heroBackgroundImage?: SanityImage
  heroStats: Array<{ value: string; label: string; description: string }>
  missionDescription: string
  visionStatement?: string
  coreValues?: string[]
  missionStats: Array<{ value: string; label: string }>
  whyChooseUsSubtitle: string
  whyChooseUsHeading: string
  whyChooseUsBackgroundImage?: SanityImage
  teamHeading: string
  teamDescription: string
  highlightedCountries?: string[]
  mapScale?: number
  mapCenter?: { lng: number; lat: number }
}

export interface SanityBlogPage {
  heroBadge?: string
  archiveTitle: string
  archiveSubtitle: string
  filterCategories: string[]
  searchPlaceholder?: string
  searchButtonText?: string
  featuredLabel?: string
}

export interface SanityCareerPage {
  heroTitle: string
  heroSubtitle: string
  heroCtaText: string
  heroImage: SanityImage
  whyWorkTitle: string
  whyWorkSubtitle: string
  openRolesTitle: string
  openRolesSubtitle: string
  lookingForTitle?: string
  lookingForItems?: string[]
  galleryTag?: string
  galleryTitle?: string
  gallerySubtitle?: string
}

export interface SanityContactPage {
  heroLabel: string
  heroTitle: string
  heroSubtitle: string
  addressHeading: string
  addressText: string
  emailHeading: string
  emailText: string
  mapEmbedUrl: string
  faqTitle: string
  faqSubtitle: string
}

export interface SanityProjectsPage {
  heroTitle: string
  heroSubtitle: string
  heroCtaText?: string
  heroImages?: SanityImage[]
  servicesHeading: string
  servicesSubtitle: string
}

export interface SanityServicesPage {
  heroHeading: string
  heroDescription: string
  heroImage: SanityImage
  introHeading: string
  introText: string
  ctaEyebrow?: string
  ctaHeading?: string
  ctaSubHeading?: string
  ctaDescription?: string
  ctaPrimaryText?: string
  ctaPrimaryLink?: string
  ctaSecondaryText?: string
  ctaSecondaryLink?: string
  ctaMetaItems?: string[]
}

export interface SanityPartnerLogo {
  _id: string
  name: string
  websiteUrl?: string
  logo: SanityImage
  order: number
}

export interface SanityAward {
  _id: string
  name: string
  year: string
  org: string
  status?: 'amber' | 'green' | 'blue'
  description: string
  badgeImage: SanityImage
  order: number
}

export interface SanityTeamMember {
  _id: string
  name: string
  role: string
  description: string
  photo: SanityImage
  rank: number
}

export interface SanityWhyWorkFeature {
  _id: string
  title: string
  description: string
  icon: SanityImage
  order: number
}

export interface SanityJobRole {
  _id: string
  title: string
  location: string
  type: string
  department: string
  applyUrl: string
  order: number
}

export interface SanityFAQ {
  _id: string
  question: string
  answer: string
  order: number
}

export interface SanityServiceFeatureItem {
  _key: string
  text: string
}

export interface SanityFocusedService {
  _id: string
  title: string
  slug: { current: string }
  category?: string
  description: string
  featureItems?: SanityServiceFeatureItem[]
  content?: PortableTextBlock[]
  image: SanityImage
  order: number
}

export interface SanityProject {
  _id: string
  title: string
  slug: { current: string }
  category: string
  client?: string
  description: string
  content?: PortableTextBlock[]
  mainImage: SanityImage
  order: number
}

export interface SanityCultureImage {
  _id: string
  title: string
  category: 'team-events' | 'office-life' | 'onsite-milestones' | 'workshops'
  image: SanityImage
  order: number
}
