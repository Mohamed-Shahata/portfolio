"use client";

import { useState, useEffect, type FormEvent } from "react";
import {
  Mail,
  Code2,
  Briefcase,
  MessageCircle,
  MapPin,
  Circle,
  Download,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  CalendarClock,
} from "lucide-react";
import { motion } from "framer-motion";
import { SectionTitle } from "@/components/ui/section-title";
import { buttonVariants } from "@/components/ui/button";
import { useLocale } from "@/lib/i18n/locale-context";

declare global {
  interface Window {
    Calendly?: { initPopupWidget: (opts: { url: string }) => void };
  }
}

export function Contact() {
  const { t } = useLocale();
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [calendlyUrl, setCalendlyUrl] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/calendly")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setCalendlyUrl(data?.url ?? null))
      .catch(() => setCalendlyUrl(null));
  }, []);

  const openCalendly = () => {
    if (!calendlyUrl) return;

    const openPopup = () =>
      window.Calendly?.initPopupWidget({ url: calendlyUrl });

    if (window.Calendly) {
      openPopup();
      return;
    }

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://assets.calendly.com/assets/external/widget.css";
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    script.onload = openPopup;
    document.body.appendChild(script);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const formData = new FormData(form);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
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

  const CONTACT_ITEMS = [
    {
      icon: Mail,
      label: "mohamedmrslan@gmail.com",
      href: "mailto:mohamedmrslan@gmail.com",
    },
    {
      icon: Code2,
      label: "github.com/Mohamed-Shahata",
      href: "https://github.com/Mohamed-Shahata",
    },
    {
      icon: Briefcase,
      label: "linkedin.com/in/mohamed-shahata-895708261",
      href: "https://linkedin.com/in/mohamed-shahata-895708261",
    },
    {
      icon: MessageCircle,
      label: "WhatsApp Chat",
      href: "https://wa.me/201152432513",
    },
    { icon: MapPin, label: t.contact.locationLabel, href: undefined },
  ];

  return (
    <section id="contact" className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl text-center">
        <SectionTitle
          eyebrow={t.contact.eyebrow}
          title={t.contact.title}
          description={t.contact.description}
        />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-8 flex justify-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-medium text-muted">
            <Circle className="size-2 fill-success text-success" />
            {t.contact.badge}
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center"
        >
          <a
            href="mailto:mohamedmrslan@gmail.com"
            className={buttonVariants({ variant: "gradient", size: "lg" })}
          >
            <Mail className="size-4" />
            {t.contact.emailMe}
          </a>
          <a
            href="/Mohamed-Shehata-CV.pdf"
            download
            className={buttonVariants({ variant: "outline", size: "lg" })}
          >
            <Download className="size-4" />
            {t.contact.downloadCv}
          </a>
          {calendlyUrl && (
            <button
              type="button"
              onClick={openCalendly}
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              <CalendarClock className="size-4" />
              {t.contact.bookCall}
            </button>
          )}
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {CONTACT_ITEMS.map((item, i) => {
            const content = (
              <>
                <div className="flex size-9 items-center justify-center rounded-lg bg-accent-soft text-accent">
                  <item.icon className="size-4" />
                </div>
                <span className="text-sm text-muted">{item.label}</span>
              </>
            );
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                {item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3 transition-colors hover:border-border-hover hover:bg-surface-hover"
                  >
                    {content}
                  </a>
                ) : (
                  <div className="flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3">
                    {content}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-14 rounded-2xl border border-border bg-surface p-6 text-left sm:p-8"
        >
          <h3 className="text-base font-medium text-foreground">
            {t.contact.form.title}
          </h3>
          <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input
                type="text"
                name="name"
                required
                placeholder={t.contact.form.name}
                className="h-11 rounded-xl border border-border bg-background-elevated px-4 text-sm text-foreground outline-none transition-colors focus:border-accent"
              />
              <input
                type="email"
                name="email"
                required
                placeholder={t.contact.form.email}
                className="h-11 rounded-xl border border-border bg-background-elevated px-4 text-sm text-foreground outline-none transition-colors focus:border-accent"
              />
            </div>
            <textarea
              name="message"
              required
              rows={4}
              placeholder={t.contact.form.message}
              className="rounded-xl border border-border bg-background-elevated px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-accent"
            />
            <button
              type="submit"
              disabled={status === "sending"}
              className={buttonVariants({
                variant: "gradient",
                size: "lg",
                className: "self-start",
              })}
            >
              {status === "sending" ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Send className="size-4" />
              )}
              {status === "sending"
                ? t.contact.form.sending
                : t.contact.form.send}
            </button>
            {status === "success" && (
              <p className="flex items-center gap-2 text-sm text-success">
                <CheckCircle2 className="size-4" />
                {t.contact.form.success}
              </p>
            )}
            {status === "error" && (
              <p className="flex items-center gap-2 text-sm text-destructive">
                <AlertCircle className="size-4" />
                {t.contact.form.error}
              </p>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
}
