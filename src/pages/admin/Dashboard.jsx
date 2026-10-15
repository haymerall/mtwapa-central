import { useDemoSession } from "@/lib/useDemoSession";
import { useList } from "@/lib/useList";
import { StatCard, Card, Badge, PageHeader, LoadingState } from "@/components/admin/ui-bits";
import { ROLE_LABELS } from "@/lib/roles";
import { formatDate, formatCurrency, relativeTime } from "@/lib/format";
import { Link } from "react-router-dom";
import { Users, Church, CalendarDays, ClipboardCheck, Wallet, TrendingUp, TrendingDown, ArrowRight, Bell, Activity } from "lucide-react";

export default function Dashboard() {
  const { session } = useDemoSession();
  const role = session?.role;
  const members = useList("Member");
  const ministries = useList("Ministry");
  const events = useList("Event");
  const announcements = useList("Announcement", "-date");
  const transactions = useList("Transaction", "-date");
  const audits = useList("AuditLog", "-timestamp");

  const loading = members.loading || ministries.loading || events.loading;
  const upcomingEvents = (events.data || []).filter((e) => e.status === "upcoming").slice(0, 4);
  const recentAudits = (audits.data || []).slice(0, 5);
  const recentAnnouncements = (announcements.data || []).slice(0, 4);

  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
  })();

  if (loading) return <LoadingState />;

  return (
    <div>
      <PageHeader
        title={`${greeting}, ${session?.name?.split(" ")[0] || "friend"}.`}
        subtitle={`You're signed in as ${ROLE_LABELS[role]}. Here's what's happening at Mtwapa Central SDA.`}
      />

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={Users} label="Total Members" value={members.data.length} hint="Across all ministries" />
        <StatCard icon={Church} label="Active Ministries" value={ministries.data.length} hint="With assigned leaders" tone="accent" />
        <StatCard icon={CalendarDays} label="Upcoming Events" value={upcomingEvents.length} hint="Next 30 days" tone="blue" />
        <StatCard icon={ClipboardCheck} label="Avg. Attendance" value="78%" hint="Last 4 Sabbaths" tone="green" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Upcoming events */}
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-heading font-semibold text-foreground flex items-center gap-2"><CalendarDays className="w-4.5 h-4.5 text-primary" /> Upcoming Events</h2>
            <Link to="/admin/events" className="text-sm text-primary hover:underline flex items-center gap-1">View all <ArrowRight className="w-3.5 h-3.5" /></Link>
          </div>
          <div className="space-y-3">
            {upcomingEvents.map((e) => (
              <div key={e.id} className="flex items-center gap-4 py-2.5 border-b border-border last:border-0">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex flex-col items-center justify-center shrink-0">
                  <span className="text-[10px] font-medium text-primary uppercase">{new Date(e.date).toLocaleDateString("en-US", { month: "short" })}</span>
                  <span className="font-heading font-bold text-primary text-lg leading-none">{new Date(e.date).getDate()}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-foreground text-sm truncate">{e.title}</div>
                  <div className="text-xs text-muted-foreground">{e.time} · {e.venue}</div>
                </div>
                <Badge variant="muted">{e.ministry}</Badge>
              </div>
            ))}
            {upcomingEvents.length === 0 && <p className="text-sm text-muted-foreground py-4">No upcoming events.</p>}
          </div>
        </Card>

        {/* Recent activity */}
        <Card className="p-6">
          <h2 className="font-heading font-semibold text-foreground mb-5 flex items-center gap-2"><Activity className="w-4.5 h-4.5 text-primary" /> Recent Activity</h2>
          <div className="space-y-4">
            {recentAudits.map((a) => (
              <div key={a.id} className="flex gap-3">
                <div className="w-2 h-2 rounded-full bg-accent mt-1.5 shrink-0" />
                <div className="min-w-0">
                  <div className="text-sm text-foreground">
                    <span className="font-medium">{a.user}</span>{" "}
                    <span className="text-muted-foreground">{a.details}</span>
                  </div>
                  <div className="text-xs text-muted-foreground/70 mt-0.5">{relativeTime(a.timestamp)}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Ministry overview + announcements */}
      <div className="grid lg:grid-cols-3 gap-6 mt-6">
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-heading font-semibold text-foreground flex items-center gap-2"><Church className="w-4.5 h-4.5 text-primary" /> Ministry Overview</h2>
            <Link to="/admin/ministries" className="text-sm text-primary hover:underline flex items-center gap-1">All ministries <ArrowRight className="w-3.5 h-3.5" /></Link>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {ministries.data.slice(0, 6).map((m) => (
              <Link to={`/admin/ministries/${m.id}`} key={m.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: (m.color || "#2f6b54") + "18" }}>
                  <Users className="w-4 h-4" style={{ color: m.color || "#2f6b54" }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-foreground truncate">{m.name}</div>
                  <div className="text-xs text-muted-foreground truncate">{m.leader}</div>
                </div>
                <span className="text-xs text-muted-foreground">{m.members_count}</span>
              </Link>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="font-heading font-semibold text-foreground mb-5 flex items-center gap-2"><Bell className="w-4.5 h-4.5 text-primary" /> Announcements</h2>
          <div className="space-y-4">
            {recentAnnouncements.map((a) => (
              <div key={a.id} className="pb-4 border-b border-border last:border-0 last:pb-0">
                <div className="text-sm font-medium text-foreground">{a.title}</div>
                <div className="text-xs text-muted-foreground mt-1 line-clamp-2">{a.body}</div>
                <div className="text-[11px] text-muted-foreground/70 mt-1.5">{a.author} · {formatDate(a.date)}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Treasurer-specific finance snapshot */}
      {(role === "treasurer" || role === "super_admin") && (
        <Card className="p-6 mt-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-heading font-semibold text-foreground flex items-center gap-2"><Wallet className="w-4.5 h-4.5 text-primary" /> Finance Snapshot</h2>
            <Link to="/admin/finance" className="text-sm text-primary hover:underline flex items-center gap-1">Open treasury <ArrowRight className="w-3.5 h-3.5" /></Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <div className="text-xs text-muted-foreground">Income (this period)</div>
              <div className="font-heading text-xl font-bold text-emerald-600 flex items-center gap-1"><TrendingUp className="w-4 h-4" /> {formatCurrency(transactions.data.filter((t) => t.type === "income").reduce((s, t) => s + (t.amount || 0), 0)).replace("KSh ", "KSh ")}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Expenses</div>
              <div className="font-heading text-xl font-bold text-rose-600 flex items-center gap-1"><TrendingDown className="w-4 h-4" /> {formatCurrency(transactions.data.filter((t) => t.type === "expense").reduce((s, t) => s + (t.amount || 0), 0))}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Pending approvals</div>
              <div className="font-heading text-xl font-bold text-amber-600">{transactions.data.filter((t) => t.status === "pending").length}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Net balance</div>
              <div className="font-heading text-xl font-bold text-foreground">{formatCurrency(transactions.data.reduce((s, t) => s + (t.type === "income" ? t.amount : -t.amount), 0))}</div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}