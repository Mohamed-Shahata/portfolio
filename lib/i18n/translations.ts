export type Locale = "en" | "ar";

export const translations = {
  en: {
    nav: {
      links: [
        { label: "Work", href: "#what-i-build" },
        { label: "Process", href: "#process" },
        { label: "Projects", href: "#projects" },
        { label: "Stack", href: "#tech-stack" },
        { label: "FAQ", href: "#faq" },
      ],
      contact: "Contact Me",
    },
    hero: {
      badge: "Available for new projects",
      titleLine1: "I Build Fast, Secure &",
      titleGradient: "Scalable Business Systems.",
      description:
        "I design and develop modern web applications, SaaS platforms, business systems, APIs, and desktop solutions that help businesses grow.",
      ctaPrimary: "Explore My Work",
      ctaSecondary: "Contact Me",
    },
    whatIBuild: {
      eyebrow: "What I Build",
      title: "Systems built for real businesses",
      description:
        "From internal tools to full-scale platforms, I build the software that runs your operations.",
      items: [
        {
          title: "ERP Systems",
          desc: "End-to-end resource planning tailored to how your business actually runs.",
        },
        {
          title: "CRM Systems",
          desc: "Track leads, deals, and customer relationships in one place.",
        },
        {
          title: "POS Systems",
          desc: "Fast, reliable point-of-sale for retail and restaurants.",
        },
        {
          title: "Inventory Management",
          desc: "Real-time stock tracking, movements, and low-stock alerts.",
        },
        {
          title: "HR Systems",
          desc: "Employee records, attendance, payroll, and performance.",
        },
        {
          title: "Admin Dashboards",
          desc: "Clean, data-rich dashboards to control every part of your business.",
        },
        {
          title: "SaaS Platforms",
          desc: "Multi-tenant products built to scale from day one.",
        },
        {
          title: "Booking Systems",
          desc: "Appointment and reservation flows with zero double-booking.",
        },
        {
          title: "E-commerce Platforms",
          desc: "Storefronts that convert, backed by solid architecture.",
        },
        {
          title: "Offline Desktop Apps",
          desc: "Full-featured apps that work with zero internet dependency.",
        },
        {
          title: "REST APIs",
          desc: "Well-documented, versioned APIs built for integrations.",
        },
        {
          title: "Authentication Systems",
          desc: "Secure JWT/session auth with RBAC and refresh rotation.",
        },
        {
          title: "Payment Integrations",
          desc: "Stripe, Paymob, and local gateways wired in safely.",
        },
        {
          title: "Analytics Dashboards",
          desc: "Turn raw data into decisions with clear visualizations.",
        },
        {
          title: "AI Integrations",
          desc: "Practical AI features that solve real business problems.",
        },
      ],
    },
    whyWorkWithMe: {
      eyebrow: "Why Work With Me",
      title: "Every project, built to the same standard",
      description:
        "Quality isn't a phase at the end — it's part of how every line of code gets written.",
      items: [
        {
          title: "Secure Code",
          desc: "Security-first practices baked into every layer.",
        },
        {
          title: "Scalable Architecture",
          desc: "Built to grow with your business, not against it.",
        },
        {
          title: "Responsive UI",
          desc: "Flawless on desktop, tablet, and mobile.",
        },
        {
          title: "Fast Performance",
          desc: "Optimized for speed from the first load.",
        },
        {
          title: "Clean Code",
          desc: "Readable, consistent, and easy to hand off.",
        },
        {
          title: "Maintainable Projects",
          desc: "Structured so future changes stay simple.",
        },
        {
          title: "API Development",
          desc: "Reliable APIs designed for integration.",
        },
        {
          title: "Offline Solutions",
          desc: "Software that keeps working without internet.",
        },
        {
          title: "Documentation",
          desc: "Clear docs so your team is never blocked.",
        },
        {
          title: "Deployment Support",
          desc: "From server setup to going live, handled.",
        },
        {
          title: "Modern Technologies",
          desc: "Current, production-proven tech stacks.",
        },
        {
          title: "Long-Term Maintainability",
          desc: "Code that stays healthy years after launch.",
        },
      ],
    },
    process: {
      eyebrow: "Development Process",
      title: "A clear, predictable process",
      description:
        "No surprises. Every project follows the same proven path from idea to launch.",
      steps: [
        {
          title: "Discovery",
          description:
            "Understanding your business, goals, and technical requirements.",
        },
        {
          title: "Planning",
          description:
            "Breaking the project into a clear roadmap and milestones.",
        },
        {
          title: "Wireframing",
          description:
            "Structuring layouts and user flows before any visual design.",
        },
        {
          title: "UI Design",
          description:
            "Designing a clean, on-brand interface for every screen.",
        },
        {
          title: "Development",
          description:
            "Building the system with clean, scalable, type-safe code.",
        },
        {
          title: "Testing",
          description:
            "Manual and automated testing across features and edge cases.",
        },
        {
          title: "Deployment",
          description:
            "Shipping to production with proper CI/CD and monitoring.",
        },
        {
          title: "Support",
          description: "Ongoing maintenance, bug fixes, and feature updates.",
        },
      ],
    },
    architecture: {
      eyebrow: "Architecture",
      title: "Built on proven, production-grade patterns",
      description:
        "Every system I build follows the same reliable architecture principles.",
      diagrams: ["Application Stack", "Authentication Flow", "Deployment Flow"],
    },
    featuredProjects: {
      eyebrow: "Featured Projects",
      title: "Real systems, built end-to-end",
      description:
        "A mix of full-stack platforms and backend-only APIs — each one solving a real operational problem.",
    },
    projectDetail: {
      backToProjects: "Back to Projects",
      heroImage: "Hero Image",
      overview: "Overview",
      problem: "Problem",
      solution: "Solution",
      features: "Features",
      techStack: "Tech Stack",
      architecture: "Architecture",
      challenges: "Challenges",
      lessonsLearned: "Lessons Learned",
      gallery: "Gallery",
      screenshot: "Screenshot",
      videoWalkthrough: "Video Walkthrough",
      videoComingSoon: "Video coming soon",
      relatedProjects: "Related Projects",
      github: "GitHub",
      liveDemo: "Live Demo",
    },
    techStack: {
      eyebrow: "Technology Stack",
      title: "Modern tools, used deliberately",
      description:
        "Every technology is chosen for reliability and long-term maintainability, not hype.",
      categories: [
        "Frontend",
        "Backend",
        "Database",
        "Authentication",
        "Cloud",
        "DevOps",
        "Desktop",
        "Security",
        "Testing",
      ],
    },
    clientDeliverables: {
      eyebrow: "What You'll Receive",
      title: "Everything you need to own your system",
      description:
        "No black boxes. You get full ownership, documentation, and support after launch.",
      items: [
        {
          title: "Source Code",
          desc: "Full, clean codebase — yours to keep and extend.",
        },
        {
          title: "Documentation",
          desc: "Clear technical documentation for every module.",
        },
        {
          title: "Database Design",
          desc: "ERD and schema documentation included.",
        },
        {
          title: "API Documentation",
          desc: "Endpoints, payloads, and auth documented.",
        },
        {
          title: "Deployment",
          desc: "Your system deployed and running in production.",
        },
        {
          title: "Installation Guide",
          desc: "Step-by-step setup for local or server environments.",
        },
        {
          title: "Maintenance Guide",
          desc: "How to keep the system healthy long-term.",
        },
        {
          title: "30 Days Support",
          desc: "Post-launch support included, no extra charge.",
        },
        {
          title: "Training Session",
          desc: "A walkthrough session for you or your team.",
        },
        {
          title: "Bug Fixes",
          desc: "Any issues found post-launch get fixed promptly.",
        },
      ],
    },
    solutionsByIndustry: {
      eyebrow: "Solutions By Domain",
      title: "Real systems, built for real domains",
      description:
        "Every project below reflects hands-on experience — not a generic industry list.",
      items: [
        {
          title: "Retail & Wholesale",
          desc: "Suppliers, purchase/sales orders, and multi-branch inventory tracking.",
        },
        {
          title: "Education & E-Learning",
          desc: "Course creation, enrollment, and student progress tracking.",
        },
        {
          title: "Professional Services",
          desc: "Expert discovery, multi-step booking, and payment processing.",
        },
        {
          title: "Recruitment & Job Platforms",
          desc: "Job listings, profiles, and high-concurrency feed performance.",
        },
        {
          title: "Events & Competitions",
          desc: "Team registration, GitHub-based submissions, and live admin scoring.",
        },
      ],
    },
    interactiveDemo: {
      eyebrow: "Interactive Demos",
      title: "See it before you commit to it",
      description:
        "Live, click-through demos of real system modules — not static screenshots.",
      openDemo: "Open Demo",
      items: [
        {
          title: "ERP Demo",
          desc: "Purchasing, sales, and inventory in one workspace.",
        },
        {
          title: "CRM Demo",
          desc: "Pipeline, leads, and customer activity tracking.",
        },
        {
          title: "POS Demo",
          desc: "Fast checkout flow built for retail and restaurants.",
        },
        {
          title: "Admin Dashboard Demo",
          desc: "Real-time metrics and system-wide controls.",
        },
        {
          title: "Inventory Demo",
          desc: "Stock levels, movements, and low-stock alerts.",
        },
      ],
    },
    statistics: {
      items: [
        { label: "Projects Shipped" },
        { label: "Years Experience" },
        { label: "Production Deployments" },
        { label: "Technologies Used" },
        { label: "Concurrent Users Handled" },
      ],
    },
    testimonials: {
      eyebrow: "Testimonials",
      title: "What clients say",
      description:
        "Placeholder testimonials — structured and ready for real client feedback.",
    },
    faq: {
      eyebrow: "FAQ",
      title: "Common questions, answered",
      items: [
        {
          question: "How long does a project take?",
          answer:
            "Most systems take 3–8 weeks depending on scope, from a simple admin dashboard to a full ERP. You'll get a clear timeline after the discovery phase.",
        },
        {
          question: "Can the system work offline?",
          answer:
            "Yes. I build offline-first desktop applications and can design systems that keep working with limited or no internet connectivity.",
        },
        {
          question: "Can it be customized?",
          answer:
            "Every system is built specifically around your workflow — nothing is a rigid template. Features, roles, and flows are tailored to how your business actually operates.",
        },
        {
          question: "Do you provide support?",
          answer:
            "Yes, every project includes 30 days of post-launch support, with ongoing maintenance available afterward.",
        },
        {
          question: "Can you deploy it?",
          answer:
            "Yes. I handle full deployment — server setup, CI/CD, domains, and monitoring — so the system is live and stable from day one.",
        },
        {
          question: "Can I request future updates?",
          answer:
            "Absolutely. Since you receive full source code and documentation, updates can be requested anytime, whether by me or your own team.",
        },
      ],
    },
    contact: {
      eyebrow: "Get In Touch",
      title: "Let's Build Something Great Together.",
      description:
        "Have a project in mind? Tell me what you're building and I'll get back to you within 24 hours.",
      badge: "Available for new projects",
      emailMe: "Email Me",
      downloadCv: "Download CV",
      locationLabel: "El Beheira, Egypt — Available Remotely",
    },
    footer: {
      tagline:
        "Building fast, secure & scalable business systems for companies that need software they can trust.",
      quickLinks: "Quick Links",
      connect: "Connect",
      rights: "All rights reserved.",
      backToTop: "Back to top",
    },
  },
  ar: {
    nav: {
      links: [
        { label: "شغلي", href: "#what-i-build" },
        { label: "خطوات العمل", href: "#process" },
        { label: "المشاريع", href: "#projects" },
        { label: "التقنيات", href: "#tech-stack" },
        { label: "الأسئلة الشائعة", href: "#faq" },
      ],
      contact: "تواصل معايا",
    },
    hero: {
      badge: "متاح لمشاريع جديدة",
      titleLine1: "بابني أنظمة أعمال",
      titleGradient: "سريعة، آمنة، وقابلة للتوسع.",
      description:
        "بصمم وأطور تطبيقات ويب حديثة، منصات SaaS، أنظمة إدارة أعمال، APIs، وحلول ديسكتوب تساعد شركتك على النمو.",
      ctaPrimary: "شوف شغلي",
      ctaSecondary: "تواصل معايا",
    },
    whatIBuild: {
      eyebrow: "اللي بابنيه",
      title: "أنظمة مبنية لشركات حقيقية",
      description:
        "من أدوات داخلية لمنصات متكاملة، بابني السوفتوير اللي بيشغّل عمليات شركتك.",
      items: [
        {
          title: "أنظمة ERP",
          desc: "تخطيط موارد متكامل مصمم على مقاس شغل شركتك فعليًا.",
        },
        {
          title: "أنظمة CRM",
          desc: "تتبع العملاء المحتملين والصفقات وعلاقات العملاء في مكان واحد.",
        },
        {
          title: "أنظمة نقاط بيع (POS)",
          desc: "نقطة بيع سريعة وموثوقة للمحلات والمطاعم.",
        },
        {
          title: "إدارة المخزون",
          desc: "متابعة المخزون لحظيًا، الحركات، وتنبيهات نقص المخزون.",
        },
        {
          title: "أنظمة الموارد البشرية",
          desc: "سجلات الموظفين، الحضور، الرواتب، وتقييم الأداء.",
        },
        {
          title: "لوحات تحكم إدارية",
          desc: "لوحات تحكم واضحة وغنية بالبيانات للتحكم في كل جزء من شركتك.",
        },
        {
          title: "منصات SaaS",
          desc: "منتجات متعددة المستأجرين مبنية للتوسع من أول يوم.",
        },
        {
          title: "أنظمة حجز",
          desc: "تدفقات حجز مواعيد بدون أي تعارض في الحجز.",
        },
        {
          title: "منصات تجارة إلكترونية",
          desc: "متاجر مصممة للتحويل، مبنية على بنية تقنية قوية.",
        },
        {
          title: "تطبيقات ديسكتوب أوفلاين",
          desc: "تطبيقات متكاملة تشتغل من غير أي اعتماد على الإنترنت.",
        },
        {
          title: "REST APIs",
          desc: "APIs موثقة وبإصدارات واضحة، مبنية للتكامل مع أنظمة تانية.",
        },
        {
          title: "أنظمة مصادقة",
          desc: "مصادقة JWT/Session آمنة مع RBAC وتدوير التوكنات.",
        },
        {
          title: "تكامل بوابات دفع",
          desc: "Stripe وPaymob وبوابات الدفع المحلية متكاملة بأمان.",
        },
        {
          title: "لوحات تحليلات",
          desc: "تحويل البيانات الخام لقرارات واضحة عن طريق تصورات بيانية.",
        },
        {
          title: "تكامل الذكاء الاصطناعي",
          desc: "ميزات ذكاء اصطناعي عملية تحل مشاكل حقيقية في شركتك.",
        },
      ],
    },
    whyWorkWithMe: {
      eyebrow: "ليه تشتغل معايا",
      title: "كل مشروع بنفس المعيار العالي",
      description: "الجودة مش مرحلة أخيرة — دي جزء من طريقة كتابة كل سطر كود.",
      items: [
        { title: "كود آمن", desc: "ممارسات أمان مدمجة في كل طبقة من النظام." },
        {
          title: "بنية قابلة للتوسع",
          desc: "مبنية عشان تكبر مع شركتك مش تعطلها.",
        },
        {
          title: "واجهة متجاوبة",
          desc: "شغالة بشكل مثالي على الديسكتوب والتابلت والموبايل.",
        },
        { title: "أداء سريع", desc: "محسّنة للسرعة من أول تحميل." },
        { title: "كود نظيف", desc: "واضح، متسق، وسهل التسليم لأي فريق." },
        {
          title: "مشاريع قابلة للصيانة",
          desc: "منظمة عشان أي تعديل مستقبلي يبقى بسيط.",
        },
        { title: "تطوير APIs", desc: "APIs موثوقة مصممة للتكامل." },
        { title: "حلول أوفلاين", desc: "سوفتوير بيفضل شغال من غير إنترنت." },
        { title: "توثيق", desc: "توثيق واضح عشان فريقك ميتعطلش أبدًا." },
        {
          title: "دعم النشر",
          desc: "من إعداد السيرفر لحد الإطلاق، كل حاجة متغطية.",
        },
        { title: "تقنيات حديثة", desc: "تقنيات حديثة ومجربة في بيئة الإنتاج." },
        {
          title: "قابلية صيانة طويلة الأمد",
          desc: "كود بيفضل سليم لسنين بعد الإطلاق.",
        },
      ],
    },
    process: {
      eyebrow: "خطوات العمل",
      title: "خطوات واضحة ومتوقعة",
      description:
        "من غير مفاجآت. كل مشروع بيمشي بنفس المسار المجرب من الفكرة للإطلاق.",
      steps: [
        {
          title: "الاكتشاف",
          description: "فهم شركتك، أهدافك، والمتطلبات التقنية.",
        },
        {
          title: "التخطيط",
          description: "تقسيم المشروع لخطة واضحة ومراحل محددة.",
        },
        {
          title: "الرسم التخطيطي",
          description: "بناء الشاشات وتدفق المستخدم قبل أي تصميم بصري.",
        },
        {
          title: "تصميم الواجهة",
          description: "تصميم واجهة نظيفة ومتناسقة مع هوية شركتك لكل شاشة.",
        },
        {
          title: "التطوير",
          description: "بناء النظام بكود نظيف، قابل للتوسع، وآمن الأنواع.",
        },
        {
          title: "الاختبار",
          description: "اختبار يدوي وآلي لكل الميزات والحالات الاستثنائية.",
        },
        {
          title: "النشر",
          description: "إطلاق النظام على الإنتاج مع CI/CD ومراقبة سليمة.",
        },
        {
          title: "الدعم",
          description: "صيانة مستمرة، إصلاح الأخطاء، وتحديثات الميزات.",
        },
      ],
    },
    architecture: {
      eyebrow: "البنية التقنية",
      title: "مبنية على أنماط تقنية مجربة وموثوقة",
      description: "كل نظام بابنيه بيتبع نفس مبادئ البنية التقنية الموثوقة.",
      diagrams: ["بنية التطبيق", "تدفق المصادقة", "تدفق النشر"],
    },
    featuredProjects: {
      eyebrow: "أبرز المشاريع",
      title: "أنظمة حقيقية، مبنية بالكامل",
      description:
        "مزيج من منصات متكاملة و APIs خلفية فقط — كل واحد بيحل مشكلة تشغيلية حقيقية.",
    },
    projectDetail: {
      backToProjects: "العودة للمشاريع",
      heroImage: "صورة رئيسية",
      overview: "نظرة عامة",
      problem: "المشكلة",
      solution: "الحل",
      features: "المميزات",
      techStack: "التقنيات المستخدمة",
      architecture: "المعمارية",
      challenges: "التحديات",
      lessonsLearned: "الدروس المستفادة",
      gallery: "معرض الصور",
      screenshot: "لقطة شاشة",
      videoWalkthrough: "فيديو شرح",
      videoComingSoon: "الفيديو قريبًا",
      relatedProjects: "مشاريع ذات صلة",
      github: "جيت هب",
      liveDemo: "معاينة حية",
    },
    techStack: {
      eyebrow: "التقنيات المستخدمة",
      title: "أدوات حديثة، مستخدمة بوعي",
      description:
        "كل تقنية متختارة للموثوقية وقابلية الصيانة طويلة الأمد، مش بس لأنها تريند.",
      categories: [
        "الواجهة الأمامية",
        "الواجهة الخلفية",
        "قواعد البيانات",
        "المصادقة",
        "الاستضافة السحابية",
        "DevOps",
        "تطبيقات ديسكتوب",
        "الأمان",
        "الاختبار",
      ],
    },
    clientDeliverables: {
      eyebrow: "اللي هتستلمه",
      title: "كل اللي محتاجه عشان تمتلك نظامك بالكامل",
      description:
        "من غير أي صناديق سوداء. بتاخد ملكية كاملة، توثيق، ودعم بعد الإطلاق.",
      items: [
        {
          title: "الكود المصدري",
          desc: "كود كامل ونظيف — ملكك تحتفظ بيه وتطوره.",
        },
        { title: "التوثيق", desc: "توثيق تقني واضح لكل جزء في النظام." },
        {
          title: "تصميم قاعدة البيانات",
          desc: "مخطط ERD وتوثيق الـ schema متضمّن.",
        },
        {
          title: "توثيق الـ API",
          desc: "الـ endpoints والبيانات وطرق المصادقة موثقة بالكامل.",
        },
        { title: "النشر", desc: "نظامك منشور وشغال على بيئة الإنتاج." },
        {
          title: "دليل التثبيت",
          desc: "خطوات تفصيلية للتشغيل محليًا أو على السيرفر.",
        },
        {
          title: "دليل الصيانة",
          desc: "إزاي تحافظ على سلامة النظام على المدى الطويل.",
        },
        {
          title: "دعم 30 يوم",
          desc: "دعم بعد الإطلاق متضمّن من غير أي تكلفة إضافية.",
        },
        { title: "جلسة تدريب", desc: "جلسة شرح كاملة ليك أو لفريقك." },
        {
          title: "إصلاح الأخطاء",
          desc: "أي مشكلة تظهر بعد الإطلاق بتتحل بسرعة.",
        },
      ],
    },
    solutionsByIndustry: {
      eyebrow: "حلول حسب المجال",
      title: "أنظمة حقيقية، مبنية لمجالات فعلية",
      description: "كل مشروع تحت ده خبرة عملية فعلية — مش قائمة مجالات عامة.",
      items: [
        {
          title: "التجزئة والجملة",
          desc: "الموردين، أوامر الشراء والبيع، وتتبع المخزون متعدد الفروع.",
        },
        {
          title: "التعليم والتعلم الإلكتروني",
          desc: "إنشاء الكورسات، التسجيل، ومتابعة تقدم الطلاب.",
        },
        {
          title: "الخدمات المهنية",
          desc: "اكتشاف الخبراء، حجز متعدد الخطوات، ومعالجة الدفع.",
        },
        {
          title: "منصات التوظيف",
          desc: "عروض الوظائف، الملفات الشخصية، وأداء عالي في القراءات المتزامنة.",
        },
        {
          title: "الفعاليات والمسابقات",
          desc: "تسجيل الفرق، التسليم عبر GitHub، والتصحيح اللحظي من الإدارة.",
        },
      ],
    },
    interactiveDemo: {
      eyebrow: "عروض تفاعلية",
      title: "شوف النظام قبل ما تقرر",
      description:
        "عروض حية وتفاعلية لوحدات النظام الفعلية — مش مجرد صور ثابتة.",
      openDemo: "افتح العرض",
      items: [
        {
          title: "عرض ERP",
          desc: "المشتريات والمبيعات والمخزون في مساحة عمل واحدة.",
        },
        { title: "عرض CRM", desc: "متابعة مسار العملاء والصفقات والنشاط." },
        { title: "عرض POS", desc: "تدفق دفع سريع مصمم للمحلات والمطاعم." },
        {
          title: "عرض لوحة التحكم",
          desc: "مقاييس لحظية وتحكم شامل في النظام.",
        },
        {
          title: "عرض المخزون",
          desc: "مستويات المخزون، الحركات، وتنبيهات النقص.",
        },
      ],
    },
    statistics: {
      items: [
        { label: "مشروع مُنجز" },
        { label: "سنة خبرة" },
        { label: "نشر على بيئة إنتاج" },
        { label: "تقنية مستخدمة" },
        { label: "مستخدم متزامن تم التعامل معهم" },
      ],
    },
    testimonials: {
      eyebrow: "آراء العملاء",
      title: "رأي العملاء",
      description:
        "آراء تجريبية — جاهزة الهيكل لاستقبال تقييمات عملاء حقيقيين.",
    },
    faq: {
      eyebrow: "الأسئلة الشائعة",
      title: "أهم الأسئلة وإجاباتها",
      items: [
        {
          question: "المشروع بياخد قد إيه؟",
          answer:
            "معظم الأنظمة بتاخد من 3 لـ 8 أسابيع حسب حجم المشروع، من لوحة تحكم بسيطة لنظام ERP متكامل. هتاخد جدول زمني واضح بعد مرحلة الاكتشاف.",
        },
        {
          question: "النظام ممكن يشتغل من غير إنترنت؟",
          answer:
            "أيوه. بابني تطبيقات ديسكتوب Offline-first وأقدر أصمم أنظمة تفضل شغالة باتصال إنترنت محدود أو من غيره خالص.",
        },
        {
          question: "ممكن يتخصص حسب احتياجي؟",
          answer:
            "كل نظام بيتبنى خصيصًا حسب طريقة شغلك — مفيش أي قالب جامد. الميزات والصلاحيات والتدفقات متصممة على مقاس شركتك فعليًا.",
        },
        {
          question: "بتقدم دعم بعد التسليم؟",
          answer:
            "أيوه، كل مشروع بيشمل 30 يوم دعم بعد الإطلاق، وصيانة مستمرة متاحة بعد كده.",
        },
        {
          question: "بتتكفل بالنشر؟",
          answer:
            "أيوه. بتولى النشر بالكامل — إعداد السيرفر، CI/CD، الدومينات، والمراقبة — عشان النظام يبقى شغال ومستقر من أول يوم.",
        },
        {
          question: "أقدر أطلب تحديثات مستقبلية؟",
          answer:
            "أكيد. بما إنك بتستلم الكود المصدري الكامل والتوثيق، تقدر تطلب تحديثات في أي وقت، سواء مني أو من فريقك.",
        },
      ],
    },
    contact: {
      eyebrow: "تواصل معايا",
      title: "يلا نبني حاجة كويسة مع بعض.",
      description: "عندك مشروع في بالك؟ قولي هتبني إيه وهرد عليك خلال 24 ساعة.",
      badge: "متاح لمشاريع جديدة",
      emailMe: "ابعتلي إيميل",
      downloadCv: "حمّل السيرة الذاتية",
      locationLabel: "البحيرة، مصر — متاح للعمل عن بعد",
    },
    footer: {
      tagline:
        "بابني أنظمة أعمال سريعة، آمنة، وقابلة للتوسع لشركات محتاجة سوفتوير تقدر تثق فيه.",
      quickLinks: "روابط سريعة",
      connect: "تواصل",
      rights: "جميع الحقوق محفوظة.",
      backToTop: "ارجع لفوق",
    },
  },
} as const;
