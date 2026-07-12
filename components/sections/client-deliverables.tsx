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
import { useLocale } from "@/lib/i18n/locale-context";

const ICONS = [
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
];

export function ClientDeliverables() {
  const { t } = useLocale();
  const items = t.clientDeliverables.items;

  return (
    <section className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          eyebrow={t.clientDeliverables.eyebrow}
          title={t.clientDeliverables.title}
          description={t.clientDeliverables.description}
        />

        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {items.map((item, i) => {
            const Icon = ICONS[i];
            return (
              <AnimatedCard key={item.title} delay={(i % 5) * 0.04}>
                <div className="flex size-10 items-center justify-center rounded-lg bg-accent-soft text-accent">
                  <Icon className="size-4.5" />
                </div>
                <h3 className="mt-4 text-sm font-medium text-foreground">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-xs text-muted leading-relaxed">
                  {item.desc}
                </p>
              </AnimatedCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
