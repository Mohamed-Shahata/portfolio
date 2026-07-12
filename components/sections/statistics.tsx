"use client";

import { StatsCounter } from "@/components/ui/stats-counter";

const STATS = [
  { value: 25, suffix: "+", label: "Projects Completed" },
  { value: 4, suffix: "+", label: "Years Learning" },
  { value: 30, suffix: "+", label: "Technologies Used" },
  { value: 15, suffix: "+", label: "Systems Built" },
  { value: 40, suffix: "+", label: "GitHub Repositories" },
];

export function Statistics() {
  return (
    <section className="relative border-y border-border bg-background-elevated px-6 py-16">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
        {STATS.map((stat) => (
          <StatsCounter
            key={stat.label}
            value={stat.value}
            suffix={stat.suffix}
            label={stat.label}
          />
        ))}
      </div>
    </section>
  );
}
