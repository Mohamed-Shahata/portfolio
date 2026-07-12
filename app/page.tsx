import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { Hero } from "@/components/sections/hero";
import { WhatIBuild } from "@/components/sections/what-i-build";
import { WhyWorkWithMe } from "@/components/sections/why-work-with-me";
import { Process } from "@/components/sections/process";
import { Architecture } from "@/components/sections/architecture";
import { TechStack } from "@/components/sections/tech-stack";
import { ClientDeliverables } from "@/components/sections/client-deliverables";
import { SolutionsByIndustry } from "@/components/sections/solutions-by-industry";
import { InteractiveDemo } from "@/components/sections/interactive-demo";
import { Statistics } from "@/components/sections/statistics";
import { Testimonials } from "@/components/sections/testimonials";
import { FAQSection } from "@/components/sections/faq-section";
import { Contact } from "@/components/sections/contact";
import { FeaturedProjects } from "@/components/sections/featured-projects";

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
        <Testimonials />
        <FAQSection />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
