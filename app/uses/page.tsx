"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SectionTitle } from "@/components/ui/section-title";
import { TechBadge } from "@/components/ui/tech-badge";
import { useLocale } from "@/lib/i18n/locale-context";

export default function UsesPage() {
  const { t } = useLocale();
  const u = t.uses;

  return (
    <>
      <Navbar />
      <main className="relative flex-1 px-6 pb-24 pt-32">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            {u.backToHome}
          </Link>

          <div className="mt-6">
            <SectionTitle eyebrow={u.eyebrow} title={u.title} description={u.description} />
          </div>

          <div className="mt-12 flex flex-col gap-8">
            {u.groups.map((group) => (
              <div key={group.title}>
                <h2 className="text-sm font-semibold text-foreground">{group.title}</h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <TechBadge key={item} label={item} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
