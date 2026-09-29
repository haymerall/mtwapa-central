import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { PageHeader, Card, Badge, StatCard, LoadingState, EmptyState } from "@/components/admin/ui-bits";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Users, CalendarDays, ClipboardCheck, Bell, UserCheck, Music, Baby } from "lucide-react";
import { formatDate } from "@/lib/format";

// Demonstrates the hybrid architecture: a ministry workspace is a configured
// view on the shared platform, with specialized panels per ministry type.
export default function MinistryWorkspace() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ministry, setMinistry] = useState(null);
  const [members, setMembers] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const m = await base44.entities.Ministry.get(id);
        setMinistry(m);
        const allMembers = await base44.entities.Member.list("-created_date", 200);
        setMembers(allMembers.filter((mem) => (mem.ministries || []).includes(m.name)));
        const allEvents = await base44.entities.Event.list("date", 100);
        setEvents(allEvents.filter((e) => e.ministry === m.name));
      } catch { setMinistry(null); }
      finally { setLoading(false); }
    })();
  }, [id]);

  if (loading) return <LoadingState />;
  if (!ministry) return <EmptyState icon={Users} title="Ministry not found" action={<Button variant="outline" onClick={() => navigate("/admin/ministries")}>Back</Button>} />;

  const isChildrens = /children/i.test(ministry.name);
  const isMusic = /music|choir/i.test(ministry.name);
  const upcoming = events.filter((e) => e.status === "upcoming").slice(0, 4);

  return (
    <div>
      <Button variant="ghost" size="sm" asChild className="mb-4 -ml-2"><Link to="/admin/ministries"><ArrowLeft className="w-4 h-4 mr-1" /> Ministries</Link></Button>

      <div className="rounded-2xl p-6 mb-6 text-primary-foreground" style={{ backgroundColor: ministry.color || "#2f6b54" }}>
        <div className="flex items-center gap-2 text-xs font-medium text-primary-foreground/80 mb-2">
          <span className="px-2 py-0.5 rounded-full bg-primary-foreground/15">{ministry.category}</span>
          <span>Ministry Workspace</span>
        </div>
        <h1 className="font-heading text-2xl font-bold">{ministry.name}</h1>
        <p className="text-primary-foreground/85 mt-2 max-w-2xl text-sm">{ministry.description}</p>
        <div className="mt-4 flex flex-wrap gap-5 text-sm text-primary-foreground/85">
          <span className="flex items-center gap-1.5"><Users className="w-4 h-4" /> {ministry.members_count} members</span>
          <span className="flex items-center gap-1.5"><CalendarDays className="w-4 h-4" /> {ministry.meeting_day} · {ministry.meeting_time}</span>
          <span className="flex items-center gap-1.5">Led by {ministry.leader}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={Users} label="Enrolled" value={members.length} />
        <StatCard icon={CalendarDays} label="Upcoming" value={upcoming.length} tone="blue" />
        <StatCard icon={ClipboardCheck} label="Attendance" value="84%" tone="green" />
        <StatCard icon={Bell} label="Announcements" value={3} tone="accent" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading font-semibold text-foreground flex items-center gap-2"><CalendarDays className="w-4.5 h-4.5 text-primary" /> Upcoming Activities</h2>
            <Button size="sm" variant="outline"><CalendarDays className="w-4 h-4 mr-1.5" /> Schedule</Button>
          </div>
          <div className="space-y-3">
            {upcoming.map((e) => (
              <div key={e.id} className="flex items-center gap-4 py-2.5 border-b border-border last:border-0">
                <div className="w-11 h-11 rounded-lg bg-primary/10 flex flex-col items-center justify-center shrink-0">
                  <span className="text-[10px] font-medium text-primary uppercase">{new Date(e.date).toLocaleDateString("en-US", { month: "short" })}</span>
                  <span className="font-heading font-bold text-primary leading-none">{new Date(e.date).getDate()}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-foreground text-sm truncate">{e.title}</div>
                  <div className="text-xs text-muted-foreground">{e.time} · {e.venue}</div>
                </div>
                {e.registration_required && <Badge variant="accent">Registration</Badge>}
              </div>
            ))}
            {upcoming.length === 0 && <p className="text-sm text-muted-foreground py-4">No upcoming activities scheduled.</p>}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="font-heading font-semibold text-foreground mb-4 flex items-center gap-2"><Users className="w-4.5 h-4.5 text-primary" /> Members</h2>
          <div className="space-y-2.5 max-h-80 overflow-y-auto no-scrollbar">
            {members.slice(0, 10).map((m) => (
              <Link to={`/admin/members/${m.id}`} key={m.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors">
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary font-heading font-bold text-xs flex items-center justify-center">{m.full_name.split(" ").map((p) => p[0]).join("").slice(0, 2)}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-foreground truncate">{m.full_name}</div>
                  <div className="text-xs text-muted-foreground truncate">{m.church_role}</div>
                </div>
              </Link>
            ))}
            {members.length === 0 && <p className="text-sm text-muted-foreground">No members linked yet.</p>}
          </div>
        </Card>
      </div>

      {/* Specialized panels — hybrid architecture in action */}
      {(isChildrens || isMusic) && (
        <Card className="p-6 mt-6">
          <h2 className="font-heading font-semibold text-foreground mb-1 flex items-center gap-2">
            {isChildrens ? <Baby className="w-4.5 h-4.5 text-primary" /> : <Music className="w-4.5 h-4.5 text-primary" />}
            {isChildrens ? "Children's Ministry Dashboard" : "Music & Choir Dashboard"}
          </h2>
          <p className="text-xs text-muted-foreground mb-5">A specialized view built on the shared ministry system — same data, tailored tools.</p>

          {isChildrens ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-secondary/40 rounded-lg p-4"><div className="font-heading text-xl font-bold text-foreground">42</div><div className="text-xs text-muted-foreground">Children enrolled</div></div>
              <div className="bg-secondary/40 rounded-lg p-4"><div className="font-heading text-xl font-bold text-foreground">8</div><div className="text-xs text-muted-foreground">Teachers</div></div>
              <div className="bg-secondary/40 rounded-lg p-4"><div className="font-heading text-xl font-bold text-foreground">5</div><div className="text-xs text-muted-foreground">Volunteers</div></div>
              <div className="bg-secondary/40 rounded-lg p-4"><div className="font-heading text-xl font-bold text-foreground">3</div><div className="text-xs text-muted-foreground">Pending tasks</div></div>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-secondary/40 rounded-lg p-4"><div className="font-heading text-xl font-bold text-foreground">28</div><div className="text-xs text-muted-foreground">Choir members</div></div>
              <div className="bg-secondary/40 rounded-lg p-4"><div className="font-heading text-xl font-bold text-foreground">4</div><div className="text-xs text-muted-foreground">Rehearsals / mo</div></div>
              <div className="bg-secondary/40 rounded-lg p-4"><div className="font-heading text-xl font-bold text-foreground">2</div><div className="text-xs text-muted-foreground">Service assignments</div></div>
              <div className="bg-secondary/40 rounded-lg p-4"><div className="font-heading text-xl font-bold text-foreground">91%</div><div className="text-xs text-muted-foreground">Rehearsal attendance</div></div>
            </div>
          )}

          <div className="mt-5 flex flex-wrap gap-2">
            <Button size="sm" variant="outline"><ClipboardCheck className="w-4 h-4 mr-1.5" /> Record attendance</Button>
            <Button size="sm" variant="outline"><UserCheck className="w-4 h-4 mr-1.5" /> Assign volunteers</Button>
            <Button size="sm" variant="outline"><Bell className="w-4 h-4 mr-1.5" /> Post announcement</Button>
          </div>
        </Card>
      )}
    </div>
  );
}