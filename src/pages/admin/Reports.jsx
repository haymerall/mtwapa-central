import { PageHeader, Card, Badge } from "@/components/admin/ui-bits";
import { Button } from "@/components/ui/button";
import { BarChart3, Download, Users, CalendarDays, Wallet, ClipboardCheck, FileText } from "lucide-react";

const reports = [
  { title: "Membership Report", desc: "Active members, joins, transfers, and baptisms this quarter.", icon: Users, category: "Membership", updated: "2026-09-28" },
  { title: "Attendance Summary", desc: "Weekly attendance trends across services and ministries.", icon: ClipboardCheck, category: "Attendance", updated: "2026-09-28" },
  { title: "Quarterly Financial Report", desc: "Income, expenses, tithes, and budget variance.", icon: Wallet, category: "Finance", updated: "2026-09-25" },
  { title: "Events Report", desc: "Events held, attendance, and ministry participation.", icon: CalendarDays, category: "Events", updated: "2026-09-20" },
  { title: "Ministry Activity Report", desc: "Per-ministry membership, meetings, and engagement.", icon: BarChart3, category: "Ministries", updated: "2026-09-18" },
  { title: "Annual Church Report", desc: "Year-end summary across all departments.", icon: FileText, category: "Annual", updated: "2026-08-31" },
];

export default function Reports() {
  return (
    <div>
      <PageHeader title="Reports" subtitle="Generate and download church reports" icon={BarChart3} />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {reports.map((r) => (
          <Card key={r.title} className="p-5 hover:shadow-sm transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center"><r.icon className="w-5 h-5 text-primary" /></div>
              <Badge variant="muted">{r.category}</Badge>
            </div>
            <h3 className="font-heading font-semibold text-foreground">{r.title}</h3>
            <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{r.desc}</p>
            <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Updated {r.updated}</span>
              <Button size="sm" variant="outline"><Download className="w-4 h-4 mr-1.5" /> Export</Button>
            </div>
          </Card>
        ))}
      </div>
      <p className="text-xs text-muted-foreground mt-4">Report generation and PDF export are simulated in this prototype.</p>
    </div>
  );
}