"use client";

import { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";

interface SubscriberRow {
  id: string;
  email: string;
  createdAt: string;
}

export function NewsletterTable({ initial }: { initial: SubscriberRow[] }) {
  const [subs, setSubs] = useState(initial);
  const [busyId, setBusyId] = useState<string | null>(null);

  const handleDelete = async (id: string, email: string) => {
    if (!confirm(`Remove ${email}? This can't be undone.`)) return;
    setBusyId(id);
    const res = await fetch(`/api/admin/newsletter/${id}`, { method: "DELETE" });
    if (res.ok) setSubs((prev) => prev.filter((s) => s.id !== id));
    setBusyId(null);
  };

  if (subs.length === 0) {
    return (
      <div className="mt-8 rounded-2xl border border-border bg-surface px-6 py-16 text-center text-sm text-muted">
        No subscribers yet.
      </div>
    );
  }

  return (
    <div className="mt-6 overflow-hidden rounded-2xl border border-border">
      <table className="w-full text-sm">
        <thead className="bg-surface text-left text-xs uppercase tracking-wider text-muted-foreground">
          <tr>
            <th className="px-4 py-3 font-medium">Email</th>
            <th className="px-4 py-3 font-medium">Subscribed</th>
            <th className="px-4 py-3 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border bg-background-elevated">
          {subs.map((s) => (
            <tr key={s.id}>
              <td className="px-4 py-3 font-medium text-foreground">{s.email}</td>
              <td className="px-4 py-3 text-muted">
                {new Date(s.createdAt).toLocaleDateString()}
              </td>
              <td className="px-4 py-3">
                <div className="flex justify-end">
                  <button
                    onClick={() => handleDelete(s.id, s.email)}
                    disabled={busyId === s.id}
                    className="text-muted-foreground transition-colors hover:text-destructive"
                    aria-label="Remove"
                  >
                    {busyId === s.id ? (
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
