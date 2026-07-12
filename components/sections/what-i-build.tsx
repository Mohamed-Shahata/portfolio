"use client";

import {
  Boxes,
  Users,
  ShoppingCart,
  Package,
  UserCog,
  LayoutDashboard,
  Cloud,
  CalendarCheck,
  Store,
  MonitorSmartphone,
  Plug,
  ShieldCheck,
  CreditCard,
  BarChart3,
  Sparkles,
} from "lucide-react";
import { SectionTitle } from "@/components/ui/section-title";
import { AnimatedCard } from "@/components/ui/animated-card";

const ITEMS = [
  { icon: Boxes, title: "ERP Systems", desc: "End-to-end resource planning tailored to how your business actually runs." },
  { icon: Users, title: "CRM Systems", desc: "Track leads, deals, and customer relationships in one place." },
  { icon: ShoppingCart, title: "POS Systems", desc: "Fast, reliable point-of-sale for retail and restaurants." },
  { icon: Package, title: "Inventory Management", desc: "Real-time stock tracking, movements, and low-stock alerts." },
  { icon: UserCog, title: "HR Systems", desc: "Employee records, attendance, payroll, and performance." },
  { icon: LayoutDashboard, title: "Admin Dashboards", desc: "Clean, data-rich dashboards to control every part of your business." },
  { icon: Cloud, title: "SaaS Platforms", desc: "Multi-tenant products built to scale from day one." },
  { icon: CalendarCheck, title: "Booking Systems", desc: "Appointment and reservation flows with zero double-booking." },
  { icon: Store, title: "E-commerce Platforms", desc: "Storefronts that convert, backed by solid architecture." },
  { icon: MonitorSmartphone, title: "Offline Desktop Apps", desc: "Full-featured apps that work with zero internet dependency." },
  { icon: Plug, title: "REST APIs", desc: "Well-documented, versioned APIs built for integrations." },
  { icon: ShieldCheck, title: "Authentication Systems", desc: "Secure JWT/session auth with RBAC and refresh rotation." },
  { icon: CreditCard, title: "Payment Integrations", desc: "Stripe, Paymob, and local gateways wired in safely." },
  { icon: BarChart3, title: "Analytics Dashboards", desc: "Turn raw data into decisions with clear visualizations." },
  { icon: Sparkles, title: "AI Integrations", desc: "Practical AI features that solve real business problems." },
];

export function WhatIBuild() {
  return (
    <section id="what-i-build" className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          eyebrow="What I Build"
          title="Systems built for real businesses"
          description="From internal tools to full-scale platforms, I build the software that runs your operations."
        />

        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((item, i) => (
            <AnimatedCard key={item.title} delay={(i % 3) * 0.05}>
              <div className="flex size-11 items-center justify-center rounded-xl bg-accent-soft text-accent transition-transform duration-300 group-hover:scale-110">
                <item.icon className="size-5" />
              </div>
              <h3 className="mt-4 text-base font-medium text-foreground">
                {item.title}
              </h3>
              <p className="mt-1.5 text-sm text-muted leading-relaxed">
                {item.desc}
              </p>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  );
}
