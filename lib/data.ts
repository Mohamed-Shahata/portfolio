import { prisma } from "@/lib/db";
import { dbProjectToProject } from "@/lib/project-mapper";
import type { Project } from "@/lib/projects-data";
import type { BlogPost } from "@/lib/blog-data";

export async function getPublishedProjects(): Promise<Project[]> {
  const rows = await prisma.project.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  });
  return rows.map(dbProjectToProject);
}

export async function getProjectBySlugDb(
  slug: string,
): Promise<Project | undefined> {
  const row = await prisma.project.findUnique({ where: { slug } });
  if (!row || !row.published) return undefined;
  return dbProjectToProject(row);
}

function formatDate(d: Date) {
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long" });
}

export async function getPublishedBlogPosts(): Promise<BlogPost[]> {
  const rows = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
  });
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

export async function getBlogPostBySlugDb(
  slug: string,
): Promise<BlogPost | undefined> {
  const row = await prisma.blogPost.findUnique({ where: { slug } });
  if (!row || !row.published) return undefined;
  return {
    slug: row.slug,
    title: row.title,
    titleAr: row.titleAr,
    excerpt: row.excerpt,
    excerptAr: row.excerptAr,
    content: row.content,
    contentAr: row.contentAr,
    date: formatDate(row.publishedAt ?? row.createdAt),
    readingTime: row.readingTime,
  };
}

export async function getAboutContentDb() {
  return prisma.aboutContent.findUnique({ where: { id: "singleton" } });
}
