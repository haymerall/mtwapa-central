import { PageHeader, Card, Badge } from "@/components/admin/ui-bits";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings as SettingsIcon, Shield, Bell, Church } from "lucide-react";
import { useDemoSession } from "@/lib/useDemoSession";
import { ROLE_LABELS } from "@/lib/roles";

export default function Settings() {
  const { session } = useDemoSession();
  return (
    <div>
      <PageHeader title="Settings" subtitle="Church profile and platform configuration" icon={SettingsIcon} />

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="p-6 lg:col-span-2">
          <h2 className="font-heading font-semibold text-foreground mb-1 flex items-center gap-2"><Church className="w-4.5 h-4.5 text-primary" /> Church Profile</h2>
          <p className="text-sm text-muted-foreground mb-5">Basic information about your church.</p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5"><Label>Church name</Label><Input defaultValue="Grace Seventh-day Adventist Church" /></div>
            <div className="space-y-1.5"><Label>Phone</Label><Input defaultValue="+254 700 123 456" /></div>
            <div className="space-y-1.5 sm:col-span-2"><Label>Address</Label><Input defaultValue="123 Riverside Drive, Nairobi, Kenya" /></div>
            <div className="space-y-1.5"><Label>Primary contact email</Label><Input defaultValue="hello@gracesda.org" /></div>
            <div className="space-y-1.5"><Label>Timezone</Label><Input defaultValue="Africa/Nairobi (UTC+3)" /></div>
          </div>
          <div className="mt-5 flex justify-end"><Button size="sm">Save changes</Button></div>
        </Card>

        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="font-heading font-semibold text-foreground mb-1 flex items-center gap-2"><Shield className="w-4.5 h-4.5 text-primary" /> Your Access</h2>
            <p className="text-sm text-muted-foreground mb-4">Current session and role.</p>
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-primary/10 text-primary font-heading font-bold flex items-center justify-center">{session?.name?.split(" ").map((p) => p[0]).join("").slice(0, 2)}</div>
              <div>
                <div className="font-medium text-foreground">{session?.name}</div>
                <Badge variant="primary" className="mt-0.5">{ROLE_LABELS[session?.role]}</Badge>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-4">Role-based access is enforced per module. Backend row-level security is the production hardening step.</p>
          </Card>

          <Card className="p-6">
            <h2 className="font-heading font-semibold text-foreground mb-1 flex items-center gap-2"><Bell className="w-4.5 h-4.5 text-primary" /> Notifications</h2>
            <div className="space-y-3 mt-4">
              {[["New member alerts", true], ["Event reminders", true], ["Finance approvals", false], ["Announcement replies", false]].map(([label, on]) => (
                <label key={label} className="flex items-center justify-between text-sm">
                  <span className="text-foreground">{label}</span>
                  <input type="checkbox" defaultChecked={on} className="rounded border-border" />
                </label>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}