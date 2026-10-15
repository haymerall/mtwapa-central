import { useNavigate } from "react-router-dom";
import { useList } from "@/lib/useList";
import { PageHeader, Card, Badge, StatCard, LoadingState } from "@/components/admin/ui-bits";
import { Users, ArrowRight, Layers, UserCheck, Star } from "lucide-react";

export default function Ministries() {
  const { data, loading } = useList("Ministry");
  const navigate = useNavigate();

  if (loading) return <LoadingState />;

  const totalMembers = data.reduce((s, m) => s + (m.members_count || 0), 0);
  const categories = new Set(data.map((m) => m.category).filter(Boolean)).size;
  const featured = data.filter((m) => m.featured).length;

  return (
    <div>
      <PageHeader title="Ministries" subtitle={`${data.length} ministries · shared platform, specialized workspaces`} icon={Users} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={Layers} label="Total Ministries" value={data.length} tone="primary" />
        <StatCard icon={UserCheck} label="Enrolled Members" value={totalMembers} tone="green" />
        <StatCard icon={Users} label="Categories" value={categories} tone="blue" />
        <StatCard icon={Star} label="Featured" value={featured} tone="accent" />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((m) => (
          <Card key={m.id} className="p-5 hover:shadow-sm hover:border-primary/30 transition-all cursor-pointer">
            <button onClick={() => navigate(`/admin/ministries/${m.id}`)} className="w-full text-left">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: (m.color || "#2f6b54") + "18" }}>
                  <Users className="w-6 h-6" style={{ color: m.color || "#2f6b54" }} />
                </div>
                <div className="flex items-center gap-1.5">
                  {m.featured && <Badge variant="accent">Featured</Badge>}
                  <Badge variant="muted">{m.category}</Badge>
                </div>
              </div>
              <h3 className="font-heading font-semibold text-foreground">{m.name}</h3>
              <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed line-clamp-2">{m.description}</p>
              <div className="mt-4 pt-4 border-t border-border flex items-center justify-between text-xs">
                <div className="text-muted-foreground">
                  <div className="font-medium text-foreground">{m.leader}</div>
                  <div>{m.members_count} members · {m.meeting_day}</div>
                </div>
                <span className="text-primary font-medium flex items-center gap-1">Open <ArrowRight className="w-3.5 h-3.5" /></span>
              </div>
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
}