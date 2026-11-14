import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, ArrowLeft, Users, Music, Heart, BookOpen, 
  Shield, Smile, Activity, Coins, Radio, Home as HomeIcon 
} from 'lucide-react';

export default function MinistriesPage() {
  const ministries = [
    { 
      name: "Sabbath School", 
      icon: BookOpen, 
      color: "bg-blue-50 text-blue-600 border-blue-200", 
      desc: "Systematic Bible study, mission stories, and interactive quarterly discussion groups for children, youth, and adults.", 
      time: "Sabbath · 9:00 AM",
      leader: "Sabbath School Superintendent"
    },
    { 
      name: "Adventist Youth (AY)", 
      icon: Users, 
      color: "bg-emerald-50 text-emerald-600 border-emerald-200", 
      desc: "Empowering young adults and teens through spiritual growth, Pathfinder/Master Guide honors, leadership, and outdoor camps.", 
      time: "Sabbath · 2:00 PM",
      leader: "AY Leader & Council"
    },
    { 
      name: "Adventist Men's Organization (AMO)", 
      icon: Shield, 
      color: "bg-slate-100 text-slate-800 border-slate-300", 
      desc: "Fostering spiritual leadership among men, family mentorship, community building, and practical church infrastructure support.", 
      time: "1st Sunday of the Month · 8:00 AM",
      leader: "AMO Leader"
    },
    { 
      name: "Women's Ministries", 
      icon: Heart, 
      color: "bg-rose-50 text-rose-600 border-rose-200", 
      desc: "Uplifting, equipping, and nurturing women through prayer circles, health retreats, skills training, and family counseling.", 
      time: "Monthly Gatherings & Prayer Networks",
      leader: "Women's Ministries Leader"
    },
    { 
      name: "Children's Ministry", 
      icon: Smile, 
      color: "bg-amber-50 text-amber-600 border-amber-200", 
      desc: "Nurturing children (ages 3–12) in foundational Bible truths, Sabbath songs, memory verses, and VBS summer activities.", 
      time: "Sabbath · 9:30 AM",
      leader: "Children's Coordinator"
    },
    { 
      name: "Music & Sacred Choirs", 
      icon: Music, 
      color: "bg-purple-50 text-purple-600 border-purple-200", 
      desc: "Leading high-sabbath worship through sanctuary choir hymns, youth praise ensembles, quartets, and instrumental music.", 
      time: "Friday Rehearsals · 5:00 PM",
      leader: "Music Director"
    },
    { 
      name: "Health Ministries", 
      icon: Activity, 
      color: "bg-teal-50 text-teal-600 border-teal-200", 
      desc: "Promoting physical, mental, and spiritual well-being based on NEWSTART principles, hosting community health expos and medical camps.", 
      time: "Quarterly Health Expos",
      leader: "Health Secretary"
    },
    { 
      name: "Stewardship & Development", 
      icon: Coins, 
      color: "bg-amber-100 text-amber-800 border-amber-300", 
      desc: "Educating members on faithful tithing, offerings, financial planning, and driving church sanctuary development initiatives.", 
      time: "Monthly Seminars",
      leader: "Stewardship Director"
    },
    { 
      name: "Personal Ministries & Welfare", 
      icon: HomeIcon, 
      color: "bg-indigo-50 text-indigo-600 border-indigo-200", 
      desc: "Organizing community outreach, food distribution, visiting the sick, Bible studies, and neighborhood evangelistic campaigns.", 
      time: "Weekly Community Outreach",
      leader: "Personal Ministries Leader"
    },
    { 
      name: "Communication & Media", 
      icon: Radio, 
      color: "bg-cyan-50 text-cyan-600 border-cyan-200", 
      desc: "Managing live streaming, sound production, digital announcements, graphic design, and broadcasting church updates.", 
      time: "Active Daily & Service Hours",
      leader: "Communication Director"
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans selection:bg-amber-500 selection:text-slate-950">
      
      {/* Header */}
      <header className="bg-[#071322] border-b border-slate-800 text-white p-6 shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-[#1e293b] p-2 rounded-xl border border-white/10 shadow">
              <Building2 className="text-amber-500" size={22} />
            </div>
            <div>
              <h1 className="font-bold text-base text-white">Mtwapa Central SDA</h1>
              <p className="text-[10px] text-slate-400 uppercase font-semibold">Church Platform</p>
            </div>
          </div>
          <Link to="/" className="text-sm font-semibold text-slate-300 hover:text-white flex items-center gap-1.5 transition">
            <ArrowLeft size={16} /> Back to Home
          </Link>
        </div>
      </header>

      {/* Banner */}
      <section className="bg-[#071322] text-white py-16 px-6 border-b border-slate-800">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="text-xs font-bold text-amber-500 uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            Get Involved
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Ministries & Departments</h2>
          <p className="text-slate-300 text-lg leading-relaxed">
            Discover a place to serve, grow, and build meaningful spiritual connections across our 10 active church departments.
          </p>
        </div>
      </section>

      {/* Ministry Cards Grid */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ministries.map((m, idx) => {
            const IconComponent = m.icon;
            return (
              <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-between space-y-4 hover:shadow-md transition">
                <div className="space-y-4">
                  <div className={`w-12 h-12 rounded-xl border ${m.color} flex items-center justify-center font-bold`}>
                    <IconComponent size={22} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{m.name}</h3>
                    <p className="text-xs font-semibold text-amber-600 mt-0.5">{m.leader}</p>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed">{m.desc}</p>
                </div>
                <p className="text-xs font-semibold text-slate-400 pt-4 border-t border-slate-100">{m.time}</p>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
