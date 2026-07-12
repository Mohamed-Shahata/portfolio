"use client";

import { SectionTitle } from "@/components/ui/section-title";
import { FAQ } from "@/components/ui/faq";
import { useLocale } from "@/lib/i18n/locale-context";

export function FAQSection() {
  const { t } = useLocale();

  return (
    <section id="faq" className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow={t.faq.eyebrow} title={t.faq.title} />
        <div className="mt-16">
          <FAQ items={[...t.faq.items]} />
        </div>
      </div>
    </section>
  );
}
