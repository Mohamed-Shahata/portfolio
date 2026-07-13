"use client";

import { useEffect, useState } from "react";
import { Server, Layers, ShieldCheck, Mail, Download } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SectionTitle } from "@/components/ui/section-title";
import { Timeline } from "@/components/ui/timeline";
import { buttonVariants } from "@/components/ui/button";
import { useLocale } from "@/lib/i18n/locale-context";

const JOURNEY_ICONS = [Server, Layers, ShieldCheck];

interface AboutContent {
  intro: string;
  introAr: string;
  approach: string;
  approachAr: string;
  journey: { title: string; description: string }[];
  journeyAr: { title: string; description: string }[];
  resumeUrl: string | null;
}

export default function AboutPage() {
  const { t, locale } = useLocale();
  const a = t.about;
  const [content, setContent] = useState<AboutContent | null>(null);

  useEffect(() => {
    fetch("/api/about")
      .then((res) => res.json())
      .then(setContent)
      .catch(() => setContent(null));
  }, []);

  const intro = content
    ? locale === "ar"
      ? content.introAr
      : content.intro
    : a.intro;
  const approach = content
    ? locale === "ar"
      ? content.approachAr
      : content.approach
    : a.approach;
  const journey = content
    ? locale === "ar"
      ? content.journeyAr
      : content.journey
    : a.journey;

  return (
    <>
      <Navbar />
      <main className="relative flex-1 px-6 pb-24 pt-32">
        <div className="mx-auto max-w-3xl">
          <SectionTitle eyebrow={a.eyebrow} title={a.title} align="left" />
          <p className="mt-6 text-base leading-relaxed text-muted sm:text-lg">
            {intro}
          </p>

          <section className="mt-16">
            <h2 className="text-xl font-semibold text-foreground">
              {a.journeyTitle}
            </h2>
            <div className="mt-8">
              <Timeline
                steps={journey.map((step, i) => ({
                  icon: JOURNEY_ICONS[i] ?? Server,
                  title: step.title,
                  description: step.description,
                }))}
              />
            </div>
          </section>

          <section className="mt-16 rounded-2xl border border-border bg-surface p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-foreground">
              {a.approachTitle}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
              {approach}
            </p>
          </section>

          <section className="mt-16 text-center">
            <h2 className="text-xl font-semibold text-foreground">
              {a.ctaTitle}
            </h2>
            <p className="mt-2 text-sm text-muted sm:text-base">
              {a.ctaDescription}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                href="/#contact"
                className={buttonVariants({ variant: "gradient", size: "lg" })}
              >
                <Mail className="size-4" />
                {t.contact.emailMe}
              </Link>
              <a
                href={content?.resumeUrl || "/Mohamed-Shehata-CV.pdf"}
                download
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({ variant: "outline", size: "lg" })}
              >
                <Download className="size-4" />
                {t.contact.downloadCv}
              </a>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
