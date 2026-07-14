import { NextResponse } from "next/server";
import crypto from "node:crypto";

/** Derives the Cloudinary public_id (including folder) from a secure_url,
 * e.g. https://res.cloudinary.com/<cloud>/image/upload/v123/dev-core-portfolio/abc.png
 * -> dev-core-portfolio/abc  (also returns resource_type: "image" | "video" | "raw") */
function parseCloudinaryUrl(url: string) {
  const match = url.match(
    /\/(image|video|raw)\/upload\/(?:v\d+\/)?([^?#]+)\.[a-zA-Z0-9]+(?:[?#].*)?$/,
  );
  if (!match) return null;
  const [, resourceType, publicId] = match;
  return { resourceType, publicId };
}

export async function POST(request: Request) {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    return NextResponse.json(
      { error: "Cloudinary is not configured." },
      { status: 500 },
    );
  }

  const { url } = (await request.json()) as { url?: string };
  if (!url) {
    return NextResponse.json({ error: "No url provided" }, { status: 400 });
  }

  // Only ever attempt to delete assets that actually live on our Cloudinary
  // account — never accept an arbitrary public_id from the client.
  if (!url.includes(`res.cloudinary.com/${cloudName}/`)) {
    return NextResponse.json(
      { error: "Not a Cloudinary URL" },
      { status: 400 },
    );
  }

  const parsed = parseCloudinaryUrl(url);
  if (!parsed) {
    return NextResponse.json(
      { error: "Could not parse Cloudinary URL" },
      { status: 400 },
    );
  }
  const { resourceType, publicId } = parsed;

  const timestamp = Math.floor(Date.now() / 1000);
  const signatureBase = `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
  const signature = crypto
    .createHash("sha1")
    .update(signatureBase)
    .digest("hex");

  const destroyForm = new FormData();
  destroyForm.set("public_id", publicId);
  destroyForm.set("api_key", apiKey);
  destroyForm.set("timestamp", String(timestamp));
  destroyForm.set("signature", signature);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/destroy`,
    { method: "POST", body: destroyForm },
  );

  if (!res.ok) {
    const errBody = await res.text();
    console.error("Cloudinary delete failed:", errBody);
    return NextResponse.json({ error: "Delete failed" }, { status: 502 });
  }

  const data = (await res.json()) as { result: string };
  // "not found" isn't fatal for us — the asset is gone either way, which is
  // what the caller wants.
  if (data.result !== "ok" && data.result !== "not found") {
    return NextResponse.json({ error: data.result }, { status: 502 });
  }

  return NextResponse.json({ result: data.result });
}
