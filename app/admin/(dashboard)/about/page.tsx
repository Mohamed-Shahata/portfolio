import { prisma } from "@/lib/db";
import { AboutForm } from "@/components/admin/about-form";
import type { AboutContentInput } from "@/app/api/admin/about/route";

export default async function AdminAboutPage() {
  const about = await prisma.aboutContent.findUnique({ where: { id: "singleton" } });

  const initial: AboutContentInput = {
    intro: about?.intro ?? "",
    introAr: about?.introAr ?? "",
    approach: about?.approach ?? "",
    approachAr: about?.approachAr ?? "",
    journey: (about?.journey as AboutContentInput["journey"]) ?? [],
    journeyAr: (about?.journeyAr as AboutContentInput["journeyAr"]) ?? [],
  };

  return (
    <div>
      <h1 className="text-xl font-semibold text-foreground">About Page</h1>
      <p className="mt-1 text-sm text-muted">Edit the content shown on /about.</p>
      <AboutForm initial={initial} />
    </div>
  );
}
