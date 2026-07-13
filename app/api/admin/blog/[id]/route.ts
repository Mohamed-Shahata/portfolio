import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import type { BlogPostInput } from "@/app/api/admin/blog/route";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, { params }: RouteParams) {
  const { id } = await params;
  const post = await prisma.blogPost.findUnique({ where: { id } });
  if (!post) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(post);
}

export async function PATCH(request: Request, { params }: RouteParams) {
  const { id } = await params;
  const body = (await request.json()) as Partial<BlogPostInput>;

  const existing = await prisma.blogPost.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (body.slug && body.slug !== existing.slug) {
    const slugTaken = await prisma.blogPost.findUnique({ where: { slug: body.slug } });
    if (slugTaken) {
      return NextResponse.json(
        { error: `A post with slug "${body.slug}" already exists` },
        { status: 409 },
      );
    }
  }

  // Stamp publishedAt the first time a post flips to published.
  const justPublished = body.published === true && !existing.published;

  const post = await prisma.blogPost.update({
    where: { id },
    data: {
      ...(body.slug !== undefined && { slug: body.slug }),
      ...(body.title !== undefined && { title: body.title }),
      ...(body.titleAr !== undefined && { titleAr: body.titleAr }),
      ...(body.excerpt !== undefined && { excerpt: body.excerpt }),
      ...(body.excerptAr !== undefined && { excerptAr: body.excerptAr }),
      ...(body.content !== undefined && { content: body.content }),
      ...(body.contentAr !== undefined && { contentAr: body.contentAr }),
      ...(body.readingTime !== undefined && { readingTime: body.readingTime }),
      ...(body.published !== undefined && { published: body.published }),
      ...(justPublished && { publishedAt: new Date() }),
    },
  });

  return NextResponse.json(post);
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  const { id } = await params;
  const existing = await prisma.blogPost.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  await prisma.blogPost.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
