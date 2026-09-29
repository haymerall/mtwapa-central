// Central role & permission model for the Church Management Platform.
// This drives sidebar visibility, route guarding, and feature access.
// In production these permissions would also be enforced by RLS on each entity.

export const ROLES = {
  SUPER_ADMIN: "super_admin",
  CHURCH_ADMIN: "church_admin",
  PASTOR: "pastor",
  TREASURER: "treasurer",
  CLERK: "clerk",
  MINISTRY_LEADER: "ministry_leader",
  MEMBER: "member",
};

export const ROLE_LABELS = {
  super_admin: "Super Admin",
  church_admin: "Church Admin",
  pastor: "Pastor",
  treasurer: "Treasurer",
  clerk: "Church Clerk",
  ministry_leader: "Ministry Leader",
  member: "Member",
};

// Demo accounts shown on the login screen. These are simulated roles —
// the platform's real auth provisions one builder account, so the MVP
// uses a role switcher to let you experience each persona.
export const DEMO_ACCOUNTS = [
  { email: "admin@example.com", role: "super_admin", name: "System Administrator" },
  { email: "churchadmin@example.com", role: "church_admin", name: "Daniel Otieno" },
  { email: "pastor@example.com", role: "pastor", name: "Pr. Samuel Mwangi" },
  { email: "treasurer@example.com", role: "treasurer", name: "Grace Wanjiru" },
  { email: "clerk@example.com", role: "clerk", name: "Mercy Achieng" },
  { email: "children@example.com", role: "ministry_leader", name: "Esther Nyambura" },
  { email: "member@example.com", role: "member", name: "John Kamau" },
];

// Sidebar modules and which roles may access each.
export const MODULES = [
  { key: "dashboard", label: "Dashboard", icon: "LayoutDashboard", path: "/admin", roles: ["super_admin", "church_admin", "pastor", "treasurer", "clerk", "ministry_leader"] },
  { key: "members", label: "Members", icon: "Users", path: "/admin/members", roles: ["super_admin", "church_admin", "pastor", "clerk", "ministry_leader"] },
  { key: "ministries", label: "Ministries", icon: "Church", path: "/admin/ministries", roles: ["super_admin", "church_admin", "pastor", "ministry_leader"] },
  { key: "attendance", label: "Attendance", icon: "ClipboardCheck", path: "/admin/attendance", roles: ["super_admin", "church_admin", "pastor", "clerk", "ministry_leader"] },
  { key: "events", label: "Events", icon: "CalendarDays", path: "/admin/events", roles: ["super_admin", "church_admin", "pastor", "clerk", "ministry_leader"] },
  { key: "communication", label: "Communication", icon: "Megaphone", path: "/admin/communication", roles: ["super_admin", "church_admin", "pastor", "ministry_leader"] },
  { key: "finance", label: "Finance", icon: "Wallet", path: "/admin/finance", roles: ["super_admin", "treasurer"] },
  { key: "treasury_reports", label: "Treasury Reports", icon: "LineChart", path: "/admin/treasury-reports", roles: ["super_admin", "treasurer"] },
  { key: "facilities", label: "Facilities", icon: "Building2", path: "/admin/facilities", roles: ["super_admin", "church_admin"] },
  { key: "documents", label: "Documents", icon: "FileText", path: "/admin/documents", roles: ["super_admin", "church_admin", "pastor", "clerk", "treasurer"] },
  { key: "reports", label: "Reports", icon: "BarChart3", path: "/admin/reports", roles: ["super_admin", "church_admin", "pastor", "clerk", "treasurer"] },
  { key: "audit", label: "Audit Log", icon: "ShieldCheck", path: "/admin/audit", roles: ["super_admin", "church_admin"] },
  { key: "settings", label: "Settings", icon: "Settings", path: "/admin/settings", roles: ["super_admin", "church_admin"] },
];

export function modulesForRole(role) {
  return MODULES.filter((m) => m.roles.includes(role));
}

export function canAccess(role, moduleKey) {
  const mod = MODULES.find((m) => m.key === moduleKey);
  return mod ? mod.roles.includes(role) : false;
}

// Demo session helpers (localStorage-backed role switcher)
const DEMO_KEY = "cmp_demo_session";

export function getDemoSession() {
  try {
    const raw = localStorage.getItem(DEMO_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setDemoSession(session) {
  localStorage.setItem(DEMO_KEY, JSON.stringify(session));
}

export function clearDemoSession() {
  localStorage.removeItem(DEMO_KEY);
}

// The landing route for a given role after login.
export function homeForRole(role) {
  if (role === "member") return "/portal";
  return "/admin";
}