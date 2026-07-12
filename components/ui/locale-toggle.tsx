"use client";

import { Languages } from "lucide-react";
import { useLocale } from "@/lib/i18n/locale-context";

export function LocaleToggle({ className = "" }: { className?: string }) {
  const { locale, toggleLocale } = useLocale();

  return (
    <button
      onClick={toggleLocale}
      aria-label="Toggle language"
      className={`inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:border-border-hover hover:text-foreground ${className}`}
    >
      <Languages className="size-3.5" />
      {locale === "en" ? "العربية" : "English"}
    </button>
  );
}
