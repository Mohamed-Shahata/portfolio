import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Code2, Lightbulb, Layers } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { TechBadge } from "@/components/ui/tech-badge";
import { ProjectCard } from "@/components/ui/project-card";
import { buttonVariants } from "@/components/ui/button";
import { PROJECTS, getProjectBySlug } from "@/lib/projects-data";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: `${project.title} | Dev Core`,
    description: project.tagline,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const related = PROJECTS.filter((p) => project.relatedSlugs.includes(p.slug));

  return (
    <>
      <Navbar />
      <main className="relative flex-1 px-6 pb-24 pt-32">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Back to Projects
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-accent">
              {project.type}
            </span>
          </div>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
            {project.title}
          </h1>
          <p className="mt-3 max-w-2xl text-base text-muted leading-relaxed sm:text-lg">
            {project.tagline}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: "outline", size: "md" })}
            >
              <Code2 className="size-4" />
              GitHub
            </a>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: "gradient", size: "md" })}
            >
              Live Demo
              <ExternalLink className="size-4" />
            </a>
          </div>

          {/* Hero Image */}
          <div className="mt-10 flex aspect-video items-center justify-center rounded-2xl border border-border bg-surface">
            <span className="text-sm text-muted-foreground">Hero Image</span>
          </div>

          {/* Overview */}
          <section className="mt-14">
            <h2 className="text-xl font-semibold text-foreground">Overview</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
              {project.overview}
            </p>
          </section>

          {/* Problem & Solution */}
          <section className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-border bg-surface p-6">
              <h3 className="text-sm font-medium text-muted-foreground">Problem</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground">
                {project.problem}
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-surface p-6">
              <h3 className="text-sm font-medium text-muted-foreground">Solution</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground">
                {project.solution}
              </p>
            </div>
          </section>

          {/* Features */}
          <section className="mt-12">
            <h2 className="text-xl font-semibold text-foreground">Features</h2>
            <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {project.features.map((f) => (
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

          {/* Tech Stack */}
          <section className="mt-12">
            <h2 className="text-xl font-semibold text-foreground">Tech Stack</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.techStack.map((t) => (
                <TechBadge key={t} label={t} />
              ))}
            </div>
          </section>

          {/* Architecture */}
          <section className="mt-12">
            <h2 className="text-xl font-semibold text-foreground">Architecture</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
              {project.architecture}
            </p>
          </section>

          {/* Challenges & Lessons Learned */}
          <section className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-border bg-surface p-6">
              <h3 className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Lightbulb className="size-4 text-accent" />
                Challenges
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground">
                {project.challenges}
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-surface p-6">
              <h3 className="text-sm font-medium text-muted-foreground">
                Lessons Learned
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground">
                {project.lessonsLearned}
              </p>
            </div>
          </section>

          {/* Gallery */}
          <section className="mt-12">
            <h2 className="text-xl font-semibold text-foreground">Gallery</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="flex aspect-video items-center justify-center rounded-xl border border-border bg-surface"
                >
                  <span className="text-xs text-muted-foreground">
                    Screenshot {n}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Video Placeholder */}
          <section className="mt-12">
            <h2 className="text-xl font-semibold text-foreground">Video Walkthrough</h2>
            <div className="mt-4 flex aspect-video items-center justify-center rounded-2xl border border-border bg-surface">
              <span className="text-sm text-muted-foreground">
                Video coming soon
              </span>
            </div>
          </section>

          {/* Related Projects */}
          {related.length > 0 && (
            <section className="mt-16 border-t border-border pt-12">
              <h2 className="text-xl font-semibold text-foreground">
                Related Projects
              </h2>
              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                {related.map((p) => (
                  <ProjectCard key={p.slug} project={p} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
