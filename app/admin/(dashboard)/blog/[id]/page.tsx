import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { BlogForm } from "@/components/admin/blog-form";
import type { BlogPostInput } from "@/app/api/admin/blog/route";

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await prisma.blogPost.findUnique({ where: { id } });
  if (!post) notFound();

  const initial: BlogPostInput = {
    slug: post.slug,
    title: post.title,
    titleAr: post.titleAr,
    excerpt: post.excerpt,
    excerptAr: post.excerptAr,
    content: post.content,
    contentAr: post.contentAr,
    readingTime: post.readingTime,
    published: post.published,
  };

  return (
    <div>
      <h1 className="text-xl font-semibold text-foreground">Edit Post</h1>
      <p className="mt-1 text-sm text-muted">{post.title}</p>
      <BlogForm mode="edit" postId={post.id} initial={initial} />
    </div>
  );
}
