import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import type { Prisma } from "@/lib/generated/prisma";
import type { ProjectInput } from "@/lib/project-mapper";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, { params }: RouteParams) {
  const { id } = await params;
  const project = await prisma.project.findUnique({ where: { id } });
  if (!project) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(project);
}

export async function PATCH(request: Request, { params }: RouteParams) {
  const { id } = await params;
  const body = (await request.json()) as Partial<ProjectInput> & {
    order?: number;
  };

  const existing = await prisma.project.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (body.slug && body.slug !== existing.slug) {
    const slugTaken = await prisma.project.findUnique({
      where: { slug: body.slug },
    });
    if (slugTaken) {
      return NextResponse.json(
        { error: `A project with slug "${body.slug}" already exists` },
        { status: 409 },
      );
    }
  }

  const project = await prisma.project.update({
    where: { id },
    data: {
      ...(body.slug !== undefined && { slug: body.slug }),
      ...(body.order !== undefined && { order: body.order }),
      ...(body.type !== undefined && { type: body.type }),
      ...(body.published !== undefined && { published: body.published }),
      ...(body.title !== undefined && { title: body.title }),
      ...(body.tagline !== undefined && { tagline: body.tagline }),
      ...(body.overview !== undefined && { overview: body.overview }),
      ...(body.problem !== undefined && { problem: body.problem }),
      ...(body.solution !== undefined && { solution: body.solution }),
      ...(body.features !== undefined && { features: body.features }),
      ...(body.architecture !== undefined && {
        architecture: body.architecture,
      }),
      ...(body.challenges !== undefined && { challenges: body.challenges }),
      ...(body.lessonsLearned !== undefined && {
        lessonsLearned: body.lessonsLearned,
      }),
      ...(body.results !== undefined && { results: body.results }),
      ...(body.titleAr !== undefined && { titleAr: body.titleAr }),
      ...(body.taglineAr !== undefined && { taglineAr: body.taglineAr }),
      ...(body.overviewAr !== undefined && { overviewAr: body.overviewAr }),
      ...(body.problemAr !== undefined && { problemAr: body.problemAr }),
      ...(body.solutionAr !== undefined && { solutionAr: body.solutionAr }),
      ...(body.featuresAr !== undefined && { featuresAr: body.featuresAr }),
      ...(body.architectureAr !== undefined && {
        architectureAr: body.architectureAr,
      }),
      ...(body.challengesAr !== undefined && {
        challengesAr: body.challengesAr,
      }),
      ...(body.lessonsLearnedAr !== undefined && {
        lessonsLearnedAr: body.lessonsLearnedAr,
      }),
      ...(body.resultsAr !== undefined && { resultsAr: body.resultsAr }),
      ...(body.techStack !== undefined && { techStack: body.techStack }),
      ...(body.githubUrl !== undefined && { githubUrl: body.githubUrl }),
      ...(body.backendGithubUrl !== undefined && {
        backendGithubUrl: body.backendGithubUrl,
      }),
      ...(body.liveUrl !== undefined && { liveUrl: body.liveUrl }),
      ...(body.relatedSlugs !== undefined && {
        relatedSlugs: body.relatedSlugs,
      }),
      ...(body.metrics !== undefined && {
        metrics: body.metrics as unknown as Prisma.InputJsonValue,
      }),
      ...(body.images !== undefined && { images: body.images }),
      ...(body.videoUrl !== undefined && { videoUrl: body.videoUrl }),
    },
  });

  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath(`/projects/${project.slug}`);
  if (body.slug && body.slug !== existing.slug) {
    revalidatePath(`/projects/${existing.slug}`);
  }

  return NextResponse.json(project);
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  const { id } = await params;
  const existing = await prisma.project.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  await prisma.project.delete({ where: { id } });

  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath(`/projects/${existing.slug}`);

  return NextResponse.json({ ok: true });
}
