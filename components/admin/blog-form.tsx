"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Loader2, AlertCircle } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import type { BlogPostInput } from "@/app/api/admin/blog/route";

const EMPTY_POST: BlogPostInput = {
  slug: "",
  title: "",
  titleAr: "",
  excerpt: "",
  excerptAr: "",
  content: "",
  contentAr: "",
  readingTime: "5 min read",
  published: false,
};

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs font-medium text-muted-foreground">{label}</label>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}

const inputClass =
  "h-10 w-full rounded-lg border border-border bg-background-elevated px-3 text-sm text-foreground outline-none transition-colors focus:border-accent";
const textareaClass =
  "w-full rounded-lg border border-border bg-background-elevated px-3 py-2 text-sm text-foreground outline-none transition-colors focus:border-accent";

export function BlogForm({
  mode,
  postId,
  initial,
}: {
  mode: "create" | "edit";
  postId?: string;
  initial?: BlogPostInput;
}) {
  const router = useRouter();
  const [data, setData] = useState<BlogPostInput>(initial ?? EMPTY_POST);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = <K extends keyof BlogPostInput>(key: K, value: BlogPostInput[K]) =>
    setData((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const url = mode === "create" ? "/api/admin/blog" : `/api/admin/blog/${postId}`;
    const method = mode === "create" ? "POST" : "PATCH";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setError(body.error ?? "Something went wrong");
      setSaving(false);
      return;
    }

    router.push("/admin/blog");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-8">
      {error && (
        <div className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          <AlertCircle className="size-4 shrink-0" />
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Slug">
          <input
            type="text"
            required
            value={data.slug}
            onChange={(e) => set("slug", e.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label="Reading time">
          <input
            type="text"
            required
            value={data.readingTime}
            onChange={(e) => set("readingTime", e.target.value)}
            className={inputClass}
          />
        </Field>
      </div>

      <div className="flex items-center gap-2">
        <input
          id="published"
          type="checkbox"
          checked={data.published}
          onChange={(e) => set("published", e.target.checked)}
          className="size-4 rounded border-border"
        />
        <label htmlFor="published" className="text-sm text-foreground">
          Published
        </label>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-semibold text-foreground">English</h3>
          <Field label="Title">
            <input
              type="text"
              required
              value={data.title}
              onChange={(e) => set("title", e.target.value)}
              className={inputClass}
            />
          </Field>
          <Field label="Excerpt">
            <textarea
              rows={2}
              required
              value={data.excerpt}
              onChange={(e) => set("excerpt", e.target.value)}
              className={textareaClass}
            />
          </Field>
          <Field label="Content">
            <textarea
              rows={12}
              required
              value={data.content}
              onChange={(e) => set("content", e.target.value)}
              className={textareaClass}
            />
          </Field>
        </div>

        <div className="flex flex-col gap-4" dir="rtl">
          <h3 className="text-sm font-semibold text-foreground">العربية</h3>
          <Field label="العنوان">
            <input
              type="text"
              dir="rtl"
              required
              value={data.titleAr}
              onChange={(e) => set("titleAr", e.target.value)}
              className={inputClass}
            />
          </Field>
          <Field label="مقتطف">
            <textarea
              dir="rtl"
              rows={2}
              required
              value={data.excerptAr}
              onChange={(e) => set("excerptAr", e.target.value)}
              className={textareaClass}
            />
          </Field>
          <Field label="المحتوى">
            <textarea
              dir="rtl"
              rows={12}
              required
              value={data.contentAr}
              onChange={(e) => set("contentAr", e.target.value)}
              className={textareaClass}
            />
          </Field>
        </div>
      </div>

      <div className="flex justify-end gap-3 border-t border-border pt-6">
        <button
          type="submit"
          disabled={saving}
          className={buttonVariants({ variant: "gradient", size: "md" })}
        >
          {saving && <Loader2 className="size-4 animate-spin" />}
          {mode === "create" ? "Create Post" : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
