import { useState } from "react";
import { Menu, Bell, Search, ChevronDown } from "lucide-react";
import { ROLE_LABELS } from "@/lib/roles";

export default function Topbar({ session, onMenu }) {
  const role = session?.role;
  const label = ROLE_LABELS[role] || "User";
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 bg-background/85 backdrop-blur border-b border-border">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <button className="md:hidden p-2 -ml-2" onClick={onMenu}><Menu className="w-5 h-5" /></button>
          <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
            <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium text-xs">{label}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg bg-muted text-sm text-muted-foreground w-64">
            <Search className="w-4 h-4" />
            <input placeholder="Search..." className="bg-transparent outline-none flex-1 placeholder:text-muted-foreground" />
          </div>
          <button className="relative p-2 rounded-lg hover:bg-muted">
            <Bell className="w-5 h-5 text-muted-foreground" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-accent" />
          </button>
          <div className="relative">
            <button onClick={() => setOpen(!open)} className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-muted">
              <div className="w-8 h-8 rounded-full bg-primary/10 text-primary font-heading font-bold text-sm flex items-center justify-center">
                {session?.name?.split(" ").map((p) => p[0]).join("").slice(0, 2) || "?"}
              </div>
              <ChevronDown className="w-4 h-4 text-muted-foreground hidden sm:block" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}