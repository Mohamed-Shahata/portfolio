import { prisma } from "@/lib/db";
import { AvailabilityForm } from "@/components/admin/availability-form";

export default async function AdminAvailabilityPage() {
  const row = await prisma.availabilityStatus.findUnique({
    where: { id: "singleton" },
  });

  return (
    <div>
      <h1 className="text-xl font-semibold text-foreground">Availability</h1>
      <p className="mt-1 text-sm text-muted">
        Controls the status badge shown in the site navbar.
      </p>

      <AvailabilityForm
        initial={{
          status: (row?.status as "available" | "busy" | "available_after") ?? "available",
          availableFrom: row?.availableFrom?.toISOString() ?? null,
        }}
      />
    </div>
  );
}
