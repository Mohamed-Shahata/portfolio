import { BlogForm } from "@/components/admin/blog-form";

export default function NewBlogPostPage() {
  return (
    <div>
      <h1 className="text-xl font-semibold text-foreground">New Post</h1>
      <p className="mt-1 text-sm text-muted">Fill in both languages before publishing.</p>
      <BlogForm mode="create" />
    </div>
  );
}
