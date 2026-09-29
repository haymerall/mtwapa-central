import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { PageHeader, Card, Badge, LoadingState, EmptyState } from "@/components/admin/ui-bits";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Users, Mail, Phone, MapPin, Briefcase, Calendar, Heart, User, Activity, CalendarDays } from "lucide-react";
import { formatDate, initials } from "@/lib/format";

const STATUS_VARIANT = {
  active: "success", inactive: "muted", transferred: "warning", baptism_candidate: "accent",
};

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3 py-2.5 border-b border-border last:border-0">
      <Icon className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
      <div className="flex-1 min-w-0">
        <div className="text-xs text-muted-foreground">{label}</div>
        <div className="text-sm text-foreground">{value || "—"}</div>
      </div>
    </div>
  );
}

export default function MemberProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.Member.get(id).then((m) => setMember(m)).catch(() => setMember(null)).finally(() => setLoading(false));
  }, [id]);

  if (loading) return <LoadingState />;
  if (!member) return <EmptyState icon={User} title="Member not found" action={<Button variant="outline" onClick={() => navigate("/admin/members")}>Back to members</Button>} />;

  return (
    <div>
      <Button variant="ghost" size="sm" asChild className="mb-4 -ml-2"><Link to="/admin/members"><ArrowLeft className="w-4 h-4 mr-1" /> Members</Link></Button>

      <Card className="p-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-5">
          <div className="w-20 h-20 rounded-2xl bg-primary/10 text-primary font-heading font-bold text-2xl flex items-center justify-center shrink-0">{initials(member.full_name)}</div>
          <div className="flex-1">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="font-heading text-2xl font-bold text-foreground">{member.full_name}</h1>
              <Badge variant={STATUS_VARIANT[member.membership_status]}>{(member.membership_status || "").replace("_", " ")}</Badge>
            </div>
            <div className="text-sm text-muted-foreground mt-1">{member.church_role} · {member.occupation}</div>
            <div className="flex flex-wrap gap-2 mt-3">
              {(member.ministries || []).map((m) => <Badge key={m} variant="primary">{m}</Badge>)}
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">Edit</Button>
            <Button size="sm">Message</Button>
          </div>
        </div>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="p-6">
          <h2 className="font-heading font-semibold text-foreground mb-2">Personal Information</h2>
          <InfoRow icon={User} label="Gender" value={member.gender} />
          <InfoRow icon={Calendar} label="Date of birth" value={formatDate(member.date_of_birth)} />
          <InfoRow icon={Mail} label="Email" value={member.email} />
          <InfoRow icon={Phone} label="Phone" value={member.phone} />
          <InfoRow icon={MapPin} label="Address" value={member.address} />
          <InfoRow icon={Briefcase} label="Occupation" value={member.occupation} />
        </Card>

        <Card className="p-6">
          <h2 className="font-heading font-semibold text-foreground mb-2">Church Information</h2>
          <InfoRow icon={Calendar} label="Date joined" value={formatDate(member.date_joined)} />
          <InfoRow icon={Calendar} label="Baptism date" value={member.baptism_date ? formatDate(member.baptism_date) : "Not yet baptized"} />
          <InfoRow icon={Users} label="Church role" value={member.church_role} />
          <InfoRow icon={Users} label="Ministries" value={(member.ministries || []).join(", ") || "—"} />
          <InfoRow icon={Activity} label="Membership status" value={(member.membership_status || "").replace("_", " ")} />
        </Card>

        <Card className="p-6">
          <h2 className="font-heading font-semibold text-foreground mb-2">Family</h2>
          <InfoRow icon={Heart} label="Spouse" value={member.spouse || "—"} />
          <InfoRow icon={Users} label="Children" value={(member.children || []).join(", ") || "—"} />
          <div className="mt-4 pt-4 border-t border-border">
            <h3 className="font-heading font-semibold text-foreground text-sm mb-3 flex items-center gap-2"><CalendarDays className="w-4 h-4 text-primary" /> Activity</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Attendance (90 days)</span><span className="font-medium text-foreground">82%</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Ministry involvement</span><span className="font-medium text-foreground">{(member.ministries || []).length} ministries</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Upcoming assignments</span><span className="font-medium text-foreground">2</span></div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}