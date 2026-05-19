import { CareerHero } from "@/components/sections/career/CareerHero";
import { WhyWorkWithUs } from "@/components/sections/career/WhyWorkWithUs";
import { LookingFor } from "@/components/sections/career/LookingFor";
import { CultureGallery } from "@/components/sections/career/CultureGallery";
import { OpenRoles } from "@/components/sections/career/OpenRoles";
import { client } from "@/sanity/lib/client";
import { 
  getCareerPageQuery, 
  getWhyWorkFeaturesQuery, 
  getJobRolesQuery,
  getCultureImagesQuery 
} from "@/sanity/lib/queries";

export const revalidate = 60;

export default async function CareerPage() {
  const [careerPage, whyWorkFeatures, jobRoles, cultureImages] = await Promise.all([
    client.fetch(getCareerPageQuery),
    client.fetch(getWhyWorkFeaturesQuery),
    client.fetch(getJobRolesQuery),
    client.fetch(getCultureImagesQuery)
  ]);

  return (
    <main>
      <CareerHero data={careerPage} />
      <WhyWorkWithUs data={careerPage} features={whyWorkFeatures} />
      <LookingFor data={careerPage} />
      <CultureGallery images={cultureImages} data={careerPage} />
      <OpenRoles data={careerPage} roles={jobRoles} />
    </main>
  );
}
