import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Backend-focused full-stack developer building production-grade SaaS, ERP, and business systems with NestJS, Next.js, and PostgreSQL.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
