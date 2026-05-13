import { CareerHero } from "@/components/sections/career/CareerHero";
import { WhyWorkWithUs } from "@/components/sections/career/WhyWorkWithUs";
import { OpenRoles } from "@/components/sections/career/OpenRoles";
import { client } from "@/sanity/lib/client";
import { getCareerPageQuery, getWhyWorkFeaturesQuery, getJobRolesQuery } from "@/sanity/lib/queries";

export const revalidate = 60;

export default async function CareerPage() {
  const [careerPage, whyWorkFeatures, jobRoles] = await Promise.all([
    client.fetch(getCareerPageQuery),
    client.fetch(getWhyWorkFeaturesQuery),
    client.fetch(getJobRolesQuery)
  ]);

  return (
    <main>
      <CareerHero data={careerPage} />
      <WhyWorkWithUs data={careerPage} features={whyWorkFeatures} />
      <OpenRoles data={careerPage} roles={jobRoles} />
    </main>
  );
}
