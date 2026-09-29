import { NavLink, Link } from "react-router-dom";
import { Church as ChurchIcon, LogOut, X, LayoutDashboard, Users, ClipboardCheck, CalendarDays, Megaphone, Wallet, Building2, FileText, BarChart3, ShieldCheck, Settings, Circle } from "lucide-react";
import { modulesForRole, ROLE_LABELS } from "@/lib/roles";

const ICONS = {
  LayoutDashboard, Users, Church: ChurchIcon, ClipboardCheck, CalendarDays, Megaphone, Wallet, Building2, FileText, BarChart3, ShieldCheck, Settings, Circle,
};

export default function Sidebar({ role, session, onLogout, open, onClose }) {
  const modules = modulesForRole(role);
  const label = ROLE_LABELS[role] || "User";

  return (
    <>
      {open && <div className="fixed inset-0 bg-black/40 z-30 md:hidden" onClick={onClose} />}
      <aside className={`fixed md:sticky top-0 z-40 h-screen w-64 shrink-0 bg-sidebar text-sidebar-foreground flex flex-col transition-transform ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
        <div className="flex items-center gap-2.5 px-5 h-16 border-b border-sidebar-border shrink-0">
          <div className="w-9 h-9 rounded-lg bg-sidebar-primary flex items-center justify-center">
            <ChurchIcon className="w-5 h-5 text-sidebar-primary-foreground" />
          </div>
          <div className="leading-tight">
            <div className="font-heading font-bold text-sm text-sidebar-foreground">Grace SDA</div>
            <div className="text-[10px] text-sidebar-foreground/60 uppercase tracking-wide">Management Platform</div>
          </div>
          <button className="ml-auto md:hidden text-sidebar-foreground/70" onClick={onClose}><X className="w-5 h-5" /></button>
        </div>

        <nav className="flex-1 overflow-y-auto no-scrollbar px-3 py-4 space-y-0.5">
          {modules.map((m) => {
            const Icon = ICONS[m.icon] || Circle;
            return (
              <NavLink
                key={m.key}
                to={m.path}
                end={m.key === "dashboard"}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
                  }`
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                {m.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="px-3 py-4 border-t border-sidebar-border">
          <Link to="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-sidebar-accent/50 transition-colors">
            <div className="w-9 h-9 rounded-full bg-sidebar-accent text-sidebar-accent-foreground font-heading font-bold text-sm flex items-center justify-center">
              {session?.name?.split(" ").map((p) => p[0]).join("").slice(0, 2) || "?"}
            </div>
            <div className="leading-tight min-w-0">
              <div className="text-sm font-medium text-sidebar-foreground truncate">{session?.name || "User"}</div>
              <div className="text-[11px] text-sidebar-foreground/60 truncate">{label}</div>
            </div>
          </Link>
          <button onClick={onLogout} className="mt-2 w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors">
            <LogOut className="w-4 h-4" /> Sign out
          </button>
        </div>
      </aside>
    </>
  );
}