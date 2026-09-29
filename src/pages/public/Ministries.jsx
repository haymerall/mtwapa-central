import { Link } from "react-router-dom";
import { Users, ArrowRight } from "lucide-react";
import { MINISTRIES } from "@/lib/seedData";

export default function Ministries() {
  return (
    <div>
      <section className="bg-primary text-primary-foreground">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-20">
          <div className="text-xs font-semibold text-accent uppercase tracking-wide">Ministries</div>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mt-2 max-w-2xl text-balance">Find your place to belong and serve</h1>
          <p className="mt-5 text-primary-foreground/80 max-w-2xl leading-relaxed">Every ministry is a doorway into community and purpose. Explore and find one that fits your season of life.</p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {MINISTRIES.map((m) => (
            <Link key={m.slug} to={`/ministries/${m.slug}`} className="group bg-card border border-border rounded-xl p-6 hover:border-primary/40 hover:shadow-sm transition-all flex flex-col">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: m.color + "18" }}>
                  <Users className="w-6 h-6" style={{ color: m.color }} />
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground font-medium">{m.category}</span>
              </div>
              <h3 className="font-heading text-lg font-semibold mt-4 text-foreground group-hover:text-primary transition-colors">{m.name}</h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed flex-1">{m.description}</p>
              <div className="mt-5 pt-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                <span>{m.members_count} members</span>
                <span className="flex items-center gap-1 text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">View <ArrowRight className="w-3.5 h-3.5" /></span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}