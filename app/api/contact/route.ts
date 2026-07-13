import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  const body = (await request.json()) as { name?: string; email?: string; message?: string };

  if (!body.name || !body.email || !body.message) {
    return NextResponse.json(
      { error: "name, email, and message are required" },
      { status: 400 },
    );
  }

  await prisma.contactMessage.create({
    data: { name: body.name, email: body.email, message: body.message },
  });

  return NextResponse.json({ ok: true }, { status: 201 });
}
