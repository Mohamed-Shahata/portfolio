"use client";

import { motion } from "framer-motion";

export function AnimatedBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 grid-pattern mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_60%,transparent_100%)]" />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 0.5, scale: 1 }}
        transition={{ duration: 1.6, ease: "easeOut" }}
        className="absolute left-1/2 top-[-10%] h-150 w-225 -translate-x-1/2 rounded-full bg-accent/25 blur-[140px]"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 2, delay: 0.3, ease: "easeOut" }}
        className="absolute right-[-10%] top-[10%] h-100 w-100 rounded-full bg-accent-2/25 blur-[120px]"
      />
    </div>
  );
}
