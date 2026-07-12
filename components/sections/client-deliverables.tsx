"use client";

import {
  FileCode2,
  BookOpen,
  Database,
  FileJson,
  Rocket,
  ListChecks,
  Wrench,
  CalendarClock,
  GraduationCap,
  Bug,
} from "lucide-react";
import { SectionTitle } from "@/components/ui/section-title";
import { AnimatedCard } from "@/components/ui/animated-card";

const DELIVERABLES = [
  { icon: FileCode2, title: "Source Code", desc: "Full, clean codebase — yours to keep and extend." },
  { icon: BookOpen, title: "Documentation", desc: "Clear technical documentation for every module." },
  { icon: Database, title: "Database Design", desc: "ERD and schema documentation included." },
  { icon: FileJson, title: "API Documentation", desc: "Endpoints, payloads, and auth documented." },
  { icon: Rocket, title: "Deployment", desc: "Your system deployed and running in production." },
  { icon: ListChecks, title: "Installation Guide", desc: "Step-by-step setup for local or server environments." },
  { icon: Wrench, title: "Maintenance Guide", desc: "How to keep the system healthy long-term." },
  { icon: CalendarClock, title: "30 Days Support", desc: "Post-launch support included, no extra charge." },
  { icon: GraduationCap, title: "Training Session", desc: "A walkthrough session for you or your team." },
  { icon: Bug, title: "Bug Fixes", desc: "Any issues found post-launch get fixed promptly." },
];

export function ClientDeliverables() {
  return (
    <section className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          eyebrow="What You'll Receive"
          title="Everything you need to own your system"
          description="No black boxes. You get full ownership, documentation, and support after launch."
        />

        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {DELIVERABLES.map((item, i) => (
            <AnimatedCard key={item.title} delay={(i % 5) * 0.04}>
              <div className="flex size-10 items-center justify-center rounded-lg bg-accent-soft text-accent">
                <item.icon className="size-4.5" />
              </div>
              <h3 className="mt-4 text-sm font-medium text-foreground">
                {item.title}
              </h3>
              <p className="mt-1.5 text-xs text-muted leading-relaxed">
                {item.desc}
              </p>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  );
}
