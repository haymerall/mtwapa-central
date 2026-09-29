import { useState, useMemo } from "react";
import { useList } from "@/lib/useList";
import { PageHeader, Card, Badge, StatCard, LoadingState } from "@/components/admin/ui-bits";
import { Button } from "@/components/ui/button";
import { Wallet, TrendingUp, TrendingDown, AlertCircle, CheckCircle2, Clock } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/format";
import { useToast } from "@/components/ui/use-toast";
import { base44 } from "@/api/base44Client";

const STATUS_VARIANT = { completed: "success", pending: "warning", approved: "primary" };
const STATUS_ICON = { completed: CheckCircle2, pending: Clock, approved: CheckCircle2 };

export default function Finance() {
  const { data, loading, reload } = useList("Transaction", "-date");
  const { toast } = useToast();
  const [filter, setFilter] = useState("all");

  const totals = useMemo(() => {
    const income = data.filter((t) => t.type === "income").reduce((s, t) => s + (t.amount || 0), 0);
    const expense = data.filter((t) => t.type === "expense").reduce((s, t) => s + (t.amount || 0), 0);
    return { income, expense, net: income - expense, pending: data.filter((t) => t.status === "pending").length };
  }, [data]);

  const list = filter === "all" ? data : data.filter((t) => t.type === filter);

  const approve = async (t) => {
    try {
      await base44.entities.Transaction.update(t.id, { status: "approved" });
      await reload();
      toast({ title: "Transaction approved", description: t.reference });
    } catch (err) { toast({ title: "Could not approve", description: err.message, variant: "destructive" }); }
  };

  if (loading) return <LoadingState />;

  return (
    <div>
      <PageHeader title="Treasury" subtitle="Church finance overview · Demonstration only" icon={Wallet} />

      <div className="rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 mb-6 flex items-start gap-2.5">
        <AlertCircle className="w-4.5 h-4.5 text-amber-600 mt-0.5 shrink-0" />
        <p className="text-sm text-amber-800">This MVP is a <strong>treasury prototype</strong> with fictional data — not a production accounting system. No real payments are processed.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={TrendingUp} label="Total Income" value={formatCurrency(totals.income)} tone="green" />
        <StatCard icon={TrendingDown} label="Total Expenses" value={formatCurrency(totals.expense)} tone="rose" />
        <StatCard icon={Wallet} label="Net Balance" value={formatCurrency(totals.net)} />
        <StatCard icon={Clock} label="Pending Approvals" value={totals.pending} tone="accent" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <h2 className="font-heading font-semibold text-foreground">Recent Transactions</h2>
            <div className="flex gap-1.5">
              {[{ k: "all", l: "All" }, { k: "income", l: "Income" }, { k: "expense", l: "Expense" }].map((t) => (
                <button key={t.k} onClick={() => setFilter(t.k)} className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${filter === t.k ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/70"}`}>{t.l}</button>
              ))}
            </div>
          </div>
          <div className="overflow-x-auto -mx-2">
            <table className="w-full text-sm min-w-[480px]">
              <thead className="text-muted-foreground text-xs">
                <tr className="border-b border-border">
                  <th className="text-left font-medium px-2 py-2">Date</th>
                  <th className="text-left font-medium px-2 py-2">Description</th>
                  <th className="text-left font-medium px-2 py-2">Category</th>
                  <th className="text-right font-medium px-2 py-2">Amount</th>
                  <th className="text-left font-medium px-2 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {list.map((t) => {
                  const SIcon = STATUS_ICON[t.status] || Clock;
                  return (
                    <tr key={t.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                      <td className="px-2 py-2.5 text-muted-foreground whitespace-nowrap">{formatDate(t.date)}</td>
                      <td className="px-2 py-2.5">
                        <div className="font-medium text-foreground">{t.description}</div>
                        <div className="text-xs text-muted-foreground">{t.reference}</div>
                      </td>
                      <td className="px-2 py-2.5"><Badge variant="muted">{t.category}</Badge></td>
                      <td className={`px-2 py-2.5 text-right font-medium whitespace-nowrap ${t.type === "income" ? "text-emerald-600" : "text-rose-600"}`}>{t.type === "income" ? "+" : "−"} {formatCurrency(t.amount).replace("KSh ", "")}</td>
                      <td className="px-2 py-2.5">
                        <div className="flex items-center gap-1.5">
                          <Badge variant={STATUS_VARIANT[t.status]}><SIcon className="w-3 h-3 mr-1" />{t.status}</Badge>
                          {t.status === "pending" && <button onClick={() => approve(t)} className="text-xs text-primary font-medium hover:underline">Approve</button>}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="font-heading font-semibold text-foreground mb-4">Budget Summary</h2>
          <div className="space-y-4">
            {[
              { label: "Tithes & Offerings", value: totals.income, budget: 1200000, tone: "bg-emerald-500" },
              { label: "Building Fund", value: 450000, budget: 850000, tone: "bg-accent" },
              { label: "Operations", value: totals.expense, budget: 700000, tone: "bg-rose-500" },
            ].map((b) => {
              const pct = Math.min(100, Math.round((b.value / b.budget) * 100));
              return (
                <div key={b.label}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-foreground font-medium">{b.label}</span>
                    <span className="text-muted-foreground">{pct}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div className={`h-full ${b.tone} rounded-full`} style={{ width: `${pct}%` }} />
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">{formatCurrency(b.value)} of {formatCurrency(b.budget)}</div>
                </div>
              );
            })}
          </div>
          <div className="mt-6 pt-4 border-t border-border">
            <h3 className="font-heading font-semibold text-foreground text-sm mb-3">Pending Approvals</h3>
            <div className="space-y-2">
              {data.filter((t) => t.status === "pending").map((t) => (
                <div key={t.id} className="flex items-center justify-between text-sm">
                  <span className="text-foreground truncate">{t.description}</span>
                  <span className="text-rose-600 font-medium whitespace-nowrap ml-2">{formatCurrency(t.amount).replace("KSh ", "")}</span>
                </div>
              ))}
              {data.filter((t) => t.status === "pending").length === 0 && <p className="text-sm text-muted-foreground">Nothing pending.</p>}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}