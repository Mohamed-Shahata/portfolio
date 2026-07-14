import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [count, latest] = await Promise.all([
    prisma.booking.count({ where: { seen: false } }),
    prisma.booking.findFirst({
      where: { seen: false },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        inviteeName: true,
        eventName: true,
        startTime: true,
        createdAt: true,
      },
    }),
  ]);

  return NextResponse.json({ count, latest });
}

export async function POST() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await prisma.booking.updateMany({
    where: { seen: false },
    data: { seen: true },
  });

  return NextResponse.json({ ok: true });
}
