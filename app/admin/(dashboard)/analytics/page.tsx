import { prisma } from "@/lib/db";
import { AnalyticsChart } from "@/components/admin/analytics-chart";

interface DailyRow {
  day: Date;
  views: bigint;
  visitors: bigint;
}

interface TopPageRow {
  path: string;
  views: bigint;
}

export default async function AnalyticsPage() {
  const [totalViews, totalVisitorsRows, daily, topPages] = await Promise.all([
    prisma.pageView.count(),
    prisma.$queryRaw<{ count: bigint }[]>`
      SELECT COUNT(DISTINCT "visitorId")::bigint as count FROM "PageView"
    `,
    prisma.$queryRaw<DailyRow[]>`
      SELECT
        DATE_TRUNC('day', "createdAt") as day,
        COUNT(*)::bigint as views,
        COUNT(DISTINCT "visitorId")::bigint as visitors
      FROM "PageView"
      WHERE "createdAt" >= NOW() - INTERVAL '13 days'
      GROUP BY day
      ORDER BY day ASC
    `,
    prisma.$queryRaw<TopPageRow[]>`
      SELECT path, COUNT(*)::bigint as views
      FROM "PageView"
      GROUP BY path
      ORDER BY views DESC
      LIMIT 5
    `,
  ]);

  const totalVisitors = Number(totalVisitorsRows[0]?.count ?? 0);

  // Fill in any missing days in the last 14 days with zero counts.
  const days: { date: string; views: number; visitors: number }[] = [];
  for (let i = 13; i >= 0; i--) {
    const d = new Date();
    d.setUTCHours(0, 0, 0, 0);
    d.setUTCDate(d.getUTCDate() - i);
    const key = d.toISOString().slice(0, 10);
    const match = daily.find(
      (row) => new Date(row.day).toISOString().slice(0, 10) === key,
    );
    days.push({
      date: key,
      views: match ? Number(match.views) : 0,
      visitors: match ? Number(match.visitors) : 0,
    });
  }

  return (
    <div>
      <h1 className="text-xl font-semibold text-foreground">Analytics</h1>
      <p className="mt-1 text-sm text-muted">Visitor traffic over the last 14 days</p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-border bg-surface p-5">
          <p className="text-xs font-medium text-muted-foreground">Total Page Views</p>
          <p className="mt-1 text-2xl font-semibold text-foreground">{totalViews}</p>
        </div>
        <div className="rounded-2xl border border-border bg-surface p-5">
          <p className="text-xs font-medium text-muted-foreground">Unique Visitors</p>
          <p className="mt-1 text-2xl font-semibold text-foreground">{totalVisitors}</p>
        </div>
        <div className="rounded-2xl border border-border bg-surface p-5">
          <p className="text-xs font-medium text-muted-foreground">Views (last 14 days)</p>
          <p className="mt-1 text-2xl font-semibold text-foreground">
            {days.reduce((sum, d) => sum + d.views, 0)}
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-surface p-6">
        <AnalyticsChart data={days} />
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-surface p-6">
        <h2 className="text-sm font-semibold text-foreground">Top Pages</h2>
        <ul className="mt-4 flex flex-col gap-3">
          {topPages.length === 0 && (
            <li className="text-sm text-muted">No data yet.</li>
          )}
          {topPages.map((p) => (
            <li key={p.path} className="flex items-center justify-between text-sm">
              <span className="text-muted">{p.path}</span>
              <span className="font-medium text-foreground">{Number(p.views)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
