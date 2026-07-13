import { NextResponse } from "next/server";
import crypto from "node:crypto";

const MAX_FILE_SIZE = 8 * 1024 * 1024; // 8MB

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
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }
  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json(
      { error: "File too large (max 8MB)" },
      { status: 400 },
    );
  }
  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "Only image files are allowed" }, { status: 400 });
  }

  const folder = "dev-core-portfolio";
  const timestamp = Math.floor(Date.now() / 1000);
  // Params must be alphabetically sorted, excluding file/api_key/signature.
  const signatureBase = `folder=${folder}&timestamp=${timestamp}${apiSecret}`;
  const signature = crypto.createHash("sha1").update(signatureBase).digest("hex");

  const uploadForm = new FormData();
  uploadForm.set("file", file);
  uploadForm.set("api_key", apiKey);
  uploadForm.set("timestamp", String(timestamp));
  uploadForm.set("signature", signature);
  uploadForm.set("folder", folder);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
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
