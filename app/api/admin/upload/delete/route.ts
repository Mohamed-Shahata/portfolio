import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";
import { del } from "@vercel/blob";

export async function POST(request: Request) {
  try {
    const { url } = (await request.json()) as { url?: string };
    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "No url provided" }, { status: 400 });
    }

    // 1. Handle Vercel Blob URLs
    if (url.includes("blob.vercel-storage.com")) {
      try {
        await del(url);
      } catch (err) {
        console.warn("Vercel Blob delete failed:", err);
      }
      return NextResponse.json({ result: "ok" });
    }

    // 2. If it's a legacy external/Cloudinary URL, return ok without error
    if (!url.startsWith("/uploads/") && !url.includes("/uploads/")) {
      return NextResponse.json({ result: "ok" });
    }

    // 3. Handle local filesystem uploads
    let pathname = url;
    try {
      if (url.startsWith("http://") || url.startsWith("https://")) {
        pathname = new URL(url).pathname;
      }
    } catch {
      // Keep original url string
    }

    const relativePart = pathname.replace(/^\/?uploads\/?/, "");
    const uploadsRoot = path.resolve(/*turbopackIgnore: true*/ process.cwd(), "public", "uploads");
    const targetPath = path.resolve(/*turbopackIgnore: true*/ uploadsRoot, relativePart);

    // Security check: ensure path does not escape public/uploads directory
    if (!targetPath.startsWith(uploadsRoot + path.sep)) {
      return NextResponse.json({ error: "Invalid file path" }, { status: 403 });
    }

    try {
      await fs.unlink(targetPath);
    } catch (err: unknown) {
      const nodeErr = err as NodeJS.ErrnoException;
      if (nodeErr.code !== "ENOENT") {
        console.error("Local file delete failed:", err);
      }
    }

    return NextResponse.json({ result: "ok" });
  } catch (error) {
    console.error("File delete handler failed:", error);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
