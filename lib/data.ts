import { prisma } from "@/lib/db";
import { dbProjectToProject } from "@/lib/project-mapper";
import { PROJECTS, type Project } from "@/lib/projects-data";
import { BLOG_POSTS, type BlogPost } from "@/lib/blog-data";

export async function getPublishedProjects(): Promise<Project[]> {
  try {
    const rows = await prisma.project.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
    });
    if (rows && rows.length > 0) {
      return rows.map(dbProjectToProject);
    }
  } catch (err) {
    console.warn("⚠️ getPublishedProjects DB query failed (falling back to static PROJECTS):", err);
  }
  return PROJECTS;
}

export async function getProjectBySlugDb(
  slug: string,
): Promise<Project | undefined> {
  try {
    const row = await prisma.project.findUnique({ where: { slug } });
    if (row) {
      return row.published ? dbProjectToProject(row) : undefined;
    }
  } catch (err) {
    console.warn(`⚠️ getProjectBySlugDb(${slug}) DB query failed (falling back):`, err);
  }
  return PROJECTS.find((p) => p.slug === slug);
}

function formatDate(d: Date) {
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long" });
}

export async function getPublishedBlogPosts(): Promise<BlogPost[]> {
  try {
    const rows = await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
    });
    if (rows && rows.length > 0) {
      return rows.map((row) => ({
        slug: row.slug,
        title: row.title,
        titleAr: row.titleAr,
        excerpt: row.excerpt,
        excerptAr: row.excerptAr,
        content: row.content,
        contentAr: row.contentAr,
        date: formatDate(row.publishedAt ?? row.createdAt),
        readingTime: row.readingTime,
      }));
    }
  } catch (err) {
    console.warn("⚠️ getPublishedBlogPosts DB query failed (falling back to static BLOG_POSTS):", err);
  }
  return BLOG_POSTS;
}

export async function getBlogPostBySlugDb(
  slug: string,
): Promise<BlogPost | undefined> {
  try {
    const row = await prisma.blogPost.findUnique({ where: { slug } });
    if (row) {
      return row.published
        ? {
            slug: row.slug,
            title: row.title,
            titleAr: row.titleAr,
            excerpt: row.excerpt,
            excerptAr: row.excerptAr,
            content: row.content,
            contentAr: row.contentAr,
            date: formatDate(row.publishedAt ?? row.createdAt),
            readingTime: row.readingTime,
          }
        : undefined;
    }
  } catch (err) {
    console.warn(`⚠️ getBlogPostBySlugDb(${slug}) DB query failed (falling back):`, err);
  }
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export async function getPublishedTestimonials() {
  try {
    return await prisma.testimonial.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
    });
  } catch (err) {
    console.warn("⚠️ getPublishedTestimonials DB query failed:", err);
    return [];
  }
}

export async function getAboutContentDb() {
  try {
    return await prisma.aboutContent.findUnique({ where: { id: "singleton" } });
  } catch (err) {
    console.warn("⚠️ getAboutContentDb DB query failed:", err);
    return null;
  }
}
