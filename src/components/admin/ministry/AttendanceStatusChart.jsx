import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

function StatusTooltip({ active, payload }) {
  if (!active || !payload || !payload.length) return null;
  const p = payload[0].payload;
  return (
    <div className="bg-card border border-border rounded-lg shadow-md px-3 py-2 text-xs flex items-center gap-2">
      <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
      <span className="text-muted-foreground">{p.name}:</span>
      <span className="text-foreground font-medium">{p.value}</span>
    </div>
  );
}

export function AttendanceStatusChart({ data, rate }) {
  if (!data.length) {
    return (
      <div className="h-[220px] flex items-center justify-center text-sm text-muted-foreground">
        No attendance records yet.
      </div>
    );
  }
  return (
    <div className="relative">
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" innerRadius={62} outerRadius={88} paddingAngle={2} stroke="none">
            {data.map((d, i) => (
              <Cell key={i} fill={d.color} />
            ))}
          </Pie>
          <Tooltip content={<StatusTooltip />} />
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="font-heading text-2xl font-bold text-foreground">{rate}%</span>
        <span className="text-xs text-muted-foreground">Attendance</span>
      </div>
    </div>
  );
}