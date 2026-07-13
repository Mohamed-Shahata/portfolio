import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export interface BlogPostInput {
  slug: string;
  title: string;
  titleAr: string;
  excerpt: string;
  excerptAr: string;
  content: string;
  contentAr: string;
  readingTime: string;
  published: boolean;
}

export async function GET() {
  const posts = await prisma.blogPost.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  const body = (await request.json()) as BlogPostInput;

  if (!body.slug || !body.title) {
    return NextResponse.json({ error: "slug and title are required" }, { status: 400 });
  }

  const existing = await prisma.blogPost.findUnique({ where: { slug: body.slug } });
  if (existing) {
    return NextResponse.json(
      { error: `A post with slug "${body.slug}" already exists` },
      { status: 409 },
    );
  }

  const post = await prisma.blogPost.create({
    data: {
      slug: body.slug,
      title: body.title,
      titleAr: body.titleAr,
      excerpt: body.excerpt,
      excerptAr: body.excerptAr,
      content: body.content,
      contentAr: body.contentAr,
      readingTime: body.readingTime,
      published: body.published,
      publishedAt: body.published ? new Date() : null,
    },
  });

  return NextResponse.json(post, { status: 201 });
}
