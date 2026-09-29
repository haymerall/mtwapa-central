import { Link, NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X, Church as ChurchIcon } from "lucide-react";
import { CHURCH } from "@/lib/seedData";
import { Button } from "@/components/ui/button";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/ministries", label: "Ministries" },
  { to: "/events", label: "Events" },
  { to: "/sermons", label: "Sermons" },
  { to: "/contact", label: "Contact" },
];

export default function PublicNav() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-40 bg-background/85 backdrop-blur border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
              <ChurchIcon className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="leading-tight">
              <div className="font-heading font-bold text-foreground text-[15px]">Grace SDA</div>
              <div className="text-[10px] text-muted-foreground -mt-0.5 tracking-wide uppercase">Church Platform</div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `px-3.5 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive ? "text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <Button asChild variant="ghost" size="sm">
              <Link to="/login">Sign in</Link>
            </Button>
            <Button asChild size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link to="/portal">Member Portal</Link>
            </Button>
          </div>

          <button className="md:hidden p-2 -mr-2" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="px-4 py-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={`block px-3 py-2.5 rounded-md text-sm font-medium ${
                  location.pathname === item.to ? "text-primary bg-muted" : "text-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-2 flex gap-2">
              <Button asChild variant="outline" size="sm" className="flex-1" onClick={() => setOpen(false)}>
                <Link to="/login">Sign in</Link>
              </Button>
              <Button asChild size="sm" className="flex-1 bg-accent text-accent-foreground" onClick={() => setOpen(false)}>
                <Link to="/portal">Member Portal</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}