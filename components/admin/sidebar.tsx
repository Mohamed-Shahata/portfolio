"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutGrid,
  Newspaper,
  UserCircle,
  Mail,
  LogOut,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/admin/projects", label: "Projects", icon: LayoutGrid },
  { href: "/admin/blog", label: "Blog", icon: Newspaper },
  { href: "/admin/about", label: "About Page", icon: UserCircle },
  { href: "/admin/messages", label: "Messages", icon: Mail },
];

export function AdminSidebar({ email }: { email: string }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <aside className="flex h-screen w-60 shrink-0 flex-col border-r border-border bg-background-elevated">
      <div className="px-5 py-6">
        <span className="text-sm font-semibold tracking-tight">
          Dev<span className="gradient-text">Core</span>
        </span>
        <p className="mt-0.5 text-xs text-muted-foreground">Admin Dashboard</p>
      </div>

      <nav className="flex-1 px-3">
        <ul className="flex flex-col gap-1">
          {NAV_ITEMS.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
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
          <span className="truncate text-xs text-muted-foreground">{email}</span>
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
  );
}
