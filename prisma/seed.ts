/**
 * One-time migration: loads the existing static project/blog/about data
 * into the database, and creates your admin login.
 *
 * Run with: npx prisma db seed
 * (after `npx prisma migrate dev`)
 *
 */
import "dotenv/config";
import { PrismaClient, type Prisma } from "@/lib/generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";
import { PROJECTS } from "../lib/projects-data";
import { BLOG_POSTS } from "../lib/blog-data";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  // ── Admin user ────────────────────────────────────────────────
  const adminEmail = process.env.ADMIN_EMAIL ?? "mohamedmrslan@gmail.com";
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    console.warn(
      "⚠️  No ADMIN_PASSWORD env var set — skipping admin user creation.\n" +
        "   Set ADMIN_EMAIL and ADMIN_PASSWORD in your .env and re-run the seed.",
    );
  } else {
    const passwordHash = await bcrypt.hash(adminPassword, 12);
    await prisma.adminUser.upsert({
      where: { email: adminEmail },
      update: { passwordHash },
      create: { email: adminEmail, passwordHash },
    });
    console.log(`✅ Admin user ready: ${adminEmail}`);
  }

  // ── Projects ──────────────────────────────────────────────────
  for (const [index, p] of PROJECTS.entries()) {
    await prisma.project.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        slug: p.slug,
        order: index,
        type: p.type,
        published: true,
        title: p.title,
        tagline: p.tagline,
        overview: p.overview,
        problem: p.problem,
        solution: p.solution,
        features: p.features,
        architecture: p.architecture,
        challenges: p.challenges,
        lessonsLearned: p.lessonsLearned,
        titleAr: p.ar.title,
        taglineAr: p.ar.tagline,
        overviewAr: p.ar.overview,
        problemAr: p.ar.problem,
        solutionAr: p.ar.solution,
        featuresAr: p.ar.features,
        architectureAr: p.ar.architecture,
        challengesAr: p.ar.challenges,
        lessonsLearnedAr: p.ar.lessonsLearned,
        techStack: p.techStack,
        githubUrl: p.githubUrl,
        backendGithubUrl: p.backendGithubUrl ?? null,
        liveUrl: p.liveUrl || null,
        relatedSlugs: p.relatedSlugs,
        metrics: p.metrics as unknown as Prisma.InputJsonValue,
        images: p.images,
      },
    });
  }
  console.log(`✅ Seeded ${PROJECTS.length} projects`);

  // ── Blog posts (none published yet, but structure is ready) ────
  for (const post of BLOG_POSTS) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: {},
      create: {
        slug: post.slug,
        title: post.title,
        titleAr: post.titleAr,
        excerpt: post.excerpt,
        excerptAr: post.excerptAr,
        content: post.content,
        contentAr: post.contentAr,
        readingTime: post.readingTime,
        published: true,
        publishedAt: new Date(post.date),
      },
    });
  }
  console.log(`✅ Seeded ${BLOG_POSTS.length} blog posts`);

  // ── About content ────────────────────────────────────────────
  await prisma.aboutContent.upsert({
    where: { id: "singleton" },
    update: {},
    create: {
      id: "singleton",
      intro:
        "I'm Mohamed Shehata, a full-stack developer focused on building production-grade business systems — ERPs, clinic platforms, and e-commerce stores — with clean architecture and bilingual, RTL-ready interfaces.",
      introAr:
        "أنا محمد شحاتة، مطور فُل ستاك بركز على بناء أنظمة أعمال بمستوى إنتاجي — ERPs، منصات عيادات، ومتاجر إلكترونية — بمعمارية نظيفة وواجهات ثنائية اللغة جاهزة لـ RTL.",
      approach:
        "I favor strict layered architecture, typed contracts end-to-end, and building only what's actually required — no over-engineering, no wasted effort.",
      approachAr:
        "بفضّل معمارية طبقات صارمة، عقود typed من الألف للياء، وبني اللي مطلوب بالظبط بس — من غير هندسة زايدة أو وقت ضايع.",
      journey: [
        {
          title: "Backend Foundations",
          description:
            "Started building REST APIs with Node.js and NestJS, focusing on clean, modular architecture and database design with PostgreSQL and MongoDB.",
        },
        {
          title: "Full-Stack Systems",
          description:
            "Expanded into full-stack delivery with Next.js and React, shipping bilingual ERP and e-commerce platforms end-to-end for real businesses.",
        },
        {
          title: "Production-Grade Practices",
          description:
            "Adopted defense-in-depth security, caching strategies, and transaction-safe operations as standard practice across every project.",
        },
      ],
      journeyAr: [
        {
          title: "أساسيات الباكند",
          description:
            "بدأت ببناء REST APIs بـ Node.js وNestJS، مع تركيز على معمارية نظيفة ومعيارية وتصميم قواعد بيانات بـ PostgreSQL وMongoDB.",
        },
        {
          title: "أنظمة فُل ستاك",
          description:
            "توسعت لتسليم فُل ستاك كامل بـ Next.js وReact، وبنيت منصات ERP ومتاجر إلكترونية ثنائية اللغة من الألف للياء لشركات حقيقية.",
        },
        {
          title: "ممارسات إنتاجية",
          description:
            "تبنيت أمان متعدد الطبقات واستراتيجيات كاش وعمليات آمنة بالـ transactions كممارسة أساسية في كل مشروع.",
        },
      ],
    },
  });
  console.log("✅ Seeded about content");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
