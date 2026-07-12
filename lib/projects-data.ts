export interface ProjectLocalizedFields {
  title: string;
  tagline: string;
  overview: string;
  problem: string;
  solution: string;
  features: string[];
  architecture: string;
  challenges: string;
  lessonsLearned: string;
}

export interface Project extends ProjectLocalizedFields {
  slug: string;
  type: "Full Stack" | "Backend";
  techStack: string[];
  githubUrl: string;
  liveUrl: string;
  relatedSlugs: string[];
  ar: ProjectLocalizedFields;
}

export const PROJECTS: Project[] = [
  {
    slug: "erp-lite",
    title: "ERP Lite",
    type: "Full Stack",
    tagline:
      "A production-style ERP covering the full procure-to-pay and order-to-cash cycle.",
    overview:
      "A multi-module ERP monorepo (NestJS 11 backend, Next.js 16 / React 19 frontend) covering Suppliers, Purchase Orders, Sales Orders, Customers, Products, Invoices, Payments, and Stock Movements — 14+ independently testable business modules.",
    problem:
      "Small-to-mid size businesses that outgrow spreadsheets need a single source of truth for purchasing, sales, and inventory without adopting an expensive, rigid ERP suite.",
    solution:
      "Built a strict layered backend architecture (controller/service/repository per domain module) on PostgreSQL with Prisma 7, with a bilingual (English/Arabic) RTL-ready frontend and role-based routing enforced at the Next.js middleware layer.",
    features: [
      "Full procure-to-pay & order-to-cash cycle",
      "httpOnly-cookie JWT auth with rotating, hashed refresh tokens (theft/replay detection)",
      "Defense-in-depth security: Helmet, strict CORS, global rate limiting, @Sanitize() decorator",
      "In-memory TTL cache (cache-aside) for dashboard KPIs and reports, swappable to Redis",
      "Bilingual English/Arabic RTL frontend with role-based routing",
      "Reporting suite with PDF/Excel export and an audit log viewer",
    ],
    techStack: ["Next.js", "NestJS", "TypeScript", "PostgreSQL", "Prisma"],
    architecture:
      "Next.js frontend communicates with a modular NestJS API following a Repository/Service/Controller pattern per domain. Prisma manages PostgreSQL access, with a dependency-free in-memory TTL cache layer reducing repeated read load on expensive aggregate queries.",
    challenges:
      "Keeping stock movement and audit logs consistent under concurrent writes required wrapping critical operations in database transactions, plus building a reusable sanitization layer to safely support a rich-text content editor.",
    lessonsLearned:
      "Designing cache keys and TTLs centrally from day one made it possible to plan a one-file swap to Redis later, instead of refactoring scattered caching logic across modules.",
    githubUrl: "https://github.com/Mohamed-Shahata/ERP-Lite",
    liveUrl: "",
    relatedSlugs: ["courses-platform", "aqdam"],
    ar: {
      title: "ERP لايت",
      tagline:
        "نظام ERP بمستوى إنتاجي يغطي دورة الشراء حتى الدفع والبيع حتى التحصيل بالكامل.",
      overview:
        "مونوريبو ERP متعدد الموديولات (باكند NestJS 11، فرونت إند Next.js 16 / React 19) يغطي الموردين وأوامر الشراء وأوامر البيع والعملاء والمنتجات والفواتير والمدفوعات وحركة المخزون — أكثر من 14 موديول عمل مستقل وقابل للاختبار.",
      problem:
        "الشركات الصغيرة والمتوسطة اللي كبرت على الإكسل محتاجة مصدر بيانات واحد للمشتريات والمبيعات والمخزون من غير ما تدخل في نظام ERP مكلف ومعقد.",
      solution:
        "بنيت باكند بمعمارية طبقات صارمة (controller/service/repository لكل موديول) فوق PostgreSQL باستخدام Prisma 7، مع فرونت إند ثنائي اللغة (إنجليزي/عربي) جاهز لـ RTL وتوجيه بالصلاحيات على مستوى الـ middleware في Next.js.",
      features: [
        "دورة كاملة من الشراء للدفع ومن البيع للتحصيل",
        "مصادقة JWT بكوكيز httpOnly مع رفريش توكنز متجددة ومشفّرة (كشف السرقة وإعادة الاستخدام)",
        "أمان متعدد الطبقات: Helmet وCORS صارم وRate Limiting عام وDecorator خاص للتعقيم",
        "كاش TTL في الميموري (cache-aside) لمؤشرات الداشبورد والتقارير، قابل للتبديل لـ Redis",
        "فرونت إند ثنائي اللغة عربي/إنجليزي بدعم RTL وتوجيه حسب الصلاحيات",
        "نظام تقارير مع تصدير PDF/Excel وصفحة لعرض الـ Audit Log",
      ],
      architecture:
        "فرونت إند Next.js بيتواصل مع API معياري مبني بـ NestJS بنمط Repository/Service/Controller لكل دومين. Prisma بتدير الوصول لـ PostgreSQL، مع طبقة كاش TTL بدون أي اعتمادية خارجية بتقلل الحمل على الاستعلامات التجميعية المكلفة.",
      challenges:
        "الحفاظ على تناسق حركة المخزون والـ Audit Log تحت الكتابة المتزامنة احتاج تغليف العمليات الحرجة في transactions، بالإضافة لبناء طبقة تعقيم قابلة لإعادة الاستخدام عشان تدعم محرر نصوص غني بأمان.",
      lessonsLearned:
        "تصميم مفاتيح الكاش ومدة الـ TTL بشكل مركزي من أول يوم خلّى التبديل لـ Redis عملية ملف واحد، بدل ما أعيد هيكلة منطق الكاش المتفرق في كل الموديولات.",
    },
  },
  {
    slug: "courses-platform",
    title: "Courses Platform",
    type: "Backend",
    tagline:
      "Backend for an e-learning platform with enrollment, progress tracking, and payments.",
    overview:
      "A backend-only e-learning system supporting instructor course creation, student enrollment, progress tracking, and payment integration, built with Node.js, TypeScript, and PostgreSQL/MongoDB.",
    problem:
      "Instructors and students needed a platform to create, sell, and track progress through courses, with fast responses even on high-traffic endpoints.",
    solution:
      "Shipped a clean, modular RESTful API with Redis caching on hot-path endpoints, cutting response time by roughly 35%, plus a Dockerized deployment with an integrated CI/CD pipeline.",
    features: [
      "Instructor course creation & management",
      "Student enrollment & progress tracking",
      "Payment integration",
      "Redis caching on high-traffic endpoints",
      "Dockerized deployment with CI/CD",
    ],
    techStack: [
      "Node.js",
      "TypeScript",
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "Docker",
    ],
    architecture:
      "A modular RESTful API separating course, enrollment, progress, and payment domains, with Redis sitting in front of the most frequently read endpoints to reduce database load.",
    challenges:
      "Identifying which read paths were actually hot and caching them correctly (with sane invalidation) was the main work behind the ~35% response time improvement.",
    lessonsLearned:
      "Profiling before optimizing mattered more than guessing — targeted caching on a few endpoints outperformed broad, unfocused caching.",
    githubUrl: "https://github.com/Mohamed-Shahata/Courses_platform",
    liveUrl: "",
    relatedSlugs: ["erp-lite", "aqdam"],
    ar: {
      title: "منصة الكورسات",
      tagline:
        "باكند لمنصة تعليمية إلكترونية بالتسجيل ومتابعة التقدم والمدفوعات.",
      overview:
        "نظام تعليم إلكتروني باكند فقط بيدعم إنشاء المدرسين للكورسات، تسجيل الطلاب، متابعة تقدمهم، وربط المدفوعات، مبني بـ Node.js وTypeScript وPostgreSQL/MongoDB.",
      problem:
        "المدرسين والطلاب محتاجين منصة لإنشاء وبيع ومتابعة التقدم في الكورسات، مع استجابة سريعة حتى في نقاط الوصول عالية الطلب.",
      solution:
        "بنيت REST API نظيف ومعياري مع كاش Redis على أكثر الـ endpoints طلبًا، وده قلل زمن الاستجابة حوالي 35%، بالإضافة لنشر عبر Docker مع خط CI/CD متكامل.",
      features: [
        "إنشاء وإدارة الكورسات من المدرسين",
        "تسجيل الطلاب ومتابعة تقدمهم",
        "ربط المدفوعات",
        "كاش Redis على النقاط عالية الحركة",
        "نشر عبر Docker مع CI/CD",
      ],
      architecture:
        "REST API معياري بيفصل بين دومين الكورسات والتسجيل والتقدم والمدفوعات، مع Redis قدام أكتر الـ endpoints قراءة عشان يقلل الحمل على قاعدة البيانات.",
      challenges:
        "تحديد أي مسارات القراءة فعلاً كانت الأكتر طلبًا وعمل كاش صحيح لها (مع invalidation منطقي) كان أساس تحسين الأداء بنسبة 35%.",
      lessonsLearned:
        "القياس قبل التحسين كان أهم من التخمين — كاش مستهدف على شوية endpoints أدى أداء أفضل من كاش عام وغير مركّز.",
    },
  },
  {
    slug: "booking-platform",
    title: "Booking Platform",
    type: "Backend",
    tagline:
      "Backend for a consultation booking platform with expert discovery and payments.",
    overview:
      "A backend for a consultation booking platform enabling expert discovery, session booking, and payment processing across 3 service types, built with Node.js and NestJS.",
    problem:
      "Clients needed to discover experts, book sessions, and pay online through a multi-step flow without double-booking or inconsistent availability.",
    solution:
      "Focused on clean API design and multi-step booking flows using NestJS modules, structured for scalability as service types and providers grow.",
    features: [
      "Expert discovery & profiles",
      "Multi-step session booking flow",
      "Payment processing",
      "Support for 3 distinct service types",
    ],
    techStack: ["Node.js", "NestJS", "TypeScript"],
    architecture:
      "A NestJS API organized around clean architecture patterns, separating booking, payment, and expert-discovery concerns into independent modules.",
    challenges:
      "Designing a booking flow flexible enough for 3 different service types without duplicating logic across modules.",
    lessonsLearned:
      "Modeling the booking flow as a shared state machine across service types kept the codebase consistent instead of forking logic per type.",
    githubUrl: "https://github.com/Mohamed-Shahata/booking-platform",
    liveUrl: "",
    relatedSlugs: ["erp-lite", "aqdam"],
    ar: {
      title: "منصة الحجوزات",
      tagline: "باكند لمنصة حجز استشارات باكتشاف خبراء ومدفوعات.",
      overview:
        "باكند لمنصة حجز استشارات بتتيح اكتشاف الخبراء وحجز الجلسات ومعالجة المدفوعات عبر 3 أنواع خدمات، مبني بـ Node.js وNestJS.",
      problem:
        "العملاء محتاجين يكتشفوا خبراء ويحجزوا جلسات ويدفعوا أونلاين عبر خطوات متعددة من غير تعارض في الحجز أو تضارب في المواعيد المتاحة.",
      solution:
        "ركزت على تصميم API نظيف وتدفقات حجز متعددة الخطوات باستخدام موديولات NestJS، بهيكلة قابلة للتوسع مع زيادة أنواع الخدمات ومقدميها.",
      features: [
        "اكتشاف الخبراء وملفاتهم الشخصية",
        "تدفق حجز جلسات متعدد الخطوات",
        "معالجة المدفوعات",
        "دعم 3 أنواع خدمات مختلفة",
      ],
      architecture:
        "API مبني بـ NestJS منظم حول أنماط Clean Architecture، بيفصل اهتمامات الحجز والدفع واكتشاف الخبراء في موديولات مستقلة.",
      challenges:
        "تصميم تدفق حجز مرن يكفي لـ 3 أنواع خدمات مختلفة من غير تكرار المنطق في كل موديول.",
      lessonsLearned:
        "نمذجة تدفق الحجز كـ state machine مشتركة بين أنواع الخدمات خلّت الكود متسق بدل ما أعمل فرع منفصل لكل نوع.",
    },
  },
  {
    slug: "bitx-marathon",
    title: "BITX Marathon",
    type: "Backend",
    tagline:
      "Backend for a programming marathon platform supporting 50+ teams at launch.",
    overview:
      "A backend for a programming competition platform where teams register, submit solutions via GitHub, and admins score submissions in real time.",
    problem:
      "Running a programming marathon needed team registration, GitHub-based submission tracking, and real-time admin scoring at launch scale.",
    solution:
      "Implemented Google/email OAuth2, team management, an admin scoring workflow, email notifications, and RBAC using Node.js, TypeScript, and MongoDB — supporting 50+ teams at launch.",
    features: [
      "Google & email OAuth2",
      "Team registration & management",
      "GitHub-based submission tracking",
      "Real-time admin scoring workflow",
      "Email notifications & RBAC",
    ],
    techStack: ["Node.js", "TypeScript", "MongoDB"],
    architecture:
      "An event-driven backend where submissions and scoring updates propagate to an admin-facing real-time view, with RBAC guarding scoring and team-management actions.",
    challenges:
      "Keeping scoring consistent and abuse-resistant while allowing admins to score in real time during a live event.",
    lessonsLearned:
      "Launch-day load (50+ teams submitting concurrently) surfaced edge cases that unit tests alone didn't catch — real-time events need explicit concurrency handling.",
    githubUrl: "https://github.com/Mohamed-Shahata/btix-Backend",
    liveUrl: "",
    relatedSlugs: ["booking-platform", "aqdam"],
    ar: {
      title: "بيتكس ماراثون",
      tagline: "باكند لمنصة ماراثون برمجي بيدعم أكتر من 50 فريق عند الإطلاق.",
      overview:
        "باكند لمنصة مسابقة برمجية، الفرق فيها بتسجل وترفع حلولها عبر GitHub والأدمن بيقيّم التسليمات لحظيًا.",
      problem:
        "تشغيل ماراثون برمجي محتاج تسجيل فرق، تتبع تسليمات مبني على GitHub، وتقييم أدمن لحظي بحجم إطلاق كبير.",
      solution:
        "نفذت مصادقة OAuth2 (جوجل وإيميل)، إدارة فرق، تدفق تقييم للأدمن، إشعارات إيميل، وRBAC باستخدام Node.js وTypeScript وMongoDB — بدعم أكتر من 50 فريق عند الإطلاق.",
      features: [
        "مصادقة OAuth2 عبر جوجل والإيميل",
        "تسجيل الفرق وإدارتها",
        "تتبع تسليمات مبني على GitHub",
        "تدفق تقييم لحظي للأدمن",
        "إشعارات إيميل وRBAC",
      ],
      architecture:
        "باكند مبني على الأحداث، التسليمات وتحديثات التقييم بتنتشر لواجهة لحظية للأدمن، مع RBAC بيحمي عمليات التقييم وإدارة الفرق.",
      challenges:
        "الحفاظ على تناسق التقييم ومقاومته للتلاعب مع السماح للأدمن بالتقييم اللحظي أثناء فعالية حية.",
      lessonsLearned:
        "ضغط يوم الإطلاق (أكتر من 50 فريق بيرفعوا في نفس الوقت) كشف حالات حواف مكنتش الـ unit tests وحدها هتكشفها — الأحداث اللحظية محتاجة معالجة صريحة للتزامن.",
    },
  },
  {
    slug: "aqdam",
    title: "Aqdam — Social Job Platform",
    type: "Backend",
    tagline:
      "A LinkedIn-style backend for job posts, profiles, and listing interactions.",
    overview:
      "A LinkedIn-style social job platform backend for posting opportunities, updating profiles, and handling listing interactions, built with NestJS and PostgreSQL.",
    problem:
      "Feed-style listing pages needed to stay fast under concurrent reads as job posts and interactions scaled.",
    solution:
      "Optimized feed query performance by roughly 60% using Redis caching, supporting concurrent reads across 100+ listings.",
    features: [
      "Job posting & profile management",
      "Listing interactions (likes/comments-style engagement)",
      "Redis-cached feed queries",
      "Built to support concurrent reads at scale",
    ],
    techStack: ["NestJS", "TypeScript", "PostgreSQL", "Redis"],
    architecture:
      "A NestJS API with a caching layer in front of feed-generation queries, keeping read-heavy listing pages fast without hitting PostgreSQL on every request.",
    challenges:
      "Balancing cache freshness against performance — feed data needed to feel current while still benefiting from caching.",
    lessonsLearned:
      "Caching the right query (the feed aggregation) rather than caching everywhere gave the biggest performance win for the least complexity.",
    githubUrl: "https://github.com/Mohamed-Shahata/aqdam_backend",
    liveUrl: "",
    relatedSlugs: ["courses-platform", "bitx-marathon"],
    ar: {
      title: "أقدام — منصة وظائف اجتماعية",
      tagline:
        "باكند بنمط لينكدإن لمنشورات الوظائف والملفات الشخصية وتفاعلات القوائم.",
      overview:
        "باكند لمنصة وظائف اجتماعية بنمط لينكدإن، لنشر الفرص وتحديث الملفات الشخصية ومعالجة تفاعلات القوائم، مبني بـ NestJS وPostgreSQL.",
      problem:
        "صفحات القوائم بنمط الفييد لازم تفضل سريعة تحت القراءة المتزامنة مع زيادة منشورات الوظائف والتفاعلات.",
      solution:
        "حسّنت أداء استعلامات الفييد بحوالي 60% باستخدام كاش Redis، بدعم قراءات متزامنة عبر أكتر من 100 قائمة.",
      features: [
        "نشر الوظائف وإدارة الملفات الشخصية",
        "تفاعلات القوائم (لايكات وتعليقات)",
        "استعلامات فييد مخزّنة على Redis",
        "مصمم لدعم قراءات متزامنة بحجم كبير",
      ],
      architecture:
        "API مبني بـ NestJS مع طبقة كاش قدام استعلامات توليد الفييد، بيحافظ على سرعة صفحات القوائم كتيرة القراءة من غير ضغط على PostgreSQL في كل طلب.",
      challenges:
        "الموازنة بين حداثة الكاش والأداء — بيانات الفييد لازم تحس إنها محدثة مع الاستفادة من الكاش في نفس الوقت.",
      lessonsLearned:
        "عمل كاش للاستعلام الصح (تجميع الفييد) بدل ما أعمل كاش في كل حتة أدى أكبر تحسن أداء بأقل تعقيد.",
    },
  },
];

export function getProjectBySlug(slug: string) {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getLocalizedProject(project: Project, locale: "en" | "ar") {
  if (locale === "en") return project;
  const { ar, ...rest } = project;
  return { ...rest, ...ar, ar };
}
