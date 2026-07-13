import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import type { TestimonialInput } from "@/app/api/admin/testimonials/route";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: Request, { params }: RouteParams) {
  const { id } = await params;
  const body = (await request.json()) as Partial<TestimonialInput>;

  const existing = await prisma.testimonial.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const rating =
    body.rating !== undefined
      ? Math.min(5, Math.max(1, Number(body.rating) || 5))
      : undefined;

  const testimonial = await prisma.testimonial.update({
    where: { id },
    data: {
      ...(body.name !== undefined && { name: body.name }),
      ...(body.role !== undefined && { role: body.role }),
      ...(body.quote !== undefined && { quote: body.quote }),
      ...(rating !== undefined && { rating }),
      ...(body.published !== undefined && { published: body.published }),
    },
  });

  return NextResponse.json(testimonial);
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  const { id } = await params;
  const existing = await prisma.testimonial.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  await prisma.testimonial.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
