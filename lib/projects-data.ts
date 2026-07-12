export interface Project {
  slug: string;
  title: string;
  type: "Full Stack" | "Backend";
  tagline: string;
  overview: string;
  problem: string;
  solution: string;
  features: string[];
  techStack: string[];
  architecture: string;
  challenges: string;
  lessonsLearned: string;
  githubUrl: string;
  liveUrl: string;
  relatedSlugs: string[];
}

export const PROJECTS: Project[] = [
  {
    slug: "erp-lite",
    title: "ERP Lite",
    type: "Full Stack",
    tagline: "A lightweight ERP for suppliers, orders, and stock in one place.",
    overview:
      "ERP Lite is a full-stack resource planning system covering purchasing, sales, inventory, and reporting for small-to-mid size businesses that have outgrown spreadsheets.",
    problem:
      "The client managed suppliers, purchase orders, and stock levels across disconnected spreadsheets, causing stock discrepancies and slow reporting.",
    solution:
      "Built a unified NestJS + Next.js system with a single source of truth for inventory, RBAC-gated modules per department, and automated stock movement logging.",
    features: [
      "Supplier & purchase order management",
      "Sales orders with payment tracking",
      "Real-time stock movement logging",
      "Role-based dashboard per department",
      "Full data export (PDF / Excel)",
      "Audit log for every critical action",
    ],
    techStack: ["Next.js", "NestJS", "TypeScript", "PostgreSQL", "Prisma", "Redis"],
    architecture:
      "Next.js frontend communicates with a modular NestJS API following a Repository/Service/Controller pattern. Prisma manages PostgreSQL access, with an in-memory TTL cache layer reducing repeated read load on dashboard endpoints.",
    challenges:
      "Keeping stock movement and audit logs consistent under concurrent writes required wrapping critical operations in database transactions and carefully scoping the cache invalidation strategy.",
    lessonsLearned:
      "Investing early in a shared pagination utility and consistent module structure paid off significantly once the number of resources grew past a dozen.",
    githubUrl: "https://github.com",
    liveUrl: "#",
    relatedSlugs: ["inventory-management", "crm-platform"],
  },
  {
    slug: "crm-platform",
    title: "CRM Platform",
    type: "Full Stack",
    tagline: "Pipeline, leads, and customer activity — all in one dashboard.",
    overview:
      "A CRM platform built for small sales teams to track leads through a visual pipeline, log customer activity, and report on conversion performance.",
    problem:
      "The client's sales team was tracking leads in shared spreadsheets with no visibility into pipeline stages or follow-up history.",
    solution:
      "Delivered a drag-and-drop pipeline board, activity timeline per customer, and automated follow-up reminders, backed by a clean REST API.",
    features: [
      "Drag-and-drop sales pipeline",
      "Customer activity timeline",
      "Follow-up reminders & notifications",
      "Team performance reporting",
      "Role-based access per sales rep",
    ],
    techStack: ["Next.js", "NestJS", "TypeScript", "PostgreSQL", "Prisma"],
    architecture:
      "A Next.js frontend renders the pipeline board client-side for smooth drag-and-drop, while a NestJS backend exposes REST endpoints with RBAC guards protecting sensitive customer data.",
    challenges:
      "Synchronizing optimistic UI updates on the pipeline board with the backend's actual persisted state without causing flicker or data loss on failed requests.",
    lessonsLearned:
      "Optimistic updates need a clear rollback strategy from day one — retrofitting it later is far more error-prone.",
    githubUrl: "https://github.com",
    liveUrl: "#",
    relatedSlugs: ["erp-lite", "booking-platform"],
  },
  {
    slug: "inventory-management",
    title: "Inventory Management",
    type: "Backend",
    tagline: "A REST API for real-time stock tracking across multiple branches.",
    overview:
      "A backend-only inventory system exposing a REST API for stock levels, movements, and low-stock alerts across multiple warehouse branches.",
    problem:
      "A retail client with multiple branches had no unified way to see stock levels across locations, leading to overselling and delayed restocking.",
    solution:
      "Built a NestJS API with per-branch stock tracking, movement history, and threshold-based low-stock alerts consumable by any frontend or POS system.",
    features: [
      "Multi-branch stock tracking",
      "Stock movement history & audit trail",
      "Low-stock threshold alerts",
      "Bulk import/export endpoints",
      "API key based access for POS integration",
    ],
    techStack: ["NestJS", "TypeScript", "PostgreSQL", "Prisma", "Redis"],
    architecture:
      "A pure REST API following Repository/Service/Controller pattern, with Redis used for caching frequently-read stock summaries and a queue for processing bulk imports asynchronously.",
    challenges:
      "Designing stock movement records that stayed accurate under concurrent updates from multiple branches required careful use of database-level locking.",
    lessonsLearned:
      "A backend-only, well-documented API made it trivial to plug in a POS frontend later without touching core business logic.",
    githubUrl: "https://github.com",
    liveUrl: "#",
    relatedSlugs: ["erp-lite", "security-scanner-saas"],
  },
  {
    slug: "security-scanner-saas",
    title: "Security Scanner SaaS",
    type: "Backend",
    tagline: "A multi-tenant API for scheduling and reporting security scans.",
    overview:
      "A backend service that lets teams register domains, schedule automated security scans, and receive structured vulnerability reports via API.",
    problem:
      "Security teams needed a way to schedule recurring scans and centralize findings without relying on manual, ad-hoc tool runs.",
    solution:
      "Built a multi-tenant NestJS backend with scheduled scan jobs, a findings database, and webhook notifications when new vulnerabilities are detected.",
    features: [
      "Multi-tenant workspace isolation",
      "Scheduled recurring scans",
      "Structured vulnerability reporting",
      "Webhook notifications",
      "API-first design for CI/CD integration",
    ],
    techStack: ["NestJS", "TypeScript", "PostgreSQL", "Prisma", "Redis"],
    architecture:
      "A job queue (Redis-backed) triggers scheduled scans, with results persisted per-tenant and exposed through a scoped REST API protected by API keys and RBAC.",
    challenges:
      "Ensuring strict tenant data isolation while keeping shared scan-worker infrastructure efficient was the core architectural challenge.",
    lessonsLearned:
      "Designing the tenant-scoping logic at the database query layer from day one avoided an entire class of data-leak bugs later on.",
    githubUrl: "https://github.com",
    liveUrl: "#",
    relatedSlugs: ["inventory-management", "restaurant-pos"],
  },
  {
    slug: "restaurant-pos",
    title: "Restaurant POS",
    type: "Full Stack",
    tagline: "Fast checkout and kitchen order flow for restaurants.",
    overview:
      "A point-of-sale system for restaurants covering table orders, kitchen display flow, and end-of-day sales reporting.",
    problem:
      "The client's restaurant relied on paper tickets between waitstaff and the kitchen, causing delays and order mistakes during peak hours.",
    solution:
      "Built a fast, touch-friendly POS with real-time order sync to a kitchen display screen, plus daily sales and item-performance reports.",
    features: [
      "Table & order management",
      "Real-time kitchen display sync",
      "Menu, addons, and sizes support",
      "End-of-day sales reporting",
      "Offline-tolerant order queue",
    ],
    techStack: ["Next.js", "NestJS", "TypeScript", "PostgreSQL", "Prisma"],
    architecture:
      "The POS frontend and kitchen display both connect via WebSockets to a NestJS backend, ensuring near-instant order sync without polling.",
    challenges:
      "Handling brief connectivity drops during peak hours without losing orders required a local queue that syncs once the connection is restored.",
    lessonsLearned:
      "Designing for network flakiness from the start, rather than assuming a stable connection, made the system dramatically more reliable in real restaurant conditions.",
    githubUrl: "https://github.com",
    liveUrl: "#",
    relatedSlugs: ["booking-platform", "crm-platform"],
  },
  {
    slug: "booking-platform",
    title: "Booking Platform",
    type: "Full Stack",
    tagline: "Appointment scheduling with zero double-booking.",
    overview:
      "A booking and consultation platform allowing clients to schedule appointments online while staff manage availability from an admin dashboard.",
    problem:
      "The client handled bookings over phone calls and messages, resulting in frequent double-bookings and no central calendar view.",
    solution:
      "Delivered a public booking flow with live availability, an admin calendar dashboard, and automated confirmation/reminder notifications.",
    features: [
      "Public booking flow with live availability",
      "Admin calendar & staff scheduling",
      "Automated email/SMS reminders",
      "Cancellation & rescheduling flow",
      "Booking analytics dashboard",
    ],
    techStack: ["Next.js", "NestJS", "TypeScript", "PostgreSQL", "Prisma"],
    architecture:
      "Availability checks run through a NestJS service enforcing atomic slot-locking to prevent race conditions, with a Next.js frontend for both the public booking flow and the admin dashboard.",
    challenges:
      "Preventing double-booking under simultaneous requests required transactional slot-locking rather than a simple availability check-then-write.",
    lessonsLearned:
      "Treating booking slots as a resource to be locked, not just data to be validated, eliminated the double-booking bug class entirely.",
    githubUrl: "https://github.com",
    liveUrl: "#",
    relatedSlugs: ["crm-platform", "restaurant-pos"],
  },
];

export function getProjectBySlug(slug: string) {
  return PROJECTS.find((p) => p.slug === slug);
}
