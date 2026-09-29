import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useList } from "@/lib/useList";
import { PageHeader, Card, Badge, LoadingState, EmptyState } from "@/components/admin/ui-bits";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Users, ChevronLeft, ChevronRight, Eye, UserPlus } from "lucide-react";
import { formatDate, initials } from "@/lib/format";

const STATUS_VARIANT = {
  active: "success",
  inactive: "muted",
  transferred: "warning",
  baptism_candidate: "accent",
};

export default function Members() {
  const { data, loading } = useList("Member");
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [sort, setSort] = useState("name");
  const [page, setPage] = useState(1);
  const perPage = 8;

  const filtered = useMemo(() => {
    let list = [...data];
    if (query) {
      const q = query.toLowerCase();
      list = list.filter((m) => (m.full_name || "").toLowerCase().includes(q) || (m.email || "").toLowerCase().includes(q));
    }
    if (status !== "all") list = list.filter((m) => m.membership_status === status);
    list.sort((a, b) => {
      if (sort === "name") return (a.full_name || "").localeCompare(b.full_name || "");
      if (sort === "joined") return new Date(b.date_joined || 0) - new Date(a.date_joined || 0);
      return 0;
    });
    return list;
  }, [data, query, status, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const pageItems = filtered.slice((page - 1) * perPage, page * perPage);

  if (loading) return <LoadingState />;

  return (
    <div>
      <PageHeader
        title="Members"
        subtitle={`${data.length} members in the church directory`}
        icon={Users}
        actions={<Button size="sm"><UserPlus className="w-4 h-4 mr-1.5" /> Add member</Button>}
      />

      <Card className="p-4 mb-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input value={query} onChange={(e) => { setQuery(e.target.value); setPage(1); }} placeholder="Search by name or email..." className="pl-10" />
          </div>
          <select value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }} className="h-10 rounded-md border border-input bg-card px-3 text-sm">
            <option value="all">All statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="baptism_candidate">Baptism candidate</option>
            <option value="transferred">Transferred</option>
          </select>
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="h-10 rounded-md border border-input bg-card px-3 text-sm">
            <option value="name">Sort: Name</option>
            <option value="joined">Sort: Joined</option>
          </select>
        </div>
      </Card>

      {filtered.length === 0 ? (
        <EmptyState icon={Users} title="No members found" description="Try adjusting your search or filters." />
      ) : (
        <>
          {/* Desktop table */}
          <Card className="hidden md:block overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-muted-foreground">
                <tr>
                  <th className="text-left font-medium px-5 py-3">Member</th>
                  <th className="text-left font-medium px-5 py-3">Status</th>
                  <th className="text-left font-medium px-5 py-3">Ministries</th>
                  <th className="text-left font-medium px-5 py-3">Phone</th>
                  <th className="text-left font-medium px-5 py-3">Joined</th>
                  <th className="px-5 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {pageItems.map((m) => (
                  <tr key={m.id} className="border-t border-border hover:bg-muted/30 transition-colors">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-primary/10 text-primary font-heading font-bold text-xs flex items-center justify-center">{initials(m.full_name)}</div>
                        <div>
                          <div className="font-medium text-foreground">{m.full_name}</div>
                          <div className="text-xs text-muted-foreground">{m.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3"><Badge variant={STATUS_VARIANT[m.membership_status]}>{(m.membership_status || "").replace("_", " ")}</Badge></td>
                    <td className="px-5 py-3 text-muted-foreground">{(m.ministries || []).join(", ")}</td>
                    <td className="px-5 py-3 text-muted-foreground">{m.phone}</td>
                    <td className="px-5 py-3 text-muted-foreground">{formatDate(m.date_joined)}</td>
                    <td className="px-5 py-3 text-right">
                      <Button variant="ghost" size="sm" onClick={() => navigate(`/admin/members/${m.id}`)}><Eye className="w-4 h-4" /></Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>

          {/* Mobile cards */}
          <div className="md:hidden space-y-3">
            {pageItems.map((m) => (
              <Card key={m.id} className="p-4" >
                <button onClick={() => navigate(`/admin/members/${m.id}`)} className="flex items-center gap-3 w-full text-left">
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary font-heading font-bold text-sm flex items-center justify-center">{initials(m.full_name)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-foreground">{m.full_name}</div>
                    <div className="text-xs text-muted-foreground truncate">{m.email}</div>
                  </div>
                  <Badge variant={STATUS_VARIANT[m.membership_status]}>{(m.membership_status || "").replace("_", " ")}</Badge>
                </button>
                <div className="mt-3 pt-3 border-t border-border text-xs text-muted-foreground space-y-1">
                  <div>{(m.ministries || []).join(", ")}</div>
                  <div>{m.phone} · Joined {formatDate(m.date_joined)}</div>
                </div>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4">
            <span className="text-sm text-muted-foreground">Showing {(page - 1) * perPage + 1}–{Math.min(page * perPage, filtered.length)} of {filtered.length}</span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage(page - 1)}><ChevronLeft className="w-4 h-4" /></Button>
              <Button variant="outline" size="sm" disabled={page === totalPages} onClick={() => setPage(page + 1)}><ChevronRight className="w-4 h-4" /></Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}