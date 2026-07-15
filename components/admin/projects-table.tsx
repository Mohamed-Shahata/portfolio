"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Pencil,
  Trash2,
  ExternalLink,
  Loader2,
  GripVertical,
} from "lucide-react";

interface ProjectRow {
  id: string;
  slug: string;
  title: string;
  type: string;
  published: boolean;
  images: string[];
}

export function ProjectsTable({
  initialProjects,
}: {
  initialProjects: ProjectRow[];
}) {
  const [projects, setProjects] = useState(initialProjects);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [dragId, setDragId] = useState<string | null>(null);

  const handleDrop = async (targetId: string) => {
    if (!dragId || dragId === targetId) return;
    const from = projects.findIndex((p) => p.id === dragId);
    const to = projects.findIndex((p) => p.id === targetId);
    if (from === -1 || to === -1) return;

    const reordered = [...projects];
    const [moved] = reordered.splice(from, 1);
    reordered.splice(to, 0, moved);
    setProjects(reordered);
    setDragId(null);

    await Promise.all(
      reordered.map((p, i) =>
        fetch(`/api/admin/projects/${p.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ order: i }),
        }),
      ),
    );
  };

  const togglePublished = async (id: string, published: boolean) => {
    setBusyId(id);
    const res = await fetch(`/api/admin/projects/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published: !published }),
    });
    if (res.ok) {
      setProjects((prev) =>
        prev.map((p) => (p.id === id ? { ...p, published: !published } : p)),
      );
    }
    setBusyId(null);
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This can't be undone.`)) return;
    setBusyId(id);
    const res = await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
    if (res.ok) {
      setProjects((prev) => prev.filter((p) => p.id !== id));
    }
    setBusyId(null);
  };

  if (projects.length === 0) {
    return (
      <div className="mt-8 rounded-2xl border border-border bg-surface px-6 py-16 text-center text-sm text-muted">
        No projects yet. Click &ldquo;New Project&rdquo; to add your first one.
      </div>
    );
  }

  return (
    <div className="mt-6 overflow-hidden rounded-2xl border border-border">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-sm">
          <thead className="bg-surface text-left text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="w-8 px-2 py-3"></th>
              <th className="whitespace-nowrap px-4 py-3 font-medium">
                Project
              </th>
              <th className="whitespace-nowrap px-4 py-3 font-medium">Type</th>
              <th className="whitespace-nowrap px-4 py-3 font-medium">
                Status
              </th>
              <th className="whitespace-nowrap px-4 py-3 font-medium text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-background-elevated">
            {projects.map((p) => (
              <tr
                key={p.id}
                draggable
                onDragStart={() => setDragId(p.id)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop(p.id)}
                className={dragId === p.id ? "opacity-40" : ""}
              >
                <td className="cursor-grab px-2 py-3 text-muted-foreground active:cursor-grabbing">
                  <GripVertical className="size-4" />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="relative size-10 shrink-0 overflow-hidden rounded-lg border border-border bg-surface">
                      {p.images[0] && (
                        <Image
                          src={p.images[0]}
                          alt={p.title}
                          fill
                          sizes="40px"
                          className="object-cover"
                        />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="max-w-[200px] truncate font-medium text-foreground">
                        {p.title}
                      </p>
                      <p className="max-w-[200px] truncate text-xs text-muted-foreground">
                        /{p.slug}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-muted">
                  {p.type}
                </td>
                <td className="whitespace-nowrap px-4 py-3">
                  <button
                    onClick={() => togglePublished(p.id, p.published)}
                    disabled={busyId === p.id}
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      p.published
                        ? "bg-success/10 text-success"
                        : "bg-muted/10 text-muted-foreground"
                    }`}
                  >
                    {p.published ? "Published" : "Draft"}
                  </button>
                </td>
                <td className="whitespace-nowrap px-4 py-3">
                  <div className="flex items-center justify-end gap-3">
                    <Link
                      href={`/projects/${p.slug}`}
                      target="_blank"
                      className="text-muted-foreground transition-colors hover:text-foreground"
                      aria-label="View live"
                    >
                      <ExternalLink className="size-4" />
                    </Link>
                    <Link
                      href={`/admin/projects/${p.id}`}
                      className="text-muted-foreground transition-colors hover:text-foreground"
                      aria-label="Edit"
                    >
                      <Pencil className="size-4" />
                    </Link>
                    <button
                      onClick={() => handleDelete(p.id, p.title)}
                      disabled={busyId === p.id}
                      className="text-muted-foreground transition-colors hover:text-destructive"
                      aria-label="Delete"
                    >
                      {busyId === p.id ? (
                        <Loader2 className="size-4 animate-spin" />
                      ) : (
                        <Trash2 className="size-4" />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
