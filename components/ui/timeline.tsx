"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

export interface TimelineStep {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface TimelineProps {
  steps: TimelineStep[];
}

export function Timeline({ steps }: TimelineProps) {
  return (
    <div className="relative mx-auto max-w-2xl">
      <div className="absolute left-5.5 top-2 bottom-2 w-px bg-gradient-to-b from-accent via-accent-2 to-transparent sm:left-6" />

      <ol className="flex flex-col gap-10">
        {steps.map((step, i) => (
          <motion.li
            key={step.title}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.06, ease: "easeOut" }}
            className="relative flex gap-5"
          >
            <div className="relative z-10 flex size-11 shrink-0 items-center justify-center rounded-full border border-border bg-background-elevated text-accent sm:size-12">
              <step.icon className="size-5" />
            </div>
            <div className="pt-1.5">
              <h3 className="text-base font-medium text-foreground">
                {i + 1}. {step.title}
              </h3>
              <p className="mt-1 text-sm text-muted leading-relaxed">
                {step.description}
              </p>
            </div>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
