import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AnimatedBackground } from "@/components/ui/animated-background";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative flex-1">
        <AnimatedBackground />
        {/* Sections (Hero, What I Build, Process, Projects, etc.) are added in the following tasks */}
      </main>
      <Footer />
    </>
  );
}
