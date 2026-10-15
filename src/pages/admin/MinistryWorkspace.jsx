import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Card, Badge, StatCard, LoadingState, EmptyState } from "@/components/admin/ui-bits";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Users, CalendarDays, ClipboardCheck, Megaphone, MapPin, Clock, Mail, UserCheck, TrendingUp } from "lucide-react";
import { formatDate, initials } from "@/lib/format";
import { AttendanceTrendChart } from "@/components/admin/ministry/AttendanceTrendChart";
import { AttendanceStatusChart } from "@/components/admin/ministry/AttendanceStatusChart";
import { MinistryAnnouncements } from "@/components/admin/ministry/MinistryAnnouncements";

export default function MinistryWorkspace() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ministry, setMinistry] = useState(null);
  const [members, setMembers] = useState([]);
  const [events, setEvents] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const m = await base44.entities.Ministry.get(id);
        setMinistry(m);
        const [allMembers, allEvents] = await Promise.all([
          base44.entities.Member.list("-created_date", 300),
          base44.entities.Event.list("date", 200),
        ]);
        setMembers(allMembers.filter((mem) => (mem.ministries || []).includes(m.name)));
        const evs = allEvents.filter((e) => e.ministry === m.name);
        setEvents(evs);

        const eventIds = evs.map((e) => e.id);
        let att = [];
        if (eventIds.length) {
          const page = await base44.entities.Attendance.filter({ event_id: { $in: eventIds } }, { sort: "date", limit: 500 });
          att = page.items || [];
        }
        setAttendance(att);

        const annPage = await base44.entities.Announcement.filter(
          { $or: [{ ministry: m.name }, { audience: "entire_church" }, { audience: "members" }] },
          { sort: "-date", limit: 20 }
        );
        setAnnouncements(annPage.items || []);
      } catch {
        setMinistry(null);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const stats = useMemo(() => {
    const present = attendance.filter((a) => a.status === "present" || a.status === "late").length;
    const total = attendance.length;
    return {
      enrolled: members.length,
      upcoming: events.filter((e) => e.status === "upcoming").length,
      attendanceRate: total ? Math.round((present / total) * 100) : 0,
      announcements: announcements.length,
    };
  }, [members, events, attendance, announcements]);

  const statusData = useMemo(() => {
    const counts = { present: 0, late: 0, excused: 0, absent: 0 };
    attendance.forEach((a) => {
      if (counts[a.status] !== undefined) counts[a.status]++;
    });
    return [
      { name: "Present", value: counts.present, color: "hsl(var(--chart-1))" },
      { name: "Late", value: counts.late, color: "hsl(var(--chart-3))" },
      { name: "Excused", value: counts.excused, color: "hsl(var(--chart-2))" },
      { name: "Absent", value: counts.absent, color: "hsl(var(--chart-4))" },
    ].filter((d) => d.value > 0);
  }, [attendance]);

  const trend = useMemo(() => {
    const byDate = {};
    attendance.forEach((a) => {
      const k = a.date;
      if (!byDate[k]) byDate[k] = { date: k, present: 0, total: 0 };
      byDate[k].total++;
      if (a.status === "present" || a.status === "late") byDate[k].present++;
    });
    return Object.values(byDate)
      .sort((a, b) => a.date.localeCompare(b.date))
      .map((d) => ({ ...d, label: formatDate(d.date, { month: "short", day: "numeric" }), rate: d.total ? Math.round((d.present / d.total) * 100) : 0 }));
  }, [attendance]);

  const upcoming = useMemo(() => events.filter((e) => e.status === "upcoming").slice(0, 5), [events]);

  if (loading) return <LoadingState />;
  if (!ministry)
    return (
      <EmptyState
        icon={Users}
        title="Ministry not found"
        action={<Button variant="outline" onClick={() => navigate("/admin/ministries")}>Back to ministries</Button>}
      />
    );

  const accent = ministry.color || "#2f6b54";

  return (
    <div>
      <Button variant="ghost" size="sm" asChild className="mb-4 -ml-2">
        <Link to="/admin/ministries"><ArrowLeft className="w-4 h-4 mr-1" /> Ministries</Link>
      </Button>

      {/* Banner */}
      <div className="rounded-2xl p-6 mb-6 text-primary-foreground" style={{ backgroundColor: accent }}>
        <div className="flex items-center gap-2 text-xs font-medium text-primary-foreground/80 mb-2">
          <span className="px-2 py-0.5 rounded-full bg-primary-foreground/15">{ministry.category}</span>
          <span>Ministry Dashboard</span>
        </div>
        <h1 className="font-heading text-2xl font-bold">{ministry.name}</h1>
        <p className="text-primary-foreground/85 mt-2 max-w-2xl text-sm">{ministry.description}</p>
        <div className="mt-4 flex flex-wrap gap-5 text-sm text-primary-foreground/85">
          <span className="flex items-center gap-1.5"><Users className="w-4 h-4" /> {ministry.members_count} members</span>
          <span className="flex items-center gap-1.5"><CalendarDays className="w-4 h-4" /> {ministry.meeting_day} · {ministry.meeting_time}</span>
          <span className="flex items-center gap-1.5">Led by {ministry.leader}</span>
        </div>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={Users} label="Enrolled Members" value={stats.enrolled} tone="primary" />
        <StatCard icon={CalendarDays} label="Upcoming Activities" value={stats.upcoming} tone="blue" />
        <StatCard icon={TrendingUp} label="Attendance Rate" value={`${stats.attendanceRate}%`} tone="green" />
        <StatCard icon={Megaphone} label="Announcements" value={stats.announcements} tone="accent" />
      </div>

      {/* Charts row */}
      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-2 p-6">
          <h2 className="font-heading font-semibold text-foreground mb-1 flex items-center gap-2"><TrendingUp className="w-4 h-4 text-primary" /> Attendance Trend</h2>
          <p className="text-xs text-muted-foreground mb-4">Attendance rate across recorded sessions.</p>
          {trend.length ? <AttendanceTrendChart data={trend} /> : <EmptyState icon={TrendingUp} title="No attendance recorded" description="Record attendance for this ministry's events to see trends." />}
        </Card>

        <Card className="p-6">
          <h2 className="font-heading font-semibold text-foreground mb-4 flex items-center gap-2"><ClipboardCheck className="w-4 h-4 text-primary" /> Attendance Breakdown</h2>
          <AttendanceStatusChart data={statusData} rate={stats.attendanceRate} />
          {statusData.length > 0 && (
            <div className="mt-4 grid grid-cols-2 gap-2">
              {statusData.map((d) => (
                <div key={d.name} className="flex items-center gap-2 text-xs">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: d.color }} />
                  <span className="text-muted-foreground">{d.name}</span>
                  <span className="ml-auto font-medium text-foreground">{d.value}</span>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      {/* Activities + Members */}
      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading font-semibold text-foreground flex items-center gap-2"><CalendarDays className="w-4 h-4 text-primary" /> Upcoming Activities</h2>
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
          <h2 className="font-heading font-semibold text-foreground mb-4 flex items-center gap-2"><Users className="w-4 h-4 text-primary" /> Members</h2>
          <div className="space-y-2.5 max-h-80 overflow-y-auto no-scrollbar">
            {members.slice(0, 12).map((m) => (
              <Link to={`/admin/members/${m.id}`} key={m.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors">
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary font-heading font-bold text-xs flex items-center justify-center">{initials(m.full_name)}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-foreground truncate">{m.full_name}</div>
                  <div className="text-xs text-muted-foreground truncate">{m.church_role || m.membership_status}</div>
                </div>
              </Link>
            ))}
            {members.length === 0 && <p className="text-sm text-muted-foreground">No members linked yet.</p>}
          </div>
        </Card>
      </div>

      {/* Announcements + Meeting info */}
      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6">
          <h2 className="font-heading font-semibold text-foreground mb-4 flex items-center gap-2"><Megaphone className="w-4 h-4 text-primary" /> Announcements</h2>
          <MinistryAnnouncements data={announcements} />
        </Card>

        <Card className="p-6">
          <h2 className="font-heading font-semibold text-foreground mb-4 flex items-center gap-2"><UserCheck className="w-4 h-4 text-primary" /> Meeting & Leadership</h2>
          <div className="space-y-4 text-sm">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-secondary text-secondary-foreground flex items-center justify-center shrink-0"><CalendarDays className="w-4 h-4" /></div>
              <div><div className="text-muted-foreground text-xs">Meeting Day</div><div className="font-medium text-foreground">{ministry.meeting_day || "—"}</div></div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-secondary text-secondary-foreground flex items-center justify-center shrink-0"><Clock className="w-4 h-4" /></div>
              <div><div className="text-muted-foreground text-xs">Meeting Time</div><div className="font-medium text-foreground">{ministry.meeting_time || "—"}</div></div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-secondary text-secondary-foreground flex items-center justify-center shrink-0"><MapPin className="w-4 h-4" /></div>
              <div><div className="text-muted-foreground text-xs">Location</div><div className="font-medium text-foreground">{ministry.location || "—"}</div></div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-secondary text-secondary-foreground flex items-center justify-center shrink-0"><UserCheck className="w-4 h-4" /></div>
              <div><div className="text-muted-foreground text-xs">Leader</div><div className="font-medium text-foreground">{ministry.leader || "—"}</div></div>
            </div>
            {ministry.leader_email && (
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-secondary text-secondary-foreground flex items-center justify-center shrink-0"><Mail className="w-4 h-4" /></div>
                <div><div className="text-muted-foreground text-xs">Leader Email</div><div className="font-medium text-foreground truncate">{ministry.leader_email}</div></div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}