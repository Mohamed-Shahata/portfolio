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

const CATEGORIES = [
  { icon: Layout, title: "Frontend", items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "shadcn/ui"] },
  { icon: Server, title: "Backend", items: ["NestJS", "Node.js", "Express", "REST APIs", "WebSockets"] },
  { icon: Database, title: "Database", items: ["PostgreSQL", "Prisma ORM", "Redis", "MySQL"] },
  { icon: KeyRound, title: "Authentication", items: ["JWT", "OAuth 2.0", "RBAC", "httpOnly Cookies"] },
  { icon: Cloud, title: "Cloud", items: ["AWS EC2", "Vercel", "S3", "Cloudinary"] },
  { icon: Container, title: "DevOps", items: ["Docker", "PM2", "GitHub Actions", "CI/CD"] },
  { icon: MonitorSmartphone, title: "Desktop", items: ["Electron", "Tauri", "Offline-first"] },
  { icon: ShieldCheck, title: "Security", items: ["Rate Limiting", "Input Validation", "Audit Logging"] },
  { icon: TestTube2, title: "Testing", items: ["Jest", "Postman", "E2E Testing"] },
];

export function TechStack() {
  return (
    <section id="tech-stack" className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          eyebrow="Technology Stack"
          title="Modern tools, used deliberately"
          description="Every technology is chosen for reliability and long-term maintainability, not hype."
        />

        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((cat, i) => (
            <AnimatedCard key={cat.title} delay={(i % 3) * 0.05}>
              <div className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-lg bg-accent-soft text-accent">
                  <cat.icon className="size-4.5" />
                </div>
                <h3 className="text-sm font-medium text-foreground">
                  {cat.title}
                </h3>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <TechBadge key={item} label={item} />
                ))}
              </div>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  );
}
