import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { AnimatedCard } from "@/components/ui/animated-card";
import { TechBadge } from "@/components/ui/tech-badge";
import { getLocalizedProject, type Project } from "@/lib/projects-data";
import { useLocale } from "@/lib/i18n/locale-context";

interface ProjectCardProps {
  project: Project;
  delay?: number;
}

export function ProjectCard({ project, delay = 0 }: ProjectCardProps) {
  const { locale } = useLocale();
  const p = getLocalizedProject(project, locale);
  return (
    <Link href={`/projects/${project.slug}`} className="block">
      <AnimatedCard
        delay={delay}
        className="p-0 overflow-hidden h-full flex flex-col"
      >
        <div className="flex aspect-video items-center justify-center bg-background-elevated">
          <span className="text-xs text-muted-foreground">Project Preview</span>
        </div>
        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center rounded-full border border-border bg-background-elevated px-2.5 py-0.5 text-[11px] font-medium text-accent">
              {p.type}
            </span>
            <ArrowUpRight className="size-4 text-muted-foreground transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
          <h3 className="mt-3 text-base font-medium text-foreground">
            {p.title}
          </h3>
          <p className="mt-1.5 flex-1 text-sm text-muted leading-relaxed">
            {p.tagline}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {p.techStack.slice(0, 3).map((t) => (
              <TechBadge key={t} label={t} />
            ))}
          </div>
        </div>
      </AnimatedCard>
    </Link>
  );
}
