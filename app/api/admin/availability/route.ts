import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export interface AvailabilityInput {
  status: "available" | "busy" | "available_after";
  availableFrom: string | null;
}

export async function GET() {
  const availability = await prisma.availabilityStatus.findUnique({
    where: { id: "singleton" },
  });
  return NextResponse.json(availability);
}

export async function PATCH(request: Request) {
  const body = (await request.json()) as Partial<AvailabilityInput>;

  const availability = await prisma.availabilityStatus.upsert({
    where: { id: "singleton" },
    create: {
      id: "singleton",
      status: body.status ?? "available",
      availableFrom: body.availableFrom ? new Date(body.availableFrom) : null,
    },
    update: {
      ...(body.status !== undefined && { status: body.status }),
      ...(body.availableFrom !== undefined && {
        availableFrom: body.availableFrom ? new Date(body.availableFrom) : null,
      }),
    },
  });

  return NextResponse.json(availability);
}
