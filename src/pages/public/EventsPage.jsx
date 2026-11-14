import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2, ArrowLeft, Calendar, MapPin, Clock, Filter, CheckCircle2 } from 'lucide-react';

export default function EventsPage() {
  const [filter, setFilter] = useState('all');
  const [registered, setRegistered] = useState(null);

  const events = [
    { 
      id: 1,
      title: "Sabbath School Bible Study", 
      date: "Every Saturday", 
      time: "9:00 AM - 10:45 AM", 
      location: "Main Sanctuary & Classrooms", 
      tag: "Sabbath", 
      color: "bg-blue-600",
      desc: "Interactive quarterly lesson study in age-specific groups from Cradle Roll to Adult classes."
    },
    { 
      id: 2,
      title: "Divine Worship Service", 
      date: "Every Saturday", 
      time: "11:00 AM - 12:30 PM", 
      location: "Main Sanctuary", 
      tag: "Worship", 
      color: "bg-amber-500",
      desc: "Lifting our voices in sacred praise, scripture reading, and hearing the preached word of God."
    },
    { 
      id: 3,
      title: "Adventist Youth (AY) Fellowship", 
      date: "Every Saturday", 
      time: "2:00 PM - 5:00 PM", 
      location: "Youth Hall", 
      tag: "Youth", 
      color: "bg-emerald-600",
      desc: "Youth empowerment, Pathfinder honors, choir items, and vibrant spiritual discussions."
    },
    { 
      id: 4,
      title: "Midweek Prayer & Testimony", 
      date: "Every Wednesday", 
      time: "6:00 PM - 7:30 PM", 
      location: "Prayer Room / Zoom", 
      tag: "Prayer", 
      color: "bg-purple-600",
      desc: "Midweek spiritual refreshment through earnest prayer, hymns, and sharing testimonies of God's grace."
    },
    { 
      id: 5,
      title: "Sabbath Sunset Vespers", 
      date: "Every Friday", 
      time: "6:30 PM - 7:30 PM", 
      location: "Main Sanctuary", 
      tag: "Fellowship", 
      color: "bg-indigo-600",
      desc: "Welcoming the holy Sabbath hours in song, prayer, and devotional reflection."
    },
    { 
      id: 6,
      title: "Coast Field AY Camporee & Leadership Retreat", 
      date: "December 12 - 15, 2026", 
      time: "All Day", 
      location: "Mtwapa Coastal Campsite", 
      tag: "Special", 
      color: "bg-rose-600",
      desc: "Annual regional youth gathering featuring drill marching, leadership training, and campfire worship."
    }
  ];

  const filteredEvents = filter === 'all' 
    ? events 
    : events.filter(e => e.tag.toLowerCase() === filter.toLowerCase());

  const handleRegister = (title) => {
    setRegistered(title);
    setTimeout(() => setRegistered(null), 5000);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans selection:bg-amber-500 selection:text-slate-950">
      
      {/* Header Navigation */}
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

      {/* Hero Banner */}
      <section className="bg-[#071322] text-white py-16 px-6 border-b border-slate-800">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest bg-amber-400/10 px-3.5 py-1 rounded-full border border-amber-400/20">
            Church Schedule
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Calendar & Upcoming Services</h2>
          <p className="text-slate-300 text-lg leading-relaxed">
            Join us for weekly worship services, prayer meetings, and special fellowship gatherings throughout the month.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12 space-y-8">
        
        {registered && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-2xl text-sm flex items-center gap-3 shadow-sm">
            <CheckCircle2 size={20} className="text-emerald-600 shrink-0" />
            <p className="font-medium">You have successfully registered / RSVP'd for <span className="font-bold">{registered}</span>!</p>
          </div>
        )}

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-2 pb-4 border-b border-slate-200">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2 flex items-center gap-1.5">
            <Filter size={14} /> Filter:
          </span>
          {['all', 'sabbath', 'worship', 'youth', 'prayer', 'special'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition ${
                filter === cat 
                  ? 'bg-[#071322] text-white shadow-sm' 
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((ev) => (
            <div key={ev.id} className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden flex flex-col justify-between hover:shadow-md transition">
              <div>
                <div className={`h-2.5 ${ev.color} w-full`}></div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
                      <Calendar size={14} className="text-amber-600" /> {ev.date}
                    </span>
                    <span className="text-[10px] font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-full uppercase tracking-wider">
                      {ev.tag}
                    </span>
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900">{ev.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{ev.desc}</p>
                  <p className="text-xs font-semibold text-slate-500 flex items-center gap-1.5 pt-2">
                    <Clock size={14} className="text-slate-400" /> {ev.time}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-slate-100 mt-4 pt-4 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5 truncate max-w-[160px]">
                  <MapPin size={14} className="text-slate-400 shrink-0" /> {ev.location}
                </span>
                <button 
                  onClick={() => handleRegister(ev.title)}
                  className="bg-[#071322] hover:bg-[#002B49] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition shadow"
                >
                  RSVP / Attend
                </button>
              </div>
            </div>
          ))}
        </div>

      </main>

      {/* Footer */}
      <footer className="bg-[#071322] text-slate-300 py-12 border-t border-slate-800 text-center text-sm mt-20">
        <p>&copy; {new Date().getFullYear()} Mtwapa Central Seventh-day Adventist Church. All rights reserved.</p>
      </footer>

    </div>
  );
}
