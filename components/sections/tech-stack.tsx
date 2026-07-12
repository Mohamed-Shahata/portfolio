"use client";

import {
  Layout,
  Server,
  Database,
  KeyRound,
  Cloud,
  Container,
  MonitorSmartphone,
  ShieldCheck,
  TestTube2,
} from "lucide-react";
import { SectionTitle } from "@/components/ui/section-title";
import { AnimatedCard } from "@/components/ui/animated-card";
import { TechBadge } from "@/components/ui/tech-badge";
import { useLocale } from "@/lib/i18n/locale-context";

const ICONS = [
  Layout,
  Server,
  Database,
  KeyRound,
  Cloud,
  Container,
  MonitorSmartphone,
  ShieldCheck,
  TestTube2,
];
const ITEMS_BY_CATEGORY = [
  ["Next.js", "React", "TypeScript", "Tailwind CSS", "shadcn/ui"],
  ["NestJS", "Node.js", "Express", "REST APIs", "WebSockets"],
  ["PostgreSQL", "MongoDB", "Prisma ORM", "Redis"],
  ["JWT", "OAuth 2.0", "RBAC", "httpOnly Cookies"],
  ["AWS EC2", "Vercel", "S3", "Cloudinary"],
  ["Docker", "PM2", "GitHub Actions", "CI/CD"],
  ["Electron", "Tauri", "Offline-first"],
  ["Rate Limiting", "Input Validation", "Audit Logging"],
  ["Jest", "Postman", "E2E Testing"],
];

export function TechStack() {
  const { t } = useLocale();

  return (
    <section id="tech-stack" className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          eyebrow={t.techStack.eyebrow}
          title={t.techStack.title}
          description={t.techStack.description}
        />

        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {t.techStack.categories.map((title, i) => {
            const Icon = ICONS[i];
            return (
              <AnimatedCard key={title} delay={(i % 3) * 0.05}>
                <div className="flex items-center gap-2.5">
                  <div className="flex size-9 items-center justify-center rounded-lg bg-accent-soft text-accent">
                    <Icon className="size-4" />
                  </div>
                  <h3 className="text-sm font-medium text-foreground">
                    {title}
                  </h3>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {ITEMS_BY_CATEGORY[i].map((item) => (
                    <TechBadge key={item} label={item} />
                  ))}
                </div>
              </AnimatedCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
