import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import type { Prisma } from "@/lib/generated/prisma";
import type { ProjectInput } from "@/lib/project-mapper";

export async function GET() {
  const projects = await prisma.project.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json(projects);
}

export async function POST(request: Request) {
  const body = (await request.json()) as ProjectInput;

  if (!body.slug || !body.title) {
    return NextResponse.json(
      { error: "slug and title are required" },
      { status: 400 },
    );
  }

  const existing = await prisma.project.findUnique({
    where: { slug: body.slug },
  });
  if (existing) {
    return NextResponse.json(
      { error: `A project with slug "${body.slug}" already exists` },
      { status: 409 },
    );
  }

  const count = await prisma.project.count();

  const project = await prisma.project.create({
    data: {
      slug: body.slug,
      order: count,
      type: body.type,
      published: body.published,
      title: body.title,
      tagline: body.tagline,
      overview: body.overview,
      problem: body.problem,
      solution: body.solution,
      features: body.features,
      architecture: body.architecture,
      challenges: body.challenges,
      lessonsLearned: body.lessonsLearned,
      results: body.results,
      titleAr: body.titleAr,
      taglineAr: body.taglineAr,
      overviewAr: body.overviewAr,
      problemAr: body.problemAr,
      solutionAr: body.solutionAr,
      featuresAr: body.featuresAr,
      architectureAr: body.architectureAr,
      challengesAr: body.challengesAr,
      lessonsLearnedAr: body.lessonsLearnedAr,
      resultsAr: body.resultsAr,
      techStack: body.techStack,
      githubUrl: body.githubUrl,
      backendGithubUrl: body.backendGithubUrl,
      liveUrl: body.liveUrl,
      relatedSlugs: body.relatedSlugs,
      metrics: body.metrics as unknown as Prisma.InputJsonValue,
      images: body.images,
      videoUrl: body.videoUrl,
    },
  });

  return NextResponse.json(project, { status: 201 });
}
