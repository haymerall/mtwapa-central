import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { CHURCH } from "@/lib/seedData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

export default function Contact() {
  const { toast } = useToast();
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    toast({ title: "Message sent", description: "We'll get back to you within 2 business days." });
    e.target.reset();
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <div>
      <section className="bg-primary text-primary-foreground">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-20">
          <div className="text-xs font-semibold text-accent uppercase tracking-wide">Contact</div>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mt-2 max-w-2xl text-balance">We'd love to hear from you</h1>
          <p className="mt-5 text-primary-foreground/80 max-w-2xl leading-relaxed">Questions, prayer requests, or just want to say hello — reach out any time.</p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid md:grid-cols-5 gap-8">
          <div className="md:col-span-2 space-y-5">
            <div className="bg-card border border-border rounded-xl p-6">
              <MapPin className="w-5 h-5 text-accent mb-3" />
              <h3 className="font-heading font-semibold text-sm">Visit us</h3>
              <p className="text-sm text-muted-foreground mt-1">{CHURCH.address}</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <Phone className="w-5 h-5 text-accent mb-3" />
              <h3 className="font-heading font-semibold text-sm">Call us</h3>
              <p className="text-sm text-muted-foreground mt-1">{CHURCH.phone}</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <Mail className="w-5 h-5 text-accent mb-3" />
              <h3 className="font-heading font-semibold text-sm">Email us</h3>
              <p className="text-sm text-muted-foreground mt-1">{CHURCH.email}</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <Clock className="w-5 h-5 text-accent mb-3" />
              <h3 className="font-heading font-semibold text-sm">Service times</h3>
              <ul className="text-sm text-muted-foreground mt-1 space-y-1.5">
                {CHURCH.service_times.map((s) => (
                  <li key={s.label} className="flex justify-between"><span>{s.label}</span><span className="text-foreground">{s.day} · {s.time}</span></li>
                ))}
              </ul>
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="bg-card border border-border rounded-xl p-6 md:p-8">
              <h2 className="font-heading text-xl font-bold mb-1">Send us a message</h2>
              <p className="text-sm text-muted-foreground mb-6">We typically respond within two business days.</p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" required placeholder="Your name" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" required placeholder="you@example.com" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" required placeholder="How can we help?" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" required rows={5} placeholder="Your message..." />
                </div>
                <Button type="submit" className="w-full sm:w-auto" disabled={sent}>
                  {sent ? "Sent ✓" : <>Send message <Send className="w-4 h-4 ml-1.5" /></>}
                </Button>
              </form>
            </div>
            <div className="mt-4 bg-secondary/40 border border-border rounded-xl h-48 flex items-center justify-center text-muted-foreground text-sm">
              <div className="text-center">
                <MapPin className="w-6 h-6 mx-auto mb-2 text-accent" />
                Map placeholder · {CHURCH.address}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}