import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { prisma } from "@/lib/db";

// Calendly signs every webhook request with a shared secret set when the
// webhook subscription is created. Verifying it stops randoms from posting
// fake bookings into our DB.
// Docs: https://developer.calendly.com/api-docs/webhook-signatures
function verifySignature(rawBody: string, header: string | null, secret: string) {
  if (!header) return false;

  // Header looks like: t=1700000000,v1=<hmac hex>
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
      return NextResponse.json({ error: "invalid signature" }, { status: 401 });
    }
  }

  const payload = JSON.parse(rawBody) as {
    event: string;
    payload: {
      uri: string;
      name: string;
      start_time: string;
      end_time: string;
      event_type?: { name?: string };
      invitees_counter?: unknown;
      email?: string; // present on invitee.* events
    };
  };

  // invitee.created / invitee.canceled are the two events we subscribe to.
  if (payload.event === "invitee.created") {
    const p = payload.payload as unknown as {
      event: { uri: string; name?: string; start_time: string; end_time: string };
      name: string;
      email: string;
    };

    await prisma.booking.upsert({
      where: { calendlyUri: p.event.uri },
      create: {
        calendlyUri: p.event.uri,
        inviteeName: p.name,
        inviteeEmail: p.email,
        eventName: p.event.name ?? "Call",
        startTime: new Date(p.event.start_time),
        endTime: new Date(p.event.end_time),
        status: "active",
      },
      update: {
        status: "active",
      },
    });
  }

  if (payload.event === "invitee.canceled") {
    const p = payload.payload as unknown as { event: { uri: string } };
    await prisma.booking
      .update({
        where: { calendlyUri: p.event.uri },
        data: { status: "canceled" },
      })
      .catch(() => {
        // Booking may not exist yet if canceled before we ever recorded it — ignore.
      });
  }

  return NextResponse.json({ ok: true });
}
