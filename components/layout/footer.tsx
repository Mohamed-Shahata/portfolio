"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  ArrowUp,
  Code2,
  Briefcase,
  Mail,
  PlaySquare,
  Music2,
} from "lucide-react";
import { useLocale } from "@/lib/i18n/locale-context";

const SOCIALS = [
  { key: "GitHub", href: "https://github.com/Mohamed-Shahata", icon: Code2 },
  {
    key: "LinkedIn",
    href: "https://linkedin.com/in/mohamed-shahata-895708261",
    icon: Briefcase,
  },
  { key: "Email", href: "mailto:mohamedmrslan@gmail.com", icon: Mail },
  {
    key: "YouTube",
    href: "https://www.youtube.com/channel/UCUoQyWlxfL2y_8A_LQIH8tw",
    icon: PlaySquare,
  },
  {
    key: "TikTok",
    href: "https://www.tiktok.com/@devcore1?_t=ZS-8wOd7y5mkmW&_r=1",
    icon: Music2,
  },
];

export function Footer() {
  const { t } = useLocale();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const toHash = (hash: string) => (isHome ? hash : `/${hash}`);

  return (
    <footer
      aria-label="Site footer"
      className="relative border-t border-border bg-background-elevated"
    >
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="max-w-xs">
            <span className="text-sm font-semibold tracking-tight">
              Dev<span className="gradient-text">Core</span>
            </span>
            <p className="mt-3 text-sm text-muted leading-relaxed">
              {t.footer.tagline}
            </p>
          </div>

          <div className="flex gap-16">
            <div>
              <h4 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {t.footer.quickLinks}
              </h4>
              <ul className="mt-4 flex flex-col gap-2.5">
                {t.nav.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={toHash(l.href)}
                      className="text-sm text-muted transition-colors hover:text-foreground"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {t.footer.connect}
              </h4>
              <ul className="mt-4 flex flex-col gap-2.5">
                {SOCIALS.map((s) => (
                  <li key={s.key}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
                    >
                      <s.icon className="size-4" />
                      {s.key}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col-reverse items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Mohamed Shehata. {t.footer.rights}
          </p>
          <Link
            href={isHome ? "#" : "/"}
            className="inline-flex items-center gap-1.5 text-xs text-muted transition-colors hover:text-foreground"
          >
            {t.footer.backToTop}
            <ArrowUp className="size-3.5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
