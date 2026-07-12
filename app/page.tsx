import dynamic from "next/dynamic";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { Hero } from "@/components/sections/hero";
import { WhatIBuild } from "@/components/sections/what-i-build";
import { WhyWorkWithMe } from "@/components/sections/why-work-with-me";

// Below-the-fold sections are code-split via next/dynamic to keep the
// initial JS bundle small and speed up first load.
const Process = dynamic(() =>
  import("@/components/sections/process").then((m) => m.Process),
);
const Architecture = dynamic(() =>
  import("@/components/sections/architecture").then((m) => m.Architecture),
);
const FeaturedProjects = dynamic(() =>
  import("@/components/sections/featured-projects").then(
    (m) => m.FeaturedProjects,
  ),
);
const TechStack = dynamic(() =>
  import("@/components/sections/tech-stack").then((m) => m.TechStack),
);
const ClientDeliverables = dynamic(() =>
  import("@/components/sections/client-deliverables").then(
    (m) => m.ClientDeliverables,
  ),
);
const SolutionsByIndustry = dynamic(() =>
  import("@/components/sections/solutions-by-industry").then(
    (m) => m.SolutionsByIndustry,
  ),
);
const InteractiveDemo = dynamic(() =>
  import("@/components/sections/interactive-demo").then(
    (m) => m.InteractiveDemo,
  ),
);
const Statistics = dynamic(() =>
  import("@/components/sections/statistics").then((m) => m.Statistics),
);
const FAQSection = dynamic(() =>
  import("@/components/sections/faq-section").then((m) => m.FAQSection),
);
const Contact = dynamic(() =>
  import("@/components/sections/contact").then((m) => m.Contact),
);

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative flex-1">
        <AnimatedBackground />
        <Hero />
        <WhatIBuild />
        <WhyWorkWithMe />
        <Process />
        <Architecture />
        <FeaturedProjects />
        <TechStack />
        <ClientDeliverables />
        <SolutionsByIndustry />
        <InteractiveDemo />
        <Statistics />
        <FAQSection />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
