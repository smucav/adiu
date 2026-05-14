import { ServicesHero } from "@/components/sections/services/ServicesHero";
import { ServiceStack } from "@/components/sections/services/ServiceStack";
import { ServicesCTA } from "@/components/sections/services/ServicesCTA";
import { client } from "@/sanity/lib/client";
import {
  getServicesPageQuery,
  getFocusedServicesQuery,
} from "@/sanity/lib/queries";

export const revalidate = 60;

export default async function ServicesPage() {
  const [pageData, allServices] = await Promise.all([
    client.fetch(getServicesPageQuery),
    client.fetch(getFocusedServicesQuery),
  ]);

  const services =
    pageData?.offeredServices && pageData.offeredServices.length > 0
      ? pageData.offeredServices
      : allServices;

  return (
    <main>
      <ServicesHero data={pageData} />
      <ServiceStack pageData={pageData} services={services} />
      <ServicesCTA data={pageData} />
    </main>
  );
}
