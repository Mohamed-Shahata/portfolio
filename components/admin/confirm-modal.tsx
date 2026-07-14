"use client";

import { AlertTriangle } from "lucide-react";

interface ConfirmModalProps {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

/** Small reusable confirmation dialog for destructive/important actions
 * (logout, delete, etc.) — matches the admin dashboard's dark UI. */
export function ConfirmModal({
  open,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60"
        onClick={onCancel}
        aria-hidden="true"
      />
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-modal-title"
        className="relative w-full max-w-sm rounded-2xl border border-border bg-background-elevated p-6 shadow-xl"
      >
        <div className="flex items-start gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-destructive/10 text-destructive">
            <AlertTriangle className="size-5" />
          </div>
          <div>
            <h2
              id="confirm-modal-title"
              className="text-sm font-semibold text-foreground"
            >
              {title}
            </h2>
            <p className="mt-1.5 text-sm text-muted">{description}</p>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-border px-3.5 py-2 text-sm text-muted transition-colors hover:bg-surface-hover hover:text-foreground"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-lg bg-destructive px-3.5 py-2 text-sm font-medium text-white transition-colors hover:bg-destructive/90"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
