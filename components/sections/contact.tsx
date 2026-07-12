"use client";

import { Mail, Code2, Briefcase, MessageCircle, MapPin, Circle } from "lucide-react";
import { motion } from "framer-motion";
import { SectionTitle } from "@/components/ui/section-title";
import { buttonVariants } from "@/components/ui/button";

const CONTACT_ITEMS = [
  { icon: Mail, label: "hello@devcore.dev", href: "mailto:hello@devcore.dev" },
  { icon: Code2, label: "github.com/devcore", href: "https://github.com" },
  { icon: Briefcase, label: "linkedin.com/in/devcore", href: "https://linkedin.com" },
  { icon: MessageCircle, label: "WhatsApp Chat", href: "https://wa.me/000000000" },
  { icon: MapPin, label: "Remote — Available Worldwide", href: undefined },
];

export function Contact() {
  return (
    <section id="contact" className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl text-center">
        <SectionTitle
          eyebrow="Get In Touch"
          title="Let's Build Something Great Together."
          description="Have a project in mind? Tell me what you're building and I'll get back to you within 24 hours."
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
            Available for new projects
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10"
        >
          <a
            href="mailto:hello@devcore.dev"
            className={buttonVariants({ variant: "gradient", size: "lg" })}
          >
            <Mail className="size-4" />
            Email Me
          </a>
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
      </div>
    </section>
  );
}
