import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";

export async function POST(request: Request) {
  try {
    const { url } = (await request.json()) as { url?: string };
    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "No url provided" }, { status: 400 });
    }

    // If it's a legacy external/Cloudinary URL, we do not call Cloudinary;
    // return ok so the dashboard can safely detach it without error.
    if (!url.startsWith("/uploads/") && !url.includes("/uploads/")) {
      return NextResponse.json({ result: "ok" });
    }

    // Extract pathname portion if full URL was provided
    let pathname = url;
    try {
      if (url.startsWith("http://") || url.startsWith("https://")) {
        pathname = new URL(url).pathname;
      }
    } catch {
      // Keep original url string
    }

    // Strip leading /uploads/ or uploads/
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
        return NextResponse.json({ error: "Delete failed" }, { status: 500 });
      }
      // "not found" is fine — the file is already gone
    }

    return NextResponse.json({ result: "ok" });
  } catch (error) {
    console.error("File delete handler failed:", error);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
