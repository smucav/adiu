import { AboutHero } from "@/components/sections/about/AboutHero";
import { VisionMissionValues } from "@/components/sections/about/VisionMissionValues";
import { WhyChooseUs } from "@/components/sections/about/WhyChooseUs";
import { QEHSSection } from "@/components/sections/about/QEHSSection";
import { Team } from "@/components/sections/about/Team";
import { client } from "@/sanity/lib/client";
import { getAboutPageQuery, getTeamMembersQuery } from "@/sanity/lib/queries";

export const revalidate = 60;

export default async function AboutPage() {
  const [aboutPage, teamMembers] = await Promise.all([
    client.fetch(getAboutPageQuery),
    client.fetch(getTeamMembersQuery)
  ]);

  return (
    <main>
      <AboutHero data={aboutPage} />
      <VisionMissionValues data={aboutPage} />
      <WhyChooseUs data={aboutPage} />
      <QEHSSection data={aboutPage} />
      <Team data={aboutPage} members={teamMembers} />
    </main>
  );
}
