import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface TechBadgeProps {
  label: string;
  icon?: LucideIcon;
  className?: string;
}

export function TechBadge({ label, icon: Icon, className }: TechBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-lg border border-border bg-background-elevated px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:border-border-hover hover:text-foreground",
        className
      )}
    >
      {Icon && <Icon className="size-3.5" />}
      {label}
    </span>
  );
}
