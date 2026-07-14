import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const body = (await request.json()) as { email?: string };
  const email = body.email?.trim().toLowerCase();

  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Enter a valid email" }, { status: 400 });
  }

  const existing = await prisma.newsletterSubscriber.findUnique({ where: { email } });
  if (existing) {
    // Treat re-submission as success — no need to leak whether they're already subscribed.
    return NextResponse.json({ ok: true });
  }

  await prisma.newsletterSubscriber.create({ data: { email } });
  return NextResponse.json({ ok: true }, { status: 201 });
}
