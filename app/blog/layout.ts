import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notes on backend architecture, NestJS, Next.js, and lessons learned building production systems.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
