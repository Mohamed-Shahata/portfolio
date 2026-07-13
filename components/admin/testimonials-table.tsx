"use client";

import { useState } from "react";
import { Trash2, Loader2, Star, Plus } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TestimonialRow {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
  published: boolean;
}

function StarPicker({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onChange(i + 1)}
          aria-label={`${i + 1} stars`}
        >
          <Star
            className={`size-4 ${
              i < value ? "fill-accent text-accent" : "text-border"
            }`}
          />
        </button>
      ))}
    </div>
  );
}

const emptyForm = { name: "", role: "", quote: "", rating: 5 };

export function TestimonialsTable({
  initialTestimonials,
}: {
  initialTestimonials: TestimonialRow[];
}) {
  const [items, setItems] = useState(initialTestimonials);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [creating, setCreating] = useState(false);

  const handleCreate = async () => {
    if (!form.name || !form.quote) return;
    setCreating(true);
    const res = await fetch("/api/admin/testimonials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, published: true }),
    });
    if (res.ok) {
      const created = await res.json();
      setItems((prev) => [...prev, created]);
      setForm(emptyForm);
    }
    setCreating(false);
  };

  const patch = async (id: string, data: Partial<TestimonialRow>) => {
    setBusyId(id);
    const res = await fetch(`/api/admin/testimonials/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      setItems((prev) => prev.map((t) => (t.id === id ? { ...t, ...data } : t)));
    }
    setBusyId(null);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete testimonial from "${name}"? This can't be undone.`)) return;
    setBusyId(id);
    const res = await fetch(`/api/admin/testimonials/${id}`, { method: "DELETE" });
    if (res.ok) {
      setItems((prev) => prev.filter((t) => t.id !== id));
    }
    setBusyId(null);
  };

  return (
    <div>
      {/* Add new testimonial */}
      <div className="mt-6 rounded-2xl border border-border bg-surface p-4">
        <p className="text-sm font-medium text-foreground">Add testimonial</p>
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="rounded-lg border border-border bg-background-elevated px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
          />
          <input
            placeholder="Role / company"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            className="rounded-lg border border-border bg-background-elevated px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
          />
        </div>
        <textarea
          placeholder="What did they say?"
          value={form.quote}
          onChange={(e) => setForm({ ...form, quote: e.target.value })}
          rows={2}
          className="mt-3 w-full rounded-lg border border-border bg-background-elevated px-3 py-2 text-sm text-foreground outline-none focus:border-accent"
        />
        <div className="mt-3 flex items-center justify-between">
          <StarPicker value={form.rating} onChange={(v) => setForm({ ...form, rating: v })} />
          <button
            onClick={handleCreate}
            disabled={creating || !form.name || !form.quote}
            className={cn(buttonVariants({ variant: "gradient", size: "sm" }))}
          >
            {creating ? <Loader2 className="size-4 animate-spin" /> : <Plus className="size-4" />}
            Add
          </button>
        </div>
      </div>

      {/* List */}
      {items.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-border bg-surface px-6 py-16 text-center text-sm text-muted">
          No testimonials yet.
        </div>
      ) : (
        <div className="mt-6 flex flex-col gap-3">
          {items.map((item) => (
            <div key={item.id} className="rounded-2xl border border-border bg-background-elevated p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <input
                      value={item.name}
                      onChange={(e) => patch(item.id, { name: e.target.value })}
                      className="rounded-md border border-transparent bg-transparent px-1 text-sm font-medium text-foreground hover:border-border focus:border-accent"
                    />
                    <input
                      value={item.role}
                      onChange={(e) => patch(item.id, { role: e.target.value })}
                      className="rounded-md border border-transparent bg-transparent px-1 text-xs text-muted-foreground hover:border-border focus:border-accent"
                    />
                  </div>
                  <textarea
                    value={item.quote}
                    onChange={(e) => patch(item.id, { quote: e.target.value })}
                    rows={2}
                    className="mt-2 w-full rounded-md border border-transparent bg-transparent px-1 text-sm text-muted hover:border-border focus:border-accent"
                  />
                  <div className="mt-2 flex items-center gap-4">
                    <StarPicker value={item.rating} onChange={(v) => patch(item.id, { rating: v })} />
                    <button
                      onClick={() => patch(item.id, { published: !item.published })}
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        item.published
                          ? "bg-success/10 text-success"
                          : "bg-muted/10 text-muted-foreground"
                      }`}
                    >
                      {item.published ? "Published" : "Hidden"}
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(item.id, item.name)}
                  disabled={busyId === item.id}
                  className="shrink-0 text-muted-foreground transition-colors hover:text-destructive"
                  aria-label="Delete"
                >
                  {busyId === item.id ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <Trash2 className="size-4" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
