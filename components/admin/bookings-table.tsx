"use client";

import { useState } from "react";
import { Trash2, Loader2, CalendarCheck, CalendarX } from "lucide-react";

interface BookingRow {
  id: string;
  inviteeName: string;
  inviteeEmail: string;
  eventName: string;
  message?: string | null;
  startTime: string;
  endTime: string;
  status: string;
  createdAt: string;
  isNew?: boolean;
}

export function BookingsTable({
  initialBookings,
}: {
  initialBookings: BookingRow[];
}) {
  const [bookings, setBookings] = useState(initialBookings);
  const [busyId, setBusyId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this booking record? This can't be undone.")) return;
    setBusyId(id);
    const res = await fetch(`/api/admin/bookings/${id}`, { method: "DELETE" });
    if (res.ok) {
      setBookings((prev) => prev.filter((b) => b.id !== id));
    }
    setBusyId(null);
  };

  if (bookings.length === 0) {
    return (
      <div className="mt-8 rounded-2xl border border-border bg-surface px-6 py-16 text-center text-sm text-muted">
        No bookings yet. They&apos;ll show up here automatically once someone
        books a call through the site.
      </div>
    );
  }

  return (
    <div className="mt-6 flex flex-col gap-3">
      {bookings.map((b) => {
        const canceled = b.status === "canceled";
        return (
          <div
            key={b.id}
            className={`rounded-2xl border p-4 ${
              canceled
                ? "border-border bg-background-elevated opacity-60"
                : "border-accent/40 bg-accent-soft/40"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  {canceled ? (
                    <CalendarX className="size-4 text-muted-foreground" />
                  ) : (
                    <CalendarCheck className="size-4 text-accent" />
                  )}
                  <p className="font-medium text-foreground">{b.eventName}</p>
                  {canceled && (
                    <span className="rounded-full bg-surface px-2 py-0.5 text-[10px] uppercase tracking-wide text-muted-foreground">
                      Canceled
                    </span>
                  )}
                  {b.isNew && !canceled && (
                    <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-white">
                      New
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-muted">
                  {b.inviteeName} ·{" "}
                  <a
                    href={`mailto:${b.inviteeEmail}`}
                    className="hover:text-accent"
                  >
                    {b.inviteeEmail}
                  </a>
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  {new Date(b.startTime).toLocaleString()} —{" "}
                  {new Date(b.endTime).toLocaleTimeString()}
                </p>
                {b.message && (
                  <p className="mt-2 text-sm text-muted">{b.message}</p>
                )}
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <button
                  onClick={() => handleDelete(b.id)}
                  disabled={busyId === b.id}
                  className="text-muted-foreground transition-colors hover:text-destructive"
                  aria-label="Delete"
                >
                  {busyId === b.id ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <Trash2 className="size-4" />
                  )}
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
