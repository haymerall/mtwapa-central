import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Shield } from 'lucide-react';

export default function AuditLog() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans">
      <header className="bg-[#071322] border-b border-slate-800 text-white p-6 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-[#1e293b] p-2 rounded-xl border border-white/10">
              <Building2 className="text-amber-500" size={22} />
            </div>
            <div>
              <h1 className="font-bold text-base text-white">Security Audit Logs</h1>
              <p className="text-[10px] text-slate-400 uppercase font-semibold">Mtwapa Central SDA</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <Link to="/admin/treasury" className="text-slate-300 hover:text-white">Treasury</Link>
            <Link to="/admin/members" className="text-slate-300 hover:text-white">Members</Link>
            <Link to="/admin/events" className="text-slate-300 hover:text-white">Events</Link>
            <Link to="/admin/communication" className="text-slate-300 hover:text-white">Broadcast</Link>
            <Link to="/admin/settings" className="text-slate-300 hover:text-white">Settings</Link>
            <Link to="/" className="bg-white/10 px-3 py-1.5 rounded-lg text-white hover:bg-white/20 transition">Exit</Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12 space-y-6">
        <div>
          <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">Security</span>
          <h2 className="text-3xl font-extrabold text-slate-900 mt-1">System Audit Logs</h2>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden divide-y divide-slate-100">
          {[
            { action: "ADMIN_LOGIN", user: "Elder James Omondi", ip: "192.168.1.50", time: "10 mins ago" },
            { action: "MPESA_STK_CALLBACK", user: "Daraja 2.0 API", ip: "10.0.0.4", time: "25 mins ago" },
            { action: "MEMBER_RECORD_UPDATE", user: "Sister Mary Akinyi", ip: "192.168.1.102", time: "2 hours ago" }
          ].map((log, i) => (
            <div key={i} className="p-6 flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-900 text-sm">{log.action} · <span className="text-slate-500 font-normal">{log.user}</span></p>
                <p className="text-xs text-slate-400">IP: {log.ip} · {log.time}</p>
              </div>
              <span className="text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">Secure</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
