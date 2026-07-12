"use client";

import { SectionTitle } from "@/components/ui/section-title";
import { FAQ, type FAQItem } from "@/components/ui/faq";

const FAQ_ITEMS: FAQItem[] = [
  { question: "How long does a project take?", answer: "Most systems take 3–8 weeks depending on scope, from a simple admin dashboard to a full ERP. You'll get a clear timeline after the discovery phase." },
  { question: "Can the system work offline?", answer: "Yes. I build offline-first desktop applications and can design systems that keep working with limited or no internet connectivity." },
  { question: "Can it be customized?", answer: "Every system is built specifically around your workflow — nothing is a rigid template. Features, roles, and flows are tailored to how your business actually operates." },
  { question: "Do you provide support?", answer: "Yes, every project includes 30 days of post-launch support, with ongoing maintenance available afterward." },
  { question: "Can you deploy it?", answer: "Yes. I handle full deployment — server setup, CI/CD, domains, and monitoring — so the system is live and stable from day one." },
  { question: "Can I request future updates?", answer: "Absolutely. Since you receive full source code and documentation, updates can be requested anytime, whether by me or your own team." },
];

export function FAQSection() {
  return (
    <section id="faq" className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          eyebrow="FAQ"
          title="Common questions, answered"
        />
        <div className="mt-16">
          <FAQ items={FAQ_ITEMS} />
        </div>
      </div>
    </section>
  );
}
