import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

function TrendTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;
  const p = payload[0].payload;
  return (
    <div className="bg-card border border-border rounded-lg shadow-md px-3 py-2 text-xs">
      <div className="font-medium text-foreground mb-1">{label}</div>
      <div className="text-muted-foreground">Attendance: <span className="text-foreground font-medium">{p.rate}%</span></div>
      <div className="text-muted-foreground">{p.present} of {p.total} recorded present</div>
    </div>
  );
}

export function AttendanceTrendChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={data} margin={{ top: 8, right: 12, left: -16, bottom: 0 }}>
        <defs>
          <linearGradient id="attGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(var(--chart-1))" stopOpacity={0.35} />
            <stop offset="100%" stopColor="hsl(var(--chart-1))" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
        <XAxis dataKey="label" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
        <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
        <Tooltip content={<TrendTooltip />} cursor={{ stroke: "hsl(var(--border))" }} />
        <Area type="monotone" dataKey="rate" name="Attendance" stroke="hsl(var(--chart-1))" strokeWidth={2.5} fill="url(#attGrad)" dot={{ r: 3, fill: "hsl(var(--chart-1))" }} />
      </AreaChart>
    </ResponsiveContainer>
  );
}