"use client";

import { Plus, Trash2 } from "lucide-react";

interface ListEditorProps {
  label: string;
  values: string[];
  onChange: (values: string[]) => void;
  dir?: "ltr" | "rtl";
}

/** One text input per line, for arrays of full sentences (e.g. features). */
export function ListEditor({ label, values, onChange, dir }: ListEditorProps) {
  const update = (index: number, value: string) => {
    const next = [...values];
    next[index] = value;
    onChange(next);
  };

  return (
    <div>
      <label className="text-xs font-medium text-muted-foreground">{label}</label>
      <div className="mt-1.5 flex flex-col gap-2">
        {values.map((v, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              type="text"
              dir={dir}
              value={v}
              onChange={(e) => update(i, e.target.value)}
              className="h-10 flex-1 rounded-lg border border-border bg-background-elevated px-3 text-sm text-foreground outline-none transition-colors focus:border-accent"
            />
            <button
              type="button"
              onClick={() => onChange(values.filter((_, idx) => idx !== i))}
              className="text-muted-foreground transition-colors hover:text-destructive"
              aria-label="Remove"
            >
              <Trash2 className="size-4" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => onChange([...values, ""])}
          className="flex items-center gap-1.5 self-start text-xs text-accent transition-colors hover:text-accent-2"
        >
          <Plus className="size-3.5" />
          Add item
        </button>
      </div>
    </div>
  );
}
