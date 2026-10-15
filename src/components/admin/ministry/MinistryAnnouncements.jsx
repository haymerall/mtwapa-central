import { Megaphone } from "lucide-react";
import { Badge } from "@/components/admin/ui-bits";
import { formatDate } from "@/lib/format";

export function MinistryAnnouncements({ data }) {
  if (!data.length) return <p className="text-sm text-muted-foreground py-4">No announcements for this ministry yet.</p>;
  return (
    <div className="space-y-4">
      {data.map((a) => (
        <div key={a.id} className="flex gap-3">
          <div className="w-9 h-9 rounded-lg bg-accent/15 flex items-center justify-center shrink-0">
            <Megaphone className="w-4 h-4 text-accent" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-medium text-foreground">{a.title}</span>
              <Badge variant={a.status === "published" ? "success" : "muted"}>{a.status}</Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{a.body}</p>
            <div className="text-[11px] text-muted-foreground mt-1">{a.author} · {formatDate(a.date)}</div>
          </div>
        </div>
      ))}
    </div>
  );
}