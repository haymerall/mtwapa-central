import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, Loader2, Church as ChurchIcon, LogIn, ArrowRight, ShieldCheck } from "lucide-react";
import { useDemoSession } from "@/lib/useDemoSession";
import { homeForRole, ROLE_LABELS } from "@/lib/roles";
import { safeReturnTo } from "@/lib/authReturnTo";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, accounts } = useDemoSession();
  const navigate = useNavigate();
  const returnTo = safeReturnTo();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await base44.auth.loginViaEmailPassword(email, password);
      window.location.href = returnTo;
    } catch (err) {
      setError(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const handleDemo = (account) => {
    const sess = login(account);
    navigate(homeForRole(sess.role));
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      {/* Left brand panel */}
      <div className="hidden lg:flex flex-col justify-between bg-primary text-primary-foreground p-12 relative overflow-hidden">
        <div className="absolute -right-24 -bottom-24 w-96 h-96 rounded-full bg-accent/15 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "radial-gradient(circle at 30% 20%, white 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="relative">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-lg bg-primary-foreground/15 flex items-center justify-center">
              <ChurchIcon className="w-5 h-5" />
            </div>
            <span className="font-heading font-bold text-lg">Grace SDA</span>
          </div>
        </div>
        <div className="relative">
          <h1 className="font-heading text-4xl font-bold leading-tight text-balance">Church Management Platform</h1>
          <p className="mt-4 text-primary-foreground/75 leading-relaxed max-w-md">One unified system for members, ministries, events, finance, and communication — built for how an Adventist church actually runs.</p>
          <div className="mt-8 flex items-center gap-2 text-sm text-primary-foreground/60">
            <ShieldCheck className="w-4 h-4" /> Role-based access · Demo prototype
          </div>
        </div>
        <div className="relative text-xs text-primary-foreground/40">Grace Seventh-day Adventist Church · Demonstration build</div>
      </div>

      {/* Right login panel */}
      <div className="flex items-center justify-center p-6 sm:p-10 overflow-y-auto">
        <div className="w-full max-w-md py-8">
          <div className="lg:hidden flex items-center gap-2.5 mb-8">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <ChurchIcon className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-heading font-bold text-lg text-foreground">Grace SDA</span>
          </div>

          <h2 className="font-heading text-2xl font-bold">Welcome back</h2>
          <p className="text-muted-foreground text-sm mt-1">Sign in to your account</p>

          {error && <div className="mt-4 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">{error}</div>}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10 h-11" required />
              </div>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link to="/forgot-password" className="text-xs text-primary hover:underline">Forgot password?</Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10 h-11" required />
              </div>
            </div>
            <label className="flex items-center gap-2 text-sm text-muted-foreground">
              <input type="checkbox" className="rounded border-border" /> Remember me
            </label>
            <Button type="submit" className="w-full h-11" disabled={loading}>
              {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Logging in...</> : <><LogIn className="w-4 h-4 mr-2" /> Log in</>}
            </Button>
          </form>

          <div className="mt-3 text-center">
            <Link to="/register" className="text-xs text-muted-foreground hover:text-primary">Don't have an account? Create one</Link>
          </div>

          {/* Demo accounts */}
          <div className="mt-8">
            <div className="relative flex items-center gap-3 text-xs text-muted-foreground">
              <div className="flex-1 h-px bg-border" /> Demo accounts (one click) <div className="flex-1 h-px bg-border" />
            </div>
            <div className="mt-4 space-y-2">
              {accounts.map((a) => (
                <button
                  key={a.email}
                  onClick={() => handleDemo(a)}
                  className="w-full flex items-center justify-between p-3 rounded-lg border border-border bg-card hover:border-primary/40 hover:bg-muted transition-colors text-left group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary/10 text-primary font-heading font-bold text-sm flex items-center justify-center">
                      {a.name.split(" ").map((p) => p[0]).join("").slice(0, 2)}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground">{ROLE_LABELS[a.role]}</div>
                      <div className="text-xs text-muted-foreground">{a.email}</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                </button>
              ))}
            </div>
            <p className="mt-3 text-[11px] text-muted-foreground/80 text-center">Demo roles are simulated — the platform's real auth provisions one builder account. Pick any role to explore.</p>
          </div>

          <div className="mt-6 text-center">
            <Link to="/" className="text-xs text-muted-foreground hover:text-primary">← Back to website</Link>
          </div>
        </div>
      </div>
    </div>
  );
}