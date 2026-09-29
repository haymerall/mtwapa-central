import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { ChartTooltip } from "./ChartTooltip";

export function ProjectBudgetChart({ data }) {
  const chartData = data.map((p) => ({
    ...p,
    short: p.name.length > 20 ? p.name.slice(0, 19) + "…" : p.name,
  }));
  return (
    <ResponsiveContainer width="100%" height={Math.max(220, chartData.length * 70)}>
      <BarChart data={chartData} layout="vertical" margin={{ top: 8, right: 16, left: 8, bottom: 8 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
        <XAxis
          type="number"
          tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
        />
        <YAxis
          type="category"
          dataKey="short"
          tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
          axisLine={false}
          tickLine={false}
          width={150}
        />
        <Tooltip content={<ChartTooltip />} cursor={{ fill: "hsl(var(--muted))" }} />
        <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
        <Bar dataKey="budget" name="Budget" fill="hsl(var(--chart-3))" radius={[0, 4, 4, 0]} maxBarSize={22} />
        <Bar dataKey="expenditure" name="Expenditure" fill="hsl(var(--chart-2))" radius={[0, 4, 4, 0]} maxBarSize={22} />
      </BarChart>
    </ResponsiveContainer>
  );
}