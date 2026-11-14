import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Calendar, Plus } from 'lucide-react';

export default function EventsAdmin() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans">
      <header className="bg-[#071322] border-b border-slate-800 text-white p-6 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-[#1e293b] p-2 rounded-xl border border-white/10">
              <Building2 className="text-amber-500" size={22} />
            </div>
            <div>
              <h1 className="font-bold text-base text-white">Event Scheduling Admin</h1>
              <p className="text-[10px] text-slate-400 uppercase font-semibold">Mtwapa Central SDA</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <Link to="/admin/treasury" className="text-slate-300 hover:text-white">Treasury</Link>
            <Link to="/admin/members" className="text-slate-300 hover:text-white">Members</Link>
            <Link to="/admin/communication" className="text-slate-300 hover:text-white">Broadcast</Link>
            <Link to="/admin/audit" className="text-slate-300 hover:text-white">Audit Log</Link>
            <Link to="/admin/settings" className="text-slate-300 hover:text-white">Settings</Link>
            <Link to="/" className="bg-white/10 px-3 py-1.5 rounded-lg text-white hover:bg-white/20 transition">Exit</Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">Schedule</span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-1">Manage Church Events</h2>
          </div>
          <button className="bg-[#071322] hover:bg-[#002B49] text-white text-sm font-bold px-5 py-3 rounded-xl shadow flex items-center gap-2">
            <Plus size={16} /> Create New Event
          </button>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 space-y-4">
          <h3 className="text-xl font-bold text-slate-900">Upcoming Services & Programs</h3>
          <p className="text-slate-600 text-sm">Schedule Sabbath School lessons, AY programs, and special evangelistic campaigns.</p>
        </div>
      </main>
    </div>
  );
}
