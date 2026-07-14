"use client";

import { useState, type FormEvent } from "react";
import { X, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { useLocale } from "@/lib/i18n/locale-context";
import { buttonVariants } from "@/components/ui/button";

export function BookingModal({ onClose }: { onClose: () => void }) {
  const { t } = useLocale();
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const today = new Date().toISOString().slice(0, 10);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const formData = new FormData(form);

    const date = formData.get("date") as string;
    const time = formData.get("time") as string;
    const startTime = date && time ? new Date(`${date}T${time}`).toISOString() : "";

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          eventName: formData.get("topic"),
          message: formData.get("notes"),
          startTime,
          durationMinutes: 30,
        }),
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
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl border border-border bg-surface p-6 text-left shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-base font-semibold text-foreground">
              {t.contact.booking.title}
            </h3>
            <p className="mt-1 text-sm text-muted">
              {t.contact.booking.description}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label={t.contact.booking.close}
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            <X className="size-5" />
          </button>
        </div>

        {status === "success" ? (
          <div className="mt-6 flex flex-col items-center gap-3 py-6 text-center">
            <CheckCircle2 className="size-8 text-success" />
            <p className="text-sm text-foreground">
              {t.contact.booking.success}
            </p>
            <button
              onClick={onClose}
              className="mt-2 rounded-lg border border-border px-4 py-2 text-sm text-foreground transition-colors hover:bg-surface-hover"
            >
              {t.contact.booking.close}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <input
                type="text"
                name="name"
                required
                placeholder={t.contact.booking.name}
                className="h-11 rounded-xl border border-border bg-background-elevated px-4 text-sm text-foreground outline-none transition-colors focus:border-accent"
              />
              <input
                type="email"
                name="email"
                required
                placeholder={t.contact.booking.email}
                className="h-11 rounded-xl border border-border bg-background-elevated px-4 text-sm text-foreground outline-none transition-colors focus:border-accent"
              />
            </div>
            <input
              type="text"
              name="topic"
              required
              placeholder={t.contact.booking.topic}
              className="h-11 rounded-xl border border-border bg-background-elevated px-4 text-sm text-foreground outline-none transition-colors focus:border-accent"
            />
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs text-muted-foreground">
                  {t.contact.booking.date}
                </label>
                <input
                  type="date"
                  name="date"
                  required
                  min={today}
                  className="h-11 w-full rounded-xl border border-border bg-background-elevated px-4 text-sm text-foreground outline-none transition-colors focus:border-accent"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-muted-foreground">
                  {t.contact.booking.time}
                </label>
                <input
                  type="time"
                  name="time"
                  required
                  className="h-11 w-full rounded-xl border border-border bg-background-elevated px-4 text-sm text-foreground outline-none transition-colors focus:border-accent"
                />
              </div>
            </div>
            <textarea
              name="notes"
              rows={3}
              placeholder={t.contact.booking.notes}
              className="rounded-xl border border-border bg-background-elevated px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-accent"
            />
            <button
              type="submit"
              disabled={status === "sending"}
              className={buttonVariants({
                variant: "gradient",
                size: "lg",
                className: "mt-1",
              })}
            >
              {status === "sending" ? (
                <Loader2 className="size-4 animate-spin" />
              ) : null}
              {status === "sending"
                ? t.contact.booking.submitting
                : t.contact.booking.submit}
            </button>
            {status === "error" && (
              <p className="flex items-center gap-2 text-sm text-destructive">
                <AlertCircle className="size-4" />
                {t.contact.booking.error}
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
