import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Clock, BookOpen, Heart, Users, CalendarDays, Play, Sparkles } from "lucide-react";
import { CHURCH, MINISTRIES, EVENTS } from "@/lib/seedData";
import { formatDate } from "@/lib/format";
import { Button } from "@/components/ui/button";

export default function Home() {
  const featured = MINISTRIES.filter((m) => m.featured).slice(0, 4);
  const upcoming = EVENTS.filter((e) => e.status === "upcoming").slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "radial-gradient(circle at 20% 30%, white 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-accent/20 blur-3xl" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-20 md:py-28">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-foreground/10 text-primary-foreground/90 text-xs font-medium mb-6">
              <Sparkles className="w-3.5 h-3.5" /> Welcome to {CHURCH.name}
            </div>
            <h1 className="font-heading text-4xl md:text-6xl font-bold leading-[1.08] text-balance">
              A community of faith, hope & love
            </h1>
            <p className="mt-6 text-lg text-primary-foreground/80 leading-relaxed max-w-xl">
              We're a Seventh-day Adventist family worshiping, growing, and serving together in Nairobi. Wherever you are on your journey, there's a place for you here.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Link to="/contact">Plan your visit <ArrowRight className="w-4 h-4 ml-1.5" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                <Link to="/sermons"><Play className="w-4 h-4 mr-1.5" /> Watch sermons</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Service times */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 -mt-10 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 bg-card rounded-2xl shadow-sm border border-border p-5 md:p-6">
          {CHURCH.service_times.map((s) => (
            <div key={s.label} className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground font-medium">{s.day} · {s.time}</div>
                <div className="font-heading font-semibold text-sm text-foreground">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Welcome */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-20">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="text-sm font-semibold text-accent uppercase tracking-wide">Our Welcome</div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mt-2 text-balance">Come as you are, grow in Christ</h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              At Grace, we believe church is more than a service — it's a family. We gather each Sabbath to worship God through song, Scripture, and fellowship, and we scatter through the week to serve our city with the love of Jesus.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Whether you're exploring faith for the first time or looking for a church home, you'll find warm people, honest teaching, and a community that cares.
            </p>
            <Button asChild variant="link" className="px-0 mt-4 text-primary">
              <Link to="/about">Learn more about us <ArrowRight className="w-4 h-4 ml-1" /></Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Users, label: "Members", value: "180+" },
              { icon: CalendarDays, label: "Weekly Services", value: "4" },
              { icon: BookOpen, label: "Ministries", value: "11" },
              { icon: Heart, label: "Years Serving", value: "25" },
            ].map((s) => (
              <div key={s.label} className="bg-card border border-border rounded-xl p-5">
                <s.icon className="w-5 h-5 text-accent mb-3" />
                <div className="font-heading text-2xl font-bold text-foreground">{s.value}</div>
                <div className="text-sm text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ministries preview */}
      <section className="bg-secondary/40 border-y border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-20">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <div className="text-sm font-semibold text-accent uppercase tracking-wide">Get Involved</div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mt-2">Ministries for every season of life</h2>
            </div>
            <Button asChild variant="outline">
              <Link to="/ministries">All ministries <ArrowRight className="w-4 h-4 ml-1" /></Link>
            </Button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featured.map((m) => (
              <Link key={m.slug} to={`/ministries/${m.slug}`} className="group bg-card rounded-xl p-6 border border-border hover:border-primary/40 hover:shadow-sm transition-all">
                <div className="w-11 h-11 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: m.color + "18" }}>
                  <Users className="w-5 h-5" style={{ color: m.color }} />
                </div>
                <h3 className="font-heading font-semibold text-foreground group-hover:text-primary transition-colors">{m.name}</h3>
                <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed line-clamp-2">{m.description}</p>
                <div className="mt-4 text-xs text-muted-foreground">{m.members_count} members · {m.meeting_day}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming events */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-20">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <div className="text-sm font-semibold text-accent uppercase tracking-wide">What's Happening</div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mt-2">Upcoming events</h2>
          </div>
          <Button asChild variant="outline">
            <Link to="/events">Full calendar <ArrowRight className="w-4 h-4 ml-1" /></Link>
          </Button>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {upcoming.map((e) => (
            <div key={e.title} className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-sm transition-shadow">
              <div className="h-2" style={{ backgroundColor: MINISTRIES.find((m) => m.name === e.ministry)?.color || "#2f6b54" }} />
              <div className="p-5">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                  <CalendarDays className="w-3.5 h-3.5" /> {formatDate(e.date)}
                  <span>·</span> {e.time}
                </div>
                <h3 className="font-heading font-semibold text-foreground">{e.title}</h3>
                <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed line-clamp-2">{e.description}</p>
                <div className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <MapPin className="w-3.5 h-3.5" /> {e.venue}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Latest sermon + CTA */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        <div className="grid md:grid-cols-2 gap-5">
          <div className="bg-primary text-primary-foreground rounded-2xl p-8 md:p-10 relative overflow-hidden">
            <div className="absolute -right-16 -bottom-16 w-64 h-64 rounded-full bg-accent/15 blur-2xl" />
            <div className="relative">
              <div className="text-xs font-semibold text-accent uppercase tracking-wide">Latest Sermon</div>
              <h3 className="font-heading text-2xl font-bold mt-2">Living in the Light of Grace</h3>
              <p className="text-primary-foreground/70 mt-2 text-sm">Pr. Samuel Mwangi · September 26, 2026</p>
              <Button asChild className="mt-6 bg-accent text-accent-foreground hover:bg-accent/90">
                <Link to="/sermons"><Play className="w-4 h-4 mr-1.5" /> Watch now</Link>
              </Button>
            </div>
          </div>
          <div className="bg-secondary border border-border rounded-2xl p-8 md:p-10 flex flex-col justify-center">
            <BookOpen className="w-7 h-7 text-accent mb-4" />
            <h3 className="font-heading text-2xl font-bold text-foreground">Bible study & prayer</h3>
            <p className="text-muted-foreground mt-2 leading-relaxed">Join us midweek for deeper study and prayer. Everyone is welcome — bring your questions and your heart.</p>
            <Button asChild variant="outline" className="mt-6 self-start">
              <Link to="/contact">Join a study group</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}