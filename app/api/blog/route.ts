import { NextResponse } from "next/server";
import { getPublishedBlogPosts } from "@/lib/data";

export async function GET() {
  const posts = await getPublishedBlogPosts();
  return NextResponse.json(posts);
}
