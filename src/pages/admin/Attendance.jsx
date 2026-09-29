import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { PageHeader, Card, Badge, LoadingState } from "@/components/admin/ui-bits";
import { Button } from "@/components/ui/button";
import { ClipboardCheck, Check, X, Clock, Save, Users } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useDemoSession } from "@/lib/useDemoSession";
import { formatDate } from "@/lib/format";

export default function Attendance() {
  const { data: events } = useEvents();
  const { data: members } = useMembers();
  const { toast } = useToast();
  const { session } = useDemoSession();

  const [eventId, setEventId] = useState("");
  const [group, setGroup] = useState("all");
  const [marks, setMarks] = useState({});
  const [saving, setSaving] = useState(false);

  const event = events.find((e) => e.id === eventId);
  const groupMembers = group === "all" ? members : members.filter((m) => (m.ministries || []).includes(group));

  const setStatus = (id, status) => setMarks((prev) => ({ ...prev, [id]: status }));

  const markAll = (status) => {
    const next = {};
    groupMembers.forEach((m) => { next[m.id] = status; });
    setMarks(next);
  };

  const save = async () => {
    if (!event) return;
    setSaving(true);
    try {
      const records = groupMembers.map((m) => ({
        church_id: "grace-sda",
        event_id: event.id,
        event_title: event.title,
        member_id: m.id,
        member_name: m.full_name,
        group: group === "all" ? "Church" : group,
        status: marks[m.id] || "absent",
        date: event.date,
        recorded_by: session?.name || "Unknown",
      }));
      await base44.entities.Attendance.bulkCreate(records);
      const present = Object.values(marks).filter((s) => s === "present").length;
      toast({ title: "Attendance saved", description: `${present} of ${groupMembers.length} marked present for ${event.title}.` });
    } catch (err) {
      toast({ title: "Could not save", description: err.message, variant: "destructive" });
    } finally { setSaving(false); }
  };

  if (events.length === 0) return <LoadingState label="Loading events..." />;

  const present = Object.values(marks).filter((s) => s === "present").length;
  const pct = groupMembers.length ? Math.round((present / groupMembers.length) * 100) : 0;

  return (
    <div>
      <PageHeader title="Attendance" subtitle="Record attendance for a service or ministry group" icon={ClipboardCheck} />

      <Card className="p-5 mb-6">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground">Select event / service</label>
            <select value={eventId} onChange={(e) => setEventId(e.target.value)} className="mt-1.5 w-full h-10 rounded-md border border-input bg-card px-3 text-sm">
              <option value="">Choose an event...</option>
              {events.filter((e) => e.status === "upcoming").map((e) => <option key={e.id} value={e.id}>{e.title} — {formatDate(e.date)}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">Select group</label>
            <select value={group} onChange={(e) => { setGroup(e.target.value); setMarks({}); }} className="mt-1.5 w-full h-10 rounded-md border border-input bg-card px-3 text-sm">
              <option value="all">Entire Church</option>
              {[...new Set(members.flatMap((m) => m.ministries || []))].map((g) => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
        </div>
      </Card>

      {eventId && (
        <>
          <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
            <div className="flex items-center gap-3 text-sm">
              <span className="text-muted-foreground">{groupMembers.length} people</span>
              <Badge variant={pct >= 75 ? "success" : pct >= 50 ? "warning" : "danger"}>{pct}% present</Badge>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => markAll("present")}><Check className="w-4 h-4 mr-1.5 text-emerald-600" /> Mark all present</Button>
              <Button size="sm" variant="outline" onClick={() => markAll("absent")}><X className="w-4 h-4 mr-1.5 text-rose-600" /> Clear</Button>
              <Button size="sm" onClick={save} disabled={saving}><Save className="w-4 h-4 mr-1.5" /> {saving ? "Saving..." : "Save"}</Button>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {groupMembers.map((m) => {
              const status = marks[m.id] || "absent";
              return (
                <Card key={m.id} className={`p-3 transition-colors ${status === "present" ? "border-emerald-300 bg-emerald-50/50" : status === "late" ? "border-amber-300 bg-amber-50/50" : ""}`}>
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary font-heading font-bold text-xs flex items-center justify-center shrink-0">{m.full_name.split(" ").map((p) => p[0]).join("").slice(0, 2)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-foreground truncate">{m.full_name}</div>
                      <div className="text-xs text-muted-foreground truncate">{m.church_role}</div>
                    </div>
                  </div>
                  <div className="flex gap-1.5 mt-2.5">
                    <button onClick={() => setStatus(m.id, "present")} className={`flex-1 text-xs py-1.5 rounded-md font-medium transition-colors ${status === "present" ? "bg-emerald-600 text-white" : "bg-muted text-muted-foreground hover:bg-muted/70"}`}>Present</button>
                    <button onClick={() => setStatus(m.id, "late")} className={`flex-1 text-xs py-1.5 rounded-md font-medium transition-colors ${status === "late" ? "bg-amber-500 text-white" : "bg-muted text-muted-foreground hover:bg-muted/70"}`}>Late</button>
                    <button onClick={() => setStatus(m.id, "absent")} className={`flex-1 text-xs py-1.5 rounded-md font-medium transition-colors ${status === "absent" ? "bg-rose-500 text-white" : "bg-muted text-muted-foreground hover:bg-muted/70"}`}>Absent</button>
                  </div>
                </Card>
              );
            })}
          </div>
        </>
      )}

      {!eventId && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4"><Users className="w-6 h-6 text-muted-foreground" /></div>
          <h3 className="font-heading font-semibold text-foreground">Select an event to begin</h3>
          <p className="text-sm text-muted-foreground mt-1 max-w-sm">Choose a service or event above, then mark each person present, late, or absent.</p>
        </div>
      )}
    </div>
  );
}

function useEvents() {
  const [data, setData] = useState([]);
  useEffect(() => { base44.entities.Event.list("date", 100).then(setData).catch(() => {}); }, []);
  return { data };
}
function useMembers() {
  const [data, setData] = useState([]);
  useEffect(() => { base44.entities.Member.list("-created_date", 200).then(setData).catch(() => {}); }, []);
  return { data };
}