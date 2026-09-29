import { useParams, Link } from "react-router-dom";
import { Users, Clock, MapPin, ArrowLeft, Mail } from "lucide-react";
import { MINISTRIES } from "@/lib/seedData";
import { Button } from "@/components/ui/button";

export default function MinistryDetail() {
  const { slug } = useParams();
  const ministry = MINISTRIES.find((m) => m.slug === slug);

  if (!ministry) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-24 text-center">
        <h1 className="font-heading text-2xl font-bold">Ministry not found</h1>
        <Button asChild variant="outline" className="mt-6"><Link to="/ministries">Back to ministries</Link></Button>
      </div>
    );
  }

  return (
    <div>
      <section className="text-primary-foreground" style={{ backgroundColor: ministry.color }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-20">
          <Link to="/ministries" className="inline-flex items-center gap-1.5 text-primary-foreground/80 hover:text-primary-foreground text-sm mb-6">
            <ArrowLeft className="w-4 h-4" /> All ministries
          </Link>
          <div className="flex items-center gap-2 text-xs font-medium text-primary-foreground/80 mb-3">
            <span className="px-2.5 py-1 rounded-full bg-primary-foreground/15">{ministry.category}</span>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-balance">{ministry.name}</h1>
          <p className="mt-4 text-primary-foreground/85 max-w-2xl leading-relaxed">{ministry.description}</p>
          <div className="mt-8 flex flex-wrap gap-5 text-sm text-primary-foreground/85">
            <span className="flex items-center gap-2"><Users className="w-4 h-4" /> {ministry.members_count} members</span>
            <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> {ministry.meeting_day} · {ministry.meeting_time}</span>
            <span className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {ministry.location}</span>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="w-14 h-14 rounded-full bg-primary/10 text-primary font-heading font-bold flex items-center justify-center mb-4">
              {ministry.leader.split(" ").map((p) => p[0]).join("")}
            </div>
            <h3 className="font-heading font-semibold text-foreground">{ministry.leader}</h3>
            <p className="text-sm text-accent font-medium">Ministry Leader</p>
            <a href={`mailto:${ministry.leader_email}`} className="mt-3 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary">
              <Mail className="w-3.5 h-3.5" /> {ministry.leader_email}
            </a>
          </div>
          <div className="bg-card border border-border rounded-xl p-6 md:col-span-2">
            <h3 className="font-heading font-semibold text-foreground mb-3">About this ministry</h3>
            <p className="text-muted-foreground leading-relaxed text-sm">{ministry.description} We meet regularly for fellowship, study, and service. New participants are always welcome — no experience required, just a willing heart.</p>
            <div className="mt-5 grid grid-cols-2 gap-4">
              <div className="bg-secondary/40 rounded-lg p-4">
                <div className="text-2xl font-heading font-bold text-foreground">{ministry.members_count}</div>
                <div className="text-xs text-muted-foreground">Active members</div>
              </div>
              <div className="bg-secondary/40 rounded-lg p-4">
                <div className="text-2xl font-heading font-bold text-foreground">{ministry.meeting_day}</div>
                <div className="text-xs text-muted-foreground">Regular meeting day</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 bg-primary text-primary-foreground rounded-2xl p-8 md:p-10 text-center">
          <h3 className="font-heading text-2xl font-bold">Interested in joining?</h3>
          <p className="text-primary-foreground/80 mt-2 max-w-lg mx-auto">We'd love to have you. Reach out and we'll connect you with the ministry leader.</p>
          <Button asChild className="mt-6 bg-accent text-accent-foreground hover:bg-accent/90">
            <Link to="/contact">Get in touch</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}