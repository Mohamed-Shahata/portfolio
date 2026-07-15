import type { Metadata } from "next";
import { getBlogPostBySlugDb } from "@/lib/data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlugDb(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt ?? post.title,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt ?? post.title,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt ?? post.title,
    },
  };
}

export default function BlogPostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
