import { Heart, Target, Eye, BookOpen, Users } from "lucide-react";
import { CHURCH, MINISTRIES } from "@/lib/seedData";

const beliefs = [
  { title: "The Holy Scriptures", text: "The Bible is the inspired Word of God and our rule of faith and practice." },
  { title: "The Sabbath", text: "We rest and worship on the seventh day, Saturday, as a gift and sign of God's creation and redemption." },
  { title: "Salvation by Grace", text: "Salvation is God's free gift, received through faith in Jesus Christ, not by our works." },
  { title: "The Second Coming", text: "We look forward to the soon return of Jesus Christ, our blessed hope." },
  { title: "Wholistic Health", text: "We honor God with our bodies through healthy living, temperance, and care for creation." },
  { title: "Service & Mission", text: "We are called to share the gospel and serve our neighbors in love." },
];

const leaders = [
  { name: "Pr. Samuel Mwangi", role: "Senior Pastor" },
  { name: "Daniel Otieno", role: "First Elder" },
  { name: "Grace Wanjiru", role: "Treasurer" },
  { name: "Mercy Achieng", role: "Church Clerk" },
];

export default function About() {
  return (
    <div>
      <section className="bg-primary text-primary-foreground">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-20">
          <div className="text-xs font-semibold text-accent uppercase tracking-wide">About Us</div>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mt-2 max-w-2xl text-balance">Our story, our mission, our hope</h1>
          <p className="mt-5 text-primary-foreground/80 max-w-2xl leading-relaxed">{CHURCH.tagline}.</p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-card border border-border rounded-xl p-7">
            <Target className="w-7 h-7 text-accent mb-4" />
            <h2 className="font-heading text-xl font-bold">Our Mission</h2>
            <p className="text-muted-foreground mt-3 leading-relaxed text-sm">{CHURCH.mission}</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-7">
            <Eye className="w-7 h-7 text-accent mb-4" />
            <h2 className="font-heading text-xl font-bold">Our Vision</h2>
            <p className="text-muted-foreground mt-3 leading-relaxed text-sm">{CHURCH.vision}</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-7">
            <Heart className="w-7 h-7 text-accent mb-4" />
            <h2 className="font-heading text-xl font-bold">Our Values</h2>
            <p className="text-muted-foreground mt-3 leading-relaxed text-sm">Faithfulness to Scripture, warm fellowship, compassionate service, and a commitment to wholistic living.</p>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
        <div className="flex items-center gap-2 mb-6">
          <BookOpen className="w-5 h-5 text-accent" />
          <h2 className="font-heading text-2xl font-bold">What we believe</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {beliefs.map((b) => (
            <div key={b.title} className="bg-secondary/40 border border-border rounded-xl p-5">
              <h3 className="font-heading font-semibold text-foreground">{b.title}</h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{b.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        <div className="flex items-center gap-2 mb-6">
          <Users className="w-5 h-5 text-accent" />
          <h2 className="font-heading text-2xl font-bold">Our leadership</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {leaders.map((l) => (
            <div key={l.name} className="bg-card border border-border rounded-xl p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 text-primary font-heading font-bold text-xl flex items-center justify-center mx-auto mb-4">
                {l.name.split(" ").map((p) => p[0]).join("")}
              </div>
              <h3 className="font-heading font-semibold text-foreground">{l.name}</h3>
              <p className="text-sm text-accent font-medium mt-0.5">{l.role}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}