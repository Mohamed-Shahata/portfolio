"use client";

import { useState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { AvailabilityInput } from "@/app/api/admin/availability/route";

const OPTIONS: { value: AvailabilityInput["status"]; label: string; dot: string }[] = [
  { value: "available", label: "Available", dot: "bg-success" },
  { value: "busy", label: "Busy", dot: "bg-destructive" },
  { value: "available_after", label: "Available after a date", dot: "bg-accent" },
];

export function AvailabilityForm({ initial }: { initial: AvailabilityInput }) {
  const [data, setData] = useState<AvailabilityInput>(initial);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    const res = await fetch("/api/admin/availability", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) setSaved(true);
    setSaving(false);
  };

  return (
    <div className="mt-6 max-w-lg rounded-2xl border border-border bg-surface p-6">
      <div className="flex flex-col gap-2">
        {OPTIONS.map((opt) => (
          <label
            key={opt.value}
            className={cn(
              "flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 text-sm transition-colors",
              data.status === opt.value
                ? "border-accent bg-accent-soft/40"
                : "border-border hover:bg-surface-hover",
            )}
          >
            <input
              type="radio"
              name="status"
              className="sr-only"
              checked={data.status === opt.value}
              onChange={() => setData({ ...data, status: opt.value })}
            />
            <span className={`size-2 rounded-full ${opt.dot}`} />
            {opt.label}
          </label>
        ))}
      </div>

      {data.status === "available_after" && (
        <div className="mt-4">
          <label className="text-xs font-medium text-muted-foreground">
            Available from
          </label>
          <input
            type="date"
            className="mt-1.5 h-10 w-full rounded-lg border border-border bg-background-elevated px-3 text-sm text-foreground outline-none focus:border-accent"
            value={data.availableFrom ? data.availableFrom.slice(0, 10) : ""}
            onChange={(e) =>
              setData({ ...data, availableFrom: e.target.value || null })
            }
          />
          <p className="mt-1.5 text-xs text-muted-foreground">
            The badge switches to &ldquo;Available&rdquo; automatically once this date passes.
          </p>
        </div>
      )}

      <button
        onClick={handleSave}
        disabled={saving}
        className={cn(buttonVariants({ variant: "gradient", size: "md" }), "mt-6")}
      >
        {saving ? <Loader2 className="size-4 animate-spin" /> : saved ? <CheckCircle2 className="size-4" /> : null}
        {saved ? "Saved" : "Save"}
      </button>
    </div>
  );
}
