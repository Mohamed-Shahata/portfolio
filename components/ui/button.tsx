"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all duration-300 ease-out disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        primary:
          "bg-foreground text-background hover:opacity-90 hover:-translate-y-0.5 shadow-[0_0_0_1px_rgba(255,255,255,0.06)]",
        gradient:
          "bg-gradient-to-r from-accent to-accent-2 text-white hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(99,102,241,0.35)]",
        outline:
          "border border-border text-foreground hover:border-border-hover hover:bg-surface hover:-translate-y-0.5",
        ghost: "text-muted hover:text-foreground hover:bg-surface",
      },
      size: {
        sm: "h-9 px-4 text-xs",
        md: "h-11 px-6",
        lg: "h-13 px-8 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
