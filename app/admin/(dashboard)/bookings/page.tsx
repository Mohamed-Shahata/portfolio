import { prisma } from "@/lib/db";
import { BookingsTable } from "@/components/admin/bookings-table";

export default async function AdminBookingsPage() {
  const bookings = await prisma.booking.findMany({
    orderBy: { startTime: "desc" },
  });
  const activeCount = bookings.filter((b) => b.status === "active").length;

  return (
    <div>
      <h1 className="text-xl font-semibold text-foreground">Bookings</h1>
      <p className="mt-1 text-sm text-muted">
        {bookings.length} call{bookings.length === 1 ? "" : "s"}
        {activeCount > 0 && ` · ${activeCount} active`}
      </p>

      <BookingsTable
        initialBookings={bookings.map((b) => ({
          ...b,
          startTime: b.startTime.toISOString(),
          endTime: b.endTime.toISOString(),
          createdAt: b.createdAt.toISOString(),
        }))}
      />
    </div>
  );
}
