"use client";

import { useState, type FormEvent } from "react";
import { Loader2, AlertCircle, CheckCircle2, Plus, Trash2 } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { ResumeUploader } from "@/components/admin/resume-uploader";
import type { AboutContentInput } from "@/app/api/admin/about/route";

const inputClass =
  "h-10 w-full rounded-lg border border-border bg-background-elevated px-3 text-sm text-foreground outline-none transition-colors focus:border-accent";
const textareaClass =
  "w-full rounded-lg border border-border bg-background-elevated px-3 py-2 text-sm text-foreground outline-none transition-colors focus:border-accent";

type JourneyStep = { title: string; description: string };

function JourneyEditor({
  label,
  dir,
  steps,
  onChange,
}: {
  label: string;
  dir?: "rtl";
  steps: JourneyStep[];
  onChange: (steps: JourneyStep[]) => void;
}) {
  const update = (i: number, field: keyof JourneyStep, value: string) => {
    const next = [...steps];
    next[i] = { ...next[i], [field]: value };
    onChange(next);
  };

  return (
    <div>
      <label className="text-xs font-medium text-muted-foreground">{label}</label>
      <div className="mt-1.5 flex flex-col gap-3">
        {steps.map((step, i) => (
          <div key={i} className="rounded-lg border border-border p-3">
            <div className="flex items-center justify-between gap-2">
              <input
                type="text"
                dir={dir}
                placeholder="Title"
                value={step.title}
                onChange={(e) => update(i, "title", e.target.value)}
                className={inputClass}
              />
              <button
                type="button"
                onClick={() => onChange(steps.filter((_, idx) => idx !== i))}
                className="shrink-0 text-muted-foreground transition-colors hover:text-destructive"
              >
                <Trash2 className="size-4" />
              </button>
            </div>
            <textarea
              dir={dir}
              rows={2}
              placeholder="Description"
              value={step.description}
              onChange={(e) => update(i, "description", e.target.value)}
              className={`${textareaClass} mt-2`}
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() => onChange([...steps, { title: "", description: "" }])}
          className="flex items-center gap-1.5 self-start text-xs text-accent transition-colors hover:text-accent-2"
        >
          <Plus className="size-3.5" />
          Add step
        </button>
      </div>
    </div>
  );
}

export function AboutForm({ initial }: { initial: AboutContentInput }) {
  const [data, setData] = useState<AboutContentInput>(initial);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const set = <K extends keyof AboutContentInput>(key: K, value: AboutContentInput[K]) =>
    setData((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSaved(false);

    const res = await fetch("/api/admin/about", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setError(body.error ?? "Something went wrong");
      setSaving(false);
      return;
    }

    setSaved(true);
    setSaving(false);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-8">
      {error && (
        <div className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          <AlertCircle className="size-4 shrink-0" />
          {error}
        </div>
      )}
      {saved && (
        <div className="flex items-center gap-2 rounded-lg border border-success/30 bg-success/10 px-4 py-3 text-sm text-success">
          <CheckCircle2 className="size-4 shrink-0" />
          Saved.
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-semibold text-foreground">English</h3>
          <div>
            <label className="text-xs font-medium text-muted-foreground">Intro</label>
            <textarea
              rows={4}
              value={data.intro}
              onChange={(e) => set("intro", e.target.value)}
              className={`${textareaClass} mt-1.5`}
            />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">Approach</label>
            <textarea
              rows={4}
              value={data.approach}
              onChange={(e) => set("approach", e.target.value)}
              className={`${textareaClass} mt-1.5`}
            />
          </div>
          <JourneyEditor
            label="Journey steps"
            steps={data.journey}
            onChange={(v) => set("journey", v)}
          />
        </div>

        <div className="flex flex-col gap-4" dir="rtl">
          <h3 className="text-sm font-semibold text-foreground">العربية</h3>
          <div>
            <label className="text-xs font-medium text-muted-foreground">المقدمة</label>
            <textarea
              dir="rtl"
              rows={4}
              value={data.introAr}
              onChange={(e) => set("introAr", e.target.value)}
              className={`${textareaClass} mt-1.5`}
            />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">أسلوب العمل</label>
            <textarea
              dir="rtl"
              rows={4}
              value={data.approachAr}
              onChange={(e) => set("approachAr", e.target.value)}
              className={`${textareaClass} mt-1.5`}
            />
          </div>
          <JourneyEditor
            label="مراحل الرحلة"
            dir="rtl"
            steps={data.journeyAr}
            onChange={(v) => set("journeyAr", v)}
          />
        </div>
      </div>

      <div className="border-t border-border pt-6">
        <ResumeUploader
          label="Resume / CV (PDF)"
          fileUrl={data.resumeUrl}
          onChange={(v) => set("resumeUrl", v)}
        />
      </div>

      <div className="flex justify-end border-t border-border pt-6">
        <button
          type="submit"
          disabled={saving}
          className={buttonVariants({ variant: "gradient", size: "md" })}
        >
          {saving && <Loader2 className="size-4 animate-spin" />}
          Save Changes
        </button>
      </div>
    </form>
  );
}
