import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { 
  Building2, BookOpen, Users, Shield, Heart, Smile, 
  Music, Activity, Coins, Home as HomeIcon, Radio, 
  Calendar, CheckCircle2, FileText, ArrowLeft, Plus, Download 
} from 'lucide-react';

const DEPARTMENTS = {
  "sabbath-school": {
    name: "Sabbath School",
    icon: BookOpen,
    leader: "Sabbath School Superintendent",
    color: "bg-blue-600",
    badge: "bg-blue-50 text-blue-700 border-blue-200",
    stats: [
      { label: "Active Class Units", val: "12 Classes" },
      { label: "Quarterly Study Guides", val: "140 Issued" },
      { label: "Weekly Attendance", val: "88%" }
    ],
    items: [
      { title: "Adult Quarterly Lesson Review", date: "Sabbath 9:00 AM", status: "Active" },
      { title: "Branch Sabbath School Outreach", date: "Sabbath 3:30 PM", status: "Scheduled" }
    ]
  },
  "adventist-youth": {
    name: "Adventist Youth (AY)",
    icon: Users,
    leader: "AY Leader & Youth Council",
    color: "bg-emerald-600",
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
    stats: [
      { label: "Registered Youth", val: "45 Members" },
      { label: "Pathfinder Honors", val: "18 Enrolled" },
      { label: "Upcoming Camps", val: "1 Scheduled" }
    ],
    items: [
      { title: "Youth Choir & Drama Rehearsal", date: "Saturday 2:00 PM", status: "Active" },
      { title: "Coast Field AY Camporee Prep", date: "Nov 28, 2026", status: "Planning" }
    ]
  },
  "amo": {
    name: "Adventist Men's Organization (AMO)",
    icon: Shield,
    leader: "AMO Leader",
    color: "bg-slate-700",
    badge: "bg-slate-100 text-slate-800 border-slate-300",
    stats: [
      { label: "Active Men", val: "32 Members" },
      { label: "Sanctuary Maintenance", val: "Completed" },
      { label: "Mentorship Groups", val: "4 Active" }
    ],
    items: [
      { title: "Monthly Men's Breakfast & Prayer", date: "1st Sunday 8:00 AM", status: "Active" },
      { title: "Church Perimeter Wall Repair Project", date: "Nov 22, 2026", status: "Ongoing" }
    ]
  },
  "womens-ministries": {
    name: "Women's Ministries",
    icon: Heart,
    leader: "Women's Ministries Leader",
    color: "bg-rose-600",
    badge: "bg-rose-50 text-rose-700 border-rose-200",
    stats: [
      { label: "Registered Women", val: "54 Members" },
      { label: "Prayer Circles", val: "6 Groups" },
      { label: "Welfare Funds", val: "KSh 42,000" }
    ],
    items: [
      { title: "Dorcas Welfare Community Visitation", date: "Wednesday 2:00 PM", status: "Active" },
      { title: "Annual Coast Women's Retreat", date: "Dec 5, 2026", status: "Registration Open" }
    ]
  },
  "childrens-ministry": {
    name: "Children's Ministry",
    icon: Smile,
    leader: "Children's Coordinator",
    color: "bg-amber-500",
    badge: "bg-amber-50 text-amber-700 border-amber-200",
    stats: [
      { label: "Enrolled Children", val: "42 Kids" },
      { label: "Teachers & Caregivers", val: "8 Staff" },
      { label: "VBS Programs", val: "2 Annual" }
    ],
    items: [
      { title: "Cradle Roll & Primary Lesson", date: "Sabbath 9:30 AM", status: "Active" },
      { title: "Vacation Bible School (VBS) Prep", date: "Dec 14, 2026", status: "Planning" }
    ]
  },
  "music-choir": {
    name: "Music & Sacred Choirs",
    icon: Music,
    leader: "Music Director",
    color: "bg-purple-600",
    badge: "bg-purple-50 text-purple-700 border-purple-200",
    stats: [
      { label: "Active Vocalists", val: "28 Singers" },
      { label: "Choir Ensembles", val: "3 Groups" },
      { label: "Audio Tracks", val: "12 Recorded" }
    ],
    items: [
      { title: "Sanctuary Choir Friday Practice", date: "Friday 5:00 PM", status: "Active" },
      { title: "Sabbath Divine Service Music Order", date: "Sabbath 11:00 AM", status: "Ready" }
    ]
  },
  "health-ministries": {
    name: "Health Ministries",
    icon: Activity,
    leader: "Health Secretary",
    color: "bg-teal-600",
    badge: "bg-teal-50 text-teal-700 border-teal-200",
    stats: [
      { label: "Expos Conducted", val: "4 Expos" },
      { label: "Community Screenings", val: "230 People" },
      { label: "Health Seminars", val: "Monthly" }
    ],
    items: [
      { title: "NEWSTART Lifestyle Seminar", date: "Sabbath 4:00 PM", status: "Scheduled" },
      { title: "Mtwapa Community Free Medical Camp", date: "Dec 12, 2026", status: "Planning" }
    ]
  },
  "stewardship": {
    name: "Stewardship & Development",
    icon: Coins,
    leader: "Stewardship Director",
    color: "bg-amber-700",
    badge: "bg-amber-100 text-amber-900 border-amber-300",
    stats: [
      { label: "Tithe Commitment", val: "92% Members" },
      { label: "Building Fund Drive", val: "KSh 450,000" },
      { label: "Stewardship Workshops", val: "Quarterly" }
    ],
    items: [
      { title: "Faithful Stewardship Sabbath", date: "3rd Sabbath of Month", status: "Active" },
      { title: "Sanctuary Construction Progress Audit", date: "Nov 30, 2026", status: "Ongoing" }
    ]
  },
  "personal-ministries": {
    name: "Personal Ministries & Welfare",
    icon: HomeIcon,
    leader: "Personal Ministries Leader",
    color: "bg-indigo-600",
    badge: "bg-indigo-50 text-indigo-700 border-indigo-200",
    stats: [
      { label: "Bible Interest Contacts", val: "38 People" },
      { label: "Active Lay Evangelists", val: "14 Members" },
      { label: "Baptismal Candidates", val: "9 Candidates" }
    ],
    items: [
      { title: "Community Door-to-Door Outreach", date: "Sunday 9:00 AM", status: "Active" },
      { title: "Mtwapa Town Evangelistic Effort", date: "Jan 10, 2027", status: "Planning" }
    ]
  },
  "communication": {
    name: "Communication & Media",
    icon: Radio,
    leader: "Communication Director",
    color: "bg-cyan-600",
    badge: "bg-cyan-50 text-cyan-700 border-cyan-200",
    stats: [
      { label: "Live Stream Views", val: "1.2k Weekly" },
      { label: "SMS Broadcasts", val: "180 Delivered" },
      { label: "AV Crew Members", val: "6 Techs" }
    ],
    items: [
      { title: "Sabbath Worship Live Stream Setup", date: "Sabbath 8:30 AM", status: "Active" },
      { title: "Monthly Church Newsletter Broadcast", date: "End of Month", status: "Drafting" }
    ]
  }
};

export default function DepartmentDashboard() {
  const { deptId } = useParams();
  const [selectedDept, setSelectedDept] = useState(deptId || 'sabbath-school');

  const current = DEPARTMENTS[selectedDept] || DEPARTMENTS['sabbath-school'];
  const IconComponent = current.icon;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans">
      
      {/* Header */}
      <header className="bg-[#071322] border-b border-slate-800 text-white p-6 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-[#1e293b] p-2 rounded-xl border border-white/10">
              <Building2 className="text-amber-500" size={22} />
            </div>
            <div>
              <h1 className="font-bold text-base text-white">Ministry Dashboards</h1>
              <p className="text-[10px] text-slate-400 uppercase font-semibold">Mtwapa Central SDA</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <Link to="/admin/treasury" className="text-slate-300 hover:text-white">Treasury</Link>
            <Link to="/admin/members" className="text-slate-300 hover:text-white">Members</Link>
            <Link to="/admin/communication" className="text-slate-300 hover:text-white">Broadcast</Link>
            <Link to="/" className="bg-white/10 px-3 py-1.5 rounded-lg text-white hover:bg-white/20 transition">Exit</Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10 grid lg:grid-cols-12 gap-8">
        
        {/* Department Selector Sidebar */}
        <aside className="lg:col-span-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
          <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">Select Ministry</h3>
          <div className="space-y-1">
            {Object.entries(DEPARTMENTS).map(([key, dept]) => {
              const ItemIcon = dept.icon;
              const isActive = selectedDept === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedDept(key)}
                  className={`w-full text-left p-3 rounded-xl font-medium text-sm flex items-center justify-between transition ${
                    isActive 
                      ? 'bg-[#071322] text-white font-bold shadow-sm' 
                      : 'hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <ItemIcon size={18} className={isActive ? 'text-amber-400' : 'text-slate-400'} />
                    <span>{dept.name}</span>
                  </div>
                  {isActive && <span className="w-2 h-2 rounded-full bg-amber-400"></span>}
                </button>
              );
            })}
          </div>
        </aside>

        {/* Ministry Specific Dashboard Content */}
        <section className="lg:col-span-8 space-y-6">
          
          {/* Header Card */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className={`p-3.5 rounded-2xl text-white ${current.color} shadow-md`}>
                  <IconComponent size={28} />
                </div>
                <div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${current.badge}`}>
                    Department Dashboard
                  </span>
                  <h2 className="text-3xl font-extrabold text-slate-900 mt-0.5">{current.name}</h2>
                  <p className="text-xs font-semibold text-slate-500">Led by {current.leader}</p>
                </div>
              </div>
              <button className="bg-[#071322] hover:bg-[#002B49] text-white text-xs font-bold px-4 py-3 rounded-xl transition shadow flex items-center gap-2 shrink-0">
                <Plus size={16} /> Add Department Record
              </button>
            </div>
          </div>

          {/* Metric Cards */}
          <div className="grid sm:grid-cols-3 gap-6">
            {current.stats.map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-1">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
                <div className="text-2xl font-extrabold text-slate-900">{stat.val}</div>
              </div>
            ))}
          </div>

          {/* Department Activities & Rosters */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 space-y-6">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <h3 className="text-xl font-bold text-slate-900">Active Rosters & Scheduled Events</h3>
              <button className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1">
                <Download size={14} /> Export Roster PDF
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {current.items.map((item, idx) => (
                <div key={idx} className="py-4 flex items-center justify-between">
                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-900 text-base">{item.title}</h4>
                    <p className="text-xs text-slate-400 flex items-center gap-1">
                      <Calendar size={14} /> {item.date}
                    </p>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </section>

      </main>
    </div>
  );
}
