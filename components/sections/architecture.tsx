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
import {
  ArchitectureDiagram,
  type DiagramNode,
} from "@/components/ui/architecture-diagram";
import { useLocale } from "@/lib/i18n/locale-context";

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
  {
    icon: ShieldCheck,
    label: "RBAC Guard",
    sublabel: "Role-based access check",
  },
  { icon: Server, label: "Protected Resource", sublabel: "Request fulfilled" },
];

const DEPLOY_NODES: DiagramNode[] = [
  { icon: GitBranch, label: "Git Push", sublabel: "main branch" },
  { icon: Container, label: "CI Build", sublabel: "Lint, test, build" },
  { icon: CloudUpload, label: "Deploy", sublabel: "Vercel / EC2 / Docker" },
  { icon: Globe, label: "Live", sublabel: "Monitored production" },
];

export function Architecture() {
  const { t } = useLocale();

  return (
    <section className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          eyebrow={t.architecture.eyebrow}
          title={t.architecture.title}
          description={t.architecture.description}
        />

        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <ArchitectureDiagram
            title={t.architecture.diagrams[0]}
            nodes={STACK_NODES}
          />
          <ArchitectureDiagram
            title={t.architecture.diagrams[1]}
            nodes={AUTH_NODES}
          />
          <ArchitectureDiagram
            title={t.architecture.diagrams[2]}
            nodes={DEPLOY_NODES}
          />
        </div>
      </div>
    </section>
  );
}
