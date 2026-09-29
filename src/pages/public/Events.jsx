import { useState } from "react";
import { CalendarDays, Clock, MapPin, Users } from "lucide-react";
import { EVENTS } from "@/lib/seedData";
import { formatDate } from "@/lib/format";

export default function Events() {
  const [filter, setFilter] = useState("all");
  const upcoming = EVENTS.filter((e) => e.status === "upcoming");
  const past = EVENTS.filter((e) => e.status === "completed");
  const list = filter === "past" ? past : upcoming;

  return (
    <div>
      <section className="bg-primary text-primary-foreground">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-20">
          <div className="text-xs font-semibold text-accent uppercase tracking-wide">Events</div>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mt-2 max-w-2xl text-balance">Come and be part of what's next</h1>
          <p className="mt-5 text-primary-foreground/80 max-w-2xl leading-relaxed">Worship, fellowship, service, and study — there's always something happening at Grace.</p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex gap-2 mb-8">
          {[{ k: "upcoming", l: "Upcoming" }, { k: "past", l: "Past" }].map((t) => (
            <button
              key={t.k}
              onClick={() => setFilter(t.k)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === t.k ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/70"}`}
            >
              {t.l}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {list.map((e) => (
            <div key={e.title} className="bg-card border border-border rounded-xl p-5 md:p-6 flex flex-col md:flex-row md:items-center gap-4 md:gap-6 hover:shadow-sm transition-shadow">
              <div className="flex items-center gap-4 md:w-48 shrink-0">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex flex-col items-center justify-center shrink-0">
                  <span className="text-xs font-medium text-primary uppercase">{new Date(e.date).toLocaleDateString("en-US", { month: "short" })}</span>
                  <span className="font-heading text-xl font-bold text-primary">{new Date(e.date).getDate()}</span>
                </div>
                <div className="text-sm">
                  <div className="flex items-center gap-1.5 text-muted-foreground"><Clock className="w-3.5 h-3.5" /> {e.time}</div>
                  <div className="flex items-center gap-1.5 text-muted-foreground mt-1"><MapPin className="w-3.5 h-3.5" /> {e.venue}</div>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground font-medium">{e.ministry}</span>
                  {e.registration_required && <span className="text-xs px-2 py-0.5 rounded-full bg-accent/15 text-accent font-medium">Registration</span>}
                </div>
                <h3 className="font-heading font-semibold text-foreground">{e.title}</h3>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{e.description}</p>
              </div>
              <div className="text-xs text-muted-foreground md:text-right shrink-0">
                <div className="flex items-center gap-1.5 md:justify-end"><Users className="w-3.5 h-3.5" /> {e.organizer}</div>
                <div className="mt-1">{formatDate(e.date)}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}