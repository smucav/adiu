import { ProjectsHero } from "@/components/sections/projects/ProjectsHero";
import { ProjectMasonry } from "@/components/sections/projects/ProjectMasonry";
import { FocusedServices } from "@/components/sections/projects/FocusedServices";
import { client } from "@/sanity/lib/client";
import { getProjectsPageQuery, getProjectsQuery } from "@/sanity/lib/queries";

export const revalidate = 60;

export default async function ProjectsPage() {
  const [projectsPage, allProjects] = await Promise.all([
    client.fetch(getProjectsPageQuery),
    client.fetch(getProjectsQuery),
  ]);

  const projects =
    projectsPage?.featuredServices && projectsPage.featuredServices.length > 0
      ? projectsPage.featuredServices
      : allProjects;

  return (
    <main style={{ backgroundColor: "#fff", minHeight: "100vh" }}>
      <ProjectsHero data={projectsPage} />
      <ProjectMasonry projects={allProjects} />
      {/*<ProjectShowcase data={projectsPage} />*/}
      <FocusedServices data={projectsPage} services={projects as any} />
    </main>
  );
}
