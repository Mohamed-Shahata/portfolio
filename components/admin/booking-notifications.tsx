"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Bell, CalendarCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface UnseenResponse {
  count: number;
  latest: {
    id: string;
    inviteeName: string;
    eventName: string;
    startTime: string;
    createdAt: string;
  } | null;
}

const POLL_INTERVAL_MS = 15_000;

export function BookingNotifications() {
  const router = useRouter();
  const [data, setData] = useState<UnseenResponse | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const fetchUnseen = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/bookings/unseen", {
        cache: "no-store",
      });
      if (res.ok) {
        setData(await res.json());
      }
    } catch {
      // Ignore transient network errors — next poll will retry.
    }
  }, []);

  useEffect(() => {
    fetchUnseen();
    const interval = setInterval(fetchUnseen, POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [fetchUnseen]);

  const handleOpenBookings = async () => {
    setIsOpen(false);
    router.push("/admin/bookings");
    await fetch("/api/admin/bookings/unseen", { method: "POST" });
    fetchUnseen();
  };

  const count = data?.count ?? 0;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen((v) => !v)}
        aria-label="Booking notifications"
        className="relative flex size-9 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface-hover hover:text-foreground"
      >
        <Bell className="size-4" />
        {count > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full bg-accent text-[10px] font-medium text-white">
            {count > 9 ? "9+" : count}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 z-50 mt-2 w-72 rounded-xl border border-border bg-background-elevated p-3 shadow-xl">
            {count === 0 ? (
              <p className="px-2 py-4 text-center text-sm text-muted">
                No new bookings.
              </p>
            ) : (
              <>
                <div className="flex items-center gap-2 rounded-lg bg-accent-soft px-3 py-2.5">
                  <CalendarCheck className="size-4 shrink-0 text-accent" />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">
                      {data?.latest?.inviteeName} — {data?.latest?.eventName}
                    </p>
                    {data?.latest?.startTime && (
                      <p className="text-xs text-muted-foreground">
                        {new Date(data.latest.startTime).toLocaleString()}
                      </p>
                    )}
                  </div>
                </div>
                <p
                  className={cn(
                    "mt-2 px-2 text-xs text-muted-foreground",
                    count === 1 && "sr-only",
                  )}
                >
                  {count > 1 ? `+${count - 1} more new booking(s)` : ""}
                </p>
                <button
                  onClick={handleOpenBookings}
                  className="mt-2 w-full rounded-lg bg-accent-soft px-3 py-2 text-center text-sm font-medium text-accent transition-colors hover:opacity-90"
                >
                  View bookings
                </button>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
