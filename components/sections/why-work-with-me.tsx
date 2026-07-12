"use client";

import {
  Lock,
  Layers,
  Smartphone,
  Zap,
  Code2,
  Wrench,
  Plug2,
  WifiOff,
  FileText,
  Rocket,
  Cpu,
  Infinity as InfinityIcon,
} from "lucide-react";
import { SectionTitle } from "@/components/ui/section-title";
import { AnimatedCard } from "@/components/ui/animated-card";
import { useLocale } from "@/lib/i18n/locale-context";

const ICONS = [
  Lock,
  Layers,
  Smartphone,
  Zap,
  Code2,
  Wrench,
  Plug2,
  WifiOff,
  FileText,
  Rocket,
  Cpu,
  InfinityIcon,
];

export function WhyWorkWithMe() {
  const { t } = useLocale();
  const items = t.whyWorkWithMe.items;

  return (
    <section className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          eyebrow={t.whyWorkWithMe.eyebrow}
          title={t.whyWorkWithMe.title}
          description={t.whyWorkWithMe.description}
        />

        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((f, i) => {
            const Icon = ICONS[i];
            return (
              <AnimatedCard
                key={f.title}
                delay={(i % 4) * 0.05}
                className="text-center items-center flex flex-col"
              >
                <div className="flex size-11 items-center justify-center rounded-xl bg-accent-soft text-accent">
                  <Icon className="size-5" />
                </div>
                <h3 className="mt-4 text-sm font-medium text-foreground">
                  {f.title}
                </h3>
                <p className="mt-1.5 text-xs text-muted leading-relaxed">
                  {f.desc}
                </p>
              </AnimatedCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
