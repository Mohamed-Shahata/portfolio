import { prisma } from "@/lib/db";
import { NewsletterTable } from "@/components/admin/newsletter-table";

export default async function AdminNewsletterPage() {
  const subs = await prisma.newsletterSubscriber.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="text-xl font-semibold text-foreground">Newsletter</h1>
      <p className="mt-1 text-sm text-muted">
        {subs.length} subscriber{subs.length === 1 ? "" : "s"}
      </p>

      <NewsletterTable
        initial={subs.map((s) => ({ ...s, createdAt: s.createdAt.toISOString() }))}
      />
    </div>
  );
}
