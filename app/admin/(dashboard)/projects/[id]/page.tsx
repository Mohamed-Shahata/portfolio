import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { ProjectForm } from "@/components/admin/project-form";
import type { ProjectInput } from "@/lib/project-mapper";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await prisma.project.findUnique({ where: { id } });
  if (!project) notFound();

  const initial: ProjectInput = {
    slug: project.slug,
    type: project.type as ProjectInput["type"],
    published: project.published,
    title: project.title,
    tagline: project.tagline,
    overview: project.overview,
    problem: project.problem,
    solution: project.solution,
    features: project.features as string[],
    architecture: project.architecture,
    challenges: project.challenges,
    lessonsLearned: project.lessonsLearned,
    titleAr: project.titleAr,
    taglineAr: project.taglineAr,
    overviewAr: project.overviewAr,
    problemAr: project.problemAr,
    solutionAr: project.solutionAr,
    featuresAr: project.featuresAr as string[],
    architectureAr: project.architectureAr,
    challengesAr: project.challengesAr,
    lessonsLearnedAr: project.lessonsLearnedAr,
    techStack: project.techStack as string[],
    githubUrl: project.githubUrl,
    backendGithubUrl: project.backendGithubUrl,
    liveUrl: project.liveUrl,
    relatedSlugs: project.relatedSlugs as string[],
    metrics: project.metrics as ProjectInput["metrics"],
    images: project.images as string[],
  };

  return (
    <div>
      <h1 className="text-xl font-semibold text-foreground">Edit Project</h1>
      <p className="mt-1 text-sm text-muted">{project.title}</p>
      <ProjectForm mode="edit" projectId={project.id} initial={initial} />
    </div>
  );
}
