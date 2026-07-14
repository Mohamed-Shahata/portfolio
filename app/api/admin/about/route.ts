import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export interface AboutContentInput {
  intro: string;
  introAr: string;
  approach: string;
  approachAr: string;
  journey: { title: string; description: string }[];
  journeyAr: { title: string; description: string }[];
  resumeUrl: string | null;
}

export async function GET() {
  const about = await prisma.aboutContent.findUnique({
    where: { id: "singleton" },
  });
  return NextResponse.json(about);
}

export async function PATCH(request: Request) {
  const body = (await request.json()) as Partial<AboutContentInput>;

  const about = await prisma.aboutContent.upsert({
    where: { id: "singleton" },
    create: {
      id: "singleton",
      intro: body.intro ?? "",
      introAr: body.introAr ?? "",
      approach: body.approach ?? "",
      approachAr: body.approachAr ?? "",
      journey: body.journey ?? [],
      journeyAr: body.journeyAr ?? [],
      resumeUrl: body.resumeUrl ?? null,
    },
    update: {
      ...(body.intro !== undefined && { intro: body.intro }),
      ...(body.introAr !== undefined && { introAr: body.introAr }),
      ...(body.approach !== undefined && { approach: body.approach }),
      ...(body.approachAr !== undefined && { approachAr: body.approachAr }),
      ...(body.journey !== undefined && { journey: body.journey }),
      ...(body.journeyAr !== undefined && { journeyAr: body.journeyAr }),
      ...(body.resumeUrl !== undefined && { resumeUrl: body.resumeUrl }),
    },
  });

  return NextResponse.json(about);
}
