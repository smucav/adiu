import { BlogDetails } from "@/components/sections/blog/BlogDetails";
import { LatestArticles } from "@/components/sections/blog/LatestArticles";
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

  const moreArticles = await client.fetch(getArticlesQuery);
  const filteredMore = moreArticles.filter((a: any) => a._id !== article._id).slice(0, 3);

  return (
    <main>
      <BlogDetails article={article} />

      {/* Suggested Reading / Related Posts at bottom */}
      <div style={{ backgroundColor: "#f8fafc", padding: "80px 0 20px" }}>
        <div className="container" style={{ marginBottom: "-40px" }}>
          <h2 style={{ fontSize: "2rem", marginBottom: "0", textAlign: "center", color: "#000" }}>
            More to read
          </h2>
        </div>
        <LatestArticles articles={filteredMore} />
      </div>
    </main>
  );
}
