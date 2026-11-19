import { NextResponse } from "next/server";
import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { put } from "@vercel/blob";

const MAX_IMAGE_SIZE = 8 * 1024 * 1024; // 8MB
const MAX_VIDEO_SIZE = 100 * 1024 * 1024; // 100MB
const MAX_DOC_SIZE = 15 * 1024 * 1024; // 15MB

const MIME_EXTENSION_MAP: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
  "image/svg+xml": ".svg",
  "image/avif": ".avif",
  "video/mp4": ".mp4",
  "video/webm": ".webm",
  "video/ogg": ".ogg",
  "video/quicktime": ".mov",
  "application/pdf": ".pdf",
};

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const rawType = formData.get("type");
    const kind =
      rawType === "video"
        ? "video"
        : rawType === "document"
          ? "document"
          : "image";

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const maxSize =
      kind === "video"
        ? MAX_VIDEO_SIZE
        : kind === "document"
          ? MAX_DOC_SIZE
          : MAX_IMAGE_SIZE;

    if (file.size > maxSize) {
      return NextResponse.json(
        { error: `File too large (max ${maxSize / 1024 / 1024}MB)` },
        { status: 400 },
      );
    }

    if (kind === "document") {
      if (file.type !== "application/pdf") {
        return NextResponse.json(
          { error: "Only PDF files are allowed" },
          { status: 400 },
        );
      }
    } else if (!file.type.startsWith(`${kind}/`)) {
      return NextResponse.json(
        { error: `Only ${kind} files are allowed` },
        { status: 400 },
      );
    }

    // Determine safe file extension
    let ext = path.extname(file.name).toLowerCase();
    const allowedExtsForKind: Record<string, string[]> = {
      image: [".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg", ".avif"],
      video: [".mp4", ".webm", ".ogg", ".mov", ".mkv"],
      document: [".pdf"],
    };

    if (!allowedExtsForKind[kind]?.includes(ext)) {
      ext = MIME_EXTENSION_MAP[file.type] || (kind === "document" ? ".pdf" : kind === "video" ? ".mp4" : ".png");
    }

    const subfolder = kind === "document" ? "documents" : kind === "video" ? "videos" : "images";
    const randomSuffix = crypto.randomBytes(8).toString("hex");
    const filename = `${Date.now()}-${randomSuffix}${ext}`;

    // 1. If Vercel Blob token is available, upload directly to Vercel Blob
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const blob = await put(`${subfolder}/${filename}`, file, {
        access: "public",
        contentType: file.type || undefined,
      });
      return NextResponse.json({ url: blob.url });
    }

    // 2. Fallback for local development or custom server storage
    try {
      const uploadDir = path.resolve(/* turbopackIgnore: true */ process.cwd(), "public", "uploads", subfolder);
      await fs.mkdir(uploadDir, { recursive: true });

      const filePath = path.join(uploadDir, filename);
      const arrayBuffer = await file.arrayBuffer();
      await fs.writeFile(filePath, Buffer.from(arrayBuffer));

      const publicUrl = `/uploads/${subfolder}/${filename}`;
      return NextResponse.json({ url: publicUrl });
    } catch (fsErr: unknown) {
      const isReadOnly = (fsErr as { code?: string })?.code === "EROFS";
      if (isReadOnly || process.env.VERCEL) {
        return NextResponse.json(
          {
            error:
              "Vercel Blob token not found. Please connect a Blob store to your project in Vercel Dashboard.",
          },
          { status: 500 },
        );
      }
      throw fsErr;
    }
  } catch (error) {
    console.error("File upload failed:", error);
    const msg = error instanceof Error ? error.message : "Upload failed";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
