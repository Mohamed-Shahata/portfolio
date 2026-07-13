export default function Loading() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="relative size-12">
          <div className="absolute inset-0 rounded-full border-2 border-border" />
          <div
            className="absolute inset-0 animate-spin rounded-full border-2 border-transparent"
            style={{
              borderTopColor: "var(--accent)",
              borderRightColor: "var(--accent-2)",
            }}
          />
        </div>
        <p className="text-xs font-medium tracking-wide text-muted-foreground">
          Loading…
        </p>
      </div>
    </div>
  );
}
