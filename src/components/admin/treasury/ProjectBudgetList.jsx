import { Badge } from "@/components/admin/ui-bits";
import { formatCurrency } from "@/lib/format";

const STATUS_VARIANT = { in_progress: "primary", planning: "muted", completed: "success", on_hold: "warning" };
const STATUS_LABEL = { in_progress: "In Progress", planning: "Planning", completed: "Completed", on_hold: "On Hold" };

export function ProjectBudgetList({ data }) {
  if (!data.length) {
    return <p className="text-sm text-muted-foreground">No projects to report on.</p>;
  }
  return (
    <div className="space-y-5">
      {data.map((p) => {
        const over = p.pct > 100;
        const tone = over ? "bg-rose-500" : p.pct >= 85 ? "bg-amber-500" : "bg-emerald-500";
        return (
          <div key={p.name}>
            <div className="flex items-center justify-between gap-2 mb-1.5 flex-wrap">
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-sm font-medium text-foreground truncate">{p.name}</span>
                <Badge variant={STATUS_VARIANT[p.status] || "muted"}>{STATUS_LABEL[p.status] || p.status}</Badge>
                {over && <Badge variant="danger">Over budget</Badge>}
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap">{p.pct}% used</span>
            </div>
            <div className="h-2.5 rounded-full bg-muted overflow-hidden">
              <div className={`h-full ${tone} rounded-full transition-all`} style={{ width: `${Math.min(100, p.pct)}%` }} />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>{formatCurrency(p.expenditure)} spent</span>
              <span>{formatCurrency(Math.abs(p.remaining))} {p.remaining < 0 ? "over" : "remaining"} of {formatCurrency(p.budget)}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}