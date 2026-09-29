import { useMemo } from "react";
import { useList } from "@/lib/useList";
import { PageHeader, Card, Badge, StatCard, LoadingState, EmptyState } from "@/components/admin/ui-bits";
import { formatCurrency } from "@/lib/format";
import { BarChart3, TrendingUp, TrendingDown, Wallet, Gauge, Building2 } from "lucide-react";
import { MonthlyFlowChart } from "@/components/admin/treasury/MonthlyFlowChart";
import { ProjectBudgetChart } from "@/components/admin/treasury/ProjectBudgetChart";
import { ProjectBudgetList } from "@/components/admin/treasury/ProjectBudgetList";

const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function monthKey(dateStr) {
  const d = new Date(dateStr);
  if (isNaN(d)) return null;
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}
function monthLabel(key) {
  const [, m] = key.split("-");
  return MONTH_NAMES[parseInt(m, 10) - 1];
}

export default function TreasuryReports() {
  const { data: tx, loading: txLoading } = useList("Transaction", "-date");
  const { data: projects, loading: pjLoading } = useList("Project", "-updated_date");

  const monthly = useMemo(() => {
    const map = {};
    tx.forEach((t) => {
      const k = monthKey(t.date);
      if (!k) return;
      if (!map[k]) map[k] = { month: k, label: monthLabel(k), contributions: 0, expenditures: 0 };
      if (t.type === "income") map[k].contributions += t.amount || 0;
      else map[k].expenditures += t.amount || 0;
    });
    return Object.values(map)
      .sort((a, b) => a.month.localeCompare(b.month))
      .map((m) => ({ ...m, net: m.contributions - m.expenditures }));
  }, [tx]);

  const totals = useMemo(() => {
    const income = tx.filter((t) => t.type === "income").reduce((s, t) => s + (t.amount || 0), 0);
    const expense = tx.filter((t) => t.type === "expense").reduce((s, t) => s + (t.amount || 0), 0);
    return { income, expense, net: income - expense };
  }, [tx]);

  const projectData = useMemo(
    () =>
      projects.map((p) => {
        const budget = p.budget || 0;
        const expenditure = p.expenditure || 0;
        return {
          name: p.name,
          budget,
          expenditure,
          remaining: budget - expenditure,
          pct: budget ? Math.round((expenditure / budget) * 100) : 0,
          status: p.status,
          manager: p.manager,
        };
      }),
    [projects]
  );

  const budgetHealth = useMemo(() => {
    const totalBudget = projectData.reduce((s, p) => s + p.budget, 0);
    const totalSpent = projectData.reduce((s, p) => s + p.expenditure, 0);
    return {
      totalBudget,
      totalSpent,
      remaining: totalBudget - totalSpent,
      utilization: totalBudget ? Math.round((totalSpent / totalBudget) * 100) : 0,
      onTrack: projectData.filter((p) => p.pct < 85).length,
      atRisk: projectData.filter((p) => p.pct >= 85 && p.pct <= 100).length,
      overBudget: projectData.filter((p) => p.pct > 100).length,
    };
  }, [projectData]);

  if (txLoading || pjLoading) return <LoadingState />;

  return (
    <div>
      <PageHeader
        title="Treasury Reports"
        subtitle="Monthly contributions, expenditures & project budget monitoring · Demonstration data"
        icon={BarChart3}
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={TrendingUp} label="Total Contributions" value={formatCurrency(totals.income)} tone="green" />
        <StatCard icon={TrendingDown} label="Total Expenditures" value={formatCurrency(totals.expense)} tone="rose" />
        <StatCard icon={Wallet} label="Net Cash Flow" value={formatCurrency(totals.net)} tone="primary" />
        <StatCard icon={Gauge} label="Budget Utilization" value={`${budgetHealth.utilization}%`} hint={`${formatCurrency(budgetHealth.totalSpent)} of ${formatCurrency(budgetHealth.totalBudget)}`} tone="accent" />
      </div>

      <Card className="p-6 mb-6">
        <h2 className="font-heading font-semibold text-foreground mb-1">Monthly Contributions vs Expenditures</h2>
        <p className="text-xs text-muted-foreground mb-4">Bars show monthly inflow and outflow; the line tracks net cash flow.</p>
        {monthly.length ? (
          <MonthlyFlowChart data={monthly} />
        ) : (
          <EmptyState icon={BarChart3} title="No transactions yet" description="Record income and expenses to see monthly trends here." />
        )}
      </Card>

      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-2 p-6">
          <h2 className="font-heading font-semibold text-foreground mb-1">Project Budgets</h2>
          <p className="text-xs text-muted-foreground mb-4">Planned budget against actual expenditure per project.</p>
          {projectData.length ? (
            <ProjectBudgetChart data={projectData} />
          ) : (
            <EmptyState icon={Building2} title="No projects" description="Add projects to monitor their budgets." />
          )}
        </Card>

        <Card className="p-6">
          <h2 className="font-heading font-semibold text-foreground mb-4">Budget Health</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">On Track</span>
              <Badge variant="success">{budgetHealth.onTrack}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">At Risk (85–100%)</span>
              <Badge variant="warning">{budgetHealth.atRisk}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Over Budget</span>
              <Badge variant="danger">{budgetHealth.overBudget}</Badge>
            </div>
            <div className="pt-4 border-t border-border space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Total Budget</span>
                <span className="font-medium text-foreground">{formatCurrency(budgetHealth.totalBudget)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Total Spent</span>
                <span className="font-medium text-foreground">{formatCurrency(budgetHealth.totalSpent)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Remaining</span>
                <span className="font-medium text-foreground">{formatCurrency(budgetHealth.remaining)}</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h2 className="font-heading font-semibold text-foreground mb-4">Project Budget Breakdown</h2>
        <ProjectBudgetList data={projectData} />
      </Card>
    </div>
  );
}