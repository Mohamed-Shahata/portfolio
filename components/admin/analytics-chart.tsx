"use client";

import { useState } from "react";

interface DayData {
  date: string;
  views: number;
  visitors: number;
}

export function AnalyticsChart({ data }: { data: DayData[] }) {
  const [hover, setHover] = useState<number | null>(null);
  const max = Math.max(1, ...data.map((d) => d.views));
  const width = 700;
  const height = 220;
  const padding = 24;
  const barGap = 6;
  const barWidth = (width - padding * 2) / data.length - barGap;

  const active = hover !== null ? data[hover] : null;

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-foreground">Daily Views</h2>
        {active && (
          <p className="text-xs text-muted-foreground">
            {active.date} — <span className="font-medium text-foreground">{active.views}</span> views,{" "}
            <span className="font-medium text-foreground">{active.visitors}</span> visitors
          </p>
        )}
      </div>

      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="mt-4 w-full"
        preserveAspectRatio="none"
        style={{ height: 200 }}
      >
        <defs>
          <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--accent)" />
            <stop offset="100%" stopColor="var(--accent-2)" />
          </linearGradient>
        </defs>

        {[0.25, 0.5, 0.75, 1].map((f) => (
          <line
            key={f}
            x1={padding}
            x2={width - padding}
            y1={height - padding - (height - padding * 2) * f}
            y2={height - padding - (height - padding * 2) * f}
            stroke="var(--border)"
            strokeWidth={1}
          />
        ))}

        {data.map((d, i) => {
          const barHeight = (d.views / max) * (height - padding * 2);
          const x = padding + i * (barWidth + barGap);
          const y = height - padding - barHeight;
          return (
            <g key={d.date}>
              <rect
                x={x}
                y={y}
                width={Math.max(barWidth, 1)}
                height={Math.max(barHeight, 1)}
                rx={3}
                fill="url(#barGradient)"
                opacity={hover === null || hover === i ? 1 : 0.35}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                style={{ cursor: "pointer" }}
              />
            </g>
          );
        })}
      </svg>

      <div className="mt-1 flex justify-between text-[10px] text-muted-foreground">
        <span>{data[0]?.date.slice(5)}</span>
        <span>{data[data.length - 1]?.date.slice(5)}</span>
      </div>
    </div>
  );
}
