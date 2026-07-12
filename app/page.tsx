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
        <TechStack />
        <ClientDeliverables />
        {/* Remaining sections (Solutions By Industry, Demos, Projects, etc.) are added in the following tasks */}
      </main>
      <Footer />
    </>
  );
}
