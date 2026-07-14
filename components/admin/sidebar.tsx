"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutGrid,
  Newspaper,
  UserCircle,
  Mail,
  Quote,
  LogOut,
  ExternalLink,
  BarChart3,
  Radio,
  Users,
  CalendarCheck,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/admin/projects", label: "Projects", icon: LayoutGrid },
  { href: "/admin/blog", label: "Blog", icon: Newspaper },
  { href: "/admin/about", label: "About Page", icon: UserCircle },
  { href: "/admin/testimonials", label: "Testimonials", icon: Quote },
  { href: "/admin/availability", label: "Availability", icon: Radio },
  { href: "/admin/bookings", label: "Bookings", icon: CalendarCheck },
  { href: "/admin/newsletter", label: "Newsletter", icon: Users },
  { href: "/admin/messages", label: "Messages", icon: Mail },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
];

export function AdminSidebar({
  email,
  isOpen = false,
  onClose,
}: {
  email: string;
  isOpen?: boolean;
  onClose?: () => void;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex h-screen w-60 shrink-0 flex-col border-r border-border bg-background-elevated transition-transform duration-200 md:sticky md:top-0 md:z-auto md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between px-5 py-6">
          <div>
            <span className="text-sm font-semibold tracking-tight">
              Mohamed <span className="gradient-text">Shehata</span>
            </span>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Admin Dashboard
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="text-muted hover:text-foreground md:hidden"
          >
            <X className="size-5" />
          </button>
        </div>

        <nav className="flex-1 px-3">
          <ul className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors",
                      active
                        ? "bg-accent-soft text-accent"
                        : "text-muted hover:bg-surface-hover hover:text-foreground",
                    )}
                  >
                    <item.icon className="size-4" />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="border-t border-border px-3 py-4">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:bg-surface-hover hover:text-foreground"
          >
            <ExternalLink className="size-4" />
            View Site
          </Link>
          <div className="mt-2 flex items-center justify-between rounded-lg px-3 py-2">
            <span className="truncate text-xs text-muted-foreground">
              {email}
            </span>
            <button
              onClick={handleLogout}
              aria-label="Log out"
              className="text-muted transition-colors hover:text-destructive"
            >
              <LogOut className="size-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
