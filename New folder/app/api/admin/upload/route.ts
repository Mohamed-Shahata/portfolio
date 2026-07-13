import { NextResponse } from "next/server";
import crypto from "node:crypto";

const MAX_IMAGE_SIZE = 8 * 1024 * 1024; // 8MB
const MAX_VIDEO_SIZE = 100 * 1024 * 1024; // 100MB
const MAX_DOC_SIZE = 15 * 1024 * 1024; // 15MB

export async function POST(request: Request) {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    return NextResponse.json(
      {
        error:
          "Cloudinary is not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in your .env.",
      },
      { status: 500 },
    );
  }

  const formData = await request.formData();
  const file = formData.get("file");
  const rawType = formData.get("type");
  const kind = rawType === "video" ? "video" : rawType === "document" ? "document" : "image";
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }
  const maxSize = kind === "video" ? MAX_VIDEO_SIZE : kind === "document" ? MAX_DOC_SIZE : MAX_IMAGE_SIZE;
  if (file.size > maxSize) {
    return NextResponse.json(
      { error: `File too large (max ${maxSize / 1024 / 1024}MB)` },
      { status: 400 },
    );
  }
  if (kind === "document") {
    if (file.type !== "application/pdf") {
      return NextResponse.json({ error: "Only PDF files are allowed" }, { status: 400 });
    }
  } else if (!file.type.startsWith(`${kind}/`)) {
    return NextResponse.json(
      { error: `Only ${kind} files are allowed` },
      { status: 400 },
    );
  }

  const folder = "dev-core-portfolio";
  const timestamp = Math.floor(Date.now() / 1000);
  // Params must be alphabetically sorted, excluding file/api_key/signature.
  const signatureBase = `folder=${folder}&timestamp=${timestamp}${apiSecret}`;
  const signature = crypto
    .createHash("sha1")
    .update(signatureBase)
    .digest("hex");

  const uploadForm = new FormData();
  uploadForm.set("file", file);
  uploadForm.set("api_key", apiKey);
  uploadForm.set("timestamp", String(timestamp));
  uploadForm.set("signature", signature);
  uploadForm.set("folder", folder);

  const resourceType = kind === "document" ? "raw" : kind;
  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`,
    { method: "POST", body: uploadForm },
  );

  if (!res.ok) {
    const errBody = await res.text();
    console.error("Cloudinary upload failed:", errBody);
    return NextResponse.json({ error: "Upload failed" }, { status: 502 });
  }

  const data = (await res.json()) as { secure_url: string };
  return NextResponse.json({ url: data.secure_url });
}
