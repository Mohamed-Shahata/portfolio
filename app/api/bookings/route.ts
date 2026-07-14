import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

interface BookingInput {
  name: string;
  email: string;
  eventName: string;
  message?: string;
  startTime: string;
  durationMinutes?: number;
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as BookingInput | null;

  if (!body) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 },
    );
  }

  const name = body.name?.trim();
  const email = body.email?.trim();
  const eventName = body.eventName?.trim();
  const message = body.message?.trim() || null;
  const startTime = body.startTime ? new Date(body.startTime) : null;
  const durationMinutes = body.durationMinutes ?? 30;

  if (
    !name ||
    !email ||
    !eventName ||
    !startTime ||
    Number.isNaN(startTime.getTime())
  ) {
    return NextResponse.json(
      { error: "Missing or invalid fields" },
      { status: 400 },
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  if (startTime.getTime() < Date.now()) {
    return NextResponse.json(
      { error: "Start time must be in the future" },
      { status: 400 },
    );
  }

  const endTime = new Date(startTime.getTime() + durationMinutes * 60_000);

  const booking = await prisma.booking.create({
    data: {
      inviteeName: name,
      inviteeEmail: email,
      eventName,
      message,
      startTime,
      endTime,
      status: "active",
      seen: false,
    },
  });

  return NextResponse.json({ ok: true, booking }, { status: 201 });
}
