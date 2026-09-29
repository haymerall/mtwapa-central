import { useState } from "react";
import { useList } from "@/lib/useList";
import { base44 } from "@/api/base44Client";
import { PageHeader, Card, Badge, LoadingState, EmptyState } from "@/components/admin/ui-bits";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Modal from "@/components/admin/Modal";
import { Megaphone, Plus, Globe, Users, Church, CalendarDays } from "lucide-react";
import { formatDate } from "@/lib/format";
import { useToast } from "@/components/ui/use-toast";
import { useDemoSession } from "@/lib/useDemoSession";

const AUDIENCE_LABEL = { entire_church: "Entire Church", ministry: "Ministry", members: "Members", event_participants: "Event Participants" };
const AUDIENCE_ICON = { entire_church: Globe, ministry: Church, members: Users, event_participants: CalendarDays };

export default function Communication() {
  const { data, loading, reload } = useList("Announcement", "-date");
  const { toast } = useToast();
  const { session } = useDemoSession();
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ title: "", body: "", audience: "entire_church", ministry: "" });

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await base44.entities.Announcement.create({
        ...form, status: "published", author: session?.name || "Unknown",
        date: new Date().toISOString().slice(0, 10), church_id: "grace-sda",
      });
      await reload();
      toast({ title: "Announcement published", description: form.title });
      setOpen(false);
      setForm({ title: "", body: "", audience: "entire_church", ministry: "" });
    } catch (err) { toast({ title: "Could not publish", description: err.message, variant: "destructive" }); }
    finally { setSaving(false); }
  };

  if (loading) return <LoadingState />;

  return (
    <div>
      <PageHeader
        title="Communication"
        subtitle="Church-wide and ministry announcements"
        icon={Megaphone}
        actions={<Button size="sm" onClick={() => setOpen(true)}><Plus className="w-4 h-4 mr-1.5" /> New announcement</Button>}
      />

      {data.length === 0 ? (
        <EmptyState icon={Megaphone} title="No announcements" description="Publish your first announcement." action={<Button onClick={() => setOpen(true)}>New announcement</Button>} />
      ) : (
        <div className="space-y-3">
          {data.map((a) => {
            const Icon = AUDIENCE_ICON[a.audience] || Globe;
            return (
              <Card key={a.id} className="p-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/15 text-accent flex items-center justify-center shrink-0"><Megaphone className="w-5 h-5" /></div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className="font-heading font-semibold text-foreground">{a.title}</h3>
                      <Badge variant="primary"><Icon className="w-3 h-3 mr-1" /> {AUDIENCE_LABEL[a.audience]}</Badge>
                      {a.ministry && <Badge variant="muted">{a.ministry}</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{a.body}</p>
                    <div className="text-xs text-muted-foreground/70 mt-2">{a.author} · {formatDate(a.date)}</div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="New announcement"
        subtitle="Reach the right audience with your message"
        footer={<>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={submit} disabled={saving || !form.title || !form.body}>{saving ? "Publishing..." : "Publish"}</Button>
        </>}
      >
        <form onSubmit={submit} className="space-y-4">
          <div className="space-y-1.5"><Label htmlFor="title">Title</Label><Input id="title" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Announcement title" /></div>
          <div className="space-y-1.5"><Label htmlFor="body">Message</Label><Textarea id="body" required rows={4} value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} placeholder="Write your announcement..." /></div>
          <div className="space-y-1.5">
            <Label htmlFor="audience">Audience</Label>
            <select id="audience" value={form.audience} onChange={(e) => setForm({ ...form, audience: e.target.value })} className="w-full h-10 rounded-md border border-input bg-card px-3 text-sm">
              <option value="entire_church">Entire Church</option>
              <option value="members">All Members</option>
              <option value="ministry">Specific Ministry</option>
              <option value="event_participants">Event Participants</option>
            </select>
          </div>
          {form.audience === "ministry" && (
            <div className="space-y-1.5"><Label htmlFor="ministry">Ministry</Label><Input id="ministry" value={form.ministry} onChange={(e) => setForm({ ...form, ministry: e.target.value })} placeholder="e.g. Children's Ministry" /></div>
          )}
          <p className="text-xs text-muted-foreground">SMS / WhatsApp / email delivery is architected for later — this MVP records the announcement and audience.</p>
        </form>
      </Modal>
    </div>
  );
}