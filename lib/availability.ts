import { prisma } from "@/lib/db";

export type EffectiveAvailability =
  | { status: "available" }
  | { status: "busy" }
  | { status: "available_after"; availableFrom: string };

/** Resolves the raw DB row into what the navbar should actually show —
 *  an "available after X" row auto-flips to plain "available" once the date passes. */
export async function getAvailabilityStatus(): Promise<EffectiveAvailability> {
  const row = await prisma.availabilityStatus.findUnique({
    where: { id: "singleton" },
  });
  if (!row) return { status: "available" };

  if (row.status === "available_after" && row.availableFrom) {
    if (row.availableFrom.getTime() <= Date.now()) {
      return { status: "available" };
    }
    return {
      status: "available_after",
      availableFrom: row.availableFrom.toISOString(),
    };
  }

  return row.status === "busy" ? { status: "busy" } : { status: "available" };
}
