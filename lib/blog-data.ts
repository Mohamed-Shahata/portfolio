export interface BlogPost {
  slug: string;
  title: string;
  titleAr: string;
  excerpt: string;
  excerptAr: string;
  content: string;
  contentAr: string;
  date: string;
  readingTime: string;
}

// No posts published yet. Add entries here as they're written —
// the listing and detail pages are already wired up to render them.
export const BLOG_POSTS: BlogPost[] = [];

export function getBlogPostBySlug(slug: string) {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
