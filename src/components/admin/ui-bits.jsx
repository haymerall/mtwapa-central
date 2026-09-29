import { cn } from "@/lib/utils";

export function PageHeader({ title, subtitle, actions, icon: Icon }) {
  return (
    <div className="flex items-start justify-between gap-4 flex-wrap mb-6">
      <div className="flex items-start gap-3">
        {Icon && (
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <Icon className="w-5 h-5 text-primary" />
          </div>
        )}
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">{title}</h1>
          {subtitle && <p className="text-sm text-muted-foreground mt-0.5">{subtitle}</p>}
        </div>
      </div>
      {actions && <div className="flex items-center gap-2 flex-wrap">{actions}</div>}
    </div>
  );
}

export function StatCard({ icon: Icon, label, value, hint, tone = "primary" }) {
  const tones = {
    primary: "bg-primary/10 text-primary",
    accent: "bg-accent/15 text-accent",
    blue: "bg-blue-50 text-blue-600",
    rose: "bg-rose-50 text-rose-600",
    green: "bg-emerald-50 text-emerald-600",
  };
  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <div className="flex items-center justify-between">
        <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", tones[tone])}>
          {Icon && <Icon className="w-5 h-5" />}
        </div>
      </div>
      <div className="mt-4 font-heading text-2xl font-bold text-foreground">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
      {hint && <div className="text-xs text-muted-foreground/80 mt-1">{hint}</div>}
    </div>
  );
}

export function Badge({ children, variant = "default", className }) {
  const variants = {
    default: "bg-secondary text-secondary-foreground",
    primary: "bg-primary/10 text-primary",
    accent: "bg-accent/15 text-accent",
    success: "bg-emerald-50 text-emerald-700",
    warning: "bg-amber-50 text-amber-700",
    danger: "bg-rose-50 text-rose-700",
    muted: "bg-muted text-muted-foreground",
  };
  return <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium", variants[variant], className)}>{children}</span>;
}

export function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      {Icon && <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4"><Icon className="w-6 h-6 text-muted-foreground" /></div>}
      <h3 className="font-heading font-semibold text-foreground">{title}</h3>
      {description && <p className="text-sm text-muted-foreground mt-1 max-w-sm">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export function LoadingState({ label = "Loading..." }) {
  return (
    <div className="flex items-center justify-center py-16">
      <div className="w-7 h-7 border-2 border-muted border-t-primary rounded-full animate-spin" />
      <span className="ml-3 text-sm text-muted-foreground">{label}</span>
    </div>
  );
}

export function Card({ children, className }) {
  return <div className={cn("bg-card border border-border rounded-xl", className)}>{children}</div>;
}