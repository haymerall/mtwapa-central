import { useState } from "react";
import { useList } from "@/lib/useList";
import { base44 } from "@/api/base44Client";
import { PageHeader, Card, Badge, LoadingState, EmptyState } from "@/components/admin/ui-bits";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Modal from "@/components/admin/Modal";
import { CalendarDays, Plus, MapPin, Clock, Users } from "lucide-react";
import { formatDate } from "@/lib/format";
import { useToast } from "@/components/ui/use-toast";

export default function Events() {
  const { data, loading, reload } = useList("Event", "date");
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", date: "", time: "", venue: "", ministry: "", organizer: "", registration_required: false });

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await base44.entities.Event.create({ ...form, status: "upcoming", church_id: "grace-sda" });
      await reload();
      toast({ title: "Event created", description: `${form.title} added to the calendar.` });
      setOpen(false);
      setForm({ title: "", description: "", date: "", time: "", venue: "", ministry: "", organizer: "", registration_required: false });
    } catch (err) {
      toast({ title: "Could not create event", description: err.message, variant: "destructive" });
    } finally { setSaving(false); }
  };

  if (loading) return <LoadingState />;

  return (
    <div>
      <PageHeader
        title="Events"
        subtitle={`${data.length} events on the church calendar`}
        icon={CalendarDays}
        actions={<Button size="sm" onClick={() => setOpen(true)}><Plus className="w-4 h-4 mr-1.5" /> Create event</Button>}
      />

      {data.length === 0 ? (
        <EmptyState icon={CalendarDays} title="No events yet" description="Create your first event to get started." action={<Button onClick={() => setOpen(true)}>Create event</Button>} />
      ) : (
        <div className="space-y-3">
          {data.map((e) => (
            <Card key={e.id} className="p-5 flex flex-col md:flex-row md:items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex flex-col items-center justify-center shrink-0">
                <span className="text-[10px] font-medium text-primary uppercase">{new Date(e.date).toLocaleDateString("en-US", { month: "short" })}</span>
                <span className="font-heading font-bold text-primary text-lg leading-none">{new Date(e.date).getDate()}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <Badge variant="muted">{e.ministry}</Badge>
                  <Badge variant={e.status === "upcoming" ? "primary" : e.status === "completed" ? "success" : "danger"}>{e.status}</Badge>
                  {e.registration_required && <Badge variant="accent">Registration</Badge>}
                </div>
                <h3 className="font-heading font-semibold text-foreground">{e.title}</h3>
                <p className="text-sm text-muted-foreground mt-0.5 line-clamp-1">{e.description}</p>
                <div className="flex flex-wrap gap-4 mt-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {e.time}</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {e.venue}</span>
                  <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {e.organizer}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Create event"
        subtitle="Add a new event to the church calendar"
        footer={<>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={submit} disabled={saving || !form.title || !form.date}>{saving ? "Saving..." : "Create event"}</Button>
        </>}
      >
        <form onSubmit={submit} className="space-y-4">
          <div className="space-y-1.5"><Label htmlFor="title">Title</Label><Input id="title" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Event title" /></div>
          <div className="space-y-1.5"><Label htmlFor="description">Description</Label><Textarea id="description" rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5"><Label htmlFor="date">Date</Label><Input id="date" type="date" required value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} /></div>
            <div className="space-y-1.5"><Label htmlFor="time">Time</Label><Input id="time" placeholder="11:00 AM" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} /></div>
          </div>
          <div className="space-y-1.5"><Label htmlFor="venue">Venue</Label><Input id="venue" value={form.venue} onChange={(e) => setForm({ ...form, venue: e.target.value })} placeholder="Main Sanctuary" /></div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5"><Label htmlFor="ministry">Ministry</Label><Input id="ministry" value={form.ministry} onChange={(e) => setForm({ ...form, ministry: e.target.value })} placeholder="Church" /></div>
            <div className="space-y-1.5"><Label htmlFor="organizer">Organizer</Label><Input id="organizer" value={form.organizer} onChange={(e) => setForm({ ...form, organizer: e.target.value })} placeholder="Pr. Samuel Mwangi" /></div>
          </div>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.registration_required} onChange={(e) => setForm({ ...form, registration_required: e.target.checked })} className="rounded border-border" /> Registration required</label>
        </form>
      </Modal>
    </div>
  );
}