import Link from "next/link";
import { Plus } from "lucide-react";
import { prisma } from "@/lib/db";
import { buttonVariants } from "@/components/ui/button";
import { ProjectsTable } from "@/components/admin/projects-table";

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { order: "asc" },
    select: { id: true, slug: true, title: true, type: true, published: true, images: true },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Projects</h1>
          <p className="mt-1 text-sm text-muted">
            {projects.length} project{projects.length === 1 ? "" : "s"}
          </p>
        </div>
        <Link
          href="/admin/projects/new"
          className={buttonVariants({ variant: "gradient", size: "md" })}
        >
          <Plus className="size-4" />
          New Project
        </Link>
      </div>

      <ProjectsTable
        initialProjects={projects.map((p) => ({
          ...p,
          images: p.images as string[],
        }))}
      />
    </div>
  );
}
