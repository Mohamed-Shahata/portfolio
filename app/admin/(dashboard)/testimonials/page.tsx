import { prisma } from "@/lib/db";
import { TestimonialsTable } from "@/components/admin/testimonials-table";

export default async function AdminTestimonialsPage() {
  const testimonials = await prisma.testimonial.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div>
      <h1 className="text-xl font-semibold text-foreground">Testimonials</h1>
      <p className="mt-1 text-sm text-muted">
        {testimonials.length} testimonial{testimonials.length === 1 ? "" : "s"}
      </p>

      <TestimonialsTable initialTestimonials={testimonials} />
    </div>
  );
}
