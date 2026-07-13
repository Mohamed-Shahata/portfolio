"use client";

import { useState } from "react";
import Link from "next/link";
import { Pencil, Trash2, Loader2 } from "lucide-react";

interface BlogRow {
  id: string;
  slug: string;
  title: string;
  published: boolean;
  readingTime: string;
}

export function BlogTable({ initialPosts }: { initialPosts: BlogRow[] }) {
  const [posts, setPosts] = useState(initialPosts);
  const [busyId, setBusyId] = useState<string | null>(null);

  const togglePublished = async (id: string, published: boolean) => {
    setBusyId(id);
    const res = await fetch(`/api/admin/blog/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published: !published }),
    });
    if (res.ok) {
      setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, published: !published } : p)));
    }
    setBusyId(null);
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This can't be undone.`)) return;
    setBusyId(id);
    const res = await fetch(`/api/admin/blog/${id}`, { method: "DELETE" });
    if (res.ok) {
      setPosts((prev) => prev.filter((p) => p.id !== id));
    }
    setBusyId(null);
  };

  if (posts.length === 0) {
    return (
      <div className="mt-8 rounded-2xl border border-border bg-surface px-6 py-16 text-center text-sm text-muted">
        No posts yet. Click &ldquo;New Post&rdquo; to write your first one.
      </div>
    );
  }

  return (
    <div className="mt-6 overflow-hidden rounded-2xl border border-border">
      <table className="w-full text-sm">
        <thead className="bg-surface text-left text-xs uppercase tracking-wider text-muted-foreground">
          <tr>
            <th className="px-4 py-3 font-medium">Title</th>
            <th className="px-4 py-3 font-medium">Reading time</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border bg-background-elevated">
          {posts.map((p) => (
            <tr key={p.id}>
              <td className="px-4 py-3">
                <p className="font-medium text-foreground">{p.title}</p>
                <p className="text-xs text-muted-foreground">/{p.slug}</p>
              </td>
              <td className="px-4 py-3 text-muted">{p.readingTime}</td>
              <td className="px-4 py-3">
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
              <td className="px-4 py-3">
                <div className="flex items-center justify-end gap-3">
                  <Link
                    href={`/admin/blog/${p.id}`}
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
  );
}
