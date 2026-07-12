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
import { Timeline, type TimelineStep } from "@/components/ui/timeline";

const STEPS: TimelineStep[] = [
  { icon: Search, title: "Discovery", description: "Understanding your business, goals, and technical requirements." },
  { icon: ClipboardList, title: "Planning", description: "Breaking the project into a clear roadmap and milestones." },
  { icon: PenTool, title: "Wireframing", description: "Structuring layouts and user flows before any visual design." },
  { icon: Palette, title: "UI Design", description: "Designing a clean, on-brand interface for every screen." },
  { icon: Code2, title: "Development", description: "Building the system with clean, scalable, type-safe code." },
  { icon: TestTube2, title: "Testing", description: "Manual and automated testing across features and edge cases." },
  { icon: Rocket, title: "Deployment", description: "Shipping to production with proper CI/CD and monitoring." },
  { icon: LifeBuoy, title: "Support", description: "Ongoing maintenance, bug fixes, and feature updates." },
];

export function Process() {
  return (
    <section id="process" className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          eyebrow="Development Process"
          title="A clear, predictable process"
          description="No surprises. Every project follows the same proven path from idea to launch."
        />

        <div className="mt-16">
          <Timeline steps={STEPS} />
        </div>
      </div>
    </section>
  );
}
