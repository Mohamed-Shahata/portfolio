"use client";

import {
  Layout,
  Server,
  Database,
  HardDrive,
  Zap,
  User,
  KeyRound,
  ShieldCheck,
  Cookie,
  GitBranch,
  Container,
  CloudUpload,
  Globe,
} from "lucide-react";
import { SectionTitle } from "@/components/ui/section-title";
import { ArchitectureDiagram, type DiagramNode } from "@/components/ui/architecture-diagram";

const STACK_NODES: DiagramNode[] = [
  { icon: Layout, label: "Next.js", sublabel: "Frontend & SSR" },
  { icon: Server, label: "NestJS", sublabel: "API layer" },
  { icon: HardDrive, label: "Prisma ORM", sublabel: "Type-safe data access" },
  { icon: Database, label: "PostgreSQL", sublabel: "Primary database" },
  { icon: Zap, label: "Redis", sublabel: "Caching & queues" },
];

const AUTH_NODES: DiagramNode[] = [
  { icon: User, label: "User Login", sublabel: "Email & password" },
  { icon: KeyRound, label: "JWT Issued", sublabel: "Access + refresh tokens" },
  { icon: Cookie, label: "httpOnly Cookie", sublabel: "Secure token storage" },
  { icon: ShieldCheck, label: "RBAC Guard", sublabel: "Role-based access check" },
  { icon: Server, label: "Protected Resource", sublabel: "Request fulfilled" },
];

const DEPLOY_NODES: DiagramNode[] = [
  { icon: GitBranch, label: "Git Push", sublabel: "main branch" },
  { icon: Container, label: "CI Build", sublabel: "Lint, test, build" },
  { icon: CloudUpload, label: "Deploy", sublabel: "Vercel / EC2 / Docker" },
  { icon: Globe, label: "Live", sublabel: "Monitored production" },
];

export function Architecture() {
  return (
    <section className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          eyebrow="Architecture"
          title="Built on proven, production-grade patterns"
          description="Every system I build follows the same reliable architecture principles."
        />

        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <ArchitectureDiagram title="Application Stack" nodes={STACK_NODES} />
          <ArchitectureDiagram title="Authentication Flow" nodes={AUTH_NODES} />
          <ArchitectureDiagram title="Deployment Flow" nodes={DEPLOY_NODES} />
        </div>
      </div>
    </section>
  );
}
