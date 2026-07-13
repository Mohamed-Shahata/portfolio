import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ProjectDetail } from "@/components/sections/project-detail";
import { getPublishedProjects, getProjectBySlugDb } from "@/lib/data";

export async function generateStaticParams() {
  const projects = await getPublishedProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlugDb(slug);
  if (!project) return {};
  return {
    title: `${project.title} | Mohamed Shehata`,
    description: project.tagline,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlugDb(slug);
  if (!project) notFound();

  const allProjects = await getPublishedProjects();
  const related = allProjects.filter((p) =>
    project.relatedSlugs.includes(p.slug),
  );

  return (
    <>
      <Navbar />
      <main className="relative flex-1 px-6 pb-24 pt-32">
        <ProjectDetail project={project} related={related} />
      </main>
      <Footer />
    </>
  );
}
