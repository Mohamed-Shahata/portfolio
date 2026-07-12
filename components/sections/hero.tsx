"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { GradientText } from "@/components/ui/gradient-text";
import { useLocale } from "@/lib/i18n/locale-context";

export function Hero() {
  const { t } = useLocale();

  return (
    <section className="relative flex min-h-screen items-center justify-center px-6 pt-16">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-8 text-center">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-medium text-muted"
        >
          <Sparkles className="size-3.5 text-accent" />
          {t.hero.badge}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          className="text-4xl font-semibold leading-[1.1] tracking-tight sm:text-6xl md:text-7xl"
        >
          {t.hero.titleLine1}{" "}
          <GradientText>{t.hero.titleGradient}</GradientText>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="max-w-2xl text-base text-muted sm:text-lg leading-relaxed"
        >
          {t.hero.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col gap-3 sm:flex-row"
        >
          <a
            href="#projects"
            className={buttonVariants({ variant: "gradient", size: "lg" })}
          >
            {t.hero.ctaPrimary}
            <ArrowRight className="size-4" />
          </a>
          <a
            href="#contact"
            className={buttonVariants({ variant: "outline", size: "lg" })}
          >
            {t.hero.ctaSecondary}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
