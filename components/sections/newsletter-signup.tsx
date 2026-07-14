"use client";

import { useState, type FormEvent } from "react";
import { Mail, Loader2, CheckCircle2 } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { useLocale } from "@/lib/i18n/locale-context";

export function NewsletterSignup() {
  const { t } = useLocale();
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const email = new FormData(form).get("email");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="mt-14 rounded-2xl border border-border bg-surface p-6 text-center sm:p-8">
      <h3 className="text-base font-medium text-foreground">{t.blog.newsletter.title}</h3>
      <p className="mt-1.5 text-sm text-muted">{t.blog.newsletter.description}</p>
      <form
        onSubmit={handleSubmit}
        className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-center"
      >
        <input
          type="email"
          name="email"
          required
          placeholder={t.blog.newsletter.placeholder}
          className="h-11 rounded-xl border border-border bg-background-elevated px-4 text-sm text-foreground outline-none transition-colors focus:border-accent sm:w-72"
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className={buttonVariants({ variant: "gradient", size: "lg" })}
        >
          {status === "sending" ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Mail className="size-4" />
          )}
          {t.blog.newsletter.subscribe}
        </button>
      </form>
      {status === "success" && (
        <p className="mt-3 flex items-center justify-center gap-2 text-sm text-success">
          <CheckCircle2 className="size-4" />
          {t.blog.newsletter.success}
        </p>
      )}
      {status === "error" && (
        <p className="mt-3 text-sm text-destructive">{t.blog.newsletter.error}</p>
      )}
    </div>
  );
}
