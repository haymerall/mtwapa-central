import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, ArrowLeft, DollarSign, Users, Calendar, Shield, FileText } from 'lucide-react';

export default function TreasuryReports() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans">
      <header className="bg-[#071322] border-b border-slate-800 text-white p-6 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-[#1e293b] p-2 rounded-xl border border-white/10">
              <Building2 className="text-amber-500" size={22} />
            </div>
            <div>
              <h1 className="font-bold text-base text-white">Treasury & Finance Admin</h1>
              <p className="text-[10px] text-slate-400 uppercase font-semibold">Mtwapa Central SDA</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <Link to="/admin/members" className="text-slate-300 hover:text-white">Members</Link>
            <Link to="/admin/events" className="text-slate-300 hover:text-white">Events</Link>
            <Link to="/admin/communication" className="text-slate-300 hover:text-white">Broadcast</Link>
            <Link to="/admin/audit" className="text-slate-300 hover:text-white">Audit Log</Link>
            <Link to="/admin/settings" className="text-slate-300 hover:text-white">Settings</Link>
            <Link to="/" className="bg-white/10 px-3 py-1.5 rounded-lg text-white hover:bg-white/20 transition">Exit</Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12 space-y-8">
        <div className="grid sm:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-2">
            <p className="text-xs font-bold text-slate-400 uppercase">Total Tithes (October)</p>
            <div className="text-3xl font-extrabold text-slate-900">KSh 142,500</div>
            <p className="text-xs font-medium text-emerald-600">+12% from last month</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-2">
            <p className="text-xs font-bold text-slate-400 uppercase">Combined Offerings</p>
            <div className="text-3xl font-extrabold text-slate-900">KSh 68,200</div>
            <p className="text-xs font-medium text-emerald-600">+8% from last month</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-2">
            <p className="text-xs font-bold text-slate-400 uppercase">Building Fund Balance</p>
            <div className="text-3xl font-extrabold text-slate-900">KSh 450,000</div>
            <p className="text-xs font-medium text-blue-600">Sanctuary Project Phase II</p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-slate-900">Recent Daraja M-Pesa Transactions</h3>
            <button className="bg-[#071322] text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-[#002B49] transition">
              Export CSV Report
            </button>
          </div>
          <div className="divide-y divide-slate-100">
            {[
              { name: "Elder James Omondi", category: "Tithe", phone: "0712******", amount: "KSh 12,000", time: "10 mins ago" },
              { name: "Sister Mary Akinyi", category: "Building Fund", phone: "0722******", amount: "KSh 5,000", time: "45 mins ago" },
              { name: "Brother David Mwangi", category: "Offering", phone: "0733******", amount: "KSh 2,500", time: "2 hours ago" }
            ].map((tx, idx) => (
              <div key={idx} className="py-4 flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-900 text-sm">{tx.name} · <span className="text-slate-500 font-normal">{tx.category}</span></p>
                  <p className="text-xs text-slate-400">Phone: {tx.phone} · {tx.time}</p>
                </div>
                <span className="font-extrabold text-emerald-700 text-sm bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">{tx.amount}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
