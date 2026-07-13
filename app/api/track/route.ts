import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { prisma } from "@/lib/db";

const VISITOR_COOKIE = "vid";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as { path?: string };
  const path = typeof body.path === "string" ? body.path.slice(0, 300) : "/";

  let visitorId = request.headers
    .get("cookie")
    ?.split("; ")
    .find((c) => c.startsWith(`${VISITOR_COOKIE}=`))
    ?.split("=")[1];

  const isNewVisitor = !visitorId;
  if (!visitorId) visitorId = crypto.randomUUID();

  await prisma.pageView.create({ data: { path, visitorId } });

  const res = NextResponse.json({ ok: true });
  if (isNewVisitor) {
    res.cookies.set(VISITOR_COOKIE, visitorId, {
      maxAge: 60 * 60 * 24 * 365,
      httpOnly: true,
      sameSite: "lax",
    });
  }
  return res;
}
