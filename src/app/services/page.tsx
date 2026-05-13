import { ServicesHero } from "@/components/sections/services/ServicesHero";
import { ServiceStack } from "@/components/sections/services/ServiceStack";
import { ActionBanner } from "@/components/sections/ActionBanner";
import { client } from "@/sanity/lib/client";
import { getServicesPageQuery, getFocusedServicesQuery, getHomePageQuery } from "@/sanity/lib/queries";

export const revalidate = 60;

export default async function ServicesPage() {
  const [pageData, allServices, homePageData] = await Promise.all([
    client.fetch(getServicesPageQuery),
    client.fetch(getFocusedServicesQuery),
    client.fetch(getHomePageQuery)
  ]);

  const services = (pageData?.offeredServices && pageData.offeredServices.length > 0)
    ? pageData.offeredServices
    : allServices;

  return (
    <main>
      <ServicesHero data={pageData} />
      <ServiceStack 
        pageData={pageData} 
        services={services} 
      />
      <ActionBanner data={homePageData} />
    </main>
  );
}
