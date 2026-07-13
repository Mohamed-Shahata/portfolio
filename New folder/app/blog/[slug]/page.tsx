"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import type { BlogPost } from "@/lib/blog-data";
import { useLocale } from "@/lib/i18n/locale-context";

export default function BlogPostPage() {
  const params = useParams<{ slug: string }>();
  const { t, locale } = useLocale();
  const [post, setPost] = useState<BlogPost | null | undefined>(undefined);

  useEffect(() => {
    fetch("/api/blog")
      .then((res) => res.json())
      .then((posts: BlogPost[]) =>
        setPost(posts.find((p) => p.slug === params.slug) ?? null),
      )
      .catch(() => setPost(null));
  }, [params.slug]);

  if (post === undefined) return null;
  if (post === null) {
    return (
      <>
        <Navbar />
        <main className="relative flex-1 px-6 pb-24 pt-32">
          <div className="mx-auto max-w-2xl text-center text-sm text-muted">
            {t.blog.emptyTitle}
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="relative flex-1 px-6 pb-24 pt-32">
        <div className="mx-auto max-w-2xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            {t.blog.backToBlog}
          </Link>
          <span className="mt-6 block text-xs text-muted-foreground">
            {post.date} · {post.readingTime}
          </span>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            {locale === "ar" ? post.titleAr : post.title}
          </h1>
          <div className="prose prose-invert mt-8 max-w-none text-sm leading-relaxed text-muted sm:text-base">
            {(locale === "ar" ? post.contentAr : post.content)
              .split("\n\n")
              .map((para, i) => (
                <p key={i} className="mb-4">
                  {para}
                </p>
              ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
