"use client";

import { useRef, useState } from "react";
import { Upload, X, Loader2, FileText } from "lucide-react";

interface ResumeUploaderProps {
  label: string;
  fileUrl: string | null;
  onChange: (url: string | null) => void;
}

/** Uploads a single PDF resume to Cloudinary via /api/admin/upload. */
export function ResumeUploader({ label, fileUrl, onChange }: ResumeUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (files: FileList | null) => {
    const file = files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);
    const formData = new FormData();
    formData.set("file", file);
    formData.set("type", "document");
    try {
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
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
      <label className="text-xs font-medium text-muted-foreground">{label}</label>
      <div className="mt-1.5 flex items-center gap-3">
        {fileUrl ? (
          <div className="flex flex-1 items-center justify-between gap-3 rounded-lg border border-border bg-background-elevated px-3 py-2">
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-foreground hover:text-accent"
            >
              <FileText className="size-4" />
              Current resume.pdf
            </a>
            <button
              type="button"
              onClick={() => onChange(null)}
              className="text-muted-foreground transition-colors hover:text-destructive"
              aria-label="Remove resume"
            >
              <X className="size-4" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="flex items-center gap-1.5 rounded-lg border border-dashed border-border px-3 py-2 text-xs text-muted-foreground transition-colors hover:border-accent hover:text-accent"
          >
            {uploading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <>
                <Upload className="size-3.5" />
                Upload PDF resume
              </>
            )}
          </button>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={(e) => handleFile(e.target.files)}
        />
      </div>
      {error && <p className="mt-1.5 text-xs text-destructive">{error}</p>}
    </div>
  );
}
