"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Loader2, AlertCircle } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { TagInput } from "@/components/admin/tag-input";
import { ListEditor } from "@/components/admin/list-editor";
import { ImageUploader } from "@/components/admin/image-uploader";
import { VideoUploader } from "@/components/admin/video-uploader";
import type { ProjectInput } from "@/lib/project-mapper";

const EMPTY_PROJECT: ProjectInput = {
  slug: "",
  type: "Full Stack",
  published: true,
  title: "",
  tagline: "",
  overview: "",
  problem: "",
  solution: "",
  features: [],
  architecture: "",
  challenges: "",
  lessonsLearned: "",
  results: null,
  titleAr: "",
  taglineAr: "",
  overviewAr: "",
  problemAr: "",
  solutionAr: "",
  featuresAr: [],
  architectureAr: "",
  challengesAr: "",
  lessonsLearnedAr: "",
  resultsAr: null,
  techStack: [],
  githubUrl: "",
  backendGithubUrl: null,
  liveUrl: null,
  relatedSlugs: [],
  metrics: [],
  images: [],
  videoUrl: null,
};

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="text-xs font-medium text-muted-foreground">
        {label}
      </label>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}

const inputClass =
  "h-10 w-full rounded-lg border border-border bg-background-elevated px-3 text-sm text-foreground outline-none transition-colors focus:border-accent";
const textareaClass =
  "w-full rounded-lg border border-border bg-background-elevated px-3 py-2 text-sm text-foreground outline-none transition-colors focus:border-accent";

export function ProjectForm({
  mode,
  projectId,
  initial,
}: {
  mode: "create" | "edit";
  projectId?: string;
  initial?: ProjectInput;
}) {
  const router = useRouter();
  const [data, setData] = useState<ProjectInput>(initial ?? EMPTY_PROJECT);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = <K extends keyof ProjectInput>(key: K, value: ProjectInput[K]) =>
    setData((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const url =
      mode === "create"
        ? "/api/admin/projects"
        : `/api/admin/projects/${projectId}`;
    const method = mode === "create" ? "POST" : "PATCH";
    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setError(body.error ?? "Failed to save project");
        setSaving(false);
        return;
      }
      router.push("/admin/projects");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-10 pb-16">
      {error && (
        <p className="flex items-center gap-2 rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
          <AlertCircle className="size-4 shrink-0" />
          {error}
        </p>
      )}

      {/* Basic info */}
      <section className="flex flex-col gap-4">
        <h2 className="text-sm font-semibold text-foreground">Basic Info</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Slug (URL path)">
            <input
              required
              className={inputClass}
              value={data.slug}
              onChange={(e) => set("slug", e.target.value)}
              placeholder="my-project"
            />
          </Field>
          <Field label="Type">
            <select
              className={inputClass}
              value={data.type}
              onChange={(e) =>
                set("type", e.target.value as ProjectInput["type"])
              }
            >
              <option value="Full Stack">Full Stack</option>
              <option value="Backend">Backend</option>
            </select>
          </Field>
        </div>
        <label className="flex w-fit items-center gap-2 text-sm text-muted">
          <input
            type="checkbox"
            checked={data.published}
            onChange={(e) => set("published", e.target.checked)}
            className="size-4 accent-accent"
          />
          Published (visible on the live site)
        </label>
      </section>

      {/* English content */}
      <section className="flex flex-col gap-4">
        <h2 className="text-sm font-semibold text-foreground">
          English Content
        </h2>
        <Field label="Title">
          <input
            required
            className={inputClass}
            value={data.title}
            onChange={(e) => set("title", e.target.value)}
          />
        </Field>
        <Field label="Tagline">
          <input
            required
            className={inputClass}
            value={data.tagline}
            onChange={(e) => set("tagline", e.target.value)}
          />
        </Field>
        <Field label="Overview">
          <textarea
            rows={3}
            className={textareaClass}
            value={data.overview}
            onChange={(e) => set("overview", e.target.value)}
          />
        </Field>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Problem">
            <textarea
              rows={3}
              className={textareaClass}
              value={data.problem}
              onChange={(e) => set("problem", e.target.value)}
            />
          </Field>
          <Field label="Solution">
            <textarea
              rows={3}
              className={textareaClass}
              value={data.solution}
              onChange={(e) => set("solution", e.target.value)}
            />
          </Field>
        </div>
        <ListEditor
          label="Features"
          values={data.features}
          onChange={(v) => set("features", v)}
        />
        <Field label="Architecture">
          <textarea
            rows={3}
            className={textareaClass}
            value={data.architecture}
            onChange={(e) => set("architecture", e.target.value)}
          />
        </Field>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Challenges">
            <textarea
              rows={3}
              className={textareaClass}
              value={data.challenges}
              onChange={(e) => set("challenges", e.target.value)}
            />
          </Field>
          <Field label="Lessons Learned">
            <textarea
              rows={3}
              className={textareaClass}
              value={data.lessonsLearned}
              onChange={(e) => set("lessonsLearned", e.target.value)}
            />
          </Field>
        </div>
        <Field label="Results & Impact (real, client-facing outcomes — optional)">
          <textarea
            rows={3}
            className={textareaClass}
            value={data.results ?? ""}
            onChange={(e) => set("results", e.target.value || null)}
            placeholder="e.g. Cut manual order processing time by 60%, replaced 3 spreadsheets, client renewed for phase 2..."
          />
        </Field>
      </section>

      {/* Arabic content */}
      <section className="flex flex-col gap-4" dir="rtl">
        <h2 className="text-sm font-semibold text-foreground">
          المحتوى العربي
        </h2>
        <Field label="العنوان">
          <input
            dir="rtl"
            required
            className={inputClass}
            value={data.titleAr}
            onChange={(e) => set("titleAr", e.target.value)}
          />
        </Field>
        <Field label="الوصف المختصر">
          <input
            dir="rtl"
            required
            className={inputClass}
            value={data.taglineAr}
            onChange={(e) => set("taglineAr", e.target.value)}
          />
        </Field>
        <Field label="نظرة عامة">
          <textarea
            dir="rtl"
            rows={3}
            className={textareaClass}
            value={data.overviewAr}
            onChange={(e) => set("overviewAr", e.target.value)}
          />
        </Field>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="المشكلة">
            <textarea
              dir="rtl"
              rows={3}
              className={textareaClass}
              value={data.problemAr}
              onChange={(e) => set("problemAr", e.target.value)}
            />
          </Field>
          <Field label="الحل">
            <textarea
              dir="rtl"
              rows={3}
              className={textareaClass}
              value={data.solutionAr}
              onChange={(e) => set("solutionAr", e.target.value)}
            />
          </Field>
        </div>
        <ListEditor
          label="المميزات"
          dir="rtl"
          values={data.featuresAr}
          onChange={(v) => set("featuresAr", v)}
        />
        <Field label="المعمارية">
          <textarea
            dir="rtl"
            rows={3}
            className={textareaClass}
            value={data.architectureAr}
            onChange={(e) => set("architectureAr", e.target.value)}
          />
        </Field>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="التحديات">
            <textarea
              dir="rtl"
              rows={3}
              className={textareaClass}
              value={data.challengesAr}
              onChange={(e) => set("challengesAr", e.target.value)}
            />
          </Field>
          <Field label="الدروس المستفادة">
            <textarea
              dir="rtl"
              rows={3}
              className={textareaClass}
              value={data.lessonsLearnedAr}
              onChange={(e) => set("lessonsLearnedAr", e.target.value)}
            />
          </Field>
        </div>
        <Field label="النتائج والتأثير (نتائج حقيقية للعميل — اختياري)">
          <textarea
            dir="rtl"
            rows={3}
            className={textareaClass}
            value={data.resultsAr ?? ""}
            onChange={(e) => set("resultsAr", e.target.value || null)}
          />
        </Field>
      </section>

      {/* Tech & links */}
      <section className="flex flex-col gap-4">
        <h2 className="text-sm font-semibold text-foreground">
          Tech &amp; Links
        </h2>
        <TagInput
          label="Tech Stack"
          values={data.techStack}
          onChange={(v) => set("techStack", v)}
          placeholder="Type and press Enter"
        />
        <TagInput
          label="Related Project Slugs"
          values={data.relatedSlugs}
          onChange={(v) => set("relatedSlugs", v)}
          placeholder="e.g. erp-lite"
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="GitHub URL (frontend, or only repo)">
            <input
              required
              className={inputClass}
              value={data.githubUrl}
              onChange={(e) => set("githubUrl", e.target.value)}
            />
          </Field>
          <Field label="Backend GitHub URL (optional)">
            <input
              className={inputClass}
              value={data.backendGithubUrl ?? ""}
              onChange={(e) => set("backendGithubUrl", e.target.value || null)}
            />
          </Field>
        </div>
        <Field label="Live Demo URL (optional)">
          <input
            className={inputClass}
            value={data.liveUrl ?? ""}
            onChange={(e) => set("liveUrl", e.target.value || null)}
          />
        </Field>
      </section>

      {/* Metrics */}
      <section className="flex flex-col gap-4">
        <h2 className="text-sm font-semibold text-foreground">
          Stats / Metrics
        </h2>
        <div className="flex flex-col gap-3">
          {data.metrics.map((m, i) => (
            <div
              key={i}
              className="grid grid-cols-2 gap-3 rounded-xl border border-border bg-surface p-4 sm:grid-cols-5"
            >
              <input
                type="number"
                placeholder="Value"
                className={inputClass}
                value={m.value}
                onChange={(e) => {
                  const next = [...data.metrics];
                  next[i] = { ...next[i], value: Number(e.target.value) };
                  set("metrics", next);
                }}
              />
              <input
                placeholder="Suffix (%, +)"
                className={inputClass}
                value={m.suffix}
                onChange={(e) => {
                  const next = [...data.metrics];
                  next[i] = { ...next[i], suffix: e.target.value };
                  set("metrics", next);
                }}
              />
              <input
                placeholder="Label (EN)"
                className={`${inputClass} sm:col-span-1`}
                value={m.label}
                onChange={(e) => {
                  const next = [...data.metrics];
                  next[i] = { ...next[i], label: e.target.value };
                  set("metrics", next);
                }}
              />
              <input
                dir="rtl"
                placeholder="التسمية بالعربي"
                className={`${inputClass} sm:col-span-1`}
                value={m.labelAr}
                onChange={(e) => {
                  const next = [...data.metrics];
                  next[i] = { ...next[i], labelAr: e.target.value };
                  set("metrics", next);
                }}
              />
              <button
                type="button"
                onClick={() =>
                  set(
                    "metrics",
                    data.metrics.filter((_, idx) => idx !== i),
                  )
                }
                className="text-xs text-destructive"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              set("metrics", [
                ...data.metrics,
                { value: 0, suffix: "", label: "", labelAr: "" },
              ])
            }
            className="self-start text-xs text-accent transition-colors hover:text-accent-2"
          >
            + Add metric
          </button>
        </div>
      </section>

      {/* Images */}
      <section className="flex flex-col gap-4">
        <h2 className="text-sm font-semibold text-foreground">Images</h2>
        <ImageUploader
          label="Screenshots (first = hero/card image)"
          images={data.images}
          onChange={(v) => set("images", v)}
        />
        <VideoUploader
          label="Project walkthrough video (optional)"
          video={data.videoUrl}
          onChange={(v) => set("videoUrl", v)}
        />
      </section>

      <div className="flex items-center gap-3 border-t border-border pt-6">
        <button
          type="submit"
          disabled={saving}
          className={buttonVariants({ variant: "gradient", size: "lg" })}
        >
          {saving && <Loader2 className="size-4 animate-spin" />}
          {saving
            ? "Saving..."
            : mode === "create"
              ? "Create Project"
              : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
