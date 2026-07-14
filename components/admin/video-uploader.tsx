"use client";

import { useRef, useState } from "react";
import { Upload, X, Loader2, Video as VideoIcon } from "lucide-react";

interface VideoUploaderProps {
  label: string;
  video: string | null;
  onChange: (video: string | null) => void;
}

/** Uploads a single walkthrough video to Cloudinary via /api/admin/upload. */
export function VideoUploader({ label, video, onChange }: VideoUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleRemove = async () => {
    if (!video) return;
    const src = video;
    setDeleting(true);
    onChange(null);
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
    setDeleting(false);
  };

  const handleFile = async (files: FileList | null) => {
    const file = files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);
    const formData = new FormData();
    formData.set("file", file);
    formData.set("type", "video");
    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        onChange(data.url);
      } else {
        setError(data.error ?? "Upload failed");
      }
    } catch {
      setError("Upload failed");
    }
    setUploading(false);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div>
      <label className="text-xs font-medium text-muted-foreground">
        {label}
      </label>
      <div className="mt-1.5">
        {video ? (
          <div className="group relative overflow-hidden rounded-xl border border-border bg-surface">
            <video src={video} controls className="aspect-video w-full" />
            <button
              type="button"
              onClick={handleRemove}
              disabled={deleting}
              className="absolute right-2 top-2 flex size-7 items-center justify-center rounded-full bg-background/80 text-foreground opacity-0 transition-opacity group-hover:opacity-100 disabled:opacity-100"
              aria-label="Remove video"
            >
              {deleting ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <X className="size-4" />
              )}
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="flex aspect-video w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border text-muted-foreground transition-colors hover:border-accent hover:text-accent"
          >
            {uploading ? (
              <Loader2 className="size-6 animate-spin" />
            ) : (
              <>
                <VideoIcon className="size-6" />
                <span className="flex items-center gap-1 text-xs">
                  <Upload className="size-3.5" />
                  Upload walkthrough video
                </span>
              </>
            )}
          </button>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="video/*"
          className="hidden"
          onChange={(e) => handleFile(e.target.files)}
        />
        {error && <p className="mt-1.5 text-xs text-destructive">{error}</p>}
      </div>
    </div>
  );
}
