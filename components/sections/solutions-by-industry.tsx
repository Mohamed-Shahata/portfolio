"use client";

import {
  Car,
  UtensilsCrossed,
  Stethoscope,
  Building2,
  School,
  Dumbbell,
  Hotel,
  ShoppingBag,
  Factory,
  Warehouse,
  HardHat,
  Calculator,
} from "lucide-react";
import { SectionTitle } from "@/components/ui/section-title";
import { AnimatedCard } from "@/components/ui/animated-card";

const INDUSTRIES = [
  { icon: Car, title: "Car Showrooms", desc: "Inventory, test drives, and sales pipeline management." },
  { icon: UtensilsCrossed, title: "Restaurants", desc: "POS, table management, and kitchen order flow." },
  { icon: Stethoscope, title: "Clinics", desc: "Appointments, patient records, and prescriptions." },
  { icon: Building2, title: "Hospitals", desc: "Multi-department systems for staff and patient care." },
  { icon: School, title: "Schools", desc: "Student records, grading, and attendance tracking." },
  { icon: Dumbbell, title: "Gyms", desc: "Memberships, class bookings, and billing automation." },
  { icon: Hotel, title: "Hotels", desc: "Reservations, room status, and guest management." },
  { icon: ShoppingBag, title: "Retail Stores", desc: "POS, inventory sync, and multi-branch reporting." },
  { icon: Factory, title: "Factories", desc: "Production tracking and resource planning." },
  { icon: Warehouse, title: "Warehouses", desc: "Stock movements, picking, and logistics visibility." },
  { icon: HardHat, title: "Construction", desc: "Project tracking, budgets, and site reporting." },
  { icon: Calculator, title: "Accounting", desc: "Invoicing, expenses, and financial reporting." },
];

export function SolutionsByIndustry() {
  return (
    <section className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          eyebrow="Solutions By Industry"
          title="Software built around how your industry works"
          description="Every business has different workflows — the software should match them, not the other way around."
        />

        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {INDUSTRIES.map((item, i) => (
            <AnimatedCard key={item.title} delay={(i % 4) * 0.05}>
              <div className="flex size-10 items-center justify-center rounded-lg bg-accent-soft text-accent">
                <item.icon className="size-4.5" />
              </div>
              <h3 className="mt-4 text-sm font-medium text-foreground">
                {item.title}
              </h3>
              <p className="mt-1.5 text-xs text-muted leading-relaxed">
                {item.desc}
              </p>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  );
}
