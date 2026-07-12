"use client";

import { StatsCounter } from "@/components/ui/stats-counter";
import { useLocale } from "@/lib/i18n/locale-context";

const VALUES = [
  { value: 6, suffix: "+" },
  { value: 2, suffix: "+" },
  { value: 4, suffix: "+" },
  { value: 15, suffix: "+" },
  { value: 100, suffix: "+" },
];

export function Statistics() {
  const { t } = useLocale();

  return (
    <section className="relative border-y border-border bg-background-elevated px-6 py-16">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
        {t.statistics.items.map((stat, i) => (
          <StatsCounter
            key={stat.label}
            value={VALUES[i].value}
            suffix={VALUES[i].suffix}
            label={stat.label}
          />
        ))}
      </div>
    </section>
  );
}
