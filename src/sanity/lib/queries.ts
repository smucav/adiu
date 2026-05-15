import { groq } from "next-sanity";

// Reusable image projection fragment
const imageFields = `{ _type, asset->{ _id, url, metadata { lqip, dimensions } }, alt, hotspot }`;

// Global Settings — only fetch what layout/nav/footer use
export const getGlobalSettingsQuery = groq`*[_type == "globalSettings"][0]{
  brandGreen, lightMint, darkSlate, olive,
  siteTitle, siteDescription,
  logoImage ${imageFields},
  navLinks[]{ label, href },
  footerBrandDesc,
  socialUrls{ facebook, linkedin, instagram },
  footerCopyright, privacyPolicyUrl, termsUrl,
  revalidateTime
}`;

// Home Page — only the fields that page.tsx renders
export const getHomePageQuery = groq`*[_type == "homePage"][0]{
  heroTitle, heroDescription, heroCtaText, heroCtaLink,
  heroImage ${imageFields},
  partnersLabel,
  featuresHeading, featuresDescription,
  featuresImage ${imageFields},
  featurePoints[]{ title, description },
  statsHeading, statsDescription, statsCtaText, statsCtaLink,
  awardsHeading, awardsDescription,
  actionBannerHeading, actionBannerDescription, actionBannerCtaText, actionBannerCtaLink,
  actionBannerImage ${imageFields},
  testimonialsHeading, testimonialsDescription,
  articlesHeading, articlesDescription, articlesCtaText, articlesCtaLink
}`;

// Collections — projected to only needed fields
export const getTestimonialsQuery = groq`*[_type == "testimonial"]{
  _id, author, role, quote,
  photo ${imageFields}
}`;

export const getArticlesQuery = groq`*[_type == "article"] | order(publishedAt desc){
  _id, title, slug, categories, publishedAt, excerpt,
  mainImage ${imageFields}
}`;

export const getFeaturedArticlesQuery = groq`*[_type == "article"] | order(publishedAt desc)[0...3]{
  _id, title, slug, categories, publishedAt,
  mainImage ${imageFields}
}`;

export const getArticleBySlugQuery = groq`*[_type == "article" && slug.current == $slug][0]{
  _id, title, slug, categories, publishedAt, excerpt, readTime,
  mainImage ${imageFields},
  body,
  author{ name, role, bio, image ${imageFields}, socialLinks }
}`;

export const getStatsQuery = groq`*[_type == "stat"] | order(order asc){
  _id, number, title, description, themeColor
}`;

export const getPartnerLogosQuery = groq`*[_type == "partnerLogo"] | order(order asc){
  _id, name, logo ${imageFields}, websiteUrl
}`;

export const getAwardsQuery = groq`*[_type == "award"] | order(order asc){
  _id, name, year, org, status, description,
  badgeImage ${imageFields}
}`;

export const getTeamMembersQuery = groq`*[_type == "teamMember"] | order(order asc){
  _id, name, role, description,
  photo ${imageFields}
}`;

export const getWhyWorkFeaturesQuery = groq`*[_type == "whyWorkFeature"] | order(order asc){
  _id, title, description,
  icon ${imageFields}
}`;

export const getJobRolesQuery = groq`*[_type == "jobRole"] | order(order asc){
  _id, title, location, type, department, applyUrl
}`;

export const getFAQsQuery = groq`*[_type == "faq"] | order(order asc){
  _id, question, answer
}`;

export const getFocusedServicesQuery = groq`*[_type == "focusedService"] | order(order asc){
  _id, title, slug, category, description,
  featureItems[]{ _key, text },
  content,
  image ${imageFields}
}`;

export const getServiceBySlugQuery = groq`*[_type == "focusedService" && slug.current == $slug][0]{
  _id, title, slug, category, description,
  featureItems[]{ _key, text },
  content,
  image ${imageFields}
}`;

export const getProjectsQuery = groq`*[_type == "project"] | order(order asc){
  _id, title, slug, category, client, description, content,
  mainImage ${imageFields}
}`;

// Page Singletons — projected
export const getAboutPageQuery = groq`*[_type == "aboutPage"][0]{
  heroHeading, heroDescription,
  heroBackgroundImage ${imageFields},
  heroStats[]{ value, label, description },
  missionHeading, missionDescription,
  missionImage ${imageFields},
  missionStats[]{ value, label },
  whyChooseUsSubtitle, whyChooseUsHeading,
  whyChooseUsBackgroundImage ${imageFields},
  teamHeading, teamDescription,
  qehsHeading, qehsDescription,
  qehsPolicies[]{ title, description, image ${imageFields} },
  highlightedCountries, mapScale, mapCenter
}`;

export const getBlogPageQuery = groq`*[_type == "blogPage"][0]{
  heroTitle, heroSubtitle, heroBadge,
  archiveTitle, archiveSubtitle,
  filterCategories,
  searchPlaceholder, searchButtonText, featuredLabel
}`;

export const getCareerPageQuery = groq`*[_type == "careerPage"][0]{
  heroTitle, heroSubtitle, heroCtaText,
  heroImage ${imageFields},
  whyWorkTitle, whyWorkSubtitle,
  openRolesTitle, openRolesSubtitle
}`;

export const getContactPageQuery = groq`*[_type == "contactPage"][0]{
  heroLabel, heroTitle, heroSubtitle,
  addressHeading, addressText,
  emailHeading, emailText,
  mapEmbedUrl,
  faqTitle, faqSubtitle
}`;

export const getProjectsPageQuery = groq`*[_type == "projectsPage"][0]{
  heroTitle, heroSubtitle,
  heroImages[] ${imageFields},
  showcase1Title, showcase1Description,
  showcase1Image ${imageFields},
  showcase2Title, showcase2Description,
  showcase2ImageLeft ${imageFields},
  showcase2ImageRight ${imageFields},
  servicesHeading, servicesSubtitle,
  featuredServices[]->{
    _id, title, slug, category, client, description, content,
    mainImage ${imageFields}
  }
}`;

export const getServicesPageQuery = groq`*[_type == "servicesPage"][0]{
  heroHeading, heroDescription,
  heroImage ${imageFields},
  introHeading, introText,
  offeredServices[]->{
    _id, title, slug, category, description,
    featureItems[]{ _key, text },
    content,
    image ${imageFields}
  },
  ctaEyebrow, ctaHeading, ctaSubHeading, ctaDescription,
  ctaPrimaryText, ctaPrimaryLink,
  ctaSecondaryText, ctaSecondaryLink,
  ctaMetaItems
}`;
