"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { AdminSidebar } from "@/components/admin/sidebar";
import { BookingNotifications } from "@/components/admin/booking-notifications";

export function AdminShell({
  email,
  children,
}: {
  email: string;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar
        email={email}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />

      <div className="flex min-h-screen w-full flex-1 flex-col">
        <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-border bg-background-elevated px-4 py-3 md:justify-end md:px-8">
          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={() => setIsOpen(true)}
              aria-label="Open menu"
              className="text-muted hover:text-foreground"
            >
              <Menu className="size-5" />
            </button>
            <span className="text-sm font-semibold tracking-tight">
              Mohamed <span className="gradient-text">Shehata</span>
            </span>
          </div>

          <BookingNotifications />
        </header>

        <main className="flex-1 overflow-y-auto px-4 py-6 md:px-8 md:py-8">
          {children}
        </main>
      </div>
    </div>
  );
}
