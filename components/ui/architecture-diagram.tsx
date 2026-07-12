"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DiagramNode {
  icon: LucideIcon;
  label: string;
  sublabel?: string;
}

interface ArchitectureDiagramProps {
  title: string;
  nodes: DiagramNode[];
  className?: string;
}

export function ArchitectureDiagram({
  title,
  nodes,
  className,
}: ArchitectureDiagramProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-surface p-6 sm:p-8",
        className,
      )}
    >
      <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
      <div className="mt-6 flex flex-col items-center">
        {nodes.map((node, i) => (
          <div key={node.label} className="flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.1, ease: "easeOut" }}
              className="flex w-full min-w-55 items-center gap-3 rounded-xl border border-border-hover bg-background-elevated px-4 py-3"
            >
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
                <node.icon className="size-4.5" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  {node.label}
                </p>
                {node.sublabel && (
                  <p className="text-xs text-muted-foreground">
                    {node.sublabel}
                  </p>
                )}
              </div>
            </motion.div>
            {i < nodes.length - 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.1 + 0.15 }}
                className="py-1.5 text-muted-foreground"
              >
                <ArrowDown className="size-4" />
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
