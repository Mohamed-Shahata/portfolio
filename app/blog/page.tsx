"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Newspaper } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SectionTitle } from "@/components/ui/section-title";
import { NewsletterSignup } from "@/components/sections/newsletter-signup";
import type { BlogPost } from "@/lib/blog-data";
import { useLocale } from "@/lib/i18n/locale-context";

export default function BlogPage() {
  const { t, locale } = useLocale();
  const b = t.blog;
  const [BLOG_POSTS, setBlogPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    fetch("/api/blog")
      .then((res) => res.json())
      .then(setBlogPosts)
      .catch(() => setBlogPosts([]));
  }, []);

  return (
    <>
      <Navbar />
      <main className="relative flex-1 px-6 pb-24 pt-32">
        <div className="mx-auto max-w-3xl">
          <SectionTitle
            eyebrow={b.eyebrow}
            title={b.title}
            description={b.description}
          />

          {BLOG_POSTS.length === 0 ? (
            <div className="mt-16 flex flex-col items-center gap-4 rounded-2xl border border-border bg-surface px-6 py-16 text-center">
              <Newspaper className="size-8 text-muted-foreground" />
              <h2 className="text-base font-medium text-foreground">
                {b.emptyTitle}
              </h2>
              <p className="max-w-sm text-sm text-muted">
                {b.emptyDescription}
              </p>
            </div>
          ) : (
            <div className="mt-14 flex flex-col gap-6">
              {BLOG_POSTS.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="block rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-border-hover hover:bg-surface-hover"
                >
                  <span className="text-xs text-muted-foreground">
                    {post.date} · {post.readingTime}
                  </span>
                  <h3 className="mt-2 text-lg font-medium text-foreground">
                    {locale === "ar" ? post.titleAr : post.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {locale === "ar" ? post.excerptAr : post.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          )}

          <NewsletterSignup />
        </div>
      </main>
      <Footer />
    </>
  );
}
