import { useList } from "@/lib/useList";
import { PageHeader, Card, Badge, StatCard, LoadingState } from "@/components/admin/ui-bits";
import { Building2, HardHat, CheckCircle2, PauseCircle } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/format";

const STATUS_VARIANT = { in_progress: "warning", planning: "muted", completed: "success", on_hold: "danger" };
const STATUS_ICON = { in_progress: HardHat, planning: Building2, completed: CheckCircle2, on_hold: PauseCircle };

export default function Facilities() {
  const { data, loading } = useList("Project", "-created_date");

  if (loading) return <LoadingState />;

  const totalBudget = data.reduce((s, p) => s + (p.budget || 0), 0);
  const totalSpent = data.reduce((s, p) => s + (p.expenditure || 0), 0);
  const active = data.filter((p) => p.status === "in_progress").length;

  return (
    <div>
      <PageHeader title="Facilities & Development" subtitle="Church building projects and maintenance" icon={Building2} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={Building2} label="Total Projects" value={data.length} />
        <StatCard icon={HardHat} label="Active" value={active} tone="accent" />
        <StatCard icon={Building2} label="Total Budget" value={formatCurrency(totalBudget)} tone="blue" />
        <StatCard icon={CheckCircle2} label="Spent" value={formatCurrency(totalSpent)} tone="rose" />
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        {data.map((p) => {
          const SIcon = STATUS_ICON[p.status] || Building2;
          const pct = p.progress || 0;
          const budgetPct = p.budget ? Math.min(100, Math.round((p.expenditure / p.budget) * 100)) : 0;
          return (
            <Card key={p.id} className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-heading font-semibold text-foreground">{p.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{p.description}</p>
                </div>
                <Badge variant={STATUS_VARIANT[p.status]}><SIcon className="w-3 h-3 mr-1" />{p.status.replace("_", " ")}</Badge>
              </div>

              <div className="mt-4">
                <div className="flex justify-between text-xs mb-1.5"><span className="text-muted-foreground">Completion</span><span className="font-medium text-foreground">{pct}%</span></div>
                <div className="h-2 rounded-full bg-muted overflow-hidden"><div className="h-full bg-primary rounded-full" style={{ width: `${pct}%` }} /></div>
              </div>

              <div className="mt-4">
                <div className="flex justify-between text-xs mb-1.5"><span className="text-muted-foreground">Budget used</span><span className="font-medium text-foreground">{budgetPct}%</span></div>
                <div className="h-2 rounded-full bg-muted overflow-hidden"><div className="h-full bg-accent rounded-full" style={{ width: `${budgetPct}%` }} /></div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-5 pt-4 border-t border-border text-sm">
                <div><div className="text-xs text-muted-foreground">Budget</div><div className="font-medium text-foreground">{formatCurrency(p.budget)}</div></div>
                <div><div className="text-xs text-muted-foreground">Spent</div><div className="font-medium text-foreground">{formatCurrency(p.expenditure)}</div></div>
                <div><div className="text-xs text-muted-foreground">Manager</div><div className="font-medium text-foreground">{p.manager}</div></div>
                <div><div className="text-xs text-muted-foreground">Target</div><div className="font-medium text-foreground">{formatDate(p.target_date)}</div></div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}