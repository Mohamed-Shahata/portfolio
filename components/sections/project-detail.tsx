"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ExternalLink,
  Code2,
  Lightbulb,
  Layers,
} from "lucide-react";
import { TechBadge } from "@/components/ui/tech-badge";
import { ProjectCard } from "@/components/ui/project-card";
import { StatsCounter } from "@/components/ui/stats-counter";
import { buttonVariants } from "@/components/ui/button";
import { getLocalizedProject, type Project } from "@/lib/projects-data";
import { useLocale } from "@/lib/i18n/locale-context";

export function ProjectDetail({
  project,
  related,
}: {
  project: Project;
  related: Project[];
}) {
  const { locale, t } = useLocale();
  const p = getLocalizedProject(project, locale);
  const tp = t.projectDetail;

  return (
    <div className="mx-auto max-w-4xl">
      <Link
        href="/#projects"
        className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        {tp.backToProjects}
      </Link>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <span className="inline-flex items-center rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-accent">
          {p.type}
        </span>
      </div>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
        {p.title}
      </h1>
      <p className="mt-3 max-w-2xl text-base text-muted leading-relaxed sm:text-lg">
        {p.tagline}
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href={p.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonVariants({ variant: "outline", size: "md" })}
        >
          <Code2 className="size-4" />
          {tp.github}
        </a>
        {p.liveUrl && (
          <a
            href={p.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ variant: "gradient", size: "md" })}
          >
            {tp.liveDemo}
            <ExternalLink className="size-4" />
          </a>
        )}
      </div>

      <div className="mt-10 flex aspect-video items-center justify-center rounded-2xl border border-border bg-surface">
        <span className="text-sm text-muted-foreground">{tp.heroImage}</span>
      </div>

      {project.metrics.length > 0 && (
        <div className="mt-10 grid grid-cols-2 gap-6 rounded-2xl border border-border bg-surface px-6 py-8 sm:grid-cols-3">
          {project.metrics.map((m) => (
            <StatsCounter
              key={m.label}
              value={m.value}
              suffix={m.suffix}
              label={locale === "ar" ? m.labelAr : m.label}
            />
          ))}
        </div>
      )}

      <section className="mt-14">
        <h2 className="text-xl font-semibold text-foreground">{tp.overview}</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
          {p.overview}
        </p>
      </section>

      <section className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-border bg-surface p-6">
          <h3 className="text-sm font-medium text-muted-foreground">
            {tp.problem}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-foreground">
            {p.problem}
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-surface p-6">
          <h3 className="text-sm font-medium text-muted-foreground">
            {tp.solution}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-foreground">
            {p.solution}
          </p>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold text-foreground">{tp.features}</h2>
        <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {p.features.map((f) => (
            <li
              key={f}
              className="flex items-start gap-2.5 rounded-xl border border-border bg-surface px-4 py-3 text-sm text-muted"
            >
              <Layers className="mt-0.5 size-4 shrink-0 text-accent" />
              {f}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold text-foreground">
          {tp.techStack}
        </h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {p.techStack.map((t2) => (
            <TechBadge key={t2} label={t2} />
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold text-foreground">
          {tp.architecture}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
          {p.architecture}
        </p>
      </section>

      <section className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-border bg-surface p-6">
          <h3 className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Lightbulb className="size-4 text-accent" />
            {tp.challenges}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-foreground">
            {p.challenges}
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-surface p-6">
          <h3 className="text-sm font-medium text-muted-foreground">
            {tp.lessonsLearned}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-foreground">
            {p.lessonsLearned}
          </p>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold text-foreground">{tp.gallery}</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="flex aspect-video items-center justify-center rounded-xl border border-border bg-surface"
            >
              <span className="text-xs text-muted-foreground">
                {tp.screenshot} {n}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold text-foreground">
          {tp.videoWalkthrough}
        </h2>
        <div className="mt-4 flex aspect-video items-center justify-center rounded-2xl border border-border bg-surface">
          <span className="text-sm text-muted-foreground">
            {tp.videoComingSoon}
          </span>
        </div>
      </section>

      {related.length > 0 && (
        <section className="mt-16 border-t border-border pt-12">
          <h2 className="text-xl font-semibold text-foreground">
            {tp.relatedProjects}
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {related.map((rp) => (
              <ProjectCard key={rp.slug} project={rp} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
