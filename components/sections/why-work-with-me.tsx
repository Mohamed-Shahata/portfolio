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

const FEATURES = [
  { icon: Lock, title: "Secure Code", desc: "Security-first practices baked into every layer." },
  { icon: Layers, title: "Scalable Architecture", desc: "Built to grow with your business, not against it." },
  { icon: Smartphone, title: "Responsive UI", desc: "Flawless on desktop, tablet, and mobile." },
  { icon: Zap, title: "Fast Performance", desc: "Optimized for speed from the first load." },
  { icon: Code2, title: "Clean Code", desc: "Readable, consistent, and easy to hand off." },
  { icon: Wrench, title: "Maintainable Projects", desc: "Structured so future changes stay simple." },
  { icon: Plug2, title: "API Development", desc: "Reliable APIs designed for integration." },
  { icon: WifiOff, title: "Offline Solutions", desc: "Software that keeps working without internet." },
  { icon: FileText, title: "Documentation", desc: "Clear docs so your team is never blocked." },
  { icon: Rocket, title: "Deployment Support", desc: "From server setup to going live, handled." },
  { icon: Cpu, title: "Modern Technologies", desc: "Current, production-proven tech stacks." },
  { icon: InfinityIcon, title: "Long-Term Maintainability", desc: "Code that stays healthy years after launch." },
];

export function WhyWorkWithMe() {
  return (
    <section className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          eyebrow="Why Work With Me"
          title="Every project, built to the same standard"
          description="Quality isn't a phase at the end — it's part of how every line of code gets written."
        />

        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f, i) => (
            <AnimatedCard key={f.title} delay={(i % 4) * 0.05} className="text-center items-center flex flex-col">
              <div className="flex size-11 items-center justify-center rounded-xl bg-accent-soft text-accent">
                <f.icon className="size-5" />
              </div>
              <h3 className="mt-4 text-sm font-medium text-foreground">
                {f.title}
              </h3>
              <p className="mt-1.5 text-xs text-muted leading-relaxed">
                {f.desc}
              </p>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  );
}
