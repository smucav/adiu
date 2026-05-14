import { BlogDetails } from "@/components/sections/blog/BlogDetails";
import { client } from "@/sanity/lib/client";
import { getArticleBySlugQuery, getArticlesQuery } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";

interface BlogPostProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const articles = await client.fetch(getArticlesQuery);
  return articles.map((article: any) => ({
    slug: article.slug.current,
  }));
}

export default async function BlogPostPage({ params }: BlogPostProps) {
  const { slug } = await params;
  const article = await client.fetch(getArticleBySlugQuery, { slug });

  if (!article) {
    notFound();
  }

  const allArticles = await client.fetch(getArticlesQuery);
  const relatedArticles = allArticles
    .filter((a: any) => a._id !== article._id)
    .slice(0, 3);

  return (
    <main>
      <BlogDetails article={article} related={relatedArticles} />
    </main>
  );
}
