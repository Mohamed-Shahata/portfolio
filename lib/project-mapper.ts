import type { Project as DbProject } from "@/lib/generated/prisma";
import type { Project, ProjectMetric } from "@/lib/projects-data";

/** Converts a flat DB row (Ar-suffixed fields) into the nested shape the frontend uses. */
export function dbProjectToProject(row: DbProject): Project {
  return {
    slug: row.slug,
    type: row.type as Project["type"],
    title: row.title,
    tagline: row.tagline,
    overview: row.overview,
    problem: row.problem,
    solution: row.solution,
    features: row.features as string[],
    architecture: row.architecture,
    challenges: row.challenges,
    lessonsLearned: row.lessonsLearned,
    results: row.results ?? undefined,
    techStack: row.techStack as string[],
    githubUrl: row.githubUrl,
    backendGithubUrl: row.backendGithubUrl ?? undefined,
    liveUrl: row.liveUrl ?? "",
    relatedSlugs: row.relatedSlugs as string[],
    metrics: row.metrics as unknown as ProjectMetric[],
    images: row.images as string[],
    videoUrl: row.videoUrl ?? undefined,
    ar: {
      title: row.titleAr,
      tagline: row.taglineAr,
      overview: row.overviewAr,
      problem: row.problemAr,
      solution: row.solutionAr,
      features: row.featuresAr as string[],
      architecture: row.architectureAr,
      challenges: row.challengesAr,
      lessonsLearned: row.lessonsLearnedAr,
      results: row.resultsAr ?? undefined,
    },
  };
}

/** Shape accepted from the admin form — flat, matches the DB columns directly. */
export interface ProjectInput {
  slug: string;
  type: "Full Stack" | "Backend";
  published: boolean;
  title: string;
  tagline: string;
  overview: string;
  problem: string;
  solution: string;
  features: string[];
  architecture: string;
  challenges: string;
  lessonsLearned: string;
  results: string | null;
  titleAr: string;
  taglineAr: string;
  overviewAr: string;
  problemAr: string;
  solutionAr: string;
  featuresAr: string[];
  architectureAr: string;
  challengesAr: string;
  lessonsLearnedAr: string;
  resultsAr: string | null;
  techStack: string[];
  githubUrl: string;
  backendGithubUrl: string | null;
  liveUrl: string | null;
  relatedSlugs: string[];
  metrics: ProjectMetric[];
  images: string[];
  videoUrl: string | null;
}
