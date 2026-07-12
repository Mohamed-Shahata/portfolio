"use client";

import { ExternalLink } from "lucide-react";
import { SectionTitle } from "@/components/ui/section-title";
import { AnimatedCard } from "@/components/ui/animated-card";
import { buttonVariants } from "@/components/ui/button";
import { useLocale } from "@/lib/i18n/locale-context";

export function InteractiveDemo() {
  const { t } = useLocale();
  const items = t.interactiveDemo.items;

  return (
    <section className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          eyebrow={t.interactiveDemo.eyebrow}
          title={t.interactiveDemo.title}
          description={t.interactiveDemo.description}
        />

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((demo, i) => (
            <AnimatedCard
              key={demo.title}
              delay={(i % 3) * 0.06}
              className="p-0 overflow-hidden"
            >
              <div className="flex aspect-video items-center justify-center bg-background-elevated">
                <span className="text-xs text-muted-foreground">
                  Preview Image
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-base font-medium text-foreground">
                  {demo.title}
                </h3>
                <p className="mt-1.5 text-sm text-muted leading-relaxed">
                  {demo.desc}
                </p>
                <a
                  href="#"
                  className={buttonVariants({
                    variant: "outline",
                    size: "sm",
                    className: "mt-5 w-full",
                  })}
                >
                  {t.interactiveDemo.openDemo}
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
