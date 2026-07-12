"use client";

import { SectionTitle } from "@/components/ui/section-title";
import { ProjectCard } from "@/components/ui/project-card";
import { PROJECTS } from "@/lib/projects-data";
import { useLocale } from "@/lib/i18n/locale-context";

export function FeaturedProjects() {
  const { t } = useLocale();

  return (
    <section id="projects" className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          eyebrow={t.featuredProjects.eyebrow}
          title={t.featuredProjects.title}
          description={t.featuredProjects.description}
        />

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project, i) => (
            <ProjectCard
              key={project.slug}
              project={project}
              delay={(i % 3) * 0.06}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
