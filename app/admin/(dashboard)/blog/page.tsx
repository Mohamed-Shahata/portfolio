import Link from "next/link";
import { Plus } from "lucide-react";
import { prisma } from "@/lib/db";
import { buttonVariants } from "@/components/ui/button";
import { BlogTable } from "@/components/admin/blog-table";

export default async function AdminBlogPage() {
  const posts = await prisma.blogPost.findMany({
    orderBy: { createdAt: "desc" },
    select: { id: true, slug: true, title: true, published: true, readingTime: true },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Blog</h1>
          <p className="mt-1 text-sm text-muted">
            {posts.length} post{posts.length === 1 ? "" : "s"}
          </p>
        </div>
        <Link href="/admin/blog/new" className={buttonVariants({ variant: "gradient", size: "md" })}>
          <Plus className="size-4" />
          New Post
        </Link>
      </div>

      <BlogTable initialPosts={posts} />
    </div>
  );
}
