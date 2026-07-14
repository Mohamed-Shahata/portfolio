"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { LocaleToggle } from "@/components/ui/locale-toggle";
import { cn } from "@/lib/utils";
import { useLocale } from "@/lib/i18n/locale-context";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [availability, setAvailability] = useState<{
    status: "available" | "busy" | "available_after";
    availableFrom?: string;
  } | null>(null);
  const { t } = useLocale();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const toHash = (hash: string) => (isHome ? hash : `/${hash}`);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    fetch("/api/availability")
      .then((res) => (res.ok ? res.json() : null))
      .then(setAvailability)
      .catch(() => setAvailability(null));
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        scrolled ? "glass border-b border-border" : "bg-transparent",
      )}
    >
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6"
      >
        <Link href="/" className="text-sm font-semibold tracking-tight">
          Mohamed<span className="gradient-text"> Shehata</span>
        </Link>

        {availability && (
          <span
            className="flex items-center gap-1.5 rounded-full border border-border bg-surface px-2 py-1 text-xs text-muted sm:px-3"
            title={
              availability.status === "busy"
                ? t.availability.busy
                : availability.status === "available_after" &&
                    availability.availableFrom
                  ? t.availability.availableFrom.replace(
                      "{date}",
                      new Date(availability.availableFrom).toLocaleDateString(),
                    )
                  : t.availability.available
            }
          >
            <span
              className={cn(
                "size-1.5 shrink-0 rounded-full",
                availability.status === "busy"
                  ? "bg-destructive"
                  : availability.status === "available_after"
                    ? "bg-accent"
                    : "bg-success",
              )}
            />
            <span className="hidden sm:inline">
              {availability.status === "busy"
                ? t.availability.busy
                : availability.status === "available_after" &&
                    availability.availableFrom
                  ? t.availability.availableFrom.replace(
                      "{date}",
                      new Date(availability.availableFrom).toLocaleDateString(),
                    )
                  : t.availability.available}
            </span>
          </span>
        )}

        <ul className="hidden items-center gap-8 md:flex">
          {t.nav.links.map((link) => (
            <li key={link.href}>
              <Link
                href={toHash(link.href)}
                className="text-sm text-muted transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            </li>
          ))}
          {t.nav.pages.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm text-muted transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <LocaleToggle />
          <Link
            href={toHash("#contact")}
            className={buttonVariants({ variant: "gradient", size: "sm" })}
          >
            {t.nav.contact}
          </Link>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <LocaleToggle />
          <button
            className="text-foreground"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden glass border-t border-border md:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 py-4">
              {t.nav.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={toHash(link.href)}
                    onClick={() => setOpen(false)}
                    className="block py-2 text-sm text-muted transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              {t.nav.pages.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block py-2 text-sm text-muted transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link
                  href={toHash("#contact")}
                  onClick={() => setOpen(false)}
                  className="inline-flex h-10 w-full items-center justify-center rounded-full bg-linear-to-r from-accent to-accent-2 text-sm font-medium text-white"
                >
                  {t.nav.contact}
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
