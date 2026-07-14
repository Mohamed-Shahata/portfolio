import { NextResponse } from "next/server";
import { getAvailabilityStatus } from "@/lib/availability";

export async function GET() {
  const availability = await getAvailabilityStatus();
  return NextResponse.json(availability);
}
