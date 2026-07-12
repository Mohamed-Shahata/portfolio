"use client";

import {
  Search,
  ClipboardList,
  PenTool,
  Palette,
  Code2,
  TestTube2,
  Rocket,
  LifeBuoy,
} from "lucide-react";
import { SectionTitle } from "@/components/ui/section-title";
import { Timeline } from "@/components/ui/timeline";
import { useLocale } from "@/lib/i18n/locale-context";

const ICONS = [
  Search,
  ClipboardList,
  PenTool,
  Palette,
  Code2,
  TestTube2,
  Rocket,
  LifeBuoy,
];

export function Process() {
  const { t } = useLocale();
  const steps = t.process.steps.map((s, i) => ({ ...s, icon: ICONS[i] }));

  return (
    <section id="process" className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          eyebrow={t.process.eyebrow}
          title={t.process.title}
          description={t.process.description}
        />

        <div className="mt-16">
          <Timeline steps={steps} />
        </div>
      </div>
    </section>
  );
}
