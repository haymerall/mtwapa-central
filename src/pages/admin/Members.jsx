import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Users, UserPlus } from 'lucide-react';

export default function Members() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans">
      <header className="bg-[#071322] border-b border-slate-800 text-white p-6 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-[#1e293b] p-2 rounded-xl border border-white/10">
              <Building2 className="text-amber-500" size={22} />
            </div>
            <div>
              <h1 className="font-bold text-base text-white">Member Directory Management</h1>
              <p className="text-[10px] text-slate-400 uppercase font-semibold">Mtwapa Central SDA</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <Link to="/admin/treasury" className="text-slate-300 hover:text-white">Treasury</Link>
            <Link to="/admin/events" className="text-slate-300 hover:text-white">Events</Link>
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
            <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">Directory</span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-1">Church Membership Records</h2>
          </div>
          <button className="bg-[#071322] hover:bg-[#002B49] text-white text-sm font-bold px-5 py-3 rounded-xl shadow flex items-center gap-2">
            <UserPlus size={16} /> Add New Member
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="divide-y divide-slate-100">
            {[
              { name: "Elder James Omondi", role: "Head Elder", phone: "+254 712 345 678", status: "Active" },
              { name: "Sister Mary Akinyi", role: "Treasurer", phone: "+254 722 345 678", status: "Active" },
              { name: "Brother David Mwangi", role: "Youth Leader", phone: "+254 733 345 678", status: "Active" }
            ].map((m, idx) => (
              <div key={idx} className="p-6 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-lg">{m.name}</h4>
                  <p className="text-xs text-slate-500">{m.role} · {m.phone}</p>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">{m.status}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
