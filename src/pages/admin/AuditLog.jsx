import { useState } from "react";
import { useList } from "@/lib/useList";
import { PageHeader, Card, Badge, LoadingState } from "@/components/admin/ui-bits";
import { Input } from "@/components/ui/input";
import { ShieldCheck, Search, User, FileText, Wallet, CalendarDays, Megaphone, UserCog } from "lucide-react";
import { relativeTime } from "@/lib/format";

const ACTION_ICON = {
  "member.created": User, "member.updated": User,
  "event.created": CalendarDays, "attendance.recorded": CalendarDays,
  "transaction.added": Wallet, "announcement.published": Megaphone,
  "user.role_changed": UserCog, "project.updated": FileText,
};

export default function AuditLog() {
  const { data, loading } = useList("AuditLog", "-timestamp");
  const [query, setQuery] = useState("");

  const filtered = data.filter((a) =>
    !query || (a.user + " " + a.action + " " + a.target + " " + a.details).toLowerCase().includes(query.toLowerCase())
  );

  if (loading) return <LoadingState />;

  return (
    <div>
      <PageHeader title="Audit Log" subtitle="Track of sensitive actions across the platform" icon={ShieldCheck} />

      <div className="relative mb-4 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search activity..." className="pl-10" />
      </div>

      <Card className="p-2 sm:p-4">
        <div className="space-y-1">
          {filtered.map((a) => {
            const Icon = ACTION_ICON[a.action] || FileText;
            return (
              <div key={a.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/40 transition-colors">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0"><Icon className="w-4.5 h-4.5 text-primary" /></div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-foreground">
                    <span className="font-medium">{a.user}</span>{" "}
                    <span className="text-muted-foreground">{a.details}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <Badge variant="muted">{a.action}</Badge>
                    <span className="text-xs text-muted-foreground/70">{relativeTime(a.timestamp)}</span>
                    <span className="text-xs text-muted-foreground/70">· {a.target}</span>
                  </div>
                </div>
              </div>
            );
          })}
          {filtered.length === 0 && <p className="text-sm text-muted-foreground p-6 text-center">No matching activity.</p>}
        </div>
      </Card>
    </div>
  );
}