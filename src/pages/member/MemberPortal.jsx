import { Navigate, useNavigate } from "react-router-dom";
import { useDemoSession } from "@/lib/useDemoSession";
import { useList } from "@/lib/useList";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, Badge } from "@/components/admin/ui-bits";
import { CalendarDays, Bell, Users, ClipboardList, Heart, User, ArrowRight, BookOpen, HandHeart, Sparkles } from "lucide-react";
import { formatDate } from "@/lib/format";

export default function MemberPortal() {
  const { session, logout } = useDemoSession();
  const navigate = useNavigate();
  const events = useList("Event", "date");
  const announcements = useList("Announcement", "-date");

  if (!session) return <Navigate to="/login" replace />;
  if (session.role !== "member") return <Navigate to="/admin" replace />;

  const upcoming = (events.data || []).filter((e) => e.status === "upcoming").slice(0, 3);
  const greeting = (() => { const h = new Date().getHours(); return h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening"; })();

  const myMinistries = ["Sabbath School", "Music & Choir"];
  const myAssignments = [
    { title: "Scripture reading", event: "Sabbath Divine Worship", date: "2026-10-03", icon: BookOpen },
    { title: "Choir rehearsal", event: "Choir Practice", date: "2026-10-02", icon: CalendarDays },
    { title: "Welcome team duty", event: "Sabbath Divine Worship", date: "2026-10-10", icon: HandHeart },
  ];

  const handleLogout = () => { logout(); navigate("/login"); };

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="sticky top-0 z-20 bg-primary text-primary-foreground">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-primary-foreground/15 flex items-center justify-center"><Sparkles className="w-5 h-5" /></div>
            <div className="leading-tight">
              <div className="font-heading font-bold text-sm">Mtwapa Central SDA</div>
              <div className="text-[10px] text-primary-foreground/60 uppercase tracking-wide">Member Portal</div>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/" className="text-sm text-primary-foreground/80 hover:text-primary-foreground hidden sm:block">Website</Link>
            <button onClick={handleLogout} className="text-sm text-primary-foreground/80 hover:text-primary-foreground">Sign out</button>
            <div className="w-9 h-9 rounded-full bg-primary-foreground/15 font-heading font-bold flex items-center justify-center text-sm">{session.name.split(" ").map((p) => p[0]).join("").slice(0, 2)}</div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="font-heading text-3xl font-bold text-foreground">{greeting}, {session.name.split(" ")[0]}.</h1>
          <p className="text-muted-foreground mt-1">Here's what's happening at Grace this week.</p>
        </div>

        {/* Next service highlight */}
        <div className="rounded-2xl bg-primary text-primary-foreground p-6 sm:p-8 mb-6 relative overflow-hidden">
          <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-accent/15 blur-2xl" />
          <div className="relative">
            <div className="text-xs font-semibold text-accent uppercase tracking-wide">Next Sabbath Service</div>
            <h2 className="font-heading text-2xl font-bold mt-1.5">Divine Worship · October 3</h2>
            <p className="text-primary-foreground/80 mt-1.5 text-sm">11:00 AM · Main Sanctuary · Pr. Samuel Mwangi</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">Add to calendar</Button>
              <Button size="sm" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">Request prayer</Button>
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {[
            { icon: CalendarDays, label: "View events" },
            { icon: Heart, label: "Submit prayer request" },
            { icon: User, label: "Update profile" },
            { icon: HandHeart, label: "Volunteer" },
          ].map((a) => (
            <button key={a.label} className="bg-card border border-border rounded-xl p-4 text-left hover:border-primary/30 hover:shadow-sm transition-all">
              <a.icon className="w-5 h-5 text-primary mb-2.5" />
              <div className="text-sm font-medium text-foreground">{a.label}</div>
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Upcoming events */}
          <Card className="lg:col-span-2 p-6">
            <h2 className="font-heading font-semibold text-foreground mb-4 flex items-center gap-2"><CalendarDays className="w-4.5 h-4.5 text-primary" /> Upcoming Events</h2>
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
                  {e.registration_required && <Badge variant="accent">RSVP</Badge>}
                </div>
              ))}
            </div>
          </Card>

          {/* My ministries */}
          <Card className="p-6">
            <h2 className="font-heading font-semibold text-foreground mb-4 flex items-center gap-2"><Users className="w-4.5 h-4.5 text-primary" /> My Ministries</h2>
            <div className="space-y-2.5">
              {myMinistries.map((m) => (
                <div key={m} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/40">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center"><Users className="w-4.5 h-4.5 text-primary" /></div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-foreground">{m}</div>
                    <div className="text-xs text-muted-foreground">Active member</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Assignments + announcements */}
        <div className="grid lg:grid-cols-3 gap-6 mt-6">
          <Card className="lg:col-span-2 p-6">
            <h2 className="font-heading font-semibold text-foreground mb-4 flex items-center gap-2"><ClipboardList className="w-4.5 h-4.5 text-primary" /> My Assignments</h2>
            <div className="space-y-3">
              {myAssignments.map((a) => (
                <div key={a.title} className="flex items-center gap-3 py-2.5 border-b border-border last:border-0">
                  <div className="w-9 h-9 rounded-lg bg-accent/15 flex items-center justify-center"><a.icon className="w-4.5 h-4.5 text-accent" /></div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-foreground">{a.title}</div>
                    <div className="text-xs text-muted-foreground">{a.event}</div>
                  </div>
                  <span className="text-xs text-muted-foreground">{formatDate(a.date)}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="font-heading font-semibold text-foreground mb-4 flex items-center gap-2"><Bell className="w-4.5 h-4.5 text-primary" /> Announcements</h2>
            <div className="space-y-4">
              {(announcements.data || []).slice(0, 4).map((a) => (
                <div key={a.id} className="pb-3 border-b border-border last:border-0 last:pb-0">
                  <div className="text-sm font-medium text-foreground">{a.title}</div>
                  <div className="text-xs text-muted-foreground mt-1 line-clamp-2">{a.body}</div>
                  <div className="text-[11px] text-muted-foreground/70 mt-1">{a.author} · {formatDate(a.date)}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Give CTA */}
        <div className="mt-8 rounded-2xl bg-secondary border border-border p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-heading text-lg font-bold text-foreground">Give with a joyful heart</h3>
            <p className="text-sm text-muted-foreground mt-1">Support the mission and ministry of Mtwapa Central SDA. (Giving is simulated in this prototype.)</p>
          </div>
          <Button className="bg-accent text-accent-foreground hover:bg-accent/90 shrink-0">Give now <ArrowRight className="w-4 h-4 ml-1.5" /></Button>
        </div>
      </main>
    </div>
  );
}