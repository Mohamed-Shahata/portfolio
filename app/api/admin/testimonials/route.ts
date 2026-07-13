import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export interface TestimonialInput {
  name: string;
  role: string;
  quote: string;
  rating: number;
  published: boolean;
}

export async function GET() {
  const testimonials = await prisma.testimonial.findMany({
    orderBy: { order: "asc" },
  });
  return NextResponse.json(testimonials);
}

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<TestimonialInput>;

  if (!body.name || !body.quote) {
    return NextResponse.json(
      { error: "name and quote are required" },
      { status: 400 },
    );
  }

  const rating = Math.min(5, Math.max(1, Number(body.rating) || 5));
  const count = await prisma.testimonial.count();

  const testimonial = await prisma.testimonial.create({
    data: {
      name: body.name,
      role: body.role ?? "",
      quote: body.quote,
      rating,
      published: body.published ?? true,
      order: count,
    },
  });

  return NextResponse.json(testimonial, { status: 201 });
}
