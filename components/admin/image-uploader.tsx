"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Upload, X, Loader2 } from "lucide-react";

interface ImageUploaderProps {
  label: string;
  images: string[];
  onChange: (images: string[]) => void;
}

/** Uploads to Cloudinary via /api/admin/upload; first image is used as
 * the card/hero image, the rest populate the project gallery. */
export function ImageUploader({ label, images, onChange }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleRemove = async (src: string) => {
    setDeleting(src);
    onChange(images.filter((s) => s !== src));
    try {
      const res = await fetch("/api/admin/upload/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: src }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "Failed to delete from Cloudinary");
      }
    } catch {
      setError("Failed to delete from Cloudinary");
    }
    setDeleting(null);
  };

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    setError(null);
    const uploaded: string[] = [];
    for (const file of Array.from(files)) {
      const formData = new FormData();
      formData.set("file", file);
      try {
        const res = await fetch("/api/admin/upload", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        if (res.ok) {
          uploaded.push(data.url);
        } else {
          setError(data.error ?? "Upload failed");
        }
      } catch {
        setError("Upload failed");
      }
    }
    onChange([...images, ...uploaded]);
    setUploading(false);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div>
      <label className="text-xs font-medium text-muted-foreground">
        {label}
      </label>
      <div className="mt-1.5 flex flex-wrap gap-3">
        {images.map((src, i) => (
          <div
            key={src}
            className="group relative size-24 shrink-0 overflow-hidden rounded-xl border border-border bg-surface"
          >
            <Image
              src={src}
              alt=""
              fill
              sizes="96px"
              className="object-cover"
            />
            {i === 0 && (
              <span className="absolute left-1 top-1 rounded bg-background/80 px-1.5 py-0.5 text-[10px] font-medium text-foreground">
                Hero
              </span>
            )}
            <button
              type="button"
              onClick={() => handleRemove(src)}
              disabled={deleting === src}
              className="absolute right-1 top-1 flex size-5 items-center justify-center rounded-full bg-background/80 text-foreground opacity-0 transition-opacity group-hover:opacity-100 disabled:opacity-100"
              aria-label="Remove image"
            >
              {deleting === src ? (
                <Loader2 className="size-3 animate-spin" />
              ) : (
                <X className="size-3" />
              )}
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="flex size-24 shrink-0 flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-border text-muted-foreground transition-colors hover:border-accent hover:text-accent"
        >
          {uploading ? (
            <Loader2 className="size-5 animate-spin" />
          ) : (
            <>
              <Upload className="size-5" />
              <span className="text-[10px]">Upload</span>
            </>
          )}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          hidden
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>
      {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
      <p className="mt-1.5 text-xs text-muted-foreground">
        First image is used as the card preview and hero image. Drag to reorder
        isn&apos;t supported yet — remove and re-upload in the order you want.
      </p>
    </div>
  );
}
