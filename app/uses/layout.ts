import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Uses",
  description:
    "The tools, stack, and workflow behind every project — plus what I'm working on right now.",
};

export default function UsesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
