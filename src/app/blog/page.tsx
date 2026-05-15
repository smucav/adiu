import { TechArchive } from "@/components/sections/blog/TechArchive";
import { client } from "@/sanity/lib/client";
import { getBlogPageQuery, getArticlesQuery } from "@/sanity/lib/queries";

export const revalidate = 60;

export default async function BlogPage() {
  const [blogPage, articles] = await Promise.all([
    client.fetch(getBlogPageQuery),
    client.fetch(getArticlesQuery)
  ]);

  const featuredArticles = articles?.slice(0, 1) || [];
  const latestArticles = articles?.slice(1) || [];

  return (
    <main>
      <TechArchive
        data={blogPage}
        articles={articles || []}
        categories={blogPage?.filterCategories || []}
      />
    </main>
  );
}
