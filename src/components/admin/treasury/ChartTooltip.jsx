import { formatCurrency } from "@/lib/format";

export function ChartTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;
  const fullName = payload[0]?.payload?.name;
  return (
    <div className="bg-card border border-border rounded-lg shadow-md px-3 py-2 text-xs">
      <div className="font-medium text-foreground mb-1">{fullName || label}</div>
      <div className="space-y-0.5">
        {payload.map((p) => (
          <div key={p.dataKey} className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ background: p.color || p.fill || p.stroke }} />
            <span className="text-muted-foreground capitalize">{p.name}:</span>
            <span className="text-foreground font-medium">{formatCurrency(p.value).replace("KSh ", "")}</span>
          </div>
        ))}
      </div>
    </div>
  );
}