import type { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'
import { getArticlesQuery } from '@/sanity/lib/queries'

export const revalidate = 3600 // Regenerate sitemap every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://adiu.com'
  
  // Static routes
  const routes = [
    '',
    '/about',
    '/services',
    '/projects',
    '/blog',
    '/career',
    '/contact',
  ]

  const staticEntries: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.8,
  }))

  // Dynamic blog article routes
  let articleEntries: MetadataRoute.Sitemap = []
  try {
    const articles = await client.fetch(getArticlesQuery)
    articleEntries = (articles || []).map((article: any) => ({
      url: `${baseUrl}/blog/${article.slug?.current}`,
      lastModified: new Date(article.publishedAt || Date.now()),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  } catch {
    // Sanity fetch failed — proceed with static routes only
  }

  return [...staticEntries, ...articleEntries]
}
