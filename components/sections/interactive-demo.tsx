"use client";

import { ExternalLink } from "lucide-react";
import { SectionTitle } from "@/components/ui/section-title";
import { AnimatedCard } from "@/components/ui/animated-card";
import { buttonVariants } from "@/components/ui/button";

const DEMOS = [
  { title: "ERP Demo", desc: "Purchasing, sales, and inventory in one workspace.", href: "#" },
  { title: "CRM Demo", desc: "Pipeline, leads, and customer activity tracking.", href: "#" },
  { title: "POS Demo", desc: "Fast checkout flow built for retail and restaurants.", href: "#" },
  { title: "Admin Dashboard Demo", desc: "Real-time metrics and system-wide controls.", href: "#" },
  { title: "Inventory Demo", desc: "Stock levels, movements, and low-stock alerts.", href: "#" },
];

export function InteractiveDemo() {
  return (
    <section className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          eyebrow="Interactive Demos"
          title="See it before you commit to it"
          description="Live, click-through demos of real system modules — not static screenshots."
        />

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {DEMOS.map((demo, i) => (
            <AnimatedCard key={demo.title} delay={(i % 3) * 0.06} className="p-0 overflow-hidden">
              <div className="flex aspect-video items-center justify-center bg-background-elevated">
                <span className="text-xs text-muted-foreground">Preview Image</span>
              </div>
              <div className="p-6">
                <h3 className="text-base font-medium text-foreground">
                  {demo.title}
                </h3>
                <p className="mt-1.5 text-sm text-muted leading-relaxed">
                  {demo.desc}
                </p>
                <a
                  href={demo.href}
                  className={buttonVariants({ variant: "outline", size: "sm", className: "mt-5 w-full" })}
                >
                  Open Demo
                  <ExternalLink className="size-3.5" />
                </a>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  );
}
