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

// Sample content used only for local testing — lets you exercise the blog,
// testimonials, and newsletter pages end-to-end without writing real posts
// or waiting for real signups/reviews.
const TEST_BLOG_POSTS = [
  {
    slug: "why-i-chose-nestjs-for-erp-lite",
    title: "Why I Chose NestJS for ERP-Lite",
    titleAr: "ليه اخترت NestJS لمشروع ERP-Lite",
    excerpt:
      "A look at the architectural decisions behind building a modular, testable backend for a multi-tenant ERP system.",
    excerptAr:
      "نظرة على القرارات المعمارية اللي بنيت عليها باكند معياري وقابل للاختبار لنظام ERP متعدد المستأجرين.",
    content:
      "# Why NestJS\n\nWhen starting ERP-Lite, I needed a backend framework that enforced structure at scale — modules, dependency injection, and a clear separation between controllers, services, and data access. NestJS's decorator-based architecture and first-class TypeScript support made that possible from day one.\n\n## Key wins\n\n- Guards and interceptors for RBAC and audit logging\n- Native support for DTOs and validation pipes\n- Easy integration with Prisma for type-safe queries\n\nThis is placeholder test content for local QA of the blog rendering pipeline.",
    contentAr:
      "# ليه NestJS\n\nلما بدأت ERP-Lite، كنت محتاج فريموورك باكند يفرض بنية واضحة على مستوى كبير — modules وdependency injection وفصل واضح بين الـ controllers والـ services وطبقة الداتا. معمارية NestJS المبنية على decorators ودعمها الكامل لـ TypeScript خلت ده ممكن من أول يوم.\n\n## أهم المميزات\n\n- Guards وinterceptors لـ RBAC وaudit logging\n- دعم أصلي لـ DTOs وvalidation pipes\n- تكامل سهل مع Prisma لاستعلامات آمنة النوع\n\nده محتوى تجريبي لاختبار عرض المدونة محليًا.",
    readingTime: "4 min read",
    date: "2026-06-20",
  },
  {
    slug: "bilingual-ui-lessons-from-clinic-cms",
    title: "Bilingual UI Lessons from Building a Clinic CMS",
    titleAr: "دروس في واجهات ثنائية اللغة من بناء نظام إدارة عيادات",
    excerpt:
      "RTL layouts, locale-aware routing, and the small details that make an Arabic/English product feel native in both directions.",
    excerptAr:
      "تخطيطات RTL، توجيه واعٍ للغة، والتفاصيل الصغيرة اللي بتخلي منتج عربي/إنجليزي يحس طبيعي في الاتجاهين.",
    content:
      "# Bilingual by default\n\nBuilding the clinic management system taught me that RTL support isn't just flipping `direction: rtl` — it's rethinking spacing, icon mirroring, and date formatting per locale.\n\nThis is placeholder test content for local QA of the blog rendering pipeline.",
    contentAr:
      "# ثنائي اللغة بشكل أساسي\n\nبناء نظام إدارة العيادات علمني إن دعم RTL مش مجرد `direction: rtl` — ده إعادة تفكير في المسافات، وعكس الأيقونات، وتنسيق التواريخ حسب اللغة.\n\nده محتوى تجريبي لاختبار عرض المدونة محليًا.",
    readingTime: "3 min read",
    date: "2026-07-01",
  },
];

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

  // ── Blog posts (real ones from lib/blog-data + test posts for local QA) ─
  const allBlogPosts = [...BLOG_POSTS, ...TEST_BLOG_POSTS];
  for (const post of allBlogPosts) {
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
  console.log(`✅ Seeded ${allBlogPosts.length} blog posts`);

  // ── Testimonials (test data for local QA) ───────────────────────
  const TEST_TESTIMONIALS = [
    {
      name: "Ahmed Nabil",
      role: "Founder, Nabil Trading Co.",
      quote:
        "Mohamed delivered our ERP system ahead of schedule and handled every edge case we threw at him. Communication was clear throughout.",
      rating: 5,
      order: 0,
    },
    {
      name: "Sara El-Sayed",
      role: "Clinic Operations Manager",
      quote:
        "The clinic management platform transformed how our front desk works. Bilingual support and the prescription printing feature were exactly what we needed.",
      rating: 5,
      order: 1,
    },
    {
      name: "Youssef Adel",
      role: "CTO, RetailStack",
      quote:
        "Solid backend architecture and clean code. Mohamed clearly thinks about maintainability, not just getting features shipped.",
      rating: 4,
      order: 2,
    },
  ];
  for (const t of TEST_TESTIMONIALS) {
    const existing = await prisma.testimonial.findFirst({
      where: { name: t.name },
    });
    if (!existing) {
      await prisma.testimonial.create({ data: t });
    }
  }
  console.log(`✅ Seeded ${TEST_TESTIMONIALS.length} testimonials`);

  // ── Newsletter subscribers (test data for local QA) ─────────────
  const TEST_SUBSCRIBERS = [
    "test.subscriber1@example.com",
    "test.subscriber2@example.com",
    "test.subscriber3@example.com",
  ];
  for (const email of TEST_SUBSCRIBERS) {
    await prisma.newsletterSubscriber.upsert({
      where: { email },
      update: {},
      create: { email },
    });
  }
  console.log(`✅ Seeded ${TEST_SUBSCRIBERS.length} newsletter subscribers`);

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
