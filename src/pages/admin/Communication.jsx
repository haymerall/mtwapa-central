import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2, Send, CheckCircle2 } from 'lucide-react';

export default function Communication() {
  const [sent, setSent] = useState(false);

  const handleBroadcast = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans">
      <header className="bg-[#071322] border-b border-slate-800 text-white p-6 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-[#1e293b] p-2 rounded-xl border border-white/10">
              <Building2 className="text-amber-500" size={22} />
            </div>
            <div>
              <h1 className="font-bold text-base text-white">SMS & Email Broadcasts</h1>
              <p className="text-[10px] text-slate-400 uppercase font-semibold">Mtwapa Central SDA</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <Link to="/admin/treasury" className="text-slate-300 hover:text-white">Treasury</Link>
            <Link to="/admin/members" className="text-slate-300 hover:text-white">Members</Link>
            <Link to="/admin/events" className="text-slate-300 hover:text-white">Events</Link>
            <Link to="/admin/audit" className="text-slate-300 hover:text-white">Audit Log</Link>
            <Link to="/admin/settings" className="text-slate-300 hover:text-white">Settings</Link>
            <Link to="/" className="bg-white/10 px-3 py-1.5 rounded-lg text-white hover:bg-white/20 transition">Exit</Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12 space-y-6">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 space-y-6">
          <div>
            <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">Messaging</span>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">Send Church Announcement</h3>
          </div>

          {sent && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl text-sm flex items-center gap-3">
              <CheckCircle2 size={20} className="text-emerald-600 shrink-0" />
              <p className="font-medium">Broadcast sent successfully to all active members!</p>
            </div>
          )}

          <form onSubmit={handleBroadcast} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Recipient Group</label>
              <select className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold">
                <option>All Church Members (180+)</option>
                <option>Sabbath School Teachers</option>
                <option>Adventist Youth Members</option>
                <option>Choir & Music Department</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Message Body</label>
              <textarea rows="5" placeholder="Enter church announcement or Sabbath reminder..." className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-[#071322]" required></textarea>
            </div>
            <button type="submit" className="w-full bg-[#071322] hover:bg-[#002B49] text-white font-bold py-4 rounded-xl transition shadow flex items-center justify-center gap-2">
              <Send size={18} /> Broadcast Message
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
