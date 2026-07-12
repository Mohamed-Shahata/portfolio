"use client";

import {
  Boxes,
  Users,
  ShoppingCart,
  Package,
  UserCog,
  LayoutDashboard,
  Cloud,
  CalendarCheck,
  Store,
  MonitorSmartphone,
  Plug,
  ShieldCheck,
  CreditCard,
  BarChart3,
  Sparkles,
} from "lucide-react";
import { SectionTitle } from "@/components/ui/section-title";
import { AnimatedCard } from "@/components/ui/animated-card";
import { useLocale } from "@/lib/i18n/locale-context";

const ICONS = [
  Boxes,
  Users,
  ShoppingCart,
  Package,
  UserCog,
  LayoutDashboard,
  Cloud,
  CalendarCheck,
  Store,
  MonitorSmartphone,
  Plug,
  ShieldCheck,
  CreditCard,
  BarChart3,
  Sparkles,
];

export function WhatIBuild() {
  const { t } = useLocale();
  const items = t.whatIBuild.items;

  return (
    <section id="what-i-build" className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          eyebrow={t.whatIBuild.eyebrow}
          title={t.whatIBuild.title}
          description={t.whatIBuild.description}
        />

        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => {
            const Icon = ICONS[i];
            return (
              <AnimatedCard key={item.title} delay={(i % 3) * 0.05}>
                <div className="flex size-11 items-center justify-center rounded-xl bg-accent-soft text-accent transition-transform duration-300 group-hover:scale-110">
                  <Icon className="size-5" />
                </div>
                <h3 className="mt-4 text-base font-medium text-foreground">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-sm text-muted leading-relaxed">
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
