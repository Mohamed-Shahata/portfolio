"use client";

import { ArrowUp, Code2, Briefcase, Mail } from "lucide-react";

const QUICK_LINKS = [
  { label: "Work", href: "#what-i-build" },
  { label: "Process", href: "#process" },
  { label: "Projects", href: "#projects" },
  { label: "FAQ", href: "#faq" },
];

const SOCIALS = [
  { label: "GitHub", href: "https://github.com", icon: Code2 },
  { label: "LinkedIn", href: "https://linkedin.com", icon: Briefcase },
  { label: "Email", href: "mailto:hello@devcore.dev", icon: Mail },
];

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-background-elevated">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="max-w-xs">
            <span className="text-sm font-semibold tracking-tight">
              Dev<span className="gradient-text">Core</span>
            </span>
            <p className="mt-3 text-sm text-muted leading-relaxed">
              Building fast, secure & scalable business systems for companies
              that need software they can trust.
            </p>
          </div>

          <div className="flex gap-16">
            <div>
              <h4 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Quick Links
              </h4>
              <ul className="mt-4 flex flex-col gap-2.5">
                {QUICK_LINKS.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className="text-sm text-muted transition-colors hover:text-foreground"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Connect
              </h4>
              <ul className="mt-4 flex flex-col gap-2.5">
                {SOCIALS.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
                    >
                      <s.icon className="size-4" />
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col-reverse items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Dev Core. All rights reserved.
          </p>
          <a
            href="#"
            className="inline-flex items-center gap-1.5 text-xs text-muted transition-colors hover:text-foreground"
          >
            Back to top
            <ArrowUp className="size-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
