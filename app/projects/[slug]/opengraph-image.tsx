import { ImageResponse } from "next/og";
import { getProjectBySlugDb as getProjectBySlug } from "@/lib/data";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  const title = project?.title ?? "Project";
  const tagline = project?.tagline ?? "";
  const type = project?.type ?? "";

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px",
        background: "#08090a",
        backgroundImage:
          "radial-gradient(circle at 20% 20%, rgba(99,102,241,0.25), transparent 55%), radial-gradient(circle at 80% 80%, rgba(139,92,246,0.25), transparent 55%)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          fontSize: 28,
          color: "#f5f6f7",
          fontWeight: 600,
        }}
      >
        Dev<span style={{ color: "#8b5cf6" }}>Core</span>
      </div>
      {type && (
        <div
          style={{
            display: "flex",
            marginTop: 40,
            padding: "8px 20px",
            borderRadius: 999,
            border: "1px solid #2a2e33",
            color: "#6366f1",
            fontSize: 24,
            width: "fit-content",
          }}
        >
          {type}
        </div>
      )}
      <div
        style={{
          display: "flex",
          marginTop: 24,
          fontSize: 64,
          fontWeight: 700,
          color: "#f5f6f7",
          lineHeight: 1.1,
          maxWidth: 1000,
        }}
      >
        {title}
      </div>
      <div
        style={{
          display: "flex",
          marginTop: 24,
          fontSize: 30,
          color: "#9a9fa6",
          maxWidth: 900,
          lineHeight: 1.4,
        }}
      >
        {tagline}
      </div>
    </div>,
    { ...size },
  );
}
