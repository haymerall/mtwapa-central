import { Play, Clock, User } from "lucide-react";
import { formatDate } from "@/lib/format";

const sermons = [
  { title: "Living in the Light of Grace", speaker: "Pr. Samuel Mwangi", date: "2026-09-26", category: "Grace", series: "Foundations" },
  { title: "The Sabbath as a Gift", speaker: "Pr. Samuel Mwangi", date: "2026-09-19", category: "Sabbath", series: "Foundations" },
  { title: "Faith That Works", speaker: "Daniel Otieno", date: "2026-09-12", category: "Discipleship", series: "Foundations" },
  { title: "A Heart for Service", speaker: "Pr. Samuel Mwangi", date: "2026-09-05", category: "Service", series: "Living Hope" },
  { title: "Prayer That Moves Mountains", speaker: "Ruth Adhiambo", date: "2026-08-29", category: "Prayer", series: "Living Hope" },
  { title: "The Hope of His Return", speaker: "Pr. Samuel Mwangi", date: "2026-08-22", category: "Prophecy", series: "Living Hope" },
];

export default function Sermons() {
  return (
    <div>
      <section className="bg-primary text-primary-foreground">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-20">
          <div className="text-xs font-semibold text-accent uppercase tracking-wide">Sermons & Media</div>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mt-2 max-w-2xl text-balance">Listen, watch, and grow</h1>
          <p className="mt-5 text-primary-foreground/80 max-w-2xl leading-relaxed">Catch up on past messages or share with a friend. Video and audio available for each sermon.</p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {sermons.map((s) => (
            <div key={s.title} className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-sm transition-shadow">
              <div className="relative aspect-video bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center group cursor-pointer">
                <div className="w-14 h-14 rounded-full bg-primary-foreground/15 backdrop-blur flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="w-6 h-6 text-primary-foreground ml-0.5" />
                </div>
                <span className="absolute top-3 left-3 text-xs px-2 py-1 rounded-full bg-primary-foreground/15 text-primary-foreground font-medium">{s.category}</span>
              </div>
              <div className="p-5">
                <div className="text-xs text-accent font-medium">{s.series} series</div>
                <h3 className="font-heading font-semibold text-foreground mt-1">{s.title}</h3>
                <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> {s.speaker}</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {formatDate(s.date)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-muted-foreground mt-10">Video and audio players are placeholders in this prototype.</p>
      </section>
    </div>
  );
}