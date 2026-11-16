import "dotenv/config";
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { PrismaClient } from "../lib/generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";

interface ProjectMeta {
  slug: string;
  title: string;
  titleAr: string;
  type: string;
  tagline: string;
  techStack: string[];
  theme: {
    accent: string;
    accentGlow: string;
    secondary: string;
    iconSvg: string;
    badgeText: string;
    metricsLabels: [string, string, string];
    metricsValues: [string, string, string];
  };
}

const THEMES: Record<string, ProjectMeta["theme"]> = {
  "erp-lite": {
    accent: "#10b981",
    accentGlow: "rgba(16, 185, 129, 0.25)",
    secondary: "#06b6d4",
    badgeText: "Enterprise Resource Planning",
    metricsLabels: ["Modules", "Security", "Architecture"],
    metricsValues: ["14+", "JWT / RBAC", "Clean Layered"],
    iconSvg: `
      <rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" stroke-width="2" fill="none"/>
      <path d="M8 21h8M12 17v4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M7 8h10M7 12h5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    `,
  },
  "clinic-cms": {
    accent: "#06b6d4",
    accentGlow: "rgba(6, 182, 212, 0.25)",
    secondary: "#3b82f6",
    badgeText: "Multi-tenant SaaS Clinic Management",
    metricsLabels: ["Architecture", "Queue Engine", "Localization"],
    metricsValues: ["NestJS + Next.js", "7-State Machine", "Bilingual RTL"],
    iconSvg: `
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    `,
  },
  "premium-ecommerce-store": {
    accent: "#8b5cf6",
    accentGlow: "rgba(139, 92, 246, 0.25)",
    secondary: "#ec4899",
    badgeText: "Modern E-Commerce with WhatsApp Checkout",
    metricsLabels: ["Checkout", "Frontend", "Catalog"],
    metricsValues: ["WhatsApp Fast", "Next.js 16 + Tailwind", "Dynamic Filter"],
    iconSvg: `
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" stroke="currentColor" stroke-width="2" fill="none"/>
      <path d="M3 6h18M16 10a4 4 0 0 1-8 0" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    `,
  },
  "courses-platform": {
    accent: "#3b82f6",
    accentGlow: "rgba(59, 130, 246, 0.25)",
    secondary: "#6366f1",
    badgeText: "Scalable E-Learning Platform Backend",
    metricsLabels: ["Database", "Cache", "Containers"],
    metricsValues: ["Postgres + Mongo", "Redis Caching", "Docker Ready"],
    iconSvg: `
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" stroke="currentColor" stroke-width="2" fill="none"/>
      <path d="M6 6h10M6 10h10M6 14h6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    `,
  },
  "booking-platform": {
    accent: "#14b8a6",
    accentGlow: "rgba(20, 184, 166, 0.25)",
    secondary: "#10b981",
    badgeText: "Consultation & Expert Booking Engine",
    metricsLabels: ["Framework", "Booking Logic", "Performance"],
    metricsValues: ["NestJS Modular", "Slot Reservation", "Sub-50ms Response"],
    iconSvg: `
      <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" stroke-width="2" fill="none"/>
      <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    `,
  },
  "aqdam": {
    accent: "#0284c7",
    accentGlow: "rgba(2, 132, 199, 0.25)",
    secondary: "#38bdf8",
    badgeText: "Social Job & Professional Career Platform",
    metricsLabels: ["Platform", "Data Store", "Social Feed"],
    metricsValues: ["LinkedIn Style", "PostgreSQL + Redis", "Real-time Connect"],
    iconSvg: `
      <rect x="2" y="7" width="20" height="14" rx="2" stroke="currentColor" stroke-width="2" fill="none"/>
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" stroke="currentColor" stroke-width="2"/>
    `,
  },
  "bitx-marathon": {
    accent: "#f59e0b",
    accentGlow: "rgba(245, 158, 11, 0.25)",
    secondary: "#ef4444",
    badgeText: "Competitive Programming Contest Platform",
    metricsLabels: ["Event Scale", "Speed", "Storage"],
    metricsValues: ["50+ Teams Launch", "Real-time Score", "MongoDB Engine"],
    iconSvg: `
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    `,
  },
  default: {
    accent: "#6366f1",
    accentGlow: "rgba(99, 102, 241, 0.25)",
    secondary: "#8b5cf6",
    badgeText: "Full-Stack & Backend Architecture",
    metricsLabels: ["Code", "Database", "Design"],
    metricsValues: ["TypeScript", "PostgreSQL", "Clean Architecture"],
    iconSvg: `
      <polyline points="16 18 22 12 16 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      <polyline points="8 6 2 12 8 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    `,
  },
};

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function generateSvg(meta: ProjectMeta): string {
  const { title, titleAr, type, tagline, techStack, theme } = meta;
  const pills = techStack.slice(0, 5);

  return `<svg width="1200" height="675" viewBox="0 0 1200 675" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Background Gradients -->
    <linearGradient id="bg-grad" x1="0" y1="0" x2="1200" y2="675" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#0a0e17"/>
      <stop offset="50%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#020617"/>
    </linearGradient>

    <!-- Accent Radial Glow -->
    <radialGradient id="accent-glow" cx="80%" cy="30%" r="50%" fx="80%" fy="30%" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="${theme.accent}" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="${theme.accent}" stop-opacity="0"/>
    </radialGradient>

    <radialGradient id="secondary-glow" cx="20%" cy="80%" r="40%" fx="20%" fy="80%" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="${theme.secondary}" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="${theme.secondary}" stop-opacity="0"/>
    </radialGradient>

    <!-- Card Gradient -->
    <linearGradient id="card-grad" x1="0" y1="0" x2="0" y2="1" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#1e293b" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#0f172a" stop-opacity="0.8"/>
    </linearGradient>

    <!-- Text Accent Gradient -->
    <linearGradient id="text-accent" x1="0" y1="0" x2="1" y2="0" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="${theme.accent}"/>
    </linearGradient>

    <!-- Grid Pattern -->
    <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.03)" stroke-width="1"/>
    </pattern>
  </defs>

  <!-- Base Canvas -->
  <rect width="1200" height="675" fill="url(#bg-grad)"/>
  <rect width="1200" height="675" fill="url(#grid-pattern)"/>
  <rect width="1200" height="675" fill="url(#accent-glow)"/>
  <rect width="1200" height="675" fill="url(#secondary-glow)"/>

  <!-- Outer Glass Frame -->
  <g transform="translate(60, 50)">
    <!-- Backdrop Blur container -->
    <rect width="1080" height="575" rx="20" fill="url(#card-grad)" stroke="rgba(255, 255, 255, 0.08)" stroke-width="1.5"/>

    <!-- Window Header -->
    <path d="M 0 20 C 0 8.954 8.954 0 20 0 L 1060 0 C 1071.046 0 1080 8.954 1080 20 L 1080 56 L 0 56 Z" fill="rgba(15, 23, 42, 0.7)"/>
    <line x1="0" y1="56" x2="1080" y2="56" stroke="rgba(255, 255, 255, 0.08)" stroke-width="1"/>

    <!-- Window Dots -->
    <circle cx="32" cy="28" r="6" fill="#ff5f56"/>
    <circle cx="52" cy="28" r="6" fill="#ffbd2e"/>
    <circle cx="72" cy="28" r="6" fill="#27c93f"/>

    <!-- Window Header Title -->
    <text x="540" y="34" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="500" fill="#94a3b8" text-anchor="middle" letter-spacing="1">
      ${escapeXml(meta.slug)} • ${escapeXml(theme.badgeText)}
    </text>

    <!-- Project Type Tag -->
    <g transform="translate(950, 16)">
      <rect width="100" height="24" rx="12" fill="${theme.accent}15" stroke="${theme.accent}40" stroke-width="1"/>
      <text x="50" y="16" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="600" fill="${theme.accent}" text-anchor="middle">
        ${escapeXml(type)}
      </text>
    </g>

    <!-- Main Content Area -->
    <!-- Left Column: Information -->
    <g transform="translate(60, 100)">
      <!-- Domain Category Icon -->
      <g transform="translate(0, 0)" color="${theme.accent}">
        <rect width="52" height="52" rx="14" fill="${theme.accent}20" stroke="${theme.accent}50" stroke-width="1.5"/>
        <g transform="translate(14, 14)">
          ${theme.iconSvg}
        </g>
      </g>

      <!-- Project Titles -->
      <text x="0" y="105" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="44" font-weight="800" fill="url(#text-accent)" letter-spacing="-1">
        ${escapeXml(title)}
      </text>

      <text x="0" y="145" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="22" font-weight="600" fill="#94a3b8">
        ${escapeXml(titleAr)}
      </text>

      <!-- Tagline -->
      <text x="0" y="185" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="400" fill="#cbd5e1" width="520">
        ${escapeXml(tagline.length > 70 ? tagline.slice(0, 67) + "..." : tagline)}
      </text>

      <!-- Tech Stack Badges -->
      <g transform="translate(0, 235)">
        ${pills
          .map((tech, i) => {
            const xOffset = i * 115;
            return `
            <g transform="translate(${xOffset}, 0)">
              <rect width="105" height="32" rx="8" fill="#1e293b" stroke="rgba(255, 255, 255, 0.1)" stroke-width="1"/>
              <text x="52" y="21" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="500" fill="#e2e8f0" text-anchor="middle">
                ${escapeXml(tech)}
              </text>
            </g>`;
          })
          .join("")}
      </g>

      <!-- Metrics / Architectural Highlights Strip -->
      <g transform="translate(0, 310)">
        <rect width="575" height="90" rx="12" fill="rgba(15, 23, 42, 0.6)" stroke="rgba(255, 255, 255, 0.06)" stroke-width="1"/>

        <!-- Stat 1 -->
        <g transform="translate(30, 26)">
          <text x="0" y="0" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="500" fill="#64748b" text-transform="uppercase">
            ${escapeXml(theme.metricsLabels[0])}
          </text>
          <text x="0" y="28" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="700" fill="${theme.accent}">
            ${escapeXml(theme.metricsValues[0])}
          </text>
        </g>

        <!-- Divider 1 -->
        <line x1="210" y1="20" x2="210" y2="70" stroke="rgba(255, 255, 255, 0.08)" stroke-width="1"/>

        <!-- Stat 2 -->
        <g transform="translate(235, 26)">
          <text x="0" y="0" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="500" fill="#64748b" text-transform="uppercase">
            ${escapeXml(theme.metricsLabels[1])}
          </text>
          <text x="0" y="28" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="700" fill="#f8fafc">
            ${escapeXml(theme.metricsValues[1])}
          </text>
        </g>

        <!-- Divider 2 -->
        <line x1="395" y1="20" x2="395" y2="70" stroke="rgba(255, 255, 255, 0.08)" stroke-width="1"/>

        <!-- Stat 3 -->
        <g transform="translate(420, 26)">
          <text x="0" y="0" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="500" fill="#64748b" text-transform="uppercase">
            ${escapeXml(theme.metricsLabels[2])}
          </text>
          <text x="0" y="28" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="700" fill="#f8fafc">
            ${escapeXml(theme.metricsValues[2])}
          </text>
        </g>
      </g>
    </g>

    <!-- Right Column: Visual Architecture Blueprint Representation -->
    <g transform="translate(680, 100)">
      <rect width="340" height="400" rx="16" fill="rgba(15, 23, 42, 0.8)" stroke="${theme.accent}30" stroke-width="1"/>

      <!-- Blueprint Header -->
      <rect width="340" height="42" rx="16" fill="${theme.accent}10"/>
      <text x="24" y="26" font-family="monospace" font-size="13" font-weight="600" fill="${theme.accent}">
        SYSTEM ARCHITECTURE
      </text>

      <!-- Terminal / Diagram Node Simulation -->
      <g transform="translate(24, 65)">
        <!-- Node 1: Client Layer -->
        <rect width="292" height="52" rx="8" fill="#1e293b" stroke="rgba(255, 255, 255, 0.08)" stroke-width="1"/>
        <circle cx="20" cy="26" r="4" fill="${theme.accent}"/>
        <text x="35" y="24" font-family="monospace" font-size="12" font-weight="600" fill="#f1f5f9">Client / UI Layer</text>
        <text x="35" y="40" font-family="monospace" font-size="11" fill="#94a3b8">Bilingual • RTL • SSR / React 19</text>

        <!-- Connector Line -->
        <line x1="146" y1="52" x2="146" y2="76" stroke="${theme.accent}" stroke-width="1.5" stroke-dasharray="3 3"/>

        <!-- Node 2: Core API / Service -->
        <g transform="translate(0, 76)">
          <rect width="292" height="64" rx="8" fill="#1e293b" stroke="${theme.accent}50" stroke-width="1.5"/>
          <circle cx="20" cy="26" r="4" fill="${theme.accent}"/>
          <text x="35" y="24" font-family="monospace" font-size="12" font-weight="600" fill="#f1f5f9">Backend API &amp; Services</text>
          <text x="35" y="40" font-family="monospace" font-size="11" fill="#94a3b8">Controllers • Guards • Domain Modules</text>
          <text x="35" y="54" font-family="monospace" font-size="10" fill="${theme.accent}">RBAC &amp; Rate Limiting Enforced</text>
        </g>

        <!-- Connector Line -->
        <line x1="146" y1="140" x2="146" y2="164" stroke="${theme.accent}" stroke-width="1.5" stroke-dasharray="3 3"/>

        <!-- Node 3: Data & Storage Layer -->
        <g transform="translate(0, 164)">
          <rect width="292" height="56" rx="8" fill="#1e293b" stroke="rgba(255, 255, 255, 0.08)" stroke-width="1"/>
          <circle cx="20" cy="26" r="4" fill="${theme.secondary}"/>
          <text x="35" y="24" font-family="monospace" font-size="12" font-weight="600" fill="#f1f5f9">Persistence &amp; Cache Layer</text>
          <text x="35" y="42" font-family="monospace" font-size="11" fill="#94a3b8">PostgreSQL • Prisma ORM • Redis Cache</text>
        </g>

        <!-- Node 4: Status Indicator -->
        <g transform="translate(0, 245)">
          <rect width="292" height="42" rx="8" fill="${theme.accent}12" stroke="${theme.accent}30" stroke-width="1"/>
          <circle cx="20" cy="21" r="5" fill="${theme.accent}">
            <animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite"/>
          </circle>
          <text x="36" y="25" font-family="monospace" font-size="11" font-weight="600" fill="${theme.accent}">
            Production Architecture Ready
          </text>
        </g>
      </g>
    </g>
  </g>

  <!-- Watermark Footer -->
  <text x="1140" y="645" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="500" fill="#475569" text-anchor="end">
    Mohamed Shehata • Developer Portfolio
  </text>
</svg>`;
}

async function main() {
  const outputDir = path.resolve(process.cwd(), "public", "images", "projects");
  await fs.mkdir(outputDir, { recursive: true });

  console.log("🚀 Connecting to database to fetch all projects...");
  let projects: Array<{
    slug: string;
    title: string;
    titleAr: string;
    type: string;
    tagline: string;
    techStack: string[];
  }> = [];

  try {
    const connectionString = process.env.DATABASE_URL;
    if (connectionString) {
      const adapter = new PrismaPg({ connectionString });
      const prisma = new PrismaClient({ adapter });
      const rows = await prisma.project.findMany({
        select: {
          slug: true,
          title: true,
          titleAr: true,
          type: true,
          tagline: true,
          techStack: true,
        },
      });
      await prisma.$disconnect();
      projects = rows.map((r) => ({
        slug: r.slug,
        title: r.title,
        titleAr: r.titleAr,
        type: r.type,
        tagline: r.tagline,
        techStack: Array.isArray(r.techStack) ? (r.techStack as string[]) : [],
      }));
    }
  } catch (err) {
    console.warn("⚠️ Could not read from database directly, using fallback list:", err);
  }

  // Ensure default exists even if DB empty
  const defaultMeta: ProjectMeta = {
    slug: "default",
    title: "Project Showcase",
    titleAr: "معرض المشاريع",
    type: "Full Stack",
    tagline: "Production-grade system built with clean architecture and modern practices.",
    techStack: ["Next.js", "NestJS", "TypeScript", "PostgreSQL", "Tailwind CSS"],
    theme: THEMES.default,
  };

  const projectMetas: ProjectMeta[] = projects.map((p) => ({
    slug: p.slug,
    title: p.title,
    titleAr: p.titleAr,
    type: p.type,
    tagline: p.tagline,
    techStack: p.techStack,
    theme: THEMES[p.slug] || THEMES.default,
  }));

  // Add default image as well
  projectMetas.push(defaultMeta);

  console.log(`🖼️  Generating ${projectMetas.length} high-resolution cover images...`);

  for (const meta of projectMetas) {
    const svg = generateSvg(meta);
    const pngPath = path.join(outputDir, `${meta.slug}.png`);
    const svgPath = path.join(outputDir, `${meta.slug}.svg`);

    // Save SVG source
    await fs.writeFile(svgPath, svg, "utf-8");

    // Convert SVG to crisp PNG (1200x675)
    await sharp(Buffer.from(svg))
      .png({ quality: 95, compressionLevel: 8 })
      .toFile(pngPath);

    console.log(`✅ Generated: /images/projects/${meta.slug}.png`);
  }

  console.log("\n🎉 All project default cover images generated successfully!");
}

main().catch((err) => {
  console.error("❌ Generation failed:", err);
  process.exit(1);
});
