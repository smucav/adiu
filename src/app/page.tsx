import { Hero } from "@/components/sections/Hero";
import { Features } from "@/components/sections/Features";
import { Stats } from "@/components/sections/Stats";
import { Awards } from "@/components/sections/Awards";
import { ActionBanner } from "@/components/sections/ActionBanner";
import { Testimonials } from "@/components/sections/Testimonials";
import { Articles } from "@/components/sections/Articles";
import { client } from "@/sanity/lib/client";
import { 
  getHomePageQuery, 
  getPartnerLogosQuery, 
  getStatsQuery, 
  getAwardsQuery, 
  getTestimonialsQuery, 
  getFeaturedArticlesQuery,
} from "@/sanity/lib/queries";

// ISR: regenerate every 60 seconds
export const revalidate = 60;

export default async function Home() {
  const [
    homePage,
    partnerLogos,
    stats,
    awards,
    testimonials,
    articles
  ] = await Promise.all([
    client.fetch(getHomePageQuery),
    client.fetch(getPartnerLogosQuery),
    client.fetch(getStatsQuery),
    client.fetch(getAwardsQuery),
    client.fetch(getTestimonialsQuery),
    client.fetch(getFeaturedArticlesQuery)
  ]);

  return (
    <main>
      <Hero data={homePage} partners={partnerLogos} />
      <Features data={homePage} />
      <Stats data={homePage} stats={stats} />
      <Awards data={homePage} awards={awards} />
      <ActionBanner data={homePage} />
      <Testimonials data={homePage} testimonials={testimonials} />
      <Articles data={homePage} articles={articles} />
    </main>
  );
}
