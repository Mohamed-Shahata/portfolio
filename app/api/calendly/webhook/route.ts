import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { prisma } from "@/lib/db";

// Calendly signs every webhook request with a shared secret set when the
// webhook subscription is created.
function verifySignature(
  rawBody: string,
  header: string | null,
  secret: string,
) {
  if (!header) return false;

  const parts = Object.fromEntries(
    header.split(",").map((p) => p.split("=") as [string, string]),
  );

  const timestamp = parts.t;
  const signature = parts.v1;

  if (!timestamp || !signature) return false;

  const expected = crypto
    .createHmac("sha256", secret)
    .update(`${timestamp}.${rawBody}`)
    .digest("hex");

  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
}

export async function POST(request: Request) {
  const secret = process.env.CALENDLY_WEBHOOK_SECRET;
  const rawBody = await request.text();

  if (secret) {
    const header = request.headers.get("calendly-webhook-signature");

    if (!verifySignature(rawBody, header, secret)) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }
  }

  const body = JSON.parse(rawBody);

  if (body.event === "invitee.created") {
    const p = body.payload;

    await prisma.booking.upsert({
      where: {
        calendlyEventUri: p.event.uri,
      },
      create: {
        calendlyEventUri: p.event.uri,
        inviteeName: p.name,
        inviteeEmail: p.email,
        eventName: p.event.name ?? p.scheduled_event?.name ?? "Call",
        startTime: new Date(p.event.start_time),
        endTime: new Date(p.event.end_time),
        status: "active",
      },
      update: {
        status: "active",
      },
    });
  } else if (body.event === "invitee.canceled") {
    const p = body.payload;

    await prisma.booking
      .update({
        where: {
          calendlyEventUri: p.event.uri,
        },
        data: {
          status: "canceled",
        },
      })
      .catch(() => {
        // Ignore if the booking does not exist.
      });
  }

  return NextResponse.json({ ok: true });
}
