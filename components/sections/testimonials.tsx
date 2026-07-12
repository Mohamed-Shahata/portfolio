"use client";

import { Quote } from "lucide-react";
import { SectionTitle } from "@/components/ui/section-title";
import { AnimatedCard } from "@/components/ui/animated-card";

const TESTIMONIALS = [
  {
    quote: "The system replaced three separate spreadsheets and cut our order processing time significantly. Communication was clear throughout.",
    name: "Client Name",
    role: "Operations Manager, Retail Business",
  },
  {
    quote: "We needed something that worked offline at our branches. It was delivered exactly as scoped, with solid documentation.",
    name: "Client Name",
    role: "Founder, Restaurant Chain",
  },
  {
    quote: "Clean handoff, responsive during support weeks, and the codebase was easy for our internal team to pick up afterward.",
    name: "Client Name",
    role: "CTO, SaaS Startup",
  },
];

export function Testimonials() {
  return (
    <section className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          eyebrow="Testimonials"
          title="What clients say"
          description="Placeholder testimonials — structured and ready for real client feedback."
        />

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <AnimatedCard key={i} delay={i * 0.08} className="flex flex-col">
              <Quote className="size-6 text-accent/60" />
              <p className="mt-4 flex-1 text-sm text-muted leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-6 flex items-center gap-3 border-t border-border pt-4">
                <div className="flex size-9 items-center justify-center rounded-full bg-accent-soft text-xs font-medium text-accent">
                  {t.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  );
}
